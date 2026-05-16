import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { IMAGES } from "../constants/images";

/**
 * Portfolio Section Component
 * Menampilkan galeri foto Mini Studio dan Scan Barcode
 */
export function PortfolioSection() {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    navigate(`/portfolio?category=${category}`);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#041e48] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Header Bahasa Indonesia */}
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Inspirasi Momen dari <br/> Pernikahan Nyata
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Jelajahi bagaimana layanan interaktif kami menyempurnakan dan menghidupkan suasana di setiap perayaan indah ini.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mini Studio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
            onClick={() => handleNavigate('mini-studio')}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10" />
            <img 
              src={IMAGES.portfolio.miniStudio}
              alt="Photo Mini Studio" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 z-20 group-hover:backdrop-blur-sm transition-all duration-500">
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif mb-3">Photo Mini Studio</h3>
                <p className="text-white/80 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm leading-relaxed">
                  Setup studio eksklusif yang dirancang khusus untuk menyatu sempurna dengan keindahan venue Anda.
                </p>
                <button className="px-8 py-3 bg-white/10 hover:bg-white/100 hover:text-[#041e48] backdrop-blur-md border border-white/30 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 duration-500 delay-200 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Lihat Galeri Mini Studio
                </button>
              </div>
            </div>
          </motion.div>

          {/* Scan Barcode Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
            onClick={() => handleNavigate('scan-barcode')}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10" />
            <img 
              src={IMAGES.portfolio.scanBarcode}
              alt="Photo Scan Barcode" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div 
              className="absolute inset-0 flex flex-col justify-end p-10 z-20 backdrop-blur-[1px] group-hover:backdrop-blur-sm transition-all duration-500"
            >
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif mb-3">Photo Scan Barcode</h3>
                <p className="text-white/80 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm leading-relaxed">
                  Berbagi momen secara instan dari perangkat tamu langsung ke galeri cloud Anda dalam hitungan detik.
                </p>
                <button className="px-8 py-3 bg-white/10 hover:bg-white/100 hover:text-[#041e48] backdrop-blur-md border border-white/30 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 duration-500 delay-200 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Lihat Galeri Scan Barcode
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}