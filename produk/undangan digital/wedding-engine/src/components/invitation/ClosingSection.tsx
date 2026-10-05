'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';

interface ClosingSectionProps {
  message?: string;
  coupleNames?: string;
  footnote?: string;
}

export function ClosingSection({
  message = 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.',
  coupleNames = 'Dion & Sarah',
  footnote = '© 2026 Dion & Sarah Wedding Invitation. Built with Wedding Engine.',
}: ClosingSectionProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-6 pt-16 pb-28 text-center select-none">
      <ScrollReveal animation="fadeDown">
        <div className="w-12 h-12 rounded-full bg-cream border border-gold/40 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Heart className="w-5 h-5 text-gold fill-gold/30" />
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.2}>
        <h2 className="font-serif text-2xl sm:text-3xl text-vintage-900 font-semibold mb-3">
          Terima Kasih
        </h2>
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.3}>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-700 leading-relaxed max-w-lg mx-auto mb-6">
          &ldquo;{message}&rdquo;
        </p>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn" delay={0.4}>
        <VintageDivider className="my-4" />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.5}>
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-vintage-600 mb-1">
          KAMI YANG BERBAHAGIA
        </p>
        <h3 className="font-display text-4xl sm:text-5xl text-gold font-normal my-2">
          {coupleNames}
        </h3>
        <p className="font-serif text-xs text-vintage-600">
          Beserta Keluarga Besar
        </p>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn" delay={0.7}>
        <div className="mt-16 pt-6 border-t border-gold/20 text-[10px] text-vintage-400 font-sans tracking-wider">
          {footnote}
        </div>
      </ScrollReveal>
    </div>
  );
}
