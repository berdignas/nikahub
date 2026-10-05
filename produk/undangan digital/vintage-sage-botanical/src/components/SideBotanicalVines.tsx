import React from 'react';

export const SideBotanicalVines: React.FC = () => {
  return (
    <>
      {/* Left Flanking Botanical Branch (Swaying Top Left) */}
      <div className="absolute top-6 -left-3 sm:-left-6 pointer-events-none z-10 animate-sway-tl origin-top-left filter drop-shadow-sm">
        <svg width="60" height="140" viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 sm:w-16 h-auto">
          <defs>
            <linearGradient id="sageLeafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9EAF84" />
              <stop offset="50%" stopColor="#65744F" />
              <stop offset="100%" stopColor="#3D4730" />
            </linearGradient>
            <linearGradient id="sageGoldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="60%" stopColor="#C2A676" />
              <stop offset="100%" stopColor="#9C8157" />
            </linearGradient>
          </defs>

          {/* Main Stem curving inwards */}
          <path d="M5 0 C15 40, 25 80, 45 135" stroke="#51583D" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Leaf 1 (Top Left) */}
          <path d="M8 20 C2 10, 15 5, 26 14 C28 22, 16 26, 8 20 Z" fill="url(#sageLeafGradLeft)" />
          {/* Leaf 2 (Right facing inward) */}
          <path d="M12 35 C28 25, 42 32, 38 45 C30 52, 18 42, 12 35 Z" fill="url(#sageLeafGradLeft)" />
          {/* Golden Bud Accent */}
          <circle cx="39" cy="32" r="3" fill="url(#sageGoldLeafGrad)" className="animate-pulse" />

          {/* Leaf 3 (Golden Eucalyptus Leaf) */}
          <path d="M16 60 C8 50, 12 40, 28 48 C32 58, 24 68, 16 60 Z" fill="url(#sageGoldLeafGrad)" />
          
          {/* Leaf 4 (Inward Flourish) */}
          <path d="M22 80 C40 68, 55 76, 52 90 C42 98, 28 88, 22 80 Z" fill="url(#sageLeafGradLeft)" />
          <circle cx="53" cy="76" r="2.5" fill="url(#sageGoldLeafGrad)" />

          {/* Leaf 5 (Lower Sage Leaf) */}
          <path d="M28 105 C18 95, 22 85, 36 94 C40 102, 34 112, 28 105 Z" fill="url(#sageLeafGradLeft)" />

          {/* Tip Leaf */}
          <path d="M42 130 C48 120, 58 125, 54 136 C48 140, 44 135, 42 130 Z" fill="url(#sageGoldLeafGrad)" />
        </svg>
      </div>

      {/* Right Flanking Botanical Branch (Swaying Top Right) */}
      <div className="absolute top-6 -right-3 sm:-right-6 pointer-events-none z-10 animate-sway-tr origin-top-right filter drop-shadow-sm">
        <svg width="60" height="140" viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 sm:w-16 h-auto">
          <defs>
            <linearGradient id="sageLeafGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9EAF84" />
              <stop offset="50%" stopColor="#65744F" />
              <stop offset="100%" stopColor="#3D4730" />
            </linearGradient>
          </defs>

          {/* Main Stem curving inwards from right */}
          <path d="M55 0 C45 40, 35 80, 15 135" stroke="#51583D" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Leaf 1 (Top Right) */}
          <path d="M52 20 C58 10, 45 5, 34 14 C32 22, 44 26, 52 20 Z" fill="url(#sageLeafGradRight)" />
          {/* Leaf 2 (Left facing inward) */}
          <path d="M48 35 C32 25, 18 32, 22 45 C30 52, 42 42, 48 35 Z" fill="url(#sageLeafGradRight)" />
          {/* Golden Bud Accent */}
          <circle cx="21" cy="32" r="3" fill="url(#sageGoldLeafGrad)" className="animate-pulse" />

          {/* Leaf 3 (Golden Eucalyptus Leaf) */}
          <path d="M44 60 C52 50, 48 40, 32 48 C28 58, 36 68, 44 60 Z" fill="url(#sageGoldLeafGrad)" />
          
          {/* Leaf 4 (Inward Flourish) */}
          <path d="M38 80 C20 68, 5 76, 8 90 C18 98, 32 88, 38 80 Z" fill="url(#sageLeafGradRight)" />
          <circle cx="7" cy="76" r="2.5" fill="url(#sageGoldLeafGrad)" />

          {/* Leaf 5 (Lower Sage Leaf) */}
          <path d="M32 105 C42 95, 38 85, 24 94 C20 102, 26 112, 32 105 Z" fill="url(#sageLeafGradRight)" />

          {/* Tip Leaf */}
          <path d="M18 130 C12 120, 2 125, 6 136 C12 140, 16 135, 18 130 Z" fill="url(#sageGoldLeafGrad)" />
        </svg>
      </div>
    </>
  );
};
