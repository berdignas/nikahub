import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { WeddingTask, TaskCategory, TaskPhase, TaskPriority, TaskAssignee } from '../types/wedding';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<WeddingTask>) => void;
  initialData?: WeddingTask | null;
}

const PHASES: TaskPhase[] = [
  'H-12 sd H-6 Bulan',
  'H-6 sd H-3 Bulan',
  'H-3 sd H-1 Bulan',
  'H-1 Bulan sd H-1 Minggu',
  'Hari-H & Pasca Acara'
];

const CATEGORIES: TaskCategory[] = [
  'Legal & KUA',
  'Venue & Dekorasi',
  'Catering',
  'Busana & MUA',
  'Dokumentasi',
  'Adat & Prosesi',
  'Undangan & Tamu',
  'Hiburan & Sound',
  'Logistik & Panitia'
];

const PRIORITIES: TaskPriority[] = ['Tinggi', 'Sedang', 'Rendah'];
const ASSIGNEES: TaskAssignee[] = ['Bersama', 'Pria', 'Wanita', 'Wedding Organizer', 'Keluarga'];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Venue & Dekorasi');
  const [phase, setPhase] = useState<TaskPhase>('H-6 sd H-3 Bulan');
  const [priority, setPriority] = useState<TaskPriority>('Sedang');
  const [assignedTo, setAssignedTo] = useState<TaskAssignee>('Bersama');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setPhase(initialData.phase);
      setPriority(initialData.priority);
      setAssignedTo(initialData.assigned_to);
      setDueDate(initialData.due_date);
      setNotes(initialData.notes || '');
    } else {
      setTitle('');
      setCategory('Venue & Dekorasi');
      setPhase('H-6 sd H-3 Bulan');
      setPriority('Sedang');
      setAssignedTo('Bersama');
      setDueDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    onSave({
      title,
      category,
      phase,
      priority,
      assigned_to: assignedTo,
      due_date: dueDate,
      notes: notes || undefined,
      is_completed: initialData ? initialData.is_completed : false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {initialData ? 'Sunting Tugas' : 'Tambah Tugas Baru'}
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              {initialData ? initialData.title : 'Checklist & Timeline Persiapan'}
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
          
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Judul Tugas / Aktivitas
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pengambilan Surat N1-N4 ke Kelurahan"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Fase Timeline
              </label>
              <select
                value={phase}
                onChange={e => setPhase(e.target.value as TaskPhase)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {PHASES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Prioritas
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                {PRIORITIES.map(pr => (
                  <option key={pr} value={pr}>{pr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Penanggung Jawab (PIC)
              </label>
              <select
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value as TaskAssignee)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                {ASSIGNEES.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Tenggat Waktu
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan Instruksi / Panduan Teknis (Opsional)
            </label>
            <textarea
              rows={3}
              placeholder="Catatan dokumen pendukung atau kontak instansi terkait..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
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
              <span>Simpan Tugas</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
