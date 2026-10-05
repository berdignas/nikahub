import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Smile, Clock, Sparkles, Palette } from 'lucide-react';
import { SectionCard } from './SectionCard';

export const DressCodeSection: React.FC = () => {
  const colors = [
    { name: 'Warm Gold', hex: '#C5A059' },
    { name: 'Terracotta', hex: '#A65B49' },
    { name: 'Espresso', hex: '#3D312A' },
    { name: 'Vintage Cream', hex: '#F5EFE6' },
    { name: 'Soft Sage', hex: '#8C9A86' },
  ];

  const protocols = [
    {
      icon: Clock,
      title: 'Hadir Tepat Waktu',
      desc: 'Disarankan hadir 15 menit sebelum acara dimulai demi kelancaran prosesi.'
    },
    {
      icon: Shirt,
      title: 'Dresscode Formal',
      desc: 'Batik / Pakaian Formal bertema Warm Vintage & Earth Tone.'
    },
    {
      icon: Smile,
      title: 'Doa & Senyuman',
      desc: 'Membawa kebahagiaan, doa restu terbaik, dan keceriaan bersama.'
    },
  ];

  return (
    <SectionCard id="dresscode" className="bg-[#FAF6F0]/60">
      <div className="text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
            <span>Guest Protocol</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2 mb-2">
            Dress Code &amp; Panduan Tamu
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light max-w-md mx-auto leading-relaxed">
            Panduan kenyamanan &amp; rekomendasi warna busana untuk merayakan hari bahagia kami bersama
          </p>
        </motion.div>

        {/* Color Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border-2 border-[#E6DCCE] shadow-md mb-8 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#8C6A43] uppercase tracking-wider mb-4">
            <Palette className="w-4 h-4 text-[#C5A059]" />
            <span>Rekomendasi Warna Pakaian</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            {colors.map((c, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.15, y: -4 }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md transform transition-transform ring-2 ring-[#E6DCCE]/50"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[10px] font-medium text-[#66554B]">
                  {c.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {protocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-[#FAF6F0]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#E6DCCE] shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:border-[#C5A059] hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mb-3 text-[#8C6A43] shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3D312A] mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-[#66554B] font-light leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SectionCard>
  );
};
