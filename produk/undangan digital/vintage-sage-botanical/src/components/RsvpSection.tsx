import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommentItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir';
  guests: number;
  message: string;
  time: string;
}

export const RsvpSection: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [guests, setGuests] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initial Seed Comments
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: '1',
      name: 'Mimin Syifa',
      attendance: 'hadir',
      guests: 2,
      message: 'Barakallahu lakum wa baraka alaikum. Selamat menempuh hidup baru Rian & Nadia, semoga sakinah mawaddah warahmah! 🤍',
      time: 'Baru saja',
    },
    {
      id: '2',
      name: 'Budi Santoso & Keluarga',
      attendance: 'hadir',
      guests: 2,
      message: 'Selamat berbahagia untuk kedua mempelai dan keluarga besar. Semoga dilancarkan sampai hari H!',
      time: '2 jam yang lalu',
    },
    {
      id: '3',
      name: 'Amanda Pramita',
      attendance: 'hadir',
      guests: 1,
      message: 'Happy wedding Nadia & Rian! Lancar-lancar acaranya yaa. Can’t wait to celebrate with you guys! ✨',
      time: '5 jam yang lalu',
    },
    {
      id: '4',
      name: 'Dimas Kurniawan',
      attendance: 'tidak_hadir',
      guests: 0,
      message: 'Mohon maaf belum bisa hadir secara langsung karena sedang bertugas di luar kota. Doa terbaik untuk kalian berdua! 🙏',
      time: '1 hari yang lalu',
    },
  ]);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nikahhub_rsvp_vintage_sage');
      if (saved) {
        setComments(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newComment: CommentItem = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guests: attendance === 'hadir' ? guests : 0,
      message: message.trim(),
      time: 'Baru saja',
    };

    setTimeout(() => {
      const updated = [newComment, ...comments];
      setComments(updated);
      try {
        localStorage.setItem('nikahhub_rsvp_vintage_sage', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setMessage('');

      // Confetti celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#767D63', '#C2A676', '#51583D', '#FAF9F5'],
        });
      } catch {
        // ignore
      }

      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  const totalHadir = comments.filter((c) => c.attendance === 'hadir').length;
  const totalUcapan = comments.length;

  return (
    <section id="rsvp" className="relative py-18 px-6 bg-[#EEF0E9] text-center overflow-hidden">
      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#767D63]/15 text-[#51583D] text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#C2A676]" />
            <span>RSVP & Guestbook</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Ucapan & Doa Restu
          </h2>
          <p className="text-xs text-[#686561] leading-relaxed max-w-[300px] mx-auto">
            Konfirmasi kehadiran serta untaian doa dan harapan Anda sangat bermakna bagi kami.
          </p>
          <div className="w-24 my-2.5 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Stats Pills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6 w-full"
        >
          <div className="flex-1 py-2 px-4 rounded-2xl bg-white/85 border border-[#C2A676]/35 shadow-sm text-center">
            <p className="text-[10px] uppercase tracking-wider text-[#767D63] font-medium">
              Konfirmasi Hadir
            </p>
            <p className="font-serif text-xl font-bold text-[#51583D]">{totalHadir} Tamu</p>
          </div>
          <div className="flex-1 py-2 px-4 rounded-2xl bg-white/85 border border-[#C2A676]/35 shadow-sm text-center">
            <p className="text-[10px] uppercase tracking-wider text-[#767D63] font-medium">
              Total Ucapan
            </p>
            <p className="font-serif text-xl font-bold text-[#51583D]">{totalUcapan} Doa</p>
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 45, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-full p-6 rounded-3xl bg-[#FAF9F5] border border-[#C2A676]/45 shadow-xl text-left mb-8 space-y-4"
        >
          {/* Input Name */}
          <div>
            <label className="block text-xs font-semibold text-[#51583D] mb-1.5 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-2.5 rounded-xl border border-[#C2A676]/50 bg-white text-xs text-[#2C2B29] focus:outline-none focus:ring-2 focus:ring-[#767D63]/50 transition-all"
            />
          </div>

          {/* Attendance Radio */}
          <div>
            <label className="block text-xs font-semibold text-[#51583D] mb-1.5 uppercase tracking-wider">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  attendance === 'hadir'
                    ? 'bg-[#51583D] text-white border-[#51583D] shadow'
                    : 'bg-white text-[#686561] border-[#C2A676]/40 hover:bg-[#FAF9F5]'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  attendance === 'tidak_hadir'
                    ? 'bg-[#686561] text-white border-[#686561] shadow'
                    : 'bg-white text-[#686561] border-[#C2A676]/40 hover:bg-[#FAF9F5]'
                }`}
              >
                <span>Tidak Hadir</span>
              </button>
            </div>
          </div>

          {/* Number of Guests (if hadir) */}
          {attendance === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-xs font-semibold text-[#51583D] mb-1.5 uppercase tracking-wider">
                Jumlah Tamu
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#C2A676]/50 bg-white text-xs text-[#2C2B29] focus:outline-none focus:ring-2 focus:ring-[#767D63]/50 transition-all"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </motion.div>
          )}

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-semibold text-[#51583D] mb-1.5 uppercase tracking-wider">
              Ucapan & Doa Restu
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#C2A676]/50 bg-white text-xs text-[#2C2B29] focus:outline-none focus:ring-2 focus:ring-[#767D63]/50 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#51583D] via-[#65744F] to-[#51583D] text-[#FAF9F5] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 border border-[#C2A676]/40"
          >
            {isSubmitting ? (
              <span>Mengirimkan...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#E8D8BA]" />
                <span>Kirim Ucapan & Konfirmasi</span>
              </>
            )}
          </button>

          {/* Success alert */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium text-center border border-emerald-300"
              >
                Terima kasih! Ucapan & konfirmasi Anda berhasil terkirim.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Live Guestbook List */}
        <div className="w-full space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {comments.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="p-4 rounded-2xl bg-white/95 border border-[#C2A676]/35 shadow-sm text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#51583D]/15 text-[#51583D] flex items-center justify-center font-bold text-xs font-serif">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#2C2B29]">
                      {item.name}
                    </h5>
                    <p className="text-[10px] text-[#8C867A]">{item.time}</p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.attendance === 'hadir'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {item.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                </span>
              </div>

              <p className="text-xs text-[#444241] leading-relaxed pl-10 font-light">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
