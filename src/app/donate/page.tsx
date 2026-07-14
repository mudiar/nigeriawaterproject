import type { Metadata } from "next";
import Link from "next/link";
import { DonationForm } from "@/components/donate/DonationForm";
import { Reveal } from "@/components/ui/Interactive";
import { faqs, org, whyGive } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support clean water boreholes in Nigeria. 100% of donations fund infrastructure, maintenance, and sustainability. Tax-deductible · EIN 33-3795843.",
};

export default function DonatePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Donate</span>
            <h1>Make an impact today</h1>
            <p className="lede">
              Support our mission by contributing a donation. Every gift helps
              fund safe, drinkable water for underserved communities in Nigeria.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <DonationForm ein={org.ein} />
          </Reveal>
        </div>
      </section>

      <section className="section band-foam">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Why give?</span>
              <h2>Your generosity becomes infrastructure.</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {whyGive.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <article className="feature">
                  <p>{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <h2>Make a donation.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              It all begins with a mission. Maybe you want to make a difference.
              Maybe you believe that access to clean water should be a human
              right, not a privilege. Or maybe you see the impact that safe
              drinking water can have on health, education, and entire
              communities.
            </p>
            <p>
              Whatever drives you, the Nigeria Water Project is here to turn that
              vision into reality. Through sustainable borehole projects, we’re
              bringing clean water to underserved villages in Nigeria, and your
              support makes all the difference.
            </p>
            <p style={{ marginTop: "1rem" }}>
              {org.legal} EIN {org.ein}.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="faq">
              {faqs.slice(0, 4).map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <p style={{ marginTop: "1.25rem" }}>
              Prefer another path?{" "}
              <Link href="/contact">Talk with our team</Link> about
              partnerships or project sponsorship.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
