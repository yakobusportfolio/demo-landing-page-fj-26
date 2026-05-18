/**
 * PhotoScanBarcodeStorySection — Redesigned & Bug-Fixed
 * Location: /src/app/sections/PhotoScanBarcodeStorySection.tsx
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Download,
  Frame as FrameIcon,
  Share2,
  Users,
  Cloud,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { IMAGES } from "../constants/images";

// ============================================================================
// TYPES
// ============================================================================

interface FrameCard {
  id: number;
  type: "frame";
  name: string;
  image: string;
  desc: string;
  tag?: string;
}

interface CtaCard {
  id: number;
  type: "cta";
  name: string;
  desc: string;
}

// ============================================================================
// DATA
// ============================================================================

const FRAME_CARDS: FrameCard[] = [
  {
    id: 1,
    type: "frame",
    name: "Classic Navy",
    image: IMAGES.addOns.templates.navy,
    desc: "Branding elegan dengan sentuhan navy premium.",
    tag: "Frame",
  },
  {
    id: 2,
    type: "frame",
    name: "Modern Minimal",
    image: IMAGES.addOns.templates.white,
    desc: "Frame putih bersih dengan desain garis simpel.",
    tag: "Frame",
  },
  {
    id: 3,
    type: "frame",
    name: "Navy Banner",
    image: IMAGES.addOns.templates.navyBanner,
    desc: "Banner navy eksklusif lengkap dengan QR code.",
    tag: "Banner",
  },
  {
    id: 4,
    type: "frame",
    name: "White Minimal",
    image: IMAGES.addOns.templates.whiteBanner,
    desc: "Overlay putih rapi yang menonjolkan foto.",
    tag: "Banner",
  },
];

// CTA card — rendered separately for desktop (grid) vs mobile (ghost button)
const CTA_CARD: CtaCard = {
  id: 5,
  type: "cta",
  name: "Custom Frame?",
  desc: "Punya konsep warna atau tema sendiri? Kami buatkan khusus untukmu!",
};

const BENEFITS = [
  { icon: <Download size={16} />, title: "Download Foto Instan" },
  { icon: <FrameIcon size={16} />, title: "Frame Foto Elegan" },
  { icon: <Share2 size={16} />, title: "Siap Pamer di Sosmed" },
  { icon: <Users size={16} />, title: "Akses Tanpa Batas" },
  { icon: <Cloud size={16} />, title: "Galeri Cloud 30 Hari" },
];

const HERO_GRID_PHOTOS = [0, 1, 2, 3].map(
  (i) => IMAGES.scanBarcode.placeholderPhotos[i]
);

// ============================================================================
// COMPONENT
// ============================================================================

export function PhotoScanBarcodeStorySection() {
  const [activeFrameId, setActiveFrameId]   = useState<number>(1);
  const [photoIndex, setPhotoIndex]         = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [modalFrame, setModalFrame]         = useState<FrameCard | null>(null);
  const [ctaHovered, setCtaHovered]         = useState(false);

  // Swipe state for live-preview touch gesture
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd]     = useState<number | null>(null);

  const scrollYRef = useRef(0);
  const photos     = IMAGES.scanBarcode.placeholderPhotos;
  const activeFrame = FRAME_CARDS.find((f) => f.id === activeFrameId) ?? FRAME_CARDS[0];

  // ── Auto-slide photo behind frame every 3 s ──────────────────────────────
  useEffect(() => {
    const t = setInterval(
      () => setPhotoIndex((p) => (p + 1) % photos.length),
      3000
    );
    return () => clearInterval(t);
  }, [photos.length]);

  // ── Auto-slide mobile hero every 3.5 s ───────────────────────────────────
  useEffect(() => {
    const t = setInterval(
      () => setHeroSlideIndex((p) => (p + 1) % HERO_GRID_PHOTOS.length),
      3500
    );
    return () => clearInterval(t);
  }, []);

  // ── Scroll lock — useRef trick so modal close never jumps to top ─────────
  useEffect(() => {
    if (modalFrame) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top      = `-${scrollYRef.current}px`;
      document.body.style.left     = "0";
      document.body.style.right    = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width    = "100%";
    } else {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top      = "";
        document.body.style.left     = "";
        document.body.style.right    = "";
        document.body.style.overflow = "";
        document.body.style.width    = "";
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
      }
    }
    return () => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top      = "";
        document.body.style.left     = "";
        document.body.style.right    = "";
        document.body.style.overflow = "";
        document.body.style.width    = "";
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
      }
    };
  }, [modalFrame]);

  // ── Keyboard ESC → close modal ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalFrame(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Frame navigation ──────────────────────────────────────────────────────
  const goNextFrame = useCallback(() => {
    setActiveFrameId((id) => {
      const idx = FRAME_CARDS.findIndex((f) => f.id === id);
      return FRAME_CARDS[(idx + 1) % FRAME_CARDS.length].id;
    });
  }, []);

  const goPrevFrame = useCallback(() => {
    setActiveFrameId((id) => {
      const idx = FRAME_CARDS.findIndex((f) => f.id === id);
      return FRAME_CARDS[(idx - 1 + FRAME_CARDS.length) % FRAME_CARDS.length].id;
    });
  }, []);

  // ── Touch swipe on live-preview (only, not on ghost button) ──────────────
  const onPreviewTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onPreviewTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const onPreviewTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) goNextFrame();
    if (dist < -50) goPrevFrame();
  };

  const portalTarget =
    typeof document !== "undefined" ? document.body : null;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <section
      id="scan-barcode"
      className="w-full bg-white flex flex-col relative z-10"
    >
      {/* =====================================================================
          HERO BANNER
          Mobile: single auto-fade | Desktop: 4-column grid
          ===================================================================== */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black py-20">

        {/* Mobile background */}
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
                src={HERO_GRID_PHOTOS[heroSlideIndex]}
                alt="Photo Scan Barcode"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/65" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {HERO_GRID_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlideIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === heroSlideIndex ? "bg-white w-6" : "bg-white/40 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop background */}
        <div className="absolute inset-0 hidden md:grid grid-cols-4 h-full w-full">
          {HERO_GRID_PHOTOS.map((imgUrl, idx) => (
            <div key={idx} className="relative overflow-hidden">
              <img
                src={imgUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight drop-shadow-lg">
            Photo Scan Barcode{" "}
            <br className="hidden sm:inline" />
            <span className="italic font-light">Experience</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Beri kemudahan bagi tamu undangan untuk mengakses, mengunduh, dan
            membagikan foto momen perayaan Anda secara instan.
          </p>
          <div className="flex flex-col items-center gap-3 border-t border-white/20 pt-8 w-full max-w-md">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 w-full justify-center sm:justify-start sm:pl-6"
              >
                <span className="text-[#c8b89a] shrink-0">{b.icon}</span>
                <span className="text-white/95 text-xs md:text-sm font-medium tracking-widest uppercase">
                  {b.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE SECTION
          Left: heading + live preview  |  Right: frame selector grid
          ===================================================================== */}
      <div className="w-full flex items-center justify-center bg-gray-50/40 py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* LEFT column */}
          <div className="lg:col-span-6 flex flex-col gap-8 order-2 lg:order-1">

            {/* Heading */}
            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#041e48] leading-[1.1]">
                Koleksi Desain Frame
              </h3>
              <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                Pilih watermark banner atau bingkai cetak eksklusif untuk
                menyempurnakan setiap dokumentasi tamu undangan.
              </p>
            </div>

            {/* Live Preview */}
            <div
              className="relative w-full max-w-sm mx-auto lg:mx-0 select-none"
              onTouchStart={onPreviewTouchStart}
              onTouchMove={onPreviewTouchMove}
              onTouchEnd={onPreviewTouchEnd}
            >
              {/* Badge + arrows row */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#041e48] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {activeFrame.tag ?? "Frame"}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeFrame.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-serif text-[#041e48] font-semibold"
                    >
                      {activeFrame.name}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={goPrevFrame}
                    aria-label="Previous frame"
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#041e48] hover:bg-[#041e48] hover:text-white hover:border-[#041e48] transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={goNextFrame}
                    aria-label="Next frame"
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#041e48] hover:bg-[#041e48] hover:text-white hover:border-[#041e48] transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Preview card — photo + frame overlay, 3:2 ratio, object-fill */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                onClick={() => setModalFrame(activeFrame)}
                className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-gray-100 group ring-2 ring-transparent hover:ring-[#041e48]/20 transition-all duration-300"
                role="button"
                aria-label={`Open full preview of ${activeFrame.name}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setModalFrame(activeFrame);
                  }
                }}
              >
                {/* Layer 1: auto-sliding photo */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photoIndex}
                    src={photos[photoIndex]}
                    alt="Preview foto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Layer 2: frame overlay — object-fill for exact 3:2 match */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFrame.id}
                    src={activeFrame.image}
                    alt={activeFrame.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full object-fill z-10 pointer-events-none"
                  />
                </AnimatePresence>

                {/* Hover hint */}
                <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[1px]">
                  <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-white/50 px-4 py-2 rounded-full bg-black/20">
                    Lihat Penuh
                  </span>
                </div>
              </motion.div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {FRAME_CARDS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFrameId(f.id)}
                    aria-label={`Select ${f.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                      f.id === activeFrameId
                        ? "bg-[#041e48] w-6"
                        : "bg-gray-300 w-1.5 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Swipe hint — mobile only */}
              <p className="md:hidden text-center text-[10px] text-gray-400 mt-2 tracking-widest uppercase">
                Geser untuk ganti frame
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <Link
                to="/portfolio?category=scan-barcode"
                className="inline-block bg-[#041e48] text-white rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1b355e] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#041e48]"
              >
                Show More Portfolio
              </Link>

              {/*
                Mobile-only ghost button — FIX Bug 2 & 5:
                onMouseEnter/Leave for desktop hover,
                separate pointer-based approach avoids conflict
                with parent swipe touch handlers.
              */}
              <a
                href="https://wa.me/6282111334334"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                onPointerDown={() => setCtaHovered(true)}
                onPointerUp={() => setCtaHovered(false)}
                onPointerLeave={() => setCtaHovered(false)}
                className="lg:hidden inline-flex items-center gap-2 border border-[#041e48]/30 text-[#041e48] rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-[#041e48] hover:bg-[#041e48]/5 transition-all active:scale-95 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ctaHovered ? "ask" : "want"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="whitespace-nowrap"
                  >
                    {ctaHovered ? "Ask Admin Now!" : "Want a Custom Frame? →"}
                  </motion.span>
                </AnimatePresence>
              </a>
            </div>
          </div>

          {/* RIGHT column — frame selector grid */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 text-center lg:text-left">
              Pilih Desain Frame
            </p>
            <div className="grid grid-cols-2 gap-4">

              {/* Frame thumbnail cards — FIX Bug 1: key on outermost map return */}
              {FRAME_CARDS.map((card) => {
                const isWhiteFrame =
                  card.name.toLowerCase().includes("white") ||
                  card.name.toLowerCase().includes("minimal");
                const isActive = activeFrameId === card.id;

                return (
                  // Outer wrapper holds key + stacks thumbnail above name label
                  <div key={card.id} className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveFrameId(card.id)}
                      className={`relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md transition-all duration-300 focus:outline-none ${
                        isWhiteFrame ? "bg-gray-200" : "bg-gray-100"
                      } ${
                        isActive
                          ? "ring-2 ring-[#041e48] ring-offset-2 scale-[1.02] shadow-xl"
                          : `ring-1 ${isWhiteFrame ? "ring-gray-300" : "ring-gray-200"} hover:ring-[#041e48]/40 hover:-translate-y-1 hover:shadow-lg`
                      }`}
                      aria-label={`Select ${card.name}`}
                      aria-pressed={isActive}
                    >
                      {/* Frame PNG only — clean, no overlay text */}
                      <img
                        src={card.image}
                        alt={card.name}
                        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                      />

                      {/* Active checkmark badge */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 z-20 w-6 h-6 bg-[#041e48] rounded-full flex items-center justify-center shadow-md"
                        >
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </button>

                    {/* Name label — outside card, below thumbnail */}
                    <p className={`text-center text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#041e48]" : "text-gray-400"
                    }`}>
                      {card.name}
                    </p>
                  </div>
                );
              })}

              {/* Desktop-only CTA card — full-width below 4 thumbnails */}
              <div className="hidden lg:flex col-span-2 relative rounded-2xl overflow-hidden bg-[#041e48] shadow-lg p-5 items-center justify-between gap-6 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Sparkles size={22} className="text-white/70 shrink-0" />
                  <div>
                    <h4 className="text-white font-serif text-lg leading-tight">
                      {CTA_CARD.name}
                    </h4>
                    <p className="text-white/55 text-xs font-light mt-0.5">
                      {CTA_CARD.desc}
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/6282111334334"
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 px-5 py-2.5 bg-white text-[#041e48] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-md active:scale-95 whitespace-nowrap"
                >
                  Tanya Admin
                </a>
                <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL — Full Preview Lightbox (portal to document.body)
          ===================================================================== */}
      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {modalFrame && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
                onClick={() => setModalFrame(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-frame-title"
              >
                {/* Close */}
                <button
                  onClick={() => setModalFrame(null)}
                  aria-label="Close preview"
                  className="absolute top-5 right-5 md:top-8 md:right-8 z-[310] w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <X size={22} />
                </button>

                <motion.div
                  initial={{ scale: 0.94, y: 24 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.94, y: 24 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  className="w-full max-w-[900px] bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Photo + frame composite — strict 3:2, object-fill on frame */}
                  <div className="w-full md:w-[60%] bg-gray-900 flex items-center justify-center p-4 md:p-6">
                    <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-xl">
                      {/* Layer 1: photo */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={photoIndex}
                          src={photos[photoIndex]}
                          alt="Preview foto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {/* Layer 2: frame/banner PNG — object-fill = perfect 3:2 match */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={modalFrame.id}
                          src={modalFrame.image}
                          alt={modalFrame.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                        />
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="w-full md:w-[40%] p-7 md:p-10 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
                    <div className="space-y-5">
                      <div>
                        <p className="text-[#70161e] text-[9px] font-bold uppercase tracking-[0.4em] mb-1.5">
                          Frame/Banner Detail
                        </p>
                        <h3
                          id="modal-frame-title"
                          className="text-2xl md:text-3xl font-serif text-[#041e48] leading-tight"
                        >
                          {modalFrame.name}
                        </h3>
                      </div>

                      <p className="text-gray-500 text-sm font-light leading-relaxed">
                        {modalFrame.desc}
                      </p>

                      {/* Frame switcher chips */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                          Ganti Frame
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {FRAME_CARDS.map((f) => (
                            <button
                              key={f.id}
                              onClick={() => {
                                setActiveFrameId(f.id);
                                setModalFrame(f);
                              }}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                modalFrame.id === f.id
                                  ? "bg-[#041e48] text-white border-[#041e48]"
                                  : "bg-white text-[#041e48] border-gray-200 hover:border-[#041e48]"
                              }`}
                            >
                              {f.name}
                            </button>
                          ))}

                          {/* Custom Frame chip → navigates to /contact */}
                          <Link
                            to="/contact"
                            onClick={() => setModalFrame(null)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-dashed border-[#041e48]/40 text-[#041e48] bg-white hover:bg-[#041e48]/5 hover:border-[#041e48] transition-all"
                          >
                            <Sparkles size={10} />
                            Custom Frame
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100">
                      <a
                        href="https://wa.me/6282111334334"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#041e48] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1b355e] transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#041e48] focus:ring-offset-2"
                      >
                        <QrCode size={14} /> Pesan Sekarang
                      </a>
                    </div>
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