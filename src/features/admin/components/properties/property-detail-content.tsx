"use client";

import { Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProperty } from "@/features/admin/queries";
import { useApproveProperty, useRejectProperty } from "@/features/admin/mutations";
import { formatNairaCompact } from "@/lib/utils";
import type { AdminPropertyStatus } from "@/features/admin/schemas";

const STATUS_BADGE: Record<
  AdminPropertyStatus,
  { label: string; variant: "success" | "primary" | "outline" | "destructive" }
> = {
  live: { label: "Live", variant: "success" },
  funded: { label: "Funded", variant: "primary" },
  draft: { label: "Draft", variant: "outline" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export function PropertyDetailContent({ id }: { id: string }) {
  const { data: property, isPending, isError, refetch } = useProperty(id);
  const approveProperty = useApproveProperty();
  const rejectProperty = useRejectProperty();

  if (isPending) {
    return <Skeleton className="h-64 w-full rounded-2xl" />;
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  if (!property) {
    return (
      <EmptyState
        icon={Building2}
        title="Property not found"
        description="This listing doesn't exist or may have been removed."
      />
    );
  }

  const percent =
    property.target > 0 ? Math.round((property.raised / property.target) * 100) : 0;
  const status = STATUS_BADGE[property.status];

  return (
    <div className="shadow-soft rounded-2xl bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {property.location}
          </p>
          <h2 className="mt-1 text-xl font-medium tracking-[-0.01em] text-foreground">
            {property.title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Submitted by {property.agencyName} &middot; {property.tier}
          </p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Raised</p>
          <p className="mt-1 font-medium text-foreground">
            {formatNairaCompact(property.raised)} of {formatNairaCompact(property.target)}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Investors</p>
          <p className="mt-1 font-medium text-foreground">{property.investors}</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Annual yield</p>
          <p className="mt-1 font-medium text-success">{property.yieldPct}%</p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{percent}% funded</span>
          <span>Submitted {property.submittedAt}</span>
        </div>
        <Progress value={percent} />
      </div>

      {property.status === "draft" && (
        <div className="mt-6 flex gap-3 border-t border-border pt-6">
          <Button disabled={approveProperty.isPending} onClick={() => approveProperty.mutate(property.id)}>
            Approve listing
          </Button>
          <Button
            variant="outline"
            disabled={rejectProperty.isPending}
            onClick={() => rejectProperty.mutate(property.id)}
          >
            Reject listing
          </Button>
        </div>
      )}
    </div>
  );
}
