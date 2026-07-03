import { z } from "zod";

export const agencyStatusSchema = z.enum(["pending", "active", "suspended"]);
export type AgencyStatus = z.infer<typeof agencyStatusSchema>;

export const agencySchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string(),
  status: agencyStatusSchema,
  email: z.string(),
  joinedAt: z.string(),
  propertiesCount: z.number(),
  totalRaised: z.number(),
  investorsCount: z.number(),
  commissionEarned: z.number(),
});
export type Agency = z.infer<typeof agencySchema>;

export const adminPropertyStatusSchema = z.enum(["draft", "live", "funded", "rejected"]);
export type AdminPropertyStatus = z.infer<typeof adminPropertyStatusSchema>;

export const adminPropertySchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string(),
  agencyName: z.string(),
  tier: z.string(),
  status: adminPropertyStatusSchema,
  yieldPct: z.number(),
  raised: z.number(),
  target: z.number(),
  investors: z.number(),
  sharePrice: z.number(),
  submittedAt: z.string(),
});
export type AdminProperty = z.infer<typeof adminPropertySchema>;

export const kycStatusSchema = z.enum(["verified", "pending", "rejected"]);
export type KycStatus = z.infer<typeof kycStatusSchema>;

export const investorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  kycStatus: kycStatusSchema,
  totalInvested: z.number(),
  propertiesCount: z.number(),
  joinedAt: z.string(),
});
export type Investor = z.infer<typeof investorSchema>;

export const transactionTypeSchema = z.enum([
  "investment",
  "commission_payout",
  "dividend_payout",
  "withdrawal",
]);
export type TransactionType = z.infer<typeof transactionTypeSchema>;

export const transactionSchema = z.object({
  id: z.string(),
  type: transactionTypeSchema,
  party: z.string(),
  amount: z.number(),
  date: z.string(),
  status: z.enum(["completed", "pending"]),
});
export type Transaction = z.infer<typeof transactionSchema>;

export const overviewStatsSchema = z.object({
  totalRaised: z.number(),
  totalAgencies: z.number(),
  totalProperties: z.number(),
  totalInvestors: z.number(),
  platformRevenue: z.number(),
  pendingApprovals: z.number(),
});
export type OverviewStats = z.infer<typeof overviewStatsSchema>;

export const fundingPointSchema = z.object({
  month: z.string(),
  amount: z.number(),
});
export type FundingPoint = z.infer<typeof fundingPointSchema>;

export const notificationTypeSchema = z.enum([
  "agency_application",
  "property_submitted",
  "kyc_flagged",
  "large_transaction",
  "system",
]);
export type NotificationType = z.infer<typeof notificationTypeSchema>;

export const notificationSchema = z.object({
  id: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  timestamp: z.string(),
  read: z.boolean(),
});
export type Notification = z.infer<typeof notificationSchema>;

export const adminSettingsSchema = z.object({
  platformName: z.string().min(2, "Enter a platform name"),
  supportEmail: z.string().email("Enter a valid email address"),
  defaultCommissionPct: z.coerce
    .number()
    .positive("Enter a commission rate greater than zero")
    .max(100, "Enter a realistic percentage"),
});
export type AdminSettings = z.infer<typeof adminSettingsSchema>;
