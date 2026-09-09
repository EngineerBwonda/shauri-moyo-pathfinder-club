"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles/program-cardb.module.css";

const cardData = [
  {
    id: 1,
    title: "Accounting",
    description:
      "The first step on the Pathfinder journey. Members learn the Pledge & Law, basic nature study, and simple craft honors — building the foundation of faith and friendship.",
    icon: "fa-star",
    image: "/accounting.jpeg",
  },
  {
    id: 2,
    title: "Bible Marking",
    description:
      "Pathfinders deepen their Bible knowledge, earn additional honors, and begin structured community service projects alongside their counselors.",
    icon: "fa-hands-helping",
    image: "/bible-marking.jpeg",
    badge: "Level 2",
    level: 2,
  },
  {
    id: 3,
    title: "Camping Skill",
    description:
      "Adventure takes centre stage. Members complete outdoor honors, begin drill training, and are introduced to leadership responsibilities within the unit.",
    icon: "fa-compass",
    image: "/campingskill 1.jpeg",
    badge: "Level 3",
    level: 3,
  },
  {
    id: 4,
    title: "First Aid",
    description:
      "Rangers take on more complex honors across health, nature, and crafts. They mentor younger Pathfinders and lead small group devotional sessions.",
    icon: "fa-shield-alt",
    image: "/first-aid.jpeg",
    badge: "Level 4",
    level: 4,
  },
  {
    id: 5,
    title: "Reptile Study",
    description:
      "Advanced leadership, missionary projects, and camporee representation. Voyagers demonstrate excellence in drill, honors, and spiritual commitment.",
    icon: "fa-globe-africa",
    image: "/reptiles.jpeg",
    badge: "Level 5",
    level: 5,
  },
  {
    id: 6,
    title: "Sanctuary",
    description:
      "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
    icon: "fa-crown",
    image: "/sanctuary.jpeg",
    badge: "Highest Level",
    level: 6,
  },
  {
    id: 7,
    title: "Seeds",
    description:
      "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
    icon: "fa-crown",
    image: "/seeds.jpeg",
    badge: "Highest Level",
    level: 6,
  },
  {
    id: 8,
    title: "Stewardship",
    description:
      "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
    icon: "fa-crown",
    image: "/stewardship.jpeg",
    badge: "Highest Level",
    level: 6,
  },

  {
    id: 9,
    title: "Swimming",
    description:
      "The pinnacle of the Investiture program. Guides are club ambassadors — completed all honor categories, led major service initiatives, and inspired the next generation.",
    icon: "fa-crown",
    image: "/swimming.jpeg",
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
                {/* <div className={styles.levelStrip}>
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
                </div> */}

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
                  {/* <span className={styles.imageBadge}>
                    <i className={`fas ${card.icon}`} />
                    &nbsp;{card.badge}
                  </span> */}
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
//   {
//     id: 7,
//     title: "Master Guide",
//     description:
//       "Elite leadership training. Master Guides mentor younger Pathfinders, lead camporee events, and serve as role models in faith and service.",
//     icon: "fa-award",
//     image: "/master-guide.jpeg",
//     badge: "Leadership",
//     level: 7,
//   },
//   {
//     id: 8,
//     title: "Pathfinder Drill Team",
//     description:
//       "Precision and discipline. Members master complex drill routines, represent the club in competitions, and develop teamwork and coordination.",
//     icon: "fa-flag",
//     image: "/drill-team.jpeg",
//     badge: "Specialty",
//     level: 8,
//   },
//   {
//     id: 9,
//     title: "Nature Explorer",
//     description:
//       "Deep connection with God's creation. Members study ecosystems, wildlife, and conservation while earning advanced nature honors.",
//     icon: "fa-leaf",
//     image: "/nature-explorer.jpeg",
//     badge: "Specialty",
//     level: 9,
//   },
//   {
//     id: 10,
//     title: "Community Service",
//     description:
//       "Living out the Pathfinder Pledge through action. Members organize and participate in community outreach, disaster response, and mission projects.",
//     icon: "fa-heart",
//     image: "/community-service.jpeg",
//     badge: "Service",
//     level: 10,
//   },
//   {
//     id: 11,
//     title: "Camporee Champion",
//     description:
//       "Excellence in outdoor living. Members master camping skills, survival techniques, and lead their units in camporee competitions.",
//     icon: "fa-campground",
//     image: "/camporee.jpeg",
//     badge: "Outdoor",
//     level: 11,
//   },
//   {
//     id: 12,
//     title: "Pathfinder Ambassador",
//     description:
//       "The highest recognition. Ambassadors represent the club nationally, mentor new Pathfinders, and embody the Pathfinder spirit in all they do.",
//     icon: "fa-trophy",
//     image: "/ambassador.jpeg",
//     badge: "Elite",
//     level: 12,
//   },
// ];

// const InvestitureProgramCards = () => {
//   return (
//     <section className={styles.wrapper}>
//       {/* Section header with title on left and paragraph on right */}
//       <div className={styles.sectionHeader}>
//         <div className={styles.headerLeft}>
//           <div className={styles.labelRow}>
//             <span className={styles.labelLine} />
//             <span className={styles.labelText}>Investiture Achievement</span>
//             <span className={styles.labelLine} />
//           </div>
//           <h2 className={styles.sectionTitle}>Progressive Levels</h2>
//         </div>
//         <div className={styles.headerRight}>
//           <p className={styles.sectionSub}>
//             Every Pathfinder advances through twelve carefully designed levels —
//             each one building deeper faith, skills, and character.
//           </p>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row g-4">
//           {cardData.map((card) => (
//             <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
//               <div className={styles.card}>
//                 {/* Level indicator strip */}
//                 <div className={styles.levelStrip}>
//                   <span className={styles.levelDots}>
//                     {Array.from({ length: 12 }).map((_, i) => (
//                       <span
//                         key={i}
//                         className={
//                           i < card.level ? styles.dotFilled : styles.dotEmpty
//                         }
//                       />
//                     ))}
//                   </span>
//                   <span className={styles.levelLabel}>Level {card.level}</span>
//                 </div>

//                 {/* Image */}
//                 <div className={styles.imageWrapper}>
//                   <Image
//                     src={card.image}
//                     alt={card.title}
//                     fill
//                     className={styles.cardImage}
//                     quality={80}
//                     priority={card.id <= 4}
//                     sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
//                   />
//                   <div className={styles.imageOverlay} />
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
//                     {/* CTA button can be added here if needed */}
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
