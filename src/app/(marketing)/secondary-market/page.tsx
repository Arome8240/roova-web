import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Secondary market — Roova",
};

const SECTIONS = [
  {
    title: "How it works",
    body: "Once a property is fully funded, its shares become tradeable. List some or all of your shares at a price you choose, or buy shares another investor is selling — all from your portfolio.",
  },
  {
    title: "Why it matters",
    body: "Traditional property investment is illiquid — your money is tied up until the property sells. Roova's secondary market means you're never fully locked in: you can exit a position whenever there's a buyer, without waiting for the underlying property itself to sell.",
  },
  {
    title: "Pricing",
    body: "You set your own asking price. Roova doesn't guarantee a buyer will be found, and prices can trade above or below the original share price depending on demand for that property.",
  },
  {
    title: "Fees",
    body: "A small transaction fee applies to completed secondary market trades, charged to the seller. There's no fee for listing shares for sale, and no fee if a trade doesn't complete.",
  },
];

export default function SecondaryMarketPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="Secondary market"
        subtitle="Trade your property shares with other investors, anytime after a property is fully funded."
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
