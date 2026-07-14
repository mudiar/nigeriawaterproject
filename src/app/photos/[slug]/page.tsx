import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Interactive";
import { albums } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(albums).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = albums[slug];
  return { title: album?.title ?? "Gallery" };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = albums[slug];
  if (!album) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">
              <Link href="/photos">← All stories</Link>
            </p>
            <h1>{album.title}</h1>
            <p className="lede">{album.blurb}</p>
          </Reveal>
        </div>
      </section>
      <section className="section band-foam" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="masonry">
            {album.images.map((name, i) => (
              <Image
                key={name}
                src={`/assets/images/${name}`}
                alt={`${album.title} photo ${i + 1}`}
                width={1000}
                height={1200}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
