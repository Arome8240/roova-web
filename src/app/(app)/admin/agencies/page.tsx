import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AgenciesTable } from "@/features/admin/components/agencies/agencies-table";

export const metadata: Metadata = {
  title: "Agencies — Admin Dashboard | Roova",
};

export default function AdminAgenciesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Agencies"
        subtitle="Review applications and manage agency accounts."
      />
      <AgenciesTable />
    </div>
  );
}
