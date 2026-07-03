import { z } from "zod";

export const listingStatusSchema = z.enum(["pending", "live", "sold", "rejected"]);
export type ListingStatus = z.infer<typeof listingStatusSchema>;

export const marketplaceListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string(),
  agencyName: z.string(),
  price: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  description: z.string(),
  imageUrl: z.string(),
  status: listingStatusSchema,
  allowsInstallment: z.boolean(),
  downPaymentPct: z.number(),
  installmentMonths: z.array(z.number()),
  submittedAt: z.string(),
});
export type MarketplaceListing = z.infer<typeof marketplaceListingSchema>;

export const createListingInputSchema = z
  .object({
    title: z.string().min(3, "Enter a listing title"),
    location: z.string().min(2, "Enter a location"),
    price: z.coerce.number().positive("Enter a price greater than zero"),
    bedrooms: z.coerce.number().int().positive("Enter the number of bedrooms"),
    bathrooms: z.coerce.number().int().positive("Enter the number of bathrooms"),
    description: z.string().min(20, "Add a short description (at least 20 characters)"),
    allowsInstallment: z.boolean(),
    downPaymentPct: z.coerce.number().min(0, "Enter a percentage").max(100, "Enter a realistic percentage"),
    installmentMonths: z.array(z.number()),
  })
  .refine((data) => !data.allowsInstallment || data.installmentMonths.length > 0, {
    message: "Select at least one installment duration",
    path: ["installmentMonths"],
  });
export type CreateListingInput = z.infer<typeof createListingInputSchema>;

export const paymentPlanTypeSchema = z.enum(["full", "installment"]);
export type PaymentPlanType = z.infer<typeof paymentPlanTypeSchema>;

export const purchaseOfferSchema = z.object({
  id: z.string(),
  listingId: z.string(),
  listingTitle: z.string(),
  buyerName: z.string(),
  buyerEmail: z.string(),
  buyerPhone: z.string(),
  paymentPlan: paymentPlanTypeSchema,
  installmentMonths: z.number().nullable(),
  submittedAt: z.string(),
});
export type PurchaseOffer = z.infer<typeof purchaseOfferSchema>;

export const createOfferInputSchema = z.object({
  buyerName: z.string().min(2, "Enter your name"),
  buyerEmail: z.string().email("Enter a valid email address"),
  buyerPhone: z.string().min(7, "Enter a valid phone number"),
  paymentPlan: paymentPlanTypeSchema,
  installmentMonths: z.number().nullable(),
});
export type CreateOfferInput = z.infer<typeof createOfferInputSchema>;
