"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { firstFieldErrors, formatNairaFull, cn } from "@/lib/utils";
import { useCreateOffer } from "@/features/marketplace/mutations";
import {
  createOfferInputSchema,
  type CreateOfferInput,
  type MarketplaceListing,
} from "@/features/marketplace/schemas";

export function OfferForm({ listing }: { listing: MarketplaceListing }) {
  const createOffer = useCreateOffer();
  const [paymentPlan, setPaymentPlan] = useState<"full" | "installment">("full");
  const [months, setMonths] = useState<number | null>(listing.installmentMonths[0] ?? null);
  const [values, setValues] = useState({ buyerName: "", buyerEmail: "", buyerPhone: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateOfferInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const downPayment = (listing.price * listing.downPaymentPct) / 100;
  const monthlyAmount = months ? (listing.price - downPayment) / months : 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = createOfferInputSchema.safeParse({
      ...values,
      paymentPlan,
      installmentMonths: paymentPlan === "installment" ? months : null,
    });
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    createOffer.mutate(
      { ...result.data, listingId: listing.id, listingTitle: listing.title },
      { onSuccess: () => setSubmitted(true) },
    );
  }

  if (submitted) {
    return (
      <div className="shadow-soft space-y-3 rounded-2xl bg-card p-6 text-center">
        <p className="font-medium text-foreground">Offer sent</p>
        <p className="text-sm text-muted-foreground">
          {listing.agencyName} will reach out to you shortly to continue with your{" "}
          {paymentPlan === "full" ? "full payment" : `${months}-month installment plan`}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="shadow-soft space-y-5 rounded-2xl bg-card p-6"
    >
      <h2 className="font-medium tracking-[-0.01em] text-foreground">
        Choose how you&apos;d like to pay
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPaymentPlan("full")}
          className={cn(
            "rounded-xl p-4 text-left transition-colors",
            paymentPlan === "full" ? "shadow-ring bg-primary/10" : "shadow-ring bg-background",
          )}
        >
          <p className="text-sm font-medium text-foreground">Pay in full</p>
          <p className="mt-1 text-xs text-muted-foreground">{formatNairaFull(listing.price)}</p>
        </button>

        <button
          type="button"
          disabled={!listing.allowsInstallment}
          onClick={() => setPaymentPlan("installment")}
          className={cn(
            "rounded-xl p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40",
            paymentPlan === "installment"
              ? "shadow-ring bg-primary/10"
              : "shadow-ring bg-background",
          )}
        >
          <p className="text-sm font-medium text-foreground">Installment plan</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {listing.allowsInstallment ? `From ${listing.downPaymentPct}% down` : "Not available"}
          </p>
        </button>
      </div>

      {paymentPlan === "installment" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {listing.installmentMonths.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  months === m
                    ? "bg-primary text-primary-foreground"
                    : "shadow-ring bg-background text-foreground",
                )}
              >
                {m} months
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-background p-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Down payment ({listing.downPaymentPct}%)</span>
              <span className="font-medium text-foreground">{formatNairaFull(downPayment)}</span>
            </div>
            <div className="mt-1 flex justify-between text-muted-foreground">
              <span>Monthly payment</span>
              <span className="font-medium text-foreground">
                {formatNairaFull(Math.round(monthlyAmount))}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 border-t border-border pt-4">
        <FormField label="Full name" htmlFor="buyerName" error={errors.buyerName}>
          <Input
            id="buyerName"
            value={values.buyerName}
            onChange={(event) => setValues((v) => ({ ...v, buyerName: event.target.value }))}
          />
        </FormField>
        <FormField label="Email" htmlFor="buyerEmail" error={errors.buyerEmail}>
          <Input
            id="buyerEmail"
            type="email"
            value={values.buyerEmail}
            onChange={(event) => setValues((v) => ({ ...v, buyerEmail: event.target.value }))}
          />
        </FormField>
        <FormField label="Phone" htmlFor="buyerPhone" error={errors.buyerPhone}>
          <Input
            id="buyerPhone"
            value={values.buyerPhone}
            onChange={(event) => setValues((v) => ({ ...v, buyerPhone: event.target.value }))}
          />
        </FormField>
      </div>

      <Button type="submit" className="w-full" disabled={createOffer.isPending}>
        {createOffer.isPending ? "Sending…" : "Send offer"}
      </Button>
    </form>
  );
}
