import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { PeacockFeather, RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA, GalleryItem } from '../data/invitationData';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'prewedding' | 'ceremony'>('all');

  const filteredGallery = activeTab === 'all'
    ? INVITATION_DATA.gallery
    : INVITATION_DATA.gallery.filter(item => item.category === activeTab || (activeTab === 'ceremony' && item.category === 'reception'));

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % INVITATION_DATA.gallery.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + INVITATION_DATA.gallery.length) % INVITATION_DATA.gallery.length);
    }
  };

  return (
    <section 
      id="gallery" 
      className="relative min-h-[960px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center py-16 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.storyBg})` }}
    >
      {/* Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[#b8c4ae]/85 pointer-events-none"></div>

      {/* Animated Blooming Florals on Left and Right (comp-1.gif, comp-2.gif) */}
      <div className="absolute top-12 -left-16 w-52 pointer-events-none z-10 opacity-90">
        <img src={THEME_ASSETS.foliageGif1} alt="Blooming Roses" className="w-full object-contain" />
      </div>
      <div className="absolute top-16 -right-16 w-52 pointer-events-none z-10 opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif2} alt="Swaying Leaves" className="w-full object-contain" />
      </div>

      {/* Fluttering Butterflies on Corners */}
      <div className="absolute top-64 right-2 w-16 pointer-events-none z-20">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>
      <div className="absolute bottom-40 left-2 w-16 pointer-events-none z-20 transform -scale-x-100">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>

      <div className="relative z-20 w-full max-w-sm flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
            <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#685c46] font-semibold">
              Precious Moments
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
          </div>

          <h2 className="font-aston text-4xl sm:text-5xl text-[#473c27] mt-1 mb-2">
            Galeri Bahagia
          </h2>
          <p className="font-roman text-sm text-[#51482d] italic max-w-xs mx-auto leading-relaxed">
            Lukisan kenangan indah dua insan yang bertaut dalam nuansa cinta dan restu keluarga:
          </p>
          <div className="w-20 h-[1px] bg-[#685c46]/30 mx-auto mt-3"></div>
        </motion.div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full font-cinzel text-[10px] tracking-wider uppercase font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-[#473c27] text-[#f8f6e1] shadow-md'
                : 'bg-[#f8f6e1]/80 text-[#685c46] hover:bg-[#f8f6e1]'
            }`}
          >
            Semua Foto
          </button>
          <button
            onClick={() => setActiveTab('prewedding')}
            className={`px-3.5 py-1.5 rounded-full font-cinzel text-[10px] tracking-wider uppercase font-semibold transition-all ${
              activeTab === 'prewedding'
                ? 'bg-[#473c27] text-[#f8f6e1] shadow-md'
                : 'bg-[#f8f6e1]/80 text-[#685c46] hover:bg-[#f8f6e1]'
            }`}
          >
            Prewedding
          </button>
          <button
            onClick={() => setActiveTab('ceremony')}
            className={`px-3.5 py-1.5 rounded-full font-cinzel text-[10px] tracking-wider uppercase font-semibold transition-all ${
              activeTab === 'ceremony'
                ? 'bg-[#473c27] text-[#f8f6e1] shadow-md'
                : 'bg-[#f8f6e1]/80 text-[#685c46] hover:bg-[#f8f6e1]'
            }`}
          >
            Momen Sakral
          </button>
        </div>

        {/* Dynamic Photo Masonry / Cards */}
        <div className="grid grid-cols-2 gap-3.5 w-full">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border-2 border-[#f8f6e1] shadow-lg aspect-[3/4] bg-[#473c27]/20"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gold Floral Corner Frame */}
              <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none opacity-80">
                <img src={THEME_ASSETS.goldLeafBranch} alt="Leaf" className="w-full object-contain" />
              </div>

              {/* Hover Dark Overlay with Zoom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#20271e]/90 via-[#20271e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                <div className="flex items-center gap-1 text-[#f8f6e1] mb-1">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-cinzel text-[9px] tracking-widest uppercase font-semibold">Lihat Penuh</span>
                </div>
                <p className="font-roman text-[11px] text-white line-clamp-2 italic leading-tight">
                  "{item.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <RoyalPeacockPair className="max-w-[240px] mt-10" />
      </div>

      {/* Lightbox Modal with Next / Prev Navigation */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md w-full bg-[#f8f6e1] rounded-[32px] overflow-hidden border border-[#685c46]/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Container with Prev & Next Controls */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={INVITATION_DATA.gallery[selectedImageIndex].url}
                  alt={INVITATION_DATA.gallery[selectedImageIndex].caption}
                  className="w-full h-full object-cover"
                />

                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="p-4 text-center">
                <p className="font-roman text-sm text-[#473c27] italic">
                  "{INVITATION_DATA.gallery[selectedImageIndex].caption}"
                </p>
                <span className="font-cinzel text-[10px] text-[#685c46] tracking-widest mt-1 block">
                  {selectedImageIndex + 1} dari {INVITATION_DATA.gallery.length} Foto
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scalloped Divider */}
      <div className="relative z-30 w-full mt-auto">
        <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
      </div>

    </section>
  );
};
