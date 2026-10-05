import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Smile, Clock, Sparkles } from 'lucide-react';

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
      desc: 'Disarankan hadir 15 menit sebelum acara dimulai'
    },
    {
      icon: Shirt,
      title: 'Dresscode Formal',
      desc: 'Batik / Pakaian Formal bertema Warm Vintage'
    },
    {
      icon: Smile,
      title: 'Doa & Senyuman',
      desc: 'Membawa kebahagiaan & doa restu terbaik'
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            Guest Protocol
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mb-3">
            Dress Code &amp; Informasi Tamu
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light">
            Panduan kenyamanan &amp; rekomendasi warna pakaian untuk para tamu undangan
          </p>
        </motion.div>

        {/* Color Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage mb-10 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8C6A43] uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Rekomendasi Warna Pakaian</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            {colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 group">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md transform group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[10px] font-medium text-[#66554B] opacity-80">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#E6DCCE] shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center mb-3 text-[#8C6A43]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3D312A] mb-1">
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
    </section>
  );
};
