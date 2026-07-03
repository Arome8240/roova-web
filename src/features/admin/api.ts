import { z } from "zod";
import { simulateNetwork } from "@/lib/simulate";
import {
  overviewStatsSchema,
  fundingPointSchema,
  agencySchema,
  adminPropertySchema,
  investorSchema,
  transactionSchema,
  notificationSchema,
  adminSettingsSchema,
} from "@/features/admin/schemas";
import {
  overviewStats,
  fundingSeries,
  agencies,
  properties,
  investors,
  transactions,
  notifications,
  adminProfile,
} from "@/features/admin/data";

export async function getOverview() {
  const res = await simulateNetwork(overviewStats);
  return overviewStatsSchema.parse(res);
}

export async function getFundingSeries() {
  const res = await simulateNetwork(fundingSeries);
  return z.array(fundingPointSchema).parse(res);
}

export async function getAgencies() {
  const res = await simulateNetwork(agencies);
  return z.array(agencySchema).parse(res);
}

export async function approveAgency(id: string) {
  const agency = agencies.find((a) => a.id === id);
  if (agency) agency.status = "active";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function suspendAgency(id: string) {
  const agency = agencies.find((a) => a.id === id);
  if (agency) agency.status = "suspended";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function reactivateAgency(id: string) {
  const agency = agencies.find((a) => a.id === id);
  if (agency) agency.status = "active";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function getProperties() {
  const res = await simulateNetwork(properties);
  return z.array(adminPropertySchema).parse(res);
}

export async function getProperty(id: string) {
  const property = properties.find((p) => p.id === id);
  if (!property) return null;
  const res = await simulateNetwork(property);
  return adminPropertySchema.parse(res);
}

export async function approveProperty(id: string) {
  const property = properties.find((p) => p.id === id);
  if (property) property.status = "live";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function rejectProperty(id: string) {
  const property = properties.find((p) => p.id === id);
  if (property) property.status = "rejected";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function getInvestors() {
  const res = await simulateNetwork(investors);
  return z.array(investorSchema).parse(res);
}

export async function getTransactions() {
  const res = await simulateNetwork(transactions);
  return z.array(transactionSchema).parse(res);
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

export async function getAdminSettings() {
  const res = await simulateNetwork(adminProfile);
  return adminSettingsSchema.parse(res);
}

export async function updateAdminSettings(input: z.infer<typeof adminSettingsSchema>) {
  Object.assign(adminProfile, input);
  const res = await simulateNetwork(adminProfile);
  return adminSettingsSchema.parse(res);
}
