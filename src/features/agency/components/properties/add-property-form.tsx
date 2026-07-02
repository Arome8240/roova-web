"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { firstFieldErrors } from "@/lib/utils";
import { useCreateProperty } from "@/features/agency/mutations";
import { createPropertyInputSchema } from "@/features/agency/schemas";

type FormValues = {
  title: string;
  location: string;
  tier: "Gold tier" | "Silver tier";
  target: string;
  sharePrice: string;
  yieldPct: string;
  daysRemaining: string;
};

const INITIAL_VALUES: FormValues = {
  title: "",
  location: "",
  tier: "Gold tier",
  target: "",
  sharePrice: "50000",
  yieldPct: "",
  daysRemaining: "30",
};

export function AddPropertyForm() {
  const router = useRouter();
  const createProperty = useCreateProperty();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = createPropertyInputSchema.safeParse(values);
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    createProperty.mutate(result.data, {
      onSuccess: (property) => router.push(`/agency/properties/${property.id}`),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="shadow-soft space-y-5 rounded-2xl bg-card p-6"
    >
      <FormField label="Property name" htmlFor="title" error={errors.title}>
        <Input
          id="title"
          placeholder="e.g. Yaba Court Residences"
          value={values.title}
          onChange={(event) => setValues((v) => ({ ...v, title: event.target.value }))}
        />
      </FormField>

      <FormField label="Location" htmlFor="location" error={errors.location}>
        <Input
          id="location"
          placeholder="e.g. Yaba, Lagos"
          value={values.location}
          onChange={(event) => setValues((v) => ({ ...v, location: event.target.value }))}
        />
      </FormField>

      <FormField label="Tier" htmlFor="tier" error={errors.tier}>
        <Select
          id="tier"
          value={values.tier}
          onChange={(event) =>
            setValues((v) => ({ ...v, tier: event.target.value as FormValues["tier"] }))
          }
        >
          <option value="Gold tier">Gold tier</option>
          <option value="Silver tier">Silver tier</option>
        </Select>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Funding target (₦)" htmlFor="target" error={errors.target}>
          <Input
            id="target"
            type="number"
            min="0"
            placeholder="240000000"
            value={values.target}
            onChange={(event) => setValues((v) => ({ ...v, target: event.target.value }))}
          />
        </FormField>

        <FormField label="Share price (₦)" htmlFor="sharePrice" error={errors.sharePrice}>
          <Input
            id="sharePrice"
            type="number"
            min="0"
            value={values.sharePrice}
            onChange={(event) => setValues((v) => ({ ...v, sharePrice: event.target.value }))}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Projected annual yield (%)" htmlFor="yieldPct" error={errors.yieldPct}>
          <Input
            id="yieldPct"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="11.5"
            value={values.yieldPct}
            onChange={(event) => setValues((v) => ({ ...v, yieldPct: event.target.value }))}
          />
        </FormField>

        <FormField label="Funding window (days)" htmlFor="daysRemaining" error={errors.daysRemaining}>
          <Input
            id="daysRemaining"
            type="number"
            min="1"
            value={values.daysRemaining}
            onChange={(event) =>
              setValues((v) => ({ ...v, daysRemaining: event.target.value }))
            }
          />
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/agency/properties")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={createProperty.isPending}>
          {createProperty.isPending ? "Creating…" : "Create listing"}
        </Button>
      </div>
    </form>
  );
}
