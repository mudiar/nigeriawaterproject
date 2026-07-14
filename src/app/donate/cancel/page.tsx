import type { Metadata } from "next";
import { DonationCancel } from "@/components/donate/DonationCancel";

export const metadata: Metadata = {
  title: "Donation Canceled",
  description: "Your Stripe checkout was canceled. No payment was taken.",
  robots: { index: false, follow: false },
};

export default function DonateCancelPage() {
  return <DonationCancel />;
}
