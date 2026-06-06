"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// (TypeScript types removed — file is plain JSX)

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Shauri Moyo SDA Church",
    sub: "Shauri Moyo, Nairobi, Kenya",
    href: "https://maps.google.com",
    cta: "Get Directions",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.52 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z" />
      </svg>
    ),
    label: "Phone",
    value: "+254 700 000 000",
    sub: "Mon–Sat · 9:00 AM – 6:00 PM",
    href: "tel:+254700000000",
    cta: "Call Now",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "info@shaurimoyopathfinders.org",
    sub: "We reply within 24 hours",
    href: "mailto:info@shaurimoyopathfinders.org",
    cta: "Send Email",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: "Meetings",
    value: "Every Saturday",
    sub: "3:00 PM – 5:00 PM",
    href: "/events",
    cta: "View Events",
  },
];

const REASONS = [
  "Enrol My Child",
  "Volunteer / Counsel",
  "General Enquiry",
  "Event Information",
  "Media / Partnership",
  "Other",
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    color: "#1877f2",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    color: "#e1306c",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254700000000",
    color: "#25d366",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.306-1.554l-.38-.226-3.94 1.033 1.05-3.834-.248-.395A9.79 9.79 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    color: "#ff0000",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="white"
        />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED INPUT STYLE
// ─────────────────────────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: ".95rem",
  color: "#14532d",
  background: "#f0fdf4",
  border: "1.5px solid #d1fae5",
  borderRadius: "12px",
  padding: "13px 16px",
  outline: "none",
  transition: "border-color .18s, box-shadow .18s",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: ".85rem",
  fontWeight: 600,
  color: "#15803d",
  marginBottom: "7px",
  letterSpacing: ".02em",
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <section
      style={{
        background: "#14532d",
        padding: "88px 0 72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,222,128,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -40,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom shimmer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
        }}
      />
      {/* Decorative cross */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 36,
          opacity: 0.14,
          pointerEvents: "none",
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 48 48"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
        >
          <line x1="24" y1="4" x2="24" y2="44" />
          <line x1="4" y1="24" x2="44" y2="24" />
        </svg>
      </div>

      <div
        className="container"
        style={{ maxWidth: "860px", textAlign: "center" }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
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
              color: "#4ade80",
              background: "rgba(74,222,128,.12)",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: 20,
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
            Get in Touch
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(2.2rem,5vw,3.4rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 18,
            textShadow: "0 2px 20px rgba(0,0,0,.25)",
          }}
        >
          We&apos;d Love to{" "}
          <em
            style={{ fontStyle: "italic", fontWeight: 400, color: "#4ade80" }}
          >
            Hear from You
          </em>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "1.05rem",
            color: "rgba(255,255,255,.78)",
            lineHeight: 1.72,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          Whether you want to enrol your child, volunteer with our team, or
          simply learn more about what we do — our door is always open.
        </motion.p>

        {/* Quick-action WhatsApp button */}
        <motion.a
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 28px rgba(37,211,102,.35)",
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#25d366",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "999px",
            padding: "14px 30px",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.306-1.554l-.38-.226-3.94 1.033 1.05-3.834-.248-.395A9.79 9.79 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
          </svg>
          Chat on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT INFO CARDS
// ─────────────────────────────────────────────────────────────────────────────

function InfoCards() {
  return (
    <section style={{ background: "#f2f8f3", padding: "56px 0 0" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="row g-4">
          {CONTACT_INFO.map((info, i) => (
            <div key={info.label} className="col-lg-3 col-md-6 col-12">
              <motion.a
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noreferrer" : undefined}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  border: "1px solid #d1fae5",
                  borderRadius: "20px",
                  padding: "28px 20px 24px",
                  textDecoration: "none",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Corner blob */}
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "#f0fdf4",
                    pointerEvents: "none",
                  }}
                />

                {/* Icon circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: "#dcfce7",
                    border: "1px solid #bbf7d0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#15803d",
                    marginBottom: 16,
                    flexShrink: 0,
                  }}
                >
                  {info.icon}
                </div>

                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#4b7a5c",
                    marginBottom: 6,
                  }}
                >
                  {info.label}
                </span>

                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#14532d",
                    lineHeight: 1.3,
                    marginBottom: 4,
                  }}
                >
                  {info.value}
                </p>

                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".82rem",
                    color: "#4b7a5c",
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  {info.sub}
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".82rem",
                    fontWeight: 600,
                    color: "#15803d",
                    marginTop: "auto",
                  }}
                >
                  {info.cta}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    reason: "",
  });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // Simulate API call — replace with your real form submission logic
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  }

  const focusedBorder = (field) =>
    focusedField === field ? "1.5px solid #16a34a" : "1.5px solid #d1fae5";
  const focusedShadow = (field) =>
    focusedField === field ? "0 0 0 3px rgba(22,163,74,.12)" : "none";

  return (
    <section style={{ background: "#f2f8f3", padding: "64px 0 96px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="row g-5 align-items-start">
          {/* ── LEFT — Form ── */}
          <div className="col-lg-7 col-12">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                background: "#fff",
                border: "1px solid #d1fae5",
                borderRadius: "24px",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
                }}
              />

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
                  marginBottom: 18,
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
                Send us a Message
              </span>

              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
                  fontWeight: 700,
                  color: "#14532d",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  marginBottom: 28,
                }}
              >
                How Can We{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#16a34a",
                  }}
                >
                  Help You?
                </em>
              </h2>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      textAlign: "center",
                      padding: "48px 24px",
                      background: "#f0fdf4",
                      borderRadius: 16,
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#14532d",
                        marginBottom: 10,
                      }}
                    >
                      Message Received!
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontSize: ".97rem",
                        color: "#4b7a5c",
                        lineHeight: 1.65,
                        marginBottom: 24,
                        maxWidth: 380,
                        margin: "0 auto 24px",
                      }}
                    >
                      Thank you, {form.name.split(" ")[0]}! We will get back to
                      you within 24 hours. If your enquiry is urgent, please
                      WhatsApp us directly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      style={{
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontSize: ".9rem",
                        fontWeight: 600,
                        color: "#15803d",
                        background: "transparent",
                        border: "1.5px solid #bbf7d0",
                        borderRadius: "999px",
                        padding: "10px 22px",
                        cursor: "pointer",
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 18,
                      }}
                    >
                      {/* Row 1: Name + Email */}
                      <div className="row g-3">
                        <div className="col-md-6 col-12">
                          <label style={labelStyle} htmlFor="name">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="e.g. Mary Wanjiku"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              ...inputStyle,
                              borderColor: focusedBorder("name").split(" ")[2],
                              boxShadow: focusedShadow("name"),
                            }}
                          />
                        </div>
                        <div className="col-md-6 col-12">
                          <label style={labelStyle} htmlFor="email">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              ...inputStyle,
                              borderColor: focusedBorder("email").split(" ")[2],
                              boxShadow: focusedShadow("email"),
                            }}
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone + Reason */}
                      <div className="row g-3">
                        <div className="col-md-6 col-12">
                          <label style={labelStyle} htmlFor="phone">
                            Phone / WhatsApp
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+254 7XX XXX XXX"
                            value={form.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              ...inputStyle,
                              borderColor: focusedBorder("phone").split(" ")[2],
                              boxShadow: focusedShadow("phone"),
                            }}
                          />
                        </div>
                        <div className="col-md-6 col-12">
                          <label style={labelStyle} htmlFor="reason">
                            Reason for Contact
                          </label>
                          <select
                            id="reason"
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("reason")}
                            onBlur={() => setFocusedField(null)}
                            style={{
                              ...inputStyle,
                              borderColor:
                                focusedBorder("reason").split(" ")[2],
                              boxShadow: focusedShadow("reason"),
                              appearance: "none",
                              cursor: "pointer",
                            }}
                          >
                            <option value="">Select a reason…</option>
                            {REASONS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label style={labelStyle} htmlFor="subject">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Brief subject line"
                          value={form.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            ...inputStyle,
                            borderColor: focusedBorder("subject").split(" ")[2],
                            boxShadow: focusedShadow("subject"),
                          }}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label style={labelStyle} htmlFor="message">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Tell us how we can help you…"
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            ...inputStyle,
                            resize: "vertical",
                            minHeight: 130,
                            borderColor: focusedBorder("message").split(" ")[2],
                            boxShadow: focusedShadow("message"),
                          }}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        onClick={handleSubmit}
                        disabled={status === "sending"}
                        whileHover={{
                          scale: status === "sending" ? 1 : 1.03,
                          boxShadow: "0 8px 24px rgba(21,128,61,.25)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                          background:
                            status === "sending"
                              ? "#4b7a5c"
                              : "linear-gradient(135deg, #16a34a, #15803d)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "999px",
                          padding: "15px 32px",
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          cursor:
                            status === "sending" ? "not-allowed" : "pointer",
                          transition: "background .2s",
                          width: "100%",
                        }}
                      >
                        {status === "sending" ? (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{ animation: "spin 1s linear infinite" }}
                              aria-hidden="true"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                          </>
                        )}
                      </motion.button>

                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: ".8rem",
                          color: "#4b7a5c",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        We respect your privacy. Your information will never be
                        shared with third parties.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── RIGHT — Extra info ── */}
          <div className="col-lg-5 col-12">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Visit us card */}
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#14532d",
                  borderRadius: 20,
                  padding: "28px 26px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(74,222,128,.08)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)",
                  }}
                />

                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  Visit Us in Person
                </h3>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".9rem",
                    color: "#86efac",
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  The warmest welcome awaits you any Saturday afternoon at our
                  church hall. No appointment needed.
                </p>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {[
                    { icon: "📍", label: "Shauri Moyo SDA Church, Nairobi" },
                    { icon: "🕒", label: "Every Saturday · 3:00 PM – 5:00 PM" },
                    {
                      icon: "🚌",
                      label: "Matatu routes: 9, 11, 46 (alighting Shauri Moyo)",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}
                      >
                        {item.icon}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: ".88rem",
                          color: "rgba(255,255,255,.78)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 20,
                    background: "#16a34a",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "999px",
                    padding: "10px 20px",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".88rem",
                    fontWeight: 600,
                  }}
                >
                  Open in Google Maps
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </motion.div>

              {/* Map embed */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #d1fae5",
                  height: 220,
                }}
              >
                {/* Replace src with your real Google Maps embed URL */}
                <iframe
                  title="Shauri Moyo SDA Church location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818748565!2d36.8468!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA1MCc0OC41IkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              {/* Social links */}
              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#fff",
                  border: "1px solid #d1fae5",
                  borderRadius: 20,
                  padding: "22px 22px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#14532d",
                    marginBottom: 14,
                  }}
                >
                  Follow Us
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {SOCIALS.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      whileHover={{ scale: 1.12, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "11px",
                        background: "#f0fdf4",
                        border: "1px solid #d1fae5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: s.color,
                        textDecoration: "none",
                        transition: "background .18s",
                      }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".8rem",
                    color: "#4b7a5c",
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  Stay updated with announcements, photos, and event highlights.
                </p>
              </motion.div>

              {/* Quick FAQ teaser */}
              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #d1fae5",
                  borderRadius: 20,
                  padding: "22px 22px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#14532d",
                    marginBottom: 10,
                  }}
                >
                  Common Questions
                </p>
                {[
                  { q: "When do you meet?", a: "Every Saturday, 3:00–5:00 PM" },
                  { q: "What ages can join?", a: "Children aged 10–15 years" },
                  {
                    q: "Is there a fee?",
                    a: "Yes — small annual registration fee",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    style={{
                      borderBottom: "1px solid #bbf7d0",
                      paddingBottom: 10,
                      marginBottom: 10,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontSize: ".88rem",
                        fontWeight: 600,
                        color: "#14532d",
                        margin: "0 0 2px",
                      }}
                    >
                      {item.q}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        fontSize: ".82rem",
                        color: "#4b7a5c",
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                ))}
                <Link
                  href="/#faq"
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: ".85rem",
                    fontWeight: 600,
                    color: "#15803d",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 4,
                  }}
                >
                  View all FAQs
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM CTA
// ─────────────────────────────────────────────────────────────────────────────

function BottomCTA() {
  return (
    <section style={{ background: "#f2f8f3", padding: "0 0 88px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            background: "linear-gradient(135deg, #14532d, #15803d)",
            borderRadius: 22,
            padding: "44px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Ready to Enrol Your Child?
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: ".95rem",
                color: "#86efac",
                lineHeight: 1.6,
                maxWidth: 400,
                margin: 0,
              }}
            >
              Registration is open. Visit us any Saturday or send us a message
              above and we will guide you through the process.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/join"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  color: "#15803d",
                  textDecoration: "none",
                  borderRadius: "999px",
                  padding: "13px 26px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".95rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Join the Club
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "999px",
                  padding: "12px 22px",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".95rem",
                  fontWeight: 600,
                  border: "1.5px solid rgba(255,255,255,.35)",
                  whiteSpace: "nowrap",
                }}
              >
                Meet Our Team
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main style={{ background: "#f2f8f3", minHeight: "100vh" }}>
      <ContactHero />
      <InfoCards />
      <ContactForm />
      <BottomCTA />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
        input:focus, textarea:focus, select:focus { outline: none; }
        select option { color: #14532d; }
      `}</style>
    </main>
  );
}
