import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Volume2, VolumeX } from 'lucide-react';
import { invitationData } from '../data/invitationData';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AUDIO_SPEEDS = [
  { label: '1x', rate: 1.0 },
  { label: '0.5x', rate: 0.5 },
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [speedIdx, setSpeedIdx] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(invitationData.audioUrl);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // autoplay policy
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = AUDIO_SPEEDS[speedIdx].rate;
    }
  }, [speedIdx]);

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeedIdx((prev) => (prev + 1) % AUDIO_SPEEDS.length);
  };

  return (
    <div className="fixed top-5 right-4 z-40 flex items-center gap-2">
      {/* Audio Play/Pause Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 p-1 rounded-full bg-[#1A1D16]/90 border border-[#C2A676]/60 shadow-2xl backdrop-blur-md"
      >
        <motion.button
          onClick={onTogglePlay}
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#3D4730] to-[#51583D] border border-[#C2A676]/50 shadow-md flex items-center justify-center text-[#E8D8BA] overflow-hidden"
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          {/* Spinning Vinyl Effect */}
          <div
            className={`w-full h-full flex items-center justify-center ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            <Disc className="w-5 h-5 text-[#E8D8BA]" />
          </div>

          {/* Center icon badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <Volume2 className="w-3 h-3 text-white drop-shadow" />
            ) : (
              <VolumeX className="w-3 h-3 text-red-300 drop-shadow" />
            )}
          </div>

          {/* Sound wave ripple */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#C2A676]/50 animate-ping pointer-events-none" />
          )}
        </motion.button>

        {/* Speed button (0.5x / 1x) */}
        <button
          onClick={toggleSpeed}
          className="px-2 py-1 rounded-full bg-[#51583D]/60 hover:bg-[#51583D] border border-[#C2A676]/30 text-[10px] font-bold text-[#E8D8BA] tracking-wider transition-colors"
          title="Kecepatan Musik (0.5x / 1x)"
        >
          {AUDIO_SPEEDS[speedIdx].label}
        </button>
      </motion.div>
    </div>
  );
};
