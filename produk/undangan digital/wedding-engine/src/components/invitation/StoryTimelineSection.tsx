'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';
import { StoryMilestone } from '@/types';

interface StoryTimelineSectionProps {
  title?: string;
  subtitle?: string;
  milestones: StoryMilestone[];
}

export function StoryTimelineSection({
  title = 'Our Love Story',
  subtitle = 'Kisah Perjalanan Cinta Kami',
  milestones,
}: StoryTimelineSectionProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            {title}
          </h2>
          <VintageDivider />
        </div>
      </ScrollReveal>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 ml-2 sm:ml-4 border-l-2 border-dashed border-gold/40 space-y-12">
        {milestones.map((item, idx) => (
          <ScrollReveal key={idx} animation="fadeUp" delay={idx * 0.15}>
            <div className="relative group">
              {/* Timeline Marker Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-cream border-2 border-gold flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform duration-300">
                <Heart className="w-2.5 h-2.5 text-gold fill-gold/40" />
              </div>

              {/* Milestone Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/75 backdrop-blur-sm border border-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-vintage-100 text-vintage-800 text-[10px] font-sans font-semibold tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-xs text-vintage-500 font-serif italic">{item.date}</span>
                </div>

                <h3 className="font-serif text-xl text-vintage-900 font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="font-serif text-xs sm:text-sm text-vintage-700 leading-relaxed">
                  {item.description}
                </p>

                {item.photo && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gold/20 aspect-video max-h-48">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
