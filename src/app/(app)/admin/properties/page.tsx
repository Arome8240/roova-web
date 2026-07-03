import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PropertiesTable } from "@/features/admin/components/properties/properties-table";

export const metadata: Metadata = {
  title: "Properties — Admin Dashboard | Roova",
};

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        subtitle="Review submitted listings across every agency."
      />
      <PropertiesTable />
    </div>
  );
}
