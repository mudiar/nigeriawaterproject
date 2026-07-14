import Image from "next/image";
import Link from "next/link";
import {
  ContactForm,
  DonationForm,
  NewsletterForm,
  Reveal,
  StatCounter,
  VideoPlayer,
} from "@/components/ui/Interactive";
import {
  communities,
  crisisPoints,
  faqs,
  impactStats,
  mapPins,
  mission,
  myWhy,
  org,
  processSteps,
  sdgs,
  testimonials,
  timeline,
  videos,
  waysToHelp,
  whyGive,
  whyNigeria,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Homepage hero">
        <div className="hero-media">
          <Image
            src="/assets/images/b3bfc899-0e7f-4479-a27b-92cbf9d4937d.jpeg"
            alt="Children of Uvbe Primary School gathered outdoors"
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
          <h1>Clean water. Stronger villages. Lasting hope.</h1>
          <p className="lede">
            We build community-led boreholes across Nigeria so families can
            thrive: healthy, in school, and free from the daily search for unsafe
            water.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/donate">
              Donate now
            </Link>
            <Link className="btn btn-secondary" href="/impact">
              See our impact
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis */}
      <section className="section band-foam" id="crisis">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">The water crisis</span>
              <h2>When water is far, everything else waits.</h2>
              <p className="lede">
                Across underserved communities, contaminated sources and long
                walks still define daily life, especially for children.
              </p>
            </div>
          </Reveal>
          <div className="grid-3">
            {crisisPoints.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="feature">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nigeria + Mission */}
      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Why Nigeria</span>
            <h2>{whyNigeria.title}</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              {whyNigeria.body}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="media-frame landscape">
              <Image
                src="/assets/images/FRK_2940.JPG"
                alt="Students at Uvbe Primary School"
                width={1200}
                height={800}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-ink">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow" style={{ color: "#7ad4d0" }}>
              Our mission
            </span>
            <h2>{mission.title}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">{mission.body}</p>
            <div className="cta-row" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/about">
                Our story
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section className="section band-foam" id="impact">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Our impact</span>
              <h2>Progress you can measure and visit.</h2>
            </div>
          </Reveal>
          <div className="stats">
            {impactStats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: "3rem" }}>
              <Link className="btn btn-ghost" href="/impact">
                Open impact dashboard
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Communities + Map */}
      <section className="section band-mist" id="communities">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Communities we’ve served</span>
              <h2>Four villages. Four water points. Countless mornings changed.</h2>
            </div>
          </Reveal>
          <div className="grid-2" style={{ alignItems: "stretch" }}>
            <Reveal>
              <div className="map-wrap" aria-label="Edo State project map">
                <div className="map-label">
                  Edo State, Nigeria · community water points
                </div>
                {mapPins.map((pin) => (
                  <Link
                    key={pin.id}
                    href={pin.href}
                    className="map-pin"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <span className="name">{pin.name}</span>
                    <span className="dot" aria-hidden />
                  </Link>
                ))}
              </div>
            </Reveal>
            <div className="community-grid">
              {communities.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <Link className="community" href={`/${c.slug}`}>
                    <Image
                      src={c.image}
                      alt={`${c.name} project`}
                      width={900}
                      height={700}
                    />
                    <div className="community-body">
                      <div className="community-meta">
                        {c.date} · {c.status}
                      </div>
                      <h3>{c.name}</h3>
                      <p style={{ margin: "0.5rem 0 0", opacity: 0.9 }}>
                        {c.summary}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How wells change lives / process */}
      <section className="section band-foam" id="process">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">How wells change lives</span>
            <h2>From deep aquifer to community tap.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Every borehole is engineered for reliability: drilling, sealing,
              pumping, storage, filtration, and shared access.
            </p>
            <div className="before-after" style={{ marginTop: "2rem" }}>
              <figure>
                <Image
                  src="/assets/images/feb221c7-8649-4e65-b62e-d4fb068b2518.jpg"
                  alt="Borehole construction work"
                  width={700}
                  height={500}
                />
                <figcaption>Building</figcaption>
              </figure>
              <figure>
                <Image
                  src="/assets/images/IMG-20251112-WA0012.jpg"
                  alt="Completed water infrastructure"
                  width={700}
                  height={500}
                />
                <figcaption>Complete</figcaption>
              </figure>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ol className="process">
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
        </div>
      </section>

      {/* Stories */}
      <section className="section band-mist" id="stories">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Photo & video stories</span>
              <h2>See the water flow. Hear the community.</h2>
            </div>
          </Reveal>
          <div className="grid-2">
            <Reveal>
              <VideoPlayer src={videos.ebue.src} poster={videos.ebue.poster} />
            </Reveal>
            <Reveal delay={80}>
              <h3>Ebue-Neki, Edo State</h3>
              <p className="lede" style={{ marginTop: "0.75rem" }}>
                Hear directly from residents, and watch clean water reach a
                village of approximately 4,000 people.
              </p>
              <div className="cta-row" style={{ marginTop: "1.25rem" }}>
                <Link className="btn btn-dark" href="/photos">
                  Browse the gallery
                </Link>
                <Link className="btn btn-ghost" href="/ebueneki-village">
                  Ebue-Neki project
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="section band-foam" id="transparency">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Financial transparency</span>
            <h2>100% of donations fund water work.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Your gift goes directly toward boreholes, infrastructure,
              maintenance, and sustainability. {org.legal} EIN {org.ein}.
            </p>
            <ul style={{ margin: "1.5rem 0", paddingLeft: "1.1rem" }}>
              {whyGive.slice(0, 4).map((item) => (
                <li key={item} style={{ marginBottom: "0.65rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <DonationForm />
          </Reveal>
        </div>
      </section>

      {/* Partners / SDG */}
      <section className="section band-mist" id="partners">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Sustainable Development Goal alignment</span>
              <h2>Built with communities. Aligned with global goals.</h2>
            </div>
          </Reveal>
          <div className="grid-4">
            {sdgs.map((s, i) => (
              <Reveal key={s.code} delay={i * 60}>
                <article className="feature">
                  <span className="eyebrow">Goal {s.code}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ marginTop: "2rem", maxWidth: "40rem" }}>
              Corporate partners, matching-gift programs, and village leaders make
              this work possible.{" "}
              <Link href="/contact">Inquire about partnership →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section band-foam" id="testimonials">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">From our donors</span>
              <h2>Voices walking with us.</h2>
            </div>
          </Reveal>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <blockquote className="quote">
                  <p>“{t.quote}”</p>
                  <cite>{t.name}</cite>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline + My Why */}
      <section className="section band-mist">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Project timeline</span>
            <h2>A year of wells.</h2>
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
            <span className="eyebrow">Founder’s why</span>
            <h2>My why</h2>
            {myWhy.map((p) => (
              <p key={p.slice(0, 32)} style={{ color: "var(--ink-soft)" }}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section band-foam" id="faq">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">FAQ</span>
              <h2>Clear answers. Real accountability.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="faq">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ways to help */}
      <section className="section band-water" id="help">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow" style={{ color: "#b7efec" }}>
                Ways to help
              </span>
              <h2>Choose how you’ll bring the next drop.</h2>
            </div>
          </Reveal>
          <div className="help-grid">
            {waysToHelp.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <article className="help-item">
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                  <Link className="btn btn-secondary" href={w.href}>
                    {w.cta}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: "3rem", maxWidth: "36rem" }}>
              <h3 style={{ marginBottom: "0.75rem" }}>Stay close to the work</h3>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section band-ink">
        <div className="container grid-2">
          <Reveal>
            <h2>Every gift moves water closer to home.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Join donors funding boreholes that communities can trust for years
              to come.
            </p>
            <div className="cta-row" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/donate">
                Make a donation
              </Link>
              <a className="btn btn-secondary" href={`mailto:${org.emails.general}`}>
                Talk to our team
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="media-frame">
              <Image
                src="/assets/images/10.jpg"
                alt="Children in the community"
                width={900}
                height={1100}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact strip */}
      <section className="section band-foam" id="contact">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h2>Questions, partnerships, or ideas?</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Any questions, concerns, or partnership inquiries? Please reach out.
            </p>
            <p>
              <a href={`mailto:${org.emails.stanford}`}>{org.emails.stanford}</a>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
