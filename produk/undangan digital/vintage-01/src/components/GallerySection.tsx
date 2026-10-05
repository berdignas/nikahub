import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            Memories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A]">
            Galeri Foto
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INVITATION_DATA.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className="relative group cursor-pointer arch-frame h-64 border-2 border-[#E6DCCE] hover:border-[#C5A059] shadow-vintage overflow-hidden bg-white"
            >
              <img 
                src={img} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <ImageIcon className="w-8 h-8" />
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
              className="absolute top-4 right-4 text-white hover:text-[#C5A059] p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-[#C5A059] p-2"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <img
              src={INVITATION_DATA.gallery[selectedImageIndex]}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-[#C5A059] p-2"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
