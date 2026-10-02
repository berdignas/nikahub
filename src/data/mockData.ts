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
    subCategories: [
      { id: 'all', label: 'Semua Koleksi' },
      { id: 'featured', label: 'Koleksi Unggulan' },
    ]
  },
  {
    id: 'fotografer',
    label: 'Fotografer',
    iconName: 'Camera',
    description: 'Profil fotografer & videografer profesional beserta galeri hasil karya nyata',
    subCategories: [
      { id: 'all', label: 'Semua Fotografer' },
      { id: 'hari_h', label: 'Foto & Sinema Hari H' },
      { id: 'prewed_drone', label: 'Pre-Wedding & Drone 4K' },
    ]
  },
  {
    id: 'mua',
    label: 'MUA & Gaun',
    iconName: 'Crown',
    description: 'Profil Makeup Artist & desainer gaun pengantin dengan lookbook riasan',
    subCategories: [
      { id: 'all', label: 'Semua MUA' },
      { id: 'rias_pengantin', label: 'Rias Pengantin (Akad & Resepsi)' },
      { id: 'gaun_kebaya', label: 'Gaun Couture & Kebaya Adat' },
    ]
  },
  {
    id: 'alat',
    label: 'Tenda & Alat Pesta',
    iconName: 'Tent',
    description: 'Peralatan fisik: konstruksi tenda VIP, dekorasi pelaminan, panggung & sound',
    subCategories: [
      { id: 'all', label: 'Semua Alat' },
      { id: 'tenda_vip', label: 'Tenda & Pelaminan VIP' },
      { id: 'venue_gedung', label: 'Venue & Glasshouse' },
      { id: 'sound_panggung', label: 'Sound, Panggung & Orkestra' },
    ]
  },
  {
    id: 'catering',
    label: 'Katering & Jamuan',
    iconName: 'UtensilsCrossed',
    description: 'Sajian hidangan istimewa prasmanan eksekutif dan gubukan favorit',
    subCategories: [
      { id: 'all', label: 'Semua Jamuan' },
      { id: 'buffet_vip', label: 'Prasmanan / Buffet VIP' },
      { id: 'pondokan', label: 'Gubukan / Food Stalls' },
    ]
  },
  {
    id: 'undangan',
    label: 'Undangan & Tech',
    iconName: 'Smartphone',
    description: 'Undangan website digital interaktif, kartu cetak mewah & QR scanner',
    subCategories: [
      { id: 'all', label: 'Semua Tech' },
      { id: 'digital_web', label: 'Undangan Digital Website' },
      { id: 'cetak_fisik', label: 'Undangan Cetak Foil Velvet' },
      { id: 'qr_bukutamu', label: 'Buku Tamu QR Scanner' },
    ]
  },
];

// Clean Empty Catalog & Orders (Admin inputs products dynamically)
export const WEDDING_PRODUCTS: WeddingProduct[] = [];
export const MOCK_ORDERS: BookingOrder[] = [];
