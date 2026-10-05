import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, XCircle, User, Sparkles } from 'lucide-react';
import { Wish } from '../data/invitationData';

interface RsvpSectionProps {
  initialGuestName?: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Budi Sudarta & Keluarga',
    attendance: 'Hadir',
    message: 'Selamat untuk Habib dan Adiba! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.',
    timestamp: 'Baru saja'
  },
  {
    id: '2',
    name: 'Siti Rahma',
    attendance: 'Hadir',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Selamat menempuh hidup baru!',
    timestamp: '1 jam yang lalu'
  },
  {
    id: '3',
    name: 'Dimas Kurniawan',
    attendance: 'Tidak Hadir',
    message: 'Selamat wahai saudaraku Habib! Mohon maaf belum bisa hadir secara langsung, doa terbaik selalu menyertai kalian.',
    timestamp: '3 jam yang lalu'
  }
];

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName = '' }) => {
  const [name, setName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState<'Hadir' | 'Tidak Hadir'>('Hadir');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
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

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      message: message.trim(),
      timestamp: 'Baru saja'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('vintage_01_wishes', JSON.stringify(updated));

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="ucapan" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            RSVP &amp; Wishes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mb-3">
            Ucapkan Sesuatu
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light">
            Berikan Ucapan &amp; Doa Restu untuk kedua mempelai
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-3xl border border-[#E6DCCE] shadow-vintage mb-12"
        >
          {submitted ? (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-[#C5A059] mx-auto mb-3 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-[#8C6A43] mb-2">
                Terima Kasih!
              </h3>
              <p className="text-xs sm:text-sm text-[#66554B]">
                Ucapan &amp; Doa restu Anda berhasil dikirim dan tersimpan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nama Tamu */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Nama Anda *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C6A43] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full pl-11 pr-4 py-3 bg-[#FAF6F0] rounded-xl border border-[#E6DCCE] focus:border-[#8C6A43] focus:outline-none text-sm text-[#3D312A]"
                  />
                </div>
              </div>

              {/* Konfirmasi Kehadiran */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Konfirmasi Kehadiran ?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttendance('Hadir')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      attendance === 'Hadir'
                        ? 'bg-[#2FAE4F] text-white border-[#2FAE4F] shadow-md'
                        : 'bg-[#FAF6F0] text-[#66554B] border-[#E6DCCE]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hadir</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('Tidak Hadir')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      attendance === 'Tidak Hadir'
                        ? 'bg-[#F20D16] text-white border-[#F20D16] shadow-md'
                        : 'bg-[#FAF6F0] text-[#66554B] border-[#E6DCCE]'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Tidak Hadir</span>
                  </button>
                </div>
              </div>

              {/* Ucapan Textarea */}
              <div>
                <label className="block text-xs font-semibold text-[#3D312A] uppercase tracking-wider mb-2">
                  Ucapan &amp; Doa Restu *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda di sini..."
                  className="w-full p-4 bg-[#FAF6F0] rounded-xl border border-[#E6DCCE] focus:border-[#8C6A43] focus:outline-none text-sm text-[#3D312A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#8C6A43] hover:bg-[#5C4033] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Ucapan</span>
              </button>

            </form>
          )}
        </motion.div>

        {/* Wishes List Feed */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#3D312A] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#8C6A43]" />
            <span>Doa Restu Tamu ({wishes.length})</span>
          </h3>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[#E6DCCE] shadow-sm text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#3D312A]">{item.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${
                        item.attendance === 'Hadir' ? 'bg-[#2FAE4F]' : 'bg-[#F20D16]'
                      }`}
                    >
                      {item.attendance}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C6A43]">{item.timestamp}</span>
                </div>
                <p className="text-xs text-[#66554B] leading-relaxed font-light">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
