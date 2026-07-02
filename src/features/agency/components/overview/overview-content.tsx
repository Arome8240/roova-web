"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Coins, Building2, Users, Wallet } from "lucide-react";
import { ChartContainer } from "@/components/charts/chart-container";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { StatCard } from "@/features/agency/components/stat-card";
import { NOTIFICATION_ICON } from "@/features/agency/components/notification-icon";
import { useOverview, useFundingSeries, useNotifications } from "@/features/agency/queries";
import { formatNairaCompact, cn } from "@/lib/utils";

export function OverviewContent() {
  const overview = useOverview();
  const funding = useFundingSeries();
  const activity = useNotifications();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overview.isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        {overview.isError && (
          <div className="sm:col-span-2 lg:col-span-4">
            <ErrorState onRetry={() => overview.refetch()} />
          </div>
        )}
        {overview.data && (
          <>
            <StatCard
              icon={Coins}
              label="Total raised"
              value={formatNairaCompact(overview.data.totalRaised)}
            />
            <StatCard
              icon={Building2}
              label="Active listings"
              value={String(overview.data.activeListings)}
            />
            <StatCard
              icon={Users}
              label="Total investors"
              value={overview.data.totalInvestors.toLocaleString("en-NG")}
            />
            <StatCard
              icon={Wallet}
              label="Commission earned"
              value={formatNairaCompact(overview.data.commissionEarned)}
            />
          </>
        )}
      </div>

      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">Funds raised this year</h2>
        <div className="mt-4">
          {funding.isPending && <Skeleton className="h-72 w-full rounded-xl" />}
          {funding.isError && <ErrorState onRetry={() => funding.refetch()} />}
          {funding.data && (
            <ChartContainer>
              <AreaChart data={funding.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  tickFormatter={(value) => formatNairaCompact(value)}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip content={<ChartTooltip formatValue={(v) => formatNairaCompact(Number(v))} />} />
                <Area
                  dataKey="amount"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </div>

      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">Recent activity</h2>
        <div className="mt-4 space-y-3">
          {activity.isPending &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          {activity.data?.slice(0, 5).map((notification) => {
            const { icon: Icon, className } = NOTIFICATION_ICON[notification.type];
            return (
              <div key={notification.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    className,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
