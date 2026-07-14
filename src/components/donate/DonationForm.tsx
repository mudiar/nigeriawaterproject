"use client";

import { FormEvent, useState } from "react";
import { dollarsToCents, formatUsd } from "@/lib/donations";

const PRESETS = ["25", "50", "100", "200", "500"] as const;

type DonationFormProps = {
  ein?: string;
};

export function DonationForm({ ein = "33-3795843" }: DonationFormProps) {
  const [amount, setAmount] = useState<string>("25");
  const [custom, setCustom] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCents =
    amount === "custom" ? dollarsToCents(custom) : dollarsToCents(amount);
  const totalLabel = Number.isFinite(selectedCents)
    ? formatUsd(selectedCents)
    : "$0.00";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const amountCents =
      amount === "custom" ? dollarsToCents(custom) : dollarsToCents(amount);

    if (!Number.isFinite(amountCents) || amountCents < 100) {
      setError("Please enter a donation of at least $1.00.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountCents,
          donorName: donorName.trim() || undefined,
          donorEmail: donorEmail.trim() || undefined,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form
      className="donate-panel"
      onSubmit={onSubmit}
      aria-label="Donation form"
      noValidate
    >
      <div className="amount-grid" role="radiogroup" aria-label="Donation amount">
        {PRESETS.map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={amount === v}
            onClick={() => setAmount(v)}
            disabled={loading}
          >
            ${v}
          </button>
        ))}
        <button
          type="button"
          role="radio"
          aria-checked={amount === "custom"}
          onClick={() => setAmount("custom")}
          disabled={loading}
        >
          Custom
        </button>
      </div>

      {amount === "custom" && (
        <label>
          Custom amount (USD)
          <input
            type="number"
            min="1"
            step="0.01"
            inputMode="decimal"
            required
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            disabled={loading}
            aria-describedby="donation-help"
          />
        </label>
      )}

      <label>
        First and last name <span style={{ fontWeight: 500 }}>(optional)</span>
        <input
          type="text"
          name="donorName"
          autoComplete="name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          disabled={loading}
        />
      </label>

      <label>
        Email <span style={{ fontWeight: 500 }}>(optional, for receipt)</span>
        <input
          type="email"
          name="donorEmail"
          autoComplete="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          disabled={loading}
        />
      </label>

      <div className="donate-total" aria-live="polite">
        <span>Total</span>
        <span>{totalLabel}</span>
      </div>

      {error && (
        <p role="alert" style={{ color: "#8f2f2f", margin: "0 0 0.85rem" }}>
          {error}
        </p>
      )}

      <button
        className="btn btn-primary"
        type="submit"
        style={{ width: "100%" }}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Redirecting to secure checkout…" : "Donate with card"}
      </button>

      <p
        id="donation-help"
        style={{ marginTop: "0.85rem", fontSize: "0.85rem", color: "var(--ink-soft)" }}
      >
        Secure one-time checkout powered by Stripe. Tax-deductible where
        applicable · EIN {ein}
      </p>
    </form>
  );
}
