import React from 'react';
import { Tv, KeyRound, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenTv: () => void;
  isAdminModerator: boolean;
  onOpenPinModal: () => void;
  onExitAdminMode: () => void;
  onOpenChangePinModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTv,
  isAdminModerator,
  onOpenPinModal,
  onExitAdminMode,
  onOpenChangePinModal,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#FAF9F5]/90 border-b border-[#E6CA92]/30 transition-all shadow-[0_4px_20px_rgba(10,38,29,0.03)]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Couple Monogram: Double-Bezel nested architecture (A&M) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#E6CA92] via-white/60 to-[#C5A880] shadow-[0_2px_10px_rgba(197,168,128,0.25)] shrink-0">
            <div className="w-full h-full rounded-full bg-[#0A261D] flex items-center justify-center border border-[#E6CA92]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="font-serif text-[11px] font-bold text-[#E6CA92] tracking-wider">A&M</span>
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-[15px] sm:text-lg text-[#0A261D] leading-tight tracking-tight truncate">
              Alfarisyi & Maulidiyah
            </h1>
            <p className="text-[9px] sm:text-[10px] font-sans text-[#0A261D]/60 tracking-[0.16em] uppercase mt-0.5 truncate font-medium">
              Live Photo Guestbook
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Back to Wedding Invitation Dashboard Button */}
          <a
            href="/undangan-maulidiyah-alfarisyi"
            className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-white/80 hover:bg-[#0A261D] text-[#0A261D] hover:text-[#FAF9F5] border border-[#E6CA92]/40 hover:border-[#0A261D] text-xs font-sans transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer group"
            title="Kembali ke Dashboard Utama Undangan Pernikahan"
          >
            <div className="w-5 h-5 rounded-full bg-[#FAF9F5] group-hover:bg-white/10 flex items-center justify-center transition-colors">
              <ArrowLeft className="w-3 h-3 text-[#C5A880] group-hover:text-[#E6CA92]" />
            </div>
            <span className="font-semibold text-[11px] sm:text-xs">Undangan</span>
          </a>

          {/* TV Projector Mode */}
          <button
            onClick={onOpenTv}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#0A261D] border border-gray-200/80 hover:border-[#D4AF37]/50 text-xs font-sans transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer"
            title="Buka Mode Layar TV / Proyektor"
          >
            <Tv className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="hidden sm:inline font-semibold text-xs">Layar TV</span>
          </button>

          {/* PIN Mempelai / Moderator Mode Toggle */}
          {isAdminModerator ? (
            <div className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-300/80 text-emerald-800 text-xs font-sans shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-bold text-[11px] hidden sm:inline">Mode Pengantin</span>
              {onOpenChangePinModal && (
                <button
                  onClick={onOpenChangePinModal}
                  className="px-2 py-0.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title="Ganti / Ubah PIN Pengantin"
                >
                  <KeyRound className="w-2.5 h-2.5" />
                  <span>Ubah</span>
                </button>
              )}
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
              className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-white/80 hover:bg-[#0A261D] text-[#0A261D] hover:text-[#FAF9F5] border border-[#E6CA92]/40 hover:border-[#0A261D] text-xs font-sans transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer group"
              title="Masukkan PIN untuk mengelola/menghapus foto tamu"
            >
              <div className="w-5 h-5 rounded-full bg-[#FAF9F5] group-hover:bg-white/10 flex items-center justify-center transition-colors">
                <KeyRound className="w-3 h-3 text-[#C5A880] group-hover:text-[#E6CA92]" />
              </div>
              <span className="font-semibold text-[11px] sm:text-xs">PIN</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
