import re

content = open('src/components/HomeView.tsx', 'r', encoding='utf-8').read()

old_picks = "const topPicks = featuredProducts.filter(p => p.featured).slice(0, 4);"
new_picks = '''const featured = featuredProducts.filter(p => p.featured);
  const topPicks = featured.length > 0 ? featured.slice(0, 4) : featuredProducts.slice(0, 4);'''

content = content.replace(old_picks, new_picks)

open('src/components/HomeView.tsx', 'w', encoding='utf-8').write(content)
