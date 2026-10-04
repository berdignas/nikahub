import re

content = open('src/data/mockData.ts', 'r').read()

new_groups = '''export const MAIN_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'all',
    label: 'Semua Layanan',
    iconName: 'Sparkles',
    description: 'Seluruh koleksi perlengkapan, konsumsi, dan talenta profesional NikaHub',
    subCategories: [ { id: 'all', label: 'Semua Koleksi' }, { id: 'featured', label: 'Koleksi Unggulan' } ]
  },
  {
    id: 'tenda',
    label: 'Tenda & Pelaminan',
    iconName: 'Tent',
    description: 'Konstruksi tenda VIP dan dekorasi pelaminan mewah',
    subCategories: [ { id: 'all', label: 'Semua Tenda' } ]
  },
  {
    id: 'catering',
    label: 'Katering VIP',
    iconName: 'UtensilsCrossed',
    description: 'Sajian hidangan istimewa prasmanan eksekutif dan gubukan',
    subCategories: [ { id: 'all', label: 'Semua Jamuan' } ]
  },
  {
    id: 'mua',
    label: 'MUA & Gaun',
    iconName: 'Crown',
    description: 'Profil Makeup Artist & desainer gaun pengantin',
    subCategories: [ { id: 'all', label: 'Semua MUA & Gaun' } ]
  },
  {
    id: 'fotografer',
    label: 'Fotografer & Video',
    iconName: 'Camera',
    description: 'Dokumentasi foto & sinematik pernikahan',
    subCategories: [ { id: 'all', label: 'Semua Fotografer' } ]
  },
  {
    id: 'venue',
    label: 'Gedung Venue',
    iconName: 'Building2',
    description: 'Rekomendasi gedung dan lokasi pernikahan',
    subCategories: [ { id: 'all', label: 'Semua Venue' } ]
  },
  {
    id: 'hiburan',
    label: 'MC & Hiburan',
    iconName: 'Music',
    description: 'Talenta Master of Ceremony dan band pengiring',
    subCategories: [ { id: 'all', label: 'Semua Hiburan' } ]
  },
  {
    id: 'alat',
    label: 'Alat Pesta & Sound',
    iconName: 'Tent',
    description: 'Penyewaan sound system, genset, dan alat pesta lainnya',
    subCategories: [ { id: 'all', label: 'Semua Alat Pesta' } ]
  },
  {
    id: 'undangan_digital',
    label: 'Undangan Web',
    iconName: 'Smartphone',
    description: 'Pembuatan undangan digital interaktif',
    subCategories: [ { id: 'all', label: 'Semua Undangan' } ]
  }
];'''

# Replace the array
pattern = r'export const MAIN_CATEGORY_GROUPS: CategoryGroup\[\] = \[.*?\];'
new_content = re.sub(pattern, new_groups, content, flags=re.DOTALL)

open('src/data/mockData.ts', 'w').write(new_content)
