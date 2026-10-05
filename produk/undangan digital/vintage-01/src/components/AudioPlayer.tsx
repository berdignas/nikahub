import React, { useState, useEffect, useRef } from 'react';
import { Disc, VolumeX, Music } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

interface AudioPlayerProps {
  autoPlayTrigger: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(INVITATION_DATA.audio);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio playback error:', e));
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2">
      {/* Song Info Pill */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6DCCE] shadow-md text-xs font-semibold text-[#8C6A43] animate-pulse">
          <Music className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Ghea Indrawari - 1000x</span>
          {/* Soundbars Equalizer */}
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-1 bg-[#8C6A43] rounded-full animate-eq-1" />
            <span className="w-1 bg-[#C5A059] rounded-full animate-eq-2" />
            <span className="w-1 bg-[#8C6A43] rounded-full animate-eq-3" />
          </div>
        </div>
      )}

      {/* Circle Audio Toggle Button */}
      <button
        onClick={togglePlay}
        aria-label="Toggle Audio"
        className="w-12 h-12 rounded-full bg-[#8C6A43] hover:bg-[#5C4033] text-white border-2 border-white shadow-gold flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 pulse-glow"
      >
        {isPlaying ? (
          <Disc className="w-6 h-6 animate-spin-slow text-[#C5A059]" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/70" />
        )}
      </button>
    </div>
  );
};
