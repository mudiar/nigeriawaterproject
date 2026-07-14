import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, VideoPlayer } from "@/components/ui/Interactive";
import { videos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Uvbe Village",
  description:
    "The Uvbe Village borehole is complete: clean water at Uvbe Primary School and for the surrounding community.",
};

export default function UvbePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Community · January 2025</span>
            <h1>Thanks to You</h1>
            <p className="lede">
              The Uvbe Village borehole is complete. See exactly where your
              contributions are going, and scenes from the construction site
              below.
            </p>
            <p>
              Again, this wouldn’t be possible without you. Thank you, and let’s
              continue to change the world one village at a time.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="media-frame">
              <Image
                src="/assets/images/FRK_2947.JPG"
                alt="Uvbe community member"
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
            <h2 className="center" style={{ textAlign: "center", marginBottom: "2rem" }}>
              Uvbe
            </h2>
            <VideoPlayer src={videos.uvbe.src} poster={videos.uvbe.poster} />
          </Reveal>
          <div className="photo-grid" style={{ marginTop: "1.5rem" }}>
            {[
              "5002e44a-aefb-458b-9245-45345ae1b513.jpg",
              "PHOTO-2024-12-17-09-53-05.jpg",
              "a3e4332f-a07a-424a-9d02-2eafd05766a2.jpg",
              "FRK_2940.JPG",
            ].map((name, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="media-frame landscape">
                  <Image
                    src={`/assets/images/${name}`}
                    alt={`Uvbe project photo ${i + 1}`}
                    width={1000}
                    height={700}
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cta-row" style={{ marginTop: "2rem" }}>
              <Link className="btn btn-primary" href="/donate">
                Fund the next village
              </Link>
              <Link className="btn btn-ghost" href="/photos/uvbe-borehole-site">
                More photos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
