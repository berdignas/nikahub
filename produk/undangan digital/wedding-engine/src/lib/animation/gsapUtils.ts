'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Checks if reduced motion is preferred by system or user setting
 */
export function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check localStorage override first
  const storedPreference = localStorage.getItem('wedding_reduced_motion');
  if (storedPreference !== null) {
    return storedPreference === 'true';
  }

  // Check OS / Browser media query
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function setReducedMotionPreference(enabled: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wedding_reduced_motion', String(enabled));
  }
}
