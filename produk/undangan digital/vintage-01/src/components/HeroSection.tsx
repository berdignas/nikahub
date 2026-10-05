import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { BotanicalDivider } from './BotanicalFrame';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 text-center overflow-hidden">
      {/* Real Botanical Vector Leaf Corners */}
      <img
        src="./images/bunga_top_left.webp"
        alt="Top Left Leaf"
        className="absolute top-0 left-0 w-32 sm:w-44 md:w-52 opacity-80 pointer-events-none z-10 animate-sway"
      />
      <img
        src="./images/bunga_top_right.webp"
        alt="Top Right Leaf"
        className="absolute top-0 right-0 w-32 sm:w-44 md:w-52 opacity-80 pointer-events-none z-10 animate-sway-reverse"
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-lg w-full flex flex-col items-center"
      >
        {/* Monogram Circle with Spring Animation */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mb-6 bg-white/90 shadow-lg relative group"
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
          className="text-xs uppercase tracking-[0.35em] text-[#8C6A43] font-bold mb-2 flex items-center gap-1 bg-white/80 px-4 py-1 rounded-full border border-[#E6DCCE] shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Save The Date</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </motion.span>
        
        {/* Title "The Wedding of" */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-script text-5xl sm:text-6xl text-[#3D312A] mb-2 drop-shadow-sm"
        >
          The Wedding of
        </motion.h2>

        {/* Groom & Bride Names */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.6 }}
          className="font-serif text-4xl sm:text-5xl font-bold text-[#8C6A43] tracking-wide mb-4 drop-shadow"
        >
          {INVITATION_DATA.groom.shortName} &amp; {INVITATION_DATA.bride.shortName}
        </motion.h1>

        {/* Arch Photo Hero Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="relative w-60 h-76 arch-frame border-4 border-white shadow-2xl mb-6 p-1.5 bg-white group"
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
          <div className="absolute -top-4 -right-4 bg-white/90 p-2 rounded-full border border-[#C5A059] shadow-md animate-butterfly">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
        </motion.div>

        {/* Date Display Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="inline-block px-8 py-2.5 rounded-full border border-[#C5A059] bg-white/90 backdrop-blur-md text-[#3D312A] font-serif text-xl font-bold tracking-widest shadow-md hover:border-[#8C6A43] transition-all mb-4"
        >
          {INVITATION_DATA.dateDisplay}
        </motion.div>

        <BotanicalDivider />
      </motion.div>
    </section>
  );
};
