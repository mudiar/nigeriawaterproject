import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, StatCounter } from "@/components/ui/Interactive";
import {
  communities,
  impactStats,
  processSteps,
  sdgs,
  timeline,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Annual impact dashboard for Nigeria Water Project: boreholes completed, communities served, and transparent outcomes.",
};

export default function ImpactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Impact dashboard</span>
            <h1>Results rooted in community</h1>
            <p className="lede">
              Boreholes completed, people served, and systems built to last, with
              local ownership at every site.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section band-foam" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats">
            {impactStats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Timeline</span>
            <h2>2025 milestones</h2>
            <div className="timeline" style={{ marginTop: "2rem" }}>
              {timeline.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Featured success</span>
            <h2>Iguovbiobo Borehole #4</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Fully completed: a generator-powered pump system connected to three
              15,000-liter GeePee tanks (45,000 liters of storage), selected by
              residents for a central village location.
            </p>
            <div className="media-frame landscape" style={{ marginTop: "1.5rem" }}>
              <Image
                src="/assets/images/IMG-20251112-WA0012.jpg"
                alt="Iguovbiobo water site"
                width={1200}
                height={800}
              />
            </div>
            <Link className="btn btn-ghost" href="/iguovbiobo" style={{ marginTop: "1rem" }}>
              View project
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section band-foam">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Communities</span>
              <h2>Where clean water now flows</h2>
            </div>
          </Reveal>
          <div className="community-grid">
            {communities.map((c, i) => (
              <Reveal key={c.slug} delay={i * 50}>
                <Link className="community" href={`/${c.slug}`}>
                  <Image src={c.image} alt="" width={900} height={700} />
                  <div className="community-body">
                    <div className="community-meta">
                      {c.date} · {c.status}
                    </div>
                    <h3>{c.name}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Our process</span>
            <h2>Built for reliability</h2>
            <ol className="process" style={{ marginTop: "1.5rem" }}>
              {processSteps.map((step, i) => (
                <li className="process-item" key={step.title}>
                  <div className="process-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Sustainable Development Goal alignment</span>
            <h2>Global goals, local wells</h2>
            <div style={{ marginTop: "1.5rem" }}>
              {sdgs.map((s) => (
                <article className="feature" key={s.code}>
                  <h3>
                    Goal {s.code} · {s.title}
                  </h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
