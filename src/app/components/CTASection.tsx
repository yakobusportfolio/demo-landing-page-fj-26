import { motion } from 'motion/react';
import { Calendar, MessageCircle } from 'lucide-react';
import { useInView } from './useInView';

export function CTASection() {
  const { ref, isInView } = useInView();

  const handleWhatsApp = () => {
    window.open('https://wa.me/6282111334334', '_blank');
  };

  return (
    <section id="cta" ref={ref} className="py-24 px-6 bg-[#041e48]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl text-white mb-8"
        >
          Ready to Customize Your Wedding Experience?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-lg mb-12 max-w-2xl mx-auto"
        >
          Let's create unforgettable memories together. Check our availability or chat with our team to discuss your wedding needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-8 py-4 bg-[#70161e] text-white rounded-full hover:opacity-90 transition-all shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Check Availability
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Admin
          </button>
        </motion.div>
      </div>
    </section>
  );
}
