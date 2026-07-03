"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { firstFieldErrors } from "@/lib/utils";
import { notify } from "@/lib/toast";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});
type ContactInput = z.infer<typeof contactSchema>;

const INITIAL_VALUES: ContactInput = { name: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      setErrors(firstFieldErrors(result.error));
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setValues(INITIAL_VALUES);
      notify.success("Message sent — we'll get back to you within a business day.");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="shadow-soft space-y-5 rounded-2xl bg-card p-6">
      <FormField label="Name" htmlFor="name" error={errors.name}>
        <Input
          id="name"
          value={values.name}
          onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
        />
      </FormField>

      <FormField label="Email" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
        />
      </FormField>

      <FormField label="Message" htmlFor="message" error={errors.message}>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
