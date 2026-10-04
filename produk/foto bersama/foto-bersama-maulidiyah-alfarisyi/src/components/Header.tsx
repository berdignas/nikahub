import React from 'react';
import { Camera, QrCode, ShieldCheck, Heart, Sparkles, Maximize2, Calendar, MapPin } from 'lucide-react';
import { MAX_PHOTO_PER_DEVICE } from '../utils/deviceStorage';
import { EVENT_INFO } from '../data/initialPhotos';

interface HeaderProps {
  uploadedCount: number;
  onOpenUpload: () => void;
  onOpenQr: () => void;
  onOpenCouplePhoto: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  uploadedCount,
  onOpenUpload,
  onOpenQr,
  onOpenCouplePhoto,
}) => {
  const remaining = Math.max(0, MAX_PHOTO_PER_DEVICE - uploadedCount);
  const isFull = remaining === 0;

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#E6CA92]/30 bg-gradient-to-b from-white via-[#FAF9F5] to-[#F5F2E9]">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-[#E6CA92]/20 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        {/* Subtle Luxury Wedding Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-[#0A261D] text-xs font-sans mb-4 shadow-xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="font-semibold tracking-wider uppercase text-[10px] text-[#0A261D]">Live Shared Album & Guest Story</span>
        </div>

        {/* Big Romantic Titles in Playfair Display */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A261D] font-bold tracking-tight leading-[1.15] mb-2">
          Nur Thoifah Maulidiyah <br className="sm:hidden" />
          <span className="font-serif italic font-normal text-[#C5A880] px-2 text-2xl sm:text-4xl">&</span>
          Ahmad Ferdi Al-Farisyi
        </h1>
        
        <p className="font-serif italic text-sm sm:text-base text-[#0A261D]/75 mb-6 max-w-xl mx-auto">
          {EVENT_INFO.eventDateText} • {EVENT_INFO.venueName}
        </p>

        {/* FOTO UTAMA MEMPELAI (Official Couple Portrait Banner) */}
        <div 
          onClick={onOpenCouplePhoto}
          className="group relative max-w-4xl mx-auto rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#E6CA92]/50 bg-[#121915] cursor-pointer mb-10 transition-all duration-500 hover:shadow-3xl hover:border-[#C5A880]"
        >
          {/* Main Hero Photo Aspect Ratio */}
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[480px] overflow-hidden">
            <img
              src={EVENT_INFO.coverImage}
              alt="Foto Utama Mempelai: Maulidiyah & Alfarisyi"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

            {/* Top Badge: Foto Utama Mempelai */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0A261D]/85 backdrop-blur-md border border-[#E6CA92]/50 text-[#E6CA92] text-xs font-sans font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#E6CA92]" />
                Foto Utama Mempelai
              </span>

              <button
                type="button"
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#0A261D] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md group-hover:scale-110"
                title="Lihat Potret Lengkap Mempelai"
              >
                <Maximize2 className="w-4 h-4 text-[#E6CA92]" />
              </button>
            </div>

            {/* Editorial Text Overlay at Bottom (Like the Reference Image) */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-10 text-left text-white">
              <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#E6CA92] mb-1">
                Portfolio Mempelai • Official Wedding Portrait
              </p>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white leading-tight drop-shadow-md">
                Nur Thoifah & Ahmad Ferdi
              </h2>
              <p className="font-serif italic text-xs sm:text-sm text-white/90 mt-1 max-w-xl drop-shadow line-clamp-2">
                "Mengukir janji suci abadi dalam naungan cinta dan keberkahan. Terima kasih telah menjadi bagian dari kisah indah kami."
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-[11px] font-sans font-semibold text-white border border-white/20 transition-all">
                <span>Ketuk untuk melihat foto resmi resolusi penuh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quota Indicator Bar (Maksimal 5 Foto Per Tamu) */}
        <div className="max-w-md mx-auto mb-8 p-4 sm:p-5 rounded-3xl bg-white border border-[#E6CA92]/50 shadow-xl text-left">
          <div className="flex items-center justify-between text-xs font-sans mb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span className="font-bold text-[#0A261D]">Jatah Kuota Foto Perangkat:</span>
            </div>
            <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${isFull ? 'bg-amber-100 text-amber-800' : 'bg-[#FAF9F5] text-[#0A261D] border border-[#E6CA92]/40'}`}>
              {uploadedCount} / {MAX_PHOTO_PER_DEVICE} Foto
            </span>
          </div>

          {/* Progress Bar with 5 segments */}
          <div className="grid grid-cols-5 gap-1.5 h-2.5 w-full mb-2.5">
            {[1, 2, 3, 4, 5].map((slot) => {
              const isFilled = slot <= uploadedCount;
              return (
                <div
                  key={slot}
                  className={`h-full rounded-full transition-all duration-300 ${
                    isFilled
                      ? 'bg-gradient-to-r from-[#0A261D] to-[#164E3D] shadow-xs'
                      : 'bg-gray-100'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] font-sans text-gray-500">
            <span>
              {isFull ? (
                <span className="text-amber-700 font-semibold">✨ Kuota Anda telah lengkap (5/5 foto)!</span>
              ) : (
                <span>Tersisa <strong className="text-[#0A261D] font-bold">{remaining} foto</strong> lagi dari perangkat ini</span>
              )}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Batas 5 foto/tamu</span>
          </div>
        </div>

        {/* Primary Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-sans font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-2xl cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#E6CA92]" />
            <span>{isFull ? 'Lihat Folder Anda' : 'Unggah Foto Tamu (1-5 Foto)'}</span>
          </button>

          <button
            onClick={onOpenQr}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#D4AF37]/40 text-[#0A261D] font-sans font-bold text-xs uppercase tracking-wider hover:border-[#0A261D] hover:bg-[#FAF9F5] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#C5A880]" />
            <span>Scan QR Meja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
