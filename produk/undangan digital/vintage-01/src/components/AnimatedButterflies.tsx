import React from 'react';

export const AnimatedButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Butterfly 1 - Top Left Floating */}
      <div className="absolute top-28 left-6 sm:left-12 animate-butterfly-1">
        <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#C5A059] filter drop-shadow-md opacity-85">
          {/* Left Wing */}
          <path
            fill="currentColor"
            className="animate-wing origin-right"
            d="M 24 24 C 14 12, 4 16, 8 28 C 10 34, 18 36, 24 26 Z"
          />
          {/* Right Wing */}
          <path
            fill="#E6DCCE"
            className="animate-wing origin-left"
            d="M 24 24 C 34 12, 44 16, 40 28 C 38 34, 30 36, 24 26 Z"
          />
          {/* Body */}
          <ellipse cx="24" cy="24" rx="2" ry="7" fill="#5C4033" />
        </svg>
      </div>

      {/* Butterfly 2 - Mid Right Floating */}
      <div className="absolute top-[45vh] right-6 sm:right-16 animate-butterfly-2">
        <svg viewBox="0 0 48 48" className="w-7 h-7 text-[#A65B49] filter drop-shadow-md opacity-80">
          {/* Left Wing */}
          <path
            fill="currentColor"
            className="animate-wing origin-right"
            d="M 24 24 C 14 12, 4 16, 8 28 C 10 34, 18 36, 24 26 Z"
          />
          {/* Right Wing */}
          <path
            fill="#C5A059"
            className="animate-wing origin-left"
            d="M 24 24 C 34 12, 44 16, 40 28 C 38 34, 30 36, 24 26 Z"
          />
          {/* Body */}
          <ellipse cx="24" cy="24" rx="2" ry="7" fill="#3D312A" />
        </svg>
      </div>

      {/* Butterfly 3 - Bottom Floating */}
      <div className="absolute bottom-36 left-1/4 animate-butterfly-1">
        <svg viewBox="0 0 48 48" className="w-6 h-6 text-[#C5A059] filter drop-shadow-sm opacity-75">
          <path
            fill="currentColor"
            className="animate-wing origin-right"
            d="M 24 24 C 14 12, 4 16, 8 28 C 10 34, 18 36, 24 26 Z"
          />
          <path
            fill="#F5EFE6"
            className="animate-wing origin-left"
            d="M 24 24 C 34 12, 44 16, 40 28 C 38 34, 30 36, 24 26 Z"
          />
          <ellipse cx="24" cy="24" rx="1.5" ry="6" fill="#5C4033" />
        </svg>
      </div>
    </div>
  );
};
