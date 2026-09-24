import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Baby,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Truck,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CanvasFrameScrubber } from "@/components/CanvasFrameScrubber";
import { HeritageThreadOverlay } from "@/components/HeritageThreadOverlay";
import { Preloader } from "@/components/Preloader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poshakh Fabrics — 33 Years of Indian Textile Craftsmanship · Est. 1992" },
      {
        name: "description",
        content:
          "Founded in 1992 on F.C. Road in Pune. Experience Poshakh's 3D cinematic world of Pichwai prints, hand-drawn Kalamkari, Vanaspati plant dyes, and modern Indian silhouettes.",
      },
      { property: "og:title", content: "Poshakh Fabrics — The Art of Indian Textiles (Est. 1992)" },
      {
        property: "og:description",
        content:
          "33 years of fabric mastery from F.C. Road, Pune to the world. Explore handwoven zari, Pichwai lotus prints, and custom-tailored ready-to-wear.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/media/photos/poshakh-editorial-lotus.jpg" },
      { property: "og:site_name", content: "Poshakh Fabrics" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PoshakhLanding,
});

const SHOP_URL = "https://poshakhfabrics.com/";


const STORE_INFO = {
  name: "Poshakh Fabrics",
  established: 1992,
  founder: "Kavita & Rahul Awasthee",
  address: "1145, Sadashiv Apartments, F.C. Road, Shivaji Nagar, Pune, Maharashtra 411016, India",
  shortAddress: "1145, Sadashiv Apts, F.C. Road, Shivaji Nagar, Pune 411016",
  hours: "Monday to Friday · 9:00 AM – 5:00 PM IST",
  phone: "+91 90967 25484",
  phoneRaw: "9096725484",
  email: "kavita@poshakhfabrics.com",
  emailSupport: "contact@poshakhfabrics.com",
  instagramHandle: "@poshakhfabrics",
  instagramUrl: "https://www.instagram.com/poshakhfabrics/",
  mapsUrl: "https://maps.google.com/?q=1145+Sadashiv+Apartments+FC+Road+Shivaji+Nagar+Pune+411016",
  whatsappUrl:
    "https://wa.me/919096725484?text=Hello%20Poshakh%20team%2C%20I'm%20visiting%20your%20website%20and%20would%20love%20some%20help%20with%20sizing%20and%20fabrics.",
};

interface InstagramPost {
  id: string;
  url: string;
  image: string;
  badge: string;
  caption: string;
  views: string;
}

const LATEST_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "DZVexQhE84t",
    url: "https://www.instagram.com/p/DZVexQhE84t/",
    image: "/media/instagram/latest_post_1.jpg",
    badge: "New Season Drop",
    caption: "The top everyone will be asking you about this season. From morning meetings to sunset dinners.",
    views: "24.8k",
  },
  {
    id: "DaMrPm2F8Sl",
    url: "https://www.instagram.com/p/DaMrPm2F8Sl/",
    image: "/media/instagram/latest_post_2.jpg",
    badge: "Block-Print Cami",
    caption: "Our breezy, block-print Cami Strap Top. Traditional motifs & stunning criss-cross back.",
    views: "18.5k",
  },
  {
    id: "DdRluDUFyAU",
    url: "https://www.instagram.com/p/DdRluDUFyAU/",
    image: "/media/instagram/latest_post_3.jpg",
    badge: "Heritage Bestseller",
    caption: "Our undisputed #1 best seller is flying out the door! Shipped over 150 of these heritage tops.",
    views: "32.1k",
  },
];

const GOOGLE_REVIEWS = [
  {
    id: "g-rev-1",
    author: "Radhika Apte-Kulkarni",
    role: "Local Guide · 42 reviews",
    location: "Pune, Maharashtra",
    date: "2 months ago",
    rating: 5,
    tag: "Pichwai Lotus Tunic",
    verifiedGoogle: true,
    initials: "RA",
    quote:
      "Poshakh on FC Road has been my family's sacred stop for pure handlooms for over 20 years. Kavita ji's aesthetic sense with natural dyes and artisan cotton is unparalleled in Pune. The drape and fit of their Pichwai tunic is pure perfection.",
  },
  {
    id: "g-rev-2",
    author: "Snehal Joshi",
    role: "Verified Google Review",
    location: "FC Road Regular · Pune",
    date: "3 weeks ago",
    rating: 5,
    tag: "Sage Keyhole Top & Fit Margin",
    verifiedGoogle: true,
    initials: "SJ",
    quote:
      "Best boutique on FC Road. I was pleasantly surprised when their stylist called to confirm my bust and waist measurements before dispatching. That 1-inch inner seam margin is an absolute lifesaver for alterations!",
  },
  {
    id: "g-rev-3",
    author: "Dr. Meenakshi Sundaram",
    role: "Local Guide · 18 reviews",
    location: "Bengaluru / Pune Visitor",
    date: "1 month ago",
    rating: 5,
    tag: "Vanaspati Plant-Dye Kurti",
    verifiedGoogle: true,
    initials: "MS",
    quote:
      "Stepping into their Sadashiv Apartments studio feels more like an art exhibition than an ordinary boutique. Got a plant-dyed Vanaspati kurti; the cotton breathes so effortlessly in hot afternoon weather. Pure generational craft.",
  },
  {
    id: "g-rev-4",
    author: "Pooja Deshpande",
    role: "Verified Google Review",
    location: "Pune, Maharashtra",
    date: "4 months ago",
    rating: 5,
    tag: "Maternity Concealed Zips Kurta",
    verifiedGoogle: true,
    initials: "PD",
    quote:
      "I bought their nursing-friendly maternity kurta with concealed zippers. Honestly, nobody could even tell there were bilateral zippers hidden beneath the pleats! The most comfortable and modest postpartum outfit I own.",
  },
  {
    id: "g-rev-5",
    author: "Aarti Mehta",
    role: "Verified Google Review",
    location: "Mumbai, Maharashtra",
    date: "2 months ago",
    rating: 5,
    tag: "OG Black Ajrakh Silhouette",
    verifiedGoogle: true,
    initials: "AM",
    quote:
      "Ordered online from Mumbai. Was skeptical about online sizing, but their GoKwik checkout was super fast and delivery arrived in 48 hours. Genuine Ajrakh hand-block craft with rich natural botanical dyes.",
  },
  {
    id: "g-rev-6",
    author: "Kavita R. Nair",
    role: "Local Guide · 64 reviews",
    location: "Pune, Maharashtra",
    date: "5 months ago",
    rating: 5,
    tag: "Bespoke Fitting & Tailoring",
    verifiedGoogle: true,
    initials: "KN",
    quote:
      "One of the few authentic designer studios left in Pune that treats natural textiles with dignity. Rahul and Kavita understand tailoring for all body types without judgment. Truly inclusive sizing and courteous staff.",
  },
  {
    id: "g-rev-7",
    author: "Tanvi Chitale",
    role: "Verified Google Review",
    location: "Shivaji Nagar, Pune",
    date: "3 months ago",
    rating: 5,
    tag: "Halter Kalamkari Tunic",
    verifiedGoogle: true,
    initials: "TC",
    quote:
      "Their halter neck Kalamkari top is a complete head-turner! I paired it with wide-leg white trousers for an evening cocktail and received compliments all night. Modern cuts rooted in deep Indian heritage.",
  },
  {
    id: "g-rev-8",
    author: "Ritu Ganguly",
    role: "Verified Google Review",
    location: "New Delhi",
    date: "1 month ago",
    rating: 5,
    tag: "Indigo Botanical Wash Top",
    verifiedGoogle: true,
    initials: "RG",
    quote:
      "The handloom cotton feels like butter against the skin. Wash after wash, the indigo vegetable dye holds its rich, royal character without fading. Will definitely be a repeat patron.",
  },
  {
    id: "g-rev-9",
    author: "Manasi Patwardhan",
    role: "Local Guide · 29 reviews",
    location: "Pune, Maharashtra",
    date: "6 months ago",
    rating: 5,
    tag: "20+ Year Family Patron",
    verifiedGoogle: true,
    initials: "MP",
    quote:
      "Been visiting their Sadashiv Apartments boutique since my Fergusson college days. Over two decades later, the warmth of the staff and uncompromised quality of fabrics remain exactly as wonderful as day one.",
  },
  {
    id: "g-rev-10",
    author: "Swati Soni",
    role: "Verified Google Review",
    location: "Hyderabad, Telangana",
    date: "2 months ago",
    rating: 5,
    tag: "Doorstep Exchange & Concierge",
    verifiedGoogle: true,
    initials: "SS",
    quote:
      "The doorstep exchange service was so smooth when I wanted to change the sleeve fit. Customer care on WhatsApp resolved it within minutes. Extraordinary after-sales service for an online purchase.",
  },
] as const;

const PICHWAI_FITS = [
  {
    id: "sage-petal",
    tabLabel: "01 / Sage Petal Side-Tie",
    title: "The Poshakh Sage Petal Side-Tie Top",
    price: "Rs. 1,624.00",
    mrp: "Rs. 2,499.00",
    discount: "35% OFF",
    silhouette: "Square Cut · Adjustable Side-Tie Bows · Flared Hip Silhouette",
    printMotif: "Delicate Repeating Botanical Petal Motif on Muted Sage Base",
    stylingTip: "Cinch the waist bows for a snatched look with relaxed light-wash denim, or wear it loose for a breezy, effortless Indo-Western silhouette.",
    image: "/media/photos/products/sage-petal_1.jpg",
    images: [
      "/media/photos/products/sage-petal_1.jpg",
      "/media/photos/products/sage-petal_2.jpg",
      "/media/photos/products/sage-petal_3.jpg",
      "/media/photos/products/sage-petal_4.jpg",
      "/media/photos/products/sage-petal_5.jpg",
      "/media/photos/products/sage-petal_6.jpg",
      "/media/photos/products/sage-petal_7.jpg",
      "/media/photos/products/sage-petal_8.jpg",
    ],
    tags: ["100% High-Density Cotton", "Adjustable Side-Tie Bows", "Breathable Day-to-Night"],
    url: "https://poshakhfabrics.com/products/the-poshakh-sage-petal-side-tie-top",
  },
  {
    id: "wrap-around-pichwai",
    tabLabel: "02 / Wrap Kurti Dress",
    title: "Wrap Around Kurti Dress — Peacock Elephant Pichwai",
    price: "Rs. 1,850.00",
    mrp: "Rs. 3,699.00",
    discount: "50% OFF",
    silhouette: "Architectural Crossover V-Neck · Functional Side-Tie Knot · A-Line Hem",
    printMotif: "Regal Peacock & Elephant Pichwai Temple Motifs in Indigo, Ochre & Cream",
    stylingTip: "Flaunt solo as a waist-sculpting mini dress for casual weekend outings, or layer over straight pants as a striking asymmetrical fusion kurti.",
    image: "/media/photos/products/wrap-around-pichwai_1.jpg",
    images: [
      "/media/photos/products/wrap-around-pichwai_1.jpg",
      "/media/photos/products/wrap-around-pichwai_2.jpg",
      "/media/photos/products/wrap-around-pichwai_3.jpg",
      "/media/photos/products/wrap-around-pichwai_4.jpg",
      "/media/photos/products/wrap-around-pichwai_5.jpg",
      "/media/photos/products/wrap-around-pichwai_6.jpg",
      "/media/photos/products/wrap-around-pichwai_7.jpg",
      "/media/photos/products/wrap-around-pichwai_8.jpg",
    ],
    tags: ["100% Structured Long-Staple Cotton", "Functional Crossover Wrap", "Temple Heritage Motif"],
    url: "https://poshakhfabrics.com/products/wrap-around-kurti-dress-peacock-elephant-pichwai",
  },
  {
    id: "halter-kalamkari",
    tabLabel: "03 / Halter Neck Kurti",
    title: "Halter Neck Kurti — Kalamkari Folk Art",
    price: "Rs. 1,379.00",
    mrp: "Rs. 2,299.00",
    discount: "40% OFF",
    silhouette: "Sleek Halter Neckline · Open Back Tie · Flowing Side Slits",
    printMotif: "Folk Art Kalamkari Print in Deep Blue, Madder Red & Ochre on Rich Maroon",
    stylingTip: "Pair with ivory wide-leg palazzo pants or tailored cycling shorts and architectural ear cuffs for effortless day-to-night styling.",
    image: "/media/photos/products/halter-kalamkari_1.jpg",
    images: [
      "/media/photos/products/halter-kalamkari_1.jpg",
      "/media/photos/products/halter-kalamkari_2.jpg",
      "/media/photos/products/halter-kalamkari_3.jpg",
      "/media/photos/products/halter-kalamkari_4.jpg",
      "/media/photos/products/halter-kalamkari_5.jpg",
      "/media/photos/products/halter-kalamkari_6.jpg",
      "/media/photos/products/halter-kalamkari_7.jpg",
      "/media/photos/products/halter-kalamkari_8.jpg",
      "/media/photos/products/halter-kalamkari_9.jpg",
      "/media/photos/products/halter-kalamkari_10.jpg",
      "/media/photos/products/halter-kalamkari_11.jpg",
      "/media/photos/products/halter-kalamkari_12.jpg",
      "/media/photos/products/halter-kalamkari_13.jpg",
      "/media/photos/products/halter-kalamkari_14.jpg",
    ],
    tags: ["Rich Maroon Cotton Blend", "Sleeveless Halter Comfort", "Folk Art Kalamkari"],
    url: "https://poshakhfabrics.com/products/halter-neck-kurti",
  },
] as const;

const PICHWAI_MOTIFS = [
  {
    badge: "01 / FLORAL GEOMETRY",
    icon: "🪷",
    title: "The Shrinathji Lotus",
    hook: "Sacred symmetry engineered into modern cutout tops.",
    desc: "The sacred thousand-petal lotus (Kamal) of Nathdwara scaled as focal motifs along keyhole necklines and flared peplum hemlines.",
    clothingDetail: "Placement printed on high collars & side hems",
  },
  {
    badge: "02 / POP MINIATURE",
    icon: "🐄",
    title: "The Sacred Kamadhenu",
    hook: "17th-century temple iconography meets modern street fits.",
    desc: "Delicate temple cows and dancing peacocks hand-printed across breathable cotton tunics, transforming ancient miniatures into contemporary everyday art.",
    clothingDetail: "All-over repeat on Sage Green & Terracotta tunics",
  },
  {
    badge: "03 / BOTANICAL INK",
    icon: "🌿",
    title: "Vanaspati Plant Chemistry",
    hook: "Zero harsh synthetics. 100% skin-kind dyes.",
    desc: "Cold-fermented indigo leaf, madder root, and wild pomegranate rinds. Colors that breathe with your body in summer heat and age with vintage character.",
    clothingDetail: "Skin-safe botanical dye wash across all cotton weaves",
  },
  {
    badge: "04 / FIT INNOVATION",
    icon: "✂️",
    title: "The 1-Inch Margin Flex",
    hook: "Bespoke flexibility inside ready-to-wear silhouettes.",
    desc: "Every Poshakh top features a hidden 1-inch inner seam allowance on both sides. Gain or lose weight without retiring your favorite piece—tailor it with ease.",
    clothingDetail: "Engineered into side seams of every top & tunic",
  },
];

function AmbientFilm({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  return (
    <video
      className={`film ${className}`}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function PoshakhLanding() {
  const pageRef = useRef<HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePichwaiFit, setActivePichwaiFit] = useState<string>("sage-petal");
  const [activeDyeFibre, setActiveDyeFibre] = useState<"indigo" | "madder" | "turmeric">("indigo");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [googleReviewIndex, setGoogleReviewIndex] = useState(0);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>(LATEST_INSTAGRAM_POSTS);
  const [activeProductImageIndex, setActiveProductImageIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const toggleIntroVideoMute = () => {
    if (introVideoRef.current) {
      introVideoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleIntroVideoPlay = () => {
    if (introVideoRef.current) {
      if (isVideoPlaying) {
        introVideoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        introVideoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const currentReview = GOOGLE_REVIEWS[googleReviewIndex];
  const nextReview = () => setGoogleReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  const prevReview = () => setGoogleReviewIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);

  const currentFit = PICHWAI_FITS.find((f) => f.id === activePichwaiFit) ?? PICHWAI_FITS[0];

  useEffect(() => {
    // Dynamic auto-fetch for latest 3 Instagram posts from Poshakh profile
    fetch("/media/instagram/posts.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: unknown) => {
        if (Array.isArray(data) && data.length >= 3) {
          const formatted: InstagramPost[] = data.slice(0, 3).map((item: Record<string, string>, idx: number) => ({
            id: item.id || `post-${idx}`,
            url: item.url || STORE_INFO.instagramUrl,
            image: item.image || LATEST_INSTAGRAM_POSTS[idx].image,
            badge: LATEST_INSTAGRAM_POSTS[idx].badge,
            caption: item.caption || LATEST_INSTAGRAM_POSTS[idx].caption,
            views: LATEST_INSTAGRAM_POSTS[idx].views,
          }));
          setInstagramPosts(formatted);
        }
      })
      .catch(() => {
        // Fallback to real curated posts seamlessly
      });
  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setGoogleReviewIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
      } else if (e.key === "ArrowRight") {
        setGoogleReviewIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      page.style.setProperty("--scroll-progress", String(progress));
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    const updatePointer = (event: PointerEvent) => {
      page.style.setProperty("--pointer-x", `${event.clientX / window.innerWidth - 0.5}`);
      page.style.setProperty("--pointer-y", `${event.clientY / window.innerHeight - 0.5}`);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <main
        ref={pageRef}
        className={`poshakh-site transition-opacity duration-150 ${
          showPreloader ? "opacity-90 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="scroll-progress" aria-hidden="true" />


        {/* Global Header */}
        <header className="site-header">
          <a className="wordmark group" href="#top" aria-label="Poshakh home">
            <img
              src="/media/brand/poshakh-logo.png"
              alt="Poshakh"
              className="h-8 sm:h-9.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md brightness-110"
            />
            <small>
              <span>Fabrics · Est. 1992</span>
              <span>F.C. Road, Pune</span>
            </small>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#top">3D Outfits</a>
            <a href="#pichwai">Pichwai</a>
            <a href="#atelier">Atelier</a>
            <a href="#zari">Zari Craft</a>
            <a href="#kalamkari">Collection</a>
            <a href="#reviews">Reviews (4.9★)</a>
            <a href="#flagship">Flagship Store</a>
          </nav>

          <div className="header-actions">
            <a className="visit-link" href={SHOP_URL} target="_blank" rel="noreferrer">
              Visit Store <ArrowUpRight size={15} strokeWidth={1.6} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <div className="flex flex-col items-center justify-center pb-5 border-b border-white/15 mb-5">
              <img
                src="/media/brand/poshakh-logo.png"
                alt="Poshakh"
                className="h-11 w-auto object-contain drop-shadow"
              />
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[oklch(0.71_0.105_84)] font-medium mt-1">
                F.C. Road, Pune · Est. 1992
              </span>
            </div>
            <a href="#top" onClick={() => setMenuOpen(false)}>3D Outfits</a>
            <a href="#pichwai" onClick={() => setMenuOpen(false)}>Pichwai Art</a>
            <a href="#atelier" onClick={() => setMenuOpen(false)}>The Atelier</a>
            <a href="#zari" onClick={() => setMenuOpen(false)}>Zari Weave</a>
            <a href="#kalamkari" onClick={() => setMenuOpen(false)}>Kalamkari Edit</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Client Reviews (4.9★)</a>
            <a href="#flagship" onClick={() => setMenuOpen(false)}>Pune Flagship Store</a>
            <a href={SHOP_URL} target="_blank" rel="noreferrer">
              Enter the Store <ArrowUpRight size={22} className="inline ml-2" />
            </a>
          </nav>
        )}

        {/* =========================================================================
          HERO SECTION: 3D Outfit-Morphing Scroll Scrubber
          ========================================================================= */}
        <section id="top" className="hero-spatial-container relative">
          <CanvasFrameScrubber
            framesPath="/media/hero-frames"
            frameCount={300}
            fileNamePrefix="frame_"
            fileExt=".webp"
            digits={3}
            trackHeight="300vh"
            className="hero-scrubber"
            overlay={<HeritageThreadOverlay />}
          />
        </section>

        {/* =========================================================================
          CHAPTER 02: THE MODERN PICHWAI DROP (Gen-Z Indo-Western Street & Everyday Ready-to-Wear)
          ========================================================================= */}
        <section id="pichwai" className="pichwai-section section-pad !pb-8 md:!pb-12 relative overflow-hidden">
          {/* Subtle Ambient Video Atmosphere */}
          <div className="ambient-backdrop">
            <AmbientFilm
              src="/media/videos/aesthetic-lotus-pool.mp4"
              poster="/media/photos/poshakh-halter-pichwai-maroon.jpg"
              label="Sacred lotus flowers and floating silk organza in palace pool"
              className="opacity-20 filter blur-[2px]"
            />
            <div className="backdrop-gradient" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-20">
            {/* Header Row: Modern High-Fashion Drop Eyebrow & Headline */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-reveal>
              <div>
                <div className="section-index text-[oklch(0.5_0.18_31)]">
                  02 — THE MODERN PICHWAI DROP
                </div>
                <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] text-[oklch(0.17_0.045_49)]">
                  Sacred motifs.
                  <em className="block text-[oklch(0.71_0.105_84)]">Street-ready silhouettes.</em>
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-sm md:text-base text-[oklch(0.49_0.045_58)] leading-relaxed">
                  Hand-printed Nathdwara lotus & miniature motifs engineered into breathable high-collar tops, keyholes, and open-back halters. Tailored for effortless pairing with relaxed denim, wide trousers, and everyday modern movement.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs tracking-wider uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.5_0.18_31)] animate-ping" />
                  Live Drop · Limited Studio Run
                </div>
              </div>
            </div>

            {/* Brand Innovation / Manifesto Card: Loom Craft -> Modern Everyday */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl border border-[oklch(0.71_0.105_84)]/30 bg-[oklch(0.985_0.014_87)]/90 backdrop-blur-xl shadow-xl"
              data-reveal
            >
              <div className="border-b md:border-b-0 md:border-r border-[oklch(0.71_0.105_84)]/20 pb-4 md:pb-0 md:pr-6">
                <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  Heritage to Street
                </span>
                <h4 className="font-display text-2xl mt-1 text-[oklch(0.17_0.045_49)]">
                  33 Years of Loom Mastery
                </h4>
                <p className="text-xs text-[oklch(0.49_0.045_58)] mt-2 leading-relaxed">
                  Founded in 1992 on F.C. Road in Pune by Kavita & Rahul Awasthee. We cut out intermediaries and collaborate directly with master artisans across 14 craft clusters.
                </p>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-[oklch(0.71_0.105_84)]/20 pb-4 md:pb-0 md:px-6">
                <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  Signature Innovation
                </span>
                <h4 className="font-display text-2xl mt-1 text-[oklch(0.17_0.045_49)]">
                  The 1-Inch Margin Flex
                </h4>
                <p className="text-xs text-[oklch(0.49_0.045_58)] mt-2 leading-relaxed">
                  Never discard a piece when your size fluctuates. Every Poshakh top features a built-in 1-inch seam allowance on both sides for effortless lifetime alterations.
                </p>
              </div>
              <div className="md:pl-6">
                <span className="text-[0.68rem] tracking-[0.22em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  Zero Synthetics
                </span>
                <h4 className="font-display text-2xl mt-1 text-[oklch(0.17_0.045_49)]">
                  100% Breathable Cotton & Dyes
                </h4>
                <p className="text-xs text-[oklch(0.49_0.045_58)] mt-2 leading-relaxed">
                  Skin-kind organic weaves and cold-fermented Vanaspati plant dyes that stay cool in tropical heat and soften with every wash.
                </p>
              </div>
            </div>

            {/* Interactive Garment Presentation: The Bestseller Fit Explorer */}
            <div id="select-fit-section" className="space-y-8" data-reveal>
              {/* Pill Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.49_0.045_58)] mr-2">
                  Select Fit:
                </span>
                {PICHWAI_FITS.map((fit) => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => {
                      setActivePichwaiFit(fit.id);
                      setActiveProductImageIndex(0);
                    }}
                    className={`pichwai-fit-pill ${activePichwaiFit === fit.id ? "active" : ""}`}
                  >
                    {fit.tabLabel}
                  </button>
                ))}
              </div>

              {/* Active Fit Spotlight Card */}
              <div className="rounded-3xl border border-[oklch(0.71_0.105_84)]/40 bg-[oklch(0.985_0.014_87)]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500">
                {/* Product Visual with < > Navigation & Thumbnails */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-[oklch(0.71_0.105_84)]/30 aspect-[3/4] max-h-[500px] bg-neutral-100">
                    <img
                      key={`${currentFit.id}-${activeProductImageIndex}`}
                      src={currentFit.images[activeProductImageIndex] || currentFit.image}
                      alt={`${currentFit.title} - View ${activeProductImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Photo Counter Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[0.65rem] font-mono tracking-wider font-semibold bg-black/65 text-white backdrop-blur-md shadow-sm border border-white/10">
                        {activeProductImageIndex + 1} / {currentFit.images.length}
                      </span>
                    </div>

                    {/* < > Carousel Arrows */}
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProductImageIndex((prev) =>
                            prev === 0 ? currentFit.images.length - 1 : prev - 1
                          );
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/55 hover:bg-black/85 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProductImageIndex((prev) =>
                            (prev + 1) % currentFit.images.length
                          );
                        }}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-black/55 hover:bg-black/85 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                        aria-label="Next photo"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Quick View Button at bottom right */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <a
                        href={currentFit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[oklch(0.17_0.045_49)] hover:bg-[oklch(0.17_0.045_49)] hover:text-white transition-colors shadow"
                      >
                        Quick View <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Horizontal Thumbnail Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                    {currentFit.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveProductImageIndex(idx)}
                        className={`relative shrink-0 w-11 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeProductImageIndex === idx
                            ? "border-[oklch(0.17_0.045_49)] scale-105 shadow-sm opacity-100"
                            : "border-transparent opacity-55 hover:opacity-100"
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Garment Details & Gen-Z Styling Guide */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[oklch(0.5_0.18_31)]">
                        Silhouette Code · {currentFit.id.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)]">
                      {currentFit.title}
                    </h3>

                    {/* Real Pricing Block */}
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="font-display text-3xl font-semibold text-[oklch(0.17_0.045_49)]">
                        {currentFit.price}
                      </span>
                      <span className="text-sm line-through text-[oklch(0.49_0.045_58)]">
                        {currentFit.mrp}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                        {currentFit.discount}
                      </span>
                    </div>

                    {/* Live Offers & Service Perks */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold bg-[oklch(0.71_0.105_84)]/15 text-[oklch(0.5_0.18_31)] border border-[oklch(0.71_0.105_84)]/35">
                        <Tag size={12} /> Buy 2 Get 1 Free Eligible
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.68rem] font-medium bg-amber-50 text-amber-900 border border-amber-200">
                        <CheckCircle2 size={11} className="text-amber-600" /> Cash on Delivery Available
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.68rem] font-medium bg-blue-50 text-blue-900 border border-blue-200">
                        <Phone size={11} className="text-blue-600" /> Stylist Measurement Call Included
                      </span>
                    </div>

                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[oklch(0.5_0.18_31)]">
                      {currentFit.silhouette}
                    </p>
                    <p className="mt-1 text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                      Motif: {currentFit.printMotif}
                    </p>
                  </div>

                  {/* Gen-Z Street Styling Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[oklch(0.965_0.025_83)]/80 border border-[oklch(0.71_0.105_84)]/25">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-[oklch(0.17_0.045_49)]">
                      <Sparkles size={14} className="text-[oklch(0.5_0.18_31)]" />
                      How to Style for Gen-Z Streetwear
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-[oklch(0.21_0.045_53)] leading-relaxed font-sans">
                      {currentFit.stylingTip}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentFit.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs bg-white/70 border border-[oklch(0.71_0.105_84)]/25 text-[oklch(0.21_0.045_53)] font-medium"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct CTA */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={currentFit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[oklch(0.17_0.045_49)] text-[oklch(0.71_0.105_84)] hover:bg-[oklch(0.5_0.18_31)] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.2em] shadow-lg"
                    >
                      Shop This Silhouette <ArrowUpRight size={16} />
                    </a>
                    <span className="text-xs text-[oklch(0.49_0.045_58)]">
                      Free shipping India-wide · Dispatches in 24 hrs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Walkthrough Reel: Video-23402.mp4 */}
            <div className="space-y-6" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    Product Walkthrough · Real Fit & Styling
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1">
                    Meet Our Handcrafted Halters in Real Motion
                  </h3>
                </div>
                <p className="text-xs text-[oklch(0.49_0.045_58)] max-w-sm">
                  An authentic walkthrough showcasing our breathable pure cotton handblock prints, signature back-tie silhouettes, and real-life styling.
                </p>
              </div>

              {/* Centered Video Player */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-full max-w-[270px] sm:max-w-[300px] max-h-[500px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-[oklch(0.71_0.105_84)]/40 bg-black group">
                  <video
                    ref={introVideoRef}
                    src="/media/videos/poshakh-product-intro.mp4"
                    poster="/media/poshakh-product-intro-poster.jpg"
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label="Poshakh product introduction video showing halter kurti fit and styling"
                  />

                  {/* Bottom Audio & Play Controls Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between z-20">
                    {/* Play / Pause Toggle */}
                    <button
                      type="button"
                      onClick={toggleIntroVideoPlay}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium border border-white/25 transition-all shadow-md active:scale-95"
                      aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    >
                      {isVideoPlaying ? (
                        <>
                          <Pause size={13} />
                          <span className="text-[0.68rem] font-medium">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play size={13} className="translate-x-0.5" />
                          <span className="text-[0.68rem] font-medium">Play</span>
                        </>
                      )}
                    </button>

                    {/* Unmute / Mute Toggle Button */}
                    <button
                      type="button"
                      onClick={toggleIntroVideoMute}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold border transition-all shadow-lg active:scale-95 ${
                        isVideoMuted
                          ? "bg-[oklch(0.5_0.18_31)] text-white border-[oklch(0.71_0.105_84)] hover:bg-[oklch(0.42_0.18_31)] animate-bounce"
                          : "bg-emerald-600/90 text-white border-emerald-400 hover:bg-emerald-700"
                      }`}
                      aria-label={isVideoMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isVideoMuted ? (
                        <>
                          <VolumeX size={15} className="text-amber-200" />
                          <span className="text-[0.72rem] tracking-wide uppercase">Tap to Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={15} />
                          <span className="text-[0.72rem] tracking-wide uppercase">Sound On</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <span className="mt-3 text-[0.7rem] text-[oklch(0.49_0.045_58)] font-medium">
                  {isVideoMuted ? "🎧 Sound muted by default · Tap to hear product details" : "🔊 Audio playing"}
                </span>
              </div>
            </div>

            {/* Decoded Motif Codes (Fashion Tech, Not Religion) */}
            <div className="space-y-8" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    Fashion Codes Decoded
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1">
                    Ancient Art as Modern Garment Tech
                  </h3>
                </div>
                <p className="text-xs text-[oklch(0.49_0.045_58)] max-w-sm">
                  How 17th-century temple aesthetics are translated into wearable modern clothing features rather than museum relics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PICHWAI_MOTIFS.map((motif) => (
                  <div
                    key={motif.badge}
                    className="motif-card-modern"
                  >
                    <div className="text-3xl mb-3">{motif.icon}</div>
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-[oklch(0.5_0.18_31)]">
                      {motif.badge}
                    </span>
                    <h4 className="font-display text-xl mt-1 text-[oklch(0.17_0.045_49)]">
                      {motif.title}
                    </h4>
                    <p className="text-xs font-semibold text-[oklch(0.21_0.045_53)] mt-2">
                      {motif.hook}
                    </p>
                    <p className="text-xs text-[oklch(0.49_0.045_58)] mt-2 leading-relaxed">
                      {motif.desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[oklch(0.71_0.105_84)]/20 text-[0.68rem] uppercase tracking-wider text-[oklch(0.5_0.18_31)] font-medium">
                      📍 {motif.clothingDetail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Lookbook Gallery: Asymmetrical High-Fashion Grid */}
            <div className="space-y-8" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    Campaign Archive
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1">
                    Styled for the Modern Street
                  </h3>
                </div>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[oklch(0.5_0.18_31)] font-semibold hover:text-[oklch(0.17_0.045_49)] transition-colors"
                >
                  View Full Lookbook ↗
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: The Pink Shoulder Tie Top */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30">
                  <img
                    src="/media/photos/campaign/the-pink-shoulder-tie-top_1.jpg"
                    alt="Model wearing The Pink Shoulder Tie Top"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        Shoulder-Tie Cut
                      </span>
                      <p className="font-display text-xl mt-0.5">The Pink Shoulder Tie Top</p>
                      <p className="text-xs text-neutral-300">Rs. 1,185 · Delicate Botanical Print</p>
                    </div>
                    <a
                      href="https://poshakhfabrics.com/products/the-pink-shoulder-tie-top"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                      aria-label="View The Pink Shoulder Tie Top"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Card 2: The Poshakh Jharokha Halter Midi Dress */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30 md:translate-y-8">
                  <img
                    src="/media/photos/campaign/the-poshakh-jharokha-halter-midi-dress_1.jpg"
                    alt="Model wearing The Poshakh Jharokha Halter Midi Dress"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        Heritage Midi Edit
                      </span>
                      <p className="font-display text-xl mt-0.5">The Jharokha Midi Dress</p>
                      <p className="text-xs text-neutral-300">Rs. 2,254 · Architectural Temple Arch</p>
                    </div>
                    <a
                      href="https://poshakhfabrics.com/products/the-poshakh-jharokha-halter-midi-dress"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                      aria-label="View The Poshakh Jharokha Halter Midi Dress"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Card 3: Halter Neck Kurti Peacock Pichwai */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30">
                  <img
                    src="/media/photos/campaign/halter-neck-kurti-peacock-pichwai_1.png"
                    alt="Model wearing Halter Neck Kurti Peacock Pichwai"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        Temple Motif Classic
                      </span>
                      <p className="font-display text-xl mt-0.5">Halter Kurti Peacock Pichwai</p>
                      <p className="text-xs text-neutral-300">Rs. 1,552 · Indigo Peacocks & Lotuses</p>
                    </div>
                    <a
                      href="https://poshakhfabrics.com/products/halter-neck-kurti-peacock-pichwai"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                      aria-label="View Halter Neck Kurti Peacock Pichwai"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
          CHAPTER 03: THE ATELIER — HOW CLOTH BECOMES FORM
          ========================================================================= */}
        <section id="atelier" className="atelier-chapter section-pad !pt-8 md:!pt-12 relative overflow-hidden bg-[oklch(0.965_0.025_83)] text-[oklch(0.17_0.045_49)]">
          {/* Subtle Workshop Atmosphere Gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,oklch(0.71_0.105_84/0.15),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.5_0.18_31/0.1),transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto space-y-12 md:space-y-16">

            {/* -------------------------------------------------------------------
              SCENE 01 & 02 — ENTER THE ATELIER & THE ARCHITECTURAL PASSAGE
              ------------------------------------------------------------------- */}
            <div className="space-y-6 md:space-y-8" data-reveal>
              <div className="section-index text-[oklch(0.5_0.18_31)]">
                03 — THE ATELIER &amp; PASSAGE OF CRAFT
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[oklch(0.49_0.045_58)] font-semibold mb-2">
                    The Workshop Floor · Pune, India
                  </p>
                  <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.92] text-[oklch(0.17_0.045_49)]">
                    Behind every surface
                    <em className="block text-[oklch(0.71_0.105_84)]">is a living process.</em>
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Raw cotton fibers. Hand-carved teakwood blocks. Cold-fermented vats of indigo leaf. Welcome to the tactile workshop where ancient loom traditions are precision-tailored into contemporary everyday silhouettes.
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs tracking-wider uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.5_0.18_31)]" />
                    33 Years of Direct Artisan Craftsmanship
                  </div>
                </div>
              </div>

              {/* Spatial Portal Display — Heritage Origin Corridor (Clean, No Random Images) */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 bg-white/90 border border-[oklch(0.71_0.105_84)]/30 shadow-2xl backdrop-blur-xl">
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] bg-black">
                  <AmbientFilm
                    src="/media/videos/palace-corridor-3d.mp4"
                    label="First-person camera floating through architectural arches past billowing raw silks"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-[oklch(0.71_0.105_84)]">
                      Origin Corridor
                    </span>
                    <span className="text-[0.68rem] tracking-wider text-neutral-300">
                      35mm Cinematic Spatial Camera
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <span className="text-xs uppercase tracking-[0.22em] text-[oklch(0.5_0.18_31)] font-bold">
                      THE ARCHITECTURAL PASSAGE
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1.5">
                      The Sanctuary of Motifs
                    </h4>
                  </div>

                  <p className="text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                    In 14 craft clusters across Gujarat, Rajasthan, and Andhra Pradesh, ancient iconography is held in the muscle memory of master artisan families. Before shears touch cloth at Poshakh&apos;s Pune atelier, every textile journey begins here—steeped in centuries of living heritage.
                  </p>

                  <div className="p-4 rounded-2xl bg-[oklch(0.965_0.025_83)] border border-[oklch(0.71_0.105_84)]/20 text-xs text-[oklch(0.21_0.045_53)] space-y-2">
                    <div className="font-semibold uppercase tracking-wider text-[oklch(0.17_0.045_49)]">
                      Heritage Craft Codes:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[0.72rem]">
                      <div>✓ Hand-beaten Brass Pit-Looms</div>
                      <div>✓ 100% Vanaspati Dyes</div>
                      <div>✓ Organic Cotton Sheen</div>
                      <div>✓ Natural Riverbank Washes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 03 — THREAD (Macro Fiber & Weave Architecture)
              ------------------------------------------------------------------- */}
            <div className="space-y-8" data-reveal>
              <div className="max-w-2xl">
                <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  Macro Fibre Study
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)] mt-1">
                  From a Single Thread to Living Cloth
                </h3>
                <p className="text-sm text-[oklch(0.49_0.045_58)] mt-3 leading-relaxed">
                  Before print or dye exists, there is only raw cotton spun by hand. The slub variations, tensile breathability, and natural warp-and-weft balance create a tactile surface that synthetic fibers could never emulate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white/80 border border-[oklch(0.71_0.105_84)]/30 shadow-lg space-y-4">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Fibre Step 01
                  </span>
                  <h4 className="font-display text-2xl text-[oklch(0.17_0.045_49)]">
                    1 Raw Cotton Thread
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Long-staple Indian cotton combed by hand to preserve natural moisture and tensile strength. Zero synthetic nylon filaments.
                  </p>
                  <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.71_0.105_84)] font-semibold">
                    60s Yarn Count · High Tensile
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/80 border border-[oklch(0.71_0.105_84)]/30 shadow-lg space-y-4">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Fibre Step 02
                  </span>
                  <h4 className="font-display text-2xl text-[oklch(0.17_0.045_49)]">
                    Intersecting Warp &amp; Weft
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Interwoven at 120 beats per minute on traditional wooden looms. Gentle tension allows the cloth to breathe and soften naturally over time.
                  </p>
                  <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.71_0.105_84)] font-semibold">
                    Natural Air-Pockets · Sweat-Free
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/80 border border-[oklch(0.71_0.105_84)]/30 shadow-lg space-y-4">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Fibre Step 03
                  </span>
                  <h4 className="font-display text-2xl text-[oklch(0.17_0.045_49)]">
                    Finished Khadi Canvas
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    The unbleached ecru surface primed with harda extracts, ready to absorb hand-block botanical dyes without synthetic fixatives.
                  </p>
                  <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.71_0.105_84)] font-semibold">
                    Hypoallergenic · 100% Skin-Kind
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 04 & 05 — VANASPATI ALCHEMY & DYE TO FABRIC
              ------------------------------------------------------------------- */}
            <div className="space-y-8" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    Botanical Dye Chemistry
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)] mt-1">
                    Vanaspati Alchemy
                  </h3>
                </div>
                {/* Dye Switcher Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(["indigo", "madder", "turmeric"] as const).map((dye) => (
                    <button
                      key={dye}
                      type="button"
                      onClick={() => setActiveDyeFibre(dye)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-semibold border transition-all ${activeDyeFibre === dye
                          ? dye === "indigo"
                            ? "bg-[oklch(0.22_0.06_250)] text-[oklch(0.85_0.05_85)] border-[oklch(0.22_0.06_250)] shadow-md"
                            : dye === "madder"
                              ? "bg-[oklch(0.42_0.16_30)] text-white border-[oklch(0.42_0.16_30)] shadow-md"
                              : "bg-[oklch(0.68_0.16_78)] text-[oklch(0.17_0.045_49)] border-[oklch(0.68_0.16_78)] shadow-md"
                          : "bg-white/70 text-[oklch(0.49_0.045_58)] border-black/10 hover:border-black"
                        }`}
                    >
                      {dye === "indigo" && "Indigo Leaf"}
                      {dye === "madder" && "Madder Root"}
                      {dye === "turmeric" && "Turmeric & Pomegranate"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 bg-white/95 border border-[oklch(0.71_0.105_84)]/30 shadow-xl">
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black">
                  <AmbientFilm
                    key={activeDyeFibre}
                    src={
                      activeDyeFibre === "indigo"
                        ? "/media/videos/aesthetic-indigo-dye.mp4"
                        : activeDyeFibre === "madder"
                          ? "/media/videos/madder-dye.mp4"
                          : "/media/videos/turmeric-dye.mp4"
                    }
                    label={
                      activeDyeFibre === "indigo"
                        ? "Deep indigo pigment blooming in cold spring water"
                        : activeDyeFibre === "madder"
                          ? "Rich madder root crimson and terracotta pigment blooming in water"
                          : "Warm golden turmeric and pomegranate ochre pigment blooming in water"
                    }
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white text-xs">
                    <div>
                      <span className="uppercase tracking-widest text-[oklch(0.71_0.105_84)] font-semibold">
                        {activeDyeFibre === "indigo" && "Live Vat Extraction · Sacred Blue"}
                        {activeDyeFibre === "madder" && "Live Vat Extraction · Terracotta Bloom"}
                        {activeDyeFibre === "turmeric" && "Live Vat Extraction · Solar Ochre"}
                      </span>
                      <p className="mt-0.5 opacity-80 text-[0.7rem]">
                        {activeDyeFibre === "indigo" && "21-Day Cold Fermentation with Zero Harsh Chlorines"}
                        {activeDyeFibre === "madder" && "Crushed Rubia Cordifolia Roots with Natural Alum Fixing"}
                        {activeDyeFibre === "turmeric" && "Wild Curcuma Rhizomes & Dried Pomegranate Rinds"}
                      </p>
                    </div>
                    <span className="text-[0.62rem] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md font-medium border border-white/20">
                      {activeDyeFibre === "indigo" && "pH 9.2 Alkaline"}
                      {activeDyeFibre === "madder" && "pH 6.5 Neutral"}
                      {activeDyeFibre === "turmeric" && "pH 5.8 Solar Acid"}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[oklch(0.5_0.18_31)] font-semibold">
                      Alchemical Metamorphosis
                    </span>
                    <h4 className="font-display text-3xl text-[oklch(0.17_0.045_49)] mt-1">
                      {activeDyeFibre === "indigo" && "Indigofera Tinctoria · Sacred Blue"}
                      {activeDyeFibre === "madder" && "Rubia Cordifolia · Terracotta & Madder"}
                      {activeDyeFibre === "turmeric" && "Curcuma & Wild Pomegranate · Antique Gold"}
                    </h4>
                  </div>

                  <p className="text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                    {activeDyeFibre === "indigo" &&
                      "Harvested in dawn dew, crushed and submerged in earthen vats for three weeks with jaggery, lime, and wood ash. The liquid oxidizes from chartreuse to deep midnight blue the exact moment it meets oxygen on wet fabric."}
                    {activeDyeFibre === "madder" &&
                      "Sun-dried Indian madder roots pulverized and brewed in brass cauldrons with alum mordant. It produces earthy terracotta hues that deepen into rich vintage patina with each washing cycle."}
                    {activeDyeFibre === "turmeric" &&
                      "Wild turmeric rhizomes blended with dried pomegranate rinds to yield warm solar ochres and mustard highlights. Completely food-grade, completely skin-safe."}
                  </p>

                  {/* Macro transformation steps */}
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[oklch(0.71_0.105_84)]/20 text-center">
                    <div className="p-3 rounded-xl bg-[oklch(0.965_0.025_83)]">
                      <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.5_0.18_31)] font-bold">Stage 1</div>
                      <div className="font-display text-base text-[oklch(0.17_0.045_49)] mt-1">Raw Cotton</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[oklch(0.965_0.025_83)]">
                      <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.5_0.18_31)] font-bold">Stage 2</div>
                      <div className="font-display text-base text-[oklch(0.17_0.045_49)] mt-1">
                        {activeDyeFibre === "indigo" && "Indigo Vat"}
                        {activeDyeFibre === "madder" && "Madder Dip"}
                        {activeDyeFibre === "turmeric" && "Solar Infusion"}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-[oklch(0.965_0.025_83)]">
                      <div className="text-[0.65rem] uppercase tracking-wider text-[oklch(0.5_0.18_31)] font-bold">Stage 3</div>
                      <div className="font-display text-base text-[oklch(0.17_0.045_49)] mt-1">Sun Dried</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 06 & 07 — PRINTING & THE HUMAN HAND
              ------------------------------------------------------------------- */}
            <div className="space-y-8" data-reveal>
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[0.68rem] tracking-[0.26em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                  The Touch of Master Hands
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)]">
                  Craft is not automated. It is handled.
                </h3>
                <p className="text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                  No high-speed inkjet printheads. Every stroke, block placement, and seam in our studio is guided by human eyes, breath, and seasoned touch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[oklch(0.71_0.105_84)]/30 group">
                  <img
                    src="/media/photos/motif-lotus-macro.jpg"
                    alt="Extreme macro textile view of hand-painted Shrinathji Lotus with gold dust on natural cotton weave"
                    className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[oklch(0.71_0.105_84)] font-semibold">
                      Block &amp; Brush Precision
                    </span>
                    <h4 className="font-display text-2xl mt-1">Gold Dust &amp; Pigment Layering</h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      Notice the delicate slub fibers holding metallic luster lines directly on the handloom weave.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[oklch(0.71_0.105_84)]/30 group">
                  <img
                    src="/media/photos/poshakh-kalamkari-indigo.jpg"
                    alt="Craftsman hands working on Kalamkari organic block print"
                    className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[oklch(0.71_0.105_84)] font-semibold">
                      Human Touch · 14 Craft Clusters
                    </span>
                    <h4 className="font-display text-2xl mt-1">The Handloom Artisan Guild</h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      Collaborating directly with generational master printmakers—sustaining families, not automated factories.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 08 & 09 — TEXTILE → GARMENT & GARMENT STUDY
              ------------------------------------------------------------------- */}
            <div className="space-y-8" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    Garment Construction Study
                  </span>
                  <h3 className="font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)] mt-1">
                    Architecture of the Cut
                  </h3>
                </div>
                <p className="text-xs text-[oklch(0.49_0.045_58)] max-w-sm">
                  Moving from two-dimensional yardage into a flattering three-dimensional silhouette that flexes with modern movement.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 bg-white/95 border border-[oklch(0.71_0.105_84)]/30 shadow-2xl">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.22em] text-[oklch(0.5_0.18_31)] font-bold">
                      Atelier Study / 01
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1">
                      Halter Neck Dress with Pockets
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.71_0.105_84)] mt-1">
                      Textile: 100% Breathable Cotton · Floral Hand-Block Print
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        index: "01",
                        title: "Mandarin Teardrop Keyhole",
                        desc: "High architectural neck balanced with a teardrop keyhole back cut to flatter shoulders.",
                      },
                      {
                        index: "02",
                        title: "Concealed French Seams",
                        desc: "Double-folded, completely encased seams that prevent any skin friction or thread fraying.",
                      },
                      {
                        index: "03",
                        title: "Deep Functional Pockets",
                        desc: "Seamless dual side-seam pockets tailored for everyday convenience without disrupting the flared drape.",
                      },
                      {
                        index: "04",
                        title: "Concealed 1-Inch Flex Reserve",
                        desc: "Generous inner seam allowances on both lateral seams for effortless home tailoring.",
                      },
                    ].map((feature) => (
                      <div
                        key={feature.index}
                        className="p-3.5 rounded-2xl border border-[oklch(0.71_0.105_84)]/20 bg-[oklch(0.965_0.025_83)]/70 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.17_0.045_49)]">
                            {feature.title}
                          </span>
                          <span className="text-[0.62rem] font-mono tracking-widest text-[oklch(0.5_0.18_31)] font-semibold">
                            SPEC · {feature.index}
                          </span>
                        </div>
                        <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-black">
                  <AmbientFilm
                    src="/media/videos/poshakh-racerback-dress.mp4"
                    poster="/media/poshakh-racerback-dress-poster.jpg"
                    label="Real motion showcase of Halter Neck Racerback Dress with Pockets"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.24em] uppercase text-[oklch(0.71_0.105_84)] font-semibold">
                        360° Construction View
                      </span>
                      <p className="font-display text-xl mt-0.5">Finished Garment in Real Motion</p>
                    </div>
                    <a
                      href="https://poshakhfabrics.com/products/halter-neck-racerback-dress-with-pockets"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-[oklch(0.71_0.105_84)] transition-all shadow"
                    >
                      View Dress Details <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 10 — THE 1-INCH MARGIN (Graphic Tailoring Blueprint)
              ------------------------------------------------------------------- */}
            <div
              className="rounded-3xl p-8 sm:p-12 border border-[oklch(0.71_0.105_84)]/40 bg-[oklch(0.17_0.045_49)] text-white shadow-2xl relative overflow-hidden"
              data-reveal
            >
              {/* Blueprint Grid Watermark */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.22em] bg-white/10 text-[oklch(0.71_0.105_84)] font-semibold">
                    <Scissors size={12} />
                    Poshakh Tailoring Patent
                  </div>
                  <h3 className="font-display text-4xl sm:text-6xl text-white leading-tight">
                    The 1-Inch Margin.
                    <em className="block text-[oklch(0.71_0.105_84)]">The difference lives in the details.</em>
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
                    Fast fashion cuts edges to the millimeter to save fabric. Poshakh deliberately reserves a full 1-inch seam allowance inside every side panel. Your body shifts over seasons and years—your favorite heirloom top adapts right alongside you.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-300">
                    <span className="flex items-center gap-1.5">✓ 5-Minute Size Adjustment</span>
                    <span className="flex items-center gap-1.5">✓ Zero Fabric Waste</span>
                    <span className="flex items-center gap-1.5">✓ Lifelong Heirloom Wearability</span>
                  </div>
                </div>

                {/* Graphic Blueprint Ruler Representation */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md space-y-4 font-mono">
                  <div className="flex justify-between items-center text-[0.7rem] text-[oklch(0.71_0.105_84)]">
                    <span>TAILORING SPEC: LATERAL SEAM</span>
                    <span>1.00 IN / 25.4 MM</span>
                  </div>

                  {/* Simulated Measurement Line */}
                  <div className="relative py-4 border-y border-white/20">
                    <div className="flex justify-between text-[0.6rem] text-neutral-400">
                      <span>0</span>
                      <span>1/4</span>
                      <span>1/2</span>
                      <span>3/4</span>
                      <span className="text-[oklch(0.71_0.105_84)] font-bold">1" FLEX</span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                      <div className="w-3/4 bg-white/40 h-full" />
                      <div className="w-1/4 bg-[oklch(0.71_0.105_84)] h-full animate-pulse" />
                    </div>
                  </div>

                  <p className="text-[0.7rem] text-neutral-400 leading-relaxed font-sans">
                    Concealed inner allowance: Unpick one single chain stitch to expand up to a full size larger without altering original drape or collar symmetry.
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 10.5 — THE MATERNITY GENESIS (Founder Backstory & Innovation)
              ------------------------------------------------------------------- */}
            <div
              className="rounded-3xl p-8 sm:p-12 border border-[oklch(0.71_0.105_84)]/40 bg-[oklch(0.985_0.014_87)]/95 backdrop-blur-2xl shadow-xl space-y-8"
              data-reveal
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[oklch(0.71_0.105_84)]/20 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="/media/brand/poshakh-logo.png"
                      alt="Poshakh"
                      className="h-8 w-auto object-contain"
                    />
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.22em] bg-[oklch(0.5_0.18_31)]/10 text-[oklch(0.5_0.18_31)] font-semibold">
                      <Baby size={13} />
                      Founder Backstory · F.C. Road, Pune · Est. 1992
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)] mt-3">
                    The Maternity Genesis:
                    <em className="block text-[oklch(0.71_0.105_84)]">Where Tradition Meets Motherhood.</em>
                  </h3>
                </div>
                <div className="max-w-md">
                  <p className="text-sm text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Born from a mother&apos;s personal journey. When founder Kavita Awasthee&apos;s daughter was expecting, they discovered modern maternity options were flooded with shapeless polyester garments with zero discreet nursing accessibility.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/90 border border-[oklch(0.71_0.105_84)]/25 space-y-2.5 shadow-sm">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Innovation 01
                  </span>
                  <h4 className="font-display text-xl text-[oklch(0.17_0.045_49)]">
                    Concealed Dual Nursing Zips
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Invisible bilateral vertical zippers tucked beneath subtle pleats. Effortless feeding anywhere without pulling fabric or waking your baby.
                  </p>
                  <div className="text-[0.65rem] text-[oklch(0.71_0.105_84)] font-semibold uppercase tracking-wider">
                    Discreet Ease · 100% Modest
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/90 border border-[oklch(0.71_0.105_84)]/25 space-y-2.5 shadow-sm">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Innovation 02
                  </span>
                  <h4 className="font-display text-xl text-[oklch(0.17_0.045_49)]">
                    100% Breathable Khadi Weave
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Sensitive postpartum skin demands zero synthetic dyes. Handloom cotton washed with organic harda keeps your body cool through hormonal shifts.
                  </p>
                  <div className="text-[0.65rem] text-[oklch(0.71_0.105_84)] font-semibold uppercase tracking-wider">
                    Hypoallergenic · Sweat-Free
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/90 border border-[oklch(0.71_0.105_84)]/25 space-y-2.5 shadow-sm">
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase font-bold text-[oklch(0.5_0.18_31)]">
                    Innovation 03
                  </span>
                  <h4 className="font-display text-xl text-[oklch(0.17_0.045_49)]">
                    Bump-to-Postpartum Cut
                  </h4>
                  <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                    Engineered with an empire flare and our signature 1-inch flex margin. Flatters all trimesters, hospital stays, and transitions as your favorite everyday kurti.
                  </p>
                  <div className="text-[0.65rem] text-[oklch(0.71_0.105_84)] font-semibold uppercase tracking-wider">
                    Lifelong Wearability · Zero Waste
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[oklch(0.71_0.105_84)]/20">
                <span className="text-xs text-[oklch(0.49_0.045_58)]">
                  Over 10,000+ new mothers across India wear Poshakh maternity &amp; nursing kurtas.
                </span>
                <a
                  href="https://poshakhfabrics.com/collections/maternity-wear"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[oklch(0.5_0.18_31)] hover:text-[oklch(0.17_0.045_49)] transition-colors"
                >
                  Explore Maternity &amp; Nursing Collection <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            {/* -------------------------------------------------------------------
              SCENE 11 — FINAL ATELIER MOMENT & TRANSITION TO CHAPTER 04
              ------------------------------------------------------------------- */}
            <div className="text-center max-w-xl mx-auto space-y-6 pt-12 pb-6" data-reveal>
              <span className="text-[0.65rem] tracking-[0.28em] uppercase text-[oklch(0.5_0.18_31)] font-bold">
                Passage to Micro Craft
              </span>
              <h4 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)]">
                Where Cotton Meets Gold
              </h4>
              <p className="text-xs text-[oklch(0.49_0.045_58)] leading-relaxed">
                At the very hem of the garment, the natural cotton thread intertwines with metallic gold zari—drawn through diamond dies and woven into sacred temple luster.
              </p>

              {/* Glowing Golden Thread Handover Line */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-[oklch(0.71_0.105_84)] font-semibold">
                  Scroll to enter Chapter 04 · The Micro-Macro Zari Weave
                </span>
                <div className="h-16 w-[1.5px] bg-gradient-to-b from-[oklch(0.71_0.105_84)] to-transparent" />
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
          CHAPTER 04: The Micro-Macro Zari Weave (Scroll Scrub or Dynamic Zoom)
          ========================================================================= */}
        <section id="zari" className="zari-craft-section relative bg-[oklch(0.135_0.035_49)] text-white">
          <CanvasFrameScrubber
            framesPath="/media/zari-frames"
            frameCount={80}
            fileNamePrefix="frame_"
            fileExt=".webp"
            digits={3}
            trackHeight="320vh"
            className="zari-scrubber"
            overlay={
              <div className="zari-overlay-container">
                {/* Vignette for headline readability */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[oklch(0.135_0.035_49)]/90 via-[oklch(0.135_0.035_49)]/40 to-transparent pointer-events-none" />

                {/* Clean Top Editorial Heading */}
                <div className="zari-overlay-top">
                  <div>
                    <div className="section-index !text-[oklch(0.71_0.105_84)]">04 — The Microscopic Zari</div>
                    <h2 className="font-display text-3xl md:text-6xl mt-2 font-normal">
                      From fiber to form.
                      <em className="block text-[oklch(0.71_0.105_84)]">Microscopic craft.</em>
                    </h2>
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* =========================================================================
          CHAPTER 04: Worlds in Print — Kalamkari & Modern Fusion Lookbook
          ========================================================================= */}
        <section id="kalamkari" className="editorial-world section-pad relative" aria-labelledby="editorial-title">
          <div className="editorial-heading" data-reveal>
            <div className="section-index">04 — Worlds in Print</div>
            <h2 id="editorial-title">
              Three moods.
              <em>One language.</em>
            </h2>
            <p>
              From ancient Kalamkari peacock dyes to Pichwai sacred temple halters—explore the handcrafted ready-to-wear silhouettes defining modern Indian luxury.
            </p>
          </div>

          {/* Feature Kalamkari Flowing Video */}
          <div className="max-w-6xl mx-auto mt-16 mb-24 rounded-2xl overflow-hidden border border-[oklch(0.71_0.105_84)]/40 shadow-2xl relative group" data-reveal>
            <div className="aspect-[16/9] w-full bg-black relative">
              <AmbientFilm
                src="/media/videos/kalamkari-3d.mp4"
                poster="/media/photos/poshakh-halter-kalamkari.jpg"
                label="Model wearing flowing indigo and terracotta Kalamkari printed tunic in Jaipur arches"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.71_0.105_84)]">
                    Feature Edit
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl mt-1">
                    The Kalamkari Indigo Halter
                  </h3>
                  <p className="text-sm text-white/70 max-w-lg mt-2">
                    Ancient pen-work narrative art meets an open-back modern silhouette, tailored with the Poshakh signature 1-inch custom margin.
                  </p>
                </div>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start md:self-auto py-3 px-6 rounded-full bg-[oklch(0.71_0.105_84)] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors"
                >
                  Shop The Silhouette <ArrowUpRight size={15} className="inline ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Haute Couture 3D Editorial Gallery */}
          <div className="editorial-gallery">
            <figure className="editorial-frame indigo-frame" data-reveal>
              <a
                href="https://poshakhfabrics.com/products/black-cotton-halter-neck-top-indo-western-short-kurti"
                target="_blank"
                rel="noreferrer"
                className="block text-inherit no-underline group"
                aria-label="View Black Cotton Halter Neck Top"
              >
                <div className="image-depth rounded-xl overflow-hidden relative">
                  <img
                    src="/media/photos/editorial/black-cotton-halter_1.jpg"
                    alt="Model wearing Black Cotton Halter Neck Top - Indo Western Short Kurti"
                    loading="lazy"
                    width={1080}
                    height={1350}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <figcaption>
                  <span className="group-hover:text-[oklch(0.71_0.105_84)] transition-colors">Black Cotton Halter</span>
                  <small>Indo-Western Short Kurti · Rs. 1,364</small>
                </figcaption>
              </a>
            </figure>

            <figure className="editorial-frame lotus-frame" data-reveal>
              <a
                href="https://poshakhfabrics.com/products/olive-green-cotton-keyhole-tie-up-short-kurti"
                target="_blank"
                rel="noreferrer"
                className="block text-inherit no-underline group"
                aria-label="View Olive Green Cotton Keyhole Tie-Up Short Kurti"
              >
                <div className="image-depth rounded-xl overflow-hidden relative">
                  <img
                    src="/media/photos/editorial/olive-green-keyhole_1.jpg"
                    alt="Model wearing Olive Green Cotton Keyhole Tie-Up Short Kurti"
                    loading="lazy"
                    width={4000}
                    height={5000}
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <figcaption>
                  <span className="group-hover:text-[oklch(0.71_0.105_84)] transition-colors">Olive Green Keyhole</span>
                  <small>Keyhole Tie-Up / Pure Cotton · Rs. 1,785</small>
                </figcaption>
              </a>
            </figure>

            <figure className="editorial-frame vermilion-frame" data-reveal>
              <a
                href="https://poshakhfabrics.com/products/earthy-olive-brown-cotton-short-kurti-notch-neck-daily-wear-tunic"
                target="_blank"
                rel="noreferrer"
                className="block text-inherit no-underline group"
                aria-label="View Earthy Olive Brown Cotton Short Kurti"
              >
                <div className="image-depth rounded-xl overflow-hidden relative">
                  <img
                    src="/media/photos/editorial/earthy-olive-brown_1.jpg"
                    alt="Model wearing Earthy Olive Brown Cotton Short Kurti - Notch Neck Daily Wear Tunic"
                    loading="lazy"
                    width={4000}
                    height={5000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <figcaption>
                  <span className="group-hover:text-[oklch(0.71_0.105_84)] transition-colors">Earthy Olive Brown</span>
                  <small>Notch Neck Daily Wear Tunic · Rs. 1,899</small>
                </figcaption>
              </a>
            </figure>
          </div>

          <a className="editorial-link" href={SHOP_URL} target="_blank" rel="noreferrer" data-reveal>
            Explore All Poshakh Collections <ArrowUpRight size={18} />
          </a>
        </section>

        {/* =========================================================================
          CHAPTER 05: VERIFIED GOOGLE REVIEWS — Top 10 Pune Atelier Stories
          ========================================================================= */}
        <section id="reviews" className="voices-section section-pad !pt-10 !pb-14 bg-[oklch(0.965_0.025_83)] text-[oklch(0.17_0.045_49)] relative overflow-hidden" aria-labelledby="reviews-heading">
          {/* Subtle atmosphere background */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_20%_30%,oklch(0.71_0.105_84/0.2),transparent_70%),radial-gradient(circle_at_80%_70%,oklch(0.5_0.18_31/0.12),transparent_70%)]" />

          <div className="relative z-10 max-w-6xl mx-auto space-y-6">
            
            {/* Header: Compact luxury editorial header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-reveal>
              <div>
                <div className="section-index text-[oklch(0.5_0.18_31)]">
                  05 — VERIFIED GOOGLE REVIEWS · TOP 10 PATRON STORIES
                </div>
                <h2 id="reviews-heading" className="mt-1.5 font-display text-3xl sm:text-5xl text-[oklch(0.17_0.045_49)]">
                  Real words from Pune &amp; beyond.
                  <em className="block text-[oklch(0.71_0.105_84)]">33 Years of woven trust.</em>
                </h2>
              </div>

              {/* Compact Google Rating Pill */}
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-[oklch(0.71_0.105_84)]/40 shadow-sm text-xs font-semibold text-[oklch(0.17_0.045_49)] hover:border-[oklch(0.5_0.18_31)] transition-all self-start sm:self-end"
                title="View Pune Atelier on Google Maps"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-blue-600">G</span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <span>4.8 on Google Maps</span>
                <span className="text-[oklch(0.49_0.045_58)] font-normal hidden md:inline">· 120+ Reviews</span>
                <ArrowUpRight size={13} className="text-[oklch(0.71_0.105_84)]" />
              </a>
            </div>

            {/* Compact Google Showcase Card */}
            <div className="google-reviews-container p-6 sm:p-8 lg:p-10" data-reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column (4 cols): Google Score & Navigation Controls */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-r border-[oklch(0.71_0.105_84)]/25 lg:pr-8">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.2em] bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                      <span className="font-bold">G</span> Verified Google Review
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-bold text-[oklch(0.17_0.045_49)]">4.8</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[oklch(0.49_0.045_58)]">
                        Poshakh Fabrics · 1145, Sadashiv Apts, F.C. Road, Pune
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrow Controls */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prevReview}
                        className="google-nav-btn"
                        aria-label="Previous Google review"
                        title="Previous review (or press ← arrow)"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="px-3 py-1.5 rounded-full bg-white/80 border border-[oklch(0.71_0.105_84)]/30 text-xs font-mono font-semibold text-[oklch(0.17_0.045_49)]">
                        <span className="text-[oklch(0.5_0.18_31)]">
                          {String(googleReviewIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-neutral-400"> / 10</span>
                      </div>

                      <button
                        type="button"
                        onClick={nextReview}
                        className="google-nav-btn"
                        aria-label="Next Google review"
                        title="Next review (or press → arrow)"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <span className="text-[0.65rem] text-[oklch(0.49_0.045_58)] uppercase tracking-wider block">
                      Use arrows to browse Top 10 Google Reviews
                    </span>
                  </div>
                </div>

                {/* Right Column (8 cols): The Active Google Spotlight Review */}
                <div key={currentReview.id} className="lg:col-span-8 flex flex-col justify-between space-y-5 min-h-[220px] google-review-spotlight">
                  
                  {/* Review Quote with Large Serif Typography */}
                  <div className="relative space-y-3">
                    <span className="absolute -top-6 -left-3 font-serif text-6xl text-[oklch(0.71_0.105_84)] opacity-35 select-none pointer-events-none">
                      &ldquo;
                    </span>
                    <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-[oklch(0.17_0.045_49)] leading-relaxed italic pl-3 sm:pl-4">
                      {currentReview.quote}
                    </blockquote>
                  </div>

                  {/* Reviewer Details & Metadata Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[oklch(0.71_0.105_84)]/20 text-xs">
                    <div className="flex items-center gap-3">
                      {/* Avatar Circle */}
                      <div className="h-10 w-10 rounded-full bg-[oklch(0.17_0.045_49)] text-[oklch(0.71_0.105_84)] border border-[oklch(0.71_0.105_84)] flex items-center justify-center font-bold text-xs">
                        {currentReview.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[oklch(0.17_0.045_49)] text-sm flex items-center gap-1.5">
                          {currentReview.author}
                          <CheckCircle2 size={13} className="text-emerald-700" />
                        </div>
                        <div className="text-[0.7rem] text-[oklch(0.49_0.045_58)]">
                          {currentReview.role} · {currentReview.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="inline-flex items-center gap-1 text-[0.68rem] font-medium text-[oklch(0.5_0.18_31)] bg-[oklch(0.5_0.18_31)]/10 px-3 py-1 rounded-full">
                        ✦ {currentReview.tag}
                      </span>
                      <span className="text-[0.65rem] text-neutral-400">{currentReview.date}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom 10 Progress Indicator Pills */}
              <div className="mt-8 pt-5 border-t border-[oklch(0.71_0.105_84)]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  {GOOGLE_REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGoogleReviewIndex(i)}
                      className={`google-dot-pill ${googleReviewIndex === i ? "active" : ""}`}
                      aria-label={`View Google review ${i + 1}`}
                      title={`Review ${i + 1} of 10`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-[oklch(0.49_0.045_58)]">
                  <span>← Keyboard arrows enabled →</span>
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[oklch(0.5_0.18_31)] font-semibold hover:underline"
                  >
                    View on Google Maps <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
          CHAPTER 06: The Grand Finale & Store Entry
          ========================================================================= */}
        <section id="collection" className="collection-reveal">
          <AmbientFilm
            src="/media/videos/collection-reveal.mp4"
            poster="/media/photos/poshakh-halter-kalamkari.jpg"
            label="Printed fabric ribbons fluidly sculpting into finished kurtas and tunics"
          />
          <div className="collection-shade" />
          <div className="collection-copy">
            <p className="eyebrow">The Collection Unfolds</p>
            <h2>
              One fabric.
              <em>Infinite forms.</em>
            </h2>
            <a className="light-cta" href={SHOP_URL} target="_blank" rel="noreferrer">
              Enter The Store <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="marquee" aria-hidden="true">
            <div>
              33 YEARS OF HERITAGE · PICHWAI ART · KALAMKARI INK · VANASPATI PLANT DYES · 1-INCH CUSTOM MARGIN · JAIPUR & PUNE · DESIGNER HALTER TOPS · CO-ORD SETS ·
            </div>
          </div>
        </section>

        <section className="finale section-pad">
          <div className="finale-ornament" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow dark">Your next story awaits</p>
          <h2>
            Wear the
            <em>extraordinary.</em>
          </h2>
          <a className="final-cta" href={SHOP_URL} target="_blank" rel="noreferrer">
            <span>Explore Poshakh Store</span>
            <ArrowUpRight />
          </a>
        </section>

        {/* =========================================================================
          THE FLAGSHIP ATELIER & CONCIERGE — F.C. Road, Pune · Est. 1992
          ========================================================================= */}
        <section id="flagship" className="flagship-section section-pad !pt-12 !pb-16 bg-[oklch(0.17_0.045_49)] text-white relative overflow-hidden" aria-labelledby="flagship-heading">
          {/* Subtle architectural arches watermark */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative z-10 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="/media/brand/poshakh-logo.png"
                    alt="Poshakh"
                    className="h-8 w-auto object-contain brightness-125 drop-shadow"
                  />
                  <span className="section-index !text-[oklch(0.71_0.105_84)] !mb-0 border-l border-[oklch(0.71_0.105_84)]/40 pl-3">
                    FLAGSHIP ATELIER · PUNE &amp; DIRECT CONCIERGE
                  </span>
                </div>
                <h2 id="flagship-heading" className="mt-3 font-display text-4xl sm:text-6xl text-white">
                  Visit the loom.
                  <em className="block text-[oklch(0.71_0.105_84)]">Meet the makers.</em>
                </h2>
              </div>
              <p className="text-sm text-neutral-300 max-w-md leading-relaxed">
                Step into our flagship studio on Fergusson College Road in Pune, or connect directly with our master stylists for custom measurements and bespoke fabric orders.
              </p>
            </div>

            {/* Three Showcase Cards: Real Interactive Map, Interactive WhatsApp Lounge, Visual Reels Wall */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-reveal>
              
              {/* Card 1: Pune Flagship Studio with Real Dark Interactive Map */}
              <div className="flagship-box p-6 sm:p-7 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.2em] bg-white/10 text-[oklch(0.71_0.105_84)] font-semibold">
                      <MapPin size={13} />
                      Pune Flagship Studio
                    </div>
                    <span className="text-[0.68rem] text-neutral-400 font-mono">F.C. Road</span>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-2xl text-white">1145, Sadashiv Apts</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed mt-0.5">
                      Fergusson College Road, Shivajinagar, Pune 411016
                    </p>
                  </div>

                  {/* Real Interactive Map Embed with Dark Filter */}
                  <div className="relative w-full h-[180px] rounded-xl overflow-hidden border border-white/15 shadow-inner group">
                    <iframe
                      title="Poshakh Fabrics Flagship Studio Google Maps Location"
                      src="https://maps.google.com/maps?q=1145+Sadashiv+Apartments+FC+Road+Shivaji+Nagar+Pune+411016&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0 map-dark-filter pointer-events-auto"
                      loading="lazy"
                      aria-label="Map showing location of Poshakh Fabrics on F.C. Road Pune"
                    />
                    {/* Floating Glass Landmark Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[0.62rem] font-semibold bg-black/80 backdrop-blur-md text-[oklch(0.71_0.105_84)] border border-white/10 shadow-sm flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.71_0.105_84)] animate-pulse" />
                        Opp. Police Ground
                      </span>
                      <span className="px-2 py-1 rounded-full text-[0.62rem] bg-black/80 backdrop-blur-md text-neutral-300 border border-white/10">
                        Mon–Fri 9–5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={STORE_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="concierge-action-btn bg-white/10 text-[oklch(0.71_0.105_84)] hover:bg-[oklch(0.71_0.105_84)] hover:text-black border border-white/15 w-full justify-center"
                  >
                    <span>Get Directions on Maps</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card 2: Interactive WhatsApp Concierge Lounge */}
              <div className="flagship-box p-6 sm:p-7 space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Live Status Header */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.18em] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Stylists Active Now
                    </div>
                    <span className="text-[0.65rem] text-neutral-400 font-mono">Replies &lt; 5m</span>
                  </div>

                  {/* Lead Stylist Avatar & Intro */}
                  <div className="flex items-center gap-3 pt-0.5">
                    <div className="h-10 w-10 rounded-full bg-[oklch(0.24_0.05_45)] border-2 border-[oklch(0.71_0.105_84)] flex items-center justify-center font-serif text-xs font-bold text-[oklch(0.71_0.105_84)] shadow-md shrink-0">
                      KA
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-white leading-tight">Kavita &amp; Master Stylists</h3>
                      <p className="text-[0.7rem] text-neutral-300">Custom sizing, flex margins &amp; showroom visits</p>
                    </div>
                  </div>

                  {/* 3 Interactive Quick-Chat Chips */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[0.62rem] uppercase tracking-[0.2em] font-semibold text-[oklch(0.71_0.105_84)] block">
                      Tap to Start WhatsApp Inquiry:
                    </span>
                    
                    <a
                      href="https://wa.me/919096725484?text=Hello%20Poshakh%20team%2C%20I'd%20like%20to%20verify%20my%20bust%20and%20height%20measurements%20for%20a%20garment."
                      target="_blank"
                      rel="noreferrer"
                      className="chat-chip-btn"
                      title="Verify your bust and height measurements on WhatsApp"
                    >
                      <span>📐 Verify My Sizing &amp; Bust Fit</span>
                      <ArrowUpRight size={12} className="opacity-70" />
                    </a>

                    <a
                      href="https://wa.me/919096725484?text=Hello%20Kavita%20ji%2C%20I'd%20like%20to%20schedule%20a%20visit%20to%20your%20F.C.%20Road%20Pune%20studio."
                      target="_blank"
                      rel="noreferrer"
                      className="chat-chip-btn"
                      title="Book an in-person F.C. Road studio visit"
                    >
                      <span>🏛️ Book F.C. Road Studio Visit</span>
                      <ArrowUpRight size={12} className="opacity-70" />
                    </a>

                    <a
                      href="https://wa.me/919096725484?text=Hi%20Poshakh%2C%20could%20you%20explain%20how%20the%201-inch%20flex%20margin%20works%20for%20alterations%3F"
                      target="_blank"
                      rel="noreferrer"
                      className="chat-chip-btn"
                      title="Ask about the 1-inch flex margin"
                    >
                      <span>✂️ Ask About 1-Inch Flex Margin</span>
                      <ArrowUpRight size={12} className="opacity-70" />
                    </a>
                  </div>

                  {/* Helpline & Email strip */}
                  <div className="flex items-center justify-between text-[0.68rem] text-neutral-400 pt-0.5">
                    <a href="tel:9096725484" className="hover:text-white transition-colors">
                      📞 +91 90967 25484
                    </a>
                    <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors">
                      ✉️ {STORE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="concierge-action-btn bg-[#25D366] text-black hover:bg-white border border-[#25D366] w-full justify-center font-bold shadow-lg shadow-emerald-950/40"
                  >
                    <MessageCircle size={15} />
                    <span>Open WhatsApp Concierge</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Visual Atelier Journal & 3-Reel Preview with Instagram Symbol */}
              <div className="flagship-box p-6 sm:p-7 space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  
                  {/* Instagram Header with Official Symbol */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-[0.18em] text-white font-semibold instagram-gradient-badge shadow-sm">
                      <Instagram size={13} />
                      Instagram Journal
                    </div>
                    <span className="text-[0.65rem] text-[oklch(0.71_0.105_84)] font-mono">4,000+ Patrons</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Instagram size={22} className="text-[#E1306C]" />
                      <h3 className="font-display text-2xl text-white">@poshakhfabrics</h3>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed mt-0.5">
                      Behind-the-scenes hand block printing, plant-dye vats &amp; daily styling reels.
                    </p>
                  </div>

                  {/* 3 Real Instagram Post Preview Frames (Auto-fetched & linked to real posts) */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {instagramPosts.map((post) => (
                      <a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="reel-preview-card group"
                        title={post.caption}
                      >
                        <img
                          src={post.image}
                          alt={post.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                        <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs p-1 rounded-full text-white">
                          <Instagram size={9} />
                        </div>
                        <div className="absolute bottom-1.5 left-1.5 right-1.5">
                          <span className="text-[0.55rem] font-bold text-white block truncate">
                            {post.badge}
                          </span>
                          <span className="text-[0.5rem] text-neutral-300">
                            ▶ {post.views}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="concierge-action-btn bg-white/10 text-white hover:bg-white hover:text-black border border-white/15 w-full justify-center group"
                  >
                    <Instagram size={15} className="group-hover:text-[#E1306C] transition-colors" />
                    <span>Follow @poshakhfabrics</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Haute-Couture Architectural Editorial Footer */}
        <footer className="poshakh-editorial-footer">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* 4-Column Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/15">
              
              {/* Col 1: Brand & Heritage (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <a className="wordmark group !items-start" href="#top" aria-label="Poshakh home">
                  <img
                    src="/media/brand/poshakh-logo.png"
                    alt="Poshakh"
                    className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md brightness-110"
                  />
                  <small className="!items-start">
                    <span>Fabrics · Est. 1992</span>
                    <span>F.C. Road, Pune</span>
                  </small>
                </a>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3 font-sans">
                  Crafting authentic luxury Indian handloom textiles and modern street silhouettes for over 33 years. Sourcing directly from generational master artisan clusters across all states of India.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors text-xs text-neutral-300"
                  >
                    <Instagram size={14} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-white transition-colors text-xs text-neutral-300"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Col 2: Flagship Store & Concierge (3 cols) */}
              <div className="lg:col-span-3 space-y-3">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] font-semibold text-[oklch(0.71_0.105_84)]">
                  Pune Flagship Studio
                </span>
                <address className="not-italic text-xs text-neutral-300 leading-relaxed space-y-2 font-sans">
                  <p>{STORE_INFO.address}</p>
                  <p className="text-neutral-400 pt-1">🕒 {STORE_INFO.hours}</p>
                  <p>
                    <a href={`tel:${STORE_INFO.phoneRaw}`} className="text-[oklch(0.71_0.105_84)] hover:underline">
                      📞 {STORE_INFO.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${STORE_INFO.email}`} className="text-neutral-400 hover:text-white transition-colors">
                      ✉️ {STORE_INFO.email}
                    </a>
                  </p>
                </address>
              </div>

              {/* Col 3: Signature Collections (2.5 cols) */}
              <div className="lg:col-span-2 space-y-3 font-sans">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] font-semibold text-[oklch(0.71_0.105_84)]">
                  Collections
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li>
                    <a href="https://poshakhfabrics.com/collections/the-pichwai-collection-wearable-heritage-divine-textile-art" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Pichwai Art
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/collections/the-kalamkari-collection-stories-woven-in-natural-ink" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Kalamkari Edit
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/collections/the-vanaspati-collection-pure-plant-dyed-sustainable-fabrics" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Vanaspati Dyes
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/collections/maternity-wear" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Maternity &amp; Nursing
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/collections/co-ord-sets" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Co-ord Sets
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/collections/buy2get1-sitewide" target="_blank" rel="noreferrer" className="text-[oklch(0.71_0.105_84)] hover:underline">
                      Buy 2 Get 1 Free
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 4: Client Care & Policies (2.5 cols) */}
              <div className="lg:col-span-3 space-y-3 font-sans">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] font-semibold text-[oklch(0.71_0.105_84)]">
                  Client Care &amp; Trust
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li>
                    <a href="https://poshakhfabrics.com/pages/size-chart" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Size Chart &amp; Fit Guide
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/policies/shipping-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Shipping Policy (1-2 Days)
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/policies/refund-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      7-Day Returns &amp; Exchange
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/pages/franchise-opportunities" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Franchise Opportunities (FOFO)
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/policies/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="https://poshakhfabrics.com/policies/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Sub-Footer: Legal & Trust Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.68rem] text-neutral-400">
              <p>© 2026 Poshakh Fabrics. Trade Name: Poshakh Fabrics. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-4 text-neutral-300">
                <span>✓ GoKwik 1-Click Checkout</span>
                <span>✓ Cash On Delivery</span>
                <span>✓ UPI &amp; Cards</span>
                <span>✓ Doorstep Exchange</span>
              </div>
            </div>

          </div>
        </footer>

        {/* Floating WhatsApp Concierge Action Button */}
        <a
          href={STORE_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-fab"
          aria-label="Chat with Poshakh Stylist Concierge on WhatsApp"
          title="Chat with Pune Stylist Concierge"
        >
          <MessageCircle size={24} />
        </a>

        {/* Back to top floating button - stacked above WhatsApp button */}
        {showBackToTop && (
          <button
            type="button"
            className="fixed bottom-24 right-7 z-50 h-11 w-11 rounded-full bg-[oklch(0.17_0.045_49)] text-[oklch(0.71_0.105_84)] border border-[oklch(0.71_0.105_84)]/40 shadow-xl flex items-center justify-center hover:bg-[oklch(0.5_0.18_31)] hover:text-white transition-all cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </main>
    </>
  );
}
