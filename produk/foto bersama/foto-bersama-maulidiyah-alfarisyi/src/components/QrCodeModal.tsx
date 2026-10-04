import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Printer, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden p-6 text-center text-[#0A261D]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-all hover:bg-gray-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E6CA92]/40 text-[#0A261D] text-[11px] font-sans mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Kartu Akses QR Meja Tamu</span>
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#0A261D]">
            Maulidiyah & Alfarisyi
          </h3>
          <p className="font-serif italic text-xs text-gray-500 mt-1">
            Scan untuk mengunggah foto bersama (Maks. 5 Foto per Tamu)
          </p>
        </div>

        {/* Big Scannable QR Code */}
        <div className="p-6 bg-white rounded-3xl shadow-xl inline-block mb-5 border border-gray-200">
          <QRCodeSVG
            value={currentUrl}
            size={210}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Link Copy Bar */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#FAF9F5] border border-gray-200 mb-5 font-sans">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-xs text-gray-600 px-2 truncate focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#0A261D] text-xs font-bold transition-all active:scale-95 border border-gray-200 shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 font-sans text-xs">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#FAF9F5] border border-gray-200 text-[#0A261D] font-bold hover:bg-white hover:border-[#0A261D] transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#C5A880]" />
            <span>Cetak Kartu Meja</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 rounded-full bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] font-bold hover:scale-102 transition-all shadow-md cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
