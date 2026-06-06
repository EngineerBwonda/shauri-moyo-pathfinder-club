"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  // visible: (i: number) => ({
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.28 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cards = [
  {
    icon: "/icons/faith.svg",
    alt: "Faith",
    badge: "Faith",
    title: "Spiritual Growth",
    desc: "Bible study, worship, and devotional life woven into every activity.",
    accent: "#dcfce7",
    dot: "#16a34a",
  },
  {
    icon: "/icons/outdoor.svg",
    alt: "Outdoor",
    badge: "Adventure",
    title: "Outdoor Skills",
    desc: "Camping, nature study, and survival skills that build resilience.",
    accent: "#d1fae5",
    dot: "#059669",
  },
  {
    icon: "/icons/badge.svg",
    alt: "Badge",
    badge: "Achievement",
    title: "Honours & Badges",
    desc: "Earn recognition through dedication, discipline, and discovery.",
    accent: "#ecfdf5",
    dot: "#15803d",
  },
  {
    icon: "/icons/community.svg",
    alt: "Community",
    badge: "Community",
    title: "Service & Mission",
    desc: "Hands-on outreach that puts love for neighbours into action.",
    accent: "#f0fdf4",
    dot: "#166534",
  },
];

const Intro = () => {
  return (
    <section
      style={{
        background: "#f2f8f3",
        padding: "80px 0 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,.09) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(21,128,61,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1140px" }}>
        <div className="row g-5 align-items-center">
          {/* LEFT COLUMN */}
          <div className="col-lg-5">
            <div style={{ paddingRight: "clamp(0px, 3vw, 40px)" }}>
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "12px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    letterSpacing: ".13em",
                    textTransform: "uppercase",
                    color: "#15803d",
                    background: "#dcfce7",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    marginBottom: "22px",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#16a34a",
                    }}
                  />
                  SDA Pathfinder Club
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.6rem, 4.5vw, 3.7rem)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "#14532d",
                  marginBottom: "22px",
                }}
              >
                Serving God, <br />
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Growing Together
                </em>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1.15rem",
                  lineHeight: 1.78,
                  color: "#4b7a5c",
                  marginBottom: "20px",
                  maxWidth: "400px",
                }}
              >
                Shauri Moyo Pathfinder Club is a Christ-centred community
                empowering young people through faith, fellowship, and life
                skills — equipping the next generation to serve.
              </motion.p>

              <motion.blockquote
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "#15803d",
                  borderLeft: "3px solid #86efac",
                  padding: "10px 16px",
                  marginBottom: "36px",
                  background: "#f0fdf4",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                “Train up a child in the way he should go, and when he is old he
                will not depart from it.” — Proverbs 22:6
              </motion.blockquote>

              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 28px rgba(21,128,61,.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "15px 30px",
                    fontSize: "1rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Join the Club
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
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "transparent",
                    color: "#15803d",
                    border: "1.5px solid #86efac",
                    borderRadius: "999px",
                    padding: "14px 24px",
                    fontSize: "1rem",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div
                custom={5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "38px",
                  paddingTop: "30px",
                  borderTop: "1px solid #bbf7d0",
                }}
              >
                <div style={{ display: "flex" }}>
                  {["#bbf7d0", "#a7f3d0", "#6ee7b7", "#34d399"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 33,
                        height: 33,
                        borderRadius: "50%",
                        background: c,
                        border: "2.5px solid #f2f8f3",
                        marginLeft: i > 0 ? "-10px" : 0,
                        position: "relative",
                        zIndex: 4 - i,
                      }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#4b7a5c",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Over{" "}
                  <strong style={{ color: "#14532d" }}>
                    120 active Pathfinders
                  </strong>{" "}
                  growing in faith &amp; service
                </p>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-7">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariant}
                  whileHover={{ y: -7, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    border: "1px solid #d1fae5",
                    padding: "28px 24px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-18px",
                      right: "-18px",
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: card.accent,
                      opacity: 0.9,
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      background: card.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Image
                      src={card.icon}
                      alt={card.alt}
                      width={28}
                      height={28}
                    />
                  </div>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: card.dot,
                      marginBottom: "10px",
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "#15803d",
                      background: "#dcfce7",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      marginBottom: "12px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {card.badge}
                  </span>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#14532d",
                      marginBottom: "8px",
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: ".92rem",
                      lineHeight: 1.65,
                      color: "#6b9e7e",
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
};

export default Intro;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const Intro = () => {
//   return (
//     <div className="container-fluid my-5 py-5">
//       <div className="row g-5 align-items-center">
//         {/* ==================== LEFT COLUMN ==================== */}
//         <div className="col-lg-6">
//           <div className="ps-lg-4">
//             <h1 className="display-3 fw-bold mb-4">
//               Welcome to <span className="text-primary">Shauri Moyo</span>
//             </h1>

//             <p className="lead text-muted mb-5 fs-4">
//               We transform ideas into powerful digital experiences. Innovative
//               solutions that drive growth and success. We transform ideas into
//               powerful digital experiences. Innovative solutions that drive
//               growth and success. We transform ideas into powerful digital
//               experiences. Innovative solutions that drive growth and success.
//             </p>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
//             >
//               Get Started Today
//             </motion.button>
//           </div>
//         </div>

//         {/* ==================== RIGHT COLUMN - Two Cards ==================== */}
//         <div className="col-lg-6">
//           <div className="row g-4">
//             {/* Card 1 */}
//             <div className="col-md-6">
//               <motion.div
//                 whileHover={{ scale: 1.06, y: -10 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                 className="card h-100 border-0 shadow-lg overflow-hidden"
//               >
//                 <div className="card-body text-center p-5">
//                   <div className="mb-4">
//                     <Image
//                       src="/icons/innovation.svg"
//                       alt="Innovation"
//                       width={90}
//                       height={90}
//                       className="mx-auto"
//                     />
//                   </div>
//                   <h4 className="fw-bold mb-3">Digital Innovation</h4>
//                   <p className="text-muted">
//                     Cutting-edge technology solutions tailored for your success.
//                   </p>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="col-md-6">
//               <motion.div
//                 whileHover={{ scale: 1.06, y: -10 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                 className="card h-100 border-0 shadow-lg overflow-hidden"
//               >
//                 <div className="card-body text-center p-5">
//                   <div className="mb-4">
//                     <Image
//                       src="/icons/innovation.svg"
//                       alt="Innovation"
//                       width={90}
//                       height={90}
//                       className="mx-auto"
//                     />
//                   </div>
//                   <h4 className="fw-bold mb-3">Digital Innovation</h4>
//                   <p className="text-muted">
//                     Cutting-edge technology solutions tailored for your success.
//                   </p>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="col-md-6">
//               <motion.div
//                 whileHover={{ scale: 1.06, y: -10 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                 className="card h-100 border-0 shadow-lg overflow-hidden"
//               >
//                 <div className="card-body text-center p-5">
//                   <div className="mb-4">
//                     <Image
//                       src="/icons/innovation.svg"
//                       alt="Innovation"
//                       width={90}
//                       height={90}
//                       className="mx-auto"
//                     />
//                   </div>
//                   <h4 className="fw-bold mb-3">Digital Innovation</h4>
//                   <p className="text-muted">
//                     Cutting-edge technology solutions tailored for your success.
//                   </p>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Card 2 */}
//             <div className="col-md-6">
//               <motion.div
//                 whileHover={{ scale: 1.06, y: -10 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                 className="card h-100 border-0 shadow-lg overflow-hidden"
//               >
//                 <div className="card-body text-center p-5">
//                   <div className="mb-4">
//                     <Image
//                       src="/icons/strategy.svg"
//                       alt="Strategy"
//                       width={90}
//                       height={90}
//                       className="mx-auto"
//                     />
//                   </div>
//                   <h4 className="fw-bold mb-3">Creative Strategy</h4>
//                   <p className="text-muted">
//                     Strategic thinking that turns vision into measurable
//                     results.
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Intro;

// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const Intro = () => {
//   return (
//     <>
//       {/* <motion.div
//         className="intro"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <h1>Welcome to My Portfolio</h1>
//         <p>Discover my projects and skills.</p>
//       </motion.div> */}

//       <div className="container-fluid text-center my-5">
//         <div className="row g-1">
//           <div className="col">
//             <div className="p-3 border bg-light">Column 1</div>
//           </div>
//           <div className="col">
//             <div className="p-3 border bg-light">Column 2</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Intro;
