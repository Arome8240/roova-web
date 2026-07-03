import Image from "next/image";
import Link from "next/link";
import { Bed, Bath } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatNairaCompact } from "@/lib/utils";
import type { MarketplaceListing } from "@/features/marketplace/schemas";

export function ListingCard({ listing }: { listing: MarketplaceListing }) {
  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="shadow-soft block overflow-hidden rounded-3xl bg-card transition-transform hover:-translate-y-0.5"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
        {listing.allowsInstallment && (
          <Badge variant="success" className="absolute top-3 left-3">
            Installment available
          </Badge>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {listing.location}
          </p>
          <h3 className="mt-1 text-lg font-medium tracking-[-0.01em] text-foreground">
            {listing.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{listing.agencyName}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4" /> {listing.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" /> {listing.bathrooms}
          </span>
        </div>

        <p className="font-medium text-foreground">{formatNairaCompact(listing.price)}</p>
      </div>
    </Link>
  );
}
