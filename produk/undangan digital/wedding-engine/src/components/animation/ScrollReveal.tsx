'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, checkReducedMotion } from '@/lib/animation/gsapUtils';
import { AnimationType } from '@/types';
import { fadeIn, fadeUp, fadeDown, scaleIn, reveal } from '@/lib/animation/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  startTrigger?: string;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  animation = 'fadeUp',
  duration = 1.2,
  delay = 0,
  distance = 35,
  className = '',
  startTrigger = 'top 85%',
  staggerChildren = 0,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isReduced = checkReducedMotion();
    const el = containerRef.current;

    const ctx = gsap.context(() => {
      const targets = staggerChildren > 0 && el.children.length > 0 ? Array.from(el.children) : el;

      if (isReduced) {
        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay,
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
        return;
      }

      if (animation === 'fadeUp') {
        gsap.fromTo(
          targets,
          { opacity: 0, y: distance },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: staggerChildren,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (animation === 'fadeDown') {
        gsap.fromTo(
          targets,
          { opacity: 0, y: -distance },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: staggerChildren,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (animation === 'scaleIn') {
        gsap.fromTo(
          targets,
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            stagger: staggerChildren,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else if (animation === 'reveal') {
        gsap.fromTo(
          targets,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: duration * 1.2,
            delay,
            stagger: staggerChildren,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else {
        // Default fadeIn
        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            stagger: staggerChildren,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animation, duration, delay, distance, startTrigger, staggerChildren]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
