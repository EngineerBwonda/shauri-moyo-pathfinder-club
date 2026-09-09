"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Heart,
  Mountain,
  ShieldCheck,
  Star,
  Users,
  Target,
  Trophy,
  Tent,
  HandHeart,
  GraduationCap,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import styles from "./style.module.css";

const stats = [
  { value: "100+", label: "Pathfinders" },
  { value: "6", label: "Class Levels" },
  { value: "20+", label: "Honors" },
  { value: "10+", label: "Activities" },
];

const growthAreas = [
  {
    number: "01",
    icon: <BookOpen size={27} />,
    title: "Spiritual Growth",
    text: "Growing in faith, understanding God's Word and developing a personal relationship with Jesus.",
  },
  {
    number: "02",
    icon: <GraduationCap size={27} />,
    title: "Mental Growth",
    text: "Discovering knowledge, developing practical skills and encouraging curiosity and creativity.",
  },
  {
    number: "03",
    icon: <Mountain size={27} />,
    title: "Physical Growth",
    text: "Taking part in outdoor activities, camping, hiking and experiences that encourage healthy living.",
  },
  {
    number: "04",
    icon: <Users size={27} />,
    title: "Social Growth",
    text: "Building friendships, teamwork, confidence and a spirit of cooperation and service.",
  },
];

const activities = [
  {
    icon: <Tent size={24} />,
    title: "Camping",
    text: "Develop outdoor skills, independence and teamwork through memorable camping experiences.",
  },
  {
    icon: <Compass size={24} />,
    title: "Adventure",
    text: "Explore nature, learn navigation and discover new experiences beyond the classroom.",
  },
  {
    icon: <Award size={24} />,
    title: "Honors",
    text: "Discover interests and develop practical skills through Pathfinder Honors.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Bible Study",
    text: "Study God's Word and discover how biblical principles apply to everyday life.",
  },
  {
    icon: <HandHeart size={24} />,
    title: "Community Service",
    text: "Put faith into action by serving people and contributing to the community.",
  },
  {
    icon: <Trophy size={24} />,
    title: "Leadership",
    text: "Develop responsibility, confidence, communication and leadership through practical experiences.",
  },
];

const classes = [
  {
    name: "Friend",
    description: "Building strong foundations",
  },
  {
    name: "Companion",
    description: "Growing through discovery",
  },
  {
    name: "Explorer",
    description: "Developing knowledge and skills",
  },
  {
    name: "Ranger",
    description: "Learning responsibility and service",
  },
  {
    name: "Voyager",
    description: "Building confidence and leadership",
  },
  {
    name: "Guide",
    description: "Preparing to lead and serve",
  },
];

const values = [
  {
    icon: <Heart size={23} />,
    title: "Faith",
    text: "Keeping Christ at the center of everything we do.",
  },
  {
    icon: <ShieldCheck size={23} />,
    title: "Integrity",
    text: "Doing what is right with honesty and responsibility.",
  },
  {
    icon: <HandHeart size={23} />,
    title: "Service",
    text: "Using our abilities and time to help others.",
  },
  {
    icon: <Users size={23} />,
    title: "Teamwork",
    text: "Learning to work together and respect one another.",
  },
  {
    icon: <Target size={23} />,
    title: "Excellence",
    text: "Giving our best while continuously learning and improving.",
  },
  {
    icon: <Star size={23} />,
    title: "Leadership",
    text: "Leading through example, responsibility and service.",
  },
];

const journey = [
  {
    number: "01",
    title: "Discover",
    text: "Discover your gifts, interests and the purpose God has placed within you.",
  },
  {
    number: "02",
    title: "Learn",
    text: "Develop spiritual knowledge, practical skills and new abilities.",
  },
  {
    number: "03",
    title: "Serve",
    text: "Use what you have learned to serve your church, family and community.",
  },
  {
    number: "04",
    title: "Lead",
    text: "Develop confidence and learn to influence others through positive example.",
  },
  {
    number: "05",
    title: "Grow",
    text: "Continue becoming the person God created you to be.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}

      <section className={styles.hero}>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star size={14} />
            SDA PATHFINDER CLUB
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Growing Young People.
            <span>Building Character.</span>
            <span>Serving With Purpose.</span>
          </motion.h1>

          <motion.p
            className={styles.heroText}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            A community where young people discover faith, develop practical
            skills, build meaningful friendships and learn to serve God and
            others.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Link href="/register" className={styles.primaryButton}>
              Join the Journey
              <ArrowRight size={17} />
            </Link>

            <Link href="/events" className={styles.secondaryButton}>
              Explore Activities
            </Link>
          </motion.div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>SCROLL TO EXPLORE</span>
          <div />
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={styles.stat}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <motion.div
              className={styles.sectionHeading}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.eyebrow}>WHO WE ARE</span>

              <h2>
                More than a club.
                <span>A journey of growth.</span>
              </h2>
            </motion.div>

            <motion.div
              className={styles.aboutText}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p>
                The Pathfinder Club is a youth ministry of the Seventh-day
                Adventist Church dedicated to helping young people grow
                spiritually, mentally, physically and socially.
              </p>

              <p>
                Through Bible study, outdoor activities, practical skills,
                community service, leadership development, honors, camping and
                teamwork, Pathfinders are encouraged to discover their God-given
                abilities and use them to make a positive difference.
              </p>

              <Link href="/contact" className={styles.textLink}>
                Learn more about our club
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}

      <section className={styles.missionSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.missionCard}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.missionIcon}>
              <Target size={29} />
            </div>

            <span className={styles.eyebrow}>OUR MISSION</span>

            <h2>
              To lead young people into a saving relationship with Jesus Christ.
            </h2>

            <p>
              We seek to help every Pathfinder develop character, discover their
              God-given potential and become responsible, capable and
              compassionate members of their communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= GROWTH ================= */}

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>THE PATHFINDER APPROACH</span>

            <h2>Growing in every dimension.</h2>

            <p>
              Pathfinder ministry focuses on developing the whole person through
              faith, knowledge, health and meaningful relationships.
            </p>
          </div>

          <div className={styles.growthGrid}>
            {growthAreas.map((item, index) => (
              <motion.article
                className={styles.growthCard}
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className={styles.cardNumber}>{item.number}</div>

                <div className={styles.cardIcon}>{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}

      <section className={styles.journeySection}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>THE JOURNEY</span>

            <h2>Discover. Learn. Serve. Lead.</h2>

            <p>
              Every Pathfinder is on a journey of discovery, development and
              service.
            </p>
          </div>

          <div className={styles.timeline}>
            {journey.map((item, index) => (
              <motion.div
                className={styles.timelineItem}
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className={styles.timelineNumber}>{item.number}</div>

                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>

                {index !== journey.length - 1 && (
                  <div className={styles.timelineLine} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACTIVITIES ================= */}

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <div>
              <span className={styles.eyebrow}>WHAT WE DO</span>

              <h2>Learn by doing.</h2>
            </div>

            <p>
              Our activities combine faith, adventure, education, service and
              teamwork to create experiences that young people can carry with
              them for life.
            </p>
          </div>

          <div className={styles.activitiesGrid}>
            {activities.map((activity, index) => (
              <motion.article
                className={styles.activityCard}
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.activityIcon}>{activity.icon}</div>

                <h3>{activity.title}</h3>

                <p>{activity.text}</p>

                <ChevronRight size={18} className={styles.activityArrow} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLASSES ================= */}

      <section className={styles.classesSection}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            <div className={styles.classIntro}>
              <span className={styles.eyebrow}>PATHFINDER CLASSES</span>

              <h2>A structured journey for every stage.</h2>

              <p>
                Pathfinder classes provide age-appropriate opportunities for
                learning, character development, practical skills and
                leadership.
              </p>

              <Link href="/classes" className={styles.primaryButtonDark}>
                Explore Classes
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className={styles.classList}>
              {classes.map((item, index) => (
                <motion.div
                  className={styles.classItem}
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  <div className={styles.classIndex}>0{index + 1}</div>

                  <div>
                    <h3>{item.name}</h3>

                    <p>{item.description}</p>
                  </div>

                  <ChevronRight size={17} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>WHAT GUIDES US</span>

            <h2>Values that shape our journey.</h2>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <motion.div
                className={styles.valueCard}
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>

                <div>
                  <h3>{value.title}</h3>

                  <p>{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARENTS ================= */}

      <section className={styles.parentsSection}>
        <div className={styles.container}>
          <div className={styles.parentsCard}>
            <div className={styles.parentsContent}>
              <span className={styles.eyebrow}>FOR PARENTS & GUARDIANS</span>

              <h2>Stay connected to your childs Pathfinder journey.</h2>

              <p>
                Our goal is to work together with parents and guardians to
                create an environment where every Pathfinder can learn, grow,
                serve and thrive.
              </p>

              <div className={styles.parentFeatures}>
                <div>
                  <ShieldCheck size={18} />
                  Safe and supportive environment
                </div>

                <div>
                  <BookOpen size={18} />
                  Spiritual and practical development
                </div>

                <div>
                  <Users size={18} />
                  Strong community and relationships
                </div>

                <div>
                  <Award size={18} />
                  Skills, honors and achievements
                </div>
              </div>
            </div>

            <div className={styles.parentsVisual}>
              <div className={styles.visualCircle}>
                <Heart size={52} />
              </div>

              <span>GROWING TOGETHER</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIGITAL PLATFORM ================= */}

      <section className={styles.platformSection}>
        <div className={styles.container}>
          <div className={styles.platformGrid}>
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.eyebrow}>OUR DIGITAL PLATFORM</span>

              <h2>
                One place for the
                <span>Pathfinder journey.</span>
              </h2>

              <p>
                Our Pathfinder Management System brings club administration,
                communication and Pathfinder development together in one
                connected platform.
              </p>

              <Link href="/dashboard" className={styles.platformButton}>
                Explore the Platform
                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.div
              className={styles.platformDiagram}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.diagramMain}>
                <Star size={19} />
                Pathfinder Journey
              </div>

              <div className={styles.diagramGrid}>
                <div>
                  <Users size={19} />
                  <span>Members</span>
                </div>

                <div>
                  <BookOpen size={19} />
                  <span>Classes</span>
                </div>

                <div>
                  <Award size={19} />
                  <span>Honors</span>
                </div>

                <div>
                  <Trophy size={19} />
                  <span>Progress</span>
                </div>

                <div>
                  <CalendarDays size={19} />
                  <span>Events</span>
                </div>

                <div>
                  <ShieldCheck size={19} />
                  <span>Safety</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaIcon}>
              <Compass size={29} />
            </div>

            <span className={styles.eyebrow}>YOUR JOURNEY STARTS HERE</span>

            <h2>Ready to become part of the Pathfinder family?</h2>

            <p>
              Discover new skills, build lasting friendships, grow in faith and
              find opportunities to serve.
            </p>

            <div className={styles.ctaActions}>
              <Link href="/register" className={styles.primaryButton}>
                Join the Journey
                <ArrowRight size={17} />
              </Link>

              <Link href="/contact" className={styles.ctaTextLink}>
                Contact the Club
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// import Carousel from "../../component/layout/carousel";
// import Carouselb from "../../component/layout/carouselb";

// export default function Aboutme() {
//   return (
//     <>
//       {/* <Carousel
//         images={slides}
//         height="700px"
//         interval={5000}
//         showIndicators
//         showControls
//       /> */}

//       {/* will make the carousel component reusable later  */}

//       <Carouselb />
//     </>
//   );
// }
