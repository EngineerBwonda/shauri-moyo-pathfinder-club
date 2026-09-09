"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./styles/cta.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CTAStrip = () => {
  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className={styles.ctaBox}
        >
          <div className={styles.textContent}>
            <h3 className={styles.title}>Ready to Start the Journey?</h3>
            <p className={styles.description}>
              Join over 120 Pathfinders in a journey of faith, friendship, and
              discovery. Registration is open for the new term.
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Link href="/join" className={styles.ctaButton}>
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
  );
};

export default CTAStrip;
