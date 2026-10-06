'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
  Palette,
  Music,
  Layers,
  Eye,
  Edit3,
  Download,
  Upload,
  Save,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Plus,
  Play,
  RotateCw,
  Sliders,
  Check,
  Smartphone,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  Volume2,
  Flower2,
  ChevronRight,
  ChevronDown,
  Loader2,
  Cloud,
  HardDrive,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CanvasElement,
  BuilderSection,
  GlobalProjectConfig,
  ElementType,
  AnimationType,
  ShapeType,
} from '@/types/builder';
import {
  FONT_OPTIONS,
  COLOR_PALETTES,
  ORNAMENT_LIBRARY,
  SHAPE_PRESETS,
  DEFAULT_INITIAL_PROJECT,
} from '@/lib/builder/presets';
import { FloatingPetals } from '@/components/animation/FloatingPetals';
import { compressImage } from '@/lib/builder/imageCompression';

export const InvitationStudio: React.FC = () => {
  // Main Project State
  const [project, setProject] = useState<GlobalProjectConfig>(DEFAULT_INITIAL_PROJECT);
  const [history, setHistory] = useState<GlobalProjectConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Studio UI Navigation State
  const [activeTab, setActiveTab] = useState<
    'sections' | 'text' | 'assets' | 'shapes' | 'animation' | 'theme' | 'music'
  >('sections');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-cover');
  const [selectedElementId, setSelectedElementId] = useState<string | null>('el-cover-names');
  const [previewMode, setPreviewMode] = useState<'editor' | 'live'>('editor');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Asset upload local storage & Cloudflare R2
  const [uploadedAssets, setUploadedAssets] = useState<
    Array<{ name: string; url: string; storage?: string; size?: number }>
  >([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [useSmartCompression, setUseSmartCompression] = useState<boolean>(true);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nikahhub_wedding_builder_project');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProject(parsed);
      }
      const savedAssets = localStorage.getItem('nikahhub_user_uploaded_assets');
      if (savedAssets) {
        setUploadedAssets(JSON.parse(savedAssets));
      }
    } catch {
      // ignore
    }
  }, []);

  // Record history for Undo / Redo
  const recordHistory = (newProject: GlobalProjectConfig) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    setHistory([...nextHistory, newProject]);
    setHistoryIndex(nextHistory.length);
  };

  const handleUpdateProject = (newProject: GlobalProjectConfig) => {
    recordHistory(project);
    setProject(newProject);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setProject(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setProject(history[historyIndex + 1]);
    }
  };

  // Save to LocalStorage
  const handleSave = () => {
    try {
      localStorage.setItem('nikahhub_wedding_builder_project', JSON.stringify(project));
      setSaveStatus('Tersimpan otomatis!');
      setTimeout(() => setSaveStatus(null), 2500);
    } catch {
      setSaveStatus('Gagal menyimpan (kuota penuh)');
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${project.title.replace(/\s+/g, '-').toLowerCase()}-undangan.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.sections) {
          handleUpdateProject(parsed);
          alert('Template undangan berhasil diimpor!');
        }
      } catch {
        alert('File JSON tidak valid!');
      }
    };
    reader.readAsText(file);
  };

  // File Uploader for user assets with smart compression & Cloudflare R2
  const handleUploadAsset = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus('Mengompresi & mengupload aset...');

    const newUploaded: Array<{ name: string; url: string; storage?: string; size?: number }> = [];

    for (const rawFile of Array.from(files)) {
      try {
        let fileToUpload = rawFile;
        if (useSmartCompression) {
          fileToUpload = await compressImage(rawFile, {
            maxWidth: 1920,
            maxHeight: 1920,
            quality: 0.85,
          });
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          const assetInfo = {
            name: rawFile.name,
            url: data.url,
            storage: data.storage,
            size: data.size,
          };
          newUploaded.push(assetInfo);
        } else {
          // Fallback to local base64 if api fails
          const reader = new FileReader();
          await new Promise<void>((resolve) => {
            reader.onload = (ev) => {
              newUploaded.push({
                name: rawFile.name,
                url: ev.target?.result as string,
                storage: 'local-memory',
              });
              resolve();
            };
            reader.readAsDataURL(fileToUpload);
          });
        }
      } catch (err) {
        console.error('Error uploading asset:', err);
      }
    }

    if (newUploaded.length > 0) {
      const updatedAssets = [...newUploaded, ...uploadedAssets];
      setUploadedAssets(updatedAssets);
      try {
        localStorage.setItem('nikahhub_user_uploaded_assets', JSON.stringify(updatedAssets));
      } catch {
        // ignore
      }
      setUploadStatus(`Berhasil upload ${newUploaded.length} aset!`);
    } else {
      setUploadStatus('Gagal mengupload aset.');
    }

    setIsUploading(false);
    setTimeout(() => setUploadStatus(null), 3000);
    // Reset file input
    e.target.value = '';
  };

  // Helper to find selected element
  const getSelectedElement = (): CanvasElement | null => {
    if (!selectedElementId) return null;
    for (const section of project.sections) {
      const el = section.elements.find((e) => e.id === selectedElementId);
      if (el) return el;
    }
    return null;
  };

  // Update selected element
  const updateSelectedElement = (partial: Partial<CanvasElement>) => {
    if (!selectedElementId) return;
    const updatedSections = project.sections.map((section) => ({
      ...section,
      elements: section.elements.map((el) => {
        if (el.id === selectedElementId) {
          return { ...el, ...partial };
        }
        return el;
      }),
    }));
    handleUpdateProject({ ...project, sections: updatedSections });
  };

  // Add element to active section
  const handleAddElement = (elementData: Partial<CanvasElement>) => {
    const targetSectionId = selectedSectionId || project.sections[0].id;
    const newElement: CanvasElement = {
      id: `el-${Date.now()}`,
      name: elementData.name || 'Elemen Baru',
      type: elementData.type || 'text',
      sectionId: targetSectionId,
      content: elementData.content || 'Teks Baru',
      fontFamily: elementData.fontFamily || 'Playfair Display, serif',
      fontSize: elementData.fontSize || 18,
      fontWeight: elementData.fontWeight || '600',
      fontStyle: elementData.fontStyle || 'normal',
      textAlign: elementData.textAlign || 'center',
      letterSpacing: elementData.letterSpacing || 1,
      lineHeight: elementData.lineHeight || 1.3,
      textColor: elementData.textColor || '#2C2B29',
      backgroundColor: elementData.backgroundColor || 'transparent',
      borderColor: elementData.borderColor || 'transparent',
      borderWidth: elementData.borderWidth || 0,
      borderStyle: elementData.borderStyle || 'none',
      borderRadius: elementData.borderRadius || 0,
      width: elementData.width || 260,
      height: elementData.height || 40,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      shadow: 'none',
      animation: elementData.animation || {
        type: 'fadeUp',
        duration: 1.4,
        delay: 0.2,
        trigger: 'onScroll',
      },
      ...elementData,
    };

    const updatedSections = project.sections.map((sec) => {
      if (sec.id === targetSectionId) {
        return { ...sec, elements: [...sec.elements, newElement] };
      }
      return sec;
    });

    handleUpdateProject({ ...project, sections: updatedSections });
    setSelectedElementId(newElement.id);
  };

  // Delete element
  const handleDeleteElement = (id: string) => {
    const updatedSections = project.sections.map((sec) => ({
      ...sec,
      elements: sec.elements.filter((el) => el.id !== id),
    }));
    handleUpdateProject({ ...project, sections: updatedSections });
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  // Duplicate element
  const handleDuplicateElement = (el: CanvasElement) => {
    const duplicated: CanvasElement = {
      ...el,
      id: `el-${Date.now()}`,
      name: `${el.name} (Salinan)`,
      y: (typeof el.y === 'number' ? el.y : 0) + 20,
    };
    const updatedSections = project.sections.map((sec) => {
      if (sec.id === el.sectionId) {
        return { ...sec, elements: [...sec.elements, duplicated] };
      }
      return sec;
    });
    handleUpdateProject({ ...project, sections: updatedSections });
    setSelectedElementId(duplicated.id);
  };

  // Reorder sections
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= project.sections.length) return;
    const newSections = [...project.sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIdx, 0, moved);
    handleUpdateProject({ ...project, sections: newSections });
  };

  // Add new section
  const handleAddSection = () => {
    const newSection: BuilderSection = {
      id: `section-${Date.now()}`,
      title: 'Bagian Baru',
      type: 'custom',
      enabled: true,
      backgroundColor: '#FAF9F5',
      minHeight: 400,
      paddingY: 40,
      elements: [],
    };
    handleUpdateProject({ ...project, sections: [...project.sections, newSection] });
    setSelectedSectionId(newSection.id);
  };

  // Delete section
  const handleDeleteSection = (secId: string) => {
    if (project.sections.length <= 1) {
      alert('Undangan minimal harus memiliki 1 section!');
      return;
    }
    const updatedSections = project.sections.filter((s) => s.id !== secId);
    handleUpdateProject({ ...project, sections: updatedSections });
    if (selectedSectionId === secId) {
      setSelectedSectionId(updatedSections[0].id);
    }
  };

  const selectedElement = getSelectedElement();
  const activePaletteObj = COLOR_PALETTES.find((p) => p.id === project.activePalette) || COLOR_PALETTES[0];

  return (
    <div className="flex flex-col w-full h-screen bg-[#141610] text-[#FAF9F5] overflow-hidden select-none">
      {/* 1. TOP HEADER APP BAR */}
      <header className="h-14 bg-[#1E2218] border-b border-[#C2A676]/30 px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Branding & Project Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#51583D] to-[#C2A676] flex items-center justify-center shadow">
            <Sparkles className="w-4 h-4 text-[#FAF9F5]" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-sm sm:text-base text-[#FAF9F5] flex items-center gap-2">
              <span>Studio Pembuat Undangan</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C2A676]/20 text-[#E8D8BA] border border-[#C2A676]/40 uppercase tracking-widest font-mono">
                Engine V2
              </span>
            </h1>
            <p className="text-[10px] text-[#A0A694]">Drag, tempel, ganti font, warna, & animasi sesuka hati</p>
          </div>
        </div>

        {/* Center: Mode Toggles (Editor vs Live Preview) */}
        <div className="flex items-center bg-[#141610] p-1 rounded-xl border border-[#C2A676]/30">
          <button
            onClick={() => setPreviewMode('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              previewMode === 'editor'
                ? 'bg-[#51583D] text-[#FAF9F5] shadow'
                : 'text-[#A0A694] hover:text-[#FAF9F5]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Mode Studio Edit</span>
          </button>
          <button
            onClick={() => setPreviewMode('live')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              previewMode === 'live'
                ? 'bg-[#51583D] text-[#FAF9F5] shadow'
                : 'text-[#A0A694] hover:text-[#FAF9F5]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#C2A676]" />
            <span>Live Preview HP</span>
          </button>
        </div>

        {/* Right: Actions (Undo, Redo, Save, Export, Import) */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Save Status / Button */}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#51583D] hover:bg-[#65744F] text-[#FAF9F5] text-xs font-semibold border border-[#C2A676]/40 shadow transition"
          >
            <Save className="w-3.5 h-3.5 text-[#E8D8BA]" />
            <span>{saveStatus || 'Simpan'}</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 transition"
            title="Download Desain Undangan (JSON)"
          >
            <Download className="w-3.5 h-3.5 text-[#C2A676]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Import JSON */}
          <label
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 cursor-pointer transition"
            title="Upload Desain Undangan (JSON)"
          >
            <Upload className="w-3.5 h-3.5 text-[#C2A676]" />
            <span className="hidden sm:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (LEFT TOOLBAR + CENTER CANVAS + RIGHT INSPECTOR) */}
      <div className="flex-1 flex overflow-hidden">
        {/* === LEFT DOCK / TOOLBAR (TABS) === */}
        <aside className="w-16 sm:w-20 bg-[#1A1D15] border-r border-[#C2A676]/20 flex flex-col items-center py-3 gap-2 shrink-0 z-20">
          {[
            { id: 'sections', label: 'Bagian', icon: Layers },
            { id: 'text', label: 'Teks', icon: Type },
            { id: 'assets', label: 'Asset', icon: ImageIcon },
            { id: 'shapes', label: 'Shape', icon: Square },
            { id: 'animation', label: 'Animasi', icon: Sparkles },
            { id: 'theme', label: 'Tema', icon: Palette },
            { id: 'music', label: 'Musik', icon: Music },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-12 sm:w-14 h-12 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? 'bg-[#51583D] text-[#E8D8BA] shadow-lg border border-[#C2A676]/50'
                    : 'text-[#A0A694] hover:bg-white/5 hover:text-[#FAF9F5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* === LEFT DRAWER / EXPANDABLE PALETTE === */}
        <aside className="w-64 sm:w-72 bg-[#171A12] border-r border-[#C2A676]/20 flex flex-col shrink-0 z-10 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: SECTIONS */}
          {activeTab === 'sections' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Daftar Bagian Undangan</h3>
                <button
                  onClick={handleAddSection}
                  className="p-1 rounded-md bg-[#51583D] hover:bg-[#65744F] text-[#FAF9F5] text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>

              <div className="space-y-2">
                {project.sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedSectionId === sec.id
                        ? 'bg-[#51583D]/40 border-[#C2A676] shadow'
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-[#FAF9F5]">{sec.title}</h4>
                      <p className="text-[10px] text-[#A0A694]">{sec.elements.length} elemen aktif</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(idx, 'up');
                        }}
                        disabled={idx === 0}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-20"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(idx, 'down');
                        }}
                        disabled={idx === project.sections.length - 1}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-20"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(sec.id);
                        }}
                        className="p-1 hover:bg-rose-500/20 text-rose-400 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TEXT PRESETS */}
          {activeTab === 'text' && (
            <div>
              <h3 className="font-serif font-bold text-sm text-[#E8D8BA] mb-3">Tambah Elemen Teks</h3>
              <p className="text-[11px] text-[#A0A694] mb-3">Klik untuk menempelkan ke bagian aktif:</p>
              <div className="space-y-2">
                {[
                  {
                    label: 'Judul Utama (Serif Mewah)',
                    content: 'The Wedding of',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 28,
                    fontWeight: '700',
                  },
                  {
                    label: 'Nama Pasangan (Script Kaligrafi)',
                    content: 'Dion & Sarah',
                    fontFamily: 'Great Vibes, cursive',
                    fontSize: 36,
                    fontWeight: '400',
                  },
                  {
                    label: 'Kaligrafi Bismillah Arab',
                    content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                    fontFamily: 'Amiri, serif',
                    fontSize: 24,
                    fontWeight: '700',
                  },
                  {
                    label: 'Ayat Quran / Doa Suci',
                    content: 'Dan di antara tanda-tanda kebesaran-Nya...',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 12,
                    fontWeight: '300',
                    fontStyle: 'italic',
                  },
                  {
                    label: 'Tombol Aksi (Call To Action)',
                    content: '✨ Buka Undangan',
                    type: 'button',
                    backgroundColor: '#51583D',
                    textColor: '#FAF9F5',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: '700',
                  },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddElement(preset as any)}
                    className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-[#51583D]/40 border border-[#C2A676]/30 text-left text-xs font-medium transition flex items-center justify-between"
                  >
                    <span>{preset.label}</span>
                    <Plus className="w-3.5 h-3.5 text-[#C2A676]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ASSETS & UPLOAD */}
          {activeTab === 'assets' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Upload Aset & Storage</h3>
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Cloud className="w-3 h-3" /> Cloudflare R2 / S3
                  </span>
                </div>

                {/* Smart Compression Toggle */}
                <div className="mb-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="smart-compress"
                    checked={useSmartCompression}
                    onChange={(e) => setUseSmartCompression(e.target.checked)}
                    className="mt-0.5 accent-[#C2A676] cursor-pointer"
                  />
                  <label htmlFor="smart-compress" className="text-xs text-[#FAF9F5] cursor-pointer">
                    <div className="font-semibold text-[11px] text-[#E8D8BA]">
                      ⚡ Kompresi Cerdas WebP (Disarankan)
                    </div>
                    <p className="text-[10px] text-[#A0A694] leading-relaxed">
                      Kamera HP 5-10MB dikompres ke ~200KB resolusi retina (1920p). Tidak buram, mulus & tidak lemot saat dibuka tamu di HP.
                    </p>
                  </label>
                </div>

                <label className={`w-full py-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition ${
                  isUploading
                    ? 'border-[#C2A676] bg-[#C2A676]/10 opacity-70 cursor-wait'
                    : 'border-[#C2A676]/50 hover:bg-white/5 hover:border-[#C2A676]'
                }`}>
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-6 h-6 text-[#C2A676] animate-spin mb-1" />
                      <span className="text-xs font-semibold text-[#FAF9F5]">Sedang Memproses Aset...</span>
                      <span className="text-[10px] text-[#A0A694]">Mengompresi & menyimpan ke R2 Storage</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[#C2A676] mb-1" />
                      <span className="text-xs font-semibold text-[#FAF9F5]">Pilih Gambar dari Komputer / HP</span>
                      <span className="text-[10px] text-[#A0A694]">PNG transparan, WebP, JPG (Otomatis masuk Cloud)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={isUploading}
                    onChange={handleUploadAsset}
                    className="hidden"
                  />
                </label>

                {uploadStatus && (
                  <p className="text-[11px] text-[#C2A676] font-medium text-center mt-2 animate-pulse">
                    {uploadStatus}
                  </p>
                )}
              </div>

              {/* Uploaded assets list */}
              {uploadedAssets.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-[#FAF9F5]">Aset Cloud Anda:</h4>
                    <span className="text-[10px] text-[#A0A694]">{uploadedAssets.length} file</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {uploadedAssets.map((asset, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          handleAddElement({
                            name: asset.name,
                            type: 'image',
                            content: asset.url,
                            width: 140,
                            height: 140,
                          })
                        }
                        className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#C2A676] hover:bg-[#51583D]/20 cursor-pointer group flex flex-col items-center relative transition"
                      >
                        <img src={asset.url} alt="" className="w-16 h-16 object-contain" />
                        <span className="text-[9px] text-[#FAF9F5] truncate w-full text-center mt-1">
                          {asset.name}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {asset.storage === 'cloudflare-r2' ? (
                            <span className="text-[8px] px-1 rounded bg-sky-500/20 text-sky-300 font-mono">
                              R2 Cloud
                            </span>
                          ) : (
                            <span className="text-[8px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">
                              Server
                            </span>
                          )}
                          {asset.size && (
                            <span className="text-[8px] text-[#A0A694]">
                              {Math.round(asset.size / 1024)}KB
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Built-in Ornaments Library */}
              <div>
                <h4 className="text-xs font-semibold text-[#FAF9F5] mb-2">Bunga & Ornamen Template:</h4>
                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                  {ORNAMENT_LIBRARY.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        handleAddElement({
                          name: item.name,
                          type: 'image',
                          content: item.src,
                          width: item.width,
                          height: item.height,
                        })
                      }
                      className="p-2 rounded-xl bg-white/5 border border-[#C2A676]/20 hover:border-[#C2A676] hover:bg-[#51583D]/20 cursor-pointer flex flex-col items-center justify-center transition"
                    >
                      <img src={item.src} alt="" className="w-14 h-14 object-contain filter drop-shadow" />
                      <span className="text-[10px] text-[#FAF9F5] mt-1 text-center line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHAPES & FRAMES */}
          {activeTab === 'shapes' && (
            <div>
              <h3 className="font-serif font-bold text-sm text-[#E8D8BA] mb-3">Shape & Frame Arsitektur</h3>
              <div className="space-y-2">
                {SHAPE_PRESETS.map((shape, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleAddElement({
                        name: shape.name,
                        type: 'shape',
                        shapeType: shape.shapeType as any,
                        width: shape.width,
                        height: shape.height,
                        borderRadius: shape.borderRadius,
                        borderWidth: shape.borderWidth,
                        borderColor: shape.borderColor,
                        backgroundColor: shape.backgroundColor,
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-[#51583D]/40 border border-[#C2A676]/30 text-left text-xs font-medium transition flex items-center justify-between"
                  >
                    <span>{shape.name}</span>
                    <Plus className="w-3.5 h-3.5 text-[#C2A676]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GLOBAL PARTICLES & AMBIENT ANIMATION */}
          {activeTab === 'animation' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Efek Animasi Partikel</h3>
              <p className="text-[11px] text-[#A0A694]">Pilih efek partikel yang melayang di seluruh undangan:</p>
              <div className="space-y-2">
                {[
                  { id: 'petals', label: '🌸 Kelopak Bunga Gugur (Falling Petals)' },
                  { id: 'butterflies', label: '🦋 Kupu-kupu Terbang (Animated Butterflies)' },
                  { id: 'sparkles', label: '✨ Kilauan Emas (Golden Sparkles)' },
                  { id: 'doves', label: '🕊️ Burung Merpati Terbang (Flying Doves)' },
                  { id: 'none', label: '🚫 Tanpa Efek Partikel' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleUpdateProject({ ...project, ambientEffect: item.id as any })}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition ${
                      project.ambientEffect === item.id
                        ? 'bg-[#51583D] border-[#C2A676] text-[#FAF9F5] shadow'
                        : 'bg-white/5 border-white/5 text-[#A0A694] hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COLOR PALETTES & THEME */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Palet Warna Tema</h3>
              <div className="space-y-2.5">
                {COLOR_PALETTES.map((pal) => (
                  <div
                    key={pal.id}
                    onClick={() => handleUpdateProject({ ...project, activePalette: pal.id })}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      project.activePalette === pal.id
                        ? 'bg-[#51583D]/40 border-[#C2A676] shadow'
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#FAF9F5]">{pal.name}</span>
                      {project.activePalette === pal.id && <Check className="w-3.5 h-3.5 text-[#C2A676]" />}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[pal.primary, pal.secondary, pal.accent, pal.background].map((c, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-black/20 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BACKGROUND MUSIC */}
          {activeTab === 'music' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Musik Latar Belakang</h3>
              <div>
                <label className="block text-xs font-semibold text-[#FAF9F5] mb-1">Judul Lagu</label>
                <input
                  type="text"
                  value={project.backgroundMusic.title}
                  onChange={(e) =>
                    handleUpdateProject({
                      ...project,
                      backgroundMusic: { ...project.backgroundMusic, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#C2A676]/30 text-xs text-[#FAF9F5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FAF9F5] mb-1">URL Musik MP3</label>
                <input
                  type="text"
                  value={project.backgroundMusic.url}
                  onChange={(e) =>
                    handleUpdateProject({
                      ...project,
                      backgroundMusic: { ...project.backgroundMusic, url: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#C2A676]/30 text-xs text-[#FAF9F5] focus:outline-none"
                />
              </div>
            </div>
          )}
        </aside>

        {/* === CENTER: MOBILE PREVIEW CANVAS === */}
        <main className="flex-1 bg-[#0F110B] relative flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-8">
          {/* Global Ambient Particles on Canvas */}
          {project.ambientEffect === 'petals' && (
            <FloatingPetals count={15} type="mixed" className="fixed inset-0 pointer-events-none z-10" />
          )}

          {/* Smartphone Frame Simulation */}
          <div className="relative w-full max-w-[420px] bg-[#FAF9F5] rounded-[44px] shadow-[0_0_80px_rgba(0,0,0,0.8)] border-[10px] border-[#2A2E22] overflow-hidden my-auto shrink-0 transition-all">
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-[#1A1D15] z-50 flex items-center justify-center">
              <div className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Canvas Sections Container */}
            <div className="w-full min-h-[750px] flex flex-col pt-6 pb-20">
              {project.sections
                .filter((s) => s.enabled)
                .map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`relative w-full transition-all ${
                      selectedSectionId === sec.id && previewMode === 'editor'
                        ? 'ring-2 ring-[#C2A676] ring-inset'
                        : ''
                    }`}
                    style={{
                      backgroundColor: sec.backgroundColor,
                      minHeight: `${sec.minHeight}px`,
                      paddingTop: `${sec.paddingY}px`,
                      paddingBottom: `${sec.paddingY}px`,
                    }}
                  >
                    {/* Section Badge in Editor Mode */}
                    {previewMode === 'editor' && (
                      <div className="absolute top-2 left-3 z-30 px-2 py-0.5 rounded bg-black/60 text-[#E8D8BA] text-[9px] font-mono tracking-wider backdrop-blur-sm pointer-events-none">
                        Section: {sec.title}
                      </div>
                    )}

                    {/* Render Elements inside this Section */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {sec.elements.map((el) => {
                        const isSelected = selectedElementId === el.id && previewMode === 'editor';

                        return (
                          <div
                            key={el.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedElementId(el.id);
                              setSelectedSectionId(sec.id);
                            }}
                            className={`relative transition-transform select-none cursor-pointer ${
                              isSelected
                                ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent'
                                : 'hover:ring-1 hover:ring-[#C2A676]/60'
                            }`}
                            style={{
                              transform: `translate(${el.x}px, ${el.y}px) rotate(${el.rotation}deg) scale(${el.scale})`,
                              width: typeof el.width === 'number' ? `${el.width}px` : el.width,
                              height: typeof el.height === 'number' ? `${el.height}px` : el.height,
                              zIndex: el.zIndex,
                              opacity: el.opacity,
                            }}
                          >
                            {/* Selected Action Floating Toolbar */}
                            {isSelected && (
                              <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-50 bg-[#2A2E22] px-2 py-1 rounded-lg border border-[#C2A676]/60 shadow-xl flex items-center gap-1.5 text-white">
                                <span className="text-[10px] font-medium max-w-[100px] truncate text-[#E8D8BA]">
                                  {el.name}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateElement(el);
                                  }}
                                  className="p-1 hover:bg-white/10 rounded"
                                  title="Duplikat"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteElement(el.id);
                                  }}
                                  className="p-1 hover:bg-rose-500/30 text-rose-400 rounded"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}

                            {/* TEXT ELEMENT */}
                            {el.type === 'text' && (
                              <div
                                style={{
                                  fontFamily: el.fontFamily,
                                  fontSize: `${el.fontSize}px`,
                                  fontWeight: el.fontWeight,
                                  fontStyle: el.fontStyle,
                                  textAlign: el.textAlign,
                                  letterSpacing: `${el.letterSpacing}px`,
                                  lineHeight: el.lineHeight,
                                  color: el.textColor,
                                  backgroundColor: el.backgroundColor,
                                  borderColor: el.borderColor,
                                  borderWidth: `${el.borderWidth}px`,
                                  borderStyle: el.borderStyle,
                                  borderRadius: `${el.borderRadius}px`,
                                }}
                                className="w-full h-full flex items-center justify-center p-1 whitespace-pre-line"
                              >
                                {el.content}
                              </div>
                            )}

                            {/* IMAGE / FLOWER / ORNAMENT ELEMENT */}
                            {(el.type === 'image' || el.type === 'flower' || el.type === 'ornament' || el.type === 'bismillah') && (
                              <div
                                className="w-full h-full flex items-center justify-center overflow-hidden"
                                style={{
                                  borderRadius: `${el.borderRadius}px`,
                                  borderWidth: `${el.borderWidth}px`,
                                  borderColor: el.borderColor,
                                  borderStyle: el.borderStyle,
                                }}
                              >
                                <img
                                  src={el.content}
                                  alt={el.name}
                                  className="w-full h-full object-contain pointer-events-none"
                                />
                              </div>
                            )}

                            {/* SHAPE ELEMENT */}
                            {el.type === 'shape' && (
                              <div
                                style={{
                                  backgroundColor: el.backgroundColor,
                                  borderColor: el.borderColor,
                                  borderWidth: `${el.borderWidth}px`,
                                  borderStyle: el.borderStyle,
                                  borderRadius: `${el.borderRadius}px`,
                                  color: el.textColor,
                                  fontFamily: el.fontFamily,
                                  fontSize: `${el.fontSize}px`,
                                  fontWeight: el.fontWeight,
                                  textAlign: el.textAlign,
                                }}
                                className="w-full h-full flex items-center justify-center p-3 whitespace-pre-line shadow-sm"
                              >
                                {el.content}
                              </div>
                            )}

                            {/* BUTTON ELEMENT */}
                            {el.type === 'button' && (
                              <button
                                style={{
                                  fontFamily: el.fontFamily,
                                  fontSize: `${el.fontSize}px`,
                                  fontWeight: el.fontWeight,
                                  color: el.textColor,
                                  backgroundColor: el.backgroundColor,
                                  borderColor: el.borderColor,
                                  borderWidth: `${el.borderWidth}px`,
                                  borderStyle: el.borderStyle,
                                  borderRadius: `${el.borderRadius}px`,
                                  letterSpacing: `${el.letterSpacing}px`,
                                }}
                                className="w-full h-full flex items-center justify-center shadow-lg pointer-events-auto"
                              >
                                {el.content}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>

        {/* === RIGHT PROPERTY INSPECTOR === */}
        <aside className="w-72 sm:w-80 bg-[#171A12] border-l border-[#C2A676]/20 flex flex-col shrink-0 z-20 overflow-y-auto p-4 space-y-4">
          {selectedElement ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C2A676]" />
                  <h3 className="font-serif font-bold text-sm text-[#FAF9F5]">Inspector Elemen</h3>
                </div>
                <button
                  onClick={() => setSelectedElementId(null)}
                  className="text-[10px] text-[#A0A694] hover:text-white"
                >
                  Tutup
                </button>
              </div>

              {/* 1. Element Name & Content */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Nama Elemen</label>
                  <input
                    type="text"
                    value={selectedElement.name}
                    onChange={(e) => updateSelectedElement({ name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                  />
                </div>

                {selectedElement.type !== 'image' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Isi Konten / Teks</label>
                    <textarea
                      rows={3}
                      value={selectedElement.content}
                      onChange={(e) => updateSelectedElement({ content: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676] resize-none"
                    />
                  </div>
                )}
              </div>

              {/* 2. Typography Controls */}
              {selectedElement.type !== 'image' && (
                <div className="space-y-3 pt-3 border-t border-white/10 mb-4">
                  <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Tipografi & Font</h4>

                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Font Family</label>
                    <select
                      value={selectedElement.fontFamily}
                      onChange={(e) => updateSelectedElement({ fontFamily: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5] focus:outline-none"
                    >
                      {FONT_OPTIONS.map((f, i) => (
                        <option key={i} value={f.value} style={{ fontFamily: f.value }}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-[#A0A694] mb-1">
                        Ukuran ({selectedElement.fontSize}px)
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="72"
                        value={selectedElement.fontSize}
                        onChange={(e) => updateSelectedElement({ fontSize: Number(e.target.value) })}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#A0A694] mb-1">Ketebalan</label>
                      <select
                        value={selectedElement.fontWeight}
                        onChange={(e) => updateSelectedElement({ fontWeight: e.target.value as any })}
                        className="w-full px-2 py-1 rounded bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5]"
                      >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="600">SemiBold (600)</option>
                        <option value="700">Bold (700)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A0A694]">Warna Teks</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedElement.textColor}
                        onChange={(e) => updateSelectedElement({ textColor: e.target.value })}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono">{selectedElement.textColor}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Box & Shape Controls */}
              <div className="space-y-3 pt-3 border-t border-white/10 mb-4">
                <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Kotak & Shape</h4>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#A0A694]">Warna Latar (Background)</span>
                  <input
                    type="color"
                    value={selectedElement.backgroundColor.startsWith('#') ? selectedElement.backgroundColor : '#ffffff'}
                    onChange={(e) => updateSelectedElement({ backgroundColor: e.target.value })}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#A0A694]">Warna Garis (Border)</span>
                  <input
                    type="color"
                    value={selectedElement.borderColor.startsWith('#') ? selectedElement.borderColor : '#C2A676'}
                    onChange={(e) => updateSelectedElement({ borderColor: e.target.value })}
                    className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#A0A694] mb-1">
                    Radius Sudut / Lengkung ({selectedElement.borderRadius}px)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={selectedElement.borderRadius}
                    onChange={(e) => updateSelectedElement({ borderRadius: Number(e.target.value) })}
                    className="w-full accent-[#C2A676]"
                  />
                </div>
              </div>

              {/* 4. Position & Geometry */}
              <div className="space-y-3 pt-3 border-t border-white/10 mb-4">
                <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Posisi & Ukuran</h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Posisi X ({selectedElement.x}px)</label>
                    <input
                      type="number"
                      value={selectedElement.x}
                      onChange={(e) => updateSelectedElement({ x: Number(e.target.value) })}
                      className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Posisi Y ({selectedElement.y}px)</label>
                    <input
                      type="number"
                      value={selectedElement.y}
                      onChange={(e) => updateSelectedElement({ y: Number(e.target.value) })}
                      className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Lebar ({selectedElement.width}px)</label>
                    <input
                      type="number"
                      value={Number(selectedElement.width) || 100}
                      onChange={(e) => updateSelectedElement({ width: Number(e.target.value) })}
                      className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Tinggi ({selectedElement.height}px)</label>
                    <input
                      type="number"
                      value={Number(selectedElement.height) || 50}
                      onChange={(e) => updateSelectedElement({ height: Number(e.target.value) })}
                      className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#A0A694] mb-1">Rotasi ({selectedElement.rotation}°)</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selectedElement.rotation}
                    onChange={(e) => updateSelectedElement({ rotation: Number(e.target.value) })}
                    className="w-full accent-[#C2A676]"
                  />
                </div>
              </div>

              {/* 5. Animation Controls */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Animasi Masuk</h4>

                <div>
                  <label className="block text-[10px] text-[#A0A694] mb-1">Tipe Animasi</label>
                  <select
                    value={selectedElement.animation.type}
                    onChange={(e) =>
                      updateSelectedElement({
                        animation: { ...selectedElement.animation, type: e.target.value as AnimationType },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5]"
                  >
                    <option value="none">Tanpa Animasi</option>
                    <option value="fadeIn">Fade In (Muncul Halus)</option>
                    <option value="fadeUp">Fade Up (Meluncur Naik dari Bawah)</option>
                    <option value="fadeDown">Fade Down (Meluncur Turun)</option>
                    <option value="zoomIn">Zoom In (Membesar Lembut)</option>
                    <option value="bounce">Bounce In (Membal Cantik)</option>
                    <option value="sway">Sway (Bergoyang Alami)</option>
                    <option value="float">Floating (Melayang Santai)</option>
                    <option value="pulse">Pulse (Detak Lembut)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">
                      Durasi ({selectedElement.animation.duration}s)
                    </label>
                    <input
                      type="range"
                      min="0.4"
                      max="3.0"
                      step="0.1"
                      value={selectedElement.animation.duration}
                      onChange={(e) =>
                        updateSelectedElement({
                          animation: {
                            ...selectedElement.animation,
                            duration: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">
                      Delay ({selectedElement.animation.delay}s)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2.0"
                      step="0.1"
                      value={selectedElement.animation.delay}
                      onChange={(e) =>
                        updateSelectedElement({
                          animation: {
                            ...selectedElement.animation,
                            delay: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Nothing Selected State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#A0A694]">
              <Edit3 className="w-8 h-8 text-[#C2A676]/40 mb-3" />
              <h4 className="font-serif font-bold text-sm text-[#FAF9F5] mb-1">Belum Ada Elemen Dipilih</h4>
              <p className="text-xs">
                Klik salah satu teks, gambar, atau bentuk di kanvas HP untuk mengubah font, warna, bentuk, atau animasinya.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
