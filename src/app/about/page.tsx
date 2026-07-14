import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Interactive";
import { mission, myWhy, org, team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nigeria Water Project’s mission, founding story, and community-first approach to clean water.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1>Water is the foundation of a thriving community</h1>
            <p className="lede">{mission.body}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="media-frame">
              <Image
                src="/assets/images/FRK_2947.JPG"
                alt="A student in Uvbe"
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
            <div className="section-head">
              <span className="eyebrow">Meet the work</span>
              <h2>People, partners, and place</h2>
            </div>
          </Reveal>
          <div className="grid-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 70}>
                <article className="feature">
                  <h3>{member.name}</h3>
                  <p className="eyebrow" style={{ marginTop: "0.5rem" }}>
                    {member.role}
                  </p>
                  <p>{member.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">My why</span>
            <h2>A personal calling, a public commitment</h2>
          </Reveal>
          <Reveal delay={80}>
            {myWhy.map((p) => (
              <p key={p.slice(0, 24)} style={{ color: "var(--ink-soft)" }}>
                {p}
              </p>
            ))}
            <div className="cta-row" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-dark" href="/donate">
                Support the mission
              </Link>
              <a className="btn btn-ghost" href={`mailto:${org.emails.stanford}`}>
                Write to us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
