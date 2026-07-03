"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListings } from "@/features/marketplace/queries";
import { useApproveListing } from "@/features/marketplace/mutations";
import { formatNairaCompact } from "@/lib/utils";
import type { ListingStatus } from "@/features/marketplace/schemas";

const FILTERS: { value: "all" | ListingStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "live", label: "Live" },
  { value: "sold", label: "Sold" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_BADGE: Record<
  ListingStatus,
  { label: string; variant: "success" | "primary" | "outline" | "destructive" }
> = {
  live: { label: "Live", variant: "success" },
  sold: { label: "Sold", variant: "primary" },
  pending: { label: "Pending", variant: "outline" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export function ListingsTable() {
  const { data, isPending, isError, refetch } = useListings();
  const [filter, setFilter] = useState<"all" | ListingStatus>("all");
  const approveListing = useApproveListing();

  const filtered = data?.filter((listing) => filter === "all" || listing.status === filter) ?? [];

  return (
    <div className="space-y-4">
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
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && filtered.length === 0 && (
        <EmptyState icon={Home} title="No listings here" description="Try a different filter." />
      )}

      {filtered.length > 0 && (
        <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Listing</th>
                  <th className="px-5 py-3 font-medium">Agency</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((listing) => {
                  const status = STATUS_BADGE[listing.status];
                  return (
                    <tr key={listing.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-4">
                        <Link
                          href={`/marketplace/${listing.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {listing.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{listing.location}</p>
                      </td>
                      <td className="px-5 py-4 text-foreground">{listing.agencyName}</td>
                      <td className="px-5 py-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        {formatNairaCompact(listing.price)}
                      </td>
                      <td className="px-5 py-4">
                        {listing.status === "pending" && (
                          <Button
                            size="sm"
                            disabled={approveListing.isPending}
                            onClick={() => approveListing.mutate(listing.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
