import React from 'react';
import { motion } from 'framer-motion';
import { SideBotanicalVines } from './SideBotanicalVines';

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showDividers?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children, className = '', id, showDividers = true }) => {
  return (
    <section id={id} className={`relative py-12 px-3 sm:px-6 ${className}`}>
      
      {/* Main Section Inner Container with Flanking Left & Right Vines */}
      <div className="relative z-20 max-w-xl mx-auto">
        
        {/* Left & Right Flanking Botanical Vines (Berhadapan Kanan Kiri) */}
        <SideBotanicalVines />

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 15 }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border-2 border-[#E6DCCE] shadow-xl relative overflow-hidden group hover:border-[#C5A059] transition-all duration-500 hover:shadow-gold"
        >
          {/* Subtle Golden Shimmer Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/60 via-transparent to-[#FAF6F0]/60 pointer-events-none" />

          {/* Top Elegant Gold Crest / Filigree */}
          <div className="flex justify-center mb-6 pointer-events-none">
            <svg width="120" height="18" viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
              <path d="M0 9 H45 M75 9 H120" stroke="#C5A059" strokeWidth="1" />
              <circle cx="60" cy="9" r="3.5" fill="#C5A059" />
              <circle cx="50" cy="9" r="2" fill="#8C6A43" />
              <circle cx="70" cy="9" r="2" fill="#8C6A43" />
            </svg>
          </div>

          {children}

          {/* Bottom Floral Divider inside card */}
          {showDividers && (
            <div className="flex justify-center items-center mt-8 pointer-events-none">
              <img
                src="./images/bunga_divider.webp"
                alt="Floral botanical divider"
                className="w-48 sm:w-64 max-w-full object-contain filter drop-shadow-sm opacity-85"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
