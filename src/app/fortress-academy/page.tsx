import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Reveal, StatCounter } from "@/components/ui/Interactive";
import { org } from "@/lib/content";

const HERO =
  "/assets/images/fortress-academy/students-circle.png";
const STORY_IMAGE =
  "/assets/images/fortress-academy/students-running.png";
const WHY_IMAGE =
  "/assets/images/fortress-academy/students-crafts.png";

const gallery = [
  {
    src: "/assets/images/fortress-academy/tanks-and-taps.png",
    alt: "Elevated water tanks and tap station under construction at Fortress Academy",
    featured: true,
  },
  {
    src: "/assets/images/fortress-academy/tower-wellhead.png",
    alt: "Borehole wellhead and elevated MARIO storage tank on campus",
    featured: true,
  },
  {
    src: "/assets/images/fortress-academy/taps-construction.png",
    alt: "PVC distribution pipes and blue valves at the Fortress Academy tap wall",
  },
  {
    src: "/assets/images/fortress-academy/site-overview.png",
    alt: "Overview of the Fortress Academy borehole site near completion",
  },
  {
    src: "/assets/images/fortress-academy/students-circle.png",
    alt: "Fortress Academy students holding hands in a circle on campus",
  },
  {
    src: "/assets/images/fortress-academy/students-running.png",
    alt: "Students running across the Fortress Academy courtyard",
  },
  {
    src: "/assets/images/fortress-academy/students-crafts.png",
    alt: "Students and a teacher presenting handmade string-art projects",
  },
] as const;

const overview = [
  {
    label: "Location",
    value: "Fortress Academy, Edo State",
    icon: "pin",
  },
  {
    label: "Status",
    value: "Near Completion",
    icon: "status",
  },
  {
    label: "Water Capacity",
    value: "45,000 Liters",
    icon: "drop",
  },
  {
    label: "Project Number",
    value: "Borehole #5",
    icon: "hash",
  },
  {
    label: "Organization",
    value: org.name,
    icon: "org",
  },
] as const;

const timeline: {
  step: string;
  title: string;
  body: string;
  current?: boolean;
}[] = [
  {
    step: "01",
    title: "Planning",
    body: "Site assessment with school leadership to place storage and taps where students can reach them safely every day.",
  },
  {
    step: "02",
    title: "Construction",
    body: "Drilling, tower installation, elevated tanks, and distribution plumbing take shape across the campus grounds.",
  },
  {
    step: "03",
    title: "Near Completion",
    body: "Tanks are standing, pipes are in place, and finishing work brings the system toward reliable daily service.",
    current: true,
  },
  {
    step: "04",
    title: "Community Use",
    body: "Students, teachers, and staff draw clean water on campus, supporting health, hygiene, and uninterrupted learning.",
  },
];

const whyMatters = [
  {
    title: "Education",
    body: "When water is close, students spend less time searching for it and more time learning, playing, and growing.",
  },
  {
    title: "Student Health",
    body: "Clean water lowers the risk of waterborne illness and helps children stay strong enough to thrive in school.",
  },
  {
    title: "Hygiene & Dignity",
    body: "Reliable taps support handwashing, sanitation, and the everyday dignity of a safe campus environment.",
  },
  {
    title: "Long-Term Sustainability",
    body: "Durable tanks, pumps, and community ownership keep this investment serving Fortress Academy for years ahead.",
  },
] as const;

function OverviewIcon({ name }: { name: (typeof overview)[number]["icon"] }) {
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
    case "status":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 12.5 11 15l4.5-5" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.2 6 10.2A6 6 0 0 1 6 13.2C6 9.2 12 3 12 3z" />
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
  title: "Fortress Academy Borehole",
  description:
    "Borehole #5 at Fortress Academy in Edo State, Nigeria is near completion, bringing 45,000 liters of clean water storage to students, teachers, and staff.",
  openGraph: {
    title: "Fortress Academy Borehole · Nigeria Water Project",
    description:
      "Borehole #5 is near completion at Fortress Academy, Edo State, bringing clean water to the next generation.",
    images: [HERO],
  },
};

export default function FortressAcademyPage() {
  return (
    <>
      <section
        className="hero"
        style={{ minHeight: "78vh" }}
        aria-label="Fortress Academy Borehole hero"
      >
        <div className="hero-media">
          <Image
            src={HERO}
            alt="Fortress Academy students gathered in a circle on campus"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
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
            Borehole #5 · Near Completion
          </span>
          <h1>Fortress Academy Borehole</h1>
          <p className="lede">
            Edo State, Nigeria
            <br />
            Bringing clean water to the next generation.
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
              <span className="eyebrow">Project Overview</span>
              <h2>A School Campus, One Reliable Water Source</h2>
              <p className="lede">
                Borehole #5 is rising on the grounds of Fortress Academy so
                students and staff can depend on clean water where they learn
                every day.
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

      <section className="section band-mist" id="story">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow">The Story</span>
            <h2>Clean Water Where Learning Happens</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Fortress Academy is more than classrooms and courtyards. It is
              where young people gather to study, create, compete, and grow.
              Without dependable water on campus, every school day carries an
              invisible cost: time lost fetching water, greater health risk, and
              harder conditions for hygiene and care.
            </p>
            <p>
              This borehole is being built to change that. Elevated storage,
              distribution pipes, and a shared tap station are designed to bring
              clean, safe water within reach of students, teachers, and staff.
              When the system is fully online, Fortress Academy will have a
              lasting source of water that supports learning rather than
              interrupting it.
            </p>
            <p>
              From healthier learning environments to improved sanitation and
              dignity, Borehole #5 is an investment in the next generation and
              in the long-term strength of this school community.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <div className="media-frame">
              <Image
                src={STORY_IMAGE}
                alt="Students running across the Fortress Academy courtyard"
                width={1000}
                height={1200}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-foam" id="gallery">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Image Gallery</span>
              <h2>From Construction Grounds to Campus Life</h2>
              <p className="lede">
                Follow the progress of Borehole #5, from tanks and taps rising
                on red earth to the students this water will serve.
              </p>
            </div>
          </Reveal>
          <PhotoGallery images={[...gallery]} />
        </div>
      </section>

      <section className="section band-ink" id="impact">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow" style={{ color: "#7ad4d0" }}>
                Impact Metrics
              </span>
              <h2>What This Borehole Represents</h2>
            </div>
          </Reveal>
          <div className="stats project-stats">
            <StatCounter
              value={5}
              suffix=""
              label="Borehole Number"
              detail="Our fifth community water project"
            />
            <StatCounter
              value={45000}
              suffix="L"
              label="Storage Capacity"
              detail="Three GeePee tanks serving campus demand"
            />
            <div className="stat">
              <div className="stat-value" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Fortress
              </div>
              <div className="stat-label">Academy Campus</div>
              <div className="stat-detail">
                Clean water for students, teachers, and staff
              </div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Edo
              </div>
              <div className="stat-label">State, Nigeria</div>
              <div className="stat-detail">Rooted in local partnership and need</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}>
                Near Done
              </div>
              <div className="stat-label">Current Status</div>
              <div className="stat-detail">
                Infrastructure standing; finishing work underway
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-mist" id="timeline">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Project Timeline</span>
              <h2>From Plan to Campus Use</h2>
            </div>
          </Reveal>
          <ol className="project-timeline">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
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

      <section className="section band-foam" id="why">
        <div className="container grid-2">
          <Reveal delay={80}>
            <div className="media-frame landscape">
              <Image
                src={WHY_IMAGE}
                alt="Fortress Academy students with handmade classroom projects"
                width={1200}
                height={900}
              />
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">Why This Matters</span>
            <h2>Water That Protects Learning</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Reliable water access is not a side project for a school. It is
              part of how education, health, and dignity take root.
            </p>
            <div className="why-grid">
              {whyMatters.map((item) => (
                <article className="feature" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band-water" id="donate">
        <div className="container grid-2">
          <Reveal>
            <span className="eyebrow" style={{ color: "#b7efec" }}>
              Call to Action
            </span>
            <h2>
              Every Completed Well Creates Opportunities That Last for
              Generations.
            </h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Help us bring clean water to the next community. Your gift funds
              drilling, tanks, pumps, and the follow-through that keeps water
              flowing.
            </p>
            <div className="cta-row" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/donate">
                Donate
              </Link>
              <Link className="btn btn-secondary" href="/#communities">
                View Our Projects
              </Link>
              <Link className="btn btn-ghost" href="/about">
                Learn More
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="media-frame landscape">
              <Image
                src="/assets/images/fortress-academy/tanks-and-taps.png"
                alt="Fortress Academy water tanks and tap station near completion"
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
