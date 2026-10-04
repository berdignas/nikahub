import React, { useState } from 'react';
import { X, Download, CheckCircle2, Loader2, Sparkles, FolderArchive } from 'lucide-react';
import { PhotoMoment } from '../types';

interface DownloadAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoMoment[];
}

export const DownloadAllModal: React.FC<DownloadAllModalProps> = ({
  isOpen,
  onClose,
  photos,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!isOpen) return null;

  const handleDownloadAllSequential = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const link = document.createElement('a');
      link.href = photo.imageUrl;
      link.download = `foto-bersama-maulidiyah-alfarisyi-${i + 1}-${photo.senderName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress(Math.round(((i + 1) / photos.length) * 100));
      // Short delay between triggers to let browser handle downloads smoothly
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    setIsDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A261D]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#E6CA92]/40 rounded-3xl shadow-2xl p-6 text-center">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-[#0A261D] hover:bg-gray-200 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#E6CA92]/40 mx-auto flex items-center justify-center text-[#C5A880] mb-3 shadow-inner">
          <FolderArchive className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#0A261D] mb-1">
          Unduh Seluruh Foto Album
        </h3>
        <p className="font-sans text-xs text-gray-500 mb-6 leading-relaxed">
          Terdapat total <strong className="text-[#0A261D]">{photos.length} momen foto</strong> yang telah dibagikan oleh para tamu undangan pernikahan Maulidiyah & Alfarisyi.
        </p>

        {isDownloading ? (
          <div className="py-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#0A261D] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
              <span>Mengunduh foto ({downloadProgress}%)...</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-gray-200">
              <div 
                className="bg-gradient-to-r from-[#C5A880] to-[#0A261D] h-full rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleDownloadAllSequential}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0A261D] to-[#124032] text-[#E6CA92] font-sans text-xs font-bold shadow-md hover:brightness-110 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>Mulai Unduh Seluruh Foto ({photos.length} Foto)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-sans text-xs font-medium hover:bg-gray-50"
            >
              Kembali ke Galeri
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
