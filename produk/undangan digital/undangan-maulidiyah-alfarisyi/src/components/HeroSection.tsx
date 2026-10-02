import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { INVITATION_DATA } from '../data/invitationData';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[920px] flex flex-col justify-between items-center text-center overflow-hidden bg-[#b8c4ae]">
      
      {/* 1. Draped Green Velvet Curtain at Top */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <img
          src={THEME_ASSETS.curtainTop}
          alt="Royal Curtain"
          className="w-full object-contain drop-shadow-md"
        />
      </div>

      {/* 2. Main Castle & Couple Painting (Full Height Backdrop) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img
          src={THEME_ASSETS.heroPortrait}
          alt="Palace Garden Portrait"
          className="w-full h-full object-cover object-bottom opacity-95"
        />
      </div>

      {/* 3. Halo Sunburst Behind Text */}
      <div className="absolute top-20 -left-12 w-[540px] z-10 pointer-events-none opacity-75">
        <img
          src={THEME_ASSETS.sunburstHalo}
          alt="Sunburst Halo"
          className="w-full object-contain"
        />
      </div>

      {/* 4. Real Animated Leaves & Flowers Swaying (comp-1.gif, comp-2.gif, comp-3.gif) */}
      <div className="absolute top-56 -right-16 w-60 z-20 pointer-events-none opacity-90 transform -rotate-12">
        <img src={THEME_ASSETS.foliageGif2} alt="Swaying Flower" className="w-full object-contain" />
      </div>
      <div className="absolute top-72 -left-16 w-60 z-20 pointer-events-none opacity-90 transform rotate-16 -scale-x-100">
        <img src={THEME_ASSETS.foliageGif2} alt="Swaying Flower" className="w-full object-contain" />
      </div>

      <div className="absolute top-80 -right-14 w-64 z-20 pointer-events-none opacity-90">
        <img src={THEME_ASSETS.foliageGif1} alt="Animated Rose" className="w-full object-contain" />
      </div>
      <div className="absolute top-84 -left-14 w-64 z-20 pointer-events-none opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif1} alt="Animated Rose" className="w-full object-contain" />
      </div>

      {/* 5. Animated Royal Bird Flying */}
      <div className="absolute top-96 left-4 w-28 z-20 pointer-events-none opacity-95">
        <img src={THEME_ASSETS.birdGif} alt="Royal Bird" className="w-full object-contain" />
      </div>

      {/* 6. Gold Ribbon Crest */}
      <div className="absolute top-[480px] inset-x-0 z-20 flex justify-center pointer-events-none">
        <img src={THEME_ASSETS.goldRibbonBanner} alt="Crest Banner" className="w-48 object-contain" />
      </div>

      {/* 7. Typography (Exact Placement from Viding Theme 183) */}
      <div className="relative z-30 pt-48 px-4 w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#685c46] uppercase mb-4"
        >
          We're getting married
        </motion.p>

        {/* Groom Name */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-aston text-5xl sm:text-6xl text-[#685c46] leading-none drop-shadow-sm"
        >
          {INVITATION_DATA.groom.nickname}
        </motion.h1>

        {/* Ampersand */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-aston text-3xl sm:text-4xl text-[#685c46] my-2"
        >
          &
        </motion.span>

        {/* Bride Name */}
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-aston text-5xl sm:text-6xl text-[#685c46] leading-none drop-shadow-sm"
        >
          {INVITATION_DATA.bride.nickname}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-roman text-sm sm:text-base text-[#685c46] tracking-wider mt-4"
        >
          {INVITATION_DATA.dateFormatted}
        </motion.p>
      </div>

      {/* Bottom Scalloped Paper Divider */}
      <div className="relative z-30 w-full mt-auto">
        <div className="flex flex-col items-center text-[#685c46] animate-bounce mb-3">
          <span className="font-cinzel text-[10px] tracking-widest uppercase">Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-[#685c46]" />
        </div>
        <img
          src={THEME_ASSETS.scallopDivider}
          alt="Scallop Divider"
          className="w-full object-cover h-14 -mb-1"
        />
      </div>

    </section>
  );
};
