import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, VideoPlayer } from "@/components/ui/Interactive";
import { videos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Urhokuosa Village",
  description:
    "We’ve completed the water installment point in Urhokuosa, serving a residential area with easier access to clean water.",
};

export default function UrhokuosaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Community · March 2025</span>
            <h1>With the help of all of you</h1>
            <p className="lede">
              We’ve completed the water installment point in Urhokuosa. The water
              site will service a residential area, providing easy access to
              clean water. In the video and images below, you will see residents
              interact, express joy, and the development process in early
              December.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section band-ink">
        <div className="container">
          <Reveal>
            <VideoPlayer
              src={videos.urhokuosa.src}
              poster={videos.urhokuosa.poster}
            />
          </Reveal>
          <div className="photo-grid" style={{ marginTop: "1.25rem" }}>
            {[
              "PHOTO-2024-12-20-13-13-58.jpg",
              "PHOTO-2024-12-20-13-23-29.jpg",
              "PHOTO-2024-12-20-14-41-00.jpg",
              "7ca66f71-3ea1-4a22-ad79-24e1045c9a74.jpg",
              "883f4bc5-b4d4-4ecc-9e45-24e174d8219d.jpg",
              "PHOTO-2024-12-17-09-51-31.jpg",
            ].map((name, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="media-frame landscape">
                  <Image
                    src={`/assets/images/${name}`}
                    alt={`Urhokuosa photo ${i + 1}`}
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
                Donate
              </Link>
              <Link className="btn btn-secondary" href="/photos/urhokuosa-water-site">
                Full gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
