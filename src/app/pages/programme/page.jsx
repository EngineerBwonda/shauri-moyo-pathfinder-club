"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DATA & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    title: "Spiritual",
    desc: "Deepening faith through Bible study, prayer, and worship.",
    icon: "✝️",
  },
  {
    title: "Mental",
    desc: "Developing new skills, earning honours, and expanding knowledge.",
    icon: "🧠",
  },
  {
    title: "Physical",
    desc: "Building strength and health through outdoor activities and sports.",
    icon: "🏃",
  },
  {
    title: "Social",
    desc: "Learning teamwork, leadership, and community service.",
    icon: "🤝",
  },
];

const WEEKLY_SCHEDULE = [
  {
    time: "2:45 PM",
    activity: "Arrival & Check-in",
    location: "Main Hall",
    desc: "Pathfinders arrive in full uniform for inspection.",
  },
  {
    time: "3:00 PM",
    activity: "Opening Ceremony",
    location: "Parade Ground",
    desc: "Flag raising, anthem, and club pledge.",
  },
  {
    time: "3:20 PM",
    activity: "Devotional",
    location: "Main Hall",
    desc: "Short spiritual message and prayer.",
  },
  {
    time: "3:40 PM",
    activity: "Class Work",
    location: "Breakout Rooms",
    desc: "Age-specific curriculum and badge requirements.",
  },
  {
    time: "4:30 PM",
    activity: "Games & Drill",
    location: "Field / Hall",
    desc: "Physical activities and marching practice.",
  },
  {
    time: "5:00 PM",
    activity: "Closing & Dismissal",
    location: "Main Hall",
    desc: "Announcements and final prayer.",
  },
];

const CLASSES = [
  {
    name: "Busy Bee",
    ages: "6–7",
    desc: "Entry level, basic activities and simple crafts.",
    color: "#fbbf24",
  },
  {
    name: "Sunbeam",
    ages: "8–9",
    desc: "Simple honours, Bible basics, and nature discovery.",
    color: "#f59e0b",
  },
  {
    name: "Builder",
    ages: "10–11",
    desc: "Craft skills, outdoor introduction, and teamwork.",
    color: "#d97706",
  },
  {
    name: "Helping Hand",
    ages: "12–13",
    desc: "Community focus and personal responsibility.",
    color: "#b45309",
  },
  {
    name: "Companion",
    ages: "14–15",
    desc: "Leadership development and advanced skills.",
    color: "#92400e",
  },
  {
    name: "Explorer",
    ages: "15+",
    desc: "Advanced honours and preparing for leadership.",
    color: "#78350f",
  },
];

const BADGE_CATEGORIES = [
  { name: "Nature", count: 12, icon: "🌿", color: "#059669" },
  { name: "Crafts", count: 8, icon: "🎨", color: "#8b5cf6" },
  { name: "Health", count: 6, icon: "🍎", color: "#ef4444" },
  { name: "Spiritual", count: 10, icon: "📖", color: "#3b82f6" },
  { name: "Vocational", count: 5, icon: "🛠️", color: "#6b7280" },
];

const ANNUAL_CALENDAR = [
  { month: "January", event: "Registration & Kick-off", type: "Club" },
  { month: "March", event: "First Term Investiture", type: "Ceremony" },
  { month: "April", event: "Easter Community Outreach", type: "Service" },
  { month: "August", event: "Annual Campout", type: "Outdoor" },
  { month: "October", event: "Pathfinder Day Parade", type: "Event" },
  { month: "December", event: "Year-end Investiture", type: "Ceremony" },
];

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
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle, light = false, centered = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      style={{ textAlign: centered ? "center" : "left", marginBottom: 48 }}
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
          color: light ? "#4ade80" : "#15803d",
          background: light ? "rgba(74,222,128,.12)" : "#dcfce7",
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
            background: light ? "#4ade80" : "#16a34a",
          }}
        />
        {title}
      </span>
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(1.9rem,3.5vw,2.7rem)",
          fontWeight: 700,
          color: light ? "#fff" : "#14532d",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: 14,
        }}
      >
        {subtitle}
      </h2>
    </motion.div>
  );
}

export default function ProgrammesPage() {
  return (
    <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>
      {/* 1 — HERO SECTION */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "450px",
          background: "#14532d",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
          <Image
            src="/images/programme-hero.jpg"
            alt="Pathfinder Activities"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, #14532d, transparent)",
            }}
          />
        </div>
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, maxWidth: "1100px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Our Weekly <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#4ade80",
                }}
              >
                Programme
              </em>
            </h1>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "1.15rem",
                color: "rgba(255,255,255,.8)",
                maxWidth: "550px",
                lineHeight: 1.6,
                marginBottom: 32,
              }}
            >
              A holistic journey of discovery, service, and faith. We empower
              young people through a structured curriculum designed for every
              stage of growth.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <Link
                href="/join"
                style={{
                  background: "#fff",
                  color: "#14532d",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                Join Us Today
              </Link>
              <Link
                href="/contact"
                style={{
                  border: "1.5px solid rgba(255,255,255,.3)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2 — PHILOSOPHY & PILLARS */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <SectionHeading
                title="Our Philosophy"
                subtitle="The Four Pillars of Growth"
                centered={false}
              />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  color: "#4b7a5c",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                The Pathfinder programme is built on a foundation of holistic
                development. We believe that by nurturing the spiritual, mental,
                physical, and social aspects of a child&quot;s life, we prepare
                them for a lifetime of service and leadership.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-4">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="col-sm-6">
                    <motion.div
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      style={{
                        padding: "32px",
                        background: "#f0fdf4",
                        borderRadius: "24px",
                        border: "1px solid #d1fae5",
                        height: "100%",
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: 16 }}>
                        {p.icon}
                      </div>
                      <h4
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          color: "#14532d",
                          fontWeight: 700,
                          marginBottom: 12,
                        }}
                      >
                        {p.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          color: "#4b7a5c",
                          fontSize: ".9rem",
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        {p.desc}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — WEEKLY SCHEDULE */}
      <section style={{ padding: "100px 0", background: "#f2f8f3" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <SectionHeading
            title="Saturday Timetable"
            subtitle="A Typical Afternoon"
          />
          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(20,83,45,.05)",
              border: "1px solid #d1fae5",
            }}
          >
            {WEEKLY_SCHEDULE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  padding: "24px 32px",
                  borderBottom:
                    i === WEEKLY_SCHEDULE.length - 1
                      ? "none"
                      : "1px solid #f0fdf4",
                  alignItems: "center",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    minWidth: "100px",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700,
                    color: "#16a34a",
                    fontSize: "1.1rem",
                  }}
                >
                  {item.time}
                </div>
                <div style={{ flex: 1 }}>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                      margin: "0 0 4px",
                    }}
                  >
                    {item.activity}
                  </h5>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontSize: ".85rem",
                      color: "#4b7a5c",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  {item.location}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                background: "#dcfce7",
                borderRadius: "16px",
                border: "1px solid #bbf7d0",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎒</span>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".9rem",
                  color: "#14532d",
                  fontWeight: 500,
                }}
              >
                <strong>What to bring:</strong> Full uniform, Bible, notebook,
                and a water bottle.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — PATHFINDER CLASSES */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <SectionHeading
            title="Class Progression"
            subtitle="The Journey Through the Ranks"
          />
          <div className="row g-4">
            {CLASSES.map((c, i) => (
              <div key={c.name} className="col-lg-4 col-md-6">
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  style={{
                    padding: "32px",
                    background: "#fff",
                    borderRadius: "24px",
                    border: `1px solid ${c.color}33`,
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,.02)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "60px",
                      height: "60px",
                      background: c.color,
                      opacity: 0.1,
                      borderRadius: "0 0 0 100%",
                    }}
                  />
                  <span
                    style={{
                      color: c.color,
                      fontWeight: 700,
                      fontSize: ".8rem",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                    }}
                  >
                    Ages {c.ages}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#14532d",
                      fontWeight: 700,
                      margin: "8px 0 16px",
                    }}
                  >
                    {c.name}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      color: "#4b7a5c",
                      fontSize: ".95rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {c.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — HONOUR BADGES */}
      <section
        style={{ padding: "100px 0", background: "#14532d", color: "#fff" }}
      >
        <div className="container" style={{ maxWidth: "1100px" }}>
          <SectionHeading
            title="Skills & Achievement"
            subtitle="Honour Badges Gallery"
            light
          />
          <div className="row g-4">
            {BADGE_CATEGORIES.map((cat, i) => (
              <div key={cat.name} className="col-md-2 col-sm-4 col-6 mx-auto">
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "rgba(255,255,255,.1)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      margin: "0 auto 16px",
                      border: "1px solid rgba(255,255,255,.2)",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.1rem",
                      marginBottom: 4,
                    }}
                  >
                    {cat.name}
                  </h5>
                  <span style={{ fontSize: ".8rem", color: "#86efac" }}>
                    {cat.count} Badges
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 60,
              padding: "40px",
              background: "rgba(255,255,255,.05)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    marginBottom: 12,
                  }}
                >
                  How to earn a badge?
                </h4>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    color: "rgba(255,255,255,.7)",
                    margin: 0,
                  }}
                >
                  Pathfinders choose a subject, complete the required practical
                  and theoretical tasks under instructor supervision, and
                  demonstrate their knowledge during our termly assessments.
                </p>
              </div>
              <div className="col-md-4 text-md-end mt-4 mt-md-0">
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#4ade80",
                  }}
                >
                  42+
                </div>
                <div
                  style={{
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  Earned this term
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — ANNUAL CALENDAR */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <SectionHeading
            title="Yearly Roadmap"
            subtitle="2024 Annual Calendar"
          />
          <div className="row g-3">
            {ANNUAL_CALENDAR.map((item, i) => (
              <div key={i} className="col-12">
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px 28px",
                    background: "#f2f8f3",
                    borderRadius: "16px",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      fontWeight: 700,
                      color: "#15803d",
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                    }}
                  >
                    {item.month}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.event}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      fontWeight: 700,
                      color: "#4b7a5c",
                      background: "#fff",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {item.type}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — CAMPING & OUTDOORS */}
      <section style={{ padding: "100px 0", background: "#f2f8f3" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-2">
              <SectionHeading
                title="Outdoor Adventure"
                subtitle="Camping & Wilderness"
                centered={false}
              />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  color: "#4b7a5c",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  marginBottom: 24,
                }}
              >
                Our camping programme is the highlight of the year. Its where
                classroom learning meets the real world. Pathfinders learn
                survival skills, nature stewardship, and build lifelong bonds
                around the campfire.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                {[
                  "Annual 5-day Wilderness Camp",
                  "Quarterly Overnight Hikes",
                  "Survival Skills Workshops",
                  "Nature Conservation Projects",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      color: "#14532d",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: "#16a34a" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/gallery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#15803d",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                View Camp Photos
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div style={{ position: "relative" }}>
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
                    boxShadow: "0 20px 50px rgba(20,83,45,.1)",
                    zIndex: 1,
                  }}
                >
                  <Image
                    src="/images/camping.jpg"
                    alt="Camping"
                    width={600}
                    height={450}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — COMMUNITY SERVICE */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <SectionHeading
                title="Outreach"
                subtitle="Service to Humanity"
                centered={false}
              />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  color: "#4b7a5c",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  marginBottom: 32,
                }}
              >
                &quot;The love of Christ constrains us.&quot; Our outreach
                programme teaches Pathfinders that true leadership is found in
                serving others. We partner with local communities to make a
                tangible difference.
              </p>
              <div className="row g-4">
                <div className="col-6">
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#14532d",
                      fontFamily: "'Playfair Display',serif",
                    }}
                  >
                    600+
                  </div>
                  <div
                    style={{
                      fontSize: ".8rem",
                      color: "#4b7a5c",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                    }}
                  >
                    Service Hours
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#14532d",
                      fontFamily: "'Playfair Display',serif",
                    }}
                  >
                    12
                  </div>
                  <div
                    style={{
                      fontSize: ".8rem",
                      color: "#4b7a5c",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                    }}
                  >
                    Local Projects
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "32px",
                    borderRadius: "24px",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>🏥</div>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                    }}
                  >
                    Hospital Visits
                  </h5>
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "32px",
                    borderRadius: "24px",
                    border: "1px solid #d1fae5",
                    marginTop: "30px",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>📦</div>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                    }}
                  >
                    Food Drives
                  </h5>
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "32px",
                    borderRadius: "24px",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>🧹</div>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                    }}
                  >
                    Clean-ups
                  </h5>
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "32px",
                    borderRadius: "24px",
                    border: "1px solid #d1fae5",
                    marginTop: "30px",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>🌳</div>
                  <h5
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                    }}
                  >
                    Tree Planting
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — INVESTITURE */}
      <section
        style={{
          padding: "100px 0",
          background: "#14532d",
          color: "#fff",
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
              "radial-gradient(circle, rgba(74,222,128,.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="container"
          style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}
        >
          <SectionHeading
            title="Celebration"
            subtitle="The Investiture Ceremony"
            light
          />
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,.8)",
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              The Investiture is our most prestigious event. It&quot;s a formal
              ceremony where Pathfinders are recognized for completing their
              class requirements and earning their honours. It&quot;s a moment
              of pride for parents, counsellors, and the entire church family.
            </p>
            <div className="row g-4">
              <div className="col-md-4">
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,.05)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#4ade80",
                    }}
                  >
                    Twice
                  </h3>
                  <p style={{ fontSize: ".8rem", margin: 0, opacity: 0.7 }}>
                    Per Year
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,.05)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#4ade80",
                    }}
                  >
                    Full
                  </h3>
                  <p style={{ fontSize: ".8rem", margin: 0, opacity: 0.7 }}>
                    Dress Uniform
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,.05)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "#4ade80",
                    }}
                  >
                    Public
                  </h3>
                  <p style={{ fontSize: ".8rem", margin: 0, opacity: 0.7 }}>
                    Recognition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — DOWNLOADS */}
      <section style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <SectionHeading title="Resources" subtitle="Downloads & Guides" />
          <div className="row g-4">
            {[
              { title: "Programme Handbook", size: "2.4 MB", type: "PDF" },
              { title: "Term 2 Schedule", size: "1.1 MB", type: "PDF" },
              { title: "Badge Requirements", size: "4.8 MB", type: "PDF" },
              { title: "Parental Consent Form", size: "0.5 MB", type: "DOCX" },
            ].map((file, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div
                  style={{
                    padding: "24px",
                    background: "#f2f8f3",
                    borderRadius: "20px",
                    border: "1px solid #d1fae5",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 16 }}>📄</div>
                  <h6
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#14532d",
                      marginBottom: 8,
                    }}
                  >
                    {file.title}
                  </h6>
                  <div
                    style={{
                      fontSize: ".75rem",
                      color: "#4b7a5c",
                      marginBottom: 20,
                    }}
                  >
                    {file.type} • {file.size}
                  </div>
                  <button
                    style={{
                      marginTop: "auto",
                      background: "#fff",
                      border: "1px solid #bbf7d0",
                      padding: "8px 16px",
                      borderRadius: "999px",
                      fontSize: ".85rem",
                      fontWeight: 600,
                      color: "#15803d",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — CTA STRIP */}
      <section style={{ background: "#f2f8f3", padding: "72px 0 88px" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <motion.div
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
                Ready to Start the Journey?
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
                Join over 120 Pathfinders in a journey of faith, friendship, and
                discovery. Registration is open for the new term.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/join"
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
                }}
              >
                Register Now
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </main>
  );
}
