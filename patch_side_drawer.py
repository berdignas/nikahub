import re

content = open('src/components/Navbar.tsx', 'r', encoding='utf-8').read()

# 1. Update Header Container styling for mobile (Rich dark emerald glassmorphism navbar)
old_header_tag = '''      {/* Floating Island Header */}
      <header className="fixed top-0 sm:top-4 left-0 right-0 z-40 sm:px-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 py-2 sm:py-0 bg-white/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-b border-gray-200 sm:border-none shadow-sm sm:shadow-none pointer-events-auto">'''

new_header_tag = '''      {/* Floating Island Header */}
      <header className="fixed top-0 sm:top-4 left-0 right-0 z-40 sm:px-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 py-2.5 sm:py-0 bg-emerald-950/90 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border-b border-champagne-400/20 sm:border-none shadow-md sm:shadow-none pointer-events-auto text-sand">'''

content = content.replace(old_header_tag, new_header_tag)


# 2. Hide User Avatar Button on mobile, show only on desktop (md:flex)
old_user_btn = '''            {/* Email Authentication / User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:p-1.5 sm:pl-3 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-950/15 text-emerald-950 hover:bg-white transition-all shadow-bezel cursor-pointer"
                >'''

new_user_btn = '''            {/* Email Authentication / User Menu (Desktop Only) */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:p-1.5 sm:pl-3 rounded-full bg-white/90 backdrop-blur-xl border border-emerald-950/15 text-emerald-950 hover:bg-white transition-all shadow-bezel cursor-pointer"
                >'''

content = content.replace(old_user_btn, new_user_btn)


# 3. Update Mobile Hamburger Button styling
old_hamb = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg sm:rounded-full bg-gray-50/80 sm:bg-white/90 backdrop-blur-xl sm:border sm:border-white/60 sm:shadow-bezel text-emerald-950 hover:bg-gray-100 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>'''

new_hamb = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-emerald-900/80 text-champagne-300 border border-champagne-400/30 shadow-sm hover:bg-emerald-900 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>'''

content = content.replace(old_hamb, new_hamb)


# 4. Replace Mobile Dropdown Drawer with Side Drawer (Slide in from Right)
old_drawer_code = '''      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="fixed inset-x-3 top-16 z-50 p-5 rounded-3xl bg-white border border-emerald-950/10 shadow-2xl flex flex-col gap-3 text-emerald-950 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne-600" />
                <span className="font-serif font-bold text-base">Menu NikaHub</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile User Profile Header */}
            {user ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950 text-sand flex items-center justify-between gap-2 shadow-md">
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-bold text-champagne-300 block">Akun Terhubung</span>
                  <span className="font-bold text-xs truncate block">{user.name || user.email}</span>
                  <span className="text-[10px] text-sand/70 truncate block">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold shrink-0 hover:bg-rose-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 rounded-2xl bg-champagne-400 font-bold text-emerald-950 text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
              >
                <UserIcon className="w-4 h-4" />
                <span>Masuk Dengan Email</span>
              </button>
            )}

            <div className="space-y-1 py-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentPage === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onPageChange(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={w-full text-left py-3 px-3.5 rounded-2xl font-medium text-xs flex items-center justify-between transition-colors }
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={w-4 h-4 } />
                      {link.label}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-emerald-950/10 space-y-2">
              {!user && (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 rounded-full bg-champagne-400 hover:bg-champagne-500 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer mb-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Login / Daftar Akun</span>
                </button>
              )}
              <button
                onClick={() => {
                  window.open('https://wa.me/qr/XCPMCWREYZVOM1', '_blank');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-full bg-emerald-950 text-sand font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform relative"
              >
                <MessageSquare className="w-4 h-4 text-champagne-400" />
                <span>Live Chat Concierge NikaHub</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold ml-1 animate-pulse">
                    {unreadCount} Baru
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>'''

new_drawer_code = '''      {/* Mobile Side Drawer (Slide in from Right) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden"
            />

            {/* Side Drawer Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-emerald-950 text-sand p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-champagne-400/20 md:hidden"
            >
              {/* Drawer Top Header */}
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-champagne-400/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-champagne-400" />
                    <span className="font-serif font-bold text-lg text-sand tracking-wide">NikaHub Menu</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/10 text-champagne-300 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* User Profile Card inside Drawer */}
                {user ? (
                  <div className="p-4 rounded-2xl bg-white/5 border border-champagne-400/20 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-champagne-400 text-emerald-950 font-bold text-sm flex items-center justify-center uppercase shadow-sm shrink-0">
                        {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] uppercase font-bold text-champagne-400 tracking-wider block">Klien VIP Terverifikasi</span>
                        <p className="font-serif font-bold text-sm truncate text-sand">{user.name || 'Pengantin NikaHub'}</p>
                        <p className="text-[11px] text-sand/60 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          onPageChange('client-profile');
                          setMobileMenuOpen(false);
                        }}
                        className="py-2 px-3 rounded-xl bg-champagne-400/10 hover:bg-champagne-400/20 text-champagne-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>Profil Saya</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="py-2 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-champagne-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-champagne-300 active:scale-98 transition-all"
                  >
                    <Lock className="w-4 h-4 text-emerald-950" />
                    <span>Login / Daftar Akun</span>
                  </button>
                )}

                {/* Navigation Links */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-champagne-400/60 uppercase tracking-widest px-2 block mb-1">
                    Navigasi Utama
                  </span>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentPage === link.id;

                    return (
                      <button
                        key={link.id}
                        onClick={() => {
                          onPageChange(link.id);
                          setMobileMenuOpen(false);
                        }}
                        className={w-full text-left py-3 px-4 rounded-2xl font-medium text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer }
                      >
                        <span className="flex items-center gap-3">
                          <Icon className={w-4 h-4 } />
                          {link.label}
                        </span>
                        {isActive && <Sparkles className="w-3.5 h-3.5 text-emerald-950" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-champagne-400/20 space-y-3">
                <button
                  onClick={() => {
                    window.open('https://wa.me/qr/XCPMCWREYZVOM1', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-sand border border-champagne-400/30 font-bold text-xs flex items-center justify-center gap-2 transition-all relative"
                >
                  <MessageSquare className="w-4 h-4 text-champagne-400" />
                  <span>Live Chat Concierge</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-bold ml-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <p className="text-[10px] text-center text-sand/40 font-serif">
                  NikaHub Atelier Wedding ? Luxury Wedding Concierge
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>'''

content = content.replace(old_drawer_code, new_drawer_code)

open('src/components/Navbar.tsx', 'w', encoding='utf-8').write(content)
