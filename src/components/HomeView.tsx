import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingProduct } from '../types';
import { 
  ArrowRight, 
  Star,
  ShieldCheck, 
  UserCheck, 
  Clock, 
  Sparkles, 
  Sliders, 
  ChevronRight, 
  MessageSquare,
  Compass,
  Palette,
  Users,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToCatalog: () => void;
  onNavigateToContact: () => void;
  featuredProducts: WeddingProduct[];
  onSelectProduct: (product: WeddingProduct) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToCatalog,
  onNavigateToContact,
  featuredProducts,
  onSelectProduct,
}) => {
  // Wedding Style Finder (Quiz) State
  const [selectedLocation, setSelectedLocation] = useState<'outdoor' | 'semi' | 'indoor'>('semi');
  const [selectedColor, setSelectedColor] = useState<'royal' | 'botanical' | 'modern'>('royal');
  const [selectedScale, setSelectedScale] = useState<'intimate' | 'medium' | 'grand'>('medium');

  // Before After Slider
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Top Picks
  const topPicks = featuredProducts.filter(p => p.featured).slice(0, 4);

  // Dynamic Style Matcher Result
  const getStyleMatch = () => {
    if (selectedColor === 'royal') {
      return {
        title: "The Royal Moroccan & Velvet Heritage",
        desc: "Kombinasi kemewahan adat berpadu dengan kain tenda beludru tebal, lampu kristal gantung, dan ornamen emas keagungan nusantara.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        badge: "Gaya Paling Diminati",
        categoryTag: "Tenda & Dekorasi VIP"
      };
    } else if (selectedColor === 'botanical') {
      return {
        title: "Botanical Glasshouse & Fairy Canopy",
        desc: "Konsep kanopi transparan bertabur ribuan lampu peri (fairy lights), dedaunan asri, dan atmosfer hangat romantis di bawah langit malam.",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        badge: "Romantis & Alami",
        categoryTag: "Tenda Transparan & Alam"
      };
    } else {
      return {
        title: "Modern Monochrome & Sleek Chic",
        desc: "Estetika kontemporer minimalis dengan garis tegas, lighting arsitektural dramatis, serta penataan meja jamuan VIP berstandar fine-dining.",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
        badge: "Kontemporer Mewah",
        categoryTag: "Ballroom & Modern Setup"
      };
    }
  };

  const styleResult = getStyleMatch();

  const TESTIMONIALS = [
    {
      couple: "Resepsi Plataran Senayan",
      location: "Jakarta Selatan",
      text: "Tenda transparan dan sajian kateringnya luar biasa dipuji keluarga besar. H-1 siang seluruh tenda dan panggung sudah siap 100%. Kami sekeluarga bisa tenang sebelum hari bahagia.",
      rating: 5,
      badge: "✨"
    },
    {
      couple: "Outdoor Celebration Pine Hill",
      location: "Bandung - Jawa Barat",
      text: "Awalnya pusing membayangkan harus mengontak vendor tenda, katering, dan lighting satu per satu. Di NikaHub kami cuma bicara ke 1 Project Director, semuanya beres tanpa drama.",
      rating: 5,
      badge: "👑"
    },
    {
      couple: "Grand Ballroom Pasundan",
      location: "Jabodetabek",
      text: "Lighting panggung megah, kursi tiffany kokoh dan bersih, makanan selalu hangat dan terisi cepat. Kualitas produksinya benar-benar sekelas hotel bintang lima.",
      rating: 5,
      badge: "💍"
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-20 bg-[#FAF9F5] text-emerald-950 overflow-hidden font-sans">
      
      {/* 1. LIVE SOCIAL PROOF TICKER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white/80 border border-emerald-950/10 rounded-full px-4 sm:px-6 py-2 flex items-center justify-between shadow-xs backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden text-xs font-medium">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-sand text-[10px] font-bold tracking-wider uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse"></span>
              Live Update
            </span>
            <div className="truncate text-emerald-950/80 text-[11px] sm:text-xs">
              <span className="font-bold text-emerald-950">12m lalu:</span> Klien mengunci Paket Royal Pavilion untuk pernikahan Nov 2026.
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-emerald-950/70 shrink-0">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" /> 4.9/5 dari 480+ Pernikahan
            </span>
            <span>•</span>
            <span className="text-emerald-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Tanggung Jawab Tunggal NikaHub
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO LUXURY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-emerald-950 min-h-[460px] sm:min-h-[540px] flex items-center shadow-xl">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury Wedding Setup" 
              className="w-full h-full object-cover object-center opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full lg:w-3/5 p-6 sm:p-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-400/20 border border-champagne-400/30 text-champagne-300 text-[11px] font-semibold tracking-wider uppercase mb-4 sm:mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              Satu Pintu Layanan • Bebas Repot
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight sm:leading-[1.08] mb-4 sm:mb-6">
              Kemegahan Pesta.<br />
              <span className="text-champagne-300 font-normal italic font-serif">Satu Kendali</span> Penuh.
            </h1>

            <p className="text-white/80 text-xs sm:text-base mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Wujudkan pernikahan impian tanpa pusing mengurus belasan pihak. Arsitektur tenda VIP, jamuan katering istimewa, hingga pencahayaan panggung—seluruhnya diproduksi dan diawasi langsung oleh satu Project Director resmi NikaHub.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button 
                onClick={onNavigateToCatalog}
                className="bg-champagne-400 hover:bg-champagne-300 text-emerald-950 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Eksplorasi Katalog Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={onNavigateToContact}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-full font-semibold text-xs transition-all text-center cursor-pointer"
              >
                Jadwalkan Sesi Konsultasi
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 sm:mt-8 border-t border-white/15 max-w-md">
              <div>
                <p className="text-xl sm:text-3xl font-serif font-bold text-champagne-300">480+</p>
                <p className="text-[10px] sm:text-[11px] text-white/70 font-medium">Event Sukses</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-serif font-bold text-champagne-300">100%</p>
                <p className="text-[10px] sm:text-[11px] text-white/70 font-medium">Garansi H-1 Ready</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-serif font-bold text-champagne-300">1 Pintu</p>
                <p className="text-[10px] sm:text-[11px] text-white/70 font-medium">Project Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WEDDING CONCEPT FINDER (SLEEK COMPACT LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-sm">
          <div className="flex items-center gap-2 text-champagne-700 font-bold text-xs uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4" />
            Wedding Concept Finder
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mb-6">
            Temukan Karakter & Gaya Pesta Anda
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Selection Controls */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Option 1: Area */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  1. Tipe Area Lokasi Acara
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'semi', label: 'Semi-Outdoor VIP' },
                    { id: 'outdoor', label: 'Outdoor Botanical' },
                    { id: 'indoor', label: 'Grand Indoor Ballroom' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLocation(item.id as any)}
                      className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        selectedLocation === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-xs' 
                          : 'border-gray-200 bg-gray-50 text-emerald-950/80 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Nuansa */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  2. Palet Nuansa & Estetika
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'royal', label: 'Royal Gold & Velvet' },
                    { id: 'botanical', label: 'Botanical Warm White' },
                    { id: 'modern', label: 'Monochrome Modern' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedColor(item.id as any)}
                      className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-xs' 
                          : 'border-gray-200 bg-gray-50 text-emerald-950/80 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Skala */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  3. Skala Tamu Undangan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'intimate', label: 'Intimate (300 Tamu)' },
                    { id: 'medium', label: 'Medium (500-800)' },
                    { id: 'grand', label: 'Grand Royal (1000+)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedScale(item.id as any)}
                      className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        selectedScale === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-xs' 
                          : 'border-gray-200 bg-gray-50 text-emerald-950/80 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Result Banner */}
            <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-champagne-300">
                    Rekomendasi Terkait
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-champagne-400/20 text-champagne-300 text-[10px] font-bold">
                    {styleResult.badge}
                  </span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 border border-white/10">
                  <img 
                    src={styleResult.image} 
                    alt={styleResult.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                      {styleResult.title}
                    </h4>
                  </div>
                </div>

                <p className="text-[11px] text-white/80 leading-relaxed mb-4">
                  {styleResult.desc}
                </p>
              </div>

              <button 
                onClick={onNavigateToCatalog}
                className="w-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Lihat di Katalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIFORM SIGNATURE PACKAGES (JEJERKAN SEJENIS, HILANGKAN KOTAK BESAR WARNA WARNI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-0.5">
              Pilihan Utama Musim Ini
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
              Paket Kurasi Unggulan
            </h2>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="text-xs font-bold text-emerald-950 hover:text-champagne-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            Semua Layanan →
          </button>
        </div>

        {/* Clean, Uniform Cards Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Tenda Transparan Klasik & Fairy Lights",
              tag: "Koleksi Tenda VIP",
              desc: "Konsep ballroom kaca outdoor dengan pencahayaan lampu peri mewah untuk resepsi malam.",
              image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Prasmanan VIP Nusantara & Western",
              tag: "Katering Bintang Lima",
              desc: "Olahan menu chef berstandar tinggi lengkap dengan dessert bar & pondokan kuliner favorit.",
              image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Sinematik Film & Aerial Drone 4K",
              tag: "Dokumentasi Sinema",
              desc: "Abadikan setiap detik emosional dengan lensa sinema dan audio rekaman multi-channel.",
              image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={onNavigateToCatalog}
              className="bg-white rounded-2xl border border-emerald-950/10 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 bg-emerald-950/80 text-sand text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-emerald-950 group-hover:text-champagne-700 transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>Lihat Rincian Paket</span>
                <ArrowRight className="w-3.5 h-3.5 text-champagne-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4 LANGKAH ALUR KERJA (JEJERKAN RAPI DALAM 1 STRIP HORISONTAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
              Alur Pelayanan Terpadu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
              4 Langkah Pernikahan Impian
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: "01", icon: "✨", title: "Pilih & Konsultasi Konsep", desc: "Pilih paket katalog atau konsultasikan konsep impianmu via WA secara santai." },
              { num: "02", icon: "☕", title: "SPK & Tasting Gratis", desc: "Tanda tangan SPK resmi & cicipi menu katering gratis bersama keluarga." },
              { num: "03", icon: "🛡️", title: "Supervisi H-1 Ready", desc: "1 Project Director mengawal pemasangan tenda & dekorasi hingga siap H-1." },
              { num: "04", icon: "👑", title: "Hari H Pesta Mewah", desc: "Nikmati pesta bahagia tanpa stres. Seluruh kelancaran dikendalikan tim." }
            ].map((step, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF9F5] p-5 rounded-2xl border border-emerald-950/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-2xl font-bold text-champagne-600">{step.num}</span>
                    <span className="text-base">{step.icon}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-emerald-950 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-emerald-950/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP PICKS REKOMENDASI TERBAIK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-0.5">
              Koleksi Favorit Klien
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
              Rekomendasi Signature
            </h2>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="text-xs font-bold text-emerald-950 hover:text-champagne-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            Katalog Lengkap →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {topPicks.map(product => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer bg-white p-3.5 rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 bg-emerald-950/80 backdrop-blur-md text-sand text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                    {product.categoryLabel}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-emerald-950 truncate mb-1 group-hover:text-champagne-700 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-2">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-emerald-950">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} Ulasan)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 text-xs">
                <span className="font-bold text-emerald-950 font-serif text-sm">
                  Rp {(product.price / 1000000).toFixed(1)} Jt
                </span>
                <span className="font-bold text-emerald-900 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-[11px]">
                  Detail <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REAL BRIDE TESTIMONIALS (JEJERKAN RAPI DALAM 1 BARIS RAPI) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
            Kisah Kebahagiaan Pengantin
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
            Dipercaya 480+ Pasangan Bahagia
          </h2>
        </div>

        {/* Neatly Aligned Row of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i}
              className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs">{t.badge}</span>
                </div>

                <p className="text-xs text-emerald-950/80 leading-relaxed italic mb-5">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-champagne-300 flex items-center justify-center font-bold text-xs shrink-0">
                  {t.couple.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs text-emerald-950 truncate">{t.couple}</h4>
                  <span className="text-[10px] text-emerald-950/60 block truncate">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAST INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-400/20 text-champagne-300 text-[10px] font-bold uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" />
              Layanan Cepat Tanggap
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Punya Tanggal Pernikahan Idaman?
            </h2>
            <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto">
              Konsultasikan tanggal acara Anda langsung ke Tim Concierge NikaHub. Kami akan segera memverifikasi ketersediaan jadwal & survey lokasi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/6281234567890?text=Halo%20NikaHub%20Wedding,%20saya%20ingin%20cek%20ketersediaan%20slot%20tanggal%20pernikahan"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konsultasi WA Direct</span>
              </a>

              <button
                onClick={onNavigateToContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors cursor-pointer"
              >
                Jadwalkan Food Tasting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 3 PILAR KOMITMEN NIKAHUB (JEJERKAN RAPI DALAM 1 BARIS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">1 Dedicated Project Director</h3>
              <p className="text-xs text-emerald-950/70 leading-relaxed">
                Seluruh koordinasi tenda, katering, dan hiburan dikendalikan oleh 1 penanggung jawab resmi NikaHub.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">Supervisi Kualitas Ketat</h3>
              <p className="text-xs text-emerald-950/70 leading-relaxed">
                Semua perlengkapan & sajian prasmanan diaudit langsung di lapangan sebelum diserahterimakan.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">Garansi Kesiapan H-1</h3>
              <p className="text-xs text-emerald-950/70 leading-relaxed">
                Seluruh panggung dan tenda siap 100% pada H-1 pukul 14.00 WIB untuk gladi resik keluarga.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
