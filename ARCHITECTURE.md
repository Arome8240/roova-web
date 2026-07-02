# Architecture

This document is the single source of truth for how this codebase is structured and how features are built. If a convention here conflicts with existing code, the convention wins — refactor toward it.

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | Next.js (App Router, RSC) |
| Server state | TanStack Query |
| Client state | Zustand |
| Validation | Zod |
| Styling | Tailwind CSS + Radix UI |
| Charts | Recharts |
| Toasts | Sonner |
| Animations | Framer Motion |

## Core Principles

1. **Server-first.** Every component is a Server Component until it needs interactivity, browser APIs, or hooks. Push `"use client"` boundaries as deep (as far down the tree) as possible.
2. **Server state ≠ client state.** Anything that comes from an API lives in TanStack Query. Zustand holds only client-side UI state. Never copy query data into a store.
3. **Schemas are the source of truth.** Types are inferred from Zod schemas with `z.infer`, never hand-written twice.
4. **Feature colocation.** Code is grouped by feature, not by kind. A feature owns its components, hooks, schemas, and API calls.
5. **Be boring.** One way to do each thing. Follow the patterns in this doc even when a clever alternative exists.

---

## Folder Structure

```
src/
├── app/                        # Routing only — thin pages, layouts, route handlers
│   ├── (marketing)/            # Route groups per audience/layout
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx        # Server Component: fetch/prefetch + compose
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   ├── api/                    # Route handlers (external/webhook endpoints only)
│   ├── layout.tsx              # Root layout: providers, <Toaster />, fonts
│   └── globals.css
│
├── features/                   # Feature modules — the heart of the app
│   └── dashboard/
│       ├── api.ts              # Raw fetchers (typed, Zod-parsed)
│       ├── queries.ts          # Query key factory + useQuery hooks
│       ├── mutations.ts        # useMutation hooks
│       ├── schemas.ts          # Zod schemas + inferred types
│       ├── components/         # Feature-specific components
│       │   ├── stats-cards.tsx
│       │   └── revenue-chart.tsx
│       └── store.ts            # Feature-scoped Zustand store (only if needed)
│
├── components/
│   ├── ui/                     # Design system: wrapped Radix primitives (button, dialog…)
│   ├── charts/                 # Shared Recharts wrappers (chart-container, tooltip…)
│   └── shared/                 # Cross-feature composites (page-header, empty-state…)
│
├── lib/
│   ├── api-client.ts           # fetch wrapper (base URL, auth, error normalization)
│   ├── query-client.ts         # QueryClient factory + defaults
│   ├── utils.ts                # cn() and small pure helpers
│   └── toast.ts                # Standardized Sonner helpers
│
├── hooks/                      # Cross-feature hooks (use-media-query, use-debounce…)
├── stores/                     # Global Zustand stores (ui-store, preferences-store)
├── types/                      # Truly global types only (no feature types here)
└── styles/                     # Tailwind extensions if needed
```

**Rules:**

- `app/` contains **no business logic**. Pages import from `features/` and compose.
- A feature may import from `components/`, `lib/`, `hooks/` — never from another feature. If two features need the same thing, promote it to a shared layer.
- `components/ui/` is the only place Radix is imported directly.

---

## Rendering Strategy

### Server vs Client Components

| Use a **Server Component** for | Use a **Client Component** for |
|---|---|
| Pages, layouts, static composition | Anything with `useState`/`useEffect`/hooks |
| Initial data fetching / prefetching | Event handlers, forms |
| SEO-relevant content | TanStack Query / Zustand consumers |
| Accessing secrets, DB, server-only libs | Recharts, Framer Motion, Radix interactive parts |

### The boundary

Put `"use client"` on the **leaf-most component that needs it**, not on the page.

```tsx
// ✅ app/(app)/dashboard/page.tsx — Server Component
export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" />
      <StatsCards />        {/* client component, deep boundary */}
      <RevenueChart />      {/* client component */}
    </div>
  );
}
```

```tsx
// ❌ Don't mark the whole page "use client" just because one widget is interactive.
```

Pass **serializable props only** across the boundary (no functions, class instances, or Dates — send ISO strings).

---

## Data Fetching Layer (TanStack Query)

### Provider setup

```tsx
// lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,       // 1 min — avoid instant refetch after hydration
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
```

The `QueryClientProvider` lives in a `providers.tsx` client component rendered by the root layout.

### API layer: fetch → validate → type

Every network response is parsed with Zod **at the edge**. Nothing unvalidated enters the app.

```ts
// features/dashboard/api.ts
import { apiClient } from "@/lib/api-client";
import { dashboardStatsSchema, type DashboardStats } from "./schemas";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await apiClient("/dashboard/stats");
  return dashboardStatsSchema.parse(res); // throws on contract drift — good
}
```

### Query key factory

One factory per feature. Never write inline key arrays.

```ts
// features/dashboard/queries.ts
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  revenue: (range: string) => [...dashboardKeys.all, "revenue", range] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });
}
```

### Server-side prefetching + hydration

For pages where initial data matters (SEO, no loading flash):

```tsx
// app/(app)/dashboard/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsCards />
    </HydrationBoundary>
  );
}
```

The client component then calls `useDashboardStats()` and hydrates instantly — no `initialData` prop drilling.

### Mutations

Mutations live in `mutations.ts`, invalidate via the key factory, and fire toasts in callbacks.

```ts
// features/dashboard/mutations.ts
export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGoal,
    onMutate: async (newGoal) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: dashboardKeys.stats() });
      const previous = queryClient.getQueryData(dashboardKeys.stats());
      queryClient.setQueryData(dashboardKeys.stats(), (old: DashboardStats) => ({
        ...old,
        goal: newGoal.value,
      }));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(dashboardKeys.stats(), context?.previous);
      toast.error("Couldn't update goal. Your change was reverted.");
    },
    onSuccess: () => toast.success("Goal updated"),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() }),
  });
}
```

**Do:** invalidate with the broadest key that's correct (`dashboardKeys.all` after big writes).
**Don't:** call `refetch()` manually from components; don't store mutation results in Zustand.

---

## State Management

### Decision table — where does this state live?

| State | Home |
|---|---|
| Data from the server | TanStack Query. Always. |
| Form input values | Local `useState` / form library |
| One component's open/hover/tab state | Local `useState` |
| UI state shared across distant components (sidebar, theme, active filters, modals) | Zustand |
| URL-worthy state (page, search, selected tab users share) | Search params (`useSearchParams`) |

### Zustand conventions

- One store per domain, in `stores/` (global) or `features/x/store.ts` (feature-scoped).
- Actions live inside the store. Components never call `setState` directly.
- **Always select with a selector** — never destructure the whole store.

```ts
// stores/ui-store.ts
import { create } from "zustand";

type UIState = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  chartRange: "7d" | "30d" | "90d";
  setChartRange: (r: UIState["chartRange"]) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  chartRange: "30d",
  setChartRange: (chartRange) => set({ chartRange }),
}));
```

```tsx
// ✅ subscribes only to what it uses
const range = useUIStore((s) => s.chartRange);

// ❌ re-renders on every store change
const { chartRange } = useUIStore();
```

---

## Validation Layer (Zod)

- Schemas live in `features/x/schemas.ts`; truly shared ones in `lib/schemas/`.
- Types are always inferred — a hand-written interface that duplicates a schema is a bug.
- The same schema validates: form input (client), request body (server), and API response parsing.

```ts
// features/dashboard/schemas.ts
import { z } from "zod";

export const dashboardStatsSchema = z.object({
  revenue: z.number(),
  goal: z.number(),
  series: z.array(
    z.object({
      date: z.string(),   // ISO — serialize dates as strings across boundaries
      value: z.number(),
    })
  ),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

export const updateGoalInput = z.object({
  value: z.number().positive().max(1_000_000),
});
export type UpdateGoalInput = z.infer<typeof updateGoalInput>;
```

Server actions / route handlers re-validate with `safeParse` — never trust the client:

```ts
const parsed = updateGoalInput.safeParse(body);
if (!parsed.success) {
  return Response.json({ error: parsed.error.flatten() }, { status: 400 });
}
```

---

## UI & Styling

### Design system layer

- All Radix primitives are wrapped once in `components/ui/` (shadcn-style). Feature code imports `@/components/ui/dialog`, never `@radix-ui/react-dialog`.
- Variants are defined with **CVA** (`class-variance-authority`); no ad-hoc conditional class strings for variant logic.

```tsx
// components/ui/button.tsx (excerpt)
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: { sm: "h-8 px-3", md: "h-10 px-4", lg: "h-11 px-6" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);
```

### Tailwind conventions

- Merge classes with `cn()` (`clsx` + `tailwind-merge`) — the only sanctioned way to compose className props.
- Design tokens (colors, radii) live as CSS variables in `globals.css` and are referenced via Tailwind theme (`bg-primary`, not `bg-blue-600`).
- Class order: layout → spacing → typography → color → effects → states. Use the Prettier Tailwind plugin to enforce it.
- No `@apply` except in `globals.css` base styles. No inline `style={}` except for truly dynamic values (chart dimensions, transforms).

---

## Charts (Recharts)

- All charts are **client components** and live behind shared wrappers in `components/charts/`.
- Every chart sits in a `<ResponsiveContainer>` inside a parent with a fixed height (`h-72`) — Recharts cannot measure `height: auto`.
- Colors come from CSS variables so charts follow the theme: `stroke="hsl(var(--primary))"`.
- Shared custom `<ChartTooltip />` — never ship the default Recharts tooltip styling.

```tsx
// features/dashboard/components/revenue-chart.tsx
"use client";

export function RevenueChart() {
  const range = useUIStore((s) => s.chartRange);
  const { data, isPending } = useRevenue(range);

  if (isPending) return <ChartSkeleton className="h-72" />;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data.series}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={40} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.15)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## Notifications (Sonner)

- One `<Toaster richColors position="top-right" />` in the **root layout**. Never render another.
- Toasts are triggered from **mutation callbacks** (`onSuccess` / `onError`) or user actions — never from render, `useEffect`, or query success.
- Use the standardized helpers in `lib/toast.ts` so copy and behavior stay consistent:

```ts
// lib/toast.ts
import { toast } from "sonner";

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg = "Something went wrong. Please try again.") => toast.error(msg),
  promise: <T>(p: Promise<T>, msgs: { loading: string; success: string; error: string }) =>
    toast.promise(p, msgs),
};
```

---

## Animations (Framer Motion)

- Framer Motion is a client-only dependency — keep it out of Server Components.
- Shared variants live in `lib/motion.ts`; components import them instead of redefining springs everywhere.
- Respect reduced motion: wrap the app in `<MotionConfig reducedMotion="user">` (in `providers.tsx`).
- Animate `transform` and `opacity` only. Animating `width`/`height`/`top` causes layout thrash — use `layout` prop for size changes.
- Lists use `<AnimatePresence>` with stable `key`s.

```ts
// lib/motion.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.2, ease: "easeOut" },
} as const;
```

---

## Error Handling

Three layers, in order:

1. **Route level:** every route segment that fetches has `error.tsx` (client component with a `reset()` retry button) and `loading.tsx`. Root has `not-found.tsx` and `global-error.tsx`.
2. **Query level:** query errors render inline `<ErrorState onRetry={refetch} />` inside the widget — a broken chart must not blank the page.
3. **Mutation level:** mutation errors roll back optimistic state and surface via `notify.error()`.

Zod parse failures in `api.ts` are **thrown**, not swallowed — they mean the API contract drifted and should be loud in monitoring.

---

## Naming & Code Conventions

- **Files:** `kebab-case.tsx` (`revenue-chart.tsx`). **Components:** `PascalCase`. **Hooks:** `useCamelCase`.
- **Feature files are fixed names:** `api.ts`, `queries.ts`, `mutations.ts`, `schemas.ts`, `store.ts` — predictability over creativity.
- Import order: react/next → external packages → `@/` aliases → relative. Enforced by ESLint.
- No barrel files (`index.ts` re-exports) inside `features/` — they hurt tree-shaking and hide dependencies. `components/ui/` is the one exception.
- Named exports everywhere except Next.js special files (`page.tsx`, `layout.tsx`, etc., which require default exports).
- Booleans read as questions: `isPending`, `hasError`, `canSubmit`.

---

## End-to-End Feature Walkthrough

Adding "dashboard stats with an editable goal" touches these files, in this order:

1. **`features/dashboard/schemas.ts`** — define `dashboardStatsSchema` + `updateGoalInput`, infer types.
2. **`features/dashboard/api.ts`** — `getDashboardStats()` and `updateGoal()` fetchers, Zod-parsed.
3. **`features/dashboard/queries.ts`** — extend `dashboardKeys`, add `useDashboardStats()`.
4. **`features/dashboard/mutations.ts`** — `useUpdateGoal()` with optimistic update + Sonner toasts.
5. **`features/dashboard/components/`** — `stats-cards.tsx` (client, consumes the query), `revenue-chart.tsx` (client, Recharts wrapper), animated in with `fadeInUp`.
6. **`app/(app)/dashboard/page.tsx`** — Server Component: prefetch, wrap in `HydrationBoundary`, compose components. Add `loading.tsx` / `error.tsx` if missing.

If a step doesn't fit this shape, stop and update this document first.
