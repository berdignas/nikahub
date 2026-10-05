import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Gift, Copy, Check, Sparkles, Send } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { SectionCard } from './SectionCard';

export const GiftSection: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = (text: string, type: 'bank' | 'address') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <SectionCard id="hadiah" className="bg-[#FAF6F0]/50">
      <div className="text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Wedding Gift</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2 mb-2">
            Amplop Digital &amp; Kado
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah tanda kasih, Anda dapat mengirimkan kado atau amplop digital melalui:
          </p>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto items-stretch">
          
          {/* Bank Account Digital Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[#3D312A] to-[#1E1714] text-white p-6 sm:p-7 rounded-3xl border border-[#C5A059]/40 shadow-xl relative overflow-hidden text-left flex flex-col justify-between"
          >
            {/* Background pattern */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Sparkles className="w-48 h-48 text-[#C5A059]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E6DCCE]">
                  <img 
                    src={INVITATION_DATA.digitalGift.bank.logo} 
                    alt="BCA Logo" 
                    className="h-6 object-contain"
                  />
                </div>
                <div className="w-10 h-7 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] border border-[#C5A059]/60 shadow-sm flex items-center justify-center">
                  <div className="w-6 h-4 border border-[#3D312A]/40 rounded-sm opacity-60" />
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <p className="text-[10px] text-[#C5A059] uppercase font-mono tracking-widest">
                  Nomor Rekening
                </p>
                <p className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-[#FAF6F0]">
                  {INVITATION_DATA.digitalGift.bank.accountNumber}
                </p>
                <p className="text-xs text-white/80 font-medium tracking-wide uppercase pt-1">
                  a.n {INVITATION_DATA.digitalGift.bank.accountName}
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(INVITATION_DATA.digitalGift.bank.accountNumber, 'bank')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#8C6A43] to-[#C5A059] hover:from-[#5C4033] hover:to-[#8C6A43] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              {copiedBank ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>No. Rekening Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin No. Rekening</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Physical Parcel Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="bg-white/95 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border-2 border-[#E6DCCE] shadow-md flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center text-[#8C6A43]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D312A]">
                    Kirim Kado Fisik
                  </h3>
                  <p className="text-[11px] text-[#8C6A43]">Alamat Pengiriman Kado</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#66554B] mb-6 bg-[#FAF6F0] p-4 rounded-xl border border-[#E6DCCE]">
                <p><span className="font-bold text-[#3D312A]">Penerima:</span> {INVITATION_DATA.digitalGift.physicalGift.recipientName}</p>
                <p><span className="font-bold text-[#3D312A]">Telepon:</span> {INVITATION_DATA.digitalGift.physicalGift.phone}</p>
                <p><span className="font-bold text-[#3D312A]">Alamat:</span> {INVITATION_DATA.digitalGift.physicalGift.address}</p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(INVITATION_DATA.digitalGift.physicalGift.address, 'address')}
              className="w-full py-3 px-4 rounded-xl border-2 border-[#8C6A43] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </motion.div>

        </div>

      </div>
    </SectionCard>
  );
};
