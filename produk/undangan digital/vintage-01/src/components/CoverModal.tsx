import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INVITATION_DATA } from '../data/invitationData';

interface CoverModalProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverModal: React.FC<CoverModalProps> = ({ guestName, isOpen, onOpen }) => {
  const [isUnsealing, setIsUnsealing] = useState(false);

  const handleUnseal = () => {
    setIsUnsealing(true);
    
    // Trigger festive golden confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#8C6A43', '#FFFFFF', '#E8B4B8', '#A65B49']
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%', scale: 0.95 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] overflow-hidden"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={INVITATION_DATA.groom.photo} 
              alt="Vintage background" 
              className="w-full h-full object-cover object-center filter blur-md opacity-25 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/85 to-[#FAF6F0]/70" />
          </div>

          {/* Real Scraped Botanical Vector Leaves */}
          <img 
            src="./images/bunga_top_left.webp" 
            alt="Botanical top left leaf" 
            className="absolute top-0 left-0 w-32 sm:w-48 md:w-56 opacity-85 pointer-events-none z-10 animate-sway"
          />
          <img 
            src="./images/bunga_top_right.webp" 
            alt="Botanical top right leaf" 
            className="absolute top-0 right-0 w-32 sm:w-48 md:w-56 opacity-85 pointer-events-none z-10 animate-sway-reverse"
          />
          <img 
            src="./images/bunga_bottom_left.webp" 
            alt="Botanical bottom left leaf" 
            className="absolute bottom-0 left-0 w-28 sm:w-40 md:w-48 opacity-85 pointer-events-none z-10 animate-sway-reverse"
          />
          <img 
            src="./images/bunga_bottom_right.webp" 
            alt="Botanical bottom right leaf" 
            className="absolute bottom-0 right-0 w-28 sm:w-40 md:w-48 opacity-85 pointer-events-none z-10 animate-sway"
          />

          {/* Envelope Card Container */}
          <div className="relative z-10 max-w-md w-full mx-4 text-center px-6 py-10 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-[#E6DCCE] shadow-2xl flex flex-col items-center">
            
            {/* Arch Photo Frame with Golden Filigree Rim */}
            <div className="relative w-44 h-56 mb-6 arch-frame border-2 border-[#C5A059] p-1 shadow-lg bg-white group">
              <img 
                src="./images/cover.jpg" 
                alt="Habib & Adiba" 
                className="w-full h-full object-cover arch-frame group-hover:scale-105 transition-transform duration-700"
              />
              <img 
                src="./images/frame.png" 
                alt="Decor frame" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-85"
              />

              {/* Floating Butterfly Accent */}
              <div className="absolute -top-3 -right-3 text-[#C5A059] animate-butterfly pointer-events-none">
                <Heart className="w-6 h-6 fill-[#C5A059] opacity-90" />
              </div>
            </div>

            <span className="text-xs uppercase tracking-[0.35em] text-[#8C6A43] font-bold mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Undangan Website Spesial</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </span>

            <h2 className="font-script text-4xl text-[#3D312A] mb-1">
              The Wedding of
            </h2>
            <h1 className="font-serif text-3xl font-bold text-[#8C6A43] tracking-wide mb-6">
              {INVITATION_DATA.groom.shortName} &amp; {INVITATION_DATA.bride.shortName}
            </h1>

            {/* Guest Box */}
            <div className="w-full bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] rounded-2xl p-4 border border-[#E6DCCE] mb-6 shadow-inner relative overflow-hidden">
              <p className="text-xs text-[#66554B] mb-1 font-light">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <p className="text-xl font-bold text-[#3D312A] tracking-wide">
                {guestName}
              </p>
              <p className="text-[10px] text-[#8C6A43] italic mt-1 font-medium">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            {/* Interactive Wax Seal Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleUnseal}
                disabled={isUnsealing}
                className="relative group cursor-pointer flex flex-col items-center"
              >
                {/* 3D Wax Seal Circle Stamp */}
                <div className="w-16 h-16 rounded-full wax-seal border-2 border-[#C5A059] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 active:scale-95 transition-all duration-300 pulse-glow">
                  <span className="font-serif text-lg font-bold text-amber-100 tracking-tighter">
                    H&amp;A
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8C6A43] tracking-widest uppercase mt-2 group-hover:text-[#5C4033] transition-colors">
                  {isUnsealing ? 'Membuka Undangan...' : 'Klik Stempel Lilin Untuk Buka'}
                </span>
              </button>

              <button
                onClick={handleUnseal}
                disabled={isUnsealing}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#8C6A43] hover:bg-[#5C4033] text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-gold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MailOpen className="w-4 h-4" />
                <span>Buka Undangan</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
