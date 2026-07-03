import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Regulation & security — Roova",
};

const SECTIONS = [
  {
    title: "Regulatory status",
    body: "Roova Technologies Ltd is registered with the Securities and Exchange Commission (SEC) Nigeria as a fractional real estate investment platform. We work alongside NIESV-accredited valuers on every listing, and investor funds in transit are held with NDIC-insured banking partners.",
  },
  {
    title: "Fund custody",
    body: "Investor funds are held in segregated accounts, separate from Roova's own operating funds. Money raised for a property is only released to the listing agency once a funding round closes successfully — if a round doesn't reach its target, investors are refunded in full.",
  },
  {
    title: "Property vetting",
    body: "Every listing is independently checked for title authenticity, an up-to-date valuation, and tax clearance before it's allowed to go live. Agencies submit documentation through their dashboard, and our team reviews it before approving a listing for investment.",
  },
  {
    title: "Data & platform security",
    body: "Account data and KYC documents are encrypted in transit and at rest. Access to sensitive investor data is restricted to authorised personnel, and all administrative actions on the platform are logged.",
  },
  {
    title: "Ongoing reporting",
    body: "We publish quarterly updates on funded properties, including rental income collected and dividends distributed, so investors can track performance without needing to chase an agency directly.",
  },
];

export default function RegulationPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="Regulation & security"
        subtitle="Roova operates under SEC Nigeria oversight, with your capital and data protected at every step."
      />

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
              {section.title}
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
