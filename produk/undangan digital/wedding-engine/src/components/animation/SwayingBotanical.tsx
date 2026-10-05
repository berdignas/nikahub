'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, checkReducedMotion } from '@/lib/animation/gsapUtils';
import { sway } from '@/lib/animation/animations';

interface SwayingBotanicalProps {
  children: React.ReactNode;
  angle?: number;
  duration?: number;
  delay?: number;
  origin?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SwayingBotanical({
  children,
  angle = 6,
  duration = 4.2,
  delay = 0,
  origin = 'top center',
  className = '',
  style = {},
}: SwayingBotanicalProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      sway(elementRef.current, {
        angle,
        duration,
        delay,
        origin,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [angle, duration, delay, origin]);

  return (
    <div
      ref={elementRef}
      className={`relative inline-block pointer-events-none will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
