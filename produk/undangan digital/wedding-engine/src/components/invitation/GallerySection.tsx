'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';
import { GalleryItem } from '@/types';

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  items: GalleryItem[];
}

export function GallerySection({
  title = 'Moments of Love',
  subtitle = 'Galeri Foto Kebersamaan Kami',
  items,
}: GallerySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === 0 ? items.length - 1 : selectedIdx - 1);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx(selectedIdx === items.length - 1 ? 0 : selectedIdx + 1);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            {title}
          </h2>
          <VintageDivider />
        </div>
      </ScrollReveal>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item, idx) => (
          <ScrollReveal key={item.id} animation="scaleIn" delay={idx * 0.1}>
            <div
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-gold/30 bg-cream/50 shadow-sm aspect-4/5 sm:aspect-square"
            >
              <img
                src={item.url}
                alt={item.caption || `Gallery photo ${idx + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-vintage-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2.5 rounded-full bg-cream/90 text-vintage-900 shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5 text-gold" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-gold/40 shadow-2xl relative"
          >
            <img
              src={items[selectedIdx].url}
              alt={items[selectedIdx].caption || 'Selected gallery'}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            {items[selectedIdx].caption && (
              <div className="p-3 bg-vintage-900/90 text-gold-light text-center font-serif text-sm">
                {items[selectedIdx].caption}
              </div>
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
