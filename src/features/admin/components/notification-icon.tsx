import {
  Building,
  FilePlus2,
  ShieldAlert,
  TrendingUp,
  Info,
  type LucideIcon,
} from "lucide-react";
import type { NotificationType } from "@/features/admin/schemas";

export const NOTIFICATION_ICON: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  agency_application: { icon: Building, className: "bg-primary/10 text-primary" },
  property_submitted: { icon: FilePlus2, className: "bg-primary/10 text-primary" },
  kyc_flagged: { icon: ShieldAlert, className: "bg-amber-100 text-amber-600" },
  large_transaction: { icon: TrendingUp, className: "bg-success/10 text-success" },
  system: { icon: Info, className: "bg-muted text-muted-foreground" },
};
