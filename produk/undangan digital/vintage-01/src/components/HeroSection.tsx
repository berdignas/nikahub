import React from 'react';
import { motion } from 'framer-motion';
import { INVITATION_DATA } from '../data/invitationData';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 text-center overflow-hidden">
      {/* Botanical Decors */}
      <img 
        src="./images/flower.png" 
        alt="Floral decor top" 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 md:w-64 opacity-50 pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg w-full flex flex-col items-center"
      >
        {/* Monogram Circle */}
        <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mb-6 bg-white/80 shadow-sm relative">
          <span className="font-serif text-2xl font-bold text-[#8C6A43]">
            HA
          </span>
          <div className="absolute -inset-1 border border-[#8C6A43]/30 rounded-full pointer-events-none" />
        </div>

        <span className="text-xs uppercase tracking-[0.35em] text-[#8C6A43] font-semibold mb-2">
          Save The Date
        </span>
        
        <h2 className="font-script text-4xl sm:text-5xl text-[#3D312A] mb-2">
          The Wedding of
        </h2>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#8C6A43] tracking-wide mb-6">
          {INVITATION_DATA.groom.shortName} &amp; {INVITATION_DATA.bride.shortName}
        </h1>

        {/* Arch Photo Hero Frame */}
        <div className="relative w-56 h-72 arch-frame border-4 border-white shadow-vintage mb-8 p-1 bg-white">
          <img 
            src="./images/cover.jpg" 
            alt="Habib & Adiba Hero" 
            className="w-full h-full object-cover arch-frame"
          />
        </div>

        <div className="inline-block px-6 py-2 rounded-full border border-[#C5A059]/60 bg-white/60 backdrop-blur-sm text-[#3D312A] font-serif text-lg font-semibold tracking-widest shadow-sm">
          {INVITATION_DATA.dateDisplay}
        </div>
      </motion.div>
    </section>
  );
};
