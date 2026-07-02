import { FadeIn } from "@/components/shared/fade-in";
import { howItWorksSteps } from "@/features/landing/data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn className="text-center">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
          Three steps to property ownership
        </h2>
      </FadeIn>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {howItWorksSteps.map((item, index) => (
          <FadeIn key={item.step} delay={index * 0.08}>
            <div className="shadow-soft h-full rounded-2xl bg-card p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-medium text-foreground">
                {item.step}
              </span>
              <h3 className="mt-4 font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
