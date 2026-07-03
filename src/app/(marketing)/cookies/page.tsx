import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy — Roova",
};

const SECTIONS = [
  {
    title: "What are cookies",
    body: "Cookies are small text files stored on your device that let a website remember information about your visit, such as your login session or preferences.",
  },
  {
    title: "Types of cookies we use",
    body: "Essential cookies keep you signed in and let core features work. Analytics cookies help us understand how the platform is used so we can improve it. Preference cookies remember choices like your selected currency.",
  },
  {
    title: "Third-party cookies",
    body: "Some cookies are set by third-party services we use for analytics and payment processing. These providers have their own privacy and cookie policies.",
  },
  {
    title: "Managing your preferences",
    body: "You can control or delete cookies through your browser settings. Blocking essential cookies may prevent parts of Roova — like staying signed in — from working correctly.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this Cookie Policy from time to time. Material changes will be reflected in the \"last updated\" date at the top of this page.",
  },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" lastUpdated="3 July 2026" sections={SECTIONS} />;
}
