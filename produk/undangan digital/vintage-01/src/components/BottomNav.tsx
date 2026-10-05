import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Image as ImageIcon, MessageSquare } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'mempelai', label: 'Mempelai', icon: Users, href: '#mempelai' },
    { id: 'acara', label: 'Acara', icon: Calendar, href: '#acara' },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon, href: '#galeri' },
    { id: 'ucapan', label: 'Ucapan', icon: MessageSquare, href: '#ucapan' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-white/80 backdrop-blur-md border border-[#E6DCCE] rounded-full p-1.5 shadow-gold flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1.5 px-3 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-[#8C6A43] text-white shadow-sm'
                : 'text-[#66554B] hover:text-[#8C6A43]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">
              {item.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};
