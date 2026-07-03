import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Commission & fees — Roova",
};

export default function FeesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="Commission & fees"
        subtitle="Transparent pricing for investors and agencies — no hidden charges."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="shadow-soft rounded-2xl bg-card p-6">
          <h2 className="font-medium tracking-[-0.01em] text-foreground">For investors</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>No account or funding fees — deposit by bank transfer, card, or USDC at no cost.</li>
            <li>Dividends are paid net of a small platform management fee, deducted before payout.</li>
            <li>Secondary market trades carry a small transaction fee, charged to the seller only.</li>
            <li>Full refund, no fees deducted, if a property doesn&apos;t reach its funding target.</li>
          </ul>
        </div>

        <div className="shadow-soft rounded-2xl bg-card p-6">
          <h2 className="font-medium tracking-[-0.01em] text-foreground">For agencies</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>Roova charges commission on the total amount raised for each listing, once funded.</li>
            <li>Default commission is 3.5%, with lower rates available at Gold tier.</li>
            <li>No fee to submit a listing for review — commission is only charged on success.</li>
            <li>Payouts run monthly, straight to the agency&apos;s account on file.</li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        See how tier affects agency commission on the{" "}
        <Link href="/tiers" className="font-medium text-primary hover:text-primary/80">
          Agency tiers
        </Link>{" "}
        page.
      </p>
    </div>
  );
}
