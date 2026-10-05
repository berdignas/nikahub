import React from 'react';
import { motion } from 'framer-motion';
import { Video, Radio } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const LiveStreamSection: React.FC = () => {
  return (
    <section className="relative py-14 px-6 bg-[#FAF9F5] text-center overflow-hidden border-t border-[#C2A676]/20">
      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px", amount: 0.15 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full p-6 rounded-3xl bg-gradient-to-br from-[#3D4730] to-[#2A3122] text-[#FAF9F5] border border-[#C2A676]/40 shadow-xl flex flex-col items-center"
        >
          {/* Pulsing Live Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-[11px] font-bold tracking-widest uppercase mb-4 animate-pulse">
            <Radio className="w-3.5 h-3.5 text-red-400" />
            <span>Virtual Ceremony</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#E8D8BA] tracking-wide mb-2">
            {invitationData.liveStream.title}
          </h3>

          <p className="text-xs text-[#EAEFE2]/80 leading-relaxed mb-4 max-w-[300px]">
            {invitationData.liveStream.description}
          </p>

          <div className="text-xs text-[#C2A676] font-medium mb-6">
            <p>{invitationData.liveStream.date}</p>
            <p className="text-[11px] opacity-90">{invitationData.liveStream.time}</p>
          </div>

          {/* Action Button */}
          <a
            href={invitationData.liveStream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#C2A676] to-[#9C8157] text-[#2C2B29] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Video className="w-4 h-4" />
            <span>Gabung Live Streaming</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
