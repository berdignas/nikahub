import React from 'react';
import { Heart, User, Clock, Trash2, Maximize2 } from 'lucide-react';
import { PhotoMoment } from '../types';

interface PhotoCardProps {
  photo: PhotoMoment;
  currentDeviceId: string;
  onLikeToggle: (photoId: string) => void;
  onDeletePhoto: (photoId: string) => void;
  onOpenDetail: (photo: PhotoMoment) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  currentDeviceId,
  onLikeToggle,
  onDeletePhoto,
  onOpenDetail,
}) => {
  const isMine = photo.deviceId === currentDeviceId && !photo.isInitialSample;
  const isLiked = photo.likedByDevices?.includes(currentDeviceId);

  // Format date readable in Indonesian
  const formattedTime = (() => {
    try {
      const d = new Date(photo.createdAt);
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  })();

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#20291e] border border-[#685c46]/30 hover:border-[#b8c4ae]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      {/* Image Container */}
      <div 
        className="relative w-full aspect-[4/5] bg-black/40 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(photo)}
      >
        <img
          src={photo.imageUrl}
          alt={photo.caption || 'Foto Bersama'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          {isMine ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-[10px] font-sans-ui font-semibold text-emerald-200 backdrop-blur-md shadow-sm">
              ✨ Foto Anda
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-sans-ui text-[#b8c4ae]">
              Tamu Undangan
            </span>
          )}

          {/* Expand Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(photo);
            }}
            className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-[#f8f6e1] flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
            title="Lihat Penuh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Sender & Caption Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-sans-ui font-medium text-[#f8f6e1] mb-1 drop-shadow-sm">
            <User className="w-3.5 h-3.5 text-[#d8cca8] shrink-0" />
            <span className="truncate">{photo.senderName}</span>
          </div>
          <p className="font-roman italic text-xs text-[#ece5da]/90 line-clamp-2 drop-shadow-sm">
            "{photo.caption}"
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-3.5 py-2.5 bg-[#1a2217] border-t border-[#685c46]/20 flex items-center justify-between text-xs font-sans-ui">
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(photo.id);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all active:scale-90 ${
            isLiked
              ? 'text-rose-400 bg-rose-950/30'
              : 'text-[#b8c4ae] hover:text-rose-400 hover:bg-[#20291e]'
          }`}
          title="Beri Cinta untuk Foto Ini"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-[11px] font-medium">{photo.likesCount || 0}</span>
        </button>

        <div className="flex items-center gap-2">
          {formattedTime && (
            <div className="flex items-center gap-1 text-[10px] text-[#b8c4ae]/60">
              <Clock className="w-3 h-3" />
              <span>{formattedTime}</span>
            </div>
          )}

          {/* Delete Button (Only for Current Device's photos) */}
          {isMine && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Hapus foto ini? Setelah dihapus, Anda mendapatkan kembali 1 kuota upload.')) {
                  onDeletePhoto(photo.id);
                }
              }}
              className="p-1 rounded text-red-400/80 hover:text-red-300 hover:bg-red-950/40 transition-colors"
              title="Hapus foto ini & kembalikan 1 kuota slot"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
