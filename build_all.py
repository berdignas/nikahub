import json

pkg = json.load(open('package.json', 'r', encoding='utf-8'))
pkg['scripts']['build'] = 'tsc && vite build && cd "produk/foto bersama/foto-bersama-maulidiyah-alfarisyi" && npm install && npx vite build --outDir "../../../dist/foto-maulidiyah-alfarisyi" --emptyOutDir false && cd "../../../produk/undangan digital/vintage-01" && npm install && npx vite build --outDir "../../../dist/undangan-vintage-01" --emptyOutDir false'
json.dump(pkg, open('package.json', 'w', encoding='utf-8'), indent=2)
