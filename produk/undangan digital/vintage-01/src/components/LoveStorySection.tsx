import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CalendarHeart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { SectionCard } from './SectionCard';

export const LoveStorySection: React.FC = () => {
  return (
    <SectionCard id="cerita" className="bg-[#FAF6F0]/40">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-4 py-1 rounded-full border border-[#E6DCCE]">
            <CalendarHeart className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Kisah Bahagia</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mt-2 mb-2">
            Love Story
          </h2>
          <p className="text-xs md:text-sm text-[#66554B] font-light leading-relaxed">
            Untaian perjalanan cinta kami dari awal bertemu hingga mengikat janji suci
          </p>
        </motion.div>

        {/* Vertical Animated Timeline */}
        <div className="relative border-l-2 border-[#C5A059]/60 ml-4 sm:ml-8 space-y-10 pr-2">
          {INVITATION_DATA.loveStory.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative pl-7 group"
            >
              {/* Heart Dot Icon with Pulse Effect */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center text-[#8C6A43] shadow-md group-hover:scale-125 transition-transform duration-300">
                <Heart className="w-4 h-4 fill-[#C5A059] text-[#C5A059] animate-pulse" />
              </div>

              <div className="bg-[#FAF6F0]/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-[#E6DCCE] shadow-sm hover:border-[#C5A059] hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#8C6A43] px-2.5 py-0.5 rounded-full">
                    Chapter {index + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#3D312A]">
                    {story.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#66554B] leading-relaxed font-light">
                  {story.story}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionCard>
  );
};
