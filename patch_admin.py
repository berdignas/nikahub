import re

content = open('src/components/AdminDashboardView.tsx', 'r', encoding='utf-8').read()

content = content.replace("featured: True", "featured: true")
content = content.replace("featured: product.featured || False", "featured: product.featured || false")

open('src/components/AdminDashboardView.tsx', 'w', encoding='utf-8').write(content)
