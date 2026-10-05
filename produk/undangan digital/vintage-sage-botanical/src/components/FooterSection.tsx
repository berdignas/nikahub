import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationData } from '../data/invitationData';
import { BotanicalCornerDecor } from './BotanicalCornerDecor';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-12 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      {/* Background Floral Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url(./assets/VINT04-COVER-PII.webp)' }}
      />

      {/* Swaying Botanical Corners */}
      <BotanicalCornerDecor showTop={true} showBottom={false} showMid={false} />

      <div className="relative z-10 max-w-[380px] mx-auto flex flex-col items-center">
        {/* Top Arch Flower Crown */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-48 sm:w-56 mb-[-18px] z-20 pointer-events-none filter drop-shadow-md animate-sway-tl origin-top"
        >
          <img
            src="./assets/bunga_header_arch.png"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Arched Closing Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative w-44 h-56 rounded-t-[100px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C2A676] via-[#767D63] to-[#51583D] shadow-2xl mb-6 overflow-hidden"
        >
          <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden bg-[#FAF9F5]">
            <img
              src="./assets/sm-K-1-1-1.jpg"
              alt="Closing Couple"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Thank You Note */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-xs text-[#686561] leading-relaxed mb-4 font-light max-w-[320px]"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami.
        </motion.p>

        {/* Divider Flourish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.3, delay: 0.35 }}
          className="w-24 my-2 mx-auto opacity-80"
        >
          <img
            src="./assets/G2-ornamen.png"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Closing Greetings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40% 0px", amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-4 mb-6"
        >
          <p className="font-serif italic text-xs text-[#767D63] tracking-widest uppercase mb-1">
            Kami yang berbahagia,
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2B29] tracking-wide mb-2">
            {invitationData.groom.name} & {invitationData.bride.name}
          </h3>
          <p className="text-xs font-serif text-[#51583D] font-medium">
            Beserta Keluarga Besar Kedua Mempelai
          </p>
        </motion.div>

        {/* Grand Bottom Botanical Base Arch / Wreath */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -30% 0px", amount: 0.2 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="w-64 sm:w-80 my-4 pointer-events-none filter drop-shadow-md animate-sway-bl origin-bottom"
        >
          <img
            src="./assets/bunga-akhir-tema-01-new-1-1-2.webp"
            alt="Bottom Floral Base"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-auto mx-auto object-contain"
          />
        </motion.div>

        {/* Watermark / Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.15 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="pt-4 border-t border-[#C2A676]/30 w-full flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#767D63] font-medium">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>oleh</span>
            <a
              href="https://nikahhub.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#51583D] hover:text-[#C2A676] transition-colors"
            >
              NikahHub
            </a>
          </div>
          <p className="text-[10px] text-[#8C867A] mt-1">
            © 2026 NikahHub. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
