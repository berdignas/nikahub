import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingProduct, ProductCategory } from '../types';
import { 
  Star, 
  Heart, 
  MapPin, 
  Users, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface ProductCatalogProps {
  products: WeddingProduct[];
  activeCategory: ProductCategory;
  onSelectProduct: (product: WeddingProduct) => void;
  onQuickBook: (product: WeddingProduct) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectProduct,
  onQuickBook,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort products
  const filteredProducts = products
    .filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="katalog-section" className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-emerald-950 flex items-center gap-2">
            Semua Layanan NikaHub
          </h2>
          <p className="text-sm text-emerald-950/70 mt-1 max-w-xl">
            Jelajahi seluruh koleksi layanan pernikahan kami.
          </p>
        </div>

        {/* Search and Sort Tool */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari paket tenda, katering..."
              className="pl-4 pr-10 py-2.5 rounded-full bg-white/80 border border-champagne-200 text-xs sm:text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-champagne-400 w-56 sm:w-64"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                âœ•
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white/80 border border-champagne-200 rounded-full px-3 py-1.5 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-600" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-emerald-950 focus:outline-none font-medium cursor-pointer"
            >
              <option value="featured">Koleksi Unggulan</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Double-Bezel Luxury Cards */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-champagne-300"
          >
            <p className="font-serif text-xl text-emerald-950">Layanan tidak ditemukan</p>
            <p className="text-sm text-emerald-950/60 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-2 rounded-[2rem] bg-white/60 backdrop-blur-sm border border-white/80 shadow-bezel hover:shadow-2xl hover:bg-white/90 transition-all duration-500"
                >
                  {/* Inner Core */}
                  <div className="rounded-[calc(2rem-0.5rem)] bg-white overflow-hidden flex flex-col h-full border border-champagne-100">
                    
                    {/* Media Container with Zoom Physics */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950 cursor-pointer" onClick={() => onSelectProduct(product)}>
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {product.badge ? (
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 font-bold text-[10px] uppercase tracking-wider shadow-sm">
                            {product.badge}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md text-sand font-medium text-[10px] uppercase tracking-wider">
                            {product.categoryLabel}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                            isWishlisted 
                              ? 'bg-rose-50 text-rose-600' 
                              : 'bg-white/80 hover:bg-white text-emerald-950'
                          }`}
                          aria-label="Simpan ke favorit"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Bottom Info Pill inside Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-sand text-[11px] font-sans">
                        <span className="flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <MapPin className="w-3 h-3 text-champagne-400" />
                          {product.location}
                        </span>
                        {product.capacity && (
                          <span className="flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                            <Users className="w-3 h-3 text-champagne-400" />
                            {product.capacity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Division & Rating */}
                        <div className="flex items-center justify-between text-xs text-emerald-950/60 mb-2">
                          <span className="font-semibold uppercase tracking-wider text-[10px] text-champagne-700">
                            {product.vendorName}
                          </span>
                          <div className="flex items-center gap-1 text-emerald-950 font-medium">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            <span>{product.rating}</span>
                            <span className="text-emerald-950/40">({product.reviewCount})</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => onSelectProduct(product)}
                          className="font-serif text-lg font-semibold text-emerald-950 group-hover:text-champagne-600 transition-colors leading-snug cursor-pointer line-clamp-1"
                        >
                          {product.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs text-emerald-950/70 mt-1.5 line-clamp-2 leading-relaxed">
                          {product.tagline}
                        </p>

                        {/* Inclusions Highlights */}
                        <div className="mt-3.5 pt-3 border-t border-champagne-100 flex flex-col gap-1.5">
                          {product.includes.slice(0, 2).map((inc, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-emerald-950/75">
                              <CheckCircle2 className="w-3 h-3 text-champagne-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Action Button-in-Button */}
                      <div className="mt-5 pt-3 border-t border-champagne-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-emerald-950/40 tracking-wider">Tarif Sewa</p>
                          <p className="font-serif text-lg font-bold text-emerald-950 leading-none">
                            {formatRupiah(product.price)}
                          </p>
                          {product.originalPrice && (
                            <p className="text-[10px] text-gray-400 line-through mt-0.5">
                              {formatRupiah(product.originalPrice)}
                            </p>
                          )}
                        </div>

                        {/* Nested Action Button */}
                        <button
                          onClick={() => onQuickBook(product)}
                          className="group/btn flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-sand text-xs font-semibold shadow-sm transition-all active:scale-95"
                        >
                          <span>Sewa</span>
                          <div className="w-6 h-6 rounded-full bg-sand/15 group-hover/btn:bg-champagne-400 group-hover/btn:text-emerald-950 flex items-center justify-center transition-colors">
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
