import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles, Play, Film } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { SectionCard } from './SectionCard';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + INVITATION_DATA.gallery.length) % INVITATION_DATA.gallery.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % INVITATION_DATA.gallery.length);
    }
  };

  return (
    <SectionCard id="galeri">
      <div className="text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Our Memories</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2 mb-2">
            Galeri Momen Bahagia
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light leading-relaxed max-w-md mx-auto">
            Setiap potret mengabadikan sejuta cerita, tawa, dan janji suci kami berdua
          </p>
        </motion.div>

        {/* Video Prewedding Teaser Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8 rounded-2xl overflow-hidden border-2 border-[#E6DCCE] shadow-lg relative group bg-black/90 aspect-video max-w-lg mx-auto"
        >
          <iframe
            src="https://www.youtube.com/embed/jfKfPfyJRdk?controls=1&rel=0"
            title="Wedding Video Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gallery Grid with Staggered Scale Entrance & Arch Frames */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {INVITATION_DATA.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer h-48 sm:h-56 rounded-2xl border-2 border-[#E6DCCE] hover:border-[#C5A059] shadow-md overflow-hidden bg-[#FAF6F0] active:scale-95 transition-all duration-300"
            >
              <img 
                src={img} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2">
                <ImageIcon className="w-7 h-7 mb-1 animate-bounce" />
                <span className="text-[10px] font-semibold uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Lihat Foto
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-[#C5A059] p-3 bg-white/10 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-6 text-white hover:text-[#C5A059] p-3 bg-white/10 rounded-full backdrop-blur-md transition-colors z-10"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.img
              key={selectedImageIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={INVITATION_DATA.gallery[selectedImageIndex]}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-6 text-white hover:text-[#C5A059] p-3 bg-white/10 rounded-full backdrop-blur-md transition-colors z-10"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionCard>
  );
};
