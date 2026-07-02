import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { agencyStats } from "@/features/landing/data";
import { cn } from "@/lib/utils";

export function ForAgencies() {
  return (
    <section id="agencies" className="bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <FadeIn className="space-y-6">
          <p className="text-xs font-medium tracking-wider text-primary uppercase">
            For agencies
          </p>
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
            Are you a real estate agency?
          </h2>
          <p className="max-w-lg text-accent-foreground/70">
            List your properties to thousands of pre-funded investors, manage funding rounds from
            one dashboard, and earn commission on every share sold. Reach Gold tier for priority
            placement and lower fees.
          </p>
          <Button variant="light" size="lg">
            Apply to list <ArrowRight className="h-4 w-4" />
          </Button>
        </FadeIn>

        <FadeIn delay={0.1} className="grid grid-cols-2 gap-4">
          {agencyStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-accent-foreground/5 p-6">
              <p
                className={cn(
                  "text-2xl font-medium tracking-[-0.02em]",
                  stat.accent ? "text-success" : "text-accent-foreground",
                )}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-accent-foreground/70">{stat.label}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
