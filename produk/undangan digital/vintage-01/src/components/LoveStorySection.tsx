import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const LoveStorySection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1 bg-white px-4 py-1 rounded-full border border-[#E6DCCE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Perjalanan Cinta Kami</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2">
            Love Story
          </h2>
        </motion.div>

        {/* Vertical Animated Timeline */}
        <div className="relative border-l-2 border-[#C5A059]/50 ml-4 md:ml-32 space-y-12 pr-2">
          {INVITATION_DATA.loveStory.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.7, type: "spring", stiffness: 100 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Heart Dot Icon with Pulse Effect */}
              <div className="absolute -left-[18px] top-0 w-9 h-9 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center text-[#8C6A43] shadow-md group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 fill-[#C5A059] text-[#C5A059] animate-pulse" />
              </div>

              <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#E6DCCE] shadow-vintage hover:border-[#C5A059] hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-[#8C6A43] mb-2 flex items-center gap-2">
                  <span>{story.title}</span>
                </h3>
                <p className="text-xs md:text-sm text-[#66554B] leading-relaxed font-light">
                  {story.story}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
