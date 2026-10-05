import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

interface CoverModalProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverModal: React.FC<CoverModalProps> = ({ guestName, isOpen, onOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] overflow-hidden"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={INVITATION_DATA.groom.photo} 
              alt="Vintage background" 
              className="w-full h-full object-cover object-center filter blur-sm opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/80 to-[#FAF6F0]/60" />
          </div>

          {/* Decorative Corner Ornaments */}
          <img 
            src="./images/flower.png" 
            alt="Floral decor top left" 
            className="absolute top-0 left-0 w-32 md:w-48 opacity-40 pointer-events-none -scale-x-100"
          />
          <img 
            src="./images/flower.png" 
            alt="Floral decor bottom right" 
            className="absolute bottom-0 right-0 w-32 md:w-48 opacity-40 pointer-events-none -scale-y-100"
          />

          <div className="relative z-10 max-w-md w-full mx-4 text-center px-6 py-10 bg-white/70 backdrop-blur-md rounded-3xl border border-[#E6DCCE] shadow-vintage flex flex-col items-center">
            
            {/* Arch Photo Frame */}
            <div className="relative w-40 h-52 mb-6 arch-frame border-2 border-[#C5A059] p-1 shadow-md">
              <img 
                src="./images/cover.jpg" 
                alt="Habib & Adiba" 
                className="w-full h-full object-cover arch-frame"
              />
              <img 
                src="./images/frame.png" 
                alt="Decor frame" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-80"
              />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-medium mb-2">
              Undangan Website Premium
            </span>
            <h2 className="font-script text-4xl text-[#3D312A] mb-1">
              The Wedding of
            </h2>
            <h1 className="font-serif text-3xl font-bold text-[#8C6A43] tracking-wide mb-6">
              {INVITATION_DATA.groom.shortName} &amp; {INVITATION_DATA.bride.shortName}
            </h1>

            {/* Guest Box */}
            <div className="w-full bg-[#F5EFE6] rounded-2xl p-4 border border-[#E6DCCE] mb-6 shadow-inner">
              <p className="text-xs text-[#66554B] mb-1 font-light">
                Kepada Bapak/Ibu/Saudara/i:
              </p>
              <p className="text-lg font-bold text-[#3D312A] tracking-wide">
                {guestName}
              </p>
              <p className="text-[10px] text-[#8C6A43] italic mt-1">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            {/* Open Button */}
            <button
              onClick={onOpen}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#8C6A43] hover:bg-[#5C4033] text-white text-sm font-semibold tracking-wider uppercase rounded-full shadow-gold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 pulse-glow"
            >
              <MailOpen className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
