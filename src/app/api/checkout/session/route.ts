import { NextResponse } from "next/server";
import { formatUsd } from "@/lib/donations";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid session id" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 },
      );
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      amountFormatted: formatUsd(session.amount_total ?? 0),
      currency: session.currency,
      customerEmail:
        session.customer_details?.email || session.customer_email || null,
      customerName:
        session.metadata?.donorName ||
        session.customer_details?.name ||
        null,
      created: session.created,
    });
  } catch (error) {
    console.error("[session]", error);
    return NextResponse.json(
      { error: "Unable to retrieve donation session" },
      { status: 500 },
    );
  }
}
