import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Copy, Check, CreditCard, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { RoyalPeacockPair } from './PeacockOrnaments';
import { INVITATION_DATA } from '../data/invitationData';

export const GiftSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);
  const [showPhysicalAddress, setShowPhysicalAddress] = useState<boolean>(false);

  const handleCopy = (text: string, type: 'bank' | 'address', bankNum?: string) => {
    navigator.clipboard.writeText(text);

    // Cheerful celebration confetti when copying gift account
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E65C7B', '#52B788', '#F8C3CD', '#FFD166']
    });

    if (type === 'bank' && bankNum) {
      setCopiedAccount(bankNum);
      setTimeout(() => setCopiedAccount(null), 3500);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 3500);
    }
  };

  return (
    <section 
      id="gift" 
      className="relative min-h-[900px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center py-16 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.couplePalaceBg})` }}
    >
      {/* Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[#b8c4ae]/85 pointer-events-none"></div>

      {/* Animated Foliage & Birds */}
      <div className="absolute top-10 -left-12 w-48 pointer-events-none z-10 opacity-90">
        <img src={THEME_ASSETS.foliageGif3} alt="Floral" className="w-full object-contain" />
      </div>
      <div className="absolute top-12 -right-12 w-48 pointer-events-none z-10 opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif3} alt="Floral" className="w-full object-contain" />
      </div>

      <div className="absolute top-48 right-3 w-20 pointer-events-none z-20">
        <img src={THEME_ASSETS.birdGif} alt="Bird" className="w-full object-contain" />
      </div>

      <div className="relative z-20 w-full max-w-sm flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 mb-2 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#685c46]" />
            <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#685c46] font-semibold">
              Wedding Registry
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
          </div>

          <h2 className="font-aston text-4xl sm:text-5xl text-[#473c27] mt-1 mb-2">
            Tanda Kasih
          </h2>
          <p className="font-roman text-sm text-[#51482d] italic max-w-xs mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang hendak memberikan tanda kasih, dapat melalui:
          </p>
          <div className="w-20 h-[1px] bg-[#685c46]/30 mx-auto mt-3"></div>
        </motion.div>

        {/* 1. Creative Interactive Amplop Digital Button & Collapsible Card */}
        <div className="w-full mb-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="w-full py-4 px-5 rounded-[28px] viding-card border-2 border-[#685c46]/40 shadow-xl flex items-center justify-between text-left relative overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#473c27] text-[#f8f6e1] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#473c27] tracking-wider uppercase">
                  Amplop Digital (Transfer Bank)
                </h4>
                <p className="font-roman text-xs text-[#685c46] italic mt-0.5">
                  {showBankDetails ? 'Klik untuk menyembunyikan' : 'Klik untuk melihat nomor rekening'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 flex items-center justify-center shadow-sm">
              <ChevronDown className={`w-4 h-4 text-[#685c46] transition-transform duration-300 ${showBankDetails ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>

          {/* Unfolding Bank Account Details */}
          <AnimatePresence>
            {showBankDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden mt-3 space-y-3"
              >
                {INVITATION_DATA.bankAccounts.map((account, index) => {
                  const isCopied = copiedAccount === account.accountNumber;

                  return (
                    <div
                      key={index}
                      className="relative rounded-[28px] p-5 shadow-2xl border-2 border-[#685c46]/40 overflow-hidden text-left bg-gradient-to-br from-[#f8f6e1] via-[#ece5da] to-[#f8f6e1]"
                    >
                      {/* Gold Leaf Background Decor */}
                      <div className="absolute -right-4 -bottom-4 w-28 opacity-25 pointer-events-none">
                        <img src={THEME_ASSETS.goldLeafBranch} alt="Leaf" className="w-full object-contain" />
                      </div>

                      {/* Card Header: Chip & Bank Name */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-6 rounded-md bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 border border-amber-500 shadow-sm flex items-center justify-center">
                            <div className="w-5 h-3.5 border border-amber-700/40 rounded-sm"></div>
                          </div>
                          <CreditCard className="w-4 h-4 text-[#685c46]" />
                        </div>
                        <span className="font-cinzel text-xs font-bold text-[#473c27] tracking-wider uppercase">
                          BANK {account.bankName}
                        </span>
                      </div>

                      {/* Account Number & Holder */}
                      <div className="my-2">
                        <p className="font-cinzel text-lg sm:text-xl font-bold text-[#473c27] tracking-widest font-mono">
                          {account.accountNumber}
                        </p>
                        <p className="font-cinzel text-[11px] text-[#685c46] tracking-wider uppercase mt-0.5 font-semibold">
                          a.n. {account.accountHolder}
                        </p>
                      </div>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(account.accountNumber.replace(/\s+/g, ''), 'bank', account.accountNumber)}
                        className={`mt-3 w-full py-2 px-4 rounded-full text-xs font-cinzel tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer ${
                          isCopied
                            ? 'bg-[#2d5a37] text-white border border-[#2d5a37]'
                            : 'viding-btn hover:bg-[#473c27] hover:text-[#f8f6e1]'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Nomor Rekening Tersalin! 🌸</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#685c46]" />
                            <span>Salin Nomor Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Creative Interactive Physical Gift Button & Collapsible Card */}
        <div className="w-full mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPhysicalAddress(!showPhysicalAddress)}
            className="w-full py-4 px-5 rounded-[28px] viding-card border-2 border-[#685c46]/40 shadow-xl flex items-center justify-between text-left relative overflow-hidden group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#685c46] text-[#f8f6e1] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#473c27] tracking-wider uppercase">
                  Kirim Kado Fisik
                </h4>
                <p className="font-roman text-xs text-[#685c46] italic mt-0.5">
                  {showPhysicalAddress ? 'Klik untuk menyembunyikan' : 'Klik untuk melihat alamat pengiriman'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 flex items-center justify-center shadow-sm">
              <ChevronDown className={`w-4 h-4 text-[#685c46] transition-transform duration-300 ${showPhysicalAddress ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>

          {/* Unfolding Physical Gift Address Card */}
          <AnimatePresence>
            {showPhysicalAddress && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden mt-3"
              >
                <div className="w-full viding-card rounded-[28px] p-5 border-2 border-[#685c46]/40 shadow-2xl text-center relative bg-[#f8f6e1]/95">
                  <div className="flex items-center justify-center gap-1.5 mb-1 text-[#473c27]">
                    <MapPin className="w-4 h-4 text-[#685c46]" />
                    <h4 className="font-cinzel text-xs sm:text-sm font-bold uppercase">
                      Alamat Pengiriman Kado
                    </h4>
                  </div>

                  <p className="font-cinzel text-xs font-bold text-[#685c46] mt-2">
                    Penerima: {INVITATION_DATA.giftAddress.recipient}
                  </p>
                  <p className="font-roman text-xs text-[#51482d] my-2 leading-relaxed italic">
                    {INVITATION_DATA.giftAddress.address}
                  </p>

                  <button
                    onClick={() => handleCopy(INVITATION_DATA.giftAddress.address, 'address')}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-cinzel tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
                      copiedAddress
                        ? 'bg-[#2d5a37] text-white'
                        : 'viding-btn hover:bg-[#473c27] hover:text-[#f8f6e1]'
                    }`}
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300 inline mr-1" />
                        <span>Alamat Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#685c46] inline mr-1" />
                        <span>Salin Alamat Kirim</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Blooming Foliage & Birds At Bottom Gap */}
        <div className="absolute bottom-16 -left-12 w-48 pointer-events-none z-10 opacity-90">
          <img src={THEME_ASSETS.foliageGif1} alt="Floral" className="w-full object-contain" />
        </div>
        <div className="absolute bottom-16 -right-12 w-48 pointer-events-none z-10 opacity-90 transform -scale-x-100">
          <img src={THEME_ASSETS.foliageGif2} alt="Floral" className="w-full object-contain" />
        </div>
        <div className="absolute bottom-32 left-4 w-16 pointer-events-none z-20">
          <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
        </div>
        <div className="absolute bottom-36 right-4 w-20 pointer-events-none z-20">
          <img src={THEME_ASSETS.birdGif} alt="Bird" className="w-full object-contain" />
        </div>

        <RoyalPeacockPair className="max-w-[240px] mt-4" />
      </div>

      {/* Bottom Scalloped Divider */}
      <div className="relative z-30 w-full mt-auto">
        <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
      </div>

    </section>
  );
};
