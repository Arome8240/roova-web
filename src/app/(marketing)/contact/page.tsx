import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Roova",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
        title="Contact us"
        subtitle="We typically respond within one business day."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Support
            </h2>
            <p className="mt-1 text-foreground">support@roova.com</p>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Phone
            </h2>
            <p className="mt-1 text-foreground">+234 801 234 5678</p>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Office
            </h2>
            <p className="mt-1 text-foreground">Victoria Island, Lagos, Nigeria</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
