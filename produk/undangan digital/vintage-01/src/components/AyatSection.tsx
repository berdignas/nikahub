import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const AyatSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-[#E6DCCE] shadow-vintage relative"
        >
          <Quote className="w-10 h-10 text-[#C5A059]/40 mx-auto mb-4" />
          
          <p className="font-serif text-xl md:text-2xl text-[#8C6A43] mb-6 leading-relaxed dir-rtl font-bold">
            {INVITATION_DATA.quote.ar}
          </p>

          <p className="text-sm md:text-base text-[#66554B] leading-relaxed italic mb-4 font-light">
            "{INVITATION_DATA.quote.latin}"
          </p>

          <span className="inline-block text-xs font-semibold text-[#8C6A43] tracking-widest uppercase py-1 px-4 bg-[#FAF6F0] rounded-full border border-[#E6DCCE]">
            {INVITATION_DATA.quote.source}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
