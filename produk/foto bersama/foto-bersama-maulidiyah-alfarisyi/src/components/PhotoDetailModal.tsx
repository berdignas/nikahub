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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#1a2217] border border-[#685c46]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile/Desktop */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 text-[#f8f6e1] hover:bg-black/90 flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Image Section */}
        <div className="relative md:w-3/5 bg-black/60 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[480px]">
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Photo Info & Actions Panel */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-[#161c14] border-t md:border-t-0 md:border-l border-[#685c46]/30 overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#b8c4ae] mb-1">
                <User className="w-3.5 h-3.5 text-[#d8cca8]" />
                <span className="font-semibold text-[#f8f6e1] text-sm">{photo.senderName}</span>
              </div>
              {formattedDate && (
                <div className="flex items-center gap-1.5 text-[11px] font-sans-ui text-[#b8c4ae]/60">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="p-4 rounded-2xl bg-[#20291e] border border-[#685c46]/30">
              <p className="font-roman italic text-sm text-[#f8f6e1] leading-relaxed">
                "{photo.caption}"
              </p>
            </div>

            {/* Like Counter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLikeToggle(photo.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans-ui font-medium transition-all active:scale-95 ${
                  isLiked
                    ? 'bg-rose-950/40 text-rose-300 border border-rose-800/40'
                    : 'bg-[#20291e] text-[#b8c4ae] border border-[#685c46]/40 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{photo.likesCount || 0} Menyukai</span>
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#685c46]/20 mt-4 space-y-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-sans-ui text-xs font-semibold shadow-lg hover:scale-102 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-[#685c46]" />
              <span>Unduh Foto (Kualitas HD)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
