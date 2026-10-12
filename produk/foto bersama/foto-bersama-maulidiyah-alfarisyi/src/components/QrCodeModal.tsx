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
  // OPTIMIZED WITH EXTRA LARGE TEXT & EXTRA LARGE BARCODE (Mudah Dilihat & Dibaca Orang Tua)
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
        bgGrad.addColorStop(0.35, '#FAF6EE');
        bgGrad.addColorStop(1, '#FFF5F6');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Double Golden Frame (Lebih mepet ke tepi agar ruang dalam lebih luas dan tulisan bisa besar!)
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 6;
        ctx.strokeRect(26, 26, canvas.width - 52, canvas.height - 52);

        ctx.strokeStyle = '#E6CA92';
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

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

        drawFlowerCorner(70, 70, 0);
        drawFlowerCorner(canvas.width - 70, 70, Math.PI / 2);
        drawFlowerCorner(canvas.width - 70, canvas.height - 70, Math.PI);
        drawFlowerCorner(70, canvas.height - 70, (Math.PI * 3) / 2);

        // 4. Header Badge: FOTO BERSAMA & BUKU TAMU
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 230, 60, 460, 48, 24);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 LIVE FOTO BERSAMA & BUKU TAMU 💖', canvas.width / 2, 92);

        // 5. Couple Title (SANGAT BESAR & JELAS UNTUK ORANG TUA: 74px!)
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 74px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Alfarisyi & Maulidiyah', canvas.width / 2, 180);

        ctx.fillStyle = '#9F1239';
        ctx.font = 'bold 28px Georgia, serif';
        ctx.fillText('Selasa & Rabu, 13 - 14 Oktober 2026', canvas.width / 2, 224);

        // 6. Warm Sweet Invitation Headline (BESAR & TEBAL: 44px!)
        ctx.fillStyle = '#881337';
        ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Abadikan Momen Manis Bersama Kami!', canvas.width / 2, 290);

        ctx.fillStyle = '#374151';
        ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Scan Barcode di Bawah Ini dengan Kamera HP Anda ✨', canvas.width / 2, 332);

        // 7. CENTER SECTION: EXTRA LARGE QR CODE (DIBESARKAN DRASTIS DARI 400px KE 510px!)
        const qrCenterY = 665;
        const boxSize = 560; // Ukuran kotak putih QR
        const boxX = canvas.width / 2 - (boxSize / 2);
        const boxY = qrCenterY - (boxSize / 2);

        // Draw Big White Box for QR
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(225, 29, 72, 0.28)';
        ctx.shadowBlur = 35;
        ctx.shadowOffsetY = 12;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxSize, boxSize, 36);
        ctx.fill();

        ctx.strokeStyle = '#FDA4AF';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();

        // Draw QR Code inside box (Ukuran Ekstra Besar: 500 px!)
        const qrDrawSize = 500;
        ctx.drawImage(
          qrImg,
          canvas.width / 2 - (qrDrawSize / 2),
          qrCenterY - (qrDrawSize / 2),
          qrDrawSize,
          qrDrawSize
        );

        // Center Monogram Heart Emblem (DIGAMBAR LANGSUNG AGAR TIDAK BOLONG PUTIH!)
        const emblemRadius = 42;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, qrCenterY, emblemRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Heart inside emblem
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        const ehX = canvas.width / 2;
        const ehY = qrCenterY;
        const s = 34;
        ctx.moveTo(ehX, ehY - s * 0.15);
        ctx.bezierCurveTo(ehX - s * 0.5, ehY - s * 0.7, ehX - s, ehY - s * 0.1, ehX, ehY + s * 0.7);
        ctx.bezierCurveTo(ehX + s, ehY - s * 0.1, ehX + s * 0.5, ehY - s * 0.7, ehX, ehY - s * 0.15);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 15px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('A&M', ehX, ehY + 4);
        ctx.restore();

        // Top Badge on QR Code
        ctx.fillStyle = '#E11D48';
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 190, boxY - 24, 380, 48, 24);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 SCAN BARCODE KENANGAN 💖', canvas.width / 2, boxY + 7);

        // 8. DECORATIVE HEARTS ON BOTH SIDES (GAMBAR HATI DI SAMPING-SAMPINGNYA)
        const drawHeartIcon = (cx: number, cy: number, size: number, color: string) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(0, size * 0.3);
          ctx.bezierCurveTo(-size * 0.5, -size * 0.4, -size, size * 0.2, 0, size);
          ctx.bezierCurveTo(size, size * 0.2, size * 0.5, -size * 0.4, 0, size * 0.3);
          ctx.fill();
          ctx.restore();
        };

        // Left Side Hearts
        const leftHearts = [
          { y: qrCenterY - 170, s: 38, c: '#E11D48' },
          { y: qrCenterY - 80, s: 30, c: '#D4AF37' },
          { y: qrCenterY + 10, s: 44, c: '#F43F5E' },
          { y: qrCenterY + 100, s: 32, c: '#E11D48' },
          { y: qrCenterY + 180, s: 26, c: '#D4AF37' },
        ];
        leftHearts.forEach((h) => {
          drawHeartIcon(boxX - 52, h.y, h.s, h.c);
        });

        // Right Side Hearts
        const rightHearts = [
          { y: qrCenterY - 170, s: 38, c: '#E11D48' },
          { y: qrCenterY - 80, s: 30, c: '#D4AF37' },
          { y: qrCenterY + 10, s: 44, c: '#F43F5E' },
          { y: qrCenterY + 100, s: 32, c: '#E11D48' },
          { y: qrCenterY + 180, s: 26, c: '#D4AF37' },
        ];
        rightHearts.forEach((h) => {
          drawHeartIcon(boxX + boxSize + 52, h.y, h.s, h.c);
        });

        // 9. THREE CHEERFUL STEPS GUIDE (DIBUAT SANGAT BESAR & JELAS AGAR ORANG TUA MUDAH LIHAT!)
        const stepY = 1005;
        const stepWidth = 285;
        const stepGap = 20;
        const startX = (canvas.width - (3 * stepWidth + 2 * stepGap)) / 2;

        const steps = [
          { icon: '📱', title: '1. Buka Kamera HP', desc: 'Arahkan ke barcode' },
          { icon: '📸', title: '2. Jepret Foto', desc: 'Foto bersama / selfie' },
          { icon: '💖', title: '3. Masuk Album', desc: 'Tersimpan di album!' },
        ];

        steps.forEach((step, idx) => {
          const x = startX + idx * (stepWidth + stepGap);

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#FBCFE8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(x, stepY, stepWidth, 195, 26);
          ctx.fill();
          ctx.stroke();

          // Icon
          ctx.font = '48px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(step.icon, x + stepWidth / 2, stepY + 58);

          // Step Title (SANGAT BESAR: 26px BOLD!)
          ctx.fillStyle = '#9F1239';
          ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillText(step.title, x + stepWidth / 2, stepY + 108);

          // Step Desc (SANGAT BESAR & TEBAL: 22px!)
          ctx.fillStyle = '#374151';
          ctx.font = 'bold 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillText(step.desc, x + stepWidth / 2, stepY + 148);
        });

        // 10. Romantic Love Quote (BESAR & ELEGAN)
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold italic 22px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('"Kehadiran dan senyuman Anda adalah kado terindah bagi hari bahagia kami"', canvas.width / 2, 1270);

        // 11. Direct URL Footer (BESAR: 26px!)
        ctx.fillStyle = '#4B5563';
        ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Atau buka langsung link web:', canvas.width / 2, 1340);

        ctx.fillStyle = '#E11D48';
        ctx.font = 'bold 26px monospace';
        ctx.fillText(targetUrl, canvas.width / 2, 1380);

        ctx.fillStyle = '#9CA3AF';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('Ukuran Standee Meja: 8,5 × 13 cm • Batas 5 Foto per Tamu', canvas.width / 2, 1495);

        // 12. Trigger Download
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
                Alfarisyi & Maulidiyah • Tulisan & Barcode Ekstra Besar (Jelas untuk Orang Tua)
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
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 text-center">
          {/* STAND CARD (Ukuran Proporsional 8,5 cm x 13 cm - TULISAN BESAR) */}
          <div
            ref={printableCardRef}
            className="relative mx-auto w-full max-w-[380px] aspect-[8.5/13] p-4 sm:p-5 rounded-[28px] bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF5F6] border-2 border-[#D4AF37]/60 shadow-xl overflow-hidden flex flex-col justify-between text-center"
          >
            {/* Corner Floral Motifs */}
            <div className="absolute top-2 left-2 text-2xl select-none opacity-85">🌸</div>
            <div className="absolute top-2 right-2 text-2xl select-none opacity-85">🌸</div>
            <div className="absolute bottom-2 left-2 text-2xl select-none opacity-85">🌿</div>
            <div className="absolute bottom-2 right-2 text-2xl select-none opacity-85">🌿</div>

            {/* Top Section: Photo + Big Names */}
            <div>
              {/* Couple Photo Avatar */}
              <div className="relative inline-block mb-1">
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

              {/* Big Names: Alfarisyi & Maulidiyah (FONT BESAR & TEBAL) */}
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D] leading-tight">
                Alfarisyi & Maulidiyah
              </h2>
              <p className="font-serif font-bold text-xs sm:text-sm text-[#8C7355] mt-0.5">
                {EVENT_INFO.eventDateText}
              </p>

              {/* Big Headline (BESAR & TEBAL) */}
              <div className="mt-1.5 px-1">
                <h4 className="font-serif font-extrabold text-base sm:text-lg text-[#9F1239] leading-tight">
                  "Abadikan Momen Manis Anda!"
                </h4>
                <p className="text-xs sm:text-sm font-bold text-gray-700 leading-tight mt-1">
                  Scan Barcode di bawah dengan Kamera HP Anda ✨
                </p>
              </div>
            </div>

            {/* Middle Section: EXTRA LARGE QR CODE WITH HEARTS ON SIDES */}
            <div className="relative my-2 flex items-center justify-center gap-2 sm:gap-3">
              {/* Left Side Hearts Column */}
              <div className="flex flex-col items-center justify-center gap-2 select-none shrink-0">
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4.5 h-4.5 fill-rose-500 text-rose-500" />
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4.5 h-4.5 fill-[#E11D48] text-[#E11D48]" />
                </div>
                <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                </div>
              </div>

              {/* Center: BIG CLEAN QR CODE BOX */}
              <div className="relative p-2.5 sm:p-3 bg-white rounded-3xl shadow-xl border-2 border-rose-200/90 flex flex-col items-center">
                {/* Top Badge Pin on QR */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-0.5 rounded-full bg-[#E11D48] text-white border-2 border-white text-[11px] font-bold shadow-md whitespace-nowrap flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Scan Barcode Kenangan</span>
                </div>

                <div ref={qrRef} className="p-1 bg-white rounded-2xl flex items-center justify-center">
                  <QRCodeSVG
                    value={targetUrl}
                    size={205} // DIBESARKAN AGAR SANGAT MUDAH DILIHAT DARI MEJA!
                    level="H"
                    fgColor="#E11D48" // Ruby Red
                    bgColor="#FFFFFF"
                    includeMargin={false}
                    imageSettings={{
                      src: heartCenterBadge,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }}
                  />
                </div>

                {/* Couple Romance Tag */}
                <div className="mt-1 flex items-center gap-1.5 text-xs font-serif font-bold text-[#881337]">
                  <span>💖</span>
                  <span>Ahmad Ferdi & Nur Thoifah</span>
                  <span>💖</span>
                </div>
              </div>

              {/* Right Side Hearts Column */}
              <div className="flex flex-col items-center justify-center gap-2 select-none shrink-0">
                <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4.5 h-4.5 fill-[#E11D48] text-[#E11D48]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-4.5 h-4.5 fill-rose-500 text-rose-500" />
                </div>
                <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                </div>
              </div>
            </div>

            {/* Bottom Section: 3 Steps Guide (BESAR & TEBAL) */}
            <div>
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-rose-200/60 text-left">
                <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-xl">📱</div>
                  <div className="text-xs font-extrabold text-[#0A261D]">1. Buka Kamera</div>
                  <div className="text-[10px] font-bold text-gray-600 leading-tight">Arahkan ke QR</div>
                </div>

                <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-xl">📸</div>
                  <div className="text-xs font-extrabold text-[#0A261D]">2. Jepret Foto</div>
                  <div className="text-[10px] font-bold text-gray-600 leading-tight">Foto bersama</div>
                </div>

                <div className="p-1.5 sm:p-2 rounded-xl bg-white/95 border border-rose-100 text-center space-y-0.5 shadow-2xs">
                  <div className="text-xl">💖</div>
                  <div className="text-xs font-extrabold text-[#0A261D]">3. Masuk Album</div>
                  <div className="text-[10px] font-bold text-gray-600 leading-tight">Tersimpan abadi</div>
                </div>
              </div>

              <div className="mt-1.5 text-[10px] text-[#8C7355] font-bold tracking-wider uppercase">
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
              className="flex-1 bg-transparent text-xs text-gray-700 px-3 truncate focus:outline-none font-mono font-bold"
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
