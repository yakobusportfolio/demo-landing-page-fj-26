import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "../constants/images";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

/**
 * Hero Section Component
 * 
 * Main landing section with hero slideshow and CTA buttons.
 * Features auto-rotating slides with swipe gestures and navigation controls.
 * Includes smooth fade-in animations for text and buttons.
 * Integrates Check Availability modal for quick bookings.
 */

interface Slide {
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Luxury Wedding Photography",
    subtitle: "Capture timeless and cinematic moments of your wedding day",
    image: IMAGES.hero.slides[0],
  },
  {
    title: "Mini Studio Portrait Add-on",
    subtitle: "Elegant studio-style portraits during your wedding celebration",
    image: IMAGES.hero.slides[1],
  },
  {
    title: "Interactive Scan Barcode Experience",
    subtitle: "Let your guests instantly access and relive your wedding moments",
    image: IMAGES.hero.slides[2],
  },
];

export function HeroSection() {
  const { isOpen, open, close } = useCheckAvailabilityModal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-advance slides
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!isHovered) return;

  // pause logic → optional
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <motion.img 
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 7, ease: "linear" }}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Arrows - Desktop Only (visible on hover) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 items-center justify-center
                   bg-white/10 hover:bg-white/20 backdrop-blur-md
                   border border-white/30 rounded-full
                   text-white transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 items-center justify-center
                   bg-white/10 hover:bg-white/20 backdrop-blur-md
                   border border-white/30 rounded-full
                   text-white transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="h-[180px] md:h-[160px] lg:h-[200px] mb-8 flex flex-col items-center justify-start"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif text-white mb-3 md:mb-4 leading-tight lg:leading-[1.1]">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-light leading-snug">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={open}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#041e48] hover:bg-[#1b355e] text-white rounded-full text-sm font-medium transition-colors text-center shadow-lg hover:shadow-xl"
          >
            Check Availability
          </button>
          <a 
            href="#add-ons"
            className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium transition-colors text-center"
          >
            Explore Add-Ons
          </a>
          <Link 
            to="/portfolio"
            className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium transition-colors text-center"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-white w-8" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Check Availability Modal */}
      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </section>
  );
}