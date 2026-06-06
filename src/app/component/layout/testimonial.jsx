"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Data — replace photo paths + quotes with real content ────────────────────

const TESTIMONIALS = [
  {
    id: 1,
    name: "Grace Wanjiku",
    role: "Parent of a Pathfinder",
    photo: "/pic.jpeg",
    quote:
      "My daughter was very shy when she joined. Within six months she was leading the flag ceremony and speaking in front of the whole church. Pathfinders gave her a confidence I never thought possible.",
    stars: 5,
    badge: "Parent",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    years: "2 years in the club",
  },
  {
    id: 2,
    name: "James Otieno",
    role: "Former Pathfinder · Now Master Guide",
    photo: "/images/testimonial-james.jpg",
    quote:
      "I joined Shauri Moyo Pathfinders at 11. The discipline, the faith, the friendships — they shaped who I am today. I came back as a counsellor because I want to give the same to this generation.",
    stars: 5,
    badge: "Counsellor",
    badgeBg: "#d1fae5",
    badgeColor: "#059669",
    years: "10+ years with the club",
  },
  {
    id: 3,
    name: "Mary Achieng",
    role: "Parent of two Pathfinders",
    photo: "/images/testimonial-mary.jpg",
    quote:
      "Both my children are in the club and I see the difference every week. They pray more, they help at home, and they've made wonderful Christian friends. This club is a blessing to our family.",
    stars: 5,
    badge: "Parent",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    years: "4 years in the club",
  },
  {
    id: 4,
    name: "Brian Kamau",
    role: "Active Pathfinder Member, Age 14",
    photo: "/images/testimonial-brian.jpg",
    quote:
      "My favourite part is the camping trips — we learn to cook, set up tents, and read maps. But what I love most is how we pray together and look out for each other. It feels like a real family.",
    stars: 5,
    badge: "Member",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    years: "3 years in the club",
  },
  {
    id: 5,
    name: "Pastor David Muthui",
    role: "Church Elder, Shauri Moyo SDA",
    photo: "/images/testimonial-pastor.jpg",
    quote:
      "The Pathfinder programme is one of the most powerful youth discipleship tools the church has. I have watched children grow into faithful, responsible young adults right before my eyes.",
    stars: 5,
    badge: "Church Leader",
    badgeBg: "#ede9fe",
    badgeColor: "#5b21b6",
    years: "Club patron since 2018",
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

const slideVariant = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.35 },
  }),
};

// ─── Star row helper ──────────────────────────────────────────────────────────

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill={i < count ? "#fbbf24" : "none"}
          stroke={i < count ? "#fbbf24" : "#d1d5db"}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── Featured large card (left side) ─────────────────────────────────────────

function FeaturedCard({ t, direction }) {
  return (
    <div
      style={{
        background: "#14532d",
        borderRadius: "24px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Photo — full width, fixed height */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "280px",
          flexShrink: 0,
        }}
      >
        <Image
          src={t.photo}
          alt={`Photo of ${t.name}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="(max-width: 992px) 100vw, 50vw"
          quality={85}
        />
        {/* Dark-green gradient fade from bottom so text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,40,15,0.92) 0%, rgba(10,40,15,0.3) 50%, transparent 100%)",
          }}
        />
        {/* Badge floats over the photo */}
        <span
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "10.5px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            background: t.badgeBg,
            color: t.badgeColor,
            borderRadius: "999px",
            padding: "4px 12px",
          }}
        >
          {t.badge}
        </span>
      </div>

      {/* Quote block */}
      <div
        style={{
          padding: "28px 28px 32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Large opening quote mark */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "72px",
            color: "#16a34a",
            opacity: 0.35,
            lineHeight: 0.7,
            marginBottom: "4px",
          }}
          aria-hidden="true"
        >
          “
        </div>

        <Stars count={t.stars} />

        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#dcfce7",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {t.quote}
        </p>

        {/* Name + role + years */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: ".95rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "2px",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: ".82rem",
              color: "#86efac",
            }}
          >
            {t.role}
          </div>
          {t.years && (
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: ".78rem",
                color: "rgba(134,239,172,0.7)",
                marginTop: "2px",
              }}
            >
              {t.years}
            </div>
          )}
        </div>
      </div>

      {/* Decorative cross — bottom right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        >
          <line x1="24" y1="4" x2="24" y2="44" />
          <line x1="4" y1="24" x2="44" y2="24" />
        </svg>
      </div>
    </div>
  );
}

// ─── Small side card ──────────────────────────────────────────────────────────

function SmallCard({ t, isActive, onClick }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      onClick={onClick}
      style={{
        background: isActive ? "#ffffff" : "#f0fdf4",
        border: isActive ? "2px solid #16a34a" : "1px solid #d1fae5",
        borderRadius: "16px",
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        transition: "border-color .2s, background .2s",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          background: "#dcfce7",
          border: isActive ? "2px solid #16a34a" : "2px solid #bbf7d0",
          position: "relative",
        }}
      >
        <Image
          src={t.photo}
          alt={t.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="48px"
        />
      </div>

      {/* Name + preview */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".9rem",
            fontWeight: 600,
            color: "#14532d",
            marginBottom: "2px",
          }}
        >
          {t.name}
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".78rem",
            color: "#4b7a5c",
            marginBottom: "6px",
          }}
        >
          {t.role}
        </div>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: ".82rem",
            color: "#6b9e7e",
            lineHeight: 1.5,
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          “{t.quote.slice(0, 80)}…”
        </p>
      </div>

      {/* Active chevron */}
      {isActive && (
        <div style={{ flexShrink: 0, paddingTop: "2px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3l5 5-5 5"
              stroke="#16a34a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  //   function goTo(index: number) {
  function goTo(index) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function goPrev() {
    goTo(activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1);
  }

  function goNext() {
    goTo(activeIndex === TESTIMONIALS.length - 1 ? 0 : activeIndex + 1);
  }

  const active = TESTIMONIALS[activeIndex];

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
            Testimonials
          </span>

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
            Stories of{" "}
            <em
              style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}
            >
              Real Impact
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              color: "#4b7a5c",
              lineHeight: 1.72,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Hear from parents, members, and leaders whose lives have been shaped
            by the Shauri Moyo Pathfinder Club.
          </p>
        </motion.div>

        {/* ── Trust bar ── */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "32px",
            marginBottom: "52px",
          }}
        >
          {[
            { num: "120+", label: "Happy Pathfinders" },
            { num: "98%", label: "Parent satisfaction" },
            { num: "10+", label: "Years of impact" },
            { num: "8", label: "Dedicated counsellors" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#15803d",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "#4b7a5c",
                  marginTop: "5px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Main layout: featured card + side list ── */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="row g-4 align-items-stretch">
            {/* LEFT — animated featured testimonial */}
            <div className="col-lg-5 col-12">
              <div style={{ height: "100%", position: "relative" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    variants={slideVariant}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ height: "100%" }}
                  >
                    <FeaturedCard t={active} direction={direction} />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows below the card */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                    marginTop: "14px",
                  }}
                >
                  {[
                    {
                      label: "Previous",
                      action: goPrev,
                      points: "15 18 9 12 15 6",
                    },
                    { label: "Next", action: goNext, points: "9 6 15 12 9 18" },
                  ].map((btn) => (
                    <motion.button
                      key={btn.label}
                      onClick={btn.action}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={btn.label}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#ffffff",
                        border: "1.5px solid #d1fae5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#14532d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points={btn.points} />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — clickable small cards */}
            <div className="col-lg-7 col-12">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  height: "100%",
                }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <SmallCard
                    key={t.id}
                    t={t}
                    isActive={i === activeIndex}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA banner ── */}
        {/* <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "56px",
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
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "6px",
              }}
            >
              Ready to Write Your Own Story?
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: ".93rem",
                color: "#86efac",
                lineHeight: 1.55,
                maxWidth: "400px",
                margin: 0,
              }}
            >
              Join a community that shapes character, builds faith, and creates
              memories that last a lifetime.
            </p>
          </div>

          <motion.a
            href="/join"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              color: "#15803d",
              textDecoration: "none",
              borderRadius: "999px",
              padding: "13px 26px",
              fontSize: ".95rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Join the Club
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
          </motion.a>
        </motion.div> */}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}
