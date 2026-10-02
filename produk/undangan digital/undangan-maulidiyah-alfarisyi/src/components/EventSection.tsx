import React from 'react';
import { motion } from 'framer-motion';
import { THEME_ASSETS } from '../data/themeAssets';
import { RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA } from '../data/invitationData';

export const EventSection: React.FC = () => {
  return (
    <section id="event" className="relative text-center overflow-hidden bg-[#b8c4ae]">
      
      {/* 1. Header Section */}
      <div className="pt-16 pb-8 px-4 relative z-20">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#685c46] font-semibold"
        >
          Events & Venue
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-aston text-4xl sm:text-5xl text-[#473c27] mt-1 mb-2"
        >
          Rangkaian Acara
        </motion.h2>
        <p className="font-roman text-sm text-[#51482d] italic max-w-xs mx-auto px-2">
          Dengan penuh hormat kami mengundang Anda untuk menghadiri waktu dan tempat perayaan kami:
        </p>
        <div className="w-16 h-[1px] bg-[#685c46]/30 mx-auto mt-4"></div>
      </div>

      {/* 2. Event 1: Akad Nikah (Holy Matrimony) with Landscape Palace Background */}
      <div 
        className="relative min-h-[780px] flex flex-col justify-between items-center bg-cover bg-center py-12 px-4"
        style={{ backgroundImage: `url(${THEME_ASSETS.akadLandscapeBg})` }}
      >
        <div className="absolute inset-0 bg-[#b8c4ae]/80 pointer-events-none"></div>

        {/* Trees Flanking */}
        <div className="absolute top-10 -left-16 w-52 pointer-events-none opacity-80">
          <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
        </div>
        <div className="absolute top-12 -right-16 w-52 pointer-events-none opacity-80 transform -scale-x-100">
          <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
        </div>

        {/* Card for Akad */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 w-full max-w-sm my-auto p-6 sm:p-8 rounded-[36px] viding-card border border-[#685c46]/40 shadow-xl flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 mb-2 pointer-events-none">
            <img src={THEME_ASSETS.locationGif} alt="Pin" className="w-full h-full object-contain" />
          </div>

          <h3 className="font-aston text-3xl sm:text-4xl text-[#685c46] mb-4">
            Akad Nikah
          </h3>

          {/* Date Breakdown */}
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="text-right">
              <p className="font-cinzel text-xs uppercase text-[#685c46] font-semibold">{INVITATION_DATA.events[0].date.split(',')[0]},</p>
              <p className="font-cinzel text-xs uppercase text-[#685c46] font-semibold">{INVITATION_DATA.events[0].date.split(' ').slice(2).join(' ')}</p>
            </div>
            <div className="px-3 border-x-2 border-[#685c46]">
              <span className="font-cinzel text-4xl sm:text-5xl font-bold text-[#473c27]">{INVITATION_DATA.events[0].date.split(' ')[1]}</span>
            </div>
            <div className="text-left">
              <p className="font-cinzel text-[10px] font-semibold text-[#685c46] max-w-[80px] leading-tight">{INVITATION_DATA.events[0].time}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="my-5">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#473c27]">
              {INVITATION_DATA.events[0].venue}
            </h4>
            <p className="font-roman text-xs sm:text-sm text-[#51482d] mt-1 leading-relaxed">
              {INVITATION_DATA.events[0].address}
            </p>
          </div>

          {/* See Location Button */}
          <a
            href={INVITATION_DATA.events[0].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-6 rounded-full bg-[#473c27] text-[#ece5da] font-cinzel text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-[#20271e] transition-all"
          >
            Lihat Lokasi (Google Maps)
          </a>
        </motion.div>

        {/* Divider */}
        <div className="relative z-30 w-full mt-auto">
          <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
        </div>
      </div>

      {/* 3. Event 2: Resepsi Pernikahan (Wedding Reception) with Landscape Palace Background */}
      <div 
        className="relative min-h-[780px] flex flex-col justify-between items-center bg-cover bg-center py-12 px-4"
        style={{ backgroundImage: `url(${THEME_ASSETS.resepsiLandscapeBg})` }}
      >
        <div className="absolute inset-0 bg-[#b8c4ae]/80 pointer-events-none"></div>

        {/* Trees Flanking */}
        <div className="absolute top-10 -left-16 w-52 pointer-events-none opacity-80">
          <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
        </div>
        <div className="absolute top-12 -right-16 w-52 pointer-events-none opacity-80 transform -scale-x-100">
          <img src={THEME_ASSETS.treeLushGarden} alt="Tree" className="w-full object-contain" />
        </div>

        {/* Card for Resepsi */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 w-full max-w-sm my-auto p-6 sm:p-8 rounded-[36px] viding-card border border-[#685c46]/40 shadow-xl flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 mb-2 pointer-events-none">
            <img src={THEME_ASSETS.locationGif} alt="Pin" className="w-full h-full object-contain" />
          </div>

          <h3 className="font-aston text-3xl sm:text-4xl text-[#685c46] mb-4">
            Resepsi Pernikahan
          </h3>

          {/* Date Breakdown */}
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="text-right">
              <p className="font-cinzel text-xs uppercase text-[#685c46] font-semibold">{INVITATION_DATA.events[1].date.split(',')[0]},</p>
              <p className="font-cinzel text-xs uppercase text-[#685c46] font-semibold">{INVITATION_DATA.events[1].date.split(' ').slice(2).join(' ')}</p>
            </div>
            <div className="px-3 border-x-2 border-[#685c46]">
              <span className="font-cinzel text-4xl sm:text-5xl font-bold text-[#473c27]">{INVITATION_DATA.events[1].date.split(' ')[1]}</span>
            </div>
            <div className="text-left">
              <p className="font-cinzel text-[10px] font-semibold text-[#685c46] max-w-[80px] leading-tight">{INVITATION_DATA.events[1].time}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="my-5">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#473c27]">
              {INVITATION_DATA.events[1].venue}
            </h4>
            <p className="font-roman text-xs sm:text-sm text-[#51482d] mt-1 leading-relaxed">
              {INVITATION_DATA.events[1].address}
            </p>
          </div>

          {/* See Location Button */}
          <a
            href={INVITATION_DATA.events[1].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-6 rounded-full bg-[#473c27] text-[#ece5da] font-cinzel text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-[#20271e] transition-all"
          >
            Lihat Lokasi (Google Maps)
          </a>
        </motion.div>

        {/* Divider */}
        <div className="relative z-30 w-full mt-auto">
          <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
        </div>
      </div>
    </section>
  );
};
