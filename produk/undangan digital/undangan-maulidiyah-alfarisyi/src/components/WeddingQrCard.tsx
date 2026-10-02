import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy, Check, X, Sparkles, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { INVITATION_DATA } from '../data/invitationData';

interface WeddingQrCardProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Botanical Foliage SVG for Top-Left
const TopLeftBotanical: React.FC = () => (
  <svg viewBox="0 0 160 160" className="w-28 sm:w-36 h-28 sm:h-36 absolute -top-1 -left-1 pointer-events-none drop-shadow-sm">
    <defs>
      <linearGradient id="leafGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#223e27" />
        <stop offset="50%" stopColor="#355e3b" />
        <stop offset="100%" stopColor="#4a7350" />
      </linearGradient>
      <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#436b49" />
        <stop offset="100%" stopColor="#67916e" />
      </linearGradient>
    </defs>
    {/* Main curving stem */}
    <path d="M 8,8 Q 50,55 95,95 T 140,135" fill="none" stroke="#223e27" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 30,35 Q 75,50 115,65" fill="none" stroke="#223e27" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M 60,65 Q 65,105 75,135" fill="none" stroke="#223e27" strokeWidth="1.8" strokeLinecap="round" />

    {/* Hanging Eucalyptus / Olive Leaves */}
    <path d="M 25,20 C 35,5 60,15 65,30 C 65,45 40,40 25,20 Z" fill="url(#leafGradDark)" />
    <path d="M 50,38 C 75,22 105,32 110,48 C 105,62 80,58 50,38 Z" fill="url(#leafGradLight)" />
    <path d="M 85,55 C 115,45 138,60 142,75 C 130,88 105,80 85,55 Z" fill="url(#leafGradDark)" />
    <path d="M 55,65 C 50,90 62,118 78,122 C 85,115 80,85 55,65 Z" fill="url(#leafGradLight)" />
    <path d="M 82,90 C 85,115 105,135 120,138 C 128,128 115,105 82,90 Z" fill="url(#leafGradDark)" />
    <path d="M 110,112 C 125,128 145,142 152,138 C 152,128 135,115 110,112 Z" fill="url(#leafGradLight)" />
  </svg>
);

// 2. White Flower Blossom + Leaves for Top-Right
const TopRightFloral: React.FC = () => (
  <svg viewBox="0 0 180 180" className="w-32 sm:w-40 h-32 sm:h-40 absolute -top-1 -right-1 pointer-events-none drop-shadow-md">
    <defs>
      <radialGradient id="petalGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#faf7f0" />
        <stop offset="100%" stopColor="#e7dec9" />
      </radialGradient>
      <linearGradient id="sageLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d4a32" />
        <stop offset="100%" stopColor="#557c5c" />
      </linearGradient>
    </defs>
    {/* Behind Green Leaves */}
    <path d="M 120,25 C 100,5 65,15 70,38 C 85,55 115,45 120,25 Z" fill="url(#sageLeaf)" />
    <path d="M 155,75 C 175,55 170,25 145,28 C 130,45 135,75 155,75 Z" fill="url(#sageLeaf)" />
    <path d="M 110,95 C 135,115 160,110 162,90 C 150,75 125,78 110,95 Z" fill="url(#sageLeaf)" />
    <path d="M 85,75 C 65,95 68,125 90,122 C 105,108 98,82 85,75 Z" fill="url(#sageLeaf)" />

    {/* Delicate White Peony / Rose Blossom */}
    <g transform="translate(118, 52)">
      {/* Outer Petals */}
      <circle cx="-18" cy="-12" r="22" fill="url(#petalGlow)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="15" cy="-14" r="21" fill="url(#petalGlow)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="18" cy="15" r="22" fill="url(#petalGlow)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="-15" cy="18" r="20" fill="url(#petalGlow)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      {/* Inner Petals */}
      <circle cx="-6" cy="-6" r="16" fill="url(#petalGlow)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="8" cy="-5" r="15" fill="url(#petalGlow)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="6" cy="8" r="15" fill="url(#petalGlow)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="-7" cy="7" r="14" fill="url(#petalGlow)" stroke="#d9d0ba" strokeWidth="0.8" />
      {/* Rose Center Stamen */}
      <circle cx="0" cy="0" r="8" fill="#e9ddb8" />
      <circle cx="-1" cy="0" r="4" fill="#c4a559" />
    </g>
  </svg>
);

// 3. White Blossom + Leaves for Bottom-Left
const BottomLeftFloral: React.FC = () => (
  <svg viewBox="0 0 180 180" className="w-32 sm:w-40 h-32 sm:h-40 absolute -bottom-1 -left-1 pointer-events-none drop-shadow-md">
    <defs>
      <radialGradient id="petalGlow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#faf7f0" />
        <stop offset="100%" stopColor="#e7dec9" />
      </radialGradient>
      <linearGradient id="sageLeaf2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2d4a32" />
        <stop offset="100%" stopColor="#557c5c" />
      </linearGradient>
    </defs>
    {/* Behind Green Leaves */}
    <path d="M 60,155 C 40,175 10,165 15,142 C 30,125 55,135 60,155 Z" fill="url(#sageLeaf2)" />
    <path d="M 25,105 C 5,125 10,155 35,152 C 50,135 45,105 25,105 Z" fill="url(#sageLeaf2)" />
    <path d="M 70,85 C 45,65 20,70 18,90 C 30,105 55,102 70,85 Z" fill="url(#sageLeaf2)" />
    <path d="M 95,105 C 115,85 112,55 90,58 C 75,72 82,98 95,105 Z" fill="url(#sageLeaf2)" />

    {/* White Rose Blossom */}
    <g transform="translate(62, 128)">
      <circle cx="-18" cy="-12" r="22" fill="url(#petalGlow2)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="15" cy="-14" r="21" fill="url(#petalGlow2)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="18" cy="15" r="22" fill="url(#petalGlow2)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="-15" cy="18" r="20" fill="url(#petalGlow2)" stroke="#dfd7c2" strokeWidth="0.8" opacity="0.95" />
      <circle cx="-6" cy="-6" r="16" fill="url(#petalGlow2)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="8" cy="-5" r="15" fill="url(#petalGlow2)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="6" cy="8" r="15" fill="url(#petalGlow2)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="-7" cy="7" r="14" fill="url(#petalGlow2)" stroke="#d9d0ba" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="8" fill="#e9ddb8" />
      <circle cx="0" cy="0" r="4" fill="#c4a559" />
    </g>
  </svg>
);

// 4. Botanical Sprig for Bottom-Right
const BottomRightBotanical: React.FC = () => (
  <svg viewBox="0 0 160 160" className="w-28 sm:w-36 h-28 sm:h-36 absolute -bottom-1 -right-1 pointer-events-none drop-shadow-sm">
    <defs>
      <linearGradient id="leafGradBR" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#223e27" />
        <stop offset="100%" stopColor="#4a7350" />
      </linearGradient>
    </defs>
    <path d="M 152,152 Q 110,105 65,65 T 20,25" fill="none" stroke="#223e27" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 130,125 Q 85,110 45,95" fill="none" stroke="#223e27" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M 100,95 Q 95,55 85,25" fill="none" stroke="#223e27" strokeWidth="1.8" strokeLinecap="round" />

    <path d="M 135,140 C 125,155 100,145 95,130 C 95,115 120,120 135,140 Z" fill="url(#leafGradBR)" />
    <path d="M 110,122 C 85,138 55,128 50,112 C 55,98 80,102 110,122 Z" fill="url(#leafGradBR)" />
    <path d="M 75,105 C 45,115 22,100 18,85 C 30,72 55,80 75,105 Z" fill="url(#leafGradBR)" />
    <path d="M 105,95 C 110,70 98,42 82,38 C 75,45 80,75 105,95 Z" fill="url(#leafGradBR)" />
    <path d="M 78,70 C 75,45 55,25 40,22 C 32,32 45,55 78,70 Z" fill="url(#leafGradBR)" />
  </svg>
);

export const WeddingQrCard: React.FC<WeddingQrCardProps> = ({ isOpen, onClose }) => {
  const [customGuest, setCustomGuest] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const baseUrl = "https://undangan-digital-woad-sigma.vercel.app";
  const targetUrl = customGuest.trim() 
    ? `${baseUrl}?to=${encodeURIComponent(customGuest.trim())}`
    : baseUrl;

  // High-Resolution 1200x1600 PNG Card Generator
  const handleDownload = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#223e27', '#67916e', '#d4af37', '#f8f6e1']
    });

    const qrCanvas = document.getElementById('botanical-wedding-qr') as HTMLCanvasElement;
    if (!qrCanvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 1600;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Soft Warm Ivory Paper Background
    ctx.fillStyle = '#faf8f5';
    ctx.fillRect(0, 0, 1200, 1600);

    // 2. Subtle Paper Border Line
    ctx.strokeStyle = '#e6dfd1';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1120, 1520);

    // 3. Top Calligraphy "Welcome"
    ctx.textAlign = 'center';
    ctx.fillStyle = '#223826';
    ctx.font = 'italic bold 110px "Times New Roman", Georgia, serif';
    ctx.fillText('Welcome', 600, 240);

    // 4. Subtitle "to our Beginning"
    ctx.fillStyle = '#415545';
    ctx.font = '500 28px Georgia, serif';
    ctx.fillText('to our Beginning', 600, 295);

    // 5. Couple Names in Widely Spaced Serif Capitals
    ctx.fillStyle = '#1c2e20';
    ctx.font = 'bold 42px "Times New Roman", Georgia, serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('A L F A R I S Y I   &   M A U L I D I Y A H', 600, 375);

    // 6. Wedding Date
    ctx.fillStyle = '#415545';
    ctx.font = '500 32px Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('13.10.2026', 600, 435);

    // 7. Center QR Code (Clean & Crisp Forest Green on pure white base)
    const qrSize = 520;
    const qrX = (1200 - qrSize) / 2;
    const qrY = 490;

    // Draw white clean background backing
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 30);
    ctx.fill();
    ctx.strokeStyle = '#e2ded5';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the QR Code image
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // 8. Script "Scan Here"
    ctx.fillStyle = '#223826';
    ctx.font = 'italic bold 95px "Times New Roman", Georgia, serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('Scan Here', 600, 1150);

    // 9. Subtitle "To View Our Wedding Invitation"
    ctx.fillStyle = '#415545';
    ctx.font = '600 32px Georgia, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('To View Our Wedding Invitation', 600, 1215);

    // 10. Guest Name if Customized
    if (customGuest.trim()) {
      ctx.fillStyle = '#223826';
      ctx.font = 'italic 28px Georgia, serif';
      ctx.fillText(`Special Invitation For: ${customGuest.trim()}`, 600, 1310);
    }

    // 11. Subtle URL Branding at Bottom
    ctx.fillStyle = '#839686';
    ctx.font = '22px Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('undangan-digital-woad-sigma.vercel.app', 600, 1480);

    // Trigger image download
    const downloadLink = document.createElement('a');
    downloadLink.download = `Kartu-Undangan-QR-Alfarisyi-Maulidiyah.png`;
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative w-full max-w-sm sm:max-w-md max-h-[95vh] flex flex-col items-center overflow-y-auto no-scrollbar"
        >
          {/* Close Floating Button */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/90 border border-[#2d4a32]/30 flex items-center justify-center text-[#2d4a32] hover:bg-[#2d4a32] hover:text-white transition-all cursor-pointer shadow-lg z-30"
          >
            <X className="w-5 h-5" />
          </button>

          {/* THE BOTANICAL WEDDING QR CARD CONTAINER (Matching user reference image 100%) */}
          <div 
            id="botanical-card-container"
            className="relative w-full rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 text-center shadow-2xl overflow-hidden border border-[#d8cfbe]"
            style={{ 
              backgroundColor: '#faf8f5',
              boxShadow: '0 25px 60px -15px rgba(34, 62, 39, 0.25)' 
            }}
          >
            {/* 4 Corner Botanical Illustrations */}
            <TopLeftBotanical />
            <TopRightFloral />
            <BottomLeftFloral />
            <BottomRightBotanical />

            {/* Content Body */}
            <div className="relative z-10 flex flex-col items-center pt-2 sm:pt-4">
              
              {/* "Welcome" in Flowing Script Calligraphy */}
              <h2 className="font-aston text-5xl sm:text-6xl text-[#223826] leading-none mb-1">
                Welcome
              </h2>

              {/* "to our Beginning" */}
              <p className="font-roman text-xs sm:text-sm text-[#415545] font-medium tracking-[0.2em] mb-4">
                to our Beginning
              </p>

              {/* Couple Names: A L F A R I S Y I   &   M A U L I D I Y A H */}
              <h3 className="font-cinzel text-sm sm:text-base text-[#1c2e20] font-bold tracking-[0.22em] uppercase leading-snug">
                A L F A R I S Y I &nbsp;&amp;&nbsp; M A U L I D I Y A H
              </h3>

              {/* Date: 13.10.2026 */}
              <p className="font-roman text-xs sm:text-sm text-[#415545] font-semibold tracking-widest mt-1 mb-5">
                13.10.2026
              </p>

              {/* Center Modern QR Code in Deep Botanical Forest Green */}
              <div className="relative p-3.5 bg-white rounded-2xl shadow-md border border-[#e2ded5]">
                <QRCodeCanvas
                  id="botanical-wedding-qr"
                  value={targetUrl}
                  size={175}
                  bgColor="#ffffff"
                  fgColor="#223e27" // Deep botanical forest green matching reference
                  level="Q"
                  includeMargin={false}
                />
              </div>

              {/* "Scan Here" in Flowing Script Calligraphy */}
              <h3 className="font-aston text-4xl sm:text-5xl text-[#223826] mt-5 mb-0.5 leading-tight">
                Scan Here
              </h3>

              {/* "To View Our Wedding Invitation" */}
              <p className="font-roman text-[11px] sm:text-xs text-[#415545] font-semibold tracking-wider">
                To View Our Wedding Invitation
              </p>
              <p className="font-cinzel text-[9px] text-[#718575] tracking-widest uppercase mt-0.5">
                Alfarisyi &amp; Maulidiyah
              </p>

              {/* Optional Custom Guest Tag */}
              {customGuest.trim() && (
                <div className="mt-3 px-3 py-1 rounded-full bg-[#eef3ee] border border-[#355e3b]/30">
                  <p className="text-[11px] font-roman text-[#223e27] italic">
                    ✨ Undangan Khusus: <span className="font-bold">{customGuest.trim()}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Control Panel Below Card */}
          <div className="w-full mt-4 bg-white/95 rounded-2xl p-4 shadow-xl border border-[#2d4a32]/20 backdrop-blur-md space-y-3">
            
            {/* Input Nama Tamu */}
            <div>
              <label className="block font-cinzel text-[10px] text-[#223826] font-bold tracking-wider mb-1 uppercase text-left">
                Personalisasi Nama Tamu (Opsional):
              </label>
              <input
                type="text"
                placeholder="Contoh: Bpk. Bambang & Keluarga"
                value={customGuest}
                onChange={(e) => setCustomGuest(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#f4f7f4] border border-[#2d4a32]/25 font-roman text-xs text-[#223826] placeholder:text-[#2d4a32]/40 focus:outline-none focus:border-[#223826]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#223826] text-[#faf8f5] text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:bg-[#162719] active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>Unduh Gambar QR (PNG)</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded-full bg-[#f4f7f4] border border-[#2d4a32]/30 text-[#223826] text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#e7eee7] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Link Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#223826]" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] font-roman text-[#556958] italic text-center">
              Desain kartu siap dikirim ke WhatsApp, Instagram Story, atau dicetak pada kartu fisik.
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
