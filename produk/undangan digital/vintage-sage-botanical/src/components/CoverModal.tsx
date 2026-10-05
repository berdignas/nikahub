import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { invitationData } from '../data/invitationData';

interface CoverModalProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const CoverModal: React.FC<CoverModalProps> = ({ isOpen, onOpen }) => {
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('u') || params.get('guest');
    if (to) {
      setGuestName(decodeURIComponent(to.replace(/\+/g, ' ')));
    }
  }, []);

  const handleOpenInvitation = () => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C2A676', '#767D63', '#FAF9F5', '#51583D'],
      });
    } catch {
      // ignore if confetti fails
    }
    onOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cover-modal"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.9,
            transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#1A1D16]"
        >
          {/* Desktop background layer */}
          <div
            className="absolute inset-0 hidden md:block bg-cover bg-center opacity-40 blur-sm"
            style={{ backgroundImage: 'url(./assets/VINTAGE-04-LAND.webp)' }}
          />

          {/* Main Card Container */}
          <div className="relative w-full max-w-[440px] h-full min-h-screen sm:h-[94vh] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between items-center text-center p-6 bg-[#FAF9F5] border border-[#C2A676]/40">
            {/* Background Botanical Artwork */}
            <div
              className="absolute inset-0 bg-cover bg-top opacity-35 pointer-events-none mix-blend-multiply"
              style={{ backgroundImage: 'url(./assets/VINT04-COVER-PII.webp)' }}
            />

            {/* Vintage paper texture overlay */}
            <div className="absolute inset-0 bg-radial-pattern opacity-10 pointer-events-none" />

            {/* Top Ornamental Badge */}
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative z-10 pt-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#767D63]/15 border border-[#767D63]/30 text-[#51583D] text-xs uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A676]" />
                <span>Wedding Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C2A676]" />
              </div>
            </motion.div>

            {/* Center Content: Monogram Seal & Names */}
            <div className="relative z-10 my-auto py-6 flex flex-col items-center max-w-[340px]">
              {/* Wax Monogram Seal */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.35 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#51583D] via-[#767D63] to-[#8F9878] p-[3px] shadow-lg mb-6 flex items-center justify-center animate-pulse-gold"
              >
                <div className="w-full h-full rounded-full border border-[#C2A676]/60 flex flex-col items-center justify-center text-[#FAF9F5] bg-[#3A402B]/80 backdrop-blur-sm">
                  <span className="font-serif text-2xl font-bold tracking-widest text-[#E8D8BA]">
                    {invitationData.monogram}
                  </span>
                  <div className="w-6 h-[1px] bg-[#C2A676]/60 mt-0.5" />
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-serif italic text-sm text-[#767D63] tracking-widest mb-1"
              >
                The Wedding of
              </motion.p>

              {/* Couple Names */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.65 }}
                className="font-serif text-4xl sm:text-5xl font-normal text-[#2C2B29] leading-tight mb-3"
              >
                <span className="italic block">{invitationData.groom.name}</span>
                <span className="font-script text-3xl text-[#C2A676] block my-[-8px]">&</span>
                <span className="italic block">{invitationData.bride.name}</span>
              </motion.h1>

              {/* Vintage Ornamental Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="w-40 my-3 opacity-80"
              >
                <img
                  src="./assets/G2-ornamen.png"
                  alt="Divider Ornament"
                  className="w-full h-auto mx-auto drop-shadow-sm filter brightness-95"
                />
              </motion.div>

              {/* Guest Greeting Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="mt-3 px-5 py-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#C2A676]/35 shadow-sm w-full"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#767D63] font-medium">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <h3 className="font-serif text-lg font-bold text-[#2C2B29] mt-1 tracking-wide line-clamp-1">
                  {guestName}
                </h3>
                <p className="text-[10px] text-[#8C867A] italic mt-0.5">
                  *Mohon maaf bila ada kesalahan penulisan nama/gelar
                </p>
              </motion.div>
            </div>

            {/* Bottom Button Action */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="relative z-10 w-full pb-6"
            >
              <button
                onClick={handleOpenInvitation}
                className="group relative w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#51583D] via-[#65744F] to-[#51583D] text-[#FAF9F5] font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-[#51583D]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#C2A676]/50"
              >
                <MailOpen className="w-4 h-4 text-[#E8D8BA] group-hover:rotate-12 transition-transform duration-300" />
                <span>Buka Undangan</span>
                <Heart className="w-3.5 h-3.5 text-[#E8D8BA] fill-[#E8D8BA] group-hover:scale-125 transition-transform duration-300" />
              </button>
              <p className="text-[10px] text-[#767D63] mt-2.5 tracking-wider uppercase">
                NikahHub • Digital Wedding Invitation
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
