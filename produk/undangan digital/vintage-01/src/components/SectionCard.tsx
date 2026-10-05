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
      
      {/* Top Left & Top Right Swaying Floral Bouquets */}
      <img
        src="./images/bunga_top_left.webp"
        alt="Top Left Botanical Wreath"
        className="absolute top-0 left-0 w-36 sm:w-48 md:w-56 opacity-85 pointer-events-none z-10 animate-sway"
      />
      <img
        src="./images/bunga_top_right.webp"
        alt="Top Right Botanical Wreath"
        className="absolute top-0 right-0 w-36 sm:w-48 md:w-56 opacity-85 pointer-events-none z-10 animate-sway-reverse"
      />

      {/* Center Top Floral Crown Accent */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <img
          src="./images/bunga_leaf_center.webp"
          alt="Top Center Floral Crown"
          className="w-24 sm:w-32 opacity-80 filter drop-shadow-sm animate-pulse"
        />
      </div>

      {/* Main Section Inner Container */}
      <div className="relative z-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 110, damping: 15 }}
          className="bg-white/90 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl border-2 border-[#E6DCCE] shadow-2xl relative overflow-hidden group hover:border-[#C5A059] transition-colors duration-500"
        >
          {/* Subtle Golden Shimmer Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/40 via-transparent to-[#FAF6F0]/40 pointer-events-none" />

          {children}

          {/* Bottom Floral Divider inside card */}
          {showDividers && (
            <div className="flex justify-center items-center mt-10 pointer-events-none">
              <img
                src="./images/bunga_divider.webp"
                alt="Floral botanical divider"
                className="w-48 sm:w-64 max-w-full object-contain filter drop-shadow-sm opacity-90"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Left & Bottom Right Swaying Floral Bouquets */}
      <img
        src="./images/bunga_bottom_left.webp"
        alt="Bottom Left Botanical Wreath"
        className="absolute bottom-0 left-0 w-32 sm:w-44 md:w-52 opacity-85 pointer-events-none z-10 animate-sway-reverse"
      />
      <img
        src="./images/bunga_bottom_right.webp"
        alt="Bottom Right Botanical Wreath"
        className="absolute bottom-0 right-0 w-32 sm:w-44 md:w-52 opacity-85 pointer-events-none z-10 animate-sway"
      />
    </section>
  );
};
