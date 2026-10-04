import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Image as ImageIcon, Sparkles, AlertCircle, Trash2, Loader2, RefreshCw, Plus, FolderArchive, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { compressImageFile, MAX_PHOTO_PER_DEVICE, getOrCreateDeviceId } from '../utils/deviceStorage';
import { GuestAlbum, PhotoMoment } from '../types';
import { VoiceNoteRecorder } from './VoiceNoteRecorder';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedCount: number;
  onAlbumCreated: (newAlbum: GuestAlbum) => void;
  onGoToMyPhotos: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  uploadedCount,
  onAlbumCreated,
  onGoToMyPhotos,
}) => {
  const [senderName, setSenderName] = useState('');
  const [caption, setCaption] = useState('');
  const [voiceNoteUrl, setVoiceNoteUrl] = useState<string>('');
  const [voiceDuration, setVoiceDuration] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live Stream Camera State
  const [isLiveCamera, setIsLiveCamera] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Stop camera stream when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopLiveCamera();
    }
  }, [isOpen]);

  // Hook stream to video element whenever isLiveCamera turns true or videoRef mounts
  useEffect(() => {
    if (isLiveCamera && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => {
        console.warn('Video playback error:', err);
      });
    }
  }, [isLiveCamera]);

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsLiveCamera(false);
    setIsCameraLoading(false);
  };

  const startLiveCamera = async (mode: 'user' | 'environment' = facingMode) => {
    setErrorMsg('');
    setIsCameraLoading(true);
    stopLiveCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser tidak mendukung akses kamera langsung');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setFacingMode(mode);
      setIsLiveCamera(true);
      setIsCameraLoading(false);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Failed to start live camera, fallback to native camera:', err);
      setIsCameraLoading(false);
      setIsLiveCamera(false);
      // Fallback directly to native phone camera application
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        setErrorMsg('Tidak dapat mengakses kamera browser. Silakan gunakan tombol "Buka Kamera Bawaan HP" di bawah.');
      }
    }
  };

  const captureLivePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front-camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    stopLiveCamera();

    // Compress visually lossless
    setIsCompressing(true);
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const compressedDataUrl = await compressImageFile(file);
      setSelectedImages((prev) => [...prev, compressedDataUrl]);
    } catch {
      setSelectedImages((prev) => [...prev, dataUrl]);
    } finally {
      setIsCompressing(false);
    }
  };

  if (!isOpen) return null;

  const remaining = Math.max(0, MAX_PHOTO_PER_DEVICE - uploadedCount);
  const isQuotaFull = remaining === 0;
  const availableSlots = remaining - selectedImages.length;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (availableSlots <= 0) {
      setErrorMsg(`Batas maksimal 5 foto per perangkat telah tercapai.`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    setIsCompressing(true);
    setErrorMsg('');

    try {
      const compressedList: string[] = [];
      for (const file of filesToProcess) {
        const compressed = await compressImageFile(file);
        compressedList.push(compressed);
      }
      setSelectedImages((prev) => [...prev, ...compressedList]);
    } catch (err) {
      setErrorMsg('Gagal memproses beberapa gambar. Silakan coba kembali.');
    } finally {
      setIsCompressing(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      setErrorMsg('Silakan pilih atau ambil minimal 1 foto.');
      return;
    }

    if (isQuotaFull) {
      setErrorMsg('Batas maksimal 5 foto per perangkat telah tercapai.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const deviceId = getOrCreateDeviceId();
      const albumId = 'album_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
      const guestName = senderName.trim() || 'Tamu Undangan';
      const guestCaption = caption.trim() || 'Momen bahagia bersama Alfarisyi & Maulidiyah ✨';

      const photoMoments: PhotoMoment[] = selectedImages.map((imgUrl, i) => ({
        id: `photo_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 5)}`,
        senderName: guestName,
        caption: guestCaption,
        imageUrl: imgUrl,
        deviceId: deviceId,
        likesCount: 1,
        likedByDevices: [deviceId],
        createdAt: new Date().toISOString(),
        isInitialSample: false,
      }));

      const newAlbum: GuestAlbum = {
        id: albumId,
        deviceId: deviceId,
        senderName: guestName,
        caption: guestCaption,
        voiceNoteUrl: voiceNoteUrl || undefined,
        voiceDuration: voiceDuration || undefined,
        photos: photoMoments,
        likesCount: 1,
        likedByDevices: [deviceId],
        comments: [],
        createdAt: new Date().toISOString(),
        isInitialSample: false,
      };

      onAlbumCreated(newAlbum);

      // Trigger Confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6CA92', '#0A261D', '#FAF9F5', '#C5A880'],
      });

      setSelectedImages([]);
      setSenderName('');
      setCaption('');
      setVoiceNoteUrl('');
      setVoiceDuration(0);
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Terjadi kendala saat menyimpan album foto.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A261D]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-[#E6CA92]/40 text-[#0A261D] rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#E6CA92]/40 shadow-xs">
              <FolderArchive className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0A261D] leading-none">
                Unggah Folder Foto Tamu
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Pilih 1 hingga {remaining} foto untuk folder Anda (Batas 5 foto/tamu)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopLiveCamera();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-all hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* If Quota is FULL (5/5) */}
          {isQuotaFull ? (
            <div className="text-center py-6 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#0A261D]">
                Kuota Foto Lengkap (5/5)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                Terima kasih banyak telah membagikan 5 momen kebersamaan Anda bersama <strong className="text-[#0A261D]">Alfarisyi & Maulidiyah</strong>.
                <br /><br />
                Batasan <strong>5 foto per perangkat</strong> diterapkan agar seluruh tamu undangan mendapatkan ruang yang setara untuk berbagi foto.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToMyPhotos();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] text-xs font-semibold shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  Lihat Folder Saya
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 text-xs hover:bg-gray-200 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Photo Input Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#0A261D]">
                    Pilih Foto (Bisa pilih 1 hingga {remaining} foto):
                  </label>
                  <span className="text-[11px] font-bold text-[#C5A880]">
                    {selectedImages.length} / {remaining} Foto Dipilih
                  </span>
                </div>

                {/* Live Camera Viewfinder Overlay (Wide, Spacious, Full Screen Responsive) */}
                {isLiveCamera ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#E6CA92] bg-black flex flex-col items-center shadow-xl">
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[260px] bg-black overflow-hidden flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        onLoadedMetadata={(e) => {
                          (e.target as HTMLVideoElement).play().catch(() => {});
                        }}
                        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                      />

                      {isCameraLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white gap-2 z-10">
                          <Loader2 className="w-7 h-7 animate-spin text-[#E6CA92]" />
                          <span className="text-xs">Membuka Kamera...</span>
                        </div>
                      )}

                      {/* Top bar controls */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 border border-white/20">
                          {facingMode === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            stopLiveCamera();
                            cameraInputRef.current?.click();
                          }}
                          className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 text-[10px] text-[#E6CA92] border border-[#E6CA92]/40 backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer"
                          title="Beralih ke aplikasi kamera bawaan HP"
                        >
                          <Smartphone className="w-3 h-3" />
                          <span>Kamera Bawaan HP</span>
                        </button>
                      </div>

                      {/* Bottom Shutter and Switch Controls */}
                      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-5 z-20 px-4">
                        {/* Flip Camera Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const nextMode = facingMode === 'environment' ? 'user' : 'environment';
                            startLiveCamera(nextMode);
                          }}
                          className="w-11 h-11 rounded-full bg-black/70 text-white border border-white/30 hover:bg-black flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-lg"
                          title="Tukar Kamera Depan / Belakang"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>

                        {/* Large Luxury Shutter Button */}
                        <button
                          type="button"
                          onClick={captureLivePhoto}
                          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FAF9F5] via-white to-[#E6CA92] border-4 border-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-black/40"
                          title="Potret Foto"
                        >
                          <div className="w-7 h-7 rounded-full bg-[#0A261D] border border-[#E6CA92]" />
                        </button>

                        {/* Close Live Camera */}
                        <button
                          type="button"
                          onClick={stopLiveCamera}
                          className="w-11 h-11 rounded-full bg-black/70 text-red-300 border border-red-500/40 hover:bg-red-950 flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-lg"
                          title="Tutup Kamera"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Selected Images Thumbnail Grid */}
                    {selectedImages.length > 0 && (
                      <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/30 space-y-2">
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                          {selectedImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-100 shadow-xs">
                              <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1 rounded">
                                {idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                                title="Hapus foto ini"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          {/* Add more slot if still under limit */}
                          {availableSlots > 0 && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="aspect-square rounded-xl border-2 border-dashed border-[#E6CA92] hover:border-[#0A261D] bg-white flex flex-col items-center justify-center text-[#C5A880] hover:text-[#0A261D] transition-colors cursor-pointer"
                              title="Tambah foto lagi"
                            >
                              <Plus className="w-5 h-5" />
                              <span className="text-[10px] font-bold mt-0.5">Tambah</span>
                            </button>
                          )}
                        </div>

                        {/* Quick Action to Add Photo via Camera or Gallery when some photos already selected */}
                        {availableSlots > 0 && (
                          <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                            <button
                              type="button"
                              onClick={() => cameraInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#0A261D] text-[#0A261D] text-[11px] font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
                              <span>Ambil Foto HP</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#0A261D] text-[#0A261D] text-[11px] font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                              <span>Pilih Galeri</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action buttons to pick photos (when 0 selected) */}
                    {selectedImages.length === 0 && (
                      <div className="space-y-2.5">
                        {/* Big Primary Choice: Buka Kamera Bawaan HP & Kamera Web */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Option 1: Native Internal Phone Camera App (Most reliable on all smartphones) */}
                          <button
                            type="button"
                            disabled={isCompressing}
                            onClick={() => cameraInputRef.current?.click()}
                            className="p-4 rounded-2xl border-2 border-dashed border-[#D4AF37]/60 bg-gradient-to-br from-[#FAF9F5] to-white hover:border-[#0A261D] hover:shadow-md transition-all flex items-center gap-3.5 text-left cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-[#0A261D] text-[#E6CA92] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                              <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#0A261D] block">
                                Kamera Bawaan HP
                              </span>
                              <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                                Buka aplikasi kamera internal HP (Hasil Tajam & Jernih)
                              </span>
                            </div>
                          </button>

                          {/* Option 2: Live Web Browser Camera */}
                          <button
                            type="button"
                            disabled={isCompressing}
                            onClick={() => startLiveCamera('environment')}
                            className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-[#0A261D] hover:shadow-md transition-all flex items-center gap-3.5 text-left cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6CA92]/50 text-[#C5A880] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                              <Camera className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#0A261D] block">
                                Kamera Web Langsung
                              </span>
                              <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                                Potret foto langsung di layar browser
                              </span>
                            </div>
                          </button>
                        </div>

                        {/* Option 3: Pick from Phone Gallery */}
                        <button
                          type="button"
                          disabled={isCompressing}
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-[#0A261D] hover:bg-[#FAF9F5] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
                        >
                          <ImageIcon className="w-4 h-4 text-[#C5A880]" />
                          <span className="text-xs font-bold text-[#0A261D]">
                            Atau Pilih Foto dari Galeri HP (Bisa pilih 1-{remaining} foto)
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Hidden Inputs for native file picker & camera */}
                    {/* Native phone camera application input */}
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {/* Native multi-file gallery picker */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {isCompressing && (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-[#C5A880] bg-[#FAF9F5] rounded-xl border border-[#E6CA92]/30 mt-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0A261D]" />
                    <span className="font-medium text-[#0A261D]">Memproses & mengompresi foto otomatis...</span>
                  </div>
                )}
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-semibold text-[#0A261D] mb-1.5">
                  Nama Anda / Rombongan (Judul Folder):
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Faizun / Keluarga Malang / Sahabat SMA"
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#0A261D] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors shadow-xs"
                  required
                />
              </div>

              {/* Caption / Ucapan */}
              <div>
                <label className="block text-xs font-semibold text-[#0A261D] mb-1.5">
                  Ucapan & Doa untuk Mempelai (Teks):
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tuliskan ucapan selamat atau doa restu untuk Maulidiyah & Alfarisyi..."
                  rows={3}
                  maxLength={250}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#0A261D] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors resize-none shadow-xs"
                />
              </div>

              {/* Voice Note / Rekam Pesan Suara */}
              <VoiceNoteRecorder
                onAudioRecorded={(audioDataUrl, dur) => {
                  setVoiceNoteUrl(audioDataUrl);
                  setVoiceDuration(dur);
                }}
                onAudioRemoved={() => {
                  setVoiceNoteUrl('');
                  setVoiceDuration(0);
                }}
                recordedAudioUrl={voiceNoteUrl}
                recordedDuration={voiceDuration}
              />

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isCompressing || selectedImages.length === 0}
                  className="w-full py-3.5 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-bold text-xs shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#E6CA92]" />
                      <span>Menyimpan Folder Foto...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E6CA92]" />
                      <span>Publikasikan Folder ({selectedImages.length} Foto)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
