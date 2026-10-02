import React from 'react';
import { motion } from 'framer-motion';
import { THEME_ASSETS } from '../data/themeAssets';
import { PeacockFeather, RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA } from '../data/invitationData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const CoupleSection: React.FC = () => {
  return (
    <section 
      id="couple" 
      className="relative min-h-[1100px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center py-16 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.couplePalaceBg})` }}
    >
      {/* Dark & Muted Overlay to Enhance Readability */}
      <div className="absolute inset-0 bg-[#b8c4ae]/85 pointer-events-none"></div>

      {/* Decorative Tree Branches on Left and Right */}
      <div className="absolute top-10 -left-20 w-60 z-10 pointer-events-none opacity-80">
        <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
      </div>
      <div className="absolute top-12 -right-20 w-60 z-10 pointer-events-none opacity-80 transform -scale-x-100">
        <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
      </div>

      <div className="relative z-20 w-full max-w-sm flex flex-col items-center space-y-10 my-auto">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#685c46] font-semibold">
            The Royal Couple
          </p>
          <h2 className="font-aston text-4xl sm:text-5xl text-[#473c27] mt-1 mb-2">
            Mempelai
          </h2>
          <div className="w-20 h-[1px] bg-[#685c46]/30 mx-auto mt-2"></div>
        </motion.div>

        {/* 1. Mempelai Pria (Groom) */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full flex flex-col items-center"
        >
          {/* Animated Foliage & Butterfly Around Groom */}
          <div className="absolute -top-8 -right-8 w-40 pointer-events-none z-10 opacity-90">
            <img src={THEME_ASSETS.foliageGif3} alt="Floral Gif" className="w-full object-contain" />
          </div>
          <div className="absolute top-8 -left-6 w-16 pointer-events-none z-20">
            <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
          </div>

          {/* Royal Card for Groom Name */}
          <div className="viding-card rounded-[32px] p-7 border-2 border-[#685c46]/35 shadow-xl w-full text-center relative overflow-hidden backdrop-blur-sm">
            {/* Gold Leaf Accent at Top */}
            <div className="w-16 mx-auto mb-2 opacity-85">
              <img src={THEME_ASSETS.goldLeafBranch} alt="Gold Leaves" className="w-full object-contain" />
            </div>

            {/* Monogram Seal */}
            <div className="w-12 h-12 rounded-full border border-[#685c46]/40 mx-auto mb-3 flex items-center justify-center bg-[#f8f6e1]/80 shadow-sm">
              <span className="font-aston text-xl text-[#685c46]">AF</span>
            </div>

            <p className="font-cinzel text-[10px] tracking-[0.25em] text-[#685c46] uppercase font-bold mb-1">
              Mempelai Pria
            </p>

            {/* Groom Names */}
            <h3 className="font-aston text-4xl sm:text-5xl text-[#685c46] mb-1">
              {INVITATION_DATA.groom.nickname}
            </h3>
            <p className="font-cinzel text-base sm:text-lg font-bold text-[#473c27] tracking-wider mb-3">
              {INVITATION_DATA.groom.fullName}
            </p>

            <div className="w-16 h-[1px] bg-[#685c46]/30 mx-auto my-3"></div>

            <p className="font-roman text-sm text-[#51482d] leading-relaxed max-w-xs mx-auto">
              Putra dari {INVITATION_DATA.groom.fatherName}<br />& {INVITATION_DATA.groom.motherName}
            </p>
          </div>
        </motion.div>

        {/* Peacock Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <RoyalPeacockPair className="max-w-[240px]" />
        </motion.div>

        {/* 2. Mempelai Wanita (Bride) */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full flex flex-col items-center"
        >
          {/* Animated Foliage & Bird Around Bride */}
          <div className="absolute -top-8 -left-8 w-40 pointer-events-none z-10 opacity-90 transform -scale-x-100">
            <img src={THEME_ASSETS.foliageGif3} alt="Floral Gif" className="w-full object-contain" />
          </div>
          <div className="absolute top-8 -right-6 w-20 pointer-events-none z-20">
            <img src={THEME_ASSETS.birdGif} alt="Bird" className="w-full object-contain" />
          </div>

          {/* Royal Card for Bride Name */}
          <div className="viding-card rounded-[32px] p-7 border-2 border-[#685c46]/35 shadow-xl w-full text-center relative overflow-hidden backdrop-blur-sm">
            {/* Gold Leaf Accent at Top */}
            <div className="w-16 mx-auto mb-2 opacity-85 transform -scale-x-100">
              <img src={THEME_ASSETS.goldLeafBranch} alt="Gold Leaves" className="w-full object-contain" />
            </div>

            {/* Monogram Seal */}
            <div className="w-12 h-12 rounded-full border border-[#685c46]/40 mx-auto mb-3 flex items-center justify-center bg-[#f8f6e1]/80 shadow-sm">
              <span className="font-aston text-xl text-[#685c46]">NM</span>
            </div>

            <p className="font-cinzel text-[10px] tracking-[0.25em] text-[#685c46] uppercase font-bold mb-1">
              Mempelai Wanita
            </p>

            {/* Bride Names */}
            <h3 className="font-aston text-4xl sm:text-5xl text-[#685c46] mb-1">
              {INVITATION_DATA.bride.nickname}
            </h3>
            <p className="font-cinzel text-base sm:text-lg font-bold text-[#473c27] tracking-wider mb-3">
              {INVITATION_DATA.bride.fullName}
            </p>

            <div className="w-16 h-[1px] bg-[#685c46]/30 mx-auto my-3"></div>

            <p className="font-roman text-sm text-[#51482d] leading-relaxed max-w-xs mx-auto">
              Putri dari {INVITATION_DATA.bride.fatherName}<br />& {INVITATION_DATA.bride.motherName}
            </p>
          </div>
        </motion.div>

      </div>

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
