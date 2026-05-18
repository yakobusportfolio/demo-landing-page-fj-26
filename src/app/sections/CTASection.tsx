import { motion } from "motion/react";
import { MessageCircle, Calendar } from "lucide-react";
import { IMAGES } from "../constants/images";
import { CheckAvailabilityModal } from "../components/CheckAvailabilityModal";
import { useCheckAvailabilityModal } from "../hooks/useCheckAvailabilityModal";

/**
 * Call-to-Action (CTA) Section Component
 * * Final section encouraging visitors to take action.
 */
export function CTASection() {
  const { isOpen, open, close } = useCheckAvailabilityModal();

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.cta.background}
          alt="Wedding portrait" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay dibuat sedikit lebih gelap agar teks putih lebih menonjol */}
        <div className="absolute inset-0 bg-[#041e48]/90 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 md:p-20"
        >
          {/* Heading yang lebih persuasif */}
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Siap Menciptakan Pengalaman Pernikahan yang Tak Terlupakan?
          </h2>
          
          {/* Subtext yang lebih hangat */}
          <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Hubungi kami hari ini untuk konsultasi ketersediaan tanggal dan temukan bagaimana layanan photo experience kami dapat menyempurnakan hari bahagia Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={open}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#041e48] hover:bg-gray-100 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <Calendar size={18} />
              Cek Ketersediaan
            </button>
            <a 
              href="https://wa.me/6282111334334" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <MessageCircle size={18} />
              Hubungi Admin
            </a>
          </div>
        </motion.div>
      </div>

      <CheckAvailabilityModal isOpen={isOpen} onClose={close} />
    </section>
  );
}