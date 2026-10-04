import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingProduct, ProductCategory } from '../types';
import { MAIN_CATEGORY_GROUPS } from '../data/mockData';
import { 
  Search, 
  Star, 
  MapPin, 
  ArrowUpRight, 
  ShoppingBag, 
  Camera, 
  Crown, 
  Tent, 
  UtensilsCrossed, 
  Smartphone, 
  Sparkles,
  SlidersHorizontal,
  Check,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface CatalogViewProps {
  products: WeddingProduct[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: WeddingProduct) => void;
  onQuickBook: (product: WeddingProduct) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 25 }
  }
};

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Find current group for sub-categories
  const currentGroup = MAIN_CATEGORY_GROUPS.find(g => g.id === activeCategory) || MAIN_CATEGORY_GROUPS[0];

  const handleSelectGroup = (groupId: string) => {
    onSelectCategory(groupId as ProductCategory);
    setActiveSubCategory('all');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Tent': return <Tent className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  // Product counts by category group
  const getProductCount = (groupId: string) => {
    if (groupId === 'all') return products.length;
    return products.filter(p => 
      p.category === groupId ||
      (groupId === 'fotografer' && (p.category as string) === 'fotografi') ||
      (groupId === 'fotografi' && (p.category as string) === 'fotografer') ||
      (groupId === 'undangan_digital' && (p.category as string) === 'undangan') ||
      (groupId === 'undangan' && (p.category as string) === 'undangan_digital')
    ).length;
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      // Category group match with alias support
      const matchesCat = 
        activeCategory === 'all' || 
        p.category === activeCategory ||
        (activeCategory === 'fotografer' && (p.category as string) === 'fotografi') ||
        (activeCategory === 'fotografi' && (p.category as string) === 'fotografer') ||
        (activeCategory === 'undangan_digital' && (p.category as string) === 'undangan') ||
        (activeCategory === 'undangan' && (p.category as string) === 'undangan_digital');

      // Sub-category match
      const matchesSub = 
        activeSubCategory === 'all' || 
        !p.subCategory ||
        p.subCategory === activeSubCategory ||
        (activeSubCategory === 'featured' && p.featured);

      // Search query match
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || [
        p.title,
        p.talentName,
        p.vendorName,
        p.tagline,
        p.description
      ].some(field => field && field.toLowerCase().includes(query));

      return matchesCat && matchesSub && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-24 overflow-hidden text-emerald-950 font-sans selection:bg-champagne-300">
      
      {/* Sleek Editorial Header */}
      <div className="relative h-[28vh] sm:h-[36vh] w-full flex items-center justify-center overflow-hidden bg-emerald-950">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80" 
          alt="Wedding Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-3xl mt-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-400/20 text-champagne-300 text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Atelier Resmi NikaHub
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            Katalog Layanan & Talenta
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Temukan profil fotografer handal, MUA berpengalaman, tenda arsitektural, dan katering istimewa dalam satu kendali terpadu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">

        {/* 1. FILTER KATALOG BERBENTUK DROPDOWN (TANPA GULIR KE SAMPING) */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-950/10 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            
            {/* Primary Category Group Dropdown Select */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-950/70 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-700" />
                Pilih Kategori Utama:
              </label>
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => handleSelectGroup(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-emerald-950/15 font-bold text-xs sm:text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 appearance-none cursor-pointer pr-10 shadow-xs"
                >
                  {MAIN_CATEGORY_GROUPS.map((group) => {
                    const count = getProductCount(group.id);
                    return (
                      <option key={group.id} value={group.id}>
                        {group.label} ({count} Layanan)
                      </option>
                    );
                  })}
                </select>
                <ChevronRight className="w-4 h-4 text-emerald-950/60 absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Sub-Category Dropdown Select */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-950/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne-700" />
                Filter Spesifik Sub-Kategori:
              </label>
              <div className="relative">
                <select
                  value={activeSubCategory}
                  onChange={(e) => setActiveSubCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 font-semibold text-xs sm:text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 appearance-none cursor-pointer pr-10 shadow-xs"
                >
                  {currentGroup.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="w-4 h-4 text-emerald-950/60 absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

          </div>

          {currentGroup.description && (
            <p className="text-[11px] text-gray-500 italic mt-3 pt-3 border-t border-gray-100">
              * {currentGroup.description}
            </p>
          )}
        </div>

        {/* 3. SEARCH & SORT TOOLBAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Cari di ${currentGroup.label}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-full bg-[#FAF9F5] border border-gray-200 text-xs font-medium text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-xs text-emerald-950/70 font-semibold">
              Menampilkan <strong>{filteredProducts.length}</strong> hasil
            </span>

            <div className="flex items-center gap-2 bg-[#FAF9F5] border border-gray-200 rounded-full px-3 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-700" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-emerald-950 focus:outline-none font-semibold cursor-pointer"
              >
                <option value="featured">Pilihan Unggulan</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-asc">Harga: Terendah</option>
                <option value="price-desc">Harga: Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. PRODUCT & TALENT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8 my-6">
            <Sparkles className="w-8 h-8 text-champagne-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-emerald-950">Layanan atau Talenta Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Tidak ada hasil yang sesuai dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain atau reset pilihan filter Anda.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveSubCategory('all'); onSelectCategory('all'); }}
              className="mt-4 px-5 py-2 rounded-full bg-emerald-950 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isTalent = product.category === 'fotografer' || product.category === 'mua';

                return (
                  <motion.div
                    key={product.id}
                    variants={cardVariant}
                    layout
                    className="group bg-white rounded-[2rem] border border-emerald-950/10 p-4 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      {/* Media image container with hover zoom */}
                      <div 
                        onClick={() => onSelectProduct(product)}
                        className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4 cursor-pointer"
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md text-[10px] font-bold text-sand shadow-sm flex items-center gap-1">
                            {product.category === 'fotografer' ? <Camera className="w-3 h-3 text-champagne-400" /> : product.category === 'mua' ? <Crown className="w-3 h-3 text-champagne-400" /> : <Sparkles className="w-3 h-3 text-champagne-400" />}
                            {product.badge || product.categoryLabel}
                          </span>

                          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-emerald-950 shadow-sm flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-current" />
                            {product.rating}
                          </span>
                        </div>

                        {/* Talent Avatar overlay (if Talent) */}
                        {isTalent && product.talentAvatar && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-2.5 bg-emerald-950/90 backdrop-blur-md p-1.5 pr-3.5 rounded-full text-white shadow-md">
                            <img 
                              src={product.talentAvatar} 
                              alt={product.talentName || ''} 
                              className="w-7 h-7 rounded-full object-cover border border-champagne-400"
                            />
                            <div className="text-[11px] font-bold leading-none">
                              <span>{product.talentName}</span>
                            </div>
                          </div>
                        )}

                        {/* Location pill */}
                        {!isTalent && (
                          <div className="absolute bottom-3 left-3 text-[11px] font-medium text-sand bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-champagne-400" />
                            {product.location}
                          </div>
                        )}
                      </div>

                      {/* Header Info */}
                      <div className="px-1 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-champagne-700 block mb-0.5">
                          {product.talentRole || product.vendorName}
                        </span>
                        <h3 
                          onClick={() => onSelectProduct(product)}
                          className="font-serif text-lg font-bold text-emerald-950 group-hover:text-champagne-700 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Style tags for talent */}
                      {product.styleTags && product.styleTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 px-1 mb-3">
                          {product.styleTags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium bg-[#F4F1EA] text-emerald-950/70 px-2 py-0.5 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pricing & Full Page Action Button */}
                    <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">Tarif Sewa</span>
                        <span className="font-serif text-base sm:text-lg font-bold text-emerald-950">
                          {formatRupiah(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onSelectProduct(product)}
                          className="px-4 py-2.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-sand text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:shadow-md"
                        >
                          <span>{product.liveDemoUrl ? 'Buka Live Undangan' : isTalent ? 'Buka Profil & Portofolio' : 'Detail'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-champagne-400" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};
