#!/usr/bin/env python3
"""
Script Otomatis Duplikasi Template Planikah untuk Klien Baru
Usage:
    python duplikasi_klien.py <slug_klien> [nama_pria] [nama_wanita] [tanggal_nikah] [target_budget]

Example:
    python duplikasi_klien.py dimas-anisa "Dimas Prasetyo" "Anisa Rahmawati" "2026-11-20" 200000000
"""

import sys
import os
import shutil
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MASTER_DIR = os.path.join(SCRIPT_DIR, "planikah-template-master")

def duplicate_client(slug, groom_name="Alfarisyi Ramadhan", bride_name="Maulidiyah Nurul", wedding_date="2026-12-12", budget="250000000"):
    target_folder_name = f"planikah-{slug}"
    target_dir = os.path.join(SCRIPT_DIR, target_folder_name)

    if os.path.exists(target_dir):
        print(f"[!] Folder tujuan sudah ada: {target_dir}")
        response = input("Apakah ingin menimpa (overwrite)? (y/n): ")
        if response.lower() != 'y':
            print("Dibatalkan.")
            return

        shutil.rmtree(target_dir)

    print(f"[*] Menyalin master template ke {target_dir}...")
    
    # Ignore node_modules and dist when copying to make it super fast
    def ignore_patterns(path, names):
        ignored = []
        if 'node_modules' in names:
            ignored.append('node_modules')
        if 'dist' in names:
            ignored.append('dist')
        return ignored

    shutil.copytree(MASTER_DIR, target_dir, ignore=ignore_patterns)

    # Patch defaultData.ts with new client info
    default_data_path = os.path.join(target_dir, "src", "data", "defaultData.ts")
    if os.path.exists(default_data_path):
        with open(default_data_path, "r", encoding="utf-8") as f:
            content = f.read()

        groom_nick = groom_name.split()[0]
        bride_nick = bride_name.split()[0]

        content = re.sub(r"id: 'master-wedding-01'", f"id: '{slug}'", content)
        content = re.sub(r"groom_name: '[^']*'", f"groom_name: '{groom_name}'", content)
        content = re.sub(r"groom_nickname: '[^']*'", f"groom_nickname: '{groom_nick}'", content)
        content = re.sub(r"bride_name: '[^']*'", f"bride_name: '{bride_name}'", content)
        content = re.sub(r"bride_nickname: '[^']*'", f"bride_nickname: '{bride_nick}'", content)
        content = re.sub(r"wedding_date: '[^']*'", f"wedding_date: '{wedding_date}'", content)
        content = re.sub(r"target_budget: [0-9]+", f"target_budget: {budget}", content)

        with open(default_data_path, "w", encoding="utf-8") as f:
            f.write(content)

    # Patch package.json name
    pkg_path = os.path.join(target_dir, "package.json")
    if os.path.exists(pkg_path):
        with open(pkg_path, "r", encoding="utf-8") as f:
            pkg_content = f.read()
        pkg_content = re.sub(r'"name": "[^"]*"', f'"name": "{target_folder_name}"', pkg_content)
        with open(pkg_path, "w", encoding="utf-8") as f:
            f.write(pkg_content)

    print(f"[OK] Sukses membuat wedding planner baru di: {target_dir}")
    print(f"[*] Langkah berikutnya:")
    print(f"    1. cd \"{target_dir}\"")
    print(f"    2. npm install")
    print(f"    3. npm run dev")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Penggunaan: python duplikasi_klien.py <slug_klien> [nama_pria] [nama_wanita] [tanggal_nikah] [budget]")
        print("Contoh: python duplikasi_klien.py dimas-anisa \"Dimas Prasetyo\" \"Anisa Rahmawati\" 2026-11-20 200000000")
        sys.exit(1)

    slug = sys.argv[1]
    g_name = sys.argv[2] if len(sys.argv) > 2 else "Alfarisyi Ramadhan"
    b_name = sys.argv[3] if len(sys.argv) > 3 else "Maulidiyah Nurul"
    w_date = sys.argv[4] if len(sys.argv) > 4 else "2026-12-12"
    b_val = sys.argv[5] if len(sys.argv) > 5 else "250000000"

    duplicate_client(slug, g_name, b_name, w_date, b_val)
