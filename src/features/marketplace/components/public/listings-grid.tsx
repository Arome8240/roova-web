"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingCard } from "@/features/marketplace/components/public/listing-card";
import { useListings } from "@/features/marketplace/queries";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "installment", label: "Installment available" },
] as const;

export function ListingsGrid() {
  const { data, isPending, isError, refetch } = useListings();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");

  const live = data?.filter((listing) => listing.status === "live") ?? [];
  const filtered = filter === "installment" ? live.filter((listing) => listing.allowsInstallment) : live;

  return (
    <div className="space-y-6">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="shadow-soft bg-card">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isPending && (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-3xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && filtered.length === 0 && (
        <EmptyState icon={Home} title="No listings here" description="Try a different filter." />
      )}

      {filtered.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
