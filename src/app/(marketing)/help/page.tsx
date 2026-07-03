import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Help centre — Roova",
};

const FAQS = [
  {
    question: "How do I start investing?",
    answer:
      "Create an account, complete KYC verification, and fund your wallet by bank transfer, card, or USDC. Once verified, you can invest in any live property from ₦50,000.",
  },
  {
    question: "What's the minimum investment?",
    answer:
      "Shares start at ₦50,000 per property. You can buy as many shares as you like across as many properties as you like.",
  },
  {
    question: "How are dividends paid?",
    answer:
      "Rental income is collected from tenants and distributed to shareholders every quarter, proportional to the number of shares you hold, paid directly to your Roova wallet.",
  },
  {
    question: "Can I sell my shares before a property is fully funded?",
    answer:
      "Shares in properties that are still raising funds aren't tradeable yet. Once a property is fully funded, you can list your shares on the secondary market at any time.",
  },
  {
    question: "What happens if a property doesn't reach its funding target?",
    answer:
      "If a listing doesn't reach 100% of its target within the funding window, all investors are refunded in full — no fees are deducted.",
  },
  {
    question: "How does KYC work for diaspora investors?",
    answer:
      "International investors complete the same online verification as Nigerian investors — a valid ID and proof of address — with no requirement for a Nigerian bank account.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        title="Help centre"
        subtitle="Answers to common questions about investing, agencies, and your account."
      />

      <div className="mt-10 space-y-8">
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h2 className="text-lg font-medium tracking-[-0.01em] text-foreground">
              {faq.question}
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        Still need help?{" "}
        <Link href="/contact" className="font-medium text-primary hover:text-primary/80">
          Contact our support team
        </Link>
        .
      </p>
    </div>
  );
}
