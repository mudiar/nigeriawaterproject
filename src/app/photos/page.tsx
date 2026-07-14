import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Interactive";
import { albums } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Photo galleries from Uvbe, Urhokuosa, Ebue-Neki, and communities across Edo State.",
};

export default function PhotosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Stories</span>
            <h1>Photo Gallery</h1>
            <p className="lede">
              Evidence of impact: children, classrooms, construction sites, and
              the joy of clean water arriving.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section band-foam" style={{ paddingTop: 0 }}>
        <div className="container photo-grid">
          {Object.entries(albums).map(([slug, album], i) => (
            <Reveal key={slug} delay={i * 60}>
              <Link className="photo-tile" href={`/photos/${slug}`}>
                <div className="media-frame">
                  <Image
                    src={`/assets/images/${album.cover}`}
                    alt={album.title}
                    width={1000}
                    height={700}
                  />
                </div>
                <h3>{album.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: "0.35rem" }}>
                  {album.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
