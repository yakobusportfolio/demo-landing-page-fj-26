import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  QrCode, CheckCircle2, Download, Frame as FrameIcon, 
  Share2, Users, Cloud, ChevronLeft, ChevronRight, Sparkles, X 
} from "lucide-react";
import { IMAGES } from "../constants/images";

const navyFrameTemplate = IMAGES.addOns.templates.navy;
const whiteFrameTemplate = IMAGES.addOns.templates.white;
const navyBannerTemplate = IMAGES.addOns.templates.navyBanner;
const whiteBannerTemplate = IMAGES.addOns.templates.whiteBanner;

const ALL_CARDS = [
  { id: 1, type: 'frame', name: "Classic Navy", image: navyFrameTemplate, desc: "Branding elegan dengan sentuhan navy premium." },
  { id: 2, type: 'frame', name: "Modern Minimal", image: whiteFrameTemplate, desc: "Frame putih bersih dengan desain garis simpel." },
  { id: 3, type: 'frame', name: "Navy Banner", image: navyBannerTemplate, desc: "Banner navy eksklusif lengkap dengan QR code." },
  { id: 4, type: 'frame', name: "White Minimal", image: whiteBannerTemplate, desc: "Overlay putih rapi yang menonjolkan foto." },
  { id: 5, type: 'cta', name: "Custom Frame?", desc: "Punya konsep warna atau tema sendiri? Kami buatkan khusus untukmu!" }
];

export function PhotoScanBarcodeStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFrame, setSelectedFrame] = useState<any>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // --- LOGIKA AUTO-SLIDE GAMBAR ---
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = IMAGES.scanBarcode.placeholderPhotos;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Timer Global untuk ganti foto setiap 3 detik
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, [photos.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- KALIBRASI TIMING (INTRO -> GALLERY -> EXIT) ---
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const introDisplay = useTransform(scrollYProgress, (pos) => pos > 0.28 ? "none" : "flex");

  const galleryOpacity = useTransform(scrollYProgress, [0.15, 0.25, 1], [0, 1, 1]);
  
  // Berakhir di 1.0 agar tidak ada white screen
  const xMove = useTransform(scrollYProgress, [0.3, 1], ["0%", "-190%"]);
  const smoothX = useSpring(xMove, { stiffness: 50, damping: 25, mass: 0.5 });

  const benefits = [
    { icon: <Download size={22} />, title: "Download Foto Instan", desc: "Scan QR code buat langsung simpan foto ke HP-mu." },
    { icon: <FrameIcon size={22} />, title: "Frame Foto Elegan", desc: "Desain cantik yang bikin fotomu makin estetik." },
    { icon: <Share2 size={22} />, title: "Siap Pamer di Sosmed", desc: "Ukurannya pas buat di-share ke Story atau Feed." },
    { icon: <Users size={22} />, title: "Akses Tanpa Batas", desc: "Semua tamu undangan bebas download sepuasnya." },
    { icon: <Cloud size={22} />, title: "Galeri Cloud 30 Hari", desc: "Simpan momen bahagiamu di cloud selama sebulan." },
  ];

  return (
    <section ref={containerRef} className={`relative ${isDesktop ? 'h-[500vh]' : 'h-auto'} bg-white overflow-clip`}>
      
      {isDesktop ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
          
          {/* --- LAYER 1: INTRO --- */}
          <motion.div 
            style={{ opacity: introOpacity, display: introDisplay, zIndex: 100 }}
            className="absolute inset-0 flex items-center justify-center bg-[#041e48]"
          >
            <img src={IMAGES.scanBarcode.introBg} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Intro" />
            <div className="relative z-10 max-w-6xl w-full text-center px-20 space-y-12">
              <h2 className="text-7xl font-serif text-white leading-tight">Photo Scan Barcode <br/><span className="italic text-[#ffffff]">Experience</span></h2>
              <div className="grid grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                  <div key={i} className={`p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center gap-4 ${i >= 3 ? 'col-span-1 transform lg:translate-x-1/2' : ''}`}>
                    <div className="text-[#f5c767]">{b.icon}</div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">{b.title}</h4>
                    <p className="text-white/50 text-[11px] leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#f5c767] text-[10px] font-bold uppercase tracking-[0.5em] pt-8 animate-pulse">Scroll untuk galeri ↓</p>
            </div>
          </motion.div>

          {/* --- LAYER 2: GALLERY --- */}
          <motion.div 
            style={{ opacity: galleryOpacity, zIndex: 50 }}
            className="absolute inset-0 bg-gray-50 flex flex-col justify-center"
          >
            <div className="absolute top-16 left-0 right-0 text-center space-y-2 pointer-events-none">
              <h3 className="text-4xl font-serif text-[#041e48]">Koleksi Frame & Watermark Banner Estetik</h3>
              <p className="text-gray-400 text-sm italic tracking-wide">Pilih desain terbaik untuk mengabadikan momen bahagiamu.</p>
            </div>

            <motion.div style={{ x: smoothX }} className="flex gap-16 pl-[15vw] pr-[20vw] items-center">
              {ALL_CARDS.map((card) => (
                <div key={card.id} className="shrink-0">
                  {card.type === 'cta' ? (
                    <div className="w-[42vw] aspect-[3/2] flex flex-col items-center justify-center bg-gradient-to-br from-[#041e48] to-[#1b355e] rounded-xl shadow-2xl p-16 text-center text-white border border-white/10 group">
                      <Sparkles size={64} className="text-[#f5c767] mb-6" />
                      <h4 className="text-4xl font-serif mb-4">{card.name}</h4>
                      <p className="text-white/60 text-lg mb-10 max-w-sm mx-auto">{card.desc}</p>
                      <a href="https://wa.me/6282111334334" target="_blank" rel="noreferrer" className="px-16 py-5 bg-[#f5c767] text-[#041e48] rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl">Tanya Admin</a>
                    </div>
                  ) : (
                    <div className="w-[42vw] space-y-8">
                      <div 
                        onClick={() => setSelectedFrame(card)}
                        className="relative aspect-[3/2] rounded-xs overflow-hidden shadow-2xl bg-white cursor-pointer group border border-gray-100"
                      >
                        {/* AUTO-SLIDING PHOTOS */}
                        <div className="absolute aspect-[3/2] top-[1%] bottom-[1%] left-[2.2%] right-[2.2%] z-5 scale-107 overflow-hidden rounded-sm bg-gray-200">
                          <AnimatePresence mode="wait">
                            <motion.img 
                              key={photoIndex}
                              src={photos[photoIndex]} 
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1 }}
                              className="aspect-[3/2] object-cover" 
                              alt="Wedding" 
                            />
                          </AnimatePresence>
                        </div>
                        <img src={card.image} className="absolute inset-0 w-full h-full object-contain z-10" alt="Frame" />
                        <div className="absolute inset-0 bg-[#041e48]/0 group-hover:bg-[#041e48]/20 transition-all duration-500 z-20 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white text-[#041e48] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all shadow-lg">
                                <Sparkles size={24} />
                            </div>
                        </div>
                      </div>
                      <div className="text-center px-10">
                        <h4 className="font-serif font-bold text-3xl text-[#041e48]">{card.name}</h4>
                        <p className="text-gray-500 text-lg">{card.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
              <p className="text-[10px] font-bold text-[#70161e] uppercase tracking-[0.4em] animate-pulse">Scroll / Swipe untuk melihat lainnya →</p>
            </div>
          </motion.div>
        </div>
      ) : (
       /* --- MOBILE VIEW (FIXED & CLEAN) --- */
        <div className="flex flex-col bg-white pb-10">
          {/* Header */}
          <div className="bg-[#041e48] p-12 text-center text-white">
              <h2 className="text-3xl font-serif leading-tight">
                Photo Scan Barcode <br/>
                <span className="italic text-[#f5c767]">Experience</span>
              </h2>
          </div>

          {/* List Container - px-6 untuk jarak kiri kanan yang seimbang */}
          <div className="px-6 py-10 space-y-12">
              {ALL_CARDS.map((f, i) => (
                <div key={i} className="space-y-4">
                  {/* 1. Container Utama Frame (Landscape 3/2) */}
                  <div 
                    className="relative aspect-[3/2] w-full rounded-sm overflow-hidden shadow-lg border border-gray-100 bg-gray-50" 
                    onClick={() => f.type !== 'cta' && setSelectedFrame(f)}
                  >
                      {f.type !== 'cta' ? (
                        <>
                          {/* 2. Layer Foto (DI BELAKANG) */}
                          {/* Ganti baris div pembungkus foto ini */}
                          <div className="absolute md:top-[3%] md:bottom-[3%] md:left-[4%] md:right-[4%] overflow-hidden rounded-sm">
                            <img 
                              src={photos[photoIndex]} 
                              className="w-full h-full object-cover transition-opacity duration-1000" 
                              alt="Wedding" 
                            />
                          </div>

                          {/* 3. Layer Template Frame (DI DEPAN) */}
                          <img 
                            src={f.image} 
                            className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" 
                            alt="Frame Overlay" 
                          />
                        </>
                      ) : (
                        /* Kartu CTA Mobile */
                        <div className="absolute inset-0 bg-[#041e48] p-8 text-center text-white flex flex-col justify-center items-center">
                          <Sparkles size={32} className="text-[#f5c767] mb-4" />
                          <h4 className="text-xl font-serif mb-4">Custom Frame?</h4>
                          <a 
                            href="https://wa.me/6282111334334" 
                            className="px-8 py-3 bg-[#f5c767] text-[#041e48] rounded-full font-bold text-[10px] uppercase tracking-widest"
                          >
                            Tanya Admin
                          </a>
                        </div>
                      )}
                  </div>

                  {/* Keterangan Kartu */}
                  {f.type !== 'cta' && (
                    <div className="text-center px-4">
                        <h4 className="font-serif text-xl text-[#041e48] font-bold">{f.name}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
)}

      {/* ═══════════════════════════════════════════════ */}
      {/* MODAL OVERLAY ONLY (FIXED INSET & BIGGER VIEW) */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedFrame && selectedFrame.type !== 'cta' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-10" 
            onClick={() => setSelectedFrame(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative max-w-7xl w-full bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-fit max-h-[90vh]" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Close */}
              <button 
                onClick={() => setSelectedFrame(null)} 
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white md:text-black md:bg-black/5 flex items-center justify-center hover:bg-black/10 transition-all shadow-lg"
              >
                <X size={28} />
              </button>
              
              {/* SISI KIRI: PREVIEW RAKSASA (75% Lebar) */}
              <div className="md:w-3/2 inset-[1.3%] bg-[#f3f3f3] relative flex items-center justify-center overflow-hidden min-h-[50vh] md:min-h-[80vh]">
                 <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                    
                    {/* [BAGIAN ADJUSTMENT FOTO - FIXED & CLEAN] */}
                    {/* Simplified and standardized Insets to push content down and inwards. */}
                    {/* Ganti div penampung foto dengan settingan top/bottom/left/right ini */}
                    <div className="absolute top-[7.8%] bottom-[8%] left-[4.2%] right-[4.2%] md:left-[4.2%] md:right-[4.2%] z-5 overflow-hidden rounded-xs bg-gray-200">
                       <AnimatePresence mode="wait">
                         <motion.img 
                            key={photoIndex}
                            src={photos[photoIndex]} 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="w-full h-full object-cover object-center" 
                            alt="Detailed Preview" 
                         />
                       </AnimatePresence>
                    </div>

                    {/* [LAYER FRAME TEMPLATE] */}
                    <img 
                      src={selectedFrame.image} 
                      className="relative inset-0 z-10 w-full h-full object-contain scale-98 rounded-xs pointer-events-none" 
                      alt="Frame Outline" 
                    />
                 </div>
              </div>
              
              {/* SISI KANAN: DESKRIPSI (25% Lebar) */}
              <div className="md:w-1/3 p-8 md:p-10 flex flex-col justify-center bg-white border-t md:border-t-0 md:border-l border-gray-100">
                <div className="space-y-6">
                  <div>
                    <p className="text-[#70161e] text-[10px] font-bold uppercase tracking-[0.4em] mb-2 font-serif">Add-on Detail</p>
                    <h5 className="text-3xl font-serif text-[#041e48] leading-tight">{selectedFrame.name}</h5>
                  </div>
                  
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {selectedFrame.desc}
                  </p>

                  <div className="pt-6">
                    <a 
                      href="https://wa.me/6282111334334" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#041e48] text-white rounded-full text-center font-bold text-[10px] uppercase tracking-widest hover:bg-[#1b355e] transition-all shadow-xl"
                    >
                      <QrCode size={14} /> Pesan Sekarang
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}