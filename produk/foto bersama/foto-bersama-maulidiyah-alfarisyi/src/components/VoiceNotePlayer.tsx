import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';

interface VoiceNotePlayerProps {
  audioUrl: string;
  duration?: number;
  senderName?: string;
  compact?: boolean;
}

export const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({
  audioUrl,
  duration = 0,
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

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setTotalDuration(Math.round(audio.duration));
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play error:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  if (compact) {
    return (
      <div 
        onClick={togglePlay}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A261D] text-[#FAF9F5] border border-[#E6CA92]/40 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer font-sans text-xs"
      >
        <div className="w-5 h-5 rounded-full bg-[#E6CA92] text-[#0A261D] flex items-center justify-center">
          {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 ml-0.5" />}
        </div>
        <div className="flex items-center gap-1.5">
          <Mic className="w-3 h-3 text-[#E6CA92]" />
          <span className="text-[11px] font-bold text-[#E6CA92]">VN</span>
          <span className="text-[10px] text-white/80">
            {isPlaying ? formatTime(currentTime) : formatTime(totalDuration || 15)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0A261D] to-[#153e30] border border-[#E6CA92]/40 text-[#FAF9F5] shadow-md font-sans"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#E6CA92]/20 border border-[#E6CA92]/40 flex items-center justify-center text-[#E6CA92]">
            <Mic className="w-3 h-3" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6CA92] block leading-none">
              Ucapan Suara (Voice Note)
            </span>
            {senderName && (
              <span className="text-[11px] text-white/80 truncate block mt-0.5">
                dari {senderName}
              </span>
            )}
          </div>
        </div>

        {/* Duration badge */}
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#E6CA92] border border-[#E6CA92]/20">
          {isPlaying ? formatTime(currentTime) : formatTime(totalDuration || 15)} / {formatTime(totalDuration || 15)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Play / Pause Big Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FAF9F5] to-[#E6CA92] text-[#0A261D] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          title={isPlaying ? "Jeda Suara" : "Putar Pesan Suara"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#0A261D]" />
          ) : (
            <Play className="w-4 h-4 fill-[#0A261D] ml-0.5" />
          )}
        </button>

        {/* Animated Sound Waveform / Progress Bar */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Animated sound wave bars when playing */}
          <div className="flex items-center gap-1 h-5 mb-1 px-1">
            {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 65, 90, 40].map((height, i) => {
              const isPassed = (i / 17) * 100 <= progressPercent;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-200 ${
                    isPassed
                      ? 'bg-[#E6CA92]'
                      : 'bg-white/20'
                  } ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{
                    height: `${isPlaying ? Math.max(20, (height * (0.6 + Math.random() * 0.4))) : height}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Interactive Progress Slider */}
          <input
            type="range"
            min={0}
            max={totalDuration || 15}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E6CA92]"
          />
        </div>
      </div>
    </div>
  );
};
