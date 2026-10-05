'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Mail, Volume2, Sparkles, Heart } from 'lucide-react';
import { gsap } from '@/lib/animation/gsapUtils';
import { openingTransition } from '@/lib/animation/animations';
import { SwayingBotanical } from '../animation/SwayingBotanical';
import { FloatingPetals } from '../animation/FloatingPetals';
import { VintageArchFrame, VintageCornerFlourish } from '../animation/SvgVintageFrame';
import { CoupleProfile } from '@/types';

interface OpeningScreenProps {
  groom: CoupleProfile;
  bride: CoupleProfile;
  guestName: string;
  badge?: string;
  greeting?: string;
  onOpen: () => void;
  isOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}

export function OpeningScreen({
  groom,
  bride,
  guestName,
  badge = 'WEDDING INVITATION',
  greeting = 'Kepada Yth. Bapak/Ibu/Saudara/i',
  onOpen,
  isOpen,
  contentRef,
}: OpeningScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    if (containerRef.current && contentRef.current) {
      openingTransition(containerRef.current, contentRef.current, {
        duration: 1.6,
        onComplete: () => {
          onOpen();
        },
      });
    } else {
      onOpen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 select-none ${
        isOpen ? 'pointer-events-none opacity-0 invisible' : 'opacity-100 visible'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 40%, #faf8f5 0%, #ede3d4 70%, #dcd0be 100%)',
      }}
    >
      {/* Background Texture & Parallax Botanicals */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-[radial-gradient(#c9a86a_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Floating Canvas Petals */}
      <FloatingPetals count={26} type="mixed" />

      {/* Top Left Swaying Botanical Leaves */}
      <div className="absolute -top-10 -left-10 w-44 md:w-64 pointer-events-none z-10">
        <SwayingBotanical angle={7} duration={5} origin="top left">
          <img
            src="/assets/flowers/eucalyptus-branch.svg"
            alt="Eucalyptus leaf"
            className="w-full h-auto drop-shadow-md transform -rotate-45"
          />
        </SwayingBotanical>
      </div>

      {/* Top Right Swaying Botanical Branch */}
      <div className="absolute -top-10 -right-10 w-40 md:w-60 pointer-events-none z-10">
        <SwayingBotanical angle={-8} duration={4.5} origin="top right" delay={0.6}>
          <img
            src="/assets/leaves/olive-leaf.svg"
            alt="Olive leaf"
            className="w-full h-auto drop-shadow-md transform rotate-45 scale-x-[-1]"
          />
        </SwayingBotanical>
      </div>

      {/* Bottom Left Foliage */}
      <div className="absolute -bottom-10 -left-8 w-48 md:w-64 pointer-events-none z-10">
        <SwayingBotanical angle={6} duration={5.2} origin="bottom left" delay={1}>
          <img
            src="/assets/flowers/blooming-bouquet.svg"
            alt="Floral Bouquet"
            className="w-full h-auto drop-shadow-lg"
          />
        </SwayingBotanical>
      </div>

      {/* Bottom Right Rose Bloom */}
      <div className="absolute -bottom-8 -right-6 w-36 md:w-48 pointer-events-none z-10">
        <SwayingBotanical angle={-5} duration={4} origin="bottom right" delay={0.3}>
          <img
            src="/assets/flowers/vintage-rose.svg"
            alt="Vintage Rose"
            className="w-full h-auto drop-shadow-lg"
          />
        </SwayingBotanical>
      </div>

      {/* Center Vintage Card / Envelope Container */}
      <div className="relative z-20 w-[90%] max-w-[420px] mx-auto px-6 py-10 sm:py-12 rounded-3xl bg-cream/90 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(100,75,60,0.3)] border border-gold/40 text-center flex flex-col items-center">
        {/* Ornate Corner Flourishes */}
        <VintageCornerFlourish position="top-left" color="#c9a86a" />
        <VintageCornerFlourish position="top-right" color="#c9a86a" />
        <VintageCornerFlourish position="bottom-left" color="#c9a86a" />
        <VintageCornerFlourish position="bottom-right" color="#c9a86a" />

        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-100 border border-sage-300 text-sage-800 text-[11px] font-medium tracking-[0.25em] uppercase mb-4 shadow-sm">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>{badge}</span>
        </div>

        {/* The Wedding Of */}
        <p className="font-serif italic text-vintage-700 text-sm md:text-base tracking-widest mb-1">
          The Wedding Celebration of
        </p>

        {/* Couple Names */}
        <h1 className="font-serif text-3xl sm:text-4xl text-vintage-900 font-normal tracking-wide my-2 leading-tight">
          {groom.name} <span className="text-gold font-display text-4xl sm:text-5xl">&</span> {bride.name}
        </h1>

        {/* Ornate Line Divider */}
        <div className="flex items-center justify-center gap-2 my-3 w-full opacity-80">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-3.5 h-3.5 text-gold fill-gold/30" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Guest Name Card */}
        <div className="w-full my-4 p-4 rounded-2xl bg-white/70 border border-gold/30 shadow-inner">
          <p className="text-[11px] uppercase tracking-wider text-vintage-600 mb-1 font-sans">
            {greeting}
          </p>
          <p className="font-serif text-xl sm:text-2xl text-vintage-900 font-semibold tracking-wide capitalize">
            {guestName || 'Tamu Undangan'}
          </p>
          <p className="text-[10px] text-vintage-500 italic mt-1 font-sans">
            *Mohon maaf jika ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* "Buka Undangan" Button */}
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          aria-label="Buka Undangan"
          className="group relative mt-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-vintage-800 via-vintage-700 to-vintage-800 text-gold-light font-serif tracking-widest text-sm uppercase shadow-[0_10px_25px_rgba(100,75,60,0.4)] hover:shadow-[0_15px_30px_rgba(100,75,60,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2.5 overflow-hidden"
        >
          {/* Animated Glow Shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Pulsing ring indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>

          <Mail className="w-4 h-4 text-gold-light group-hover:scale-110 transition-transform" />
          <span className="font-medium">Buka Undangan</span>
        </button>

        {/* Audio notice */}
        <div className="mt-4 flex items-center gap-1.5 text-vintage-500 text-[10px] font-sans">
          <Volume2 className="w-3 h-3 text-gold" />
          <span>Musik latar akan diputar secara otomatis</span>
        </div>
      </div>
    </div>
  );
}
