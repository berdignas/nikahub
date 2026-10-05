import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const CoupleSection: React.FC = () => {
  return (
    <section id="mempelai" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1 bg-white/80 px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Mempelai Pengantin</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8C6A43] mb-3">
            Assalamu'alaikum Wr. Wb.
          </h2>
          <p className="text-sm md:text-base text-[#66554B] leading-relaxed font-light">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami.
          </p>
        </motion.div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">
          
          {/* Groom Card (Slide in from Left on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="flex flex-col items-center bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage hover:border-[#C5A059] hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="relative w-48 h-60 arch-frame border-2 border-[#C5A059] p-1 bg-white mb-6 shadow-md">
              <img 
                src={INVITATION_DATA.groom.photo} 
                alt={INVITATION_DATA.groom.name} 
                className="w-full h-full object-cover arch-frame group-hover:scale-105 transition-transform duration-700"
              />
              <img 
                src="./images/frame.png" 
                alt="Frame" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-85"
              />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#3D312A] mb-1">
              {INVITATION_DATA.groom.name}
            </h3>

            <p className="text-xs text-[#8C6A43] font-bold uppercase tracking-wider mb-2">
              {INVITATION_DATA.groom.childRank}
            </p>

            <div className="text-sm text-[#66554B] mb-6 font-light space-y-0.5">
              <p>{INVITATION_DATA.groom.father}</p>
              <p>&amp; {INVITATION_DATA.groom.mother}</p>
            </div>

            <a
              href={INVITATION_DATA.groom.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A059] bg-[#FAF6F0] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold tracking-wider transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>{INVITATION_DATA.groom.instagram}</span>
            </a>
          </motion.div>

          {/* Ampersand Center Decor Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="my-2 md:my-0 flex items-center justify-center"
          >
            <span className="font-script text-5xl sm:text-6xl text-[#C5A059] drop-shadow-md bg-white px-4 py-1 rounded-full border-2 border-[#C5A059] shadow-lg animate-pulse">
              &amp;
            </span>
          </motion.div>

          {/* Bride Card (Slide in from Right on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="flex flex-col items-center bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage hover:border-[#C5A059] hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="relative w-48 h-60 arch-frame border-2 border-[#C5A059] p-1 bg-white mb-6 shadow-md">
              <img 
                src={INVITATION_DATA.bride.photo} 
                alt={INVITATION_DATA.bride.name} 
                className="w-full h-full object-cover arch-frame group-hover:scale-105 transition-transform duration-700"
              />
              <img 
                src="./images/frame.png" 
                alt="Frame" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-85"
              />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#3D312A] mb-1">
              {INVITATION_DATA.bride.name}
            </h3>

            <p className="text-xs text-[#8C6A43] font-bold uppercase tracking-wider mb-2">
              {INVITATION_DATA.bride.childRank}
            </p>

            <div className="text-sm text-[#66554B] mb-6 font-light space-y-0.5">
              <p>{INVITATION_DATA.bride.father}</p>
              <p>&amp; {INVITATION_DATA.bride.mother}</p>
            </div>

            <a
              href={INVITATION_DATA.bride.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A059] bg-[#FAF6F0] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold tracking-wider transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>{INVITATION_DATA.bride.instagram}</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
