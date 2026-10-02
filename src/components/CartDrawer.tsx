import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingItem, User } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Clock, UserCheck, Lock, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BookingItem[];
  onRemoveItem: (id: string) => void;
  user: User | null;
  onRequestLogin: (msg?: string) => void;
  onOpenCheckoutPage?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  user,
  onRequestLogin,
  onOpenCheckoutPage
}) => {
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('Jakarta Selatan');
  const [eventNotes, setEventNotes] = useState('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckoutWA = () => {
    if (!user) {
      onRequestLogin("Silakan login dengan Email Anda terlebih dahulu sebelum mengajukan pesanan / verifikasi jadwal sewa.");
      return;
    }

    if (!eventDate) {
      alert("Silakan pilih Tanggal Acara terlebih dahulu agar kami dapat memverifikasi ketersediaan jadwal!");
      return;
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    const itemsSummary = items.map((it, idx) => 
      `${idx + 1}. *${it.product.title}* (${formatRupiah(it.product.price)})\n   Kategori: ${it.product.categoryLabel}`
    ).join('\n\n');

    const msg = `Halo Tim Concierge NikaHub Wedding,\n\nSaya (${user.name || user.email}) ingin memesan dan mengajukan verifikasi jadwal sewa untuk paket berikut:\n\n${itemsSummary}\n\n*Email Akun:* ${user.email}\n*Estimasi Total Biaya:* ${formatRupiah(totalPrice)}\n\n📅 *Rencana Tanggal Acara:* ${eventDate}\n📍 *Kota/Lokasi Acara:* ${eventCity}\n📝 *Catatan Ukuran/Gedung:* ${eventNotes || 'Belum ada catatan khusus'}\n\nMohon bantu cek ketersediaan slot tanggal dan jadwal survey lokasi bersama tim NikaHub. Terima kasih!`;

    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-[#FAF9F5] flex flex-col shadow-2xl border-l border-emerald-950/10 text-emerald-950"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-950" />
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  Daftar Reservasi & CO
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Link to Full Page Checkout */}
            {onOpenCheckoutPage && (
              <div className="px-6 py-2 bg-champagne-100 border-b border-champagne-200 flex items-center justify-between text-xs text-emerald-950 font-semibold">
                <span>Ingin form yang lebih lengkap & detail SPK?</span>
                <button
                  onClick={onOpenCheckoutPage}
                  className="text-emerald-950 font-bold hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <span>Buka Halaman CO Penuh</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* User Status Bar */}
            {user ? (
              <div className="px-6 py-2.5 bg-emerald-950 text-sand text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-champagne-400" />
                  <span className="truncate max-w-[200px]">Akun: <strong>{user.email}</strong></span>
                </div>
                <span className="text-[10px] uppercase font-bold text-champagne-300">Terverifikasi</span>
              </div>
            ) : (
              <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Belum login Email</span>
                </div>
                <button
                  onClick={() => onRequestLogin("Silakan login dengan Email Anda terlebih dahulu.")}
                  className="font-bold text-emerald-950 underline text-[11px] cursor-pointer"
                >
                  Login Sekarang
                </button>
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/5 flex items-center justify-center mx-auto text-emerald-950 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg font-semibold text-emerald-950">Daftar Reservasi Kosong</p>
                  <p className="text-xs text-emerald-950/60 mt-1 max-w-xs mx-auto">
                    Pilih paket tenda VIP, katering, atau busana dari katalog NikaHub untuk memulai reservasi Anda.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-3.5 rounded-2xl bg-white border border-emerald-950/10 shadow-xs flex gap-3 relative"
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-emerald-950"
                        />

                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-champagne-700 block">
                            {item.product.categoryLabel}
                          </span>
                          <h4 className="font-serif text-xs font-bold text-emerald-950 truncate">
                            {item.product.title}
                          </h4>
                          <p className="font-bold text-xs text-emerald-950 mt-1">
                            {formatRupiah(item.product.price)}
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute top-3.5 right-3 text-gray-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Form Pengecekan Tanggal & Lokasi (Checkout Time) */}
                  <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-xs space-y-3.5 mt-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Clock className="w-4 h-4 text-champagne-600" />
                      <span className="font-serif font-bold text-xs text-emerald-950">
                        Detail Tanggal & Verifikasi Jadwal
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                        Pilih Tanggal Rencana Acara *
                      </label>
                      <input 
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                        Kota / Area Acara
                      </label>
                      <select 
                        value={eventCity}
                        onChange={(e) => setEventCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 cursor-pointer"
                      >
                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                        <option value="Jakarta Pusat">Jakarta Pusat</option>
                        <option value="Jakarta Barat">Jakarta Barat</option>
                        <option value="Jakarta Timur">Jakarta Timur</option>
                        <option value="Jakarta Utara">Jakarta Utara</option>
                        <option value="Bogor">Bogor</option>
                        <option value="Depok">Depok</option>
                        <option value="Tangerang & Tangsel">Tangerang & Tangsel</option>
                        <option value="Bekasi">Bekasi</option>
                        <option value="Bandung">Bandung</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                        Catatan Lokasi / Ukuran Lahan (Opsional)
                      </label>
                      <textarea 
                        rows={2}
                        value={eventNotes}
                        onChange={(e) => setEventNotes(e.target.value)}
                        placeholder="Contoh: Halaman rumah 150m2, butuh tenda panggung..."
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 shadow-xl space-y-3">
                <div className="space-y-2 mb-2 text-xs text-emerald-950/70">
                  <div className="flex justify-between">
                    <span>Jumlah Paket Dipilih</span>
                    <span className="font-semibold text-emerald-950">{items.length} Paket</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supervisi 1 Project Director</span>
                    <span className="font-semibold text-emerald-800">TERMASUK RESMI</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 text-sm font-bold text-emerald-950">
                    <span>Estimasi Total Biaya</span>
                    <span className="font-serif text-lg text-emerald-950">{formatRupiah(totalPrice)}</span>
                  </div>
                </div>

                {onOpenCheckoutPage && (
                  <button
                    onClick={onOpenCheckoutPage}
                    className="w-full py-3.5 rounded-full bg-champagne-400 text-emerald-950 hover:bg-champagne-300 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Lanjut Ke Halaman Checkout Penuh</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={handleCheckoutWA}
                  className="w-full py-3.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Verifikasi Cepat via WA</span>
                  <ArrowRight className="w-4 h-4 text-champagne-400" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
