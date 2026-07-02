import type {
  AgencyProperty,
  OverviewStats,
  FundingPoint,
  EarningsPoint,
  Payout,
  InvestorRow,
  Notification,
  AgencySettings,
} from "@/features/agency/schemas";

export const agencyProfile: AgencySettings = {
  name: "Adunni Properties",
  email: "hello@adunniproperties.com",
  phone: "+234 801 234 5678",
  payoutBank: "GTBank",
  payoutAccount: "0123456789",
};

export const properties: AgencyProperty[] = [
  {
    id: "lekki-phase-1",
    location: "Lekki, Lagos",
    title: "Lekki Phase 1 Residences",
    tier: "Gold tier",
    status: "live",
    yieldPct: 11.8,
    raised: 182_000_000,
    target: 240_000_000,
    investors: 64,
    daysRemaining: 9,
    sharePrice: 50_000,
    createdAt: "2026-03-02",
  },
  {
    id: "ikeja-heights",
    location: "Ikeja, Lagos",
    title: "Ikeja Heights Apartments",
    tier: "Gold tier",
    status: "live",
    yieldPct: 12.5,
    raised: 96_000_000,
    target: 200_000_000,
    investors: 38,
    daysRemaining: 21,
    sharePrice: 50_000,
    createdAt: "2026-04-10",
  },
  {
    id: "epe-riverside",
    location: "Epe, Lagos",
    title: "Epe Riverside Villas",
    tier: "Silver tier",
    status: "draft",
    yieldPct: 10.2,
    raised: 0,
    target: 180_000_000,
    investors: 0,
    daysRemaining: 30,
    sharePrice: 50_000,
    createdAt: "2026-06-15",
  },
  {
    id: "surulere-court",
    location: "Surulere, Lagos",
    title: "Surulere Court Residences",
    tier: "Silver tier",
    status: "funded",
    yieldPct: 9.8,
    raised: 150_000_000,
    target: 150_000_000,
    investors: 112,
    daysRemaining: 0,
    sharePrice: 50_000,
    createdAt: "2025-11-20",
  },
  {
    id: "ajah-gardens",
    location: "Ajah, Lagos",
    title: "Ajah Garden Estate",
    tier: "Gold tier",
    status: "funded",
    yieldPct: 13.1,
    raised: 210_000_000,
    target: 210_000_000,
    investors: 98,
    daysRemaining: 0,
    sharePrice: 50_000,
    createdAt: "2025-09-05",
  },
];

export const overviewStats: OverviewStats = {
  totalRaised: properties.reduce((sum, p) => sum + p.raised, 0),
  activeListings: properties.filter((p) => p.status === "live").length,
  totalInvestors: properties.reduce((sum, p) => sum + p.investors, 0),
  commissionEarned: 18_795_000,
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHLY_FUNDING = [
  18_000_000, 22_500_000, 31_000_000, 27_000_000, 42_000_000, 38_500_000, 51_000_000, 47_000_000,
  63_000_000, 58_000_000, 71_000_000, 68_000_000,
];

export const fundingSeries: FundingPoint[] = MONTHS.map((month, index) => ({
  month,
  amount: MONTHLY_FUNDING[index],
}));

export const earningsSeries: EarningsPoint[] = MONTHS.map((month, index) => ({
  month,
  commission: Math.round(MONTHLY_FUNDING[index] * 0.035),
}));

export const payouts: Payout[] = [
  { id: "po_1", date: "2026-02-28", amount: 1_645_000, status: "paid" },
  { id: "po_2", date: "2026-03-31", amount: 2_205_000, status: "paid" },
  { id: "po_3", date: "2026-04-30", amount: 2_030_000, status: "paid" },
  { id: "po_4", date: "2026-05-31", amount: 2_485_000, status: "paid" },
  { id: "po_5", date: "2026-06-30", amount: 2_380_000, status: "paid" },
  { id: "po_6", date: "2026-07-31", amount: 2_450_000, status: "pending" },
];

const INVESTOR_NAMES = [
  "Chidinma Okafor",
  "Tunde Bakare",
  "Ngozi Eze",
  "Ifeoma Chukwu",
  "Emeka Nwosu",
  "Fatima Bello",
  "Yusuf Abdullahi",
  "Aisha Mohammed",
  "Chioma Nnamdi",
  "Segun Adeyemi",
  "Grace Okonkwo",
  "David Okoro",
];

function buildInvestors(propertyId: string, count: number, sharePrice: number): InvestorRow[] {
  return Array.from({ length: count }, (_, index) => {
    const shares = 2 + ((index * 3 + propertyId.length) % 12);
    return {
      id: `${propertyId}-inv-${index + 1}`,
      name: INVESTOR_NAMES[index % INVESTOR_NAMES.length],
      shares,
      amount: shares * sharePrice,
      date: `2026-0${(index % 6) + 1}-${String(10 + index).padStart(2, "0")}`,
    };
  });
}

export const investorsByProperty: Record<string, InvestorRow[]> = Object.fromEntries(
  properties
    .filter((p) => p.investors > 0)
    .map((p) => [p.id, buildInvestors(p.id, Math.min(p.investors, 8), p.sharePrice)]),
);

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "funding_milestone",
    title: "Lekki Phase 1 Residences hit 75% funded",
    message: "Your listing has crossed 75% of its ₦240M target.",
    timestamp: "2026-07-01T09:12:00Z",
    read: false,
  },
  {
    id: "n2",
    type: "new_investor",
    title: "New investor in Ikeja Heights Apartments",
    message: "Grace Okonkwo invested ₦250,000 (5 shares).",
    timestamp: "2026-06-30T16:40:00Z",
    read: false,
  },
  {
    id: "n3",
    type: "commission_payout",
    title: "Payout sent",
    message: "₦2,485,000 commission was paid out to your account.",
    timestamp: "2026-06-28T11:00:00Z",
    read: false,
  },
  {
    id: "n4",
    type: "kyc_alert",
    title: "Action needed: KYC document expiring",
    message: "Your business registration document expires in 14 days.",
    timestamp: "2026-06-27T08:00:00Z",
    read: false,
  },
  {
    id: "n5",
    type: "system",
    title: "Scheduled maintenance",
    message: "Roova will undergo maintenance on 2026-07-05 from 1-2am WAT.",
    timestamp: "2026-06-25T18:30:00Z",
    read: true,
  },
  {
    id: "n6",
    type: "new_investor",
    title: "New investor in Surulere Court Residences",
    message: "David Okoro invested ₦500,000 (10 shares).",
    timestamp: "2026-06-24T14:15:00Z",
    read: true,
  },
  {
    id: "n7",
    type: "funding_milestone",
    title: "Ajah Garden Estate fully funded",
    message: "Congratulations — your listing reached 100% of its ₦210M target.",
    timestamp: "2026-06-20T10:05:00Z",
    read: true,
  },
  {
    id: "n8",
    type: "commission_payout",
    title: "Payout sent",
    message: "₦2,030,000 commission was paid out to your account.",
    timestamp: "2026-05-31T11:00:00Z",
    read: true,
  },
  {
    id: "n9",
    type: "system",
    title: "Welcome to Roova for Agencies",
    message: "Your agency account is now Gold tier — enjoy priority placement.",
    timestamp: "2026-05-20T09:00:00Z",
    read: true,
  },
  {
    id: "n10",
    type: "new_investor",
    title: "New investor in Lekki Phase 1 Residences",
    message: "Fatima Bello invested ₦150,000 (3 shares).",
    timestamp: "2026-05-18T13:22:00Z",
    read: true,
  },
];
