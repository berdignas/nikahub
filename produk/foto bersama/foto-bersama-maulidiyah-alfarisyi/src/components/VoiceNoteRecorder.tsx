import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2, Play, Pause, AlertCircle, Check, Sparkles } from 'lucide-react';

interface VoiceNoteRecorderProps {
  onAudioRecorded: (audioDataUrl: string, durationSeconds: number) => void;
  onAudioRemoved: () => void;
  recordedAudioUrl?: string;
  recordedDuration?: number;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  onAudioRecorded,
  onAudioRemoved,
  recordedAudioUrl,
  recordedDuration,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Preview playback state
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      cleanupStream();
    };
  }, []);

  const cleanupStream = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      audioPreviewRef.current = null;
    }
  };

  const startRecording = async () => {
    setErrorMsg('');
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser tidak mendukung perekaman suara.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Select supported mimeType
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          onAudioRecorded(base64Audio, recordingSeconds || 1);
        };
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      // Start timer
      let seconds = 0;
      timerIntervalRef.current = window.setInterval(() => {
        seconds += 1;
        setRecordingSeconds(seconds);
        // Max 60 seconds limit
        if (seconds >= 60) {
          stopRecording();
        }
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone access error:', err);
      setErrorMsg('Izin mikrofon ditolak atau tidak tersedia pada browser Anda.');
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  const togglePreview = () => {
    if (!recordedAudioUrl) return;

    if (!audioPreviewRef.current) {
      const audio = new Audio(recordedAudioUrl);
      audioPreviewRef.current = audio;
      audio.onended = () => setIsPreviewPlaying(false);
    }

    if (isPreviewPlaying) {
      audioPreviewRef.current.pause();
      setIsPreviewPlaying(false);
    } else {
      audioPreviewRef.current.play().then(() => {
        setIsPreviewPlaying(true);
      }).catch(() => {
        setIsPreviewPlaying(false);
      });
    }
  };

  const handleRemove = () => {
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
      audioPreviewRef.current = null;
    }
    setIsPreviewPlaying(false);
    onAudioRemoved();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  return (
    <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E6CA92]/40 font-sans text-xs space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-[#0A261D] flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Rekam Ucapan Suara / VN (Opsional):</span>
        </label>
        <span className="text-[10px] text-gray-400">Maks. 60 Detik</span>
      </div>

      {/* Recorded Audio State */}
      {recordedAudioUrl ? (
        <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-[#E6CA92]/60 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={togglePreview}
              className="w-9 h-9 rounded-full bg-[#0A261D] text-[#E6CA92] flex items-center justify-center hover:bg-[#164E3D] active:scale-95 transition-all cursor-pointer shadow-xs"
              title={isPreviewPlaying ? "Jeda" : "Dengarkan Hasil Rekaman"}
            >
              {isPreviewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <span className="font-bold text-[#0A261D] text-xs block">
                Pesan Suara Terpasang 🎙️
              </span>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Durasi: {formatTime(recordedDuration || recordingSeconds || 5)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
            title="Hapus rekaman suara & rekam ulang"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : isRecording ? (
        /* Currently Recording State */
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-red-50 border border-red-200 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            <div>
              <span className="font-bold text-red-700 text-xs block">
                Sedang Merekam Suara...
              </span>
              <span className="text-[11px] font-mono text-red-600 font-bold">
                {formatTime(recordingSeconds)} / 1:00
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={stopRecording}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Selesai</span>
          </button>
        </div>
      ) : (
        /* Ready to Record State */
        <div>
          <button
            type="button"
            onClick={startRecording}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#C5A880] bg-white hover:bg-[#FAF9F5] hover:border-[#0A261D] text-[#0A261D] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <div className="w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#E6CA92] flex items-center justify-center text-[#C5A880]">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <span>Tekan untuk Mulai Rekam Suara (VN)</span>
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
