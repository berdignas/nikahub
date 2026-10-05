import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, XCircle, User, Sparkles, Heart, HeartHandshake } from 'lucide-react';
import { Wish } from '../data/invitationData';
import { SectionCard } from './SectionCard';

interface RsvpSectionProps {
  initialGuestName?: string;
}

const INITIAL_WISHES: (Wish & { likes?: number })[] = [
  {
    id: '1',
    name: 'Budi Sudarta & Keluarga',
    attendance: 'Hadir',
    message: 'Selamat untuk Dimas dan Sarah! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin ya rabbal alamin.',
    timestamp: 'Baru saja',
    likes: 12
  },
  {
    id: '2',
    name: 'Siti Rahma & Partner',
    attendance: 'Hadir',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Selamat menempuh lembaran hidup baru yang penuh berkah!',
    timestamp: '1 jam yang lalu',
    likes: 8
  },
  {
    id: '3',
    name: 'Rian Kurniawan',
    attendance: 'Tidak Hadir',
    message: 'Selamat saudaraku Dimas & Sarah! Mohon maaf belum bisa hadir langsung, doa terbaik selalu menyertai kalian berdua.',
    timestamp: '3 jam yang lalu',
    likes: 5
  }
];

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName = '' }) => {
  const [name, setName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir'>('Hadir');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<(Wish & { likes?: number })[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vintage_01_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(INITIAL_WISHES);
      }
    } else {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  useEffect(() => {
    if (initialGuestName) {
      setName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish & { likes?: number } = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      message: message.trim(),
      timestamp: 'Baru saja',
      likes: 1
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('vintage_01_wishes', JSON.stringify(updated));

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    const updated = wishes.map(w => {
      if (w.id === id) {
        return { ...w, likes: (w.likes || 0) + 1 };
      }
      return w;
    });
    setWishes(updated);
    localStorage.setItem('vintage_01_wishes', JSON.stringify(updated));
  };

  return (
    <SectionCard id="ucapan">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-4 py-1 rounded-full border border-[#E6DCCE]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>RSVP &amp; Wishes</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2 mb-2">
            Doa &amp; Ucapan Selamat
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light leading-relaxed">
            Berikan doa restu, harapan manis, dan ucapan hangat untuk mengiringi hari bahagia kami
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FAF6F0]/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-[#E6DCCE] shadow-md mb-10"
        >
          {submitted ? (
            <div className="text-center py-6">
              <Sparkles className="w-12 h-12 text-[#C5A059] mx-auto mb-3 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-[#8C6A43] mb-2">
                Terima Kasih Banyak!
              </h3>
              <p className="text-xs sm:text-sm text-[#66554B]">
                Ucapan &amp; doa restu Anda telah berhasil dikirimkan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nama Tamu */}
              <div>
                <label className="block text-xs font-bold text-[#3D312A] uppercase tracking-wider mb-2">
                  Nama Tamu *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C6A43] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap Anda..."
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-[#E6DCCE] focus:border-[#8C6A43] focus:ring-1 focus:ring-[#8C6A43] focus:outline-none text-xs sm:text-sm text-[#3D312A]"
                  />
                </div>
              </div>

              {/* Konfirmasi Kehadiran */}
              <div>
                <label className="block text-xs font-bold text-[#3D312A] uppercase tracking-wider mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('Hadir')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      attendance === 'Hadir'
                        ? 'bg-[#2FAE4F] text-white border-[#2FAE4F] shadow-md scale-[1.02]'
                        : 'bg-white text-[#66554B] border-[#E6DCCE] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('Tidak Hadir')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      attendance === 'Tidak Hadir'
                        ? 'bg-[#A65B49] text-white border-[#A65B49] shadow-md scale-[1.02]'
                        : 'bg-white text-[#66554B] border-[#E6DCCE] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Belum Bisa Hadir</span>
                  </button>
                </div>
              </div>

              {/* Ucapan Textarea */}
              <div>
                <label className="block text-xs font-bold text-[#3D312A] uppercase tracking-wider mb-2">
                  Ucapan &amp; Doa Restu *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa tulus Anda..."
                  className="w-full p-4 bg-white rounded-xl border border-[#E6DCCE] focus:border-[#8C6A43] focus:ring-1 focus:ring-[#8C6A43] focus:outline-none text-xs sm:text-sm text-[#3D312A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8C6A43] to-[#5C4033] hover:opacity-95 text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-gold transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan Ucapan</span>
              </button>

            </form>
          )}
        </motion.div>

        {/* Wishes List Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-[#3D312A] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#8C6A43]" />
              <span>Doa Restu Tamu ({wishes.length})</span>
            </h3>
            <span className="text-[11px] text-[#8C6A43] font-medium">Terbaru</span>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
            {wishes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[#E6DCCE] shadow-sm text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center font-bold text-xs text-[#8C6A43] shadow-sm">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-[#3D312A] block leading-tight">{item.name}</span>
                        <span className="text-[10px] text-[#8C6A43]">{item.timestamp}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white ${
                        item.attendance === 'Hadir' ? 'bg-[#2FAE4F]' : 'bg-[#A65B49]'
                      }`}
                    >
                      {item.attendance}
                    </span>
                  </div>

                  <p className="text-xs text-[#66554B] leading-relaxed font-light mt-2 mb-3 bg-[#FAF6F0]/60 p-3 rounded-xl">
                    "{item.message}"
                  </p>
                </div>

                {/* Like / Heart Reaction Button */}
                <div className="flex items-center justify-end pt-2 border-t border-[#E6DCCE]/50">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6A43] hover:text-red-500 bg-[#FAF6F0] hover:bg-red-50 px-3 py-1 rounded-full border border-[#E6DCCE] transition-colors active:scale-90"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span className="font-bold">{item.likes || 0}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </SectionCard>
  );
};
