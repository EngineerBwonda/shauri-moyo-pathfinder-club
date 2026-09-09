"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles/investure.module.css";

const CommunityService = () => {
  const serviceStats = [
    { number: "600+", label: "Service Hours" },
    { number: "12", label: "Local Projects" },
  ];

  const serviceCards = [
    { icon: "🏥", title: "Hospital Visits" },
    { icon: "📦", title: "Food Drives" },
    { icon: "🧹", title: "Clean-ups" },
    { icon: "🌳", title: "Tree Planting" },
  ];

  const galleryImages = [
    {
      src: "/pfA.jpg",
      alt: "Community service volunteer work",
    },
    {
      src: "/pic.jpeg",
      alt: "Pathfinders helping community",
    },
    {
      src: "/pf staff.jpg",
      alt: "Community outreach program",
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <div className={`row align-items-center g-5 ${styles.row}`}>
          {/* Text Column - Left */}
          <div className={`col-lg-6 ${styles.textColumn}`}>
            <div className={styles.labelRow}>
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Service to Humanity</span>
            </div>
            <h2 className={styles.title}>Outreach</h2>
            <p className={styles.description}>
              &quot;The love of Christ constrains us.&quot; Our outreach
              programme teaches Pathfinders that true leadership is found in
              serving others. We partner with local communities to make a
              tangible difference.
            </p>

            {/* Stats - Vertically below paragraph */}
            {/* <div className={styles.statsRow}>
              {serviceStats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div> */}

            {/* Service Cards Grid - Vertically below stats */}
            <div className={styles.serviceGrid}>
              {serviceCards.map((card, index) => (
                <div
                  key={index}
                  className={`${styles.serviceCard} ${
                    index % 2 !== 0 ? styles.serviceCardOffset : ""
                  }`}
                >
                  <div className={styles.serviceIcon}>{card.icon}</div>
                  <h5 className={styles.serviceTitle}>{card.title}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column - Right */}
          <div className={`col-lg-6 ${styles.imageColumn}`}>
            <div className={styles.imageGrid}>
              {/* Large Top Image */}
              <div className={`${styles.imageCard} ${styles.imageCardLarge}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    width={600}
                    height={500}
                    className={styles.image}
                    priority
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>

              {/* Right Top Image */}
              <div
                className={`${styles.imageCard} ${styles.imageCardRightTop}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    width={400}
                    height={380}
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>

              {/* Right Bottom Image */}
              <div
                className={`${styles.imageCard} ${styles.imageCardRightBottom}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    width={400}
                    height={380}
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityService;

// "use client";

// import React from "react";
// import Image from "next/image";
// import styles from "./styles/investure.module.css";

// const CommunityService = () => {
//   const serviceStats = [
//     { number: "600+", label: "Service Hours" },
//     { number: "12", label: "Local Projects" },
//   ];

//   const serviceCards = [
//     { icon: "🏥", title: "Hospital Visits" },
//     { icon: "📦", title: "Food Drives" },
//     { icon: "🧹", title: "Clean-ups" },
//     { icon: "🌳", title: "Tree Planting" },
//   ];

//   const galleryImages = [
//     {
//       src: "/pfA.jpg",
//       alt: "Community service volunteer work",
//     },
//     {
//       src: "/pic.jpeg",
//       alt: "Pathfinders helping community",
//     },
//     {
//       src: "/pf staff.jpg",
//       alt: "Community outreach program",
//     },
//   ];

//   return (
//     <section className={styles.wrapper}>
//       <div className={`container ${styles.container}`}>
//         <div className={`row align-items-center g-5 ${styles.row}`}>
//           {/* Text Column - Left */}
//           <div className={`col-lg-6 ${styles.textColumn}`}>
//             <div className={styles.labelRow}>
//               <span className={styles.labelLine} />
//               <span className={styles.labelText}>Service to Humanity</span>
//             </div>
//             <h2 className={styles.title}>Outreach</h2>
//             <p className={styles.description}>
//               &quot;The love of Christ constrains us.&quot; Our outreach
//               programme teaches Pathfinders that true leadership is found in
//               serving others. We partner with local communities to make a
//               tangible difference.
//             </p>

//           </div>

//           {/* Image Column - Right */}
//           <div className={`col-lg-6 ${styles.imageColumn}`}>
//             <div className={styles.imageGrid}>
//               {/* Large Top Image */}
//               <div className={`${styles.imageCard} ${styles.imageCardLarge}`}>
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={galleryImages[0].src}
//                     alt={galleryImages[0].alt}
//                     width={600}
//                     height={500}
//                     className={styles.image}
//                     priority
//                   />
//                   <div className={styles.imageOverlay} />
//                 </div>
//               </div>

//               {/* Right Top Image */}
//               <div
//                 className={`${styles.imageCard} ${styles.imageCardRightTop}`}
//               >
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={galleryImages[1].src}
//                     alt={galleryImages[1].alt}
//                     width={400}
//                     height={380}
//                     className={styles.image}
//                   />
//                   <div className={styles.imageOverlay} />
//                 </div>
//               </div>

//               {/* Right Bottom Image */}
//               <div
//                 className={`${styles.imageCard} ${styles.imageCardRightBottom}`}
//               >
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={galleryImages[2].src}
//                     alt={galleryImages[2].alt}
//                     width={400}
//                     height={380}
//                     className={styles.image}
//                   />
//                   <div className={styles.imageOverlay} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommunityService;
