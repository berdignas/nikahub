import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const handleNext = () => {
    if (activePhoto !== null) {
      setActivePhoto((activePhoto + 1) % invitationData.gallery.length);
    }
  };

  const handlePrev = () => {
    if (activePhoto !== null) {
      setActivePhoto(
        (activePhoto - 1 + invitationData.gallery.length) % invitationData.gallery.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-18 px-6 bg-[#EEF0E9] text-center overflow-hidden">
      <div className="relative z-10 max-w-[420px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px", amount: 0.15 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="font-serif italic text-xs sm:text-sm text-[#767D63] tracking-[0.25em] uppercase block mb-1 font-semibold">
            Our Memories
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Galeri Foto
          </h2>
          <div className="w-24 my-2.5 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* 8-Photo Masonry Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {invitationData.gallery.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px", amount: 0.15 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: (idx % 2) * 0.1 }}
              onClick={() => setActivePhoto(idx)}
              className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-[#C2A676]/40 bg-white aspect-[3/4]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#3A402B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#51583D] shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <motion.div
              key={activePhoto}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-lg max-h-[85vh] rounded-2xl overflow-hidden border border-[#C2A676]/50 shadow-2xl"
            >
              <img
                src={invitationData.gallery[activePhoto].src}
                alt={invitationData.gallery[activePhoto].alt}
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
