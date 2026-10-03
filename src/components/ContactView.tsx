import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  UserCheck, 
  Coffee, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactView: React.FC = () => {
  // Appointment Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingType, setMeetingType] = useState('Food Tasting Eksklusif (Free 2 Pax)');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestEstimate, setGuestEstimate] = useState('500');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQ_ITEMS = [
    {
      q: "Apakah saya harus berkoordinasi lagi dengan pihak penyedia tenda atau katering terpisah?",
      a: "Sama sekali tidak. NikaHub menerapkan sistem Satu Pintu Layanan (Single Point of Contact). Anda hanya berkomunikasi dengan 1 Dedicated Project Director resmi dari NikaHub yang akan memimpin seluruh teknisi lapangan, chef katering, dan kru dekorasi sampai acara selesai."
    },
    {
      q: "Kapan instalasi tenda dan panggung dipastikan selesai di lokasi?",
      a: "Standar garansi NikaHub adalah H-1 pukul 14.00 WIB seluruh instalasi tenda, pendingin AC/misty fan, panggung, dan tata lampu sudah 100% siap untuk sesi gladi resik keluarga."
    },
    {
      q: "Apakah ada sesi Food Tasting sebelum kami menandatangani kontrak?",
      a: "Tentu. Kami menyediakan sesi Food Tasting privat untuk 2 orang calon pengantin di Executive Lounge kami secara cuma-cuma setelah konsultasi konsep awal dilakukan."
    },
    {
      q: "Bagaimana sistem pembayaran dan keamanan kontrak di NikaHub?",
      a: "Kerja sama diikat dengan Surat Perjanjian Kerja (SPK) resmi bermaterai yang melindungi hak kedua belah pihak. Pembayaran dilakukan secara bertahap (Termin DP, Termin H-30, dan Pelunasan H-7) melalui rekening resmi perusahaan."
    }
  ];

  const CONSULTANTS = [
    {
      name: "Dita Arisanti",
      role: "Senior Wedding Planner",
      desc: "Berpengalaman menangani 180+ konsep pernikahan adat & modern.",
      wa: "6281234567891"
    },
    {
      name: "Dimas Pratama",
      role: "Lead Technical & Production",
      desc: "Ahli tata ruang tenda VIP, struktur panggung, dan kelistrikan aman.",
      wa: "6281234567892"
    },
    {
      name: "Sarah Amelia",
      role: "Culinary & Guest Experience",
      desc: "Kurator jamuan katering nusantara, western, & live cooking stations.",
      wa: "6281234567893"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    const text = `Halo NikaHub Wedding,%0ANama: ${encodeURIComponent(name)}%0ANo WhatsApp: ${encodeURIComponent(phone)}%0AJenis Temu: ${encodeURIComponent(meetingType)}%0ARencana Tanggal: ${encodeURIComponent(preferredDate || '-')}%0AEstimasi Tamu: ${encodeURIComponent(guestEstimate)} pax%0ACatatan: ${encodeURIComponent(notes || '-')}`;
    
    window.open(`https://wa.me/qr/XCPMCWREYZVOM1`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-20 text-emerald-950">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/5 text-emerald-900 text-[10px] uppercase tracking-widest font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
          <span>Executive Consultation & Atelier</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight mb-4">
          Wujudkan Momen Sakral Bersama Tim Ahli NikaHub
        </h1>
        <p className="text-sm sm:text-base text-emerald-950/70 leading-relaxed max-w-2xl mx-auto">
          Mulai langkah bahagia Anda dengan berdiskusi santai di Private Lounge kami, mencicipi menu katering istimewa, atau berkonsultasi langsung via WhatsApp.
        </p>
      </div>

      {/* 2. Tentang Atelier NikaHub (Peleburan "Tentang Kami") */}
      <div className="bg-emerald-950 text-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-widest font-bold text-champagne-300 block">
              Tentang NikaHub Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-snug">
              Rumah Produksi Pernikahan Terpadu: Satu Standar, Tanpa Kompromi
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              NikaHub didirikan dengan satu komitmen mendasar: <strong>menghilangkan stres calon pengantin dalam menyatukan berbagai kebutuhan acara</strong>. Kami mengurasi, mengoordinasi, dan mengawasi setiap elemen—dari arsitektur tenda maroko berkelas hingga kelezatan hidangan prasmanan—di bawah satu kendali standar mutu yang ketat.
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              Dengan NikaHub, Anda tidak perlu menghadapi kekacauan komunikasi antar vendor. Satu Project Director kami bertanggung jawab penuh dari penandatanganan kontrak hingga gladi resik H-1 selesai sempurna.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
              <div>
                <span className="font-serif text-2xl font-bold text-champagne-300 block">480+</span>
                <span className="text-[11px] text-white/60">Pernikahan Sukses</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-champagne-300 block">100%</span>
                <span className="text-[11px] text-white/60">On-Time H-1 Ready</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-champagne-300 block">1 Pintu</span>
                <span className="text-[11px] text-white/60">Komunikasi Resmi</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md border border-white/15 space-y-4">
            <h3 className="font-serif font-bold text-xl text-champagne-300">4 Langkah Kerja Sama Resmi</h3>
            <ul className="space-y-3.5 text-xs text-white/80">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div>
                  <strong className="text-white block">Konsultasi Konsep & Tasting</strong>
                  Diskusi gratis mengenai kapasitas, denah tenda, dan cicip menu.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <div>
                  <strong className="text-white block">Penerbitan Kontrak & SPK Resmi</strong>
                  Surat Perjanjian Kerja berkekuatan hukum dengan spesifikasi transparan.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <div>
                  <strong className="text-white block">Supervisi Lapangan Terpusat</strong>
                  Tim NikaHub mengawal pemasangan perlengkapan tanpa merepotkan keluarga.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                <div>
                  <strong className="text-white block">Serah Terima Siap H-1</strong>
                  Gladi resik nyaman pada H-1 siang hari sebelum hari bahagia.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Form Reservasi Konsultasi & Food Tasting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Office & Lounge Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-[2rem] bg-white border border-emerald-950/10 shadow-lg space-y-6">
            <h3 className="font-serif text-2xl font-bold text-emerald-950">
              Galeri & Lounge Atelier
            </h3>
            
            <div className="space-y-5 text-xs text-emerald-950/80">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 text-sm mb-0.5">Alamat Executive Lounge:</strong>
                  Jl. Kemang Raya No. 42B, Bangka, Mampang Prapatan, Jakarta Selatan 12730
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 text-sm mb-0.5">Concierge WhatsApp:</strong>
                  +62 812-3456-7890 (Respon Cepat 24 Jam)
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 text-sm mb-0.5">Korespondensi Resmi:</strong>
                  concierge@nikahub.id
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 text-sm mb-0.5">Jam Operasional Lounge:</strong>
                  Senin - Minggu: 08.30 - 21.00 WIB (Berdasarkan Reservasi)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href="https://wa.me/qr/XCPMCWREYZVOM1"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-full bg-emerald-950 hover:bg-emerald-900 text-sand font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-champagne-400" />
                <span>Chat Concierge via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-champagne-50 border border-champagne-200 text-xs text-emerald-950 space-y-2">
            <span className="font-serif font-bold text-sm text-emerald-950 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-champagne-700" />
              Sesi Food Tasting Eksklusif
            </span>
            <p className="text-emerald-950/75 leading-relaxed text-[11px]">
              Nikmati hidangan contoh prasmanan katering langsung di lounge kami secara privat. Kami menyajikan 5 menu utama dan dessert pilihan untuk memastikan selera keluarga Anda terpuaskan.
            </p>
          </div>
        </div>

        {/* Right: Interactive Booking Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-[2rem] bg-white border border-emerald-950/10 shadow-xl">
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-emerald-950 mb-1">
              Jadwalkan Konsultasi & Food Tasting
            </h3>
            <p className="text-xs text-emerald-950/70">
              Pilih tanggal yang nyaman untuk berdiskusi konsep pernikahan dan mencicipi menu katering.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h4 className="font-serif font-bold text-emerald-950 text-xl">Reservasi Diterima!</h4>
              <p className="text-xs text-emerald-900/80 leading-relaxed max-w-md mx-auto">
                Terima kasih, data Anda telah terhubung ke WhatsApp Concierge kami. Tim konsultan NikaHub akan segera mengonfirmasi jadwal temu Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-emerald-950 mb-1.5">Nama Calon Pengantin / Keluarga *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Rian & Nisa"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-emerald-950 mb-1.5">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-emerald-950 mb-1.5">Agenda Pertemuan yang Diinginkan</label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-white cursor-pointer"
                  >
                    <option value="Food Tasting Eksklusif (Free 2 Pax)">Food Tasting Eksklusif (Free 2 Pax)</option>
                    <option value="Konsultasi Konsep Privat di Lounge">Konsultasi Konsep Privat di Lounge</option>
                    <option value="Konsultasi Online via Zoom Video">Konsultasi Online via Zoom Video</option>
                    <option value="Survey Ukur Lokasi & Kelayakan Teknis">Survey Ukur Lokasi & Kelayakan Teknis</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-emerald-950 mb-1.5">Pilihan Tanggal Rencana Temu</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-emerald-950 mb-1.5">Estimasi Jumlah Tamu Undangan</label>
                <select
                  value={guestEstimate}
                  onChange={(e) => setGuestEstimate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-white cursor-pointer"
                >
                  <option value="300">300 Undangan (Intimate Reception)</option>
                  <option value="500">500 Undangan (Medium Standard)</option>
                  <option value="800">800 Undangan (Large Ballroom/Outdoor)</option>
                  <option value="1200+">1.200+ Undangan (Grand Royal Celebration)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-emerald-950 mb-1.5">Catatan Tambahan / Konsep Impian</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ceritakan rencana lokasi (misal: halaman rumah, gedung aula), tema favorit, atau kebutuhan spesifik..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-950"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Konfirmasi Jadwal via WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>

      {/* 4. Profil Konsultan Resmi NikaHub */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
            Personalisasi Layanan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            Tim Wedding Specialist NikaHub
          </h2>
          <p className="text-xs sm:text-sm text-emerald-950/70 mt-2">
            Anda dapat langsung menyapa konsultan spesifik kami sesuai dengan fokus kebutuhan acara Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONSULTANTS.map((cons, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-emerald-950/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-sand font-serif font-bold text-base flex items-center justify-center shrink-0">
                  {cons.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-emerald-950">{cons.name}</h4>
                  <span className="text-[11px] font-bold text-champagne-700 block">{cons.role}</span>
                </div>
              </div>
              <p className="text-xs text-emerald-950/70 mb-5 leading-relaxed">
                {cons.desc}
              </p>
              <a
                href={`https://wa.me/${cons.wa}?text=Halo%20${encodeURIComponent(cons.name)},%20saya%20ingin%20konsultasi%20pernikahan`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full border border-emerald-950/20 hover:bg-emerald-950 hover:text-white text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat dengan {cons.name.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Smart FAQ Accordion */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-emerald-950/10 shadow-md">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
            FAQ Resmi
          </span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-emerald-950/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-emerald-950 flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-950/5 transition-colors"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-950 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-emerald-950/50 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-emerald-950/75 leading-relaxed border-t border-emerald-950/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

