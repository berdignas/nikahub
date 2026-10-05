import React from 'react';

export const AnimatedDoves: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Dove Flying Right */}
      <div className="absolute top-24 left-0 animate-dove-right">
        <svg viewBox="0 0 64 64" className="w-12 h-12 text-white filter drop-shadow-md opacity-85">
          {/* Body */}
          <path
            fill="currentColor"
            d="M 10 32 C 18 22, 34 20, 48 26 C 54 28, 60 30, 58 35 C 52 40, 42 42, 32 40 C 24 38, 16 36, 10 32 Z"
          />
          {/* Wing (Animated Flutter) */}
          <path
            fill="#F5EFE6"
            className="animate-wing"
            d="M 28 26 C 24 10, 40 4, 46 16 C 40 20, 32 24, 28 26 Z"
          />
          {/* Olive Branch in Beak */}
          <path
            fill="#8C6A43"
            d="M 56 32 C 60 30, 62 28, 60 26 C 58 28, 56 30, 56 32 Z"
          />
        </svg>
      </div>

      {/* Dove Flying Left */}
      <div className="absolute top-64 right-0 animate-dove-left">
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-white filter drop-shadow-md opacity-80">
          {/* Body */}
          <path
            fill="currentColor"
            d="M 10 32 C 18 22, 34 20, 48 26 C 54 28, 60 30, 58 35 C 52 40, 42 42, 32 40 C 24 38, 16 36, 10 32 Z"
          />
          {/* Wing */}
          <path
            fill="#F5EFE6"
            className="animate-wing"
            d="M 28 26 C 24 10, 40 4, 46 16 C 40 20, 32 24, 28 26 Z"
          />
        </svg>
      </div>
    </div>
  );
};
