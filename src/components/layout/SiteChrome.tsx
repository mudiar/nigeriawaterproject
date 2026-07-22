"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, org } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <Image
            src="/assets/images/nwp-logo.png"
            alt=""
            width={40}
            height={40}
            className="brand-mark"
            priority
          />
          <span className="brand-text">
            Nigeria <span>Water</span> Project
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Primary">
          {nav.map((item) =>
            item.children?.length ? (
              <div className="dropdown" key={item.label}>
                <button type="button" className="nav-btn" aria-haspopup="true">
                  {item.label}
                </button>
                <div className="dropdown-menu" role="menu">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ),
          )}
          <Link
            className="btn btn-primary header-cta"
            href="/donate"
            onClick={() => setOpen(false)}
          >
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
            <Image
              src="/assets/images/nwp-logo.png"
              alt=""
              width={52}
              height={52}
            />
            <h2 style={{ margin: 0 }}>
              Nigeria
              <br />
              Water Project
            </h2>
          </div>
          <p style={{ color: "rgba(231,239,238,.75)", maxWidth: "28rem" }}>
            Clean, sustainable water for communities across Nigeria, built with
            local partners and funded by people who believe water is a right.
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <a className="btn btn-primary" href="/donate">
              Donate Now
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/impact">Impact</Link>
          <Link href="/about">About</Link>
          <Link href="/photos">Stories</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Communities</h4>
          <Link href="/uvbevillage">Uvbe</Link>
          <Link href="/urhokuosa">Urhokuosa</Link>
          <Link href="/ebueneki-village">Ebue-Neki</Link>
          <Link href="/iguovbiobo">Iguovbiobo</Link>
          <Link href="/fortress-academy">Fortress Academy</Link>
          <Link href="/ohovbe">Ohovbe</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${org.emails.general}`}>{org.emails.general}</a>
          <a href={`mailto:${org.emails.stanford}`}>{org.emails.stanford}</a>
          <a href={`mailto:${org.emails.partner}`}>{org.emails.partner}</a>
          <p style={{ marginTop: "1rem", color: "rgba(231,239,238,.65)" }}>
            {org.locations.join(" · ")}
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
            <a href={org.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={org.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Nigeria Water Project</span>
        <span>EIN {org.ein} · 501(c)(3) via Mud Global Solutions</span>
      </div>
    </footer>
  );
}
