import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-20 px-4 bg-[#FAF6F0] border-t-2 border-[#E6DCCE] text-center relative overflow-hidden">
      
      {/* Swaying Botanical Corners on Footer (Clean Non-Cropped Assets) */}
      <img
        src="./images/bunga_bottom_left_clean.webp"
        alt="Botanical Left"
        className="absolute -bottom-2 -left-2 w-36 sm:w-48 opacity-85 pointer-events-none z-10 animate-sway-bl origin-bottom-left"
      />
      <img
        src="./images/bunga_bottom_right_clean.webp"
        alt="Botanical Right"
        className="absolute -bottom-2 -right-2 w-36 sm:w-48 opacity-85 pointer-events-none z-10 animate-sway-br origin-bottom-right"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-6 relative z-20"
      >
        {/* Floral divider top */}
        <div className="flex justify-center mb-6">
          <img
            src="./images/bunga_divider.webp"
            alt="Floral divider"
            className="w-48 max-w-full opacity-90"
          />
        </div>

        <p className="text-xs sm:text-sm text-[#66554B] font-light leading-relaxed px-4 max-w-md mx-auto">
          {INVITATION_DATA.closing.message}
        </p>

        <h3 className="font-serif text-2xl font-bold text-[#8C6A43]">
          {INVITATION_DATA.closing.greeting}
        </h3>

        <div className="py-2">
          <p className="text-xs text-[#8C6A43] uppercase tracking-widest font-semibold mb-1">
            Kami yang berbahagia
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A] tracking-wide">
            {INVITATION_DATA.closing.signature}
          </h2>
          <p className="text-xs text-[#66554B] mt-1 font-light">
            Beserta Keluarga Besar
          </p>
        </div>

        <div className="pt-10 border-t border-[#E6DCCE]/80 flex flex-col items-center justify-center gap-2 text-xs text-[#8C6A43]">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>by <strong className="text-[#3D312A]">NikahHub</strong></span>
          </div>
          <p className="text-[10px] text-[#66554B]/80">
            © 2026 NikahHub Digital Wedding Invitation. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
