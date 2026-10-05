import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Clock } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(invitationData.eventDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `The Wedding of ${invitationData.groom.name} & ${invitationData.bride.name}`
  )}&dates=20261128T010000Z/20261128T070000Z&details=${encodeURIComponent(
    `Pernikahan ${invitationData.groom.fullName} & ${invitationData.bride.fullName}`
  )}&location=${encodeURIComponent(invitationData.resepsi.location)}`;

  return (
    <section className="relative py-16 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#767D63]/15 text-[#51583D] text-xs font-semibold uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5 text-[#C2A676]" />
            <span>Save The Date</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Menghitung Hari
          </h2>
          <p className="text-xs text-[#686561] italic max-w-[300px] mx-auto">
            "Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami menanti hari bahagia."
          </p>
        </motion.div>

        {/* 4 Flip/Card Boxes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="grid grid-cols-4 gap-2.5 w-full mb-8"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-gradient-to-b from-white to-[#EEF0E9] border border-[#C2A676]/40 shadow-md flex flex-col items-center justify-center"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#51583D] tracking-wider">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#767D63] tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Calendar Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#51583D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-[#3D4730] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#C2A676]/40"
          >
            <CalendarPlus className="w-4 h-4 text-[#E8D8BA]" />
            <span>Simpan ke Google Calendar</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
