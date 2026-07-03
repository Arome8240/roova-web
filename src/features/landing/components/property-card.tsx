import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatNairaCompact, formatNairaFull } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Property } from "@/features/landing/data";

export function PropertyCard({
  property,
  variant = "grid",
}: {
  property: Property;
  variant?: "hero" | "grid";
}) {
  const isHero = variant === "hero";
  const percentFunded = Math.round((property.raised / property.target) * 100);

  return (
    <div className="shadow-soft overflow-hidden rounded-3xl bg-card">
      <div
        className={cn(
          "relative overflow-hidden bg-linear-to-br from-primary to-accent",
          isHero ? "h-56" : "h-40",
        )}
      >
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          priority={isHero}
          sizes={isHero ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
        />

        <Badge variant="success" className="absolute top-3 left-3">
          {property.yieldPct}% annual yield
        </Badge>

        {property.editorsPick && (
          <Badge variant="surface" className="absolute top-3 right-3">
            <Star className="h-3 w-3 fill-current" /> Editor&apos;s pick
          </Badge>
        )}
      </div>

      <div className={cn("space-y-4", isHero ? "p-6" : "p-5")}>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {property.location}
          </p>
          <h3
            className={cn(
              "mt-1 font-medium tracking-[-0.01em] text-foreground",
              isHero ? "text-xl" : "text-lg",
            )}
          >
            {property.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {property.developer} &middot; {property.tier}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              {formatNairaCompact(property.raised)} raised of {formatNairaCompact(property.target)}
            </span>
            <span className="font-medium text-success">{percentFunded}%</span>
          </div>
          <Progress value={percentFunded} />
          <p className="text-xs text-muted-foreground">
            {property.investors} investors &middot; {property.daysRemaining} days
            {isHero ? " remaining" : " left"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Share price</p>
            <p className="font-medium text-foreground">{formatNairaFull(property.sharePrice)}</p>
          </div>
          <Button size={isHero ? "md" : "sm"}>
            {isHero ? `Invest from ${formatNairaFull(property.sharePrice)}` : "Invest now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
