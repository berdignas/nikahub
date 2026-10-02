import React from 'react';

// Royal Monogram Crest NF
export const RoyalCrest: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ornate laurel wreath */}
      <circle cx="80" cy="80" r="74" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="80" cy="80" r="68" stroke="url(#goldGradient)" strokeWidth="2" />
      <circle cx="80" cy="80" r="62" stroke="url(#goldGradient)" strokeWidth="0.75" />
      
      {/* Crown on top */}
      <path d="M68 38L72 44L80 34L88 44L92 38L95 50H65L68 38Z" fill="url(#goldGradient)" />
      <circle cx="80" cy="33" r="2.5" fill="#C5A059" />
      <circle cx="68" cy="37" r="2" fill="#C5A059" />
      <circle cx="92" cy="37" r="2" fill="#C5A059" />

      {/* Ornate leaves around circle */}
      <path d="M40 80C36 70 38 58 46 50C48 58 45 68 40 80Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M120 80C124 70 122 58 114 50C112 58 115 68 120 80Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M42 95C38 105 42 115 50 120C48 112 46 103 42 95Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M118 95C122 105 118 115 110 120C112 112 114 103 118 95Z" fill="url(#goldGradient)" opacity="0.8" />

      {/* Decorative filigree flourishes at bottom */}
      <path d="M60 124C70 128 80 132 90 128C84 125 76 125 60 124Z" fill="url(#goldGradient)" />

      <defs>
        <linearGradient id="goldGradient" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8A6726" />
          <stop offset="0.35" stopColor="#C5A059" />
          <stop offset="0.7" stopColor="#EADCB9" />
          <stop offset="1" stopColor="#9B7830" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center pt-2">
      <span className="font-royal-title text-2xl font-bold tracking-widest text-[#8A6726] drop-shadow-sm">
        NF
      </span>
    </div>
  </div>
);

// Majestic Peacock Tail Feather Motif
export const PeacockFeather: React.FC<{ className?: string }> = ({ className = "w-16 h-28" }) => (
  <svg viewBox="0 0 100 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 175C50 120 48 60 50 15" stroke="url(#featherGold)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Feather Eye (Ocellus) */}
    <ellipse cx="50" cy="50" rx="32" ry="40" fill="url(#peacockEmerald)" stroke="url(#featherGold)" strokeWidth="2" />
    <ellipse cx="50" cy="52" rx="22" ry="28" fill="#1B3425" />
    <ellipse cx="50" cy="55" rx="14" ry="18" fill="url(#featherGold)" />
    <circle cx="50" cy="57" r="8" fill="#244230" />
    <circle cx="48" cy="55" r="3" fill="#EADCB9" />

    {/* Radiant feather barbs */}
    <path d="M48 90C30 85 15 100 5 115" stroke="url(#peacockEmerald)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M52 90C70 85 85 100 95 115" stroke="url(#peacockEmerald)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M49 110C35 110 20 125 10 140" stroke="url(#featherGold)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M51 110C65 110 80 125 90 140" stroke="url(#featherGold)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M50 130C38 135 25 145 18 160" stroke="url(#peacockEmerald)" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 130C62 135 75 145 82 160" stroke="url(#peacockEmerald)" strokeWidth="1" strokeLinecap="round" />

    <defs>
      <linearGradient id="featherGold" x1="0" y1="0" x2="100" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C5A059" />
        <stop offset="0.5" stopColor="#EADCB9" />
        <stop offset="1" stopColor="#9B7830" />
      </linearGradient>
      <linearGradient id="peacockEmerald" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B5B49" />
        <stop offset="0.6" stopColor="#53705D" />
        <stop offset="1" stopColor="#244230" />
      </linearGradient>
    </defs>
  </svg>
);

// Majestic Royal Peacock Pair Facing
export const RoyalPeacockPair: React.FC<{ className?: string }> = ({ className = "w-full max-w-sm h-16" }) => (
  <div className={`flex items-center justify-between px-4 ${className}`}>
    {/* Left Peacock Silhouette */}
    <div className="transform -scale-x-100 opacity-80 hover:opacity-100 transition-opacity">
      <PeacockFeather className="w-8 h-14" />
    </div>

    {/* Center Royal Divider */}
    <div className="flex-1 flex items-center justify-center px-4 gap-2">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
      <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A059] bg-[#FAF8F5]"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></div>
      <div className="w-2.5 h-2.5 rotate-45 border border-[#C5A059] bg-[#FAF8F5]"></div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
    </div>

    {/* Right Peacock Silhouette */}
    <div className="opacity-80 hover:opacity-100 transition-opacity">
      <PeacockFeather className="w-8 h-14" />
    </div>
  </div>
);

// Floral Corner Ornaments for Royal Cards
export const FloralCorner: React.FC<{ className?: string; position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  className = "w-24 h-24",
  position = 'top-left'
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-[-1]';
      default: return '';
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={`${className} ${getTransform()}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0C30 0 70 15 85 45C95 65 98 85 100 100C85 98 65 95 45 85C15 70 0 30 0 0Z" fill="url(#cornerGold)" opacity="0.15" />
      <path d="M5 5C25 5 50 18 65 38C75 50 78 68 80 80" stroke="url(#cornerGold)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 25C15 25 35 32 45 45C55 58 58 75 60 85" stroke="#53705D" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      {/* Flower petals */}
      <circle cx="35" cy="35" r="6" fill="#FAF8F5" stroke="url(#cornerGold)" strokeWidth="1.5" />
      <circle cx="35" cy="35" r="2.5" fill="#C5A059" />
      <circle cx="58" cy="22" r="4" fill="#FAF8F5" stroke="url(#cornerGold)" strokeWidth="1" />
      <circle cx="22" cy="58" r="4" fill="#FAF8F5" stroke="url(#cornerGold)" strokeWidth="1" />

      <defs>
        <linearGradient id="cornerGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8A6726" />
          <stop offset="0.5" stopColor="#C5A059" />
          <stop offset="1" stopColor="#EADCB9" />
        </linearGradient>
      </defs>
    </svg>
  );
};
