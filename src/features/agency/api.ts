import { z } from "zod";
import { simulateNetwork } from "@/lib/simulate";
import {
  overviewStatsSchema,
  agencyPropertySchema,
  fundingPointSchema,
  earningsPointSchema,
  payoutSchema,
  investorRowSchema,
  notificationSchema,
  agencySettingsSchema,
  type AgencySettings,
  type AgencyProperty,
  type CreatePropertyInput,
} from "@/features/agency/schemas";
import {
  overviewStats,
  properties,
  fundingSeries,
  earningsSeries,
  payouts,
  investorsByProperty,
  notifications,
  agencyProfile,
} from "@/features/agency/data";

export async function getOverview() {
  const res = await simulateNetwork(overviewStats);
  return overviewStatsSchema.parse(res);
}

export async function getFundingSeries() {
  const res = await simulateNetwork(fundingSeries);
  return z.array(fundingPointSchema).parse(res);
}

export async function getProperties() {
  const res = await simulateNetwork(properties);
  return z.array(agencyPropertySchema).parse(res);
}

export async function getProperty(id: string) {
  const property = properties.find((p) => p.id === id);
  if (!property) return null;

  const res = await simulateNetwork({
    property,
    investors: investorsByProperty[id] ?? [],
  });

  return {
    property: agencyPropertySchema.parse(res.property),
    investors: z.array(investorRowSchema).parse(res.investors),
  };
}

export async function getEarnings() {
  const res = await simulateNetwork({ series: earningsSeries, payouts });
  return {
    series: z.array(earningsPointSchema).parse(res.series),
    payouts: z.array(payoutSchema).parse(res.payouts),
  };
}

export async function getNotifications() {
  const res = await simulateNetwork(notifications);
  return z.array(notificationSchema).parse(res);
}

export async function markNotificationRead(id: string) {
  const notification = notifications.find((n) => n.id === id);
  if (notification) notification.read = true;
  return simulateNetwork({ ok: true as const }, 250);
}

export async function markAllNotificationsRead() {
  notifications.forEach((n) => {
    n.read = true;
  });
  return simulateNetwork({ ok: true as const }, 250);
}

function slugify(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let id = base;
  let suffix = 2;
  while (properties.some((p) => p.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export async function createProperty(input: CreatePropertyInput): Promise<AgencyProperty> {
  const property: AgencyProperty = {
    id: slugify(input.title),
    location: input.location,
    title: input.title,
    tier: input.tier,
    status: "draft",
    yieldPct: input.yieldPct,
    raised: 0,
    target: input.target,
    investors: 0,
    daysRemaining: input.daysRemaining,
    sharePrice: input.sharePrice,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  properties.unshift(property);

  const res = await simulateNetwork(property);
  return agencyPropertySchema.parse(res);
}

export async function getAgencySettings() {
  const res = await simulateNetwork(agencyProfile);
  return agencySettingsSchema.parse(res);
}

export async function updateAgencySettings(input: AgencySettings) {
  Object.assign(agencyProfile, input);
  const res = await simulateNetwork(agencyProfile);
  return agencySettingsSchema.parse(res);
}
