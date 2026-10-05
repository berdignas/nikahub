import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { BotanicalDivider } from './BotanicalFrame';

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(INVITATION_DATA.eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-14 pb-20 px-4 text-center overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-white to-[#F5EFE6]">
      
      {/* 1. Pristine High-Resolution Botanical Clusters (Top-Left & Top-Right) with Staggered Zoom-In */}
      <motion.img
        initial={{ opacity: 0, scale: 0.7, x: -30, y: -30 }}
        animate={{ opacity: 0.95, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        src="./images/bunga_top_left_clean.webp"
        alt="Botanical Top Left"
        className="absolute -top-2 -left-2 w-36 sm:w-52 md:w-64 opacity-95 pointer-events-none z-10 animate-sway-tl origin-top-left"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.7, x: 30, y: -30 }}
        animate={{ opacity: 0.95, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        src="./images/bunga_top_right_clean.webp"
        alt="Botanical Top Right"
        className="absolute -top-2 -right-2 w-36 sm:w-52 md:w-64 opacity-95 pointer-events-none z-10 animate-sway-tr origin-top-right"
      />

      {/* 2. Side Flanking Floating Botanical Sprigs */}
      <motion.img
        initial={{ opacity: 0, scale: 0.6, x: -20 }}
        animate={{ opacity: 0.85, scale: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        src="./images/bunga_mid_left_clean.webp"
        alt="Botanical Mid Left"
        className="hidden sm:block absolute top-1/3 -left-3 w-20 md:w-28 opacity-85 pointer-events-none z-10 animate-float-subtle"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.6, x: 20 }}
        animate={{ opacity: 0.85, scale: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.45, ease: "easeOut" }}
        src="./images/bunga_mid_right_clean.webp"
        alt="Botanical Mid Right"
        className="hidden sm:block absolute top-1/3 -right-3 w-20 md:w-28 opacity-85 pointer-events-none z-10 animate-float-subtle"
      />

      <div className="relative z-20 max-w-xl w-full flex flex-col items-center">
        
        {/* Monogram Circle with Spring Motion & Spinning Orbit */}
        <motion.div 
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mb-5 bg-white/95 shadow-xl relative group mt-2"
        >
          <span className="font-serif text-2xl font-bold text-[#8C6A43] group-hover:scale-110 transition-transform">
            HA
          </span>
          <div className="absolute -inset-1.5 border border-[#8C6A43]/40 rounded-full pointer-events-none animate-spin-slow" />
        </motion.div>

        {/* Save The Date Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 bg-white/90 px-5 py-1.5 rounded-full border border-[#E6DCCE] shadow-md mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#8C6A43] font-bold">
            The Wedding of
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.div>
        
        {/* Groom & Bride Names */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.5 }}
          className="font-serif text-4xl sm:text-6xl font-bold text-[#8C6A43] tracking-wide mb-6 drop-shadow-sm"
        >
          {INVITATION_DATA.groom.shortName} <span className="text-[#C5A059] font-script text-5xl sm:text-7xl font-normal">&amp;</span> {INVITATION_DATA.bride.shortName}
        </motion.h1>

        {/* Arch Photo Hero Frame with Golden Filigree & Zoom Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 sm:w-72 h-80 sm:h-96 arch-frame border-4 border-white shadow-2xl mb-8 p-1.5 bg-white group"
        >
          <img 
            src="./images/cover.jpg" 
            alt="Habib & Adiba Hero" 
            className="w-full h-full object-cover arch-frame group-hover:scale-105 transition-transform duration-700"
          />
          <img 
            src="./images/frame.png" 
            alt="Decor frame" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-90"
          />

          {/* Floating Heart Badge */}
          <div className="absolute -top-4 -right-4 bg-white/95 p-2.5 rounded-full border border-[#C5A059] shadow-lg animate-butterfly">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
        </motion.div>

        {/* Subtitle Message */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs sm:text-sm text-[#66554B] max-w-md italic mb-6 px-4 font-light"
        >
          Kami berharap Anda menjadi bagian dari hari bahagia &amp; momen istimewa kami.
        </motion.p>

        {/* Hero Countdown Timer Boxes with Cascade Motion */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full mb-8 px-2"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
              className="bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border-2 border-[#E6DCCE] shadow-lg flex flex-col items-center justify-center hover:border-[#C5A059] transition-all transform hover:scale-105"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C6A43]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#66554B] mt-0.5">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Date Display Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="inline-block px-8 py-2.5 rounded-full border-2 border-[#C5A059] bg-white/95 backdrop-blur-md text-[#3D312A] font-serif text-xl font-bold tracking-widest shadow-lg hover:border-[#8C6A43] transition-all mb-4"
        >
          {INVITATION_DATA.dateDisplay}
        </motion.div>

        <BotanicalDivider />
      </div>

      {/* 3. Bottom Left & Bottom Right Botanical Wreaths (No Cutoffs) */}
      <motion.img
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 0.9, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        src="./images/bunga_bottom_left_clean.webp"
        alt="Botanical Bottom Left"
        className="absolute -bottom-2 -left-2 w-32 sm:w-44 md:w-56 opacity-90 pointer-events-none z-10 animate-sway-bl origin-bottom-left"
      />
      <motion.img
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 0.9, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.65, ease: "easeOut" }}
        src="./images/bunga_bottom_right_clean.webp"
        alt="Botanical Bottom Right"
        className="absolute -bottom-2 -right-2 w-32 sm:w-44 md:w-56 opacity-90 pointer-events-none z-10 animate-sway-br origin-bottom-right"
      />
    </section>
  );
};
