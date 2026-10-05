import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Calendar, Heart, Image, Gift, MessageSquare } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Cover', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'story', label: 'Cerita', icon: Heart },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'gift', label: 'Hadiah', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[380px]"
    >
      <div className="flex items-center justify-around py-2.5 px-3 rounded-full bg-[#1A1D16]/90 backdrop-blur-lg border border-[#C2A676]/45 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center gap-0.5 p-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'text-[#E8D8BA] scale-110' : 'text-[#A0A694] hover:text-[#E8D8BA]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#C2A676]"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
