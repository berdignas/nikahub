import { 
  WeddingProfile, 
  WeddingTask, 
  WeddingExpense, 
  WeddingGuest, 
  WeddingRundownItem,
  WeddingGift,
  CateringMenuItem,
  VendorReview
} from '../types/wedding';

export const defaultProfile: WeddingProfile = {
  id: '',
  groom_name: '',
  groom_nickname: '',
  groom_phone: '',
  bride_name: '',
  bride_nickname: '',
  bride_phone: '',
  wedding_date: '',
  wedding_time: '08:00',
  venue_name: '',
  venue_address: '',
  target_budget: 0,
  theme_concept: '',
  notes: '',
  invitation_base_url: '',
  cover_image_url: ''
};

export const defaultTasks: WeddingTask[] = [];

export const defaultExpenses: WeddingExpense[] = [];

export const defaultGuests: WeddingGuest[] = [];

export const defaultRundowns: WeddingRundownItem[] = [];

export const defaultGifts: WeddingGift[] = [];

export const defaultCateringMenus: CateringMenuItem[] = [];

export const defaultVendorReviews: VendorReview[] = [];
