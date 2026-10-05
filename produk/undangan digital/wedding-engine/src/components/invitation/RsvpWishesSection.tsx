'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, XCircle, HelpCircle, MessageSquareQuote, UserCheck, Heart } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';
import { WishMessage } from '@/types';

interface RsvpWishesSectionProps {
  title?: string;
  subtitle?: string;
}

const INITIAL_WISHES: WishMessage[] = [
  {
    id: '1',
    name: 'Dimas & Anisa',
    attendance: 'attending',
    guestCount: 2,
    message: 'Barakallahu lakum wa baraka alaikum! Selamat menempuh hidup baru Dion & Sarah, semoga senantiasa sakinah mawaddah warahmah.',
    createdAt: 'Baru saja',
  },
  {
    id: '2',
    name: 'Keluarga Besar dr. Bambang',
    attendance: 'attending',
    guestCount: 3,
    message: 'Selamat berbahagia untuk kedua mempelai. Semoga menjadi keluarga yang selalu diberkahi dan dipenuhi cinta hingga kakek nenek.',
    createdAt: '1 jam yang lalu',
  },
  {
    id: '3',
    name: 'Rian Pratama (Alumni SMA)',
    attendance: 'not-attending',
    guestCount: 1,
    message: 'Mohon maaf belum bisa hadir secara langsung karena sedang di luar kota. Doa terbaik selalu untuk kebahagiaan kalian berdua!',
    createdAt: '3 jam yang lalu',
  },
];

export function RsvpWishesSection({
  title = 'RSVP & Ucapan Doa',
  subtitle = 'Konfirmasi Kehadiran & Doa Restu',
}: RsvpWishesSectionProps) {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not-attending' | 'tentative'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_guest_wishes');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved wishes', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      message: message.trim(),
      createdAt: 'Baru saja',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#c9a86a', '#dfba73', '#eed8d4', '#688768'],
    });

    setSubmitted(true);
    setName('');
    setMessage('');
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            {title}
          </h2>
          <VintageDivider />
        </div>
      </ScrollReveal>

      {/* RSVP Form Card */}
      <ScrollReveal animation="fadeUp" delay={0.2}>
        <div className="p-6 sm:p-8 rounded-3xl bg-cream/90 backdrop-blur-md border border-gold/40 shadow-[0_10px_35px_rgba(100,75,60,0.15)] mb-12">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-sage-100 border border-sage-300 text-sage-700 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-vintage-900 font-semibold mb-1">
                Terima Kasih atas Konfirmasinya!
              </h3>
              <p className="font-serif italic text-sm text-vintage-700">
                Doa dan kehadiran Anda merupakan kehormatan serta kebahagiaan bagi kami.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 px-5 py-2 rounded-full bg-vintage-800 text-gold-light text-xs font-serif uppercase tracking-wider"
              >
                Kirim Ucapan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-vintage-700 mb-1.5 font-medium">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso & Keluarga"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-gold/40 text-vintage-900 placeholder:text-vintage-400 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm font-sans"
                />
              </div>

              {/* Attendance Selector */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-vintage-700 mb-1.5 font-medium">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'attending', label: 'Hadir', icon: CheckCircle2, color: 'text-emerald-700' },
                    { id: 'not-attending', label: 'Maaf Tidak Bisa', icon: XCircle, color: 'text-rose-700' },
                    { id: 'tentative', label: 'Masih Ragu', icon: HelpCircle, color: 'text-amber-700' },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = attendance === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAttendance(opt.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-sans flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-vintage-800 border-vintage-900 text-gold-light font-medium shadow-sm'
                            : 'bg-white/60 border-gold/30 text-vintage-700 hover:bg-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-gold' : opt.color}`} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-vintage-700 mb-1.5 font-medium">
                    Jumlah Tamu
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-9 h-9 rounded-lg bg-white border border-gold/40 text-vintage-900 font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-serif text-lg font-semibold text-vintage-900 px-3">
                      {guestCount} Orang
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(5, guestCount + 1))}
                      className="w-9 h-9 rounded-lg bg-white border border-gold/40 text-vintage-900 font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-vintage-700 mb-1.5 font-medium">
                  Ucapan & Doa Restu
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-gold/40 text-vintage-900 placeholder:text-vintage-400 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm font-sans resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-vintage-800 to-vintage-900 text-gold-light font-serif uppercase tracking-widest text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim RSVP & Ucapan</span>
              </button>
            </form>
          )}
        </div>
      </ScrollReveal>

      {/* Wishes Message Board */}
      <ScrollReveal animation="fadeUp" delay={0.3}>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="font-serif text-lg text-vintage-900 font-semibold flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-gold" />
              <span>Pesan & Doa ({wishes.length})</span>
            </h3>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-gold/20 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-serif font-bold text-vintage-900 text-sm">
                    {w.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium ${
                      w.attendance === 'attending'
                        ? 'bg-emerald-100 text-emerald-800'
                        : w.attendance === 'not-attending'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {w.attendance === 'attending'
                      ? `Hadir (${w.guestCount})`
                      : w.attendance === 'not-attending'
                      ? 'Tidak Hadir'
                      : 'Ragu'}
                  </span>
                </div>
                <p className="font-serif italic text-xs text-vintage-700 leading-relaxed">
                  &ldquo;{w.message}&rdquo;
                </p>
                <span className="block text-[10px] text-vintage-400 font-sans mt-2">
                  {w.createdAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
