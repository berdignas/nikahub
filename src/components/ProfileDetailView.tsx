import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingProduct } from '../types';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  MessageSquare, 
  Sparkles,
  Calendar,
  Camera,
  Crown,
  Share2,
  Heart,
  Sliders,
  Maximize2,
  X,
  Clock,
  Award,
  ExternalLink
} from 'lucide-react';

interface ProfileDetailViewProps {
  product: WeddingProduct;
  onBack: () => void;
  onAddToCart: (product: WeddingProduct, eventDate: string) => void;
  onSelectOtherProduct: (product: WeddingProduct) => void;
  allProducts: WeddingProduct[];
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
  onSelectOtherProduct,
  allProducts,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activePortfolioFilter, setActivePortfolioFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption?: string } | null>(null);

  // Close lightbox modal on phone back button press
  useEffect(() => {
    if (lightboxImage) {
      window.history.pushState({ ...window.history.state, lightboxOpen: true }, '');
      const handlePop = () => {
        setLightboxImage(null);
      };
      window.addEventListener('popstate', handlePop, { once: true });
      return () => {
        window.removeEventListener('popstate', handlePop);
      };
    }
  }, [lightboxImage]);

  // Digital Invitation Add-ons with Custom Flexible Pricing
  const isDigitalProduct = product.category === 'undangan_digital' || product.category === 'undangan' || product.category === 'bukutamu_digital';

  const DIGITAL_ADDONS = [
    { id: 'custom_domain', name: '🌐 Include Custom Domain Resmi', price: 35000, desc: 'Pengantin dapat link domain khusus dengan nama sendiri' },
    { id: 'qr_checkin', name: '🎫 QR Code Check-in & Buku Tamu VIP', price: 200000, desc: 'Scan QR Code tamu di lokasi acara (tanpa antre)' },
    { id: 'bilingual', name: '🗣️ Switch 2 Bahasa (Bilingual ID / EN)', price: 25000, desc: 'Tombol switch Bahasa Indonesia & Inggris' },
    { id: 'qris_amplop', name: '💳 Integrasi QRIS Amplop Digital', price: 50000, desc: 'Scan QRIS All Payment (GoPay, OVO, Dana, BCA, dll)' },
    { id: 'video_embed', name: '🎬 Embed Video Prewedding HD & Live Stream', price: 75000, desc: 'Embed video teaser HD & tombol live streaming' },
    { id: 'ar_filter', name: '📸 Filter Instagram AR Custom Pasangan', price: 150000, desc: 'Filter AR Instagram khusus dengan logo/nama pengantin' }
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    if (isDigitalProduct) {
      selectedAddons.forEach(id => {
        const item = DIGITAL_ADDONS.find(a => a.id === id);
        if (item) total += item.price;
      });
    }
    return total;
  };

  const currentTotalPrice = calculateTotalPrice();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const isTalent = product.category === 'fotografer' || product.category === 'mua';

  // Portfolio items
  const portfolioItems = product.portfolioGallery || [
    {
      id: 'p-default-1',
      title: product.title,
      category: 'Koleksi Utama',
      image: product.image,
      caption: product.tagline
    },
    ...product.gallery.map((img, idx) => ({
      id: `p-gallery-${idx}`,
      title: `${product.title} - Showcase ${idx + 1}`,
      category: 'Dokumentasi',
      image: img,
      caption: 'Dokumentasi resmi hasil karya tim NikaHub Wedding.'
    }))
  ];

  // Unique portfolio categories for filtering
  const portfolioCategories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredPortfolio = activePortfolioFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activePortfolioFilter);

  // Recommendations
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  const handleBooking = () => {
    const selectedAddonDetails = selectedAddons.map(id => DIGITAL_ADDONS.find(a => a.id === id)?.name).filter(Boolean);
    const customizedProduct: WeddingProduct = {
      ...product,
      price: currentTotalPrice,
      includes: selectedAddonDetails.length > 0 ? [...product.includes, ...selectedAddonDetails as string[]] : product.includes
    };

    onAddToCart(customizedProduct, selectedDate);
  };

  const selectedAddonNamesText = selectedAddons.map(id => DIGITAL_ADDONS.find(a => a.id === id)?.name).join(', ');

  const waMessage = encodeURIComponent(
    `Halo NikaHub Wedding,\n\nSaya tertarik dengan paket:\n*${product.talentName || product.title}* (${product.categoryLabel})\nTotal Harga: ${formatRupiah(currentTotalPrice)}${selectedAddonNamesText ? `\nFitur Tambahan: ${selectedAddonNamesText}` : ''}\nRencana Tanggal Acara: ${selectedDate || 'Belum ditentukan'}\n\nMohon info ketersediaan serta bantuan pemesanan. Terima kasih!`
  );

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-24 pb-24 text-emerald-950 font-sans selection:bg-champagne-300">
      
      {/* 1. TOP BREADCRUMB & ACTION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-emerald-950/10">
          
          {/* Back button */}
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-emerald-950 hover:bg-emerald-950 hover:text-white transition-all text-xs font-semibold shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Katalog Layanan</span>
          </button>

          {/* Breadcrumb info */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-950/60 font-medium">
            <span>Katalog</span>
            <span>/</span>
            <span className="text-emerald-900 font-semibold">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-emerald-950 font-bold truncate max-w-xs">{product.talentName || product.title}</span>
          </div>

          {/* Social share & Wishlist */}
          <div className="flex items-center gap-2">
            {onToggleWishlist && (
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isWishlisted 
                    ? 'bg-rose-50 border-rose-200 text-rose-600' 
                    : 'bg-white border-gray-200 text-emerald-950 hover:border-emerald-900'
                }`}
                title="Simpan ke Favorit"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan profil berhasil disalin!');
                }
              }}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-emerald-950 hover:border-emerald-900 transition-all cursor-pointer"
              title="Bagikan Profil"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO PROFILE HEADER (TALENT-CENTRIC) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-emerald-950/10 shadow-xl relative overflow-hidden"
        >
          {/* Subtle luxury glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
            
            {/* Left: Avatar & Identity */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              
              {/* Profile Photo / Avatar */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-emerald-950 shadow-lg border-4 border-sand">
                  <img 
                    src={product.talentAvatar || product.image} 
                    alt={product.talentName || product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Verified Icon */}
                <div className="absolute -bottom-2 -right-2 bg-emerald-950 text-champagne-300 p-2 rounded-2xl border-2 border-white shadow-md" title="Talenta Resmi Terverifikasi NikaHub">
                  {product.category === 'fotografer' ? (
                    <Camera className="w-4 h-4" />
                  ) : product.category === 'mua' ? (
                    <Crown className="w-4 h-4" />
                  ) : (
                    <Award className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Identity details */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-sand text-[10px] font-bold uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-champagne-100 text-champagne-900 text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-champagne-700" />
                    Official NikaHub Verified
                  </span>
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 leading-tight">
                  {product.talentName || product.title}
                </h1>
                
                <p className="text-xs sm:text-sm font-semibold text-champagne-700 mt-1">
                  {product.talentRole || product.vendorName}
                </p>

                <p className="text-xs text-emerald-950/70 mt-2 max-w-xl leading-relaxed">
                  {product.tagline}
                </p>

                {/* Style tags */}
                {product.styleTags && product.styleTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.styleTags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-medium bg-[#F4F1EA] text-emerald-950/80 px-2.5 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick Stats & Booking Pill */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-4 bg-[#FAF9F5] p-5 rounded-2xl border border-emerald-950/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-serif font-bold text-lg text-emerald-950">{product.rating}</span>
                </div>
                <div className="text-xs text-emerald-950/60 border-l border-gray-300 pl-3">
                  <p className="font-bold text-emerald-950">{product.reviewCount} Ulasan</p>
                  <p className="text-[10px]">100% Klien Puas</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-950/80">
                <MapPin className="w-4 h-4 text-champagne-600 shrink-0" />
                <span>{product.location}</span>
              </div>

              {product.experienceYears && (
                <div className="flex items-center gap-2 text-xs text-emerald-950/80">
                  <Clock className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>Pengalaman: <strong>{product.experienceYears}</strong></span>
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Tarif Mulai Dari</span>
                <span className="font-serif text-2xl font-bold text-emerald-950">
                  {formatRupiah(product.price)}
                </span>
              </div>
            </div>

          </div>

          {/* Talent Bio Quote */}
          {product.bio && (
            <div className="mt-8 pt-6 border-t border-emerald-950/10 flex flex-col md:flex-row gap-4 items-start bg-[#FAF9F5]/70 p-5 rounded-2xl">
              <span className="text-2xl text-champagne-600 font-serif">“</span>
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
                  Filosofi & Pendekatan Artistik:
                </h4>
                <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed italic">
                  {product.bio}
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </div>

      {/* 3. MAIN CONTENT: 2-COLUMN LAYOUT (PORTFOLIO GALLERY vs BOOKING CARD) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* LEFT COLUMN: FULL PORTFOLIO GALLERY & GEAR DETAILS */}
          <div className="w-full lg:w-7/12 xl:w-8/12 space-y-12">
            
            {/* Live Interactive Invitation Preview (If digital invitation) */}
            {product.liveDemoUrl && (
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-champagne-400/40 shadow-xl overflow-hidden relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-champagne-900 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-champagne-700" />
                      Live Website Undangan Aktif
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                      Simulasi & Coba Langsung Undangan
                    </h2>
                    <p className="text-xs text-emerald-950/70 mt-1">
                      Undangan ini 100% aktif dan dapat dicoba langsung di bawah (musik, amplop, RSVP, rute maps):
                    </p>
                  </div>
                  
                  <a
                    href={product.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-full bg-emerald-950 hover:bg-emerald-900 text-sand text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start shrink-0 cursor-pointer"
                  >
                    <span>Buka Layar Penuh</span>
                    <ExternalLink className="w-4 h-4 text-champagne-400" />
                  </a>
                </div>

                {/* Simulated Phone Device Frame */}
                <div className="flex justify-center p-2 sm:p-6 bg-[#1a221b] rounded-3xl border border-champagne-400/20">
                  <div className="w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[650px] rounded-[2rem] sm:rounded-[2.5rem] border-4 border-[#334235] shadow-2xl overflow-hidden relative bg-black flex flex-col">
                    {/* Phone speaker notch */}
                    <div className="w-24 sm:w-28 h-3.5 sm:h-4 bg-[#334235] rounded-b-xl mx-auto absolute top-0 inset-x-0 z-30 flex items-center justify-center">
                      <div className="w-7 sm:w-8 h-1 bg-black/40 rounded-full" />
                    </div>
                    
                    {/* Live Iframe */}
                    <iframe
                      src={product.liveDemoUrl}
                      title="Live Demo Undangan Digital"
                      className="w-full h-full border-0 pt-2"
                      allow="autoplay"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                  <span>💡 Tip: Anda bisa klik tombol "Buka Layar Penuh" di atas untuk mencoba alur buka amplop dan memutar lagu.</span>
                  <a href={product.liveDemoUrl} target="_blank" rel="noreferrer" className="font-bold text-emerald-950 underline hover:text-champagne-700">
                    Buka URL Langsung ↗
                  </a>
                </div>
              </div>
            )}

            {/* Gallery Section */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-950/10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-700 block mb-1">
                    Portofolio & Bukti Karya Nyata
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                    Galeri Hasil {product.category === 'fotografer' ? 'Jepretan Foto' : product.category === 'mua' ? 'Riasan Lookbook' : 'Dokumentasi'}
                  </h2>
                </div>

                {/* Sub-Category Filter Tabs */}
                {portfolioCategories.length > 2 && (
                  <div className="flex flex-wrap gap-1.5 bg-[#FAF9F5] p-1.5 rounded-full border border-gray-200">
                    {portfolioCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActivePortfolioFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          activePortfolioFilter === cat 
                            ? 'bg-emerald-950 text-white shadow-xs' 
                            : 'text-gray-600 hover:text-emerald-950'
                        }`}
                      >
                        {cat === 'all' ? 'Semua Karya' : cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Photo Masonry / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPortfolio.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setLightboxImage({ url: item.image, title: item.title, caption: item.caption })}
                    className={`group relative rounded-2xl overflow-hidden bg-emerald-950 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                      idx === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                    }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-champagne-300 uppercase tracking-wider block mb-1">
                            {item.category}
                          </span>
                          <h4 className="font-serif font-bold text-base sm:text-lg leading-tight">
                            {item.title}
                          </h4>
                          {item.caption && (
                            <p className="text-xs text-white/80 line-clamp-1 mt-1">
                              {item.caption}
                            </p>
                          )}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[10px] font-bold text-sand group-hover:opacity-0 transition-opacity">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 text-center mt-4 italic">
                *Klik foto mana saja untuk memperbesar tampilan resolusi penuh (HD).
              </p>
            </div>

            {/* Equipment or Luxury Brands */}
            {product.equipmentOrBrands && product.equipmentOrBrands.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-950/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-champagne-600" />
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    {product.category === 'fotografer' ? 'Peralatan & Gear Kamera Standar Industri' : product.category === 'mua' ? 'Brand Kosmetik & Skin Prep Mewah' : 'Spesifikasi Teknis'}
                  </h3>
                </div>
                <p className="text-xs text-emerald-950/70 mb-5 leading-relaxed">
                  {product.category === 'fotografer' 
                    ? 'Kamera sinema bersensor full-frame dengan rekaman 4K 10-bit tanpa kompresi dan drone berlisensi resmi untuk ketajaman visual maksimal.'
                    : 'Menggunakan produk kecantikan kelas atas bebas alergi untuk hasil riasan tahan lama, natural di kamera 4K, dan tidak merusak kulit pengantin.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.equipmentOrBrands.map((gear, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F5] border border-gray-100 text-xs text-emerald-950">
                      <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{gear}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions Detail */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-950/10 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-emerald-950 mb-2">
                Apa Saja yang Didapat dalam Paket Ini?
              </h3>
              <p className="text-xs text-emerald-950/70 mb-6">
                Seluruh fasilitas di bawah ini tertulis transparan dalam Surat Perjanjian Kerja (SPK) resmi NikaHub tanpa biaya tersembunyi.
              </p>

              <div className="space-y-3">
                {product.includes.map((inc, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F5] border border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-950 text-champagne-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-950">{inc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Overview */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-950/10 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-emerald-950 mb-3">
                Tentang Layanan Ini
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                {product.description}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY BOOKING CARD & PRICING */}
          <div className="w-full lg:w-5/12 xl:w-4/12 static lg:sticky top-28 self-start space-y-6">
            
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-950/15 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    {isDigitalProduct ? 'Total Tarif (Dasar + Add-On)' : 'Tarif Sewa Resmi'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-emerald-950">
                      {formatRupiah(currentTotalPrice)}
                    </span>
                  </div>
                  {product.price !== currentTotalPrice && (
                    <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                      Tarif Dasar: {formatRupiah(product.price)} + Add-On: {formatRupiah(currentTotalPrice - product.price)}
                    </span>
                  )}
                  {product.originalPrice && product.price === currentTotalPrice && (
                    <span className="text-xs text-rose-600 line-through">
                      Hemat {formatRupiah(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold shrink-0">
                  Tersedia
                </span>
              </div>

              {/* DYNAMIC DIGITAL ADD-ONS UPSELL OPTIONS */}
              {isDigitalProduct && (
                <div className="my-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      Pilih Fitur Tambahan (Add-On Options):
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {DIGITAL_ADDONS.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-emerald-950 text-sand border-emerald-950 shadow-sm'
                              : 'bg-white text-emerald-950 border-amber-200/90 hover:bg-amber-100/40'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by parent div
                                className="rounded text-emerald-950"
                              />
                              <span>{addon.name}</span>
                            </span>
                            <span className={isSelected ? 'text-champagne-400 font-mono' : 'text-emerald-800 font-mono'}>
                              +{formatRupiah(addon.price)}
                            </span>
                          </div>
                          <p className={`text-[10px] ml-5 mt-0.5 ${isSelected ? 'text-sand/80' : 'text-gray-500'}`}>
                            {addon.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Event Date Picker */}
              <div className="my-6">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 block mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-champagne-600" />
                  Pilih Rencana Tanggal Acara:
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  *Untuk verifikasi ketersediaan jadwal talent di tanggal tersebut.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleBooking}
                  className="w-full py-4 rounded-full bg-emerald-950 hover:bg-emerald-900 text-sand font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-950/20 transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-champagne-400" />
                  <span>Tambahkan ke Daftar Sewa</span>
                </button>

                <a
                  href={`https://wa.me/6281234567890?text=${waMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasi WhatsApp Langsung</span>
                </a>

                {product.liveDemoUrl && (
                  <a
                    href={product.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-900 to-emerald-950 text-champagne-300 border border-champagne-400/30 hover:border-champagne-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-center"
                  >
                    <ExternalLink className="w-4 h-4 text-champagne-400" />
                    <span>Buka Undangan (Live Web)</span>
                  </a>
                )}
              </div>

              {/* Guarantee highlights */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2.5 text-xs text-emerald-950/75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>Tanpa Biaya Admin Tambahan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>1 Dedicated Project Director NikaHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0" />
                  <span>SPK Resmi Bermaterai & Garansi H-1 Ready</span>
                </div>
              </div>

            </div>

            {/* Safe Payment Box */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-emerald-950/10 text-xs text-emerald-950/70">
              <div className="flex items-center gap-2 font-bold text-emerald-950 mb-1">
                <ShieldCheck className="w-4 h-4 text-champagne-700" />
                <span>Sistem Pembayaran Bertahap</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Kunci tanggal pernikahan Anda cukup dengan DP 30%. Pelunasan dapat dilakukan secara fleksibel setelah gladi resik di H-1 acara.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. RELATED / OTHER PROFILES RECOMMENDATION */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 pt-16 border-t border-emerald-950/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-700 block mb-1">
                Koleksi Terkait Lainnya
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                Pilihan Alternatif & Pelengkap
              </h3>
            </div>
            <button 
              onClick={onBack}
              className="text-xs font-bold text-emerald-950 hover:text-champagne-600 transition-colors"
            >
              Lihat Semua di Katalog →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectOtherProduct(rel)}
                className="group cursor-pointer bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-sand text-[10px] font-bold px-3 py-1 rounded-full">
                      {rel.categoryLabel}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-emerald-950 group-hover:text-champagne-700 transition-colors line-clamp-1 mb-1">
                    {rel.talentName || rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                    {rel.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-emerald-950 text-sm">
                    {formatRupiah(rel.price)}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 group-hover:translate-x-1 transition-transform">
                    Buka Profil →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. LIGHTBOX MODAL FOR FULL RESOLUTION PREVIEW */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <img 
                src={lightboxImage.url} 
                alt={lightboxImage.title} 
                className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl" 
              />
              <div className="text-center mt-4">
                <h4 className="font-serif text-lg font-bold text-white">{lightboxImage.title}</h4>
                {lightboxImage.caption && (
                  <p className="text-xs text-white/70 mt-1 max-w-lg">{lightboxImage.caption}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
