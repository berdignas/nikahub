import re

# 1. Update PortfolioView.tsx
p_content = open('src/components/PortfolioView.tsx', 'r', encoding='utf-8').read()

old_p_decl = '''export const PortfolioView: React.FC = () => {'''
new_p_decl = '''interface PortfolioViewProps {
  onNavigateToContact?: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToContact }) => {'''

p_content = p_content.replace(old_p_decl, new_p_decl)

old_p_btn = '''        <button className="bg-emerald-950 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-champagne-600 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1">
          Konsultasi Konsep Gratis
        </button>'''

new_p_btn = '''        <button 
          onClick={onNavigateToContact}
          className="bg-emerald-950 text-sand hover:bg-emerald-900 px-10 py-4 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer active:scale-95"
        >
          Konsultasi Konsep Gratis
        </button>'''

p_content = p_content.replace(old_p_btn, new_p_btn)
open('src/components/PortfolioView.tsx', 'w', encoding='utf-8').write(p_content)

# 2. Update App.tsx to pass onNavigateToContact
app_content = open('src/App.tsx', 'r', encoding='utf-8').read()

old_app_port = '''          {currentPage === 'portfolio' && (
            <PortfolioView />
          )}'''

new_app_port = '''          {currentPage === 'portfolio' && (
            <PortfolioView onNavigateToContact={() => handleNavigate('contact')} />
          )}'''

app_content = app_content.replace(old_app_port, new_app_port)
open('src/App.tsx', 'w', encoding='utf-8').write(app_content)
