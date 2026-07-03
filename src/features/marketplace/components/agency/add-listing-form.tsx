"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { firstFieldErrors, cn } from "@/lib/utils";
import { useCreateListing } from "@/features/marketplace/mutations";
import { createListingInputSchema } from "@/features/marketplace/schemas";
import { CURRENT_AGENCY_NAME } from "@/features/marketplace/components/agency/constants";

const DURATION_OPTIONS = [6, 12, 24];

type FormValues = {
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
  allowsInstallment: boolean;
  downPaymentPct: string;
  installmentMonths: number[];
};

const INITIAL_VALUES: FormValues = {
  title: "",
  location: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  description: "",
  allowsInstallment: false,
  downPaymentPct: "20",
  installmentMonths: [],
};

export function AddListingForm() {
  const router = useRouter();
  const createListing = useCreateListing();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleMonth(month: number) {
    setValues((v) => ({
      ...v,
      installmentMonths: v.installmentMonths.includes(month)
        ? v.installmentMonths.filter((m) => m !== month)
        : [...v.installmentMonths, month].sort((a, b) => a - b),
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = createListingInputSchema.safeParse(values);
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    createListing.mutate(
      { ...result.data, agencyName: CURRENT_AGENCY_NAME },
      { onSuccess: (listing) => router.push(`/marketplace/${listing.id}`) },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="shadow-soft space-y-5 rounded-2xl bg-card p-6"
    >
      <FormField label="Listing title" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          placeholder="e.g. 4-Bedroom Detached Duplex"
          value={values.title}
          onChange={(event) => setValues((v) => ({ ...v, title: event.target.value }))}
        />
      </FormField>

      <FormField label="Location" htmlFor="location" error={errors.location}>
        <Input
          id="location"
          placeholder="e.g. Lekki, Lagos"
          value={values.location}
          onChange={(event) => setValues((v) => ({ ...v, location: event.target.value }))}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Price (₦)" htmlFor="price" error={errors.price}>
          <Input
            id="price"
            type="number"
            min="0"
            value={values.price}
            onChange={(event) => setValues((v) => ({ ...v, price: event.target.value }))}
          />
        </FormField>
        <FormField label="Bedrooms" htmlFor="bedrooms" error={errors.bedrooms}>
          <Input
            id="bedrooms"
            type="number"
            min="1"
            value={values.bedrooms}
            onChange={(event) => setValues((v) => ({ ...v, bedrooms: event.target.value }))}
          />
        </FormField>
        <FormField label="Bathrooms" htmlFor="bathrooms" error={errors.bathrooms}>
          <Input
            id="bathrooms"
            type="number"
            min="1"
            value={values.bathrooms}
            onChange={(event) => setValues((v) => ({ ...v, bathrooms: event.target.value }))}
          />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description" error={errors.description}>
        <Textarea
          id="description"
          rows={4}
          value={values.description}
          onChange={(event) => setValues((v) => ({ ...v, description: event.target.value }))}
        />
      </FormField>

      <div className="flex items-center gap-2">
        <Checkbox
          id="allowsInstallment"
          checked={values.allowsInstallment}
          onCheckedChange={(checked) =>
            setValues((v) => ({ ...v, allowsInstallment: checked === true }))
          }
        />
        <Label htmlFor="allowsInstallment" className="font-normal text-muted-foreground">
          Allow installment payments
        </Label>
      </div>

      {values.allowsInstallment && (
        <div className="space-y-4 rounded-xl bg-background p-4">
          <FormField
            label="Down payment (%)"
            htmlFor="downPaymentPct"
            error={errors.downPaymentPct}
          >
            <Input
              id="downPaymentPct"
              type="number"
              min="0"
              max="100"
              value={values.downPaymentPct}
              onChange={(event) =>
                setValues((v) => ({ ...v, downPaymentPct: event.target.value }))
              }
            />
          </FormField>

          <div>
            <Label>Available durations</Label>
            <div className="mt-2 flex gap-2">
              {DURATION_OPTIONS.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => toggleMonth(month)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    values.installmentMonths.includes(month)
                      ? "bg-primary text-primary-foreground"
                      : "shadow-ring bg-card text-foreground",
                  )}
                >
                  {month} months
                </button>
              ))}
            </div>
            {errors.installmentMonths && (
              <p className="mt-1.5 text-xs text-red-600">{errors.installmentMonths}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/marketplace")}>
          Cancel
        </Button>
        <Button type="submit" disabled={createListing.isPending}>
          {createListing.isPending ? "Submitting…" : "Submit listing"}
        </Button>
      </div>
    </form>
  );
}
