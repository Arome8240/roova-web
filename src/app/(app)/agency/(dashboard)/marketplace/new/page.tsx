import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AddListingForm } from "@/features/marketplace/components/agency/add-listing-form";

export const metadata: Metadata = {
  title: "Add listing — Agency Dashboard | Roova",
};

export default function NewMarketplaceListingPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title="Add listing"
        subtitle="Submit a house for direct sale. It will be reviewed before going live."
      />
      <AddListingForm />
    </div>
  );
}
