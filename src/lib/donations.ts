import { z } from "zod";

export const donationCheckoutSchema = z.object({
  amountCents: z.number().int().min(100).max(100_000_000),
  donorName: z.string().trim().max(120).optional(),
  donorEmail: z
    .union([z.string().email(), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export type DonationCheckoutInput = z.infer<typeof donationCheckoutSchema>;

export function dollarsToCents(value: string | number): number {
  const n = typeof value === "number" ? value : Number.parseFloat(value);
  if (!Number.isFinite(n)) return NaN;
  return Math.round(n * 100);
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function firstNameFrom(fullName?: string | null): string {
  if (!fullName?.trim()) return "";
  return fullName.trim().split(/\s+/)[0] ?? "";
}
