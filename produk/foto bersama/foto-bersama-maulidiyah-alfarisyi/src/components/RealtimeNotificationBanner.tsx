import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, X, Camera } from 'lucide-react';

export interface RealtimeAlertData {
  id: string;
  senderName: string;
  caption?: string;
  photoCount?: number;
  thumbnailUrl?: string;
  albumId?: string;
  timestamp: number;
}

interface RealtimeNotificationBannerProps {
  alert: RealtimeAlertData | null;
  onDismiss: () => void;
  onViewAlbum: (albumId?: string) => void;
  autoCloseDuration?: number; // in milliseconds, default 7000ms
}

export const RealtimeNotificationBanner: React.FC<RealtimeNotificationBannerProps> = ({
  alert,
  onDismiss,
  onViewAlbum,
  autoCloseDuration = 7000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!alert) return;

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / autoCloseDuration) * 100);
      setProgress(remainingPct);

      if (elapsed >= autoCloseDuration) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [alert, autoCloseDuration, onDismiss]);

  if (!alert) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[92%] sm:w-auto sm:min-w-[420px] transition-all duration-500 ease-out animate-in fade-in slide-in-from-top-6">
      <div
        onClick={() => onViewAlbum(alert.albumId)}
        className="relative overflow-hidden rounded-2xl bg-[#0A261D]/95 backdrop-blur-xl border border-[#E6CA92]/70 shadow-2xl p-3 sm:p-3.5 text-white flex items-center gap-3 cursor-pointer group hover:border-[#E6CA92] transition-all"
      >
        {/* Glow ambient background accent */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E6CA92]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Thumbnail or Sparkle Badge */}
        <div className="relative shrink-0">
          {alert.thumbnailUrl ? (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#E6CA92]/60 shadow-md">
              <img
                src={alert.thumbnailUrl}
                alt={alert.senderName}
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A261D]" />
            </div>
          ) : (
            <div className="relative w-11 h-11 rounded-xl bg-black/40 border border-[#E6CA92]/50 flex items-center justify-center text-[#E6CA92] shadow-md">
              <Camera className="w-5 h-5 text-[#E6CA92]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A261D]" />
            </div>
          )}
        </div>

        {/* Text Information */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E6CA92] animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-[#E6CA92]">
              Foto Baru Dibagikan!
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-serif font-bold text-[#FAF9F5] truncate leading-tight">
            {alert.senderName}
            {alert.photoCount && alert.photoCount > 1 && (
              <span className="text-[10px] font-sans font-normal text-white/70 ml-1.5">
                ({alert.photoCount} foto)
              </span>
            )}
          </h4>

          {alert.caption && (
            <p className="text-[11px] font-sans text-white/80 truncate italic mt-0.5">
              "{alert.caption}"
            </p>
          )}
        </div>

        {/* Action Button & Dismiss */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onViewAlbum(alert.albumId)}
            className="px-2.5 py-1.5 rounded-xl bg-[#E6CA92] hover:bg-[#FAF9F5] text-[#0A261D] text-[11px] font-sans font-bold flex items-center gap-1 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <span>Lihat</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Countdown Progress Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#E6CA92] via-[#C5A880] to-emerald-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
