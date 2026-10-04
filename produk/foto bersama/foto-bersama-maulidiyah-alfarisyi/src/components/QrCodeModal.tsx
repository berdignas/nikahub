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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1a2217] border border-[#685c46]/50 rounded-3xl shadow-2xl overflow-hidden p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#20291e] text-[#b8c4ae] hover:text-[#f8f6e1] flex items-center justify-center transition-all hover:bg-[#2f3b2d]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20291e] border border-[#685c46]/40 text-[#b8c4ae] text-[11px] font-sans-ui mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d8cca8]" />
            <span>Kartu Akses QR Meja Tamu</span>
          </div>
          <h3 className="font-aston text-3xl text-[#f8f6e1]">
            Maulidiyah & Alfarisyi
          </h3>
          <p className="font-roman italic text-xs text-[#ece5da]/80">
            Scan untuk mengunggah foto bersama (Maks. 5 Foto per Tamu)
          </p>
        </div>

        {/* Big Scannable QR Code */}
        <div className="p-6 bg-white rounded-3xl shadow-2xl inline-block mb-5 border-4 border-[#ece5da]">
          <QRCodeSVG
            value={currentUrl}
            size={210}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Link Copy Bar */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#161c14] border border-[#685c46]/30 mb-5 font-sans-ui">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent text-[11px] text-[#b8c4ae] px-2 truncate focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20291e] hover:bg-[#2f3b2d] text-[#f8f6e1] text-xs transition-all active:scale-95 border border-[#685c46]/40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d8cca8]" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 font-sans-ui text-xs">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#20291e] border border-[#685c46]/40 text-[#f8f6e1] hover:border-[#b8c4ae] transition-all"
          >
            <Printer className="w-4 h-4 text-[#d8cca8]" />
            <span>Cetak Kartu Meja</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 rounded-xl bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-semibold hover:scale-102 transition-all shadow-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
