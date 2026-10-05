import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-[#F5EFE6] border-t border-[#E6DCCE] text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-6"
      >
        <p className="text-xs sm:text-sm text-[#66554B] font-light leading-relaxed px-4">
          {INVITATION_DATA.closing.message}
        </p>

        <h3 className="font-serif text-2xl font-bold text-[#8C6A43]">
          {INVITATION_DATA.closing.greeting}
        </h3>

        <h2 className="font-script text-4xl text-[#3D312A]">
          {INVITATION_DATA.closing.signature}
        </h2>

        <div className="pt-8 border-t border-[#E6DCCE] flex items-center justify-center gap-1.5 text-xs text-[#8C6A43] font-medium">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>by Punakawan Digital</span>
        </div>
      </motion.div>
    </footer>
  );
};
