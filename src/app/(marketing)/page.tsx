import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { Hero } from "@/features/landing/components/hero";
import { TrustBar } from "@/features/landing/components/trust-bar";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { FeaturedProperties } from "@/features/landing/components/featured-properties";
import { Diaspora } from "@/features/landing/components/diaspora";
import { ForAgencies } from "@/features/landing/components/for-agencies";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <HowItWorks />
        <FeaturedProperties />
        <Diaspora />
        <ForAgencies />
      </main>
      <SiteFooter />
    </div>
  );
}
