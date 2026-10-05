import React, { useState } from 'react';
import { 
  Plus, 
  Clock, 
  MapPin, 
  Music, 
  Sun, 
  FileText, 
  Phone, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  Tv, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WeddingRundownItem, RundownSession } from '../types/wedding';
import { fireConfetti } from '../utils/confetti';

interface RundownManagerProps {
  rundowns: WeddingRundownItem[];
  onAddRundown: () => void;
  onEditRundown: (item: WeddingRundownItem) => void;
  onDeleteRundown: (itemId: string) => void;
  onToggleComplete: (itemId: string) => void;
}

const SESSIONS: (RundownSession | 'Semua')[] = [
  'Semua',
  'Akad Nikah / Pemberkatan',
  'Upacara Adat',
  'Resepsi Sesi 1',
  'Resepsi Sesi 2 / Gala',
  'Syukuran / Ramah Tamah'
];

export const RundownManager: React.FC<RundownManagerProps> = ({
  rundowns,
  onAddRundown,
  onEditRundown,
  onDeleteRundown,
  onToggleComplete
}) => {
  const [selectedSession, setSelectedSession] = useState<RundownSession | 'Semua'>('Semua');
  const [isStageMode, setIsStageMode] = useState(false);

  const handleToggle = (itemId: string, currentCompleted: boolean) => {
    onToggleComplete(itemId);
    if (!currentCompleted) {
      fireConfetti();
    }
  };

  // Sort rundowns by start_time
  const sortedRundowns = [...rundowns].sort((a, b) => a.start_time.localeCompare(b.start_time));

  const filteredRundowns = sortedRundowns.filter(item => {
    return selectedSession === 'Semua' || item.session === selectedSession;
  });

  const completedCount = rundowns.filter(r => r.is_completed).length;

  return (
    <div className="space-y-6">
      
      {/* Top Header & Rundown Stats */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Hari-H Live Coordination
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-400"></span>
              <span className="text-xs text-amber-800 font-medium">
                {completedCount} dari {rundowns.length} Sesi Selesai
              </span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Master Rundown & Petunjuk Teknis Acara
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Jadwal presisi menit per menit beserta cue musik, tata lampu, dan logistik untuk MC & Wedding Organizer
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsStageMode(!isStageMode)}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                isStageMode
                  ? 'bg-stone-900 text-amber-200 border-stone-900 shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>{isStageMode ? 'Keluar Mode Stage' : 'Mode Monitor MC'}</span>
            </button>

            <button
              onClick={onAddRundown}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Sesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Session Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {SESSIONS.map(session => (
          <button
            key={session}
            onClick={() => setSelectedSession(session)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedSession === session
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
            }`}
          >
            {session}
          </button>
        ))}
      </div>

      {/* Rundown Timeline Items List */}
      <div className="space-y-4">
        {filteredRundowns.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-xs sm:text-sm text-stone-500">
            Belum ada jadwal susunan acara untuk sesi ini.
          </div>
        ) : (
          filteredRundowns.map((item, idx) => {
            const isCompleted = item.is_completed;

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-5 transition-all shadow-sm ${
                  isCompleted 
                    ? 'border-stone-200/60 bg-stone-50/40 opacity-70' 
                    : 'border-stone-200/90 hover:border-stone-300'
                } ${isStageMode ? 'text-sm' : ''}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  {/* Left: Time & Activity */}
                  <div className="flex items-start space-x-4 flex-1">
                    
                    {/* Time Pill */}
                    <div className="flex flex-col items-center bg-stone-900 text-stone-100 px-3.5 py-2.5 rounded-xl shrink-0 min-w-[95px] text-center border border-stone-800">
                      <span className="font-serif font-bold text-sm sm:text-base text-amber-200">
                        {item.start_time}
                      </span>
                      <span className="text-[10px] text-stone-400">s/d {item.end_time}</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 flex-1 min-w-0">
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">
                          {item.session}
                        </span>

                        <span className="flex items-center space-x-1 text-stone-500 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{item.location_spot}</span>
                        </span>
                      </div>

                      <h3 className={`font-serif text-lg sm:text-xl font-medium leading-snug ${
                        isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                      }`}>
                        {item.activity_title}
                      </h3>

                      {/* PIC Row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                        <span>PIC: <strong className="text-stone-800">{item.pic_name}</strong></span>
                        {item.pic_phone && (
                          <a 
                            href={`tel:${item.pic_phone}`} 
                            className="flex items-center space-x-1 text-stone-500 hover:text-stone-900 underline text-[11px]"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.pic_phone}</span>
                          </a>
                        )}
                      </div>

                      {/* Cues Box (Audio / Lighting / Logistics) */}
                      {(item.music_audio_cue || item.lighting_cue || item.logistics_notes) && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                          {item.music_audio_cue && (
                            <div className="p-2 rounded-lg bg-stone-50 border border-stone-200/60 space-y-0.5">
                              <span className="text-[10px] uppercase font-semibold text-stone-400 flex items-center space-x-1">
                                <Music className="w-3 h-3 text-stone-500" />
                                <span>Audio Cue</span>
                              </span>
                              <div className="text-stone-800 font-medium truncate">{item.music_audio_cue}</div>
                            </div>
                          )}

                          {item.lighting_cue && (
                            <div className="p-2 rounded-lg bg-stone-50 border border-stone-200/60 space-y-0.5">
                              <span className="text-[10px] uppercase font-semibold text-stone-400 flex items-center space-x-1">
                                <Sun className="w-3 h-3 text-amber-600" />
                                <span>Lighting Cue</span>
                              </span>
                              <div className="text-stone-800 font-medium truncate">{item.lighting_cue}</div>
                            </div>
                          )}

                          {item.logistics_notes && (
                            <div className="p-2 rounded-lg bg-stone-50 border border-stone-200/60 space-y-0.5 sm:col-span-1">
                              <span className="text-[10px] uppercase font-semibold text-stone-400 flex items-center space-x-1">
                                <FileText className="w-3 h-3 text-stone-500" />
                                <span>Logistik / Properti</span>
                              </span>
                              <div className="text-stone-800 text-[11px] line-clamp-2">{item.logistics_notes}</div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>

                  </div>

                  {/* Right: Actions */}
                  <div className="flex lg:flex-col items-center justify-between lg:justify-start gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                    <button
                      onClick={() => handleToggle(item.id, item.is_completed)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                        isCompleted
                          ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditRundown(item)}
                        title="Sunting Sesi"
                        className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteRundown(item.id)}
                        title="Hapus Sesi"
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
