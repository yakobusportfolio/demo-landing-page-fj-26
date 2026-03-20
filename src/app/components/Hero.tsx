import React from "react";
import { motion } from "motion/react";
import { IMAGES } from "../constants/images";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.hero.main}
          alt="Elegant wedding photography couple"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
        >
          Customize Your Wedding Experience
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light"
        >
          Create a more memorable celebration with interactive photo experiences designed for you and your guests.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#041e48] hover:bg-[#1b355e] text-white rounded-full text-sm font-medium transition-colors text-center"
          >
            Check Availability
          </a>
          <a 
            href="#add-ons"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium transition-colors text-center"
          >
            Explore Add-Ons
          </a>
          <a 
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-medium transition-colors text-center"
          >
            View Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}