import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  Trash2, 
  Edit, 
  CheckSquare,
  Sparkles,
  Zap
} from 'lucide-react';
import { WeddingTask, TaskCategory, TaskPhase } from '../types/wedding';
import { triggerCelebration } from '../utils/confetti';

interface ChecklistManagerProps {
  tasks: WeddingTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: () => void;
  onEditTask: (task: WeddingTask) => void;
  onDeleteTask: (taskId: string) => void;
}

const PHASES: (TaskPhase | 'Semua')[] = [
  'Semua',
  'H-12 sd H-6 Bulan',
  'H-6 sd H-3 Bulan',
  'H-3 sd H-1 Bulan',
  'H-1 Bulan sd H-1 Minggu',
  'Hari-H & Pasca Acara'
];

const CATEGORIES: (TaskCategory | 'Semua')[] = [
  'Semua',
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

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask
}) => {
  const [selectedPhase, setSelectedPhase] = useState<TaskPhase | 'Semua'>('Semua');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesPhase = selectedPhase === 'Semua' || task.phase === selectedPhase;
    const matchesCategory = selectedCategory === 'Semua' || task.category === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'completed' 
        ? task.is_completed 
        : !task.is_completed;

    return matchesPhase && matchesCategory && matchesSearch && matchesStatus;
  });

  const completedCount = tasks.filter(t => t.is_completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleToggle = (taskId: string, isCurrentlyCompleted: boolean) => {
    onToggleTask(taskId);
    if (!isCurrentlyCompleted) {
      triggerCelebration();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header & Progress Summary Card */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Roadmap Persiapan
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500"></span>
              <span className="text-xs text-stone-700 font-medium">{completedCount} Tugas Selesai</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Smart Checklist & Timeline Hitung Mundur
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Langkah terpadu dari pengurusan KUA, fitting baju, hingga eksekusi panggung hari-H
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onAddTask}
              className="flex items-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tugas Baru</span>
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-stone-100 rounded-full h-3 mt-6 overflow-hidden flex items-center">
          <div 
            className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-stone-500 mt-2">
          <span>Kesiapan Checklist: <strong>{progressPercent}% Siap</strong></span>
          <span>{completedCount} dari {tasks.length} Selesai</span>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {PHASES.map(phase => (
          <button
            key={phase}
            onClick={() => setSelectedPhase(phase)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedPhase === phase
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
            }`}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama tugas atau catatan..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value as any)}
            className="w-full sm:w-auto px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                Kategori: {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="w-full sm:w-auto px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Belum Selesai</option>
            <option value="completed">Sudah Selesai</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-xs sm:text-sm text-stone-500">
            Tidak ada tugas yang sesuai dengan kriteria filter saat ini.
          </div>
        ) : (
          filteredTasks.map(task => {
            const isCompleted = task.is_completed;
            const priorityColor = 
              task.priority === 'Tinggi' ? 'bg-rose-50 text-rose-700 border-rose-200' :
              task.priority === 'Sedang' ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-stone-100 text-stone-700 border-stone-200';

            return (
              <div
                key={task.id}
                className={`bg-white border rounded-2xl p-4 sm:p-5 transition-all shadow-sm ${
                  isCompleted 
                    ? 'border-stone-200/60 bg-stone-50/40 opacity-75' 
                    : 'border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  
                  {/* Left: Checkbox & Task Details */}
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggle(task.id, isCompleted)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                        isCompleted
                          ? 'bg-stone-900 border-stone-900 text-white'
                          : 'border-stone-300 hover:border-stone-800 bg-white'
                      }`}
                    >
                      {isCompleted && <CheckSquare className="w-4 h-4" />}
                    </button>

                    <div className="space-y-1.5 min-w-0">
                      <h4 className={`text-sm sm:text-base font-medium leading-snug ${
                        isCompleted ? 'line-through text-stone-400' : 'text-stone-900'
                      }`}>
                        {task.title}
                      </h4>

                      {task.notes && (
                        <p className={`text-xs ${isCompleted ? 'text-stone-400' : 'text-stone-600'}`}>
                          {task.notes}
                        </p>
                      )}

                      {/* Meta Tags Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium">
                          {task.category}
                        </span>
                        
                        <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                          {task.phase}
                        </span>

                        <span className={`px-2 py-0.5 rounded-md border font-medium ${priorityColor}`}>
                          Prioritas: {task.priority}
                        </span>

                        <span className="flex items-center space-x-1 text-stone-500">
                          <User className="w-3 h-3 text-stone-400" />
                          <span>PIC: {task.assigned_to}</span>
                        </span>

                        <span className="flex items-center space-x-1 text-stone-500">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>Tenggat: {task.due_date}</span>
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => onEditTask(task)}
                      title="Sunting Tugas"
                      className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      title="Hapus Tugas"
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
