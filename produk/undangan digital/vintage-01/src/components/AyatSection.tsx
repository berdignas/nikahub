import React from 'react';
import { motion } from 'framer-motion';
import { INVITATION_DATA } from '../data/invitationData';
import { BotanicalDivider } from './BotanicalFrame';

export const AyatSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        {/* Arabic Bismillah Calligraphy Vector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <img
            src="./images/bismillah.svg"
            alt="Bismillah Calligraphy"
            className="h-12 sm:h-16 object-contain filter drop-shadow opacity-90"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl border-2 border-[#E6DCCE] shadow-vintage relative"
        >
          {/* Arabic Verse Text */}
          <p className="font-serif text-2xl md:text-3xl text-[#8C6A43] mb-6 leading-relaxed font-bold tracking-wide">
            {INVITATION_DATA.quote.ar}
          </p>

          <BotanicalDivider />

          {/* Translation */}
          <p className="text-xs md:text-sm text-[#66554B] leading-relaxed italic mb-6 font-light">
            "{INVITATION_DATA.quote.latin}"
          </p>

          <span className="inline-block text-xs font-bold text-[#8C6A43] tracking-widest uppercase py-1.5 px-6 bg-[#FAF6F0] rounded-full border border-[#C5A059] shadow-sm">
            {INVITATION_DATA.quote.source}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
