import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { firstNameFrom } from "@/lib/donations";
import { sendDonationThankYouEmail } from "@/lib/email";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook signature or secret" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("[webhook] Signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
    }
  } catch (error) {
    console.error("[webhook] Handler error", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid" && session.status !== "complete") {
    console.warn("[webhook] Session not paid/complete", session.id);
    return;
  }

  const amountCents = session.amount_total ?? 0;
  if (amountCents <= 0) return;

  const donorEmail =
    session.customer_details?.email ||
    session.customer_email ||
    undefined;
  const donorName =
    session.metadata?.donorName ||
    session.customer_details?.name ||
    undefined;

  const organizationName =
    process.env.ORGANIZATION_NAME || "Nigeria Water Project";
  const organizationEin = process.env.ORGANIZATION_EIN || "33-3795843";
  const organizationEmail =
    process.env.ORGANIZATION_EMAIL || "nigeriawaterproject@outlook.com";

  const donationDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date((session.created || Date.now() / 1000) * 1000));

  if (donorEmail) {
    await sendDonationThankYouEmail({
      to: donorEmail,
      donorFirstName: firstNameFrom(donorName),
      amountCents,
      donationDate,
      organizationName,
      organizationEin,
      organizationEmail,
      siteUrl: getSiteUrl(),
    });
  } else {
    console.warn("[webhook] No donor email on session", session.id);
  }
}
