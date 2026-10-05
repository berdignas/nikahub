import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { BotanicalCornerDecor } from './BotanicalCornerDecor';

export const EventSection: React.FC = () => {
  return (
    <section id="event" className="relative py-18 px-6 bg-[#EEF0E9] text-center overflow-hidden">
      {/* Floral Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-15 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url(./assets/VINT04-COVER-PII.webp)' }}
      />

      {/* Swaying Foliage Corners */}
      <BotanicalCornerDecor showTop={true} showBottom={true} showMid={false} />

      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mb-10"
        >
          <span className="font-serif italic text-xs sm:text-sm text-[#767D63] tracking-[0.25em] uppercase block mb-1 font-semibold">
            Wedding Schedule
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Rangkaian Acara
          </h2>
          <div className="w-24 my-2.5 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Akad Nikah Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full p-6 rounded-3xl bg-[#FAF9F5] border border-[#C2A676]/45 shadow-xl flex flex-col items-center mb-8 relative overflow-hidden"
        >
          {/* Top gold bar */}
          <div className="w-16 h-1 rounded-full bg-[#C2A676] mb-4" />

          {/* Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-[#767D63]/15 border border-[#C2A676]/50 flex items-center justify-center mb-4 text-[#51583D]">
            <Calendar className="w-6 h-6 text-[#767D63]" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2C2B29] tracking-wide mb-3">
            {invitationData.akad.title}
          </h3>

          <div className="space-y-2 mb-5 text-[#444241]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#51583D]">
              <Clock className="w-3.5 h-3.5 text-[#C2A676]" />
              <span>{invitationData.akad.date}</span>
            </div>
            <p className="text-xs font-medium text-[#767D63]">{invitationData.akad.time}</p>
            <div className="pt-2 border-t border-[#C2A676]/25">
              <p className="font-serif font-bold text-sm text-[#2C2B29] mb-1">
                {invitationData.akad.location}
              </p>
              <p className="text-xs text-[#686561] leading-relaxed max-w-[280px]">
                {invitationData.akad.address}
              </p>
            </div>
          </div>

          {/* Google Maps Button */}
          <a
            href={invitationData.akad.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#51583D] text-[#FAF9F5] text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-[#3D4730] transition-all duration-300"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E8D8BA]" />
            <span>Petunjuk Lokasi (Maps)</span>
          </a>
        </motion.div>

        {/* Resepsi Pernikahan Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full p-6 rounded-3xl bg-[#FAF9F5] border border-[#C2A676]/45 shadow-xl flex flex-col items-center relative overflow-hidden"
        >
          {/* Top gold bar */}
          <div className="w-16 h-1 rounded-full bg-[#C2A676] mb-4" />

          {/* Icon Badge */}
          <div className="w-14 h-14 rounded-full bg-[#767D63]/15 border border-[#C2A676]/50 flex items-center justify-center mb-4 text-[#51583D]">
            <MapPin className="w-6 h-6 text-[#767D63]" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2C2B29] tracking-wide mb-3">
            {invitationData.resepsi.title}
          </h3>

          <div className="space-y-2 mb-5 text-[#444241]">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#51583D]">
              <Clock className="w-3.5 h-3.5 text-[#C2A676]" />
              <span>{invitationData.resepsi.date}</span>
            </div>
            <p className="text-xs font-medium text-[#767D63]">{invitationData.resepsi.time}</p>
            <div className="pt-2 border-t border-[#C2A676]/25">
              <p className="font-serif font-bold text-sm text-[#2C2B29] mb-1">
                {invitationData.resepsi.location}
              </p>
              <p className="text-xs text-[#686561] leading-relaxed max-w-[280px]">
                {invitationData.resepsi.address}
              </p>
            </div>
          </div>

          {/* Google Maps Button */}
          <a
            href={invitationData.resepsi.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#51583D] text-[#FAF9F5] text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-[#3D4730] transition-all duration-300"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E8D8BA]" />
            <span>Petunjuk Lokasi (Maps)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
