import React, { useState } from 'react';
import { X, Heart, MessageSquare, Download, ChevronLeft, ChevronRight, User, Send, Sparkles, FolderArchive, Trash2, Calendar, Check, ShieldAlert } from 'lucide-react';
import { GuestAlbum, CommentItem } from '../types';
import { VoiceNotePlayer } from './VoiceNotePlayer';

interface GuestAlbumModalProps {
  album: GuestAlbum | null;
  currentDeviceId: string;
  isAdminModerator?: boolean;
  onClose: () => void;
  onLikeToggle: (albumId: string) => void;
  onAddComment: (albumId: string, senderName: string, commentText: string) => void;
  onDeletePhoto?: (albumId: string, photoId: string) => void;
  onDeleteAlbum?: (albumId: string) => void;
}

export const GuestAlbumModal: React.FC<GuestAlbumModalProps> = ({
  album,
  currentDeviceId,
  isAdminModerator = false,
  onClose,
  onLikeToggle,
  onAddComment,
  onDeletePhoto,
  onDeleteAlbum,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  if (!album) return null;

  const photos = album.photos || [];
  const safeIndex = Math.min(currentPhotoIndex, Math.max(0, photos.length - 1));
  const currentPhoto = photos[safeIndex] || photos[0];
  const isLiked = album.likedByDevices?.includes(currentDeviceId);
  const isMine = album.deviceId === currentDeviceId && !album.isInitialSample;
  const canDelete = isMine || isAdminModerator;

  const handlePrev = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handleDownloadSingle = () => {
    if (!currentPhoto) return;
    const link = document.createElement('a');
    link.href = currentPhoto.imageUrl;
    link.download = `foto-${album.senderName.replace(/\s+/g, '-').toLowerCase()}-${safeIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllInAlbum = async () => {
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i];
      const link = document.createElement('a');
      link.href = p.imageUrl;
      link.download = `album-${album.senderName.replace(/\s+/g, '-').toLowerCase()}-${i + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await new Promise((r) => setTimeout(r, 350));
    }
  };

  const handleDeleteCurrentPhoto = () => {
    if (!currentPhoto || !onDeletePhoto) return;

    const confirmMsg = isMine
      ? `Hapus foto ${safeIndex + 1} dari folder Anda? Kuota 1 foto Anda akan dikembalikan.`
      : `👑 [Mode Pengantin] Hapus foto ${safeIndex + 1} milik "${album.senderName}" secara permanen dari server?`;

    if (window.confirm(confirmMsg)) {
      if (photos.length <= 1) {
        onClose();
      } else {
        setCurrentPhotoIndex((prev) => Math.max(0, prev - 1));
      }
      onDeletePhoto(album.id, currentPhoto.id);
    }
  };

  const handleDeleteEntireAlbum = () => {
    if (!onDeleteAlbum) return;

    const confirmMsg = isMine
      ? `Hapus seluruh folder Anda "${album.senderName}" (${photos.length} foto)? Kuota upload Anda akan dikembalikan.`
      : `👑 [Mode Pengantin] Hapus seluruh folder tamu "${album.senderName}" (${photos.length} foto) secara permanen dari database server?`;

    if (window.confirm(confirmMsg)) {
      onClose();
      onDeleteAlbum(album.id);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    onAddComment(album.id, commentName.trim(), commentText.trim());
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A261D]/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-white border border-[#E6CA92]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Carousel & Thumbnails */}
        <div className="relative md:w-3/5 bg-[#101915] flex flex-col justify-between overflow-hidden min-h-[340px] md:min-h-[580px] p-4">
          {/* Active Photo Container */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            {currentPhoto ? (
              <img
                key={currentPhoto.id || safeIndex}
                src={currentPhoto.imageUrl}
                alt={currentPhoto.caption || album.senderName}
                className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
              />
            ) : (
              <div className="text-gray-400 text-xs">Foto tidak tersedia</div>
            )}

            {/* Top Right Action on Photo: Delete this single photo */}
            {canDelete && currentPhoto && (
              <button
                onClick={handleDeleteCurrentPhoto}
                className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-700 text-white text-xs font-sans font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Hapus foto ini saja"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Foto Ini</span>
              </button>
            )}

            {/* Navigation Arrows (if more than 1 photo) */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-lg"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-lg"
                  title="Foto Berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Photo Counter Pill */}
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#E6CA92]/40 text-[#FAF9F5] text-[11px] font-sans font-bold flex items-center gap-1.5 shadow-md">
              <FolderArchive className="w-3.5 h-3.5 text-[#E6CA92]" />
              <span>Foto {safeIndex + 1} dari {photos.length}</span>
            </div>
          </div>

          {/* Thumbnail Bar (5 photos) */}
          {photos.length > 1 && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              {photos.map((p, idx) => (
                <button
                  key={p.id || idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    safeIndex === idx
                      ? 'border-[#E6CA92] scale-105 shadow-md ring-2 ring-[#E6CA92]/40'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.imageUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] text-white px-1 rounded-tl">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Album Details, Greetings, Likes, & Live Comments */}
        <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-gray-100 overflow-y-auto max-h-[92vh]">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E6CA92]/40 text-[#0A261D] text-[10px] font-sans font-bold">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>Folder Tamu • {photos.length} Foto</span>
                </div>
                {isMine ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Folder Anda
                  </span>
                ) : isAdminModerator ? (
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    👑 Akses Pengantin
                  </span>
                ) : null}
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#0A261D] leading-tight">
                {album.senderName}
              </h3>
            </div>

            {/* Main Greeting / Doa Restu */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/30 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block font-sans">
                Ucapan & Doa untuk Mempelai:
              </span>
              <p className="font-serif italic text-xs sm:text-sm text-[#0A261D]/85 leading-relaxed">
                "{album.caption}"
              </p>
            </div>

            {/* Guest Voice Note Player */}
            {album.voiceNoteUrl && (
              <VoiceNotePlayer
                audioUrl={album.voiceNoteUrl}
                duration={album.voiceDuration}
                senderName={album.senderName}
              />
            )}

            {/* Interaction Bar: Like Count & Download Button */}
            <div className="flex items-center justify-between gap-2 pt-1 pb-2 border-b border-gray-100">
              <button
                onClick={() => onLikeToggle(album.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all active:scale-95 cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-xs'
                    : 'bg-[#FAF9F5] text-gray-600 border border-gray-200 hover:text-rose-600 hover:border-rose-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{album.likesCount || 0} Menyukai</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDownloadSingle}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0A261D] text-xs font-medium transition-all cursor-pointer"
                  title="Unduh Foto yang Tampil"
                >
                  <Download className="w-4 h-4 text-[#0A261D]" />
                </button>
                {photos.length > 1 && (
                  <button
                    onClick={handleDownloadAllInAlbum}
                    className="px-3 py-2 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#E6CA92] text-[11px] font-sans font-bold transition-all shadow-xs cursor-pointer"
                    title="Unduh Seluruh Foto dalam Folder Ini"
                  >
                    Unduh Semua ({photos.length})
                  </button>
                )}
              </div>
            </div>

            {/* Delete entire folder action if permitted */}
            {canDelete && (
              <div className="pt-1">
                <button
                  onClick={handleDeleteEntireAlbum}
                  className="w-full py-2 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-sans font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Seluruh Folder Ini ({photos.length} Foto)</span>
                </button>
              </div>
            )}

            {/* Live Comments Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A261D] font-sans">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Komentar & Balasan ({album.comments?.length || 0})</span>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                {album.comments && album.comments.length > 0 ? (
                  album.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#0A261D]">{c.senderName}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(c.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-sans leading-relaxed">
                        {c.commentText}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic font-sans py-2 text-center">
                    Belum ada komentar. Jadilah yang pertama memberikan balasan ucapan!
                  </p>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleSubmitComment} className="space-y-2 pt-2 border-t border-gray-100 font-sans">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Nama Anda (contoh: Dani / Tante Rina)..."
                  maxLength={40}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-[#0A261D] placeholder-gray-400 focus:outline-none focus:border-[#C5A880]"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis ucapan atau komentar..."
                    maxLength={150}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#FAF9F5] border border-gray-200 text-xs text-[#0A261D] placeholder-gray-400 focus:outline-none focus:border-[#C5A880]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#E6CA92] text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {commentSuccess && (
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Komentar berhasil dipublikasikan!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
