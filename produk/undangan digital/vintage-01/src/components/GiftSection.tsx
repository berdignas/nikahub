import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Gift, Copy, Check } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

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
    <section className="py-20 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            Wedding Gift
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mb-3">
            Amplop Digital
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
          </p>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Bank Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white via-white to-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <img 
                  src={INVITATION_DATA.digitalGift.bank.logo} 
                  alt="BCA Logo" 
                  className="h-8 object-contain"
                />
                <img 
                  src="./images/chip.png" 
                  alt="Chip ATM" 
                  className="w-10 object-contain"
                />
              </div>

              <div className="text-left mb-6">
                <p className="text-xs text-[#66554B] uppercase font-medium tracking-wider mb-1">
                  No. Rekening
                </p>
                <p className="font-mono text-2xl font-bold text-[#3D312A] tracking-wider mb-1">
                  {INVITATION_DATA.digitalGift.bank.accountNumber}
                </p>
                <p className="text-xs text-[#8C6A43] font-semibold uppercase">
                  a.n {INVITATION_DATA.digitalGift.bank.accountName}
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(INVITATION_DATA.digitalGift.bank.accountNumber, 'bank')}
              className="w-full py-3 px-4 rounded-xl bg-[#8C6A43] hover:bg-[#5C4033] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {copiedBank ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  <span>No. Rekening Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy No. Rekening</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Physical Parcel Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-white via-white to-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center text-[#8C6A43]">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#3D312A]">
                  Kirim Hadiah
                </h3>
              </div>

              <div className="space-y-2 text-xs text-[#66554B] mb-6">
                <p><span className="font-semibold text-[#3D312A]">Penerima:</span> {INVITATION_DATA.digitalGift.physicalGift.recipientName}</p>
                <p><span className="font-semibold text-[#3D312A]">No. HP:</span> {INVITATION_DATA.digitalGift.physicalGift.phone}</p>
                <p><span className="font-semibold text-[#3D312A]">Alamat:</span> {INVITATION_DATA.digitalGift.physicalGift.address}</p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(INVITATION_DATA.digitalGift.physicalGift.address, 'address')}
              className="w-full py-3 px-4 rounded-xl border border-[#8C6A43] text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Alamat Penerima</span>
                </>
              )}
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
