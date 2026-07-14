"use client";

import Hls from "hls.js";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export { DonationForm, DonationForm as DonationWidget } from "@/components/donate/DonationForm";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

export function StatCounter({
  value,
  suffix = "",
  label,
  detail,
}: {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-detail">{detail}</div>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="lede" role="status">
        Thank you. Your message is ready. Please email us directly if you need an
        immediate reply while we connect a live inbox.
      </p>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      aria-label="Contact form"
    >
      <div className="form-row">
        <label>
          First name
          <input name="firstName" required autoComplete="given-name" />
        </label>
        <label>
          Last name
          <input name="lastName" required autoComplete="family-name" />
        </label>
      </div>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        How can we help?
        <textarea name="message" rows={6} required />
      </label>
      <button className="btn btn-dark" type="submit">
        Send message
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) {
    return <p role="status">Thanks. You’re on the list for project updates.</p>;
  }
  return (
    <form
      className="newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      aria-label="Newsletter signup"
    >
      <input type="email" required placeholder="Email address" aria-label="Email address" />
      <button className="btn btn-primary" type="submit">
        Get updates
      </button>
    </form>
  );
}

export function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [src]);

  return (
    <div className="video-shell">
      <video
        ref={ref}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label="Project video"
      />
    </div>
  );
}
