import re

content = open('src/components/Navbar.tsx', 'r', encoding='utf-8').read()

old_hamb = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-emerald-900/80 text-champagne-300 border border-champagne-400/30 shadow-sm hover:bg-emerald-900 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>'''

new_hamb = '''            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 sm:p-3 rounded-full bg-emerald-900/90 text-champagne-300 border border-champagne-400/40 shadow-md hover:bg-emerald-900 active:scale-95 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>'''

content = content.replace(old_hamb, new_hamb)

open('src/components/Navbar.tsx', 'w', encoding='utf-8').write(content)
