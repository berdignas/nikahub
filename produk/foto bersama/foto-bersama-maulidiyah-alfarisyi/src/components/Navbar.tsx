import React from 'react';
import { Tv, KeyRound, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenTv: () => void;
  isAdminModerator: boolean;
  onOpenPinModal: () => void;
  onExitAdminMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTv,
  isAdminModerator,
  onOpenPinModal,
  onExitAdminMode,
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* TV Projector Mode */}
          <button
            onClick={onOpenTv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-white text-[#0A261D] border border-gray-200 hover:border-[#D4AF37]/50 text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            title="Buka Mode Layar TV / Proyektor"
          >
            <Tv className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline font-semibold">Layar TV</span>
          </button>

          {/* PIN Mempelai / Moderator Mode Toggle */}
          {isAdminModerator ? (
            <div className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-sans shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-[11px] hidden sm:inline">Mode Pengantin Aktif</span>
              <button
                onClick={onExitAdminMode}
                className="p-1 rounded-full hover:bg-emerald-200/60 text-emerald-800 transition-colors cursor-pointer"
                title="Kunci / Keluar Mode Pengantin"
              >
                <Lock className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenPinModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#0A261D] text-[#0A261D] hover:text-[#FAF9F5] border border-gray-200 hover:border-[#0A261D] text-xs font-sans transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer group"
              title="Masukkan PIN untuk menghapus foto tamu manapun"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-[#E6CA92]" />
              <span className="font-semibold">PIN Pengantin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
