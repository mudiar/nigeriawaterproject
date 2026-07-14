import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DonationForm,
  Reveal,
  VideoPlayer,
} from "@/components/ui/Interactive";
import { videos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ebue-Neki Village",
  description:
    "Now delivering clean, reliable water to Ebue-Neki, Edo State, home to approximately 4,000 people.",
};

export default function EbueNekiPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Community · June 2025</span>
            <h1>
              Now Delivering Clean, Reliable Water to Ebue-Neki, Edo State,
              Nigeria
            </h1>
            <p className="lede">
              Located in southeastern Nigeria, Ebue-Nneki is a resilient rural
              village home to approximately 4,000 people. For years, the
              community has faced daily challenges accessing clean and safe
              water. Through the Nigeria Water Project, we’re building a borehole
              to provide sustainable, life-changing water access, improving
              health, education, and opportunity for generations to come.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="media-frame">
              <Image
                src="/assets/images/1c99c754-3e3e-4f3c-98a4-76a28541e77f.jpg"
                alt="Ebue-Neki Water Project sign"
                width={900}
                height={1100}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-foam">
        <div className="container">
          <Reveal>
            <VideoPlayer src={videos.ebue.src} poster={videos.ebue.poster} />
            <div className="grid-2" style={{ marginTop: "2.5rem" }}>
              <h2>Ebue-Neki, Edo State, Nigeria</h2>
              <p className="lede">
                Hear directly from the residents of the village and just how far
                these can go for them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Development Phase</span>
              <h2>Water Underground, Then Shared Above</h2>
              <p className="lede" style={{ marginInline: "auto" }}>
                This is from after we successfully reached our water point
                underground and pumped clean water. See in the videos below as
                residents began to fetch clean water early.
              </p>
            </div>
            <VideoPlayer
              src={videos.ebueShort.src}
              poster={videos.ebueShort.poster}
            />
          </Reveal>
          <div className="photo-grid" style={{ marginTop: "1.25rem" }}>
            {[
              "b87873f0-8745-4a67-b6f8-ead2777c87a1.jpg",
              "0254c0e4-78e6-46e0-bf37-d5e832a7713e.jpg",
              "93710f96-061e-4193-a32e-dd7fe3c5b6a1.jpg",
              "IMG_8237.JPG",
            ].map((name, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="media-frame landscape">
                  <Image
                    src={`/assets/images/${name}`}
                    alt={`Ebue-Neki development ${i + 1}`}
                    width={1000}
                    height={700}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-foam">
        <div className="container grid-2">
          <Reveal>
            <h2>Keep the Momentum Going</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Your gift funds the next borehole for families still waiting on
              clean water.
            </p>
            <Link className="btn btn-ghost" href="/photos/ebueneki-water-site">
              Ebue-Neki Photo Story
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <DonationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
