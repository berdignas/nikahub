import shutil
import os

img_dir = 'produk/undangan digital/vintage-01/public/images'

mapping = {
    'Tema-02-Bunga-06-e1722430798612-1-1.webp': 'bunga_top_left_clean.webp',
    'Tema-02-Bunga-05-e1722432163480-1-1.webp': 'bunga_top_right_clean.webp',
    'Tema-02-Bunga-04-e1722431813465-1-1.webp': 'bunga_mid_left_clean.webp',
    'Tema-02-Bunga-03-e1722432073807-1-1.webp': 'bunga_mid_right_clean.webp',
    'Tema-02-Bunga-01-1-e1722429995810-1-1.webp': 'bunga_bottom_left_clean.webp',
    'Tema-02-Bunga-02-e1722431575817-1-1.webp': 'bunga_bottom_right_clean.webp',
    'TEMA-02-1.png': 'bunga_header_arch.png',
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(img_dir, src_name)
    dst_path = os.path.join(img_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")
    else:
        print(f"Missing {src_name}")
