import React from 'react';
import { X, Download, Heart, User, Calendar, Share2 } from 'lucide-react';
import { PhotoMoment } from '../types';

interface PhotoDetailModalProps {
  photo: PhotoMoment | null;
  currentDeviceId: string;
  onClose: () => void;
  onLikeToggle: (photoId: string) => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  photo,
  currentDeviceId,
  onClose,
  onLikeToggle,
}) => {
  if (!photo) return null;

  const isLiked = photo.likedByDevices?.includes(currentDeviceId);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `foto-bersama-${photo.senderName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedDate = (() => {
    try {
      const d = new Date(photo.createdAt);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  })();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A261D]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-white border border-[#E6CA92]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile/Desktop */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Image Section */}
        <div className="relative md:w-3/5 bg-[#121a16] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[480px]">
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Photo Info & Actions Panel */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-sans text-gray-500 mb-1">
                <User className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-bold text-[#0A261D] text-base">{photo.senderName}</span>
              </div>
              {formattedDate && (
                <div className="flex items-center gap-1.5 text-xs font-sans text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/30">
              <p className="font-serif italic text-sm text-[#0A261D]/85 leading-relaxed">
                "{photo.caption}"
              </p>
            </div>

            {/* Like Counter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLikeToggle(photo.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-all active:scale-95 ${
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-[#FAF9F5] text-gray-600 border border-gray-200 hover:text-rose-600 hover:border-rose-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{photo.likesCount || 0} Menyukai</span>
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-gray-100 mt-4 space-y-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0A261D] to-[#124032] text-[#E6CA92] font-sans text-xs font-bold shadow-md hover:brightness-110 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>Unduh Foto (Kualitas HD)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
