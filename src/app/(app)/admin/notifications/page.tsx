import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NotificationsContent } from "@/features/admin/components/notifications/notifications-content";

export const metadata: Metadata = {
  title: "Notifications — Admin Dashboard | Roova",
};

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Agency applications, submitted listings, and platform alerts."
      />
      <NotificationsContent />
    </div>
  );
}
