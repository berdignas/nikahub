import { WeddingProduct, BookingOrder } from '../types';

export interface CategoryGroup {
  id: string;
  label: string;
  iconName: string;
  description: string;
  subCategories: { id: string; label: string }[];
}

export const MAIN_CATEGORY_GROUPS: CategoryGroup[] = [
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
];

// Official Initial Wedding Catalog (Empty by default)
export const WEDDING_PRODUCTS: WeddingProduct[] = [];
export const MOCK_ORDERS: BookingOrder[] = [];
