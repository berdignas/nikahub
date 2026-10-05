import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, Radio, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { SectionCard } from './SectionCard';

export const LiveStreamSection: React.FC = () => {
  return (
    <SectionCard id="streaming">
      <div className="text-center flex flex-col items-center">
        
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <Radio className="w-3.5 h-3.5 text-red-600" />
          <span>Virtual Wedding Broadcast</span>
        </div>

        <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#C5A059] flex items-center justify-center mb-4 text-[#8C6A43] shadow-md">
          <Video className="w-7 h-7" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8C6A43] mb-3">
          Live Streaming
        </h2>

        <p className="text-xs md:text-sm text-[#66554B] mb-6 max-w-md font-light leading-relaxed">
          Bagi keluarga dan sahabat yang belum dapat hadir secara langsung, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan momen sakral pernikahan kami secara virtual.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#3D312A] mb-8 bg-[#FAF6F0] px-6 py-3.5 rounded-2xl border border-[#E6DCCE] shadow-inner">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#8C6A43]" />
            <span>{INVITATION_DATA.liveStream.date}</span>
          </div>
          <span className="text-[#C5A059] font-bold">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#8C6A43]" />
            <span>{INVITATION_DATA.liveStream.time}</span>
          </div>
        </div>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href={INVITATION_DATA.liveStream.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8C6A43] to-[#5C4033] text-white hover:opacity-95 text-xs font-semibold tracking-widest uppercase shadow-gold transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Gabung Live Broadcast</span>
        </motion.a>

      </div>
    </SectionCard>
  );
};
