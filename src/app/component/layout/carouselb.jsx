"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./styles/carouselb.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const FEATURED = [
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
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </>
      ) : (
        <>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </>
      )}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent((index + FEATURED.length) % FEATURED.length);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrent((value) => {
        setDirection(1);
        return (value + 1) % FEATURED.length;
      });
    }, 5500);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const slide = FEATURED[current];

  const slideVariant = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
    }),

    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },

    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariant}
          initial="enter"
          animate="center"
          exit="exit"
          className={styles.heroImageLayer}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.heroImage}
          />

          <div className={styles.heroOverlay} />
        </motion.div>
      </AnimatePresence>

      {/* Green structural line */}
      <div className={styles.heroAccentLine} />

      {/* Archive label */}
      <div className={styles.heroArchiveLabel}>
        <span className={styles.liveDot} />
        <span>PATHFINDER MEDIA ARCHIVE</span>
      </div>

      {/* Counter */}
      <div className={styles.heroCounter}>
        <span>{String(current + 1).padStart(2, "0")}</span>

        <span className={styles.counterDivider}>/</span>

        <span>{String(FEATURED.length).padStart(2, "0")}</span>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${slide.id}`}
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.55,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={styles.heroContent}
        >
          <div className={styles.heroMeta}>
            <span>{slide.category}</span>
            <span className={styles.metaSeparator}>/</span>
            <span>{slide.date}</span>
          </div>

          <div className={styles.heroTitleRow}>
            <div>
              <h1 className={styles.heroTitle}>{slide.title}</h1>

              <p className={styles.heroCaption}>{slide.caption}</p>
            </div>

            <div className={styles.heroType}>
              <span className={styles.heroTypeIcon}>
                {slide.type === "video" ? (
                  <PlayIcon />
                ) : (
                  <span className={styles.cameraIcon}>IMG</span>
                )}
              </span>

              <span>{slide.type === "video" ? "VIDEO" : "PHOTOGRAPH"}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className={styles.heroNavigation}>
        <button
          type="button"
          className={styles.heroNavButton}
          aria-label="Previous featured item"
          onClick={() => {
            go(current - 1, -1);
            startTimer();
          }}
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          className={styles.heroNavButton}
          aria-label="Next featured item"
          onClick={() => {
            go(current + 1, 1);
            startTimer();
          }}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className={styles.heroIndicators}>
        {FEATURED.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-label={`Go to featured slide ${index + 1}`}
            className={`${styles.heroIndicator} ${
              index === current ? styles.heroIndicatorActive : ""
            }`}
            onClick={() => {
              go(index, index > current ? 1 : -1);
              startTimer();
            }}
          />
        ))}
      </div>

      {/* Thumbnail rail */}
      <div className={styles.heroThumbnailRail}>
        {FEATURED.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`${styles.heroThumbnail} ${
              index === current ? styles.heroThumbnailActive : ""
            }`}
            onClick={() => {
              go(index, index > current ? 1 : -1);
              startTimer();
            }}
          >
            <span className={styles.thumbnailNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className={styles.thumbnailImage}>
              <Image
                src={item.src}
                alt=""
                fill
                sizes="80px"
                className={styles.thumbnailImg}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
