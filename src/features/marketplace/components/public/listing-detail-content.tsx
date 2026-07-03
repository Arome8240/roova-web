"use client";

import Image from "next/image";
import { Bed, Bath, Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { OfferForm } from "@/features/marketplace/components/public/offer-form";
import { useListing } from "@/features/marketplace/queries";
import { formatNairaFull } from "@/lib/utils";

export function ListingDetailContent({ id }: { id: string }) {
  const { data: listing, isPending, isError, refetch } = useListing(id);

  if (isPending) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-96 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  if (!listing || listing.status !== "live") {
    return (
      <EmptyState
        icon={Home}
        title="Listing not found"
        description="This listing doesn't exist or is no longer available."
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <div className="relative h-80 overflow-hidden rounded-3xl">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {listing.allowsInstallment && (
            <Badge variant="success" className="absolute top-3 left-3">
              Installment available
            </Badge>
          )}
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {listing.location}
          </p>
          <h1 className="mt-1 text-2xl font-medium tracking-[-0.02em] text-foreground">
            {listing.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Listed by {listing.agencyName}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" /> {listing.bedrooms} bedrooms
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" /> {listing.bathrooms} bathrooms
          </span>
        </div>

        <p className="leading-relaxed text-muted-foreground">{listing.description}</p>

        <p className="text-2xl font-medium tracking-[-0.02em] text-foreground">
          {formatNairaFull(listing.price)}
        </p>
      </div>

      <OfferForm listing={listing} />
    </div>
  );
}
