import { motion } from 'motion/react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { useInView } from './useInView';

interface AddOnSectionProps {
  title: string;
  description: string;
  images?: string[];
  features?: string[];
  note?: string;
  reversed?: boolean;
  backgrounds?: Array<{ color: string; label: string }>;
  onGalleryClick: () => void;
}

export function AddOnSection({
  title,
  description,
  images = [],
  features = [],
  note,
  reversed = false,
  backgrounds = [],
  onGalleryClick
}: AddOnSectionProps) {
  const { ref, isInView } = useInView();

  const handleWhatsApp = () => {
    window.open('https://wa.me/6282111334334', 'https://wa.me/6281227663007', '_blank');
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-[#1b355e]">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-16 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={reversed ? 'md:order-2' : ''}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              {title}
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Backgrounds Preview */}
            {backgrounds.length > 0 && (
              <div className="mb-8">
                <p className="text-white/80 mb-4">Background Preview:</p>
                <div className="grid grid-cols-2 gap-4">
                  {backgrounds.map((bg, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="h-24 rounded-lg mb-2"
                        style={{ backgroundColor: bg.color }}
                      />
                      <p className="text-white/70 text-sm">{bg.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features List */}
            {features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <span className="text-[#70161e] mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Note */}
            {note && (
              <p className="text-white/70 italic text-sm mb-8">
                {note}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-6 py-3 bg-[#70161e] text-white rounded-full hover:opacity-90 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Admin
              </button>
              <button
                onClick={onGalleryClick}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View {title} Gallery
              </button>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-2 gap-4 ${reversed ? 'md:order-1' : ''}`}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={onGalleryClick}
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 group-hover:shadow-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
