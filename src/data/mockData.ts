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
  },
  {
    id: 'bukutamu_digital',
    label: 'Foto Bersama & QR',
    iconName: 'Camera',
    description: 'Galeri foto bersama live & buku tamu QR code untuk tamu acara',
    subCategories: [ { id: 'all', label: 'Semua Layanan' } ]
  }
];

// Official Initial Wedding Catalog
export const WEDDING_PRODUCTS: WeddingProduct[] = [
  {
    id: 'vintage-01',
    title: 'Undangan Website Premium Vintage 01',
    category: 'undangan_digital',
    categoryLabel: 'Undangan Web',
    tagline: 'Desain Undangan Aesthetic Vintage & Classic Warm Elegance',
    price: 149000,
    originalPrice: 299000,
    rating: 5.0,
    reviewCount: 42,
    image: '/produk/undangan digital/vintage-01/public/images/cover.jpg',
    gallery: [
      '/produk/undangan digital/vintage-01/public/images/cover.jpg',
      '/produk/undangan digital/vintage-01/public/images/groom.jpg',
      '/produk/undangan digital/vintage-01/public/images/bride.jpg'
    ],
    vendorName: 'Punakawan Digital',
    location: 'Kediri & All Cities',
    badge: 'Best Seller',
    featured: true,
    includes: [
      'Opening Cover Modal dengan Nama Tamu Dinamis',
      'Background Music Auto-play dengan Audio Toggle',
      'Tampilan Foto Mempelai Arch Frame Aesthetic',
      'Countdown Timer Live Acara Akad & Resepsi',
      'Fitur RSVP & Buku Tamu Ucapan Real-time',
      'Amplop Digital Cashless (BCA) & Kirim Hadiah',
      'Galeri Foto Lightbox & Navigation Bar Floating'
    ],
    description: 'Undangan digital berbasis website dengan tema Vintage Classic Aesthetic yang elegan. Dilengkapi berbagai fitur interaktif premium untuk momen spesial pernikahan Anda.',
    availability: 'ready',
    liveDemoUrl: './produk/undangan digital/vintage-01/index.html'
  }
];
export const MOCK_ORDERS: BookingOrder[] = [];

