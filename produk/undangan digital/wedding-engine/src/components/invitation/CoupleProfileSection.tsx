'use client';

import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';
import { CoupleProfile } from '@/types';

interface CoupleProfileSectionProps {
  groom: CoupleProfile;
  bride: CoupleProfile;
}

export function CoupleProfileSection({ groom, bride }: CoupleProfileSectionProps) {
  const renderProfileCard = (profile: CoupleProfile, isReversed: boolean = false) => (
    <div className="flex flex-col items-center text-center max-w-xs sm:max-w-sm mx-auto">
      {/* Photo Frame with Vintage Gold Arch & Floral Accent */}
      <div className="relative mb-6">
        <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-gold p-1.5 bg-white/70 shadow-[0_15px_35px_rgba(100,75,60,0.2)]">
          <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Small floating flower badge */}
        <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-cream p-1 border border-gold shadow-md">
          <img
            src="/assets/flowers/vintage-rose.svg"
            alt="Flower accent"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Name and Family Info */}
      <h3 className="font-serif text-2xl sm:text-3xl text-vintage-900 font-semibold tracking-wide">
        {profile.fullName}
      </h3>
      <p className="text-xs uppercase tracking-widest text-gold-dark font-sans font-medium mt-1 mb-2">
        {profile.role === 'Groom' ? 'Mempelai Pria' : 'Mempelai Wanita'}
      </p>

      <p className="text-xs sm:text-sm text-vintage-700 font-serif leading-relaxed px-4">
        {profile.orderInFamily}
      </p>
      <p className="text-xs sm:text-sm font-serif font-semibold text-vintage-900 mt-1">
        Bapak {profile.father} & Ibu {profile.mother}
      </p>

      {profile.instagram && (
        <a
          href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-gold/40 text-vintage-700 hover:text-vintage-900 text-xs font-sans transition-colors"
        >
          <Instagram className="w-3.5 h-3.5 text-gold" />
          <span>{profile.instagram}</span>
        </a>
      )}
    </div>
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            Mempelai Bahagia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            Groom & Bride
          </h2>
          <VintageDivider />
        </div>
      </ScrollReveal>

      {/* Grid of Groom & Bride */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center relative">
        {/* Center Heart Icon for Desktop */}
        <div className="hidden md:flex absolute inset-x-0 top-1/3 justify-center z-10 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-cream/95 border border-gold flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-gold fill-gold/40" />
          </div>
        </div>

        <ScrollReveal animation="fadeUp" delay={0.2}>
          {renderProfileCard(groom, false)}
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.4}>
          {renderProfileCard(bride, true)}
        </ScrollReveal>
      </div>
    </div>
  );
}
