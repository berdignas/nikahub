import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { BotanicalCornerDecor } from './BotanicalCornerDecor';

export const AyatSection: React.FC = () => {
  return (
    <section className="relative py-16 px-6 bg-[#838A6D] text-[#FAF9F5] overflow-hidden">
      {/* Background Floral Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url(./assets/VINT04-PRAYER-PII.webp)' }}
      />

      {/* Swaying Foliage Corners */}
      <BotanicalCornerDecor showTop={true} showBottom={true} showMid={false} />

      {/* Decorative arch border overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[380px] mx-auto rounded-3xl border border-[#FAF9F5]/30 p-6 sm:p-8 bg-[#51583D]/55 backdrop-blur-md shadow-2xl text-center flex flex-col items-center"
      >
        {/* Floating Quote Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-12 h-12 rounded-full bg-[#FAF9F5]/10 border border-[#E8D8BA]/50 flex items-center justify-center mb-5 shadow-inner"
        >
          <Quote className="w-5 h-5 text-[#E8D8BA]" />
        </motion.div>

        {/* Bismillah Calligraphy Heading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-serif text-2xl sm:text-3xl text-[#E8D8BA] mb-4 tracking-wider"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* Arabic Quranic Verse */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-serif text-base sm:text-lg leading-relaxed text-[#FAF9F5] font-light mb-5 tracking-wide dir-rtl"
        >
          {invitationData.quote.arabic}
        </motion.p>

        <div className="w-16 h-[1px] bg-[#E8D8BA]/50 my-2" />

        {/* Indonesian Translation */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="text-xs sm:text-sm leading-relaxed text-[#FAF9F5]/90 font-light italic mb-4"
        >
          "{invitationData.quote.translation}"
        </motion.p>

        {/* Surah Reference */}
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-[#FAF9F5]/15 border border-[#E8D8BA]/40 text-xs font-serif font-semibold text-[#E8D8BA] tracking-widest uppercase"
        >
          {invitationData.quote.surah}
        </motion.span>
      </motion.div>
    </section>
  );
};
