import React, { useState, useEffect, useRef } from 'react';
import { Disc, Music, Volume2, VolumeX } from 'lucide-react';
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
    <button
      onClick={togglePlay}
      aria-label="Toggle Audio"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 rounded-full bg-[#8C6A43] text-white border-2 border-white shadow-gold flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
    >
      {isPlaying ? (
        <Disc className="w-6 h-6 animate-spin-slow text-[#C5A059]" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/70" />
      )}
    </button>
  );
};
