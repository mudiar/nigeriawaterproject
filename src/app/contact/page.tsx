import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm, Reveal } from "@/components/ui/Interactive";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, collaborations, or partnership inquiries for Nigeria Water Project.",
};

export default function ContactPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: "5rem" }}>
      <div className="container grid-2">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h1>Let’s build the next well together</h1>
          <p className="lede">
            For any sort of questions, concerns, collaboration ideas, or
            all-around inquiries. Reach out.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <p>
              <strong>Primary</strong>
              <br />
              <a href={`mailto:${org.emails.stanford}`}>{org.emails.stanford}</a>
            </p>
            <p>
              <strong>General</strong>
              <br />
              <a href={`mailto:${org.emails.general}`}>{org.emails.general}</a>
            </p>
            <p>
              <strong>Partnerships</strong>
              <br />
              <a href={`mailto:${org.emails.partner}`}>{org.emails.partner}</a>
            </p>
            <p style={{ color: "var(--ink-soft)" }}>
              {org.locations.join(" · ")}
            </p>
          </div>
          <div className="media-frame landscape" style={{ marginTop: "2rem" }}>
            <Image
              src="/assets/images/GU0ET5sXAAAn_wV.jpg"
              alt="Community moment from Nigeria Water Project"
              width={1100}
              height={700}
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="donate-panel">
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
              Send a message
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
