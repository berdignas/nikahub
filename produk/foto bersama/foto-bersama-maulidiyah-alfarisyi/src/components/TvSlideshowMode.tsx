import React, { useState, useEffect } from 'react';
import { X, QrCode, Sparkles, Heart, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PhotoMoment, EventInfo } from '../types';

interface TvSlideshowModeProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoMoment[];
  eventInfo: EventInfo;
}

export const TvSlideshowMode: React.FC<TvSlideshowModeProps> = ({
  isOpen,
  onClose,
  photos,
  eventInfo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto rotate every 6 seconds
  useEffect(() => {
    if (!isOpen || !isPlaying || photos.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, photos.length]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      if (e.key === ' ') setIsPlaying((prev) => !prev);
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length, onClose]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];
  const pageUrl = window.location.href;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-fade-in">
      {/* Top Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 px-8 py-5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ece5da] to-[#d8cca8] flex items-center justify-center shadow-lg border border-[#685c46]">
            <span className="font-cinzel text-xs font-bold text-[#473c27]">M&A</span>
          </div>
          <div>
            <h2 className="font-aston text-2xl sm:text-3xl text-[#f8f6e1] leading-none drop-shadow-md">
              Nur Thoifah & Ahmad Ferdi
            </h2>
            <p className="text-[11px] font-sans-ui text-[#b8c4ae] tracking-widest uppercase mt-0.5">
              Live TV Photo Stream • Ballroom Screen
            </p>
          </div>
        </div>

        {/* Exit & Control Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 text-[#f8f6e1] border border-white/20 text-xs font-sans-ui flex items-center gap-1.5 backdrop-blur-md transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Jeda' : 'Lanjut'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 hover:bg-red-950/80 text-[#f8f6e1] border border-white/20 backdrop-blur-md transition-all"
            title="Keluar dari Layar TV (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Photo Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-12">
        <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.imageUrl}
            alt={currentPhoto.caption}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-700 animate-fade-in"
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-[#f8f6e1] backdrop-blur-md transition-all opacity-40 hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-[#f8f6e1] backdrop-blur-md transition-all opacity-40 hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info Banner & Live QR Code Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 py-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Photo Sender & Blessing */}
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20291e]/80 border border-[#685c46]/40 text-xs font-sans-ui text-[#d8cca8] mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d8cca8]" />
            <span>Dibagikan oleh: <strong>{currentPhoto.senderName}</strong></span>
          </div>

          <p className="font-roman italic text-lg sm:text-2xl text-[#f8f6e1] drop-shadow-lg line-clamp-2">
            "{currentPhoto.caption}"
          </p>
        </div>

        {/* Floating QR Card for Ballroom Guests */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#161c14]/90 border border-[#d8cca8]/40 shadow-2xl backdrop-blur-md">
          <div className="bg-white p-2 rounded-xl shadow-md">
            <QRCodeSVG value={pageUrl} size={84} level="M" />
          </div>
          <div className="text-left font-sans-ui">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#f8f6e1]">
              <QrCode className="w-4 h-4 text-[#d8cca8]" />
              <span>Scan Kamera HP</span>
            </div>
            <p className="text-[11px] text-[#b8c4ae] leading-snug max-w-[160px] mt-0.5">
              Bagikan fotomu bersama mempelai ke layar ini!
            </p>
            <span className="inline-block mt-1 text-[10px] text-amber-300 font-semibold">
              Maks. 5 Foto / Tamu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
