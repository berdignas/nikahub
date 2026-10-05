'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, checkReducedMotion } from '@/lib/animation/gsapUtils';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // negative: faster upward, positive: slower downward
  className?: string;
  style?: React.CSSProperties;
  enableMouseTilt?: boolean;
}

export function ParallaxLayer({
  children,
  speed = 40,
  className = '',
  style = {},
  enableMouseTilt = false,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current || checkReducedMotion()) return;

    const el = layerRef.current;
    const parentSection = el.closest('section') || el.parentElement;

    const ctx = gsap.context(() => {
      // Scroll-driven parallax
      gsap.fromTo(
        el,
        { y: -speed },
        {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: parentSection || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // Mouse tilt parallax on desktop
      if (enableMouseTilt && window.innerWidth > 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const deltaX = (clientX - centerX) / centerX;
          const deltaY = (clientY - centerY) / centerY;

          gsap.to(el, {
            x: deltaX * (speed * 0.3),
            rotationY: deltaX * 3,
            rotationX: -deltaY * 3,
            duration: 1.2,
            ease: 'power2.out',
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, layerRef);

    return () => ctx.revert();
  }, [speed, enableMouseTilt]);

  return (
    <div
      ref={layerRef}
      className={`relative will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
