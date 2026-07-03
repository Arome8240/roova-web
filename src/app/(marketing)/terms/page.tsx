import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Roova",
};

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By creating an account or using Roova, you agree to these Terms of Service and our Privacy Policy. If you don't agree, please don't use the platform.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 18 years old and able to complete identity verification (KYC) to invest on Roova. Agencies must be a registered legal entity to list properties.",
  },
  {
    title: "Account registration & KYC",
    body: "You're responsible for keeping your account credentials secure and for the accuracy of the information you provide during registration and identity verification.",
  },
  {
    title: "Investment risks",
    body: "Investing through Roova carries risk, including possible loss of capital. Property values can fall as well as rise, and past performance is not a guarantee of future returns. See our Risk disclosure for details.",
  },
  {
    title: "Fees",
    body: "Roova charges fees as described on our Commission & fees page. Fees may change from time to time; we'll notify you of material changes in advance.",
  },
  {
    title: "Secondary market conduct",
    body: "When trading shares on the secondary market, you agree to act in good faith and not to manipulate pricing or engage in fraudulent transactions. Roova may suspend trading privileges for accounts that violate this.",
  },
  {
    title: "Termination",
    body: "You may close your account at any time, subject to settling any pending transactions. Roova may suspend or terminate accounts that violate these terms or applicable law.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law principles.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of Roova after a change takes effect constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to support@roova.com.",
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" lastUpdated="3 July 2026" sections={SECTIONS} />;
}
