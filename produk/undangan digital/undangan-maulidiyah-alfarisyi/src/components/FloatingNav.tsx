import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Heart, Image as ImageIcon, Gift, MessageSquare } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'couple', label: 'Mempelai', icon: Users },
  { id: 'event', label: 'Acara', icon: Calendar },
  { id: 'story', label: 'Kisah', icon: Heart },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
  { id: 'gift', label: 'Hadiah', icon: Gift },
  { id: 'rsvp', label: 'Ucapan', icon: MessageSquare },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full viding-card shadow-2xl border border-[#685c46]/40 max-w-fit backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-2.5 py-1.5 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'text-[#f8f6e1]'
                  : 'text-[#685c46] hover:text-[#473c27]'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-[#473c27] -z-10 shadow-sm transition-all duration-300"></div>
              )}
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-cinzel tracking-tight mt-0.5 hidden xs:inline">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
