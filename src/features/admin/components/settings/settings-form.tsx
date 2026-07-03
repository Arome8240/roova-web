"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { firstFieldErrors } from "@/lib/utils";
import { useAdminSettings } from "@/features/admin/queries";
import { useUpdateAdminSettings } from "@/features/admin/mutations";
import { adminSettingsSchema, type AdminSettings } from "@/features/admin/schemas";

export function SettingsForm() {
  const { data, isPending } = useAdminSettings();

  if (isPending || !data) {
    return (
      <div className="shadow-soft space-y-4 rounded-2xl bg-card p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return <SettingsFields initial={data} />;
}

function SettingsFields({ initial }: { initial: AdminSettings }) {
  const updateSettings = useUpdateAdminSettings();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof AdminSettings, string>>>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = adminSettingsSchema.safeParse(values);
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
      <FormField label="Platform name" htmlFor="platformName" error={errors.platformName}>
        <Input
          id="platformName"
          value={values.platformName}
          onChange={(event) =>
            setValues((v) => ({ ...v, platformName: event.target.value }))
          }
        />
      </FormField>

      <FormField label="Support email" htmlFor="supportEmail" error={errors.supportEmail}>
        <Input
          id="supportEmail"
          type="email"
          value={values.supportEmail}
          onChange={(event) =>
            setValues((v) => ({ ...v, supportEmail: event.target.value }))
          }
        />
      </FormField>

      <FormField
        label="Default commission rate (%)"
        htmlFor="defaultCommissionPct"
        error={errors.defaultCommissionPct}
      >
        <Input
          id="defaultCommissionPct"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={values.defaultCommissionPct}
          onChange={(event) =>
            setValues((v) => ({ ...v, defaultCommissionPct: Number(event.target.value) }))
          }
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
