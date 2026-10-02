import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Share2, 
  Calendar, 
  ArrowUp, 
  Check, 
  Copy, 
  Sparkles, 
  Send,
  QrCode
} from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA } from '../data/invitationData';
import { WeddingQrCard } from './WeddingQrCard';

export const FooterSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const handleShare = () => {
    const shareData = {
      title: `Undangan Pernikahan Alfarisyi & Maulidiyah`,
      text: `Assalamu'alaikum Wr. Wb. Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di pernikahan Alfarisyi & Maulidiyah:`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#52B788', '#E65C7B']
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative min-h-[960px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center pt-24 pb-28 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.couplePalaceBg})` }}
    >
      {/* 1. Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[#b8c4ae]/88 pointer-events-none"></div>

      {/* 2. Top Draped Green Velvet Curtain */}
      <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
        <img src={THEME_ASSETS.curtainTop} alt="Curtain" className="w-full object-contain drop-shadow-md" />
      </div>

      {/* 3. Animated Blooming Foliage & Waving Roses */}
      <div className="absolute top-20 -left-16 w-56 pointer-events-none z-10 opacity-90">
        <img src={THEME_ASSETS.foliageGif1} alt="Floral" className="w-full object-contain" />
      </div>
      <div className="absolute top-24 -right-16 w-56 pointer-events-none z-10 opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif2} alt="Floral" className="w-full object-contain" />
      </div>

      {/* 4. Fluttering Butterflies */}
      <div className="absolute top-52 right-4 w-16 pointer-events-none z-20">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>
      <div className="absolute bottom-48 left-4 w-16 pointer-events-none z-20 transform -scale-x-100">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>

      {/* 5. Center Content */}
      <div className="relative z-20 w-full max-w-sm flex flex-col items-center">
        
        {/* Royal Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-28 h-28 rounded-full bg-[#f8f6e1] border-2 border-[#685c46]/50 shadow-2xl flex flex-col items-center justify-center mb-8 p-3 group"
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-[#685c46]/40 pointer-events-none"></div>
          <span className="font-cinzel text-[9px] tracking-[0.25em] text-[#685c46] uppercase font-bold">
            Royal Seal
          </span>
          <span className="font-aston text-3xl text-[#473c27] -mt-1 leading-none">
            A & M
          </span>
          <span className="font-cinzel text-[8px] tracking-widest text-[#685c46] mt-0.5">
            2026
          </span>
        </motion.div>

        {/* Closing Thank You Text */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="viding-card rounded-[32px] p-6 sm:p-7 border-2 border-[#685c46]/35 shadow-xl mb-8 backdrop-blur-md"
        >
          <div className="w-16 mx-auto mb-3 opacity-90">
            <img src={THEME_ASSETS.goldLeafBranch} alt="Gold Leaves" className="w-full object-contain" />
          </div>

          <h3 className="font-aston text-3xl sm:text-4xl text-[#473c27] mb-2">
            Terima Kasih
          </h3>

          <p className="font-roman text-sm text-[#473c27] italic leading-relaxed mb-4">
            "Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu bagi kedua mempelai."
          </p>

          <p className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#685c46] font-bold mb-2">
            Kami yang berbahagia,
          </p>

          <h4 className="font-aston text-3xl sm:text-4xl text-[#473c27] mb-1">
            {INVITATION_DATA.groom.nickname} & {INVITATION_DATA.bride.nickname}
          </h4>

          <p className="font-roman text-xs text-[#685c46] italic mb-6">
            Beserta segenap keluarga besar kedua mempelai
          </p>

          {/* Action Buttons: Calendar, Share, & QR Code */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#685c46]/20">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Alfarisyi+%26+Maulidiyah&dates=20261013T120000Z/20261014T150000Z&details=Pernikahan+Ahmad+Ferdi+Al-Farisyi+%26+Nur+Thoifah+Maulidiyah&location=7RG6%2B8MQ+Wrati,+Pasuruan,+Jawa+Timur"
                target="_blank"
                rel="noopener noreferrer"
                className="viding-btn flex-1 py-2.5 px-3 rounded-full text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-[#685c46]" />
                <span className="font-cinzel tracking-wider uppercase">Google Calendar</span>
              </a>

              <button
                onClick={handleShare}
                className="viding-btn flex-1 py-2.5 px-3 rounded-full text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-cinzel tracking-wider uppercase">Tautan Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#685c46]" />
                    <span className="font-cinzel tracking-wider uppercase">Bagikan Undangan</span>
                  </>
                )}
              </button>
            </div>

            {/* Botanical Wedding QR Code Card Button */}
            <button
              onClick={() => setShowQrModal(true)}
              className="w-full py-3 px-4 rounded-full bg-[#243f29] text-[#faf8f5] text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:bg-[#1a301f] active:scale-95 transition-all cursor-pointer border border-[#d4af37]/40"
            >
              <QrCode className="w-4 h-4 text-[#d4af37]" />
              <span>Kartu QR Undangan (Botanical Design)</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>
          </div>
        </motion.div>

        {/* Royal Peacock Pair Ornament */}
        <RoyalPeacockPair className="max-w-[240px] mb-8" />

        {/* Back to Top Floating Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f8f6e1] border border-[#685c46]/40 text-[#473c27] text-xs font-cinzel font-semibold hover:bg-[#ece5da] transition-all shadow-md active:scale-95 mb-10"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#685c46]" />
          <span>Kembali ke Atas</span>
        </button>

        {/* Aristocratic Footer Badge */}
        <div className="pt-6 border-t border-[#685c46]/30 w-full text-center">
          <p className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#473c27] font-bold">
            The Royal Wedding of Alfarisyi & Maulidiyah
          </p>
          <p className="font-roman text-xs text-[#685c46] italic mt-1">
            Garden Serenade & Royal Peacock Edition • 2026
          </p>
          <p className="font-cinzel text-[9px] tracking-widest text-[#685c46]/80 uppercase mt-2">
            Inspired by Viding Theme 183 • All Rights Reserved
          </p>
        </div>

      </div>

      {/* Botanical Wedding QR Modal */}
      <WeddingQrCard isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </footer>
  );
};
