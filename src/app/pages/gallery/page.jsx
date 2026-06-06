"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const MEDIA = [
  // ── Featured carousel items ─────────────────────────────
  {
    id: 1,
    type: "photo",
    src: "/pic.jpeg",
    alt: "Investiture Ceremony 2024",
    category: "Awards",
    title: "Investiture Ceremony 2024",
    caption:
      "Our Pathfinders received their honours in a proud celebration of faith and achievement.",
    date: "Nov 2024",
    featured: true,
  },
  {
    id: 2,
    type: "photo",
    src: "/pfA.jpg",
    alt: "Karura Forest Campout",
    category: "Outdoor",
    title: "Karura Forest Campout",
    caption:
      "Three days of adventure, campfire cooking, and star-gazing under God's creation.",
    date: "Aug 2024",
    featured: true,
  },
  {
    id: 3,
    type: "photo",
    src: "/pf staff.jpg",
    alt: "Community Outreach Day",
    category: "Outreach",
    title: "Kamukunji Outreach Day",
    caption:
      "Pathfinders served over 200 families during our bi-monthly community outreach.",
    date: "Sep 2024",
    featured: true,
  },

  // ── Grid items ─────────────────────────────────────────
  {
    id: 4,
    type: "photo",
    src: "/images/gallery-devotion.jpg",
    alt: "Opening Devotion",
    category: "Worship",
    title: "Saturday Opening Devotion",
    caption: "Every session begins with prayer and Scripture.",
    date: "Oct 2024",
  },
  {
    id: 5,
    type: "photo",
    src: "/images/gallery-crafts.jpg",
    alt: "Arts and Crafts",
    category: "Creative",
    title: "Arts & Crafts Badge Day",
    caption: "Creativity as a God-given gift — on full display.",
    date: "Sep 2024",
  },
  {
    id: 6,
    type: "video",
    src: "/images/gallery-video-thumb-1.jpg",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Campfire worship night",
    category: "Worship",
    title: "Campfire Worship Night",
    caption: "An unforgettable evening of praise under the stars.",
    date: "Aug 2024",
  },
  {
    id: 7,
    type: "photo",
    src: "/images/gallery-firstaid.jpg",
    alt: "First Aid Training",
    category: "Outdoor",
    title: "First Aid & Safety Training",
    caption: "Learning life-saving skills guided by our qualified counsellors.",
    date: "Jul 2024",
  },
  {
    id: 8,
    type: "photo",
    src: "/images/gallery-badges.jpg",
    alt: "Badge presentation",
    category: "Awards",
    title: "Honour Badge Presentations",
    caption: "Forty-two badges earned this term — a club record!",
    date: "Oct 2024",
  },
  {
    id: 9,
    type: "video",
    src: "/images/gallery-video-thumb-2.jpg",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Pathfinder Parade",
    category: "Awards",
    title: "Annual Pathfinder Parade",
    caption: "Marching proudly through the church grounds on Parade Day.",
    date: "Nov 2024",
  },
  {
    id: 10,
    type: "photo",
    src: "/images/gallery-food-drive.jpg",
    alt: "Food Drive",
    category: "Outreach",
    title: "End-of-Year Food Drive",
    caption:
      "Collecting and distributing over 300 food parcels to families in need.",
    date: "Dec 2024",
  },
  {
    id: 11,
    type: "photo",
    src: "/images/gallery-music.jpg",
    alt: "Music rehearsal",
    category: "Creative",
    title: "Choir & Instrument Practice",
    caption: "Making a joyful noise unto the Lord every Saturday.",
    date: "Oct 2024",
  },
  {
    id: 12,
    type: "video",
    src: "/images/gallery-video-thumb-3.jpg",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "Nature walk highlights",
    category: "Outdoor",
    title: "Nature Walk Highlights",
    caption: "Exploring Nairobi's greenery and learning about God's creation.",
    date: "Jul 2024",
  },
  {
    id: 13,
    type: "photo",
    src: "/images/gallery-prayer.jpg",
    alt: "Prayer circle",
    category: "Worship",
    title: "Morning Prayer Circle",
    caption: "Pathfinders gather in unity before every major event.",
    date: "Sep 2024",
  },
  {
    id: 14,
    type: "photo",
    src: "/images/gallery-painting.jpg",
    alt: "Painting session",
    category: "Creative",
    title: "Watercolour Painting Badge",
    caption: "Young artists expressing their faith through colour.",
    date: "Aug 2024",
  },
  {
    id: 15,
    type: "photo",
    src: "/images/gallery-hospital.jpg",
    alt: "Hospital visit",
    category: "Outreach",
    title: "Hospital Visitation Ministry",
    caption:
      "Bringing cheer and prayer to patients at Kenyatta National Hospital.",
    date: "Jun 2024",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Worship",
  "Outdoor",
  "Outreach",
  "Creative",
  "Awards",
  "Videos",
];

const FEATURED = MEDIA.filter((m) => m.featured);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent((index + FEATURED.length) % FEATURED.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setDirection(1);
        return (c + 1) % FEATURED.length;
      });
    }, 5500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const slide = FEATURED[current];

  const slideVariant = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d) => ({
      opacity: 0,
      x: d > 0 ? -80 : 80,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(420px, 60vh, 620px)",
        overflow: "hidden",
        borderRadius: "0 0 28px 28px",
        background: "#14532d",
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariant}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            quality={90}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(10,40,15,.9) 0%, rgba(10,40,15,.4) 50%, rgba(0,0,0,.15) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg,#16a34a,#4ade80,#16a34a)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${slide.id}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.55,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "32px 40px 44px",
            zIndex: 5,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#4ade80",
              marginBottom: "10px",
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
            {slide.category} · {slide.date}
          </span>

          <h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "10px",
              textShadow: "0 2px 16px rgba(0,0,0,.3)",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(.88rem,1.5vw,1rem)",
              color: "rgba(255,255,255,.8)",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            {slide.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 26,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(255,255,255,.13)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,.22)",
          borderRadius: "999px",
          padding: "5px 14px",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: ".06em",
        }}
      >
        {String(current + 1).padStart(2, "0")}
        <span style={{ opacity: 0.5, margin: "0 2px" }}>/</span>
        {String(FEATURED.length).padStart(2, "0")}
      </div>

      {/* Prev / Next controls */}
      {[
        {
          label: "Prev",
          dir: -1,
          side: "left:16px",
          points: "15 18 9 12 15 6",
        },
        { label: "Next", dir: 1, side: "right:16px", points: "9 6 15 12 9 18" },
      ].map((btn) => (
        <button
          key={btn.label}
          aria-label={btn.label}
          onClick={() => {
            go(current + btn.dir, btn.dir);
            startTimer();
          }}
          style={{
            position: "absolute",
            top: "50%",
            [btn.side.split(":")[0]]: btn.side.split(":")[1],
            transform: "translateY(-50%)",
            width: 46,
            height: 46,
            borderRadius: "50%",
            zIndex: 6,
            background: "rgba(255,255,255,.13)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background .2s",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points={btn.points} />
          </svg>
        </button>
      ))}

      {/* Line indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 28,
          zIndex: 6,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        {FEATURED.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              go(i, i > current ? 1 : -1);
              startTimer();
            }}
            style={{
              width: i === current ? 44 : 24,
              height: 3,
              borderRadius: "999px",
              border: "none",
              padding: 0,
              background: i === current ? "#4ade80" : "rgba(255,255,255,.3)",
              cursor: "pointer",
              transition: "width .35s ease, background .35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,40,15,.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{ scale: 0.93, opacity: 0, transition: { duration: 0.2 } }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "860px",
          background: "#14532d",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,.5)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(260px,50vh,520px)",
            background: "#0f3d1e",
          }}
        >
          {item.type === "video" && item.videoSrc ? (
            <iframe
              src={item.videoSrc}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "contain" }}
              quality={90}
            />
          )}
        </div>

        <div
          style={{
            padding: "24px 28px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                fontSize: "10.5px",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                background: "#dcfce7",
                color: "#15803d",
                borderRadius: "999px",
                padding: "2px 10px",
                marginBottom: "8px",
              }}
            >
              {item.category} · {item.date}
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: ".9rem",
                color: "rgba(255,255,255,.7)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {item.caption}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.08)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA CARD
// ─────────────────────────────────────────────────────────────────────────────

function MediaCard({ item, index, onClick }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={gridItem}
      whileHover={{ y: -5, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      onClick={onClick}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#d1fae5",
        border: "1px solid #d1fae5",
        position: "relative",
        aspectRatio: item.type === "video" ? "16/9" : "4/3",
      }}
      className="media-card"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        quality={80}
        className="media-card-img"
      />

      {item.type === "video" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(22,163,74,.85)",
              backdropFilter: "blur(4px)",
              border: "2px solid rgba(255,255,255,.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform .2s, background .2s",
            }}
            className="play-icon"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 3,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: "10px",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 600,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          background: "rgba(255,255,255,.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,.25)",
          color: "#fff",
          borderRadius: "999px",
          padding: "3px 10px",
          transition: "opacity .3s",
        }}
        className="card-badge"
      >
        {item.type === "video" ? "▶ Video" : item.category}
      </div>

      <div
        className="card-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(10,40,15,.88) 0%, rgba(10,40,15,.15) 60%, transparent 100%)",
          opacity: 0,
          transition: "opacity .3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "14px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg,#16a34a,#4ade80,#16a34a)",
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: ".95rem",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: ".78rem",
            color: "rgba(255,255,255,.75)",
          }}
        >
          {item.date}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = MEDIA.filter((item) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Videos") return item.type === "video";
    return item.category === activeCategory;
  });

  return (
    <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>
      <HeroCarousel />

      <div
        className="container"
        style={{ maxWidth: "1100px", padding: "56px 24px 96px" }}
      >
        {/* Section heading */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "36px" }}
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
            Our Memories
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
            The Full{" "}
            <em
              style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}
            >
              Gallery
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "1rem",
              color: "#4b7a5c",
              lineHeight: 1.72,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Browse photos and videos from our camps, worship sessions, outreach
            days, ceremonies, and creative activities.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "12.5px",
                fontWeight: 600,
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "#16a34a" : "#d1fae5",
                background:
                  activeCategory === cat
                    ? cat === "Videos"
                      ? "linear-gradient(135deg,#16a34a,#15803d)"
                      : "#16a34a"
                    : "transparent",
                color: activeCategory === cat ? "#fff" : "#4b7a5c",
                cursor: "pointer",
                transition: "all .18s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {cat === "Videos" && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
              {cat}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background:
                    activeCategory === cat
                      ? "rgba(255,255,255,.25)"
                      : "#d1fae5",
                  color: activeCategory === cat ? "#fff" : "#15803d",
                  fontSize: "10px",
                  fontWeight: 700,
                }}
              >
                {cat === "All"
                  ? MEDIA.length
                  : cat === "Videos"
                    ? MEDIA.filter((m) => m.type === "video").length
                    : MEDIA.filter((m) => m.category === cat).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Media grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="gallery-page-grid"
          >
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => setLightboxItem(item)}
                />
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "60px 0",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "1rem",
                  color: "#4b7a5c",
                }}
              >
                No items in this category yet. Check back soon!
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        .gallery-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .media-card:hover .media-card-img { transform: scale(1.06); }
        .media-card-img { transition: transform .45s cubic-bezier(.22,1,.36,1); }

        .media-card:hover .card-overlay { opacity: 1 !important; }
        .media-card:hover .card-badge   { opacity: 0; }
        .media-card:hover .play-icon    { transform: scale(1.12); background: rgba(22,163,74,1) !important; }

        @media (max-width: 900px) {
          .gallery-page-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 520px) {
          .gallery-page-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </main>
  );
}
