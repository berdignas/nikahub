'use client';

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { checkReducedMotion } from '../animation/gsapUtils';

export interface LottiePlayerProps {
  src?: string;
  data?: object;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  fallbackIcon?: React.ReactNode;
}

export function LottiePlayer({
  src,
  data,
  autoplay = true,
  loop = true,
  className = 'w-full h-full',
  width,
  height,
  fallbackIcon,
}: LottiePlayerProps) {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsReducedMotion(checkReducedMotion());
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: width ?? '100%', height: height ?? '100%' }}
      >
        {fallbackIcon || <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />}
      </div>
    );
  }

  if (hasError || (!src && !data)) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: width ?? '100%', height: height ?? '100%' }}
      >
        {fallbackIcon || (
          <svg className="w-12 h-12 text-gold/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: width ?? '100%', height: height ?? '100%' }}
    >
      <DotLottieReact
        src={src}
        data={data as any}
        autoplay={!isReducedMotion && autoplay}
        loop={!isReducedMotion && loop}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
