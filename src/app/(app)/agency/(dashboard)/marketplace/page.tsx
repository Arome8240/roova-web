import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { ListingsTable } from "@/features/marketplace/components/agency/listings-table";

export const metadata: Metadata = {
  title: "Marketplace — Agency Dashboard | Roova",
};

export default function AgencyMarketplacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace"
        subtitle="List houses for direct sale, with or without an installment plan."
        action={
          <Link href="/marketplace/new" className={buttonVariants({ size: "sm" })}>
            Add listing
          </Link>
        }
      />
      <ListingsTable />
    </div>
  );
}
