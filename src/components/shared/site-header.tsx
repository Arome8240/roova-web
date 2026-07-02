import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#properties", label: "Properties" },
  { href: "#diaspora", label: "Diaspora" },
  { href: "#agencies", label: "For agencies" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold text-foreground">
          roova<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="#login" className="hidden text-sm font-medium text-foreground/80 hover:text-foreground sm:inline">
            Log in
          </Link>
          <Button size="sm">Start investing</Button>
        </div>
      </div>
    </header>
  );
}
