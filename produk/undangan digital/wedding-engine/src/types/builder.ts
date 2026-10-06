export type ElementType =
  | 'text'
  | 'image'
  | 'shape'
  | 'ornament'
  | 'bismillah'
  | 'divider'
  | 'seal'
  | 'button'
  | 'countdown'
  | 'flower';

export type AnimationType =
  | 'none'
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'bounce'
  | 'bounceIn'
  | 'spinIn'
  | 'flipInX'
  | 'flipInY'
  | 'blurIn'
  | 'elasticIn'
  | 'sway'
  | 'float'
  | 'pulse';

export type LoopAnimationType =
  | 'none'
  | 'spin'        // Putar terus menerus 360° searah jarum jam
  | 'spinReverse' // Putar terus menerus berlawanan arah jarum jam
  | 'float'       // Melayang naik-turun halus
  | 'sway'        // Bergoyang anggun kiri-kanan
  | 'pulse'       // Berdenyut detak jantung
  | 'glow'        // Berpendar kilau cahaya emas
  | 'bounce'      // Membal halus
  | 'wobble';     // Goyang getar riang

export interface ElementAnimationConfig {
  type: AnimationType;
  duration: number; // seconds
  delay: number; // seconds
  trigger: 'onScroll' | 'onLoad';
  loopType?: LoopAnimationType;
  loopDuration?: number; // seconds per cycle
  easing?: 'ease' | 'linear' | 'ease-in-out' | 'spring';
}

export type ShapeType =
  | 'rectangle'
  | 'circle'
  | 'arch'
  | 'oval'
  | 'pill'
  | 'frame'
  | 'divider-line'
  | 'monogram-seal';

export interface CanvasElement {
  id: string;
  name: string;
  type: ElementType;
  sectionId: string;
  // Content
  content: string; // text string or image URL
  subtitle?: string;
  // Typography
  fontFamily: string;
  fontSize: number;
  fontWeight: '300' | '400' | '500' | '600' | '700' | '800';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number; // px
  lineHeight: number; // multiplier
  textColor: string;
  // Box Styling
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  borderRadius: number;
  // Geometry & Positioning
  width: number | string;
  height: number | string;
  x: number; // px offset from center
  y: number; // px offset
  rotation: number; // deg
  scale: number;
  opacity: number;
  zIndex: number;
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'gold-glow' | 'inner';
  // Image Fit & Crop & Flip
  objectFit?: 'contain' | 'cover' | 'fill';
  flipX?: boolean;
  flipY?: boolean;
  // Shape-specific
  shapeType?: ShapeType;
  // Animation
  animation: ElementAnimationConfig;
}

export interface BuilderSection {
  id: string;
  title: string;
  subtitle?: string;
  type:
    | 'cover'
    | 'hero'
    | 'ayat'
    | 'couple'
    | 'events'
    | 'countdown'
    | 'story'
    | 'gallery'
    | 'gift'
    | 'rsvp'
    | 'closing'
    | 'custom';
  enabled: boolean;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundOverlay?: string;
  backgroundOpacity?: number;
  minHeight: number; // px
  paddingY: number; // px
  elements: CanvasElement[];
}

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
}

export interface GlobalProjectConfig {
  id: string;
  title: string;
  groomName: string;
  brideName: string;
  eventDate: string;
  monogram: string;
  activePalette: string;
  ambientEffect: 'petals' | 'butterflies' | 'sparkles' | 'doves' | 'none';
  backgroundMusic: {
    enabled: boolean;
    title: string;
    artist: string;
    url: string;
    autoPlay: boolean;
  };
  sections: BuilderSection[];
}
