import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { PropertyCard } from "@/features/landing/components/property-card";
import { heroProperty } from "@/features/landing/data";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
      <FadeIn className="space-y-6">
        <Badge variant="outline" className="text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> SEC-regulated &middot;
          Fractional ownership
        </Badge>

        <h1 className="text-4xl font-medium tracking-[-0.025em] text-foreground sm:text-5xl">
          Own a piece of Lagos for ₦50,000
        </h1>

        <p className="max-w-lg text-lg text-muted-foreground">
          Buy fractional shares in vetted Nigerian properties, earn rental dividends every
          quarter, and trade your shares on the secondary market — all from your phone, anywhere
          in the world.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Start investing
          </Link>
          <Button size="lg" variant="outline">
            List a property
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Investments are not guaranteed. Capital is at risk.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <PropertyCard property={heroProperty} variant="hero" />
      </FadeIn>
    </section>
  );
}
