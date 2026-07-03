import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ListingDetailContent } from "@/features/marketplace/components/admin/listing-detail-content";
import { listings } from "@/features/marketplace/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = listings.find((l) => l.id === id);
  return {
    title: listing ? `${listing.title} — Admin Dashboard | Roova` : "Listing — Roova",
  };
}

export default async function AdminMarketplaceListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Listing details" />
      <ListingDetailContent id={id} />
    </div>
  );
}
