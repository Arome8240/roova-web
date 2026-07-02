import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
