import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Copy,
  Trash2,
  Calendar,
  Layers,
  Palette,
  ExternalLink,
  Store,
  FolderKanban,
  Edit3,
  X,
  FileHeart,
  ChevronRight,
  Music,
  Eye,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GlobalProjectConfig } from '../types/builder';
import {
  getAllProjects,
  createNewProject,
  duplicateProject,
  deleteProject,
  updateProjectStatus,
  setActiveProjectId,
} from '../lib/builder/projectStorage';
import { COLOR_PALETTES } from '../lib/builder/presets';

interface ProjectHubViewProps {
  onOpenStudio: (projectId: string) => void;
  onBackToCatalogue: () => void;
}

export const ProjectHubView: React.FC<ProjectHubViewProps> = ({
  onOpenStudio,
  onBackToCatalogue,
}) => {
  const [projects, setProjects] = useState<GlobalProjectConfig[]>(() => getAllProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newGroomName, setNewGroomName] = useState('');
  const [newBrideName, setNewBrideName] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-12-25');
  const [newPalette, setNewPalette] = useState('sage-botanical');
  const [formError, setFormError] = useState('');

  // Refresh projects from storage
  const refreshProjects = () => {
    setProjects(getAllProjects());
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = projects.length;
    const inProgress = projects.filter((p) => p.status !== 'completed').length;
    const completed = projects.filter((p) => p.status === 'completed').length;
    return { total, inProgress, completed };
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Tab filter
      if (filterTab === 'in_progress' && p.status === 'completed') return false;
      if (filterTab === 'completed' && p.status !== 'completed') return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        (p.groomName && p.groomName.toLowerCase().includes(q)) ||
        (p.brideName && p.brideName.toLowerCase().includes(q))
      );
    });
  }, [projects, filterTab, searchQuery]);

  // Handler: Open Project in Studio
  const handleOpenProject = (id: string) => {
    setActiveProjectId(id);
    onOpenStudio(id);
  };

  // Handler: Duplicate
  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateProject(id);
    refreshProjects();
  };

  // Handler: Delete
  const handleDelete = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Hapus proyek "${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      deleteProject(id);
      refreshProjects();
    }
  };

  // Handler: Toggle status
  const handleToggleStatus = (id: string, currentStatus: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
    updateProjectStatus(id, nextStatus);
    refreshProjects();
  };

  // Handler: Create Project Submit
  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroomName.trim() || !newBrideName.trim()) {
      setFormError('Nama calon pengantin pria dan wanita wajib diisi!');
      return;
    }

    const title = newTitle.trim() || `The Wedding of ${newGroomName.trim()} & ${newBrideName.trim()}`;
    const created = createNewProject({
      title,
      groomName: newGroomName.trim(),
      brideName: newBrideName.trim(),
      eventDate: newEventDate,
      activePalette: newPalette,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setIsNewModalOpen(false);
    // Reset Form
    setNewTitle('');
    setNewGroomName('');
    setNewBrideName('');
    setFormError('');

    // Open newly created project directly
    onOpenStudio(created.id);
  };

  // Format date helper
  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Baru saja';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Baru saja';
    }
  };

  return (
    <div className="min-h-screen bg-[#141610] text-[#FAF9F5] flex flex-col font-sans select-none">
      {/* 1. TOP HEADER / BRANDING */}
      <header className="sticky top-0 z-40 bg-[#1E2218]/90 backdrop-blur-md border-b border-[#C2A676]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalogue}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#C2A676] text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition"
            title="Kembali ke Web Katalog Utama"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Web Katalog</span>
          </button>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#51583D] to-[#C2A676] flex items-center justify-center shadow">
              <FolderKanban className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                <span>Studio Proyek Undangan</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C2A676]/20 text-[#E8D8BA] border border-[#C2A676]/40 uppercase tracking-widest font-mono">
                  Hub
                </span>
              </h1>
              <p className="text-[10px] text-[#A0A694] hidden md:block">
                Kelola semua undangan yang telah dikerjakan & simpan progres otomatis
              </p>
            </div>
          </div>
        </div>

        {/* Right CTA: + Buat Undangan Baru */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C2A676]/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Proyek</span>
          </button>
        </div>
      </header>

      {/* 2. STATS & HERO OVERVIEW */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
          {/* Card Total */}
          <div className="p-4 rounded-2xl bg-[#1E2218] border border-[#C2A676]/25 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[11px] font-semibold text-[#A0A694] uppercase tracking-wider">
                Total Proyek
              </p>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{stats.total}</h3>
              <p className="text-[10px] text-[#C2A676]/80 mt-0.5">Semua desain tersimpan di cloud & lokal</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C2A676]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Card Sedang Berjalan */}
          <div 
            onClick={() => setFilterTab('in_progress')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              filterTab === 'in_progress'
                ? 'bg-amber-950/30 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                : 'bg-[#1E2218] border-amber-500/30 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                    Sedang Berjalan (Draft)
                  </p>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{stats.inProgress}</h3>
                <p className="text-[10px] text-amber-200/70 mt-0.5">Belum selesai & otomatis tersimpan</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card Selesai */}
          <div 
            onClick={() => setFilterTab('completed')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              filterTab === 'completed'
                ? 'bg-emerald-950/30 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/40'
                : 'bg-[#1E2218] border-emerald-500/30 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                  Selesai / Siap Tayang
                </p>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{stats.completed}</h3>
                <p className="text-[10px] text-emerald-200/70 mt-0.5">Sudah final & siap dikirim ke tamu</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. FILTER TABS & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-[#1A1D15] p-2 rounded-2xl border border-white/10">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#141610] p-1 rounded-xl border border-white/10 overflow-x-auto">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterTab === 'all'
                  ? 'bg-[#51583D] text-white shadow'
                  : 'text-[#A0A694] hover:text-white'
              }`}
            >
              Semua Proyek ({stats.total})
            </button>
            <button
              onClick={() => setFilterTab('in_progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                filterTab === 'in_progress'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-amber-300/80 hover:text-amber-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Sedang Berjalan ({stats.inProgress})
            </button>
            <button
              onClick={() => setFilterTab('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-emerald-300/80 hover:text-emerald-200'
              }`}
            >
              Selesai ({stats.completed})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#A0A694] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul / nama pengantin..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141610] border border-white/10 text-xs text-white placeholder-[#A0A694] focus:outline-none focus:border-[#C2A676] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* 4. PROJECTS GRID */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#1E2218]/40 border border-dashed border-[#C2A676]/30 px-4">
            <FileHeart className="w-12 h-12 text-[#C2A676]/50 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              {searchQuery ? 'Tidak ada proyek yang sesuai' : 'Belum Ada Proyek Dalam Kategori Ini'}
            </h3>
            <p className="text-xs text-[#A0A694] max-w-sm mx-auto mb-5 leading-relaxed">
              {searchQuery
                ? `Pencarian "${searchQuery}" tidak menemukan proyek. Coba kata kunci lain.`
                : 'Mulai buat proyek undangan pernikahan baru dengan tata letak, musik, dan animasi estetik.'}
            </p>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs uppercase tracking-wider shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Undangan Baru</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj) => {
              const isCompleted = proj.status === 'completed';
              const palette = COLOR_PALETTES.find((p) => p.id === proj.activePalette) || COLOR_PALETTES[0];
              const sectionCount = proj.sections ? proj.sections.length : 0;
              const elementCount = proj.sections
                ? proj.sections.reduce((acc, s) => acc + (s.elements ? s.elements.length : 0), 0)
                : 0;

              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-[#1E2218] rounded-2xl border border-[#C2A676]/20 hover:border-[#C2A676]/60 transition-all duration-200 overflow-hidden flex flex-col shadow-lg hover:shadow-[#C2A676]/5"
                >
                  {/* Card Header / Visual Preview Strip */}
                  <div
                    className="h-36 relative p-4 flex flex-col justify-between overflow-hidden cursor-pointer"
                    style={{ backgroundColor: palette.primary }}
                    onClick={() => handleOpenProject(proj.id)}
                  >
                    {/* Subtle Overlay Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Status Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold shadow-sm backdrop-blur-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selesai / Final</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold shadow-sm backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>Sedang Berjalan (Draft)</span>
                        </span>
                      )}

                      {/* Monogram Circle */}
                      <span className="w-7 h-7 rounded-full bg-white/20 border border-white/30 text-white text-[11px] font-serif font-bold flex items-center justify-center backdrop-blur-sm">
                        {proj.monogram || 'W'}
                      </span>
                    </div>

                    {/* Middle Title Preview */}
                    <div className="relative z-10">
                      <p className="text-[10px] uppercase tracking-widest text-[#E8D8BA] font-semibold">
                        {proj.groomName && proj.brideName ? `${proj.groomName} & ${proj.brideName}` : 'Calon Pengantin'}
                      </p>
                      <h4 className="font-serif font-bold text-base text-white truncate drop-shadow-sm">
                        {proj.title}
                      </h4>
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-[#141610]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                      <span className="px-3 py-1.5 rounded-xl bg-white text-[#141610] text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Edit3 className="w-3.5 h-3.5 text-[#51583D]" />
                        <span>Buka Studio Editor</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#A0A694]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C2A676]" />
                          <span>{proj.eventDate || 'Belum diatur'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#C2A676]" />
                          <span>{sectionCount} Bagian ({elementCount} Elemen)</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#A0A694]/80 pt-1 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Palette className="w-2.5 h-2.5 text-[#C2A676]" />
                          <span>Tema: {palette.name.split(' ')[0]}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-[#C2A676]" />
                          <span>Diedit: {formatDate(proj.updatedAt)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-white/10">
                      {/* Open Editor Button */}
                      <button
                        onClick={() => handleOpenProject(proj.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#51583D] hover:bg-[#65744F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#E8D8BA]" />
                        <span>Lanjutkan Edit</span>
                        <ArrowRight className="w-3 h-3 text-[#E8D8BA]" />
                      </button>

                      {/* Toggle status */}
                      <button
                        onClick={(e) => handleToggleStatus(proj.id, proj.status, e)}
                        className={`p-2 rounded-xl text-xs font-semibold transition border ${
                          isCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                        }`}
                        title={isCompleted ? 'Tandai sebagai Sedang Berjalan (Draft)' : 'Tandai sebagai Selesai'}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={(e) => handleDuplicate(proj.id, e)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#FAF9F5] border border-white/10 text-xs transition"
                        title="Duplikat Proyek Ini"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#C2A676]" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => handleDelete(proj.id, proj.title, e)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 text-rose-300 border border-white/10 hover:border-rose-500/40 text-xs transition"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. MODAL CREATE NEW PROJECT */}
      <AnimatePresence>
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#1E2218] rounded-3xl border border-[#C2A676]/40 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#141610] p-5 border-b border-[#C2A676]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#51583D] to-[#C2A676] flex items-center justify-center text-white shadow">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">Buat Proyek Undangan Baru</h3>
                    <p className="text-[11px] text-[#A0A694]">
                      Mulai rancang undangan digital dengan penyimpanan otomatis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNewModalOpen(false)}
                  className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleCreateProjectSubmit} className="p-5 space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                {/* Judul Proyek */}
                <div>
                  <label className="block text-[11px] font-bold text-[#E8D8BA] mb-1">
                    Judul Proyek Undangan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: The Wedding of Dion & Sarah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141610] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C2A676] transition"
                  />
                </div>

                {/* Couple Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#E8D8BA] mb-1">
                      Nama Calon Pria *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGroomName}
                      onChange={(e) => setNewGroomName(e.target.value)}
                      placeholder="Contoh: Dion Permana"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141610] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C2A676] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#E8D8BA] mb-1">
                      Nama Calon Wanita *
                    </label>
                    <input
                      type="text"
                      required
                      value={newBrideName}
                      onChange={(e) => setNewBrideName(e.target.value)}
                      placeholder="Contoh: Sarah Maulida"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141610] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C2A676] transition"
                    />
                  </div>
                </div>

                {/* Tanggal Acara */}
                <div>
                  <label className="block text-[11px] font-bold text-[#E8D8BA] mb-1">
                    Tanggal Pernikahan
                  </label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141610] border border-white/10 text-white focus:outline-none focus:border-[#C2A676] transition"
                  />
                </div>

                {/* Tema Warna Awal */}
                <div>
                  <label className="block text-[11px] font-bold text-[#E8D8BA] mb-2">
                    Pilih Tema Warna Pembuka
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PALETTES.map((cp) => (
                      <button
                        key={cp.id}
                        type="button"
                        onClick={() => setNewPalette(cp.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                          newPalette === cp.id
                            ? 'bg-white/15 border-[#C2A676] ring-1 ring-[#C2A676]'
                            : 'bg-[#141610] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: cp.primary }}
                        />
                        <span className="text-[11px] font-semibold text-white truncate">
                          {cp.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A0A694] font-semibold text-xs transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition"
                  >
                    Mulai Desain di Studio →
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
