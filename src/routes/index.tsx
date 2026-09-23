import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  ArrowUpRight,
  Menu,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CanvasFrameScrubber } from "@/components/CanvasFrameScrubber";
import { HeritageThreadOverlay } from "@/components/HeritageThreadOverlay";
import { Preloader } from "@/components/Preloader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poshakh Fabrics — 33 Years of Indian Textile Craftsmanship" },
      {
        name: "description",
        content:
          "Experience Poshakh's 3D cinematic world of Pichwai prints, hand-drawn Kalamkari, Vanaspati plant dyes, and modern Indian silhouettes.",
      },
      { property: "og:title", content: "Poshakh Fabrics — The Art of Indian Textiles" },
      {
        property: "og:description",
        content:
          "33 years of fabric mastery from Pune to the world. Explore handwoven zari, Pichwai lotus prints, and custom-tailored ready-to-wear.",
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

const PICHWAI_FITS = [
  {
    id: "keyhole",
    tabLabel: "01 / Sage Keyhole Peplum",
    badge: "Gen-Z Viral · Street Bestseller",
    title: "Sage Green Cotton Keyhole Top",
    price: "Rs. 1,850.00",
    mrp: "Rs. 3,699.00",
    discount: "50% OFF",
    silhouette: "High Mandarin Collar · Teardrop Keyhole Cutout · Flared Peplum",
    printMotif: "Sacred Grove Miniature Palms & Temple Elephants",
    stylingTip: "Pair with relaxed light-wash denim, clean loafers, and chunky gold rings for an effortless Indo-Western street aesthetic.",
    image: "/media/photos/poshakh-halter-sage-grove.jpg",
    tags: ["Pure Organic Cotton", "The 1-Inch Margin Flex", "Breathable Day-to-Night"],
  },
  {
    id: "ajrakh",
    tabLabel: "02 / OG Black Ajrakh Kurti",
    badge: "Trending · Signature Silhouette",
    title: "Mirae Classic Kurti: The OG Black Ajrakh",
    price: "Rs. 1,654.00",
    mrp: "Rs. 2,899.00",
    discount: "43% OFF",
    silhouette: "Square Scoop Neckline · Floating Side Lace-Up Ties · High Slits",
    printMotif: "Hand-Block Ajrakh Geometric Booti & Indigo Star Clusters",
    stylingTip: "Pair with wide flared white trousers or tailored cycling shorts for a bold contemporary festival look.",
    image: "/media/photos/poshakh-halter-kalamkari.jpg",
    tags: ["Natural Indigo & Madder", "Adjustable Side Ties", "100% Breathable Silk-Cotton"],
  },
  {
    id: "halter",
    tabLabel: "03 / Pichwai Lotus Halter Tunic",
    badge: "Runway Edit · Limited Batch",
    title: "The Pichwai Lotus Halter Tunic",
    price: "Rs. 2,150.00",
    mrp: "Rs. 4,200.00",
    discount: "48% OFF",
    silhouette: "Backless Halter Silhouette · Flowing Dramatic Tunic Hem",
    printMotif: "Shrinathji Sacred Lotuses & Gold Dust Floral Canopy",
    stylingTip: "Pair with ivory wide-leg palazzo pants, sleek hair bun, and architectural brass ear cuffs for evening occasions.",
    image: "/media/photos/poshakh-halter-pichwai-maroon.jpg",
    tags: ["Gold Foil Luster Weave", "Deep Open-Back Tie", "1-Inch Custom Tailoring Reserve"],
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
  const [activePichwaiFit, setActivePichwaiFit] = useState<"keyhole" | "ajrakh" | "halter">("keyhole");
  const [activeDyeFibre, setActiveDyeFibre] = useState<"indigo" | "madder" | "turmeric">("indigo");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const currentFit = PICHWAI_FITS.find((f) => f.id === activePichwaiFit) ?? PICHWAI_FITS[0];

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
        className={`poshakh-site transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${showPreloader
            ? "scale-[1.03] filter blur-[2px] opacity-90 pointer-events-none"
            : "scale-100 filter blur-0 opacity-100"
          }`}
      >
        <div className="scroll-progress" aria-hidden="true" />

        {/* Global Header */}
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Poshakh home">
            <span>POSHAKH</span>
            <small>Fabrics · Est. 1996</small>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#top">3D Outfits</a>
            <a href="#pichwai">Pichwai</a>
            <a href="#atelier">Atelier</a>
            <a href="#zari">Zari Craft</a>
            <a href="#kalamkari">Collection</a>
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
            <a href="#top" onClick={() => setMenuOpen(false)}>3D Outfits</a>
            <a href="#pichwai" onClick={() => setMenuOpen(false)}>Pichwai Art</a>
            <a href="#atelier" onClick={() => setMenuOpen(false)}>The Atelier</a>
            <a href="#zari" onClick={() => setMenuOpen(false)}>Zari Weave</a>
            <a href="#kalamkari" onClick={() => setMenuOpen(false)}>Kalamkari Edit</a>
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
                  Founded in 1996 in Pune by Kavita & Rahul Awasthee. We cut out intermediaries and collaborate directly with master artisans across 14 craft clusters.
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
            <div className="space-y-8" data-reveal>
              {/* Pill Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.49_0.045_58)] mr-2">
                  Select Fit:
                </span>
                {PICHWAI_FITS.map((fit) => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => setActivePichwaiFit(fit.id)}
                    className={`pichwai-fit-pill ${activePichwaiFit === fit.id ? "active" : ""}`}
                  >
                    {fit.tabLabel}
                  </button>
                ))}
              </div>

              {/* Active Fit Spotlight Card */}
              <div className="rounded-3xl border border-[oklch(0.71_0.105_84)]/40 bg-[oklch(0.985_0.014_87)]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500">
                {/* Product Visual */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-lg border border-[oklch(0.71_0.105_84)]/30 aspect-[3/4] max-h-[500px]">
                  <img
                    key={currentFit.id}
                    src={currentFit.image}
                    alt={currentFit.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[0.65rem] tracking-[0.16em] uppercase font-semibold bg-[oklch(0.17_0.045_49)] text-[oklch(0.71_0.105_84)] backdrop-blur-md shadow">
                      {currentFit.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <a
                      href={SHOP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-[oklch(0.17_0.045_49)] hover:bg-[oklch(0.17_0.045_49)] hover:text-white transition-colors shadow"
                    >
                      Quick View <ArrowUpRight size={14} />
                    </a>
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
                      href={SHOP_URL}
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

            {/* 3D Motion Stage: pichwai-3d.mp4 */}
            <div className="space-y-6" data-reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[oklch(0.5_0.18_31)] font-semibold">
                    3D Movement Lab
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[oklch(0.17_0.045_49)] mt-1">
                    Watch the Silhouette in Motion
                  </h3>
                </div>
                <p className="text-xs text-[oklch(0.49_0.045_58)] max-w-xs">
                  Real garments tested for full movement, airflow, and open-back drape.
                </p>
              </div>

              <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[oklch(0.71_0.105_84)]/30 bg-black aspect-[16/9] max-h-[520px] group">
                <AmbientFilm
                  src="/media/videos/pichwai-3d.mp4"
                  poster="/media/photos/poshakh-halter-pichwai-maroon.jpg"
                  label="3D Slow camera rotation around model wearing Pichwai Lotus halter tunic"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                />
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
                {/* Card 1: Maroon Halter Runway */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30">
                  <img
                    src="/media/photos/poshakh-halter-pichwai-maroon.jpg"
                    alt="Model wearing Maroon Pichwai Halter Tunic"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        The Evening Cut
                      </span>
                      <p className="font-display text-xl mt-0.5">Pichwai Lotus Halter</p>
                      <p className="text-xs text-neutral-300">Rs. 2,150 · Paired with Ivory Flared Pants</p>
                    </div>
                    <a
                      href={SHOP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Card 2: Sage Grove Street Pairing */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30 md:translate-y-8">
                  <img
                    src="/media/photos/poshakh-halter-sage-grove.jpg"
                    alt="Model wearing Sage Green Keyhole Top with relaxed denim"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        Street Bestseller
                      </span>
                      <p className="font-display text-xl mt-0.5">Sage Green Keyhole Top</p>
                      <p className="text-xs text-neutral-300">Rs. 1,850 · Paired with Light-Wash Denim</p>
                    </div>
                    <a
                      href={SHOP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Card 3: OG Black Ajrakh Festival Pairing */}
                <div className="group relative rounded-3xl overflow-hidden shadow-xl border border-[oklch(0.71_0.105_84)]/30">
                  <img
                    src="/media/photos/poshakh-halter-kalamkari.jpg"
                    alt="Model wearing OG Black Ajrakh Side-Tie Kurti"
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.71_0.105_84)]">
                        Side-Tie Silhouette
                      </span>
                      <p className="font-display text-xl mt-0.5">Mirae OG Black Ajrakh</p>
                      <p className="text-xs text-neutral-300">Rs. 1,654 · Adjustable lace-up ties</p>
                    </div>
                    <a
                      href={SHOP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
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
                      The Pichwai Halter Tunic
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.71_0.105_84)] mt-1">
                      Textile: 100% Breathable Cotton Slub · Hand-Block Finished
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        index: "01",
                        title: "Mandarin Teardrop Keyhole",
                        desc: "High architectural neck balanced with an open teardrop cut to flatter collarbones.",
                      },
                      {
                        index: "02",
                        title: "Concealed French Seams",
                        desc: "Double-folded, completely encased seams that prevent any skin friction or thread fraying.",
                      },
                      {
                        index: "03",
                        title: "Bias-Cut Peplum Flare",
                        desc: "Precision diagonal grain cut that cascades fluidly over hips without ballooning.",
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

                <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-black">
                  <AmbientFilm
                    src="/media/videos/pichwai-3d.mp4"
                    label="Slow 3D rotation studying garment construction, neckline, and flared hem"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[0.65rem] tracking-[0.24em] uppercase text-[oklch(0.71_0.105_84)] font-semibold">
                        360° Construction View
                      </span>
                      <p className="font-display text-xl mt-0.5">Finished Garment on Form</p>
                    </div>
                    <a
                      href={SHOP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-[oklch(0.71_0.105_84)] transition-all shadow"
                    >
                      View Pattern Fit <ArrowUpRight size={14} />
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
              <div className="image-depth rounded-xl overflow-hidden">
                <img
                  src="/media/photos/poshakh-halter-kalamkari.jpg"
                  alt="Poshakh Earthy Kalamkari Halter Top in terracotta rust and indigo with blue jeans"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              <figcaption>
                <span>Earthy Kalamkari</span>
                <small>Halter Top / Terracotta & Indigo</small>
              </figcaption>
            </figure>

            <figure className="editorial-frame lotus-frame" data-reveal>
              <div className="image-depth rounded-xl overflow-hidden">
                <img
                  src="/media/photos/poshakh-halter-sage-grove.jpg"
                  alt="Poshakh Sacred-Grove Vanaspati Halter Top in sage green and gold Pichwai print with white trousers"
                  loading="lazy"
                  width={1600}
                  height={1104}
                />
              </div>
              <figcaption>
                <span>Sacred Grove Halter</span>
                <small>Vanaspati Sage / Temple Arches</small>
              </figcaption>
            </figure>

            <figure className="editorial-frame vermilion-frame" data-reveal>
              <div className="image-depth rounded-xl overflow-hidden">
                <img
                  src="/media/photos/poshakh-halter-pichwai-maroon.jpg"
                  alt="Poshakh The Pichwai Halter Top in maroon and black with sacred white cows and lotus flowers"
                  loading="lazy"
                  width={1280}
                  height={1600}
                />
              </div>
              <figcaption>
                <span>The Pichwai Tunic</span>
                <small>Maroon & Gold / Shrinathji Lotus</small>
              </figcaption>
            </figure>
          </div>

          <a className="editorial-link" href={SHOP_URL} target="_blank" rel="noreferrer" data-reveal>
            Explore All Poshakh Collections <ArrowUpRight size={18} />
          </a>
        </section>

        {/* =========================================================================
          CHAPTER 05: The Grand Finale & Store Entry
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

        {/* Footer */}
        <footer>
          <a className="wordmark footer-mark" href="#top">
            <span>POSHAKH</span>
            <small>Fabrics · Est. 1996</small>
          </a>
          <p>Indian textiles, imagined anew.</p>
          <div>
            <a href={SHOP_URL} target="_blank" rel="noreferrer">
              Shop Online
            </a>
            <a href="#pichwai">Pichwai</a>
            <a href="#atelier">Atelier</a>
            <a href="#kalamkari">Collection</a>
          </div>
        </footer>

        {/* Back to top floating button */}
        {showBackToTop && (
          <button
            type="button"
            className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-[oklch(0.17_0.045_49)] text-[oklch(0.71_0.105_84)] border border-[oklch(0.71_0.105_84)]/40 shadow-xl flex items-center justify-center hover:bg-[oklch(0.5_0.18_31)] hover:text-white transition-all cursor-pointer"
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
