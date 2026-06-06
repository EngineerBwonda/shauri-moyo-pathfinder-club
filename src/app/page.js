import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./component/layout/navbar";
import Carousel from "./component/layout/carousel";
import Intro from "./component/layout/intro";
import MembersSection from "./component/layout/membersection";
import EventsSection from "./component/layout/eventsection";
import ImageCardsSection from "./component/layout/image1section";
import TestimonialsSection from "./component/layout/testimonial";
import Faq from "./component/layout/faq";
import Footer from "./component/layout/footer";
import ImageSectionB from "./component/layout/image2section";

export default function Home() {
  // const heroSlides = [
  //   {
  //     src: "/pfA.jpg",
  //     alt: "School Campus",
  //     title: "Welcome to Our School",
  //     description: "Excellence in Education Since 1995",
  //   },
  //   {
  //     src: "/pf staff.jpg",
  //     alt: "Students Learning",
  //     title: "Empowering Young Minds",
  //   },
  //   {
  //     src: "/pf staff.jpg",
  //     alt: "Modern Facilities",
  //     title: "State-of-the-Art Facilities",
  //   },
  // ];

  const slides = [
    {
      src: "/pfA.jpg",
      alt: "Pathfinders during outdoor activities",
      eyebrow: "SDA Pathfinder Club",
      title: "Faith, Adventure &",
      titleEm: "Fellowship",
      description:
        "Equipping young hearts and minds to serve God and community — one badge, one campfire, one memory at a time.",
      buttonLabel: "Join Us Today",
      buttonHref: "/join",
    },
    {
      src: "/pf staff.jpg",
      alt: "Camping trip",
      eyebrow: "Outdoor Skills",
      title: "Built for the",
      titleEm: "Great Outdoors",
      description:
        "From camping under the stars to mastering first aid — our Pathfinders learn resilience in God's creation.",
      buttonLabel: "Explore Activities",
      buttonHref: "/activities",
    },
    {
      src: "/pf staff.jpg",
      alt: "Bible study session",
      eyebrow: "Spiritual Growth",
      title: "Rooted in the",
      titleEm: "Word of God",
      description:
        "Bible study, devotion, and worship are at the heart of everything we do. Growing closer to God, together.",
      buttonLabel: "Learn More",
      buttonHref: "/about",
    },
  ];
  return (
    <>
      {/* <Navbar /> */}

      {/*
        height     → how tall the carousel is (use "80vh" for a big hero)
        interval   → ms between slides (default 5000)
        showIndicators / showControls → toggle nav elements
      */}
      <Carousel
        images={slides}
        height="800px"
        interval={5000}
        showIndicators
        showControls
      />

      {/* <Carousel
        images={heroSlides}
        interval={4000}
        showIndicators={false}
        showControls={true}
        height="700px"
      /> */}
      <Intro />
      <MembersSection />
      <ImageCardsSection />
      <EventsSection />
      <TestimonialsSection />
      <Faq />
      <ImageSectionB />
      {/* <Footer /> */}
    </>
  );
}
