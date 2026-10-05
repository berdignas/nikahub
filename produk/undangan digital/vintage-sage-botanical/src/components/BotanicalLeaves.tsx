import React from 'react';
import { motion } from 'framer-motion';

export const BotanicalLeaves: React.FC = () => {
  // Generate 12 floating botanical petals / leaves
  const leaves = [
    { id: 1, left: '8%', delay: 0, duration: 16, size: 22, rotStart: 15, rotEnd: 180 },
    { id: 2, left: '22%', delay: 4, duration: 18, size: 18, rotStart: -30, rotEnd: 120 },
    { id: 3, left: '38%', delay: 1.5, duration: 20, size: 24, rotStart: 45, rotEnd: 220 },
    { id: 4, left: '55%', delay: 6, duration: 17, size: 16, rotStart: -10, rotEnd: 150 },
    { id: 5, left: '72%', delay: 3, duration: 19, size: 20, rotStart: 60, rotEnd: 240 },
    { id: 6, left: '88%', delay: 8, duration: 22, size: 26, rotStart: -45, rotEnd: 190 },
    { id: 7, left: '15%', delay: 10, duration: 18, size: 19, rotStart: 20, rotEnd: 200 },
    { id: 8, left: '48%', delay: 12, duration: 21, size: 22, rotStart: -15, rotEnd: 160 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{
            y: -60,
            x: 0,
            opacity: 0,
            rotate: leaf.rotStart,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, leaf.id % 2 === 0 ? 30 : -30, 0],
            opacity: [0, 0.65, 0.75, 0.4, 0],
            rotate: [leaf.rotStart, leaf.rotEnd],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: leaf.left,
            width: leaf.size,
            height: leaf.size * 1.5,
          }}
        >
          {/* SVG Olive / Sage Botanical Leaf */}
          <svg
            viewBox="0 0 24 36"
            className="w-full h-full drop-shadow-sm opacity-60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2 2 12 2 24C2 30 7 34 12 34C17 34 22 30 22 24C22 12 12 2 12 2Z"
              fill="#767D63"
              fillOpacity="0.4"
            />
            <path
              d="M12 2V34M12 12L6 18M12 20L18 26M12 16L18 22M12 8L6 14"
              stroke="#51583D"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
