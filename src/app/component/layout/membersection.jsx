"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  //   visible: (i: number) => ({
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { num: "12+", label: "Years Active" },
  { num: "30+", label: "Honours Earned" },
  { num: "8", label: "Counsellors" },
];

const members = [
  { initials: "AM", name: "Amina M.", bg: "#dcfce7", color: "#14532d" },
  { initials: "JK", name: "Joel K.", bg: "#d1fae5", color: "#15803d" },
  { initials: "SW", name: "Sharon W.", bg: "#ecfdf5", color: "#166534" },
  { initials: "BN", name: "Brian N.", bg: "#f0fdf4", color: "#14532d" },
  { initials: "FO", name: "Faith O.", bg: "#dcfce7", color: "#15803d" },
  { initials: "DM", name: "Daniel M.", bg: "#d1fae5", color: "#14532d" },
  { initials: "GL", name: "Grace L.", bg: "#ecfdf5", color: "#166534" },
  { initials: "PO", name: "Peter O.", bg: "#f0fdf4", color: "#15803d" },
  { initials: "RW", name: "Rose W.", bg: "#dcfce7", color: "#14532d" },
  { initials: "CM", name: "Calvin M.", bg: "#d1fae5", color: "#15803d" },
];

const MembersSection = () => {
  return (
    <section
      style={{
        background: "#fff",
        padding: "88px 0 104px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          //background: "linear-gradient(90deg, #16a34a, #15803d, #166534)",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* ── HEADING ── */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          {/* <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "11.5px",
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
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#16a34a",
              }}
            />
            Our Community
          </span> */}

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#14532d",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Meet the{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>
              Heart of Our Club
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "1.08rem",
              color: "#4b7a5c",
              lineHeight: 1.72,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            From eager Busy Bees to dedicated Master Guides — our Pathfinders
            are a family bound by faith, adventure, and a calling to serve.
          </p>
        </motion.div>

        {/* ── MAIN LAYOUT ── */}
        <div className="row g-4 align-items-start">
          {/* LEFT — Photo grid */}
          <div className="col-lg-6">
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto auto",
                gap: "14px",
              }}
            >
              {/* Main large photo */}
              <div
                style={{
                  gridColumn: "1/2",
                  gridRow: "1/3",
                  borderRadius: "22px",
                  overflow: "hidden",
                  position: "relative",
                  minHeight: "380px",
                }}
              >
                <Image
                  src="/pfA.jpg"
                  alt="Pathfinder group"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                  style={{ objectFit: "cover" }}
                />
                {/* Floating badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#14532d",
                        lineHeight: 1,
                      }}
                    >
                      120+
                    </div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        color: "#4b7a5c",
                        fontWeight: 500,
                        lineHeight: 1.3,
                        marginTop: "3px",
                      }}
                    >
                      Active
                      <br />
                      Pathfinders
                    </div>
                  </div>
                </div>
              </div>

              {/* Small photo — camping */}
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  minHeight: "175px",
                }}
              >
                <Image
                  src="/pf staff.jpg"
                  alt="Camping activity"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Small photo — bible study */}
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  minHeight: "175px",
                }}
              >
                <Image
                  src="/pic.jpeg"
                  alt="Bible study"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Info cards */}
          <div className="col-lg-6">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                paddingTop: "4px",
              }}
            >
              {/* Who We Are */}
              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #d1fae5",
                  borderRadius: "18px",
                  padding: "24px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "11px",
                      background: "#dcfce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#14532d",
                      margin: 0,
                    }}
                  >
                    Who We Are
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: ".95rem",
                    color: "#4b7a5c",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  The Shauri Moyo SDA Pathfinder Club is a ministry of the
                  Seventh-day Adventist Church for boys and girls aged 10–15. We
                  develop the whole child — spiritually, mentally, physically,
                  and socially — through structured programmes, crafts, and
                  community outreach.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                {stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "14px",
                      padding: "18px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "#15803d",
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "#4b7a5c",
                        marginTop: "5px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Testimonial */}
              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  background: "#14532d",
                  borderRadius: "18px",
                  padding: "26px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "14px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "90px",
                    color: "#16a34a",
                    opacity: 0.22,
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  “
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    color: "#dcfce7",
                    lineHeight: 1.65,
                    marginBottom: "16px",
                  }}
                >
                  Being a Pathfinder shaped my character and deepened my faith
                  in ways I never expected. It truly changed my life.
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    JM
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: ".88rem",
                        fontWeight: 600,
                        color: "#86efac",
                      }}
                    >
                      James Mwangi
                    </div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: ".8rem",
                        color: "#6ee7b7",
                      }}
                    >
                      Former Pathfinder · Now Master Guide
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── MEMBERS STRIP ── */}
        {/* <motion.div
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "56px",
            borderTop: "1px solid #d1fae5",
            paddingTop: "44px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "11.5px",
              fontWeight: 600,
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "#4b7a5c",
              marginBottom: "24px",
            }}
          >
            Some of Our Pathfinders
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            {members.map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    background: m.bg,
                    border: "2px solid #bbf7d0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: m.color,
                    margin: "0 auto 7px",
                  }}
                >
                  {m.initials}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "11px",
                    color: "#4b7a5c",
                    fontWeight: 500,
                    maxWidth: "62px",
                    lineHeight: 1.3,
                  }}
                >
                  {m.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* ── CTA BANNER ── */}
        <motion.div
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: "56px",
            background: "linear-gradient(135deg, #14532d, #15803d)",
            borderRadius: "22px",
            padding: "44px 40px",
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
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              Ready to Join the Family?
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "1rem",
                color: "#86efac",
                lineHeight: 1.55,
                maxWidth: "380px",
                margin: 0,
              }}
            >
              Registration is open. Come as you are — and grow into who God made
              you to be.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(0,0,0,.2)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#fff",
              color: "#15803d",
              border: "none",
              borderRadius: "999px",
              padding: "15px 30px",
              fontSize: "1rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Register Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
};

export default MembersSection;
