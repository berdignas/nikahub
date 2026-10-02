import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building, 
  CreditCard, 
  Lock, 
  ChevronRight,
  Coffee,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingItem, User } from '../types';

interface CheckoutViewProps {
  items: BookingItem[];
  onRemoveItem: (id: string) => void;
  user: User | null;
  onRequestLogin: (msg?: string) => void;
  onNavigateToCatalog: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onRemoveItem,
  user,
  onRequestLogin,
  onNavigateToCatalog,
}) => {
  // Form State
  const [clientName, setClientName] = useState(user?.name || '');
  const [clientPhone, setClientPhone] = useState(user?.phone || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('Jakarta Selatan');
  const [fullAddress, setFullAddress] = useState('');
  const [landArea, setLandArea] = useState('');
  const [guestCount, setGuestCount] = useState('500 Pax');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('dp30');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onRequestLogin("Silakan login dengan Email Anda terlebih dahulu sebelum memproses Checkout & SPK.");
      return;
    }

    if (!eventDate) {
      alert("Silakan tentukan Tanggal Rencana Acara terlebih dahulu!");
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });

    setIsSubmitted(true);

    const itemsSummary = items.map((it, idx) => 
      `${idx + 1}. *${it.product.title}* (${formatRupiah(it.product.price)})\n   Kategori: ${it.product.categoryLabel}`
    ).join('\n\n');

    const msg = `Halo Tim Concierge NikaHub Atelier,\n\nSaya (${clientName || user.email}) ingin memproses *CHECKOUT & VERIFIKASI KONTRAK SPK* untuk paket berikut:\n\n${itemsSummary}\n\n*ESTIMASI TOTAL BIAYA:* ${formatRupiah(totalPrice)}\n\n📋 *DATA PEMESAN:* \n• Nama: ${clientName || '-'}\n• Email: ${user.email}\n• WhatsApp: ${clientPhone || '-'}\n\n📅 *DETAIL ACARA:* \n• Tanggal Acara: ${eventDate}\n• Kota/Lokasi: ${eventCity}\n• Alamat Lengkap: ${fullAddress || 'Sesuai koordinat WA'}\n• Luas Lahan: ${landArea || '-'}\n• Estimasi Tamu: ${guestCount || '-'}\n• Skema DP: ${paymentTerm === 'dp30' ? 'DP 30% SPK awal' : 'Pelunasan Bertahap'}\n• Catatan Tambahan: ${specialNotes || '-'}\n\nMohon terbitkan draft Surat Perjanjian Kerja (SPK) resmi dan konfirmasi slot jadwal survei lokasi. Terima kasih!`;

    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 text-emerald-950 space-y-10">
      
      {/* 1. Header Banner & Progress Bar */}
      <div className="bg-emerald-950 text-sand p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/10 border border-sand/20 text-champagne-300 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NikaHub Atelier Executive Checkout</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Finalisasi Pesanan & Draft Perjanjian SPK
          </h1>
          <p className="text-xs sm:text-sm text-sand/80 leading-relaxed">
            Periksa kembali daftar paket tenda VIP, katering, dan hiburan pilihan Anda. Lengkapi detail lokasi untuk penerbitan Surat Perjanjian Kerja (SPK) berkekuatan hukum.
          </p>
        </div>

        {/* Stepper Bar */}
        <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-white/15 text-xs">
          <div className="flex items-center gap-2 text-champagne-300 font-bold">
            <div className="w-6 h-6 rounded-full bg-champagne-400 text-emerald-950 flex items-center justify-center font-bold text-[11px]">1</div>
            <span>1. Detail Pemesan & Lokasi</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[11px]">2</div>
            <span>2. Verifikasi Jadwal</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[11px]">3</div>
            <span>3. Penerbitan SPK Resmi</span>
          </div>
        </div>
      </div>

      {/* Auth Alert Header if not logged in */}
      {!user && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-900 text-xs shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-sm font-bold">Autentikasi Email Diperlukan</strong>
              <span>Silakan masuk dengan email Anda agar pesanan dan draft SPK dapat dikaitkan dengan akun resmi Anda.</span>
            </div>
          </div>
          <button
            onClick={() => onRequestLogin("Silakan login dengan Email Anda terlebih dahulu untuk memproses Checkout & SPK.")}
            className="px-5 py-2.5 rounded-full bg-emerald-950 text-sand font-bold text-xs shrink-0 hover:bg-emerald-900 transition-colors shadow-md cursor-pointer"
          >
            Masuk dengan Email
          </button>
        </motion.div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form Section */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handleSubmitCheckout} className="space-y-6">
            
            {/* Section A: Informasi Pemesan */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-emerald-950/10 shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <UserCheck className="w-5 h-5 text-champagne-600" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Data Kontak Pemesan Utama
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Nama Lengkap / Pasangan *</label>
                  <input 
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Contoh: Rian & Nisa"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Nomor WhatsApp Aktif *</label>
                  <input 
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1.5">Email Terverifikasi SPK *</label>
                <input 
                  type="email"
                  required
                  value={clientEmail || user?.email || ''}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Section B: Detail Spesifikasi Acara & Lokasi */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-emerald-950/10 shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-champagne-600" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Lokasi Acara & Ukuran Lahan
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Pilih Tanggal Rencana Acara *</label>
                  <input 
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Kota / Area Wilayah Acara *</label>
                  <select 
                    value={eventCity}
                    onChange={(e) => setEventCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 cursor-pointer"
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
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1.5">Alamat Lengkap Lokasi Acara</label>
                <textarea 
                  rows={2}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Jl. Raya Utama No. 123, Kelurahan, Kecamatan..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Estimasi Luas Lahan (m²)</label>
                  <input 
                    type="text"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="Contoh: 15m x 20m (Halaman Rumah)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1.5">Estimasi Tamu Undangan</label>
                  <input 
                    type="text"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    placeholder="Contoh: 500 Pax"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1.5">Catatan Khusus Tenda / Panggung / Katering (Opsional)</label>
                <textarea 
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Contoh: Butuh pendingin AC tambahan 5PK, request warna kain tenda krem champagne..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                />
              </div>
            </div>

            {/* Section C: Skema Pembayaran & DP Resmi */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-emerald-950/10 shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <CreditCard className="w-5 h-5 text-champagne-600" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Ketentuan Termin Pembayaran Resmi (SPK)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-950/15 bg-sand/40 cursor-pointer hover:bg-sand transition-colors">
                  <input 
                    type="radio" 
                    name="paymentTerm" 
                    value="dp30"
                    checked={paymentTerm === 'dp30'}
                    onChange={() => setPaymentTerm('dp30')}
                    className="mt-0.5 text-emerald-950 focus:ring-emerald-950"
                  />
                  <div>
                    <strong className="text-emerald-950 font-bold block text-sm">Termin Standar SPK (DP 30% + H-30 40% + H-7 30%)</strong>
                    <span className="text-emerald-950/70 text-[11px] block mt-0.5">
                      DP 30% dibayarkan setelah penandatanganan SPK resmi untuk mengunci tanggal & slot teknis vendor.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/5 border border-emerald-950/10 flex items-center gap-3 text-xs text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-champagne-700 shrink-0" />
                <span>
                  Seluruh pembayaran dikirimkan ke rekening resmi perusahaan <strong>PT NikaHub Karya Nusantara (Bank BCA 8830-1234-56)</strong>.
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl active:scale-95 cursor-pointer"
            >
              <span>Terbitkan Draft SPK & Verifikasi Jadwal (via WA)</span>
              <ArrowRight className="w-4 h-4 text-champagne-400" />
            </button>
          </form>

        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-emerald-950/10 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-950" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Ringkasan Paket CO
                </h3>
              </div>
              <span className="text-xs font-bold text-champagne-700 bg-champagne-100 px-3 py-1 rounded-full">
                {items.length} Item
              </span>
            </div>

            {/* Items Summary List */}
            {items.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-xs text-emerald-950/60">Belum ada paket yang dipilih untuk checkout.</p>
                <button
                  onClick={onNavigateToCatalog}
                  className="px-4 py-2 rounded-full bg-emerald-950 text-sand text-xs font-bold"
                >
                  Buka Katalog Layanan
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-3 rounded-2xl bg-sand/50 border border-sand-300 flex gap-3 relative"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-emerald-950" 
                    />
                    <div className="flex-1 min-w-0 pr-6">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-champagne-700 block">
                        {item.product.categoryLabel}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-emerald-950 truncate">
                        {item.product.title}
                      </h4>
                      <p className="font-bold text-xs text-emerald-950 mt-0.5">
                        {formatRupiah(item.product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Price Calculations */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-emerald-950/80">
                <div className="flex justify-between">
                  <span>Subtotal Sewa & Layanan</span>
                  <span className="font-semibold text-emerald-950">{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Supervisi 1 Dedicated Project Director</span>
                  <span className="font-semibold text-emerald-800">TERMASUK RESMI</span>
                </div>
                <div className="flex justify-between">
                  <span>Garansi Siap H-1 Pukul 14.00 WIB</span>
                  <span className="font-semibold text-emerald-800">AKTIF</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-bold text-emerald-950">
                  <span>Estimasi Total Biaya SPK</span>
                  <span className="font-serif text-xl text-emerald-950">{formatRupiah(totalPrice)}</span>
                </div>
              </div>
            )}

            {/* Additional Bonuses */}
            <div className="p-4 rounded-2xl bg-champagne-50 border border-champagne-200 text-xs space-y-2 text-emerald-950">
              <span className="font-serif font-bold text-sm text-emerald-950 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-champagne-700" />
                Fasilitas Eksklusif Pembeli:
              </span>
              <ul className="space-y-1.5 text-[11px] text-emerald-950/80 list-disc list-inside">
                <li>Free Privat Food Tasting 2 Pax di Lounge Kemang</li>
                <li>Surat Perjanjian Kerja (SPK) Asli Bermaterai</li>
                <li>Garansi Serah Terima Siap H-1 Siang Hari</li>
              </ul>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-950/60 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Kerja sama dijamin transparan & amanah</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
