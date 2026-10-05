import React from 'react';

export const GoldenSparkles: React.FC = () => {
  const sparkles = [
    { id: 1, top: '15%', left: '12%', delay: '0s', size: 'w-2 h-2' },
    { id: 2, top: '28%', right: '14%', delay: '1.2s', size: 'w-2.5 h-2.5' },
    { id: 3, top: '48%', left: '8%', delay: '2.4s', size: 'w-2 h-2' },
    { id: 4, top: '65%', right: '10%', delay: '0.8s', size: 'w-3 h-3' },
    { id: 5, top: '82%', left: '18%', delay: '1.8s', size: 'w-2 h-2' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full bg-[#C2A676] animate-sparkle shadow-gold ${s.size}`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};
