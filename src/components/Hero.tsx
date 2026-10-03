import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ShieldCheck, MapPin, Calendar, Users, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenConsultation }) => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glow & radial gradient */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-b from-champagne-200/40 via-champagne-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Eyebrow Micro-pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-emerald-950/5 border border-emerald-950/10 text-emerald-900 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold text-center">
            <Sparkles className="w-3 h-3 text-champagne-500 shrink-0" />
            <span>Koleksi Eksklusif Musim Pernikahan 2026 / 2027</span>
          </div>
        </motion.div>

        {/* Massive Editorial Typography Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-10"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-emerald-950 leading-tight sm:leading-[1.08] mb-4 sm:mb-6">
            Merangkai Setiap Detail, <br className="hidden sm:inline" />
            <span className="italic font-normal text-champagne-600"> Menyempurnakan</span> Hari Bahagia.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-emerald-950/70 max-w-2xl mx-auto leading-relaxed font-sans px-2">
            Kurasi terpadu sewa tenda transparan royal, jamuan catering bintang lima, riasan gaun couture, dan venue intim dalam satu pintu bergaransi resmi.
          </p>
        </motion.div>

        {/* Nested CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto"
        >
          {/* Primary CTA */}
          <button 
            onClick={onExploreClick}
            className="group flex items-center justify-center gap-3 pl-6 pr-2 py-3 sm:py-2 rounded-full bg-emerald-950 text-sand shadow-bezel border border-emerald-900 hover:bg-emerald-900 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="font-medium text-xs sm:text-sm md:text-base">Jelajahi Katalog Layanan</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sand/10 group-hover:bg-champagne-400 group-hover:text-emerald-950 flex items-center justify-center transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>

          {/* Secondary Outline Pill */}
          <button 
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-emerald-950 border border-emerald-950/15 text-xs sm:text-sm md:text-base font-medium shadow-xs transition-all hover:border-emerald-950/30 active:scale-[0.98] text-center cursor-pointer"
          >
            Konsultasi Rencana Acara
          </button>
        </motion.div>

        {/* Double-Bezel Showcase Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-1.5 sm:p-3 rounded-3xl sm:rounded-[2.5rem] bg-white/60 backdrop-blur-md border border-white/80 shadow-2xl"
        >
          <div className="relative rounded-[calc(1.5rem-0.375rem)] sm:rounded-[calc(2.5rem-0.75rem)] overflow-hidden bg-emerald-950 aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[520px]">
            {/* High-res backdrop image */}
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85" 
              alt="Luxury Wedding Setup" 
              className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent" />

            {/* Info Badges inside image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
              <div className="max-w-md">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-champagne-400 text-emerald-950 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1.5 sm:mb-2 inline-block">
                  Atelier Showcase 2026
                </span>
                <h3 className="font-serif text-lg sm:text-2xl text-sand font-medium leading-snug">
                  The Bohemian Botanical Glass Pavilion
                </h3>
                <p className="text-sand/80 text-xs sm:text-sm font-sans mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
                  Kombinasi tenda transparan ber-AC, florist segar, dan tata cahaya chandelier mewah.
                </p>
              </div>

              {/* Fast stats pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-emerald-950/80 backdrop-blur-md border border-white/10 text-sand text-[10px] sm:text-xs w-full sm:w-auto">
                <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                  <span>Garansi NikaHub</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/5">
                  <Award className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                  <span>500+ Pasangan</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Filter Bar Floating Below Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 max-w-4xl mx-auto p-2 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-xl border border-champagne-200/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-950"
        >
          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-champagne-200/60">
            <MapPin className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <p className="text-[9px] sm:text-[10px] text-emerald-950/50 uppercase font-semibold">Wilayah Layanan</p>
              <p className="font-medium text-xs sm:text-sm text-emerald-950">Jabodetabek & Bandung</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-champagne-200/60">
            <Calendar className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <p className="text-[9px] sm:text-[10px] text-emerald-950/50 uppercase font-semibold">Tahun Rencana Acara</p>
              <p className="font-medium text-xs sm:text-sm text-emerald-950">2026 - 2027 (Slot Open)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto">
            <Users className="w-4 h-4 text-champagne-600 shrink-0" />
            <div>
              <p className="text-[9px] sm:text-[10px] text-emerald-950/50 uppercase font-semibold">Estimasi Undangan</p>
              <p className="font-medium text-xs sm:text-sm text-emerald-950">Intimate (200) - Gala (1000+)</p>
            </div>
          </div>

          <button 
            onClick={onExploreClick}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 transition-colors font-medium text-xs whitespace-nowrap text-center cursor-pointer active:scale-98"
          >
            Filter Katalog
          </button>
        </motion.div>

      </div>
    </section>
  );
};
