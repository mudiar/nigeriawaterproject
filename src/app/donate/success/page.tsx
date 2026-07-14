import type { Metadata } from "next";
import { Suspense } from "react";
import { DonationSuccessClient } from "@/components/donate/DonationSuccess";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting Nigeria Water Project.",
  robots: { index: false, follow: false },
};

export default function DonateSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="page-hero">
          <div className="container">
            <h1>Thank you</h1>
            <p className="lede">Confirming your donation…</p>
          </div>
        </section>
      }
    >
      <DonationSuccessClient />
    </Suspense>
  );
}
