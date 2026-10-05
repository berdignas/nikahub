'use client';

import React from 'react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';

interface AyatQuoteSectionProps {
  bismillahSrc?: string;
  arabicText?: string;
  translation?: string;
  source?: string;
}

export function AyatQuoteSection({
  bismillahSrc = '/assets/ornaments/bismillah-calligraphy.svg',
  arabicText = 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  translation = 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.',
  source = 'QS. Ar-Rum: 21',
}: AyatQuoteSectionProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto px-6 py-20 text-center select-none">
      {/* Bismillah Calligraphy */}
      <ScrollReveal animation="fadeDown">
        <div className="w-56 sm:w-72 mx-auto mb-6 opacity-90 drop-shadow-sm">
          <img src={bismillahSrc} alt="Bismillah" className="w-full h-auto" />
        </div>
      </ScrollReveal>

      {/* Arabic Ayat */}
      <ScrollReveal animation="fadeUp" delay={0.2}>
        <p className="font-serif text-lg sm:text-2xl leading-loose text-vintage-900 mb-6 px-2 text-right sm:text-center dir-rtl">
          {arabicText}
        </p>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn" delay={0.4}>
        <VintageDivider className="my-4" />
      </ScrollReveal>

      {/* Indonesian Translation */}
      <ScrollReveal animation="fadeUp" delay={0.5}>
        <p className="font-serif italic text-xs sm:text-sm text-vintage-700 leading-relaxed max-w-lg mx-auto">
          &ldquo;{translation}&rdquo;
        </p>
      </ScrollReveal>

      {/* Source Citation */}
      <ScrollReveal animation="fadeUp" delay={0.7}>
        <div className="mt-4 inline-block px-3 py-1 rounded-full bg-cream/70 border border-gold/30 text-vintage-600 text-xs font-sans font-medium tracking-wider">
          {source}
        </div>
      </ScrollReveal>
    </div>
  );
}
