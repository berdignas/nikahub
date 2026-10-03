import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X, 
  Save, 
  ShoppingBag, 
  Users, 
  Store, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  Filter,
  PhoneCall,
  Mail,
  Calendar,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Crop
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingProduct, ProductCategory } from '../types';
import { ImageCropperModal } from './ImageCropperModal';

// Helper function to compress image files client-side using Canvas HTML5
const compressImageFile = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

interface AdminDashboardViewProps {
  products: WeddingProduct[];
  onAddProduct: (product: WeddingProduct) => void;
  onUpdateProduct: (product: WeddingProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onLogoutAdmin: () => void;
  onGoHome: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onLogoutAdmin,
  onGoHome,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'clients'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<WeddingProduct | null>(null);

  // Image Upload & Compression & Adjustment State
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);

  // Close admin modals when phone back button is pressed
  React.useEffect(() => {
    if (isAddModalOpen || isCropperOpen) {
      window.history.pushState({ ...window.history.state, adminModalOpen: true }, '');
      const handlePop = () => {
        setIsAddModalOpen(false);
        setIsCropperOpen(false);
      };
      window.addEventListener('popstate', handlePop, { once: true });
      return () => {
        window.removeEventListener('popstate', handlePop);
      };
    }
  }, [isAddModalOpen, isCropperOpen]);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setCompressionInfo('⏳ Mengompres file gambar...');
      const originalKb = Math.round(file.size / 1024);

      // Compress to max 1200x1200px @ 75% quality JPEG
      const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.75);
      const compressedKb = Math.round((compressedDataUrl.length * 0.75) / 1024);

      setFormData(prev => ({ ...prev, image: compressedDataUrl }));
      setCompressionInfo(`✅ Kompresi Berhasil: ${originalKb} KB ➔ ${compressedKb} KB (Hemat ${(100 - (compressedKb/originalKb)*100).toFixed(0)}%)`);
    } catch (err) {
      console.error('Image compression failed:', err);
      setCompressionInfo('⚠️ Gagal mengompres, menggunakan file asli.');
    } finally {
      setIsCompressing(false);
    }
  };

  // Form State for Adding / Editing Product
  const [formData, setFormData] = useState<{
    id?: string;
    title: string;
    category: ProductCategory;
    categoryLabel: string;
    tagline: string;
    price: number;
    originalPrice: number;
    vendorName: string;
    image: string;
    location: string;
    liveDemoUrl?: string;
    description: string;
    includesText: string;
    availability: 'ready' | 'limited' | 'booked';
  }>({
    title: '',
    category: 'tenda',
    categoryLabel: 'Tenda & Pelaminan VIP',
    tagline: 'Koleksi eksklusif NikaHub Atelier',
    price: 15000000,
    originalPrice: 18000000,
    vendorName: 'NikaHub Official Production',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    location: 'Jakarta Selatan',
    liveDemoUrl: '',
    description: 'Fasilitas tenda dekorasi VIP lengkap dengan pendingin dan panggung.',
    includesText: 'Konstruksi Tenda Maroko, Dekorasi Bunga, AC 5PK, Panggung Utama 12x4m',
    availability: 'ready'
  });

  // Orders State for Admin
  const [orders, setOrders] = useState<any[]>([]);

  // Clients State loaded dynamically from localStorage & API
  const [clients, setClients] = useState<any[]>([]);

  const refreshClientsList = async () => {
    let localUsers: any[] = [];
    try {
      const storedStr = localStorage.getItem('nikahub_users');
      localUsers = storedStr ? Object.values(JSON.parse(storedStr)) : [];
    } catch {
      localUsers = [];
    }

    try {
      const res = await fetch('/api/auth/users').catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          const userMap = new Map();
          localUsers.forEach(u => userMap.set(u.email.toLowerCase(), u));
          data.users.forEach((u: any) => userMap.set(u.email.toLowerCase(), { ...userMap.get(u.email.toLowerCase()), ...u }));
          setClients(Array.from(userMap.values()));
          return;
        }
      }
    } catch {
      // ignore
    }

    setClients(localUsers);
  };

  React.useEffect(() => {
    refreshClientsList();
  }, [activeTab]);

  const handleDeleteClientUser = async (userEmail: string, userName?: string) => {
    const displayName = userName || userEmail;
    if (!window.confirm(`Apakah Anda yakin ingin menghapus user/klien "${displayName}" (${userEmail}) dari database?`)) {
      return;
    }

    // 1. Delete from LocalStorage
    try {
      const storedStr = localStorage.getItem('nikahub_users');
      if (storedStr) {
        const map = JSON.parse(storedStr);
        delete map[userEmail.toLowerCase()];
        localStorage.setItem('nikahub_users', JSON.stringify(map));
      }
    } catch (e) {
      console.error('Failed deleting from local storage', e);
    }

    // 2. Delete from Backend API if connected
    try {
      await fetch(`/api/auth/users/${encodeURIComponent(userEmail)}`, {
        method: 'DELETE'
      }).catch(() => null);
    } catch {
      // ignore
    }

    refreshClientsList();
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Filter Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      category: 'tenda',
      categoryLabel: 'Tenda & Pelaminan VIP',
      tagline: 'Koleksi eksklusif NikaHub Atelier',
      price: 15000000,
      originalPrice: 18000000,
      vendorName: 'NikaHub Official Production',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      location: 'Jakarta Selatan',
      liveDemoUrl: '',
      description: 'Fasilitas komplit kelas VIP dari NikaHub Atelier.',
      includesText: 'Pemasangan H-1, Supervisi 1 Project Director, Lampu Kristal',
      availability: 'ready'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: WeddingProduct) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      title: product.title,
      category: product.category,
      categoryLabel: product.categoryLabel,
      tagline: product.tagline,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      vendorName: product.vendorName,
      image: product.image,
      location: product.location,
      liveDemoUrl: product.liveDemoUrl || '',
      description: product.description,
      includesText: product.includes.join(', '),
      availability: product.availability
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const includesArr = formData.includesText.split(',').map(s => s.trim()).filter(Boolean);

    const isDigital = formData.category === 'undangan_digital' || formData.category === 'undangan' || formData.category === 'bukutamu_digital';
    const finalLocation = isDigital ? 'Nasional / Online' : (formData.location.trim() || 'Jakarta & Jabodetabek');

    if (editingProduct) {
      // Edit
      const updated: WeddingProduct = {
        ...editingProduct,
        title: formData.title,
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        tagline: formData.tagline,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        vendorName: formData.vendorName,
        image: formData.image,
        location: finalLocation,
        liveDemoUrl: formData.liveDemoUrl?.trim() || undefined,
        description: formData.description,
        includes: includesArr.length ? includesArr : editingProduct.includes,
        availability: formData.availability
      };
      onUpdateProduct(updated);
    } else {
      // Add
      const newProd: WeddingProduct = {
        id: `prod-admin-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        tagline: formData.tagline,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        rating: 4.9,
        reviewCount: 12,
        image: formData.image,
        gallery: [formData.image],
        vendorName: formData.vendorName,
        location: finalLocation,
        liveDemoUrl: formData.liveDemoUrl?.trim() || undefined,
        includes: includesArr.length ? includesArr : ['Fitur Undangan Digital Premium'],
        description: formData.description,
        availability: formData.availability
      };
      onAddProduct(newProd);
    }

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setIsAddModalOpen(false);
  };

  const handleToggleAvailability = (product: WeddingProduct) => {
    const nextAvail: 'ready' | 'limited' | 'booked' = 
      product.availability === 'ready' ? 'limited' : 
      product.availability === 'limited' ? 'booked' : 'ready';

    onUpdateProduct({
      ...product,
      availability: nextAvail
    });
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 text-emerald-950 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-emerald-950 text-sand p-8 sm:p-10 rounded-[2.5rem] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/10 border border-sand/20 text-champagne-300 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NikaHub Administrator Control Center</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Panel Pengelolaan Katalog & Operasional
          </h1>
          <p className="text-xs text-sand/80 max-w-xl">
            Kelola katalog produk layanan pernikahan, katering, tenda VIP, status ketersediaan, serta pantau riwayat reservasi klien.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 w-full sm:w-auto">
          <button
            onClick={onGoHome}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sand font-semibold text-xs transition-colors cursor-pointer"
          >
            Lihat Web Frontend
          </button>
          <button
            onClick={onLogoutAdmin}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-emerald-950/10 pb-4 overflow-x-auto gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-5 py-2.5 rounded-full font-serif font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'catalog' 
                ? 'bg-emerald-950 text-sand shadow-md' 
                : 'bg-white hover:bg-sand text-emerald-950/70 border border-emerald-950/10'
            }`}
          >
            <Store className="w-4 h-4 text-champagne-400" />
            <span>Katalog Layanan ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full font-serif font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders' 
                ? 'bg-emerald-950 text-sand shadow-md' 
                : 'bg-white hover:bg-sand text-emerald-950/70 border border-emerald-950/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-champagne-400" />
            <span>Daftar Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`px-5 py-2.5 rounded-full font-serif font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'clients' 
                ? 'bg-emerald-950 text-sand shadow-md' 
                : 'bg-white hover:bg-sand text-emerald-950/70 border border-emerald-950/10'
            }`}
          >
            <Users className="w-4 h-4 text-champagne-400" />
            <span>Database Klien ({clients.length})</span>
          </button>
        </div>

        {activeTab === 'catalog' && (
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Layanan / Produk Baru</span>
          </button>
        )}
      </div>

      {/* TAB 1: KATALOG LAYANAN (FULL CRUD) */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Quick Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul produk atau nama vendor..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
              />
            </div>

            {/* Category Select Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-champagne-700 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Kategori</option>
                <option value="tenda">Tenda & Pelaminan VIP</option>
                <option value="catering">Katering & Jamuan</option>
                <option value="mua">MUA & Gaun</option>
                <option value="fotografer">Fotografer & Sinema</option>
                <option value="alat">Alat Pesta & Sound</option>
                <option value="venue">Venue & Gedung</option>
                <option value="hiburan">Hiburan & Musik</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-emerald-950/10 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="relative h-44 bg-emerald-950 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-sand text-[10px] font-bold uppercase tracking-wider">
                      {product.categoryLabel}
                    </div>

                    {/* Quick Toggle Availability Badge */}
                    <button
                      onClick={() => handleToggleAvailability(product)}
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer ${
                        product.availability === 'ready' ? 'bg-emerald-600 text-white' :
                        product.availability === 'limited' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'
                      }`}
                      title="Klik untuk ubah status ketersediaan"
                    >
                      ● {product.availability.toUpperCase()}
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Vendor: <strong>{product.vendorName}</strong></span>
                      <span>📍 {product.location}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-emerald-950 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-xs text-emerald-950/70 line-clamp-2">
                      {product.tagline || product.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                      <span className="text-[11px] text-gray-500">Harga Sewa:</span>
                      <span className="font-serif font-bold text-base text-emerald-950">
                        {formatRupiah(product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-sand/40 border-t border-emerald-950/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 py-2 rounded-xl bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Edit Produk</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Apakah Anda yakin ingin menghapus produk "${product.title}"?`)) {
                        onDeleteProduct(product.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs transition-colors cursor-pointer"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: DAFTAR PESANAN & SPK */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-serif font-bold text-xl text-emerald-950">Daftar Reservasi Client</h3>
            <span className="text-xs text-gray-500 font-medium">Total: {orders.length} Pesanan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-emerald-950">
              <thead className="bg-sand/60 text-emerald-950 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">ID Pesanan</th>
                  <th className="p-3.5">Nama & Kontak Client</th>
                  <th className="p-3.5">Paket Layanan</th>
                  <th className="p-3.5">Tanggal & Lokasi</th>
                  <th className="p-3.5">Total Biaya</th>
                  <th className="p-3.5">Status SPK</th>
                  <th className="p-3.5 rounded-r-xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-sand/20 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-900">{ord.id}</td>
                    <td className="p-3.5">
                      <strong className="block font-bold text-emerald-950">{ord.clientName}</strong>
                      <span className="text-[10px] text-gray-500 block">{ord.clientEmail} • {ord.clientPhone}</span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate font-medium">{ord.productName}</td>
                    <td className="p-3.5">
                      <span className="block font-semibold">{ord.eventDate}</span>
                      <span className="text-[10px] text-gray-500">{ord.eventCity}</span>
                    </td>
                    <td className="p-3.5 font-bold font-serif text-sm">{formatRupiah(ord.totalPrice)}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === 'Disetujui SPK' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleChangeOrderStatus(ord.id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 text-[11px] bg-white cursor-pointer"
                      >
                        <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                        <option value="Disetujui SPK">Disetujui SPK</option>
                        <option value="Gladi Resik">Gladi Resik</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DATABASE KLIEN */}
      {activeTab === 'clients' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-serif font-bold text-xl text-emerald-950">Database Client Terdaftar</h3>
              <p className="text-xs text-gray-500">Kelola & hapus akun pengguna/klien terdaftar di sistem NikaHub Atelier.</p>
            </div>
            <span className="text-xs text-emerald-950 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full font-bold">
              Total: {clients.length} Klien
            </span>
          </div>

          {clients.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400 space-y-2">
              <Users className="w-8 h-8 mx-auto text-gray-300" />
              <p>Belum ada client yang terdaftar saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-sand/40 border border-sand-300 space-y-3 text-xs relative group shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-emerald-950 text-sand font-bold text-xs flex items-center justify-center shrink-0 uppercase">
                        {(c.name || c.email).charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <strong className="font-bold text-sm text-emerald-950 truncate block">{c.name || c.email.split('@')[0]}</strong>
                        <span className="text-[10px] text-gray-500 truncate block">{c.email}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      c.isVerified !== false ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.isVerified !== false ? 'Terverifikasi' : 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-emerald-950/80 bg-white/70 p-2.5 rounded-xl border border-gray-100">
                    <p>📞 <strong>WA:</strong> {c.phone || '-'}</p>
                    <p>📅 <strong>Rencana Acara:</strong> {c.eventDate || 'Belum ditentukan'}</p>
                    <p>👥 <strong>Estimasi Tamu:</strong> {c.guestEstimate || '500 Pax'}</p>
                    {c.createdAt && (
                      <p className="text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                        Terdaftar: {new Date(c.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
                    {c.phone ? (
                      <a
                        href={`https://wa.me/${c.phone}?text=Halo%20${encodeURIComponent(c.name || 'Pengantin')},%20kami%20dari%20Tim%20NikaHub%20Atelier`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-950 text-sand font-bold text-[11px] hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-champagne-400" />
                        <span>Chat WA</span>
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400">No WA -</span>
                    )}

                    <button
                      onClick={() => handleDeleteClientUser(c.email, c.name)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                      title="Hapus Klien Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus User</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL (CATEGORY-SPECIFIC FORM) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-emerald-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-950/10 overflow-hidden z-10 text-emerald-950 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-serif font-bold text-xl text-emerald-950">
                    {editingProduct ? 'Edit Layanan Katalog' : 'Tambah Layanan / Produk Baru'}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Isi detail layanan sesuai dengan kategori vendor untuk hasil tampilan optimal di sisi calon pengantin.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* STEP 1: CATEGORY SELECTION & GUIDANCE BANNER */}
              <div className="space-y-2">
                <label className="block font-bold text-emerald-950 text-xs">
                  1. Pilih Kategori Layanan / Vendor terlebih dahulu *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    const cat = e.target.value as ProductCategory;
                    const labelMap: Record<string, string> = {
                      tenda: 'Tenda & Pelaminan VIP',
                      catering: 'Katering & Jamuan',
                      mua: 'MUA & Gaun',
                      fotografer: 'Fotografer & Sinema',
                      fotografi: 'Fotografer & Sinema',
                      alat: 'Alat Pesta & Sound',
                      venue: 'Venue & Gedung',
                      hiburan: 'Hiburan & Musik',
                      undangan: 'Undangan Digital & Website',
                      undangan_digital: 'Undangan Digital & Website',
                      bukutamu_digital: 'Buku Tamu Digital QR'
                    };
                    setFormData({
                      ...formData,
                      category: cat,
                      categoryLabel: labelMap[cat] || 'Layanan NikaHub'
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-emerald-950/20 font-bold text-xs bg-emerald-50/50 text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 cursor-pointer"
                >
                  <option value="undangan_digital">📱 Undangan Digital & Website Interaktif</option>
                  <option value="fotografer">📸 Fotografer & Sinema Video</option>
                  <option value="mua">💄 MUA & Gaun / Attire Pengantin</option>
                  <option value="tenda">⛺ Tenda & Pelaminan VIP</option>
                  <option value="catering">🍽️ Katering & Jamuan Kuliner</option>
                  <option value="venue">🏛️ Venue & Gedung Pernikahan</option>
                  <option value="hiburan">🎵 Hiburan & Live Musik</option>
                  <option value="alat">🔊 Alat Pesta & Sound System</option>
                </select>

                {/* Dynamic Category Guidance Box */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 space-y-1">
                  <strong className="block font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Panduan Khusus Kategori: {formData.categoryLabel}
                  </strong>
                  {formData.category === 'undangan_digital' || formData.category === 'undangan' ? (
                    <p>✨ **Undangan Digital**: Pastikan mengisi URL Live Demo Preview agar calon pengantin dapat langsung menguji coba undangan secara interaktif.</p>
                  ) : formData.category === 'fotografer' || formData.category === 'fotografi' ? (
                    <p>📸 **Fotografer**: Tuliskan nama studio/lead photographer, jumlah kru, durasi liputan, serta hasil yang didapat (album/teaser/video).</p>
                  ) : formData.category === 'mua' ? (
                    <p>💄 **MUA & Gaun**: Tuliskan nama makeup artist, jumlah retouch, serta rincian gaun/aksesoris melati yang sudah termasuk.</p>
                  ) : formData.category === 'tenda' ? (
                    <p>⛺ **Tenda & Pelaminan**: Cantumkan ukuran tenda/pelaminan (meter), fasilitas pendingin (AC/blower), dan pencahayaan.</p>
                  ) : formData.category === 'catering' ? (
                    <p>🍽️ **Katering**: Tuliskan porsi utama (pax), rincian food stall/gubukan, dessert bar, dan layanan waiter.</p>
                  ) : formData.category === 'venue' ? (
                    <p>🏛️ **Venue**: Cantumkan kapasitas max tamu, durasi sewa gedung (jam), kapasitas parkir, dan daya listrik.</p>
                  ) : (
                    <p>💡 Pastikan mengisi rincian item fasilitas dengan jelas (pisahkan dengan koma) agar mudah dibaca klien.</p>
                  )}
                </div>
              </div>

              {/* STEP 2: CATEGORY-SPECIFIC FORM FIELDS */}
              <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs pt-2">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Judul Layanan / Paket *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={
                      formData.category === 'undangan_digital' ? 'Contoh: Undangan Digital Exclusive - Royal Emerald Gold Theme' :
                      formData.category === 'fotografer' ? 'Contoh: Masterpiece Cinematic Wedding Photography & Teaser Film' :
                      formData.category === 'mua' ? 'Contoh: Glamour Royal Makeup Akad & Resepsi + Busana Pengantin' :
                      formData.category === 'tenda' ? 'Contoh: Paket Tenda VIP Maroko & Pelaminan Sultan 12m' :
                      'Contoh: Paket Layanan Spesial NikaHub'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">
                      {formData.category === 'fotografer' ? 'Nama Studio / Lead Photographer *' :
                       formData.category === 'mua' ? 'Nama MUA / Beauty Artist *' :
                       formData.category === 'catering' ? 'Nama Vendor Katering / Culinary Team *' :
                       formData.category === 'undangan_digital' ? 'Penyedia / Studio Undangan *' :
                       'Nama Vendor / Talent *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vendorName}
                      onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                      placeholder={
                        formData.category === 'fotografer' ? 'Contoh: Aruna Visual Studio' :
                        formData.category === 'mua' ? 'Contoh: Rina Makeup Art' :
                        'Contoh: NikaHub Official Production'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">Status Ketersediaan *</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as 'ready' | 'limited' | 'booked' })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 cursor-pointer font-bold"
                    >
                      <option value="ready">🟢 READY (Tersedia)</option>
                      <option value="limited">🟡 LIMITED (Hampir Penuh)</option>
                      <option value="booked">🔴 BOOKED (Penuh / Terisi)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">Harga Sewa / Paket (IDR) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">Harga Normal / Coret (IDR)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 font-mono"
                    />
                  </div>
                </div>

                {/* HIDE LOCATION FOR DIGITAL PRODUCTS */}
                {formData.category !== 'undangan_digital' && formData.category !== 'undangan' && formData.category !== 'bukutamu_digital' && (
                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">Lokasi Base / Jangkauan Layanan *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Contoh: Jakarta & Jabodetabek"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                    />
                  </div>
                )}

                {/* IMAGE UPLOADER WITH PREVIEW BUTTON */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-950/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-champagne-600" />
                      Masukkan Foto Sampul Produk *
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCompressing}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-sm"
                    >
                      <Upload className="w-4 h-4 text-champagne-400" />
                      <span>{isCompressing ? 'Mengompres...' : 'Pilih Foto dari HP/Laptop'}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      disabled={isCompressing}
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />

                    <div className="w-full sm:flex-1">
                      <input
                        type="text"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Atau tempel URL Gambar langsung (https://...)"
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-white"
                      />
                    </div>
                  </div>

                  {/* Compression Info Alert */}
                  {compressionInfo && (
                    <p className="text-[11px] font-semibold text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                      {compressionInfo}
                    </p>
                  )}

                  {/* Single Preview & Edit Button */}
                  {formData.image && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCropperOpen(true)}
                        className="w-full py-3 rounded-xl font-bold bg-white text-emerald-950 border-2 border-emerald-950 hover:bg-emerald-50 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Crop className="w-5 h-5 text-emerald-700" />
                        <span>Lihat & Sesuaikan Foto (Preview)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* SHOW LIVE DEMO FIELD FOR DIGITAL INVITATIONS OR IF PROVIDED */}
                {(formData.category === 'undangan_digital' || formData.category === 'undangan' || formData.category === 'bukutamu_digital') && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <label className="block font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                      URL Demo Live Undangan Digital / Website (Sangat Direkomendasikan)
                    </label>
                    <input
                      type="text"
                      value={formData.liveDemoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                      placeholder="Contoh: /undangan-maulidiyah-alfarisyi/index.html atau https://demo-undangan.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-white"
                    />
                    <span className="text-[10px] text-emerald-800 block">
                      💡 Link ini akan memunculkan tombol <strong>"Lihat Demo Undangan Live"</strong> di halaman katalog & profil agar calon pengantin dapat mencoba secara langsung!
                    </span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Deskripsi Ringkas Paket *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={
                      formData.category === 'undangan_digital' ? 'Tema undangan digital bernuansa istimewa dengan warna emas yang anggun. Dilengkapi musik, galeri, lokasi Maps, dan buku tamu online...' :
                      formData.category === 'fotografer' ? 'Dokumentasi penuh momen berharga dari persediaan akad hingga resepsi dengan tone warna cinematic berkelas...' :
                      'Jelaskan keunggulan paket secara lengkap...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Item / Fasilitas yang Termasuk (Pisahkan dengan koma) *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.includesText}
                    onChange={(e) => setFormData({ ...formData, includesText: e.target.value })}
                    placeholder={
                      formData.category === 'undangan_digital' ? 'Masa Aktif 1 Tahun, Galeri Foto & Video, Countdown Timer, Navigasi Google Maps, Buku Tamu & Ucapan, Fitur Angpao Digital, RSVP via WhatsApp' :
                      formData.category === 'fotografer' ? '2 Lead Photographers, 1 Videographer, All Edited Photos in Flashdisk, 1 Min Instagram Teaser, Album Exclusive 30x40cm' :
                      formData.category === 'mua' ? 'Makeup Akad, Makeup Resepsi, Free Retouch H-1, Melati Segar, Hiasan Mahkota, 2 Set Busana Resepsi' :
                      'Tuliskan fasilitas 1, fasilitas 2, fasilitas 3 (pisahkan dengan koma)'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-full border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-champagne-400" />
                    <span>Simpan Ke Katalog</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VISUAL IMAGE CROPPER MODAL */}
      <ImageCropperModal
        isOpen={isCropperOpen}
        imageSrc={formData.image}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={(croppedDataUrl) => {
          setFormData(prev => ({ ...prev, image: croppedDataUrl }));
          setCompressionInfo('✅ Foto berhasil dipotong (cropped) & dikompresi!');
        }}
      />

    </div>
  );
};
