import React from 'react';
import { Heart, User, Clock, Trash2, FolderArchive, MessageSquare, ArrowRight, ShieldAlert, Mic } from 'lucide-react';
import { GuestAlbum } from '../types';
import { VoiceNotePlayer } from './VoiceNotePlayer';

interface PhotoCardProps {
  album: GuestAlbum;
  currentDeviceId: string;
  isAdminModerator?: boolean;
  onLikeToggle: (albumId: string) => void;
  onDeleteAlbum?: (albumId: string) => void;
  onOpenDetail: (album: GuestAlbum) => void;
  index?: number;
  totalCount?: number;
}

/**
 * Calculates asymmetrical mosaic styling for mobile 2-column grid.
 * Balances featured wide cards with alternating tall & compact pairings.
 */
export function getMosaicVariant(index: number, totalCount: number): {
  colSpanClass: string;
  aspectClass: string;
  isFeatured: boolean;
} {
  // If only 1 album in total, show as wide featured hero card
  if (totalCount === 1) {
    return {
      colSpanClass: 'col-span-2 sm:col-span-1',
      aspectClass: 'aspect-[16/10] sm:aspect-[4/5]',
      isFeatured: true,
    };
  }

  // If exactly 2 albums, pair them side-by-side with asymmetrical heights
  if (totalCount === 2) {
    return index === 0
      ? {
          colSpanClass: 'col-span-1',
          aspectClass: 'aspect-[9/14] sm:aspect-[4/5]',
          isFeatured: false,
        }
      : {
          colSpanClass: 'col-span-1',
          aspectClass: 'aspect-square sm:aspect-[4/5]',
          isFeatured: false,
        };
  }

  const cycleIndex = index % 5;
  const isLastCard = index === totalCount - 1;

  // If the last card would otherwise be left alone in a 2-column row, expand it to col-span-2
  if (isLastCard && (cycleIndex === 1 || cycleIndex === 3)) {
    return {
      colSpanClass: 'col-span-2 sm:col-span-1',
      aspectClass: 'aspect-[16/10] sm:aspect-[4/5]',
      isFeatured: true,
    };
  }

  switch (cycleIndex) {
    case 0:
      return {
        colSpanClass: 'col-span-2 sm:col-span-1',
        aspectClass: 'aspect-[16/10] sm:aspect-[4/5]',
        isFeatured: true,
      };
    case 1:
      return {
        colSpanClass: 'col-span-1',
        aspectClass: 'aspect-[9/14] sm:aspect-[4/5]',
        isFeatured: false,
      };
    case 2:
      return {
        colSpanClass: 'col-span-1',
        aspectClass: 'aspect-square sm:aspect-[4/5]',
        isFeatured: false,
      };
    case 3:
      return {
        colSpanClass: 'col-span-1',
        aspectClass: 'aspect-square sm:aspect-[4/5]',
        isFeatured: false,
      };
    case 4:
    default:
      return {
        colSpanClass: 'col-span-1',
        aspectClass: 'aspect-[9/14] sm:aspect-[4/5]',
        isFeatured: false,
      };
  }
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  album,
  currentDeviceId,
  isAdminModerator = false,
  onLikeToggle,
  onDeleteAlbum,
  onOpenDetail,
  index = 0,
  totalCount = 1,
}) => {
  const isMine = album.deviceId === currentDeviceId && !album.isInitialSample;
  const canDelete = isMine || isAdminModerator;
  const isLiked = album.likedByDevices?.includes(currentDeviceId);
  const photos = album.photos || [];
  const coverPhoto = photos[0];

  const mosaic = getMosaicVariant(index, totalCount);

  // Format date readable in Indonesian
  const formattedTime = (() => {
    try {
      const d = new Date(album.createdAt);
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  })();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDeleteAlbum) return;

    if (isMine) {
      if (window.confirm(`Hapus seluruh folder Anda "${album.senderName}"? Seluruh foto di dalamnya akan terhapus dan kuota upload Anda akan dikembalikan.`)) {
        onDeleteAlbum(album.id);
      }
    } else if (isAdminModerator) {
      if (window.confirm(`👑 [Mode Pengantin] Hapus folder tamu "${album.senderName}" (${photos.length} foto) secara permanen dari database server?`)) {
        onDeleteAlbum(album.id);
      }
    }
  };

  return (
    <div 
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E6CA92]/40 hover:border-[#C5A880] shadow-xs sm:shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${mosaic.colSpanClass}`}
      onClick={() => onOpenDetail(album)}
    >
      {/* Image Container with Editorial Look & Dynamic Asymmetrical Ratio */}
      <div className={`relative w-full ${mosaic.aspectClass} bg-[#121915] overflow-hidden`}>
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

        {/* Top Badges: Photo Count, Ownership, Multi-Photo Preview & Admin Delete */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between z-10 gap-1.5">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {/* Photos Count Badge */}
            <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#0A261D]/85 backdrop-blur-md border border-[#E6CA92]/40 text-[#E6CA92] text-[9px] sm:text-[11px] font-sans font-bold flex items-center gap-1 sm:gap-1.5 shadow-md shrink-0">
              <FolderArchive className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E6CA92]" />
              <span>{photos.length} Foto</span>
            </div>

            {/* In Featured Mode: Show Mini Thumbnails of extra photos in folder */}
            {mosaic.isFeatured && photos.length > 1 && (
              <div className="hidden xs:flex items-center -space-x-1.5 shrink-0 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20">
                {photos.slice(1, 4).map((p, idx) => (
                  <img
                    key={p.id || idx}
                    src={p.imageUrl}
                    alt=""
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-white shadow-xs"
                  />
                ))}
                {photos.length > 4 && (
                  <span className="text-[8px] sm:text-[9px] text-[#E6CA92] font-bold pl-1 pr-0.5">
                    +{photos.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {isMine ? (
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#E6CA92] text-[#0A261D] text-[9px] sm:text-[10px] font-sans font-bold shadow-md">
                ✨ Folder Anda
              </span>
            ) : mosaic.isFeatured ? (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[9px] sm:text-[10px] font-sans text-[#E6CA92] border border-[#E6CA92]/30">
                ⭐ Sorotan
              </span>
            ) : (
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-sans text-white/80">
                Tamu Undangan
              </span>
            )}

            {/* Quick delete trash icon in top-right for quick moderation */}
            {canDelete && (
              <button
                onClick={handleDeleteClick}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90 cursor-pointer"
                title={isAdminModerator && !isMine ? "👑 Hapus folder ini (Akses Pengantin)" : "Hapus folder Anda"}
              >
                <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Sender & Caption Overlay */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10 text-left">
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs font-sans font-bold text-white mb-0.5 sm:mb-1 drop-shadow-sm">
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E6CA92] shrink-0" />
            <span className="truncate text-xs sm:text-sm">{album.senderName}</span>
          </div>

          {album.caption && (
            <p className={`font-serif italic text-[11px] sm:text-xs text-white/95 drop-shadow-sm leading-relaxed mb-1 ${mosaic.isFeatured ? 'line-clamp-2' : 'line-clamp-1 sm:line-clamp-2'}`}>
              "{album.caption}"
            </p>
          )}

          {album.voiceNoteUrl && (
            <div className="mb-1.5 max-w-full">
              <VoiceNotePlayer
                audioUrl={album.voiceNoteUrl}
                duration={album.voiceDuration}
                senderName={album.senderName}
                compact
              />
            </div>
          )}

          <span className="text-[9px] sm:text-[10px] font-sans text-[#E6CA92] font-semibold hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Buka folder ({photos.length} foto) <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-2.5 sm:px-4 py-2 sm:py-3 bg-[#FAF9F5] border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs font-sans">
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(album.id);
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all active:scale-90 cursor-pointer ${
            isLiked
              ? 'text-rose-600 bg-rose-50 font-bold border border-rose-200'
              : 'text-gray-600 hover:text-rose-600 hover:bg-white border border-transparent'
          }`}
          title="Beri Suka untuk Folder Ini"
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-[11px] sm:text-xs font-semibold">{album.likesCount || 0}</span>
        </button>

        {/* Comments Count Indicator & Delete Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 text-gray-500 text-[11px] sm:text-xs font-medium">
            <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
            <span>{album.comments?.length || 0}</span>
          </div>

          {formattedTime && (
            <div className="hidden xs:flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-400 font-medium">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>{formattedTime}</span>
            </div>
          )}

          {/* Bottom Delete Button */}
          {canDelete && (
            <button
              onClick={handleDeleteClick}
              className="p-1 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              title={isAdminModerator && !isMine ? "👑 Hapus folder ini (Akses Pengantin)" : "Hapus folder Anda & kembalikan kuota"}
            >
              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
