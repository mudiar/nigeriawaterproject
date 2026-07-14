import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { org } from "@/lib/content";
import { firstNameFrom } from "@/lib/donations";
import { sendDonationThankYouEmail } from "@/lib/email";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

function publicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return "https://nigeriawaterproject.org";
}

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
  // Only send after Stripe confirms a successful payment
  if (session.payment_status !== "paid") {
    console.warn("[webhook] Session not paid; skipping email", {
      id: session.id,
      payment_status: session.payment_status,
    });
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
    process.env.ORGANIZATION_NAME || org.name;
  const organizationEin = process.env.ORGANIZATION_EIN || org.ein;
  const organizationEmail =
    process.env.ORGANIZATION_EMAIL || org.emails.general;

  const donationDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date((session.created || Date.now() / 1000) * 1000));

  const siteUrl = publicSiteUrl() || getSiteUrl();
  const logoUrl = `${siteUrl}/assets/images/nwp-logo.png`;

  if (!donorEmail) {
    console.warn("[webhook] No donor email on session", session.id);
    return;
  }

  const result = await sendDonationThankYouEmail({
    to: donorEmail,
    donorFirstName: firstNameFrom(donorName),
    amountCents,
    donationDate,
    organizationName,
    organizationEin,
    organizationEmail,
    siteUrl,
    logoUrl,
    facebookUrl: org.social.facebook,
    linkedinUrl: org.social.linkedin,
    idempotencyKey: session.id,
  });

  console.info("[webhook] Thank-you email result", {
    sessionId: session.id,
    ...result,
  });
}
