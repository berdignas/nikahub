import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Image as ImageIcon, Sparkles, AlertCircle, Trash2, Loader2, RefreshCw, Plus, FolderArchive } from 'lucide-react';
import confetti from 'canvas-confetti';
import { compressImageFile, MAX_PHOTO_PER_DEVICE, getOrCreateDeviceId } from '../utils/deviceStorage';
import { GuestAlbum, PhotoMoment } from '../types';

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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
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
      // Reset input value
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
      const guestCaption = caption.trim() || 'Momen bahagia bersama Maulidiyah & Alfarisyi ✨';

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
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setErrorMsg('Terjadi kendala saat menyimpan album foto.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A261D]/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-[#E6CA92]/40 text-[#0A261D] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center border border-[#E6CA92]/40">
              <FolderArchive className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#0A261D] leading-none">
                Unggah Folder Foto Tamu
              </h3>
              <p className="text-[11px] font-sans text-gray-500 mt-0.5">
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
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
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

                {/* Live Camera Viewfinder Overlay */}
                {isLiveCamera ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E6CA92]/60 bg-black flex flex-col items-center">
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
                        className="p-3 rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/90 transition-all cursor-pointer"
                        title="Tukar Kamera Depan/Belakang"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>

                      {/* Big Shutter Button */}
                      <button
                        type="button"
                        onClick={captureLivePhoto}
                        className="w-14 h-14 rounded-full bg-gradient-to-r from-white to-[#E6CA92] border-4 border-white/80 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        title="Potret Foto"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#0A261D]" />
                      </button>

                      <button
                        type="button"
                        onClick={stopLiveCamera}
                        className="p-3 rounded-full bg-black/60 text-red-300 border border-red-500/30 hover:bg-red-950/80 transition-all cursor-pointer"
                        title="Tutup Kamera Live"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Selected Images Thumbnail Grid */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 p-3 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/30">
                        {selectedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
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
                            <span className="text-[10px] font-bold mt-1">Tambah</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Action buttons to pick photos */}
                    {selectedImages.length === 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {/* Live Web Camera Button */}
                        <button
                          type="button"
                          disabled={isCompressing}
                          onClick={() => startLiveCamera('environment')}
                          className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-[#0A261D] transition-all flex flex-col items-center justify-center gap-2 group text-center cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-white border border-[#E6CA92]/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                            <Camera className="w-5 h-5 text-[#C5A880]" />
                          </div>
                          <span className="text-xs font-bold text-[#0A261D]">Buka Kamera HP</span>
                          <span className="text-[10px] text-gray-500">Ambil Foto Langsung</span>
                        </button>

                        {/* Gallery Button */}
                        <button
                          type="button"
                          disabled={isCompressing}
                          onClick={() => fileInputRef.current?.click()}
                          className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAF9F5] hover:bg-white hover:border-[#0A261D] transition-all flex flex-col items-center justify-center gap-2 group text-center cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-white border border-[#E6CA92]/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                            <ImageIcon className="w-5 h-5 text-[#C5A880]" />
                          </div>
                          <span className="text-xs font-bold text-[#0A261D]">Buka Galeri HP</span>
                          <span className="text-[10px] text-gray-500">Pilih 1-{remaining} Foto Sekaligus</span>
                        </button>
                      </div>
                    )}

                    {/* Hidden Inputs for native file picker & camera */}
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
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {isCompressing && (
                  <div className="flex items-center justify-center gap-2 py-3 text-xs text-[#C5A880]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses & mengompresi foto otomatis (Visually Lossless)...</span>
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
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-[#0A261D] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
                  required
                />
              </div>

              {/* Caption / Ucapan */}
              <div>
                <label className="block text-xs font-semibold text-[#0A261D] mb-1.5">
                  Ucapan & Doa untuk Mempelai:
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tuliskan ucapan selamat atau doa restu untuk Maulidiyah & Alfarisyi..."
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
