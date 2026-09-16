"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./stylesb/carousel.module.css";

export default function Carousel({
  slides = [],
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setCurrent((index + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, isPaused, interval, next, total]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch handlers (mobile swipe)
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50; // px

    if (delta > threshold) next(); // swipe left → next
    if (delta < -threshold) prev(); // swipe right → prev
  };

  if (total === 0) {
    return <div className={styles.empty}>No slides to display.</div>;
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      {/* Slides */}
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className={styles.slide} aria-hidden={i !== current}>
              <img
                src={slide.image}
                alt={slide.title || `Slide ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable="false"
              />

              {(slide.title || slide.description) && (
                <div className={styles.caption}>
                  {slide.title && <h3>{slide.title}</h3>}
                  {slide.description && <p>{slide.description}</p>}
                  {slide.cta && (
                    <a href={slide.cta.href} className={styles.cta}>
                      {slide.cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${
                i === current ? styles.dotActive : ""
              }`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      )}
    </div>
  );
}
