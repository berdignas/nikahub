import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { PhotoGrid } from './components/PhotoGrid';
import { UploadModal } from './components/UploadModal';
import { GuestAlbumModal } from './components/GuestAlbumModal';
import { CouplePhotoModal } from './components/CouplePhotoModal';
import { TvSlideshowMode } from './components/TvSlideshowMode';
import { QrCodeModal } from './components/QrCodeModal';
import { DownloadAllModal } from './components/DownloadAllModal';
import { EVENT_INFO } from './data/initialPhotos';
import { GuestAlbum, PhotoMoment, FilterTab, CommentItem } from './types';
import {
  getStoredAlbums,
  saveAlbums,
  getOrCreateDeviceId,
  MAX_PHOTO_PER_DEVICE,
} from './utils/deviceStorage';
import { Heart, Camera, QrCode } from 'lucide-react';

export function App() {
  const [albums, setAlbums] = useState<GuestAlbum[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isTvOpen, setIsTvOpen] = useState(false);
  const [isDownloadAllOpen, setIsDownloadAllOpen] = useState(false);
  const [isCouplePhotoOpen, setIsCouplePhotoOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GuestAlbum | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const devId = getOrCreateDeviceId();
    setDeviceId(devId);
    const stored = getStoredAlbums();
    setAlbums(stored);
  }, []);

  // Save whenever albums change
  const updateAlbums = (newAlbums: GuestAlbum[]) => {
    setAlbums(newAlbums);
    saveAlbums(newAlbums);
  };

  // Upload new album handler (with 1 to 5 photos)
  const handleAlbumCreated = (newAlbum: GuestAlbum) => {
    const updated = [newAlbum, ...albums];
    updateAlbums(updated);

    // Also auto-select the newly created album for immediate preview!
    setSelectedAlbum(newAlbum);

    // Async background sync to Supabase PostgreSQL database
    import('./utils/supabaseClient').then(({ insertPhotoToDatabase }) => {
      newAlbum.photos.forEach((photo) => {
        insertPhotoToDatabase(photo);
      });
    });
  };

  // Like toggle handler for guest album
  const handleLikeToggle = (albumId: string) => {
    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;
      const isLiked = alb.likedByDevices?.includes(deviceId);
      const newLikedBy = isLiked
        ? (alb.likedByDevices || []).filter((id) => id !== deviceId)
        : [...(alb.likedByDevices || []), deviceId];

      const updatedAlbum: GuestAlbum = {
        ...alb,
        likedByDevices: newLikedBy,
        likesCount: Math.max(0, (alb.likesCount || 0) + (isLiked ? -1 : 1)),
      };

      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }

      return updatedAlbum;
    });

    updateAlbums(updated);
  };

  // Add comment handler to guest album
  const handleAddComment = (albumId: string, senderName: string, commentText: string) => {
    const newComment: CommentItem = {
      id: 'comm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      senderName,
      commentText,
      createdAt: new Date().toISOString(),
    };

    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;
      const updatedAlbum: GuestAlbum = {
        ...alb,
        comments: [...(alb.comments || []), newComment],
      };

      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }

      return updatedAlbum;
    });

    updateAlbums(updated);
  };

  // Delete entire album handler (refunds all upload slots!)
  const handleDeleteAlbum = (albumId: string) => {
    const updated = albums.filter((alb) => alb.id !== albumId);
    updateAlbums(updated);
    if (selectedAlbum?.id === albumId) {
      setSelectedAlbum(null);
    }
  };

  // Delete single photo from album
  const handleDeletePhotoFromAlbum = (albumId: string, photoId: string) => {
    const targetAlbum = albums.find((a) => a.id === albumId);
    if (!targetAlbum) return;

    const remainingPhotos = targetAlbum.photos.filter((p) => p.id !== photoId);
    if (remainingPhotos.length === 0) {
      handleDeleteAlbum(albumId);
      return;
    }

    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;
      const updatedAlbum: GuestAlbum = {
        ...alb,
        photos: remainingPhotos,
      };
      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }
      return updatedAlbum;
    });

    updateAlbums(updated);
  };

  // Count photos uploaded by this device
  const uploadedCount = albums
    .filter((a) => a.deviceId === deviceId && !a.isInitialSample)
    .reduce((sum, a) => sum + (a.photos?.length || 0), 0);

  // Flat photo list for TV Slideshow & Download All
  const allPhotos: PhotoMoment[] = albums.flatMap((a) => a.photos || []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0A261D] flex flex-col font-sans selection:bg-[#E6CA92]/40 selection:text-[#0A261D]">
      {/* Top Navigation */}
      <Navbar
        uploadedCount={uploadedCount}
        onOpenQr={() => setIsQrOpen(true)}
        onOpenTv={() => setIsTvOpen(true)}
        onOpenDownloadAll={() => setIsDownloadAllOpen(true)}
      />

      {/* Hero Header with FOTO UTAMA MEMPELAI on top */}
      <Header
        uploadedCount={uploadedCount}
        onOpenCouplePhoto={() => setIsCouplePhotoOpen(true)}
      />

      {/* Main Editorial Guest Albums Collage Grid */}
      <main className="flex-1">
        <PhotoGrid
          albums={albums}
          currentDeviceId={deviceId}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onLikeToggle={handleLikeToggle}
          onDeleteAlbum={handleDeleteAlbum}
          onOpenAlbum={(alb) => setSelectedAlbum(alb)}
          onOpenUpload={() => setIsUploadOpen(true)}
        />
      </main>

      {/* Floating Bottom Bar for Mobile Visitors */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="p-2.5 rounded-3xl bg-white/95 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2.5">
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex-1 py-3 px-3 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-[#0A261D] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>QR Acara</span>
          </button>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex-[2] py-3 px-4 rounded-2xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#E6CA92]" />
            <span>Upload Foto ({uploadedCount}/5)</span>
          </button>
        </div>
      </div>

      {/* Wedding Footer */}
      <footer className="py-14 border-t border-[#E6CA92]/30 bg-white text-center text-xs font-sans text-gray-500">
        <div className="max-w-md mx-auto px-4 space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#D4AF37]/30 mx-auto flex items-center justify-center text-[#C5A880]">
            <Heart className="w-3.5 h-3.5 fill-[#C5A880]" />
          </div>
          <h4 className="font-serif font-bold text-xl text-[#0A261D]">
            Alfarisyi & Maulidiyah
          </h4>
          <p className="font-serif italic text-xs text-gray-600 leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
          </p>
          <p className="text-[10px] text-gray-400 pt-2 tracking-wider uppercase">
            Live Shared Event Photo Gallery • NikaHub Atelier Suite
          </p>
        </div>
      </footer>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        uploadedCount={uploadedCount}
        onAlbumCreated={handleAlbumCreated}
        onGoToMyPhotos={() => {
          setActiveTab('mine');
        }}
      />

      {/* Guest Album Folder Modal: Displays all 5 photos with carousel, thumbs, greetings, likes, live comments */}
      <GuestAlbumModal
        album={selectedAlbum}
        currentDeviceId={deviceId}
        onClose={() => setSelectedAlbum(null)}
        onLikeToggle={handleLikeToggle}
        onAddComment={handleAddComment}
        onDeletePhoto={handleDeletePhotoFromAlbum}
      />

      {/* Couple Official Portrait Modal */}
      <CouplePhotoModal
        isOpen={isCouplePhotoOpen}
        onClose={() => setIsCouplePhotoOpen(false)}
        eventInfo={EVENT_INFO}
      />

      {/* TV Slideshow Mode (Projector Screen) */}
      <TvSlideshowMode
        isOpen={isTvOpen}
        onClose={() => setIsTvOpen(false)}
        photos={allPhotos}
        eventInfo={EVENT_INFO}
      />

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      {/* Download All Modal */}
      <DownloadAllModal
        isOpen={isDownloadAllOpen}
        onClose={() => setIsDownloadAllOpen(false)}
        photos={allPhotos}
      />
    </div>
  );
}

export default App;
