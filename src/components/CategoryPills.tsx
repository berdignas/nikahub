import React from 'react';
import { motion } from 'framer-motion';
import { ProductCategory } from '../types';
import { 
  Sparkles, 
  Tent, 
  UtensilsCrossed, 
  Crown, 
  Camera, 
  Building2, 
  Music, 
  Gift 
} from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORY_ITEMS: { id: ProductCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Semua Kategori', icon: Sparkles },
  { id: 'tenda', label: 'Tenda & Dekor', icon: Tent },
  { id: 'catering', label: 'Catering VIP', icon: UtensilsCrossed },
  { id: 'mua', label: 'MUA & Gaun', icon: Crown },
  { id: 'fotografi', label: 'Fotografi 4K', icon: Camera },
  { id: 'venue', label: 'Gedung Venue', icon: Building2 },
  { id: 'hiburan', label: 'MC & Hiburan', icon: Music },
  { id: 'souvenir', label: 'Souvenir', icon: Gift },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full overflow-x-auto pb-8 pt-4 no-scrollbar">
      <div className="flex items-center justify-start lg:justify-center gap-4 min-w-max px-4">
        {CATEGORY_ITEMS.map((cat, index) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 border ${
                isActive 
                  ? 'bg-emerald-950 border-emerald-950 shadow-xl shadow-emerald-950/20' 
                  : 'bg-white border-gray-200 hover:border-emerald-900/30 hover:shadow-md'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                isActive ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-emerald-50'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-champagne-400' : 'text-emerald-950/70'}`} />
              </div>
              
              <span className={`text-sm font-semibold tracking-wide whitespace-nowrap ${
                isActive ? 'text-sand' : 'text-emerald-950/80'
              }`}>
                {cat.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeCategoryBox"
                  className="absolute inset-0 rounded-2xl border-2 border-champagne-400/30 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
