"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { Reveal } from "@/components/ui/Interactive";

export type GalleryImage = {
  src: string;
  alt: string;
  featured?: boolean;
};

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const labelId = useId();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback((index: number) => setActive(index), []);
  const prev = useCallback(() => {
    setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setActive((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div className="project-gallery">
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={i * 45}
            className={img.featured ? "gallery-item is-featured" : "gallery-item"}
          >
            <button
              type="button"
              className="gallery-trigger"
              onClick={() => show(i)}
              aria-label={`View photo: ${img.alt}`}
            >
              <span className="media-frame landscape">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.featured ? 1400 : 900}
                  height={img.featured ? 1000 : 700}
                  loading="lazy"
                  sizes={
                    img.featured
                      ? "(max-width: 900px) 100vw, 66vw"
                      : "(max-width: 900px) 100vw, 33vw"
                  }
                />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={close}
        >
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <p id={labelId} className="sr-only">
              {images[active].alt}
            </p>
            <button
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label="Close gallery"
            >
              Close
            </button>
            <button
              type="button"
              className="lightbox-nav prev"
              onClick={prev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <div className="lightbox-frame">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                width={1600}
                height={1200}
                sizes="100vw"
                priority
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
            <button
              type="button"
              className="lightbox-nav next"
              onClick={next}
              aria-label="Next photo"
            >
              ›
            </button>
            <p className="lightbox-caption">
              {images[active].alt}
              <span>
                {" "}
                · {active + 1} / {images.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
