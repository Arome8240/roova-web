import { regulators, trustStats } from "@/features/landing/data";

export function TrustBar() {
  return (
    <section className="shadow-ring bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Regulated &amp; insured
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium tracking-[-0.01em] text-foreground">
            {regulators.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {trustStats.map((stat) => (
            <span key={stat.label} className="text-foreground">
              <span className="font-medium">{stat.value}</span>{" "}
              <span className="text-muted-foreground">{stat.label}</span>
            </span>
          ))}
          <span className="font-medium text-foreground">Diaspora-friendly</span>
        </div>
      </div>
    </section>
  );
}
