"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/programcamp.module.css";

const CampingOutdoors = () => {
  const features = [
    "Annual 5-day Wilderness Camp",
    "Quarterly Overnight Hikes",
    "Survival Skills Workshops",
    "Nature Conservation Projects",
  ];

  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <div className={`row align-items-center g-5 ${styles.row}`}>
          {/* Text Column - Left */}
          <div className={`col-lg-6 ${styles.textColumn}`}>
            <div className={styles.labelRow}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Camping &amp; Wilderness</span>
            </div>
            <h2 className={styles.title}>Outdoor Adventure</h2>
            <p className={styles.description}>
              Our camping programme is the highlight of the year. Its where
              classroom learning meets the real world. Pathfinders learn
              survival skills, nature stewardship, and build lifelong bonds
              around the campfire.
            </p>
            <ul className={styles.featuresList}>
              {features.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/gallery" className={styles.ctaLink}>
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Image Column - Right */}
          <div className={`col-lg-6 ${styles.imageColumn}`}>
            <div className={styles.imageContainer}>
              <div className={styles.imageBorder} />
              <div className={styles.imageWrapper}>
                <Image
                  src="/pfA.jpg"
                  alt="Camping & Outdoor Adventure"
                  width={600}
                  height={450}
                  className={styles.image}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampingOutdoors;
