import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Disc, Volume2, VolumeX } from 'lucide-react';
import { invitationData } from '../data/invitationData';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(invitationData.audioUrl);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // autoplay restriction
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleToggle = () => {
    onTogglePlay();
  };

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }}
        className="relative group w-12 h-12 rounded-full bg-gradient-to-tr from-[#3D4730] to-[#51583D] border-2 border-[#C2A676] shadow-2xl flex items-center justify-center text-[#E8D8BA] overflow-hidden"
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Spinning Vinyl Effect when Playing */}
        <div
          className={`w-full h-full flex items-center justify-center ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <Disc className="w-6 h-6 text-[#E8D8BA]" />
        </div>

        {/* Center icon badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-white drop-shadow" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-red-300 drop-shadow" />
          )}
        </div>

        {/* Sound Waves Pulse when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#C2A676]/60 animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};
