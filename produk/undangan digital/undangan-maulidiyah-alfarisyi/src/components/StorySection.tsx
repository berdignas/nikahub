import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { THEME_ASSETS } from '../data/themeAssets';
import { RoyalPeacockPair } from './PeacockOrnaments';

export const StorySection: React.FC = () => {
  return (
    <section 
      id="story" 
      className="relative min-h-[980px] flex flex-col justify-between items-center text-center overflow-hidden bg-cover bg-center py-12 px-4"
      style={{ backgroundImage: `url(${THEME_ASSETS.storyBg})` }}
    >
      {/* 1. Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[#b8c4ae]/85 pointer-events-none"></div>

      {/* 2. Draped Green Velvet Curtain at Top */}
      <div className="absolute top-0 inset-x-0 z-20 pointer-events-none">
        <img src={THEME_ASSETS.curtainTop} alt="Curtain" className="w-full object-contain drop-shadow-md" />
      </div>

      {/* 3. Animated Blooming Foliage & Waving Roses */}
      <div className="absolute top-20 -left-14 w-52 z-10 pointer-events-none opacity-90">
        <img src={THEME_ASSETS.foliageGif1} alt="Roses" className="w-full object-contain" />
      </div>
      <div className="absolute top-24 -right-14 w-52 z-10 pointer-events-none opacity-90 transform -scale-x-100">
        <img src={THEME_ASSETS.foliageGif3} alt="Floral" className="w-full object-contain" />
      </div>

      {/* 4. Animated Flying Bird & Fluttering Butterfly */}
      <div className="absolute top-36 right-4 w-16 pointer-events-none z-20">
        <img src={THEME_ASSETS.butterflyGif} alt="Butterfly" className="w-full object-contain" />
      </div>
      <div className="absolute top-48 left-4 w-20 pointer-events-none z-20">
        <img src={THEME_ASSETS.birdGif} alt="Bird" className="w-full object-contain" />
      </div>

      {/* 5. Central Story Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-20 w-full max-w-sm pt-28 pb-8 px-4 flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#f8f6e1] border border-[#685c46]/30 mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
          <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#685c46] font-semibold">
            Memories & Destiny
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#685c46]" />
        </div>

        <h2 className="font-aston text-4xl sm:text-5xl text-[#473c27] mb-4">
          Our Love Story
        </h2>

        {/* Narrative Paragraph in Viding 183 Style */}
        <div className="viding-card rounded-[28px] p-5 sm:p-6 border border-[#685c46]/35 shadow-lg mb-6 text-center">
          <Heart className="w-5 h-5 text-[#685c46] fill-[#685c46]/20 mx-auto mb-2" />
          <p className="font-roman text-sm text-[#473c27] italic leading-relaxed">
            "Setiap pertemuan adalah lukisan takdir yang terukir indah di halaman takdir ilahi. Dari sapaan hangat, canda tawa sederhana, hingga restu tulus kedua orang tua yang menuntun langkah kami. Kini, di hadapan insan-insan terkasih, kami bersiap melayarkan bahtera rumah tangga, saling mencintai dan menjaga hingga ke surga-Nya."
          </p>
        </div>

        {/* Story Photo with Gold Arched Border */}
        <div className="w-full aspect-[4/5] sm:aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl border-4 border-[#f8f6e1] relative group">
          <img
            src="/gallery/photo-2.jpeg"
            alt="A Journey of Two Souls in Love"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="font-cinzel text-xs text-[#f8f6e1] tracking-[0.2em] uppercase drop-shadow-lg font-semibold">
              A Journey of Two Souls in Love
            </span>
          </div>
        </div>

        <RoyalPeacockPair className="max-w-[220px] mt-6" />
      </motion.div>

      {/* 6. Bottom Scalloped Divider */}
      <div className="relative z-30 w-full mt-auto">
        <img src={THEME_ASSETS.scallopDivider} alt="Scallop" className="w-full object-cover h-14 -mb-1" />
      </div>

    </section>
  );
};
