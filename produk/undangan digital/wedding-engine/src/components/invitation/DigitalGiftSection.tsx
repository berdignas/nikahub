'use client';

import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, X, MapPin } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider } from '../animation/SvgVintageFrame';
import { BankAccount, PhysicalGiftAddress } from '@/types';

interface DigitalGiftSectionProps {
  title?: string;
  subtitle?: string;
  accounts: BankAccount[];
  physicalAddress?: PhysicalGiftAddress;
}

export function DigitalGiftSection({
  title = 'Wedding Gift',
  subtitle = 'Tanda Kasih & Doa Restu',
  accounts,
  physicalAddress,
}: DigitalGiftSectionProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedQR, setSelectedQR] = useState<BankAccount | null>(null);

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            {title}
          </h2>
          <VintageDivider />
          <p className="font-serif italic text-xs sm:text-sm text-vintage-700 max-w-md mx-auto mt-3">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara digital, Anda dapat melalui:
          </p>
        </div>
      </ScrollReveal>

      {/* Bank Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc, idx) => {
          const isCopied = copiedAccount === acc.accountNumber;

          return (
            <ScrollReveal key={idx} animation="scaleIn" delay={idx * 0.15}>
              <div className="p-6 rounded-3xl bg-cream/90 backdrop-blur-md border border-gold/40 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-serif font-bold text-vintage-900 tracking-wider text-lg">
                    {acc.bankName}
                  </span>
                  <Gift className="w-5 h-5 text-gold" />
                </div>

                <div className="my-2">
                  <span className="text-[11px] uppercase tracking-wider text-vintage-500 font-sans">
                    Nomor Rekening
                  </span>
                  <div className="font-mono text-lg sm:text-xl font-bold text-vintage-900 tracking-wider">
                    {acc.accountNumber}
                  </div>
                  <div className="text-xs font-serif text-vintage-700 mt-0.5">
                    a.n {acc.accountHolder}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gold/20">
                  <button
                    onClick={() => handleCopy(acc.accountNumber)}
                    className="flex-1 py-2 px-3 rounded-xl bg-vintage-800 hover:bg-vintage-900 text-gold-light text-xs font-serif tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin Nomor'}</span>
                  </button>

                  {acc.qrCodeUrl && (
                    <button
                      onClick={() => setSelectedQR(acc)}
                      className="py-2 px-3 rounded-xl bg-white border border-gold/40 text-vintage-800 text-xs font-serif tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5 text-gold" />
                      <span>QRIS</span>
                    </button>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Physical Gift Delivery Address */}
      {physicalAddress && (
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="mt-8 p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-gold/30 text-center">
            <div className="inline-flex items-center gap-2 text-vintage-900 font-serif font-semibold text-base mb-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Kirim Kado Fisik</span>
            </div>
            <p className="text-xs sm:text-sm text-vintage-700 font-serif leading-relaxed max-w-md mx-auto">
              Penerima: <span className="font-semibold text-vintage-900">{physicalAddress.recipientName}</span> ({physicalAddress.phone})
            </p>
            <p className="text-xs text-vintage-600 font-sans mt-1 max-w-sm mx-auto">
              {physicalAddress.address}
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* QRIS Modal */}
      {selectedQR && (
        <div
          onClick={() => setSelectedQR(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs p-6 rounded-3xl bg-cream border-2 border-gold text-center relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedQR(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-vintage-200 text-vintage-800 hover:bg-vintage-300"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl text-vintage-900 font-bold mb-1">
              QRIS {selectedQR.bankName}
            </h3>
            <p className="text-xs font-serif text-vintage-600 mb-4">
              a.n {selectedQR.accountHolder}
            </p>

            <div className="p-3 bg-white rounded-2xl border border-gold/40 inline-block shadow-inner">
              <img
                src={selectedQR.qrCodeUrl || '/assets/ornaments/wax-seal-gold.svg'}
                alt="QR Code"
                className="w-48 h-48 object-contain mx-auto"
              />
            </div>

            <p className="text-[11px] font-sans text-vintage-500 mt-3">
              Scan melalui BCA, GoPay, OVO, Dana, atau mobile banking lainnya
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
