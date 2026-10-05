import React from 'react';
import { motion } from 'framer-motion';

export const GoldenButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* Butterfly 1: Large Gold Butterfly - Floating Top Left to Right */}
      <motion.div
        className="absolute"
        initial={{ x: '-10vw', y: '15vh', rotate: 15 }}
        animate={{
          x: ['0vw', '45vw', '90vw', '110vw'],
          y: ['15vh', '22vh', '12vh', '25vh'],
          rotate: [15, 25, 5, 30],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative group filter drop-shadow-[0_4px_10px_rgba(197,160,89,0.5)]">
          <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldWing1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#AA7A1E" />
                <stop offset="100%" stopColor="#5E3F0A" />
              </linearGradient>
              <linearGradient id="goldAccent1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F5D77F" />
                <stop offset="100%" stopColor="#C5A059" />
              </linearGradient>
              <radialGradient id="sparkleGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF8DB" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing Aura */}
            <circle cx="50" cy="50" r="35" fill="url(#sparkleGlow1)" className="animate-pulse" />

            {/* Left Wing with Realistic Flapping */}
            <g className="animate-wing origin-[50px_50px]">
              {/* Upper Wing */}
              <path
                d="M50 48 C40 20, 15 10, 8 28 C2 42, 22 58, 50 52 Z"
                fill="url(#goldWing1)"
                stroke="#FFE28A"
                strokeWidth="1.2"
              />
              {/* Inner Wing Pattern */}
              <path
                d="M45 46 C38 28, 22 22, 16 32 C12 40, 26 50, 45 48 Z"
                fill="url(#goldAccent1)"
                opacity="0.85"
              />
              <circle cx="20" cy="30" r="2.5" fill="#FFFFFF" />
              <circle cx="28" cy="24" r="1.5" fill="#FFFFFF" />
              {/* Lower Wing */}
              <path
                d="M50 52 C35 60, 18 68, 22 82 C25 90, 42 85, 50 58 Z"
                fill="url(#goldWing1)"
                stroke="#FFE28A"
                strokeWidth="1.2"
              />
              <path
                d="M47 55 C38 62, 26 68, 28 76 C30 80, 40 76, 47 60 Z"
                fill="url(#goldAccent1)"
                opacity="0.8"
              />
            </g>

            {/* Right Wing with Flapping */}
            <g className="animate-wing origin-[50px_50px]" style={{ animationDelay: '0.05s' }}>
              {/* Upper Wing */}
              <path
                d="M50 48 C60 20, 85 10, 92 28 C98 42, 78 58, 50 52 Z"
                fill="url(#goldWing1)"
                stroke="#FFE28A"
                strokeWidth="1.2"
              />
              {/* Inner Wing Pattern */}
              <path
                d="M55 46 C62 28, 78 22, 84 32 C88 40, 74 50, 55 48 Z"
                fill="url(#goldAccent1)"
                opacity="0.85"
              />
              <circle cx="80" cy="30" r="2.5" fill="#FFFFFF" />
              <circle cx="72" cy="24" r="1.5" fill="#FFFFFF" />
              {/* Lower Wing */}
              <path
                d="M50 52 C65 60, 82 68, 78 82 C75 90, 58 85, 50 58 Z"
                fill="url(#goldWing1)"
                stroke="#FFE28A"
                strokeWidth="1.2"
              />
              <path
                d="M53 55 C62 62, 74 68, 72 76 C70 80, 60 76, 53 60 Z"
                fill="url(#goldAccent1)"
                opacity="0.8"
              />
            </g>

            {/* Butterfly Body & Antennae */}
            <ellipse cx="50" cy="52" rx="3" ry="16" fill="#3D2808" />
            <ellipse cx="50" cy="52" rx="1.5" ry="14" fill="#D4AF37" />
            {/* Antennae */}
            <path d="M49 38 Q42 26 38 28" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M51 38 Q58 26 62 28" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="28" r="1.5" fill="#FFE28A" />
            <circle cx="62" cy="28" r="1.5" fill="#FFE28A" />
          </svg>
        </div>
      </motion.div>

      {/* Butterfly 2: Medium Gold Butterfly - Floating Mid-Right */}
      <motion.div
        className="absolute"
        initial={{ x: '105vw', y: '50vh', rotate: -20 }}
        animate={{
          x: ['105vw', '60vw', '15vw', '-15vw'],
          y: ['50vh', '42vh', '58vh', '48vh'],
          rotate: [-20, -10, -35, -15],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      >
        <div className="relative filter drop-shadow-[0_4px_8px_rgba(197,160,89,0.45)]">
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="#goldWing1" />
            {/* Left Wing */}
            <g className="animate-wing origin-[50px_50px]">
              <path d="M50 48 C40 20, 15 10, 8 28 C2 42, 22 58, 50 52 Z" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
              <path d="M50 52 C35 60, 18 68, 22 82 C25 90, 42 85, 50 58 Z" fill="#AA7A1E" />
            </g>
            {/* Right Wing */}
            <g className="animate-wing origin-[50px_50px]" style={{ animationDelay: '0.04s' }}>
              <path d="M50 48 C60 20, 85 10, 92 28 C98 42, 78 58, 50 52 Z" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
              <path d="M50 52 C65 60, 82 68, 78 82 C75 90, 58 85, 50 58 Z" fill="#AA7A1E" />
            </g>
            <ellipse cx="50" cy="52" rx="2.5" ry="14" fill="#3D2808" />
            <circle cx="50" cy="38" r="2.5" fill="#FFE28A" />
          </svg>
        </div>
      </motion.div>

      {/* Butterfly 3: Lower Floating Golden Butterfly */}
      <motion.div
        className="absolute"
        initial={{ x: '-10vw', y: '75vh', rotate: 10 }}
        animate={{
          x: ['-10vw', '35vw', '80vw', '110vw'],
          y: ['75vh', '82vh', '70vh', '78vh'],
          rotate: [10, 25, 0, 20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 11,
        }}
      >
        <div className="relative filter drop-shadow-[0_3px_6px_rgba(197,160,89,0.4)]">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="animate-wing origin-[50px_50px]">
              <path d="M50 48 C40 20, 15 10, 8 28 C2 42, 22 58, 50 52 Z" fill="#C5A059" />
              <path d="M50 52 C35 60, 18 68, 22 82 C25 90, 42 85, 50 58 Z" fill="#AA7A1E" />
            </g>
            <g className="animate-wing origin-[50px_50px]">
              <path d="M50 48 C60 20, 85 10, 92 28 C98 42, 78 58, 50 52 Z" fill="#C5A059" />
              <path d="M50 52 C65 60, 82 68, 78 82 C75 90, 58 85, 50 58 Z" fill="#AA7A1E" />
            </g>
            <ellipse cx="50" cy="52" rx="2" ry="12" fill="#2E1C05" />
          </svg>
        </div>
      </motion.div>

    </div>
  );
};
