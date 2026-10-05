import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const CoupleSection: React.FC = () => {
  return (
    <section id="mempelai" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8C6A43] mb-3">
            Assalamu'alaikum Wr. Wb.
          </h2>
          <p className="text-sm md:text-base text-[#66554B] leading-relaxed font-light">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami.
          </p>
        </motion.div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage hover:border-[#C5A059] transition-all"
          >
            <div className="relative w-44 h-56 arch-frame border-2 border-[#C5A059] p-1 bg-white mb-6 shadow-md">
              <img 
                src={INVITATION_DATA.groom.photo} 
                alt={INVITATION_DATA.groom.name} 
                className="w-full h-full object-cover arch-frame"
              />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#3D312A] mb-1">
              {INVITATION_DATA.groom.name}
            </h3>

            <p className="text-xs text-[#8C6A43] font-semibold uppercase tracking-wider mb-2">
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C5A059] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold tracking-wider transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{INVITATION_DATA.groom.instagram}</span>
            </a>
          </motion.div>

          {/* Ampersand Center Decor for Desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none z-10">
            <span className="font-script text-6xl text-[#C5A059] drop-shadow-sm bg-[#FAF6F0] px-3 rounded-full border border-[#E6DCCE]">
              &amp;
            </span>
          </div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage hover:border-[#C5A059] transition-all"
          >
            <div className="relative w-44 h-56 arch-frame border-2 border-[#C5A059] p-1 bg-white mb-6 shadow-md">
              <img 
                src={INVITATION_DATA.bride.photo} 
                alt={INVITATION_DATA.bride.name} 
                className="w-full h-full object-cover arch-frame"
              />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#3D312A] mb-1">
              {INVITATION_DATA.bride.name}
            </h3>

            <p className="text-xs text-[#8C6A43] font-semibold uppercase tracking-wider mb-2">
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C5A059] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold tracking-wider transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{INVITATION_DATA.bride.instagram}</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
