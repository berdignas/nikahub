import React from 'react';
import { Camera, QrCode, Tv, Download, Sparkles } from 'lucide-react';
import { getRemainingUploadQuota, MAX_PHOTO_PER_DEVICE } from '../utils/deviceStorage';

interface NavbarProps {
  onOpenUpload: () => void;
  onOpenQr: () => void;
  onOpenTv: () => void;
  onOpenDownloadAll: () => void;
  uploadedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUpload,
  onOpenQr,
  onOpenTv,
  onOpenDownloadAll,
  uploadedCount,
}) => {
  const remaining = Math.max(0, MAX_PHOTO_PER_DEVICE - uploadedCount);
  const isQuotaFull = remaining === 0;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-[#E6CA92]/30 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Couple Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0A261D] flex items-center justify-center shadow-sm border border-[#D4AF37]/40">
            <span className="font-serif text-xs font-bold text-[#E6CA92] tracking-wider">M&A</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-[#0A261D] leading-none">
              Maulidiyah & Alfarisyi
            </h1>
            <p className="text-[10px] font-sans text-gray-500 tracking-widest uppercase mt-0.5">
              Live Foto Bersama & Tamu
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* QR Code Action */}
          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Tampilkan QR Code untuk Tamu"
          >
            <QrCode className="w-4 h-4 text-[#C5A880]" />
            <span className="hidden sm:inline font-semibold">QR Meja</span>
          </button>

          {/* TV Projector Mode */}
          <button
            onClick={onOpenTv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Buka Mode Layar TV / Proyektor"
          >
            <Tv className="w-4 h-4 text-[#C5A880]" />
            <span className="hidden md:inline font-semibold">Layar TV</span>
          </button>

          {/* Download All */}
          <button
            onClick={onOpenDownloadAll}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Download Semua Foto Acara"
          >
            <Download className="w-4 h-4 text-[#C5A880]" />
            <span className="hidden lg:inline font-semibold">Unduh Semua</span>
          </button>

          {/* Primary Upload CTA Button */}
          <button
            onClick={onOpenUpload}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
              isQuotaFull
                ? 'bg-gray-100 text-gray-500 border border-gray-200'
                : 'bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] hover:shadow-lg hover:scale-105'
            }`}
          >
            <Camera className="w-4 h-4 text-[#E6CA92]" />
            <span>Upload Foto</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isQuotaFull ? 'bg-amber-100 text-amber-800' : 'bg-white/20 text-[#FAF9F5]'}`}>
              {uploadedCount}/5
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
