import React, { useState } from 'react';
import { X, Download, Sparkles, Calendar, MapPin, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { EventInfo } from '../types';

interface CouplePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventInfo: EventInfo;
}

export const CouplePhotoModal: React.FC<CouplePhotoModalProps> = ({
  isOpen,
  onClose,
  eventInfo,
}) => {
  const galleryImages = eventInfo.galleryImages && eventInfo.galleryImages.length > 0
    ? eventInfo.galleryImages
    : [eventInfo.coverImage];

  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  const currentPhoto = galleryImages[activeIndex] || galleryImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto;
    link.download = `potret-resmi-mempelai-alfarisyi-maulidiyah-${activeIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A261D]/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-white border border-[#E6CA92]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Photo & Carousel Container */}
        <div className="relative md:w-3/5 bg-[#0e1612] flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[560px] p-4">
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <img
              key={activeIndex}
              src={currentPhoto}
              alt={`Foto Resmi Mempelai ${activeIndex + 1}`}
              className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-lg"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-lg"
                  title="Foto Berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Top Badge */}
            <div className="absolute top-2 left-2">
              <span className="px-3.5 py-1 rounded-full bg-[#0A261D]/80 backdrop-blur-md border border-[#E6CA92]/40 text-[#E6CA92] text-xs font-sans font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#E6CA92]" />
                Foto Resmi Mempelai ({activeIndex + 1}/{galleryImages.length})
              </span>
            </div>
          </div>

          {/* Thumbnail Bar */}
          {galleryImages.length > 1 && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'border-[#E6CA92] scale-105 shadow-md ring-2 ring-[#E6CA92]/40'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] text-white px-1 rounded-tl">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description & Blessing */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#C5A880] mb-1">
                The Royal Wedding Gallery
              </p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D] leading-tight mb-2">
                {eventInfo.groomName} <br />
                <span className="font-serif italic font-normal text-[#C5A880] text-xl">&</span> <br />
                {eventInfo.brideName}
              </h2>
            </div>

            <div className="space-y-2 text-xs font-sans text-gray-600 border-y border-gray-100 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{eventInfo.eventDateText}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{eventInfo.venueName}</span>
              </div>
            </div>

            {/* Wedding Quranic Quote */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/30">
              <p className="font-serif italic text-xs text-[#0A261D]/85 leading-relaxed">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <span className="block mt-2 text-[10px] font-sans font-bold text-[#C5A880]">
                — QS. Ar-Rum: 21
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-4 space-y-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0A261D] to-[#164E3D] text-[#E6CA92] font-sans text-xs font-bold shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>Unduh Potret Resmi HD ({activeIndex + 1}/{galleryImages.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
