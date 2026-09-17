import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import collectionReveal from "@/assets/collection-reveal.mp4.asset.json";
import collectionPoster from "@/assets/collection-reveal-poster.jpg.asset.json";
import editorialIndigo from "@/assets/editorial-indigo-arch.jpg";
import editorialLotus from "@/assets/editorial-lotus-court.jpg";
import editorialVermilion from "@/assets/editorial-vermilion-stair.jpg";
import heritagePassage from "@/assets/heritage-passage.mp4.asset.json";
import heritagePoster from "@/assets/heritage-passage-poster.jpg.asset.json";
import heroDreamscape from "@/assets/hero-dreamscape.mp4.asset.json";
import portrait from "@/assets/poshakh-saree-courtyard.png.asset.json";
import textileDetail from "@/assets/textile-detail.mp4.asset.json";
import textilePoster from "@/assets/textile-detail-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poshakh Fabrics — The Art of Indian Textiles" },
      {
        name: "description",
        content: "Enter Poshakh's cinematic world of Indian textiles, heritage prints and modern silhouettes.",
      },
      { property: "og:title", content: "Poshakh Fabrics — The Art of Indian Textiles" },
      {
        property: "og:description",
        content: "A cinematic journey through Indian textiles, heritage prints and modern silhouettes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PoshakhLanding,
});

const SHOP_URL = "https://poshakhfabrics.com/";

function Film({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  return (
    <video
      className={`film ${className}`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function PoshakhLanding() {
  const pageRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      page.style.setProperty("--scroll-progress", String(progress));
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
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const togglePlayback = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <main ref={pageRef} className="poshakh-site">
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Poshakh home">
          <span>POSHAKH</span>
          <small>Fabrics</small>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#collection">Collection</a>
          <a href="#craft">Craft</a>
        </nav>
        <div className="header-actions">
          <a className="visit-link" href={SHOP_URL} target="_blank" rel="noreferrer">
            Visit store <ArrowUpRight size={15} strokeWidth={1.6} />
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

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Craft</a>
          <a href={SHOP_URL} target="_blank" rel="noreferrer">Enter the store</a>
        </nav>
      )}

      <section id="top" className="hero" aria-labelledby="hero-title">
        <video
          ref={heroVideoRef}
          className="hero-film"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          poster={portrait.url}
          aria-label="Printed Poshakh fabric flowing through a palace dreamscape"
        >
          <source src={heroDreamscape.url} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">An odyssey in Indian textiles</p>
          <h1 id="hero-title">
            Cloth becomes
            <em>a living story.</em>
          </h1>
          <div className="hero-bottom">
            <p>Heritage reimagined through colour, movement and modern form.</p>
            <a className="circle-cta" href="#story" aria-label="Begin the journey">
              <span>Explore</span>
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <div className="film-controls" aria-label="Film controls">
          <button type="button" onClick={togglePlayback} aria-label={paused ? "Play film" : "Pause film"}>
            {paused ? <Play size={17} /> : <Pause size={17} />}
          </button>
          <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Mute film"}>
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
        <span className="vertical-note">Scroll to unfold</span>
      </section>

      <section id="story" className="manifesto section-pad">
        <div className="section-index">01 — The beginning</div>
        <div className="manifesto-grid" data-reveal>
          <p className="kicker">Born from tradition.<br />Made for now.</p>
          <h2>Every thread carries a memory. Every print opens a new world.</h2>
        </div>
        <div className="portal-stage" aria-hidden="true">
          <div className="portal-ring ring-a" />
          <div className="portal-ring ring-b" />
          <div className="portal-ring ring-c" />
          <span>POSHAKH · INDIA · TEXTILE · ART ·</span>
        </div>
      </section>

      <section className="textile-scene">
        <Film src={textileDetail.url} poster={textilePoster.url} label="Close view of a red lotus textile" />
        <div className="textile-overlay">
          <p>From pigment</p>
          <strong>to poetry</strong>
          <span>Texture you can almost touch</span>
        </div>
        <div className="weave-lines" aria-hidden="true" />
      </section>

      <section id="craft" className="craft section-pad">
        <div className="section-index">02 — Through the atelier</div>
        <div className="craft-stage" data-reveal>
          <div className="craft-copy">
            <p className="eyebrow dark">The passage of craft</p>
            <h2>Between loom<br />and light.</h2>
            <p className="body-copy">
              We travel through layers of hand, heritage and imagination—where familiar motifs find an entirely new rhythm.
            </p>
          </div>
          <div className="video-portal">
            <Film src={heritagePassage.url} poster={heritagePoster.url} label="Camera moving through hanging layers of fabric" />
            <div className="portal-frame" aria-hidden="true" />
          </div>
          <p className="side-caption">Material / Memory / Movement</p>
        </div>
      </section>

      <section className="portrait-story section-pad">
        <div className="portrait-wrap" data-reveal>
          <img src={portrait.url} alt="Woman wearing a floral Poshakh saree in a palace courtyard" loading="lazy" />
          <div className="portrait-halo" aria-hidden="true" />
        </div>
        <div className="portrait-copy" data-reveal>
          <span className="giant-number">03</span>
          <p className="eyebrow dark">The wearer enters the story</p>
          <h2>Not adorned.<br /><em>Transformed.</em></h2>
          <p className="body-copy">
            Silhouettes designed to move with you—expressive, effortless, and unmistakably rooted in India.
          </p>
          <a className="text-link" href={SHOP_URL} target="_blank" rel="noreferrer">
            Discover the edit <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="editorial-world section-pad" aria-labelledby="editorial-title">
        <div className="editorial-heading" data-reveal>
          <div className="section-index">04 — Worlds in print</div>
          <h2 id="editorial-title">Three moods.<br /><em>One language.</em></h2>
          <p>Botanical stories move from dawn to dusk, each silhouette carrying its own sense of place.</p>
        </div>
        <div className="editorial-gallery">
          <figure className="editorial-frame indigo-frame" data-reveal>
            <div className="image-depth">
              <img src={editorialIndigo} alt="Woman in an indigo and gold saree beside a palace reflecting pool" loading="lazy" width={1280} height={1600} />
            </div>
            <figcaption><span>After dusk</span><small>Indigo / Antique gold</small></figcaption>
          </figure>
          <figure className="editorial-frame lotus-frame" data-reveal>
            <div className="image-depth">
              <img src={editorialLotus} alt="Woman in an ivory floral kurta walking beside a lotus courtyard" loading="lazy" width={1600} height={1104} />
            </div>
            <figcaption><span>Garden light</span><small>Ivory / Lotus red</small></figcaption>
          </figure>
          <figure className="editorial-frame vermilion-frame" data-reveal>
            <div className="image-depth">
              <img src={editorialVermilion} alt="Woman in a vermilion printed ensemble on palace steps" loading="lazy" width={1280} height={1600} />
            </div>
            <figcaption><span>Sunlit form</span><small>Vermilion / Gold</small></figcaption>
          </figure>
        </div>
        <a className="editorial-link" href={SHOP_URL} target="_blank" rel="noreferrer" data-reveal>
          Explore the world of Poshakh <ArrowUpRight size={18} />
        </a>
      </section>

      <section id="collection" className="collection-reveal">
        <Film src={collectionReveal.url} poster={collectionPoster.url} label="Printed fabric ribbons forming a collection of kurtas" />
        <div className="collection-shade" />
        <div className="collection-copy">
          <p className="eyebrow">The collection unfolds</p>
          <h2>One fabric.<br /><em>Infinite forms.</em></h2>
          <a className="light-cta" href={SHOP_URL} target="_blank" rel="noreferrer">
            View all collections <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="marquee" aria-hidden="true">
          <div>PRINTED SUITS · SAREES · KURTAS · DRESS MATERIALS · PRINTED SUITS · SAREES · KURTAS · DRESS MATERIALS ·</div>
        </div>
      </section>

      <section className="finale section-pad">
        <div className="finale-ornament" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <p className="eyebrow dark">Your next story awaits</p>
        <h2>Wear the<br /><em>extraordinary.</em></h2>
        <a className="final-cta" href={SHOP_URL} target="_blank" rel="noreferrer">
          <span>Enter Poshakh</span><ArrowUpRight />
        </a>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top"><span>POSHAKH</span><small>Fabrics</small></a>
        <p>Indian textiles, imagined anew.</p>
        <div>
          <a href={SHOP_URL} target="_blank" rel="noreferrer">Shop</a>
          <a href="#story">Story</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
