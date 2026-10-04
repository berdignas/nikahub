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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#161c14]/90 border-b border-[#685c46]/30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Couple Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ece5da] to-[#b8c4ae] flex items-center justify-center shadow-md border border-[#685c46]/40">
            <span className="font-cinzel text-xs font-bold text-[#473c27] tracking-wider">M&A</span>
          </div>
          <div>
            <h1 className="font-aston text-xl sm:text-2xl text-[#f8f6e1] leading-none drop-shadow-sm">
              Maulidiyah & Alfarisyi
            </h1>
            <p className="text-[11px] font-sans-ui text-[#b8c4ae] tracking-widest uppercase mt-0.5">
              Live Foto Bersama
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* QR Code Action */}
          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#20271e] text-[#f8f6e1] border border-[#685c46]/40 hover:border-[#b8c4ae] text-xs font-sans-ui transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Tampilkan QR Code untuk Tamu"
          >
            <QrCode className="w-4 h-4 text-[#b8c4ae]" />
            <span className="hidden sm:inline">QR Tamu</span>
          </button>

          {/* TV Projector Mode */}
          <button
            onClick={onOpenTv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#20271e] text-[#f8f6e1] border border-[#685c46]/40 hover:border-[#b8c4ae] text-xs font-sans-ui transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Buka Mode Layar TV / Proyektor"
          >
            <Tv className="w-4 h-4 text-[#b8c4ae]" />
            <span className="hidden md:inline">Layar TV</span>
          </button>

          {/* Download All */}
          <button
            onClick={onOpenDownloadAll}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#20271e] text-[#f8f6e1] border border-[#685c46]/40 hover:border-[#b8c4ae] text-xs font-sans-ui transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Download Semua Foto Acara"
          >
            <Download className="w-4 h-4 text-[#b8c4ae]" />
            <span className="hidden lg:inline">Download</span>
          </button>

          {/* Primary Upload CTA Button */}
          <button
            onClick={onOpenUpload}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl font-sans-ui text-xs sm:text-sm font-semibold transition-all shadow-lg active:scale-95 ${
              isQuotaFull
                ? 'bg-[#2a3528] text-[#b8c4ae]/60 border border-[#685c46]/30 cursor-pointer'
                : 'bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] hover:from-[#f8f6e1] hover:to-[#e8dcbf] hover:shadow-amber-900/20 hover:scale-105'
            }`}
          >
            <Camera className="w-4 h-4 text-[#685c46]" />
            <span>Upload Foto</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isQuotaFull ? 'bg-red-900/50 text-red-200' : 'bg-[#473c27] text-[#f8f6e1]'}`}>
              {uploadedCount}/5
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
