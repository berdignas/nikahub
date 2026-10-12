import React, { useState, useRef } from 'react';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Heart,
  Camera,
  MessageCircleHeart,
  Image as ImageIcon,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { EVENT_INFO } from '../data/initialPhotos';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeDesignView, setActiveDesignView] = useState<'heart' | 'floral'>('heart');
  const qrRef = useRef<HTMLDivElement>(null);
  const printableCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Canonical URL pointing directly to this live photo gallery
  const targetUrl = typeof window !== 'undefined'
    ? (window.location.origin + window.location.pathname)
    : 'https://nikahhub.my.id/foto-maulidiyah-alfarisyi';

  // Romantic Center Emblem for the Heart QR Code
  const heartCenterBadge = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 88C48 88 14 62 14 34C14 20 23.5 10 36.5 10C43.5 10 47.5 14 50 18.5C52.5 14 56.5 10 63.5 10C76.5 10 86 20 86 34C86 62 52 88 50 88Z" fill="%23E11D48"/><path d="M50 78C48.5 78 22 56 22 34C22 23 29 16 38 16C43.5 16 47.5 19 50 22.5C52.5 19 56.5 16 62 16C71 16 78 23 78 34C78 56 51.5 78 50 78Z" fill="%23FFFFFF"/><circle cx="50" cy="45" r="14" fill="%23E11D48"/><text x="50" y="49" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">A%26M</text></svg>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate and download High-Resolution Printable Table Card (1000 x 1450 px)
  const handleDownloadTableCardPng = () => {
    try {
      setIsDownloading(true);
      const svgElement = qrRef.current?.querySelector('svg');
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const qrImg = new Image();

      canvas.width = 1000;
      canvas.height = 1450;

      qrImg.onload = () => {
        if (!ctx) return;

        // 1. Background Luxury Cream with Soft Blush Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, '#FFFDF8');
        bgGrad.addColorStop(0.5, '#FAF6EE');
        bgGrad.addColorStop(1, '#FFF5F5');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Double Golden Floral Border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 6;
        ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

        ctx.strokeStyle = '#E6CA92';
        ctx.lineWidth = 2;
        ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

        // 3. Draw Floral Corners
        const drawFlowerCorner = (cx: number, cy: number, rot: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);

          // Leaves
          ctx.fillStyle = '#8FA382';
          ctx.beginPath();
          ctx.ellipse(-20, -10, 24, 10, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(-10, -20, 24, 10, -1.1, 0, Math.PI * 2);
          ctx.fill();

          // Petals
          ctx.fillStyle = '#FDA4AF';
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#F43F5E';
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFE4E6';
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        drawFlowerCorner(80, 80, 0);
        drawFlowerCorner(canvas.width - 80, 80, Math.PI / 2);
        drawFlowerCorner(canvas.width - 80, canvas.height - 80, Math.PI);
        drawFlowerCorner(80, canvas.height - 80, (Math.PI * 3) / 2);

        // 4. Romantic Floating Hearts & Sparkles in Background
        const hearts = [
          { x: 140, y: 190, r: 12, c: '#FECDD3' },
          { x: 860, y: 220, r: 14, c: '#FECDD3' },
          { x: 120, y: 750, r: 16, c: '#FFE4E6' },
          { x: 880, y: 780, r: 15, c: '#FFE4E6' },
          { x: 150, y: 1100, r: 14, c: '#FECDD3' },
          { x: 850, y: 1120, r: 13, c: '#FECDD3' },
        ];
        hearts.forEach((h) => {
          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.fillStyle = h.c;
          ctx.font = `${h.r * 2}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('💖', 0, 0);
          ctx.restore();
        });

        // 5. Header Badge
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 180, 75, 360, 42, 21);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 LIVE WEDDING PHOTO & GUESTBOOK 💖', canvas.width / 2, 102);

        // 6. Couple Title & Subtitle
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 46px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Alfarisyi & Maulidiyah', canvas.width / 2, 175);

        ctx.fillStyle = '#9F1239';
        ctx.font = 'italic 20px Georgia, serif';
        ctx.fillText('Selasa & Rabu, 13 - 14 Oktober 2026', canvas.width / 2, 212);

        // 7. Warm Sweet Invitation Headline (Memicu Tamu Mau Scan)
        ctx.fillStyle = '#881337';
        ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Abadikan Momen Manis Anda Bersama Kami!', canvas.width / 2, 280);

        ctx.fillStyle = '#4B5563';
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Scan barcode hati di bawah untuk berbagi foto selfie & kebersamaan hari ini ✨', canvas.width / 2, 312);

        // 8. Draw Heart-Shaped Frame for QR Code
        const qrSize = 380;
        const qrCenterX = canvas.width / 2;
        const qrCenterY = 560;

        // Big Red Heart Shape Background
        ctx.save();
        ctx.beginPath();
        const topY = qrCenterY - 180;
        ctx.moveTo(qrCenterX, qrCenterY + 200);
        // Left side curve
        ctx.bezierCurveTo(
          qrCenterX - 280, qrCenterY + 70,
          qrCenterX - 280, topY,
          qrCenterX - 130, topY - 30
        );
        ctx.bezierCurveTo(
          qrCenterX - 50, topY - 30,
          qrCenterX, topY + 40,
          qrCenterX, topY + 60
        );
        // Right side curve
        ctx.bezierCurveTo(
          qrCenterX, topY + 40,
          qrCenterX + 50, topY - 30,
          qrCenterX + 130, topY - 30
        );
        ctx.bezierCurveTo(
          qrCenterX + 280, topY,
          qrCenterX + 280, qrCenterY + 70,
          qrCenterX, qrCenterY + 200
        );
        ctx.closePath();

        // Heart shadow & border
        ctx.shadowColor = 'rgba(225, 29, 72, 0.35)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.restore();

        // 9. Draw QR Code inside heart
        ctx.drawImage(qrImg, qrCenterX - (qrSize / 2), qrCenterY - (qrSize / 2) + 10, qrSize, qrSize);

        // Badge at the bottom of the heart
        ctx.fillStyle = '#0A261D';
        ctx.beginPath();
        ctx.roundRect(qrCenterX - 170, qrCenterY + 195, 340, 38, 19);
        ctx.fill();

        ctx.fillStyle = '#E6CA92';
        ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨ Arahkan Kamera HP ke Barcode Hati ✨', qrCenterX, qrCenterY + 219);

        // 10. Three Cheerful Steps Guide
        const stepY = 860;
        const stepWidth = 260;
        const stepGap = 25;
        const startX = (canvas.width - (3 * stepWidth + 2 * stepGap)) / 2;

        const steps = [
          { icon: '📱', title: '1. Buka Kamera HP', desc: 'Arahkan kamera ke barcode tanpa download aplikasi apapun' },
          { icon: '📸', title: '2. Jepret / Pilih Foto', desc: 'Ambil foto selfie atau foto bersama rombongan Anda' },
          { icon: '💖', title: '3. Album Kenangan', desc: 'Foto Anda tersimpan abadi di album pengantin!' },
        ];

        steps.forEach((step, idx) => {
          const x = startX + idx * (stepWidth + stepGap);

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#FBCFE8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, stepY, stepWidth, 160, 20);
          ctx.fill();
          ctx.stroke();

          // Icon
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(step.icon, x + stepWidth / 2, stepY + 45);

          // Step Title
          ctx.fillStyle = '#9F1239';
          ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillText(step.title, x + stepWidth / 2, stepY + 80);

          // Step Desc
          ctx.fillStyle = '#4B5563';
          ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const words = step.desc.split(' ');
          ctx.fillText(words.slice(0, 4).join(' '), x + stepWidth / 2, stepY + 110);
          ctx.fillText(words.slice(4).join(' '), x + stepWidth / 2, stepY + 130);
        });

        // 11. Romantic Love Quote & Invitation
        ctx.fillStyle = '#0A261D';
        ctx.font = 'italic 16px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('"Kehadiran dan senyuman Anda adalah kado terindah bagi hari bahagia kami"', canvas.width / 2, 1100);

        // 12. Direct Web Link
        ctx.fillStyle = '#6B7280';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Atau kunjungi langsung melalui browser HP Anda:', canvas.width / 2, 1180);

        ctx.fillStyle = '#E11D48';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(targetUrl, canvas.width / 2, 1210);

        ctx.fillStyle = '#9CA3AF';
        ctx.font = '12px sans-serif';
        ctx.fillText('Batas 5 Foto per Tamu • NikaHub Live Suite', canvas.width / 2, 1370);

        // 13. Trigger Download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'Standee-Meja-Hati-Foto-Alfarisyi-Maulidiyah.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setIsDownloading(false);
      };

      qrImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (err) {
      console.warn('Failed to download QR code standee:', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF5F5] border-2 border-[#E6CA92]/60 rounded-[32px] shadow-2xl overflow-hidden my-3 text-[#0A261D] max-h-[96vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-rose-100 bg-[#FAF9F5]/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#0A261D] leading-none">
                Barcode Meja Tamu Undangan
              </h3>
              <p className="text-[11px] text-[#881337] mt-0.5 font-medium">
                Alfarisyi & Maulidiyah • Scan untuk Berbagi Foto Bersama
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-all hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-center">
          {/* TAB PILIHAN DESAIN */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-rose-50/80 rounded-2xl border border-rose-200/60 max-w-xs mx-auto">
            <button
              onClick={() => setActiveDesignView('heart')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeDesignView === 'heart'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Model Hati Merah</span>
            </button>
            <button
              onClick={() => setActiveDesignView('floral')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeDesignView === 'floral'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kartu Bunga & Pasangan</span>
            </button>
          </div>

          {/* LUXURY STAND CARD (Preview Model Kartu Meja) */}
          <div
            ref={printableCardRef}
            className="relative p-5 sm:p-6 rounded-[28px] bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF5F5] border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden text-center"
          >
            {/* Corner Floral Motifs */}
            <div className="absolute top-2.5 left-2.5 text-xl select-none opacity-80">🌸</div>
            <div className="absolute top-2.5 right-2.5 text-xl select-none opacity-80">🌸</div>
            <div className="absolute bottom-2.5 left-2.5 text-xl select-none opacity-80">🌿</div>
            <div className="absolute bottom-2.5 right-2.5 text-xl select-none opacity-80">🌿</div>

            {/* Couple Photo Avatar & Names (Rame & Cantik) */}
            <div className="flex flex-col items-center mb-3">
              <div className="relative mb-2">
                {/* Circular Portrait of the Couple with Gold & Rose Ring */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-[#D4AF37] shadow-md p-0.5 bg-white">
                  <img
                    src={EVENT_INFO.coverImage}
                    alt="Alfarisyi & Maulidiyah"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white shadow-sm">
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#E11D48] text-[10px] font-bold uppercase tracking-wider mb-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Live Event Shared Gallery</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D] leading-tight">
                Alfarisyi & Maulidiyah
              </h2>
              <p className="font-serif italic text-xs text-[#8C7355] mt-0.5">
                {EVENT_INFO.eventDateText}
              </p>
            </div>

            {/* Warm Sweet Slogan (Memicu Tamu Mau Scan) */}
            <div className="py-1 px-2 mb-2">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#9F1239] leading-snug">
                "Abadikan Momen Manis Anda Bersama Kami!"
              </h4>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                Scan barcode hati di bawah untuk mengunggah foto selfie atau kebersamaan kita hari ini.
              </p>
            </div>

            {/* HEART SHAPED QR CODE CONTAINER (Persis Desain Referensi Gambar User) */}
            <div className="relative my-3 flex items-center justify-center">
              {/* Outer Decorative Heart Container */}
              <div className="relative p-3.5 sm:p-4 rounded-[36px] bg-white border-2 border-rose-400 shadow-xl inline-flex flex-col items-center">
                {/* Floating Heart Top Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#E11D48] text-white border border-white text-[11px] font-bold flex items-center gap-1.5 shadow-md whitespace-nowrap">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Scan Barcode Hati</span>
                </div>

                {/* HEART-SHAPED QR CODE RENDERER (Merah Menyala Persis Gambar User) */}
                <div
                  ref={qrRef}
                  className="relative p-3 bg-white rounded-3xl overflow-hidden flex items-center justify-center"
                  style={{
                    clipPath: activeDesignView === 'heart'
                      ? 'path("M 140 250 C 140 250 15 160 15 80 C 15 30 50 10 95 10 C 120 10 135 25 140 40 C 145 25 160 10 185 10 C 230 10 265 30 265 80 C 265 160 140 250 140 250 Z")'
                      : undefined,
                    width: activeDesignView === 'heart' ? '280px' : 'auto',
                    height: activeDesignView === 'heart' ? '260px' : 'auto',
                  }}
                >
                  <QRCodeSVG
                    value={targetUrl}
                    size={activeDesignView === 'heart' ? 240 : 200}
                    level="H"
                    fgColor="#E11D48" // Ruby Red matching user's image!
                    bgColor="#FFFFFF"
                    includeMargin={false}
                    imageSettings={{
                      src: heartCenterBadge,
                      height: 48,
                      width: 48,
                      excavate: true,
                    }}
                  />
                </div>

                {/* Bottom Romance Pin */}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-serif font-bold text-[#881337]">
                  <span>💖</span>
                  <span>Ahmad Ferdi & Nur Thoifah</span>
                  <span>💖</span>
                </div>
              </div>
            </div>

            {/* 3 Cheerful Steps Guide */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-rose-200/60 text-left">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-rose-100 text-center space-y-1 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mx-auto flex items-center justify-center">
                  📱
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Buka Kamera</div>
                <div className="text-[9px] text-gray-500 leading-tight">Arahkan HP ke QR</div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-rose-100 text-center space-y-1 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mx-auto flex items-center justify-center">
                  📸
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Pilih / Foto</div>
                <div className="text-[9px] text-gray-500 leading-tight">Momen terbaik Anda</div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-rose-100 text-center space-y-1 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mx-auto flex items-center justify-center">
                  💖
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Album Kenangan</div>
                <div className="text-[9px] text-gray-500 leading-tight">Tersimpan abadi!</div>
              </div>
            </div>
          </div>

          {/* Quick Copy Link Box */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-rose-200/80 shadow-2xs">
            <input
              type="text"
              readOnly
              value={targetUrl}
              className="flex-1 bg-transparent text-xs text-gray-600 px-3 truncate focus:outline-none font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-rose-50 text-[#881337] text-xs font-bold transition-all active:scale-95 border border-rose-200 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#E11D48]" />}
              <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
            </button>
          </div>

          {/* Action CTAs: Download Printable Card, Print, or Close */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            {/* Download Standee PNG (High Resolution Ready to Print) */}
            <button
              type="button"
              onClick={handleDownloadTableCardPng}
              disabled={isDownloading}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>{isDownloading ? 'Membuat Poster HD...' : 'Unduh Kartu Meja (PNG HD)'}</span>
            </button>

            {/* Print Directly */}
            <button
              type="button"
              onClick={handlePrint}
              className="py-3.5 px-4 rounded-2xl bg-white hover:bg-rose-50 text-[#0A261D] border border-rose-300 font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-rose-600" />
              <span>Cetak Standee / Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
