"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const STAFF = [
  // ── Director ────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Mr. Samuel Kariuki",
    title: "Club Director",
    tier: "director",
    photo: "/pf staff.jpg",
    bio: `It has been the greatest honour of my life to serve as Director of the Shauri Moyo Pathfinder Club for the past twelve years. When I walk into our church hall every Saturday and see young people arriving with energy, curiosity, and a hunger to grow, I am reminded afresh why this ministry matters so deeply.

The Pathfinder programme is not simply an after-school activity. It is a covenant — a commitment between the church, parents, and counsellors to invest in the whole person: spirit, mind, body, and service. We do not just teach children how to pitch a tent or earn a badge. We walk with them as they discover who God made them to be.

My prayer is that every child who passes through our doors leaves with three things: an unshakeable faith in Jesus Christ, a lifelong love of learning, and a heart that beats for their community. Welcome to the Shauri Moyo Pathfinder Club family.`,
    quote: "We walk with children as they discover who God made them to be.",
    honours: [
      "Master Guide",
      "Conference Director Award 2022",
      "12 Years Service",
    ],
    years: "Since 2012",
    featured: true,
  },

  // ── Deputy Directors ─────────────────────────────────────────────────────
  {
    id: 2,
    name: "Mrs. Faith Achieng",
    title: "Deputy Director — Programme",
    tier: "deputy",
    photo: "/pfA.jpg",
    bio: "Faith oversees all weekly programming, honour badge curriculum, and the annual Investiture Ceremony. A Master Guide with 9 years of service, she brings both structure and warmth to everything she leads.",
    quote:
      "A well-planned programme is an act of love for every child in the room.",
    honours: ["Master Guide", "9 Years Service"],
    years: "Since 2015",
    featured: true,
  },
  {
    id: 3,
    name: "Mr. Daniel Omondi",
    title: "Deputy Director — Outreach",
    tier: "deputy",
    photo: "/pic.jpeg",
    bio: "Daniel coordinates all community service projects, hospital visits, food drives, and mission activities. Under his leadership, the club's outreach reach has grown from one to six communities.",
    quote:
      "Service is not what we do on top of Pathfinders — it is what Pathfinders is.",
    honours: ["Master Guide", "Community Service Award 2023"],
    years: "Since 2016",
    featured: true,
  },

  // ── Instructors ──────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Ms. Grace Wangari",
    title: "Instructor — Arts & Crafts",
    tier: "instructor",
    photo: "/images/staff-instructor1.jpg",
    quote:
      "Every child is an artist. My job is simply to help them believe it.",
    honours: ["Honour Badge Instructor"],
    years: "Since 2018",
  },
  {
    id: 5,
    name: "Mr. Peter Mutua",
    title: "Instructor — Outdoor Skills",
    tier: "instructor",
    photo: "/images/staff-instructor2.jpg",
    quote:
      "God's classroom has no walls — it is the open sky and the forest floor.",
    honours: ["Camping & Survival Certified"],
    years: "Since 2019",
  },
  {
    id: 6,
    name: "Mrs. Rose Njeri",
    title: "Instructor — First Aid & Safety",
    tier: "instructor",
    photo: "/images/staff-instructor3.jpg",
    quote:
      "Knowing how to help in a crisis is one of the greatest gifts we can give a child.",
    honours: ["St. John Ambulance Certified"],
    years: "Since 2020",
  },
  {
    id: 7,
    name: "Mr. Brian Koech",
    title: "Instructor — Music & Worship",
    tier: "instructor",
    photo: "/images/staff-instructor4.jpg",
    quote:
      "Worship is the heartbeat of our club — music is how we keep the rhythm.",
    honours: ["Music Ministry Certified"],
    years: "Since 2019",
  },

  // ── Staff / Counsellors ───────────────────────────────────────────────────
  {
    id: 8,
    name: "Mr. James Otieno",
    title: "Unit Counsellor — Eagles",
    tier: "staff",
    photo: "/images/staff-counsellor1.jpg",
    quote: "I was a Pathfinder here. Now I give back what was given to me.",
    years: "Since 2020",
  },
  {
    id: 9,
    name: "Ms. Lydia Kamau",
    title: "Unit Counsellor — Doves",
    tier: "staff",
    photo: "/images/staff-counsellor2.jpg",
    quote: "When a child trusts you, they will walk through any challenge.",
    years: "Since 2021",
  },
  {
    id: 10,
    name: "Mr. Victor Onyango",
    title: "Unit Counsellor — Lions",
    tier: "staff",
    photo: "/images/staff-counsellor3.jpg",
    quote: "Structure and love are not opposites — both make a child flourish.",
    years: "Since 2022",
  },
  {
    id: 11,
    name: "Ms. Mercy Wambua",
    title: "Unit Counsellor — Shields",
    tier: "staff",
    photo: "/images/staff-counsellor4.jpg",
    quote:
      "The best part of Pathfinders is watching a shy child become a leader.",
    years: "Since 2022",
  },

  // ── Junior Staff ──────────────────────────────────────────────────────────
  {
    id: 12,
    name: "Calvin Mwangi",
    title: "Junior Counsellor",
    tier: "junior",
    photo: "/images/staff-junior1.jpg",
    quote: "I am learning to lead by serving first.",
    years: "Since 2023",
  },
  {
    id: 13,
    name: "Sharon Akinyi",
    title: "Junior Counsellor",
    tier: "junior",
    photo: "/images/staff-junior2.jpg",
    quote: "Every Saturday teaches me something new about people and faith.",
    years: "Since 2023",
  },
  {
    id: 14,
    name: "Brian Kiplagat",
    title: "Junior Counsellor",
    tier: "junior",
    photo: "/images/staff-junior3.jpg",
    quote: "I want to be the counsellor I needed when I was ten.",
    years: "Since 2024",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "2012",
    title: "Club Founded",
    desc: "Shauri Moyo Pathfinder Club was established with 18 founding members and 3 counsellors.",
  },
  {
    year: "2015",
    title: "First Campout",
    desc: "Our inaugural overnight camping trip to Karura Forest — a tradition that continues to this day.",
  },
  {
    year: "2017",
    title: "Conference Recognition",
    desc: "Awarded Best Pathfinder Club in the Nairobi Conference for programme excellence.",
  },
  {
    year: "2019",
    title: "100 Members",
    desc: "Membership crossed the 100 mark, prompting expansion to six units and four new counsellors.",
  },
  {
    year: "2022",
    title: "Director Award",
    desc: "Director Samuel Kariuki received the Conference Director of the Year Award.",
  },
  {
    year: "2024",
    title: "120+ Members",
    desc: "A record 42 honour badges were earned in a single term, and the club launched its first outreach video series.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CORE VALUES
// ─────────────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    emoji: "✝️",
    title: "Faith First",
    desc: "Everything we do is rooted in a personal relationship with Jesus Christ and the Word of God.",
  },
  {
    emoji: "🤝",
    title: "Servant Heart",
    desc: "We model servant leadership — leading by example, putting others before ourselves.",
  },
  {
    emoji: "🌿",
    title: "Whole-Person Growth",
    desc: "We nurture the spiritual, mental, physical, and social development of every child.",
  },
  {
    emoji: "🏕️",
    title: "Adventure & Discovery",
    desc: "We believe God is glorified when young people explore and steward His creation.",
  },
  {
    emoji: "🎖️",
    title: "Excellence",
    desc: "We pursue the highest standards in programme, character, and community impact.",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Family",
    desc: "The Pathfinder Club is a family — inclusive, safe, and committed to every member.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TIER CONFIG — styling per tier
// ─────────────────────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  director: {
    label: "Director",
    badgeBg: "#14532d",
    badgeColor: "#4ade80",
    photoBorder: "#16a34a",
    photoSize: 160,
  },
  deputy: {
    label: "Deputy Director",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    photoBorder: "#22c55e",
    photoSize: 130,
  },
  instructor: {
    label: "Instructor",
    badgeBg: "#d1fae5",
    badgeColor: "#059669",
    photoBorder: "#86efac",
    photoSize: 110,
  },
  staff: {
    label: "Counsellor",
    badgeBg: "#f0fdf4",
    badgeColor: "#16a34a",
    photoBorder: "#bbf7d0",
    photoSize: 96,
  },
  junior: {
    label: "Junior Staff",
    badgeBg: "#f0fdf4",
    badgeColor: "#4b7a5c",
    photoBorder: "#d1fae5",
    photoSize: 88,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// LEADERSHIP CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────

function LeadershipCarousel() {
  const featured = STAFF.filter((s) => s.featured);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const go = useCallback(
    (idx, d) => {
      setDir(d);
      setCurrent((idx + featured.length) % featured.length);
    },
    [featured.length],
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % featured.length);
    }, 6000);
  }, [featured.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const member = featured[current];
  const cfg = TIER_CONFIG[member.tier];

  const slideVar = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d) => ({
      opacity: 0,
      x: d > 0 ? -60 : 60,
      transition: { duration: 0.35 },
    }),
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(400px, 55vh, 580px)",
        overflow: "hidden",
        borderRadius: "0 0 28px 28px",
        background: "#14532d",
      }}
    >
      {/* BG photo */}
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={member.id}
          custom={dir}
          variants={slideVar}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            quality={90}
            priority
          />
          {/* Two-layer overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,40,15,.92) 40%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(10,40,15,.8) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="container"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          maxWidth: "1100px",
        }}
      >
        <div style={{ maxWidth: 540, zIndex: 10 }}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={member.id}
              custom={dir}
              variants={slideVar}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "11px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                  background: "rgba(74,222,128,.15)",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                />
                Leadership Spotlight
              </span>

              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                {member.name}
              </h1>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "1.1rem",
                  color: "#86efac",
                  fontWeight: 500,
                  marginBottom: 24,
                }}
              >
                {member.title}
              </p>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,.8)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 480,
                }}
              >
                {member.bio}
              </p>

              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Link
                  href="/about/leadership"
                  style={{
                    background: "#fff",
                    color: "#14532d",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".95rem",
                  }}
                >
                  View Full Profile
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 20,
          }}
        >
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              style={{
                width: i === current ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? "#4ade80" : "rgba(255,255,255,.3)",
                border: "none",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIRECTOR'S MESSAGE
// ─────────────────────────────────────────────────────────────────────────────

function DirectorMessage() {
  const director = STAFF.find((s) => s.tier === "director");
  if (!director) return null;

  const paragraphs = director.bio.split("\n\n");

  return (
    <section
      style={{ background: "#fff", padding: "100px 0", position: "relative" }}
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="row align-items-center g-5">
          {/* Photo side */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: "relative" }}
            >
              {/* Decorative frame */}
              <div
                style={{
                  position: "absolute",
                  inset: -15,
                  border: "2px solid #dcfce7",
                  borderRadius: 24,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(20,83,45,.12)",
                  zIndex: 1,
                }}
              >
                <Image
                  src={director.photo}
                  alt={director.name}
                  width={600}
                  height={750}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {/* Floating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 30,
                  right: -20,
                  background: "#14532d",
                  color: "#fff",
                  padding: "16px 24px",
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(0,0,0,.2)",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  12+ Years
                </div>
                <div
                  style={{
                    fontSize: ".75rem",
                    opacity: 0.8,
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  Of Leadership
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text side */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#16a34a",
                  textTransform: "uppercase",
                  letterSpacing: ".15em",
                  marginBottom: 12,
                }}
              >
                A Message from our Director
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  color: "#14532d",
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Building a Legacy of{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#16a34a",
                  }}
                >
                  Faith
                </em>
              </h2>

              <blockquote
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "#14532d",
                  borderLeft: "3px solid #16a34a",
                  paddingLeft: 16,
                  margin: "0 0 24px",
                  lineHeight: 1.65,
                  background: "#f0fdf4",
                }}
              >
                &quot;{director.quote}&quot;
              </blockquote>

              {/* Message paragraphs */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: ".97rem",
                      color: "#4b7a5c",
                      lineHeight: 1.78,
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Signature */}
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#dcfce7",
                    border: "2px solid #bbf7d0",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={director.photo}
                    alt={director.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="48px"
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      color: "#14532d",
                    }}
                  >
                    Samuel Kariuki
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: ".82rem",
                      color: "#4b7a5c",
                    }}
                  >
                    Club Director, Shauri Moyo Pathfinder Club
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAFF CARD
// ─────────────────────────────────────────────────────────────────────────────

function StaffCard({ member, index }) {
  const cfg = TIER_CONFIG[member.tier];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{
        background: "#fff",
        border: "1px solid #d1fae5",
        borderRadius: "20px",
        padding: "28px 20px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Corner blob accent */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "#f0fdf4",
          pointerEvents: "none",
        }}
      />

      {/* Photo */}
      <div
        style={{
          width: cfg.photoSize,
          height: cfg.photoSize,
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${cfg.photoBorder}`,
          margin: "0 auto 16px",
          position: "relative",
          boxShadow: "0 6px 20px rgba(21,128,61,.15)",
        }}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="160px"
        />
      </div>

      {/* Tier badge */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: "10px",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 600,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          background: cfg.badgeBg,
          color: cfg.badgeColor,
          borderRadius: "999px",
          padding: "3px 10px",
          marginBottom: 10,
        }}
      >
        {cfg.label}
      </span>

      <h3
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#14532d",
          marginBottom: 4,
          lineHeight: 1.2,
        }}
      >
        {member.name}
      </h3>

      <p
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: ".82rem",
          color: "#4b7a5c",
          marginBottom: 10,
          fontWeight: 500,
        }}
      >
        {member.title}
      </p>

      {/* Quote */}
      {member.quote && (
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontStyle: "italic",
            fontSize: ".85rem",
            color: "#6b9e7e",
            lineHeight: 1.6,
            margin: "0 0 12px",
          }}
        >
          ";quote {member.quote}"
        </p>
      )}

      {/* Years */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: "#15803d",
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {member.years}
      </div>

      {/* Honours for instructors + */}
      {member.honours && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {member.honours.map((h) => (
            <span
              key={h}
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                background: "#f0fdf4",
                color: "#15803d",
                borderRadius: "999px",
                padding: "2px 8px",
                border: "1px solid #bbf7d0",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAFF SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function StaffTierSection({ tier, title, subtitle, bg, colClass }) {
  const members = STAFF.filter((s) => s.tier === tier);

  return (
    <section
      style={{
        background: bg,
        padding: "72px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* Heading */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#15803d",
              background: "#dcfce7",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: 14,
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
            {title}
          </span>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: ".97rem",
              color: "#4b7a5c",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="row g-4 justify-content-center">
          {members.map((m, i) => (
            <div key={m.id} className={colClass}>
              <StaffCard member={m} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MISSION + VALUES
// ─────────────────────────────────────────────────────────────────────────────

function MissionValues() {
  return (
    <section
      style={{
        background: "#14532d",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -40,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px" }}>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#4ade80",
              background: "rgba(74,222,128,.12)",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#4ade80",
              }}
            />
            Mission & Values
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.9rem,3.5vw,2.7rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            What We Stand{" "}
            <em
              style={{ fontStyle: "italic", fontWeight: 400, color: "#4ade80" }}
            >
              For
            </em>
          </h2>
          {/* Mission statement */}
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#86efac",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            "To empower young people to make Jesus their Lord and Saviour, and
            to grow into whole, servant-hearted, and excellent members of
            family, church, and community."
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="row g-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="col-md-4 col-sm-6 col-12">
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{
                  background: "rgba(255,255,255,.06)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 20,
                  padding: "28px 22px",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{v.emoji}</div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".9rem",
                    color: "rgba(255,255,255,.7)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

function HistoryTimeline() {
  return (
    <section style={{ background: "#fff", padding: "80px 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#15803d",
              background: "#dcfce7",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: 16,
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
            Our History
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.9rem,3.5vw,2.6rem)",
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            A Decade of{" "}
            <em
              style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}
            >
              Growth
            </em>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 11,
              width: 2,
              background: "linear-gradient(to bottom, #16a34a, #bbf7d0)",
              borderRadius: "999px",
            }}
          />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 20,
                marginBottom: i < TIMELINE.length - 1 ? 36 : 0,
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: -32,
                  top: 4,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#16a34a",
                  border: "3px solid #f2f8f3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#fff",
                  }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #d1fae5",
                  borderRadius: 16,
                  padding: "18px 22px",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#16a34a",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {item.year}
                </span>
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#14532d",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".88rem",
                    color: "#4b7a5c",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA STRIP
// ─────────────────────────────────────────────────────────────────────────────

function CTAStrip() {
  return (
    <section style={{ background: "#f2f8f3", padding: "72px 0 88px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            background: "linear-gradient(135deg, #14532d, #15803d)",
            borderRadius: 22,
            padding: "44px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Want to Volunteer with Us?
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: ".95rem",
                color: "#86efac",
                lineHeight: 1.6,
                maxWidth: 400,
                margin: 0,
              }}
            >
              We are always looking for passionate adults to join our team as
              counsellors, instructors, or parent volunteers.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/volunteer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  color: "#15803d",
                  textDecoration: "none",
                  borderRadius: "999px",
                  padding: "13px 26px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".95rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Join the Team
                <svg
                  width="14"
                  height="14"
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
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "999px",
                  padding: "12px 22px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".95rem",
                  fontWeight: 600,
                  border: "1.5px solid rgba(255,255,255,.35)",
                  whiteSpace: "nowrap",
                }}
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>
      {/* 1 — Leadership hero carousel */}
      <LeadershipCarousel />

      {/* 2 — Director's message */}
      <DirectorMessage />

      {/* 3 — Deputy Directors  (2-col) */}
      <StaffTierSection
        tier="deputy"
        title="Deputy Directors"
        subtitle="Our Deputy Directors lead the programme and outreach pillars of the club with dedication and expertise."
        bg="#fff"
        colClass="col-lg-5 col-md-6 col-12 mx-auto"
      />

      {/* 4 — Mission & Values (dark) */}
      <MissionValues />

      {/* 5 — Instructors (4-col) */}
      <StaffTierSection
        tier="instructor"
        title="Instructors"
        subtitle="Our specialist instructors bring professional expertise to every badge session, skill workshop, and activity."
        bg="#f2f8f3"
        colClass="col-lg-3 col-md-6 col-sm-6 col-12"
      />

      {/* 6 — History timeline */}
      <HistoryTimeline />

      {/* 7 — Unit Counsellors (4-col) */}
      <StaffTierSection
        tier="staff"
        title="Unit Counsellors"
        subtitle="Our unit counsellors are the heartbeat of the club — walking closely with Pathfinders week after week."
        bg="#f2f8f3"
        colClass="col-lg-3 col-md-6 col-sm-6 col-12"
      />

      {/* 8 — Junior Staff (3-col) */}
      <StaffTierSection
        tier="junior"
        title="Junior Staff"
        subtitle="Our junior counsellors are former Pathfinders giving back — the next generation of leadership in the making."
        bg="#fff"
        colClass="col-lg-4 col-md-6 col-sm-6 col-12"
      />

      {/* 9 — CTA strip */}
      <CTAStrip />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}

//==================================================================================================================================================================

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// // ─────────────────────────────────────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────────────────────────────────────

// type StaffTier = "director" | "deputy" | "instructor" | "staff" | "junior";

// interface StaffMember {
//   id: number;
//   name: string;
//   title: string;
//   tier: StaffTier;
//   photo: string;
//   quote?: string;         // short quote shown on card hover
//   bio?: string;           // longer bio for director / deputies
//   honours?: string[];     // badges / credentials
//   years: string;          // e.g. "Since 2015"
//   featured?: boolean;     // appears in leadership carousel
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // DATA
// // ─────────────────────────────────────────────────────────────────────────────

// const STAFF: StaffMember[] = [
//   // ── Director ────────────────────────────────────────────────────────────
//   {
//     id: 1,
//     name: "Mr. Samuel Kariuki",
//     title: "Club Director",
//     tier: "director",
//     photo: "/pf staff.jpg",
//     bio: `It has been the greatest honour of my life to serve as Director of the Shauri Moyo Pathfinder Club for the past twelve years. When I walk into our church hall every Saturday and see young people arriving with energy, curiosity, and a hunger to grow, I am reminded afresh why this ministry matters so deeply.

// The Pathfinder programme is not simply an after-school activity. It is a covenant — a commitment between the church, parents, and counsellors to invest in the whole person: spirit, mind, body, and service. We do not just teach children how to pitch a tent or earn a badge. We walk with them as they discover who God made them to be.

// My prayer is that every child who passes through our doors leaves with three things: an unshakeable faith in Jesus Christ, a lifelong love of learning, and a heart that beats for their community. Welcome to the Shauri Moyo Pathfinder Club family.`,
//     quote: "We walk with children as they discover who God made them to be.",
//     honours: ["Master Guide", "Conference Director Award 2022", "12 Years Service"],
//     years: "Since 2012",
//     featured: true,
//   },

//   // ── Deputy Directors ─────────────────────────────────────────────────────
//   {
//     id: 2,
//     name: "Mrs. Faith Achieng",
//     title: "Deputy Director — Programme",
//     tier: "deputy",
//     photo: "/pfA.jpg",
//     bio: "Faith oversees all weekly programming, honour badge curriculum, and the annual Investiture Ceremony. A Master Guide with 9 years of service, she brings both structure and warmth to everything she leads.",
//     quote: "A well-planned programme is an act of love for every child in the room.",
//     honours: ["Master Guide", "9 Years Service"],
//     years: "Since 2015",
//     featured: true,
//   },
//   {
//     id: 3,
//     name: "Mr. Daniel Omondi",
//     title: "Deputy Director — Outreach",
//     tier: "deputy",
//     photo: "/pic.jpeg",
//     bio: "Daniel coordinates all community service projects, hospital visits, food drives, and mission activities. Under his leadership, the club's outreach reach has grown from one to six communities.",
//     quote: "Service is not what we do on top of Pathfinders — it is what Pathfinders is.",
//     honours: ["Master Guide", "Community Service Award 2023"],
//     years: "Since 2016",
//     featured: true,
//   },

//   // ── Instructors ──────────────────────────────────────────────────────────
//   {
//     id: 4,
//     name: "Ms. Grace Wangari",
//     title: "Instructor — Arts & Crafts",
//     tier: "instructor",
//     photo: "/images/staff-instructor1.jpg",
//     quote: "Every child is an artist. My job is simply to help them believe it.",
//     honours: ["Honour Badge Instructor"],
//     years: "Since 2018",
//   },
//   {
//     id: 5,
//     name: "Mr. Peter Mutua",
//     title: "Instructor — Outdoor Skills",
//     tier: "instructor",
//     photo: "/images/staff-instructor2.jpg",
//     quote: "God's classroom has no walls — it is the open sky and the forest floor.",
//     honours: ["Camping & Survival Certified"],
//     years: "Since 2019",
//   },
//   {
//     id: 6,
//     name: "Mrs. Rose Njeri",
//     title: "Instructor — First Aid & Safety",
//     tier: "instructor",
//     photo: "/images/staff-instructor3.jpg",
//     quote: "Knowing how to help in a crisis is one of the greatest gifts we can give a child.",
//     honours: ["St. John Ambulance Certified"],
//     years: "Since 2020",
//   },
//   {
//     id: 7,
//     name: "Mr. Brian Koech",
//     title: "Instructor — Music & Worship",
//     tier: "instructor",
//     photo: "/images/staff-instructor4.jpg",
//     quote: "Worship is the heartbeat of our club — music is how we keep the rhythm.",
//     honours: ["Music Ministry Certified"],
//     years: "Since 2019",
//   },

//   // ── Staff / Counsellors ───────────────────────────────────────────────────
//   {
//     id: 8,
//     name: "Mr. James Otieno",
//     title: "Unit Counsellor — Eagles",
//     tier: "staff",
//     photo: "/images/staff-counsellor1.jpg",
//     quote: "I was a Pathfinder here. Now I give back what was given to me.",
//     years: "Since 2020",
//   },
//   {
//     id: 9,
//     name: "Ms. Lydia Kamau",
//     title: "Unit Counsellor — Doves",
//     tier: "staff",
//     photo: "/images/staff-counsellor2.jpg",
//     quote: "When a child trusts you, they will walk through any challenge.",
//     years: "Since 2021",
//   },
//   {
//     id: 10,
//     name: "Mr. Victor Onyango",
//     title: "Unit Counsellor — Lions",
//     tier: "staff",
//     photo: "/images/staff-counsellor3.jpg",
//     quote: "Structure and love are not opposites — both make a child flourish.",
//     years: "Since 2022",
//   },
//   {
//     id: 11,
//     name: "Ms. Mercy Wambua",
//     title: "Unit Counsellor — Shields",
//     tier: "staff",
//     photo: "/images/staff-counsellor4.jpg",
//     quote: "The best part of Pathfinders is watching a shy child become a leader.",
//     years: "Since 2022",
//   },

//   // ── Junior Staff ──────────────────────────────────────────────────────────
//   {
//     id: 12,
//     name: "Calvin Mwangi",
//     title: "Junior Counsellor",
//     tier: "junior",
//     photo: "/images/staff-junior1.jpg",
//     quote: "I am learning to lead by serving first.",
//     years: "Since 2023",
//   },
//   {
//     id: 13,
//     name: "Sharon Akinyi",
//     title: "Junior Counsellor",
//     tier: "junior",
//     photo: "/images/staff-junior2.jpg",
//     quote: "Every Saturday teaches me something new about people and faith.",
//     years: "Since 2023",
//   },
//   {
//     id: 14,
//     name: "Brian Kiplagat",
//     title: "Junior Counsellor",
//     tier: "junior",
//     photo: "/images/staff-junior3.jpg",
//     quote: "I want to be the counsellor I needed when I was ten.",
//     years: "Since 2024",
//   },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // HISTORY TIMELINE
// // ─────────────────────────────────────────────────────────────────────────────

// const TIMELINE = [
//   { year: "2012", title: "Club Founded", desc: "Shauri Moyo Pathfinder Club was established with 18 founding members and 3 counsellors." },
//   { year: "2015", title: "First Campout", desc: "Our inaugural overnight camping trip to Karura Forest — a tradition that continues to this day." },
//   { year: "2017", title: "Conference Recognition", desc: "Awarded Best Pathfinder Club in the Nairobi Conference for programme excellence." },
//   { year: "2019", title: "100 Members", desc: "Membership crossed the 100 mark, prompting expansion to six units and four new counsellors." },
//   { year: "2022", title: "Director Award", desc: "Director Samuel Kariuki received the Conference Director of the Year Award." },
//   { year: "2024", title: "120+ Members", desc: "A record 42 honour badges were earned in a single term, and the club launched its first outreach video series." },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // CORE VALUES
// // ─────────────────────────────────────────────────────────────────────────────

// const VALUES = [
//   { emoji: "✝️", title: "Faith First",      desc: "Everything we do is rooted in a personal relationship with Jesus Christ and the Word of God." },
//   { emoji: "🤝", title: "Servant Heart",    desc: "We model servant leadership — leading by example, putting others before ourselves." },
//   { emoji: "🌿", title: "Whole-Person Growth", desc: "We nurture the spiritual, mental, physical, and social development of every child." },
//   { emoji: "🏕️", title: "Adventure & Discovery", desc: "We believe God is glorified when young people explore and steward His creation." },
//   { emoji: "🎖️", title: "Excellence",      desc: "We pursue the highest standards in programme, character, and community impact." },
//   { emoji: "👨‍👩‍👧", title: "Family",       desc: "The Pathfinder Club is a family — inclusive, safe, and committed to every member." },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // TIER CONFIG — styling per tier
// // ─────────────────────────────────────────────────────────────────────────────

// const TIER_CONFIG: Record<StaffTier, { label: string; badgeBg: string; badgeColor: string; photoBorder: string; photoSize: number }> = {
//   director:   { label: "Director",       badgeBg: "#14532d", badgeColor: "#4ade80", photoBorder: "#16a34a", photoSize: 160 },
//   deputy:     { label: "Deputy Director", badgeBg: "#dcfce7", badgeColor: "#15803d", photoBorder: "#22c55e", photoSize: 130 },
//   instructor: { label: "Instructor",      badgeBg: "#d1fae5", badgeColor: "#059669", photoBorder: "#86efac", photoSize: 110 },
//   staff:      { label: "Counsellor",      badgeBg: "#f0fdf4", badgeColor: "#16a34a", photoBorder: "#bbf7d0", photoSize: 96  },
//   junior:     { label: "Junior Staff",    badgeBg: "#f0fdf4", badgeColor: "#4b7a5c", photoBorder: "#d1fae5", photoSize: 88  },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // ANIMATION VARIANTS
// // ─────────────────────────────────────────────────────────────────────────────

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: (i: number) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // LEADERSHIP CAROUSEL
// // ─────────────────────────────────────────────────────────────────────────────

// function LeadershipCarousel() {
//   const featured = STAFF.filter((s) => s.featured);
//   const [current, setCurrent] = useState(0);
//   const [dir, setDir] = useState(1);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const go = useCallback((idx: number, d: number) => {
//     setDir(d);
//     setCurrent((idx + featured.length) % featured.length);
//   }, [featured.length]);

//   const startTimer = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setDir(1);
//       setCurrent((c) => (c + 1) % featured.length);
//     }, 6000);
//   }, [featured.length]);

//   useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

//   const member = featured[current];
//   const cfg = TIER_CONFIG[member.tier];

//   const slideVar = {
//     enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
//     center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
//     exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.35 } }),
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "clamp(400px, 55vh, 580px)",
//         overflow: "hidden",
//         borderRadius: "0 0 28px 28px",
//         background: "#14532d",
//       }}
//     >
//       {/* BG photo */}
//       <AnimatePresence custom={dir} mode="wait">
//         <motion.div key={member.id} custom={dir} variants={slideVar} initial="enter" animate="center" exit="exit"
//           style={{ position: "absolute", inset: 0 }}>
//           <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} quality={90} priority />
//           {/* Two-layer overlay */}
//           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,40,15,.92) 40%, rgba(10,40,15,.3) 100%)" }} />
//           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,40,15,.7) 0%, transparent 60%)" }} />
//           {/* Shimmer bottom line */}
//           <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)" }} />
//         </motion.div>
//       </AnimatePresence>

//       {/* Caption */}
//       <AnimatePresence mode="wait">
//         <motion.div key={`cap-${member.id}`}
//           initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] } }}
//           exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
//           style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 52px 0 48px", maxWidth: "660px", zIndex: 5 }}
//         >
//           {/* Tier badge */}
//           <span style={{
//             display: "inline-flex", alignItems: "center", gap: 6,
//             fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//             fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase",
//             background: cfg.badgeBg, color: cfg.badgeColor,
//             borderRadius: "999px", padding: "5px 14px",
//             marginBottom: "16px", width: "fit-content",
//           }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.badgeColor }} />
//             {cfg.label}
//           </span>

//           {/* Name */}
//           <h1 style={{
//             fontFamily: "'Playfair Display',Georgia,serif",
//             fontSize: "clamp(1.8rem, 4vw, 3rem)",
//             fontWeight: 700, color: "#fff",
//             lineHeight: 1.08, letterSpacing: "-0.02em",
//             marginBottom: "10px",
//             textShadow: "0 2px 20px rgba(0,0,0,.3)",
//           }}>
//             {member.name}
//           </h1>

//           {/* Title */}
//           <p style={{
//             fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem",
//             fontWeight: 500, color: "#86efac", marginBottom: "18px",
//           }}>
//             {member.title} · {member.years}
//           </p>

//           {/* Quote */}
//           {member.quote && (
//             <blockquote style={{
//               fontFamily: "'Playfair Display',serif", fontStyle: "italic",
//               fontSize: "clamp(.95rem,1.8vw,1.15rem)",
//               color: "rgba(255,255,255,.85)", lineHeight: 1.65,
//               borderLeft: "3px solid #16a34a", paddingLeft: "16px",
//               margin: "0 0 24px",
//               maxWidth: "480px",
//             }}>
//               "{member.quote}"
//             </blockquote>
//           )}

//           {/* Honours pills */}
//           {member.honours && (
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {member.honours.map((h) => (
//                 <span key={h} style={{
//                   fontFamily: "'Plus Jakarta Sans',sans-serif",
//                   fontSize: "11px", fontWeight: 600,
//                   background: "rgba(255,255,255,.12)", backdropFilter: "blur(6px)",
//                   border: "1px solid rgba(255,255,255,.22)",
//                   color: "#fff", borderRadius: "999px", padding: "4px 12px",
//                 }}>
//                   {h}
//                 </span>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* Decorative cross */}
//       <div style={{ position: "absolute", top: 24, right: 32, opacity: .15, pointerEvents: "none", zIndex: 4 }}>
//         <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="1.5">
//           <line x1="24" y1="4" x2="24" y2="44" /><line x1="4" y1="24" x2="44" y2="24" />
//         </svg>
//       </div>

//       {/* Counter */}
//       <div style={{
//         position: "absolute", top: 22, left: 26, zIndex: 6,
//         background: "rgba(255,255,255,.13)", backdropFilter: "blur(6px)",
//         border: "1px solid rgba(255,255,255,.2)", borderRadius: "999px",
//         padding: "5px 14px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//         fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: ".06em",
//         display: "flex", alignItems: "center", gap: 4,
//       }}>
//         {String(current + 1).padStart(2, "0")}
//         <span style={{ opacity: .5, margin: "0 2px" }}>/</span>
//         {String(featured.length).padStart(2, "0")}
//       </div>

//       {/* Arrows */}
//       {[{ l: "Prev", d: -1, side: "left", pts: "15 18 9 12 15 6" }, { l: "Next", d: 1, side: "right", pts: "9 6 15 12 9 18" }].map((b) => (
//         <button key={b.l} aria-label={b.l}
//           onClick={() => { go(current + b.d, b.d); startTimer(); }}
//           style={{
//             position: "absolute", top: "50%", [b.side]: "16px", transform: "translateY(-50%)",
//             width: 46, height: 46, borderRadius: "50%", zIndex: 6,
//             background: "rgba(255,255,255,.12)", backdropFilter: "blur(6px)",
//             border: "1px solid rgba(255,255,255,.22)", cursor: "pointer",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             transition: "background .2s",
//           }}>
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <polyline points={b.pts} />
//           </svg>
//         </button>
//       ))}

//       {/* Indicators */}
//       <div style={{ position: "absolute", bottom: 20, right: 28, zIndex: 6, display: "flex", gap: 6 }}>
//         {featured.map((_, i) => (
//           <button key={i} aria-label={`Slide ${i + 1}`}
//             onClick={() => { go(i, i > current ? 1 : -1); startTimer(); }}
//             style={{
//               width: i === current ? 44 : 24, height: 3, borderRadius: "999px",
//               border: "none", padding: 0, cursor: "pointer",
//               background: i === current ? "#4ade80" : "rgba(255,255,255,.3)",
//               transition: "width .35s, background .35s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // DIRECTOR MESSAGE
// // ─────────────────────────────────────────────────────────────────────────────

// function DirectorMessage() {
//   const director = STAFF.find((s) => s.tier === "director")!;
//   const paragraphs = director.bio!.split("\n\n");

//   return (
//     <section style={{ background: "#f0fdf4", padding: "80px 0", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: -60, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,.08) 0%, transparent 70%)", pointerEvents: "none" }} />

//       <div className="container" style={{ maxWidth: "1060px" }}>
//         <div className="row g-5 align-items-center">

//           {/* Photo column */}
//           <div className="col-lg-4 col-12 text-center">
//             <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
//               {/* Large director photo */}
//               <div style={{
//                 width: 200, height: 200, borderRadius: "50%", overflow: "hidden",
//                 border: "4px solid #16a34a", margin: "0 auto 20px",
//                 position: "relative", boxShadow: "0 12px 40px rgba(21,128,61,.25)",
//               }}>
//                 <Image src={director.photo} alt={director.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="200px" />
//               </div>

//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#14532d", marginBottom: 4 }}>
//                 {director.name}
//               </h3>
//               <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".88rem", color: "#4b7a5c", marginBottom: 12 }}>
//                 {director.title} · {director.years}
//               </p>

//               {/* Honours */}
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
//                 {director.honours?.map((h) => (
//                   <span key={h} style={{
//                     fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "10.5px", fontWeight: 600,
//                     background: "#dcfce7", color: "#15803d", borderRadius: "999px", padding: "3px 10px",
//                   }}>{h}</span>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Message column */}
//           <div className="col-lg-8 col-12">
//             <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
//               {/* Eyebrow */}
//               <span style={{
//                 display: "inline-flex", alignItems: "center", gap: 7,
//                 fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//                 fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase",
//                 color: "#15803d", background: "#dcfce7", padding: "5px 15px",
//                 borderRadius: "999px", marginBottom: 18,
//               }}>
//                 <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
//                 Message from the Director
//               </span>

//               <h2 style={{
//                 fontFamily: "'Playfair Display',serif",
//                 fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
//                 fontWeight: 700, color: "#14532d",
//                 lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 24,
//               }}>
//                 A Word of <em style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}>Welcome</em>
//               </h2>

//               {/* Opening quote */}
//               <blockquote style={{
//                 fontFamily: "'Playfair Display',serif", fontStyle: "italic",
//                 fontSize: "1.1rem", color: "#14532d",
//                 borderLeft: "3px solid #16a34a", paddingLeft: 16,
//                 margin: "0 0 24px", lineHeight: 1.65,
//                 background: "#f0fdf4",
//               }}>
//                 "{director.quote}"
//               </blockquote>

//               {/* Message paragraphs */}
//               <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                 {paragraphs.map((p, i) => (
//                   <p key={i} style={{
//                     fontFamily: "'Plus Jakarta Sans',sans-serif",
//                     fontSize: ".97rem", color: "#4b7a5c",
//                     lineHeight: 1.78, margin: 0,
//                   }}>
//                     {p}
//                   </p>
//                 ))}
//               </div>

//               {/* Signature */}
//               <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
//                 <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#dcfce7", border: "2px solid #bbf7d0", overflow: "hidden", position: "relative", flexShrink: 0 }}>
//                   <Image src={director.photo} alt={director.name} fill style={{ objectFit: "cover" }} sizes="48px" />
//                 </div>
//                 <div>
//                   <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: "#14532d" }}>
//                     Samuel Kariuki
//                   </div>
//                   <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".82rem", color: "#4b7a5c" }}>
//                     Club Director, Shauri Moyo Pathfinder Club
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // STAFF CARD
// // ─────────────────────────────────────────────────────────────────────────────

// function StaffCard({ member, index }: { member: StaffMember; index: number }) {
//   const cfg = TIER_CONFIG[member.tier];

//   return (
//     <motion.div
//       custom={index}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={fadeUp}
//       whileHover={{ y: -6, scale: 1.02 }}
//       transition={{ type: "spring", stiffness: 300, damping: 18 }}
//       style={{
//         background: "#fff",
//         border: "1px solid #d1fae5",
//         borderRadius: "20px",
//         padding: "28px 20px 24px",
//         textAlign: "center",
//         position: "relative",
//         overflow: "hidden",
//         height: "100%",
//       }}
//     >
//       {/* Corner blob accent */}
//       <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: "#f0fdf4", pointerEvents: "none" }} />

//       {/* Photo */}
//       <div style={{
//         width: cfg.photoSize, height: cfg.photoSize,
//         borderRadius: "50%", overflow: "hidden",
//         border: `3px solid ${cfg.photoBorder}`,
//         margin: "0 auto 16px",
//         position: "relative",
//         boxShadow: "0 6px 20px rgba(21,128,61,.15)",
//       }}>
//         <Image
//           src={member.photo} alt={member.name} fill
//           style={{ objectFit: "cover", objectPosition: "center top" }}
//           sizes="160px"
//         />
//       </div>

//       {/* Tier badge */}
//       <span style={{
//         display: "inline-flex", alignItems: "center",
//         fontSize: "10px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//         fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
//         background: cfg.badgeBg, color: cfg.badgeColor,
//         borderRadius: "999px", padding: "3px 10px", marginBottom: 10,
//       }}>
//         {cfg.label}
//       </span>

//       <h3 style={{
//         fontFamily: "'Playfair Display',serif",
//         fontSize: "1.05rem", fontWeight: 700,
//         color: "#14532d", marginBottom: 4, lineHeight: 1.2,
//       }}>
//         {member.name}
//       </h3>

//       <p style={{
//         fontFamily: "'Plus Jakarta Sans',sans-serif",
//         fontSize: ".82rem", color: "#4b7a5c",
//         marginBottom: 10, fontWeight: 500,
//       }}>
//         {member.title}
//       </p>

//       {/* Quote */}
//       {member.quote && (
//         <p style={{
//           fontFamily: "'Playfair Display',serif", fontStyle: "italic",
//           fontSize: ".85rem", color: "#6b9e7e",
//           lineHeight: 1.6, margin: "0 0 12px",
//         }}>
//           "{member.quote}"
//         </p>
//       )}

//       {/* Years */}
//       <div style={{
//         display: "inline-flex", alignItems: "center", gap: 5,
//         fontFamily: "'Plus Jakarta Sans',sans-serif",
//         fontSize: "11px", fontWeight: 600, color: "#15803d",
//       }}>
//         <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
//           <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
//         </svg>
//         {member.years}
//       </div>

//       {/* Honours for instructors + */}
//       {member.honours && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginTop: 10 }}>
//           {member.honours.map((h) => (
//             <span key={h} style={{
//               fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "10px", fontWeight: 600,
//               background: "#f0fdf4", color: "#15803d", borderRadius: "999px", padding: "2px 8px",
//               border: "1px solid #bbf7d0",
//             }}>{h}</span>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // STAFF SECTION WRAPPER
// // ─────────────────────────────────────────────────────────────────────────────

// function StaffTierSection({
//   tier, title, subtitle, bg, colClass,
// }: {
//   tier: StaffTier; title: string; subtitle: string; bg: string; colClass: string;
// }) {
//   const members = STAFF.filter((s) => s.tier === tier);

//   return (
//     <section style={{ background: bg, padding: "72px 0 80px", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,.07) 0%, transparent 70%)", pointerEvents: "none" }} />

//       <div className="container" style={{ maxWidth: "1100px" }}>
//         {/* Heading */}
//         <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//           style={{ textAlign: "center", marginBottom: 44 }}>
//           <span style={{
//             display: "inline-flex", alignItems: "center", gap: 7,
//             fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//             fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase",
//             color: "#15803d", background: "#dcfce7", padding: "5px 15px",
//             borderRadius: "999px", marginBottom: 14,
//           }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
//             {title}
//           </span>
//           <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".97rem", color: "#4b7a5c", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
//             {subtitle}
//           </p>
//         </motion.div>

//         {/* Cards grid */}
//         <div className="row g-4 justify-content-center">
//           {members.map((m, i) => (
//             <div key={m.id} className={colClass}>
//               <StaffCard member={m} index={i} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MISSION + VALUES
// // ─────────────────────────────────────────────────────────────────────────────

// function MissionValues() {
//   return (
//     <section style={{ background: "#14532d", padding: "80px 0", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: -80, right: -60, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,.07) 0%, transparent 70%)", pointerEvents: "none" }} />
//       <div style={{ position: "absolute", bottom: -60, left: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,.08) 0%, transparent 70%)", pointerEvents: "none" }} />

//       <div className="container" style={{ maxWidth: "1100px" }}>
//         <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//           style={{ textAlign: "center", marginBottom: 52 }}>
//           <span style={{
//             display: "inline-flex", alignItems: "center", gap: 7,
//             fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//             fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase",
//             color: "#4ade80", background: "rgba(74,222,128,.12)", padding: "5px 15px",
//             borderRadius: "999px", marginBottom: 16,
//           }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
//             Mission & Values
//           </span>
//           <h2 style={{
//             fontFamily: "'Playfair Display',serif",
//             fontSize: "clamp(1.9rem,3.5vw,2.7rem)",
//             fontWeight: 700, color: "#fff",
//             lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 14,
//           }}>
//             What We Stand <em style={{ fontStyle: "italic", fontWeight: 400, color: "#4ade80" }}>For</em>
//           </h2>
//           {/* Mission statement */}
//           <p style={{
//             fontFamily: "'Playfair Display',serif", fontStyle: "italic",
//             fontSize: "1.1rem", color: "#86efac", lineHeight: 1.7,
//             maxWidth: 560, margin: "0 auto",
//           }}>
//             "To empower young people to make Jesus their Lord and Saviour, and to
//             grow into whole, servant-hearted, and excellent members of family, church,
//             and community."
//           </p>
//         </motion.div>

//         {/* Values grid */}
//         <div className="row g-4">
//           {VALUES.map((v, i) => (
//             <div key={v.title} className="col-md-4 col-sm-6 col-12">
//               <motion.div custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//                 whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
//                 style={{
//                   background: "rgba(255,255,255,.06)", backdropFilter: "blur(6px)",
//                   border: "1px solid rgba(255,255,255,.1)",
//                   borderRadius: 20, padding: "28px 22px", height: "100%",
//                 }}>
//                 <div style={{ fontSize: 32, marginBottom: 14 }}>{v.emoji}</div>
//                 <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
//                   {v.title}
//                 </h4>
//                 <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".9rem", color: "rgba(255,255,255,.7)", lineHeight: 1.65, margin: 0 }}>
//                   {v.desc}
//                 </p>
//               </motion.div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // HISTORY TIMELINE
// // ─────────────────────────────────────────────────────────────────────────────

// function HistoryTimeline() {
//   return (
//     <section style={{ background: "#fff", padding: "80px 0" }}>
//       <div className="container" style={{ maxWidth: "800px" }}>
//         <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//           style={{ textAlign: "center", marginBottom: 52 }}>
//           <span style={{
//             display: "inline-flex", alignItems: "center", gap: 7,
//             fontSize: "11px", fontFamily: "'Plus Jakarta Sans',sans-serif",
//             fontWeight: 600, letterSpacing: ".13em", textTransform: "uppercase",
//             color: "#15803d", background: "#dcfce7", padding: "5px 15px",
//             borderRadius: "999px", marginBottom: 16,
//           }}>
//             <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }} />
//             Our History
//           </span>
//           <h2 style={{
//             fontFamily: "'Playfair Display',serif",
//             fontSize: "clamp(1.9rem,3.5vw,2.6rem)",
//             fontWeight: 700, color: "#14532d",
//             lineHeight: 1.1, letterSpacing: "-0.02em",
//           }}>
//             A Decade of <em style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}>Growth</em>
//           </h2>
//         </motion.div>

//         {/* Timeline */}
//         <div style={{ position: "relative", paddingLeft: 32 }}>
//           {/* Vertical line */}
//           <div style={{ position: "absolute", top: 0, bottom: 0, left: 11, width: 2, background: "linear-gradient(to bottom, #16a34a, #bbf7d0)", borderRadius: "999px" }} />

//           {TIMELINE.map((item, i) => (
//             <motion.div key={item.year} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//               style={{ display: "flex", gap: 20, marginBottom: i < TIMELINE.length - 1 ? 36 : 0, position: "relative" }}>
//               {/* Dot */}
//               <div style={{
//                 position: "absolute", left: -32, top: 4,
//                 width: 24, height: 24, borderRadius: "50%",
//                 background: "#16a34a", border: "3px solid #f2f8f3",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 flexShrink: 0, zIndex: 1,
//               }}>
//                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
//               </div>

//               {/* Content */}
//               <div style={{
//                 background: "#f0fdf4", border: "1px solid #d1fae5",
//                 borderRadius: 16, padding: "18px 22px", flex: 1,
//               }}>
//                 <span style={{
//                   fontFamily: "'Playfair Display',serif", fontSize: "1.4rem",
//                   fontWeight: 700, color: "#16a34a", display: "block", marginBottom: 4,
//                 }}>{item.year}</span>
//                 <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#14532d", marginBottom: 6 }}>
//                   {item.title}
//                 </h4>
//                 <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".88rem", color: "#4b7a5c", lineHeight: 1.65, margin: 0 }}>
//                   {item.desc}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CTA STRIP
// // ─────────────────────────────────────────────────────────────────────────────

// function CTAStrip() {
//   return (
//     <section style={{ background: "#f2f8f3", padding: "72px 0 88px" }}>
//       <div className="container" style={{ maxWidth: "860px" }}>
//         <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
//           style={{
//             background: "linear-gradient(135deg, #14532d, #15803d)",
//             borderRadius: 22, padding: "44px 40px",
//             display: "flex", alignItems: "center",
//             justifyContent: "space-between", gap: 24, flexWrap: "wrap",
//           }}>
//           <div>
//             <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
//               Want to Volunteer with Us?
//             </h3>
//             <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".95rem", color: "#86efac", lineHeight: 1.6, maxWidth: 400, margin: 0 }}>
//               We are always looking for passionate adults to join our team as
//               counsellors, instructors, or parent volunteers.
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
//               <Link href="/volunteer" style={{
//                 display: "inline-flex", alignItems: "center", gap: 8,
//                 background: "#fff", color: "#15803d", textDecoration: "none",
//                 borderRadius: "999px", padding: "13px 26px",
//                 fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".95rem", fontWeight: 600,
//                 whiteSpace: "nowrap",
//               }}>
//                 Join the Team
//                 <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
//                   <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
//               <Link href="/contact" style={{
//                 display: "inline-flex", alignItems: "center", gap: 8,
//                 background: "transparent", color: "#fff", textDecoration: "none",
//                 borderRadius: "999px", padding: "12px 22px",
//                 fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".95rem", fontWeight: 600,
//                 border: "1.5px solid rgba(255,255,255,.35)", whiteSpace: "nowrap",
//               }}>
//                 Contact Us
//               </Link>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────────────────────────

// export default function AboutPage() {
//   return (
//     <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>

//       {/* 1 — Leadership hero carousel */}
//       <LeadershipCarousel />

//       {/* 2 — Director's message */}
//       <DirectorMessage />

//       {/* 3 — Deputy Directors  (2-col) */}
//       <StaffTierSection
//         tier="deputy"
//         title="Deputy Directors"
//         subtitle="Our Deputy Directors lead the programme and outreach pillars of the club with dedication and expertise."
//         bg="#fff"
//         colClass="col-lg-5 col-md-6 col-12 mx-auto"
//       />

//       {/* 4 — Mission & Values (dark) */}
//       <MissionValues />

//       {/* 5 — Instructors (4-col) */}
//       <StaffTierSection
//         tier="instructor"
//         title="Instructors"
//         subtitle="Our specialist instructors bring professional expertise to every badge session, skill workshop, and activity."
//         bg="#f2f8f3"
//         colClass="col-lg-3 col-md-6 col-sm-6 col-12"
//       />

//       {/* 6 — History timeline */}
//       <HistoryTimeline />

//       {/* 7 — Unit Counsellors (4-col) */}
//       <StaffTierSection
//         tier="staff"
//         title="Unit Counsellors"
//         subtitle="Our unit counsellors are the heartbeat of the club — walking closely with Pathfinders week after week."
//         bg="#f2f8f3"
//         colClass="col-lg-3 col-md-6 col-sm-6 col-12"
//       />

//       {/* 8 — Junior Staff (3-col) */}
//       <StaffTierSection
//         tier="junior"
//         title="Junior Staff"
//         subtitle="Our junior counsellors are former Pathfinders giving back — the next generation of leadership in the making."
//         bg="#fff"
//         colClass="col-lg-4 col-md-6 col-sm-6 col-12"
//       />

//       {/* 9 — CTA strip */}
//       <CTAStrip />

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
//       `}</style>
//     </main>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// // ─────────────────────────────────────────────────────────────────────────────
// // DATA
// // ─────────────────────────────────────────────────────────────────────────────

// const STAFF = [
//   {
//     id: 1,
//     name: "Mr. Samuel Kariuki",
//     title: "Club Director",
//     tier: "director",
//     photo: "/images/staff-director.jpg",
//     bio: `It has been the greatest honour of my life to serve as Director of the Shauri Moyo Pathfinder Club for the past twelve years. When I walk into our church hall every Saturday and see young people arriving with energy, curiosity, and a hunger to grow, I am reminded afresh why this ministry matters so deeply.

// The Pathfinder programme is not simply an after-school activity. It is a covenant — a commitment between the church, parents, and counsellors to invest in the whole person: spirit, mind, body, and service. We do not just teach children how to pitch a tent or earn a badge. We walk with them as they discover who God made them to be.

// My prayer is that every child who passes through our doors leaves with three things: an unshakeable faith in Jesus Christ, a lifelong love of learning, and a heart that beats for their community. Welcome to the Shauri Moyo Pathfinder Club family.`,
//     quote: "We walk with children as they discover who God made them to be.",
//     honours: [
//       "Master Guide",
//       "Conference Director Award 2022",
//       "12 Years Service",
//     ],
//     years: "Since 2012",
//     featured: true,
//   },

//   {
//     id: 2,
//     name: "Mrs. Faith Achieng",
//     title: "Deputy Director — Programme",
//     tier: "deputy",
//     photo: "/images/staff-deputy1.jpg",
//     bio: "Faith oversees all weekly programming, honour badge curriculum, and the annual Investiture Ceremony.",
//     quote:
//       "A well-planned programme is an act of love for every child in the room.",
//     honours: ["Master Guide", "9 Years Service"],
//     years: "Since 2015",
//     featured: true,
//   },

//   {
//     id: 3,
//     name: "Mr. Daniel Omondi",
//     title: "Deputy Director — Outreach",
//     tier: "deputy",
//     photo: "/images/staff-deputy2.jpg",
//     bio: "Daniel coordinates all community service projects, hospital visits, food drives, and mission activities.",
//     quote:
//       "Service is not what we do on top of Pathfinders — it is what Pathfinders is.",
//     honours: ["Master Guide", "Community Service Award 2023"],
//     years: "Since 2016",
//     featured: true,
//   },
// ];

// const TIER_CONFIG = {
//   director: {
//     label: "Director",
//     badgeBg: "#14532d",
//     badgeColor: "#4ade80",
//   },
//   deputy: {
//     label: "Deputy Director",
//     badgeBg: "#dcfce7",
//     badgeColor: "#15803d",
//   },
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // ANIMATION
// // ─────────────────────────────────────────────────────────────────────────────

// const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 28,
//   },

//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       delay: i * 0.08,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // LEADERSHIP CAROUSEL
// // ─────────────────────────────────────────────────────────────────────────────

// function LeadershipCarousel() {
//   const featured = STAFF.filter((s) => s.featured);

//   const [current, setCurrent] = useState(0);
//   const [dir, setDir] = useState(1);

//   const timerRef = useRef(null);

//   const go = useCallback(
//     (idx, d) => {
//       setDir(d);
//       setCurrent((idx + featured.length) % featured.length);
//     },
//     [featured.length],
//   );

//   const startTimer = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current);

//     timerRef.current = setInterval(() => {
//       setDir(1);

//       setCurrent((c) => (c + 1) % featured.length);
//     }, 6000);
//   }, [featured.length]);

//   useEffect(() => {
//     startTimer();

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [startTimer]);

//   const member = featured[current];
//   const cfg = TIER_CONFIG[member.tier];

//   const slideVar = {
//     enter: (d) => ({
//       opacity: 0,
//       x: d > 0 ? 60 : -60,
//     }),

//     center: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.55,
//         ease: [0.22, 1, 0.36, 1],
//       },
//     },

//     exit: (d) => ({
//       opacity: 0,
//       x: d > 0 ? -60 : 60,
//       transition: {
//         duration: 0.35,
//       },
//     }),
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "clamp(400px, 55vh, 580px)",
//         overflow: "hidden",
//         borderRadius: "0 0 28px 28px",
//         background: "#14532d",
//       }}
//     >
//       <AnimatePresence custom={dir} mode="wait">
//         <motion.div
//           key={member.id}
//           custom={dir}
//           variants={slideVar}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           style={{
//             position: "absolute",
//             inset: 0,
//           }}
//         >
//           <Image
//             src={member.photo}
//             alt={member.name}
//             fill
//             quality={90}
//             priority
//             style={{
//               objectFit: "cover",
//               objectPosition: "center top",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to right, rgba(10,40,15,.92) 40%, rgba(10,40,15,.3) 100%)",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to top, rgba(10,40,15,.7) 0%, transparent 60%)",
//             }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={`cap-${member.id}`}
//           initial={{
//             opacity: 0,
//             y: 24,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 0.55,
//               delay: 0.18,
//               ease: [0.22, 1, 0.36, 1],
//             },
//           }}
//           exit={{
//             opacity: 0,
//             y: -12,
//             transition: {
//               duration: 0.3,
//             },
//           }}
//           style={{
//             position: "absolute",
//             inset: 0,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "0 52px 0 48px",
//             maxWidth: "660px",
//             zIndex: 5,
//           }}
//         >
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 6,
//               fontSize: "11px",
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontWeight: 600,
//               letterSpacing: ".13em",
//               textTransform: "uppercase",
//               background: cfg.badgeBg,
//               color: cfg.badgeColor,
//               borderRadius: "999px",
//               padding: "5px 14px",
//               marginBottom: "16px",
//               width: "fit-content",
//             }}
//           >
//             <span
//               style={{
//                 width: 5,
//                 height: 5,
//                 borderRadius: "50%",
//                 background: cfg.badgeColor,
//               }}
//             />
//             {cfg.label}
//           </span>

//           <h1
//             style={{
//               fontFamily: "'Playfair Display',Georgia,serif",
//               fontSize: "clamp(1.8rem, 4vw, 3rem)",
//               fontWeight: 700,
//               color: "#fff",
//               lineHeight: 1.08,
//               letterSpacing: "-0.02em",
//               marginBottom: "10px",
//             }}
//           >
//             {member.name}
//           </h1>

//           <p
//             style={{
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontSize: "1rem",
//               fontWeight: 500,
//               color: "#86efac",
//               marginBottom: "18px",
//             }}
//           >
//             {member.title} · {member.years}
//           </p>

//           {member.quote && (
//             <blockquote
//               style={{
//                 fontFamily: "'Playfair Display',serif",
//                 fontStyle: "italic",
//                 fontSize: "1rem",
//                 color: "rgba(255,255,255,.85)",
//                 lineHeight: 1.65,
//                 borderLeft: "3px solid #16a34a",
//                 paddingLeft: "16px",
//                 margin: "0 0 24px",
//                 maxWidth: "480px",
//               }}
//             >
//               "{member.quote}"
//             </blockquote>
//           )}

//           {member.honours && (
//             <div
//               style={{
//                 display: "flex",
//                 gap: 8,
//                 flexWrap: "wrap",
//               }}
//             >
//               {member.honours.map((h) => (
//                 <span
//                   key={h}
//                   style={{
//                     fontFamily: "'Plus Jakarta Sans',sans-serif",
//                     fontSize: "11px",
//                     fontWeight: 600,
//                     background: "rgba(255,255,255,.12)",
//                     backdropFilter: "blur(6px)",
//                     border: "1px solid rgba(255,255,255,.22)",
//                     color: "#fff",
//                     borderRadius: "999px",
//                     padding: "4px 12px",
//                   }}
//                 >
//                   {h}
//                 </span>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           right: 28,
//           zIndex: 6,
//           display: "flex",
//           gap: 6,
//         }}
//       >
//         {featured.map((_, i) => (
//           <button
//             key={i}
//             aria-label={`Slide ${i + 1}`}
//             onClick={() => {
//               go(i, i > current ? 1 : -1);
//               startTimer();
//             }}
//             style={{
//               width: i === current ? 44 : 24,
//               height: 3,
//               borderRadius: "999px",
//               border: "none",
//               padding: 0,
//               cursor: "pointer",
//               background: i === current ? "#4ade80" : "rgba(255,255,255,.3)",
//               transition: "width .35s, background .35s",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // DIRECTOR MESSAGE
// // ─────────────────────────────────────────────────────────────────────────────

// function DirectorMessage() {
//   const director = STAFF.find((s) => s.tier === "director");

//   const paragraphs = director.bio.split("\n\n");

//   return (
//     <section
//       style={{
//         background: "#f0fdf4",
//         padding: "80px 0",
//       }}
//     >
//       <div
//         className="container"
//         style={{
//           maxWidth: "1060px",
//         }}
//       >
//         <div className="row g-5 align-items-center">
//           <div className="col-lg-4 col-12 text-center">
//             <motion.div
//               custom={0}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{
//                 once: true,
//               }}
//               variants={fadeUp}
//             >
//               <div
//                 style={{
//                   width: 200,
//                   height: 200,
//                   borderRadius: "50%",
//                   overflow: "hidden",
//                   border: "4px solid #16a34a",
//                   margin: "0 auto 20px",
//                   position: "relative",
//                 }}
//               >
//                 <Image
//                   src={director.photo}
//                   alt={director.name}
//                   fill
//                   sizes="200px"
//                   style={{
//                     objectFit: "cover",
//                     objectPosition: "center top",
//                   }}
//                 />
//               </div>

//               <h3
//                 style={{
//                   fontFamily: "'Playfair Display',serif",
//                   fontSize: "1.3rem",
//                   fontWeight: 700,
//                   color: "#14532d",
//                   marginBottom: 4,
//                 }}
//               >
//                 {director.name}
//               </h3>

//               <p
//                 style={{
//                   fontFamily: "'Plus Jakarta Sans',sans-serif",
//                   fontSize: ".88rem",
//                   color: "#4b7a5c",
//                   marginBottom: 12,
//                 }}
//               >
//                 {director.title} · {director.years}
//               </p>
//             </motion.div>
//           </div>

//           <div className="col-lg-8 col-12">
//             <motion.div
//               custom={1}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{
//                 once: true,
//               }}
//               variants={fadeUp}
//             >
//               <h2
//                 style={{
//                   fontFamily: "'Playfair Display',serif",
//                   fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
//                   fontWeight: 700,
//                   color: "#14532d",
//                   lineHeight: 1.12,
//                   letterSpacing: "-0.02em",
//                   marginBottom: 24,
//                 }}
//               >
//                 A Word of Welcome
//               </h2>

//               {paragraphs.map((p, i) => (
//                 <p
//                   key={i}
//                   style={{
//                     fontFamily: "'Plus Jakarta Sans',sans-serif",
//                     fontSize: ".97rem",
//                     color: "#4b7a5c",
//                     lineHeight: 1.78,
//                     marginBottom: 16,
//                   }}
//                 >
//                   {p}
//                 </p>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CTA
// // ─────────────────────────────────────────────────────────────────────────────

// function CTAStrip() {
//   return (
//     <section
//       style={{
//         background: "#f2f8f3",
//         padding: "72px 0 88px",
//       }}
//     >
//       <div
//         className="container"
//         style={{
//           maxWidth: "860px",
//         }}
//       >
//         <motion.div
//           custom={0}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{
//             once: true,
//           }}
//           variants={fadeUp}
//           style={{
//             background: "linear-gradient(135deg, #14532d, #15803d)",
//             borderRadius: 22,
//             padding: "44px 40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 24,
//             flexWrap: "wrap",
//           }}
//         >
//           <div>
//             <h3
//               style={{
//                 fontFamily: "'Playfair Display',serif",
//                 fontSize: "1.6rem",
//                 fontWeight: 700,
//                 color: "#fff",
//                 marginBottom: 8,
//               }}
//             >
//               Want to Volunteer with Us?
//             </h3>

//             <p
//               style={{
//                 fontFamily: "'Plus Jakarta Sans',sans-serif",
//                 fontSize: ".95rem",
//                 color: "#86efac",
//                 lineHeight: 1.6,
//                 maxWidth: 400,
//                 margin: 0,
//               }}
//             >
//               We are always looking for passionate adults to join our team.
//             </p>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: 12,
//               flexWrap: "wrap",
//             }}
//           >
//             <motion.div
//               whileHover={{
//                 scale: 1.05,
//               }}
//               whileTap={{
//                 scale: 0.97,
//               }}
//             >
//               <Link
//                 href="/volunteer"
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 8,
//                   background: "#fff",
//                   color: "#15803d",
//                   textDecoration: "none",
//                   borderRadius: "999px",
//                   padding: "13px 26px",
//                   fontFamily: "'Plus Jakarta Sans',sans-serif",
//                   fontSize: ".95rem",
//                   fontWeight: 600,
//                 }}
//               >
//                 Join the Team
//               </Link>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // PAGE
// // ─────────────────────────────────────────────────────────────────────────────

// export default function AboutPage() {
//   return (
//     <main
//       style={{
//         background: "#f2f8f3",
//         minHeight: "100vh",
//       }}
//     >
//       <LeadershipCarousel />

//       <DirectorMessage />

//       <CTAStrip />

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
//       `}</style>
//     </main>
//   );
// }
