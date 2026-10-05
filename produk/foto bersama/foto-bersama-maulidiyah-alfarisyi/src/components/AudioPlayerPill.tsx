import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';

interface AudioPlayerPillProps {
  audioUrl: string;
  duration?: number;
  senderName?: string;
  compact?: boolean;
}

export const AudioPlayerPill: React.FC<AudioPlayerPillProps> = ({
  audioUrl,
  duration,
  senderName,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration || 0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setTotalDuration(Math.round(audio.duration));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(Math.round(audio.currentTime));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <button
        onClick={togglePlay}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans-ui transition-all border shadow-sm ${
          isPlaying
            ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 animate-pulse'
            : 'bg-[#20291e]/90 border-[#685c46]/40 text-[#d8cca8] hover:border-[#b8c4ae]'
        }`}
        title="Putar Pesan Suara"
      >
        {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
        <Mic className="w-3 h-3 text-[#d8cca8]" />
        <span>{isPlaying ? formatTime(currentTime) : totalDuration ? `${totalDuration}s` : 'Suara'}</span>
      </button>
    );
  }

  return (
    <div 
      className="p-2.5 rounded-2xl bg-[#161c14] border border-[#685c46]/40 flex items-center gap-3 shadow-md font-sans-ui"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={togglePlay}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 shadow-md active:scale-95 ${
          isPlaying
            ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
            : 'bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] hover:scale-105'
        }`}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <div className="flex items-center gap-1.5 text-[#f8f6e1] font-medium truncate">
            <Volume2 className="w-3.5 h-3.5 text-[#d8cca8] shrink-0" />
            <span className="truncate">{senderName ? `Ucapan Suara: ${senderName}` : 'Pesan Suara'}</span>
          </div>
          <span className="text-[10px] text-[#b8c4ae]/70 font-mono">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </span>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="flex items-center gap-0.5 h-3">
          {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40, 65].map((height, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-gradient-to-t from-[#d8cca8] to-[#b8c4ae] animate-pulse' : 'bg-[#2a3528]'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, Math.sin(currentTime + i) * 100)}%` : `${height}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
