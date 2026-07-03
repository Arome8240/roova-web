import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsForm } from "@/features/admin/components/settings/settings-form";

export const metadata: Metadata = {
  title: "Settings — Admin Dashboard | Roova",
};

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Settings" subtitle="Platform configuration and defaults." />
      <SettingsForm />
    </div>
  );
}
