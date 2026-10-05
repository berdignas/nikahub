import React from 'react';

export const FallingPetals: React.FC = () => {
  const petals = Array.from({ length: 14 });

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 6;
        const size = 16 + Math.random() * 18;
        const isGolden = i % 3 === 0;

        return (
          <div
            key={i}
            className="absolute animate-petal"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            {isGolden ? (
              /* Golden leaf/petal SVG */
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#C5A059] opacity-70 filter drop-shadow">
                <path
                  fill="currentColor"
                  d="M12,2 C15,7 20,10 20,15 C20,18.866 16.418,22 12,22 C7.582,22 4,18.866 4,15 C4,10 9,7 12,2 Z"
                />
              </svg>
            ) : (
              /* Soft Rose Petal SVG */
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#E8B4B8] opacity-60 filter drop-shadow">
                <path
                  fill="currentColor"
                  d="M12,3 C17,5 21,9 19,16 C17,21 11,21 7,18 C4,15 5,9 12,3 Z"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};
