import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectMapSection } from "@/components/map/ProjectMapSection";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Reveal } from "@/components/ui/Interactive";
import { communities, org } from "@/lib/content";

const HERO = "/assets/images/ohovbe/community-gathering.png";
const ABOUT_IMAGE = "/assets/images/ohovbe/resident-collecting.png";
const IMPACT_IMAGE = "/assets/images/ohovbe/residents-at-taps.png";

const gallery = [
  {
    src: "/assets/images/ohovbe/community-gathering.png",
    alt: "Residents gathering at the Ohovbe Water Project tap station at golden hour",
    featured: true,
  },
  {
    src: "/assets/images/ohovbe/resident-collecting.png",
    alt: "A resident collecting water from the elevated tank at the Ohovbe borehole",
    featured: true,
  },
  {
    src: "/assets/images/ohovbe/residents-at-taps.png",
    alt: "Community members filling jerrycans and basins at the Ohovbe taps",
  },
  {
    src: "/assets/images/ohovbe/construction-sign.png",
    alt: "Ohovbe Water Project sign beside active borehole construction in Edo State",
  },
] as const;

const overview = [
  {
    label: "Location",
    value: "Ohovbe, Ikpoba-Okha LGA",
    icon: "pin" as const,
  },
  {
    label: "Community Population",
    value: "4,000+ Residents",
    icon: "people" as const,
  },
  {
    label: "Borehole Number",
    value: "Borehole #6",
    icon: "hash" as const,
  },
  {
    label: "Status",
    value: "Near Completion",
    icon: "status" as const,
  },
  {
    label: "Organization",
    value: org.name,
    icon: "org" as const,
  },
];

const impactPoints = [
  {
    title: "Healthier Families",
    body: "Dependable clean water lowers the daily risk of waterborne illness for children, parents, and elders alike.",
  },
  {
    title: "Time Restored",
    body: "When water is close to home, hours once spent searching for it return to work, school, care, and rest.",
  },
  {
    title: "Improved Sanitation",
    body: "Reliable taps support hygiene practices that protect public health across a growing neighborhood.",
  },
  {
    title: "Stronger Local Development",
    body: "Basic infrastructure like water helps a residential community along Ikpoba Hill grow with dignity.",
  },
  {
    title: "Better Public Health",
    body: "Shared access reduces pressure on unsafe sources and strengthens the well-being of the whole settlement.",
  },
  {
    title: "Long-Term Sustainability",
    body: "Durable tanks, pipes, and community use keep this investment serving Ohovbe for years to come.",
  },
];

const timeline: {
  step: string;
  title: string;
  body: string;
  current?: boolean;
}[] = [
  {
    step: "01",
    title: "Community Assessment",
    body: "Listening to residents and local partners about water needs across this growing Ikpoba-Okha settlement.",
  },
  {
    step: "02",
    title: "Planning",
    body: "Choosing a central, accessible site so families throughout Ohovbe can reach clean water safely.",
  },
  {
    step: "03",
    title: "Construction",
    body: "Drilling, elevated storage, distribution plumbing, and the shared tap station take shape on the ground.",
  },
  {
    step: "04",
    title: "Near Completion",
    body: "Residents are already gathering at the taps as finishing work brings the system toward full daily service.",
    current: true,
  },
  {
    step: "05",
    title: "Serving the Community",
    body: "Clean water becomes part of everyday life for families, children, and elders across Ohovbe.",
  },
];

const communityVoices = [
  {
    quote:
      "Clean water close to home changes the rhythm of a whole neighborhood. Families gain time, health, and dignity.",
    attribution: "Community Partner · Ohovbe",
  },
  {
    quote:
      "When the taps flow, children carry less of the burden. That is what community transformation looks like.",
    attribution: "Resident Reflection · Placeholder",
  },
];

const related = communities.filter((c) => c.slug !== "ohovbe").slice(-4);

function OverviewIcon({
  name,
}: {
  name: (typeof overview)[number]["icon"];
}) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3.5 19c.8-3 2.8-4.5 5.5-4.5S13.7 16 14.5 19" />
          <path d="M14 14.5c1.8 0 3.4.8 4.3 2.5" />
        </svg>
      );
    case "status":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 12.5 11 15l4.5-5" />
        </svg>
      );
    case "hash":
      return (
        <svg {...common}>
          <path d="M9 4 7 20M17 4l-2 16M4 9h16M3.5 15h16" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
  }
}

export const metadata: Metadata = {
  title: "Ohovbe Community Borehole",
  description:
    "Borehole #6 in Ohovbe Community, Ikpoba-Okha LGA, Edo State is near completion, bringing clean water to more than 4,000 residents along the Benin–Agbor Expressway.",
  openGraph: {
    title: "Ohovbe Community Borehole · Nigeria Water Project",
    description:
      "Borehole #6 is near completion in Ohovbe, bringing clean water to the heart of the community in Edo State, Nigeria.",
    images: [HERO],
  },
};

export default function OhovbePage() {
  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "78vh" }}
        aria-label="Ohovbe Community Borehole hero"
      >
        <div className="hero-media">
          <Image
            src={HERO}
            alt="Residents gathering at the Ohovbe Water Project tap station"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
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
          <span className="eyebrow" style={{ color: "#b7efec" }}>
            Borehole #6 · Near Completion
          </span>
          <h1>Ohovbe Community Borehole</h1>
          <p className="lede">
            Edo State, Nigeria
            <br />
            Bringing clean water to the heart of the community.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/donate">
              Donate Now
            </Link>
            <a className="btn btn-secondary" href="#gallery">
              View Gallery
            </a>
          </div>
        </div>
      </section>

      <section className="section band-foam" id="overview">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Community Overview</span>
              <h2>A Growing Neighborhood, One Essential Resource</h2>
              <p className="lede">
                Borehole #6 is rooted in Ohovbe Community so more than 4,000
                residents can depend on clean water close to home.
              </p>
            </div>
          </Reveal>
          <div className="project-overview">
            {overview.map((item, i) => (
              <Reveal key={item.label} delay={i * 55}>
                <article className="overview-card">
                  <div className="overview-icon" aria-hidden>
                    <OverviewIcon name={item.icon} />
                  </div>
                  <div className="eyebrow">{item.label}</div>
                  <h3>{item.value}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist" id="about">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">About Ohovbe</span>
            <h2>Life Along Ikpoba Hill</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Ohovbe Community sits within Ikpoba-Okha Local Government Area of
              Edo State, along the Benin–Agbor Expressway commonly known as
              Ikpoba Hill. Nestled in the Benin City metropolitan area, it is a
              growing residential settlement recognized for landmarks such as
              the nearby NNPC Depot.
            </p>
            <p>
              More than 4,000 residents call Ohovbe home. Like many
              fast-expanding neighborhoods, the community has faced
              infrastructure gaps, including limited access to reliable clean
              water. That gap shapes daily life for families, children, and
              elderly neighbors who deserve safer options closer to where they
              live.
            </p>
            <p>
              This borehole is designed to change that reality: dependable
              access to safe water that supports health, sanitation, dignity,
              and the long-term strength of a community already building its
              future.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <div className="media-frame">
              <Image
                src={ABOUT_IMAGE}
                alt="A resident collecting clean water at the Ohovbe borehole"
                width={1000}
                height={1200}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-foam" id="impact">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">The Impact</span>
              <h2>What Clean Water Makes Possible</h2>
              <p className="lede">
                Reliable water access is community transformation in practical
                form: healthier households, restored time, and a stronger
                foundation for everyday life.
              </p>
            </div>
          </Reveal>
          <div className="grid-3">
            {impactPoints.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <article className="feature overview-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist" id="gallery">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Image Gallery</span>
              <h2>From Construction to Community Use</h2>
              <p className="lede">
                See residents gathering at the taps, carrying water home, and
                the work that brought Borehole #6 this far.
              </p>
            </div>
          </Reveal>
          <PhotoGallery images={[...gallery]} />
        </div>
      </section>

      <section className="section band-foam" id="timeline">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Project Timeline</span>
              <h2>From Assessment to Service</h2>
            </div>
          </Reveal>
          <ol className="project-timeline">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <li
                  className={
                    item.current
                      ? "project-timeline-item is-current"
                      : "project-timeline-item"
                  }
                >
                  <div className="project-timeline-step">{item.step}</div>
                  <div>
                    <div className="community-meta">
                      {item.current ? "Current Milestone" : `Phase ${item.step}`}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-ink" id="voices">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow" style={{ color: "#7ad4d0" }}>
              Community Impact
            </span>
            <h2>People at the Center of the Story</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              This project is about families collecting water with less struggle,
              children carrying lighter loads, and neighbors sharing a public
              resource that restores dignity to daily routines.
            </p>
            <div className="voices-grid">
              {communityVoices.map((voice) => (
                <blockquote className="quote voice-card" key={voice.attribution}>
                  <p>“{voice.quote}”</p>
                  <cite>{voice.attribution}</cite>
                </blockquote>
              ))}
            </div>
            <p className="voice-note">
              Resident interviews can be added here as they become available.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <div className="media-frame landscape">
              <Image
                src={IMPACT_IMAGE}
                alt="Residents filling containers at the Ohovbe community taps"
                width={1200}
                height={900}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-mist" id="map">
        <div className="container grid-2" style={{ alignItems: "stretch" }}>
          <Reveal>
            <span className="eyebrow">Interactive Map</span>
            <h2>Ohovbe Within Edo State</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Borehole #6 joins our growing network of community water points
              across Edo State. Explore Ohovbe alongside earlier projects on
              the map.
            </p>
            <p>
              Located in Ikpoba-Okha along the Benin–Agbor corridor, Ohovbe
              brings clean water into a dense residential part of the Benin City
              metro area.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ProjectMapSection />
          </Reveal>
        </div>
      </section>

      <section className="section band-foam" id="related">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Related Projects</span>
              <h2>Explore Our Growing Impact</h2>
              <p className="lede">
                From Fortress Academy to earlier village boreholes, each site
                strengthens the same mission: clean water where communities need
                it most.
              </p>
            </div>
          </Reveal>
          <div className="community-grid">
            {related.map((c, i) => (
              <Reveal key={c.slug} delay={i * 50}>
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
      </section>

      <section className="section band-water" id="donate">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow" style={{ color: "#b7efec" }}>
              Call to Action
            </span>
            <h2>Every Community Deserves Clean Water.</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Every completed borehole brings clean water, better health, and
              new opportunities to communities across Nigeria. Your support
              helps make the next project possible.
            </p>
            <div className="cta-row" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/donate">
                Donate
              </Link>
              <Link className="btn btn-secondary" href="/#communities">
                View All Projects
              </Link>
              <Link className="btn btn-ghost" href="/about">
                Learn About Our Mission
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="media-frame landscape">
              <Image
                src="/assets/images/ohovbe/construction-sign.png"
                alt="Ohovbe Water Project sign in Edo State, Nigeria"
                width={1200}
                height={900}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
