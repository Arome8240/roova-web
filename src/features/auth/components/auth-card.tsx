import Link from "next/link";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="shadow-soft w-full max-w-md rounded-3xl bg-card p-8">
      <Link href="/" className="text-xl font-medium tracking-[-0.01em] text-foreground">
        roova<span className="text-primary">.</span>
      </Link>

      <h1 className="mt-6 text-2xl font-medium tracking-[-0.02em] text-foreground">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}

      <div className="mt-6">{children}</div>

      {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
    </div>
  );
}
