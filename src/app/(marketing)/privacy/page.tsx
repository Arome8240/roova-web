import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Roova",
};

const SECTIONS = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly — name, email, phone number, identity documents for KYC — along with information about how you use the platform, such as investment activity and login history.",
  },
  {
    title: "How we use your information",
    body: "We use your information to operate your account, process investments and payouts, verify your identity, communicate with you, and comply with regulatory requirements.",
  },
  {
    title: "KYC & identity verification",
    body: "Identity documents you submit are used solely for verification purposes, in line with SEC Nigeria requirements, and are shared only with the verification providers we work with.",
  },
  {
    title: "Data sharing",
    body: "We don't sell your personal data. We share information with service providers who help us operate the platform (payment processors, verification providers, cloud hosting) under confidentiality obligations, and with regulators where required by law.",
  },
  {
    title: "Data security",
    body: "We encrypt data in transit and at rest and restrict access to personal information to authorised personnel who need it to do their job.",
  },
  {
    title: "Your rights",
    body: "You can request a copy of the personal data we hold about you, ask us to correct inaccurate information, or request account deletion, subject to our regulatory record-keeping obligations.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep you signed in and understand how the platform is used. See our Cookie Policy for details.",
  },
  {
    title: "International transfers",
    body: "For investors outside Nigeria, your information may be processed in Nigeria or by service providers in other countries. We take steps to ensure it's handled with equivalent protections wherever it's processed.",
  },
  {
    title: "Contact us",
    body: "For privacy questions or requests, contact support@roova.com.",
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" lastUpdated="3 July 2026" sections={SECTIONS} />;
}
