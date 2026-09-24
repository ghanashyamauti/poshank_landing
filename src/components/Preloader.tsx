import { useEffect, useRef, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCoverScale, setMobileCoverScale] = useState(3.5);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Detect mobile vs desktop explicitly
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);

      if (mobile) {
        // Video is 16/9. In object-contain, video height is w * 9/16.
        // Scale needed to cover full phone height h is h / (w * 9/16)
        const scale = h / (w * (9 / 16));
        setMobileCoverScale(Math.max(1.1, Number(scale.toFixed(2))));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Imperatively ensure video is muted and plays immediately
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.log("Autoplay deferral:", err);
        });
      }
    }
  }, []);

  // Fallback: auto exit after 8.5 seconds in case of slow playback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      triggerExit();
    }, 8500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Keyboard shortcut: Press Escape or Space to skip instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleInstantSkip(e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Trigger mobile zoom out when POSHAKH name appears (~3.8s)
    if (video.currentTime >= 3.8 && !isZoomedOut) {
      setIsZoomedOut(true);
    }

    // Trigger exit transition slightly before video ends for seamless flow
    if (video.currentTime >= video.duration - 0.3 && !isExiting) {
      triggerExit();
    }
  };

  // Natural exit when video ends or times out (smooth fade)
  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);

    setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 350);
  };

  // Instant skip: bypasses all transitions immediately (0ms delay)
  const handleInstantSkip = (e?: React.SyntheticEvent | KeyboardEvent | Event) => {
    if (e && "stopPropagation" in e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {}
    }
    setIsFinished(true);
    onComplete();
  };

  if (isFinished) return null;

  return (
    <div
      onClick={handleInstantSkip}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[oklch(0.11_0.03_45)] cursor-pointer select-none transition-all duration-300 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="Poshakh brand prelude (Click to enter)"
    >
      {/* Mobile Ambient Motion Fill (Only active on mobile when zooming out) */}
      {isMobile && (
        <video
          src="/media/videos/preloader-logo.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover filter blur-3xl scale-110 pointer-events-none transition-opacity duration-1000 ${
            isZoomedOut ? "opacity-50" : "opacity-0"
          }`}
        />
      )}

      {/* Main Video: Desktop is 100% full screen object-cover as it is; Mobile uses dynamic smooth zoom-out */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/media/videos/preloader-logo.mp4"
          poster="/media/preloader-poster.webp"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={triggerExit}
          style={
            isMobile
              ? {
                  transform: isZoomedOut
                    ? "scale(1)"
                    : `scale(${mobileCoverScale})`,
                }
              : undefined
          }
          className={
            isMobile
              ? "w-full h-full object-contain transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              : "w-full h-full object-cover"
          }
        />
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.03_45)]/80 via-transparent to-[oklch(0.11_0.03_45)]/60 pointer-events-none" />

      {/* Golden Shutter Beam (Flashes when curtain parts) */}
      <div
        className={`absolute inset-y-0 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 pointer-events-none ${
          isExiting
            ? "w-1 opacity-100 shadow-[0_0_100px_35px_rgba(212,175,55,1)] bg-[oklch(0.9_0.16_88)] scale-y-110"
            : "w-0 opacity-0 bg-transparent"
        }`}
      />

      {/* Minimal Top Brand Watermark */}
      <div className="relative z-20 flex w-full max-w-6xl mx-auto items-center justify-between p-6 md:p-12 text-[oklch(0.71_0.105_84)] pointer-events-none">
        <div className="inline-flex items-center gap-3">
          <img
            src="/media/brand/poshakh-logo.png"
            alt="Poshakh"
            className="h-8 md:h-9 w-auto object-contain brightness-125 drop-shadow-md"
          />
          <span className="text-[0.68rem] uppercase tracking-[0.25em] font-medium text-[oklch(0.71_0.105_84)] border-l border-[oklch(0.71_0.105_84)]/40 pl-3">
            Est. 1992 · F.C. Road, Pune
          </span>
        </div>
      </div>

      {/* Instant Skip Button at Right Bottom Corner */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={handleInstantSkip}
          onPointerDown={handleInstantSkip}
          onTouchStart={handleInstantSkip}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[oklch(0.71_0.105_84)]/45 bg-black/75 hover:bg-black/95 active:scale-95 hover:border-[oklch(0.71_0.105_84)] text-[oklch(0.96_0.025_83)] hover:text-white backdrop-blur-md transition-all text-[0.66rem] uppercase tracking-[0.22em] font-medium cursor-pointer shadow-lg group select-none"
          aria-label="Skip intro video instantly"
        >
          <span>Skip</span>
          <span className="text-[oklch(0.71_0.105_84)] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
}
