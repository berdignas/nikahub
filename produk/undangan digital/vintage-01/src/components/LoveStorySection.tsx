import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const LoveStorySection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A]">
            Love Story
          </h2>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#C5A059]/40 ml-4 md:ml-32 space-y-12 pr-4">
          {INVITATION_DATA.loveStory.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Heart Dot Icon */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#FAF6F0] border-2 border-[#C5A059] flex items-center justify-center text-[#8C6A43]">
                <Heart className="w-3.5 h-3.5 fill-[#C5A059]" />
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-[#E6DCCE] shadow-vintage">
                <h3 className="font-serif text-xl font-bold text-[#8C6A43] mb-2">
                  {story.title}
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
