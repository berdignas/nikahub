import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { PhotoGrid } from './components/PhotoGrid';
import { UploadModal } from './components/UploadModal';
import { GuestAlbumModal } from './components/GuestAlbumModal';
import { CouplePhotoModal } from './components/CouplePhotoModal';
import { TvSlideshowMode } from './components/TvSlideshowMode';
import { QrCodeModal } from './components/QrCodeModal';
import { DownloadAllModal } from './components/DownloadAllModal';
import { AdminPinModal } from './components/AdminPinModal';
import { RealtimeNotificationBanner, RealtimeAlertData } from './components/RealtimeNotificationBanner';
import { EVENT_INFO } from './data/initialPhotos';
import { GuestAlbum, PhotoMoment, FilterTab, CommentItem } from './types';
import {
  getStoredAlbums,
  saveAlbums,
  getOrCreateDeviceId,
  MAX_PHOTO_PER_DEVICE,
  calculateStorageStats,
  mergeDeviceLikesIntoAlbums,
  toggleStoredLikedAlbumId,
} from './utils/deviceStorage';
import {
  supabase,
  insertAlbumToDatabase,
  updateAlbumInDatabase,
  fetchAlbumsFromDatabase,
  deleteAlbumFromDatabase,
  deletePhotoFromDatabase,
} from './utils/supabaseClient';
import { Heart, Camera, QrCode, KeyRound, ShieldCheck } from 'lucide-react';

/**
 * Elegant soft synthesizer bell chime using Web Audio API
 */
function playSoftNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    // Elegant two-tone bell chime (C5 523Hz -> E5 659Hz)
    [523.25, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.035, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.65);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.65);
    });
  } catch {}
}

export function App() {
  const [albums, setAlbums] = useState<GuestAlbum[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Moderator / Admin Mode (unlocked with 4-digit PIN per browser session)
  const [isAdminModerator, setIsAdminModerator] = useState<boolean>(() => {
    try {
      // Clear legacy localStorage admin flag so browser does NOT stay permanently unlocked
      localStorage.removeItem('wedding_is_admin_mode');
      return sessionStorage.getItem('wedding_is_admin_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinModalMode, setPinModalMode] = useState<'verify' | 'change'>('verify');

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isTvOpen, setIsTvOpen] = useState(false);
  const [isDownloadAllOpen, setIsDownloadAllOpen] = useState(false);
  const [isCouplePhotoOpen, setIsCouplePhotoOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GuestAlbum | null>(null);

  // Live Toast Notification for New Guest Uploads
  const [realtimeAlert, setRealtimeAlert] = useState<RealtimeAlertData | null>(null);
  const lastAlertTimeRef = useRef<number>(0);
  const lastAlertKeyRef = useRef<string>('');

  // Initialize data on mount and fetch remote albums from Supabase Database
  useEffect(() => {
    const devId = getOrCreateDeviceId();
    setDeviceId(devId);

    // 1. Instant rendering from local storage merged with persistent device likes
    const local = getStoredAlbums();
    setAlbums(mergeDeviceLikesIntoAlbums(local, devId));

    // 2. Sync remote albums from Supabase so all devices see uploads and deletions!
    fetchAlbumsFromDatabase().then((remoteAlbums) => {
      if (remoteAlbums !== null) {
        const merged = mergeDeviceLikesIntoAlbums(remoteAlbums, devId);
        setAlbums(merged);
        saveAlbums(merged);
      }
    });

    // Helper to process live incoming upload events & trigger luxury notification toast
    const handleNewUploadEvent = (payload: any) => {
      const newRecord = payload.new;
      if (!newRecord) return;

      // Ignore notifications for uploads triggered by THIS local device (user already saw confetti)
      if (newRecord.device_id && newRecord.device_id === devId) {
        return;
      }

      const albumId = newRecord.id || newRecord.album_id;
      const dedupeKey = albumId || newRecord.sender_name || 'unknown';

      // De-duplicate if same album triggers events on both wedding_albums and wedding_photos within 2.5s
      const now = Date.now();
      if (now - lastAlertTimeRef.current < 2500 && lastAlertKeyRef.current === dedupeKey) {
        return;
      }
      lastAlertTimeRef.current = now;
      lastAlertKeyRef.current = dedupeKey;

      const senderName = newRecord.sender_name || 'Tamu Undangan';
      const caption = newRecord.caption || undefined;

      let photoCount = 1;
      let thumbnailUrl: string | undefined = undefined;

      if (newRecord.photos_data) {
        const rawPhotos = Array.isArray(newRecord.photos_data)
          ? newRecord.photos_data
          : newRecord.photos_data.photos;
        if (Array.isArray(rawPhotos) && rawPhotos.length > 0) {
          photoCount = rawPhotos.length;
          thumbnailUrl = rawPhotos[0]?.imageUrl;
        }
      } else if (newRecord.image_url) {
        thumbnailUrl = newRecord.image_url;
      }

      setRealtimeAlert({
        id: 'alert_' + now + '_' + Math.random().toString(36).substring(2, 6),
        senderName,
        caption,
        photoCount,
        thumbnailUrl,
        albumId,
        timestamp: now,
      });

      playSoftNotificationChime();
    };

    // 3. Setup Supabase Realtime channel for instant sync across all devices
    const channel = supabase
      .channel('public:wedding_realtime_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wedding_photos' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          handleNewUploadEvent(payload);
        }
        fetchAlbumsFromDatabase().then((remoteAlbums) => {
          if (remoteAlbums !== null) {
            const merged = mergeDeviceLikesIntoAlbums(remoteAlbums, devId);
            setAlbums(merged);
            saveAlbums(merged);
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wedding_albums' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          handleNewUploadEvent(payload);
        }
        fetchAlbumsFromDatabase().then((remoteAlbums) => {
          if (remoteAlbums !== null) {
            const merged = mergeDeviceLikesIntoAlbums(remoteAlbums, devId);
            setAlbums(merged);
            saveAlbums(merged);
          }
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Ensure history state exists on mount so mobile hardware back button never exits the browser
  useEffect(() => {
    try {
      window.history.replaceState({ weddingRoot: true }, '');
      window.history.pushState({ weddingGallery: true }, '');
    } catch {}
  }, []);

  // Mobile Hardware & Browser Back Navigation Handler (Go to main wedding dashboard if no modal is open)
  useEffect(() => {
    const hasAnyModalOpen = !!(
      selectedAlbum ||
      isUploadOpen ||
      isCouplePhotoOpen ||
      isQrOpen ||
      isTvOpen ||
      isPinModalOpen ||
      isDownloadAllOpen
    );

    if (hasAnyModalOpen) {
      window.history.pushState({ modalOpen: true }, '');
    }

    const handlePopState = () => {
      // If a modal is open, close the modal first!
      if (selectedAlbum) {
        setSelectedAlbum(null);
        return;
      }
      if (isUploadOpen) {
        setIsUploadOpen(false);
        return;
      }
      if (isCouplePhotoOpen) {
        setIsCouplePhotoOpen(false);
        return;
      }
      if (isQrOpen) {
        setIsQrOpen(false);
        return;
      }
      if (isTvOpen) {
        setIsTvOpen(false);
        return;
      }
      if (isPinModalOpen) {
        setIsPinModalOpen(false);
        return;
      }
      if (isDownloadAllOpen) {
        setIsDownloadAllOpen(false);
        return;
      }

      // If no modal is open and user presses back on phone: navigate to main invitation dashboard!
      window.location.href = '/undangan-maulidiyah-alfarisyi';
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    selectedAlbum,
    isUploadOpen,
    isCouplePhotoOpen,
    isQrOpen,
    isTvOpen,
    isPinModalOpen,
    isDownloadAllOpen,
  ]);

  // Save whenever albums change
  const updateAlbums = (newAlbums: GuestAlbum[]) => {
    setAlbums(newAlbums);
    saveAlbums(newAlbums);
  };

  // Admin PIN Unlock / Lock Handlers
  const handleUnlockAdmin = () => {
    setIsAdminModerator(true);
    try {
      sessionStorage.setItem('wedding_is_admin_mode', 'true');
      localStorage.removeItem('wedding_is_admin_mode');
    } catch {}
  };

  const handleLockAdmin = () => {
    setIsAdminModerator(false);
    try {
      sessionStorage.removeItem('wedding_is_admin_mode');
      localStorage.removeItem('wedding_is_admin_mode');
    } catch {}
  };

  // Upload new album handler (with 1 to 5 photos) + database sync
  const handleAlbumCreated = async (newAlbum: GuestAlbum): Promise<boolean> => {
    // 1. Sync album record & photos to Supabase database first with timeout protection
    const syncSuccess = await insertAlbumToDatabase(newAlbum);

    if (!syncSuccess) {
      console.warn('Database upload failed. Preserving modal state for retry.');
      return false;
    }

    // 2. Once verified by database, add to live React state & safe local persistence
    const updated = [newAlbum, ...albums];
    updateAlbums(updated);

    // 3. Auto-select the newly created album for immediate preview
    setSelectedAlbum(newAlbum);

    return true;
  };

  // Like toggle for album
  const handleLikeToggle = (albumId: string) => {
    let targetAlbum: GuestAlbum | undefined;

    // 1. Immediately toggle and save to device local storage so like is NEVER lost
    toggleStoredLikedAlbumId(albumId);

    // 2. Update React State
    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;

      const deviceLiked = alb.likedByDevices || [];
      const alreadyLiked = deviceLiked.includes(deviceId);

      let newLikedBy: string[];

      if (alreadyLiked) {
        newLikedBy = deviceLiked.filter((id) => id !== deviceId);
      } else {
        newLikedBy = [...deviceLiked, deviceId];
      }

      const updatedAlbum: GuestAlbum = {
        ...alb,
        likesCount: newLikedBy.length,
        likedByDevices: newLikedBy,
      };

      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }

      targetAlbum = updatedAlbum;
      return updatedAlbum;
    });

    updateAlbums(updated);

    // 3. Atomically sync to Supabase database
    if (targetAlbum) {
      updateAlbumInDatabase(targetAlbum);
    }
  };

  // Add Comment or Reply to album
  const handleAddComment = (
    albumId: string,
    senderName: string,
    commentText: string,
    replyToName?: string,
    replyToId?: string
  ) => {
    const newComment: CommentItem = {
      id: 'cmt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      senderName,
      commentText,
      createdAt: new Date().toISOString(),
      ...(replyToName ? { replyToName, replyToId } : {}),
    };

    let targetAlbum: GuestAlbum | undefined;

    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;

      const updatedAlbum: GuestAlbum = {
        ...alb,
        comments: [...(alb.comments || []), newComment],
      };

      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }

      targetAlbum = updatedAlbum;
      return updatedAlbum;
    });

    updateAlbums(updated);

    if (targetAlbum) {
      updateAlbumInDatabase(targetAlbum);
    }
  };

  // Delete entire album handler (refunds all upload slots!)
  const handleDeleteAlbum = (albumId: string) => {
    const targetAlbum = albums.find((alb) => alb.id === albumId);
    const photoIds = targetAlbum?.photos?.map((p) => p.id) || [];
    const updated = albums.filter((alb) => alb.id !== albumId);
    updateAlbums(updated);
    if (selectedAlbum?.id === albumId) {
      setSelectedAlbum(null);
    }
    deleteAlbumFromDatabase(albumId, photoIds, targetAlbum);
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

    let updatedTargetAlbum: GuestAlbum | undefined;

    const updated = albums.map((alb) => {
      if (alb.id !== albumId) return alb;
      const updatedAlbum: GuestAlbum = {
        ...alb,
        photos: remainingPhotos,
      };
      updatedTargetAlbum = updatedAlbum;
      if (selectedAlbum && selectedAlbum.id === albumId) {
        setSelectedAlbum(updatedAlbum);
      }
      return updatedAlbum;
    });

    updateAlbums(updated);
    deletePhotoFromDatabase(photoId, albumId, updatedTargetAlbum);
  };

  // Count photos uploaded by this device
  const uploadedCount = albums
    .filter((a) => a.deviceId === deviceId && !a.isInitialSample)
    .reduce((sum, a) => sum + (a.photos?.length || 0), 0);

  // Flat photo list for TV Slideshow & Download All
  const allPhotos: PhotoMoment[] = albums.flatMap((a) => a.photos || []);

  // Calculate 1.0 GB Cloud Storage stats & limits
  const storageStats = calculateStorageStats(albums, 1.0);

  // Handler when user clicks on a live realtime notification toast
  const handleViewAlertAlbum = (albumId?: string) => {
    setRealtimeAlert(null);
    if (!albumId) return;

    const target = albums.find((a) => a.id === albumId);
    if (target) {
      setSelectedAlbum(target);
      return;
    }

    fetchAlbumsFromDatabase().then((fresh) => {
      if (fresh) {
        const found = fresh.find((a) => a.id === albumId);
        if (found) {
          setSelectedAlbum(found);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0A261D] flex flex-col font-sans selection:bg-[#E6CA92]/40 selection:text-[#0A261D]">
      {/* Floating Real-time Notification Banner for New Guest Uploads */}
      <RealtimeNotificationBanner
        alert={realtimeAlert}
        onDismiss={() => setRealtimeAlert(null)}
        onViewAlbum={handleViewAlertAlbum}
      />

      {/* Top Navigation */}
      <Navbar
        onOpenTv={() => setIsTvOpen(true)}
        isAdminModerator={isAdminModerator}
        onOpenPinModal={() => {
          setPinModalMode('verify');
          setIsPinModalOpen(true);
        }}
        onOpenChangePinModal={() => {
          setPinModalMode('change');
          setIsPinModalOpen(true);
        }}
        onExitAdminMode={handleLockAdmin}
      />

      {/* Hero Header with FOTO UTAMA MEMPELAI and Storage Stats */}
      <Header
        uploadedCount={uploadedCount}
        onOpenCouplePhoto={() => setIsCouplePhotoOpen(true)}
        storageStats={storageStats}
      />

      {/* Main Editorial Guest Albums Collage Grid */}
      <main className="flex-1">
        <PhotoGrid
          albums={albums}
          currentDeviceId={deviceId}
          isAdminModerator={isAdminModerator}
          onExitAdminMode={handleLockAdmin}
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
            className="flex-1 py-3 px-3 rounded-2xl bg-[#FAF9F5] border border-gray-200 text-[#0A261D] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            title="Buka QR Code Meja Acara"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>QR Code</span>
          </button>

          <button
            onClick={() => setIsUploadOpen(true)}
            className={`flex-[2] py-3 px-4 rounded-2xl text-[#FAF9F5] text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
              storageStats.isFull
                ? 'bg-red-700 hover:bg-red-800'
                : 'bg-[#0A261D] hover:bg-[#164E3D]'
            }`}
          >
            <Camera className="w-4 h-4 text-[#E6CA92]" />
            <span>
              {storageStats.isFull
                ? 'Storage Penuh (1 GB)'
                : `Upload Foto (${uploadedCount}/5)`}
            </span>
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
        isStorageFull={storageStats.isFull}
      />

      {/* Guest Album Folder Modal: Displays all 5 photos with carousel, thumbs, greetings, likes, live comments, & delete */}
      <GuestAlbumModal
        album={selectedAlbum}
        currentDeviceId={deviceId}
        isAdminModerator={isAdminModerator}
        onClose={() => setSelectedAlbum(null)}
        onLikeToggle={handleLikeToggle}
        onAddComment={handleAddComment}
        onDeletePhoto={handleDeletePhotoFromAlbum}
        onDeleteAlbum={handleDeleteAlbum}
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

      {/* Admin 4-Digit PIN Modal */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleUnlockAdmin}
        initialMode={pinModalMode}
      />
    </div>
  );
}

export default App;
