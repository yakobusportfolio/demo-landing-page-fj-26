import React from "react";
import { motion } from "motion/react";

/**
 * Testimonials Section Component
 * 
 * Displays client testimonials in a three-column grid layout.
 * Each testimonial includes:
 * - Client names
 * - Venue name
 * - Testimonial text with decorative quote
 * 
 * Features staggered fade-in animations for each testimonial card.
 */
export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah & James",
      venue: "Alila Solo",
      text: "The Photo Mini Studio was a massive hit! Our guests loved feeling like models, and the terracotta background matched our theme perfectly. The quality is incredible."
    },
    {
      name: "Amanda & Kevin",
      venue: "Best Western Solo Baru",
      text: "Having the scan barcode experience meant we could see everyone's perspective of our wedding the very next morning. Such a fun and seamless process!"
    },
    {
      name: "Nadia & Reza",
      venue: "Diamond Convention Hall",
      text: "Faralljibrill Photography truly elevated our reception. The operator was so helpful, and the guests couldn't stop talking about how modern and fun the photo setups were."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#041e48] mb-6">What Our Couples Say</h2>
          <div className="w-24 h-1 bg-[#70161e] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-2xl relative"
            >
              <div className="text-6xl text-[#1b355e]/10 font-serif absolute top-4 left-6">"</div>
              <p className="text-gray-600 mb-8 relative z-10 italic pt-6">
                "{testimonial.text}"
              </p>
              <div className="flex flex-col">
                <span className="font-serif text-[#041e48] text-xl font-medium">{testimonial.name}</span>
                <span className="text-sm text-[#70161e] uppercase tracking-wider mt-1">{testimonial.venue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
