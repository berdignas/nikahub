import React from 'react';
import { X, Download, Heart, Sparkles, Calendar, MapPin } from 'lucide-react';
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
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = eventInfo.coverImage;
    link.download = `potret-resmi-mempelai-${eventInfo.coupleTitle.replace(/\s+/g, '-').toLowerCase()}.jpg`;
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
        className="relative max-w-4xl w-full bg-white border border-[#E6CA92]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Photo Container */}
        <div className="relative md:w-3/5 bg-[#0e1612] flex items-center justify-center overflow-hidden min-h-[320px] md:min-h-[520px]">
          <img
            src={eventInfo.coverImage}
            alt={eventInfo.coupleTitle}
            className="w-full h-full max-h-[78vh] object-contain"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 rounded-full bg-[#0A261D]/80 backdrop-blur-md border border-[#E6CA92]/40 text-[#E6CA92] text-xs font-sans font-bold flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#E6CA92]" />
              Foto Resmi Mempelai
            </span>
          </div>
        </div>

        {/* Description & Blessing */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-sans font-bold tracking-widest uppercase text-[#C5A880] mb-1">
                The Wedding of
              </p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D] leading-tight mb-2">
                {eventInfo.brideName} <br />
                <span className="font-serif italic font-normal text-[#C5A880] text-xl">&</span> <br />
                {eventInfo.groomName}
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
              <span>Unduh Potret Resmi HD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
