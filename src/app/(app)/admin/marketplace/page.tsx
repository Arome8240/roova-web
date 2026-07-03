import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ListingsTable } from "@/features/marketplace/components/admin/listings-table";

export const metadata: Metadata = {
  title: "Marketplace — Admin Dashboard | Roova",
};

export default function AdminMarketplacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace"
        subtitle="Review direct-sale listings submitted by every agency."
      />
      <ListingsTable />
    </div>
  );
}
