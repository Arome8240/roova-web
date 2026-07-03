"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProperties } from "@/features/admin/queries";
import { useApproveProperty } from "@/features/admin/mutations";
import { formatNairaCompact } from "@/lib/utils";
import type { AdminPropertyStatus } from "@/features/admin/schemas";

const FILTERS: { value: "all" | AdminPropertyStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "live", label: "Live" },
  { value: "funded", label: "Funded" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_BADGE: Record<
  AdminPropertyStatus,
  { label: string; variant: "success" | "primary" | "outline" | "destructive" }
> = {
  live: { label: "Live", variant: "success" },
  funded: { label: "Funded", variant: "primary" },
  draft: { label: "Draft", variant: "outline" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export function PropertiesTable() {
  const { data, isPending, isError, refetch } = useProperties();
  const [filter, setFilter] = useState<"all" | AdminPropertyStatus>("all");
  const approveProperty = useApproveProperty();

  const filtered = data?.filter((p) => filter === "all" || p.status === filter) ?? [];

  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="shadow-soft bg-card">
          {FILTERS.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isPending && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && filtered.length === 0 && (
        <EmptyState
          icon={Building2}
          title="No properties here"
          description="Try a different filter."
        />
      )}

      {filtered.length > 0 && (
        <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Property</th>
                  <th className="px-5 py-3 font-medium">Agency</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Funding</th>
                  <th className="px-5 py-3 font-medium">Yield</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((property) => {
                  const percent =
                    property.target > 0
                      ? Math.round((property.raised / property.target) * 100)
                      : 0;
                  const status = STATUS_BADGE[property.status];
                  return (
                    <tr key={property.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-4">
                        <Link
                          href={`/properties/${property.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {property.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{property.location}</p>
                      </td>
                      <td className="px-5 py-4 text-foreground">{property.agencyName}</td>
                      <td className="px-5 py-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        {formatNairaCompact(property.raised)} ({percent}%)
                      </td>
                      <td className="px-5 py-4 text-success">{property.yieldPct}%</td>
                      <td className="px-5 py-4">
                        {property.status === "draft" && (
                          <Button
                            size="sm"
                            disabled={approveProperty.isPending}
                            onClick={() => approveProperty.mutate(property.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
