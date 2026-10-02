import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoScrollControllerProps {
  isCoverOpen: boolean;
}

const SPEED_OPTIONS = [
  { label: '1x', value: 130 },
  { label: '0.5x', value: 65 }
];

export const AutoScrollController: React.FC<AutoScrollControllerProps> = ({ isCoverOpen }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [speedIndex, setSpeedIndex] = useState<number>(0); // Default to 1x (130px/s)
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const scrollPosRef = useRef<number>(0);
  const isAutoScrollingRef = useRef<boolean>(false);
  const speedRef = useRef<number>(SPEED_OPTIONS[0].value);

  // Sync refs with state
  useEffect(() => {
    isAutoScrollingRef.current = isAutoScrolling;
  }, [isAutoScrolling]);

  useEffect(() => {
    speedRef.current = SPEED_OPTIONS[speedIndex].value;
  }, [speedIndex]);

  // Start auto scroll only after the opening cover transition has completely finished (1.6s)
  useEffect(() => {
    if (isCoverOpen) {
      scrollPosRef.current = window.scrollY;

      const timer = setTimeout(() => {
        scrollPosRef.current = window.scrollY;
        setIsAutoScrolling(true);
      }, 1600);

      const tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 7000);

      return () => {
        clearTimeout(timer);
        clearTimeout(tooltipTimer);
      };
    } else {
      setIsAutoScrolling(false);
    }
  }, [isCoverOpen]);

  // Silky smooth, jitter-free scroll loop
  useEffect(() => {
    if (!isAutoScrolling || !isCoverOpen) return;

    // Force browser to disable native smooth scroll fighting
    const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousBodyScrollBehavior = document.body.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    scrollPosRef.current = window.scrollY;
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollLoop = (now: number) => {
      if (!isAutoScrollingRef.current) return;

      // Cap delta time to prevent large jumps on frame drops
      const delta = Math.min(now - lastTime, 35);
      lastTime = now;

      // Re-sync if the user manually scrolled or swiped
      if (Math.abs(window.scrollY - scrollPosRef.current) > 10) {
        scrollPosRef.current = window.scrollY;
      }

      // Calculate next subpixel position
      scrollPosRef.current += (speedRef.current * delta) / 1000;

      // Direct instant scroll step without native smooth interpolation
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto'
      });

      // Stop when bottom of page is reached
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight - 30;
      if (scrollPosRef.current >= maxScroll) {
        setIsAutoScrolling(false);
        return;
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
      document.body.style.scrollBehavior = previousBodyScrollBehavior;
    };
  }, [isAutoScrolling, isCoverOpen]);

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling((prev) => {
      if (!prev) {
        scrollPosRef.current = window.scrollY;
      }
      return !prev;
    });
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeedIndex((prev) => (prev + 1) % SPEED_OPTIONS.length);
  }, []);

  if (!isCoverOpen) return null;

  return (
    <div className="fixed bottom-40 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Helper Tooltip Badge */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#473c27] text-[#f8f6e1] text-[10px] font-cinzel tracking-wider border border-[#685c46]/40 shadow-xl"
          >
            <span>{isAutoScrolling ? `Auto Jalan (${SPEED_OPTIONS[speedIndex].label})` : 'Putar Otomatis'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Speed Switcher Button */}
        {isAutoScrolling && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={cycleSpeed}
            title="Ubah Kecepatan Jalan"
            className="h-9 px-3 rounded-full bg-[#473c27]/90 text-[#d4af37] border border-[#d4af37]/60 shadow-lg text-[10px] font-cinzel font-bold tracking-wider flex items-center gap-1 hover:bg-[#473c27] active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <Zap className="w-3 h-3 text-[#d4af37]" />
            <span>{SPEED_OPTIONS[speedIndex].label}</span>
          </motion.button>
        )}

        {/* Floating Auto-Scroll Play/Pause Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={toggleAutoScroll}
          onMouseEnter={() => setShowTooltip(true)}
          aria-label={isAutoScrolling ? 'Hentikan Auto-Scroll' : 'Jalankan Auto-Scroll'}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border shadow-xl flex flex-col items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md ${
            isAutoScrolling
              ? 'bg-[#473c27] text-[#f8f6e1] border-[#d4af37] ring-2 ring-[#d4af37]/50 shadow-[#473c27]/50'
              : 'viding-card text-[#685c46] border-[#685c46]/40 hover:bg-[#473c27] hover:text-[#f8f6e1]'
          }`}
        >
          {/* Subtle gold glow pulse when active */}
          {isAutoScrolling && (
            <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#d4af37]"></span>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center">
            {isAutoScrolling ? (
              <>
                <Pause className="w-5 h-5 text-[#d4af37]" />
                <span className="text-[7px] font-cinzel font-bold tracking-tighter uppercase mt-0.5 text-[#f8f6e1]">
                  Pause
                </span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 ml-0.5 text-[#685c46] group-hover:text-[#f8f6e1]" />
                <span className="text-[7px] font-cinzel font-bold tracking-tighter uppercase mt-0.5">
                  Auto
                </span>
              </>
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
};
