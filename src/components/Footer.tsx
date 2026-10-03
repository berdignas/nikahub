import React, { useState } from 'react';
import { Sparkles, Phone, Instagram, Facebook, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 45,
      origin: { y: 0.85 }
    });
  };

  return (
    <footer id="hubungi-kami" className="bg-emerald-950 text-sand pt-20 pb-12 border-t border-emerald-900/60 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-champagne-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Reassurance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 border-b border-emerald-900/80">
          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-champagne-400/10 flex items-center justify-center text-champagne-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-sand">Kurasi Vendor Terverifikasi</h4>
              <p className="text-xs text-sand/60 mt-1">Setiap mitra katering & tenda melewati proses uji kualitas & standarisasi berkala.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-champagne-400/10 flex items-center justify-center text-champagne-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-sand">Garansi Ketepatan Waktu</h4>
              <p className="text-xs text-sand/60 mt-1">Instalasi panggung & dekorasi dipastikan rampung H-1 sebelum acara resepsi dimulai.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800/40">
            <div className="w-10 h-10 rounded-full bg-champagne-400/10 flex items-center justify-center text-champagne-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-sand">Satu Konsultan Pendamping</h4>
              <p className="text-xs text-sand/60 mt-1">Satu wedding planner berdedikasi menemani dari survey awal hingga selesainya pesta.</p>
            </div>
          </div>
        </div>

        {/* Newsletter & Brand Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-emerald-900/80">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-champagne-400" />
              <span className="font-serif tracking-widest text-lg uppercase font-bold text-sand">NikaHub</span>
              <span className="text-xs tracking-wider text-champagne-300 font-sans font-light">Atelier Wedding</span>
            </div>
            <p className="text-xs sm:text-sm text-sand/70 leading-relaxed font-sans max-w-sm">
              Platform katalog digital & persewaan perlengkapan pernikahan terintegrasi di Indonesia. Menghubungkan calon mempelai dengan vendor pernikahan terbaik secara transparan.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-champagne-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-sand/80">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-champagne-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-sand/80">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/qr/XCPMCWREYZVOM1" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-champagne-400 hover:text-emerald-950 flex items-center justify-center transition-colors text-sand/80">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3 text-xs">
            <h5 className="font-semibold text-sand uppercase tracking-wider text-[11px] mb-3">Layanan Kami</h5>
            <ul className="space-y-2 text-sand/70">
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Sewa Tenda Plafon & VIP</a></li>
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Catering Nusantara & Western</a></li>
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Rias Pengantin MUA & Busana</a></li>
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Dokumentasi 4K & Drone</a></li>
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Venue Kaca & Outdoor</a></li>
              <li><a href="#katalog-section" className="hover:text-champagne-300 transition-colors">Akustik Resepsi & MC</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-semibold text-sand uppercase tracking-wider text-[11px]">Buku Panduan Pernikahan 2026</h5>
            <p className="text-xs text-sand/70 leading-relaxed">
              Daftarkan email Anda untuk menerima panduan timeline persiapan nikah, estimasi budget per pax, serta inspirasi tren dekorasi terbaru.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-champagne-400/20 border border-champagne-400/40 text-champagne-300 text-xs">
                âœ“ Terima kasih! Panduan pernikahan telah dikirim ke email Anda.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda..."
                  className="px-4 py-2.5 rounded-full bg-white/10 border border-emerald-800 text-xs text-sand placeholder:text-sand/40 focus:outline-none focus:ring-2 focus:ring-champagne-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-champagne-400 text-emerald-950 font-semibold text-xs hover:bg-champagne-300 transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Daftar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand/50 gap-4 font-sans">
          <p>Â© 2026 NikaHub Wedding Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sand transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-sand transition-colors">Kebijakan Privasi Klien</a>
            <a href="#" className="hover:text-sand transition-colors">Pendaftaran Mitra Vendor</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

