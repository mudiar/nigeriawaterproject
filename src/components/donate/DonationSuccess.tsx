"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Interactive";

type SessionInfo = {
  amountFormatted: string;
  customerName: string | null;
  customerEmail: string | null;
  paymentStatus: string;
};

export function DonationSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing donation session. If you completed payment, check your email for a receipt.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unable to load donation details");
        if (!cancelled) setInfo(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load donation details");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const firstName = info?.customerName?.trim().split(/\s+/)[0];

  return (
    <section className="page-hero" style={{ paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <Reveal>
          <span className="eyebrow">Donation Received</span>
          <h1>Thank You{firstName ? `, ${firstName}` : ""}</h1>
          <p className="lede">
            Your support brings clean water closer to families across Nigeria.
            {info?.amountFormatted
              ? ` We received your gift of ${info.amountFormatted}.`
              : " We’re confirming your gift now."}
          </p>
          {error && (
            <p role="alert" style={{ color: "#8f2f2f" }}>
              {error}
            </p>
          )}
          {info?.customerEmail && (
            <p style={{ color: "var(--ink-soft)" }}>
              A thank-you email and tax receipt are on their way to{" "}
              <strong>{info.customerEmail}</strong>. Please check your inbox
              (and spam folder) in the next few minutes.
            </p>
          )}
          <div className="cta-row" style={{ marginTop: "1.75rem" }}>
            <Link className="btn btn-primary" href="/impact">
              See Our Impact
            </Link>
            <Link className="btn btn-ghost" href="/">
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
