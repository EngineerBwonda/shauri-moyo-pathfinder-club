"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const MEDIA = [
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

const CATEGORIES = [
  "All",
  "Worship",
  "Outdoor",
  "Outreach",
  "Creative",
  "Awards",
  "Videos",
];

const FEATURED = MEDIA.filter((media) => media.featured);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const gridItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

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

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

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

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

function Lightbox({ item, index, total, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handler);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);

      document.body.style.overflow = "";
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.lightbox}
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={styles.lightboxPanel}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.lightboxHeader}>
          <div className={styles.lightboxHeaderLeft}>
            <span className={styles.lightboxEyebrow}>PATHFINDER ARCHIVE</span>

            <span className={styles.lightboxFileNumber}>
              FILE {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery viewer"
            className={styles.lightboxClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Media */}
        <div className={styles.lightboxMedia}>
          {item.type === "video" && item.videoSrc ? (
            <iframe
              src={item.videoSrc}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.lightboxVideo}
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 1000px"
              className={styles.lightboxImage}
            />
          )}
        </div>

        {/* Information */}
        <div className={styles.lightboxInfo}>
          <div className={styles.lightboxInfoMain}>
            <div className={styles.lightboxMeta}>
              <span>{item.type === "video" ? "VIDEO" : "PHOTO"}</span>
              <span>/</span>
              <span>{item.category}</span>
              <span>/</span>
              <span>{item.date}</span>
            </div>

            <h2 className={styles.lightboxTitle}>{item.title}</h2>

            <p className={styles.lightboxCaption}>{item.caption}</p>
          </div>

          <div className={styles.lightboxActions}>
            <button
              type="button"
              className={styles.lightboxNav}
              onClick={onPrevious}
              aria-label="Previous media"
            >
              <ArrowIcon direction="left" />
              <span>PREVIOUS</span>
            </button>

            <button
              type="button"
              className={styles.lightboxNav}
              onClick={onNext}
              aria-label="Next media"
            >
              <span>NEXT</span>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA CARD
// ─────────────────────────────────────────────────────────────────────────────

function MediaCard({ item, index, onClick }) {
  /*
   * Creates an editorial/asymmetric rhythm.
   * Every sixth item becomes larger.
   */
  const position =
    index % 7 === 0
      ? "large"
      : index % 5 === 0
        ? "wide"
        : index % 4 === 0
          ? "tall"
          : "normal";

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={gridItem}
      whileHover={{
        y: -4,
      }}
      className={`${styles.mediaCard} ${styles[`card${position}`]}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image */}
      <div className={styles.mediaImageWrapper}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="
            (max-width: 600px) 100vw,
            (max-width: 900px) 50vw,
            33vw
          "
          quality={82}
          className={styles.mediaCardImage}
        />

        <div className={styles.mediaImageShade} />

        {/* Index */}
        <div className={styles.cardIndex}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Type badge */}
        <div className={styles.cardType}>
          {item.type === "video" ? (
            <>
              <PlayIcon />
              VIDEO
            </>
          ) : (
            <>
              IMG
              <span>/</span>
              {item.category}
            </>
          )}
        </div>

        {/* Video play button */}
        {item.type === "video" && (
          <div className={styles.playButton}>
            <PlayIcon />
          </div>
        )}

        {/* Hover action */}
        <div className={styles.cardView}>
          <span>VIEW</span>
          <ArrowIcon direction="right" />
        </div>
      </div>

      {/* Metadata */}
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <span>{item.category}</span>

          <span className={styles.cardDate}>{item.date}</span>
        </div>

        <h3 className={styles.cardTitle}>{item.title}</h3>

        <div className={styles.cardBottom}>
          <span>
            {item.type === "video" ? "MEDIA / VIDEO" : "MEDIA / PHOTO"}
          </span>

          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATISTICS
// ─────────────────────────────────────────────────────────────────────────────

function ArchiveStats() {
  const photos = MEDIA.filter((item) => item.type === "photo").length;

  const videos = MEDIA.filter((item) => item.type === "video").length;

  return (
    <div className={styles.archiveStats}>
      <div className={styles.stat}>
        <span className={styles.statNumber}>{MEDIA.length}</span>

        <span className={styles.statLabel}>MEDIA ITEMS</span>
      </div>

      <div className={styles.statDivider} />

      <div className={styles.stat}>
        <span className={styles.statNumber}>{photos}</span>

        <span className={styles.statLabel}>PHOTOGRAPHS</span>
      </div>

      <div className={styles.statDivider} />

      <div className={styles.stat}>
        <span className={styles.statNumber}>{videos}</span>

        <span className={styles.statLabel}>VIDEOS</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = MEDIA.filter((item) => {
    if (activeCategory === "All") {
      return true;
    }

    if (activeCategory === "Videos") {
      return item.type === "video";
    }

    return item.category === activeCategory;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;

      return (current - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;

      return (current + 1) % filtered.length;
    });
  }, [filtered.length]);

  const getCategoryCount = (category) => {
    if (category === "All") {
      return MEDIA.length;
    }

    if (category === "Videos") {
      return MEDIA.filter((item) => item.type === "video").length;
    }

    return MEDIA.filter((item) => item.category === category).length;
  };

  const currentLightboxItem =
    lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <main className={styles.page}>
      {/* ───────────────── HERO ───────────────── */}
      <HeroCarousel />

      {/* ───────────────── ARCHIVE ───────────────── */}
      <section className={styles.archiveSection}>
        <div className={styles.container}>
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className={styles.archiveHeading}
          >
            <div className={styles.headingTop}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabelLine} />
                <span>FIELD ARCHIVE / 2024</span>
              </div>

              <span className={styles.archiveStatus}>
                <span />
                ARCHIVE ACTIVE
              </span>
            </div>

            <div className={styles.headingMain}>
              <div>
                <h2 className={styles.archiveTitle}>
                  Pathfinder <em>Gallery</em>
                </h2>

                <p className={styles.archiveDescription}>
                  A visual record of faith, service, adventure, worship and
                  achievement.
                </p>
              </div>

              <ArchiveStats />
            </div>
          </motion.div>

          {/* ───────────────── FILTER ───────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className={styles.filterSection}
          >
            <div className={styles.filterHeader}>
              <span className={styles.filterLabel}>FILTER BY CATEGORY</span>

              <span className={styles.filterResult}>
                {filtered.length} ITEMS
              </span>
            </div>

            <div className={styles.filters}>
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${styles.filterButton} ${
                      active ? styles.filterButtonActive : ""
                    }`}
                  >
                    {category === "Videos" && <PlayIcon />}

                    <span>{category}</span>

                    <span className={styles.filterCount}>
                      {getCategoryCount(category)}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ───────────────── GALLERY ───────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
              className={styles.galleryGrid}
            >
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyNumber}>00</div>

                  <div>
                    <h3>No media found</h3>

                    <p>
                      There are currently no items available in this category.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom archive line */}
          <div className={styles.archiveFooter}>
            <span>END OF ARCHIVE</span>

            <span className={styles.archiveFooterLine} />

            <span>{String(MEDIA.length).padStart(2, "0")} FILES</span>
          </div>
        </div>
      </section>

      {/* ───────────────── LIGHTBOX ───────────────── */}
      <AnimatePresence>
        {currentLightboxItem && (
          <Lightbox
            item={currentLightboxItem}
            index={lightboxIndex}
            total={filtered.length}
            onClose={closeLightbox}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// // ─────────────────────────────────────────────────────────────────────────────
// // DATA
// // ─────────────────────────────────────────────────────────────────────────────

// const MEDIA = [
//   // ── Featured carousel items ─────────────────────────────
//   {
//     id: 1,
//     type: "photo",
//     src: "/pic.jpeg",
//     alt: "Investiture Ceremony 2024",
//     category: "Awards",
//     title: "Investiture Ceremony 2024",
//     caption:
//       "Our Pathfinders received their honours in a proud celebration of faith and achievement.",
//     date: "Nov 2024",
//     featured: true,
//   },
//   {
//     id: 2,
//     type: "photo",
//     src: "/pfA.jpg",
//     alt: "Karura Forest Campout",
//     category: "Outdoor",
//     title: "Karura Forest Campout",
//     caption:
//       "Three days of adventure, campfire cooking, and star-gazing under God's creation.",
//     date: "Aug 2024",
//     featured: true,
//   },
//   {
//     id: 3,
//     type: "photo",
//     src: "/pf staff.jpg",
//     alt: "Community Outreach Day",
//     category: "Outreach",
//     title: "Kamukunji Outreach Day",
//     caption:
//       "Pathfinders served over 200 families during our bi-monthly community outreach.",
//     date: "Sep 2024",
//     featured: true,
//   },

//   // ── Grid items ─────────────────────────────────────────
//   {
//     id: 4,
//     type: "photo",
//     src: "/images/gallery-devotion.jpg",
//     alt: "Opening Devotion",
//     category: "Worship",
//     title: "Saturday Opening Devotion",
//     caption: "Every session begins with prayer and Scripture.",
//     date: "Oct 2024",
//   },
//   {
//     id: 5,
//     type: "photo",
//     src: "/images/gallery-crafts.jpg",
//     alt: "Arts and Crafts",
//     category: "Creative",
//     title: "Arts & Crafts Badge Day",
//     caption: "Creativity as a God-given gift — on full display.",
//     date: "Sep 2024",
//   },
//   {
//     id: 6,
//     type: "video",
//     src: "/images/gallery-video-thumb-1.jpg",
//     videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     alt: "Campfire worship night",
//     category: "Worship",
//     title: "Campfire Worship Night",
//     caption: "An unforgettable evening of praise under the stars.",
//     date: "Aug 2024",
//   },
//   {
//     id: 7,
//     type: "photo",
//     src: "/images/gallery-firstaid.jpg",
//     alt: "First Aid Training",
//     category: "Outdoor",
//     title: "First Aid & Safety Training",
//     caption: "Learning life-saving skills guided by our qualified counsellors.",
//     date: "Jul 2024",
//   },
//   {
//     id: 8,
//     type: "photo",
//     src: "/images/gallery-badges.jpg",
//     alt: "Badge presentation",
//     category: "Awards",
//     title: "Honour Badge Presentations",
//     caption: "Forty-two badges earned this term — a club record!",
//     date: "Oct 2024",
//   },
//   {
//     id: 9,
//     type: "video",
//     src: "/images/gallery-video-thumb-2.jpg",
//     videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     alt: "Pathfinder Parade",
//     category: "Awards",
//     title: "Annual Pathfinder Parade",
//     caption: "Marching proudly through the church grounds on Parade Day.",
//     date: "Nov 2024",
//   },
//   {
//     id: 10,
//     type: "photo",
//     src: "/images/gallery-food-drive.jpg",
//     alt: "Food Drive",
//     category: "Outreach",
//     title: "End-of-Year Food Drive",
//     caption:
//       "Collecting and distributing over 300 food parcels to families in need.",
//     date: "Dec 2024",
//   },
//   {
//     id: 11,
//     type: "photo",
//     src: "/images/gallery-music.jpg",
//     alt: "Music rehearsal",
//     category: "Creative",
//     title: "Choir & Instrument Practice",
//     caption: "Making a joyful noise unto the Lord every Saturday.",
//     date: "Oct 2024",
//   },
//   {
//     id: 12,
//     type: "video",
//     src: "/images/gallery-video-thumb-3.jpg",
//     videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     alt: "Nature walk highlights",
//     category: "Outdoor",
//     title: "Nature Walk Highlights",
//     caption: "Exploring Nairobi's greenery and learning about God's creation.",
//     date: "Jul 2024",
//   },
//   {
//     id: 13,
//     type: "photo",
//     src: "/images/gallery-prayer.jpg",
//     alt: "Prayer circle",
//     category: "Worship",
//     title: "Morning Prayer Circle",
//     caption: "Pathfinders gather in unity before every major event.",
//     date: "Sep 2024",
//   },
//   {
//     id: 14,
//     type: "photo",
//     src: "/images/gallery-painting.jpg",
//     alt: "Painting session",
//     category: "Creative",
//     title: "Watercolour Painting Badge",
//     caption: "Young artists expressing their faith through colour.",
//     date: "Aug 2024",
//   },
//   {
//     id: 15,
//     type: "photo",
//     src: "/images/gallery-hospital.jpg",
//     alt: "Hospital visit",
//     category: "Outreach",
//     title: "Hospital Visitation Ministry",
//     caption:
//       "Bringing cheer and prayer to patients at Kenyatta National Hospital.",
//     date: "Jun 2024",
//   },
// ];

// // ─────────────────────────────────────────────────────────────────────────────
// // CONSTANTS
// // ─────────────────────────────────────────────────────────────────────────────

// const CATEGORIES = [
//   "All",
//   "Worship",
//   "Outdoor",
//   "Outreach",
//   "Creative",
//   "Awards",
//   "Videos",
// ];

// const FEATURED = MEDIA.filter((m) => m.featured);

// // ─────────────────────────────────────────────────────────────────────────────
// // ANIMATION VARIANTS
// // ─────────────────────────────────────────────────────────────────────────────

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// const gridItem = {
//   hidden: { opacity: 0, scale: 0.94 },
//   visible: (i) => ({
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // HERO CAROUSEL
// // ─────────────────────────────────────────────────────────────────────────────

// function HeroCarousel() {
//   const [current, setCurrent] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const timerRef = useRef(null);

//   const go = useCallback((index, dir) => {
//     setDirection(dir);
//     setCurrent((index + FEATURED.length) % FEATURED.length);
//   }, []);

//   const startTimer = useCallback(() => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setCurrent((c) => {
//         setDirection(1);
//         return (c + 1) % FEATURED.length;
//       });
//     }, 5500);
//   }, []);

//   useEffect(() => {
//     startTimer();
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [startTimer]);

//   const slide = FEATURED[current];

//   const slideVariant = {
//     enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
//     center: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//     },
//     exit: (d) => ({
//       opacity: 0,
//       x: d > 0 ? -80 : 80,
//       transition: { duration: 0.4 },
//     }),
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "clamp(420px, 60vh, 620px)",
//         overflow: "hidden",
//         borderRadius: "0 0 28px 28px",
//         background: "#14532d",
//       }}
//     >
//       <AnimatePresence custom={direction} mode="wait">
//         <motion.div
//           key={slide.id}
//           custom={direction}
//           variants={slideVariant}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           style={{ position: "absolute", inset: 0 }}
//         >
//           <Image
//             src={slide.src}
//             alt={slide.alt}
//             fill
//             style={{ objectFit: "cover", objectPosition: "center" }}
//             priority
//             quality={90}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to top, rgba(10,40,15,.9) 0%, rgba(10,40,15,.4) 50%, rgba(0,0,0,.15) 100%)",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: "3px",
//               background: "linear-gradient(90deg,#16a34a,#4ade80,#16a34a)",
//             }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={`caption-${slide.id}`}
//           initial={{ opacity: 0, y: 24 }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             transition: {
//               duration: 0.55,
//               delay: 0.15,
//               ease: [0.22, 1, 0.36, 1],
//             },
//           }}
//           exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             padding: "32px 40px 44px",
//             zIndex: 5,
//           }}
//         >
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "6px",
//               fontSize: "11px",
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontWeight: 600,
//               letterSpacing: ".13em",
//               textTransform: "uppercase",
//               color: "#4ade80",
//               marginBottom: "10px",
//             }}
//           >
//             <span
//               style={{
//                 width: 5,
//                 height: 5,
//                 borderRadius: "50%",
//                 background: "#4ade80",
//               }}
//             />
//             {slide.category} · {slide.date}
//           </span>

//           <h1
//             style={{
//               fontFamily: "'Playfair Display',Georgia,serif",
//               fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
//               fontWeight: 700,
//               color: "#fff",
//               lineHeight: 1.1,
//               letterSpacing: "-0.02em",
//               marginBottom: "10px",
//               textShadow: "0 2px 16px rgba(0,0,0,.3)",
//             }}
//           >
//             {slide.title}
//           </h1>

//           <p
//             style={{
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontSize: "clamp(.88rem,1.5vw,1rem)",
//               color: "rgba(255,255,255,.8)",
//               lineHeight: 1.65,
//               maxWidth: "520px",
//               margin: 0,
//             }}
//           >
//             {slide.caption}
//           </p>
//         </motion.div>
//       </AnimatePresence>

//       {/* Slide counter */}
//       <div
//         style={{
//           position: "absolute",
//           top: 22,
//           left: 26,
//           zIndex: 6,
//           display: "flex",
//           alignItems: "center",
//           gap: 4,
//           background: "rgba(255,255,255,.13)",
//           backdropFilter: "blur(6px)",
//           border: "1px solid rgba(255,255,255,.22)",
//           borderRadius: "999px",
//           padding: "5px 14px",
//           fontFamily: "'Plus Jakarta Sans',sans-serif",
//           fontSize: "12px",
//           fontWeight: 600,
//           color: "#fff",
//           letterSpacing: ".06em",
//         }}
//       >
//         {String(current + 1).padStart(2, "0")}
//         <span style={{ opacity: 0.5, margin: "0 2px" }}>/</span>
//         {String(FEATURED.length).padStart(2, "0")}
//       </div>

//       {/* Prev / Next controls */}
//       {[
//         {
//           label: "Prev",
//           dir: -1,
//           side: "left:16px",
//           points: "15 18 9 12 15 6",
//         },
//         { label: "Next", dir: 1, side: "right:16px", points: "9 6 15 12 9 18" },
//       ].map((btn) => (
//         <button
//           key={btn.label}
//           aria-label={btn.label}
//           onClick={() => {
//             go(current + btn.dir, btn.dir);
//             startTimer();
//           }}
//           style={{
//             position: "absolute",
//             top: "50%",
//             [btn.side.split(":")[0]]: btn.side.split(":")[1],
//             transform: "translateY(-50%)",
//             width: 46,
//             height: 46,
//             borderRadius: "50%",
//             zIndex: 6,
//             background: "rgba(255,255,255,.13)",
//             backdropFilter: "blur(6px)",
//             border: "1px solid rgba(255,255,255,.22)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             transition: "background .2s",
//           }}
//         >
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points={btn.points} />
//           </svg>
//         </button>
//       ))}

//       {/* Line indicators */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           right: 28,
//           zIndex: 6,
//           display: "flex",
//           gap: 6,
//           alignItems: "center",
//         }}
//       >
//         {FEATURED.map((_, i) => (
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
//               background: i === current ? "#4ade80" : "rgba(255,255,255,.3)",
//               cursor: "pointer",
//               transition: "width .35s ease, background .35s ease",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // LIGHTBOX
// // ─────────────────────────────────────────────────────────────────────────────

// function Lightbox({ item, onClose }) {
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handler);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handler);
//       document.body.style.overflow = "";
//     };
//   }, [onClose]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1000,
//         background: "rgba(10,40,15,.95)",
//         backdropFilter: "blur(10px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "24px",
//       }}
//     >
//       <motion.div
//         initial={{ scale: 0.93, opacity: 0 }}
//         animate={{
//           scale: 1,
//           opacity: 1,
//           transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
//         }}
//         exit={{ scale: 0.93, opacity: 0, transition: { duration: 0.2 } }}
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           maxWidth: "860px",
//           background: "#14532d",
//           borderRadius: "24px",
//           overflow: "hidden",
//           border: "1px solid rgba(255,255,255,.12)",
//           boxShadow: "0 32px 80px rgba(0,0,0,.5)",
//         }}
//       >
//         <div
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "clamp(260px,50vh,520px)",
//             background: "#0f3d1e",
//           }}
//         >
//           {item.type === "video" && item.videoSrc ? (
//             <iframe
//               src={item.videoSrc}
//               title={item.title}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{ width: "100%", height: "100%", border: "none" }}
//             />
//           ) : (
//             <Image
//               src={item.src}
//               alt={item.alt}
//               fill
//               style={{ objectFit: "contain" }}
//               quality={90}
//             />
//           )}
//         </div>

//         <div
//           style={{
//             padding: "24px 28px 28px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             gap: 16,
//           }}
//         >
//           <div>
//             <span
//               style={{
//                 display: "inline-flex",
//                 fontSize: "10.5px",
//                 fontFamily: "'Plus Jakarta Sans',sans-serif",
//                 fontWeight: 600,
//                 letterSpacing: ".1em",
//                 textTransform: "uppercase",
//                 background: "#dcfce7",
//                 color: "#15803d",
//                 borderRadius: "999px",
//                 padding: "2px 10px",
//                 marginBottom: "8px",
//               }}
//             >
//               {item.category} · {item.date}
//             </span>
//             <h3
//               style={{
//                 fontFamily: "'Playfair Display',serif",
//                 fontSize: "1.25rem",
//                 fontWeight: 700,
//                 color: "#fff",
//                 marginBottom: "6px",
//               }}
//             >
//               {item.title}
//             </h3>
//             <p
//               style={{
//                 fontFamily: "'Plus Jakarta Sans',sans-serif",
//                 fontSize: ".9rem",
//                 color: "rgba(255,255,255,.7)",
//                 lineHeight: 1.65,
//                 margin: 0,
//               }}
//             >
//               {item.caption}
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             aria-label="Close"
//             style={{
//               width: 38,
//               height: 38,
//               borderRadius: "50%",
//               border: "1px solid rgba(255,255,255,.2)",
//               background: "rgba(255,255,255,.08)",
//               color: "#fff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               flexShrink: 0,
//             }}
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MEDIA CARD
// // ─────────────────────────────────────────────────────────────────────────────

// function MediaCard({ item, index, onClick }) {
//   return (
//     <motion.div
//       custom={index}
//       initial="hidden"
//       animate="visible"
//       variants={gridItem}
//       whileHover={{ y: -5, scale: 1.015 }}
//       transition={{ type: "spring", stiffness: 300, damping: 18 }}
//       onClick={onClick}
//       style={{
//         borderRadius: "16px",
//         overflow: "hidden",
//         cursor: "pointer",
//         background: "#d1fae5",
//         border: "1px solid #d1fae5",
//         position: "relative",
//         aspectRatio: item.type === "video" ? "16/9" : "4/3",
//       }}
//       className="media-card"
//     >
//       <Image
//         src={item.src}
//         alt={item.alt}
//         fill
//         sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
//         style={{ objectFit: "cover" }}
//         quality={80}
//         className="media-card-img"
//       />

//       {item.type === "video" && (
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 2,
//           }}
//         >
//           <div
//             style={{
//               width: 56,
//               height: 56,
//               borderRadius: "50%",
//               background: "rgba(22,163,74,.85)",
//               backdropFilter: "blur(4px)",
//               border: "2px solid rgba(255,255,255,.4)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "transform .2s, background .2s",
//             }}
//             className="play-icon"
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//               <polygon points="5 3 19 12 5 21 5 3" />
//             </svg>
//           </div>
//         </div>
//       )}

//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           zIndex: 3,
//           display: "inline-flex",
//           alignItems: "center",
//           gap: 4,
//           fontSize: "10px",
//           fontFamily: "'Plus Jakarta Sans',sans-serif",
//           fontWeight: 600,
//           letterSpacing: ".08em",
//           textTransform: "uppercase",
//           background: "rgba(255,255,255,.18)",
//           backdropFilter: "blur(6px)",
//           border: "1px solid rgba(255,255,255,.25)",
//           color: "#fff",
//           borderRadius: "999px",
//           padding: "3px 10px",
//           transition: "opacity .3s",
//         }}
//         className="card-badge"
//       >
//         {item.type === "video" ? "▶ Video" : item.category}
//       </div>

//       <div
//         className="card-overlay"
//         style={{
//           position: "absolute",
//           inset: 0,
//           zIndex: 2,
//           background:
//             "linear-gradient(to top, rgba(10,40,15,.88) 0%, rgba(10,40,15,.15) 60%, transparent 100%)",
//           opacity: 0,
//           transition: "opacity .3s",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-end",
//           padding: "14px",
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "2px",
//             background: "linear-gradient(90deg,#16a34a,#4ade80,#16a34a)",
//           }}
//         />
//         <div
//           style={{
//             fontFamily: "'Playfair Display',serif",
//             fontSize: ".95rem",
//             fontWeight: 700,
//             color: "#fff",
//             lineHeight: 1.2,
//             marginBottom: 4,
//           }}
//         >
//           {item.title}
//         </div>
//         <div
//           style={{
//             fontFamily: "'Plus Jakarta Sans',sans-serif",
//             fontSize: ".78rem",
//             color: "rgba(255,255,255,.75)",
//           }}
//         >
//           {item.date}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────────────────────────

// export default function GalleryPage() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [lightboxItem, setLightboxItem] = useState(null);

//   const filtered = MEDIA.filter((item) => {
//     if (activeCategory === "All") return true;
//     if (activeCategory === "Videos") return item.type === "video";
//     return item.category === activeCategory;
//   });

//   return (
//     <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>
//       <HeroCarousel />

//       <div
//         className="container"
//         style={{ maxWidth: "1100px", padding: "56px 24px 96px" }}
//       >
//         {/* Section heading */}
//         <motion.div
//           custom={0}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//           style={{ textAlign: "center", marginBottom: "36px" }}
//         >
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 7,
//               fontSize: "11px",
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontWeight: 600,
//               letterSpacing: ".13em",
//               textTransform: "uppercase",
//               color: "#15803d",
//               background: "#dcfce7",
//               padding: "5px 15px",
//               borderRadius: "999px",
//               marginBottom: "16px",
//             }}
//           >
//             <span
//               style={{
//                 width: 5,
//                 height: 5,
//                 borderRadius: "50%",
//                 background: "#16a34a",
//               }}
//             />
//             Our Memories
//           </span>

//           <h2
//             style={{
//               fontFamily: "'Playfair Display',Georgia,serif",
//               fontSize: "clamp(1.9rem,3.5vw,2.6rem)",
//               fontWeight: 700,
//               color: "#14532d",
//               lineHeight: 1.1,
//               letterSpacing: "-0.02em",
//               marginBottom: "10px",
//             }}
//           >
//             The Full{" "}
//             <em
//               style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}
//             >
//               Gallery
//             </em>
//           </h2>

//           <p
//             style={{
//               fontFamily: "'Plus Jakarta Sans',sans-serif",
//               fontSize: "1rem",
//               color: "#4b7a5c",
//               lineHeight: 1.72,
//               maxWidth: "480px",
//               margin: "0 auto",
//             }}
//           >
//             Browse photos and videos from our camps, worship sessions, outreach
//             days, ceremonies, and creative activities.
//           </p>
//         </motion.div>

//         {/* Filter pills */}
//         <motion.div
//           custom={1}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//           style={{
//             display: "flex",
//             gap: 8,
//             flexWrap: "wrap",
//             justifyContent: "center",
//             marginBottom: "36px",
//           }}
//         >
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               style={{
//                 fontFamily: "'Plus Jakarta Sans',sans-serif",
//                 fontSize: "12.5px",
//                 fontWeight: 600,
//                 padding: "8px 18px",
//                 borderRadius: "999px",
//                 border: "1.5px solid",
//                 borderColor: activeCategory === cat ? "#16a34a" : "#d1fae5",
//                 background:
//                   activeCategory === cat
//                     ? cat === "Videos"
//                       ? "linear-gradient(135deg,#16a34a,#15803d)"
//                       : "#16a34a"
//                     : "transparent",
//                 color: activeCategory === cat ? "#fff" : "#4b7a5c",
//                 cursor: "pointer",
//                 transition: "all .18s ease",
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//               }}
//             >
//               {cat === "Videos" && (
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <polygon points="5 3 19 12 5 21 5 3" />
//                 </svg>
//               )}
//               {cat}
//               <span
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: 18,
//                   height: 18,
//                   borderRadius: "50%",
//                   background:
//                     activeCategory === cat
//                       ? "rgba(255,255,255,.25)"
//                       : "#d1fae5",
//                   color: activeCategory === cat ? "#fff" : "#15803d",
//                   fontSize: "10px",
//                   fontWeight: 700,
//                 }}
//               >
//                 {cat === "All"
//                   ? MEDIA.length
//                   : cat === "Videos"
//                     ? MEDIA.filter((m) => m.type === "video").length
//                     : MEDIA.filter((m) => m.category === cat).length}
//               </span>
//             </button>
//           ))}
//         </motion.div>

//         {/* Media grid */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeCategory}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, transition: { duration: 0.3 } }}
//             exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             className="gallery-page-grid"
//           >
//             {filtered.length > 0 ? (
//               filtered.map((item, i) => (
//                 <MediaCard
//                   key={item.id}
//                   item={item}
//                   index={i}
//                   onClick={() => setLightboxItem(item)}
//                 />
//               ))
//             ) : (
//               <div
//                 style={{
//                   gridColumn: "1/-1",
//                   textAlign: "center",
//                   padding: "60px 0",
//                   fontFamily: "'Plus Jakarta Sans',sans-serif",
//                   fontSize: "1rem",
//                   color: "#4b7a5c",
//                 }}
//               >
//                 No items in this category yet. Check back soon!
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <AnimatePresence>
//         {lightboxItem && (
//           <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
//         )}
//       </AnimatePresence>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

//         .gallery-page-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 16px;
//         }

//         .media-card:hover .media-card-img { transform: scale(1.06); }
//         .media-card-img { transition: transform .45s cubic-bezier(.22,1,.36,1); }

//         .media-card:hover .card-overlay { opacity: 1 !important; }
//         .media-card:hover .card-badge   { opacity: 0; }
//         .media-card:hover .play-icon    { transform: scale(1.12); background: rgba(22,163,74,1) !important; }

//         @media (max-width: 900px) {
//           .gallery-page-grid { grid-template-columns: repeat(2, 1fr); }
//         }

//         @media (max-width: 520px) {
//           .gallery-page-grid { grid-template-columns: 1fr; gap: 12px; }
//         }
//       `}</style>
//     </main>
//   );
// }
