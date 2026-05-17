import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IMAGES } from "../constants/images";

const STUDIO_BACKGROUNDS = [
  { 
    id: 'light-grey', 
    name: "Light Grey", 
    thumb: IMAGES.addOns.backgrounds.lightGrey.thumb, 
    preview: IMAGES.addOns.backgrounds.lightGrey.preview 
  },
  { 
    id: 'black', 
    name: "Black", 
    thumb: IMAGES.addOns.backgrounds.black.thumb, 
    preview: IMAGES.addOns.backgrounds.black.preview 
  },
  { 
    id: 'dark-green', 
    name: "Dark Green", 
    thumb: IMAGES.addOns.backgrounds.darkGreen.thumb, 
    preview: IMAGES.addOns.backgrounds.darkGreen.preview 
  },
  { 
    id: 'sky-blue', 
    name: "Sky Blue", 
    thumb: IMAGES.addOns.backgrounds.skyBlue.thumb, 
    preview: IMAGES.addOns.backgrounds.skyBlue.preview 
  },
  { 
    id: 'rust', 
    name: "Rust", 
    thumb: IMAGES.addOns.backgrounds.rust.thumb, 
    preview: IMAGES.addOns.backgrounds.rust.preview 
  },
  { 
    id: 'teracota', 
    name: "Teracota", 
    thumb: IMAGES.addOns.backgrounds.teracota.thumb, 
    preview: IMAGES.addOns.backgrounds.teracota.preview 
  },
];

const GRID_IMAGES = IMAGES.addOns.heroGrid.slice(0, 4);

const HERO_FEATURES = [
  "1 Background Pilihan / Custom",
  "2-3 Jam Sesi Photo Studio",
  "1 Profesional Crew & Operator",
  "Set Mini Studio & Profesional studio lighting"
];

export function AddOnsSection() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [selectedPreview, setSelectedPreview] = useState<typeof STUDIO_BACKGROUNDS[0] | null>(null);

  useEffect(() => {
    if (selectedPreview) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [selectedPreview]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === STUDIO_BACKGROUNDS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? STUDIO_BACKGROUNDS.length - 1 : prev - 1));
  };

  const portalTarget = typeof document !== "undefined" ? (document.getElementById("root") || document.body) : null;

  return (
    <section id="add-ons" className="w-full bg-white flex flex-col relative z-10">
      
      {/* =========================================================================
          BLOK ATAS: HERO BANNER (RESPONSIVE HYBRID LAYOUT)
          ========================================================================= */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-black">
        
        {/* Kontainer Grid Utama: 2x2 (Mobile) & 4 Kolom (Desktop) */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 h-full w-full">
          {GRID_IMAGES.map((imgUrl, idx) => (
            <div key={idx} className="relative w-full h-full overflow-hidden">
              <img 
                src={imgUrl} 
                alt={`Studio Setup Grid ${idx + 1}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* TEKS FITUR VERSI DESKTOP: (Hanya muncul di layar menengah ke atas md:flex) */}
              {/* Di Mobile, ini disembunyikan agar tidak menabrak judul yang ada di tengah */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="hidden md:flex absolute bottom-12 left-0 w-full px-3 justify-center text-center">
                <span className="text-white/90 text-xs lg:text-sm font-medium tracking-widest uppercase drop-shadow-md leading-snug">
                  {HERO_FEATURES[idx]}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Teks Judul Utama (Melayang di atas grid) */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto space-y-6">
          {/* Tipografi SAMA PERSIS dengan Hero.tsx */}
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight drop-shadow-2xl">
            Photo Mini Studio
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Hadirkan suasana studio profesional ke dalam pesta pernikahanmu untuk hasil potret yang lebih personal dan elegan.
          </p>

          {/* TEKS FITUR VERSI MOBILE: (Hanya muncul di layar HP md:hidden) */}
          {/* Semua fitur ditata rapi di bawah deskripsi agar tidak mengganggu layout grid 2x2 */}
          <div className="md:hidden pt-6 mt-4 border-t border-white/20">
            <div className="flex flex-col justify-center items-center gap-3 text-center">
              {HERO_FEATURES.map((feature, index) => (
                <span key={index} className="text-white/90 text-[11px] font-medium tracking-widest uppercase drop-shadow-md">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOK BAWAH: AREA INTERAKTIF (KETINGGIAN KONSTAN 70VH - 80VH)
          ========================================================================= */}
      <div className="w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
        
        <div className="w-full px-6 py-12 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center max-w-7xl mx-auto">
          
          <div className="relative z-20 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1 lg:col-span-5">
            <div className="space-y-6">
              {/* Tipografi SAMA PERSIS dengan Hero.tsx */}
              <h3 className="text-5xl md:text-7xl font-serif text-[#041e48] leading-[1.1]">
                Choose your Studio Background
              </h3>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Pilih Berbagai macam warna background untuk kenangan yang tak terlupakan
              </p>
            </div>
            
            <div className="pt-2 md:pt-4">
              {/* Tombol dengan Padding & Font SAMA PERSIS dengan Hero.tsx */}
              <Link 
                to="/portfolio?category=mini-studio"
                className="inline-block bg-[#041e48] text-white rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#1b355e] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center"
              >
                Show More Portfolio
              </Link>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[450px] flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-24 order-1 lg:order-2 w-full lg:col-span-7">
            <div className="relative w-full max-w-[220px] sm:max-w-[240px] md:max-w-[280px] h-full flex items-center justify-center perspective-1000">
              <AnimatePresence mode="popLayout">
                {STUDIO_BACKGROUNDS.map((bg, index) => {
                  let offset = index - currentIndex;
                  const total = STUDIO_BACKGROUNDS.length;
                  
                  if (offset < -Math.floor(total / 2)) offset += total;
                  if (offset > Math.floor(total / 2)) offset -= total;

                  const isCenter = offset === 0;
                  const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.7;
                  const xTranslate = offset * 60; 
                  const zIndex = 10 - Math.abs(offset);
                  const opacity = Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 2 ? 0.15 : isCenter ? 1 : 0.8;

                  return (
                    <motion.div
                      key={bg.id}
                      animate={{ scale, x: `${xTranslate}%`, zIndex, opacity }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                      onClick={() => isCenter && setSelectedPreview(bg)}
                      className={`absolute w-full h-[85%] rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden border border-gray-200/50 bg-gray-100 ${isCenter ? 'cursor-pointer group' : 'pointer-events-none'}`}
                    >
                      <img src={bg.thumb} alt={bg.name} className="absolute inset-0 w-full h-full object-cover" />
                      
                      {isCenter && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                          <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase border border-white/50 px-4 py-2 md:px-5 md:py-3 rounded-full bg-black/20 text-center">
                            Click for<br/>Preview
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-6 w-full text-center pointer-events-none">
                         <span className="text-white text-xs sm:text-sm md:text-base font-serif tracking-widest drop-shadow-md mix-blend-overlay">
                           {bg.name.toUpperCase()}
                         </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button 
              onClick={handlePrev}
              className="absolute left-0 md:left-4 lg:left-0 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#041e48] hover:bg-white hover:scale-110 transition-all border border-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 md:right-4 lg:right-0 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-[#041e48] hover:bg-white hover:scale-110 transition-all border border-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PREVIEW LIGHTBOX */}
      {portalTarget && createPortal(
        <AnimatePresence>
          {selectedPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedPreview(null)}
            >
              <button onClick={() => setSelectedPreview(null)} className="absolute top-6 right-6 md:top-10 md:right-10 z-[210] w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-[600px] bg-white rounded-3xl md:rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedPreview.preview} className="w-full h-[50vh] md:h-[60vh] object-cover object-center" alt={selectedPreview.name} />
                <div className="p-8 md:p-10 text-center bg-white flex flex-col items-center justify-center">
                  <p className="text-[#70161e] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3">Background Preview</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-[#041e48] mb-8">{selectedPreview.name}</h3>
                  <button onClick={() => setSelectedPreview(null)} className="bg-[#041e48] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full uppercase text-xs md:text-sm font-bold tracking-widest hover:bg-[#1b355e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">Tutup Preview</button>
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