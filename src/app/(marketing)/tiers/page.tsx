import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Agency tiers — Roova",
};

const TIERS = [
  {
    name: "Silver tier",
    variant: "outline" as const,
    description: "The starting tier for every agency approved on Roova.",
    perks: [
      "Standard placement in property listings",
      "Standard commission rate on funded listings",
      "Monthly commission payouts",
    ],
  },
  {
    name: "Gold tier",
    variant: "primary" as const,
    description: "Unlocked once an agency builds a track record on the platform.",
    perks: [
      "Priority placement on the homepage and search results",
      "Reduced commission rate on funded listings",
      "Faster listing review turnaround",
      "Dedicated support contact",
    ],
  },
];

export default function TiersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="Agency tiers"
        subtitle="Earn priority placement and lower fees as you grow with Roova."
      />

      <div className="mt-10 space-y-6">
        {TIERS.map((tier) => (
          <div key={tier.name} className="shadow-soft rounded-2xl bg-card p-6">
            <div className="flex items-center gap-3">
              <h2 className="font-medium tracking-[-0.01em] text-foreground">{tier.name}</h2>
              <Badge variant={tier.variant}>{tier.name}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
          How to reach Gold tier
        </h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Agencies are reviewed for Gold tier based on funding track record, time-to-fully-fund
          across listings, and investor satisfaction. There&apos;s no application — Roova upgrades
          eligible agencies directly and notifies you from your dashboard.
        </p>
      </div>
    </div>
  );
}
