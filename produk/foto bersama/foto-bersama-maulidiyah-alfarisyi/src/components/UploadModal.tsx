import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Image as ImageIcon, Sparkles, AlertCircle, Trash2, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { compressImageFile, MAX_PHOTO_PER_DEVICE, getOrCreateDeviceId } from '../utils/deviceStorage';
import { PhotoMoment } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedCount: number;
  onPhotoUploaded: (newPhoto: PhotoMoment) => void;
  onGoToMyPhotos: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  uploadedCount,
  onPhotoUploaded,
  onGoToMyPhotos,
}) => {
  const [senderName, setSenderName] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalSizeText, setOriginalSizeText] = useState('');
  const [compressedSizeText, setCompressedSizeText] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live Stream Camera State
  const [isLiveCamera, setIsLiveCamera] = useState(false);
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

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsLiveCamera(false);
  };

  const startLiveCamera = async (mode: 'user' | 'environment' = facingMode) => {
    setErrorMsg('');
    try {
      stopLiveCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLiveCamera(true);
    } catch (err) {
      // Fallback to native camera input
      cameraInputRef.current?.click();
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

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    stopLiveCamera();

    // Compress visually lossless
    setIsCompressing(true);
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      setOriginalSizeText(`${Math.round(blob.size / 1024)} KB`);
      const compressedDataUrl = await compressImageFile(file);
      setSelectedImage(compressedDataUrl);
      const compKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
      setCompressedSizeText(`${compKb} KB`);
    } catch {
      setSelectedImage(dataUrl);
    } finally {
      setIsCompressing(false);
    }
  };

  if (!isOpen) return null;

  const remaining = Math.max(0, MAX_PHOTO_PER_DEVICE - uploadedCount);
  const isQuotaFull = remaining === 0;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsCompressing(true);

    try {
      const origKb = Math.round(file.size / 1024);
      setOriginalSizeText(origKb > 1024 ? `${(origKb / 1024).toFixed(1)} MB` : `${origKb} KB`);

      const compressedDataUrl = await compressImageFile(file);
      setSelectedImage(compressedDataUrl);

      const compKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
      setCompressedSizeText(compKb > 1024 ? `${(compKb / 1024).toFixed(1)} MB` : `${compKb} KB`);
    } catch (err) {
      setErrorMsg('Gagal memproses gambar. Silakan coba pilih gambar lain.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setErrorMsg('Silakan pilih atau ambil foto terlebih dahulu.');
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
      const newPhoto: PhotoMoment = {
        id: 'photo_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
        senderName: senderName.trim() || 'Tamu Undangan',
        caption: caption.trim() || 'Momen bahagia bersama Maulidiyah & Alfarisyi ✨',
        imageUrl: selectedImage,
        deviceId: deviceId,
        likesCount: 1,
        likedByDevices: [deviceId],
        createdAt: new Date().toISOString(),
        isInitialSample: false,
      };

      onPhotoUploaded(newPhoto);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ece5da', '#d8cca8', '#b8c4ae', '#f8f6e1'],
      });

      setSelectedImage(null);
      setCaption('');
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Terjadi kendala saat menyimpan foto.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 text-[#0A261D] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center border border-[#685c46]/40">
              <Camera className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#0A261D] leading-none">Unggah Foto Bersama</h3>
              <p className="text-[11px] font-sans-ui text-gray-500 mt-0.5">
                Foto ke-{uploadedCount + 1} dari batas maksimal 5 foto
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopLiveCamera();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-all hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* If Quota is FULL (5/5) */}
          {isQuotaFull ? (
            <div className="text-center py-6 px-4 space-y-4 font-sans">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-600 shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-[#0A261D]">
                Kuota Foto Lengkap (5/5)
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
                Terima kasih banyak telah membagikan 5 momen kebersamaan Anda bersama <strong className="text-[#0A261D]">Maulidiyah & Alfarisyi</strong>.
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] text-xs font-semibold shadow-md hover:scale-105 transition-all"
                >
                  Lihat / Kelola Foto Saya
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 text-xs hover:bg-gray-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans-ui">
              {/* Photo Input Area */}
              <div>
                <label className="block text-xs font-medium text-[#0A261D] mb-2">
                  Pilih atau Ambil Foto:
                </label>

                {/* Live Camera Viewfinder Overlay */}
                {isLiveCamera ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#d8cca8]/60 bg-black flex flex-col items-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-h-72 object-cover bg-black"
                    />
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-4 z-20">
                      <button
                        type="button"
                        onClick={() => {
                          const nextMode = facingMode === 'environment' ? 'user' : 'environment';
                          setFacingMode(nextMode);
                          startLiveCamera(nextMode);
                        }}
                        className="p-3 rounded-full bg-black/60 text-[#0A261D] border border-white/20 hover:bg-black/90 transition-all"
                        title="Tukar Kamera Depan/Belakang"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>

                      {/* Big Shutter Button */}
                      <button
                        type="button"
                        onClick={captureLivePhoto}
                        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#ece5da] to-[#d8cca8] border-4 border-white/80 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                        title="Potret Foto"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#473c27]" />
                      </button>

                      <button
                        type="button"
                        onClick={stopLiveCamera}
                        className="p-3 rounded-full bg-black/60 text-red-300 border border-red-500/30 hover:bg-red-950/80 transition-all"
                        title="Tutup Kamera Live"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : !selectedImage ? (
                  <div className="grid grid-cols-2 gap-3">
                    {/* Live Web Camera Button */}
                    <button
                      type="button"
                      disabled={isCompressing}
                      onClick={() => startLiveCamera('environment')}
                      className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-[#0A261D] transition-all flex flex-col items-center justify-center gap-2 group text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 text-[#C5A880]" />
                      </div>
                      <span className="text-xs font-medium text-[#0A261D]">Buka Kamera HP</span>
                      <span className="text-[10px] text-gray-500">Ambil Foto Langsung</span>
                    </button>

                    {/* Gallery Button */}
                    <button
                      type="button"
                      disabled={isCompressing}
                      onClick={() => fileInputRef.current?.click()}
                      className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-[#0A261D] transition-all flex flex-col items-center justify-center gap-2 group text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-5 h-5 text-[#C5A880]" />
                      </div>
                      <span className="text-xs font-medium text-[#0A261D]">Buka Galeri</span>
                      <span className="text-[10px] text-gray-500">Pilih dari Memori HP</span>
                    </button>

                    {/* Hidden Inputs for fallback native capture */}
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-[#685c46]/50 bg-black/40 group">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full max-h-64 object-contain bg-black/60 mx-auto"
                    />

                    {/* Overlay Compression Pill */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-gray-500 border border-white/10">
                      Visually Lossless: <span className="text-[#0A261D] line-through">{originalSizeText}</span> → <strong className="text-emerald-300">{compressedSizeText}</strong>
                    </div>

                    {/* Change / Remove button */}
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/50 transition-all shadow-md"
                      title="Ganti Foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {isCompressing && (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-[#C5A880]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses & mengompresi foto (Visually Lossless)...</span>
                  </div>
                )}
              </div>

              {/* Sender Name */}
              <div>
                <label className="block text-xs font-semibold text-[#0A261D] mb-1.5">
                  Nama Anda / Rombongan:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Budi & Keluarga / Sahabat SMA"
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#0A261D] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
                />
              </div>

              {/* Caption / Ucapan */}
              <div>
                <label className="block text-xs font-semibold text-[#0A261D] mb-1.5">
                  Ucapan & Doa untuk Mempelai (Opsional):
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tuliskan ucapan selamat atau cerita di balik foto ini..."
                  rows={3}
                  maxLength={250}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#0A261D] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors resize-none"
                />
              </div>

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
                  disabled={isSubmitting || isCompressing || !selectedImage}
                  className="w-full py-3.5 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-bold text-xs shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#E6CA92]" />
                      <span>Menyimpan Foto...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E6CA92]" />
                      <span>Publikasikan ke Galeri Bersama</span>
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
