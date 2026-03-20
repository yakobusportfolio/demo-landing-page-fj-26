import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  QrCode, 
  CheckCircle2, 
  Download, 
  Frame as FrameIcon, 
  Share2, 
  Users, 
  Cloud,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { IMAGES } from "../constants/images";

// Remove these:
// import navyFrameTemplate from "figma:asset/d245fbc2325c4979f95638def5908149c516840c.png";
// import whiteFrameTemplate from "figma:asset/346a1685e07150875a7f162017419a0e3a984f36.png";
// import navyBannerTemplate from "figma:asset/db80b05cea510deb568a9b1eca1479b07d8ac3e0.png";

// Add these instead:
const navyFrameTemplate = IMAGES.addOns.templates.navy;
const whiteFrameTemplate = IMAGES.addOns.templates.white;
const navyBannerTemplate = IMAGES.addOns.templates.navyBanner;
const whiteBannerTemplate = IMAGES.addOns.templates.whiteBanner;

// ...rest of component...
/**
 * FramePreviewCard — 3:2 landscape photo carousel with frame overlay,
 * manual nav arrows, auto-slide (infinite), dot indicators, name + description.
 */
function FramePreviewCard({ 
  frameImage, 
  frameName, 
  frameDescription, 
  startOffset = 0,
  compact = false 
}: { 
  frameImage: string; 
  frameName: string; 
  frameDescription: string; 
  startOffset?: number;
  compact?: boolean;
}) {
  const photos = IMAGES.scanBarcode.placeholderPhotos;
  const total = photos.length;
  const [currentIndex, setCurrentIndex] = useState(startOffset % total);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-slide infinite
  const resetAutoTimer = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3500);
  };

  useEffect(() => {
    resetAutoTimer();
    return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    resetAutoTimer();
  };
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    resetAutoTimer();
  };

  const dotSize = compact ? "h-1" : "h-1.5";
  const dotActiveW = compact ? "w-2.5" : "w-3";
  const dotInactiveW = compact ? "w-1" : "w-1.5";
  const arrowSize = compact ? 14 : 16;
  const arrowBtnClass = compact
    ? "w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
    : "w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all";

  return (
    <div className="space-y-2">
      {/* 3:2 landscape container */}
      <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
        {/* Base layer: sliding photos */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / total)}%)`, 
              width: `${total * 100}%` 
            }}
          >
            {photos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Wedding photo ${idx + 1}`}
                className="h-full object-cover shrink-0"
                style={{ width: `${100 / total}%` }}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Overlay: frame template */}
        <img
          src={frameImage}
          alt={frameName}
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          loading="lazy"
        />

        {/* Navigation arrows - always visible */}
        <button
          onClick={goPrev}
          className={`absolute left-1.5 top-1/2 -translate-y-1/2 z-20 ${arrowBtnClass}`}
          aria-label="Previous photo"
        >
          <ChevronLeft size={arrowSize} strokeWidth={1.5} />
        </button>
        <button
          onClick={goNext}
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 z-20 ${arrowBtnClass}`}
          aria-label="Next photo"
        >
          <ChevronRight size={arrowSize} strokeWidth={1.5} />
        </button>

        {/* Dot indicators */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentIndex(idx); resetAutoTimer(); }}
              className={`${dotSize} rounded-full transition-all duration-500 ${
                currentIndex === idx ? `${dotActiveW} bg-white` : `${dotInactiveW} bg-white/40`
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Frame name + description */}
      <div className={`text-center ${compact ? 'space-y-0' : 'space-y-0.5'}`}>
        <h4 className={`font-semibold text-[#041e48] ${compact ? 'text-sm' : ''}`}>{frameName}</h4>
        <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>{frameDescription}</p>
      </div>
    </div>
  );
}

export function PhotoScanBarcodeStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [mobileSlide, setMobileSlide] = useState(0);

  const mobileTotalSlides = 6; // intro, benefits, frames, banners, CTA, features

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsSectionVisible(isVisible);

      const scrollEnd = containerHeight - windowHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollEnd);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToMobileSlide = (idx: number) => {
    setMobileSlide(Math.max(0, Math.min(mobileTotalSlides - 1, idx)));
  };

  const benefits = [
    { icon: <Download size={20} />, title: "Instant Photo Download", description: "Scan QR code to instantly download photos" },
    { icon: <FrameIcon size={20} />, title: "Elegant Frame Overlay", description: "Choose from 4 beautiful frame designs" },
    { icon: <Share2 size={20} />, title: "Ready for Social Media", description: "Perfectly formatted for Instagram & Facebook" },
    { icon: <Users size={20} />, title: "Unlimited Guest Access", description: "All guests can scan and download photos" },
    { icon: <Cloud size={20} />, title: "Cloud Gallery Access", description: "30-day access to all wedding photos" },
  ];

  const frames = [
    { key: 'frame1', name: "Classic Navy", description: "Deep navy with elegant wedding branding", images: [navyFrameTemplate] },
    { key: 'frame2', name: "Modern Minimal", description: "Clean white frame with simple lines", images: [whiteFrameTemplate] },
    { key: 'frame3', name: "Navy Banner", description: "Navy branded banner with QR code", images: [navyBannerTemplate] },
    { key: 'frame4', name: "White Minimal", description: "Clean white overlay with QR code", images: [whiteBannerTemplate] },
  ];

  const totalSlides = 5;
  const translatePercent = scrollProgress * 80;

  // ── Mobile slide content ──
  const mobileSlides = [
    // Slide 0 — Intro
    <div key="m-intro" className="relative flex flex-col items-center justify-center text-center px-6 py-8 min-h-[70vh] overflow-hidden">
      {/* Background photo */}
      <img
        src={IMAGES.scanBarcode.introBg}
        alt="Wedding venue"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041e48]/80 via-[#1b355e]/75 to-[#041e48]/85" />
      {/* Content */}
      <div className="relative z-10 space-y-5 max-w-sm mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium border border-white/15">
          <QrCode size={14} />
          <span>Interactive Experience</span>
        </div>
        <h2 className="text-2xl font-serif text-white">
          Photo Scan Barcode Experience
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">
          Guests instantly upload, view, and download wedding photos through a simple scanning system, creating a collaborative gallery in real-time.
        </p>
      </div>
    </div>,

    // Slide 1 — Benefits
    <div key="m-benefits" className="flex flex-col items-center justify-center px-6 py-8 min-h-[70vh]">
      <div className="space-y-6 max-w-sm mx-auto w-full">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-serif text-[#041e48]">What You Get</h3>
          <p className="text-gray-500 text-xs">Everything for a seamless photo sharing experience</p>
        </div>
        <div className="space-y-4">
          {benefits.map((b, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#041e48]/5 flex items-center justify-center text-[#041e48] shrink-0">
                {b.icon}
              </div>
              <div>
                <h4 className="font-semibold text-[#041e48] text-sm">{b.title}</h4>
                <p className="text-xs text-gray-500">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 2 — Frame Collection (two columns)
    <div key="m-frames" className="flex flex-col items-center justify-center px-6 py-6 min-h-[70vh]">
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-serif text-[#041e48]">Frame Collection</h3>
          <p className="text-gray-500 text-xs">Choose from our curated selection of elegant photo frames</p>
        </div>
        <div className="flex flex-col gap-4">
          <FramePreviewCard frameImage={navyFrameTemplate} frameName={frames[0].name} frameDescription={frames[0].description} startOffset={0} />
          <FramePreviewCard frameImage={whiteFrameTemplate} frameName={frames[1].name} frameDescription={frames[1].description} startOffset={3} />
        </div>
      </div>
    </div>,

    // Slide 3 — Banner & QR Templates (two columns)
    <div key="m-banners" className="flex flex-col items-center justify-center px-6 py-6 min-h-[70vh]">
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-serif text-[#041e48]">Banner Templates</h3>
          <p className="text-gray-500 text-xs">Choose from our curated selection of elegant photo frames</p>
        </div>
        <div className="flex flex-col gap-4">
          <FramePreviewCard frameImage={navyBannerTemplate} frameName={frames[2].name} frameDescription={frames[2].description} startOffset={1} />
          <FramePreviewCard frameImage={whiteBannerTemplate} frameName={frames[3].name} frameDescription={frames[3].description} startOffset={4} />
        </div>
      </div>
    </div>,

    // Slide 4 — Custom CTA
    <div key="m-cta" className="flex flex-col items-center justify-center px-6 py-8 min-h-[70vh]">
      <div className="bg-gradient-to-br from-[#041e48] to-[#1b355e] rounded-2xl p-8 text-center space-y-5 text-white max-w-sm mx-auto w-full">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
          <Sparkles size={24} />
        </div>
        <h3 className="text-2xl font-serif">Want a Custom Frame?</h3>
        <p className="text-white/80 text-sm">
          Fully customized frame designs tailored to your wedding concept, colors, and theme.
        </p>
        <a 
          href="https://wa.me/6282111334334" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-block px-8 py-3 bg-white text-[#041e48] hover:bg-gray-100 rounded-full font-semibold text-sm transition-colors shadow-lg"
        >
          Contact Us
        </a>
        <p className="text-white/50 text-xs italic">*Additional charges apply</p>
        <Link 
          to="/portfolio?category=scan-barcode" 
          className="inline-block px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full text-sm transition-colors"
        >
          View Gallery
        </Link>
      </div>
    </div>,

    // Slide 5 — Feature list
    <div key="m-features" className="flex flex-col items-center justify-center px-6 py-8 min-h-[70vh]">
      <div className="space-y-5 max-w-sm mx-auto w-full">
        <h4 className="font-semibold text-[#041e48] text-center text-sm">Included in Every Package:</h4>
        <ul className="space-y-2.5">
          {[
            "Custom photo frame template",
            "A3 printed display with two tripod banners",
            "Operator with iPad station",
            "Fast internet upload included",
            "Unlimited photos for two hours",
            "Cloud gallery access for thirty days"
          ].map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#70161e] shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center pt-4">
          <a 
            href="https://wa.me/6282111334334" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-3 bg-[#041e48] hover:bg-[#1b355e] text-white rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#041e48]/20"
          >
            Ask Admin
          </a>
        </div>
      </div>
    </div>,
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════ */}
      {/* DESKTOP: Horizontal scroll driven by vertical scrolling */}
      {/* ═══════════════════════════════════════════════ */}
      <div 
        ref={containerRef}
        className="hidden lg:block relative"
        style={{ height: `${totalSlides * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div 
            className="flex h-full will-change-transform"
            style={{ 
              transform: `translateX(-${translatePercent}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {/* Slide 1 - Intro */}
            <div className="w-1/5 h-full relative flex items-center justify-center px-12 overflow-hidden">
              {/* Background photo */}
              <img
                src={IMAGES.scanBarcode.introBg}
                alt="Wedding venue"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Blue overlay using brand palette */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#041e48]/80 via-[#1b355e]/75 to-[#041e48]/85" />
              {/* Content */}
              <div className="relative z-10 max-w-2xl text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/15">
                  <QrCode size={16} />
                  <span>Interactive Experience</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white">
                  Photo Scan Barcode Experience
                </h2>
                <p className="text-white/80 text-xl leading-relaxed">
                  Guests instantly upload, view, and download wedding photos through a simple scanning system, creating a collaborative wedding gallery in real-time.
                </p>
                <div className="pt-4">
                  <p className="text-sm text-white/50 italic">Scroll down to explore →</p>
                </div>
              </div>
            </div>

            {/* Slide 2 - What You Get */}
            <div className="w-1/5 h-full flex items-center justify-center px-12 bg-white">
              <div className="max-w-3xl space-y-12">
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-serif text-[#041e48]">What You Get</h3>
                  <p className="text-gray-600">Everything you need for a seamless photo sharing experience</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#041e48]/5 flex items-center justify-center text-[#041e48]">
                        {benefit.icon}
                      </div>
                      <h4 className="font-semibold text-[#041e48]">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 italic">Choose your favorite frame style →</p>
              </div>
            </div>

            {/* Slide 3 - Frame Collection */}
            <div className="w-1/5 h-full flex items-center justify-center px-8 bg-[#f5f5f0]">
              <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-serif text-[#041e48]">Frame Collection</h3>
                  <p className="text-gray-600">Choose from our curated selection of elegant photo frames</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FramePreviewCard frameImage={navyFrameTemplate} frameName={frames[0].name} frameDescription={frames[0].description} startOffset={0} />
                  <FramePreviewCard frameImage={whiteFrameTemplate} frameName={frames[1].name} frameDescription={frames[1].description} startOffset={3} />
                </div>
                <p className="text-center text-sm text-gray-500 italic">More frame options →</p>
              </div>
            </div>

            {/* Slide 4 - Banner & QR Templates (same layout as slide 3) */}
            <div className="w-1/5 h-full flex items-center justify-center px-8 bg-white">
              <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-serif text-[#041e48]">Frame Collection</h3>
                  <p className="text-gray-600">Choose from our curated selection of elegant photo frames</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <FramePreviewCard frameImage={navyBannerTemplate} frameName={frames[2].name} frameDescription={frames[2].description} startOffset={1} />
                  <FramePreviewCard frameImage={whiteBannerTemplate} frameName={frames[3].name} frameDescription={frames[3].description} startOffset={4} />
                </div>
                <p className="text-center text-sm text-gray-500 italic">Want something custom? →</p>
              </div>
            </div>

            {/* Slide 5 - Custom Frame CTA */}
            <div className="w-1/5 h-full flex items-center justify-center px-12 bg-gradient-to-br from-[#041e48] to-[#1b355e]">
              <div className="max-w-2xl text-center space-y-8 text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif">Want a Custom Frame?</h3>
                <p className="text-white/90 text-xl">
                  We offer fully customized frame designs tailored to your wedding concept, colors, and theme.
                </p>
                <div className="space-y-4 pt-4">
                  <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="inline-block px-10 py-4 bg-white text-[#041e48] hover:bg-gray-100 rounded-full font-semibold text-lg transition-colors shadow-lg">
                    Contact Us
                  </a>
                  <p className="text-white/60 text-sm italic">*Additional charges apply for custom designs</p>
                </div>
                <div className="pt-8 space-y-3">
                  <p className="text-white/70 text-sm">Ready to book this add-on?</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/portfolio?category=scan-barcode" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-medium transition-colors">
                      View Gallery
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator - only visible when section is in view */}
        {isSectionVisible && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300">
            <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
              {[...Array(totalSlides)].map((_, idx) => {
                const slideStart = idx / totalSlides;
                const slideEnd = (idx + 1) / totalSlides;
                const isActive = scrollProgress >= slideStart && scrollProgress < slideEnd;
                const isLast = idx === totalSlides - 1 && scrollProgress >= slideStart;
                return (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive || isLast ? "w-8 bg-[#041e48]" : "w-1.5 bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE: Slide-based carousel with < > navigation */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="lg:hidden bg-gray-50 relative">
        <div className="relative overflow-hidden min-h-[70vh]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {mobileSlides[mobileSlide]}
            </motion.div>
          </AnimatePresence>

          {/* ‹ Previous — always visible, fixed position */}
          {mobileSlide > 0 && (
            <button
              onClick={() => goToMobileSlide(mobileSlide - 1)}
              className="absolute left-2 top-[50%] z-10 w-8 h-8 flex items-center justify-center text-[#041e48]/40 hover:text-[#041e48] transition-colors"
              style={{ marginTop: '-16px' }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
          )}

          {/* › Next — always visible, fixed position */}
          {mobileSlide < mobileTotalSlides - 1 && (
            <button
              onClick={() => goToMobileSlide(mobileSlide + 1)}
              className="absolute right-2 top-[50%] z-10 w-8 h-8 flex items-center justify-center text-[#041e48]/40 hover:text-[#041e48] transition-colors"
              style={{ marginTop: '-16px' }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Dot indicators below section */}
        <div className="flex justify-center gap-1.5 pb-8 pt-2">
          {[...Array(mobileTotalSlides)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToMobileSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                mobileSlide === idx
                  ? "w-6 bg-[#041e48]"
                  : "w-1.5 bg-[#041e48]/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}