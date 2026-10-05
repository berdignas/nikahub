import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { BotanicalCornerDecor } from './BotanicalCornerDecor';
import { SideBotanicalVines } from './SideBotanicalVines';

export const CoupleSection: React.FC = () => {
  return (
    <section id="couple" className="relative py-18 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      {/* Background Floral Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url(./assets/VINT04-COUPLED-PII.webp)' }}
      />

      {/* Swaying Foliage Corners */}
      <BotanicalCornerDecor showTop={false} showBottom={true} showMid={true} />
      <SideBotanicalVines />

      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mb-10"
        >
          <span className="font-serif italic text-xs sm:text-sm text-[#767D63] tracking-[0.25em] uppercase block mb-1 font-semibold">
            Bride & Groom
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Mempelai Bahagia
          </h2>
          <p className="text-xs text-[#686561] leading-relaxed max-w-[320px] mx-auto">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i:
          </p>
          <div className="w-28 my-3 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, y: 65, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#C2A676]/40 shadow-xl flex flex-col items-center mb-8 relative"
        >
          {/* Arched Portrait Frame */}
          <div className="relative w-44 h-56 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C2A676] via-[#767D63] to-[#51583D] shadow-lg mb-5">
            <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden bg-[#FAF9F5]">
              <img
                src={invitationData.groom.photo}
                alt={invitationData.groom.fullName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Corner ornament */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FAF9F5] border-2 border-[#C2A676] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#51583D]" />
            </div>
          </div>

          {/* Groom Details */}
          <h3 className="font-serif text-2xl font-bold text-[#2C2B29] tracking-wide mb-1">
            {invitationData.groom.fullName}
          </h3>
          <p className="text-xs text-[#767D63] uppercase tracking-widest font-semibold mb-2">
            — {invitationData.groom.role} —
          </p>
          <p className="text-sm font-serif font-medium text-[#444241]">
            {invitationData.groom.father}
          </p>
          <p className="text-sm font-serif text-[#686561] mb-4">
            & {invitationData.groom.mother}
          </p>

          {/* Instagram Button */}
          <a
            href={`https://instagram.com/${invitationData.groom.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#51583D]/10 hover:bg-[#51583D] text-[#51583D] hover:text-[#FAF9F5] border border-[#767D63]/30 transition-all duration-300 text-xs font-medium"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@{invitationData.groom.instagram}</span>
          </a>
        </motion.div>

        {/* Romantic & Separator */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 100, delay: 0.3 }}
          className="w-12 h-12 rounded-full bg-[#51583D] border-2 border-[#C2A676] flex items-center justify-center text-[#E8D8BA] shadow-lg my-[-16px] z-20"
        >
          <Heart className="w-5 h-5 fill-[#E8D8BA]" />
        </motion.div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, y: 65, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#C2A676]/40 shadow-xl flex flex-col items-center mt-8 relative"
        >
          {/* Arched Portrait Frame */}
          <div className="relative w-44 h-56 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C2A676] via-[#767D63] to-[#51583D] shadow-lg mb-5">
            <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden bg-[#FAF9F5]">
              <img
                src={invitationData.bride.photo}
                alt={invitationData.bride.fullName}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Corner ornament */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FAF9F5] border-2 border-[#C2A676] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#51583D]" />
            </div>
          </div>

          {/* Bride Details */}
          <h3 className="font-serif text-2xl font-bold text-[#2C2B29] tracking-wide mb-1">
            {invitationData.bride.fullName}
          </h3>
          <p className="text-xs text-[#767D63] uppercase tracking-widest font-semibold mb-2">
            — {invitationData.bride.role} —
          </p>
          <p className="text-sm font-serif font-medium text-[#444241]">
            {invitationData.bride.father}
          </p>
          <p className="text-sm font-serif text-[#686561] mb-4">
            & {invitationData.bride.mother}
          </p>

          {/* Instagram Button */}
          <a
            href={`https://instagram.com/${invitationData.bride.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#51583D]/10 hover:bg-[#51583D] text-[#51583D] hover:text-[#FAF9F5] border border-[#767D63]/30 transition-all duration-300 text-xs font-medium"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@{invitationData.bride.instagram}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
