"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { firstFieldErrors } from "@/lib/utils";
import { useAgencySettings } from "@/features/agency/queries";
import { useUpdateAgencySettings } from "@/features/agency/mutations";
import { agencySettingsSchema, type AgencySettings } from "@/features/agency/schemas";

export function SettingsForm() {
  const { data, isPending } = useAgencySettings();

  if (isPending || !data) {
    return (
      <div className="shadow-soft space-y-4 rounded-2xl bg-card p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return <SettingsFields initial={data} />;
}

function SettingsFields({ initial }: { initial: AgencySettings }) {
  const updateSettings = useUpdateAgencySettings();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof AgencySettings, string>>>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = agencySettingsSchema.safeParse(values);
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    updateSettings.mutate(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="shadow-soft space-y-5 rounded-2xl bg-card p-6"
    >
      <FormField label="Agency name" htmlFor="name" error={errors.name}>
        <Input
          id="name"
          value={values.name}
          onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
        />
      </FormField>

      <FormField label="Contact email" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
        />
      </FormField>

      <FormField label="Contact phone" htmlFor="phone" error={errors.phone}>
        <Input
          id="phone"
          value={values.phone}
          onChange={(event) => setValues((v) => ({ ...v, phone: event.target.value }))}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Payout bank" htmlFor="payoutBank" error={errors.payoutBank}>
          <Input
            id="payoutBank"
            value={values.payoutBank}
            onChange={(event) =>
              setValues((v) => ({ ...v, payoutBank: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Payout account number" htmlFor="payoutAccount" error={errors.payoutAccount}>
          <Input
            id="payoutAccount"
            value={values.payoutAccount}
            onChange={(event) =>
              setValues((v) => ({ ...v, payoutAccount: event.target.value }))
            }
          />
        </FormField>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
