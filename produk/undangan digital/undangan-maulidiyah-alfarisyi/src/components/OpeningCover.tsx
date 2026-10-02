import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { INVITATION_DATA } from '../data/invitationData';

interface OpeningCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName: string;
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({ isOpen, onOpen, guestName }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="viding-theme-183-cover"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: '-100%',
            transition: { 
              duration: 1.6, 
              ease: [0.22, 1, 0.36, 1],
            } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto no-scrollbar bg-[#20271e] select-none"
        >
          {/* Ambient Desktop Backdrop with Real Couple Photo from folder gambar */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm pointer-events-none"
            style={{ backgroundImage: `url(${THEME_ASSETS.storyBg})` }}
          />

          {/* Central Invitation Container (Phone Format max-w-[440px]) */}
          <div 
            className="relative w-full max-w-[440px] min-h-screen bg-cover bg-center shadow-[0_0_90px_rgba(0,0,0,0.65)] flex flex-col justify-between items-center px-6 py-10 text-center overflow-hidden"
            style={{ backgroundImage: `url(${THEME_ASSETS.coverBg})` }}
          >
            {/* Top Guest Name Section */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="pt-6 w-full"
            >
              <p className="font-cinzel text-xs tracking-[0.25em] text-[#685c46] uppercase font-semibold">
                Dear Honored Guest
              </p>
              <h2 className="font-aston text-2xl sm:text-3xl text-[#473c27] mt-1 capitalize">
                {guestName || "Tamu Undangan"}
              </h2>
            </motion.div>

            {/* Center: The Wedding Of & Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.35 }}
              className="my-auto py-8 w-full flex flex-col items-center"
            >
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#685c46] uppercase font-semibold mb-3">
                The Wedding Of
              </p>

              {/* Names in Kirei Aston Script */}
              <h1 className="font-aston text-4xl sm:text-5xl text-[#685c46] leading-tight">
                {INVITATION_DATA.groom.nickname}
              </h1>
              <span className="font-aston text-3xl text-[#685c46] my-1 font-normal">
                &
              </span>
              <h1 className="font-aston text-4xl sm:text-5xl text-[#685c46] leading-tight">
                {INVITATION_DATA.bride.nickname}
              </h1>

              {/* Date */}
              <p className="font-roman text-sm sm:text-base text-[#685c46] mt-4 font-normal tracking-wide">
                {INVITATION_DATA.dateFormatted}
              </p>
            </motion.div>

            {/* Bottom: Open Invitation Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="w-full max-w-[280px] pb-6"
            >
              <button
                onClick={onOpen}
                className="viding-btn w-full py-3 px-6 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <MailOpen className="w-4 h-4 text-[#685c46]" />
                <span>Open Invitation</span>
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
