# Nigeria Water Project

Modern nonprofit website for bringing clean, sustainable water to communities in Nigeria.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- `hls.js` for project videos

## Develop

```bash
cd C:\Users\Owner\Projects\nigeria-water-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Donations (Stripe)

See [docs/STRIPE.md](./docs/STRIPE.md) for Checkout, webhooks, Resend email, and Vercel env setup.

## Structure

```
src/app/                 # Routes (home, donate, impact, about, stories, villages)
src/components/layout/   # Header & footer
src/components/ui/       # Donation, forms, video, reveal, counters
src/lib/content.ts       # Mission copy, stats, FAQs, albums
public/assets/           # Local images
```
