import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { INVITATION_DATA } from '../data/invitationData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(INVITATION_DATA.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ];

  return (
    <section className="relative min-h-[720px] flex flex-col justify-between items-center text-center overflow-hidden bg-[#b8c4ae] py-12 px-4">
      
      {/* 1. Castle Portrait Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-85">
        <img
          src={THEME_ASSETS.castlePortrait}
          alt="Castle Landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Foliage & Sunburst Behind Countdown */}
      <div className="absolute top-24 -left-20 w-60 z-10 pointer-events-none opacity-80">
        <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
      </div>
      <div className="absolute top-16 -right-16 w-56 z-10 pointer-events-none opacity-90 transform -rotate-12">
        <img src={THEME_ASSETS.foliageGif2} alt="Foliage" className="w-full object-contain" />
      </div>

      {/* 3. Central Countdown Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 w-full max-w-sm my-auto p-6 sm:p-8 rounded-[36px] viding-card border border-[#685c46]/40 shadow-xl text-center"
      >
        <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#685c46] font-semibold">
          Count The Days
        </p>
        <h3 className="font-aston text-3xl sm:text-4xl text-[#473c27] mt-1 mb-1">
          Save The Date
        </h3>
        <p className="font-roman text-sm text-[#685c46] italic mb-6">
          {INVITATION_DATA.dateFormatted}
        </p>

        {/* 4 Elegant Number Boxes */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#ece5da] border border-[#685c46]/30 shadow-sm"
            >
              <span className="font-cinzel text-2xl font-bold text-[#473c27]">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[9px] text-[#685c46] uppercase tracking-wider mt-0.5 font-semibold">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href={INVITATION_DATA.events[0].calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="viding-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-[#685c46]" />
          <span>Tambahkan ke Kalender</span>
        </a>
      </motion.div>

      {/* Bottom Scalloped Divider */}
      <div className="relative z-30 w-full mt-auto">
        <img
          src={THEME_ASSETS.scallopDivider}
          alt="Scallop Divider"
          className="w-full object-cover h-14 -mb-1"
        />
      </div>

    </section>
  );
};
