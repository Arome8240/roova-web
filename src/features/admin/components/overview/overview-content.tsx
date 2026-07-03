"use client";

import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Coins, Building, Building2, Users, Wallet, ClipboardList } from "lucide-react";
import { ChartContainer } from "@/components/charts/chart-container";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/features/admin/components/stat-card";
import { useOverview, useFundingSeries, useAgencies, useProperties } from "@/features/admin/queries";
import { formatNairaCompact } from "@/lib/utils";

export function OverviewContent() {
  const overview = useOverview();
  const funding = useFundingSeries();
  const agencies = useAgencies();
  const properties = useProperties();

  const pendingAgencies = agencies.data?.filter((a) => a.status === "pending") ?? [];
  const pendingProperties = properties.data?.filter((p) => p.status === "draft") ?? [];
  const isPendingListLoading = agencies.isPending || properties.isPending;
  const hasPendingItems = pendingAgencies.length > 0 || pendingProperties.length > 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overview.isPending &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        {overview.isError && (
          <div className="sm:col-span-2 lg:col-span-3">
            <ErrorState onRetry={() => overview.refetch()} />
          </div>
        )}
        {overview.data && (
          <>
            <StatCard
              icon={Coins}
              label="Total raised"
              value={formatNairaCompact(overview.data.totalRaised)}
            />
            <StatCard
              icon={Building}
              label="Agencies"
              value={String(overview.data.totalAgencies)}
            />
            <StatCard
              icon={Building2}
              label="Properties"
              value={String(overview.data.totalProperties)}
            />
            <StatCard
              icon={Users}
              label="Investors"
              value={overview.data.totalInvestors.toLocaleString("en-NG")}
            />
            <StatCard
              icon={Wallet}
              label="Platform revenue"
              value={formatNairaCompact(overview.data.platformRevenue)}
            />
            <StatCard
              icon={ClipboardList}
              label="Pending approvals"
              value={String(overview.data.pendingApprovals)}
            />
          </>
        )}
      </div>

      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">
          Platform funds raised this year
        </h2>
        <div className="mt-4">
          {funding.isPending && <Skeleton className="h-72 w-full rounded-xl" />}
          {funding.isError && <ErrorState onRetry={() => funding.refetch()} />}
          {funding.data && (
            <ChartContainer>
              <AreaChart data={funding.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  tickFormatter={(value) => formatNairaCompact(value)}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip content={<ChartTooltip formatValue={(v) => formatNairaCompact(Number(v))} />} />
                <Area
                  dataKey="amount"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </div>

      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">Pending approvals</h2>
        <div className="mt-4 space-y-2">
          {isPendingListLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}

          {!isPendingListLoading && !hasPendingItems && (
            <EmptyState
              icon={ClipboardList}
              title="Nothing pending"
              description="New agency applications and submitted listings will show up here."
            />
          )}

          {pendingAgencies.map((agency) => (
            <Link
              key={agency.id}
              href="/admin/agencies"
              className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/5"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{agency.name}</p>
                <p className="text-xs text-muted-foreground">Agency application awaiting review</p>
              </div>
              <span className="text-xs font-medium text-primary">Review</span>
            </Link>
          ))}

          {pendingProperties.map((property) => (
            <Link
              key={property.id}
              href={`/admin/properties/${property.id}`}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/5"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{property.title}</p>
                <p className="text-xs text-muted-foreground">
                  Submitted by {property.agencyName} — awaiting review
                </p>
              </div>
              <span className="text-xs font-medium text-primary">Review</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
