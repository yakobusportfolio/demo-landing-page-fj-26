import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoSliderProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
}

export function PhotoSlider({ images, currentIndex, onClose }: PhotoSliderProps) {
  const [index, setIndex] = useState(currentIndex ?? 0);

  useEffect(() => {
    if (currentIndex !== null) {
      setIndex(currentIndex);
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  if (currentIndex === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-6 p-3 hover:bg-white/10 rounded-full transition-all z-10"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Image */}
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          src={images[index]}
          alt={`Photo ${index + 1}`}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 p-3 hover:bg-white/10 rounded-full transition-all z-10"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}