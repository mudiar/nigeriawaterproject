import { NextResponse } from "next/server";
import { donationCheckoutSchema } from "@/lib/donations";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
        { status: 503 },
      );
    }

    const body = await request.json();
    const parsed = donationCheckoutSchema.safeParse({
      amountCents: body.amountCents,
      donorName: body.donorName || undefined,
      donorEmail: body.donorEmail || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid donation details",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { amountCents, donorName, donorEmail } = parsed.data;
    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const orgName =
      process.env.ORGANIZATION_NAME || "Nigeria Water Project";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      payment_method_types: ["card"],
      customer_email: donorEmail || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: `Donation to ${orgName}`,
              description:
                "Thank you for supporting clean water boreholes in Nigeria.",
            },
          },
        },
      ],
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate/cancel`,
      metadata: {
        donorName: donorName || "",
        donationType: "one_time",
        organizationEin: process.env.ORGANIZATION_EIN || "",
      },
      payment_intent_data: {
        metadata: {
          donorName: donorName || "",
          donationType: "one_time",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to create Stripe Checkout session" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to start checkout. Please try again.",
      },
      { status: 500 },
    );
  }
}
