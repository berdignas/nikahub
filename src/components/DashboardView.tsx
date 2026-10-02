import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WeddingProduct } from '../types';
import { MOCK_ORDERS } from '../data/mockData';
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Package, 
  Sparkles,
  Download,
  Filter
} from 'lucide-react';

interface DashboardViewProps {
  products: WeddingProduct[];
  onBackToStore: () => void;
  onAddProduct: (newProduct: WeddingProduct) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  onBackToStore,
  onAddProduct
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // New Product Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'tenda' | 'catering' | 'mua' | 'fotografi' | 'venue' | 'hiburan' | 'souvenir'>('tenda');
  const [formPrice, setFormPrice] = useState('');
  const [formVendor, setFormVendor] = useState('NikaHub Partner');
  const [formTagline, setFormTagline] = useState('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) return;

    const newProd: WeddingProduct = {
      id: `prod-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      categoryLabel: formCategory.toUpperCase(),
      tagline: formTagline || 'Layanan wedding profesional kurasi NikaHub.',
      price: parseInt(formPrice, 10),
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'],
      vendorName: formVendor,
      location: 'Jabodetabek',
      includes: ['Konsultasi Teknis & Jadwal', 'Peralatan & Tenaga Ahli'],
      description: 'Paket pernikahan resmi kurasi NikaHub Wedding Atelier.',
      availability: 'ready'
    };

    onAddProduct(newProd);
    setShowAddModal(false);
    setFormTitle('');
    setFormPrice('');
    setFormTagline('');
  };

  // Metrics calculations
  const totalServices = products.length;
  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);
  const avgRating = (products.reduce((acc, curr) => acc + curr.rating, 0) / products.length).toFixed(2);

  // Group summary by category
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.categoryLabel] = (acc[p.categoryLabel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const displayedProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-sand pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-champagne-200">
        <div>
          <button
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-950/70 hover:text-emerald-950 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Web</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold text-emerald-950">
              Ringkasan Eksekutif & Katalog
            </h1>
            <span className="px-3 py-1 rounded-full bg-champagne-400 text-emerald-950 text-[10px] font-bold uppercase tracking-wider">
              Mode Summary
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950/60 mt-1">
            Pantau ringkasan performa paket pernikahan, reservasi masuk, dan inventaris aktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Laporan Ringkasan Bulanan (PDF) berhasil diunduh.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-champagne-200 text-xs font-semibold text-emerald-950 hover:bg-champagne-50 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-champagne-600" />
            <span>Ekspor Ringkasan</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 text-xs font-semibold shadow-bezel transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 text-champagne-400" />
            <span>Tambah Layanan</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-1 rounded-[1.5rem] bg-white/70 border border-white/80 shadow-bezel"
        >
          <div className="p-5 rounded-[calc(1.5rem-0.25rem)] bg-white flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">Total Layanan</span>
              <div className="w-8 h-8 rounded-full bg-emerald-950/5 flex items-center justify-center text-emerald-950">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-emerald-950">{totalServices} Paket</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Semua kurasi aktif di web</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-1 rounded-[1.5rem] bg-white/70 border border-white/80 shadow-bezel"
        >
          <div className="p-5 rounded-[calc(1.5rem-0.25rem)] bg-white flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">Reservasi Masuk</span>
              <div className="w-8 h-8 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-emerald-950">24 Acara</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+4 jadwal baru minggu ini</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-1 rounded-[1.5rem] bg-white/70 border border-white/80 shadow-bezel"
        >
          <div className="p-5 rounded-[calc(1.5rem-0.25rem)] bg-white flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">Nilai Katalog</span>
              <div className="w-8 h-8 rounded-full bg-emerald-950/5 flex items-center justify-center text-emerald-950">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 truncate block">
                {formatRupiah(totalValue)}
              </span>
              <p className="text-[11px] text-emerald-950/60 mt-1">
                Nilai akumulasi paket terdaftar
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-1 rounded-[1.5rem] bg-white/70 border border-white/80 shadow-bezel"
        >
          <div className="p-5 rounded-[calc(1.5rem-0.25rem)] bg-white flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">Rata-Rata Kepuasan</span>
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-emerald-950">{avgRating} / 5.0</span>
              <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>99.4% Klien Merekomendasikan</span>
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Executive Breakdown Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Left: Ringkasan Distribusi Kategori */}
        <div className="p-1 rounded-[2rem] bg-white/80 border border-white shadow-bezel lg:col-span-1">
          <div className="p-6 rounded-[calc(2rem-0.25rem)] bg-white h-full flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-emerald-950 mb-1">
                Ringkasan Distribusi Layanan
              </h3>
              <p className="text-xs text-emerald-950/60 mb-5">
                Keseimbangan kuota katalog pernikahan yang siap disewa klien.
              </p>

              <div className="space-y-3.5">
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const percentage = Math.round((count / totalServices) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-emerald-950">
                        <span>{cat}</span>
                        <span className="text-emerald-950/60">{count} Paket ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-900 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-champagne-50 border border-champagne-200/60 text-xs text-emerald-950">
              <p className="font-semibold text-emerald-900 mb-1">ðŸ’¡ Catatan Kemitraan:</p>
              <p className="text-[11px] text-emerald-950/70 leading-relaxed">
                Kategori <strong>Tenda</strong> dan <strong>Catering</strong> memiliki tingkat konversi tertinggi (78%) pada kuartal ini.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Ringkasan Jadwal Pesanan Terbaru */}
        <div className="p-1 rounded-[2rem] bg-white/80 border border-white shadow-bezel lg:col-span-2">
          <div className="p-6 rounded-[calc(2rem-0.25rem)] bg-white h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  Ringkasan Reservasi Pasangan
                </h3>
                <p className="text-xs text-emerald-950/60">
                  5 Pesanan terkini yang sedang diproses oleh konsultan NikaHub.
                </p>
              </div>
              <span className="text-xs text-champagne-700 font-semibold bg-champagne-100 px-3 py-1 rounded-full">
                Live Sinkronisasi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-champagne-100 text-emerald-950/50 uppercase font-semibold text-[10px]">
                    <th className="py-3 px-2">Klien & Kontak</th>
                    <th className="py-3 px-2">Paket Layanan</th>
                    <th className="py-3 px-2">Tgl Acara</th>
                    <th className="py-3 px-2">Total Biaya</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-50">
                  {MOCK_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-sand/40 transition-colors">
                      <td className="py-3 px-2 font-medium text-emerald-950">
                        <div>{ord.clientName}</div>
                        <div className="text-[10px] text-emerald-950/50">{ord.clientPhone}</div>
                      </td>
                      <td className="py-3 px-2 text-emerald-950/80 max-w-[200px] truncate">
                        {ord.productName}
                      </td>
                      <td className="py-3 px-2 text-emerald-950/70 whitespace-nowrap">
                        {ord.date}
                      </td>
                      <td className="py-3 px-2 font-bold text-emerald-950">
                        {formatRupiah(ord.amount)}
                      </td>
                      <td className="py-3 px-2">
                        {ord.status === 'confirmed' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Terkonfirmasi
                          </span>
                        )}
                        {ord.status === 'pending_dp' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Menunggu DP
                          </span>
                        )}
                        {ord.status === 'completed' && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                            Selesai Acara
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Main Table: Ringkasan Produk Katalog (Summary Only as requested) */}
      <div className="mt-8 p-1 rounded-[2rem] bg-white/80 border border-white shadow-bezel">
        <div className="p-6 rounded-[calc(2rem-0.25rem)] bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-emerald-950">
                Summary Katalog Layanan Pernikahan
              </h3>
              <p className="text-xs text-emerald-950/60 mt-0.5">
                Daftar ringkas produk untuk evaluasi harga dan ketersediaan mitra.
              </p>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-champagne-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-xs bg-sand border border-champagne-200 rounded-full px-3 py-1.5 text-emerald-950 focus:outline-none font-medium cursor-pointer"
              >
                <option value="all">Semua Kategori</option>
                <option value="tenda">Tenda & Dekorasi</option>
                <option value="catering">Catering Prasmanan</option>
                <option value="mua">MUA & Gaun</option>
                <option value="fotografi">Dokumentasi</option>
                <option value="venue">Venue</option>
                <option value="hiburan">Hiburan & MC</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-champagne-100 text-emerald-950/50 uppercase font-semibold text-[10px] bg-sand/30">
                  <th className="py-3 px-4">Nama Layanan & Vendor</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga Paket</th>
                  <th className="py-3 px-4">Kapasitas / Durasi</th>
                  <th className="py-3 px-4">Rating & Ulasan</th>
                  <th className="py-3 px-4">Status Slot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-50">
                {displayedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-sand/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image} 
                          alt="" 
                          className="w-10 h-10 rounded-lg object-cover bg-emerald-950 shrink-0" 
                        />
                        <div>
                          <p className="font-semibold text-emerald-950 text-xs">{p.title}</p>
                          <p className="text-[10px] text-champagne-700 font-medium">{p.vendorName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-emerald-950/70">
                      {p.categoryLabel}
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-emerald-950 text-sm">
                      {formatRupiah(p.price)}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-950/70">
                      {p.capacity || 'Sesuai Request'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-950">â˜… {p.rating}</span>
                      <span className="text-[10px] text-emerald-950/40 ml-1">({p.reviewCount})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.availability === 'ready' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Tersedia
                        </span>
                      )}
                      {p.availability === 'limited' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                          Slot Terbatas
                        </span>
                      )}
                      {p.availability === 'booked' && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-semibold">
                          Penuh
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simple Modal to Add a Product to the Summary */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-champagne-200">
            <h3 className="font-serif text-xl font-bold text-emerald-950 mb-1">Tambah Layanan ke Katalog</h3>
            <p className="text-xs text-emerald-950/60 mb-5">Masukkan informasi ringkas paket baru untuk ditayangkan di katalog.</p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-emerald-950 mb-1">Nama Paket Layanan</label>
                <input 
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Paket Tenda Gazebo Sakura"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-champagne-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-emerald-950 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-champagne-400 cursor-pointer bg-white"
                  >
                    <option value="tenda">Tenda & Dekorasi</option>
                    <option value="catering">Catering Prasmanan</option>
                    <option value="mua">MUA & Gaun</option>
                    <option value="fotografi">Dokumentasi 4K</option>
                    <option value="venue">Venue</option>
                    <option value="hiburan">Hiburan & MC</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-emerald-950 mb-1">Harga (Rupiah)</label>
                  <input 
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="15000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-champagne-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-emerald-950 mb-1">Nama Mitra / Vendor</label>
                <input 
                  type="text"
                  value={formVendor}
                  onChange={(e) => setFormVendor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-champagne-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-emerald-950 mb-1">Deskripsi Singkat / Tagline</label>
                <input 
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="Deskripsi keunggulan paket"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-champagne-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-semibold"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
