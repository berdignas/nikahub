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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1a2217] border border-[#685c46]/50 rounded-3xl shadow-2xl p-6 text-center">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#20291e] text-[#b8c4ae] hover:text-[#f8f6e1] flex items-center justify-center transition-all hover:bg-[#2f3b2d]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-[#20291e] border border-[#685c46]/40 mx-auto flex items-center justify-center text-[#d8cca8] mb-3">
          <FolderArchive className="w-7 h-7" />
        </div>

        <h3 className="font-aston text-3xl text-[#f8f6e1] mb-1">
          Unduh Seluruh Foto Album
        </h3>
        <p className="font-sans-ui text-xs text-[#b8c4ae] mb-6 leading-relaxed">
          Terdapat total <strong className="text-[#f8f6e1]">{photos.length} momen foto</strong> yang telah dibagikan oleh para tamu undangan pernikahan Maulidiyah & Alfarisyi.
        </p>

        {isDownloading ? (
          <div className="py-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-sans-ui text-[#d8cca8]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mengunduh foto ({downloadProgress}%)...</span>
            </div>
            <div className="w-full bg-[#20291e] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d8cca8] to-[#b8c4ae] h-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleDownloadAllSequential}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-sans-ui text-xs font-semibold shadow-lg hover:scale-102 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-[#685c46]" />
              <span>Mulai Unduh Seluruh Foto ({photos.length} Foto)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#20291e] border border-[#685c46]/30 text-[#f8f6e1] font-sans-ui text-xs hover:border-[#b8c4ae]"
            >
              Kembali ke Galeri
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
