import React from 'react';
import { Heart, User, Clock, Trash2, FolderArchive, MessageSquare, ArrowRight } from 'lucide-react';
import { GuestAlbum } from '../types';

interface PhotoCardProps {
  album: GuestAlbum;
  currentDeviceId: string;
  onLikeToggle: (albumId: string) => void;
  onDeleteAlbum?: (albumId: string) => void;
  onOpenDetail: (album: GuestAlbum) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  album,
  currentDeviceId,
  onLikeToggle,
  onDeleteAlbum,
  onOpenDetail,
}) => {
  const isMine = album.deviceId === currentDeviceId && !album.isInitialSample;
  const isLiked = album.likedByDevices?.includes(currentDeviceId);
  const photos = album.photos || [];
  const coverPhoto = photos[0];

  // Format date readable in Indonesian
  const formattedTime = (() => {
    try {
      const d = new Date(album.createdAt);
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  })();

  return (
    <div 
      className="group relative rounded-3xl overflow-hidden bg-white border border-[#E6CA92]/40 hover:border-[#C5A880] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
      onClick={() => onOpenDetail(album)}
    >
      {/* Image Container with Editorial Look */}
      <div className="relative w-full aspect-[4/5] bg-[#121915] overflow-hidden">
        {coverPhoto ? (
          <img
            src={coverPhoto.imageUrl}
            alt={album.senderName}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-sans">
            Foto tidak tersedia
          </div>
        )}

        {/* Gradient Overlay for Editorial Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-85 group-hover:opacity-95 transition-opacity" />

        {/* Top Badges: Photo Count & Ownership */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Photos Count Badge */}
          <div className="px-3 py-1 rounded-full bg-[#0A261D]/85 backdrop-blur-md border border-[#E6CA92]/40 text-[#E6CA92] text-[11px] font-sans font-bold flex items-center gap-1.5 shadow-md">
            <FolderArchive className="w-3.5 h-3.5 text-[#E6CA92]" />
            <span>{photos.length} Foto</span>
          </div>

          {isMine ? (
            <span className="px-3 py-1 rounded-full bg-[#E6CA92] text-[#0A261D] text-[10px] font-sans font-bold shadow-md">
              ✨ Folder Anda
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-sans text-white/80">
              Tamu Undangan
            </span>
          )}
        </div>

        {/* Bottom Sender & Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-white mb-1 drop-shadow-sm">
            <User className="w-3.5 h-3.5 text-[#E6CA92] shrink-0" />
            <span className="truncate text-sm">{album.senderName}</span>
          </div>
          {album.caption && (
            <p className="font-serif italic text-xs text-white/95 line-clamp-2 drop-shadow-sm leading-relaxed mb-1">
              "{album.caption}"
            </p>
          )}
          <span className="text-[10px] font-sans text-[#E6CA92] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Buka folder ({photos.length} foto) <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-3 bg-[#FAF9F5] border-t border-gray-100 flex items-center justify-between text-xs font-sans">
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(album.id);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all active:scale-90 cursor-pointer ${
            isLiked
              ? 'text-rose-600 bg-rose-50 font-bold border border-rose-200'
              : 'text-gray-600 hover:text-rose-600 hover:bg-white border border-transparent'
          }`}
          title="Beri Suka untuk Folder Ini"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-xs font-semibold">{album.likesCount || 0}</span>
        </button>

        {/* Comments Count Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
            <span>{album.comments?.length || 0}</span>
          </div>

          {formattedTime && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
              <Clock className="w-3 h-3" />
              <span>{formattedTime}</span>
            </div>
          )}

          {/* Delete Button (Only for Current Device) */}
          {isMine && onDeleteAlbum && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Hapus seluruh folder "${album.senderName}"? Seluruh foto di dalamnya akan terhapus dan kuota upload Anda akan dikembalikan.`)) {
                  onDeleteAlbum(album.id);
                }
              }}
              className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              title="Hapus folder ini & kembalikan kuota upload"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
