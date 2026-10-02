import React from 'react';
import { Sparkles, ShieldCheck, Award, CheckCircle2, Building, Truck, Clock } from 'lucide-react';

interface AboutViewProps {
  onNavigateToCatalog: () => void;
  onNavigateToContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToCatalog,
  onNavigateToContact
}) => {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/5 text-emerald-900 text-[10px] uppercase tracking-widest font-semibold mb-3">
          <Sparkles className="w-3 h-3 text-champagne-500" />
          <span>Profil Perusahaan</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-emerald-950">
          Tentang NikaHub Wedding
        </h1>
        <p className="text-sm sm:text-base text-emerald-950/70 mt-3 leading-relaxed">
          Penyedia resmi persewaan perlengkapan pernikahan, tenda VIP, katering higienis, dan busana bridal terpadu dengan standar kualitas kelas satu.
        </p>
      </div>

      {/* Direct Owner Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-[2.5rem] border border-champagne-200">
        <div className="space-y-4 text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
          <h3 className="font-serif text-2xl font-bold text-emerald-950">
            Dedikasi & Fasilitas Kami
          </h3>
          <p>
            NikaHub Wedding didirikan untuk memberikan kepastian dan ketenangan penuh bagi para calon mempelai. Kami mengoperasikan workshop konstruksi tenda mandiri, dapur katering bersertifikasi resmi, studio rias busana bridal, dan armada logistik internal.
          </p>
          <p>
            Dengan mengelola seluruh inventaris dan kru secara langsung tanpa pihak ketiga, kami mampu menjamin ketepatan waktu instalasi H-1, standar cita rasa makanan yang konsisten, serta efisiensi biaya sewa bagi Anda.
          </p>
          <div className="pt-2 flex flex-col gap-2 font-medium text-emerald-950 text-xs">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600" /> Inventaris Tenda & Dekorasi Lengkap Milik Sendiri
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600" /> Central Kitchen Higienis Berstandar Sertifikasi Pangan
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600" /> Kru Teknisi & Koordinator Tetap Lapangan NikaHub
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-emerald-950">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80" 
            alt="Atelier Team" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3 Keunggulan Langsung */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-champagne-200">
          <Building className="w-8 h-8 text-champagne-600 mb-3" />
          <h4 className="font-bold text-emerald-950 text-base mb-1">Armada Milik Sendiri</h4>
          <p className="text-xs text-emerald-950/70 leading-relaxed">
            Peralatan terawat prima, selalu dibersihkan dan dicek kelaikannya secara berkala di gudang logistik kami.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-champagne-200">
          <Clock className="w-8 h-8 text-champagne-600 mb-3" />
          <h4 className="font-bold text-emerald-950 text-base mb-1">Pasti Tepat Waktu</h4>
          <p className="text-xs text-emerald-950/70 leading-relaxed">
            Instalasi tenda dan panggung selesai maksimal H-1 agar Anda dan keluarga dapat gladi resik dengan tenang.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-champagne-200">
          <ShieldCheck className="w-8 h-8 text-champagne-600 mb-3" />
          <h4 className="font-bold text-emerald-950 text-base mb-1">Kontrak Sewa Resmi</h4>
          <p className="text-xs text-emerald-950/70 leading-relaxed">
            Perlindungan hukum jelas dengan surat perjanjian sewa resmi, rincian biaya transparan, dan jaminan kepuasan.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-emerald-950 text-sand text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold">Wujudkan Pernikahan Megah Bersama NikaHub</h3>
        <p className="text-xs sm:text-sm text-sand/70 max-w-lg mx-auto">
          Konsultasikan kebutuhan tenda, catering, dan dekorasi Anda langsung dengan tim perencana kami.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-2.5 rounded-full bg-champagne-400 text-emerald-950 font-semibold text-xs hover:bg-champagne-300 transition-colors"
          >
            Lihat Katalog Sewa
          </button>
          <button
            onClick={onNavigateToContact}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sand font-semibold text-xs transition-colors"
          >
            Hubungi Kami
          </button>
        </div>
      </div>

    </div>
  );
};
