"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Data — replace src paths with your real images ───────────────────────────

const PHOTOS = [
  {
    src: "/pfA.jpg",
    alt: "Pathfinders during opening devotion",
    badgeEmoji: "🙏",
    badgeLabel: "Worship",
    category: "Faith",
    title: "Opening Devotion",
    caption: "Every session begins with prayer and Scripture.",
    gridArea: "cell1",
  },
  {
    src: "/pf staff.jpg",
    alt: "Pathfinders at Karura Forest campout",
    badgeEmoji: "⛺",
    badgeLabel: "Camp",
    category: "Outdoor",
    title: "Karura Forest Campout",
    caption: "Term 2 overnight camping trip, 2024.",
    gridArea: "cell2",
  },
  {
    src: "/pic.jpeg",
    alt: "Pathfinders during Bible study",
    badgeEmoji: "📖",
    badgeLabel: "Study",
    category: "Faith",
    title: "Bible Discovery Hour",
    caption: "Digging deep into the Word together.",
    gridArea: "cell3",
  },
  {
    src: "/pfA.jpg",
    alt: "Pathfinders doing arts and crafts",
    badgeEmoji: "🎨",
    badgeLabel: "Arts",
    category: "Creative",
    title: "Arts & Crafts Day",
    caption: "Creativity as a gift from God.",
    gridArea: "cell4",
  },
  {
    src: "/pf staff.jpg",
    alt: "Pathfinders during community outreach",
    badgeEmoji: "🤝",
    badgeLabel: "Outreach",
    category: "Service",
    title: "Kamukunji Community Day",
    caption: "Serving our neighbours with joy and purpose.",
    gridArea: "cell5",
  },
  {
    src: "/pfA.jpg",
    alt: "Pathfinders at investiture ceremony",
    badgeEmoji: "🎖️",
    badgeLabel: "Awards",
    category: "Achievement",
    title: "Investiture Ceremony 2024",
    caption: "A proud day for every Pathfinder family.",
    gridArea: "cell6",
  },
];

const STATS = [
  { num: "200+", label: "Photos in Gallery" },
  { num: "12", label: "Albums" },
  { num: "6", label: "Years Captured" },
  { num: "30+", label: "Events Documented" },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  //   visible: (i: number) => ({
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const tileVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  //   visible: (i: number) => ({
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Grid area map → CSS grid placement ───────────────────────────────────────
// Desktop:  4-column × 2-row masonry layout
// cell1 = wide (spans 2 cols), cells 2–6 fill the rest

const GRID_STYLES = {
  cell1: { gridColumn: "1 / 3", gridRow: "1 / 2" }, // wide hero top-left
  cell2: { gridColumn: "3 / 4", gridRow: "1 / 2" },
  cell3: { gridColumn: "4 / 5", gridRow: "1 / 2" },
  cell4: { gridColumn: "1 / 2", gridRow: "2 / 3" },
  cell5: { gridColumn: "2 / 4", gridRow: "2 / 3" }, // wide bottom-middle
  cell6: { gridColumn: "4 / 5", gridRow: "2 / 3" },
};

// ─── Single photo tile ────────────────────────────────────────────────────────

function PhotoTile({ photo, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={tileVariant}
      style={{
        ...GRID_STYLES[photo.gridArea],
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#d1fae5",
      }}
      className="gallery-tile" // hover handled via CSS below
    >
      {/* Photo */}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        quality={85}
        className="gallery-tile-img"
      />

      {/* Always-visible badge pill (top-left) */}
      <div
        className="gallery-tile-badge"
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "10px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#ffffff",
          borderRadius: "999px",
          padding: "3px 10px",
          transition: "opacity .3s",
        }}
      >
        {photo.badgeEmoji} {photo.badgeLabel}
      </div>

      {/* Hover overlay — gradient + caption */}
      <div
        className="gallery-tile-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "linear-gradient(to top, rgba(10,40,15,.88) 0%, rgba(10,40,15,.25) 55%, transparent 100%)",
          opacity: 0,
          transition: "opacity .3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        {/* Green shimmer line at the very bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
          }}
        />

        {/* Category badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "10px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            background: "#dcfce7",
            color: "#15803d",
            borderRadius: "999px",
            padding: "2px 10px",
            width: "fit-content",
            marginBottom: "7px",
          }}
        >
          {photo.category}
        </span>

        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: ".95rem",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "3px",
          }}
        >
          {photo.title}
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".78rem",
            color: "rgba(255,255,255,.78)",
            lineHeight: 1.45,
          }}
        >
          {photo.caption}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function GalleryPreviewSection() {
  return (
    <section
      style={{
        background: "#f2f8f3",
        padding: "88px 0 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "380px",
          height: "380px",
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
          width: "280px",
          height: "280px",
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
          style={{ marginBottom: "40px" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              {/* Eyebrow */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "11px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600,
                  letterSpacing: ".13em",
                  textTransform: "uppercase",
                  color: "#15803d",
                  background: "#dcfce7",
                  padding: "5px 15px",
                  borderRadius: "999px",
                  marginBottom: "16px",
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
                Photo Gallery
              </span>

              <h2
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(1.9rem,3.5vw,2.6rem)",
                  fontWeight: 700,
                  color: "#14532d",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "10px",
                }}
              >
                Moments That{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#16a34a",
                  }}
                >
                  Tell Our Story
                </em>
              </h2>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".95rem",
                  color: "#4b7a5c",
                  lineHeight: 1.7,
                  maxWidth: "440px",
                  margin: 0,
                }}
              >
                A glimpse into the adventures, friendships, and faith that make
                the Shauri Moyo Pathfinder Club a place like no other.
              </p>
            </div>

            {/* View all link */}
            <motion.div whileHover={{ scale: 1.03 }}>
              <Link
                href="/gallery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: ".88rem",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600,
                  color: "#15803d",
                  textDecoration: "none",
                  border: "1.5px solid #bbf7d0",
                  borderRadius: "999px",
                  padding: "9px 18px",
                  background: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                View Full Gallery
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
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Masonry photo grid ── */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "220px 220px",
            gap: "14px",
            marginBottom: "44px",
          }}
          className="gallery-grid"
        >
          {PHOTOS.map((photo, i) => (
            <PhotoTile key={photo.gridArea} photo={photo} index={i} />
          ))}
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
            marginBottom: "44px",
            padding: "24px 28px",
            background: "#ffffff",
            border: "1px solid #d1fae5",
            borderRadius: "20px",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#15803d",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: "#4b7a5c",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA banner ── */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            background: "linear-gradient(135deg, #14532d, #15803d)",
            borderRadius: "22px",
            padding: "36px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              See Every Moment
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: ".93rem",
                color: "#86efac",
                lineHeight: 1.55,
                maxWidth: "380px",
                margin: 0,
              }}
            >
              Browse the full gallery — camps, ceremonies, outreach days, and
              all the in-between moments that make us who we are.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <Link
              href="/gallery"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#fff",
                color: "#15803d",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "13px 26px",
                fontSize: ".95rem",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Open Full Gallery
              <svg
                width="15"
                height="15"
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
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Hover styles + responsive grid ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        /* Image zoom on tile hover */
        .gallery-tile:hover .gallery-tile-img {
          transform: scale(1.06);
          transition: transform .45s cubic-bezier(.22,1,.36,1);
        }
        .gallery-tile-img {
          transition: transform .45s cubic-bezier(.22,1,.36,1);
        }

        /* Show overlay on hover */
        .gallery-tile:hover .gallery-tile-overlay {
          opacity: 1 !important;
        }

        /* Hide always-visible badge when overlay appears */
        .gallery-tile:hover .gallery-tile-badge {
          opacity: 0;
        }

        /* ── Tablet: 2-column grid ── */
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 180px 180px 180px !important;
          }
          /* Remap grid areas for 2 columns */
          .gallery-grid > div:nth-child(1) { grid-column: 1/3 !important; grid-row: 1 !important; }
          .gallery-grid > div:nth-child(2) { grid-column: 1/2 !important; grid-row: 2 !important; }
          .gallery-grid > div:nth-child(3) { grid-column: 2/3 !important; grid-row: 2 !important; }
          .gallery-grid > div:nth-child(4) { grid-column: 1/2 !important; grid-row: 3 !important; }
          .gallery-grid > div:nth-child(5) { grid-column: 2/3 !important; grid-row: 3 !important; }
          .gallery-grid > div:nth-child(6) { display: none !important; }
        }

        /* ── Mobile: single column ── */
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(4, 200px) !important;
          }
          .gallery-grid > div { grid-column: 1 !important; }
          .gallery-grid > div:nth-child(1) { grid-row: 1 !important; }
          .gallery-grid > div:nth-child(2) { grid-row: 2 !important; }
          .gallery-grid > div:nth-child(3) { grid-row: 3 !important; }
          .gallery-grid > div:nth-child(4) { grid-row: 4 !important; }
          .gallery-grid > div:nth-child(5),
          .gallery-grid > div:nth-child(6) { display: none !important; }
        }
      `}</style>
    </section>
  );
}
