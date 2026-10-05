import React from 'react';

export const AnimatedDoves: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {/* Dove 1 Flying Right with Olive Leaf */}
      <div className="absolute top-20 left-0 animate-dove-right">
        <svg viewBox="0 0 64 64" className="w-12 h-12 text-white filter drop-shadow-md opacity-90">
          {/* Dove Body */}
          <path
            fill="currentColor"
            d="M 10 32 C 18 22, 34 20, 48 26 C 54 28, 60 30, 58 35 C 52 40, 42 42, 32 40 C 24 38, 16 36, 10 32 Z"
          />
          {/* Wing with Flapping Animation */}
          <path
            fill="#F4EFE6"
            className="animate-wing"
            d="M 28 26 C 24 10, 40 4, 46 16 C 40 20, 32 24, 28 26 Z"
          />
          {/* Olive Branch in Beak */}
          <path
            fill="#767D63"
            d="M 56 32 C 60 30, 62 28, 60 26 C 58 28, 56 30, 56 32 Z"
          />
        </svg>
      </div>

      {/* Dove 2 Flying Left */}
      <div className="absolute top-72 right-0 animate-dove-left">
        <svg viewBox="0 0 64 64" className="w-10 h-10 text-white filter drop-shadow-md opacity-85">
          {/* Dove Body */}
          <path
            fill="currentColor"
            d="M 10 32 C 18 22, 34 20, 48 26 C 54 28, 60 30, 58 35 C 52 40, 42 42, 32 40 C 24 38, 16 36, 10 32 Z"
          />
          {/* Wing */}
          <path
            fill="#F4EFE6"
            className="animate-wing"
            d="M 28 26 C 24 10, 40 4, 46 16 C 40 20, 32 24, 28 26 Z"
          />
          {/* Olive Branch */}
          <path
            fill="#C2A676"
            d="M 56 32 C 60 30, 62 28, 60 26 C 58 28, 56 30, 56 32 Z"
          />
        </svg>
      </div>
    </div>
  );
};
