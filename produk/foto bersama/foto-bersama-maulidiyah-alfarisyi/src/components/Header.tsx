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
    <div className="relative overflow-hidden py-10 sm:py-14 border-b border-[#685c46]/20 bg-gradient-to-b from-[#1a2217] via-[#161c14] to-[#141912]">
      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#685c46]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Subtle Wedding Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20291e] border border-[#685c46]/40 text-[#b8c4ae] text-xs font-sans-ui mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d8cca8]" />
          <span>The Wedding of Nur Thoifah & Ahmad Ferdi</span>
        </div>

        {/* Big Romantic Titles */}
        <h2 className="font-aston text-4xl sm:text-6xl text-[#f8f6e1] leading-tight drop-shadow-md mb-2">
          Nur Thoifah Maulidiyah <span className="font-cinzel text-2xl sm:text-4xl text-[#d8cca8]">&</span> Ahmad Ferdi Al-Farisyi
        </h2>
        
        <p className="font-roman italic text-lg sm:text-xl text-[#ece5da]/80 mb-4">
          Minggu, 18 Oktober 2026 • Grand Ballroom & Royal Garden, Surabaya
        </p>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm font-sans-ui text-[#b8c4ae]/90 mb-7 leading-relaxed">
          Abadikan dan bagikan momen kebahagiaan Anda bersama kedua mempelai. Setiap senyuman, tawa, dan potret kebersamaan Anda adalah kenangan tak ternilai bagi kami.
        </p>

        {/* Quota Indicator Bar (Maksimal 5 Foto Per Tamu) */}
        <div className="max-w-md mx-auto mb-8 p-3.5 rounded-2xl bg-[#20291e]/90 border border-[#685c46]/40 backdrop-blur-md shadow-lg text-left">
          <div className="flex items-center justify-between text-xs font-sans-ui mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d8cca8]" />
              <span className="font-medium text-[#f8f6e1]">Jatah Kuota Foto Perangkat Ini:</span>
            </div>
            <span className={`font-semibold ${isFull ? 'text-amber-400' : 'text-[#d8cca8]'}`}>
              {uploadedCount} / {MAX_PHOTO_PER_DEVICE} Foto
            </span>
          </div>

          {/* Progress Bar with 5 segments */}
          <div className="grid grid-cols-5 gap-1.5 h-2 w-full mb-2">
            {[1, 2, 3, 4, 5].map((slot) => {
              const isFilled = slot <= uploadedCount;
              return (
                <div
                  key={slot}
                  className={`h-full rounded-full transition-all duration-300 ${
                    isFilled
                      ? 'bg-gradient-to-r from-[#d8cca8] to-[#b8c4ae]'
                      : 'bg-[#2f3b2d]'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] font-sans-ui text-[#b8c4ae]/80">
            <span>
              {isFull ? (
                <span className="text-amber-300 font-medium">✨ Kuota Anda telah lengkap (5 foto)!</span>
              ) : (
                <span>Tersisa <strong className="text-[#f8f6e1]">{remaining} foto</strong> lagi dari perangkat ini</span>
              )}
            </span>
            <span className="text-[10px] text-[#b8c4ae]/60">Max 5 foto/tamu</span>
          </div>
        </div>

        {/* Primary Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ece5da] via-[#e5dbc2] to-[#d8cca8] text-[#473c27] font-sans-ui font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-amber-900/30"
          >
            <Camera className="w-4 h-4 text-[#685c46]" />
            <span>{isFull ? 'Lihat Kuota Foto Anda' : 'Unggah Foto Bersama'}</span>
          </button>

          <button
            onClick={onOpenQr}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#20291e] border border-[#685c46]/50 text-[#f8f6e1] font-sans-ui text-sm hover:border-[#b8c4ae] hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <QrCode className="w-4 h-4 text-[#b8c4ae]" />
            <span>Bagikan QR Meja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
