import re

content = open('src/components/CatalogView.tsx', 'r', encoding='utf-8').read()

old_filter_section = '''        {/* 1. FILTER KATALOG BERBENTUK DROPDOWN (TANPA GULIR KE SAMPING) */}
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
        </div>'''

new_filter_section = '''        {/* 1. VISUAL INTERACTIVE CATEGORY SELECTOR */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950/70 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-champagne-700" />
              Pilih Kategori Layanan:
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Menampilkan {filteredProducts.length} Hasil
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

content = content.replace(old_filter_section, new_filter_section)

open('src/components/CatalogView.tsx', 'w', encoding='utf-8').write(content)
