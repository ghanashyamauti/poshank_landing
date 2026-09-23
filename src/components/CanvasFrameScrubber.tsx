import { useEffect, useRef, useState, type ReactNode } from "react";

interface CanvasFrameScrubberProps {
  framesPath: string;
  frameCount: number;
  fileNamePrefix?: string;
  fileExt?: string;
  digits?: number;
  trackHeight?: string; // e.g. "220vh"
  className?: string;
  overlay?: ReactNode;
  onFrameUpdate?: (progress: number, currentFrame: number) => void;
}

export function CanvasFrameScrubber({
  framesPath,
  frameCount,
  fileNamePrefix = "frame_",
  fileExt = ".webp",
  digits = 3,
  trackHeight = "220vh",
  className = "",
  overlay,
  onFrameUpdate,
}: CanvasFrameScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Preload frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    loadedCountRef.current = 0;

    const getFrameUrl = (index: number) => {
      const numStr = String(index).padStart(digits, "0");
      return `${framesPath}/${fileNamePrefix}${numStr}${fileExt}`;
    };

    // Priority load first 12 frames, then rest
    const priorityCount = Math.min(15, frameCount);
    let loadedPriority = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isMounted) return;
        loadedCountRef.current++;
        setLoadPercent(Math.round((loadedCountRef.current / frameCount) * 100));

        if (i < priorityCount) {
          loadedPriority++;
          if (loadedPriority >= priorityCount && !isReady) {
            setIsReady(true);
          }
        }
        if (loadedCountRef.current === frameCount) {
          setIsReady(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [framesPath, frameCount, fileNamePrefix, fileExt, digits]);

  // Render loop with lerp smoothing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Cover math
      const imgRatio = imgW / imgH;
      const screenRatio = w / h;

      let renderW: number;
      let renderH: number;
      let offsetX = 0;
      let offsetY = 0;

      if (screenRatio > imgRatio) {
        renderW = w;
        renderH = w / imgRatio;
        offsetY = (h - renderH) / 2;
      } else {
        renderH = h;
        renderW = h * imgRatio;
        offsetX = (w - renderW) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    const render = () => {
      // Lerp target to current frame for liquid smooth inertia
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(currentFrameRef.current)));
      drawFrame(clamped);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [frameCount, isReady]);

  // Scroll listener tracking position within container
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Calculate progress from 0 (container top at viewport top) to 1 (container bottom at viewport bottom)
      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      targetFrameRef.current = progress * (frameCount - 1);

      if (onFrameUpdate) {
        onFrameUpdate(progress, Math.round(targetFrameRef.current));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount, onFrameUpdate]);

  return (
    <div
      ref={containerRef}
      className={`frame-scrubber-track relative ${className}`}
      style={{ height: trackHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full object-cover"
        />

        {/* Loading Indicator */}
        {!isReady && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[oklch(0.135_0.035_49)] text-[oklch(0.71_0.105_84)]">
            <div className="relative mb-4 h-12 w-12 animate-spin rounded-full border border-t-transparent border-[oklch(0.71_0.105_84)]" />
            <span className="font-display text-sm tracking-[0.25em] uppercase">
              Preparing 3D Spatial Experience ({loadPercent}%)
            </span>
          </div>
        )}

        {/* Sticky Overlay Content */}
        {overlay && <div className="pointer-events-none relative z-20 h-full w-full">{overlay}</div>}
      </div>
    </div>
  );
}
