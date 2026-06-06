"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    day: 7,
    month: "Jun",
    title: "Weekly Pathfinder Meeting",
    category: "worship",
    badge: "Worship",
    time: "3:00 PM – 5:00 PM",
    location: "Shauri Moyo SDA Church Hall",
  },
  {
    day: 14,
    month: "Jun",
    title: "Community Outreach Day",
    category: "outreach",
    badge: "Outreach",
    time: "8:00 AM – 1:00 PM",
    location: "Kamukunji Grounds",
    featured: true,
    rsvp: true,
  },
  {
    day: 14,
    month: "Jun",
    title: "Counsellor Training Session",
    category: "training",
    badge: "Training",
    time: "2:00 PM – 4:30 PM",
    location: "Church Boardroom",
  },
  {
    day: 21,
    month: "Jun",
    title: "Mid-Year Campout Weekend",
    category: "camp",
    badge: "Camping",
    time: "Fri 4 PM – Sun 12 PM",
    location: "Karura Forest, Nairobi",
    featured: true,
    rsvp: true,
  },
  {
    day: 28,
    month: "Jun",
    title: "Investiture Ceremony Rehearsal",
    category: "worship",
    badge: "Worship",
    time: "10:00 AM – 12:00 PM",
    location: "Main Sanctuary",
  },
  {
    day: 5,
    month: "Jul",
    title: "Honours Badge Day",
    category: "training",
    badge: "Training",
    time: "9:00 AM – 3:00 PM",
    location: "Church Grounds",
    rsvp: true,
  },
];

// Category → badge colors (matching Intro/Members green palette)
const BADGE_STYLES = {
  camp: { background: "#dcfce7", color: "#15803d" },
  worship: { background: "#dbeafe", color: "#1e40af" },
  outreach: { background: "#fef3c7", color: "#92400e" },
  training: { background: "#fce7f3", color: "#9d174d" },
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Camping", value: "camp" },
  { label: "Worship", value: "worship" },
  { label: "Outreach", value: "outreach" },
  { label: "Training", value: "training" },
];

// Mini-calendar — days in June 2025 that have events
const EVENT_DAYS = new Set([7, 14, 21, 28]);
const CAL_DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const JUNE_FIRST_DOW = 0; // Sunday
const DAYS_IN_JUNE = 30;
const TODAY_DAY = 14; // highlighted "today"

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function EventCard({ event, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      style={{
        background: "#ffffff",
        border: event.featured ? "none" : "1px solid #d1fae5",
        borderLeft: event.featured ? "3px solid #16a34a" : "1px solid #d1fae5",
        borderRadius: event.featured ? "0 20px 20px 0" : "20px",
        padding: "20px 22px",
        display: "grid",
        gridTemplateColumns: "64px 1fr auto",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {/* Date box */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "10px",
          padding: "10px 8px",
          minWidth: "64px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#14532d",
            lineHeight: 1,
          }}
        >
          {event.day}
        </span>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#15803d",
            marginTop: "3px",
          }}
        >
          {event.month}
        </span>
      </div>

      {/* Event details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
            padding: "2px 10px",
            width: "fit-content",
            marginBottom: "2px",
            ...BADGE_STYLES[event.category],
          }}
        >
          {event.badge}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {event.title}
        </h3>

        {/* Time & location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "4px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#4b7a5c",
            }}
          >
            {/* Clock icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4b7a5c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#4b7a5c",
            }}
          >
            {/* Pin icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4b7a5c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>
      </div>

      {/* Action button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: ".82rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          padding: "9px 16px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          background: event.rsvp
            ? "linear-gradient(135deg, #16a34a, #15803d)"
            : "transparent",
          color: event.rsvp ? "#fff" : "#15803d",
          outline: event.rsvp ? "none" : "1.5px solid #bbf7d0",
        }}
      >
        {event.rsvp ? "RSVP" : "Details"}
        <svg
          width="12"
          height="12"
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
      </motion.button>
    </motion.div>
  );
}

function MiniCalendar() {
  return (
    <motion.div
      custom={5}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      style={{
        background: "#ffffff",
        border: "1px solid #d1fae5",
        borderRadius: "20px",
        padding: "24px",
        marginTop: "36px",
      }}
    >
      {/* Calendar header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#14532d",
          }}
        >
          June 2025
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["‹", "›"].map((arrow, i) => (
            <button
              key={i}
              aria-label={i === 0 ? "Previous month" : "Next month"}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid #d1fae5",
                background: "transparent",
                cursor: "pointer",
                fontSize: "1rem",
                color: "#4b7a5c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* Day labels + day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          textAlign: "center",
        }}
      >
        {/* Weekday headers */}
        {CAL_DAY_LABELS.map((d) => (
          <div
            key={d}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: ".06em",
              color: "#4b7a5c",
              textTransform: "uppercase",
              paddingBottom: "8px",
            }}
          >
            {d}
          </div>
        ))}

        {/* Empty cells before the 1st */}
        {Array.from({ length: JUNE_FIRST_DOW }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: DAYS_IN_JUNE }, (_, i) => i + 1).map((d) => {
          const isToday = d === TODAY_DAY;
          const hasEvent = EVENT_DAYS.has(d) && !isToday;

          return (
            <div
              key={d}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12.5px",
                padding: "5px 2px",
                borderRadius: isToday ? "50%" : "6px",
                background: isToday
                  ? "#16a34a"
                  : hasEvent
                    ? "#dcfce7"
                    : "transparent",
                color: isToday ? "#fff" : hasEvent ? "#14532d" : "#4b7a5c",
                fontWeight: isToday ? 700 : hasEvent ? 600 : 400,
                cursor: hasEvent || isToday ? "pointer" : "default",
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid #d1fae5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#16a34a",
            }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11px",
              color: "#4b7a5c",
            }}
          >
            Today
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "3px",
              background: "#dcfce7",
              border: "1px solid #bbf7d0",
            }}
          />
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11px",
              color: "#4b7a5c",
            }}
          >
            Event day
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeFilter);

  return (
    <section
      style={{
        background: "#f2f8f3",
        padding: "88px 0 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial blobs — matches Intro + Members sections */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "420px",
          height: "420px",
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

      <div className="container" style={{ maxWidth: "900px" }}>
        {/* ── Section heading ── */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ marginBottom: "44px" }}
        >
          {/* Eyebrow */}
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
            Events &amp; Calendar
          </span>

          {/* Headline + sub split into two columns on large screens */}
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3">
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)",
                  fontWeight: 700,
                  color: "#14532d",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "10px",
                }}
              >
                What&apos;s Coming{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#16a34a",
                  }}
                >
                  Up
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".97rem",
                  color: "#4b7a5c",
                  lineHeight: 1.68,
                  maxWidth: "440px",
                  margin: 0,
                }}
              >
                Stay connected with everything happening at Shauri Moyo — from
                weekly meetings to special campouts and outreach days.
              </p>
            </div>

            {/* View all link */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: ".88rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                color: "#15803d",
                textDecoration: "none",
                border: "1.5px solid #bbf7d0",
                borderRadius: "999px",
                padding: "9px 18px",
                whiteSpace: "nowrap",
                background: "transparent",
              }}
            >
              View full calendar
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

        {/* ── Filter pills ── */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: "999px",
                border: "1.5px solid",
                borderColor: activeFilter === f.value ? "#16a34a" : "#d1fae5",
                background:
                  activeFilter === f.value ? "#16a34a" : "transparent",
                color: activeFilter === f.value ? "#fff" : "#4b7a5c",
                cursor: "pointer",
                transition: "all .18s ease",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* ── Event cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filtered.length > 0 ? (
            filtered.map((event, i) => (
              <EventCard
                key={`${event.day}-${event.title}`}
                event={event}
                index={i + 2}
              />
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#4b7a5c",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              No events in this category yet. Check back soon!
            </div>
          )}
        </div>

        {/* ── Mini calendar ── */}
        {/* <MiniCalendar /> */}

        {/* ── Subscribe CTA banner ── */}
        <motion.div
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "44px",
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
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              Never Miss an Event
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: ".93rem",
                color: "#86efac",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Get reminders sent straight to your WhatsApp or email.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fff",
              color: "#15803d",
              border: "none",
              borderRadius: "999px",
              padding: "13px 26px",
              fontSize: ".95rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Subscribe to Updates
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}
