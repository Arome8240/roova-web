import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Invest",
    links: [
      { href: "#properties", label: "Browse properties" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#", label: "Secondary market" },
      { href: "#diaspora", label: "Diaspora investing" },
    ],
  },
  {
    title: "Agencies",
    links: [
      { href: "#agencies", label: "Apply to list" },
      { href: "#", label: "Commission & fees" },
      { href: "#", label: "Gold tier" },
      { href: "/agency", label: "Agency dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Regulation & security" },
      { href: "#", label: "Help centre" },
      { href: "#", label: "Contact" },
    ],
  },
];

const LEGAL_LINKS = ["Terms", "Privacy", "Risk disclosure", "Cookies"];

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
              {LEGAL_LINKS.map((label) => (
                <Link key={label} href="#" className="transition-colors hover:text-foreground">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
