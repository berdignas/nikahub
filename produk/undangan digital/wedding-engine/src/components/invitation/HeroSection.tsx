'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, ArrowDown } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageArchFrame, VintageDivider } from '../animation/SvgVintageFrame';
import { CoupleProfile, EventDetail } from '@/types';

interface HeroSectionProps {
  groom: CoupleProfile;
  bride: CoupleProfile;
  mainEvent: EventDetail;
  onScrollDown?: () => void;
}

export function HeroSection({ groom, bride, mainEvent, onScrollDown }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(mainEvent.dateISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [mainEvent.dateISO]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      {/* Decorative Vintage Arch Background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-[380px] h-[520px] pointer-events-none opacity-40">
        <VintageArchFrame animateStroke={true} />
      </div>

      <ScrollReveal animation="fadeDown" delay={0.2}>
        <p className="text-xs uppercase tracking-[0.3em] text-vintage-600 font-sans font-medium mb-3">
          WALIMATUL ‘URS
        </p>
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.4}>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-vintage-900 tracking-wide font-normal leading-tight my-2">
          {groom.name}
          <span className="block font-display text-4xl sm:text-5xl md:text-6xl text-gold my-1 font-normal">
            &
          </span>
          {bride.name}
        </h1>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn" delay={0.6}>
        <VintageDivider className="my-3" />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.7}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/80 backdrop-blur-sm border border-gold/30 text-vintage-800 text-xs sm:text-sm font-serif italic mb-6">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span>{mainEvent.date}</span>
        </div>
      </ScrollReveal>

      {/* Countdown Timer Grid */}
      <ScrollReveal animation="scaleIn" delay={0.9} className="w-full max-w-sm">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 p-4 rounded-2xl bg-cream/75 backdrop-blur-md border border-gold/30 shadow-lg">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 border border-gold/20 shadow-xs"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold text-vintage-900 leading-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-vintage-600 font-sans mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Scroll Down Indicator */}
      <ScrollReveal animation="fadeIn" delay={1.2}>
        <div className="mt-12 flex flex-col items-center text-vintage-500 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase mb-1 font-sans">Gulir ke bawah</span>
          <ArrowDown className="w-4 h-4 text-gold" />
        </div>
      </ScrollReveal>
    </div>
  );
}
