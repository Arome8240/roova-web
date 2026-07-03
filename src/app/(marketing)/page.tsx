import { Hero } from "@/features/landing/components/hero";
import { TrustBar } from "@/features/landing/components/trust-bar";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { FeaturedProperties } from "@/features/landing/components/featured-properties";
import { Diaspora } from "@/features/landing/components/diaspora";
import { ForAgencies } from "@/features/landing/components/for-agencies";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedProperties />
      <Diaspora />
      <ForAgencies />
    </>
  );
}
