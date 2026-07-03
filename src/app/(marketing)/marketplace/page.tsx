import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ListingsGrid } from "@/features/marketplace/components/public/listings-grid";

export const metadata: Metadata = {
  title: "Marketplace — Roova",
};

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <PageHeader
        title="Marketplace"
        subtitle="Buy a house outright or spread the cost with an agency-backed installment plan."
      />
      <div className="mt-10">
        <ListingsGrid />
      </div>
    </div>
  );
}
