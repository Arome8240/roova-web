"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartContainer } from "@/components/charts/chart-container";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Badge } from "@/components/ui/badge";
import { useEarnings } from "@/features/agency/queries";
import { formatNairaCompact, formatNairaFull } from "@/lib/utils";

export function EarningsContent() {
  const { data, isPending, isError, refetch } = useEarnings();

  return (
    <div className="space-y-6">
      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">
          Commission earned this year
        </h2>
        <div className="mt-4">
          {isPending && <Skeleton className="h-72 w-full rounded-xl" />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {data && (
            <ChartContainer>
              <BarChart data={data.series}>
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
                <Tooltip
                  content={<ChartTooltip formatValue={(v) => formatNairaCompact(Number(v))} />}
                  cursor={{ fill: "var(--color-muted)" }}
                />
                <Bar
                  dataKey="commission"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>

      <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
        <div className="px-6 py-4">
          <h2 className="font-medium tracking-[-0.01em] text-foreground">Payout history</h2>
        </div>
        {isPending && (
          <div className="space-y-2 px-6 pb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        )}
        {data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.payouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 text-foreground">{payout.date}</td>
                    <td className="px-6 py-3 text-foreground">
                      {formatNairaFull(payout.amount)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={payout.status === "paid" ? "success" : "outline"}>
                        {payout.status === "paid" ? "Paid" : "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
