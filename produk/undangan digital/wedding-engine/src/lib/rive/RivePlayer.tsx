'use client';

import React, { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { checkReducedMotion } from '../animation/gsapUtils';

export interface RivePlayerProps {
  src?: string;
  artboard?: string;
  stateMachines?: string | string[];
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  fallbackContent?: React.ReactNode;
}

function InnerRive({
  src,
  artboard,
  stateMachines,
  autoplay = true,
  className,
  fallbackContent,
}: RivePlayerProps) {
  const [error, setError] = useState(false);
  const isReduced = checkReducedMotion();

  const { RiveComponent } = useRive({
    src: src || '',
    artboard,
    stateMachines,
    autoplay: !isReduced && autoplay,
    onLoadError: () => setError(true),
  });

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {fallbackContent || (
          <div className="p-4 rounded-xl border border-gold/30 bg-cream/80 text-vintage-700 text-xs text-center">
            Vintage Interactive Element
          </div>
        )}
      </div>
    );
  }

  return <RiveComponent className={className} />;
}

export function RivePlayer(props: RivePlayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center ${props.className || ''}`}
        style={{ width: props.width ?? '100%', height: props.height ?? '100%' }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${props.className || ''}`}
      style={{ width: props.width ?? '100%', height: props.height ?? '100%' }}
    >
      <InnerRive {...props} />
    </div>
  );
}
