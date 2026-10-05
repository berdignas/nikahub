import urllib.request
import re
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
out_dir = 'produk/undangan digital/vintage-01/public/images'
os.makedirs(out_dir, exist_ok=True)

for page in ['spesial-01', 'spesial-02']:
    url = f'https://inv.punakawandigital.id/{page}/'
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        images = set(re.findall(r'https://inv\.punakawandigital\.id/wp-content/uploads/[^\s"\'\)\<\>]+?\.(?:webp|png|jpg|jpeg|svg)', html))
        print(f'=== {page} ({len(images)} images) ===')
        for img_url in images:
            # Clean url
            img_url = img_url.split('?')[0]
            basename = os.path.basename(img_url)
            print(f'Found: {basename} -> {img_url}')
            # Download if it is a floral or decorative asset
            if any(k in basename.lower() for k in ['bunga', 'flower', 'leaf', 'daun', 'ornament', 'frame', 'decor', 'tema']):
                dest = os.path.join(out_dir, basename)
                try:
                    r = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(r) as resp, open(dest, 'wb') as f:
                        f.write(resp.read())
                    print(f'  Downloaded: {basename} ({os.path.getsize(dest)} bytes)')
                except Exception as ex:
                    print(f'  Error: {ex}')
    except Exception as e:
        print(f'Failed to fetch {page}: {e}')
