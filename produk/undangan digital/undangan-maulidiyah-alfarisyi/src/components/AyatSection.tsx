import React from 'react';
import { motion } from 'framer-motion';
import { THEME_ASSETS } from '../data/themeAssets';
import { INVITATION_DATA } from '../data/invitationData';

export const AyatSection: React.FC = () => {
  return (
    <section className="relative min-h-[640px] flex flex-col justify-between items-center text-center overflow-hidden bg-[#b8c4ae] py-12 px-4">
      
      {/* 1. Botanical Trees Left & Right (Pierre-Joseph Redouté Trees) */}
      <div className="absolute top-8 -left-20 w-56 z-10 pointer-events-none opacity-85">
        <img src={THEME_ASSETS.treeRedoute} alt="Botanical Tree" className="w-full object-contain" />
      </div>
      <div className="absolute top-10 -right-20 w-56 z-10 pointer-events-none opacity-85 transform -scale-x-100">
        <img src={THEME_ASSETS.treeRedoute} alt="Botanical Tree" className="w-full object-contain" />
      </div>

      {/* 2. Lush Garden Trees at Corners */}
      <div className="absolute -top-16 -left-28 w-64 z-0 pointer-events-none opacity-60">
        <img src={THEME_ASSETS.treeLushGarden} alt="Lush Garden" className="w-full object-contain" />
      </div>
      <div className="absolute -top-16 -right-28 w-64 z-0 pointer-events-none opacity-60 transform -scale-x-100">
        <img src={THEME_ASSETS.treeLushGarden} alt="Lush Garden" className="w-full object-contain" />
      </div>

      {/* 3. Center Invitation Greeting Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-sm my-auto p-6 sm:p-8 rounded-[36px] viding-card border border-[#685c46]/30 shadow-lg text-center"
      >
        {/* Animated Gold Foliage on Top of Card */}
        <div className="w-20 mx-auto -mt-3 mb-2 opacity-90">
          <img src={THEME_ASSETS.goldLeafBranch} alt="Gold Leaves" className="w-full object-contain" />
        </div>

        <h3 className="font-aston text-3xl sm:text-4xl text-[#685c46] mb-3">
          Alfarisyi & Maulidiyah
        </h3>

        {/* Bismillah */}
        <p className="font-arabic text-xl text-[#473c27] mb-3">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Ayat Arabic */}
        <p className="font-arabic text-base sm:text-lg text-[#473c27] leading-[2.1] my-3">
          {INVITATION_DATA.quranAyat.arabic}
        </p>

        <div className="w-16 h-[1px] bg-[#685c46]/30 mx-auto my-3"></div>

        {/* Translation */}
        <p className="font-roman text-xs sm:text-sm text-[#685c46] italic leading-relaxed">
          "{INVITATION_DATA.quranAyat.translation}"
        </p>

        <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#685c46] uppercase font-semibold mt-3">
          — {INVITATION_DATA.quranAyat.surah} —
        </p>
      </motion.div>

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
