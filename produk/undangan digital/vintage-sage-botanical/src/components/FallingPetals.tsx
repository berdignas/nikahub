import React from 'react';

export const FallingPetals: React.FC = () => {
  const petals = [
    { id: 1, left: '5%', delay: '0s', duration: '9s', size: 'w-4 h-6' },
    { id: 2, left: '25%', delay: '3.5s', duration: '11s', size: 'w-3 h-5' },
    { id: 3, left: '50%', delay: '1.8s', duration: '8.5s', size: 'w-5 h-7' },
    { id: 4, left: '75%', delay: '5s', duration: '12s', size: 'w-3.5 h-5.5' },
    { id: 5, left: '90%', delay: '2.2s', duration: '10s', size: 'w-4 h-6' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`absolute animate-petal ${p.size}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {/* SVG Romantic Sage & Cream Petal */}
          <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-sm opacity-65">
            <path
              d="M12 0 C18 8, 24 16, 20 26 C16 32, 8 32, 4 26 C0 16, 6 8, 12 0 Z"
              fill="#D7DFCB"
              fillOpacity="0.8"
            />
            <path
              d="M12 0 C14 10, 14 22, 12 30"
              stroke="#7E8F65"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
