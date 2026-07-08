"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { firstFieldErrors } from "@/lib/utils";
import { AGENCY_URL } from "@/lib/urls";
import { useLogin } from "@/features/auth/mutations";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const login = useLogin();
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    login.mutate(result.data, {
      onSuccess: () => (redirectTo ? router.push(redirectTo) : (window.location.href = AGENCY_URL)),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField label="Email" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
        />
      </FormField>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={values.remember}
            onCheckedChange={(checked) =>
              setValues((v) => ({ ...v, remember: checked === true }))
            }
          />
          <Label htmlFor="remember" className="font-normal text-muted-foreground">
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
        {login.isPending ? "Logging in…" : "Log in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
          Sign up
        </Link>
      </p>
    </form>
  );
}
