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
  Share2,
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
  const qrRef = useRef<HTMLDivElement>(null);
  const printableCardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Canonical URL pointing directly to this live photo gallery
  const targetUrl = typeof window !== 'undefined'
    ? (window.location.origin + window.location.pathname)
    : 'https://nikahhub.my.id/foto-maulidiyah-alfarisyi';

  // Romantic Center Emblem for the QR Code
  const heartCenterBadge = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 88C48 88 14 62 14 34C14 20 23.5 10 36.5 10C43.5 10 47.5 14 50 18.5C52.5 14 56.5 10 63.5 10C76.5 10 86 20 86 34C86 62 52 88 50 88Z" fill="%23E11D48"/><path d="M50 78C48.5 78 22 56 22 34C22 23 29 16 38 16C43.5 16 47.5 19 50 22.5C52.5 19 56.5 16 62 16C71 16 78 23 78 34C78 56 51.5 78 50 78Z" fill="%23FFFFFF"/><circle cx="50" cy="45" r="14" fill="%23E11D48"/><text x="50" y="49" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">A%26M</text></svg>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate High-Resolution Printable Standee Table Card (1020 x 1560 px = Ratio 8.5 cm x 13 cm at 300 DPI)
  const handleDownloadTableCardPng = () => {
    try {
      setIsDownloading(true);
      const svgElement = qrRef.current?.querySelector('svg');
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const qrImg = new Image();

      // Exact ratio for 8.5 cm width x 13 cm height (1020 x 1560 px)
      canvas.width = 1020;
      canvas.height = 1560;

      qrImg.onload = () => {
        if (!ctx) return;

        // 1. Background Luxury Cream & Blush
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, '#FFFDF8');
        bgGrad.addColorStop(0.4, '#FAF6EF');
        bgGrad.addColorStop(1, '#FFF5F6');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Double Golden Frame
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
          ctx.ellipse(-24, -12, 28, 12, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(-12, -24, 28, 12, -1.1, 0, Math.PI * 2);
          ctx.fill();

          // Petals
          ctx.fillStyle = '#FDA4AF';
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#E11D48';
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFE4E6';
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        drawFlowerCorner(85, 85, 0);
        drawFlowerCorner(canvas.width - 85, 85, Math.PI / 2);
        drawFlowerCorner(canvas.width - 85, canvas.height - 85, Math.PI);
        drawFlowerCorner(85, canvas.height - 85, (Math.PI * 3) / 2);

        // 4. Background Floating Hearts
        const hearts = [
          { x: 140, y: 180, s: 22 },
          { x: 880, y: 190, s: 24 },
          { x: 120, y: 840, s: 26 },
          { x: 900, y: 860, s: 26 },
          { x: 140, y: 1240, s: 22 },
          { x: 880, y: 1260, s: 24 },
        ];
        hearts.forEach((h) => {
          ctx.save();
          ctx.font = `${h.s}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('💖', h.x, h.y);
          ctx.restore();
        });

        // 5. Header Badge: Standee Meja 8,5 x 13 cm
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 200, 75, 400, 44, 22);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 LIVE WEDDING PHOTO & GUESTBOOK 💖', canvas.width / 2, 103);

        // 6. Couple Title (Besar & Mewah)
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 50px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Alfarisyi & Maulidiyah', canvas.width / 2, 185);

        ctx.fillStyle = '#9F1239';
        ctx.font = 'italic 22px Georgia, serif';
        ctx.fillText('Selasa & Rabu, 13 - 14 Oktober 2026', canvas.width / 2, 225);

        // 7. Warm Sweet Invitation Headline (Besar & Menarik Perhatian)
        ctx.fillStyle = '#881337';
        ctx.font = 'bold 32px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Abadikan Momen Manis Anda Bersama Kami!', canvas.width / 2, 295);

        ctx.fillStyle = '#4B5563';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Scan Barcode Hati di Bawah Ini dengan Kamera HP Anda ✨', canvas.width / 2, 335);

        // 8. BIG HEART SHAPE WITH BARCODE BOX INSIDE (Warna merah solid di sekeliling kotak barcode)
        const heartCenterX = canvas.width / 2;
        const heartCenterY = 660;
        const heartW = 540;
        const heartH = 490;

        // Draw Big Red Solid Heart Shape
        ctx.save();
        ctx.beginPath();
        const topH = heartCenterY - 180;
        ctx.moveTo(heartCenterX, heartCenterY + 230);
        // Left side curve
        ctx.bezierCurveTo(
          heartCenterX - 340, heartCenterY + 80,
          heartCenterX - 340, topH,
          heartCenterX - 150, topH - 40
        );
        ctx.bezierCurveTo(
          heartCenterX - 55, topH - 40,
          heartCenterX, topH + 45,
          heartCenterX, topH + 70
        );
        // Right side curve
        ctx.bezierCurveTo(
          heartCenterX, topH + 45,
          heartCenterX + 55, topH - 40,
          heartCenterX + 150, topH - 40
        );
        ctx.bezierCurveTo(
          heartCenterX + 340, topH,
          heartCenterX + 340, heartCenterY + 80,
          heartCenterX, heartCenterY + 230
        );
        ctx.closePath();

        // Fill Solid Ruby Red Heart
        ctx.shadowColor = 'rgba(225, 29, 72, 0.45)';
        ctx.shadowBlur = 35;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = '#E11D48';
        ctx.fill();

        ctx.strokeStyle = '#BE123C';
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();

        // 9. White Box for Barcode inside the heart (Fit completely inside, tidak keluar dari shape hati)
        const boxSize = 350;
        const boxX = heartCenterX - (boxSize / 2);
        const boxY = heartCenterY - (boxSize / 2) + 20;

        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 4;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxSize, boxSize, 28);
        ctx.fill();

        ctx.strokeStyle = '#FFE4E6';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        // Draw QR Code inside the white box
        const qrDrawSize = 300;
        ctx.drawImage(
          qrImg,
          heartCenterX - (qrDrawSize / 2),
          boxY + (boxSize - qrDrawSize) / 2,
          qrDrawSize,
          qrDrawSize
        );

        // Top Pin on Heart
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(heartCenterX - 160, heartCenterY - 215, 320, 38, 19);
        ctx.fill();
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#E11D48';
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 SCAN BARCODE HATI 💖', heartCenterX, heartCenterY - 190);

        // 10. Three Cheerful Steps Guide (Lebih Besar & Jelas)
        const stepY = 1010;
        const stepWidth = 270;
        const stepGap = 25;
        const startX = (canvas.width - (3 * stepWidth + 2 * stepGap)) / 2;

        const steps = [
          { icon: '📱', title: '1. Buka Kamera HP', desc: 'Arahkan kamera ke barcode tanpa unduh aplikasi apapun' },
          { icon: '📸', title: '2. Ambil / Pilih Foto', desc: 'Jepret foto selfie atau pilih foto kebersamaan Anda' },
          { icon: '💖', title: '3. Masuk Album', desc: 'Foto tersimpan abadi di album kenangan pengantin!' },
        ];

        steps.forEach((step, idx) => {
          const x = startX + idx * (stepWidth + stepGap);

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#FBCFE8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, stepY, stepWidth, 175, 22);
          ctx.fill();
          ctx.stroke();

          // Icon
          ctx.font = '36px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(step.icon, x + stepWidth / 2, stepY + 50);

          // Step Title
          ctx.fillStyle = '#9F1239';
          ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillText(step.title, x + stepWidth / 2, stepY + 90);

          // Step Desc
          ctx.fillStyle = '#4B5563';
          ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const words = step.desc.split(' ');
          ctx.fillText(words.slice(0, 4).join(' '), x + stepWidth / 2, stepY + 122);
          ctx.fillText(words.slice(4).join(' '), x + stepWidth / 2, stepY + 144);
        });

        // 11. Romantic Love Quote
        ctx.fillStyle = '#0A261D';
        ctx.font = 'italic 18px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('"Kehadiran dan senyuman Anda adalah kado terindah bagi hari bahagia kami"', canvas.width / 2, 1260);

        // 12. Direct URL Footer
        ctx.fillStyle = '#6B7280';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Atau buka langsung melalui browser HP Anda:', canvas.width / 2, 1340);

        ctx.fillStyle = '#E11D48';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(targetUrl, canvas.width / 2, 1375);

        ctx.fillStyle = '#9CA3AF';
        ctx.font = '13px sans-serif';
        ctx.fillText('Ukuran Standee 8,5 x 13 cm • Batas 5 Foto per Tamu • NikaHub Atelier', canvas.width / 2, 1490);

        // 13. Trigger Download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'Standee-Meja-8.5x13cm-Alfarisyi-Maulidiyah.png';
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
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF5F6] border-2 border-[#E6CA92]/60 rounded-[32px] shadow-2xl overflow-hidden my-3 text-[#0A261D] max-h-[96vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-rose-100 bg-[#FAF9F5]/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#0A261D] leading-none">
                Barcode Meja Tamu (Ukuran 8,5 × 13 cm)
              </h3>
              <p className="text-[11px] text-[#881337] mt-0.5 font-medium">
                Alfarisyi & Maulidiyah • Siap Cetak untuk Akrilik Meja
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
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 text-center">
          {/* STAND CARD (Ukuran Proporsional 8,5 cm x 13 cm) */}
          <div
            ref={printableCardRef}
            className="relative mx-auto w-full max-w-[370px] aspect-[8.5/13] p-4 sm:p-5 rounded-[28px] bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF5F6] border-2 border-[#D4AF37]/60 shadow-xl overflow-hidden flex flex-col justify-between text-center"
          >
            {/* Corner Floral Motifs */}
            <div className="absolute top-2 left-2 text-xl select-none opacity-80">🌸</div>
            <div className="absolute top-2 right-2 text-xl select-none opacity-80">🌸</div>
            <div className="absolute bottom-2 left-2 text-xl select-none opacity-80">🌿</div>
            <div className="absolute bottom-2 right-2 text-xl select-none opacity-80">🌿</div>

            {/* Top Section: Photo + Big Names */}
            <div>
              {/* Couple Photo Avatar */}
              <div className="relative inline-block mb-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md p-0.5 bg-white mx-auto">
                  <img
                    src={EVENT_INFO.coverImage}
                    alt="Alfarisyi & Maulidiyah"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center border border-white shadow-xs">
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              </div>

              {/* Big Names: Alfarisyi & Maulidiyah */}
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D] leading-tight">
                Alfarisyi & Maulidiyah
              </h2>
              <p className="font-serif italic text-xs text-[#8C7355]">
                {EVENT_INFO.eventDateText}
              </p>

              {/* Big Headline */}
              <div className="mt-1.5 px-2">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#9F1239] leading-snug">
                  "Abadikan Momen Manis Anda Bersama Kami!"
                </h4>
                <p className="text-[11px] text-gray-600 leading-tight mt-0.5">
                  Scan Barcode Hati di bawah untuk mengunggah foto Anda ✨
                </p>
              </div>
            </div>

            {/* Middle Section: SOLID RED HEART WITH BARCODE BOX SAFELY INSIDE */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="relative w-[260px] h-[235px] sm:w-[280px] sm:h-[250px] flex items-center justify-center">
                {/* SVG Siluet Hati Merah Penuh (Solid Red Heart) */}
                <svg
                  viewBox="0 0 320 290"
                  className="absolute inset-0 w-full h-full drop-shadow-lg"
                >
                  {/* Outer Red Heart Fill */}
                  <path
                    d="M 160 280
                       C 160 280, 20 190, 20 100
                       C 20 35, 75 8, 130 8
                       C 150 8, 160 25, 160 38
                       C 160 25, 170 8, 190 8
                       C 245 8, 300 35, 300 100
                       C 300 190, 160 280, 160 280 Z"
                    fill="#E11D48"
                  />
                  {/* Subtle Golden Outline */}
                  <path
                    d="M 160 274
                       C 160 274, 25 186, 25 100
                       C 25 39, 77 14, 130 14
                       C 148 14, 160 28, 160 40
                       C 160 28, 172 14, 190 14
                       C 243 14, 295 39, 295 100
                       C 295 186, 160 274, 160 274 Z"
                    fill="none"
                    stroke="#FFD1DC"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* White Barcode Box Fit Perfectly Inside (Tidak keluar dari shape hati) */}
                <div
                  ref={qrRef}
                  className="relative z-10 p-2.5 sm:p-3 bg-white rounded-2xl shadow-md border-2 border-rose-100 flex items-center justify-center"
                  style={{
                    width: '170px',
                    height: '170px',
                    marginTop: '15px',
                  }}
                >
                  <QRCodeSVG
                    value={targetUrl}
                    size={146}
                    level="H"
                    fgColor="#E11D48" // Ruby Red
                    bgColor="#FFFFFF"
                    includeMargin={false}
                    imageSettings={{
                      src: heartCenterBadge,
                      height: 38,
                      width: 38,
                      excavate: true,
                    }}
                  />
                </div>

                {/* Top Badge Pin on Heart */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-full bg-white text-[#E11D48] border border-rose-300 text-[10px] font-bold shadow-xs whitespace-nowrap flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#E11D48]" />
                  <span>Barcode Hati Meja</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: 3 Steps Guide (Besar & Jelas) */}
            <div>
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-rose-200/60 text-left">
                <div className="p-1.5 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-base">📱</div>
                  <div className="text-[10px] font-bold text-[#0A261D]">Buka Kamera</div>
                  <div className="text-[8.5px] text-gray-500 leading-tight">Arahkan ke QR</div>
                </div>

                <div className="p-1.5 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-base">📸</div>
                  <div className="text-[10px] font-bold text-[#0A261D]">Pilih / Foto</div>
                  <div className="text-[8.5px] text-gray-500 leading-tight">Momen terbaik</div>
                </div>

                <div className="p-1.5 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-base">💖</div>
                  <div className="text-[10px] font-bold text-[#0A261D]">Masuk Album</div>
                  <div className="text-[8.5px] text-gray-500 leading-tight">Tersimpan abadi</div>
                </div>
              </div>

              <div className="mt-1 text-[9px] text-[#8C7355] font-semibold tracking-wider uppercase">
                Ukuran Standee Meja: 8,5 × 13 cm
              </div>
            </div>
          </div>

          {/* Direct Link Copy Box */}
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

          {/* Action CTAs: Download Standee PNG (8.5 x 13 cm) or Print */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            {/* Download Standee PNG (8.5 x 13 cm Print-Ready) */}
            <button
              type="button"
              onClick={handleDownloadTableCardPng}
              disabled={isDownloading}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>{isDownloading ? 'Membuat Standee 8,5×13cm...' : 'Unduh Standee (8,5 × 13 cm)'}</span>
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
