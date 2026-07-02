import { TrendingUp, UserPlus, Wallet, AlertTriangle, Info, type LucideIcon } from "lucide-react";
import type { NotificationType } from "@/features/agency/schemas";

export const NOTIFICATION_ICON: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  funding_milestone: { icon: TrendingUp, className: "bg-success/10 text-success" },
  new_investor: { icon: UserPlus, className: "bg-primary/10 text-primary" },
  commission_payout: { icon: Wallet, className: "bg-success/10 text-success" },
  kyc_alert: { icon: AlertTriangle, className: "bg-amber-100 text-amber-600" },
  system: { icon: Info, className: "bg-muted text-muted-foreground" },
};
