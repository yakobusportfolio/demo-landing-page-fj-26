import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Camera, QrCode, CheckCircle2, X, Sparkles, ChevronLeft, ChevronRight, Clock, Palette, Users, Lightbulb } from "lucide-react";
import { IMAGES } from "../constants/images";

const bgLightGrey = IMAGES.addOns.backgroundOption.lightGrey
const bgDarkGrey = IMAGES.addOns.backgroundOption.darkGrey
const bgDarkGreen = IMAGES.addOns.backgroundOption.darkGreen
const bgTerracotta = IMAGES.addOns.backgroundOption.terracotta

const previewLightGrey = IMAGES.addOns.backgroundPreview.lightGrey
const previewDarkGrey = IMAGES.addOns.backgroundPreview.darkGrey
const previewDarkGreen = IMAGES.addOns.backgroundPreview.darkGreen
const previewTerracotta = IMAGES.addOns.backgroundPreview.terracotta

const BACKGROUND_OPTIONS = [
  { name: "Light Grey Abstract", 
    image: bgLightGrey, preview: previewLightGrey },
  { name: "Dark Grey Abstract", image: bgDarkGrey, preview: previewDarkGrey },
  { name: "Dark Green Abstract", image: bgDarkGreen, preview: previewDarkGreen },
  { name: "Terracotta Red", image: bgTerracotta, preview: previewTerracotta },
];

/**
 * Add-Ons Section Component
 * 
 * Showcases the Photo Mini Studio add-on service:
 * - Photo Mini Studio - Dedicated photo space with custom backgrounds
 * 
 * Note: Photo Scan Barcode Experience now has its own dedicated 
 * horizontal scroll storytelling section (PhotoScanBarcodeStorySection)
 * 
 * Each add-on includes:
 * - Feature image with hover effect
 * - Detailed description
 * - Call-to-action buttons
 * - Link to portfolio gallery
 */
export function AddOnsSection() {
  const [selectedBg, setSelectedBg] = useState<typeof BACKGROUND_OPTIONS[number] | null>(null);
  const [miniStudioSlide, setMiniStudioSlide] = useState(0);
  const miniStudioTotalSlides = 2;

  const closeModal = useCallback(() => setSelectedBg(null), []);

  // Close on Escape key
  useEffect(() => {
    if (!selectedBg) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedBg, closeModal]);

  return (
    <section id="add-ons" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#041e48] mb-4">Elevate Your Celebration</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose our thoughtfully curated add-on experiences that perfectly complement your wedding day.
          </p>
        </motion.div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {/* Photo Mini Studio Add-On */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src={IMAGES.addOns.miniStudio}
                  alt="Photo Mini Studio" 
                  className="w-full h-[500px] object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#041e48]/5 rounded-full text-[#041e48] text-sm font-medium">
                <Camera size={16} />
                <span>Premium Experience</span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-serif text-[#041e48]">Photo Mini Studio</h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                A dedicated mini photo space where guests and family capture stylish portraits during your wedding celebration. Perfect for formal family shots and fun moments alike.
              </p>
              
              <div className="relative">
                {/* Slide navigation arrows */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {miniStudioSlide === 0 ? (
                      <h4 className="font-semibold text-[#041e48]">Choose Your Portrait Background</h4>
                    ) : (
                      <h4 className="font-semibold text-[#041e48]">What You Get</h4>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setMiniStudioSlide((prev) => (prev - 1 + miniStudioTotalSlides) % miniStudioTotalSlides)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-[#041e48]/20 text-[#041e48]/60 hover:text-[#041e48] hover:border-[#041e48]/40 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={14} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => setMiniStudioSlide((prev) => (prev + 1) % miniStudioTotalSlides)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-[#041e48]/20 text-[#041e48]/60 hover:text-[#041e48] hover:border-[#041e48]/40 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Slides container */}
                <div className="overflow-hidden">
                  <div className="min-h-[280px] sm:min-h-[320px] md:min-h-[300px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {miniStudioSlide === 0 ? (
                      <motion.div
                        key="bg-slide"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
                          {BACKGROUND_OPTIONS.map((bg) => (
                            <div
                              key={bg.name}
                              className="group/card cursor-pointer"
                              onClick={() => setSelectedBg(bg)}
                            >
                              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <img
                                  src={bg.image}
                                  alt={bg.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                  loading="lazy"
                                />
                              </div>
                              <p className="text-xs text-gray-500 text-center mt-2 group-hover/card:text-[#041e48] transition-colors duration-300">{bg.name}</p>
                            </div>
                          ))}

                          {/* Custom Background Card */}
                          <div
                            className="group/card cursor-pointer"
                            onClick={() => window.open('https://wa.me/6282111334334', '_blank')}
                          >
                            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-dashed border-[#041e48]/30 bg-gradient-to-br from-[#041e48]/5 to-[#1b355e]/10 hover:from-[#041e48]/10 hover:to-[#1b355e]/15 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-3">
                              <div className="w-8 h-8 rounded-full bg-[#041e48]/10 flex items-center justify-center shrink-0">
                                <Sparkles size={15} className="text-[#041e48]" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-semibold text-[#041e48] leading-tight">Custom Background</p>
                                <p className="text-[10px] text-gray-500 mt-1 leading-tight">Ready, ask admin for information</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-2 group-hover/card:text-[#041e48] transition-colors duration-300">Custom</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 italic mt-4">
                          Note: Custom background available upon request with a minimum booking of three weeks before the event.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="benefits-slide"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="space-y-4">
                          {[
                            { icon: <Clock size={18} />, title: "2–3 Hours Mini Studio Session", desc: "Consultation with our admin to match your event schedule" },
                            { icon: <Palette size={18} />, title: "1 Chosen Background", desc: "Select from our curated collection or request a custom one" },
                            { icon: <Users size={18} />, title: "1 Dedicated Crew for Setup", desc: "Background & lighting setup handled professionally" },
                            { icon: <Lightbulb size={18} />, title: "Professional Lighting Equipment", desc: "Godox AD600 Pro, 2 stand lights, full background stand set" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-start">
                              <div className="w-9 h-9 rounded-full bg-[#041e48]/5 flex items-center justify-center text-[#041e48] shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div>
                                <h5 className="font-semibold text-[#041e48] text-sm">{item.title}</h5>
                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 italic mt-5">
                          Let's get the new style & experience →
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-5">
                  {[...Array(miniStudioTotalSlides)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMiniStudioSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        miniStudioSlide === idx
                          ? "w-5 bg-[#041e48]"
                          : "w-1.5 bg-[#041e48]/20"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="px-8 py-3 bg-[#041e48] hover:bg-[#1b355e] text-white rounded-full font-medium transition-colors shadow-lg shadow-[#041e48]/20">
                  Ask Admin
                </a>
                <Link to="/portfolio?category=mini-studio" className="px-8 py-3 border-2 border-[#041e48] text-[#041e48] hover:bg-[#041e48] hover:text-white rounded-full font-medium transition-colors">
                  View Mini Studio Gallery
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Preview Lightbox */}
      <AnimatePresence>
        {selectedBg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 md:top-4 md:right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedBg.preview}
                  alt={`Portrait with ${selectedBg.name} background`}
                  className="w-full h-auto max-h-[75vh] object-contain bg-black"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                  <img src={selectedBg.image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-white/90 text-sm font-medium">{selectedBg.name} Background</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}