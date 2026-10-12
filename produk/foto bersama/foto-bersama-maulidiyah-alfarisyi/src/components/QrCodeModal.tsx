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
  Ban,
  CheckCircle2,
  Tv,
  Share2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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

  // Romantic Heart SVG Data URI embedded in the center of QR code
  const heartCenterBadge = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 88C48 88 12 62 12 34C12 20 22.5 10 36 10C43.5 10 47.5 14 50 18.5C52.5 14 56.5 10 64 10C77.5 10 88 20 88 34C88 62 52 88 50 88Z" fill="%230A261D" stroke="%23D4AF37" stroke-width="4"/><path d="M50 78C48.5 78 20 56 20 34C20 23 27.5 15 37 15C43 15 47 18.5 50 22C53 18.5 57 15 63 15C72.5 15 80 23 80 34C80 56 51.5 78 50 78Z" fill="%23D4AF37"/><circle cx="50" cy="44" r="14" fill="%230A261D"/><text x="50" y="48" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="%23FAF9F5" text-anchor="middle">A%26M</text></svg>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTableCardPng = () => {
    try {
      setIsDownloading(true);
      const svgElement = qrRef.current?.querySelector('svg');
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      // High-resolution Printable Standee / Table Card (900 x 1280 px - standard A6/A5 ratio)
      canvas.width = 900;
      canvas.height = 1280;

      img.onload = () => {
        if (!ctx) return;

        // 1. Background Cream Ivory
        ctx.fillStyle = '#FAF9F5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Luxury Golden Double Border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 8;
        ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

        ctx.strokeStyle = '#E6CA92';
        ctx.lineWidth = 2;
        ctx.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);

        // Corner Ornamental Flourishes
        const drawCornerHeart = (x: number, y: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.fillStyle = '#C5A880';
          ctx.font = '24px serif';
          ctx.textAlign = 'center';
          ctx.fillText('❦', 0, 8);
          ctx.restore();
        };
        drawCornerHeart(60, 60);
        drawCornerHeart(canvas.width - 60, 60);
        drawCornerHeart(60, canvas.height - 60);
        drawCornerHeart(canvas.width - 60, canvas.height - 60);

        // 3. Top Decorative Badge
        ctx.fillStyle = '#0A261D';
        ctx.beginPath();
        ctx.roundRect(canvas.width / 2 - 160, 68, 320, 36, 18);
        ctx.fill();

        ctx.fillStyle = '#E6CA92';
        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨ LIVE WEDDING GUESTBOOK & PHOTO ✨', canvas.width / 2, 91);

        // 4. Couple Names
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Alfarisyi & Maulidiyah', canvas.width / 2, 160);

        // Event date text
        ctx.fillStyle = '#8C7355';
        ctx.font = 'italic 18px Georgia, serif';
        ctx.fillText('Selasa & Rabu, 13 - 14 Oktober 2026', canvas.width / 2, 192);

        // 5. ANTI-PAYMENT / ANTI-QRIS PROMINENT BADGE (Agar Tidak Dikira Link Pembayaran)
        ctx.fillStyle = '#FEF2F2';
        ctx.strokeStyle = '#F87171';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(110, 222, canvas.width - 220, 68, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#991B1B';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🚫 BUKAN KODE PEMBAYARAN / BUKAN QRIS', canvas.width / 2, 250);

        ctx.fillStyle = '#166534';
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('✅ 100% GRATIS • SCAN UNTUK MENGUNGGAH FOTO BERSAMA', canvas.width / 2, 274);

        // 6. Draw Big Heart Silhouette Frame for the QR Code
        const qrBoxY = 310;
        const qrSize = 360;
        const qrCenterX = canvas.width / 2;
        const qrCenterY = qrBoxY + 220;

        // Heart background shape in luxury gold tint
        ctx.save();
        ctx.beginPath();
        const topCurveHeight = 130;
        ctx.moveTo(qrCenterX, qrCenterY - 200 + topCurveHeight);
        ctx.bezierCurveTo(
          qrCenterX, qrCenterY - 250,
          qrCenterX - 250, qrCenterY - 250,
          qrCenterX - 250, qrCenterY - 200 + topCurveHeight
        );
        ctx.bezierCurveTo(
          qrCenterX - 250, qrCenterY + 100,
          qrCenterX, qrCenterY + 200,
          qrCenterX, qrCenterY + 250
        );
        ctx.bezierCurveTo(
          qrCenterX, qrCenterY + 200,
          qrCenterX + 250, qrCenterY + 100,
          qrCenterX + 250, qrCenterY - 200 + topCurveHeight
        );
        ctx.bezierCurveTo(
          qrCenterX + 250, qrCenterY - 250,
          qrCenterX, qrCenterY - 250,
          qrCenterX, qrCenterY - 200 + topCurveHeight
        );
        ctx.closePath();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 10;
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#D4AF37';
        ctx.stroke();
        ctx.restore();

        // 7. Draw QR Code inside the heart container
        ctx.drawImage(img, qrCenterX - (qrSize / 2), qrBoxY + 40, qrSize, qrSize);

        // 8. Instruction Title & Slogan
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 26px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Abadikan Momen Bahagia Anda Bersama Kami!', canvas.width / 2, 850);

        ctx.fillStyle = '#555555';
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Arahkan kamera smartphone Anda ke kode barcode di atas', canvas.width / 2, 882);

        // 9. Three Steps Guide Box
        const stepY = 920;
        const stepWidth = 220;
        const stepGap = 20;
        const startX = (canvas.width - (3 * stepWidth + 2 * stepGap)) / 2;

        const steps = [
          { num: '1', title: 'Buka Kamera HP', desc: 'Scan barcode di atas tanpa download aplikasi' },
          { num: '2', title: 'Pilih / Jepret Foto', desc: 'Ambil momen terbaik Anda di acara kami' },
          { num: '3', title: 'Tayang di Layar TV', desc: 'Foto Anda tampil langsung di proyektor' },
        ];

        steps.forEach((step, idx) => {
          const x = startX + idx * (stepWidth + stepGap);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#E6CA92';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(x, stepY, stepWidth, 140, 16);
          ctx.fill();
          ctx.stroke();

          // Step circle badge
          ctx.fillStyle = '#0A261D';
          ctx.beginPath();
          ctx.arc(x + stepWidth / 2, stepY + 32, 18, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#E6CA92';
          ctx.font = 'bold 15px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(step.num, x + stepWidth / 2, stepY + 38);

          // Step title
          ctx.fillStyle = '#0A261D';
          ctx.font = 'bold 14px sans-serif';
          ctx.fillText(step.title, x + stepWidth / 2, stepY + 75);

          // Step desc
          ctx.fillStyle = '#666666';
          ctx.font = '12px sans-serif';
          const words = step.desc.split(' ');
          ctx.fillText(words.slice(0, 3).join(' '), x + stepWidth / 2, stepY + 100);
          ctx.fillText(words.slice(3).join(' '), x + stepWidth / 2, stepY + 118);
        });

        // 10. Direct URL footer
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Atau kunjungi langsung melalui browser HP Anda:', canvas.width / 2, 1100);

        ctx.fillStyle = '#8C7355';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(targetUrl, canvas.width / 2, 1125);

        ctx.fillStyle = '#A3A3A3';
        ctx.font = '11px sans-serif';
        ctx.fillText('Maksimal 5 Foto Per Tamu • Powered by NikaHub Live Suite', canvas.width / 2, 1200);

        // 11. Trigger Download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'Standee-Meja-Foto-Alfarisyi-Maulidiyah.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setIsDownloading(false);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (err) {
      console.warn('Failed to download QR code standee:', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-[#E6CA92]/50 rounded-3xl shadow-2xl overflow-hidden my-4 text-[#0A261D] max-h-[96vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-gray-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-200 shadow-xs">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#0A261D] leading-none">
                QR Code Kartu Meja Tamu
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Desain khusus standee meja pernikahan & anti-salah paham
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
          {/* ANTI-SALAH PAHAM BANNER (Sangat Menyelamatkan Tamu) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-emerald-50 border-2 border-red-300 shadow-xs text-left flex items-start gap-3">
            <div className="p-2 rounded-xl bg-red-600 text-white shrink-0 mt-0.5 shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-red-700 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Ban className="w-3 h-3" /> Bukan QRIS / Pembayaran
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Gratis
                </span>
              </div>
              <p className="text-xs text-[#0A261D] font-bold leading-tight">
                Abadikan Momen Bahagia Anda Bersama Kami!
              </p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Scan kode barcode ini menggunakan kamera HP untuk mengunggah foto Anda bersama <strong className="text-[#0A261D]">Alfarisyi & Maulidiyah</strong>. Foto Anda akan langsung tampil di layar proyektor & tersimpan abadi di album pengantin.
              </p>
            </div>
          </div>

          {/* LUXURY STAND CARD (Preview Model Kartu Meja) */}
          <div
            ref={printableCardRef}
            className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#FAF9F5] via-white to-[#F5F2E9] border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden text-center"
          >
            {/* Elegant Corner Motifs */}
            <div className="absolute top-2 left-2 text-[#C5A880] text-xs">❦</div>
            <div className="absolute top-2 right-2 text-[#C5A880] text-xs">❦</div>
            <div className="absolute bottom-2 left-2 text-[#C5A880] text-xs">❦</div>
            <div className="absolute bottom-2 right-2 text-[#C5A880] text-xs">❦</div>

            {/* Couple Title */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#E6CA92]/60 text-[#0A261D] text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Live Event Shared Gallery</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0A261D]">
                Alfarisyi & Maulidiyah
              </h2>
              <p className="font-serif italic text-xs text-[#8C7355]">
                Selasa & Rabu, 13 - 14 Oktober 2026
              </p>
            </div>

            {/* HEART SHAPED FRAME HOLDER FOR QR CODE */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Heart SVG Background Decorative Glow */}
              <div className="relative p-5 sm:p-6 rounded-[36px] bg-white border-2 border-[#D4AF37] shadow-xl inline-flex flex-col items-center">
                {/* Heart Top Accent Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0A261D] text-[#E6CA92] border border-[#D4AF37] text-[10px] font-bold flex items-center gap-1.5 shadow-md whitespace-nowrap">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>Scan Kode Kenangan</span>
                </div>

                {/* Scannable High-Precision QR Code with Excavated Heart Emblem */}
                <div ref={qrRef} className="p-2 bg-white rounded-2xl">
                  <QRCodeSVG
                    value={targetUrl}
                    size={190}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: heartCenterBadge,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }}
                  />
                </div>

                {/* Heart Bottom Accent Pin */}
                <div className="mt-2 flex items-center gap-1 text-[11px] font-serif font-bold text-[#0A261D]">
                  <span className="text-[#C5A880]">✦</span>
                  <span>Ahmad Ferdi & Nur Thoifah</span>
                  <span className="text-[#C5A880]">✦</span>
                </div>
              </div>
            </div>

            {/* Instruction Tagline */}
            <p className="font-serif font-bold text-base text-[#0A261D]">
              "Scan & Bagikan Foto Terbaik Anda Bersama Kami!"
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Arahkan kamera smartphone ke barcode di atas (Tanpa unduh aplikasi)
            </p>

            {/* 3 Quick Step Icons */}
            <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-[#E6CA92]/30 text-left">
              <div className="p-2 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mx-auto flex items-center justify-center">
                  1
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Buka Kamera</div>
                <div className="text-[9px] text-gray-500 leading-tight">Arahkan HP ke QR</div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold mx-auto flex items-center justify-center">
                  2
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Unggah Foto</div>
                <div className="text-[9px] text-gray-500 leading-tight">Pilih 1-5 momen</div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-gray-200 text-center space-y-1 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold mx-auto flex items-center justify-center">
                  3
                </div>
                <div className="text-[10px] font-bold text-[#0A261D]">Tayang di TV</div>
                <div className="text-[9px] text-gray-500 leading-tight">Tampil di layar pesta</div>
              </div>
            </div>
          </div>

          {/* Quick Copy Link Box */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF9F5] border border-gray-200">
            <input
              type="text"
              readOnly
              value={targetUrl}
              className="flex-1 bg-transparent text-xs text-gray-600 px-3 truncate focus:outline-none font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#0A261D] text-xs font-bold transition-all active:scale-95 border border-gray-200 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
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
              className="py-3 px-4 rounded-2xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-[#E6CA92]" />
              <span>{isDownloading ? 'Membuat Gambar HD...' : 'Unduh Kartu Meja (PNG HD)'}</span>
            </button>

            {/* Print Directly */}
            <button
              type="button"
              onClick={handlePrint}
              className="py-3 px-4 rounded-2xl bg-white hover:bg-[#FAF9F5] text-[#0A261D] border border-[#D4AF37]/50 font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#C5A880]" />
              <span>Cetak Standee / Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
