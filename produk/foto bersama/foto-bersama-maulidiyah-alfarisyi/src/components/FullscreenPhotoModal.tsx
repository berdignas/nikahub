import React, { useState, useEffect } from 'react';
import { X, Download, ChevronLeft, ChevronRight, Sparkles, FolderArchive, ZoomIn } from 'lucide-react';
import { PhotoMoment } from '../types';

interface FullscreenPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoMoment[];
  initialIndex?: number;
  albumSenderName?: string;
  albumCaption?: string;
}

export const FullscreenPhotoModal: React.FC<FullscreenPhotoModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  albumSenderName,
  albumCaption,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  // Keyboard Navigation: ESC to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && photos.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight' && photos.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length, onClose]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const senderName = currentPhoto.senderName || albumSenderName || 'Tamu Undangan';
  const caption = currentPhoto.caption || albumCaption || '';

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = currentPhoto.imageUrl;
    link.download = `foto-bersama-${senderName.replace(/\s+/g, '-').toLowerCase()}-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Top Bar: Sender Info & Controls */}
      <div
        className="w-full px-4 sm:px-8 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0A261D] border border-[#E6CA92]/60 flex items-center justify-center text-[#E6CA92] font-serif font-bold text-xs shadow-md">
            AM
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#FAF9F5] leading-tight">
              {senderName}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans mt-0.5">
              <span>Foto {currentIndex + 1} dari {photos.length}</span>
              {photos.length > 1 && (
                <span className="text-[#E6CA92]">• Folder Tamu</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6CA92] border border-[#E6CA92]/40 backdrop-blur-md text-xs font-sans font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
            title="Unduh foto resolusi tinggi"
          >
            <Download className="w-4 h-4 text-[#E6CA92]" />
            <span className="hidden sm:inline">Unduh HD</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/20 shadow-md"
            title="Tutup (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Previous Arrow */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            title="Foto Sebelumnya (Panah Kiri)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Fullscreen Image */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center cursor-zoom-in"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
        >
          <img
            key={currentPhoto.id || currentIndex}
            src={currentPhoto.imageUrl}
            alt={caption || senderName}
            className={`max-w-full max-h-[82vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
            }`}
          />
        </div>

        {/* Next Arrow */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            title="Foto Berikutnya (Panah Kanan)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Bar: Caption & Thumbnails */}
      <div
        className="w-full px-4 sm:px-8 py-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-20 flex flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {caption && (
          <p className="font-serif italic text-xs sm:text-sm text-[#FAF9F5]/90 max-w-2xl text-center px-4 leading-relaxed">
            "{caption}"
          </p>
        )}

        {/* Multiple Photos Thumbnails */}
        {photos.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
            {photos.map((p, idx) => (
              <button
                key={p.id || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-[#E6CA92] scale-110 shadow-lg ring-2 ring-[#E6CA92]/50'
                    : 'border-white/20 opacity-40 hover:opacity-90'
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
