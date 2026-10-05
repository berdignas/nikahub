import React, { useState, useEffect } from 'react';
import { X, Save, Clock, MapPin, Music, Sun, FileText } from 'lucide-react';
import { WeddingRundownItem, RundownSession } from '../types/wedding';

interface RundownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rundownData: Partial<WeddingRundownItem>) => void;
  initialData?: WeddingRundownItem | null;
}

const SESSIONS: RundownSession[] = [
  'Akad Nikah / Pemberkatan',
  'Upacara Adat',
  'Resepsi Sesi 1',
  'Resepsi Sesi 2 / Gala',
  'Syukuran / Ramah Tamah'
];

export const RundownModal: React.FC<RundownModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  if (!isOpen) return null;

  const [session, setSession] = useState<RundownSession>('Akad Nikah / Pemberkatan');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [activityTitle, setActivityTitle] = useState('');
  const [picName, setPicName] = useState('');
  const [picPhone, setPicPhone] = useState('');
  const [locationSpot, setLocationSpot] = useState('Panggung Pelaminan');
  const [musicAudioCue, setMusicAudioCue] = useState('');
  const [lightingCue, setLightingCue] = useState('');
  const [logisticsNotes, setLogisticsNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setSession(initialData.session);
      setStartTime(initialData.start_time);
      setEndTime(initialData.end_time);
      setActivityTitle(initialData.activity_title);
      setPicName(initialData.pic_name);
      setPicPhone(initialData.pic_phone || '');
      setLocationSpot(initialData.location_spot);
      setMusicAudioCue(initialData.music_audio_cue || '');
      setLightingCue(initialData.lighting_cue || '');
      setLogisticsNotes(initialData.logistics_notes || '');
    } else {
      setSession('Akad Nikah / Pemberkatan');
      setStartTime('08:00');
      setEndTime('09:00');
      setActivityTitle('');
      setPicName('');
      setPicPhone('');
      setLocationSpot('Panggung Pelaminan');
      setMusicAudioCue('');
      setLightingCue('');
      setLogisticsNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle || !startTime || !endTime || !picName) return;

    onSave({
      session,
      start_time: startTime,
      end_time: endTime,
      activity_title: activityTitle,
      pic_name: picName,
      pic_phone: picPhone || undefined,
      location_spot: locationSpot,
      music_audio_cue: musicAudioCue || undefined,
      lighting_cue: lightingCue || undefined,
      logistics_notes: logisticsNotes || undefined,
      is_completed: initialData ? initialData.is_completed : false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {initialData ? 'Sunting Sesi Acara' : 'Tambah Sesi Acara Baru'}
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              {initialData ? initialData.activity_title : 'Master Rundown & Petunjuk Teknis Cues'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kategori Sesi
              </label>
              <select
                value={session}
                onChange={e => setSession(e.target.value as RundownSession)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                {SESSIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Waktu Mulai (WIB)
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Waktu Selesai (WIB)
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Judul Aktivitas / Rangkaian Acara
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Prosesi Ijab Qabul & Penyerahan Mahar"
              value={activityTitle}
              onChange={e => setActivityTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Penanggung Jawab (PIC)
              </label>
              <input
                type="text"
                required
                placeholder="Penghulu / Lead WO"
                value={picName}
                onChange={e => setPicName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nomor Kontak PIC
              </label>
              <input
                type="text"
                placeholder="08123456789"
                value={picPhone}
                onChange={e => setPicPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Titik Lokasi Acara
              </label>
              <input
                type="text"
                placeholder="Meja Akad / Pelaminan"
                value={locationSpot}
                onChange={e => setLocationSpot(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Petunjuk Audio & Musik (Audio Cue)
              </label>
              <input
                type="text"
                placeholder="Contoh: Gending Kebo Giro / Lagu Masuk Pengantin"
                value={musicAudioCue}
                onChange={e => setMusicAudioCue(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Petunjuk Tata Cahaya (Lighting Cue)
              </label>
              <input
                type="text"
                placeholder="Contoh: Follow spot ke karpet merah, lampu utama redup"
                value={lightingCue}
                onChange={e => setLightingCue(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan Logistik, Properti & Panitia Lapangan
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Mic meja akad 3 unit, bantal sungkeman, air mawar, kotak cincin kawin..."
              value={logisticsNotes}
              onChange={e => setLogisticsNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Sesi Rundown</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
