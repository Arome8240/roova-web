import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstFieldErrors<T extends Record<string, unknown>>(
  error: ZodError<T>,
): Partial<Record<keyof T, string>> {
  const { fieldErrors } = error.flatten();
  const result: Partial<Record<keyof T, string>> = {};
  for (const key in fieldErrors) {
    const messages = fieldErrors[key as keyof typeof fieldErrors];
    if (messages?.[0]) {
      result[key as keyof T] = messages[0];
    }
  }
  return result;
}

export function formatNairaCompact(amount: number) {
  if (amount >= 1_000_000_000) {
    return `₦${trimDecimal(amount / 1_000_000_000)}B`;
  }
  if (amount >= 1_000_000) {
    return `₦${trimDecimal(amount / 1_000_000)}M`;
  }
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
}

export function formatNairaFull(amount: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
}

function trimDecimal(value: number) {
  return Number(value.toFixed(1)).toString();
}
