export type LayerType = 'background' | 'midground' | 'objects' | 'foreground' | 'particles';

export type AnimationType =
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeDown'
  | 'scaleIn'
  | 'slowZoom'
  | 'parallax'
  | 'sway'
  | 'floating'
  | 'leafFall'
  | 'reveal'
  | 'openingTransition'
  | 'rotateSlow'
  | 'pulse'
  | 'none';

export interface PositionConfig {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  x?: string | number;
  y?: string | number;
  xPercent?: number;
  yPercent?: number;
  responsive?: {
    mobile?: Partial<PositionConfig>;
    tablet?: Partial<PositionConfig>;
    desktop?: Partial<PositionConfig>;
  };
}

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  intensity?: number;
  parallaxSpeed?: number; // negative moves up faster, positive moves down slower
  trigger?: 'load' | 'scroll' | 'hover' | 'click' | 'custom';
  scrollTriggerOptions?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
  loop?: boolean;
  repeat?: number;
  yoyo?: boolean;
  reducedMotionFallback?: 'none' | 'subtleFade' | 'static';
}

export interface AssetConfig {
  id: string;
  name?: string;
  type: 'image' | 'svg' | 'lottie' | 'rive' | 'component' | 'text' | 'canvas';
  src?: string;
  alt?: string;
  content?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  position?: PositionConfig;
  scale?: number | { initial: number; target?: number; responsive?: { mobile?: number; desktop?: number } };
  zIndex?: number;
  opacity?: number;
  rotation?: number;
  transformOrigin?: string;
  animation?: AnimationConfig;
  depth?: number; // 0 (far) to 1 (close) for 3D parallax depth calculation
  className?: string;
  style?: React.CSSProperties;
  responsiveHide?: 'mobile-only' | 'desktop-only' | 'none';
}

export interface LayerConfig {
  id: string;
  type: LayerType;
  name?: string;
  zIndex: number;
  depth?: number;
  assets: AssetConfig[];
  className?: string;
  style?: React.CSSProperties;
}

export interface SceneConfig {
  id: string;
  name: string;
  className?: string;
  height?: string;
  minHeight?: string;
  layers: LayerConfig[];
  backgroundColor?: string;
  overlayGradient?: string;
  showDividers?: boolean;
  enableSmoothParallax?: boolean;
  customContent?: React.ReactNode;
}

export interface CoupleProfile {
  name: string;
  fullName: string;
  role: 'Groom' | 'Bride';
  photo: string;
  father: string;
  mother: string;
  bio?: string;
  instagram?: string;
  orderInFamily: string; // e.g. "Putra Pertama dari"
}

export interface EventDetail {
  id: string;
  title: string; // "Akad Nikah" / "Resepsi Pernikahan"
  date: string; // "Minggu, 25 Oktober 2026"
  dateISO: string; // "2026-10-25T08:00:00"
  time: string; // "08:00 - 10:00 WIB"
  venue: string; // "The Glass House Vintage Pavilion"
  address: string;
  mapUrl: string;
  mapEmbedUrl?: string;
  badge?: string;
  notes?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  date: string;
  description: string;
  photo?: string;
  icon?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumb?: string;
  caption?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
  logo?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface WishMessage {
  id: string;
  name: string;
  attendance: 'attending' | 'not-attending' | 'tentative';
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface MusicConfig {
  src: string;
  title: string;
  artist: string;
  coverImage?: string;
  autoPlayOnOpen: boolean;
  loop: boolean;
  initialVolume: number;
}

export interface InvitationData {
  id: string;
  slug: string;
  templateName: string;
  themeColor: string;
  accentColor: string;
  groom: CoupleProfile;
  bride: CoupleProfile;
  opening: {
    badge: string;
    greeting: string;
    guestNameFallback: string;
    coverPhoto: string;
    quoteTitle: string;
    quoteContent: string;
    quoteSource: string;
    buttonText: string;
  };
  events: EventDetail[];
  loveStory: {
    title: string;
    subtitle: string;
    milestones: StoryMilestone[];
  };
  gallery: {
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };
  rsvp: {
    title: string;
    subtitle: string;
    allowPlusGuests: boolean;
  };
  gift: {
    title: string;
    subtitle: string;
    accounts: BankAccount[];
    physicalAddress?: PhysicalGiftAddress;
  };
  healthProtocol?: {
    title: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  closing: {
    message: string;
    coupleNames: string;
    footnote: string;
  };
  music: MusicConfig;
  scenes: SceneConfig[];
}
