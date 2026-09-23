import { useEffect, useRef, useState } from "react";

interface HeritageThreadOverlayProps {
  /** Optional container element ref to bind scroll progress */
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function HeritageThreadOverlay({ containerRef }: HeritageThreadOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // SVG path length refs for exact scroll dashoffset animation
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const line3Ref = useRef<SVGPathElement>(null);
  const mobileLine1Ref = useRef<SVGPathElement>(null);
  const mobileLine2Ref = useRef<SVGPathElement>(null);

  const [lengths, setLengths] = useState({
    line1: 300,
    line2: 600,
    line3: 500,
    mLine1: 200,
    mLine2: 400,
  });

  // Media query & screen resize detection
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Measure path lengths on mount / mode change
  useEffect(() => {
    try {
      setLengths({
        line1: line1Ref.current?.getTotalLength() || 300,
        line2: line2Ref.current?.getTotalLength() || 600,
        line3: line3Ref.current?.getTotalLength() || 500,
        mLine1: mobileLine1Ref.current?.getTotalLength() || 200,
        mLine2: mobileLine2Ref.current?.getTotalLength() || 400,
      });
    } catch {
      // safe fallback lengths
    }
  }, [isMobile]);

  // Scroll position synchronization
  useEffect(() => {
    let animId: number | null = null;

    const handleScroll = () => {
      if (animId) return;
      animId = requestAnimationFrame(() => {
        animId = null;

        const container =
          containerRef?.current ||
          document.querySelector<HTMLElement>(".hero-spatial-container") ||
          document.getElementById("top");

        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;

        if (scrollable <= 0) return;

        const raw = -rect.top / scrollable;
        const clamped = Math.max(0, Math.min(1, raw));
        setProgress(clamped);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  const p = prefersReducedMotion ? 1 : progress;

  // ── Text Transition Logic ──────────────────────────────────────────────────
  // Opening: "Heritage, Reimagined." visible at start (1.0), slowly fades out between 10% and 40%
  const openingOpacity = prefersReducedMotion
    ? 1
    : p <= 0.10
    ? 1
    : p <= 0.40
    ? Math.max(0, 1 - (p - 0.10) / 0.30)
    : 0;

  // Final: "Tradition, in every turn." reveals after 75% (0.75 -> 0.90) in the exact lower-left spot
  const finalOpacity = prefersReducedMotion
    ? 1
    : p >= 0.75
    ? Math.min(1, (p - 0.75) / 0.15)
    : 0;

  // "Scroll to explore" indicator fades out rapidly during first 8%
  const exploreOpacity = prefersReducedMotion
    ? 0
    : Math.max(0, 1 - p / 0.08);

  // ── Thread Drawing Progress & Opacity Calculations ─────────────────────────
  // Line 1 (Left Horizontal Thread):
  // Initial: extends from left edge inward (p = 0 -> ~45% length visible).
  // Extends smoothly as p goes from 0.0 -> 0.50. Softly fades out after 0.55 as Line 3 takes over.
  const line1Draw = prefersReducedMotion
    ? 1
    : Math.min(1, 0.45 + p * 1.1);
  const line1Opacity = prefersReducedMotion
    ? 0.4
    : p < 0.50
    ? 0.42
    : Math.max(0, 0.42 - (p - 0.50) / 0.20 * 0.42);

  // Line 2 (Incomplete Elliptical Curve framing lower-right / flank):
  // Initial: soft partial curve visible from start (~35% length).
  // Extends upward along right periphery from p = 0.05 -> 0.85.
  const line2Draw = prefersReducedMotion
    ? 1
    : Math.min(1, 0.35 + p * 0.85);
  const line2Opacity = prefersReducedMotion
    ? 0.4
    : p < 0.85
    ? 0.40
    : Math.max(0.15, 0.40 - (p - 0.85) / 0.15 * 0.25);

  // Line 3 (Horizontal thread passing behind model at upper torso):
  // Appears around p = 0.35 as Line 1 fades out, maintaining visual calm (never > 3 lines).
  const line3Progress = prefersReducedMotion
    ? 1
    : Math.max(0, Math.min(1, (p - 0.35) / 0.45));
  const line3Opacity = prefersReducedMotion
    ? 0.38
    : p < 0.35
    ? 0
    : p < 0.75
    ? Math.min(0.40, (p - 0.35) / 0.10 * 0.40)
    : Math.max(0.2, 0.40 - (p - 0.75) / 0.25 * 0.20);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Antique-Gold Threads SVG with Model Silhouette Mask ────────────── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle antique-gold thread gradient with soft woven luminosity */}
          <linearGradient id="antiqueGoldStrand" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.71 0.105 84)" stopOpacity="0.32" />
            <stop offset="50%" stopColor="oklch(0.75 0.115 86)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.71 0.105 84)" stopOpacity="0.35" />
          </linearGradient>

          {/* Model Silhouette Mask:
              Black elliptical column guarantees lines physically vanish behind her body,
              leaving her face, torso, and outfit 100% untouched and clear. */}
          <mask id="modelSilhouetteVoid">
            <rect width="1000" height="1000" fill="white" />
            <ellipse cx="500" cy="520" rx="145" ry="440" fill="black" />
          </mask>
        </defs>

        {isMobile ? (
          /* Mobile View: Exactly 2 restrained lines */
          <g mask="url(#modelSilhouetteVoid)">
            {/* 1. Short horizontal line extending from left edge */}
            <path
              ref={mobileLine1Ref}
              d="M 0,680 L 320,680"
              stroke="url(#antiqueGoldStrand)"
              strokeWidth="1.1"
              strokeDasharray={lengths.mLine1}
              strokeDashoffset={lengths.mLine1 * (1 - Math.min(1, 0.4 + p * 0.8))}
              opacity={line1Opacity}
            />
            {/* 2. Partial curve behind upper flank */}
            <path
              ref={mobileLine2Ref}
              d="M 680,680 C 820,660 920,520 860,340"
              stroke="url(#antiqueGoldStrand)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray={lengths.mLine2}
              strokeDashoffset={lengths.mLine2 * (1 - Math.min(1, 0.35 + p * 0.75))}
              opacity={line2Opacity}
            />
          </g>
        ) : (
          /* Desktop View: Connected strands of fabric thread framing the model */
          <g mask="url(#modelSilhouetteVoid)">
            {/* LINE 1: Left Horizontal Thread extending inward */}
            <path
              ref={line1Ref}
              d="M 0,660 L 375,660"
              stroke="url(#antiqueGoldStrand)"
              strokeWidth="1"
              strokeDasharray={lengths.line1}
              strokeDashoffset={lengths.line1 * (1 - line1Draw)}
              opacity={line1Opacity}
            />

            {/* LINE 2: Large incomplete elliptical curve framing the right silhouette & lower-right */}
            <path
              ref={line2Ref}
              d={`
                M 630,760
                C 740,790 850,780 890,700
                C 940,600 930,420 880,310
                c -8,-16 -12,-30 4,-24
                c 12,5 4,22 -8,18
                C 810,210 710,140 610,110
              `}
              stroke="url(#antiqueGoldStrand)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={lengths.line2}
              strokeDashoffset={lengths.line2 * (1 - line2Draw)}
              opacity={line2Opacity}
            />

            {/* LINE 3: Horizontal thread traveling behind model at upper torso */}
            <path
              ref={line3Ref}
              d="M 180,370 L 840,370"
              stroke="url(#antiqueGoldStrand)"
              strokeWidth="1"
              strokeDasharray={lengths.line3}
              strokeDashoffset={lengths.line3 * (1 - line3Progress)}
              opacity={line3Opacity}
            />

            {/* Thread Knot Details (2-3 tiny 1.5px antique-gold knots along the sequence) */}
            {/* Knot 1: Left thread transition knot */}
            {line1Draw > 0.45 && line1Opacity > 0.1 && (
              <circle
                cx="170"
                cy="660"
                r="1.5"
                fill="oklch(0.71 0.105 84)"
                opacity={line1Opacity * 1.4}
              />
            )}

            {/* Knot 2: Lower-right subtle craft knot */}
            {line2Draw > 0.35 && line2Opacity > 0.1 && (
              <circle
                cx="890"
                cy="700"
                r="1.5"
                fill="oklch(0.71 0.105 84)"
                opacity={line2Opacity * 1.4}
              />
            )}

            {/* Knot 3: Right upper flank knot near textile border curve */}
            {line2Draw > 0.70 && line2Opacity > 0.1 && (
              <circle
                cx="880"
                cy="310"
                r="1.5"
                fill="oklch(0.71 0.105 84)"
                opacity={line2Opacity * 1.4}
              />
            )}
          </g>
        )}
      </svg>

      {/* ── LOWER-LEFT TEXT AREA (Same tranquil anchor position) ─────────── */}
      <div
        className={`absolute pointer-events-none transition-transform duration-700 ease-out ${
          isMobile
            ? "bottom-16 inset-x-0 text-center px-6"
            : "bottom-14 left-10 md:bottom-16 md:left-16 text-left max-w-sm"
        }`}
      >
        {/* INITIAL VIEW: "Heritage, Reimagined." (Fades out between 10% and 40%) */}
        <div
          className="transition-opacity duration-500 ease-out"
          style={{
            opacity: openingOpacity,
            display: openingOpacity === 0 ? "none" : "block",
          }}
        >
          <span className="block mb-2 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-[oklch(0.71_0.105_84)]/75 font-medium">
            POSHAKH / 2026
          </span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-[oklch(0.96_0.025_83)] font-normal tracking-wide leading-tight">
            Heritage, Reimagined.
          </h1>
        </div>

        {/* FINAL VIEW: "Tradition, in every turn." (Reveals after 75%) */}
        <div
          className="transition-opacity duration-700 ease-out"
          style={{
            opacity: finalOpacity,
            display: finalOpacity === 0 ? "none" : "block",
          }}
        >
          <span className="block mb-2 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-[oklch(0.71_0.105_84)]/75 font-medium">
            POSHAKH / 2026
          </span>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-[oklch(0.96_0.025_83)] font-normal tracking-wide italic leading-tight">
            Tradition, in every turn.
          </p>
        </div>
      </div>

      {/* ── BOTTOM-RIGHT: Minimal "Scroll to explore" (Fades out in first 8%) ── */}
      <div
        className="absolute bottom-10 right-8 md:bottom-14 md:right-16 flex items-center gap-2.5 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: exploreOpacity }}
      >
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.28em] text-[oklch(0.96_0.025_83)]/60">
          Scroll to explore
        </span>
        <span className="h-1 w-1 rounded-full bg-[oklch(0.71_0.105_84)] opacity-70" />
      </div>
    </div>
  );
}
