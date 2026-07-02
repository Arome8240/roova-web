import { useQuery } from "@tanstack/react-query";
import {
  getOverview,
  getFundingSeries,
  getProperties,
  getProperty,
  getEarnings,
  getNotifications,
  getAgencySettings,
} from "@/features/agency/api";

export const agencyKeys = {
  all: ["agency"] as const,
  overview: () => [...agencyKeys.all, "overview"] as const,
  fundingSeries: () => [...agencyKeys.all, "funding-series"] as const,
  properties: () => [...agencyKeys.all, "properties"] as const,
  property: (id: string) => [...agencyKeys.all, "properties", id] as const,
  earnings: () => [...agencyKeys.all, "earnings"] as const,
  notifications: () => [...agencyKeys.all, "notifications"] as const,
  settings: () => [...agencyKeys.all, "settings"] as const,
};

export function useOverview() {
  return useQuery({ queryKey: agencyKeys.overview(), queryFn: getOverview });
}

export function useFundingSeries() {
  return useQuery({ queryKey: agencyKeys.fundingSeries(), queryFn: getFundingSeries });
}

export function useProperties() {
  return useQuery({ queryKey: agencyKeys.properties(), queryFn: getProperties });
}

export function useProperty(id: string) {
  return useQuery({ queryKey: agencyKeys.property(id), queryFn: () => getProperty(id) });
}

export function useEarnings() {
  return useQuery({ queryKey: agencyKeys.earnings(), queryFn: getEarnings });
}

export function useNotifications() {
  return useQuery({ queryKey: agencyKeys.notifications(), queryFn: getNotifications });
}

export function useAgencySettings() {
  return useQuery({ queryKey: agencyKeys.settings(), queryFn: getAgencySettings });
}
