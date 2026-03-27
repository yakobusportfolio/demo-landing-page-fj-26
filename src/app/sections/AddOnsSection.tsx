import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Camera, X, Sparkles, Clock, Palette, Users, Lightbulb } from "lucide-react";
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

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["3%", "-52%"]);
  const smoothX = useSpring(x, { stiffness: 60, damping: 25 });

  const closeModal = useCallback(() => setSelectedBg(null), []);

  const facilities = [
    { icon: <Clock size={18} className="text-[#fffff]"/>, t: "2-3 Jam Sesi Photo Studio" },
    { icon: <Palette size={18} className="text-[#fffff]"/>, t: "1 Background Pilihan/Custom" },
    { icon: <Users size={18} className="text-[#fffff]"/>, t: "1 Profesional Crew" },
    { icon: <Lightbulb size={18} className="text-[#fffff]"/>, t: "Mini Studio & Lighting Gear" },
  ];

  return (
    <section id="add-ons" ref={targetRef} className={`relative z-10 ${isDesktop ? 'h-[300vh]' : 'h-auto'} bg-white`}>
      
      {/* --- DESKTOP VIEW --- */}
      {isDesktop ? (
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">
          
          {/* LAYOUT 1 (KIRI - 50%): INFO & COLORFUL FACILITIES */}
          <div className="w-1/2 h-full relative overflow-hidden bg-black flex flex-col justify-center px-20">
            <img src={IMAGES.addOns.miniStudio} alt="Studio" className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  <Camera size={14} /> <span>Mini Studio Add-on</span>
                </div>
                <h2 className="text-7xl font-serif text-white leading-tight">Photo Mini <br/> <span className="italic text-[#fffff]">Studio</span></h2>
                <p className="text-white/80 text-lg max-w-md leading-relaxed">Tingkatkan keseruan pesta pernikahanmu dengan potret elegan bergaya studio profesional.</p>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/10 max-w-md">
                <p className="text-[#ffffff] text-[10px] font-bold uppercase tracking-[0.3em]">apa saja yang akan kamu dapatkan:</p>
                <div className="grid grid-cols-1 gap-y-5">
                  {facilities.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center text-white">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">{item.icon}</div>
                      <p className="font-medium text-base tracking-wide">{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN (SEAMLESS) */}
          <div className="w-1/2 h-full flex flex-col bg-gray-50">
            
            {/* LAYOUT 3 (KANAN ATAS - GALLERY) */}
            <div className="h-[75%] flex flex-col justify-center relative overflow-hidden px-16">
              <div className="mb-10 space-y-2 z-20">
                <h3 className="text-3xl font-serif text-[#041e48] text-center">pilih background untuk mini studiomu</h3>
                <p className="text-gray-400 text-xs italic text-center">*scroll layar untuk melihat pilihan background</p>
              </div>
              
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
              
              <motion.div style={{ x: smoothX }} className="flex gap-10 min-w-max pr-40 items-center h-[450px]">
                {BACKGROUND_OPTIONS.map((bg, idx) => (
                  <div 
                    key={idx} 
                    className="relative shrink-0 w-[280px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer group border border-gray-100 bg-white transition-all duration-500 hover:scale-105 hover:z-30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]" 
                    onClick={() => setSelectedBg(bg)}
                  >
                    <img src={bg.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={bg.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041e48]/30 via-transparent to-transparent p-8 flex flex-col justify-end">
                      <h4 className="text-white text-lg font-serif">{bg.name}</h4>
                    </div>
                  </div>
                ))}

                <div 
                  className="shrink-0 w-[280px] aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-[#041e48]/10 bg-white flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:border-[#70161e]/30" 
                  onClick={() => window.open('https://wa.me/6282111334334', '_blank')}
                >
                  <Sparkles size={32} className="text-[#70161e] mb-4" />
                  <h4 className="text-lg font-serif text-[#041e48]">Custom Request</h4>
                </div>
              </motion.div>
            </div>

            {/* LAYOUT 2 (KANAN BAWAH - CTA) */}
            <div className="h-[25%] flex flex-col items-center justify-center gap-6 pb-12">
              {/* Note Kecil Di atas Tombol */}
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">sudah menentukan backgroundmu? hubungi kami.</p>
              
              <div className="flex gap-6">
                <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="px-14 py-5 bg-white border-2 border-[#041e48] text-[#041e48] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#041e48] hover:text-white hover:scale-105 shadow-xl shadow-gray-200/50 transition-all duration-300">
                  Ask Admin
                </a>
                <Link to="/portfolio" className="px-14 py-5 bg-white border-2 border-[#041e48] text-[#041e48] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#041e48] hover:text-white hover:scale-105 shadow-xl shadow-gray-200/50 transition-all duration-300">
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        /* --- MOBILE VIEW --- */
        <div className="flex flex-col bg-gray-50">
          <div className="relative min-h-[70vh] bg-black flex flex-col justify-center p-8 overflow-hidden">
             <img src={IMAGES.addOns.miniStudio} className="absolute inset-0 w-full h-full object-cover opacity-50" />
             <div className="relative z-10 space-y-8">
                <h2 className="text-5xl font-serif text-white">Photo Mini <br/> <span className="italic text-[#f5c767]">Studio</span></h2>
                <div className="space-y-4 pt-6 border-t border-white/20">
                  <p className="text-[#f5c767] text-[9px] font-bold uppercase tracking-widest">apa saja yang akan kamu dapatkan:</p>
                  <div className="grid grid-cols-1 gap-4">
                    {facilities.map((f, i) => (
                      <div key={i} className="flex gap-4 items-center text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">{f.icon}</div>
                        <p className="font-medium text-sm">{f.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          <div className="py-16">
            <div className="px-8 mb-6 space-y-1">
              <h3 className="text-xl font-serif text-[#041e48]">pilih background studiomu</h3>
              <p className="text-[10px] text-gray-400 italic">*geser untuk melihat pilihan background</p>
            </div>
            <div className="flex overflow-x-auto gap-5 px-8 snap-x snap-mandatory scrollbar-none pb-4">
              {BACKGROUND_OPTIONS.map((bg, idx) => (
                <div key={idx} className="shrink-0 w-[75vw] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl snap-center bg-white active:scale-95 transition-transform" onClick={() => setSelectedBg(bg)}>
                  <img src={bg.image} className="w-full h-full object-cover" alt={bg.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pb-20 flex flex-col items-center gap-6">
            {/* Note Mobile */}
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest text-center">sudah menentukan backgroundmu? hubungi kami.</p>
            
            <div className="w-full flex flex-col gap-4">
              <a href="https://wa.me/6282111334334" className="w-full py-6 bg-white border-2 border-[#041e48] text-[#041e48] rounded-full text-center font-bold text-sm uppercase tracking-widest hover:bg-[#041e48] hover:text-white shadow-xl shadow-gray-200/50 transition-all duration-300">Ask Admin</a>
              <Link to="/portfolio" className="w-full py-6 bg-white border-2 border-[#041e48] text-[#041e48] rounded-full text-center font-bold text-sm uppercase tracking-widest hover:bg-[#041e48] hover:text-white transition-all">View Gallery</Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {selectedBg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={closeModal}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-2xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <img src={selectedBg.preview} alt={selectedBg.name} className="w-full h-auto max-h-[75vh] object-contain" />
              <div className="p-8 text-center bg-white border-t border-gray-100">
                <h5 className="font-serif text-2xl text-[#041e48] mb-4">{selectedBg.name}</h5>
                <button onClick={closeModal} className="text-[#70161e] font-bold text-xs uppercase tracking-widest border-b-2 border-[#70161e] pb-1 hover:text-[#041e48] hover:border-[#041e48] transition-colors">Close Preview</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}