/**
 * AddOnsSection Component
 * Photo Mini Studio service showcase with carousel and modal preview
 * 
 * Location: /src/app/sections/AddOnsSection.tsx
 * 
 * DEPENDENCIES SETUP - CHOOSE ONE:
 * 
 * Option A: Using existing packages (NO installation needed)
 * - react-router (already in package.json v7.13.0)
 * - motion (already in package.json v12.23.24)
 * 
 * Option B: Using framer-motion (Recommended - more established)
 * - Run: npm install framer-motion
 * - Use import below
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router"; // ✅ Using your installed react-router

// 🔄 CHOOSE ONE - Uncomment the one you want to use:
// import { motion, AnimatePresence } from "motion/react";  // ← Option A: Use existing motion package
import { motion, AnimatePresence } from "framer-motion"; // ← Option B: Use framer-motion (run: npm install framer-motion)

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IMAGES } from "../constants/images";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface StudioBackground {
  id: string;
  name: string;
  thumb: string;
  preview: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Studio background options for carousel
 * All images must be registered in /src/app/constants/images.ts
 */
const STUDIO_BACKGROUNDS: StudioBackground[] = [
  {
    id: "light-grey",
    name: "Light Grey",
    thumb: IMAGES.addOns.backgrounds.lightGrey.thumb,
    preview: IMAGES.addOns.backgrounds.lightGrey.preview,
  },
  {
    id: "black",
    name: "Black",
    thumb: IMAGES.addOns.backgrounds.black.thumb,
    preview: IMAGES.addOns.backgrounds.black.preview,
  },
  {
    id: "dark-green",
    name: "Dark Green",
    thumb: IMAGES.addOns.backgrounds.darkGreen.thumb,
    preview: IMAGES.addOns.backgrounds.darkGreen.preview,
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    thumb: IMAGES.addOns.backgrounds.skyBlue.thumb,
    preview: IMAGES.addOns.backgrounds.skyBlue.preview,
  },
  {
    id: "rust",
    name: "Rust",
    thumb: IMAGES.addOns.backgrounds.rust.thumb,
    preview: IMAGES.addOns.backgrounds.rust.preview,
  },
  {
    id: "teracota",
    name: "Teracota",
    thumb: IMAGES.addOns.backgrounds.teracota.thumb,
    preview: IMAGES.addOns.backgrounds.teracota.preview,
  },
];

/**
 * Hero grid images (first 4 images from hero grid)
 * All from /src/app/constants/images.ts
 */
const GRID_IMAGES = IMAGES.addOns.heroGrid.slice(0, 4);

/**
 * Feature list for hero section
 */
const HERO_FEATURES = [
  "1 Background Pilihan / Custom",
  "2-3 Jam Sesi Photo Studio",
  "1 Profesional Crew & Operator",
  "Set Mini Studio & Profesional studio lighting",
];

/**
 * Carousel animation configuration
 */
const CAROUSEL_CONFIG = {
  OFFSET_MULTIPLIER: 55,   // ⬇ Reduced: cards spread less so they don't bleed into left column
  SCALE_ADJACENT: 0.82,   // ⬇ Slightly smaller adjacent cards
  SCALE_FAR: 0.65,        // ⬇ Slightly smaller far cards
  OPACITY_FAR: 0.12,
  OPACITY_ADJACENT: 0.75,
};

const DEFAULT_CAROUSEL_INDEX = 3;
const MIN_SWIPE_DISTANCE = 50; // px

// ============================================================================
// COMPONENT
// ============================================================================

export function AddOnsSection() {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_CAROUSEL_INDEX);
  const [selectedPreview, setSelectedPreview] = useState<StudioBackground | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Ref to persist scroll position between renders — fixes "jump to top" bug
  const scrollYRef = useRef(0);

  // Mobile hero: auto-sliding background index
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * Handle body scroll lock when modal is open.
   *
   * WHY useRef instead of local variable:
   * A local variable inside useEffect is lost when the effect re-runs.
   * useRef persists the value across renders, so we can reliably restore
   * scroll position when the modal closes — preventing the "jump to hero" bug.
   *
   * Works on: Chrome, Firefox, Safari, iOS Safari.
   */
  useEffect(() => {
    if (selectedPreview) {
      // ── MODAL OPEN ──
      // 1. Capture current scroll position into ref (survives re-renders)
      scrollYRef.current = window.scrollY;

      // 2. Lock body in place at current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // ── MODAL CLOSE ──
      // Only restore if body was actually locked (has position: fixed)
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.body.style.width = "";

        // 3. Restore exact scroll position from ref — no jump!
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
      }
    }

    // Cleanup: safety net for unmount (e.g. navigating away while modal is open)
    return () => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.body.style.width = "";
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
      }
    };
  }, [selectedPreview]);

  /**
   * Handle keyboard navigation
   * - Arrow Left/Right: Navigate carousel
   * - Escape: Close modal
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPreview) {
        if (e.key === "ArrowLeft") {
          handlePrev();
        }
        if (e.key === "ArrowRight") {
          handleNext();
        }
      } else {
        if (e.key === "Escape") {
          setSelectedPreview(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPreview]);

  /**
   * Auto-slide for mobile hero background
   * Cycles through GRID_IMAGES every 3.5 seconds with a fade transition
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % GRID_IMAGES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === STUDIO_BACKGROUNDS.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? STUDIO_BACKGROUNDS.length - 1 : prev - 1
    );
  }, []);

  /**
   * Touch handlers for swipe gesture on mobile
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  // ========================================================================
  // PORTAL TARGET
  // ========================================================================

  const portalTarget =
    typeof document !== "undefined"
      ? document.getElementById("root") || document.body
      : null;

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <section id="add-ons" className="w-full bg-white flex flex-col relative z-10">
      {/* ===================================================================
          SECTION 1: HERO BANNER (BACKGROUND GRID + OVERLAY TEXT)
          =================================================================== */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-black">

        {/* =================================================================
            MOBILE BACKGROUND: Single full-width auto-fade slideshow
            Hidden on md+ screens
            ================================================================= */}
        <div className="absolute inset-0 md:hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={heroSlideIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <img
                src={GRID_IMAGES[heroSlideIndex]}
                alt={`Studio setup: ${HERO_FEATURES[heroSlideIndex]}`}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />
              {/* Darker overlay on mobile for better text contrast */}
              <div className="absolute inset-0 bg-black/55" />
            </motion.div>
          </AnimatePresence>

          {/* Slide indicator dots — mobile hero */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {GRID_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === heroSlideIndex
                    ? "bg-white w-6"
                    : "bg-white/40 w-1.5 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* =================================================================
            DESKTOP BACKGROUND: 4-column grid (unchanged)
            Hidden on mobile (md:grid)
            ================================================================= */}
        <div className="absolute inset-0 hidden md:grid grid-cols-4 h-full w-full">
          {GRID_IMAGES.map((imgUrl, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden">
              <img
                src={imgUrl}
                alt={`Studio setup: ${HERO_FEATURES[idx]}`}
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-12 left-0 w-full px-3 flex justify-center text-center">
                <span className="text-white/90 text-xs lg:text-sm font-medium tracking-widest uppercase drop-shadow-md leading-snug">
                  {HERO_FEATURES[idx]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Title & Description (floating above both backgrounds) */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto space-y-6">
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight drop-shadow-2xl">
            Photo Mini Studio
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Hadirkan suasana studio profesional ke dalam pesta pernikahanmu untuk
            hasil potret yang lebih personal dan elegan.
          </p>

          {/* Mobile: Feature list — only shown on mobile (desktop uses grid labels) */}
          <div className="md:hidden pt-6 mt-4 border-t border-white/20">
            <div className="flex flex-col justify-center items-center gap-3 text-center">
              {HERO_FEATURES.map((feature, index) => (
                <span
                  key={index}
                  className="text-white/90 text-xs font-medium tracking-widest uppercase drop-shadow-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          SECTION 2: INTERACTIVE CAROUSEL + TEXT
          =================================================================== */}
      <div className="w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="w-full px-6 py-12 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center max-w-7xl mx-auto">
          {/* Left Column: Heading & CTA — shifted left with less padding */}
          <div className="relative z-20 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1 lg:col-span-4 lg:pr-4">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#041e48] leading-[1.1]">
                Choose your Studio Background
              </h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                Pilih berbagai macam warna background untuk kenangan yang tak
                terlupakan
              </p>
            </div>
            <div className="pt-2 md:pt-4">
              <Link
                to="/portfolio?category=mini-studio"
                className="inline-block bg-[#041e48] text-white rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#1b355e] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#041e48]"
              >
                Show More Portfolio
              </Link>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div
            className="relative flex flex-col items-center justify-center order-1 lg:order-2 w-full lg:col-span-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-label="Studio background carousel"
          >
            {/* ── Cards + Arrow Buttons in one row ── */}
            <div className="relative w-full flex items-center justify-center">

              {/* Arrow LEFT — vertically centered with cards */}
              <button
                onClick={handlePrev}
                aria-label="Show previous studio background"
                className="relative z-30 flex-shrink-0 w-10 h-10 md:w-11 md:h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#041e48] hover:bg-white hover:scale-110 transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#041e48] focus:ring-offset-2"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Cards container */}
              <div className="relative w-full max-w-[200px] sm:max-w-[220px] md:max-w-[260px] h-[320px] md:h-[400px] flex items-center justify-center perspective-1000 mx-2 md:mx-4">
                <AnimatePresence mode="popLayout">
                  {STUDIO_BACKGROUNDS.map((bg, index) => {
                    let offset = index - currentIndex;
                    const total = STUDIO_BACKGROUNDS.length;

                    if (offset < -Math.floor(total / 2)) offset += total;
                    if (offset > Math.floor(total / 2)) offset -= total;

                    const isCenter = offset === 0;
                    const scale = isCenter
                      ? 1
                      : Math.abs(offset) === 1
                        ? CAROUSEL_CONFIG.SCALE_ADJACENT
                        : CAROUSEL_CONFIG.SCALE_FAR;
                    const xTranslate = offset * CAROUSEL_CONFIG.OFFSET_MULTIPLIER;
                    const zIndex = 10 - Math.abs(offset);
                    const opacity =
                      Math.abs(offset) > 2
                        ? 0
                        : Math.abs(offset) === 2
                          ? CAROUSEL_CONFIG.OPACITY_FAR
                          : isCenter
                            ? 1
                            : CAROUSEL_CONFIG.OPACITY_ADJACENT;

                    return (
                      <motion.div
                        key={bg.id}
                        animate={{ scale, x: `${xTranslate}%`, zIndex, opacity }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 25,
                        }}
                        onClick={() => isCenter && setSelectedPreview(bg)}
                        className={`absolute w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden border border-gray-200/50 bg-gray-100 will-change-transform ${
                          isCenter ? "cursor-pointer group" : "pointer-events-none"
                        }`}
                        role={isCenter ? "button" : undefined}
                        tabIndex={isCenter ? 0 : -1}
                        aria-label={isCenter ? `Preview ${bg.name} background` : undefined}
                        onKeyDown={(e) => {
                          if (isCenter && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            setSelectedPreview(bg);
                          }
                        }}
                      >
                        <img
                          src={bg.thumb}
                          alt={`${bg.name} studio background thumbnail`}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Hover overlay — center card only */}
                        {isCenter && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                            <span className="text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase border border-white/50 px-4 py-2 rounded-full bg-black/20 text-center">
                              Click for<br />Preview
                            </span>
                          </div>
                        )}

                        {/* Background name label */}
                        <div className="absolute bottom-5 w-full text-center pointer-events-none">
                          <span className="text-white text-xs sm:text-sm font-serif tracking-widest drop-shadow-md mix-blend-overlay">
                            {bg.name.toUpperCase()}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Arrow RIGHT — vertically centered with cards */}
              <button
                onClick={handleNext}
                aria-label="Show next studio background"
                className="relative z-30 flex-shrink-0 w-10 h-10 md:w-11 md:h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#041e48] hover:bg-white hover:scale-110 transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#041e48] focus:ring-offset-2"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* ── Indicator Dots — OUTSIDE cards row, below with safe spacing ──
                Positioned here (not inside card container) so it NEVER
                overlaps the text column on mobile. */}
            <div className="flex gap-2 mt-6 z-40">
              {STUDIO_BACKGROUNDS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to background ${idx + 1}`}
                  className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#041e48] ${
                    idx === currentIndex
                      ? "bg-[#041e48] w-6"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          SECTION 3: MODAL PREVIEW (PORTAL)
          =================================================================== */}
      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {selectedPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
                onClick={() => setSelectedPreview(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="preview-title"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPreview(null)}
                  aria-label="Close preview modal"
                  className="absolute top-6 right-6 md:top-10 md:right-10 z-[210] w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  <X size={24} />
                </button>

                {/* Modal Content */}
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                  }}
                  className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[780px] bg-white rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Preview Image — landscape 16:9 */}
                  <div className="w-full aspect-video overflow-hidden">
                    <img
                      src={selectedPreview.preview}
                      alt={`Full preview of ${selectedPreview.name} studio background`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Modal Footer — compact to keep modal height balanced */}
                  <div className="px-6 py-5 md:px-8 md:py-6 flex items-center justify-between bg-white">
                    <div className="text-left">
                      <p className="text-[#70161e] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-1">
                        Background Preview
                      </p>
                      <h3
                        id="preview-title"
                        className="text-xl md:text-2xl font-serif text-[#041e48]"
                      >
                        {selectedPreview.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedPreview(null)}
                      className="flex-shrink-0 bg-[#041e48] text-white px-5 md:px-7 py-2.5 md:py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-[#1b355e] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#041e48] focus:ring-offset-2"
                    >
                      Tutup
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalTarget
        )}
    </section>
  );
}