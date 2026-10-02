import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlayTrigger: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay restriction:', err));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating Audio Controller */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-24 right-4 sm:right-6 z-40"
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full royal-glass border border-[#C5A059]/60 shadow-xl flex items-center justify-center group overflow-hidden focus:outline-none transition-transform active:scale-95"
        >
          {/* Rotating Vinyl Texture */}
          <div
            className={`absolute inset-1 rounded-full border border-dashed border-[#C5A059]/40 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            {/* Vinyl Groves */}
            <div className="absolute inset-1.5 rounded-full border border-white/40"></div>
            <div className="absolute inset-3 rounded-full bg-[#244230] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059]"></div>
            </div>
          </div>

          {/* Central Speaker Icon */}
          <div className="relative z-10 text-[#C5A059] group-hover:scale-110 transition-transform">
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-white drop-shadow-sm" />
            ) : (
              <VolumeX className="w-5 h-5 text-red-300 drop-shadow-sm" />
            )}
          </div>

          {/* Sound Wave Indicator (When playing) */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8A6726]"></span>
            </span>
          )}
        </button>
      </motion.div>
    </>
  );
};
