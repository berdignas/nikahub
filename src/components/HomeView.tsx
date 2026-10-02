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
    <div className="pt-24 pb-20 bg-[#FAF9F5] text-emerald-950 overflow-hidden">
      
      {/* 1. LIVE SOCIAL PROOF TICKER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="bg-emerald-950/5 border border-emerald-950/10 rounded-full px-5 py-2.5 flex items-center justify-between overflow-hidden shadow-xs backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden text-xs font-medium">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900 text-sand text-[10px] font-bold tracking-wider uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse"></span>
              Live Update
            </span>
            <div className="truncate text-emerald-950/80">
              <span className="font-semibold text-emerald-950">12 menit lalu:</span> Klien dari Jakarta Selatan mengunci Paket Royal Pavilion untuk pernikahan Nov 2026.
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
        <div className="relative rounded-[2.5rem] overflow-hidden bg-emerald-950 min-h-[580px] flex items-center shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury Wedding Setup" 
              className="w-full h-full object-cover object-center opacity-65 scale-105 hover:scale-100 transition-transform duration-[12s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full lg:w-3/5 p-8 sm:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne-400/20 border border-champagne-400/30 text-champagne-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              Satu Pintu Layanan • Bebas Repot
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-bold leading-[1.08] mb-6">
              Kemegahan Pesta.<br />
              <span className="text-champagne-300 font-normal italic font-serif">Satu Kendali</span> Penuh.
            </h1>

            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
              Wujudkan pernikahan impian tanpa pusing mengurus belasan pihak. Dari arsitektur tenda VIP, jamuan katering istimewa, hingga pencahayaan panggung—seluruhnya diproduksi dan diawasi langsung oleh satu Project Director resmi NikaHub.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onNavigateToCatalog}
                className="bg-champagne-400 hover:bg-champagne-300 text-emerald-950 px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all shadow-lg hover:shadow-champagne-400/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Eksplorasi Katalog Layanan <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={onNavigateToContact}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-4 rounded-full font-semibold text-sm backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Jadwalkan Sesi Konsultasi
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/15 max-w-md">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-champagne-300">480+</p>
                <p className="text-[11px] text-white/70 font-medium">Event Sukses</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-champagne-300">100%</p>
                <p className="text-[11px] text-white/70 font-medium">Garansi H-1 Ready</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-champagne-300">1 Pintu</p>
                <p className="text-[11px] text-white/70 font-medium">Project Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE WEDDING STYLE FINDER (PENGGANTI KALKULATOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-emerald-950/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
            {/* Left Options Picker */}
            <div className="w-full lg:w-7/12">
              <div className="flex items-center gap-2 text-champagne-700 font-bold text-xs uppercase tracking-widest mb-3">
                <Compass className="w-4 h-4" />
                Wedding Concept Finder
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
                Temukan Karakter & Gaya Pesta Anda
              </h2>
              <p className="text-emerald-950/70 text-sm mb-8">
                Pilih preferensi suasana pernikahan Anda di bawah ini untuk melihat inspirasi rancangan terpadu yang paling sesuai dari NikaHub.
              </p>

              {/* 1. Lokasi Impian */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-950/80 flex items-center gap-2 mb-3">
                  <Compass className="w-3.5 h-3.5 text-champagne-600" />
                  1. Tipe Area Lokasi Acara
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'semi', label: 'Semi-Outdoor Tenda VIP', desc: 'Halaman luas / Rumah' },
                    { id: 'outdoor', label: 'Outdoor Botanical', desc: 'Taman rumput / Kebun' },
                    { id: 'indoor', label: 'Grand Indoor Ballroom', desc: 'Gedung pertemuan / Hall' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLocation(item.id as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all text-xs cursor-pointer ${
                        selectedLocation === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-md' 
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-400 text-emerald-950'
                      }`}
                    >
                      <span className="font-bold block mb-1">{item.label}</span>
                      <span className={`text-[10px] ${selectedLocation === item.id ? 'text-white/70' : 'text-gray-400'}`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Nuansa Warna */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-950/80 flex items-center gap-2 mb-3">
                  <Palette className="w-3.5 h-3.5 text-champagne-600" />
                  2. Palet Nuansa & Estetika
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'royal', label: 'Royal Gold & Velvet', desc: 'Keanggunan adat & mewah' },
                    { id: 'botanical', label: 'Botanical Warm White', desc: 'Kaca, dedaunan & fairy light' },
                    { id: 'modern', label: 'Monochrome Modern', desc: 'Minimalis sleek kontemporer' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedColor(item.id as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all text-xs cursor-pointer ${
                        selectedColor === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-md' 
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-400 text-emerald-950'
                      }`}
                    >
                      <span className="font-bold block mb-1">{item.label}</span>
                      <span className={`text-[10px] ${selectedColor === item.id ? 'text-white/70' : 'text-gray-400'}`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Skala Pesta */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-950/80 flex items-center gap-2 mb-3">
                  <Users className="w-3.5 h-3.5 text-champagne-600" />
                  3. Skala Tamu Undangan
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'intimate', label: 'Intimate Gathering', desc: 'Hingga 300 Tamu' },
                    { id: 'medium', label: 'Celebration Medium', desc: '500 - 800 Tamu' },
                    { id: 'grand', label: 'Grand Royal Gala', desc: '1.000+ Tamu' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedScale(item.id as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all text-xs cursor-pointer ${
                        selectedScale === item.id 
                          ? 'border-emerald-950 bg-emerald-950 text-white shadow-md' 
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-400 text-emerald-950'
                      }`}
                    >
                      <span className="font-bold block mb-1">{item.label}</span>
                      <span className={`text-[10px] ${selectedScale === item.id ? 'text-white/70' : 'text-gray-400'}`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="w-full lg:w-5/12 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between self-stretch">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-champagne-300 font-bold">
                    Rekomendasi Konsep Anda
                  </span>
                  <span className="px-3 py-1 rounded-full bg-champagne-400/20 text-champagne-300 text-[10px] font-bold">
                    {styleResult.badge}
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10">
                  <img 
                    src={styleResult.image} 
                    alt={styleResult.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold text-champagne-300 uppercase tracking-wider block">
                      {styleResult.categoryTag}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight">
                      {styleResult.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  {styleResult.desc}
                </p>

                <div className="space-y-2 text-xs text-white/70 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0" />
                    <span>Termasuk Arsitektur Tenda & Tata Lampu Terpadu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0" />
                    <span>Dukungan Katering Chef & Meja VIP Presisi</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={onNavigateToCatalog}
                className="w-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                Lihat Koleksi Terkait di Katalog <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROMO SIGNATURE PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
              Pilihan Khusus Musim Ini
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
              Paket Kurasi Unggulan
            </h2>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="text-xs font-bold text-emerald-950 hover:text-champagne-600 flex items-center gap-1.5 transition-colors mt-2 sm:mt-0"
          >
            Lihat Semua Layanan <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={onNavigateToCatalog}
            className="bg-[#E6F0EA] rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-between"
          >
            <div className="relative z-10 w-3/4">
              <span className="inline-block px-3 py-1 bg-emerald-900 text-sand rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                Koleksi Baru
              </span>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 leading-tight mb-2">
                Tenda Transparan Klasik & Fairy Lights
              </h3>
              <p className="text-xs text-emerald-950/70 mb-4">
                Konsep ballroom kaca outdoor dengan pencahayaan mewah untuk resepsi malam hari.
              </p>
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1 group-hover:gap-2 transition-all">
                Pesan Sekarang <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" 
              alt="Tenda Transparan" 
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover rounded-tl-[3.5rem] opacity-80 group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div 
            onClick={onNavigateToCatalog}
            className="bg-[#F8EBE6] rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-between"
          >
            <div className="relative z-10 w-3/4">
              <span className="inline-block px-3 py-1 bg-amber-900 text-sand rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                Paket Spesial
              </span>
              <h3 className="font-serif text-2xl font-bold text-amber-950 leading-tight mb-2">
                Prasmanan VIP Nusantara & Western
              </h3>
              <p className="text-xs text-amber-950/70 mb-4">
                Olahan menu chef berstandar bintang lima lengkap dengan dessert bar & pondokan favorit.
              </p>
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1 group-hover:gap-2 transition-all">
                Pesan Sekarang <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" 
              alt="Catering VIP" 
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover rounded-tl-[3.5rem] opacity-80 group-hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div 
            onClick={onNavigateToCatalog}
            className="bg-[#E6EEF4] rounded-[2rem] p-8 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-between"
          >
            <div className="relative z-10 w-3/4">
              <span className="inline-block px-3 py-1 bg-sky-900 text-sand rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                Dokumentasi
              </span>
              <h3 className="font-serif text-2xl font-bold text-sky-950 leading-tight mb-2">
                Sinematik Film & Aerial Drone 4K
              </h3>
              <p className="text-xs text-sky-950/70 mb-4">
                Abadikan setiap detik emosional dengan lensa sinema dan audio rekaman multi-channel.
              </p>
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1 group-hover:gap-2 transition-all">
                Pesan Sekarang <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80" 
              alt="Dokumentasi 4K" 
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover rounded-tl-[3.5rem] opacity-80 group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </section>

      {/* 5. 4 LANGKAH MUDAH MEWUJUDKAN PERNIKAHAN (VISUAL ALUR KERJA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-emerald-950/10 shadow-lg relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-2">
              Alur Pelayanan Terpadu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-3">
              4 Langkah Mudah Pernikahan Impian
            </h2>
            <p className="text-sm text-emerald-950/70">
              Menghilangkan kebingungan dan kerumitan. Bersama NikaHub, nikmati alur pelayanan yang simpel, transparan, dan tenang dari awal hingga hari bahagia Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#FAF9F5] p-6 rounded-[2rem] border border-emerald-950/10 flex flex-col justify-between relative group hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-bold text-champagne-600">01</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-sand flex items-center justify-center font-bold text-xs">
                    ✨
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">
                  Pilih & Konsultasi Konsep
                </h3>
                <p className="text-xs text-emerald-950/70 leading-relaxed">
                  Pilih paket di katalog NikaHub atau konsultasikan konsep impianmu via WhatsApp / Private Lounge secara santai.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF9F5] p-6 rounded-[2rem] border border-emerald-950/10 flex flex-col justify-between relative group hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-bold text-champagne-600">02</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-sand flex items-center justify-center font-bold text-xs">
                    ☕
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">
                  SPK & Food Tasting Gratis
                </h3>
                <p className="text-xs text-emerald-950/70 leading-relaxed">
                  Tanda tangan SPK resmi bermaterai & cicipi menu katering gratis bersama keluarga untuk memastikan selera.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF9F5] p-6 rounded-[2rem] border border-emerald-950/10 flex flex-col justify-between relative group hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-bold text-champagne-600">03</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-sand flex items-center justify-center font-bold text-xs">
                    🛡️
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">
                  Supervisi H-1 Siap 100%
                </h3>
                <p className="text-xs text-emerald-950/70 leading-relaxed">
                  1 Project Director NikaHub mengawal pemasangan tenda & dekorasi hingga siap di H-1 siang hari.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF9F5] p-6 rounded-[2rem] border border-emerald-950/10 flex flex-col justify-between relative group hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-bold text-champagne-600">04</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-sand flex items-center justify-center font-bold text-xs">
                    👑
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">
                  Hari H Pesta Mewah
                </h3>
                <p className="text-xs text-emerald-950/70 leading-relaxed">
                  Nikmati pesta bahagia tanpa stres. Seluruh kelancaran acara dikendalikan penuh oleh tim NikaHub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOP PICKS REKOMENDASI TERBAIK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
              Koleksi Favorit Klien
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 flex items-center gap-2">
              Rekomendasi Signature
            </h2>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="text-xs font-bold text-emerald-950 hover:text-champagne-600 flex items-center gap-1.5 transition-colors"
          >
            Buka Katalog Lengkap <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map(product => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer bg-white p-4 rounded-[2rem] border border-emerald-950/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-sand text-[10px] font-bold px-3 py-1 rounded-full">
                    {product.categoryLabel}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-emerald-950 truncate mb-1 group-hover:text-champagne-700 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-emerald-950">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} Ulasan)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-emerald-950 text-base">
                  Rp {(product.price / 1000000).toFixed(1)} Jt
                </span>
                <span className="text-[11px] font-bold text-emerald-900 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Detail <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REAL BRIDE TESTIMONIALS (PENGGANTI FORM TANGGAL OTOMATIS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-2">
            Kisah Kebahagiaan Pengantin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            Dipercaya 480+ Pasangan Bahagia
          </h2>
          <p className="text-xs sm:text-sm text-emerald-950/70 mt-2">
            Bukan sekadar janji, inilah pengalaman nyata pasangan yang mempercayakan perayaan akbarnya kepada tim NikaHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i}
              className="bg-white p-8 rounded-[2rem] border border-emerald-950/10 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs text-emerald-950/80 leading-relaxed italic mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-950 text-champagne-300 flex items-center justify-center font-bold text-sm border border-champagne-400/40">
                  {t.badge}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-emerald-950">{t.couple}</h4>
                  <span className="text-[10px] text-emerald-950/60 block">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAST INQUIRY & WHATSAPP CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="bg-emerald-950 text-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-400/20 text-champagne-300 text-[10px] font-bold uppercase tracking-widest mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              Layanan Cepat Tanggap
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              Punya Tanggal Pernikahan Idaman?
            </h2>
            <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
              Konsultasikan tanggal acara Anda langsung ke Tim Concierge NikaHub. Kami akan segera memverifikasi ketersediaan jadwal serta survey lokasi bersama tim teknisi kami.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/6281234567890?text=Halo%20NikaHub%20Wedding,%20saya%20ingin%20cek%20ketersediaan%20slot%20tanggal%20pernikahan"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konsultasi Ketersediaan Tanggal (via WA)</span>
              </a>

              <button
                onClick={onNavigateToContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs transition-colors cursor-pointer"
              >
                Jadwalkan Sesi Food Tasting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 3 PILAR KOMITMEN NIKAHUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-2">
            Mengapa Mempercayakan Pesta Anda pada Kami?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            3 Standar Utama Atelier NikaHub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-emerald-950/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 mb-5">
              <UserCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">1 Dedicated Project Director</h3>
            <p className="text-xs text-emerald-950/70 leading-relaxed">
              Anda tidak perlu pusing mengontak banyak orang. Seluruh koordinasi tenda, katering, dan hiburan dikendalikan oleh 1 penanggung jawab resmi NikaHub.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-950/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 mb-5">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">Supervisi Kualitas Ketat</h3>
            <p className="text-xs text-emerald-950/70 leading-relaxed">
              Semua perlengkapan, kesegaran sajian prasmanan, dan kerapian kain diaudit langsung di lapangan sebelum diserahterimakan kepada keluarga.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-emerald-950/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 mb-5">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-xl mb-3">Garansi Kesiapan H-1</h3>
            <p className="text-xs text-emerald-950/70 leading-relaxed">
              Kami menjamin seluruh panggung dan tenda telah siap 100% pada H-1 siang hari, memastikan keluarga dan pengantin tenang menjalani gladi resik.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
