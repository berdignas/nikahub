import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Heart, Download, QrCode, Copy, Check, Sparkles, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { INVITATION_DATA } from '../data/invitationData';

interface HeartQrCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeartQrCard: React.FC<HeartQrCardProps> = ({ isOpen, onClose }) => {
  const [customGuest, setCustomGuest] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const baseUrl = "https://undangan-digital-woad-sigma.vercel.app";
  const targetUrl = customGuest.trim() 
    ? `${baseUrl}?to=${encodeURIComponent(customGuest.trim())}`
    : baseUrl;

  // Function to download the QR Card as PNG
  const handleDownload = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E65C7B', '#52B788']
    });

    const qrCanvas = document.getElementById('wedding-heart-qr-canvas') as HTMLCanvasElement;
    if (!qrCanvas) return;

    // Create a high-res 800x1000 canvas to render the complete luxury card
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 800;
    exportCanvas.height = 1040;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Background Cream Ivory
    ctx.fillStyle = '#f8f6e1';
    ctx.fillRect(0, 0, 800, 1040);

    // 2. Vintage Double Border
    ctx.strokeStyle = '#685c46';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 740, 980);
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 716, 956);

    // 3. Header Texts
    ctx.textAlign = 'center';
    ctx.fillStyle = '#685c46';
    ctx.font = '600 20px Georgia, serif';
    ctx.fillText('THE WEDDING OF', 400, 100);

    ctx.fillStyle = '#473c27';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(`${INVITATION_DATA.groom.nickname} & ${INVITATION_DATA.bride.nickname}`, 400, 155);

    ctx.fillStyle = '#685c46';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText(INVITATION_DATA.dateFormatted, 400, 195);

    // 4. Large Heart Frame Silhouette
    ctx.save();
    ctx.fillStyle = '#ece5da';
    ctx.strokeStyle = '#685c46';
    ctx.lineWidth = 4;
    
    // Draw Heart shape
    ctx.beginPath();
    const hx = 400;
    const hy = 320;
    const size = 18;
    ctx.moveTo(hx, hy + size * 11);
    ctx.bezierCurveTo(hx - size * 14, hy + size * 2, hx - size * 18, hy - size * 6, hx - size * 9, hy - size * 12);
    ctx.bezierCurveTo(hx - size * 4, hy - size * 15, hx, hy - size * 8, hx, hy - size * 3);
    ctx.bezierCurveTo(hx, hy - size * 8, hx + size * 4, hy - size * 15, hx + size * 9, hy - size * 12);
    ctx.bezierCurveTo(hx + size * 18, hy - size * 6, hx + size * 14, hy + size * 2, hx, hy + size * 11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 5. Draw QR Code inside center of the Heart
    const qrSize = 340;
    const qrX = 400 - qrSize / 2;
    const qrY = 370;

    // White rounded backing for clean QR scanning
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24);
    ctx.fill();
    ctx.strokeStyle = '#685c46';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // 6. Guest Name if specified
    if (customGuest.trim()) {
      ctx.fillStyle = '#685c46';
      ctx.font = '600 18px Georgia, serif';
      ctx.fillText('KEPADA YTH.', 400, 790);

      ctx.fillStyle = '#473c27';
      ctx.font = 'bold 28px Georgia, serif';
      ctx.fillText(customGuest.trim(), 400, 830);
    } else {
      ctx.fillStyle = '#685c46';
      ctx.font = 'italic 20px Georgia, serif';
      ctx.fillText('Pindai QR Code untuk membuka undangan digital kami', 400, 810);
    }

    // 7. Footer Quote
    ctx.fillStyle = '#685c46';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('Merupakan suatu kehormatan atas kehadiran dan doa restu Anda', 400, 930);
    ctx.font = '14px Georgia, serif';
    ctx.fillText(baseUrl, 400, 965);

    // Trigger Download
    const downloadLink = document.createElement('a');
    downloadLink.download = `QR-Undangan-${INVITATION_DATA.groom.nickname}-${INVITATION_DATA.bride.nickname}.png`;
    downloadLink.href = exportCanvas.toDataURL('image/png');
    downloadLink.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm viding-card rounded-[32px] border-2 border-[#685c46]/50 shadow-2xl p-6 text-center max-h-[92vh] overflow-y-auto no-scrollbar"
          ref={cardRef}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 flex items-center justify-center text-[#685c46] hover:bg-[#473c27] hover:text-[#f8f6e1] transition-all cursor-pointer shadow-sm z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece5da] border border-[#685c46]/30 mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#685c46] font-bold">
              Heart QR Code
            </span>
          </div>

          <h3 className="font-aston text-3xl sm:text-4xl text-[#473c27]">
            {INVITATION_DATA.groom.nickname} & {INVITATION_DATA.bride.nickname}
          </h3>
          <p className="font-roman text-xs text-[#685c46] italic -mt-0.5 mb-4">
            Scan untuk membuka undangan pernikahan langsung
          </p>

          {/* THE HEART SHAPE CONTAINER WITH QR CODE IN CENTER */}
          <div className="relative my-2 flex items-center justify-center">
            {/* SVG Heart Ornament Frame */}
            <svg 
              viewBox="0 0 400 380" 
              className="w-72 h-68 drop-shadow-xl overflow-visible"
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fdfbf4" />
                  <stop offset="50%" stopColor="#f8f6e1" />
                  <stop offset="100%" stopColor="#ece5da" />
                </linearGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#685c46" floodOpacity="0.25"/>
                </filter>
              </defs>

              {/* Outer Decorative Heart */}
              <path
                d="M 200,345 C 70,250 15,160 60,75 C 95,10 160,25 200,85 C 240,25 305,10 340,75 C 385,160 330,250 200,345 Z"
                fill="url(#heartGradient)"
                stroke="#685c46"
                strokeWidth="4"
                filter="url(#goldGlow)"
              />

              {/* Inner Heart Dashed Accent */}
              <path
                d="M 200,325 C 85,235 35,152 75,85 C 105,32 160,42 200,98 C 240,42 295,32 325,85 C 365,152 315,235 200,325 Z"
                fill="none"
                stroke="#685c46"
                strokeWidth="1.5"
                strokeDasharray="5,4"
                opacity="0.6"
              />
            </svg>

            {/* Centered QR Code Box with White Backing */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-[#685c46]/40 relative group">
                <QRCodeCanvas
                  id="wedding-heart-qr-canvas"
                  value={targetUrl}
                  size={145}
                  bgColor="#ffffff"
                  fgColor="#473c27"
                  level="H"
                  imageSettings={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e11d48' stroke='%23ffffff' stroke-width='1.5'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E",
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />

                {/* Little Floating Heart Badge on Corner */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Personalisasi Nama Tamu */}
          <div className="mt-3 mb-4 text-left">
            <label className="block font-cinzel text-[10px] text-[#473c27] font-bold tracking-wider mb-1 uppercase">
              Nama Tamu (Opsional):
            </label>
            <input
              type="text"
              placeholder="Contoh: Bpk. Bambang & Keluarga"
              value={customGuest}
              onChange={(e) => setCustomGuest(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#ece5da]/80 border border-[#685c46]/30 font-roman text-xs text-[#473c27] placeholder:text-[#685c46]/50 focus:outline-none focus:border-[#473c27]"
            />
            {customGuest.trim() && (
              <p className="text-[10px] font-roman text-emerald-800 italic mt-1">
                ✨ QR Code otomatis mencantumkan nama "{customGuest.trim()}" di sampul undangan!
              </p>
            )}
          </div>

          {/* Action Buttons: Download & Copy Link */}
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              className="w-full py-2.5 px-4 rounded-full bg-[#473c27] text-[#f8f6e1] text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:bg-[#362d1d] active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>Unduh Kartu QR (Gambar PNG)</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="viding-btn w-full py-2 px-4 rounded-full text-xs font-cinzel tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Undangan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#685c46]" />
                  <span>Salin Link URL Undangan</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Note */}
          <p className="font-roman text-[11px] text-[#685c46] italic mt-4">
            Anda dapat membagikan gambar QR ini ke WhatsApp atau mencetaknya pada kartu fisik pernikahan.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
