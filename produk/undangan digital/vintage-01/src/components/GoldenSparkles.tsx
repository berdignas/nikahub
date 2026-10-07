import React from 'react';
import { motion } from 'framer-motion';

export const GoldenSparkles: React.FC = () => {
  const sparkles = [
    { id: 1, left: '10%', top: '20%', size: 4, duration: 3, delay: 0 },
    { id: 2, left: '25%', top: '45%', size: 6, duration: 4, delay: 1 },
    { id: 3, left: '80%', top: '15%', size: 5, duration: 3.5, delay: 0.5 },
    { id: 4, left: '85%', top: '65%', size: 7, duration: 4.5, delay: 1.5 },
    { id: 5, left: '50%', top: '80%', size: 4, duration: 3, delay: 2 },
    { id: 6, left: '15%', top: '90%', size: 5, duration: 4, delay: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.left, top: s.top }}
          animate={{
            y: [-10, -40, -10],
            opacity: [0.15, 0.7, 0.15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={s.size * 3}
            height={s.size * 3}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
              fill="#D4AF37"
              className="filter drop-shadow-[0_0_4px_#FFF3B0]"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
