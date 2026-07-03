"use client";

import { useState } from "react";
import { Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgencies } from "@/features/admin/queries";
import { useApproveAgency, useSuspendAgency, useReactivateAgency } from "@/features/admin/mutations";
import { formatNairaCompact } from "@/lib/utils";
import type { AgencyStatus } from "@/features/admin/schemas";

const FILTERS: { value: "all" | AgencyStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];

const STATUS_BADGE: Record<
  AgencyStatus,
  { label: string; variant: "success" | "outline" | "destructive" }
> = {
  active: { label: "Active", variant: "success" },
  pending: { label: "Pending", variant: "outline" },
  suspended: { label: "Suspended", variant: "destructive" },
};

export function AgenciesTable() {
  const { data, isPending, isError, refetch } = useAgencies();
  const [filter, setFilter] = useState<"all" | AgencyStatus>("all");
  const approveAgency = useApproveAgency();
  const suspendAgency = useSuspendAgency();
  const reactivateAgency = useReactivateAgency();

  const filtered = data?.filter((a) => filter === "all" || a.status === filter) ?? [];

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
        <EmptyState icon={Building} title="No agencies here" description="Try a different filter." />
      )}

      {filtered.length > 0 && (
        <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Agency</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Properties</th>
                  <th className="px-5 py-3 font-medium">Total raised</th>
                  <th className="px-5 py-3 font-medium">Investors</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((agency) => {
                  const status = STATUS_BADGE[agency.status];
                  return (
                    <tr key={agency.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{agency.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agency.tier} &middot; {agency.email}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-foreground">{agency.propertiesCount}</td>
                      <td className="px-5 py-4 text-foreground">
                        {formatNairaCompact(agency.totalRaised)}
                      </td>
                      <td className="px-5 py-4 text-foreground">{agency.investorsCount}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {agency.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                disabled={approveAgency.isPending}
                                onClick={() => approveAgency.mutate(agency.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={suspendAgency.isPending}
                                onClick={() => suspendAgency.mutate(agency.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {agency.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={suspendAgency.isPending}
                              onClick={() => suspendAgency.mutate(agency.id)}
                            >
                              Suspend
                            </Button>
                          )}
                          {agency.status === "suspended" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={reactivateAgency.isPending}
                              onClick={() => reactivateAgency.mutate(agency.id)}
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
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
