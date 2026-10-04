import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, WeddingProduct } from '../types';
import { 
  User as UserIcon, 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  LogOut,
  MapPin
} from 'lucide-react';

interface ClientProfileViewProps {
  user: User;
  onLogout: () => void;
  wishlistIds: string[];
  allProducts: WeddingProduct[];
  onNavigateToCatalog: () => void;
  onSelectProduct: (product: WeddingProduct) => void;
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({
  user,
  onLogout,
  wishlistIds,
  allProducts,
  onNavigateToCatalog,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'wishlist'>('info');

  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  // Mock Orders
  const mockOrders = [
    {
      id: 'ORD-202610-001',
      date: '10 Okt 2026',
      productName: 'Paket Tenda VIP 500 Pax',
      status: 'Menunggu Pembayaran',
      price: 18500000,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'ORD-202511-442',
      date: '15 Nov 2025',
      productName: 'Paket Intimate Lamaran',
      status: 'Selesai',
      price: 4500000,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FAF9F5] text-emerald-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-2">Profil Klien</h1>
          <p className="text-sm text-emerald-950/70">Kelola akun, pesanan, dan paket idaman Anda di satu tempat.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-sm mb-4">
              <div className="w-16 h-16 rounded-full bg-champagne-400/20 text-champagne-700 flex items-center justify-center text-2xl font-bold uppercase mb-4">
                {user.name ? user.name.charAt(0) : user.email.charAt(0)}
              </div>
              <h3 className="font-bold text-emerald-950 truncate">{user.name || 'Calon Pengantin'}</h3>
              <p className="text-xs text-emerald-950/60 truncate">{user.email}</p>
            </div>

            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 md:shrink border ${activeTab === 'info' ? 'bg-emerald-950 text-sand border-emerald-950' : 'bg-white text-emerald-950/70 border-emerald-950/10 hover:border-emerald-950/30'}`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Informasi Akun</span>
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 md:shrink border ${activeTab === 'orders' ? 'bg-emerald-950 text-sand border-emerald-950' : 'bg-white text-emerald-950/70 border-emerald-950/10 hover:border-emerald-950/30'}`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesanan Saya</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 md:shrink border ${activeTab === 'wishlist' ? 'bg-emerald-950 text-sand border-emerald-950' : 'bg-white text-emerald-950/70 border-emerald-950/10 hover:border-emerald-950/30'}`}
              >
                <Heart className="w-4 h-4" />
                <span>Tersimpan</span>
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t border-emerald-950/10 space-y-3">
              <button 
                onClick={() => window.open('https://wa.me/qr/XCPMCWREYZVOM1', '_blank')}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors font-bold text-xs shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Bantuan & Chat Admin</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-950/10 shadow-sm min-h-[500px]"
            >
              {activeTab === 'info' && (
                <div className="max-w-xl space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-emerald-950 mb-6">Informasi Akun</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-emerald-950/60 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                        <div className="w-full bg-gray-50 border border-gray-200 text-emerald-950 px-4 py-3 rounded-xl text-sm font-medium">
                          {user.name || 'Calon Pengantin'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-emerald-950/60 mb-1.5 uppercase tracking-wider">Email Utama</label>
                        <div className="w-full bg-gray-50 border border-gray-200 text-emerald-950 px-4 py-3 rounded-xl text-sm font-medium">
                          {user.email}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-emerald-950/60 mb-1.5 uppercase tracking-wider">Nomor WhatsApp</label>
                        <div className="w-full bg-gray-50 border border-gray-200 text-emerald-950 px-4 py-3 rounded-xl text-sm font-medium">
                          {user.phone || 'Belum ditambahkan'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-champagne-400 text-emerald-950 font-bold text-xs uppercase tracking-wider hover:bg-champagne-300 transition-colors shadow-sm">
                    Simpan Perubahan
                  </button>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-serif text-2xl font-bold text-emerald-950 mb-6">Riwayat Pesanan</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-emerald-950/10 hover:border-champagne-400/50 transition-colors bg-white flex flex-col sm:flex-row gap-5">
                        <img src={order.image} alt={order.productName} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-emerald-950/50 uppercase tracking-widest">{order.id}</span>
                              <span className="text-[10px] font-bold text-emerald-950/50">{order.date}</span>
                            </div>
                            <h4 className="font-bold text-emerald-950 text-base mb-2">{order.productName}</h4>
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {order.status === 'Selesai' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {order.status}
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 flex items-center justify-between sm:justify-end gap-4">
                            <div className="text-right text-left sm:text-right">
                              <span className="block text-[10px] text-emerald-950/60 font-bold uppercase mb-0.5">Total Pembayaran</span>
                              <span className="font-bold text-emerald-950">Rp {(order.price / 1000000).toFixed(1)} Jt</span>
                            </div>
                            <button className="px-5 py-2.5 rounded-xl bg-emerald-950 text-sand text-[10px] font-bold uppercase hover:bg-emerald-900 transition-colors shadow-sm">
                              Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-bold text-emerald-950">Paket Tersimpan</h2>
                    <span className="text-xs font-bold text-emerald-950/50 bg-gray-100 px-3 py-1 rounded-full">{wishlistProducts.length} Item</span>
                  </div>
                  
                  {wishlistProducts.length === 0 ? (
                    <div className="text-center py-20 px-4 border-2 border-dashed border-gray-200 rounded-2xl">
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-gray-300" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">Wishlist Kosong</h3>
                      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">Anda belum menyimpan paket apapun. Jelajahi katalog kami untuk menemukan paket impian Anda.</p>
                      <button 
                        onClick={onNavigateToCatalog}
                        className="px-6 py-3 rounded-xl bg-emerald-950 text-sand font-bold text-xs uppercase hover:bg-emerald-900 transition-colors shadow-sm"
                      >
                        Lihat Katalog
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {wishlistProducts.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => onSelectProduct(p)}
                          className="group cursor-pointer rounded-2xl border border-emerald-950/10 overflow-hidden hover:shadow-md transition-all flex flex-col"
                        >
                          <div className="aspect-[4/3] bg-gray-100 relative">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-rose-500">
                              <Heart className="w-4 h-4 fill-current" />
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                            <div>
                              <div className="flex items-center gap-1 text-[10px] text-emerald-950/60 font-bold uppercase mb-1.5">
                                <MapPin className="w-3 h-3" />
                                {p.location}
                              </div>
                              <h4 className="font-serif font-bold text-emerald-950 text-sm mb-2 group-hover:text-champagne-700 transition-colors line-clamp-2 leading-tight">{p.title}</h4>
                            </div>
                            <div className="font-bold text-emerald-950 text-xs mt-2 pt-3 border-t border-gray-50">
                              Rp {(p.price / 1000000).toFixed(1)} Jt
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
