import re

content = open('src/components/HomeView.tsx', 'r', encoding='utf-8').read()

# Replace hardcoded section 3 cards with dynamic topPicks rendering
old_carousel = '''        {/* Clean, Swipeable Carousel for Middle-Class Market */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            {
              title: "Paket Tenda VIP 500 Pax",
              tag: "?? Promo Terlaris",
              badgeStyle: "bg-rose-600 text-white",
              desc: "Tenda tertutup rapi, pelaminan modern, katering 500 porsi, rias & busana lengkap.",
              price: "Mulai Rp 18,5 Jt",
              image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Gedung / Aula",
              tag: "? Favorit",
              badgeStyle: "bg-emerald-950 text-sand",
              desc: "Dekorasi pelaminan up to 10m, mini garden, hiburan akustik, dan free 2 gubukan.",
              price: "Mulai Rp 25,0 Jt",
              image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Intimate Lamaran",
              tag: "Spesial",
              badgeStyle: "bg-champagne-600 text-white",
              desc: "Backdrop bunga segar, kursi crossback 50 pcs, fotografer & ring box eksklusif.",
              price: "Mulai Rp 4,5 Jt",
              image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Paket Custom (Sesuai Budget)",
              tag: "Bisa Nego",
              badgeStyle: "bg-amber-500 text-white",
              desc: "Diskusikan budget yang Anda miliki dengan tim kami. Wujudkan acara tanpa over-budget.",
              price: "Tanya Admin",
              image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={onNavigateToCatalog}
              className="bg-white w-[85vw] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-emerald-950/10 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <span className={bsolute top-2.5 left-2.5 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide }>
                    {item.tag}
                  </span>
                </div>
                <div className="px-1">
                  <h3 className="font-serif font-bold text-base text-emerald-950 group-hover:text-champagne-700 transition-colors mb-1.5 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-1 pb-1">
                <div className="mb-3 text-emerald-950 font-bold text-sm">
                  {item.price}
                </div>
                <button 
                  className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-sand font-bold text-xs transition-colors flex items-center justify-center gap-2 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://wa.me/qr/XCPMCWREYZVOM1', '_blank');
                  }}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tanya via WA</span>
                </button>
              </div>
            </div>
          ))}
        </div>'''

new_carousel = '''        {/* Clean Dynamic Carousel for Featured Products */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {topPicks.length > 0 ? (
            topPicks.map((product) => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white w-[85vw] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-emerald-950/10 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide bg-emerald-950 text-sand">
                      {product.categoryLabel || product.category}
                    </span>
                  </div>
                  <div className="px-1">
                    <h3 className="font-serif font-bold text-base text-emerald-950 group-hover:text-champagne-700 transition-colors mb-1.5 leading-tight line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="px-1 pb-1">
                  <div className="mb-3 text-emerald-950 font-bold text-sm">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                  </div>
                  <button 
                    className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-sand font-bold text-xs transition-colors flex items-center justify-center gap-2 active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                  >
                    <span>Detail Layanan</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full p-8 text-center bg-white rounded-3xl border border-emerald-950/10">
              <Sparkles className="w-8 h-8 text-champagne-600 mx-auto mb-2" />
              <h4 className="font-serif font-bold text-base text-emerald-950">Katalog Siap Diisi</h4>
              <p className="text-xs text-gray-500 mt-1">Belum ada produk terdaftar. Silakan input produk baru Anda melalui Admin Dashboard.</p>
              <button 
                onClick={onNavigateToCatalog}
                className="mt-4 px-6 py-2.5 rounded-full bg-emerald-950 text-sand text-xs font-bold hover:bg-emerald-900 transition-all cursor-pointer"
              >
                Buka Katalog Layanan
              </button>
            </div>
          )}
        </div>'''

content = content.replace(old_carousel, new_carousel)

open('src/components/HomeView.tsx', 'w', encoding='utf-8').write(content)
