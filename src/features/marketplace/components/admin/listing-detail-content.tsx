"use client";

import { Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListing } from "@/features/marketplace/queries";
import { useApproveListing, useRejectListing } from "@/features/marketplace/mutations";
import { formatNairaFull } from "@/lib/utils";
import type { ListingStatus } from "@/features/marketplace/schemas";

const STATUS_BADGE: Record<
  ListingStatus,
  { label: string; variant: "success" | "primary" | "outline" | "destructive" }
> = {
  live: { label: "Live", variant: "success" },
  sold: { label: "Sold", variant: "primary" },
  pending: { label: "Pending", variant: "outline" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export function ListingDetailContent({ id }: { id: string }) {
  const { data: listing, isPending, isError, refetch } = useListing(id);
  const approveListing = useApproveListing();
  const rejectListing = useRejectListing();

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-2xl" />;
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  if (!listing) {
    return (
      <EmptyState
        icon={Home}
        title="Listing not found"
        description="This listing doesn't exist or may have been removed."
      />
    );
  }

  const status = STATUS_BADGE[listing.status];

  return (
    <div className="shadow-soft rounded-2xl bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {listing.location}
          </p>
          <h2 className="mt-1 text-xl font-medium tracking-[-0.01em] text-foreground">
            {listing.title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Submitted by {listing.agencyName} &middot; {listing.bedrooms} bed &middot;{" "}
            {listing.bathrooms} bath
          </p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Price</p>
          <p className="mt-1 font-medium text-foreground">{formatNairaFull(listing.price)}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Installment</p>
          <p className="mt-1 font-medium text-foreground">
            {listing.allowsInstallment
              ? `${listing.downPaymentPct}% down, ${listing.installmentMonths.join("/")} months`
              : "Full payment only"}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Submitted</p>
          <p className="mt-1 font-medium text-foreground">{listing.submittedAt}</p>
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-muted-foreground">{listing.description}</p>

      {listing.status === "pending" && (
        <div className="mt-6 flex gap-3 border-t border-border pt-6">
          <Button
            disabled={approveListing.isPending}
            onClick={() => approveListing.mutate(listing.id)}
          >
            Approve listing
          </Button>
          <Button
            variant="outline"
            disabled={rejectListing.isPending}
            onClick={() => rejectListing.mutate(listing.id)}
          >
            Reject listing
          </Button>
        </div>
      )}
    </div>
  );
}
