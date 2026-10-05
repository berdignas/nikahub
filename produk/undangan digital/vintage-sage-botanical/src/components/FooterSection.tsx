import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationData } from '../data/invitationData';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative py-16 px-6 bg-[#FAF9F5] text-center overflow-hidden">
      {/* Background Floral Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-20 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: 'url(./assets/VINT04-COVER-PII.webp)' }}
      />

      <div className="relative z-10 max-w-[380px] mx-auto flex flex-col items-center">
        {/* Arched Closing Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-40 h-52 rounded-t-[90px] rounded-b-2xl p-1.5 bg-gradient-to-b from-[#C2A676] via-[#767D63] to-[#51583D] shadow-xl mb-6 overflow-hidden"
        >
          <div className="w-full h-full rounded-t-[84px] rounded-b-xl overflow-hidden bg-[#FAF9F5]">
            <img
              src="./assets/sm-K-1-1-1.jpg"
              alt="Closing Couple"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Thank You Note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs text-[#686561] leading-relaxed mb-6 font-light max-w-[320px]"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami.
        </motion.p>

        <div className="w-20 my-2 mx-auto opacity-75">
          <img src="./assets/G2-ornamen.png" alt="Divider" className="w-full h-auto" />
        </div>

        {/* Closing Greetings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 mb-8"
        >
          <p className="font-serif italic text-xs text-[#767D63] tracking-widest uppercase mb-1">
            Kami yang berbahagia,
          </p>
          <h3 className="font-serif text-3xl font-bold text-[#2C2B29] tracking-wide mb-3">
            {invitationData.groom.name} & {invitationData.bride.name}
          </h3>
          <p className="text-xs font-serif text-[#51583D] font-medium">
            Beserta Keluarga Besar Kedua Mempelai
          </p>
        </motion.div>

        {/* Watermark / Branding */}
        <div className="pt-6 border-t border-[#C2A676]/30 w-full flex flex-col items-center">
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
        </div>
      </div>
    </footer>
  );
};
