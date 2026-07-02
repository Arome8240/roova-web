import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-xs font-medium tracking-wider text-primary uppercase">404</p>
      <h1 className="text-3xl font-medium tracking-[-0.02em] text-foreground">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Back to home
      </Link>
    </div>
  );
}
