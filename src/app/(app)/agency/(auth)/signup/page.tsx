import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign up — Agency Dashboard | Roova",
};

export default function AgencySignupPage() {
  return (
    <AuthCard
      title="Create your agency account"
      subtitle="List properties and manage funding rounds from one dashboard."
    >
      <SignupForm redirectTo="/" />
    </AuthCard>
  );
}
