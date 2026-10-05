import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Calendar, Clock, MapPin, PlusCircle } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 text-center overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-white to-[#F5EFE6]">
      
      {/* Top Left & Top Right Botanical Wreaths */}
      <img
        src="./images/bunga_top_left.webp"
        alt="Top Left Leaf"
        className="absolute top-0 left-0 w-36 sm:w-52 md:w-64 opacity-90 pointer-events-none z-10 animate-sway"
      />
      <img
        src="./images/bunga_top_right.webp"
        alt="Top Right Leaf"
        className="absolute top-0 right-0 w-36 sm:w-52 md:w-64 opacity-90 pointer-events-none z-10 animate-sway-reverse"
      />

      {/* Center Top Floral Crown Accent */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <img
          src="./images/bunga_leaf_center.webp"
          alt="Top Center Floral Crown"
          className="w-28 sm:w-36 opacity-85 filter drop-shadow-sm animate-pulse"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 max-w-xl w-full flex flex-col items-center"
      >
        {/* Monogram Circle with Spring Animation */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mb-6 bg-white/90 shadow-xl relative group"
        >
          <span className="font-serif text-2xl font-bold text-[#8C6A43] group-hover:scale-110 transition-transform">
            HA
          </span>
          <div className="absolute -inset-1.5 border border-[#8C6A43]/40 rounded-full pointer-events-none animate-spin-slow" />
        </motion.div>

        {/* Save The Date Pill */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xs uppercase tracking-[0.35em] text-[#8C6A43] font-bold mb-2 flex items-center gap-1.5 bg-white/90 px-5 py-1.5 rounded-full border border-[#E6DCCE] shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>The Wedding of</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.span>
        
        {/* Groom & Bride Names */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.5 }}
          className="font-serif text-4xl sm:text-6xl font-bold text-[#8C6A43] tracking-wide mb-6 drop-shadow"
        >
          {INVITATION_DATA.groom.shortName} &amp; {INVITATION_DATA.bride.shortName}
        </motion.h1>

        {/* Arch Photo Hero Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative w-64 h-80 arch-frame border-4 border-white shadow-2xl mb-8 p-1.5 bg-white group"
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

          {/* Floating Butterfly Badge */}
          <div className="absolute -top-4 -right-4 bg-white/90 p-2.5 rounded-full border border-[#C5A059] shadow-lg animate-butterfly">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
        </motion.div>

        {/* Subtitle Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs sm:text-sm text-[#66554B] max-w-md italic mb-6 px-4"
        >
          Kami berharap Anda menjadi bagian dari hari bahagia &amp; momen istimewa kami.
        </motion.p>

        {/* Hero Countdown Timer Boxes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm w-full mb-8 px-2"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border-2 border-[#E6DCCE] shadow-lg flex flex-col items-center justify-center hover:border-[#C5A059] transition-all transform hover:scale-105"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C6A43]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#66554B] mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Date Display Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="inline-block px-8 py-2.5 rounded-full border-2 border-[#C5A059] bg-white/95 backdrop-blur-md text-[#3D312A] font-serif text-xl font-bold tracking-widest shadow-lg hover:border-[#8C6A43] transition-all mb-4"
        >
          {INVITATION_DATA.dateDisplay}
        </motion.div>

        <BotanicalDivider />
      </motion.div>

      {/* Bottom Left & Bottom Right Botanical Wreaths */}
      <img
        src="./images/bunga_bottom_left.webp"
        alt="Bottom Left Leaf"
        className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-56 opacity-90 pointer-events-none z-10 animate-sway-reverse"
      />
      <img
        src="./images/bunga_bottom_right.webp"
        alt="Bottom Right Leaf"
        className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-56 opacity-90 pointer-events-none z-10 animate-sway"
      />
    </section>
  );
};
