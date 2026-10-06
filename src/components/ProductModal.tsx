import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingProduct } from '../types';
import { VideoPlayer } from '../lib/videoUtils';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  MessageSquare,
  Sparkles,
  Play,
  Film,
  Image as ImageIcon
} from 'lucide-react';

interface ProductModalProps {
  product: WeddingProduct | null;
  onClose: () => void;
  onAddToCart: (product: WeddingProduct, eventDate: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [mediaMode, setMediaMode] = useState<'image' | 'video'>('image');

  if (!product) return null;

  const currentImg = selectedImage || product.image;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleBooking = () => {
    onAddToCart(product, selectedDate);
    onClose();
  };

  const waMessage = encodeURIComponent(
    `Halo NikaHub Wedding,\n\nSaya ingin menanyakan ketersediaan tanggal dan menyewa paket berikut:\nPaket: *${product.title}* (${formatRupiah(product.price)})\nDivisi: ${product.vendorName}\nRencana Tanggal: ${selectedDate || 'Belum ditentukan'}\n\nMohon info ketersediaan jadwal dan jadwal survey lokasi. Terima kasih!`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl p-2 sm:p-3 rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white/80 shadow-2xl z-10 my-8 overflow-hidden"
        >
          <div className="rounded-[calc(2.5rem-0.75rem)] bg-white max-h-[85vh] overflow-y-auto p-6 sm:p-8">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-emerald-950/5 hover:bg-emerald-950/10 text-emerald-950 transition-colors z-20"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Media Gallery */}
              <div className="flex flex-col gap-3">
                {/* Switcher Tab if Product has both Video & Photos */}
                {product.videoUrl && (
                  <div className="flex items-center gap-2 p-1 bg-emerald-950/5 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setMediaMode('image')}
                      className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        mediaMode === 'image'
                          ? 'bg-emerald-950 text-sand shadow-xs font-bold'
                          : 'text-emerald-900/70 hover:text-emerald-950'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Galeri Foto ({product.gallery?.length || 1})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaMode('video')}
                      className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        mediaMode === 'video'
                          ? 'bg-emerald-950 text-sand shadow-xs font-bold'
                          : 'text-emerald-900/70 hover:text-emerald-950'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Video Dokumentasi</span>
                    </button>
                  </div>
                )}

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-950 shadow-md">
                  {mediaMode === 'video' && product.videoUrl ? (
                    <VideoPlayer url={product.videoUrl} autoPlay className="w-full h-full object-cover" />
                  ) : (
                    <img 
                      src={currentImg} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-sand text-[11px] font-semibold uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Thumbnails (Photos & Video) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {/* Video Thumbnail Button if available */}
                  {product.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setMediaMode('video')}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all flex flex-col items-center justify-center bg-emerald-950 text-sand ${
                        mediaMode === 'video' ? 'border-champagne-500 scale-95 ring-2 ring-champagne-400' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <Play className="w-5 h-5 text-champagne-400 mb-0.5" />
                      <span className="text-[9px] font-bold tracking-wider uppercase">Video</span>
                    </button>
                  )}

                  {/* Photo Thumbnails */}
                  {(product.gallery || [product.image]).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedImage(img);
                        setMediaMode('image');
                      }}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        mediaMode === 'image' && currentImg === img ? 'border-champagne-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* In-House Guarantee Info */}
                <div className="mt-4 p-4 rounded-2xl bg-champagne-50 border border-champagne-200/60 flex flex-col gap-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-semibold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-champagne-600" />
                    <span>Garansi Kualitas Resmi NikaHub Wedding</span>
                  </div>
                  <p className="text-emerald-950/70 text-[11px] leading-relaxed">
                    Seluruh tenda, dekorasi panggung, dan katering diproduksi langsung oleh tim internal kami dengan standar kebersihan tinggi dan tepat waktu H-1.
                  </p>
                </div>
              </div>

              {/* Details & Action */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-champagne-600 font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{product.vendorName}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 leading-tight">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-4 text-xs text-emerald-950/70 mt-2 pb-4 border-b border-champagne-100">
                    <div className="flex items-center gap-1 font-semibold text-emerald-950">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">({product.reviewCount} ulasan pengantin)</span>
                    </div>
                    <span>â€¢</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-champagne-600" />
                      {product.location}
                    </span>
                  </div>

                  <div className="my-4">
                    <p className="text-xs uppercase font-semibold text-gray-400">Tarif Sewa Resmi</p>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                        {formatRupiah(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                      âœ“ Sudah termasuk kru instalasi resmi dan teknisi pendamping NikaHub
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2.5">
                      Item & Fasilitas Termasuk:
                    </p>
                    <div className="flex flex-col gap-2">
                      {product.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-emerald-950/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="mt-6 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <label className="block text-[11px] font-semibold text-emerald-950/70 uppercase mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-champagne-600" />
                      Pilih Tanggal Rencana Acara
                    </label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-champagne-400"
                    />
                  </div>

                </div>

                {/* Bottom CTA Actions */}
                <div className="mt-6 pt-4 border-t border-champagne-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBooking}
                    className="flex-1 py-3 px-6 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-all font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-bezel active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-champagne-400" />
                    <span>Tambahkan ke Daftar Sewa</span>
                  </button>

                  <a
                    href={`https://wa.me/qr/XCPMCWREYZVOM1`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-6 rounded-full bg-champagne-500 hover:bg-champagne-400 text-emerald-950 transition-colors font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Tanya Ketersediaan Jadwal</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

