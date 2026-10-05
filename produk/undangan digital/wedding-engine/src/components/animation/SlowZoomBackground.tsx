'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, checkReducedMotion } from '@/lib/animation/gsapUtils';
import { slowZoom } from '@/lib/animation/animations';

interface SlowZoomBackgroundProps {
  children?: React.ReactNode;
  src?: string;
  className?: string;
  duration?: number;
  scaleAmount?: number;
  overlayGradient?: string;
}

export function SlowZoomBackground({
  children,
  src,
  className = '',
  duration = 16,
  scaleAmount = 1.1,
  overlayGradient = 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)',
}: SlowZoomBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current || checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      slowZoom(bgRef.current, {
        duration,
        scaleAmount,
      });
    }, bgRef);

    return () => ctx.revert();
  }, [duration, scaleAmount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {children}
      </div>
      {overlayGradient && (
        <div
          className="absolute inset-0 z-1"
          style={{ background: overlayGradient }}
        />
      )}
    </div>
  );
}
