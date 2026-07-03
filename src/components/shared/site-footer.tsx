import Link from "next/link";
import { AGENCY_URL } from "@/lib/urls";

const FOOTER_COLUMNS = [
  {
    title: "Invest",
    links: [
      { href: "#properties", label: "Browse properties" },
      { href: "#how-it-works", label: "How it works" },
      { href: "/secondary-market", label: "Secondary market" },
      { href: "#diaspora", label: "Diaspora investing" },
    ],
  },
  {
    title: "Agencies",
    links: [
      { href: "#agencies", label: "Apply to list" },
      { href: "/fees", label: "Commission & fees" },
      { href: "/tiers", label: "Gold tier" },
      { href: AGENCY_URL, label: "Agency dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/regulation", label: "Regulation & security" },
      { href: "/help", label: "Help centre" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/risk-disclosure", label: "Risk disclosure" },
  { href: "/cookies", label: "Cookies" },
];

export function SiteFooter() {
  return (
    <footer className="shadow-ring bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-medium tracking-[-0.01em] text-foreground">
              roova<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Fractional real estate investment for Nigeria and the diaspora.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border/60 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Roova is a regulated investment platform. Investing involves risk, including the
            possible loss of capital. Past performance and projected returns are not guarantees
            of future returns. Property values can fall as well as rise. Read the risk
            disclosures before investing. Roova Technologies Ltd is registered with the SEC
            Nigeria.
          </p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 Roova Technologies Ltd. All rights reserved.</span>
            <div className="flex gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
