"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles/program-cardb.module.css";

const cardData = [
  {
    id: 1,
    title: "Friend Class",
    description:
      "The first step on the Pathfinder journey. Members learn the Pledge & Law, basic nature study, and simple craft honors — building the foundation of faith and friendship.",
    icon: "fa-star",
    image: "/friend.jpeg",
    badge: "Entry Level",
    level: 1,
  },
  {
    id: 2,
    title: "Companion Class",
    description:
      "Pathfinders deepen their Bible knowledge, earn additional honors, and begin structured community service projects alongside their counselors.",
    icon: "fa-hands-helping",
    image: "/companion.jpeg",
    badge: "Level 2",
    level: 2,
  },
  {
    id: 3,
    title: "Explorer Class",
    description:
      "Adventure takes centre stage. Members complete outdoor honors, begin drill training, and are introduced to leadership responsibilities within the unit.",
    icon: "fa-compass",
    image: "/explorer.jpeg",
    badge: "Level 3",
    level: 3,
  },
  {
    id: 4,
    title: "Ranger Class",
    description:
      "Rangers take on more complex honors across health, nature, and crafts. They mentor younger Pathfinders and lead small group devotional sessions.",
    icon: "fa-shield-alt",
    image: "/ranger.jpeg",
    badge: "Level 4",
    level: 4,
  },
  {
    id: 5,
    title: "Voyager Class",
    description:
      "Advanced leadership, missionary projects, and camporee representation. Voyagers demonstrate excellence in drill, honors, and spiritual commitment.",
    icon: "fa-globe-africa",
    image: "/voyager.jpeg",
    badge: "Level 5",
    level: 5,
  },
  {
    id: 6,
    title: "Guide Class",
    description:
      "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
    icon: "fa-crown",
    image: "/guide.jpeg",
    badge: "Highest Level",
    level: 6,
  },
];

const InvestitureProgramCards = () => {
  return (
    <section className={styles.wrapper}>
      {/* Section header with title on left and paragraph on right */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.labelRow}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Investiture Achievement</span>
            <span className={styles.labelLine} />
          </div>
          <h2 className={styles.sectionTitle}>Progressive Levels</h2>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.sectionSub}>
            Every Pathfinder advances through six carefully designed levels —
            each one building deeper faith, skills, and character.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {cardData.map((card) => (
            <div key={card.id} className="col-12 col-md-6 col-lg-4">
              <div className={styles.card}>
                {/* Level indicator strip */}
                <div className={styles.levelStrip}>
                  <span className={styles.levelDots}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < card.level ? styles.dotFilled : styles.dotEmpty
                        }
                      />
                    ))}
                  </span>
                  <span className={styles.levelLabel}>
                    Level {card.level} of 6
                  </span>
                </div>

                {/* Image */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={styles.cardImage}
                    quality={80}
                    priority={card.id <= 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.imageBadge}>
                    <i className={`fas ${card.icon}`} />
                    &nbsp;{card.badge}
                  </span>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>
                    <span className={styles.titleAccent} />
                    {card.title}
                  </h5>
                  <p className={styles.cardText}>{card.description}</p>

                  <div className={styles.cardFooter}>
                    {/* CTA button can be added here if needed */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestitureProgramCards;

// "use client";

// import React from "react";
// import Image from "next/image";
// import styles from "./styles/program-card.module.css";

// const cardData = [
//   {
//     id: 1,
//     title: "Friend Class",
//     description:
//       "The first step on the Pathfinder journey. Members learn the Pledge & Law, basic nature study, and simple craft honors — building the foundation of faith and friendship.",
//     icon: "fa-star",
//     image: "/friend.jpeg",
//     badge: "Entry Level",
//     level: 1,
//   },
//   {
//     id: 2,
//     title: "Companion Class",
//     description:
//       "Pathfinders deepen their Bible knowledge, earn additional honors, and begin structured community service projects alongside their counselors.",
//     icon: "fa-hands-helping",
//     image: "/companion.jpeg",
//     badge: "Level 2",
//     level: 2,
//   },
//   {
//     id: 3,
//     title: "Explorer Class",
//     description:
//       "Adventure takes centre stage. Members complete outdoor honors, begin drill training, and are introduced to leadership responsibilities within the unit.",
//     icon: "fa-compass",
//     image: "/explorer.jpeg",
//     badge: "Level 3",
//     level: 3,
//   },
//   {
//     id: 4,
//     title: "Ranger Class",
//     description:
//       "Rangers take on more complex honors across health, nature, and crafts. They mentor younger Pathfinders and lead small group devotional sessions.",
//     icon: "fa-shield-alt",
//     image: "/ranger.jpeg",
//     badge: "Level 4",
//     level: 4,
//   },
//   {
//     id: 5,
//     title: "Voyager Class",
//     description:
//       "Advanced leadership, missionary projects, and camporee representation. Voyagers demonstrate excellence in drill, honors, and spiritual commitment.",
//     icon: "fa-globe-africa",
//     image: "/voyager.jpeg",
//     badge: "Level 5",
//     level: 5,
//   },
//   {
//     id: 6,
//     title: "Guide Class",
//     description:
//       "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
//     icon: "fa-crown",
//     image: "/guide.jpeg",
//     badge: "Highest Level",
//     level: 6,
//   },
// ];

// const InvestitureProgramCards = () => {
//   return (
//     <section className={styles.wrapper}>
//       {/* Section header */}
//       <div className={styles.sectionHeader}>
//         <div className={styles.labelRow}>
//           <span className={styles.labelLine} />
//           <span className={styles.labelText}>Investiture Achievement</span>
//           <span className={styles.labelLine} />
//         </div>
//         <h2 className={styles.sectionTitle}>Progressive Levels</h2>
//         <p className={styles.sectionSub}>
//           Every Pathfinder advances through six carefully designed levels — each
//           one building deeper faith, skills, and character.
//         </p>
//       </div>

//       <div className="container">
//         <div className="row g-4">
//           {cardData.map((card) => (
//             <div key={card.id} className="col-12 col-md-6 col-lg-4">
//               <div className={styles.card}>
//                 {/* Level indicator strip */}
//                 <div className={styles.levelStrip}>
//                   <span className={styles.levelDots}>
//                     {Array.from({ length: 6 }).map((_, i) => (
//                       <span
//                         key={i}
//                         className={
//                           i < card.level ? styles.dotFilled : styles.dotEmpty
//                         }
//                       />
//                     ))}
//                   </span>
//                   <span className={styles.levelLabel}>
//                     Level {card.level} of 6
//                   </span>
//                 </div>

//                 {/* Image */}
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={card.image}
//                     alt={card.title}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     quality={80}
//                     className={styles.cardImage}
//                     priority={card.id <= 3}
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                   {/* Gold overlay on hover — handled via CSS */}
//                   <div className={styles.imageOverlay} />
//                   {/* Badge floated on image */}
//                   <span className={styles.imageBadge}>
//                     <i className={`fas ${card.icon}`} />
//                     &nbsp;{card.badge}
//                   </span>
//                 </div>

//                 {/* Body */}
//                 <div className={styles.cardBody}>
//                   <h5 className={styles.cardTitle}>
//                     <span className={styles.titleAccent} />
//                     {card.title}
//                   </h5>
//                   <p className={styles.cardText}>{card.description}</p>

//                   <div className={styles.cardFooter}>
//                     {/* <button className={styles.ctaButton}>
//                       Learn More&nbsp;
//                       <i className="fas fa-arrow-right" />
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InvestitureProgramCards;
