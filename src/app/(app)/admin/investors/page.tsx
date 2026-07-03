import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { InvestorsTable } from "@/features/admin/components/investors/investors-table";

export const metadata: Metadata = {
  title: "Investors — Admin Dashboard | Roova",
};

export default function AdminInvestorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Investors" subtitle="Platform investors and their KYC status." />
      <InvestorsTable />
    </div>
  );
}
