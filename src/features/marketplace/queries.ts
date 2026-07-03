import { useQuery } from "@tanstack/react-query";
import { getListings, getListing, getOffersForListing } from "@/features/marketplace/api";

export const marketplaceKeys = {
  all: ["marketplace"] as const,
  listings: () => [...marketplaceKeys.all, "listings"] as const,
  listing: (id: string) => [...marketplaceKeys.all, "listings", id] as const,
  offers: (listingId: string) => [...marketplaceKeys.all, "offers", listingId] as const,
};

export function useListings() {
  return useQuery({ queryKey: marketplaceKeys.listings(), queryFn: getListings });
}

export function useListing(id: string) {
  return useQuery({ queryKey: marketplaceKeys.listing(id), queryFn: () => getListing(id) });
}

export function useOffersForListing(listingId: string) {
  return useQuery({
    queryKey: marketplaceKeys.offers(listingId),
    queryFn: () => getOffersForListing(listingId),
  });
}
