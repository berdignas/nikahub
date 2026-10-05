'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowUp } from 'lucide-react';
import { checkReducedMotion, setReducedMotionPreference } from '@/lib/animation/gsapUtils';

export function AccessibilityControls() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setReducedMotion(checkReducedMotion());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleReducedMotion = () => {
    const nextVal = !reducedMotion;
    setReducedMotion(nextVal);
    setReducedMotionPreference(nextVal);
    // Reload or refresh animations dynamically
    window.location.reload();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 select-none">
      {/* Reduced Motion Toggle Button */}
      <button
        onClick={toggleReducedMotion}
        title={reducedMotion ? 'Aktifkan Animasi' : 'Kurangi Animasi (Reduced Motion)'}
        aria-label="Toggle Reduced Motion"
        className="p-2.5 rounded-full bg-cream/90 backdrop-blur-md border border-gold/40 text-vintage-800 shadow-md hover:bg-white hover:scale-105 transition-all text-xs flex items-center gap-1.5"
      >
        {reducedMotion ? (
          <>
            <EyeOff className="w-3.5 h-3.5 text-vintage-500" />
            <span className="hidden sm:inline text-[11px] font-sans">Motion: Off</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline text-[11px] font-sans">Motion: On</span>
          </>
        )}
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Kembali ke Atas"
          aria-label="Scroll to top"
          className="p-2.5 rounded-full bg-cream/90 backdrop-blur-md border border-gold/40 text-vintage-800 shadow-md hover:bg-white hover:scale-105 transition-all"
        >
          <ArrowUp className="w-3.5 h-3.5 text-gold" />
        </button>
      )}
    </div>
  );
}
