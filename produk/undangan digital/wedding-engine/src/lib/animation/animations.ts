'use client';

import { gsap, ScrollTrigger, checkReducedMotion } from './gsapUtils';
import { AnimationConfig } from '@/types';

export interface BaseAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: Element | string | null;
  scrollTriggerOptions?: ScrollTrigger.Vars;
  onComplete?: () => void;
  reducedMotion?: boolean;
}

/**
 * 1. fadeIn
 * Fades element from 0 to 1 opacity
 */
export function fadeIn(
  element: gsap.TweenTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  const duration = isReduced ? 0.2 : (options.duration ?? 1.2);
  const ease = options.ease ?? 'power2.out';

  if (options.trigger) {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        delay: options.delay ?? 0,
        ease,
        scrollTrigger: {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTriggerOptions,
        },
        onComplete: options.onComplete,
      }
    );
  }

  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay: options.delay ?? 0,
      ease,
      onComplete: options.onComplete,
    }
  );
}

/**
 * 2. fadeUp
 * Smoothly translates element from bottom with fade in
 */
export function fadeUp(
  element: gsap.TweenTarget,
  options: BaseAnimationOptions & { distance?: number } = {}
): gsap.core.Tween | gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  const distance = isReduced ? 0 : (options.distance ?? 40);
  const duration = isReduced ? 0.3 : (options.duration ?? 1.2);
  const ease = options.ease ?? 'power3.out';

  if (options.trigger) {
    return gsap.fromTo(
      element,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: options.delay ?? 0,
        ease,
        scrollTrigger: {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTriggerOptions,
        },
        onComplete: options.onComplete,
      }
    );
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay: options.delay ?? 0,
      ease,
      onComplete: options.onComplete,
    }
  );
}

/**
 * 3. fadeDown
 * Smoothly translates element from top with fade in
 */
export function fadeDown(
  element: gsap.TweenTarget,
  options: BaseAnimationOptions & { distance?: number } = {}
): gsap.core.Tween | gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  const distance = isReduced ? 0 : (options.distance ?? 40);
  const duration = isReduced ? 0.3 : (options.duration ?? 1.2);
  const ease = options.ease ?? 'power3.out';

  if (options.trigger) {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -distance },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: options.delay ?? 0,
        ease,
        scrollTrigger: {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTriggerOptions,
        },
        onComplete: options.onComplete,
      }
    );
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y: -distance },
    {
      opacity: 1,
      y: 0,
      duration,
      delay: options.delay ?? 0,
      ease,
      onComplete: options.onComplete,
    }
  );
}

/**
 * 4. scaleIn
 * Zooms element gently from smaller scale to normal scale
 */
export function scaleIn(
  element: gsap.TweenTarget,
  options: BaseAnimationOptions & { initialScale?: number } = {}
): gsap.core.Tween | gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  const initialScale = isReduced ? 0.98 : (options.initialScale ?? 0.85);
  const duration = isReduced ? 0.3 : (options.duration ?? 1.4);
  const ease = options.ease ?? 'expo.out';

  if (options.trigger) {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: initialScale },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay: options.delay ?? 0,
        ease,
        scrollTrigger: {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTriggerOptions,
        },
        onComplete: options.onComplete,
      }
    );
  }

  return gsap.fromTo(
    element,
    { opacity: 0, scale: initialScale },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay: options.delay ?? 0,
      ease,
      onComplete: options.onComplete,
    }
  );
}

/**
 * 5. slowZoom (Ken Burns effect)
 * Continuous subtle ambient zoom breathing effect
 */
export function slowZoom(
  element: gsap.TweenTarget,
  options: { duration?: number; scaleAmount?: number; ease?: string; reducedMotion?: boolean } = {}
): gsap.core.Tween {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) {
    return gsap.to(element, { scale: 1, duration: 0.1 });
  }

  const duration = options.duration ?? 16;
  const scaleAmount = options.scaleAmount ?? 1.12;
  const ease = options.ease ?? 'sine.inOut';

  return gsap.to(element, {
    scale: scaleAmount,
    duration,
    ease,
    repeat: -1,
    yoyo: true,
  });
}

/**
 * 6. parallax
 * Scroll-driven parallax motion tied to ScrollTrigger scrub
 */
export function parallax(
  element: gsap.TweenTarget,
  options: {
    speed?: number; // e.g., -50 (moves up faster), 50 (moves down slower)
    trigger?: Element | string | null;
    start?: string;
    end?: string;
    reducedMotion?: boolean;
  } = {}
): gsap.core.Tween | null {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) return null;

  const speed = options.speed ?? 40;
  const trigger = options.trigger || element;

  return gsap.fromTo(
    element,
    { y: -speed },
    {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: 1.2,
      },
    }
  );
}

/**
 * 7. sway
 * Gentle swaying back and forth like leaves or flowers in breeze
 */
export function sway(
  element: gsap.TweenTarget,
  options: {
    angle?: number;
    duration?: number;
    delay?: number;
    origin?: string;
    reducedMotion?: boolean;
  } = {}
): gsap.core.Tween | null {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) return null;

  const angle = options.angle ?? 5;
  const duration = options.duration ?? 3.5;
  const origin = options.origin ?? 'top center';

  gsap.set(element, { transformOrigin: origin });

  return gsap.fromTo(
    element,
    { rotation: -angle },
    {
      rotation: angle,
      duration,
      delay: options.delay ?? 0,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }
  );
}

/**
 * 8. floating
 * Organic floating up and down with subtle tilt
 */
export function floating(
  element: gsap.TweenTarget,
  options: {
    yDistance?: number;
    rotation?: number;
    duration?: number;
    delay?: number;
    reducedMotion?: boolean;
  } = {}
): gsap.core.Tween | null {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) return null;

  const yDistance = options.yDistance ?? 14;
  const rotation = options.rotation ?? 3;
  const duration = options.duration ?? 4.2;

  return gsap.fromTo(
    element,
    { y: -yDistance / 2, rotation: -rotation / 2 },
    {
      y: yDistance / 2,
      rotation: rotation / 2,
      duration,
      delay: options.delay ?? 0,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }
  );
}

/**
 * 9. leafFall / petalDrift
 * Simulates gentle floating falling leaf/petal animation
 */
export function leafFall(
  element: gsap.TweenTarget,
  options: {
    yTotal?: number;
    xDrift?: number;
    duration?: number;
    delay?: number;
    reducedMotion?: boolean;
  } = {}
): gsap.core.Timeline | null {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) return null;

  const yTotal = options.yTotal ?? 450;
  const xDrift = options.xDrift ?? 60;
  const duration = options.duration ?? 9;

  const tl = gsap.timeline({ repeat: -1, delay: options.delay ?? 0 });

  tl.fromTo(
    element,
    { y: -50, x: -xDrift, opacity: 0, rotation: -15 },
    {
      y: yTotal * 0.3,
      x: xDrift,
      opacity: 0.9,
      rotation: 20,
      duration: duration * 0.4,
      ease: 'sine.inOut',
    }
  )
    .to(element, {
      y: yTotal * 0.7,
      x: -xDrift * 0.8,
      rotation: -25,
      duration: duration * 0.4,
      ease: 'sine.inOut',
    })
    .to(element, {
      y: yTotal,
      x: xDrift * 0.5,
      opacity: 0,
      rotation: 35,
      duration: duration * 0.2,
      ease: 'power1.in',
    });

  return tl;
}

/**
 * 10. reveal
 * Curtain/Mask text or image reveal animation with clip-path
 */
export function reveal(
  element: gsap.TweenTarget,
  options: BaseAnimationOptions & { direction?: 'up' | 'down' | 'left' | 'right' | 'circle' } = {}
): gsap.core.Tween | gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  if (isReduced) {
    return fadeIn(element, options);
  }

  const direction = options.direction ?? 'up';
  const duration = options.duration ?? 1.4;
  const ease = options.ease ?? 'power3.inOut';

  let initialClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
  let finalClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

  if (direction === 'down') {
    initialClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  } else if (direction === 'left') {
    initialClip = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
  } else if (direction === 'right') {
    initialClip = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
  } else if (direction === 'circle') {
    initialClip = 'circle(0% at 50% 50%)';
    finalClip = 'circle(150% at 50% 50%)';
  }

  if (options.trigger) {
    return gsap.fromTo(
      element,
      { clipPath: initialClip, opacity: 0 },
      {
        clipPath: finalClip,
        opacity: 1,
        duration,
        delay: options.delay ?? 0,
        ease,
        scrollTrigger: {
          trigger: options.trigger,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTriggerOptions,
        },
        onComplete: options.onComplete,
      }
    );
  }

  return gsap.fromTo(
    element,
    { clipPath: initialClip, opacity: 0 },
    {
      clipPath: finalClip,
      opacity: 1,
      duration,
      delay: options.delay ?? 0,
      ease,
      onComplete: options.onComplete,
    }
  );
}

/**
 * 11. openingTransition
 * Cinematic envelope/gate unmasking transition from opening cover to full invitation
 */
export function openingTransition(
  openingElement: gsap.TweenTarget,
  contentElement: gsap.TweenTarget,
  options: {
    duration?: number;
    onComplete?: () => void;
    reducedMotion?: boolean;
  } = {}
): gsap.core.Timeline {
  const isReduced = options.reducedMotion ?? checkReducedMotion();
  const duration = isReduced ? 0.4 : (options.duration ?? 1.8);

  const tl = gsap.timeline({
    onComplete: options.onComplete,
  });

  if (isReduced) {
    tl.to(openingElement, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      .set(openingElement, { display: 'none' })
      .fromTo(contentElement, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    return tl;
  }

  // Dramatic cinematic camera zoom-through and gate dissolve
  tl.to(openingElement, {
    scale: 1.15,
    opacity: 0,
    filter: 'blur(10px)',
    duration: duration * 0.7,
    ease: 'power3.inOut',
    pointerEvents: 'none',
  })
    .fromTo(
      contentElement,
      {
        opacity: 0,
        scale: 0.94,
        y: 30,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: duration * 0.8,
        ease: 'power3.out',
      },
      `-=${duration * 0.4}`
    )
    .set(openingElement, { display: 'none' });

  return tl;
}

/**
 * Universal dispatcher to apply any animation configuration
 */
export function applyAnimation(
  element: HTMLElement | SVGElement | null,
  config?: AnimationConfig,
  triggerEl?: Element | null
): gsap.core.Tween | gsap.core.Timeline | null {
  if (!element || !config || config.type === 'none') return null;

  const baseOptions: BaseAnimationOptions = {
    duration: config.duration,
    delay: config.delay,
    ease: config.ease,
    trigger: config.trigger === 'scroll' ? (triggerEl || element) : undefined,
    scrollTriggerOptions: config.scrollTriggerOptions,
  };

  switch (config.type) {
    case 'fadeIn':
      return fadeIn(element, baseOptions);
    case 'fadeUp':
      return fadeUp(element, { ...baseOptions, distance: config.intensity || 40 });
    case 'fadeDown':
      return fadeDown(element, { ...baseOptions, distance: config.intensity || 40 });
    case 'scaleIn':
      return scaleIn(element, { ...baseOptions, initialScale: config.intensity || 0.85 });
    case 'slowZoom':
      return slowZoom(element, {
        duration: config.duration || 18,
        scaleAmount: config.intensity || 1.12,
        ease: config.ease,
      });
    case 'parallax':
      return parallax(element, {
        speed: config.parallaxSpeed || 50,
        trigger: triggerEl || element,
        start: config.scrollTriggerOptions?.start,
        end: config.scrollTriggerOptions?.end,
      });
    case 'sway':
      return sway(element, {
        angle: config.intensity || 6,
        duration: config.duration || 4,
        delay: config.delay,
      });
    case 'floating':
      return floating(element, {
        yDistance: config.intensity || 16,
        rotation: 4,
        duration: config.duration || 4.5,
        delay: config.delay,
      });
    case 'leafFall':
      return leafFall(element, {
        yTotal: 500,
        xDrift: config.intensity || 60,
        duration: config.duration || 9,
        delay: config.delay,
      });
    case 'reveal':
      return reveal(element, baseOptions);
    default:
      return null;
  }
}
