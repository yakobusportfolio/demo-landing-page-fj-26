import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { IMAGES } from "../constants/images";

/**
 * Portfolio Section Component
 * 
 * Displays two clickable portfolio cards:
 * 1. Photo Mini Studio - Links to mini-studio portfolio
 * 2. Photo Scan Barcode - Links to scan-barcode portfolio
 * 
 * Features:
 * - Hover effects with image zoom and overlay reveal
 * - Smooth navigation to portfolio page with scroll reset
 * - Category filtering via URL query parameter
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
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">See These Experiences in Real Weddings</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Explore how our interactive additions elevated these beautiful celebrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mini Studio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-[500px] overflow-hidden rounded-xl cursor-pointer"
            onClick={() => handleNavigate('mini-studio')}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            <img 
              src={IMAGES.portfolio.miniStudio}
              alt="Photo Mini Studio" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 backdrop-blur-[2px] opacity-90 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-500">
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif mb-3">Photo Mini Studio</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Elegant studio setups seamlessly integrated into your venue.
                </p>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 duration-500 delay-200">
                  View Mini Studio Gallery
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
            className="group relative h-[500px] overflow-hidden rounded-xl cursor-pointer"
            onClick={() => handleNavigate('scan-barcode')}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            <img 
              src={IMAGES.portfolio.scanBarcode}
              alt="Photo Scan Barcode" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div 
              className="absolute inset-0 flex flex-col justify-end p-8 z-20 backdrop-blur-[2px] opacity-90 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-500"
            >
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif mb-3">Photo Scan Barcode</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Instant sharing experiences from guest devices directly to your gallery.
                </p>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 duration-500 delay-200">
                  View Scan Barcode Gallery
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
