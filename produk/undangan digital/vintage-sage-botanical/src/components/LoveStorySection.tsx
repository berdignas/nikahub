import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const LoveStorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-18 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="font-serif italic text-xs sm:text-sm text-[#767D63] tracking-[0.25em] uppercase block mb-1 font-semibold">
            Our Love Journey
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Kisah Cinta Kami
          </h2>
          <div className="w-24 my-2.5 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative w-full border-l-2 border-dashed border-[#C2A676]/60 pl-6 ml-4 space-y-8 text-left">
          {invitationData.stories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Golden Node */}
              <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#51583D] border-2 border-[#C2A676] flex items-center justify-center shadow-md">
                <Heart className="w-3 h-3 text-[#E8D8BA] fill-[#E8D8BA]" />
              </div>

              {/* Story Content Card */}
              <div className="p-5 rounded-2xl bg-white/95 border border-[#C2A676]/40 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#767D63]/15 text-[#51583D] text-[11px] font-bold tracking-wider mb-2">
                  <Sparkles className="w-3 h-3 text-[#C2A676]" />
                  <span>Tahun {item.year}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C2B29] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#686561] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
