import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { PhotoGrid } from './components/PhotoGrid';
import { UploadModal } from './components/UploadModal';
import { PhotoDetailModal } from './components/PhotoDetailModal';
import { TvSlideshowMode } from './components/TvSlideshowMode';
import { QrCodeModal } from './components/QrCodeModal';
import { DownloadAllModal } from './components/DownloadAllModal';
import { EVENT_INFO } from './data/initialPhotos';
import { PhotoMoment, FilterTab } from './types';
import {
  getStoredPhotos,
  savePhotos,
  getOrCreateDeviceId,
  getDeviceUploadCount,
  MAX_PHOTO_PER_DEVICE,
} from './utils/deviceStorage';
import { Heart, Camera, QrCode } from 'lucide-react';

export function App() {
  const [photos, setPhotos] = useState<PhotoMoment[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isTvOpen, setIsTvOpen] = useState(false);
  const [isDownloadAllOpen, setIsDownloadAllOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMoment | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const devId = getOrCreateDeviceId();
    setDeviceId(devId);
    const stored = getStoredPhotos();
    setPhotos(stored);
  }, []);

  // Save whenever photos change
  const updatePhotos = (newPhotos: PhotoMoment[]) => {
    setPhotos(newPhotos);
    savePhotos(newPhotos);
  };

  // Upload handler with database & Cloudflare R2 sync
  const handlePhotoUploaded = (newPhoto: PhotoMoment) => {
    const updated = [newPhoto, ...photos];
    updatePhotos(updated);
    
    // Async background sync to Supabase PostgreSQL database
    import('./utils/supabaseClient').then(({ insertPhotoToDatabase }) => {
      insertPhotoToDatabase(newPhoto);
    });
  };

  // Like toggle handler
  const handleLikeToggle = (photoId: string) => {
    const updated = photos.map((p) => {
      if (p.id !== photoId) return p;
      const isLiked = p.likedByDevices?.includes(deviceId);
      const newLikedBy = isLiked
        ? (p.likedByDevices || []).filter((id) => id !== deviceId)
        : [...(p.likedByDevices || []), deviceId];

      return {
        ...p,
        likedByDevices: newLikedBy,
        likesCount: Math.max(0, (p.likesCount || 0) + (isLiked ? -1 : 1)),
      };
    });
    updatePhotos(updated);

    // Also update modal preview if open
    if (selectedPhoto && selectedPhoto.id === photoId) {
      const current = updated.find((p) => p.id === photoId);
      if (current) setSelectedPhoto(current);
    }
  };

  // Delete handler (refunds 1 upload slot!)
  const handleDeletePhoto = (photoId: string) => {
    const updated = photos.filter((p) => p.id !== photoId);
    updatePhotos(updated);
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const uploadedCount = photos.filter((p) => p.deviceId === deviceId && !p.isInitialSample).length;

  return (
    <div className="min-h-screen bg-[#161c14] text-[#ece5da] flex flex-col font-sans-ui selection:bg-[#685c46]/30 selection:text-[#f8f6e1]">
      {/* Top Navigation */}
      <Navbar
        uploadedCount={uploadedCount}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        onOpenTv={() => setIsTvOpen(true)}
        onOpenDownloadAll={() => setIsDownloadAllOpen(true)}
      />

      {/* Hero Header & Quota Info */}
      <Header
        uploadedCount={uploadedCount}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* Main Photo Gallery */}
      <main className="flex-1">
        <PhotoGrid
          photos={photos}
          currentDeviceId={deviceId}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onLikeToggle={handleLikeToggle}
          onDeletePhoto={handleDeletePhoto}
          onOpenDetail={(photo) => setSelectedPhoto(photo)}
          onOpenUpload={() => setIsUploadOpen(true)}
        />
      </main>

      {/* Floating Bottom Bar for Mobile Visitors */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="p-2 rounded-2xl bg-[#1a2217]/95 border border-[#685c46]/50 shadow-2xl backdrop-blur-md flex items-center justify-between gap-2">
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#20291e] border border-[#685c46]/40 text-[#f8f6e1] text-xs flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-[#d8cca8]" />
            <span>QR Acara</span>
          </button>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex-[2] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4 text-[#685c46]" />
            <span>Upload Foto ({uploadedCount}/5)</span>
          </button>
        </div>
      </div>

      {/* Wedding Footer */}
      <footer className="py-12 border-t border-[#685c46]/20 bg-[#121610] text-center text-xs font-sans-ui text-[#b8c4ae]/70">
        <div className="max-w-md mx-auto px-4 space-y-3">
          <div className="w-8 h-8 rounded-full bg-[#20291e] border border-[#685c46]/40 mx-auto flex items-center justify-center text-[#d8cca8]">
            <Heart className="w-3.5 h-3.5 fill-[#d8cca8]" />
          </div>
          <h4 className="font-aston text-2xl text-[#f8f6e1]">
            Maulidiyah & Alfarisyi
          </h4>
          <p className="font-roman italic text-xs text-[#ece5da]/80">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
          </p>
          <p className="text-[11px] text-[#b8c4ae]/50 pt-2">
            Live Shared Event Photo Gallery • Berdikari Wedding Luxury Suite
          </p>
        </div>
      </footer>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        uploadedCount={uploadedCount}
        onPhotoUploaded={handlePhotoUploaded}
        onGoToMyPhotos={() => {
          setActiveTab('mine');
        }}
      />

      <PhotoDetailModal
        photo={selectedPhoto}
        currentDeviceId={deviceId}
        onClose={() => setSelectedPhoto(null)}
        onLikeToggle={handleLikeToggle}
      />

      <TvSlideshowMode
        isOpen={isTvOpen}
        onClose={() => setIsTvOpen(false)}
        photos={photos}
        eventInfo={EVENT_INFO}
      />

      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      <DownloadAllModal
        isOpen={isDownloadAllOpen}
        onClose={() => setIsDownloadAllOpen(false)}
        photos={photos}
      />
    </div>
  );
}

export default App;
