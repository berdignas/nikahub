'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc3, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MusicConfig } from '@/types';

interface MusicPlayerProps {
  config: MusicConfig;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({ config, autoPlayTrigger = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio(config.src);
    audio.loop = config.loop ?? true;
    audio.volume = config.initialVolume ?? 0.6;
    audioRef.current = audio;

    const handleEnded = () => {
      if (!config.loop) setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [config]);

  // Handle autoPlay on invitation open
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Audio autoplay prevented or waiting for interaction:', err);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy blocks, retry
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 select-none">
      {/* Mini Title Tooltip */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-md border border-gold/30 text-vintage-800 text-xs shadow-md">
        <Music className="w-3.5 h-3.5 text-gold animate-bounce" />
        <span className="font-serif italic">{config.title || 'Wedding Theme'}</span>
      </div>

      {/* Floating Vinyl Record Disc */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        className={`group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-vintage-900 border-2 border-gold flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}
      >
        {/* Vinyl Grooves & Gold Center */}
        <div className="absolute inset-1 rounded-full border border-vintage-700 pointer-events-none" />
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light flex items-center justify-center text-vintage-900">
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 fill-vintage-900" />
          ) : (
            <Play className="w-2.5 h-2.5 fill-vintage-900 ml-0.5" />
          )}
        </div>

        {/* Music Wave indicators */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>
        )}
      </button>
    </div>
  );
}
