import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log in — Roova",
};

export default function LoginPage() {
  return (
    <AuthCard title="Log in" subtitle="Welcome back. Enter your details to continue.">
      <LoginForm />
    </AuthCard>
  );
}
