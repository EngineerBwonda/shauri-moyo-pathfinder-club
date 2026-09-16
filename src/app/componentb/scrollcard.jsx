"use client";

import styles from "../componentb/stylesb/scrollcard.module.css";

export default function ScrollCards({
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = "See all",
  items = [],
}) {
  return (
    <section className={styles.section} aria-label={title || "Card section"}>
      {/* Header */}
      {(title || seeAllHref) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {seeAllHref && (
            <a href={seeAllHref} className={styles.seeAll}>
              {seeAllLabel} →
            </a>
          )}
        </div>
      )}

      {/* Cards */}
      {items.length === 0 ? (
        <p className={styles.empty}>No items to display.</p>
      ) : (
        <div className={styles.scroller}>
          {items.map((item, i) => (
            <a
              key={item.id ?? i}
              href={item.href ?? "#"}
              className={styles.card}
            >
              <div className={styles.cardImageWrap}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || `Card ${i + 1}`}
                    loading="lazy"
                    draggable="false"
                  />
                )}
                {item.badge && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </div>

              <div className={styles.cardBody}>
                {item.title && (
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                )}
                {item.description && (
                  <p className={styles.cardDesc}>{item.description}</p>
                )}

                {(item.price || item.meta) && (
                  <div className={styles.cardMeta}>
                    <span className={styles.price}>{item.price}</span>
                    <span>{item.meta}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
