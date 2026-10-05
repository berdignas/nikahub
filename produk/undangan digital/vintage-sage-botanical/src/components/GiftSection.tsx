import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, MapPin, Sparkles } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const GiftSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyAccount = (accountNum: string, index: number) => {
    const cleanNum = accountNum.replace(/\s+/g, '');
    navigator.clipboard.writeText(cleanNum);
    setCopiedIndex(index);
    showToast(`Nomor rekening ${cleanNum} berhasil disalin!`);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAddress = (addressText: string) => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    showToast('Alamat penerima berhasil disalin!');
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="gift" className="relative py-18 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      <div className="relative z-10 max-w-[400px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#767D63]/15 text-[#51583D] text-xs font-semibold uppercase tracking-widest mb-3">
            <Gift className="w-3.5 h-3.5 text-[#C2A676]" />
            <span>Wedding Gift</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#2C2B29] tracking-wide mb-2">
            Tanda Kasih
          </h2>
          <p className="text-xs text-[#686561] leading-relaxed max-w-[320px] mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara digital atau fisik.
          </p>
          <div className="w-24 my-2.5 mx-auto opacity-75">
            <img src="./assets/G2-ornamen.png" alt="" className="w-full h-auto" />
          </div>
        </motion.div>

        {/* ATM Debit Cards List */}
        <div className="w-full space-y-5 mb-8">
          {invitationData.bankAccounts.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 }}
              className="relative w-full rounded-3xl p-6 text-left text-white shadow-xl overflow-hidden border border-[#C2A676]/40"
              style={{
                backgroundImage: 'url(./assets/bg-bank-1-1-3-1-1.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-[#2A3122]/75 backdrop-blur-[2px] pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-44">
                {/* Top Row: Bank & Chip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="./assets/chip-atm-1-2-1-1-1-3-1-1.png"
                      alt="EMV Chip"
                      className="w-10 h-10 object-contain drop-shadow"
                    />
                    <Sparkles className="w-4 h-4 text-[#E8D8BA]/70" />
                  </div>
                  <span className="font-serif font-extrabold text-xl tracking-wider text-[#E8D8BA]">
                    {card.bank}
                  </span>
                </div>

                {/* Center: Account Number */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#E8D8BA]/80 mb-0.5">
                    Nomor Rekening
                  </p>
                  <p className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-white">
                    {card.accountNumber}
                  </p>
                </div>

                {/* Bottom Row: Holder & Copy Button */}
                <div className="flex items-end justify-between pt-2 border-t border-white/15">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/70">
                      Atas Nama
                    </p>
                    <p className="font-serif font-semibold text-sm text-[#FAF9F5] tracking-wide">
                      {card.accountHolder}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyAccount(card.accountNumber, idx)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8D8BA] text-[#2C2B29] text-xs font-bold shadow hover:bg-white active:scale-95 transition-all"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Box */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full p-6 rounded-3xl bg-[#EEF0E9] border border-[#C2A676]/45 shadow-lg text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#51583D] text-[#E8D8BA] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#2C2B29]">
                Kirim Kado Fisik
              </h4>
              <p className="text-[11px] text-[#767D63] font-medium">
                Alamat Pengiriman Kado
              </p>
            </div>
          </div>

          <div className="space-y-1 text-xs text-[#444241] mb-4 bg-white/85 p-4 rounded-2xl border border-[#C2A676]/30">
            <p className="font-semibold text-[#2C2B29]">
              Penerima: {invitationData.physicalGift.recipient}
            </p>
            <p className="text-[#686561]">No. HP: {invitationData.physicalGift.phone}</p>
            <p className="text-[#686561] leading-relaxed pt-1">
              {invitationData.physicalGift.address}, {invitationData.physicalGift.city}
            </p>
          </div>

          <button
            onClick={() =>
              handleCopyAddress(
                `${invitationData.physicalGift.recipient} (${invitationData.physicalGift.phone}) - ${invitationData.physicalGift.address}, ${invitationData.physicalGift.city}`
              )
            }
            className="w-full py-2.5 px-4 rounded-full bg-[#51583D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3D4730] transition-colors shadow"
          >
            {copiedAddress ? (
              <>
                <Check className="w-4 h-4 text-[#E8D8BA]" />
                <span>Alamat Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#E8D8BA]" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#2C2B29] text-[#FAF9F5] text-xs font-medium shadow-2xl border border-[#C2A676]/60 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#E8D8BA]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
