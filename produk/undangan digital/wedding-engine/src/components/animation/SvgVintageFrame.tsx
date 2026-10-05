'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, checkReducedMotion } from '@/lib/animation/gsapUtils';

interface SvgArchProps {
  className?: string;
  strokeColor?: string;
  animateStroke?: boolean;
}

export function VintageArchFrame({
  className = '',
  strokeColor = '#c9a86a',
  animateStroke = true,
}: SvgArchProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!animateStroke || !pathRef.current || checkReducedMotion()) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 85%',
        },
      }
    );
  }, [animateStroke]);

  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none ${className}`}
    >
      {/* Outer Arch */}
      <path
        ref={pathRef}
        d="M 40,580 L 40,240 C 40,110 130,20 200,20 C 270,20 360,110 360,240 L 360,580"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      {/* Inner Arch Accent */}
      <path
        d="M 52,570 L 52,245 C 52,125 135,35 200,35 C 265,35 348,125 348,245 L 348,570"
        stroke={strokeColor}
        strokeWidth="0.75"
        strokeDasharray="4 3"
        strokeOpacity="0.5"
      />
      {/* Top Keystone Floral Flourish */}
      <path
        d="M 185,20 Q 200,10 215,20 Q 200,28 185,20 Z"
        fill={strokeColor}
        fillOpacity="0.8"
      />
      <circle cx="200" cy="8" r="3" fill={strokeColor} fillOpacity="0.9" />
      <circle cx="180" cy="14" r="1.5" fill={strokeColor} fillOpacity="0.6" />
      <circle cx="220" cy="14" r="1.5" fill={strokeColor} fillOpacity="0.6" />
    </svg>
  );
}

export function VintageDivider({
  className = '',
  color = '#c9a86a',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div
        className="h-[1px] w-12 sm:w-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${color})`,
        }}
      />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path
          d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
          fill={color}
          fillOpacity="0.85"
        />
        <circle cx="12" cy="10" r="1.5" fill="#fff" />
      </svg>
      <div
        className="h-[1px] w-12 sm:w-20"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export function VintageCornerFlourish({
  position = 'top-left',
  color = '#c9a86a',
  className = '',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  className?: string;
}) {
  const getRotation = () => {
    switch (position) {
      case 'top-right':
        return 'rotate-90 top-3 right-3';
      case 'bottom-right':
        return 'rotate-180 bottom-3 right-3';
      case 'bottom-left':
        return '-rotate-90 bottom-3 left-3';
      default:
        return 'top-3 left-3';
    }
  };

  return (
    <div className={`absolute pointer-events-none ${getRotation()} ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path
          d="M2 58 V12 C2 6.5 6.5 2 12 2 H58"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <path
          d="M6 54 V16 C6 10.5 10.5 6 16 6 H54"
          stroke={color}
          strokeWidth="0.6"
          strokeDasharray="2 2"
          strokeOpacity="0.5"
        />
        <circle cx="2" cy="58" r="2" fill={color} />
        <circle cx="58" cy="2" r="2" fill={color} />
        {/* Ornate curl */}
        <path
          d="M12 12 C18 12 24 18 24 24 C24 30 18 30 18 24 C18 20 20 18 24 18"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
          fill="none"
        />
      </svg>
    </div>
  );
}
