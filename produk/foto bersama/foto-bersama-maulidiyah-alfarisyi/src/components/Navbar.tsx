import React from 'react';
import { QrCode, Tv, Download } from 'lucide-react';

interface NavbarProps {
  onOpenQr: () => void;
  onOpenTv: () => void;
  onOpenDownloadAll: () => void;
  uploadedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQr,
  onOpenTv,
  onOpenDownloadAll,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-[#E6CA92]/30 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Couple Monogram: A&M (Alfarisyi & Maulidiyah) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0A261D] flex items-center justify-center shadow-sm border border-[#D4AF37]/40">
            <span className="font-serif text-xs font-bold text-[#E6CA92] tracking-wider">A&M</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-base sm:text-lg text-[#0A261D] leading-none">
              Alfarisyi & Maulidiyah
            </h1>
            <p className="text-[10px] font-sans text-gray-500 tracking-widest uppercase mt-0.5">
              Live Foto Bersama & Tamu Undangan
            </p>
          </div>
        </div>

        {/* Action Controls (Clean minimal header, upload button placed below in hero & floating bar) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* QR Code Action */}
          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Tampilkan QR Code untuk Tamu"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline font-semibold">QR Meja</span>
          </button>

          {/* TV Projector Mode */}
          <button
            onClick={onOpenTv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Buka Mode Layar TV / Proyektor"
          >
            <Tv className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden md:inline font-semibold">Layar TV</span>
          </button>

          {/* Download All */}
          <button
            onClick={onOpenDownloadAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Download Semua Foto Acara"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden lg:inline font-semibold">Unduh Semua</span>
          </button>
        </div>
      </div>
    </header>
  );
};
