export type TaskCategory = 
  | 'Legal & KUA'
  | 'Venue & Dekorasi'
  | 'Catering'
  | 'Busana & MUA'
  | 'Dokumentasi'
  | 'Adat & Prosesi'
  | 'Undangan & Tamu'
  | 'Hiburan & Sound'
  | 'Logistik & Panitia';

export type TaskPhase = 
  | 'H-12 sd H-6 Bulan'
  | 'H-6 sd H-3 Bulan'
  | 'H-3 sd H-1 Bulan'
  | 'H-1 Bulan sd H-1 Minggu'
  | 'Hari-H & Pasca Acara';

export type TaskPriority = 'Tinggi' | 'Sedang' | 'Rendah';
export type TaskAssignee = 'Pria' | 'Wanita' | 'Bersama' | 'Wedding Organizer' | 'Keluarga';

export interface WeddingTask {
  id: string;
  wedding_id?: string;
  title: string;
  category: TaskCategory;
  phase: TaskPhase;
  priority: TaskPriority;
  assigned_to: TaskAssignee;
  due_date: string;
  is_completed: boolean;
  notes?: string;
  created_at?: string;
}

export type PaymentStatus = 'Belum Bayar' | 'DP / Cicilan' | 'Lunas';
export type PayerSource = 'Pria' | 'Wanita' | 'Bersama' | 'Keluarga Pria' | 'Keluarga Wanita';

export interface PaymentTermin {
  id: string;
  expense_id: string;
  title: string;
  amount: number;
  due_date: string;
  is_paid: boolean;
  paid_date?: string;
  payment_method?: string;
  notes?: string;
}

export interface WeddingExpense {
  id: string;
  wedding_id?: string;
  category: TaskCategory;
  item_name: string;
  vendor_name: string;
  vendor_contact?: string;
  estimated_cost: number;
  actual_cost: number;
  payer: PayerSource;
  status: PaymentStatus;
  notes?: string;
  termins: PaymentTermin[];
  created_at?: string;
}

export interface WeddingProfile {
  id: string;
  groom_name: string;
  groom_nickname: string;
  groom_phone?: string;
  bride_name: string;
  bride_nickname: string;
  bride_phone?: string;
  wedding_date: string; // YYYY-MM-DD
  wedding_time?: string; // HH:mm
  venue_name: string;
  venue_address?: string;
  target_budget: number;
  theme_concept?: string;
  notes?: string;
  cover_image_url?: string;
  invitation_base_url?: string;
  created_at?: string;
}

export interface BudgetSummary {
  totalTarget: number;
  totalEstimated: number;
  totalActual: number;
  totalPaid: number;
  remainingObligation: number;
  overBudgetAmount: number;
  paidPercentage: number;
}

// ==========================================
// SPRINT 2 TYPES: GUEST LIST, RSVP & RUNDOWN
// ==========================================

export type GuestTier = 
  | 'VVIP'
  | 'VIP'
  | 'Keluarga Inti Pria'
  | 'Keluarga Inti Wanita'
  | 'Sahabat Pria'
  | 'Sahabat Wanita'
  | 'Rekan Kerja'
  | 'Tetangga / Umum';

export type RsvpStatus = 'Menunggu Konfirmasi' | 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';

export type GuestSide = 'Pihak Pria' | 'Pihak Wanita' | 'Bersama' | 'Orang Tua Pria' | 'Orang Tua Wanita';

export interface WeddingGuest {
  id: string;
  wedding_id?: string;
  name: string;
  phone_number?: string;
  side: GuestSide;
  tier: GuestTier;
  pax_allotted: number;
  pax_confirmed: number;
  rsvp_status: RsvpStatus;
  table_number?: string;
  qr_token: string;
  dietary_notes?: string;
  custom_notes?: string;
  invitation_sent: boolean;
  sent_date?: string;
  checked_in?: boolean;
  checked_in_at?: string;
  souvenir_claimed?: boolean;
  created_at?: string;
}

export interface GuestSummary {
  totalInvitations: number;
  totalAllottedPax: number;
  totalConfirmedPax: number;
  attendingCount: number;
  declinedCount: number;
  pendingCount: number;
  maybeCount: number;
  sentCount: number;
}

export type RundownSession = 
  | 'Akad Nikah / Pemberkatan'
  | 'Upacara Adat'
  | 'Resepsi Sesi 1'
  | 'Resepsi Sesi 2 / Gala'
  | 'Syukuran / Ramah Tamah';

export interface WeddingRundownItem {
  id: string;
  wedding_id?: string;
  session: RundownSession;
  start_time: string;
  end_time: string;
  activity_title: string;
  pic_name: string;
  pic_phone?: string;
  location_spot: string;
  music_audio_cue?: string;
  lighting_cue?: string;
  logistics_notes?: string;
  is_completed?: boolean;
}

// ==============================================================
// SPRINT 3 TYPES: GATE CHECK-IN, CATERING, GIFTS & POST-AUDIT
// ==============================================================

export type GiftType = 'Amplop Tunai' | 'Transfer Bank / QRIS' | 'Kado Fisik';

export interface WeddingGift {
  id: string;
  wedding_id?: string;
  envelope_number?: string; // e.g. "ENV-042"
  giver_name: string;
  giver_phone?: string;
  gift_type: GiftType;
  amount: number; // 0 jika kado fisik
  item_description?: string; // jika kado fisik e.g. "Set Cangkir Keramik Vicenza"
  recipient_side: 'Pria' | 'Wanita' | 'Bersama' | 'Keluarga Pria' | 'Keluarga Wanita';
  thank_you_sent: boolean;
  notes?: string;
  created_at?: string;
}

export type CateringItemType = 'Prasmanan / Buffet' | 'Food Stall / Gubukan' | 'Dessert & Minuman';

export interface CateringMenuItem {
  id: string;
  wedding_id?: string;
  name: string;
  type: CateringItemType;
  portion_prepared: number;
  portion_consumed: number;
  refill_count: number;
  status: 'Aman' | 'Menipis' | 'Habis';
  notes?: string;
}

export interface VendorReview {
  id: string;
  wedding_id?: string;
  vendor_name: string;
  category: TaskCategory;
  rating_stars: number; // 1 - 5
  feedback_notes: string;
  is_recommended: boolean;
  created_at?: string;
}
