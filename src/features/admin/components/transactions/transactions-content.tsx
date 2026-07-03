"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Receipt } from "lucide-react";
import { ChartContainer } from "@/components/charts/chart-container";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/features/admin/queries";
import { formatNairaCompact, formatNairaFull } from "@/lib/utils";
import type { TransactionType } from "@/features/admin/schemas";

const TYPE_LABEL: Record<TransactionType, string> = {
  investment: "Investments",
  commission_payout: "Commission payouts",
  dividend_payout: "Dividend payouts",
  withdrawal: "Withdrawals",
};

export function TransactionsContent() {
  const { data, isPending, isError, refetch } = useTransactions();

  const chartData = data
    ? Object.entries(
        data.reduce<Record<string, number>>((acc, tx) => {
          acc[tx.type] = (acc[tx.type] ?? 0) + tx.amount;
          return acc;
        }, {}),
      ).map(([type, amount]) => ({ type: TYPE_LABEL[type as TransactionType], amount }))
    : [];

  return (
    <div className="space-y-6">
      <div className="shadow-soft rounded-2xl bg-card p-6">
        <h2 className="font-medium tracking-[-0.01em] text-foreground">Volume by transaction type</h2>
        <div className="mt-4">
          {isPending && <Skeleton className="h-72 w-full rounded-xl" />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {data && (
            <ChartContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="type"
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
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>

      <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
        <div className="px-6 py-4">
          <h2 className="font-medium tracking-[-0.01em] text-foreground">Transactions</h2>
        </div>

        {isPending && (
          <div className="space-y-2 px-6 pb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        )}

        {data && data.length === 0 && (
          <div className="px-6 pb-6">
            <EmptyState icon={Receipt} title="No transactions yet" />
          </div>
        )}

        {data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Party</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((tx) => (
                  <tr key={tx.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 text-foreground">{TYPE_LABEL[tx.type]}</td>
                    <td className="px-6 py-3 text-foreground">{tx.party}</td>
                    <td className="px-6 py-3 text-foreground">{formatNairaFull(tx.amount)}</td>
                    <td className="px-6 py-3 text-muted-foreground">{tx.date}</td>
                    <td className="px-6 py-3">
                      <Badge variant={tx.status === "completed" ? "success" : "outline"}>
                        {tx.status === "completed" ? "Completed" : "Pending"}
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
