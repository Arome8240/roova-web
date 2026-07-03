import { useQuery } from "@tanstack/react-query";
import {
  getOverview,
  getFundingSeries,
  getAgencies,
  getProperties,
  getProperty,
  getInvestors,
  getTransactions,
  getNotifications,
  getAdminSettings,
} from "@/features/admin/api";

export const adminKeys = {
  all: ["admin"] as const,
  overview: () => [...adminKeys.all, "overview"] as const,
  fundingSeries: () => [...adminKeys.all, "funding-series"] as const,
  agencies: () => [...adminKeys.all, "agencies"] as const,
  properties: () => [...adminKeys.all, "properties"] as const,
  property: (id: string) => [...adminKeys.all, "properties", id] as const,
  investors: () => [...adminKeys.all, "investors"] as const,
  transactions: () => [...adminKeys.all, "transactions"] as const,
  notifications: () => [...adminKeys.all, "notifications"] as const,
  settings: () => [...adminKeys.all, "settings"] as const,
};

export function useOverview() {
  return useQuery({ queryKey: adminKeys.overview(), queryFn: getOverview });
}

export function useFundingSeries() {
  return useQuery({ queryKey: adminKeys.fundingSeries(), queryFn: getFundingSeries });
}

export function useAgencies() {
  return useQuery({ queryKey: adminKeys.agencies(), queryFn: getAgencies });
}

export function useProperties() {
  return useQuery({ queryKey: adminKeys.properties(), queryFn: getProperties });
}

export function useProperty(id: string) {
  return useQuery({ queryKey: adminKeys.property(id), queryFn: () => getProperty(id) });
}

export function useInvestors() {
  return useQuery({ queryKey: adminKeys.investors(), queryFn: getInvestors });
}

export function useTransactions() {
  return useQuery({ queryKey: adminKeys.transactions(), queryFn: getTransactions });
}

export function useNotifications() {
  return useQuery({ queryKey: adminKeys.notifications(), queryFn: getNotifications });
}

export function useAdminSettings() {
  return useQuery({ queryKey: adminKeys.settings(), queryFn: getAdminSettings });
}
