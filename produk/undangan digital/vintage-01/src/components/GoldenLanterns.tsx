import React from 'react';
import { motion } from 'framer-motion';

interface GoldenLanternsProps {
  position?: 'top' | 'corner';
}

export const GoldenLanterns: React.FC<GoldenLanternsProps> = () => {
  return (
    <>
      {/* Left Hanging Lantern */}
      <div className="absolute -top-3 left-4 sm:left-8 pointer-events-none z-20 animate-sway-tl origin-top filter drop-shadow-md">
        <svg width="34" height="95" viewBox="0 0 34 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4C2" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#7A5818" />
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#FFD15C" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFAA00" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hanging Cord */}
          <line x1="17" y1="0" x2="17" y2="35" stroke="#8C6A43" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="17" cy="35" r="2.5" fill="url(#lanternGold)" />

          {/* Lantern Cap */}
          <path d="M10 40 L17 35 L24 40 L22 43 L12 43 Z" fill="url(#lanternGold)" />

          {/* Glowing Center */}
          <circle cx="17" cy="55" r="14" fill="url(#lanternGlow)" className="animate-pulse" />

          {/* Glass Cage */}
          <path d="M11 43 L8 55 L12 70 L22 70 L26 55 L23 43 Z" fill="#FFF9E6" fillOpacity="0.3" stroke="url(#lanternGold)" strokeWidth="1.5" />
          
          {/* Inner Candle Flame */}
          <ellipse cx="17" cy="56" rx="2" ry="4" fill="#FF8C00" className="animate-ping" />
          <ellipse cx="17" cy="55" rx="1.5" ry="3" fill="#FFF" />

          {/* Lantern Base & Tassel */}
          <path d="M12 70 L17 76 L22 70 Z" fill="url(#lanternGold)" />
          <line x1="17" y1="76" x2="17" y2="88" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="17" cy="88" r="2" fill="url(#lanternGold)" />
        </svg>
      </div>

      {/* Right Hanging Lantern */}
      <div className="absolute -top-3 right-4 sm:right-8 pointer-events-none z-20 animate-sway-tr origin-top filter drop-shadow-md">
        <svg width="34" height="95" viewBox="0 0 34 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hanging Cord */}
          <line x1="17" y1="0" x2="17" y2="45" stroke="#8C6A43" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="17" cy="45" r="2.5" fill="url(#lanternGold)" />

          {/* Lantern Cap */}
          <path d="M10 50 L17 45 L24 50 L22 53 L12 53 Z" fill="url(#lanternGold)" />

          {/* Glowing Center */}
          <circle cx="17" cy="65" r="14" fill="url(#lanternGlow)" className="animate-pulse" />

          {/* Glass Cage */}
          <path d="M11 53 L8 65 L12 80 L22 80 L26 65 L23 53 Z" fill="#FFF9E6" fillOpacity="0.3" stroke="url(#lanternGold)" strokeWidth="1.5" />
          
          {/* Inner Candle Flame */}
          <ellipse cx="17" cy="66" rx="2" ry="4" fill="#FF8C00" className="animate-ping" />
          <ellipse cx="17" cy="65" rx="1.5" ry="3" fill="#FFF" />

          {/* Lantern Base & Tassel */}
          <path d="M12 80 L17 86 L22 80 Z" fill="url(#lanternGold)" />
          <line x1="17" y1="86" x2="17" y2="95" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      </div>
    </>
  );
};
