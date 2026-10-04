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
  ChevronRight, ChevronLeft, 
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
  // Before After Slider
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Top Picks
  const topPicks = featuredProducts.filter(p => p.featured).slice(0, 4);

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

        {/* Clean, Swipeable Carousel for Middle-Class Market */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            {
              title: "Paket Tenda VIP 500 Pax",
              tag: "🔥 Promo Terlaris",
              badgeStyle: "bg-rose-600 text-white",
              desc: "Tenda tertutup rapi, pelaminan modern, katering 500 porsi, rias & busana lengkap.",
              price: "Mulai Rp 18,5 Jt",
              image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Gedung / Aula",
              tag: "⭐ Favorit",
              badgeStyle: "bg-emerald-950 text-sand",
              desc: "Dekorasi pelaminan up to 10m, mini garden, hiburan akustik, dan free 2 gubukan.",
              price: "Mulai Rp 25,0 Jt",
              image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Intimate Lamaran",
              tag: "Spesial",
              badgeStyle: "bg-champagne-600 text-white",
              desc: "Backdrop bunga segar, kursi crossback 50 pcs, fotografer & ring box eksklusif.",
              price: "Mulai Rp 4,5 Jt",
              image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Custom (Sesuai Budget)",
              tag: "Bisa Nego",
              badgeStyle: "bg-amber-500 text-white",
              desc: "Diskusikan budget yang Anda miliki dengan tim kami. Wujudkan acara tanpa over-budget.",
              price: "Tanya Admin",
              image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={onNavigateToCatalog}
              className="bg-white w-[85vw] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-emerald-950/10 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide ${item.badgeStyle}`}>
                    {item.tag}
                  </span>
                </div>
                <div className="px-1">
                  <h3 className="font-serif font-bold text-base text-emerald-950 group-hover:text-champagne-700 transition-colors mb-1.5 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-1 pb-1">
                <div className="mb-3 text-emerald-950 font-bold text-sm">
                  {item.price}
                </div>
                <button 
                  className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-sand font-bold text-xs transition-colors flex items-center justify-center gap-2 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://wa.me/qr/XCPMCWREYZVOM1', '_blank');
                  }}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tanya via WA</span>
                </button>
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

      {/* 7. REAL BRIDE TESTIMONIALS (HORIZONTAL SCROLL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mb-2">
            Inspiring Client Experiences
          </h2>
          <span className="text-sm text-emerald-950/70 block">
            Join us and become our next success story
          </span>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          id="testimonial-scroll" 
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {/* Summary Rating Card (Yellow) */}
          <div className="bg-[#fcd34d] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shrink-0 snap-center w-[85vw] sm:w-[320px] shadow-sm">
            <div>
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-emerald-950 text-emerald-950" />
                ))}
              </div>
              <div className="font-serif text-4xl font-bold text-emerald-950">4.9 Rating</div>
            </div>
            
            <div className="flex items-center gap-4 mt-12">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User 1" className="w-10 h-10 rounded-full border-2 border-[#fcd34d] object-cover" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User 2" className="w-10 h-10 rounded-full border-2 border-[#fcd34d] object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User 3" className="w-10 h-10 rounded-full border-2 border-[#fcd34d] object-cover" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-emerald-950 text-lg">15k+</div>
                <div className="text-[11px] text-emerald-950/80 font-medium">Trusted User</div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-950/5 shadow-sm flex flex-col justify-between shrink-0 snap-center w-[85vw] sm:w-[350px]"
            >
              <div>
                <span className="font-serif text-5xl text-[#fcd34d] leading-none h-8 block">"</span>
                <p className="text-sm text-emerald-950/80 leading-relaxed mt-2">
                  {t.text}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.couple)}&background=022c22&color=fcd34d`} alt={t.couple} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-emerald-950 truncate">{t.couple}</h4>
                  <span className="text-xs text-gray-500 block truncate">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button 
            onClick={() => {
              const el = document.getElementById('testimonial-scroll');
              if(el) el.scrollBy({ left: -350, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-950 hover:bg-gray-50 shadow-sm transition-colors active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('testimonial-scroll');
              if(el) el.scrollBy({ left: 350, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-emerald-950 hover:bg-gray-50 shadow-sm transition-colors active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
                href="https://wa.me/qr/XCPMCWREYZVOM1"
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

