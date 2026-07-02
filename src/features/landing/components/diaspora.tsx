import { FadeIn } from "@/components/shared/fade-in";
import { CurrencyConverter } from "@/features/landing/components/currency-converter";
import { diasporaFlags } from "@/features/landing/data";

function StoreBadge({ eyebrow, name }: { eyebrow: string; name: string }) {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-left text-accent-foreground transition-colors hover:bg-accent/90">
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] text-accent-foreground/70">{eyebrow}</span>
        <span className="text-sm font-medium">{name}</span>
      </span>
    </button>
  );
}

export function Diaspora() {
  return (
    <section id="diaspora" className="bg-muted">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <FadeIn className="space-y-6">
          <p className="text-xs font-medium tracking-wider text-primary uppercase">
            For the diaspora
          </p>
          <h2 className="text-3xl font-medium tracking-[-0.02em] text-foreground sm:text-4xl">
            Invest in Nigeria from anywhere
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Fund your account in pounds, dollars or USDC. International KYC, no Nigerian bank
            account required, dividends paid in your currency of choice.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {diasporaFlags.map((item) => (
                <span
                  key={item.code}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-card text-sm"
                >
                  {item.flag}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">10,000+ diaspora investors</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <StoreBadge eyebrow="Download on the" name="App Store" />
            <StoreBadge eyebrow="GET IT ON" name="Google Play" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <CurrencyConverter />
        </FadeIn>
      </div>
    </section>
  );
}
