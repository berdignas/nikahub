import re

content = open('src/components/CatalogView.tsx', 'r', encoding='utf-8').read()

# 1. Add ChevronDown import if not present
if 'ChevronDown' not in content:
    content = content.replace('ChevronRight,', 'ChevronRight,\n  ChevronDown,')

# 2. Add state inside CatalogView component
old_state = '''  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');'''

new_state = '''  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);'''

content = content.replace(old_state, new_state)

# 3. Replace section 1 with animated luxury dropdown component
old_section = '''        {/* 1. VISUAL INTERACTIVE CATEGORY SELECTOR */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950/70 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-champagne-700" />
              Pilih Kategori Layanan:
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Menampilkan {filteredProducts.length} Layanan
            </span>
          </div>

          {/* Grid Kategori Utama (Card Interaktif) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
            {MAIN_CATEGORY_GROUPS.map((group) => {
              const isSelected = activeCategory === group.id;
              const count = getProductCount(group.id);

              return (
                <button
                  key={group.id}
                  onClick={() => handleSelectGroup(group.id)}
                  className={elative p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border group overflow-hidden }
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={p-2 rounded-xl transition-colors }>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className={	ext-[10px] font-bold px-2 py-0.5 rounded-full }>
                      {count}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight line-clamp-1">
                      {group.label}
                    </h4>
                  </div>

                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-champagne-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-Category Interactive Chips */}
          {currentGroup.subCategories.length > 0 && (
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-950/10 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              <span className="text-[11px] font-bold text-emerald-950/60 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                Sub-Kategori:
              </span>
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap">
                {currentGroup.subCategories.map((sub) => {
                  const isSubActive = activeSubCategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubCategory(sub.id)}
                      className={px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 }
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>'''

new_section = '''        {/* 1. ANIMATED CUSTOM LUXURY DROPDOWN SELECTOR */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-950/10 shadow-sm mb-6 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-center">
            
            {/* Primary Category Animated Dropdown */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-950/60 mb-1.5 flex items-center gap-1.5 pl-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-700" />
                Pilih Kategori Utama:
              </label>

              <button
                type="button"
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setSubDropdownOpen(false);
                }}
                className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-emerald-950/15 hover:border-emerald-950/40 transition-all flex items-center justify-between cursor-pointer group shadow-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-emerald-950 text-champagne-300 shadow-xs shrink-0">
                    {getCategoryIcon(currentGroup.icon)}
                  </div>
                  <div className="text-left truncate">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-emerald-950 leading-tight truncate">
                      {currentGroup.label}
                    </h4>
                    <span className="text-[11px] text-gray-500 font-medium block">
                      {getProductCount(currentGroup.id)} Layanan Tersedia
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-champagne-400 text-emerald-950 hidden sm:inline-block">
                    Pilih Kategori
                  </span>
                  <motion.div
                    animate={{ rotate: categoryDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1.5 rounded-full bg-gray-200/60 group-hover:bg-gray-200 text-emerald-950"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </button>

              {/* Animated Dropdown Menu */}
              <AnimatePresence>
                {categoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 z-50 mt-2 p-2 bg-white/98 backdrop-blur-2xl rounded-3xl border border-emerald-950/10 shadow-2xl space-y-1 overflow-hidden"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1 flex justify-between items-center">
                      <span>Daftar Kategori Spesialisasi</span>
                      <span>Total Layanan</span>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                      {MAIN_CATEGORY_GROUPS.map((group) => {
                        const isSelected = activeCategory === group.id;
                        const count = getProductCount(group.id);

                        return (
                          <button
                            key={group.id}
                            type="button"
                            onClick={() => {
                              handleSelectGroup(group.id);
                              setCategoryDropdownOpen(false);
                            }}
                            className={w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer }
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={p-2 rounded-xl transition-colors }>
                                {getCategoryIcon(group.icon)}
                              </div>
                              <div className="truncate">
                                <h5 className="font-serif font-bold text-xs sm:text-sm truncate">
                                  {group.label}
                                </h5>
                                <p className={	ext-[10px] truncate leading-tight }>
                                  {group.description || 'Koleksi layanan terbaik NikaHub'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span className={	ext-[10px] font-bold px-2 py-0.5 rounded-full }>
                                {count}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-champagne-400" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sub-Category Animated Dropdown */}
            {currentGroup.subCategories.length > 0 && (
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-950/60 mb-1.5 flex items-center gap-1.5 pl-1">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-700" />
                  Filter Sub-Kategori:
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setSubDropdownOpen(!subDropdownOpen);
                    setCategoryDropdownOpen(false);
                  }}
                  className="w-full p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-950/30 transition-all flex items-center justify-between cursor-pointer group shadow-xs active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-champagne-100 text-emerald-950 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-emerald-950 truncate">
                      {currentGroup.subCategories.find(s => s.id === activeSubCategory)?.label || 'Semua Sub-Kategori'}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: subDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1.5 rounded-full bg-gray-100 text-emerald-950 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Sub-Category Dropdown Panel */}
                <AnimatePresence>
                  {subDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 right-0 z-50 mt-2 p-2 bg-white/98 backdrop-blur-2xl rounded-3xl border border-emerald-950/10 shadow-2xl space-y-1 overflow-hidden"
                    >
                      {currentGroup.subCategories.map((sub) => {
                        const isSubActive = activeSubCategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setActiveSubCategory(sub.id);
                              setSubDropdownOpen(false);
                            }}
                            className={w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer text-xs }
                          >
                            <span>{sub.label}</span>
                            {isSubActive && <Check className="w-3.5 h-3.5 text-emerald-950" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        </div>'''

content = content.replace(old_section, new_section)

open('src/components/CatalogView.tsx', 'w', encoding='utf-8').write(content)
