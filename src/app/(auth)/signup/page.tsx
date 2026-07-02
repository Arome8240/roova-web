import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign up — Roova",
};

export default function SignupPage() {
  return (
    <AuthCard title="Create your account" subtitle="Own a piece of Lagos for ₦50,000.">
      <SignupForm />
    </AuthCard>
  );
}
