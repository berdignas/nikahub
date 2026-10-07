import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
  Palette,
  Layers,
  Sliders,
  Trash2,
  Copy,
  Plus,
  Play,
  RotateCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  Flower2,
  Move,
  FlipHorizontal,
  ChevronUp,
  Crop,
  Eye,
  FilePlus,
  Compass,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  FolderKanban,
  Maximize2,
  Minus,
} from 'lucide-react';
import { CanvasElement, BuilderSection, GlobalProjectConfig, AnimationType, LoopAnimationType } from '../types/builder';
import { FONT_OPTIONS, COLOR_PALETTES, ORNAMENT_LIBRARY, SHAPE_PRESETS } from '../lib/builder/presets';

export type MobileDrawerType =
  | 'none'
  | 'add'
  | 'text'
  | 'font'
  | 'color'
  | 'size'
  | 'anim'
  | 'position'
  | 'background'
  | 'pages';

interface CanvaMobileDockProps {
  selectedElement: CanvasElement | null;
  selectedSection: BuilderSection | undefined;
  project: GlobalProjectConfig;
  onUpdateElement: (partial: Partial<CanvasElement>) => void;
  onUpdateSection: (partial: Partial<BuilderSection>) => void;
  onAddElement: (elementData: Partial<CanvasElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: (el: CanvasElement) => void;
  onDeselect: () => void;
  onNudge: (dx: number, dy: number) => void;
  canvasViewMode: 'cover' | 'content' | 'all';
  onChangeCanvasViewMode: (mode: 'cover' | 'content' | 'all') => void;
  previewMode: 'editor' | 'live';
  onTogglePreviewMode: () => void;
  onTriggerAnimPreview: () => void;
  canvasZoom: number;
  onChangeZoom: (newZoom: number) => void;
  onOpenAddPageModal: () => void;
  isDragUnlocked?: boolean;
  onToggleDragLock?: () => void;
}

export const CanvaMobileDock: React.FC<CanvaMobileDockProps> = ({
  selectedElement,
  selectedSection,
  project,
  onUpdateElement,
  onUpdateSection,
  onAddElement,
  onDeleteElement,
  onDuplicateElement,
  onDeselect,
  onNudge,
  canvasViewMode,
  onChangeCanvasViewMode,
  previewMode,
  onTogglePreviewMode,
  onTriggerAnimPreview,
  canvasZoom,
  onChangeZoom,
  onOpenAddPageModal,
  isDragUnlocked = false,
  onToggleDragLock,
}) => {
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawerType>('none');
  const [addCategory, setAddCategory] = useState<'text' | 'flower' | 'shape' | 'image'>('text');
  const [colorTarget, setColorTarget] = useState<'text' | 'bg' | 'border'>('text');
  const [stagedAddId, setStagedAddId] = useState<string | null>(null);

  const activePalette = COLOR_PALETTES.find((p) => p.id === project.activePalette) || COLOR_PALETTES[0];

  const handleOpenDrawer = (drawer: MobileDrawerType) => {
    setStagedAddId(null);
    setActiveDrawer(activeDrawer === drawer ? 'none' : drawer);
  };

  const closeDrawer = () => {
    setActiveDrawer('none');
    setStagedAddId(null);
  };

  const handleAddWithConfirm = (id: string, elementData: Partial<CanvasElement>) => {
    if (stagedAddId === id) {
      onAddElement(elementData);
      setStagedAddId(null);
      closeDrawer();
    } else {
      setStagedAddId(id);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 select-none">
      {/* 1. FLOATING ZOOM & CANVAS TOOLS PILL (ABOVE DOCK) */}
      <div className="px-3 pb-1.5 flex items-center justify-between pointer-events-none">
        {/* Left: Element indicator & Drag Lock/Unlock / Deselect */}
        {selectedElement ? (
          <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2218]/95 border border-[#C2A676]/50 shadow-xl backdrop-blur-md">
            <button
              onClick={onToggleDragLock}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 transition ${
                isDragUnlocked
                  ? 'bg-amber-400 text-black shadow animate-pulse'
                  : 'bg-white/15 text-white/80 hover:bg-white/25'
              }`}
              title={isDragUnlocked ? 'Mode geser aktif (Ketuk untuk kunci)' : 'Ketuk 2x di kanvas atau tekan ini untuk menggeser'}
            >
              <span>{isDragUnlocked ? '🔓 Geser' : '🔒 Kunci'}</span>
            </button>
            <span className="text-[11px] font-bold text-[#E8D8BA] truncate max-w-[100px]">
              {selectedElement.name}
            </span>
            <button
              onClick={onDeselect}
              className="p-0.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white ml-0.5"
              title="Batalkan pilihan"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2218]/90 border border-white/10 shadow-lg backdrop-blur-md">
            <span className="text-[10px] text-[#A0A694]">Kanvas: {canvasViewMode === 'cover' ? 'Sampul' : 'Isi'}</span>
          </div>
        )}

        {/* Right: Floating Zoom Controls */}
        <div className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-full bg-[#1E2218]/95 border border-[#C2A676]/40 shadow-xl backdrop-blur-md text-[#E8D8BA]">
          <button
            onClick={() => onChangeZoom(Math.max(0.6, Number((canvasZoom - 0.15).toFixed(2))))}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95"
            title="Perkecil Kanvas"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onChangeZoom(1)}
            className="px-1 text-[10px] font-mono font-bold hover:text-white"
            title="Reset Skala 100%"
          >
            {Math.round(canvasZoom * 100)}%
          </button>
          <button
            onClick={() => onChangeZoom(Math.min(2.2, Number((canvasZoom + 0.15).toFixed(2))))}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95"
            title="Perbesar Kanvas"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. CANVA BOTTOM SHEET DRAWER (BOUNDED TO BOTTOM ZONE - NO FULL PAGE OVERLAY) */}
      <AnimatePresence>
        {activeDrawer !== 'none' && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="bg-[#181B13] border-t border-[#C2A676]/40 rounded-t-2xl shadow-[0_-12px_32px_rgba(0,0,0,0.92)] max-h-[195px] h-[195px] flex flex-col overflow-hidden"
          >
            {/* Drawer Drag Bar & Header */}
            <div className="pt-1.5 pb-1 px-3 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#141610]">
              <div className="w-8 h-0.5 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-[11px] font-bold text-[#FAF9F5] truncate max-w-[240px]">
                  {activeDrawer === 'add' && '➕ Tambah Elemen (Ketuk 2x untuk Pasang)'}
                  {activeDrawer === 'text' && '✏️ Edit Teks / Konten'}
                  {activeDrawer === 'font' && '🔤 Font & Tipografi'}
                  {activeDrawer === 'color' && '🎨 Pengaturan Warna'}
                  {activeDrawer === 'size' && '📐 Ukuran, Skala & Putar'}
                  {activeDrawer === 'anim' && '✨ Animasi Elemen'}
                  {activeDrawer === 'position' && '🧭 Geser, Nudge & Posisi'}
                  {activeDrawer === 'background' && '🖼️ Pengaturan Latar / Background'}
                  {activeDrawer === 'pages' && '📜 Pilihan Halaman Undangan'}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Drawer Body Scrollable Content (Gulir Sendiri Saja) */}
            <div className="p-2.5 overflow-y-auto space-y-2.5 flex-1 text-xs text-[#FAF9F5] max-h-[155px]">
              {/* === A. DRAWER: ADD ELEMENTS === */}
              {activeDrawer === 'add' && (
                <div className="space-y-2">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1 bg-[#141610] p-0.5 rounded-lg border border-white/10">
                    <button
                      onClick={() => {
                        setAddCategory('text');
                        setStagedAddId(null);
                      }}
                      className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                        addCategory === 'text' ? 'bg-[#51583D] text-white shadow' : 'text-[#A0A694]'
                      }`}
                    >
                      Teks
                    </button>
                    <button
                      onClick={() => {
                        setAddCategory('flower');
                        setStagedAddId(null);
                      }}
                      className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                        addCategory === 'flower' ? 'bg-[#51583D] text-white shadow' : 'text-[#A0A694]'
                      }`}
                    >
                      Bunga
                    </button>
                    <button
                      onClick={() => {
                        setAddCategory('shape');
                        setStagedAddId(null);
                      }}
                      className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                        addCategory === 'shape' ? 'bg-[#51583D] text-white shadow' : 'text-[#A0A694]'
                      }`}
                    >
                      Bentuk
                    </button>
                  </div>

                  {/* Add Text Presets with Double-Tap confirmation */}
                  {addCategory === 'text' && (
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() =>
                          handleAddWithConfirm('text-judul', {
                            name: 'Judul Mewah',
                            type: 'text',
                            content: 'The Wedding of',
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: 18,
                            fontStyle: 'italic',
                          })
                        }
                        className={`p-2 rounded-xl border text-left transition ${
                          stagedAddId === 'text-judul'
                            ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <p className="font-serif italic text-sm text-[#FAF9F5]">The Wedding of</p>
                        <p className="text-[9px] text-[#C2A676]">
                          {stagedAddId === 'text-judul' ? '✓ Ketuk lagi pasang' : 'Judul Garamond'}
                        </p>
                      </button>

                      <button
                        onClick={() =>
                          handleAddWithConfirm('text-couple', {
                            name: 'Nama Pasangan',
                            type: 'text',
                            content: `${project.groomName.split(' ')[0]} & ${project.brideName.split(' ')[0]}`,
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 26,
                            fontWeight: '600',
                          })
                        }
                        className={`p-2 rounded-xl border text-left transition ${
                          stagedAddId === 'text-couple'
                            ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <p className="font-serif font-bold text-sm text-[#E8D8BA]">Nama Pengantin</p>
                        <p className="text-[9px] text-[#C2A676]">
                          {stagedAddId === 'text-couple' ? '✓ Ketuk lagi pasang' : 'Playfair Mewah'}
                        </p>
                      </button>

                      <button
                        onClick={() =>
                          handleAddWithConfirm('text-date', {
                            name: 'Kutipan Kaligrafi',
                            type: 'text',
                            content: 'Save The Date',
                            fontFamily: 'Great Vibes, cursive',
                            fontSize: 22,
                          })
                        }
                        className={`p-2 rounded-xl border text-left transition ${
                          stagedAddId === 'text-date'
                            ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <p className="font-serif text-sm text-amber-200">Save The Date</p>
                        <p className="text-[9px] text-[#C2A676]">
                          {stagedAddId === 'text-date' ? '✓ Ketuk lagi pasang' : 'Kaligrafi Halus'}
                        </p>
                      </button>

                      <button
                        onClick={() =>
                          handleAddWithConfirm('btn-open', {
                            name: 'Tombol Undangan',
                            type: 'button',
                            content: '💌 BUKA UNDANGAN',
                            width: 200,
                            height: 40,
                            backgroundColor: '#51583D',
                            textColor: '#FAF9F5',
                            borderRadius: 999,
                            borderColor: '#C2A676',
                            borderWidth: 1.5,
                          })
                        }
                        className={`p-2 rounded-xl border text-left transition ${
                          stagedAddId === 'btn-open'
                            ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#51583D] text-[9px] font-bold text-white border border-[#C2A676]/40">
                          💌 Tombol Buka
                        </span>
                        <p className="text-[9px] text-[#C2A676]">
                          {stagedAddId === 'btn-open' ? '✓ Ketuk lagi pasang' : 'Tombol Interaktif'}
                        </p>
                      </button>
                    </div>
                  )}

                  {/* Add Flowers & Ornaments with Double-Tap confirmation */}
                  {addCategory === 'flower' && (
                    <div className="grid grid-cols-3 gap-1.5">
                      {ORNAMENT_LIBRARY.map((item, idx) => {
                        const isStaged = stagedAddId === item.name;
                        return (
                          <button
                            key={idx}
                            onClick={() =>
                              handleAddWithConfirm(item.name, {
                                name: item.name,
                                type: item.type as any,
                                content: item.src,
                                width: item.width,
                                height: item.height,
                              })
                            }
                            className={`p-1.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center ${
                              isStaged
                                ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                                : 'bg-white/5 hover:bg-white/10 border-white/10'
                            }`}
                          >
                            <img
                              src={item.src}
                              alt={item.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                (e.target as any).style.display = 'none';
                              }}
                            />
                            <span className="text-[9px] text-[#E8D8BA] line-clamp-1">
                              {isStaged ? '✓ Pasang' : item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Shapes with Double-Tap confirmation */}
                  {addCategory === 'shape' && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {SHAPE_PRESETS.map((shape, idx) => {
                        const isStaged = stagedAddId === shape.name;
                        return (
                          <button
                            key={idx}
                            onClick={() =>
                              handleAddWithConfirm(shape.name, {
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
                            className={`p-2 rounded-xl border text-left transition ${
                              isStaged
                                ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                                : 'bg-white/5 hover:bg-white/10 border-white/10'
                            }`}
                          >
                            <p className="font-bold text-xs text-[#E8D8BA]">{shape.name}</p>
                            <p className="text-[9px] text-[#C2A676]">
                              {isStaged ? '✓ Ketuk lagi pasang' : 'Garis & Kotak Mewah'}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* === B. DRAWER: EDIT TEXT / CONTENT === */}
              {activeDrawer === 'text' && selectedElement && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">
                      Teks / Isi Elemen
                    </label>
                    <textarea
                      rows={3}
                      value={selectedElement.content || ''}
                      onChange={(e) => onUpdateElement({ content: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#141610] border border-white/15 text-xs text-white focus:outline-none focus:border-[#C2A676] resize-none"
                      placeholder="Ketik teks di sini..."
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">
                      Nama Label Elemen
                    </label>
                    <input
                      type="text"
                      value={selectedElement.name || ''}
                      onChange={(e) => onUpdateElement({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#141610] border border-white/15 text-xs text-white focus:outline-none focus:border-[#C2A676]"
                    />
                  </div>
                </div>
              )}

              {/* === C. DRAWER: FONT & TYPOGRAPHY === */}
              {activeDrawer === 'font' && selectedElement && (
                <div className="space-y-4">
                  {/* Font Size & Steppers */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-[#E8D8BA]">Ukuran Huruf (Font Size)</span>
                      <span className="font-mono text-xs font-bold text-[#E8D8BA]">{selectedElement.fontSize}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateElement({ fontSize: Math.max(8, (selectedElement.fontSize || 16) - 2) })}
                        className="w-8 h-8 rounded-lg bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min={8}
                        max={72}
                        value={selectedElement.fontSize || 16}
                        onChange={(e) => onUpdateElement({ fontSize: Number(e.target.value) })}
                        className="flex-1 accent-[#C2A676]"
                      />
                      <button
                        onClick={() => onUpdateElement({ fontSize: Math.min(72, (selectedElement.fontSize || 16) + 2) })}
                        className="w-8 h-8 rounded-lg bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Alignment & Style Buttons */}
                  <div className="grid grid-cols-5 gap-1.5 bg-[#141610] p-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={() => onUpdateElement({ textAlign: 'left' })}
                      className={`py-1.5 flex items-center justify-center rounded-lg ${
                        selectedElement.textAlign === 'left' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                      }`}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpdateElement({ textAlign: 'center' })}
                      className={`py-1.5 flex items-center justify-center rounded-lg ${
                        selectedElement.textAlign === 'center' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                      }`}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpdateElement({ textAlign: 'right' })}
                      className={`py-1.5 flex items-center justify-center rounded-lg ${
                        selectedElement.textAlign === 'right' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                      }`}
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        onUpdateElement({
                          fontWeight: selectedElement.fontWeight === '700' ? '400' : '700',
                        })
                      }
                      className={`py-1.5 flex items-center justify-center rounded-lg ${
                        selectedElement.fontWeight === '700' ? 'bg-[#51583D] text-white font-bold' : 'text-[#A0A694]'
                      }`}
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        onUpdateElement({
                          fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic',
                        })
                      }
                      className={`py-1.5 flex items-center justify-center rounded-lg ${
                        selectedElement.fontStyle === 'italic' ? 'bg-[#51583D] text-white italic' : 'text-[#A0A694]'
                      }`}
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Font Family List */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-2">
                      Pilihan Font Elegan
                    </label>
                    <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto pr-1">
                      {FONT_OPTIONS.map((f, idx) => (
                        <button
                          key={idx}
                          onClick={() => onUpdateElement({ fontFamily: f.value })}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                            selectedElement.fontFamily === f.value
                              ? 'bg-white/15 border-[#C2A676] text-[#E8D8BA]'
                              : 'bg-white/5 border-white/5 text-white/90'
                          }`}
                        >
                          <span style={{ fontFamily: f.value }} className="text-sm">
                            {f.label.split('(')[0]}
                          </span>
                          <span className="text-[10px] text-[#A0A694] font-sans">{f.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === D. DRAWER: COLOR PICKER === */}
              {activeDrawer === 'color' && (
                <div className="space-y-4">
                  {selectedElement && (
                    <div className="flex items-center gap-1.5 bg-[#141610] p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => setColorTarget('text')}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                          colorTarget === 'text' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                        }`}
                      >
                        Warna Teks
                      </button>
                      <button
                        onClick={() => setColorTarget('bg')}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                          colorTarget === 'bg' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                        }`}
                      >
                        Latar Box
                      </button>
                      <button
                        onClick={() => setColorTarget('border')}
                        className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                          colorTarget === 'border' ? 'bg-[#51583D] text-white' : 'text-[#A0A694]'
                        }`}
                      >
                        Garis Tepi
                      </button>
                    </div>
                  )}

                  {/* Swatches */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-2">
                      Palet Warna Resmi ({activePalette.name})
                    </label>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {[
                        activePalette.primary,
                        activePalette.secondary,
                        activePalette.accent,
                        activePalette.background,
                        activePalette.card,
                        activePalette.text,
                        '#FFFFFF',
                        '#000000',
                        '#D4AF37',
                        '#B88691',
                        '#8C6A43',
                        'transparent',
                      ].map((hex, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (!selectedElement) {
                              onUpdateSection({ backgroundColor: hex });
                            } else if (colorTarget === 'text') {
                              onUpdateElement({ textColor: hex });
                            } else if (colorTarget === 'bg') {
                              onUpdateElement({ backgroundColor: hex });
                            } else {
                              onUpdateElement({ borderColor: hex, borderWidth: hex === 'transparent' ? 0 : 1 });
                            }
                          }}
                          className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center shadow transition active:scale-90"
                          style={{ backgroundColor: hex === 'transparent' ? '#1E2218' : hex }}
                          title={hex}
                        >
                          {hex === 'transparent' && <span className="text-[9px] text-white/50">None</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === E. DRAWER: SIZE & TRANSFORM === */}
              {activeDrawer === 'size' && selectedElement && (
                <div className="space-y-4">
                  {/* Scale Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-[#E8D8BA]">Skala Perbesar (Scale)</span>
                      <span className="font-mono text-xs font-bold text-[#E8D8BA]">
                        {(selectedElement.scale || 1).toFixed(1)}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.4}
                      max={2.5}
                      step={0.1}
                      value={selectedElement.scale || 1}
                      onChange={(e) => onUpdateElement({ scale: Number(e.target.value) })}
                      className="w-full accent-[#C2A676]"
                    />
                  </div>

                  {/* Rotation Stepper */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-[#E8D8BA]">Putaran / Sudut Derajat</span>
                      <span className="font-mono text-xs font-bold text-[#E8D8BA]">{selectedElement.rotation || 0}°</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={-180}
                        max={180}
                        value={selectedElement.rotation || 0}
                        onChange={(e) => onUpdateElement({ rotation: Number(e.target.value) })}
                        className="flex-1 accent-[#C2A676]"
                      />
                      <button
                        onClick={() =>
                          onUpdateElement({ rotation: ((selectedElement.rotation || 0) + 45) % 360 })
                        }
                        className="px-2.5 py-1 rounded-lg bg-white/10 active:bg-[#C2A676] text-white text-[11px] font-bold flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>+45°</span>
                      </button>
                    </div>
                  </div>

                  {/* Opacity Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-[#E8D8BA]">Transparansi (Opacity)</span>
                      <span className="font-mono text-xs font-bold text-[#E8D8BA]">
                        {Math.round((selectedElement.opacity ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.05}
                      value={selectedElement.opacity ?? 1}
                      onChange={(e) => onUpdateElement({ opacity: Number(e.target.value) })}
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                </div>
              )}

              {/* === F. DRAWER: ANIMATION === */}
              {activeDrawer === 'anim' && selectedElement && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#E8D8BA]">Animasi Muncul (Entrance)</span>
                    <button
                      onClick={onTriggerAnimPreview}
                      className="px-2.5 py-1 rounded-lg bg-[#C2A676] text-[#1E2218] font-bold text-[10px] flex items-center gap-1 shadow"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Uji Coba</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'fadeIn', label: 'Fade In' },
                      { id: 'fadeUp', label: 'Naik (Fade Up)' },
                      { id: 'zoomIn', label: 'Zoom Masuk' },
                      { id: 'bounceIn', label: 'Bounce Mantul' },
                      { id: 'spinIn', label: 'Putar (Spin)' },
                      { id: 'none', label: 'Tanpa Animasi' },
                    ].map((anim) => (
                      <button
                        key={anim.id}
                        onClick={() =>
                          onUpdateElement({
                            animation: {
                              ...(selectedElement.animation || { duration: 1.2, delay: 0.2, trigger: 'onLoad' }),
                              type: anim.id as AnimationType,
                              trigger: selectedElement.animation?.trigger || 'onLoad',
                            },
                          })
                        }
                        className={`p-2 rounded-xl border text-center transition ${
                          (selectedElement.animation?.type || 'fadeUp') === anim.id
                            ? 'bg-white/15 border-[#C2A676] text-[#E8D8BA] font-bold'
                            : 'bg-white/5 border-white/5 text-white/80'
                        }`}
                      >
                        <span className="text-[11px] block">{anim.label}</span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <span className="block text-[11px] font-semibold text-[#E8D8BA] mb-2">
                      Animasi Melayang Berulang (Looping)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'sway', label: 'Goyang Halus (Sway)' },
                        { id: 'float', label: 'Melayang (Float)' },
                        { id: 'pulse', label: 'Detak (Pulse)' },
                        { id: 'glow', label: 'Kilau (Glow)' },
                        { id: 'none', label: 'Diam (None)' },
                      ].map((loop) => (
                        <button
                          key={loop.id}
                          onClick={() =>
                            onUpdateElement({
                              animation: {
                                ...(selectedElement.animation || { duration: 1.2, delay: 0.2, trigger: 'onLoad', type: 'fadeUp' }),
                                type: selectedElement.animation?.type || 'fadeUp',
                                trigger: selectedElement.animation?.trigger || 'onLoad',
                                loopType: loop.id as LoopAnimationType,
                                loopDuration: 5,
                              },
                            })
                          }
                          className={`p-2 rounded-xl border text-center transition ${
                            (selectedElement.animation?.loopType || 'none') === loop.id
                              ? 'bg-white/15 border-[#C2A676] text-[#E8D8BA] font-bold'
                              : 'bg-white/5 border-white/5 text-white/80'
                          }`}
                        >
                          <span className="text-[11px] block">{loop.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === G. DRAWER: POSITION & NUDGE === */}
              {activeDrawer === 'position' && selectedElement && (
                <div className="space-y-4">
                  {/* Directional Nudge D-Pad */}
                  <div className="bg-[#141610] p-3 rounded-2xl border border-white/10 flex flex-col items-center gap-1.5">
                    <span className="text-[11px] text-[#A0A694] font-semibold">Geser Posisi Elemen (Nudge)</span>
                    <button
                      onClick={() => onNudge(0, -5)}
                      className="w-10 h-10 rounded-xl bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center shadow"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onNudge(-5, 0)}
                        className="w-10 h-10 rounded-xl bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center shadow"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onUpdateElement({ x: 0 })}
                        className="px-2 py-1 rounded-lg bg-white/5 text-[#E8D8BA] text-[10px] font-bold border border-white/10"
                      >
                        Tengah
                      </button>
                      <button
                        onClick={() => onNudge(5, 0)}
                        className="w-10 h-10 rounded-xl bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center shadow"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => onNudge(0, 5)}
                      className="w-10 h-10 rounded-xl bg-white/10 active:bg-[#C2A676] text-white flex items-center justify-center shadow"
                    >
                      <ArrowDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Layer Z-Index */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onUpdateElement({ zIndex: (selectedElement.zIndex || 10) + 5 })}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <span>Majukan Lapisan (Front)</span>
                    </button>
                    <button
                      onClick={() => onUpdateElement({ zIndex: Math.max(1, (selectedElement.zIndex || 10) - 5) })}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <span>Mundurkan (Back)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* === H. DRAWER: BACKGROUND / SECTION === */}
              {activeDrawer === 'background' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-2">
                      Pilih Warna Latar Bagian Ini
                    </label>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {['#FAF9F5', '#FAF6F0', '#FCF8F8', '#1E293B', '#51583D', '#141610', '#FFFFFF'].map(
                        (col, i) => (
                          <button
                            key={i}
                            onClick={() => onUpdateSection({ backgroundColor: col })}
                            className="w-10 h-10 rounded-full border-2 border-white/30 shadow active:scale-90"
                            style={{ backgroundColor: col }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-2">
                      Efek Animasi Latar
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'petals', label: '🌸 Guguran Kelopak' },
                        { id: 'sparkles', label: '✨ Kilau Bintang' },
                        { id: 'zoomSlow', label: '🔍 Zoom Perlahan' },
                        { id: 'none', label: 'Tanpa Efek' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onUpdateSection({ backgroundAnimation: item.id as any })}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold ${
                            selectedSection?.backgroundAnimation === item.id
                              ? 'bg-white/15 border-[#C2A676] text-[#E8D8BA]'
                              : 'bg-white/5 border-white/5 text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === I. DRAWER: PAGES === */}
              {activeDrawer === 'pages' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onChangeCanvasViewMode('cover');
                        closeDrawer();
                      }}
                      className={`p-3 rounded-2xl border text-left space-y-1 ${
                        canvasViewMode === 'cover'
                          ? 'bg-[#51583D] border-[#C2A676] text-white'
                          : 'bg-white/5 border-white/10 text-[#A0A694]'
                      }`}
                    >
                      <p className="font-bold text-xs text-[#E8D8BA]">💌 Layar Sampul</p>
                      <p className="text-[10px]">Halaman Pembuka Undangan</p>
                    </button>

                    <button
                      onClick={() => {
                        onChangeCanvasViewMode('content');
                        closeDrawer();
                      }}
                      className={`p-3 rounded-2xl border text-left space-y-1 ${
                        canvasViewMode === 'content'
                          ? 'bg-[#51583D] border-[#C2A676] text-white'
                          : 'bg-white/5 border-white/10 text-[#A0A694]'
                      }`}
                    >
                      <p className="font-bold text-xs text-[#E8D8BA]">📜 Isi Undangan</p>
                      <p className="text-[10px]">Kutipan, Akad & Resepsi</p>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onOpenAddPageModal();
                      closeDrawer();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Halaman Baru</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HORIZONTAL SCROLLABLE CANVA BOTTOM TOOLBAR */}
      <nav className="min-h-[58px] pb-[calc(env(safe-area-inset-bottom,0px)+4px)] pt-1.5 bg-[#171A12]/95 border-t border-[#C2A676]/30 px-2 flex items-center backdrop-blur-xl shadow-2xl">
        {selectedElement ? (
          /* ELEMENT SELECTED TOOLBAR (CANVA STYLE) */
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-0.5">
            {/* Edit Content */}
            <button
              onClick={() => handleOpenDrawer('text')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'text'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Edit Teks</span>
            </button>

            {/* Font Typography (if text) */}
            {['text', 'countdown', 'button'].includes(selectedElement.type) && (
              <button
                onClick={() => handleOpenDrawer('font')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  activeDrawer === 'font'
                    ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                    : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Font ({selectedElement.fontSize}px)</span>
              </button>
            )}

            {/* Color */}
            <button
              onClick={() => handleOpenDrawer('color')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'color'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Warna</span>
            </button>

            {/* Size & Scale */}
            <button
              onClick={() => handleOpenDrawer('size')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'size'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ukuran</span>
            </button>

            {/* Animation */}
            <button
              onClick={() => handleOpenDrawer('anim')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'anim'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Animasi</span>
            </button>

            {/* Position / Nudge */}
            <button
              onClick={() => handleOpenDrawer('position')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'position'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Move className="w-3.5 h-3.5" />
              <span>Posisi</span>
            </button>

            {/* Duplicate */}
            <button
              onClick={() => onDuplicateElement(selectedElement)}
              className="px-3 py-1.5 rounded-xl bg-white/10 text-[#E8D8BA] active:bg-white/20 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplikat</span>
            </button>

            {/* Delete */}
            <button
              onClick={() => onDeleteElement(selectedElement.id)}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
        ) : (
          /* CANVAS / BACKGROUND MODE TOOLBAR (WHEN NO ELEMENT SELECTED) */
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-0.5">
            {/* Primary Add Button (Canva Gold Circle) */}
            <button
              onClick={() => handleOpenDrawer('add')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg active:scale-95 transition shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Tambah</span>
            </button>

            {/* Background Color */}
            <button
              onClick={() => handleOpenDrawer('color')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'color'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Warna BG</span>
            </button>

            {/* Background Effects */}
            <button
              onClick={() => handleOpenDrawer('background')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'background'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Efek BG</span>
            </button>

            {/* Pages / Sections */}
            <button
              onClick={() => handleOpenDrawer('pages')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                activeDrawer === 'pages'
                  ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA] active:bg-[#51583D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Halaman</span>
            </button>

            {/* Live Preview Toggle */}
            <button
              onClick={onTogglePreviewMode}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                previewMode === 'live'
                  ? 'bg-emerald-500 text-white font-bold shadow'
                  : 'bg-white/10 text-[#E8D8BA]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{previewMode === 'live' ? 'Mode Edit' : 'Pratinjau'}</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
