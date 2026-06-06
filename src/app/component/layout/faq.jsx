"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data — edit questions and answers here ────────────────────────────────────

const FAQS = [
  // ── Joining
  {
    id: 1,
    category: "Joining",
    question: "How do I enrol my child in the Pathfinder Club?",
    answer:
      "Enrolment is simple. Visit us any Saturday at 3:00 PM at the Shauri Moyo SDA Church Hall, meet the counsellors, and collect a registration form. You can also reach us via WhatsApp or email (see the Contact section below). We welcome new members at the start of each term.",
  },
  {
    id: 2,
    category: "Joining",
    question: "What age group is the Pathfinder Club for?",
    answer:
      "The Pathfinder Club is for boys and girls aged 10 to 15 years. Younger children (ages 6–9) are welcome in our Adventurer Club, and older youth (16+) may join the Master Guide programme. Ask a counsellor for details on both.",
  },
  {
    id: 3,
    category: "Joining",
    question: "Does my child have to be Seventh-day Adventist to join?",
    answer:
      "No — the Pathfinder Club is open to all children regardless of denomination or background. We are a Christ-centred programme and our values are rooted in the Bible, but every child is warmly welcomed. Many of our members have come to faith through the club.",
  },

  // ── Meetings & Schedule
  {
    id: 4,
    category: "Schedule",
    question: "When and where does the club meet?",
    answer:
      "We meet every Saturday from 3:00 PM to 5:00 PM at the Shauri Moyo SDA Church Hall. Special events, campouts, and outreach days are announced at least two weeks in advance through our WhatsApp group and church notice board.",
  },
  {
    id: 5,
    category: "Schedule",
    question: "What happens during a typical Saturday meeting?",
    answer:
      "A typical session begins with an opening ceremony and devotion (3:00–3:20 PM), followed by honour badge work in small units (3:20–4:00 PM), a life skills or outreach activity (4:00–4:30 PM), arts or music time (4:30–5:00 PM), and a closing ceremony with prayer. The full programme schedule is available on the Programme page.",
  },
  {
    id: 6,
    category: "Schedule",
    question: "How often are camping trips and outdoor events?",
    answer:
      "We organise at least one overnight campout per term, usually at a nature site in or around Nairobi. Day hikes and outdoor activities happen more frequently. All outdoor events are supervised by trained counsellors and require a signed parental consent form.",
  },

  // ── Fees & Requirements
  {
    id: 7,
    category: "Fees & Kit",
    question: "Is there a membership fee?",
    answer:
      "There is a small annual registration fee which covers your child's membership card, programme materials, and basic badge supplies. The fee is kept affordable and can be paid in installments. A bursary fund is available for families who need assistance — please speak to the Director in confidence.",
  },
  {
    id: 8,
    category: "Fees & Kit",
    question: "What uniform and equipment does my child need?",
    answer:
      "Every Pathfinder wears the official SDA Pathfinder uniform — a white shirt, navy blue trousers or skirt, a red neckerchief, and the club sash for displaying honour badges. The uniform can be purchased through the church or sourced locally. For camping events, a basic kit list (sleeping bag, torch, water bottle) is shared in advance.",
  },
  {
    id: 9,
    category: "Fees & Kit",
    question: "What are honour badges and how does my child earn them?",
    answer:
      "Honour badges are awards given when a Pathfinder demonstrates proficiency in a skill area — cooking, first aid, nature study, music, craft, and many more. Each badge has specific requirements that are worked on during Saturday sessions and at home. Completed badges are presented at the annual Investiture Ceremony.",
  },

  // ── Parents
  {
    id: 10,
    category: "For Parents",
    question: "How do I stay informed about club activities?",
    answer:
      "We have an active parents' WhatsApp group where all announcements, schedules, and reminders are posted. You can also subscribe to our email newsletter from this website. The club Director is available after every Saturday meeting for a brief chat.",
  },
  {
    id: 11,
    category: "For Parents",
    question: "Can I volunteer or get involved as a parent?",
    answer:
      "Absolutely — parent involvement is warmly encouraged! You can volunteer as a unit helper, join the parents' support committee, offer a skill for a badge session, or assist with logistics on campouts. Speak to the Director on any Saturday to find a role that suits your time and talents.",
  },
  {
    id: 12,
    category: "For Parents",
    question: "What safety measures are in place for children?",
    answer:
      "Child safety is our highest priority. All counsellors hold current safeguarding training and background checks through the SDA Church. Outdoor events are staffed at a minimum 1:6 adult-to-child ratio. A first-aid-trained counsellor is present at every session. Parents receive a safety briefing before the first campout.",
  },
];

// ─── Category filter list ──────────────────────────────────────────────────────

const CATEGORIES = ["All", "Joining", "Schedule", "Fees & Kit", "For Parents"];

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  //   visible: (i: number) => ({
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const answerVariant = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// ─── Single accordion item ─────────────────────────────────────────────────────

function AccordionItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      style={{
        background: "#ffffff",
        border: isOpen ? "1.5px solid #16a34a" : "1px solid #d1fae5",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color .2s",
      }}
    >
      {/* ── Question row (always visible) ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "20px 22px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Left: category dot + question */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            flex: 1,
          }}
        >
          {/* Dot accent */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isOpen ? "#16a34a" : "#bbf7d0",
              flexShrink: 0,
              marginTop: "7px",
              transition: "background .2s",
            }}
          />

          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: isOpen ? "#14532d" : "#1f2937",
              lineHeight: 1.45,
              transition: "color .2s",
            }}
          >
            {faq.question}
          </span>
        </div>

        {/* Right: animated + / × icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isOpen ? "#16a34a" : "#f0fdf4",
            border: isOpen ? "1.5px solid #16a34a" : "1px solid #d1fae5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .2s, border-color .2s",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#ffffff" : "#15803d"}
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      {/* ── Answer (animated expand/collapse) ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            variants={answerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 22px 22px 42px", // left-pad aligns with question text
                borderTop: "1px solid #d1fae5",
                paddingTop: "16px",
              }}
            >
              {/* Category badge */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "10px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#15803d",
                  background: "#dcfce7",
                  borderRadius: "999px",
                  padding: "2px 10px",
                  marginBottom: "10px",
                }}
              >
                {faq.category}
              </span>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".95rem",
                  color: "#4b7a5c",
                  lineHeight: 1.72,
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState(1); // first item open by default

  // Filter FAQs by active category
  const filtered =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "88px 0 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs — matches every other section */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-40px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(21,128,61,.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "860px" }}>
        {/* ── Section heading ── */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "44px" }}
        >
          {/* Eyebrow pill */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "11px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#15803d",
              background: "#dcfce7",
              padding: "5px 15px",
              borderRadius: "999px",
              marginBottom: "18px",
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
            FAQ
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Questions{" "}
            <em
              style={{ fontStyle: "italic", fontWeight: 400, color: "#16a34a" }}
            >
              Answered
            </em>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1rem",
              color: "#4b7a5c",
              lineHeight: 1.72,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Everything you need to know before your child joins — from
            registration and costs to schedules and safety.
          </p>
        </motion.div>

        {/* ── Category filter pills ── */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: "999px",
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "#16a34a" : "#d1fae5",
                background: activeCategory === cat ? "#16a34a" : "transparent",
                color: activeCategory === cat ? "#fff" : "#4b7a5c",
                cursor: "pointer",
                transition: "all .18s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Accordion list ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((faq, i) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
              index={i}
            />
          ))}
        </div>

        {/* ── Still have questions? strip ── */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "48px",
            background: "#f0fdf4",
            border: "1px solid #d1fae5",
            borderRadius: "20px",
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Icon */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "13px",
                background: "#dcfce7",
                border: "1px solid #bbf7d0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#15803d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#14532d",
                  marginBottom: "3px",
                }}
              >
                Still have questions?
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: ".88rem",
                  color: "#4b7a5c",
                }}
              >
                We&apos;re happy to help — reach out via WhatsApp or visit us
                any Saturday.
              </div>
            </div>
          </div>

          {/* Contact buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <motion.a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "11px 22px",
                fontSize: ".9rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {/* WhatsApp icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.306-1.554l-.38-.226-3.94 1.033 1.05-3.834-.248-.395A9.79 9.79 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
              </svg>
              WhatsApp Us
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "transparent",
                color: "#15803d",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "10px 20px",
                fontSize: ".9rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                border: "1.5px solid #bbf7d0",
                whiteSpace: "nowrap",
              }}
            >
              Contact Page
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
          </div>
        </motion.div>

        {/* ── Bottom CTA banner ── */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "32px",
            background: "linear-gradient(135deg, #14532d, #15803d)",
            borderRadius: "22px",
            padding: "36px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "6px",
              }}
            >
              No more questions? Let&apos;s get started.
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: ".93rem",
                color: "#86efac",
                lineHeight: 1.55,
                maxWidth: "380px",
                margin: 0,
              }}
            >
              Registration is open every Saturday. Your child&apos;s Pathfinder
              journey is one step away.
            </p>
          </div>

          <motion.a
            href="/join"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              color: "#15803d",
              textDecoration: "none",
              borderRadius: "999px",
              padding: "13px 26px",
              fontSize: ".95rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Enrol Now
            <svg
              width="15"
              height="15"
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
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}
