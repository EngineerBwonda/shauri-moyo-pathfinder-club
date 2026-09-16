import Carousel from "../../componentb/carousel";
import Scrollcards from "../../componentb/scrollcard";
import Grid from "../../componentb/grid";
import BottomNav from "../../componentb/bottomnav";

export default function HomePage() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80",
      title: "Welcome to the Platform",
      description: "A modern experience built for every screen size.",
      cta: { label: "Get started", href: "/register" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
      title: "Fast. Simple. Secure.",
      description: "Powered by Next.js and Supabase.",
      cta: { label: "Learn more", href: "/about" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
      title: "Built for Teams",
      description: "Collaborate and ship faster together.",
    },
  ];

  const featured = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      title: "Mountain Escape",
      description: "A serene retreat high above the clouds.",
      price: "$120",
      meta: "/ night",
      badge: "Popular",
      href: "/items/1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      title: "Snowy Peaks",
      description: "Winter wonderland experience.",
      price: "$180",
      meta: "/ night",
      href: "/items/2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
      title: "Coastal View",
      description: "Wake up to the sound of waves.",
      price: "$220",
      meta: "/ night",
      badge: "New",
      href: "/items/3",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
      title: "Forest Cabin",
      description: "Cozy hideaway surrounded by nature.",
      price: "$95",
      meta: "/ night",
      href: "/items/4",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      title: "Lake Reflection",
      description: "Peaceful lakeside stay.",
      price: "$140",
      meta: "/ night",
      href: "/items/5",
    },
  ];

  const items = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      title: "Mountain Escape",
      description: "A serene retreat high above the clouds.",
      price: "$120",
      meta: "/ night",
      badge: "Popular",
      href: "/items/1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      title: "Snowy Peaks",
      description: "Winter wonderland experience.",
      price: "$180",
      meta: "/ night",
      href: "/items/2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
      title: "Coastal View",
      description: "Wake up to the sound of waves.",
      price: "$220",
      meta: "/ night",
      badge: "New",
      href: "/items/3",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
      title: "Forest Cabin",
      description: "Cozy hideaway surrounded by nature.",
      price: "$95",
      meta: "/ night",
      href: "/items/4",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      title: "Lake Reflection",
      description: "Peaceful lakeside stay.",
      price: "$140",
      meta: "/ night",
      href: "/items/5",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      title: "Desert Dunes",
      description: "Golden sands and starlit skies.",
      price: "$160",
      meta: "/ night",
      href: "/items/6",
    },
  ];

  return (
    <>
      <main className="container-fluid py-0 ">
        {/* <h1 className="fw-bold mb-4 text-center">Featured</h1> */}
        <Carousel slides={slides} autoPlay interval={5000} />
      </main>

      <main className="bg-light container accordion py-0">
        <Scrollcards
          title="Featured Stays"
          subtitle="Handpicked places for your next trip"
          seeAllHref="/stays"
          seeAllLabel="See all"
          items={featured}
        />
      </main>

      <main className="bg-light">
        <div className="container py-0">
          <Grid
            title="Featured Stays"
            subtitle="Handpicked places for your next trip"
            seeAllHref="/stays"
            seeAllLabel="See all"
            items={items}
          />
        </div>
      </main>

      <BottomNav />
    </>
  );
}
