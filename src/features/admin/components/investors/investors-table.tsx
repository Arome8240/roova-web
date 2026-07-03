"use client";

import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { useInvestors } from "@/features/admin/queries";
import { formatNairaFull } from "@/lib/utils";
import type { KycStatus } from "@/features/admin/schemas";

const KYC_BADGE: Record<KycStatus, { label: string; variant: "success" | "outline" | "destructive" }> = {
  verified: { label: "Verified", variant: "success" },
  pending: { label: "Pending", variant: "outline" },
  rejected: { label: "Rejected", variant: "destructive" },
};

export function InvestorsTable() {
  const { data, isPending, isError, refetch } = useInvestors();

  return (
    <div className="space-y-4">
      {isPending && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {data && data.length === 0 && (
        <EmptyState icon={Users} title="No investors yet" />
      )}

      {data && data.length > 0 && (
        <div className="shadow-soft overflow-hidden rounded-2xl bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 font-medium">Investor</th>
                  <th className="px-5 py-3 font-medium">KYC status</th>
                  <th className="px-5 py-3 font-medium">Total invested</th>
                  <th className="px-5 py-3 font-medium">Properties</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.map((investor) => {
                  const kyc = KYC_BADGE[investor.kycStatus];
                  return (
                    <tr key={investor.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{investor.name}</p>
                        <p className="text-xs text-muted-foreground">{investor.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={kyc.variant}>{kyc.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        {formatNairaFull(investor.totalInvested)}
                      </td>
                      <td className="px-5 py-4 text-foreground">{investor.propertiesCount}</td>
                      <td className="px-5 py-4 text-muted-foreground">{investor.joinedAt}</td>
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
