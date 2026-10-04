import React from 'react';
import { Camera, QrCode, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { MAX_PHOTO_PER_DEVICE } from '../utils/deviceStorage';

interface HeaderProps {
  uploadedCount: number;
  onOpenUpload: () => void;
  onOpenQr: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  uploadedCount,
  onOpenUpload,
  onOpenQr,
}) => {
  const remaining = Math.max(0, MAX_PHOTO_PER_DEVICE - uploadedCount);
  const isFull = remaining === 0;

  return (
    <div className="relative overflow-hidden py-12 sm:py-18 border-b border-[#E6CA92]/30 bg-gradient-to-b from-white via-[#FAF9F5] to-[#F5F2E9]">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#E6CA92]/20 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Subtle Luxury Wedding Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D4AF37]/40 text-[#0A261D] text-xs font-sans mb-5 shadow-xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="font-semibold tracking-wider uppercase text-[10px] text-[#0A261D]">Live Guestbook & Shared Album</span>
        </div>

        {/* Big Romantic Titles in Playfair Display */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A261D] font-bold tracking-tight leading-[1.15] mb-3">
          Nur Thoifah Maulidiyah <br className="sm:hidden" />
          <span className="font-serif italic font-normal text-[#C5A880] px-2 text-2xl sm:text-4xl">&</span>
          Ahmad Ferdi Al-Farisyi
        </h1>
        
        <p className="font-serif italic text-base sm:text-lg text-[#0A261D]/75 mb-4 max-w-xl mx-auto">
          Minggu, 18 Oktober 2026 • Grand Ballroom & Royal Garden, Surabaya
        </p>

        <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-[#1C2826]/75 mb-8 leading-relaxed">
          Abadikan dan bagikan momen kebahagiaan Anda bersama kedua mempelai. Setiap senyuman, tawa, dan potret kebersamaan Anda adalah kenangan tak ternilai bagi kami.
        </p>

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
            <span>{isFull ? 'Lihat Foto Anda' : 'Unggah Foto Bersama'}</span>
          </button>

          <button
            onClick={onOpenQr}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#D4AF37]/40 text-[#0A261D] font-sans font-bold text-xs uppercase tracking-wider hover:border-[#0A261D] hover:bg-[#FAF9F5] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#C5A880]" />
            <span>Bagikan QR Meja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
