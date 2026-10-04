import React, { useState, useRef } from 'react';
import { X, QrCode, Copy, Check, Download, Printer, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Exact canonical URL pointing to this live photo gallery
  const targetUrl = typeof window !== 'undefined'
    ? (window.location.origin + window.location.pathname)
    : 'https://nikahhub.my.id/foto-maulidiyah-alfarisyi';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQrPng = () => {
    try {
      setIsDownloading(true);
      const svgElement = qrRef.current?.querySelector('svg');
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      // Card dimensions for printable luxury card
      canvas.width = 600;
      canvas.height = 760;

      img.onload = () => {
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#FAF9F5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Gold border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        ctx.strokeStyle = '#E6CA92';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

        // Title
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 32px "Playfair Display", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Alfarisyi & Maulidiyah', canvas.width / 2, 85);

        // Subtitle
        ctx.fillStyle = '#8C7355';
        ctx.font = 'italic 16px Georgia, serif';
        ctx.fillText('Live Foto Bersama & Tamu Undangan', canvas.width / 2, 115);

        // Draw QR Code in white rounded box
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(90, 145, 420, 420);
        ctx.drawImage(img, 110, 165, 380, 380);

        // Instruction Text below
        ctx.fillStyle = '#0A261D';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Scan QR untuk Buka Galeri & Upload Foto', canvas.width / 2, 605);

        ctx.fillStyle = '#666666';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText('Batas 5 Foto per Perangkat Tamu', canvas.width / 2, 635);

        // URL text at bottom
        ctx.fillStyle = '#999999';
        ctx.font = '12px monospace';
        ctx.fillText(targetUrl, canvas.width / 2, 690);

        // Trigger download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'QR-Meja-Foto-Alfarisyi-Maulidiyah.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setIsDownloading(false);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (err) {
      console.warn('Failed to download QR code:', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-sm bg-white border border-[#E6CA92]/40 rounded-3xl shadow-2xl overflow-hidden p-6 text-center text-[#0A261D]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-all hover:bg-gray-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E6CA92]/40 text-[#0A261D] text-[10px] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-bold uppercase tracking-wider">QR Code Galeri Acara</span>
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#0A261D]">
            Alfarisyi & Maulidiyah
          </h3>
          <p className="font-serif italic text-xs text-gray-500 mt-1">
            Scan QR ini dengan kamera HP untuk langsung membuka galeri dan mengunggah foto bersama.
          </p>
        </div>

        {/* Big Scannable QR Code */}
        <div ref={qrRef} className="p-4 bg-white rounded-3xl shadow-md inline-block mb-4 border border-[#E6CA92]/40">
          <QRCodeSVG
            value={targetUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Link Copy Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF9F5] border border-gray-200 mb-4">
          <input
            type="text"
            readOnly
            value={targetUrl}
            className="flex-1 bg-transparent text-xs text-gray-600 px-2 truncate focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#0A261D] text-xs font-bold transition-all active:scale-95 border border-gray-200 shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <button
            onClick={handleDownloadQrPng}
            disabled={isDownloading}
            className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E6CA92]" />
            <span>{isDownloading ? 'Mengunduh...' : 'Unduh QR'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
