import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const LiveStreamSection: React.FC = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-[#E6DCCE] shadow-vintage relative flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center mb-4 text-[#8C6A43]">
            <Video className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-[#8C6A43] mb-3">
            Live Streaming
          </h2>

          <p className="text-xs md:text-sm text-[#66554B] mb-6 max-w-md font-light leading-relaxed">
            Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual yang disiarkan langsung melalui media sosial di bawah ini.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#3D312A] mb-8 bg-[#FAF6F0] px-6 py-3 rounded-2xl border border-[#E6DCCE]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8C6A43]" />
              <span>{INVITATION_DATA.liveStream.date}</span>
            </div>
            <span className="text-[#C5A059]">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#8C6A43]" />
              <span>{INVITATION_DATA.liveStream.time}</span>
            </div>
          </div>

          <a
            href={INVITATION_DATA.liveStream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8C6A43] text-white hover:bg-[#5C4033] text-xs font-semibold tracking-wider uppercase shadow-gold transition-all transform hover:-translate-y-0.5"
          >
            <Video className="w-4 h-4" />
            <span>Gabung Live Broadcast</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
