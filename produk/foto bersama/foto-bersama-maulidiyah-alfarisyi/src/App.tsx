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
    <div className="min-h-screen bg-[#FAF9F5] text-[#0A261D] flex flex-col font-sans selection:bg-[#E6CA92]/40 selection:text-[#0A261D]">
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
            Maulidiyah & Alfarisyi
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
