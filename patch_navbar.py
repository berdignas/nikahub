import re

content = open('src/components/Navbar.tsx', 'r', encoding='utf-8').read()

# 1. Modify the header to be a unified bar on mobile, floating on desktop
old_header = '''      {/* Floating Island Header */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-40 px-2 sm:px-4 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto gap-2">
          
          {/* Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-1 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-bezel cursor-pointer shrink-0"'''

new_header = '''      {/* Floating Island Header */}
      <header className="fixed top-0 sm:top-4 left-0 right-0 z-40 sm:px-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 py-2 sm:py-0 bg-white/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-b border-gray-200 sm:border-none shadow-sm sm:shadow-none pointer-events-auto">
          
          {/* Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sm:p-1 sm:rounded-full sm:bg-white/80 sm:backdrop-blur-xl sm:border sm:border-white/60 sm:shadow-bezel cursor-pointer shrink-0"'''

content = content.replace(old_header, new_header)


# 2. Add Login to Mobile Menu if NOT user
old_drawer = '''            <div className="pt-3 border-t border-emerald-950/10 space-y-2">'''

new_drawer = '''            <div className="pt-3 border-t border-emerald-950/10 space-y-2">
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
              )}'''

content = content.replace(old_drawer, new_drawer)


# 3. Simplify the Hamburger button container on mobile so it doesn't look like a floating standalone button
old_hamburger = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-bezel text-emerald-950 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >'''

new_hamburger = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg sm:rounded-full bg-gray-50/80 sm:bg-white/90 backdrop-blur-xl sm:border sm:border-white/60 sm:shadow-bezel text-emerald-950 hover:bg-gray-100 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >'''

content = content.replace(old_hamburger, new_hamburger)

open('src/components/Navbar.tsx', 'w', encoding='utf-8').write(content)
