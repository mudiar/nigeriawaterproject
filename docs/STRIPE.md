# Stripe donations setup

This site uses **Stripe Checkout** for one-time donations (preset + custom amounts). Funds settle into your connected Stripe account. Successful payments redirect to a thank-you page and trigger a branded HTML receipt email via Resend.

## 1. Create Stripe keys

1. Sign in at [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Switch to **Test mode** while developing
3. Developers → API keys
4. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

Use **live** keys only in production.

## 2. Environment variables

Copy `.env.example` to `.env.local` (local) or set the same vars in **Vercel → Project → Settings → Environment Variables**:

| Variable | Where used | Notes |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client (optional for Checkout redirect flow) | Safe to expose |
| `STRIPE_SECRET_KEY` | Server only | Never commit / never expose |
| `STRIPE_WEBHOOK_SECRET` | `/api/webhooks/stripe` | From Stripe webhook endpoint |
| `NEXT_PUBLIC_SITE_URL` | Checkout success/cancel URLs | e.g. `https://your-domain.com` |
| `ORGANIZATION_NAME` | Receipts / emails | Legal / display name |
| `ORGANIZATION_EIN` | Receipts / emails | e.g. `33-3795843` |
| `ORGANIZATION_EMAIL` | Receipts / reply-to | Public contact email |
| `RESEND_API_KEY` | Thank-you email | Required to send email |
| `RESEND_FROM_EMAIL` | Thank-you email | Verified domain/sender in Resend |

## 3. Local development

```bash
cp .env.example .env.local
# fill in test keys
npm run dev
```

Open `/donate`, choose an amount, and complete Checkout with Stripe test card `4242 4242 4242 4242`.

### Local webhooks

Stripe cannot reach `localhost` directly. Use the Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the CLI webhook signing secret (`whsec_...`) into `.env.local` as `STRIPE_WEBHOOK_SECRET`, then restart `npm run dev`.

Trigger a test event (optional):

```bash
stripe trigger checkout.session.completed
```

## 4. Production webhook (Vercel)

1. Deploy the app to Vercel with env vars set (including live Stripe keys)
2. Stripe Dashboard → Developers → Webhooks → **Add endpoint**
3. Endpoint URL:

```text
https://YOUR_DOMAIN/api/webhooks/stripe
```

4. Listen for event: `checkout.session.completed`
5. Copy the endpoint **Signing secret** → `STRIPE_WEBHOOK_SECRET` in Vercel
6. Redeploy so the new secret is available to the serverless function

## 5. Thank-you email (Resend)

1. Create an account at [https://resend.com](https://resend.com)
2. Verify your sending domain
3. Create an API key → `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL` to a verified address, e.g. `Nigeria Water Project <donations@yourdomain.com>`

If `RESEND_API_KEY` is missing, checkout still succeeds; the webhook logs that email was skipped.

## 6. App routes

| Route | Purpose |
|---|---|
| `POST /api/checkout` | Creates Stripe Checkout Session |
| `GET /api/checkout/session?session_id=` | Loads donation details for thank-you page |
| `POST /api/webhooks/stripe` | Verifies Stripe signatures; sends thank-you email |
| `/donate` | Donation form |
| `/donate/success` | Post-payment thank-you page |
| `/donate/cancel` | Checkout canceled page |

## 7. Security notes

- Secret keys are only read in Route Handlers (`runtime = "nodejs"`)
- Webhook payloads are verified with `stripe.webhooks.constructEvent`
- Amounts are validated server-side (min $1, integer cents)
- Never put `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in client code

## 8. Going live checklist

- [ ] Live Stripe secret + publishable keys in Vercel
- [ ] Live webhook endpoint + signing secret
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Resend domain verified + `RESEND_FROM_EMAIL`
- [ ] Test a real $1 donation, confirm payout destination, thank-you page, and email
