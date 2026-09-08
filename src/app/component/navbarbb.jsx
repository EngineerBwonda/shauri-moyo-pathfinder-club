"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../layout/";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programme", href: "/programme" },
  { label: "Gallery", href: "/gallery" },
  { label: "Join Us", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  /* ---------------------------------------------
     Detect scrolling
  --------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------
     Prevent background scrolling when menu opens
  --------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ---------------------------------------------
     Close menu with Escape key
  --------------------------------------------- */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ---------------------------------------------
     Close mobile menu
  --------------------------------------------- */
  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ---------------------------------------------
     Check active route
  --------------------------------------------- */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}
      <header
        className={`${styles.navbar} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <div className={styles.navContainer}>

          {/* =================================================
              BRAND
          ================================================= */}
          <Link
            href="/"
            className={styles.brand}
            onClick={closeMenu}
            aria-label="Shauri Moyo Pathfinder Club home"
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/logoC.png"
                alt="Shauri Moyo Pathfinder Club logo"
                width={64}
                height={64}
                className={styles.logo}
                priority
              />
            </div>

            <div className={styles.brandInfo}>
              <span className={styles.brandName}>
                Shauri Moyo
                <span>Pathfinder Club</span>
              </span>

              <span className={styles.tagline}>
                Take the Advent Message
              </span>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}
          <nav
            className={styles.desktopNav}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive(link.href) ? styles.active : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            className={`${styles.menuButton} ${
              menuOpen ? styles.menuButtonActive : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* =================================================
          BACKDROP
      ================================================= */}
      <div
        className={`${styles.backdrop} ${
          menuOpen ? styles.backdropVisible : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}
      <aside
        id="mobile-navigation"
        className={`${styles.mobileDrawer} ${
          menuOpen ? styles.mobileDrawerOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        {/* =================================================
            DRAWER HEADER
        ================================================= */}
        <div className={styles.drawerHeader}>
          <span className={styles.drawerLabel}>
            NAVIGATION
          </span>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="Close navigation"
          >
            <span />
            <span />
          </button>
        </div>

        {/* =================================================
            DRAWER BRAND
        ================================================= */}
        <div className={styles.drawerBrand}>
          <div className={styles.drawerLogo}>
            <Image
              src="/logoC.png"
              alt="Pathfinder Club logo"
              width={82}
              height={82}
            />
          </div>

          <h2>Shauri Moyo</h2>

          <p>Pathfinder Club</p>

          <span>
            Take the Advent Message
          </span>
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}
        <div className={styles.divider} />

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}
        <nav
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                isActive(link.href)
                  ? styles.mobileActive
                  : ""
              }`}
              onClick={closeMenu}
            >
              <span className={styles.mobileNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.mobileLinkText}>
                {link.label}
              </span>

              <span className={styles.arrow}>
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* =================================================
            DRAWER FOOTER
        ================================================= */}
        <div className={styles.drawerFooter}>
          <div>
            <span>SHAURI MOYO</span>
            <span>PATHFINDER CLUB</span>
          </div>

          <span>
            © {new Date().getFullYear()}
          </span>
        </div>
      </aside>
    </>
  );
}