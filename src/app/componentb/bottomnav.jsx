"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./stylesb/bottomnav.module.css";

/* ---------- Inline SVG icons (no dependencies) ---------- */

function HomeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function ProfileIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/* ---------- Nav items ---------- */
const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
  { href: "/search", label: "Search", Icon: SearchIcon, center: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.wrapper} aria-label="Bottom navigation">
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ href, label, Icon, center }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.item} ${
                  isActive ? styles.itemActive : ""
                } ${center ? styles.itemCenter : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className={styles.icon} />
                <span className={styles.label}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
