import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoScrollControllerProps {
  isCoverOpen: boolean;
}

const SPEED_OPTIONS = [
  { label: '1x', value: 90 },
  { label: '0.5x', value: 45 },
  { label: '1.5x', value: 140 },
];

export const AutoScrollController: React.FC<AutoScrollControllerProps> = ({ isCoverOpen }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [speedIndex, setSpeedIndex] = useState<number>(0); // default 1x
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const scrollPosRef = useRef<number>(0);
  const isAutoScrollingRef = useRef<boolean>(false);
  const speedRef = useRef<number>(SPEED_OPTIONS[0].value);

  useEffect(() => {
    isAutoScrollingRef.current = isAutoScrolling;
  }, [isAutoScrolling]);

  useEffect(() => {
    speedRef.current = SPEED_OPTIONS[speedIndex].value;
  }, [speedIndex]);

  // Start auto scroll automatically after opening invitation
  useEffect(() => {
    if (!isCoverOpen) {
      scrollPosRef.current = window.scrollY;

      const timer = setTimeout(() => {
        scrollPosRef.current = window.scrollY;
        setIsAutoScrolling(true);
      }, 1500);

      const tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(tooltipTimer);
      };
    } else {
      setIsAutoScrolling(false);
    }
  }, [isCoverOpen]);

  // Smooth requestAnimationFrame scroll loop
  useEffect(() => {
    if (!isAutoScrolling || isCoverOpen) return;

    const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousBodyScrollBehavior = document.body.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    scrollPosRef.current = window.scrollY;
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollLoop = (now: number) => {
      if (!isAutoScrollingRef.current) return;

      const delta = Math.min(now - lastTime, 35);
      lastTime = now;

      if (Math.abs(window.scrollY - scrollPosRef.current) > 15) {
        scrollPosRef.current = window.scrollY;
      }

      scrollPosRef.current += (speedRef.current * delta) / 1000;

      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto',
      });

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight - 20;
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

  // User manual touch/wheel pauses auto-scroll seamlessly
  const handleUserTouch = useCallback(() => {
    scrollPosRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('touchstart', handleUserTouch, { passive: true });
    window.addEventListener('wheel', handleUserTouch, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleUserTouch);
      window.removeEventListener('wheel', handleUserTouch);
    };
  }, [handleUserTouch]);

  const toggleAutoScroll = () => {
    scrollPosRef.current = window.scrollY;
    setIsAutoScrolling((prev) => !prev);
    setShowTooltip(false);
  };

  const cycleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeedIndex((prev) => (prev + 1) % SPEED_OPTIONS.length);
  };

  if (isCoverOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Tooltip hint */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.85 }}
            className="px-3 py-1.5 rounded-xl bg-[#2C2B29]/95 text-white text-[11px] shadow-xl border border-[#C2A676]/40 flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 text-[#C2A676] animate-pulse" />
            <span>Putar Otomatis Aktif</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Control Pill */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-1.5 p-1 rounded-full bg-[#1A1D16]/90 border border-[#C2A676]/50 shadow-2xl backdrop-blur-md"
      >
        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoScroll}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAutoScrolling
              ? 'bg-[#51583D] text-[#E8D8BA] shadow-inner'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isAutoScrolling ? 'Jeda Putar Otomatis' : 'Mulai Putar Otomatis'}
        >
          {isAutoScrolling ? (
            <Pause className="w-4 h-4 fill-current animate-pulse" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Speed Selector (0.5x / 1x / 1.5x) */}
        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1.5 rounded-full bg-[#51583D]/60 hover:bg-[#51583D] border border-[#C2A676]/40 text-[11px] font-bold text-[#E8D8BA] tracking-wider transition-colors"
          title="Ubah Kecepatan Putar (0.5x / 1x / 1.5x)"
        >
          {SPEED_OPTIONS[speedIndex].label}
        </button>
      </motion.div>
    </div>
  );
};
