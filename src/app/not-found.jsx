"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Hammer, Compass, Mountain } from "lucide-react";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      {/* Decorative background */}
      <div className={styles.backgroundShapeOne} />
      <div className={styles.backgroundShapeTwo} />

      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>P</div>

          <div className={styles.logoText}>
            <strong>PATHFINDER</strong>
            <span>CLUB MANAGEMENT</span>
          </div>
        </Link>

        {/* Main content */}
        <motion.section
          className={styles.content}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Illustration */}
          <motion.div
            className={styles.illustration}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
          >
            <div className={styles.compassCircle}>
              <Compass className={styles.compass} size={72} strokeWidth={1.4} />

              <span className={styles.number}>404</span>
            </div>

            <div className={styles.toolBadge}>
              <Hammer size={20} />
            </div>
          </motion.div>

          {/* Badge */}
          <div className={styles.badge}>
            <Mountain size={15} />
            Still under development
          </div>

          {/* Heading */}
          <h1>
            This trail is
            <span> still being built.</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Looks like you have discovered a page that has not been completed
            yet. We are working behind the scenes to make this part of the
            Pathfinder experience better.
          </p>

          {/* Friendly message */}
          <div className={styles.messageBox}>
            <div className={styles.messageIcon}>
              <Hammer size={19} />
            </div>

            <div>
              <strong>We are working on it!</strong>

              <p>
                This section of the Pathfinder Management System is currently
                under development. Check back soon.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              <Home size={18} />
              Go to homepage
            </Link>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Go back
            </button>
          </div>

          {/* Footer note */}
          <div className={styles.footerNote}>
            <span className={styles.footerLine} />

            <p>Learn. Serve. Lead. Grow.</p>

            <span className={styles.footerLine} />
          </div>
        </motion.section>
      </div>
    </main>
  );
}
