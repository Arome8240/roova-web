import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { PropertyCard } from "@/features/landing/components/property-card";
import { featuredProperties } from "@/features/landing/data";

export function FeaturedProperties() {
  return (
    <section id="properties" className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wider text-primary uppercase">
            Open for investment
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
            Featured properties
          </h2>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
        >
          View all 47 properties <ArrowRight className="h-4 w-4" />
        </Link>
      </FadeIn>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredProperties.map((property, index) => (
          <FadeIn key={property.title} delay={index * 0.08}>
            <PropertyCard property={property} variant="grid" />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
