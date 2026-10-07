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
  Loader2,
  Cloud,
  HardDrive,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Move,
  X,
  Store,
  FolderKanban,
  FlipHorizontal,
  FlipVertical,
  Crop,
  VolumeX,
  Pause,
  BookOpen,
  FilePlus,
  RefreshCw,
  Wind,
  Heart,
  Sun,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CanvasElement,
  BuilderSection,
  GlobalProjectConfig,
  ElementType,
  AnimationType,
  LoopAnimationType,
  ShapeType,
} from '../types/builder';
import {
  FONT_OPTIONS,
  COLOR_PALETTES,
  ORNAMENT_LIBRARY,
  SHAPE_PRESETS,
  DEFAULT_INITIAL_PROJECT,
  PAGE_TEMPLATES,
  PageTemplate,
} from '../lib/builder/presets';
import { FloatingPetals } from './FloatingPetals';
import { compressImage } from '../lib/builder/imageCompression';
import { uploadImageToSupabaseStorage } from '../lib/supabase';
import { getProjectById, saveProject } from '../lib/builder/projectStorage';
import { CanvaMobileDock } from './CanvaMobileDock';

interface InvitationStudioProps {
  projectId?: string;
  onBackToProjects?: () => void;
  onBackToHome?: () => void;
}

export const InvitationStudio: React.FC<InvitationStudioProps> = ({ 
  projectId,
  onBackToProjects,
  onBackToHome 
}) => {
  // Main Project State
  const [project, setProject] = useState<GlobalProjectConfig>(() => {
    if (projectId) return getProjectById(projectId);
    return DEFAULT_INITIAL_PROJECT;
  });
  const [history, setHistory] = useState<GlobalProjectConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Studio UI Navigation State
  const [activeTab, setActiveTab] = useState<
    'sections' | 'text' | 'assets' | 'shapes' | 'animation' | 'theme' | 'music'
  >('sections');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-cover');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'editor' | 'live'>('editor');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Animation Test & Interactive Preview Key
  const [animPreviewKey, setAnimPreviewKey] = useState<number>(0);
  const triggerPreviewAnimation = () => {
    setAnimPreviewKey((k) => k + 1);
  };

  // Entrance & Looping Animation Helpers
  const getEntranceInitial = (type?: AnimationType) => {
    switch (type) {
      case 'fadeIn': return { opacity: 0 };
      case 'fadeUp': return { opacity: 0, y: 35 };
      case 'fadeDown': return { opacity: 0, y: -35 };
      case 'fadeLeft': return { opacity: 0, x: -35 };
      case 'fadeRight': return { opacity: 0, x: 35 };
      case 'zoomIn': return { opacity: 0, scale: 0.65 };
      case 'zoomOut': return { opacity: 0, scale: 1.35 };
      case 'bounce':
      case 'bounceIn': return { opacity: 0, scale: 0.3 };
      case 'spinIn': return { opacity: 0, scale: 0.2, rotate: -360 };
      case 'flipInX': return { opacity: 0, rotateX: 90 };
      case 'flipInY': return { opacity: 0, rotateY: 90 };
      case 'blurIn': return { opacity: 0, filter: 'blur(12px)', scale: 0.9 };
      case 'elasticIn': return { opacity: 0, scale: 0 };
      case 'sway': return { opacity: 0, rotate: -15 };
      case 'float': return { opacity: 0, y: 20 };
      case 'pulse': return { opacity: 0, scale: 0.85 };
      case 'none':
      default: return { opacity: 1 };
    }
  };

  const getEntranceAnimate = (type?: AnimationType) => {
    switch (type) {
      case 'fadeIn': return { opacity: 1 };
      case 'fadeUp': return { opacity: 1, y: 0 };
      case 'fadeDown': return { opacity: 1, y: 0 };
      case 'fadeLeft': return { opacity: 1, x: 0 };
      case 'fadeRight': return { opacity: 1, x: 0 };
      case 'zoomIn': return { opacity: 1, scale: 1 };
      case 'zoomOut': return { opacity: 1, scale: 1 };
      case 'bounce':
      case 'bounceIn': return { opacity: 1, scale: [0.3, 1.1, 0.95, 1] };
      case 'spinIn': return { opacity: 1, scale: 1, rotate: 0 };
      case 'flipInX': return { opacity: 1, rotateX: 0 };
      case 'flipInY': return { opacity: 1, rotateY: 0 };
      case 'blurIn': return { opacity: 1, filter: 'blur(0px)', scale: 1 };
      case 'elasticIn': return { opacity: 1, scale: 1 };
      case 'sway': return { opacity: 1, rotate: 0 };
      case 'float': return { opacity: 1, y: 0 };
      case 'pulse': return { opacity: 1, scale: 1 };
      case 'none':
      default: return { opacity: 1 };
    }
  };

  const getEntranceEase = (type?: AnimationType) => {
    switch (type) {
      case 'spinIn': return [0.34, 1.4, 0.64, 1];
      case 'elasticIn': return [0.175, 0.885, 0.32, 1.275];
      case 'zoomIn': return [0.16, 1, 0.3, 1];
      default: return 'easeOut';
    }
  };

  const getLoopClass = (loopType?: LoopAnimationType) => {
    if (!loopType || loopType === 'none') return '';
    switch (loopType) {
      case 'driftHorizontal': return 'anim-loop-driftHorizontal';
      case 'driftVertical': return 'anim-loop-driftVertical';
      case 'driftDiagonal': return 'anim-loop-driftDiagonal';
      case 'flyAcross': return 'anim-loop-flyAcross';
      case 'orbit': return 'anim-loop-orbit';
      case 'wiggleMove': return 'anim-loop-wiggleMove';
      case 'spin': return 'anim-loop-spin';
      case 'spinReverse': return 'anim-loop-spinReverse';
      case 'float': return 'anim-loop-float';
      case 'sway': return 'anim-loop-sway';
      case 'pulse': return 'anim-loop-pulse';
      case 'glow': return 'anim-loop-glow';
      case 'bounce': return 'anim-loop-bounce';
      case 'wobble': return 'anim-loop-wobble';
      default: return '';
    }
  };

  // Page View Mode & Opening Screen State (Cover vs Content)
  const [canvasViewMode, setCanvasViewMode] = useState<'cover' | 'content' | 'all'>('cover');
  const [isInvitationOpened, setIsInvitationOpened] = useState<boolean>(false);
  const [showAddPageModal, setShowAddPageModal] = useState<boolean>(false);
  const [stagedPageTemplateId, setStagedPageTemplateId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Asset upload local storage & Cloudflare R2
  const [uploadedAssets, setUploadedAssets] = useState<
    Array<{ name: string; url: string; storage?: string; size?: number }>
  >([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [useSmartCompression, setUseSmartCompression] = useState<boolean>(true);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Two-Finger Pinch to Zoom State
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);
  const touchScrollTrackerRef = useRef<{
    startX: number;
    startY: number;
    isScrolling: boolean;
  }>({ startX: 0, startY: 0, isScrolling: false });
  const lastElementTapRef = useRef<{ id: string; time: number } | null>(null);
  const [stagedHintElementId, setStagedHintElementId] = useState<string | null>(null);
  const stagedHintTimeoutRef = useRef<any>(null);

  const handleCanvasTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = canvasZoom;
    } else if (e.touches.length === 1) {
      touchScrollTrackerRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        isScrolling: false,
      };
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDistRef.current;
      const nextZoom = Math.min(2.2, Math.max(0.6, touchStartZoomRef.current * factor));
      setCanvasZoom(Number(nextZoom.toFixed(2)));
    } else if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchScrollTrackerRef.current.startX;
      const dy = e.touches[0].clientY - touchScrollTrackerRef.current.startY;
      if (Math.hypot(dx, dy) > 8) {
        touchScrollTrackerRef.current.isScrolling = true;
      }
    }
  };

  const handleCanvasTouchEnd = () => {
    touchStartDistRef.current = null;
    // Keep isScrolling flag active for 180ms to swallow follow-up click events from touch scrolling
    setTimeout(() => {
      touchScrollTrackerRef.current.isScrolling = false;
    }, 180);
  };

  const [transformSession, setTransformSession] = useState<{
    mode: 'move' | 'resize' | 'rotate';
    handle?: 'tl' | 'tr' | 'bl' | 'br';
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    initialRotation: number;
    centerX: number;
    centerY: number;
  } | null>(null);

  const [dragUnlockedElementId, setDragUnlockedElementId] = useState<string | null>(null);
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);
  const dragThresholdMetRef = useRef<boolean>(false);

  // Load project on mount or when projectId changes
  useEffect(() => {
    if (projectId) {
      const p = getProjectById(projectId);
      setProject(p);
    }
    try {
      const savedAssets = localStorage.getItem('nikahhub_user_uploaded_assets');
      if (savedAssets) {
        setUploadedAssets(JSON.parse(savedAssets));
      }
    } catch {
      // ignore
    }
  }, [projectId]);

  // AUTO-SAVE: Otomatis menyimpan setiap perubahan pada proyek (Draft yang belum selesai)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSaveStatus('Menyimpan...');
    const saveTimer = setTimeout(() => {
      saveProject(project);
      setSaveStatus('Tersimpan otomatis');
      const clearTimer = setTimeout(() => setSaveStatus(null), 2500);
      return () => clearTimeout(clearTimer);
    }, 600);

    return () => clearTimeout(saveTimer);
  }, [project]);

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

  // Manual Save to LocalStorage / Project Storage
  const handleSave = () => {
    try {
      saveProject(project);
      setSaveStatus('Tersimpan otomatis!');
      setTimeout(() => setSaveStatus(null), 2500);
    } catch {
      setSaveStatus('Gagal menyimpan');
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

  // Direct Background Uploader for Active Section
  const handleUploadBackgroundDirect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let fileToUpload = file;
      if (useSmartCompression) {
        try {
          fileToUpload = await compressImage(file, { maxWidth: 1920, maxHeight: 1920, quality: 0.85 });
        } catch {}
      }

      const publicUrl = await uploadImageToSupabaseStorage(fileToUpload, 'wedding-asset');
      if (publicUrl && publicUrl.startsWith('http')) {
        updateCurrentSection({
          backgroundImage: publicUrl,
          backgroundOpacity: currentSection?.backgroundOpacity ?? 0.85,
        });
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            updateCurrentSection({
              backgroundImage: ev.target.result as string,
              backgroundOpacity: currentSection?.backgroundOpacity ?? 0.85,
            });
          }
        };
        reader.readAsDataURL(fileToUpload);
      }
    } catch (err) {
      console.error('Failed to upload background:', err);
    } finally {
      e.target.value = '';
    }
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

        // 1. Direct Cloud Upload via Supabase Storage
        const publicUrl = await uploadImageToSupabaseStorage(fileToUpload, 'wedding-asset');

        if (publicUrl && publicUrl.startsWith('http')) {
          const assetInfo = {
            name: rawFile.name,
            url: publicUrl,
            storage: 'cloud-storage',
            size: fileToUpload.size,
          };
          newUploaded.push(assetInfo);
        } else {
          // 2. Fallback to local Base64 URL
          const reader = new FileReader();
          await new Promise<void>((resolve) => {
            reader.onload = (ev) => {
              newUploaded.push({
                name: rawFile.name,
                url: ev.target?.result as string,
                storage: 'local-memory',
                size: fileToUpload.size,
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

  // Update active section (background, height, padding, animation, etc.)
  const updateCurrentSection = (partial: Partial<BuilderSection>) => {
    const targetSecId = selectedSectionId || project.sections[0]?.id;
    const updatedSections = project.sections.map((sec) => {
      if (sec.id === targetSecId) {
        return { ...sec, ...partial };
      }
      return sec;
    });
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
        type: elementData.type === 'flower' ? 'spinIn' : 'fadeUp',
        duration: 1.4,
        delay: 0.2,
        trigger: 'onScroll',
        loopType: elementData.type === 'flower' ? 'sway' : 'none',
        loopDuration: 6,
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

  // Mobile precision touch nudge & resize helpers
  const nudgeElement = (dx: number, dy: number) => {
    const el = getSelectedElement();
    if (!el) return;
    updateSelectedElement({
      x: (el.x || 0) + dx,
      y: (el.y || 0) + dy,
    });
  };

  const resizeElement = (dw: number, dh: number) => {
    const el = getSelectedElement();
    if (!el) return;
    const currentW = typeof el.width === 'number' ? el.width : 120;
    const currentH = typeof el.height === 'number' ? el.height : 40;
    updateSelectedElement({
      width: Math.max(20, currentW + dw),
      height: Math.max(20, currentH + dh),
    });
  };

  // Universal Pointer Handlers (Works on Mouse, Pen, and Touch)
  const startMove = (e: React.PointerEvent, el: CanvasElement, secId: string, forceUnlock = false) => {
    if (previewMode !== 'editor') return;

    const isTouch = e.pointerType === 'touch';
    // On touch screens, ONLY dragging via the dedicated move handle knob triggers movement!
    // Direct touches on the element body must pass through to allow natural scrolling without shifting!
    if (isTouch && !forceUnlock) {
      return;
    }

    // Only respond to primary click / touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Guard: elements must already be selected via double-tap before dragging
    if (!forceUnlock && selectedElementId !== el.id) {
      return;
    }

    e.stopPropagation();
    setSelectedElementId(el.id);
    setSelectedSectionId(secId);

    if (isTouch) {
      setDragUnlockedElementId(el.id);
      try {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30);
        }
      } catch {
        // ignore
      }
    }

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    dragThresholdMetRef.current = false;
    const targetEl = document.getElementById(`canvas-el-${el.id}`);
    const rect = targetEl ? targetEl.getBoundingClientRect() : (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTransformSession({
      mode: 'move',
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x || 0,
      initialY: el.y || 0,
      initialWidth: typeof el.width === 'number' ? el.width : rect.width,
      initialHeight: typeof el.height === 'number' ? el.height : rect.height,
      initialRotation: el.rotation || 0,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    });
  };

  const startResize = (e: React.PointerEvent, handle: 'tl' | 'tr' | 'bl' | 'br') => {
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const el = getSelectedElement();
    if (!el) return;

    const targetEl = document.getElementById(`canvas-el-${el.id}`);
    const rect = targetEl ? targetEl.getBoundingClientRect() : null;

    setTransformSession({
      mode: 'resize',
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x || 0,
      initialY: el.y || 0,
      initialWidth: typeof el.width === 'number' ? el.width : (rect?.width || 120),
      initialHeight: typeof el.height === 'number' ? el.height : (rect?.height || 60),
      initialRotation: el.rotation || 0,
      centerX: rect ? rect.left + rect.width / 2 : 0,
      centerY: rect ? rect.top + rect.height / 2 : 0,
    });
  };

  const startRotate = (e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const el = getSelectedElement();
    if (!el) return;

    const targetEl = document.getElementById(`canvas-el-${el.id}`);
    const rect = targetEl?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : e.clientX;
    const centerY = rect ? rect.top + rect.height / 2 : e.clientY;

    setTransformSession({
      mode: 'rotate',
      startX: e.clientX,
      startY: e.clientY,
      initialX: el.x || 0,
      initialY: el.y || 0,
      initialWidth: typeof el.width === 'number' ? el.width : 120,
      initialHeight: typeof el.height === 'number' ? el.height : 60,
      initialRotation: el.rotation || 0,
      centerX,
      centerY,
    });
  };

  // Quick Action Helpers
  const handleRotateElement = (degDelta: number) => {
    const el = getSelectedElement();
    if (!el) return;
    const nextRot = ((el.rotation || 0) + degDelta) % 360;
    updateSelectedElement({ rotation: nextRot < 0 ? nextRot + 360 : nextRot });
  };

  const handleFlipElement = (axis: 'x' | 'y') => {
    const el = getSelectedElement();
    if (!el) return;
    if (axis === 'x') {
      updateSelectedElement({ flipX: !el.flipX });
    } else {
      updateSelectedElement({ flipY: !el.flipY });
    }
  };

  const handleToggleCropFit = () => {
    const el = getSelectedElement();
    if (!el) return;
    const current = el.objectFit || 'contain';
    const next = current === 'contain' ? 'cover' : current === 'cover' ? 'fill' : 'contain';
    updateSelectedElement({ objectFit: next });
  };

  // Global window listeners for pointer move and up
  useEffect(() => {
    if (!transformSession) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - transformSession.startX;
      const dy = e.clientY - transformSession.startY;

      if (transformSession.mode === 'move') {
        // Enforce jitter threshold (6px) so tiny touch tremors don't move the element
        if (!dragThresholdMetRef.current && Math.hypot(dx, dy) < 6) {
          return;
        }
        const clampedX = Math.max(-180, Math.min(180, Math.round(transformSession.initialX + dx)));
        const clampedY = Math.max(-360, Math.min(360, Math.round(transformSession.initialY + dy)));
        updateSelectedElement({
          x: clampedX,
          y: clampedY,
        });
      } else if (transformSession.mode === 'resize') {
        const handle = transformSession.handle;
        let nextW = transformSession.initialWidth;
        let nextH = transformSession.initialHeight;

        if (handle === 'br') {
          nextW = Math.max(25, Math.round(transformSession.initialWidth + dx));
          nextH = Math.max(25, Math.round(transformSession.initialHeight + dy));
        } else if (handle === 'bl') {
          nextW = Math.max(25, Math.round(transformSession.initialWidth - dx));
          nextH = Math.max(25, Math.round(transformSession.initialHeight + dy));
        } else if (handle === 'tr') {
          nextW = Math.max(25, Math.round(transformSession.initialWidth + dx));
          nextH = Math.max(25, Math.round(transformSession.initialHeight - dy));
        } else if (handle === 'tl') {
          nextW = Math.max(25, Math.round(transformSession.initialWidth - dx));
          nextH = Math.max(25, Math.round(transformSession.initialHeight - dy));
        }

        updateSelectedElement({
          width: nextW,
          height: nextH,
        });
      } else if (transformSession.mode === 'rotate') {
        const currentAngle =
          Math.atan2(
            e.clientY - transformSession.centerY,
            e.clientX - transformSession.centerX
          ) *
          (180 / Math.PI);

        const startAngle =
          Math.atan2(
            transformSession.startY - transformSession.centerY,
            transformSession.startX - transformSession.centerX
          ) *
          (180 / Math.PI);

        const diff = currentAngle - startAngle;
        let nextRotation = Math.round((transformSession.initialRotation + diff) % 360);
        if (nextRotation < 0) nextRotation += 360;

        updateSelectedElement({ rotation: nextRotation });
      }
    };

    const handlePointerUp = () => {
      setTransformSession(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [transformSession]);

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

  // Open & Close Invitation Handlers (Opening Screen Transition)
  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    if (audioRef.current && project.backgroundMusic.enabled && project.backgroundMusic.url) {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const handleCloseInvitation = () => {
    setIsInvitationOpened(false);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  // Add new page from template
  const handleSelectPageTemplate = (template: PageTemplate) => {
    const newUid = `section-${Date.now()}`;
    const newSection = template.defaultSection(newUid);
    const updatedSections = [...project.sections, newSection];
    handleUpdateProject({ ...project, sections: updatedSections });
    setSelectedSectionId(newSection.id);
    if (newSection.elements.length > 0) {
      setSelectedElementId(newSection.elements[0].id);
    } else {
      setSelectedElementId(null);
    }
    setCanvasViewMode('content');
    setShowAddPageModal(false);
  };

  // Split Sections: Cover (Opening Screen) vs Content (Inner Pages)
  const coverSection =
    project.sections.find((s) => s.type === 'cover' || s.id === 'section-cover') || project.sections[0];
  const contentSections = project.sections.filter((s) => s.id !== coverSection?.id);

  const displayedSections =
    previewMode === 'live'
      ? !isInvitationOpened
        ? coverSection ? [coverSection] : []
        : contentSections
      : canvasViewMode === 'cover'
      ? coverSection ? [coverSection] : []
      : canvasViewMode === 'content'
      ? contentSections
      : project.sections.filter((s) => s.enabled);

  const selectedElement = getSelectedElement();
  const currentSection = project.sections.find((s) => s.id === selectedSectionId) || project.sections[0];
  const currentSectionElements = currentSection?.elements || [];
  const activePaletteObj = COLOR_PALETTES.find((p) => p.id === project.activePalette) || COLOR_PALETTES[0];

  return (
    <div className="flex flex-col w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] bg-[#141610] text-[#FAF9F5] overflow-hidden select-none overscroll-none">
      {/* 1. TOP HEADER APP BAR (RESPONSIVE) */}
      <header className="h-13 sm:h-14 bg-[#1E2218] border-b border-[#C2A676]/30 px-2 sm:px-4 flex items-center justify-between shrink-0 z-30">
        {/* Left: Branding & Project Title & Home Proyek */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {onBackToProjects && (
            <button
              onClick={onBackToProjects}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#51583D] to-[#3B412C] hover:brightness-110 text-[#E8D8BA] text-[11px] sm:text-xs font-bold flex items-center gap-1.5 border border-[#C2A676]/40 transition shrink-0 shadow"
              title="Kembali ke Daftar Proyek (Home Proyek)"
            >
              <FolderKanban className="w-3.5 h-3.5 text-[#C2A676]" />
              <span>Home Proyek</span>
            </button>
          )}

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A0A694] hover:text-[#FAF9F5] text-[11px] sm:text-xs font-semibold flex items-center gap-1 border border-white/5 transition shrink-0"
              title="Kembali ke Web Katalog Utama"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Katalog</span>
            </button>
          )}

          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

          <div>
            <h1 className="font-serif font-bold text-xs sm:text-sm text-[#FAF9F5] flex items-center gap-1.5">
              <span className="truncate max-w-[90px] sm:max-w-xs">{project.title}</span>
              {saveStatus ? (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-sans">
                  <Check className="w-2.5 h-2.5" />
                  <span>{saveStatus}</span>
                </span>
              ) : (
                <span className="hidden sm:inline-flex text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Tersimpan</span>
                </span>
              )}
            </h1>
            <p className="hidden md:block text-[10px] text-[#A0A694]">
              {project.groomName} & {project.brideName} • Auto-save aktif
            </p>
          </div>
        </div>

        {/* Center: Mode Toggles (Responsive on Mobile & Desktop) */}
        <div className="flex items-center bg-[#141610] p-0.5 sm:p-1 rounded-xl border border-[#C2A676]/30 shrink-0">
          <button
            onClick={() => setPreviewMode('editor')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all ${
              previewMode === 'editor'
                ? 'bg-[#51583D] text-[#FAF9F5] shadow'
                : 'text-[#A0A694] hover:text-[#FAF9F5]'
            }`}
          >
            <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setPreviewMode('live')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-all ${
              previewMode === 'live'
                ? 'bg-[#51583D] text-[#FAF9F5] shadow'
                : 'text-[#A0A694] hover:text-[#FAF9F5]'
            }`}
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C2A676]" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Actions (Undo, Redo, Save, Export, Import) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
            title="Undo"
          >
            <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
            title="Redo"
          >
            <Redo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-0.5 sm:mx-1" />

          {/* Save Status / Button */}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#51583D] hover:bg-[#65744F] text-[#FAF9F5] text-xs font-semibold border border-[#C2A676]/40 shadow transition"
          >
            <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8D8BA]" />
            <span className="hidden sm:inline">{saveStatus || 'Simpan'}</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 transition"
            title="Download Desain Undangan (JSON)"
          >
            <Download className="w-3.5 h-3.5 text-[#C2A676]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Import JSON */}
          <label
            className="inline-flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium border border-white/10 cursor-pointer transition"
            title="Upload Desain Undangan (JSON)"
          >
            <Upload className="w-3.5 h-3.5 text-[#C2A676]" />
            <span className="hidden sm:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (RESPONSIVE ON MOBILE & DESKTOP) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* === LEFT DOCK / TOOLBAR (TABS - DESKTOP ONLY) === */}
        <aside className="hidden lg:flex w-16 sm:w-20 bg-[#1A1D15] border-r border-[#C2A676]/20 flex flex-col items-center py-3 gap-2 shrink-0 z-20">
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

        {/* === LEFT DRAWER / EXPANDABLE PALETTE (DESKTOP ONLY) === */}
        <aside
          className="hidden lg:flex w-full lg:w-72 bg-[#171A12] border-r border-[#C2A676]/20 flex-col shrink-0 z-10 overflow-y-auto p-3 sm:p-4 pb-28 lg:pb-6 space-y-3 sm:space-y-4"
        >
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

          {/* TAB 5: ANIMATION STUDIO & PRESETS */}
          {activeTab === 'animation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#E8D8BA]">Studio Animasi & Gerakan</h3>
                  <p className="text-[10px] text-[#A0A694]">Atur efek masuk, putaran, dan partikel suasana</p>
                </div>
                <button
                  onClick={triggerPreviewAnimation}
                  className="px-2.5 py-1 rounded-lg bg-[#C2A676] text-[#1E2218] text-xs font-bold flex items-center gap-1 shadow hover:bg-[#D4BC8B] transition"
                  title="Putar ulang semua animasi di layar"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Uji Animasi</span>
                </button>
              </div>

              {/* Selected Element Quick Animation Presets */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#FAF9F5] flex items-center gap-1.5 truncate max-w-[170px]">
                    <Sparkles className="w-3 h-3 text-[#C2A676] shrink-0" />
                    {selectedElement ? `Elemen: ${selectedElement.name}` : 'Pilih Elemen di HP'}
                  </span>
                  {selectedElement && (
                    <span className="text-[10px] text-[#C2A676] font-mono">
                      Terpilih
                    </span>
                  )}
                </div>

                {selectedElement ? (
                  <>
                    <p className="text-[10px] text-[#A0A694]">Preset Gerakan 1-Klik untuk elemen ini:</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        {
                          label: '🌪️ Masuk Berputar',
                          desc: 'Spin in 360°',
                          config: { type: 'spinIn' as AnimationType, duration: 1.4, delay: 0.1, loopType: 'none' as LoopAnimationType },
                        },
                        {
                          label: '↔️ Geser Kiri-Kanan',
                          desc: 'Drift Horizontal',
                          config: { type: 'fadeUp' as AnimationType, duration: 1, delay: 0.1, loopType: 'driftHorizontal' as LoopAnimationType, loopDuration: 6, moveDistance: 35 },
                        },
                        {
                          label: '↕️ Melayang Naik-Turun',
                          desc: 'Drift Vertikal',
                          config: { type: 'fadeUp' as AnimationType, duration: 1, delay: 0.1, loopType: 'driftVertical' as LoopAnimationType, loopDuration: 5, moveDistance: 30 },
                        },
                        {
                          label: '🚀 Melintas Menyeberang',
                          desc: 'Fly Across Screen',
                          config: { type: 'fadeIn' as AnimationType, duration: 1, delay: 0.1, loopType: 'flyAcross' as LoopAnimationType, loopDuration: 8, moveDistance: 120 },
                        },
                        {
                          label: '💫 Orbit Melingkar',
                          desc: 'Orbit Circle Motion',
                          config: { type: 'zoomIn' as AnimationType, duration: 1, delay: 0.1, loopType: 'orbit' as LoopAnimationType, loopDuration: 7, moveDistance: 25 },
                        },
                        {
                          label: '🌸 Bunga Berputar',
                          desc: 'Spin 360° Loop',
                          config: { type: 'spinIn' as AnimationType, duration: 1.2, delay: 0.1, loopType: 'spin' as LoopAnimationType, loopDuration: 8 },
                        },
                        {
                          label: '🌿 Daun Tertiup Angin',
                          desc: 'Sway Anggun',
                          config: { type: 'fadeUp' as AnimationType, duration: 1.2, delay: 0.2, loopType: 'sway' as LoopAnimationType, loopDuration: 3.5 },
                        },
                        {
                          label: '🕊️ Melayang Santai',
                          desc: 'Smooth Float',
                          config: { type: 'fadeUp' as AnimationType, duration: 1.2, delay: 0.2, loopType: 'float' as LoopAnimationType, loopDuration: 4 },
                        },
                        {
                          label: '💖 Detak Jantung',
                          desc: 'Heartbeat Pulse',
                          config: { type: 'bounceIn' as AnimationType, duration: 1, delay: 0.1, loopType: 'pulse' as LoopAnimationType, loopDuration: 2 },
                        },
                        {
                          label: '✨ Kilauan Emas',
                          desc: 'Golden Shimmer',
                          config: { type: 'blurIn' as AnimationType, duration: 1.2, delay: 0.2, loopType: 'glow' as LoopAnimationType, loopDuration: 3 },
                        },
                        {
                          label: '🎈 Membal Lembut',
                          desc: 'Gentle Bounce',
                          config: { type: 'bounceIn' as AnimationType, duration: 1, delay: 0.1, loopType: 'bounce' as LoopAnimationType, loopDuration: 2.2 },
                        },
                        {
                          label: '🎭 Goyang Ceria',
                          desc: 'Wobble Motion',
                          config: { type: 'bounceIn' as AnimationType, duration: 1, delay: 0.1, loopType: 'wobble' as LoopAnimationType, loopDuration: 2.5 },
                        },
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            updateSelectedElement({
                              animation: {
                                ...selectedElement.animation,
                                ...preset.config,
                              },
                            });
                            triggerPreviewAnimation();
                          }}
                          className="p-2 rounded-lg bg-black/40 hover:bg-[#51583D]/50 border border-white/5 hover:border-[#C2A676] text-left transition"
                        >
                          <div className="text-[11px] font-semibold text-[#FAF9F5] leading-tight">{preset.label}</div>
                          <div className="text-[9px] text-[#A0A694] mt-0.5">{preset.desc}</div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[11px] text-[#A0A694] italic py-2 text-center">
                    Klik teks, ornamen, atau foto di HP untuk langsung menerapkan animasi gerak.
                  </p>
                )}
              </div>

              {/* Efek Partikel Suasana Global */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold text-[#E8D8BA]">Efek Partikel Suasana (Ambient)</h4>
                <p className="text-[10px] text-[#A0A694]">Efek partikel yang berhamburan di seluruh layar undangan:</p>
                <div className="space-y-1.5">
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
                      className={`w-full p-2 rounded-xl border text-left text-xs font-semibold transition ${
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
        <main
          className="flex-1 bg-[#0F110B] relative flex flex-col items-center justify-start overflow-y-auto p-1.5 sm:p-6 pb-28 lg:pb-8 w-full overscroll-contain"
        >
          {/* Global Ambient Particles on Canvas */}
          {project.ambientEffect === 'petals' && (
            <FloatingPetals count={20} type="petals" className="fixed inset-0 pointer-events-none z-10" />
          )}
          {project.ambientEffect === 'sparkles' && (
            <FloatingPetals count={25} type="sparkles" className="fixed inset-0 pointer-events-none z-10" />
          )}
          {(project.ambientEffect === 'butterflies' || project.ambientEffect === 'doves') && (
            <FloatingPetals count={18} type="leaves" className="fixed inset-0 pointer-events-none z-10" />
          )}

          {/* Background Audio Player */}
          {project.backgroundMusic.url && (
            <audio ref={audioRef} src={project.backgroundMusic.url} loop preload="auto" />
          )}

          {/* PAGE NAVIGATOR BAR & OPENING CONTROLS */}
          {previewMode === 'editor' ? (
            <div className="flex flex-col items-center gap-2 mb-3 w-full max-w-[420px]">
              {/* Main Page Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#1A1D15]/95 backdrop-blur-md rounded-2xl border border-[#C2A676]/30 shadow-xl w-full justify-between">
                <button
                  onClick={() => {
                    setCanvasViewMode('cover');
                    if (coverSection) setSelectedSectionId(coverSection.id);
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    canvasViewMode === 'cover'
                      ? 'bg-[#51583D] text-[#FAF9F5] shadow border border-[#C2A676]/50'
                      : 'text-[#A0A694] hover:text-[#FAF9F5] hover:bg-white/5'
                  }`}
                >
                  <span>💌 Sampul (Opening)</span>
                </button>
                <button
                  onClick={() => {
                    setCanvasViewMode('content');
                    if (selectedSectionId === coverSection?.id && contentSections.length > 0) {
                      setSelectedSectionId(contentSections[0].id);
                    }
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    canvasViewMode === 'content'
                      ? 'bg-[#51583D] text-[#FAF9F5] shadow border border-[#C2A676]/50'
                      : 'text-[#A0A694] hover:text-[#FAF9F5] hover:bg-white/5'
                  }`}
                >
                  <span>📜 Isi Undangan ({contentSections.length})</span>
                </button>
                <button
                  onClick={() => setCanvasViewMode('all')}
                  className={`py-1.5 px-2.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
                    canvasViewMode === 'all'
                      ? 'bg-[#51583D] text-[#FAF9F5] shadow'
                      : 'text-[#A0A694] hover:text-[#FAF9F5] hover:bg-white/5'
                  }`}
                  title="Lihat Semua Halaman Bersambung"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Semua</span>
                </button>
                <button
                  onClick={() => setShowAddPageModal(true)}
                  className="py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-[#C2A676] hover:bg-[#d8bd8d] text-[#1E2218] flex items-center gap-1 shadow transition shrink-0"
                  title="Tambah Halaman Baru"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Halaman</span>
                </button>
              </div>

              {/* Sub-Section Pills when viewing Content */}
              {canvasViewMode === 'content' && contentSections.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto w-full py-1 px-1">
                  {contentSections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setSelectedSectionId(sec.id);
                        const el = document.getElementById(`section-container-${sec.id}`);
                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-medium whitespace-nowrap transition ${
                        selectedSectionId === sec.id
                          ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                          : 'bg-white/5 text-[#E8D8BA] hover:bg-white/10'
                      }`}
                    >
                      {idx + 1}. {sec.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full max-w-[420px] p-2 bg-[#1A1D15]/90 backdrop-blur-md rounded-2xl border border-[#C2A676]/30 mb-3 text-xs shadow-xl">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${!isInvitationOpened ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-[#E8D8BA] font-semibold text-[11px]">
                  {!isInvitationOpened ? '💌 Layar Sampul (Klik Tombol Buka Undangan)' : '📜 Undangan Terbuka'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {isInvitationOpened && (
                  <button
                    onClick={handleCloseInvitation}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF9F5] text-[10px] font-medium transition"
                  >
                    🔄 Tutup Sampul
                  </button>
                )}
                {project.backgroundMusic.url && (
                  <button
                    onClick={toggleAudio}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition ${
                      isPlayingAudio
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-[#A0A694]'
                    }`}
                  >
                    {isPlayingAudio ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    <span>{isPlayingAudio ? 'Musik On' : 'Musik Off'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Smartphone Frame Simulation */}
          <div 
            onTouchStart={handleCanvasTouchStart}
            onTouchMove={handleCanvasTouchMove}
            onTouchEnd={handleCanvasTouchEnd}
            className="relative w-full max-w-[390px] sm:max-w-[420px] bg-[#FAF9F5] rounded-2xl sm:rounded-[44px] shadow-2xl sm:shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-[#2A2E22]/60 sm:border-[10px] sm:border-[#2A2E22] overflow-hidden my-2 sm:my-auto shrink-0 transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${canvasZoom})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Phone Speaker Notch (Desktop/Tablet) */}
            <div className="hidden sm:flex absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-[#1A1D15] z-50 items-center justify-center">
              <div className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Canvas Sections Container */}
            <div className="w-full min-h-[680px] sm:min-h-[750px] flex flex-col pt-4 sm:pt-6 pb-20">
              {displayedSections.map((sec) => {
                const isCoverFocus =
                  sec.id === coverSection?.id &&
                  (canvasViewMode === 'cover' || (previewMode === 'live' && !isInvitationOpened));

                return (
                  <div
                    key={sec.id}
                    id={`section-container-${sec.id}`}
                    onClick={() => {
                      if (touchScrollTrackerRef.current.isScrolling) return;
                      setSelectedSectionId(sec.id);
                      setSelectedElementId(null);
                      setDragUnlockedElementId(null);
                      setStagedHintElementId(null);
                    }}
                    className={`relative w-full overflow-hidden transition-all ${
                      selectedSectionId === sec.id && previewMode === 'editor'
                        ? 'ring-2 ring-[#C2A676] ring-inset'
                        : ''
                    } ${isCoverFocus ? 'min-h-[660px] sm:min-h-[720px] flex flex-col items-center justify-center' : ''}`}
                    style={{
                      backgroundColor: sec.backgroundColor,
                      minHeight: isCoverFocus ? '660px' : `${sec.minHeight}px`,
                      paddingTop: `${sec.paddingY}px`,
                      paddingBottom: `${sec.paddingY}px`,
                    }}
                  >
                    {/* Background Image / Texture Layer */}
                    {sec.backgroundImage && (
                      <div
                        className={`absolute inset-0 pointer-events-none bg-cover bg-center ${
                          sec.backgroundAnimation === 'zoomSlow'
                            ? 'anim-bg-zoomSlow'
                            : sec.backgroundAnimation === 'drift'
                            ? 'anim-bg-drift'
                            : sec.backgroundAnimation === 'pulse'
                            ? 'anim-bg-pulse'
                            : ''
                        }`}
                        style={{
                          backgroundImage: `url(${sec.backgroundImage})`,
                          opacity: sec.backgroundOpacity ?? 1,
                        }}
                      />
                    )}

                    {/* Background Overlay Color */}
                    {sec.backgroundOverlay && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: sec.backgroundOverlay,
                        }}
                      />
                    )}

                    {/* Section-specific Particles */}
                    {sec.backgroundAnimation === 'petals' && (
                      <FloatingPetals count={16} type="petals" className="absolute inset-0 pointer-events-none z-10" />
                    )}
                    {sec.backgroundAnimation === 'sparkles' && (
                      <FloatingPetals count={20} type="sparkles" className="absolute inset-0 pointer-events-none z-10" />
                    )}

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
                        const isUnlocked = isSelected && dragUnlockedElementId === el.id;
                        const isStagedHint = stagedHintElementId === el.id && !isSelected;

                        return (
                          <div
                            key={el.id}
                            id={`canvas-el-${el.id}`}
                            onPointerDown={(e) => {
                              // Direct mouse drag on desktop is ONLY allowed if the element is ALREADY SELECTED!
                              if (e.pointerType === 'mouse' && isSelected) {
                                startMove(e, el, sec.id);
                              }
                            }}
                            onClick={(e) => {
                              // If user was scrolling, ignore completely!
                              if (touchScrollTrackerRef.current.isScrolling) return;
                              e.stopPropagation();

                              if (previewMode !== 'editor') return;

                              // If element is ALREADY selected, keep it selected without disturbance
                              if (selectedElementId === el.id) {
                                return;
                              }

                              // Require DOUBLE TAP / DOUBLE CLICK to select any element!
                              const now = Date.now();
                              const last = lastElementTapRef.current;

                              // 1. MOBILE GHOST-TOUCH REJECTION:
                              // If an event arrives within 160ms of the previous tap on this element,
                              // it is physically impossible for a human finger to double-tap that fast.
                              // It is a duplicate synthetic event / ghost click generated by mobile browsers!
                              if (last && last.id === el.id && (now - last.time) < 160) {
                                return;
                              }

                              const isSameElement = last && last.id === el.id;
                              const isWithinWindow =
                                last &&
                                (now - last.time) >= 160 &&
                                (now - last.time) <= 650;

                              if (isSameElement && isWithinWindow) {
                                // === CONFIRMED DOUBLE TAP / DOUBLE CLICK ===
                                setSelectedElementId(el.id);
                                setSelectedSectionId(sec.id);
                                setDragUnlockedElementId(el.id);
                                setStagedHintElementId(null);
                                lastElementTapRef.current = null;
                                if (stagedHintTimeoutRef.current) {
                                  clearTimeout(stagedHintTimeoutRef.current);
                                }
                                try {
                                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                    navigator.vibrate(40);
                                  }
                                } catch {
                                  // ignore
                                }
                              } else {
                                // === FIRST TAP: SHOW HINT, DO NOT OPEN SETTINGS ===
                                lastElementTapRef.current = { id: el.id, time: now };
                                setStagedHintElementId(el.id);
                                if (stagedHintTimeoutRef.current) {
                                  clearTimeout(stagedHintTimeoutRef.current);
                                }
                                stagedHintTimeoutRef.current = setTimeout(() => {
                                  setStagedHintElementId((curr) => (curr === el.id ? null : curr));
                                  if (lastElementTapRef.current && lastElementTapRef.current.id === el.id) {
                                    lastElementTapRef.current = null;
                                  }
                                }, 650);
                              }
                            }}
                            className={`relative transition-none select-none ${
                              isSelected
                                ? 'ring-2 ring-[#C2A676] ring-offset-2 ring-offset-transparent z-30 shadow-2xl'
                                : isStagedHint
                                ? 'ring-2 ring-dashed ring-[#C2A676] z-20 shadow-lg animate-pulse'
                                : 'hover:ring-1 hover:ring-[#C2A676]/60'
                            }`}
                            style={{
                              transform: `translate(${el.x}px, ${el.y}px) rotate(${el.rotation}deg) scale(${el.scale})`,
                              width: typeof el.width === 'number' ? `${el.width}px` : el.width,
                              height: typeof el.height === 'number' ? `${el.height}px` : el.height,
                              zIndex: el.zIndex,
                              opacity: el.opacity,
                              touchAction: 'pan-y',
                            }}
                          >
                            {/* Staged Double-Tap Hint Badge (Ketuk 1x lagi untuk pengaturan) */}
                            {stagedHintElementId === el.id && !isSelected && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap animate-bounce">
                                <span className="px-2 py-0.5 rounded-full bg-[#C2A676] text-[#1E2218] text-[9px] font-bold shadow-2xl border border-[#1E2218] flex items-center gap-1">
                                  <span>👆 Ketuk 2x untuk Pengaturan</span>
                                </span>
                              </div>
                            )}

                            {/* Mobile Dedicated Drag Handle Knob (Hanya bergerak saat knob ini ditarik) */}
                            {isSelected && (
                              <div
                                className="lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 z-50 px-2 py-0.5 rounded-full bg-[#C2A676] text-[#1E2218] flex items-center gap-1 shadow-2xl border border-[#1E2218] touch-none cursor-grab active:cursor-grabbing active:scale-105"
                                onPointerDown={(e) => {
                                  e.stopPropagation();
                                  startMove(e, el, sec.id, true);
                                }}
                                title="Tahan dan geser tombol ini untuk memindahkan posisi elemen"
                              >
                                <Move className="w-3 h-3 stroke-[2.5]" />
                                <span className="text-[9px] font-bold">Geser</span>
                              </div>
                            )}

                            {/* Mobile Selected Indicator */}
                            {isSelected && (
                              <div className="lg:hidden absolute -top-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-full bg-black/85 text-[#E8D8BA] text-[9px] font-medium border border-[#C2A676]/60 shadow backdrop-blur-sm">
                                  {el.name}
                                </span>
                              </div>
                            )}

                            {/* Selected Action Floating Toolbar (Desktop Only, on Mobile it's docked in Canva bottom toolbar) */}
                            {isSelected && (
                              <>
                                <div
                                  className="hidden lg:flex absolute -top-14 left-1/2 -translate-x-1/2 z-50 bg-[#1E2218]/95 backdrop-blur-md px-2 py-1 rounded-xl border border-[#C2A676]/60 shadow-2xl items-center gap-1 text-white text-[10px]"
                                  onPointerDown={(e) => e.stopPropagation()}
                                >
                                  <span className="font-semibold max-w-[80px] truncate text-[#E8D8BA] mr-1">
                                    {el.name}
                                  </span>
                                  
                                  {/* Rotate +45 */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRotateElement(45);
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#51583D] text-[#E8D8BA] font-mono flex items-center gap-0.5"
                                    title="Putar +45°"
                                  >
                                    <RotateCw className="w-2.5 h-2.5" />
                                    <span>45°</span>
                                  </button>
                                  {/* Flip Horizontal */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFlipElement('x');
                                    }}
                                    className={`p-1 rounded ${el.flipX ? 'bg-[#C2A676] text-[#1E2218]' : 'bg-white/10 hover:bg-white/20 text-[#E8D8BA]'}`}
                                    title="Balik Horizontal (Mirror)"
                                  >
                                    <FlipHorizontal className="w-3 h-3" />
                                  </button>
                                  {/* Test Animation */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      triggerPreviewAnimation();
                                    }}
                                    className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#51583D] text-[#E8D8BA] flex items-center gap-0.5"
                                    title="Uji Animasi Elemen Ini"
                                  >
                                    <RefreshCw className="w-2.5 h-2.5" />
                                    <span>Anim</span>
                                  </button>
                                  {/* Crop / Fit Toggle (for images/decor) */}
                                  {(el.type === 'image' || el.type === 'flower' || el.type === 'ornament') && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleCropFit();
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#51583D] text-[#E8D8BA] flex items-center gap-1"
                                      title={`Crop/Fit: ${el.objectFit || 'contain'}`}
                                    >
                                      <Crop className="w-2.5 h-2.5" />
                                      <span className="capitalize">{el.objectFit || 'contain'}</span>
                                    </button>
                                  )}
                                  {/* Duplicate */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDuplicateElement(el);
                                    }}
                                    className="p-1 hover:bg-white/10 rounded text-[#E8D8BA]"
                                    title="Duplikat Elemen"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                  {/* Delete */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteElement(el.id);
                                    }}
                                    className="p-1 hover:bg-rose-500/30 text-rose-400 rounded"
                                    title="Hapus Elemen"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>

                                {/* Top Rotation Knob */}
                                <div
                                  className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 cursor-grab active:cursor-grabbing"
                                  onPointerDown={startRotate}
                                  title="Putar Elemen (Tarik Memutar)"
                                >
                                  <div className="w-5 h-5 rounded-full bg-[#1E2218] border-2 border-[#C2A676] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <RotateCw className="w-2.5 h-2.5 text-[#E8D8BA]" />
                                  </div>
                                  <div className="w-[1.5px] h-2 bg-[#C2A676]" />
                                </div>

                                {/* 4 Corner Resize Handles */}
                                <div
                                  className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#C2A676] rounded-full shadow cursor-nwse-resize z-40 hover:scale-125 transition-transform"
                                  onPointerDown={(e) => startResize(e, 'tl')}
                                  title="Tarik untuk mengubah ukuran (Kiri Atas)"
                                />
                                <div
                                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#C2A676] rounded-full shadow cursor-nesw-resize z-40 hover:scale-125 transition-transform"
                                  onPointerDown={(e) => startResize(e, 'tr')}
                                  title="Tarik untuk mengubah ukuran (Kanan Atas)"
                                />
                                <div
                                  className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#C2A676] rounded-full shadow cursor-nesw-resize z-40 hover:scale-125 transition-transform"
                                  onPointerDown={(e) => startResize(e, 'bl')}
                                  title="Tarik untuk mengubah ukuran (Kiri Bawah)"
                                />
                                <div
                                  className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#C2A676] rounded-full shadow cursor-nwse-resize z-40 hover:scale-125 transition-transform"
                                  onPointerDown={(e) => startResize(e, 'br')}
                                  title="Tarik untuk mengubah ukuran (Kanan Bawah)"
                                />

                                {/* Live Coordinate Badge for selected element */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none z-40 bg-black/85 border border-[#C2A676]/40 text-[#E8D8BA] text-[9px] font-mono px-1.5 py-0.2 rounded shadow-md whitespace-nowrap">
                                  X: {el.x} | Y: {el.y}
                                </div>
                              </>
                            )}

                            {/* ANIMATED ELEMENT WRAPPER (Entrance Motion + Continuous Loop) */}
                            <motion.div
                              key={`${el.id}-${animPreviewKey}`}
                              initial={getEntranceInitial(el.animation?.type)}
                              animate={getEntranceAnimate(el.animation?.type)}
                              whileInView={
                                previewMode === 'live' && el.animation?.trigger === 'onScroll'
                                  ? getEntranceAnimate(el.animation?.type)
                                  : undefined
                              }
                              viewport={
                                previewMode === 'live' && el.animation?.trigger === 'onScroll'
                                  ? { once: true, amount: 0.3 }
                                  : undefined
                              }
                              transition={{
                                duration: el.animation?.duration ?? 1.2,
                                delay: previewMode === 'live' ? (el.animation?.delay ?? 0.1) : 0.05,
                                ease: getEntranceEase(el.animation?.type) as any,
                              }}
                              className={`w-full h-full ${getLoopClass(el.animation?.loopType)}`}
                              style={{
                                '--loop-duration': `${el.animation?.loopDuration || 8}s`,
                                '--move-dist': `${el.animation?.moveDistance || 30}px`,
                              } as React.CSSProperties}
                            >
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
                                  className="w-full h-full flex items-center justify-center p-1 whitespace-pre-line pointer-events-none select-none"
                                >
                                  {el.content}
                                </div>
                              )}

                              {/* IMAGE / FLOWER / ORNAMENT ELEMENT */}
                              {(el.type === 'image' || el.type === 'flower' || el.type === 'ornament' || el.type === 'bismillah') && (
                                <div
                                  className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
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
                                    draggable={false}
                                    style={{
                                      objectFit: el.objectFit || 'contain',
                                      transform: `scaleX(${el.flipX ? -1 : 1}) scaleY(${el.flipY ? -1 : 1})`,
                                    }}
                                    className="w-full h-full pointer-events-none select-none"
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
                                  className="w-full h-full flex items-center justify-center p-3 whitespace-pre-line shadow-sm pointer-events-none select-none"
                                >
                                  {el.content}
                                </div>
                              )}

                              {/* BUTTON ELEMENT */}
                              {el.type === 'button' && (
                                <button
                                  onClick={(e) => {
                                    if (previewMode === 'live') {
                                      e.stopPropagation();
                                      if (
                                        el.name.toLowerCase().includes('buka') ||
                                        el.content.toLowerCase().includes('buka')
                                      ) {
                                        handleOpenInvitation();
                                      }
                                    }
                                  }}
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
                                  className={`w-full h-full flex items-center justify-center shadow-lg transition-transform ${
                                    previewMode === 'live'
                                      ? 'pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 shadow-2xl animate-pulse'
                                      : 'pointer-events-none select-none'
                                  }`}
                                >
                                  {el.content}
                                </button>
                              )}
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MODAL TAMBAH HALAMAN BARU (SEPEREMPAT LAYAR MAKSIMAL, TANPA BLACK SCREEN DI MOBILE) */}
          <AnimatePresence>
            {showAddPageModal && (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none sm:bg-black/80 sm:backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  className="pointer-events-auto w-full max-w-lg bg-[#181B13] border-t sm:border border-[#C2A676]/40 rounded-t-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[140px] sm:max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="py-1 px-3 sm:p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#141610]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-lg bg-[#51583D] flex items-center justify-center text-[10px] sm:text-base shadow">
                        📄
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-xs sm:text-base text-[#FAF9F5]">
                          Tambah Halaman (Ketuk 2x)
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowAddPageModal(false);
                        setStagedPageTemplateId(null);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                      title="Tutup"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Template List (Gulir Sendiri di Seperempat Layar) */}
                  <div className="p-2 sm:p-4 overflow-y-auto space-y-1.5 flex-1 max-h-[95px] sm:max-h-none">
                    {PAGE_TEMPLATES.map((tmpl) => {
                      const isStaged = stagedPageTemplateId === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => {
                            if (isStaged) {
                              handleSelectPageTemplate(tmpl);
                              setStagedPageTemplateId(null);
                            } else {
                              setStagedPageTemplateId(tmpl.id);
                            }
                          }}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                            isStaged
                              ? 'bg-[#C2A676]/25 border-[#C2A676] ring-1 ring-[#C2A676]'
                              : 'bg-white/5 hover:bg-white/10 border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl p-1 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
                              {tmpl.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-semibold text-xs text-[#FAF9F5] group-hover:text-[#E8D8BA]">
                                  {tmpl.name}
                                </h4>
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-[#C2A676] font-mono">
                                  {tmpl.category}
                                </span>
                              </div>
                              <p className="text-[10px] text-[#A0A694] line-clamp-1">{tmpl.description}</p>
                            </div>
                          </div>
                          <button
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                              isStaged
                                ? 'bg-[#C2A676] text-[#1E2218] animate-pulse'
                                : 'bg-[#51583D] text-[#FAF9F5]'
                            }`}
                          >
                            <span>{isStaged ? '✓ Ketuk Lagi' : 'Pilih'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* FLOATING ACTION DOCK: REPLACED BY CANVA MOBILE DOCK AT THE BOTTOM */}
        </main>

        {/* === RIGHT PROPERTY INSPECTOR (DESKTOP ONLY) === */}
        <aside
          className="hidden lg:flex w-full lg:w-80 bg-[#171A12] border-l border-[#C2A676]/20 flex-col shrink-0 z-20 overflow-y-auto p-4 pb-28 lg:pb-8 space-y-4"
        >
          

          {selectedElement ? (() => {
            const isImageOrDecor = ['image', 'flower', 'ornament', 'bismillah', 'seal'].includes(selectedElement.type);
            const isText = ['text', 'countdown'].includes(selectedElement.type);
            const isButton = selectedElement.type === 'button';
            const isShape = ['shape', 'divider'].includes(selectedElement.type);

            return (
              <div className="space-y-4">
                {/* 1. Contextual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#51583D]/40 border border-[#C2A676]/40 flex items-center justify-center shrink-0">
                      {selectedElement.type === 'flower' ? (
                        <Flower2 className="w-4 h-4 text-rose-300" />
                      ) : isImageOrDecor ? (
                        <Sparkles className="w-4 h-4 text-[#C2A676]" />
                      ) : isButton ? (
                        <Play className="w-4 h-4 text-amber-300" />
                      ) : isShape ? (
                        <Square className="w-4 h-4 text-[#C2A676]" />
                      ) : (
                        <Type className="w-4 h-4 text-emerald-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#FAF9F5] truncate">
                        {selectedElement.type === 'flower'
                          ? '🌸 Pengaturan Bunga'
                          : selectedElement.type === 'ornament'
                          ? '✨ Pengaturan Ornamen'
                          : selectedElement.type === 'bismillah'
                          ? '📜 Kaligrafi Bismillah'
                          : selectedElement.type === 'seal'
                          ? '🏷️ Wax Seal / Segel'
                          : selectedElement.type === 'image'
                          ? '🖼️ Pengaturan Gambar'
                          : isButton
                          ? '🔘 Pengaturan Tombol'
                          : isShape
                          ? '📐 Garis & Bentuk'
                          : '✍️ Pengaturan Teks'}
                      </h3>
                      <p className="text-[10px] text-[#A0A694] truncate">
                        {selectedElement.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedElementId(null)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[10px] text-[#E8D8BA] border border-white/10 transition shrink-0"
                    title="Tutup pengaturan elemen"
                  >
                    Tutup ✕
                  </button>
                </div>

                {/* === A. PENGATURAN KHUSUS: BUNGA, HIASAN & GAMBAR === */}
                {isImageOrDecor && (
                  <div className="space-y-4">
                    {/* Nama Elemen */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">
                        Nama {selectedElement.type === 'flower' ? 'Bunga / Hiasan' : 'Gambar'}
                      </label>
                      <input
                        type="text"
                        value={selectedElement.name}
                        onChange={(e) => updateSelectedElement({ name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                      />
                    </div>

                    {/* Pratinjau Thumbnail Visual Bunga */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-[#2A2E22] border border-[#C2A676]/30 flex items-center justify-center overflow-hidden shrink-0 p-1">
                        <img
                          src={selectedElement.content}
                          alt={selectedElement.name}
                          className="max-w-full max-h-full object-contain pointer-events-none"
                        />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="text-[10px] text-[#A0A694]">Sumber Asset:</div>
                        <input
                          type="text"
                          value={selectedElement.content}
                          onChange={(e) => updateSelectedElement({ content: e.target.value })}
                          placeholder="https://... atau /assets/..."
                          className="w-full px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-[#E8D8BA] truncate focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Transparansi / Opasitas */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-[#A0A694]">Transparansi / Opasitas</span>
                        <span className="font-mono text-[#E8D8BA]">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={selectedElement.opacity ?? 1}
                        onChange={(e) => updateSelectedElement({ opacity: Number(e.target.value) })}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>

                    {/* Format Gambar & Skala */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] text-[#A0A694] font-medium">Format Tampilan</label>
                        <span className="text-[9px] text-[#C2A676] capitalize">{selectedElement.objectFit || 'contain'}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {(['contain', 'cover', 'fill'] as const).map((fitMode) => (
                          <button
                            key={fitMode}
                            onClick={() => updateSelectedElement({ objectFit: fitMode })}
                            className={`px-1.5 py-1 rounded border text-[10px] capitalize transition ${
                              (selectedElement.objectFit || 'contain') === fitMode
                                ? 'bg-[#C2A676] text-[#1E2218] border-[#C2A676] font-bold shadow'
                                : 'bg-white/5 border-white/10 text-[#E8D8BA] hover:bg-white/10'
                            }`}
                          >
                            {fitMode === 'contain' ? 'Utuh' : fitMode === 'cover' ? 'Crop' : 'Regang'}
                          </button>
                        ))}
                      </div>

                      {/* Skala Cepat */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-[#A0A694]">Perbesar / Skala</span>
                          <span className="font-mono text-[#E8D8BA]">{(selectedElement.scale || 1).toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.3"
                          max="2.5"
                          step="0.05"
                          value={selectedElement.scale || 1}
                          onChange={(e) => updateSelectedElement({ scale: Number(e.target.value) })}
                          className="w-full accent-[#C2A676]"
                        />
                      </div>

                      {/* Lebar & Tinggi */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
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
                            value={Number(selectedElement.height) || 100}
                            onChange={(e) => updateSelectedElement({ height: Number(e.target.value) })}
                            className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Putar & Balik Arah (Mirror) */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] text-[#A0A694]">Rotasi Sudut ({selectedElement.rotation || 0}°)</label>
                        <div className="flex items-center gap-1">
                          {[0, 90, 180, 270].map((deg) => (
                            <button
                              key={deg}
                              onClick={() => updateSelectedElement({ rotation: deg })}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                                (selectedElement.rotation || 0) === deg
                                  ? 'bg-[#C2A676] text-[#1E2218] font-bold'
                                  : 'bg-white/10 text-[#E8D8BA] hover:bg-white/20'
                              }`}
                            >
                              {deg}°
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedElement.rotation || 0}
                        onChange={(e) => updateSelectedElement({ rotation: Number(e.target.value) })}
                        className="w-full accent-[#C2A676]"
                      />

                      <div>
                        <label className="block text-[10px] text-[#A0A694] mb-1">Mirror (Balik Arah Hadap)</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateSelectedElement({ flipX: !selectedElement.flipX })}
                            className={`px-2 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition ${
                              selectedElement.flipX
                                ? 'bg-[#C2A676] text-[#1E2218] border-[#C2A676] font-semibold shadow'
                                : 'bg-white/5 border-white/10 text-[#E8D8BA] hover:bg-white/10'
                            }`}
                          >
                            <FlipHorizontal className="w-3.5 h-3.5" />
                            <span>Balik Kiri-Kanan</span>
                          </button>
                          <button
                            onClick={() => updateSelectedElement({ flipY: !selectedElement.flipY })}
                            className={`px-2 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition ${
                              selectedElement.flipY
                                ? 'bg-[#C2A676] text-[#1E2218] border-[#C2A676] font-semibold shadow'
                                : 'bg-white/5 border-white/10 text-[#E8D8BA] hover:bg-white/10'
                            }`}
                          >
                            <FlipVertical className="w-3.5 h-3.5" />
                            <span>Balik Atas-Bawah</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === B. PENGATURAN KHUSUS: TEKS & TULISAN === */}
                {isText && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Nama Label Teks</label>
                      <input
                        type="text"
                        value={selectedElement.name}
                        onChange={(e) => updateSelectedElement({ name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Isi Kalimat / Teks</label>
                      <textarea
                        rows={3}
                        value={selectedElement.content}
                        onChange={(e) => updateSelectedElement({ content: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676] resize-none"
                      />
                    </div>

                    {/* Tipografi */}
                    <div className="pt-2 border-t border-white/10 space-y-3">
                      <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Tipografi & Huruf</h4>

                      <div>
                        <label className="block text-[10px] text-[#A0A694] mb-1">Jenis Font</label>
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

                      {/* Perataan Teks */}
                      <div>
                        <label className="block text-[10px] text-[#A0A694] mb-1">Perataan Teks</label>
                        <div className="grid grid-cols-3 gap-1">
                          {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                              key={align}
                              onClick={() => updateSelectedElement({ textAlign: align })}
                              className={`py-1 rounded text-[10px] capitalize transition ${
                                selectedElement.textAlign === align
                                  ? 'bg-[#C2A676] text-[#1E2218] font-bold'
                                  : 'bg-white/5 border border-white/10 text-[#A0A694] hover:bg-white/10'
                              }`}
                            >
                              {align === 'left' ? 'Kiri' : align === 'center' ? 'Tengah' : 'Kanan'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === C. PENGATURAN KHUSUS: TOMBOL UNDANGAN === */}
                {isButton && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Teks Tombol</label>
                      <input
                        type="text"
                        value={selectedElement.content}
                        onChange={(e) => updateSelectedElement({ content: e.target.value, name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                      />
                    </div>

                    <div className="p-3 rounded-2xl bg-[#51583D]/30 border border-[#C2A676]/40 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#E8D8BA]">Aksi Tombol</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C2A676] text-[#1E2218] font-bold">
                          Buka Undangan
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A0A694]">
                        Tombol ini membuka layar sampul (opening), memutar musik latar, dan menampilkan seluruh isi undangan pengantin.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            setCanvasViewMode('content');
                            if (contentSections.length > 0) setSelectedSectionId(contentSections[0].id);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-[#C2A676] hover:bg-[#d8bd8d] text-[#1E2218] text-xs font-bold flex items-center justify-center gap-1.5 shadow transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Buka Isi Undangan ➔</span>
                        </button>
                        <button
                          onClick={() => {
                            setPreviewMode('live');
                            setIsInvitationOpened(false);
                          }}
                          className="py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF9F5] text-xs font-semibold flex items-center gap-1 transition"
                          title="Uji Coba di Live Preview"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#C2A676]" />
                          <span>Uji Live</span>
                        </button>
                      </div>
                    </div>

                    {/* Warna & Gaya Tombol */}
                    <div className="pt-2 border-t border-white/10 space-y-3">
                      <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider">Desain Tombol</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#A0A694]">Warna Tombol</span>
                        <input
                          type="color"
                          value={selectedElement.backgroundColor.startsWith('#') ? selectedElement.backgroundColor : '#C2A676'}
                          onChange={(e) => updateSelectedElement({ backgroundColor: e.target.value })}
                          className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#A0A694]">Warna Teks</span>
                        <input
                          type="color"
                          value={selectedElement.textColor.startsWith('#') ? selectedElement.textColor : '#1E2218'}
                          onChange={(e) => updateSelectedElement({ textColor: e.target.value })}
                          className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#A0A694] mb-1">
                          Kelengkungan Sudut ({selectedElement.borderRadius}px)
                        </label>
                        <div className="grid grid-cols-3 gap-1 mb-1.5">
                          {[
                            { label: 'Kotak', rad: 4 },
                            { label: 'Rounded', rad: 12 },
                            { label: 'Kapsul', rad: 99 },
                          ].map((r) => (
                            <button
                              key={r.rad}
                              onClick={() => updateSelectedElement({ borderRadius: r.rad })}
                              className={`py-1 rounded text-[10px] ${
                                selectedElement.borderRadius === r.rad
                                  ? 'bg-[#C2A676] text-[#1E2218] font-bold'
                                  : 'bg-white/5 border border-white/10 text-[#A0A694]'
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="99"
                          value={selectedElement.borderRadius}
                          onChange={(e) => updateSelectedElement({ borderRadius: Number(e.target.value) })}
                          className="w-full accent-[#C2A676]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* === D. PENGATURAN KHUSUS: BENTUK & KOTAK / SHAPE === */}
                {isShape && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#E8D8BA] mb-1">Nama Bentuk</label>
                      <input
                        type="text"
                        value={selectedElement.name}
                        onChange={(e) => updateSelectedElement({ name: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#A0A694]">Warna Latar</span>
                      <input
                        type="color"
                        value={selectedElement.backgroundColor.startsWith('#') ? selectedElement.backgroundColor : '#ffffff'}
                        onChange={(e) => updateSelectedElement({ backgroundColor: e.target.value })}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#A0A694]">Warna Garis</span>
                      <input
                        type="color"
                        value={selectedElement.borderColor.startsWith('#') ? selectedElement.borderColor : '#C2A676'}
                        onChange={(e) => updateSelectedElement({ borderColor: e.target.value })}
                        className="w-7 h-7 rounded border-none cursor-pointer bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#A0A694] mb-1">Radius Sudut ({selectedElement.borderRadius}px)</label>
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
                )}

                {/* === E. POSISI, GESER & UKURAN (BERLAKU UNTUK SEMUA ELEMEN) === */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider flex items-center gap-1.5">
                      <Move className="w-3.5 h-3.5 text-[#C2A676]" />
                      <span>Posisi, Geser & Ukuran</span>
                    </h4>
                    {/* Quick Center Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateSelectedElement({ x: 0 })}
                        className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#C2A676] hover:text-[#1E2218] text-[9px] text-[#E8D8BA] transition"
                        title="Ratakan di tengah horizontal (X = 0)"
                      >
                        Tengah X
                      </button>
                      <button
                        onClick={() => updateSelectedElement({ y: 0 })}
                        className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-[#C2A676] hover:text-[#1E2218] text-[9px] text-[#E8D8BA] transition"
                        title="Ratakan di tengah vertikal (Y = 0)"
                      >
                        Tengah Y
                      </button>
                    </div>
                  </div>

                  {/* D-Pad Nudge & Layer Control Panel */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#A0A694]">Kontrol Geser Presisi (Nudge)</span>
                      <span className="font-mono text-[#C2A676] font-semibold">
                        X: {selectedElement.x}px | Y: {selectedElement.y}px
                      </span>
                    </div>

                    {/* D-Pad Layout */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button
                        onClick={() => updateSelectedElement({ y: (selectedElement.y || 0) - 5 })}
                        className="w-16 py-1 rounded bg-[#2A2E22] hover:bg-[#51583D] active:scale-95 text-[#E8D8BA] text-xs flex items-center justify-center gap-1 border border-white/10 shadow transition"
                        title="Geser Naik 5px"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono">-5</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateSelectedElement({ x: (selectedElement.x || 0) - 5 })}
                          className="w-16 py-1 rounded bg-[#2A2E22] hover:bg-[#51583D] active:scale-95 text-[#E8D8BA] text-xs flex items-center justify-center gap-1 border border-white/10 shadow transition"
                          title="Geser Kiri 5px"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-mono">-5</span>
                        </button>
                        <div className="w-14 py-1 text-center font-mono text-[10px] text-[#C2A676] bg-black/50 rounded border border-white/5 select-none">
                          0,0
                        </div>
                        <button
                          onClick={() => updateSelectedElement({ x: (selectedElement.x || 0) + 5 })}
                          className="w-16 py-1 rounded bg-[#2A2E22] hover:bg-[#51583D] active:scale-95 text-[#E8D8BA] text-xs flex items-center justify-center gap-1 border border-white/10 shadow transition"
                          title="Geser Kanan 5px"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-mono">+5</span>
                        </button>
                      </div>
                      <button
                        onClick={() => updateSelectedElement({ y: (selectedElement.y || 0) + 5 })}
                        className="w-16 py-1 rounded bg-[#2A2E22] hover:bg-[#51583D] active:scale-95 text-[#E8D8BA] text-xs flex items-center justify-center gap-1 border border-white/10 shadow transition"
                        title="Geser Turun 5px"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono">+5</span>
                      </button>
                    </div>

                    {/* Layer Z-Index Order Buttons */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-[#A0A694]">Urutan Lapisan (Layer Z)</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateSelectedElement({ zIndex: Math.max(1, (selectedElement.zIndex || 10) - 1) })}
                          className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[#E8D8BA] text-[9px] border border-white/10"
                          title="Pindah ke lapisan belakang"
                        >
                          Mundur (-1)
                        </button>
                        <span className="font-mono text-[9px] text-[#C2A676] px-1">{selectedElement.zIndex || 10}</span>
                        <button
                          onClick={() => updateSelectedElement({ zIndex: (selectedElement.zIndex || 10) + 1 })}
                          className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[#E8D8BA] text-[9px] border border-white/10"
                          title="Pindah ke lapisan depan"
                        >
                          Maju (+1)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Coordinate Number Inputs & Sliders */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-[#A0A694] mb-1">
                        <span>Posisi X</span>
                        <span className="font-mono text-[#E8D8BA]">{selectedElement.x}px</span>
                      </div>
                      <input
                        type="number"
                        value={selectedElement.x}
                        onChange={(e) => updateSelectedElement({ x: Number(e.target.value) })}
                        className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs mb-1"
                      />
                      <input
                        type="range"
                        min="-250"
                        max="250"
                        value={selectedElement.x}
                        onChange={(e) => updateSelectedElement({ x: Number(e.target.value) })}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-[#A0A694] mb-1">
                        <span>Posisi Y</span>
                        <span className="font-mono text-[#E8D8BA]">{selectedElement.y}px</span>
                      </div>
                      <input
                        type="number"
                        value={selectedElement.y}
                        onChange={(e) => updateSelectedElement({ y: Number(e.target.value) })}
                        className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-xs mb-1"
                      />
                      <input
                        type="range"
                        min="-400"
                        max="400"
                        value={selectedElement.y}
                        onChange={(e) => updateSelectedElement({ y: Number(e.target.value) })}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>
                  </div>
                </div>

                {/* === F. ANIMASI & GERAKAN ELEMEN === */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C2A676]" />
                      <span>Animasi & Gerakan</span>
                    </h4>
                    <button
                      onClick={triggerPreviewAnimation}
                      className="px-2 py-0.5 rounded bg-[#C2A676] text-[#1E2218] text-[10px] font-bold flex items-center gap-1 shadow hover:bg-[#D4BC8B] transition"
                      title="Uji animasi elemen ini sekarang"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Uji Animasi</span>
                    </button>
                  </div>

                  {/* Animasi Masuk (Entrance) */}
                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1 font-medium">Animasi Masuk (Entrance)</label>
                    <select
                      value={selectedElement.animation.type}
                      onChange={(e) => {
                        updateSelectedElement({
                          animation: {
                            ...selectedElement.animation,
                            type: e.target.value as AnimationType,
                          },
                        });
                        triggerPreviewAnimation();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                    >
                      <option value="none">🚫 Tanpa Animasi</option>
                      <optgroup label="Geser & Memudar (Slide & Fade)">
                        <option value="fadeUp">⬆️ Fade Up (Meluncur Naik dari Bawah)</option>
                        <option value="fadeDown">⬇️ Fade Down (Meluncur Turun dari Atas)</option>
                        <option value="fadeIn">✨ Fade In (Memudar Lembut)</option>
                        <option value="fadeLeft">⬅️ Fade Left (Meluncur dari Kiri)</option>
                        <option value="fadeRight">➡️ Fade Right (Meluncur dari Kanan)</option>
                      </optgroup>
                      <optgroup label="Pop & Skala (Scale & Bounce)">
                        <option value="zoomIn">🔍 Zoom In (Membesar Lembut)</option>
                        <option value="zoomOut">🔎 Zoom Out (Menciut Halus)</option>
                        <option value="bounceIn">🎈 Bounce In (Membal Cantik)</option>
                        <option value="elasticIn">⚡ Elastic Spring (Membal Elastis)</option>
                      </optgroup>
                      <optgroup label="Putaran & 3D (Spins & Flips)">
                        <option value="spinIn">🌪️ Spin In (Masuk Sambil Berputar 360°)</option>
                        <option value="flipInX">🔄 3D Flip Horizontal</option>
                        <option value="flipInY">🔃 3D Flip Vertikal</option>
                      </optgroup>
                      <optgroup label="Sinematik & Estetis">
                        <option value="blurIn">🌫️ Blur to Clear (Fokus Sinematik)</option>
                        <option value="sway">🌿 Sway (Masuk Bergoyang)</option>
                        <option value="float">🕊️ Float (Masuk Melayang)</option>
                        <option value="pulse">💖 Pulse (Masuk Berdenyut)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Gerakan Loop Berkelanjutan */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] text-[#A0A694] font-medium">Gerakan Otomatis (Looping)</label>
                      <span className="text-[9px] text-[#C2A676]">Bergerak terus-menerus</span>
                    </div>
                    <select
                      value={selectedElement.animation.loopType || 'none'}
                      onChange={(e) => {
                        updateSelectedElement({
                          animation: {
                            ...selectedElement.animation,
                            loopType: e.target.value as LoopAnimationType,
                            loopDuration: selectedElement.animation.loopDuration || 8,
                          },
                        });
                        triggerPreviewAnimation();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                    >
                      <option value="none">🚫 Diam / Statis (Tanpa Loop)</option>
                      <optgroup label="Gerakan Berpindah / Meluncur (Motion Path)">
                        <option value="driftHorizontal">↔️ Geser Kiri-Kanan Mondar-Mandir (Horizontal Drift)</option>
                        <option value="driftVertical">↕️ Melayang Naik-Turun (Vertical Drift)</option>
                        <option value="driftDiagonal">↗️ Melayang Diagonal (Diagonal Drift)</option>
                        <option value="flyAcross">🚀 Melintas Menyeberangi Layar (Fly Across)</option>
                        <option value="orbit">💫 Bergerak Mengitari Orbit Melingkar (Circle Orbit)</option>
                        <option value="wiggleMove">〰️ Gerakan Mengombak Santai (Wave Move)</option>
                      </optgroup>
                      <optgroup label="Gerakan Berputar, Goyang & Efek (Rotations & FX)">
                        <option value="sway">🌿 Bergoyang Anggun (Bunga/Daun Tertiup Angin)</option>
                        <option value="spin">🌪️ Berputar 360° Terus-Menerus (Searah Jarum Jam)</option>
                        <option value="spinReverse">🔄 Berputar 360° Terus-Menerus (Berlawanan Jarum Jam)</option>
                        <option value="float">🕊️ Melayang Naik-Turun Halus (Floating)</option>
                        <option value="pulse">💖 Berdenyut Detak Jantung (Heartbeat Pulse)</option>
                        <option value="glow">✨ Kilauan Emas Berpendar (Golden Shimmer Glow)</option>
                        <option value="bounce">🎈 Membal Lembut Naik-Turun</option>
                        <option value="wobble">🎭 Goyang Goyang Ceria (Wobble)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Pengaturan Kecepatan & Jarak Gerak */}
                  {(selectedElement.animation.loopType && selectedElement.animation.loopType !== 'none') && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#A0A694]">Kecepatan Putaran / Siklus</span>
                          <span className="font-mono text-[#E8D8BA]">
                            {selectedElement.animation.loopDuration || 8}s / siklus
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { label: 'Sangat Lambat', sec: 16 },
                            { label: 'Lambat', sec: 10 },
                            { label: 'Sedang', sec: 6 },
                            { label: 'Cepat', sec: 3 },
                          ].map((spd) => (
                            <button
                              key={spd.sec}
                              onClick={() => {
                                updateSelectedElement({
                                  animation: {
                                    ...selectedElement.animation,
                                    loopDuration: spd.sec,
                                  },
                                });
                              }}
                              className={`py-1 rounded text-[9px] font-medium transition ${
                                (selectedElement.animation.loopDuration || 8) === spd.sec
                                  ? 'bg-[#C2A676] text-[#1E2218] font-bold'
                                  : 'bg-black/30 text-[#A0A694] hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {spd.label}
                            </button>
                          ))}
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="20.0"
                          step="0.5"
                          value={selectedElement.animation.loopDuration || 8}
                          onChange={(e) =>
                            updateSelectedElement({
                              animation: {
                                ...selectedElement.animation,
                                loopDuration: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full accent-[#C2A676]"
                        />
                      </div>

                      {/* Jarak Gerakan */}
                      <div className="pt-2 border-t border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#A0A694]">Jarak Jangkauan Gerakan</span>
                          <span className="font-mono text-[#C2A676] font-semibold">
                            {selectedElement.animation.moveDistance || 30}px
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { label: 'Halus', dist: 15 },
                            { label: 'Sedang', dist: 35 },
                            { label: 'Jauh', dist: 70 },
                            { label: 'Ekstrim', dist: 120 },
                          ].map((d) => (
                            <button
                              key={d.dist}
                              onClick={() => {
                                updateSelectedElement({
                                  animation: {
                                    ...selectedElement.animation,
                                    moveDistance: d.dist,
                                  },
                                });
                              }}
                              className={`py-1 rounded text-[9px] font-medium transition ${
                                (selectedElement.animation.moveDistance || 30) === d.dist
                                  ? 'bg-[#C2A676] text-[#1E2218] font-bold'
                                  : 'bg-black/30 text-[#A0A694] hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="200"
                          step="5"
                          value={selectedElement.animation.moveDistance || 30}
                          onChange={(e) =>
                            updateSelectedElement({
                              animation: {
                                ...selectedElement.animation,
                                moveDistance: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full accent-[#C2A676]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Timing & Trigger */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] text-[#A0A694] mb-1">
                        Durasi ({selectedElement.animation.duration || 1.2}s)
                      </label>
                      <input
                        type="range"
                        min="0.3"
                        max="3.5"
                        step="0.1"
                        value={selectedElement.animation.duration || 1.2}
                        onChange={(e) => {
                          updateSelectedElement({
                            animation: {
                              ...selectedElement.animation,
                              duration: Number(e.target.value),
                            },
                          });
                          triggerPreviewAnimation();
                        }}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#A0A694] mb-1">
                        Delay ({selectedElement.animation.delay || 0}s)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="4.0"
                        step="0.1"
                        value={selectedElement.animation.delay || 0}
                        onChange={(e) => {
                          updateSelectedElement({
                            animation: {
                              ...selectedElement.animation,
                              delay: Number(e.target.value),
                            },
                          });
                          triggerPreviewAnimation();
                        }}
                        className="w-full accent-[#C2A676]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#A0A694] mb-1">Pemicu Animasi (Trigger)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() =>
                          updateSelectedElement({
                            animation: {
                              ...selectedElement.animation,
                              trigger: 'onScroll',
                            },
                          })
                        }
                        className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium transition flex items-center justify-center gap-1 ${
                          (selectedElement.animation.trigger || 'onScroll') === 'onScroll'
                            ? 'bg-[#C2A676] text-[#1E2218] border-[#C2A676] font-bold shadow'
                            : 'bg-white/5 border-white/10 text-[#A0A694] hover:bg-white/10'
                        }`}
                      >
                        <span>📜 Saat Discroll</span>
                      </button>
                      <button
                        onClick={() =>
                          updateSelectedElement({
                            animation: {
                              ...selectedElement.animation,
                              trigger: 'onLoad',
                            },
                          })
                        }
                        className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium transition flex items-center justify-center gap-1 ${
                          selectedElement.animation.trigger === 'onLoad'
                            ? 'bg-[#C2A676] text-[#1E2218] border-[#C2A676] font-bold shadow'
                            : 'bg-white/5 border-white/10 text-[#A0A694] hover:bg-white/10'
                        }`}
                      >
                        <span>⚡ Langsung Dimuat</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* === G. AKSI DUPLIKAT & HAPUS ELEMEN === */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => handleDuplicateElement(selectedElement)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[#E8D8BA] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Duplikat</span>
                  </button>
                  <button
                    onClick={() => handleDeleteElement(selectedElement.id)}
                    className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })() : (
            /* === PENGATURAN LATAR BELAKANG & SECTION (OTOMATIS AKTIF KETIKA BACKGROUND DITEKAN) === */
            <div className="space-y-4">
              {/* Header Latar Belakang */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#51583D]/40 border border-[#C2A676]/40 flex items-center justify-center shrink-0">
                    <Palette className="w-4 h-4 text-[#C2A676]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#FAF9F5] truncate">
                      🎨 Pengaturan Latar Belakang
                    </h3>
                    <p className="text-[10px] text-[#A0A694] truncate">
                      Bagian: {currentSection?.title || 'Undangan'}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#C2A676]/20 border border-[#C2A676]/40 text-[#E8D8BA] text-[9px] font-mono">
                  Latar Aktif
                </span>
              </div>

              {/* 1. Warna Latar Belakang & Palet Cepat */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#E8D8BA]">
                  <span>Warna Latar Belakang</span>
                  <span className="font-mono text-[11px] text-[#C2A676]">{currentSection?.backgroundColor || '#FAF9F5'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentSection?.backgroundColor?.startsWith('#') ? currentSection.backgroundColor : '#FAF9F5'}
                    onChange={(e) => updateCurrentSection({ backgroundColor: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={currentSection?.backgroundColor || '#FAF9F5'}
                    onChange={(e) => updateCurrentSection({ backgroundColor: e.target.value })}
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                    placeholder="#FAF9F5"
                  />
                </div>

                {/* Quick Luxury Presets */}
                <div className="pt-1">
                  <div className="text-[10px] text-[#A0A694] mb-1.5 font-medium">Palet Warna Cepat Luxury:</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: 'Krem Suci', color: '#FAF9F5', border: '#DCD6CA' },
                      { label: 'Ivory Vintage', color: '#FDFBF7', border: '#E5DDCB' },
                      { label: 'Sage Botanical', color: '#E8ECE3', border: '#C5CDC0' },
                      { label: 'Rose Soft', color: '#FDF2F4', border: '#ECC8D0' },
                      { label: 'Champagne', color: '#F4EEDF', border: '#DECBA9' },
                      { label: 'Forest Dark', color: '#1E2218', border: '#363D2B' },
                      { label: 'Midnight Black', color: '#0F110B', border: '#252B1B' },
                      { label: 'Navy Gold', color: '#0F172A', border: '#2B3B5E' },
                    ].map((pal, idx) => (
                      <button
                        key={idx}
                        onClick={() => updateCurrentSection({ backgroundColor: pal.color })}
                        className={`p-1.5 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                          (currentSection?.backgroundColor || '').toLowerCase() === pal.color.toLowerCase()
                            ? 'ring-2 ring-[#C2A676] shadow'
                            : 'hover:border-white/30'
                        }`}
                        style={{ backgroundColor: pal.color, borderColor: pal.border }}
                        title={pal.label}
                      >
                        <span
                          className="text-[9px] font-bold leading-tight"
                          style={{
                            color: pal.color === '#1E2218' || pal.color === '#0F110B' || pal.color === '#0F172A' ? '#E8D8BA' : '#1E2218',
                          }}
                        >
                          {pal.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Gambar / Tekstur Latar Belakang */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#C2A676]" />
                    <span>Gambar & Tekstur Latar</span>
                  </h4>
                  {currentSection?.backgroundImage && (
                    <button
                      onClick={() => updateCurrentSection({ backgroundImage: '' })}
                      className="text-[10px] text-rose-300 hover:underline"
                    >
                      Hapus Gambar
                    </button>
                  )}
                </div>

                {/* Direct Upload Button from Computer / Device */}
                <label className="w-full cursor-pointer py-2 px-3 rounded-xl bg-gradient-to-r from-[#C2A676] to-[#E8D8BA] text-[#141610] font-bold text-xs flex items-center justify-center gap-2 shadow hover:opacity-90 active:scale-95 transition">
                  <Upload className="w-4 h-4 stroke-[2.5]" />
                  <span>📷 Upload Foto Latar (Galeri / File)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadBackgroundDirect}
                    className="hidden"
                  />
                </label>

                {/* Preset Tekstur Mewah 1-Klik */}
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    {
                      label: '🚫 Polos (Warna)',
                      url: '',
                      desc: 'Tanpa gambar latar',
                    },
                    {
                      label: '📜 Kertas Vintage',
                      url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80',
                      desc: 'Serat kertas kuno',
                    },
                    {
                      label: '🌿 Sage Botanical',
                      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1000&auto=format&fit=crop&q=80',
                      desc: 'Dedaunan botani pastel',
                    },
                    {
                      label: '✨ Golden Bokeh Dust',
                      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80',
                      desc: 'Kilau cahaya keemasan',
                    },
                    {
                      label: '🌌 Bintang Malam',
                      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1000&auto=format&fit=crop&q=80',
                      desc: 'Langit malam romantis',
                    },
                    {
                      label: '🏛️ Bunga Mawar',
                      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000&auto=format&fit=crop&q=80',
                      desc: 'Kelopak mawar lembut',
                    },
                  ].map((tex, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateCurrentSection({ backgroundImage: tex.url })}
                      className={`p-2 rounded-xl border text-left transition ${
                        (currentSection?.backgroundImage || '') === tex.url
                          ? 'bg-[#51583D] border-[#C2A676] text-white font-bold shadow'
                          : 'bg-black/30 border-white/5 text-[#E8D8BA] hover:bg-white/10'
                      }`}
                    >
                      <div className="text-[11px] font-semibold truncate">{tex.label}</div>
                      <div className="text-[9px] text-[#A0A694] truncate">{tex.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Custom URL Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A0A694]">Atau Masukkan URL Gambar Sendiri:</label>
                  <input
                    type="text"
                    value={currentSection?.backgroundImage || ''}
                    onChange={(e) => updateCurrentSection({ backgroundImage: e.target.value })}
                    placeholder="https://... URL gambar latar"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                  />
                </div>

                {/* Opasitas Gambar Latar */}
                {currentSection?.backgroundImage && (
                  <div className="space-y-2 p-2.5 rounded-xl bg-black/30 border border-white/5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#A0A694]">Transparansi Gambar Latar</span>
                      <span className="font-mono text-[#E8D8BA]">
                        {Math.round((currentSection?.backgroundOpacity ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1"
                      step="0.05"
                      value={currentSection?.backgroundOpacity ?? 1}
                      onChange={(e) => updateCurrentSection({ backgroundOpacity: Number(e.target.value) })}
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                )}
              </div>

              {/* 3. Efek Animasi Latar Belakang & Partikel */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C2A676]" />
                    <span>Animasi & Suasana Latar</span>
                  </h4>
                </div>

                {/* Animasi Kamera / Latar */}
                <div>
                  <label className="block text-[10px] text-[#A0A694] mb-1 font-medium">
                    Efek Gerakan Gambar Latar
                  </label>
                  <select
                    value={currentSection?.backgroundAnimation || 'none'}
                    onChange={(e) => updateCurrentSection({ backgroundAnimation: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#2A2E22] border border-white/10 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#C2A676]"
                  >
                    <option value="none">🚫 Statis (Tanpa Gerakan Latar)</option>
                    <option value="zoomSlow">🔍 Ken Burns Slow Zoom (Latar Bergerak Maju-Mundur)</option>
                    <option value="drift">🌊 Drift Floating (Latar Mengambang Halus)</option>
                    <option value="pulse">💡 Pulse Ambient Glow (Pendaran Cahaya Halus)</option>
                    <option value="petals">🌸 Hujan Kelopak Bunga di Bagian Ini (Falling Petals)</option>
                    <option value="sparkles">✨ Kilauan Debu Emas di Bagian Ini (Gold Glitter Dust)</option>
                  </select>
                </div>

                {/* Efek Partikel Global Seluruh Undangan */}
                <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#A0A694]">Partikel Seluruh Undangan (Global)</span>
                    <span className="text-[#C2A676] font-semibold capitalize">{project.ambientEffect}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: 'petals', label: '🌸 Bunga' },
                      { id: 'sparkles', label: '✨ Kilau' },
                      { id: 'butterflies', label: '🌿 Daun' },
                      { id: 'none', label: '🚫 Polos' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleUpdateProject({ ...project, ambientEffect: item.id as any })}
                        className={`py-1 rounded text-[10px] font-medium transition ${
                          project.ambientEffect === item.id
                            ? 'bg-[#C2A676] text-[#1E2218] font-bold shadow'
                            : 'bg-black/40 text-[#A0A694] hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Ukuran Bagian / Section */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-[#E8D8BA] uppercase tracking-wider flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-[#C2A676]" />
                  <span>Ukuran & Jarak Bagian</span>
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-[#A0A694] mb-1">
                      <span>Tinggi Min</span>
                      <span className="font-mono text-[#E8D8BA]">{currentSection?.minHeight || 400}px</span>
                    </div>
                    <input
                      type="range"
                      min="350"
                      max="1000"
                      step="25"
                      value={currentSection?.minHeight || 400}
                      onChange={(e) => updateCurrentSection({ minHeight: Number(e.target.value) })}
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-[#A0A694] mb-1">
                      <span>Padding Y</span>
                      <span className="font-mono text-[#E8D8BA]">{currentSection?.paddingY || 40}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={currentSection?.paddingY || 40}
                      onChange={(e) => updateCurrentSection({ paddingY: Number(e.target.value) })}
                      className="w-full accent-[#C2A676]"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Daftar Elemen di Bagian Ini (Untuk kemudahan memilih elemen) */}
              {currentSectionElements.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#E8D8BA] uppercase tracking-wider">
                      Elemen di Bagian Ini ({currentSectionElements.length}):
                    </span>
                    <span className="text-[9px] text-[#A0A694]">Sentuh untuk edit</span>
                  </div>
                  <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                    {currentSectionElements.map((el) => (
                      <button
                        key={el.id}
                        onClick={() => setSelectedElementId(el.id)}
                        className="w-full p-2 rounded-xl bg-black/40 hover:bg-[#51583D]/40 border border-white/5 hover:border-[#C2A676]/60 flex items-center justify-between text-left transition"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {el.type === 'flower' ? (
                            <Flower2 className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                          ) : ['image', 'ornament', 'seal', 'bismillah'].includes(el.type) ? (
                            <Sparkles className="w-3.5 h-3.5 text-[#C2A676] shrink-0" />
                          ) : el.type === 'button' ? (
                            <Play className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          ) : (
                            <Type className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                          )}
                          <span className="text-xs text-[#FAF9F5] truncate">{el.name}</span>
                        </div>
                        <span className="text-[10px] text-[#C2A676] font-mono">Edit ➔</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* 3. CANVA-STYLE MOBILE BOTTOM DOCK & TOUCH TOOLBAR */}
      <CanvaMobileDock
        selectedElement={selectedElement}
        selectedSection={currentSection}
        project={project}
        onUpdateElement={updateSelectedElement}
        onUpdateSection={updateCurrentSection}
        onAddElement={handleAddElement}
        onDeleteElement={handleDeleteElement}
        onDuplicateElement={handleDuplicateElement}
        onDeselect={() => {
          setSelectedElementId(null);
          setDragUnlockedElementId(null);
        }}
        onNudge={nudgeElement}
        canvasViewMode={canvasViewMode}
        onChangeCanvasViewMode={setCanvasViewMode}
        previewMode={previewMode}
        onTogglePreviewMode={() => setPreviewMode(previewMode === 'live' ? 'editor' : 'live')}
        onTriggerAnimPreview={triggerPreviewAnimation}
        canvasZoom={canvasZoom}
        onChangeZoom={setCanvasZoom}
        onOpenAddPageModal={() => setShowAddPageModal(true)}
        isDragUnlocked={dragUnlockedElementId === selectedElementId}
        onToggleDragLock={() =>
          setDragUnlockedElementId(dragUnlockedElementId === selectedElementId ? null : selectedElementId)
        }
      />
    </div>
  );
};
