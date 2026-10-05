import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface VoiceRecorderProps {
  onAudioRecorded: (audioDataUrl: string, durationSecs: number) => void;
  onAudioCleared: () => void;
  existingAudioUrl?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onAudioRecorded,
  onAudioCleared,
  existingAudioUrl,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(existingAudioUrl || null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setErrorMsg('');
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const duration = recordingSeconds;
        setTotalDuration(duration);

        // Convert Blob to Data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          setRecordedAudioUrl(dataUrl);
          onAudioRecorded(dataUrl, duration);
        };
        reader.readAsDataURL(audioBlob);

        // Stop mic track
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            // Auto stop at 60 seconds
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setErrorMsg('Gagal mengakses mikrofon HP. Izinkan akses mikrofon di browser.');
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  };

  const handleClear = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setTotalDuration(0);
    setIsPlaying(false);
    onAudioCleared();
  };

  const togglePreviewPlay = () => {
    if (!recordedAudioUrl) return;

    if (!audioPlayerRef.current) {
      const audio = new Audio(recordedAudioUrl);
      audio.onended = () => setIsPlaying(false);
      audioPlayerRef.current = audio;
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2 font-sans-ui">
      <label className="block text-xs font-medium text-[#ece5da] flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-[#d8cca8]" />
          <span>Rekam Ucapan Suara (Opsional - Maks 60 dtk):</span>
        </span>
        {recordedAudioUrl && (
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Suara Tersimpan
          </span>
        )}
      </label>

      {/* Recording State Controls */}
      {isRecording ? (
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-600/50 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-semibold text-rose-200">Sedang Merekam Suara...</span>
            <span className="text-xs font-mono text-[#f8f6e1] font-bold">
              {formatTimer(recordingSeconds)} / 01:00
            </span>
          </div>

          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Selesai</span>
          </button>
        </div>
      ) : recordedAudioUrl ? (
        /* Preview Recorded Audio State */
        <div className="p-3 rounded-2xl bg-[#161c14] border border-[#d8cca8]/40 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={togglePreviewPlay}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] flex items-center justify-center shrink-0 hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div className="text-xs">
              <p className="text-[#f8f6e1] font-medium">Rekaman Ucapan Anda</p>
              <p className="text-[10px] text-[#b8c4ae]/70 font-mono">
                Durasi: {formatTimer(totalDuration || recordingSeconds)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
            title="Hapus & Rekam Ulang"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Initial Record CTA Button */
        <button
          type="button"
          onClick={startRecording}
          className="w-full py-2.5 px-4 rounded-xl bg-[#161c14] border border-[#685c46]/50 hover:border-[#d8cca8] text-[#f8f6e1] text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#20291e] active:scale-98 shadow-sm group"
        >
          <div className="w-6 h-6 rounded-full bg-[#2a3528] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mic className="w-3.5 h-3.5 text-[#d8cca8]" />
          </div>
          <span>Tekan untuk Merekam Ucapan Suara</span>
        </button>
      )}

      {errorMsg && (
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
