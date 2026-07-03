import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "About — Roova",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="About Roova"
        subtitle="Making property ownership in Nigeria accessible to everyone, everywhere."
      />

      <div className="mt-10 space-y-8 text-muted-foreground">
        <p className="leading-relaxed">
          Owning property in Nigeria has traditionally required capital most people don&apos;t
          have in one place at one time — and for Nigerians abroad, it has meant navigating
          agents, paperwork, and trust across thousands of kilometres. Roova exists to remove
          both of those barriers.
        </p>

        <div>
          <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
            What we do
          </h2>
          <p className="mt-2 leading-relaxed">
            We vet residential and commercial properties across Nigeria — checking title,
            valuation, and tax clearance before anything goes live — and split ownership into
            shares starting at ₦50,000. Investors earn rental income every quarter and can trade
            their shares with other investors on our secondary market once a property is funded.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
            Built for the diaspora too
          </h2>
          <p className="mt-2 leading-relaxed">
            You can fund your account in pounds, dollars, or USDC, complete KYC entirely online,
            and receive dividends in the currency of your choice — no Nigerian bank account
            required.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
            Regulated from day one
          </h2>
          <p className="mt-2 leading-relaxed">
            Roova Technologies Ltd is registered with the SEC Nigeria and operates under the
            oversight that fractional real estate investment requires. Read more on our{" "}
            <Link href="/regulation" className="font-medium text-primary hover:text-primary/80">
              Regulation &amp; security
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
