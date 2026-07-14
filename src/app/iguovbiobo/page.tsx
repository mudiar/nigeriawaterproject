import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Interactive";

export const metadata: Metadata = {
  title: "Iguovbiobo Village",
  description:
    "Borehole #4 is fully completed in Iguovbiobo, Edo State, bringing clean, reliable water to more families.",
};

export default function IguovbioboPage() {
  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "70vh" }}
        aria-label="Iguovbiobo hero"
      >
        <div className="hero-media">
          <Image
            src="/assets/images/IMG-20251112-WA0012.jpg"
            alt="Iguovbiobo borehole site"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero-shade" aria-hidden />
        </div>
        <div className="container hero-content">
          <p className="hero-brand">
            <Image
              src="/assets/images/nwp-logo.png"
              alt=""
              width={56}
              height={56}
            />
            Nigeria Water Project
          </p>
          <h1>Borehole #4 now complete</h1>
          <p className="lede">Iguovbiobo, Edo State, Nigeria</p>
        </div>
      </section>

      <section className="section band-foam">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Thanks to you</span>
            <h2>Our 4th borehole is fully completed</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">
              We’re thrilled to share that the Iguovbiobo borehole installation
              is fully completed, marking a major step forward in our mission
              to bring clean, reliable water to underserved communities in Edo
              State. This site features a generator-powered pump system connected
              to three 15,000-liter GeePee tanks (45,000 liters total), designed
              to ensure consistent water flow and long-term reliability for the
              community.
            </p>
            <p>
              In true collaborative spirit, local residents selected a central
              location within the village, a choice that reflects both
              accessibility and unity. With the groundwork laid, our focus
              continues on strengthening infrastructure so every component is
              installed with care and built to last.
            </p>
            <p>
              Each borehole moves us closer to providing safe water access for
              every community we serve.
            </p>
          </Reveal>
        </div>
        <div className="container photo-grid" style={{ marginTop: "3rem" }}>
          {[
            "IMG-20251112-WA0005.jpg",
            "IMG-20251112-WA0014.jpg",
            "369c823b-01a6-4685-9cb2-9298d93d972d.jpg",
            "PHOTO-2025-08-12-12-02-16.jpg",
            "feb221c7-8649-4e65-b62e-d4fb068b2518.jpg",
            "PHOTO-2025-09-14-12-02-32.jpg",
          ].map((name, i) => (
            <Reveal key={name} delay={i * 40}>
              <div className="media-frame landscape">
                <Image
                  src={`/assets/images/${name}`}
                  alt={`Iguovbiobo project ${i + 1}`}
                  width={1000}
                  height={700}
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container" style={{ marginTop: "2rem" }}>
          <Reveal>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/donate">
                Donate
              </Link>
              <Link className="btn btn-ghost" href="/impact">
                View impact dashboard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
