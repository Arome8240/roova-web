import type { Metadata } from "next";
import { ListingDetailContent } from "@/features/marketplace/components/public/listing-detail-content";
import { listings } from "@/features/marketplace/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = listings.find((l) => l.id === id);
  return { title: listing ? `${listing.title} — Marketplace | Roova` : "Listing — Roova" };
}

export default async function MarketplaceListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <ListingDetailContent id={id} />
    </div>
  );
}
