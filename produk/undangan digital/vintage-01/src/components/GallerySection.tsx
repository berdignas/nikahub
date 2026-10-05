import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + INVITATION_DATA.gallery.length) % INVITATION_DATA.gallery.length);
    }
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % INVITATION_DATA.gallery.length);
    }
  };

  return (
    <section id="galeri" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1 bg-white px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Momen Bahagia</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2">
            Galeri Foto
          </h2>
        </motion.div>

        {/* Gallery Grid with Staggered Scale Entrance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INVITATION_DATA.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6, type: "spring", stiffness: 140 }}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer arch-frame h-64 border-2 border-[#E6DCCE] hover:border-[#C5A059] shadow-vintage overflow-hidden bg-white active:scale-95 transition-all duration-300"
            >
              <img 
                src={img} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2">
                <ImageIcon className="w-8 h-8 mb-1 animate-bounce" />
                <span className="text-[10px] font-semibold uppercase tracking-widest">Lihat Foto</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-[#C5A059] p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-3 text-white hover:text-[#C5A059] p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              src={INVITATION_DATA.gallery[selectedImageIndex]}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />

            <button
              onClick={nextImage}
              className="absolute right-3 text-white hover:text-[#C5A059] p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
