import React from 'react';
import { motion } from 'framer-motion';

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  showDividers?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ children, className = '', id, showDividers = true }) => {
  return (
    <section id={id} className={`relative py-16 px-4 sm:px-6 overflow-hidden ${className}`}>
      
      {/* Top Left & Top Right High-Visibility Swaying Floral Bouquets */}
      <img
        src="./images/bunga_top_left.webp"
        alt="Top Left Botanical Wreath"
        className="absolute top-0 left-0 w-36 sm:w-52 md:w-60 opacity-90 pointer-events-none z-10 animate-sway-tl filter drop-shadow-sm"
      />
      <img
        src="./images/bunga_top_right.webp"
        alt="Top Right Botanical Wreath"
        className="absolute top-0 right-0 w-36 sm:w-52 md:w-60 opacity-90 pointer-events-none z-10 animate-sway-tr filter drop-shadow-sm"
      />

      {/* Center Top Floral Crown Accent */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <img
          src="./images/bunga_leaf_center.webp"
          alt="Top Center Floral Crown"
          className="w-28 sm:w-36 opacity-85 filter drop-shadow-sm animate-pulse"
        />
      </div>

      {/* Main Section Inner Container */}
      <div className="relative z-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
          className="bg-white/95 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl border-2 border-[#E6DCCE] shadow-2xl relative overflow-hidden group hover:border-[#C5A059] transition-all duration-500 hover:shadow-gold"
        >
          {/* Subtle Golden Shimmer Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/50 via-transparent to-[#FAF6F0]/50 pointer-events-none" />

          {children}

          {/* Bottom Floral Divider inside card */}
          {showDividers && (
            <div className="flex justify-center items-center mt-10 pointer-events-none">
              <img
                src="./images/bunga_divider.webp"
                alt="Floral botanical divider"
                className="w-52 sm:w-72 max-w-full object-contain filter drop-shadow-sm opacity-90"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Left & Bottom Right High-Visibility Swaying Floral Bouquets */}
      <img
        src="./images/bunga_bottom_left.webp"
        alt="Bottom Left Botanical Wreath"
        className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-56 opacity-90 pointer-events-none z-10 animate-sway-bl filter drop-shadow-sm"
      />
      <img
        src="./images/bunga_bottom_right.webp"
        alt="Bottom Right Botanical Wreath"
        className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-56 opacity-90 pointer-events-none z-10 animate-sway-br filter drop-shadow-sm"
      />
    </section>
  );
};
