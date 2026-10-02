import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCw, Check, Crop, Move } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '1:1' | 'free'>('16:9');
  const [rotation, setRotation] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load image object
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => {
        imageRef.current = img;
        setZoom(1);
        setOffsetX(0);
        setOffsetY(0);
        setRotation(0);
        drawCanvas();
      };
    }
  }, [imageSrc]);

  // Re-draw canvas whenever transforms change
  useEffect(() => {
    if (isOpen && imageRef.current) {
      drawCanvas();
    }
  }, [isOpen, zoom, aspectRatio, rotation, offsetX, offsetY]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Target Canvas dimensions
    let targetWidth = 800;
    let targetHeight = 450; // default 16:9

    if (aspectRatio === '4:3') {
      targetWidth = 800;
      targetHeight = 600;
    } else if (aspectRatio === '1:1') {
      targetWidth = 600;
      targetHeight = 600;
    } else if (aspectRatio === 'free') {
      targetWidth = 800;
      targetHeight = Math.round((img.height / img.width) * 800) || 500;
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.clearRect(0, 0, targetWidth, targetHeight);
    ctx.save();

    // Center of canvas
    ctx.translate(targetWidth / 2 + offsetX, targetHeight / 2 + offsetY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw scaled image centered
    const drawWidth = targetWidth;
    const drawHeight = (img.height / img.width) * targetWidth;

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleApplyCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export compressed JPEG
    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
    onCropComplete(croppedDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-950/10 overflow-hidden z-10 text-emerald-950 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-serif font-bold text-xl text-emerald-950 flex items-center gap-2">
                <Crop className="w-5 h-5 text-champagne-600" />
                <span>Editor Potong & Kompres Sampul (Crop Tool)</span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Geser (drag) foto, sesuaikan zoom, rotasi, atau pilih rasio potongan sebelum disimpan ke katalog.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Interactive Canvas Workspace */}
          <div className="space-y-3">
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-emerald-950/20 shadow-inner select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ minHeight: '320px', maxHeight: '420px' }}
            >
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[380px] object-contain shadow-2xl rounded-lg"
              />

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-sand text-[10px] font-bold flex items-center gap-1.5 pointer-events-none">
                <Move className="w-3 h-3 text-champagne-400" />
                <span>Geser Foto dengan Drag Mouse</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="p-4 rounded-2xl bg-sand/40 border border-emerald-950/10 space-y-3 text-xs">
              
              {/* Aspect Ratio Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-950">Rasio Potongan:</span>
                  {(['16:9', '4:3', '1:1', 'free'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        aspectRatio === ratio
                          ? 'bg-emerald-950 text-sand shadow-sm'
                          : 'bg-white text-emerald-950 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {ratio === '16:9' ? '📐 16:9 (Banner)' :
                       ratio === '4:3' ? '🖼️ 4:3 (Standar)' :
                       ratio === '1:1' ? '🔲 1:1 (Persegi)' : '🔓 Bebas'}
                    </button>
                  ))}
                </div>

                {/* Rotate Button */}
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-3 py-1 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 font-bold flex items-center gap-1.5 text-emerald-950 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-champagne-700" />
                  <span>Putar 90°</span>
                </button>
              </div>

              {/* Zoom Slider */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-950 shrink-0 flex items-center gap-1">
                  <ZoomIn className="w-4 h-4 text-champagne-700" />
                  <span>Zoom / Skala:</span>
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-emerald-950 cursor-pointer"
                />
                <span className="font-mono font-bold text-emerald-950 text-xs w-12 text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer text-xs"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleApplyCrop}
              className="px-6 py-2.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4 text-champagne-400" />
              <span>Simpan Hasil Potongan</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
