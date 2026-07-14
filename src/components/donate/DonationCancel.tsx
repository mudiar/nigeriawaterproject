import Link from "next/link";
import { Reveal } from "@/components/ui/Interactive";

export function DonationCancel() {
  return (
    <section className="page-hero" style={{ paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <Reveal>
          <span className="eyebrow">Checkout canceled</span>
          <h1>No charge was made</h1>
          <p className="lede">
            Your donation was not completed. You can return anytime. Every gift
            helps fund clean water for communities in Nigeria.
          </p>
          <div className="cta-row" style={{ marginTop: "1.75rem" }}>
            <Link className="btn btn-primary" href="/donate">
              Try again
            </Link>
            <Link className="btn btn-ghost" href="/">
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
