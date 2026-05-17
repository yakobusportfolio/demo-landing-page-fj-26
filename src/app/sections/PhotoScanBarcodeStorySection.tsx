import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, Download, Frame as FrameIcon, Share2, Users, Cloud, Sparkles, X } from "lucide-react";
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

const BENEFITS = [
  { icon: <Download size={18} />, title: "Download Foto Instan", desc: "Scan QR code buat langsung simpan foto ke HP-mu." },
  { icon: <FrameIcon size={18} />, title: "Frame Foto Elegan", desc: "Desain cantik yang bikin fotomu makin estetik." },
  { icon: <Share2 size={18} />, title: "Siap Pamer di Sosmed", desc: "Ukurannya pas buat di-share ke Story atau Feed." },
  { icon: <Users size={18} />, title: "Akses Tanpa Batas", desc: "Semua tamu undangan bebas download sepuasnya." },
  { icon: <Cloud size={18} />, title: "Galeri Cloud 30 Hari", desc: "Simpan momen bahagiamu di cloud selama sebulan." },
];

export function PhotoScanBarcodeStorySection() {
  const [selectedFrame, setSelectedFrame] = useState<any>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = IMAGES.scanBarcode.placeholderPhotos;

  // Efek Auto-Slide untuk simulasi foto di dalam bingkai (3 Detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  // Efek Pengunci Scroll saat modal preview aktif (MENUNJANG KEBERHASILAN PORTAL BODY)
  useEffect(() => {
    if (selectedFrame) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [selectedFrame]);

  // PERBAIKAN STACKING MODAL: Menargetkan document.body secara eksplisit (Single Source of Truth untuk stacking mutlak)
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  return (
    <section id="scan-barcode" className="w-full bg-white flex flex-col relative z-10">
      
      {/* =========================================================================
          BLOK ATAS: HERO BANNER (KONSISTEN DENGAN LAYOUT ADD-ONS)
          ========================================================================= */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black py-20">
        
        {/* Latar Belakang Kisi Foto Jernih */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 h-full w-full">
          {photos.slice(0, 4).map((imgUrl, idx) => (
            <img 
              key={idx} 
              src={imgUrl} 
              alt={`Scan Barcode Grid ${idx + 1}`} 
              className="w-full h-full object-cover" 
            />
          ))}
        </div>
        
        {/* Overlay Kontras Hitam */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Konten Utama Banner */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Tipografi Heading (text-5xl md:text-7xl font-serif text-white) SAMA PERSIS dengan Hero.tsx */}
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight drop-shadow-lg">
            Photo Scan Barcode <br className="hidden sm:inline" /><span className="italic font-light">Experience</span>
          </h2>
          
          {/* Tipografi Sub-heading (text-lg md:text-xl font-light) SAMA PERSIS dengan Hero.tsx */}
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-10">
            Beri kemudahan bagi tamu undangan untuk mengakses, mengunduh, dan membagikan foto momen perayaan Anda secara instan.
          </p>

          {/* Rincian Keunggulan Layanan Tersusun Vertikal Nyaman */}
          <div className="flex flex-col items-center gap-3.5 border-t border-white/20 pt-8 w-full max-w-md">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex items-center gap-3.5 w-full justify-center sm:justify-start sm:pl-6">
                {/* Penambahan warna ikon agar serasi di background gelap */}
                <span className="text-[#c8b89a] shrink-0">{b.icon}</span>
                <span className="text-white/95 text-[11px] md:text-sm font-medium tracking-widest uppercase text-left">
                  {b.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOK BAWAH: AREA INTERAKTIF (RASIO 40:60 - GRID KARTU ASIMETRIS)
          ========================================================================= */}
      <div className="w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-50/50">
        <div className="w-full px-6 py-20 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Sisi Kiri: Deskripsi Teks & Tombol Portfolio Baru (Porsi ~40% / lg:col-span-5) */}
          <div className="relative z-20 space-y-6 md:space-y-8 text-center lg:text-left lg:col-span-5">
            <div className="space-y-4 md:space-y-6">
              {/* Heading Grid disamakan ukurannya text-5xl md:text-7xl font-serif text-[#041e48] */}
              <h3 className="text-5xl md:text-7xl font-serif text-[#041e48] leading-[1.1]">
                Koleksi Desain Frame
              </h3>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Pilih watermark banner atau bingkai cetak terbaik untuk menyempurnakan visual setiap dokumentasi para tamu.
              </p>
            </div>
            
            {/* PERBAIKAN: Penambahan Tombol Portfolio Baru (px-8 md:px-12 py-4 text-xs md:text-sm font-bold uppercase) */}
            <div className="pt-2 md:pt-4">
              <Link 
                to="/portfolio?category=scan-barcode"
                className="inline-block bg-[#041e48] text-white rounded-full px-8 md:px-12 py-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#1b355e] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center"
              >
                Show More Portfolio
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Tata Letak Kartu (Porsi ~60% / lg:col-span-7) */}
          <div className="w-full lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-h-[650px] overflow-y-auto pr-2 scrollbar-thin">
            {ALL_CARDS.map((card) => (
              <div key={card.id} className="w-full group">
                {card.type === 'cta' ? (
                  
                  /* KARTU TEMPLATE CTA CUSTOM */
                  <div className="relative aspect-[3/2] flex flex-col items-center justify-center bg-[#041e48] rounded-2xl shadow-xl p-8 text-center text-white border border-[#1b355e] overflow-hidden hover:-translate-y-1.5 transition-all duration-300 h-full min-h-[220px]">
                    <div className="relative z-10 space-y-4">
                      <Sparkles size={32} className="text-white mx-auto opacity-90" />
                      <h4 className="text-2xl font-serif">{card.name}</h4>
                      <p className="text-white/70 text-xs font-light max-w-[220px] mx-auto">{card.desc}</p>
                      {/* Tombol CTA kartu juga disamakan ukuran paddingnya */}
                      <a 
                        href="https://wa.me/6282111334334" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-block mt-2 px-8 md:px-12 py-4 bg-white text-[#041e48] rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-md active:scale-95"
                      >
                        Tanya Admin
                      </a>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                  </div>

                ) : (
                  
                  /* KARTU TEMPLATE BINGKAI FOTO */
                  <div className="space-y-3">
                    <div 
                      onClick={() => setSelectedFrame(card)}
                      className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white cursor-pointer border border-gray-100/70 transition-all duration-300 hover:-translate-y-1.5"
                    >
                      {/* LAYAR UTAMA SLIDESHOW FOTO */}
                      <div className="absolute top-[1.5%] bottom-[1.5%] left-[2.2%] right-[2.2%] z-5 overflow-hidden rounded-sm bg-gray-100">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={photoIndex}
                            src={photos[photoIndex]} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full object-cover" 
                            alt="Preview Dokumentasi Pernikahan" 
                          />
                        </AnimatePresence>
                      </div>
                      {/* OVERLAY FRAME PRODUK */}
                      <img src={card.image} className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" alt={card.name} />
                      
                      {/* INDIKATOR HOVER KLIK PREVIEW */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[1px]">
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase border border-white/40 px-4 py-2 rounded-full bg-black/20">
                          Pratinjau
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center px-2">
                      <h4 className="font-serif font-bold text-lg text-[#041e48]">{card.name}</h4>
                      <p className="text-gray-400 text-xs font-light">{card.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* =========================================================================
          PERBAIKAN STACKING BUG: MODAL PREVIEW LIGHTBOX DI RENDER KE PORTAL document.body
          Ini menjamin Jendela Preview muncul di lapisan TERATAS MUTLAK dan BEBAS BUG gulir layar.
          ========================================================================= */}
      {portalTarget && createPortal(
        <AnimatePresence>
          {selectedFrame && selectedFrame.type !== 'cta' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Menggunakan z-index tinggi z-[300] di dalam body
              className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedFrame(null)}
            >
              {/* Tombol Silang Kanan Atas */}
              <button onClick={() => setSelectedFrame(null)} className="absolute top-6 right-6 text-white hover:opacity-80 transition-opacity z-[320] w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"><X size={24} /></button>
              
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-[850px] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bagian Kiri: Area Gambar Preview Super Besar */}
                <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center min-h-[30vh] md:min-h-[50vh]">
                  <div className="relative w-full h-full flex items-center justify-center p-6 md:p-10">
                    <div className="absolute top-[9%] bottom-[7%] left-[5.1%] right-[5.1%] z-5 overflow-hidden rounded-xs bg-gray-200">
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={photoIndex}
                          src={photos[photoIndex]} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover object-center" 
                          alt="Detail Momen" 
                        />
                      </AnimatePresence>
                    </div>
                    <img src={selectedFrame.image} className="relative inset-0 z-10 w-full h-full object-contain pointer-events-none" alt="Template Border Outline" />
                  </div>
                </div>

                {/* Bagian Kanan: Area Teks Informasi & Aksi */}
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[#70161e] text-[9px] font-bold uppercase tracking-[0.4em] mb-1">Add-on Detail</p>
                      <h3 className="text-2xl md:text-3xl font-serif text-[#041e48] leading-tight">{selectedFrame.name}</h3>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed">{selectedFrame.desc}</p>
                    <div className="pt-2">
                      <a 
                        href="https://wa.me/6282111334334" 
                        target="_blank" 
                        rel="noreferrer" 
                        // Tombol Pesan Sekarang juga disamakan ukuran paddingnya px-8 md:px-12 py-4 text-xs md:text-sm font-bold
                        className="flex items-center justify-center gap-2 w-full px-8 md:px-12 py-4 bg-[#041e48] text-white rounded-full text-center text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#1b355e] transition-all shadow-md active:scale-95"
                      >
                        <QrCode size={14} /> Pesan Sekarang
                      </a>
                    </div>
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