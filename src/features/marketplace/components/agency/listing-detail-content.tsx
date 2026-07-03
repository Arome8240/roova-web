"use client";

import { Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { useListing, useOffersForListing } from "@/features/marketplace/queries";
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
  const offers = useOffersForListing(id);

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
    <div className="space-y-6">
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
              {listing.bedrooms} bed &middot; {listing.bathrooms} bath
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
      </div>

      <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
        <div className="px-6 py-4">
          <h3 className="font-medium tracking-[-0.01em] text-foreground">Buyer offers</h3>
        </div>

        {offers.isPending && (
          <div className="space-y-2 px-6 pb-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        )}

        {offers.data && offers.data.length === 0 && (
          <p className="px-6 pb-6 text-sm text-muted-foreground">No offers yet.</p>
        )}

        {offers.data && offers.data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-6 py-3 font-medium">Buyer</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {offers.data.map((offer) => (
                  <tr key={offer.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 text-foreground">{offer.buyerName}</td>
                    <td className="px-6 py-3 text-muted-foreground">
                      {offer.buyerEmail}
                      <br />
                      {offer.buyerPhone}
                    </td>
                    <td className="px-6 py-3 text-foreground">
                      {offer.paymentPlan === "full"
                        ? "Full payment"
                        : `Installment — ${offer.installmentMonths} months`}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{offer.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
