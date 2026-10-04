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
    <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200/80 hover:border-[#D4AF37]/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      {/* Image Container */}
      <div 
        className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(photo)}
      >
        <img
          src={photo.imageUrl}
          alt={photo.caption || 'Foto Bersama'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for Readable Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {isMine ? (
            <span className="px-3 py-1 rounded-full bg-[#0A261D]/90 border border-[#D4AF37]/50 text-[10px] font-sans font-bold text-[#E6CA92] backdrop-blur-md shadow-sm">
              ✨ Foto Anda
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-sans text-white/80">
              Tamu Undangan
            </span>
          )}

          {/* Expand Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(photo);
            }}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#0A261D] text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-md"
            title="Lihat Foto Layar Penuh"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#E6CA92]" />
          </button>
        </div>

        {/* Bottom Sender & Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-white mb-1 drop-shadow-sm">
            <User className="w-3.5 h-3.5 text-[#E6CA92] shrink-0" />
            <span className="truncate">{photo.senderName}</span>
          </div>
          {photo.caption && (
            <p className="font-serif italic text-xs text-white/95 line-clamp-2 drop-shadow-sm leading-relaxed">
              "{photo.caption}"
            </p>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-3 bg-[#FAF9F5] border-t border-gray-100 flex items-center justify-between text-xs font-sans">
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(photo.id);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all active:scale-90 cursor-pointer ${
            isLiked
              ? 'text-rose-600 bg-rose-50 font-bold border border-rose-200'
              : 'text-gray-500 hover:text-rose-500 hover:bg-white border border-transparent'
          }`}
          title="Beri Suka untuk Foto Ini"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-xs font-semibold">{photo.likesCount || 0}</span>
        </button>

        <div className="flex items-center gap-2.5">
          {formattedTime && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
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
              className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              title="Hapus foto ini & kembalikan 1 kuota upload"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
