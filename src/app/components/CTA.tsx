import React from "react";
import { motion } from "motion/react";
import { MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router";
import { IMAGES } from "../constants/images";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden" id="contact">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.cta.background}
          alt="Wedding portrait" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#041e48]/85 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to Customize Your Wedding Experience?</h2>
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
            Contact us today to discuss availability and learn how our photo experiences can elevate your celebration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#041e48] hover:bg-gray-100 rounded-full font-medium transition-colors"
            >
              <Calendar size={20} />
              Check Availability
            </Link>
            <a 
              href="https://wa.me/6282111334334" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-medium transition-colors"
            >
              <MessageCircle size={20} />
              Chat with Admin
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}