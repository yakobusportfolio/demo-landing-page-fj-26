import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Camera, X, Sparkles, Clock, Palette, Users, Lightbulb, ChevronRight } from "lucide-react";
import { IMAGES } from "../constants/images";

const BACKGROUND_OPTIONS = [
  { name: "Classic Navy Abstract", image: IMAGES.addOns.backgroundOption.lightGrey, preview: IMAGES.addOns.backgroundPreview.lightGrey },
  { name: "Midnight Grey Abstract", image: IMAGES.addOns.backgroundOption.darkGrey, preview: IMAGES.addOns.backgroundPreview.darkGrey },
  { name: "Emerald Green Abstract", image: IMAGES.addOns.backgroundOption.darkGreen, preview: IMAGES.addOns.backgroundPreview.darkGreen },
  { name: "Deep Terracotta Abstract", image: IMAGES.addOns.backgroundOption.terracotta, preview: IMAGES.addOns.backgroundPreview.terracotta },
];

export function AddOnsSection() {
  const [selectedBg, setSelectedBg] = useState<typeof BACKGROUND_OPTIONS[number] | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["3%", "-62%"]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 25 });

  const closeModal = useCallback(() => setSelectedBg(null), []);

  const facilities = [
    { icon: <Clock size={18} />, t: "2-3 Jam Sesi Photo Studio" },
    { icon: <Palette size={18} />, t: "1 Background Pilihan / Custom" },
    { icon: <Users size={18} />, t: "1 Profesional Crew & Operator" },
    { icon: <Lightbulb size={18} />, t: "Setup Mini Studio & Lighting Gear" },
  ];

  return (
    <section id="add-ons" ref={targetRef} className={`relative z-10 ${isDesktop ? 'h-[300vh]' : 'h-auto'} bg-white`}>
      
      {/* --- DESKTOP VIEW --- */}
      {isDesktop ? (
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">
          
          {/* SISI KIRI: INFO & FACILITIES */}
          <div className="w-1/2 h-full relative overflow-hidden bg-[#041e48] flex flex-col justify-center px-20">
            <img src={IMAGES.addOns.miniStudio} alt="Studio" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#041e48]/40 via-[#041e48]/50 to-transparent" />
            
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  <Camera size={14} /> <span>Tambahan Mini Studio</span>
                </div>
                <h2 className="text-7xl font-serif text-white leading-tight">Photo Mini <br/> <span className="italic text-[#f5c767]">Studio</span></h2>
                <p className="text-white/80 text-lg max-w-md leading-relaxed">Hadirkan suasana studio profesional ke dalam pesta pernikahanmu untuk hasil potret yang lebih personal dan elegan.</p>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10 max-w-md">
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">Apa saja yang kamu dapatkan:</p>
                <div className="grid grid-cols-1 gap-y-5">
                  {facilities.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center text-white">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#f5c767]">{item.icon}</div>
                      <p className="font-medium text-base tracking-wide">{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: GALLERY & CTA */}
          <div className="w-1/2 h-full flex flex-col bg-white">
            
            {/* GALLERY AREA */}
            <div className="h-[75%] flex flex-col justify-center relative overflow-hidden px-16">
              <div className="mb-10 space-y-2 text-center">
                <h3 className="text-3xl font-serif text-[#041e48]">Pilih Background Studiomu</h3>
                <p className="text-gray-400 text-xs italic">*Scroll layar untuk melihat pilihan warna</p>
              </div>
              
              <motion.div style={{ x: smoothX }} className="flex gap-10 min-w-max pr-40 items-center h-[450px]">
                {BACKGROUND_OPTIONS.map((bg, idx) => (
                  <div 
                    key={idx} 
                    className="relative shrink-0 w-[280px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group bg-white transition-all duration-500 hover:scale-105 hover:z-30 hover:shadow-2xl border border-gray-100" 
                    onClick={() => setSelectedBg(bg)}
                  >
                    <img src={bg.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={bg.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end">
                      <h4 className="text-white text-lg font-serif">{bg.name}</h4>
                      <p className="text-white/70 text-[10px] uppercase tracking-widest mt-2 flex items-center gap-2">Klik untuk preview <ChevronRight size={12}/></p>
                    </div>
                  </div>
                ))}

                <div 
                  className="shrink-0 w-[280px] aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-[#041e48]/20 bg-white/50 flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:border-[#f5c767] group" 
                  onClick={() => window.open('https://wa.me/6282111334334', '_blank')}
                >
                  <div className="w-16 h-16 rounded-full bg-[#041e48]/5 flex items-center justify-center mb-4 group-hover:bg-[#f5c767]/20 transition-colors">
                    <Sparkles size={32} className="text-[#041e48] group-hover:text-[#70161e]" />
                  </div>
                  <h4 className="text-xl font-serif text-[#041e48]">Custom Request</h4>
                  <p className="text-gray-400 text-[10px] mt-2 leading-relaxed">Punya tema sendiri? Konsultasikan dengan admin kami.</p>
                </div>
              </motion.div>
            </div>

            {/* CTA AREA */}
            <div className="h-[25%] flex flex-col items-center justify-center gap-8 border-t border-gray-200 bg-white">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">Sudah menentukan pilihanmu? Hubungi kami sekarang.</p>
              <div className="flex gap-6">
                <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="px-12 py-5 bg-[#041e48] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#1b355e] hover:scale-105 shadow-xl transition-all duration-300">
                  Hubungi Admin
                </a>
                <Link to="/portfolio" className="px-12 py-5 border-2 border-[#041e48] text-[#041e48] rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                  Lihat Galeri
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        /* --- MOBILE VIEW --- */
        <div className="flex flex-col bg-white">
          <div className="relative min-h-[60vh] bg-[#ffffff] flex flex-col justify-center p-8 overflow-hidden">
             <img src={IMAGES.addOns.miniStudio} className="absolute inset-0 w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 w-full h-full bg-black/60"/>
             <div className="relative w-full h-full">
                <div className="inline-block px-2 py-2 space-y-4 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-[8px] font-bold uppercase tracking-widest border border-white/16">Mini Studio Add-on</div>
                <h2 className="text-4xl font-serif text-white leading-tight">Photo Mini <br/> <span className="italic text-white">Studio</span></h2>
                <div className="space-y-4 pt-6 border-t border-white/0">
                  <p className="text-white/50 text-[9px] font-bold uppercase tracking-widest">Fasilitas yang didapat:</p>
                  <div className="grid grid-cols-1 gap-4">
                    {facilities.map((f, i) => (
                      <div key={i} className="flex gap-4 items-center text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white">{f.icon}</div>
                        <p className="font-medium text-sm tracking-wide">{f.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          <div className="py-12 bg-black-50">
            <div className="px-8 mb-8 text-center">
              <h3 className="text-2xl font-serif text-[#041e48]">Pilih Background Studiomu</h3>
              <p className="text-[10px] text-gray-400 italic mt-1">*Geser untuk melihat pilihan warna</p>
            </div>
            {/* Horizontal Swipe dengan Snap Effect */}
            <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scrollbar-none pb-8">
              {BACKGROUND_OPTIONS.map((bg, idx) => (
                <div key={idx} className="shrink-0 w-[80vw] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl snap-center bg-white relative" onClick={() => setSelectedBg(bg)}>
                  <img src={bg.image} className="w-full h-full object-cover" alt={bg.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-6 flex flex-col justify-end text-white">
                     <p className="font-serif text-lg">{bg.name}</p>
                     <p className="text-[8px] uppercase tracking-widest mt-1 opacity-80">Klik untuk Preview</p>
                  </div>
                </div>
              ))}
              {/* Custom Request Mobile */}
              <div 
                className="shrink-0 w-[80vw] aspect-[4/5] rounded-[2rem] border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center p-8 text-center snap-center"
                onClick={() => window.open('https://wa.me/6282111334334', '_blank')}
              >
                <Sparkles size={32} className="text-[#f5c767] mb-4" />
                <h4 className="font-serif text-xl text-[#041e48]">Custom Request</h4>
                <p className="text-xs text-gray-400 mt-2">Hubungi admin untuk tema khusus</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-12 flex flex-col items-center gap-8 bg-white">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em] text-center">Sudah menentukan pilihanmu? Hubungi kami.</p>
            <div className="w-full flex flex-col gap-4">
              <a href="https://wa.me/6282111334334" className="w-full py-5 bg-[#041e48] text-white rounded-full text-center font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl">Hubungi Admin</a>
              <Link to="/portfolio" className="w-full py-5 border-2 border-[#041e48] text-[#041e48] rounded-full text-center font-bold text-[10px] uppercase tracking-[0.2em]">Lihat Galeri</Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {selectedBg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#041e48]/95 backdrop-blur-xl" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-2xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img src={selectedBg.preview} alt={selectedBg.name} className="w-full h-auto max-h-[70vh] object-contain bg-gray-100" />
                <button onClick={closeModal} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center hover:bg-black/20 transition-all text-white"><X size={20}/></button>
              </div>
              <div className="p-10 text-center">
                <p className="text-[#70161e] text-[9px] font-bold uppercase tracking-[0.4em] mb-2 font-serif">Background Preview</p>
                <h5 className="font-serif text-3xl text-[#041e48] mb-8">{selectedBg.name}</h5>
                <button onClick={closeModal} className="px-10 py-4 bg-[#041e48] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg">Tutup Preview</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}