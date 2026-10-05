import React from 'react';

interface SideBotanicalVinesProps {
  variant?: 'green-gold' | 'eucalyptus' | 'warm-vintage';
}

export const SideBotanicalVines: React.FC<SideBotanicalVinesProps> = ({ variant = 'green-gold' }) => {
  return (
    <>
      {/* Left Flanking Botanical Vine (Berhadapan Kiri) */}
      <div className="absolute top-8 -left-3 sm:-left-6 pointer-events-none z-10 animate-sway-tl origin-top-left filter drop-shadow-sm">
        <svg width="60" height="140" viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 sm:w-16 h-auto">
          <defs>
            <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C9A86" />
              <stop offset="50%" stopColor="#5E7058" />
              <stop offset="100%" stopColor="#3E4C3A" />
            </linearGradient>
            <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6A43" />
            </linearGradient>
          </defs>

          {/* Main Stem curving inwards */}
          <path d="M5 0 C15 40, 25 80, 45 135" stroke="#7A6855" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Leaf 1 (Top Left) */}
          <path d="M8 20 C2 10, 15 5, 26 14 C28 22, 16 26, 8 20 Z" fill="url(#leafGradLeft)" />
          {/* Leaf 2 (Right facing inward) */}
          <path d="M12 35 C28 25, 42 32, 38 45 C30 52, 18 42, 12 35 Z" fill="url(#leafGradLeft)" />
          {/* Golden Bud Accent */}
          <circle cx="39" cy="32" r="3" fill="url(#goldLeafGrad)" className="animate-pulse" />

          {/* Leaf 3 (Golden Eucalyptus Leaf) */}
          <path d="M16 60 C8 50, 12 40, 28 48 C32 58, 24 68, 16 60 Z" fill="url(#goldLeafGrad)" />
          
          {/* Leaf 4 (Inward Flourish) */}
          <path d="M22 80 C40 68, 55 76, 52 90 C42 98, 28 88, 22 80 Z" fill="url(#leafGradLeft)" />
          <circle cx="53" cy="76" r="2.5" fill="url(#goldLeafGrad)" />

          {/* Leaf 5 (Lower Sage Leaf) */}
          <path d="M28 105 C18 95, 22 85, 36 94 C40 102, 34 112, 28 105 Z" fill="url(#leafGradLeft)" />

          {/* Tip Leaf */}
          <path d="M42 130 C48 120, 58 125, 54 136 C48 140, 44 135, 42 130 Z" fill="url(#goldLeafGrad)" />
        </svg>
      </div>

      {/* Right Flanking Botanical Vine (Berhadapan Kanan) */}
      <div className="absolute top-8 -right-3 sm:-right-6 pointer-events-none z-10 animate-sway-tr origin-top-right filter drop-shadow-sm">
        <svg width="60" height="140" viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 sm:w-16 h-auto">
          <defs>
            <linearGradient id="leafGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C9A86" />
              <stop offset="50%" stopColor="#5E7058" />
              <stop offset="100%" stopColor="#3E4C3A" />
            </linearGradient>
          </defs>

          {/* Main Stem curving inwards from right */}
          <path d="M55 0 C45 40, 35 80, 15 135" stroke="#7A6855" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Leaf 1 (Top Right) */}
          <path d="M52 20 C58 10, 45 5, 34 14 C32 22, 44 26, 52 20 Z" fill="url(#leafGradRight)" />
          {/* Leaf 2 (Left facing inward) */}
          <path d="M48 35 C32 25, 18 32, 22 45 C30 52, 42 42, 48 35 Z" fill="url(#leafGradRight)" />
          {/* Golden Bud Accent */}
          <circle cx="21" cy="32" r="3" fill="url(#goldLeafGrad)" className="animate-pulse" />

          {/* Leaf 3 (Golden Eucalyptus Leaf) */}
          <path d="M44 60 C52 50, 48 40, 32 48 C28 58, 36 68, 44 60 Z" fill="url(#goldLeafGrad)" />
          
          {/* Leaf 4 (Inward Flourish) */}
          <path d="M38 80 C20 68, 5 76, 8 90 C18 98, 32 88, 38 80 Z" fill="url(#leafGradRight)" />
          <circle cx="7" cy="76" r="2.5" fill="url(#goldLeafGrad)" />

          {/* Leaf 5 (Lower Sage Leaf) */}
          <path d="M32 105 C42 95, 38 85, 24 94 C20 102, 26 112, 32 105 Z" fill="url(#leafGradRight)" />

          {/* Tip Leaf */}
          <path d="M18 130 C12 120, 2 125, 6 136 C12 140, 16 135, 18 130 Z" fill="url(#goldLeafGrad)" />
        </svg>
      </div>
    </>
  );
};
