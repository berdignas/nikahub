export type ProductCategory = 
  | 'all'
  | 'alat'
  | 'catering'
  | 'mua'
  | 'fotografer'
  | 'undangan'
  | 'tenda'
  | 'fotografi'
  | 'venue'
  | 'hiburan'
  | 'undangan_fisik'
  | 'undangan_digital'
  | 'bukutamu_digital'
  | 'souvenir';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption?: string;
}

export interface WeddingProduct {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  subCategory?: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  vendorName: string;
  talentName?: string;
  talentRole?: string;
  talentAvatar?: string;
  experienceYears?: string;
  styleTags?: string[];
  equipmentOrBrands?: string[];
  bio?: string;
  portfolioGallery?: PortfolioItem[];
  location: string;
  badge?: string;
  featured?: boolean;
  capacity?: string;
  includes: string[];
  description: string;
  availability: 'ready' | 'limited' | 'booked';
  liveDemoUrl?: string;
  videoUrl?: string;
}

export interface BookingItem {
  product: WeddingProduct;
  eventDate?: string;
  notes?: string;
  quantity: number;
}

export interface VendorMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle: string;
}

export interface BookingOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  productName: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending_dp' | 'completed';
}

export interface User {
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

export interface UserOrder {
  id: string;
  items: BookingItem[];
  totalPrice: number;
  eventDate: string;
  eventCity: string;
  status: 'Menunggu Konfirmasi' | 'Disetujui' | 'Gladi Resik';
  createdAt: string;
}

