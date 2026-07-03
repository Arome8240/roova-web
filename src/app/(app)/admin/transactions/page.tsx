import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { TransactionsContent } from "@/features/admin/components/transactions/transactions-content";

export const metadata: Metadata = {
  title: "Transactions — Admin Dashboard | Roova",
};

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" subtitle="Platform-wide investment and payout ledger." />
      <TransactionsContent />
    </div>
  );
}
