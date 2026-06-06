"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Types (JSX) ───────────────────────────────────────────────────────────────
// Gallery card shape:
// { src, alt, badge, badgeBg, badgeColor, title, paragraph }

// ─── Data — swap src paths with your real images ───────────────────────────────

const CARDS = [
  {
    src: "/pf staff.jpg",
    alt: "Pathfinders during worship session",
    badge: "Faith",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    title: "Growing in Faith Together",
    paragraph:
      "Every session begins with worship, prayer, and time in the Word. Our Pathfinders are building a personal relationship with God from an early age — one that will sustain them for life.",
  },
  {
    src: "/pfA.jpg",
    alt: "Pathfinders on a camping trip",
    badge: "Adventure",
    badgeBg: "#d1fae5",
    badgeColor: "#059669",
    title: "Adventures in God's Creation",
    paragraph:
      "From Karura Forest campouts to nature walks and survival drills, our outdoor programme teaches resilience, teamwork, and a deep reverence for the world God made.",
  },
  {
    src: "/pic.jpeg",
    alt: "Pathfinders doing community outreach",
    badge: "Outreach",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    title: "Serving the Shauri Moyo Community",
    paragraph:
      "Faith without works is empty. Our Pathfinders take that seriously — visiting hospitals, running food drives, and cleaning public spaces to be the hands and feet of Jesus.",
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      delay: 0.15 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Single Card ───────────────────────────────────────────────────────────────

function ImageCard({ card, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariant}
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{
        background: "#ffffff",
        border: "1px solid #d1fae5",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* ── Image ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          background: "#dcfce7", // fallback colour while image loads
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={85}
        />

        {/* Green shimmer line at the bottom of the image */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
          }}
        />
      </div>

      {/* ── Card body ── */}
      <div
        style={{
          padding: "24px 22px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {/* Category badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "10.5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            borderRadius: "999px",
            padding: "3px 12px",
            width: "fit-content",
            background: card.badgeBg,
            color: card.badgeColor,
          }}
        >
          {card.badge}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#14532d",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {card.title}
        </h3>

        {/* Paragraph */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".93rem",
            color: "#6b9e7e",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {card.paragraph}
        </p>

        {/* Read more link */}
        <motion.a
          href="#"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".85rem",
            fontWeight: 600,
            color: "#15803d",
            textDecoration: "none",
            marginTop: "4px",
          }}
        >
          Read more
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function ImageCardsSection() {
  return (
    <section
      style={{
        background: "#f2f8f3",
        padding: "88px 0 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs — same as every other section */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-40px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(21,128,61,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* ── Section heading ── */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          {/* Eyebrow pill */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#15803d",
              background: "#dcfce7",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#16a34a",
              }}
            />
            Life in the Club
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Glimpses of Our{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#16a34a",
              }}
            >
              Pathfinder Journey
            </em>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              color: "#4b7a5c",
              lineHeight: 1.72,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            From worship halls to open forests — every moment in the Shauri Moyo
            Pathfinder Club is a step in a lifelong journey of faith and
            service.
          </p>
        </motion.div>

        {/* ── Three-column cards ── */}
        {/*
          Bootstrap classes handle responsiveness:
          col-12        → 1 column on mobile  (< 576px)
          col-sm-6      → 2 columns on small  (≥ 576px)
          col-lg-4      → 3 columns on large  (≥ 992px)
        */}
        <div className="row g-4">
          {CARDS.map((card, i) => (
            <div key={card.title} className="col-12 col-sm-6 col-lg-4">
              <ImageCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}
