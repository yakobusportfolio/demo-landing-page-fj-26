import React from "react";
import { motion } from "motion/react";
import { Users, Share2, Heart } from "lucide-react";

/**
 * Benefits Section Component
 * 
 * Displays the three main benefits of the wedding photography service:
 * 1. Interactive Guest Experience
 * 2. Instant Shared Memories
 * 3. Beautiful Wedding Keepsakes
 */
export function BenefitsSection() {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Interactive Guest Experience",
      description: "Engage your loved ones with immersive photo opportunities that keep them entertained throughout the celebration."
    },
    {
      icon: <Share2 className="w-8 h-8 text-white" />,
      title: "Instant Shared Memories",
      description: "Let guests instantly access and share their favorite moments right from their devices in real-time."
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Beautiful Wedding Keepsakes",
      description: "Take home physical and digital mementos that perfectly capture the joy and aesthetic of your special day."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-[#041e48]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Make Your Wedding Even More Memorable</h2>
          <div className="w-24 h-1 bg-[#70161e] mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-4">{benefit.title}</h3>
              <p className="text-white/70 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}