import { z } from "zod";
import { simulateNetwork } from "@/lib/simulate";
import {
  marketplaceListingSchema,
  purchaseOfferSchema,
  type MarketplaceListing,
  type CreateListingInput,
  type PurchaseOffer,
  type CreateOfferInput,
} from "@/features/marketplace/schemas";
import { listings, purchaseOffers } from "@/features/marketplace/data";

function slugify(title: string, existing: { id: string }[]) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let id = base;
  let suffix = 2;
  while (existing.some((item) => item.id === id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export async function getListings() {
  const res = await simulateNetwork(listings);
  return z.array(marketplaceListingSchema).parse(res);
}

export async function getListing(id: string) {
  const listing = listings.find((l) => l.id === id);
  if (!listing) return null;
  const res = await simulateNetwork(listing);
  return marketplaceListingSchema.parse(res);
}

export async function createListing(
  input: CreateListingInput & { agencyName: string },
): Promise<MarketplaceListing> {
  const listing: MarketplaceListing = {
    id: slugify(input.title, listings),
    title: input.title,
    location: input.location,
    agencyName: input.agencyName,
    price: input.price,
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    description: input.description,
    imageUrl:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    status: "pending",
    allowsInstallment: input.allowsInstallment,
    downPaymentPct: input.downPaymentPct,
    installmentMonths: input.installmentMonths,
    submittedAt: new Date().toISOString().slice(0, 10),
  };

  listings.unshift(listing);

  const res = await simulateNetwork(listing);
  return marketplaceListingSchema.parse(res);
}

export async function approveListing(id: string) {
  const listing = listings.find((l) => l.id === id);
  if (listing) listing.status = "live";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function rejectListing(id: string) {
  const listing = listings.find((l) => l.id === id);
  if (listing) listing.status = "rejected";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function markListingSold(id: string) {
  const listing = listings.find((l) => l.id === id);
  if (listing) listing.status = "sold";
  return simulateNetwork({ ok: true as const }, 400);
}

export async function getOffersForListing(listingId: string) {
  const offers = purchaseOffers.filter((o) => o.listingId === listingId);
  const res = await simulateNetwork(offers);
  return z.array(purchaseOfferSchema).parse(res);
}

export async function createOffer(
  input: CreateOfferInput & { listingId: string; listingTitle: string },
): Promise<PurchaseOffer> {
  const offer: PurchaseOffer = {
    id: `offer_${purchaseOffers.length + 1}_${Date.now().toString(36)}`,
    listingId: input.listingId,
    listingTitle: input.listingTitle,
    buyerName: input.buyerName,
    buyerEmail: input.buyerEmail,
    buyerPhone: input.buyerPhone,
    paymentPlan: input.paymentPlan,
    installmentMonths: input.installmentMonths,
    submittedAt: new Date().toISOString().slice(0, 10),
  };

  purchaseOffers.push(offer);

  const res = await simulateNetwork(offer);
  return purchaseOfferSchema.parse(res);
}
