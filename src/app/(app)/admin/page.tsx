import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { OverviewContent } from "@/features/admin/components/overview/overview-content";

export const metadata: Metadata = {
  title: "Overview — Admin Dashboard | Roova",
};

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Overview" subtitle="Platform-wide performance at a glance." />
      <OverviewContent />
    </div>
  );
}
