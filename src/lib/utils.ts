import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number with thousands separators, e.g. 1200 -> "1,200". */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
