"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ─── Data — edit links here ────────────────────────────────────────────────────

const COL_TWO = {
  heading: "Quick Links",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programme", href: "/programme" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Join the Club", href: "/join" },
  ],
};

const COL_THREE = {
  heading: "Get Involved",
  links: [
    { label: "Enrol Your Child", href: "/join" },
    { label: "Volunteer / Counsel", href: "/volunteer" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Honour Badges", href: "/badges" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
  ],
};

// Social icon definitions — replace hrefs with real URLs
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254700000000",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.306-1.554l-.38-.226-3.94 1.033 1.05-3.834-.248-.395A9.79 9.79 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="white"
        />
      </svg>
    ),
  },
];

// ─── Animation variant ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Reusable link column ─────────────────────────────────────────────────────

function LinkColumn({ heading, links, colIndex }) {
  return (
    <motion.div
      custom={colIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      {/* Column heading */}
      <h4
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#14532d",
          marginBottom: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        {heading}
      </h4>

      {/* Green accent line under heading */}
      <div
        style={{
          width: "32px",
          height: "2px",
          background: "linear-gradient(90deg, #16a34a, #4ade80)",
          borderRadius: "999px",
          marginBottom: "20px",
        }}
      />

      {/* Links */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} style={{ textDecoration: "none" }}>
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".93rem",
                  fontWeight: 400,
                  color: "#14532d",
                  padding: "6px 0",
                  transition: "color .18s",
                  cursor: "pointer",
                }}
                className="footer-link"
              >
                {/* Dot accent */}
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#16a34a",
                    flexShrink: 0,
                    opacity: 0.6,
                  }}
                />
                {link.label}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#e2f0de",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top green shimmer accent line */}
      <div
      // style={{
      //   height: "3px",
      //   background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
      // }}
      />

      {/* Decorative radial blob — top right */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-left blob */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main three-column grid ── */}
      <div className="container" style={{ padding: "64px 24px 52px" }}>
        <div className="row g-5">
          {/* ════ COLUMN 1 — Logo + tagline + socials ════ */}
          <div className="col-12 col-md-6 col-lg-4">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              {/* Logo + club name */}
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 82,
                    borderRadius: "0%",
                    // background: "rgba(255,255,255,0.1)",
                    //  border: "1.5px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {/* Swap with your real logo */}
                  <Image
                    src="/logoC.png"
                    alt="Shauri Moyo Pathfinder Club logo"
                    width={64}
                    height={54}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.25,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      color: "#14532d",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Shauri Moyo
                  </span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 500,
                      color: "#16a34a",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Pathfinder Club
                  </span>
                </div>
              </Link>

              {/* Tagline / description */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".9rem",
                  color: "#14532d",
                  lineHeight: 1.72,
                  marginBottom: "16px",
                  maxWidth: "280px",
                }}
              >
                A Christ-centred community growing young people in faith,
                service, and life skills — every Saturday at Shauri Moyo SDA
                Church.
              </p>

              {/* Scripture verse */}
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: ".82rem",
                  color: "#14532d",
                  lineHeight: 1.55,
                  borderLeft: "2px solid #16a34a",
                  paddingLeft: "12px",
                  marginBottom: "28px",
                }}
              >
                {/* "Train up a child in the way he should go…" — Prov 22:6 */}
                "Let the little children come to me…" — Matthew 19:14
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    whileHover={{
                      scale: 1.12,
                      y: -3,
                      background: "rgba(22,163,74,0.16)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: "rgba(22,163,74,0.08)",
                      border: "1px solid rgba(22,163,74,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#14532d",
                      textDecoration: "none",
                      transition: "background .18s, color .18s",
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════ COLUMN 2 — Quick Links ════ */}
          <div className="col-6 col-md-3 col-lg-4">
            <LinkColumn
              heading={COL_TWO.heading}
              links={COL_TWO.links}
              colIndex={1}
            />
          </div>

          {/* ════ COLUMN 3 — Get Involved ════ */}
          <div className="col-6 col-md-3 col-lg-4">
            <LinkColumn
              heading={COL_THREE.heading}
              links={COL_THREE.links}
              colIndex={2}
            />
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          borderTop: "1px solid rgba(20,83,45,0.1)",
          margin: "0 24px",
        }}
      />

      {/* ── Bottom bar ── */}
      <div className="container" style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: ".82rem",
              color: "rgba(20,83,45,0.8)",
              margin: 0,
            }}
          >
            © {year} Shauri Moyo Pathfinder Club · Seventh-day Adventist Church
          </p>

          {/* Bottom links */}
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Use"].map((label) => (
              <Link
                key={label}
                href="#"
                className="footer-link"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".82rem",
                  color: "rgba(20,83,45,0.8)",
                  textDecoration: "none",
                  transition: "color .18s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative cross — bottom right */}
      {/* <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "32px",
          right: "40px",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          stroke="white"
          strokeWidth="1"
        >
          <line x1="24" y1="4" x2="24" y2="44" />
          <line x1="4" y1="24" x2="44" y2="24" />
        </svg>
      </div> */}

      {/* Hover colour for footer links — injected globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .footer-link:hover { color: #16a34a !important; }
      `}</style>
    </footer>
  );
}
