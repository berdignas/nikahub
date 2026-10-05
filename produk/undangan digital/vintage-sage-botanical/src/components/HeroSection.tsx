import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { BotanicalCornerDecor } from './BotanicalCornerDecor';
import { SideBotanicalVines } from './SideBotanicalVines';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col items-center justify-between text-center p-6 pt-10 pb-16 overflow-hidden bg-[#FAF9F5]">
      {/* Background Floral Texture */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-30 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url(./assets/VINT04-COVER-PII.webp)' }}
      />

      {/* Swaying Corner Foliage & Branches */}
      <BotanicalCornerDecor showTop={true} showBottom={true} showMid={false} />

      {/* Side Vines */}
      <SideBotanicalVines />

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 14, stiffness: 100 }}
        className="relative z-10 pt-2"
      >
        <span className="font-serif italic text-xs sm:text-sm text-[#767D63] tracking-[0.25em] uppercase block mb-1 font-medium">
          Walimatul ‘Ursy
        </span>
        <div className="w-12 h-[1.5px] bg-[#C2A676] mx-auto" />
      </motion.div>

      {/* Main Arch Frame with Monogram & Names */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-[360px] w-full">
        {/* Arched Monogram Badge */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 0.2 }}
          className="relative w-44 h-56 rounded-t-[100px] rounded-b-2xl border-2 border-[#C2A676]/60 p-2 shadow-2xl bg-gradient-to-b from-[#FAF9F5] to-[#EEF0E9] mb-5 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Inner decorative arch */}
          <div className="w-full h-full rounded-t-[92px] rounded-b-xl border border-[#767D63]/30 flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
            <span className="font-serif text-5xl font-bold text-[#51583D] tracking-widest">
              {invitationData.monogram}
            </span>
            <span className="font-script text-2xl text-[#C2A676] mt-1">
              forever in love
            </span>
          </div>

          {/* Corner gold dots */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#C2A676]" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#C2A676]" />
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-serif italic text-xs text-[#767D63] tracking-widest uppercase mb-1"
        >
          The Wedding of
        </motion.p>

        {/* Groom & Bride Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 14, stiffness: 90, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl font-normal text-[#2C2B29] leading-tight mb-2"
        >
          <span className="italic block">{invitationData.groom.name}</span>
          <span className="font-script text-3xl text-[#C2A676] block my-[-6px]">&</span>
          <span className="italic block">{invitationData.bride.name}</span>
        </motion.h2>

        {/* Ornamental Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-36 my-2.5 opacity-80"
        >
          <img
            src="./assets/G2-ornamen.png"
            alt="Divider"
            className="w-full h-auto mx-auto filter brightness-95"
          />
        </motion.div>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#51583D]/10 border border-[#C2A676]/40 text-[#51583D] text-xs font-semibold tracking-wider mt-2 shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C2A676]" />
          <span>{invitationData.eventDateFormatted}</span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-1.5 mt-4"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#767D63] font-medium">
          Gulir Kebawah
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-4 h-7 rounded-full border border-[#767D63]/50 flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#C2A676]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
