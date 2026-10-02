import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  CheckCircle2, 
  MessageCircle, 
  Users, 
  Sparkles, 
  CalendarCheck, 
  Clock,
  ThumbsUp,
  Share2,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA } from '../data/invitationData';
import { fetchWishesFromSheet, submitWishToSheet } from '../services/googleSheets';

interface Wish {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guestsCount: string;
  message: string;
  date: string;
  likes: number;
  avatarColor: string;
}

const AVATAR_COLORS = [
  'bg-emerald-600',
  'bg-rose-500',
  'bg-amber-600',
  'bg-indigo-600',
  'bg-teal-600',
  'bg-purple-600',
  'bg-yellow-600'
];

const DEFAULT_WISHES: Wish[] = [];

const QUICK_WISHES = [
  "Barakallahu laka wa baraka alaika 🤲",
  "Semoga Samawa & Bahagia Selalu! 💍",
  "Selamat menempuh hidup baru Alfarisyi & Maulidiyah! 💐",
  "Semoga lancar barokah sampai hari H! 🕊️"
];

export const RsvpSection: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [guestsCount, setGuestsCount] = useState<string>('2 Orang');
  const [message, setMessage] = useState<string>('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'hadir'>('all');
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);

  // Mengambil ucapan dari Google Sheets secara real-time
  const loadWishesFromSheets = async () => {
    setIsLoadingSheet(true);
    try {
      const sheetData = await fetchWishesFromSheet();
      setWishes(sheetData || []);
    } catch (e) {
      setWishes([]);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  useEffect(() => {
    loadWishesFromSheets();

    const savedLikes = localStorage.getItem('royal_wedding_likes_183');
    if (savedLikes) {
      try {
        setUserLikedIds(JSON.parse(savedLikes));
      } catch (e) {
        setUserLikedIds([]);
      }
    }
  }, []);

  const handleLike = (id: string) => {
    if (userLikedIds.includes(id)) return;

    const updatedLikes = [...userLikedIds, id];
    setUserLikedIds(updatedLikes);
    localStorage.setItem('royal_wedding_likes_183', JSON.stringify(updatedLikes));

    const updatedWishes = wishes.map(w => {
      if (w.id === id) {
        return { ...w, likes: w.likes + 1 };
      }
      return w;
    });

    setWishes(updatedWishes);
    localStorage.setItem('royal_wedding_wishes_183_v2', JSON.stringify(updatedWishes));

    // Little heart confetti
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#E65C7B', '#FFD166', '#52B788']
    });
  };

  const handleQuickWish = (text: string) => {
    if (!message) {
      setMessage(text);
    } else {
      setMessage(`${message} ${text}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Joyful celebration confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E65C7B', '#52B788', '#FFD166', '#F8F6E1']
    });

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'hadir' ? guestsCount : '0 Orang',
      message: message.trim(),
      date: 'Baru saja',
      likes: 1,
      avatarColor: randomColor
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('royal_wedding_wishes_183_v2', JSON.stringify(updated));

    // Kirim data ke Google Sheets
    await submitWishToSheet({
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'hadir' ? guestsCount : '0 Orang',
      message: message.trim()
    });

    // Kirim konfirmasi via WhatsApp
    const statusText = attendance === 'hadir' ? `Hadir (${guestsCount})` : 'Berhalangan Hadir';
    const waText = `Halo Maulidiyah & Alfarisyi,\n\nSaya telah mengisi konfirmasi kehadiran pernikahan Anda:\n🌸 Nama: ${name}\n✨ Status: ${statusText}\n💌 Doa Restu: "${message}"\n\nTerima kasih atas undangannya!`;
    
    const waUrl = `https://api.whatsapp.com/send?phone=${INVITATION_DATA.whatsappNumber}&text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    setIsSuccess(true);
    setName('');
    setMessage('');
    setIsSubmitting(false);
    setTimeout(() => setIsSuccess(false), 6000);
  };

  const filteredWishes = filter === 'all' 
    ? wishes 
    : wishes.filter(w => w.attendance === 'hadir');

  return (
    <section 
      id="rsvp" 
      className="relative min-h-[1100px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center py-16 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.resepsiLandscapeBg})` }}
    >
      {/* 1. Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[#b8c4ae]/88 pointer-events-none"></div>

      {/* 2. Animated Blooming Foliage & Waving Roses */}
      <div className="absolute top-8 -left-16 w-56 pointer-events-none z-10 opacity-90">
        <img src={THEME_ASSETS.foliageGif1} alt="Waving Rose Bouquet" className="w-full object-contain" />
      </div>
      <div className="absolute top-10 -right-16 w-56 pointer-events-none z-10 opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif2} alt="Swaying Leaves" className="w-full object-contain" />
      </div>

      {/* 3. Fluttering Butterflies & Flying Bird */}
      <div className="absolute top-72 right-3 w-16 pointer-events-none z-20">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>
      <div className="absolute top-[520px] left-3 w-16 pointer-events-none z-20 transform -scale-x-100">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>
      <div className="absolute top-44 left-3 w-20 pointer-events-none z-20">
        <img src={THEME_ASSETS.birdGif} alt="Bird" className="w-full object-contain" />
      </div>

      {/* 4. Section Content */}
      <div className="w-full max-w-sm relative z-20 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
            <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#685c46] font-semibold">
              RSVP & Warm Wishes
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
          </div>

          <h2 className="font-aston text-4xl sm:text-5xl text-[#473c27] mt-1 mb-2">
            Buku Tamu & Doa
          </h2>

          <p className="font-roman text-sm text-[#473c27] italic max-w-xs mx-auto px-2">
            "Untaian doa restu dan konfirmasi kehadiran Anda merupakan lentera kebahagiaan bagi langkah awal hidup baru kami."
          </p>
          <div className="w-24 h-[1px] bg-[#685c46]/40 mx-auto mt-4"></div>
        </motion.div>

        {/* 5. RSVP & Wish Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full viding-card rounded-[32px] p-6 border-2 border-[#685c46]/35 shadow-2xl text-left mb-8 relative backdrop-blur-md"
        >
          {/* Card Gold Trim Accent */}
          <div className="flex items-center justify-between border-b border-[#685c46]/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#685c46]" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#473c27] tracking-wider uppercase">
                Konfirmasi Kehadiran
              </h3>
            </div>
            <span className="text-[10px] font-cinzel text-[#685c46] tracking-widest bg-[#f8f6e1] px-2.5 py-0.5 rounded-full border border-[#685c46]/20">
              RSVP Form
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="block font-cinzel text-[11px] text-[#473c27] font-bold tracking-wider mb-1.5">
                Nama Tamu / Keluarga <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bpk. Bambang & Keluarga"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f8f6e1] border border-[#685c46]/30 font-roman text-sm text-[#473c27] placeholder:text-[#685c46]/50 focus:outline-none focus:border-[#473c27] focus:ring-1 focus:ring-[#473c27] shadow-inner transition-all"
              />
            </div>

            {/* Attendance Choice Buttons */}
            <div>
              <label className="block font-cinzel text-[11px] text-[#473c27] font-bold tracking-wider mb-1.5">
                Konfirmasi Kehadiran <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAttendance('hadir')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    attendance === 'hadir'
                      ? 'bg-[#473c27] text-[#f8f6e1] border-[#473c27] shadow-md ring-2 ring-[#685c46]/40'
                      : 'bg-[#f8f6e1]/80 text-[#473c27] border-[#685c46]/30 hover:bg-[#f8f6e1]'
                  }`}
                >
                  <span className="text-sm">🌸</span>
                  <span className="font-cinzel tracking-wider text-[11px]">Insya Allah Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('tidak_hadir')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    attendance === 'tidak_hadir'
                      ? 'bg-[#473c27] text-[#f8f6e1] border-[#473c27] shadow-md ring-2 ring-[#685c46]/40'
                      : 'bg-[#f8f6e1]/80 text-[#473c27] border-[#685c46]/30 hover:bg-[#f8f6e1]'
                  }`}
                >
                  <span className="text-sm">💌</span>
                  <span className="font-cinzel tracking-wider text-[11px]">Berhalangan</span>
                </button>
              </div>
            </div>

            {/* Guest Count (only if hadir) */}
            {attendance === 'hadir' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block font-cinzel text-[11px] text-[#473c27] font-bold tracking-wider mb-1.5">
                  Jumlah Tamu yang Hadir
                </label>
                <div className="relative">
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f8f6e1] border border-[#685c46]/30 font-roman text-sm text-[#473c27] focus:outline-none focus:border-[#473c27] shadow-inner transition-all appearance-none cursor-pointer"
                  >
                    <option value="1 Orang">1 Orang</option>
                    <option value="2 Orang">2 Orang (Pasangan)</option>
                    <option value="3 Orang">3 Orang</option>
                    <option value="4 Orang">4 Orang</option>
                    <option value="Keluarga Besar">Keluarga Besar</option>
                  </select>
                  <Users className="w-4 h-4 text-[#685c46] absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </motion.div>
            )}

            {/* Quick Wish Buttons */}
            <div>
              <label className="block font-cinzel text-[10px] text-[#685c46] font-semibold tracking-wider mb-1.5 uppercase">
                Pilih Doa Cepat (Klik untuk menyisipkan):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_WISHES.map((qw, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickWish(qw)}
                    className="text-[10px] font-roman italic bg-[#ece5da] hover:bg-[#e4dcce] text-[#473c27] px-2.5 py-1 rounded-full border border-[#685c46]/20 transition-all text-left"
                  >
                    {qw}
                  </button>
                ))}
              </div>
            </div>

            {/* Wish Message */}
            <div>
              <label className="block font-cinzel text-[11px] text-[#473c27] font-bold tracking-wider mb-1.5">
                Untaian Doa & Pesan <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan ucapan selamat, harapan, dan doa restu Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f8f6e1] border border-[#685c46]/30 font-roman text-sm text-[#473c27] placeholder:text-[#685c46]/50 focus:outline-none focus:border-[#473c27] focus:ring-1 focus:ring-[#473c27] shadow-inner transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="viding-btn w-full py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 group disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 text-[#685c46] animate-spin" />
                  <span className="font-cinzel tracking-wider uppercase">Menyimpan Doa ke Google Sheets...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-[#685c46] group-hover:scale-110 transition-transform" />
                  <span className="font-cinzel tracking-wider uppercase">Kirim RSVP & Doa (Google Sheets)</span>
                  <Send className="w-3.5 h-3.5 text-[#685c46] ml-1" />
                </>
              )}
            </button>

            {/* Success Feedback */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-roman text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Alhamdulillah, doa Anda telah tercatat di Google Sheets & diteruskan ke mempelai!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* 6. Live Wishes Feed Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full viding-card rounded-[32px] p-5 sm:p-6 border-2 border-[#685c46]/35 shadow-2xl text-left backdrop-blur-md"
        >
          {/* Header & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#685c46]/20 pb-3 mb-4 gap-2">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#685c46]" />
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#473c27] tracking-wider uppercase">
                  Untaian Doa ({wishes.length})
                </h4>
              </div>
              <button
                onClick={loadWishesFromSheets}
                disabled={isLoadingSheet}
                title="Muat ulang dari Google Sheets"
                className="p-1.5 rounded-full text-[#685c46] hover:bg-[#685c46]/10 transition-colors flex items-center gap-1 text-[10px] font-cinzel"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`text-[10px] font-cinzel px-2.5 py-1 rounded-full border transition-all ${
                  filter === 'all'
                    ? 'bg-[#473c27] text-[#f8f6e1] border-[#473c27]'
                    : 'bg-[#f8f6e1] text-[#685c46] border-[#685c46]/30'
                }`}
              >
                Semua ({wishes.length})
              </button>
              <button
                onClick={() => setFilter('hadir')}
                className={`text-[10px] font-cinzel px-2.5 py-1 rounded-full border transition-all ${
                  filter === 'hadir'
                    ? 'bg-[#473c27] text-[#f8f6e1] border-[#473c27]'
                    : 'bg-[#f8f6e1] text-[#685c46] border-[#685c46]/30'
                }`}
              >
                Hadir ({wishes.filter(w => w.attendance === 'hadir').length})
              </button>
            </div>
          </div>

          {/* Scrollable Wishes Feed */}
          <div className="max-h-[380px] overflow-y-auto space-y-3.5 pr-1 no-scrollbar">
            {filteredWishes.length === 0 ? (
              <div className="py-8 px-4 text-center">
                <Heart className="w-8 h-8 text-[#685c46]/40 mx-auto mb-2 animate-pulse" />
                <p className="font-cinzel text-xs text-[#473c27] font-semibold uppercase tracking-wider">
                  Belum ada doa restu
                </p>
                <p className="font-roman text-xs text-[#685c46] italic mt-1">
                  Jadilah yang pertama memberikan ucapan & doa untuk Alfarisyi & Maulidiyah!
                </p>
              </div>
            ) : (
              filteredWishes.map((w) => {
                const isLiked = userLikedIds.includes(w.id);
                return (
                  <div
                    key={w.id}
                    className="p-4 rounded-2xl bg-[#f8f6e1]/90 border border-[#685c46]/25 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    {/* Top row: Avatar + Name + Attendance Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${w.avatarColor || 'bg-emerald-600'} text-[#f8f6e1] font-cinzel font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0`}>
                          {w.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="font-cinzel text-xs font-bold text-[#473c27] leading-tight">
                            {w.name}
                          </h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-2.5 h-2.5 text-[#685c46]/60" />
                            <span className="text-[10px] font-roman text-[#685c46] italic">
                              {w.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Attendance Pill */}
                      <span className={`text-[9px] font-cinzel font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        w.attendance === 'hadir'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        {w.attendance === 'hadir' ? `🌸 Hadir • ${w.guestsCount}` : '💌 Berhalangan'}
                      </span>
                    </div>

                    {/* Prayer Message */}
                    <p className="font-roman text-xs sm:text-[13px] text-[#473c27] italic leading-relaxed pl-10 pr-1">
                      "{w.message}"
                    </p>

                    {/* Reaction / Aamiin Button */}
                    <div className="flex items-center justify-end mt-2 pt-2 border-t border-[#685c46]/10">
                      <button
                        type="button"
                        onClick={() => handleLike(w.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-cinzel transition-all ${
                          isLiked 
                            ? 'bg-rose-100 text-rose-700 font-bold border border-rose-300' 
                            : 'bg-[#ece5da] text-[#685c46] hover:bg-rose-50 hover:text-rose-600 border border-[#685c46]/20'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#685c46]'}`} />
                        <span>{isLiked ? 'Aamiin ❤️' : 'Aamiin'}</span>
                        <span className="text-[10px] opacity-80">({w.likes})</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Royal Peacock Pair Emblem */}
        <RoyalPeacockPair className="max-w-[240px] mt-10 mb-4" />
      </div>

      {/* 7. Bottom Scalloped Divider */}
      <div className="relative z-30 w-full mt-auto">
        <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
      </div>

    </section>
  );
};
