import { InvitationData, SceneConfig } from '@/types';

export const vintageGardenScenes: SceneConfig[] = [
  // Scene 1: Hero / Welcome Garden Scene
  {
    id: 'hero-scene',
    name: 'Vintage Garden Hero',
    minHeight: '100vh',
    overlayGradient: 'linear-gradient(180deg, rgba(250,248,245,0.85) 0%, rgba(244,239,232,0.6) 50%, rgba(250,248,245,0.95) 100%)',
    layers: [
      // 1. Background Layer
      {
        id: 'hero-bg-layer',
        type: 'background',
        zIndex: 1,
        assets: [
          {
            id: 'hero-bg-texture',
            type: 'image',
            src: '/assets/backgrounds/vintage-parchment-texture.svg',
            position: { top: 0, left: 0, right: 0, bottom: 0 },
            opacity: 0.5,
            animation: {
              type: 'slowZoom',
              duration: 20,
              intensity: 1.08,
            },
          },
        ],
      },
      // 2. Midground Layer
      {
        id: 'hero-mid-layer',
        type: 'midground',
        zIndex: 10,
        assets: [
          {
            id: 'hero-top-left-eucalyptus',
            type: 'image',
            src: '/assets/flowers/eucalyptus-branch.svg',
            width: '240px',
            position: { top: '-40px', left: '-40px' },
            rotation: -35,
            opacity: 0.85,
            animation: {
              type: 'sway',
              intensity: 7,
              duration: 5.5,
              delay: 0,
            },
          },
          {
            id: 'hero-top-right-olive',
            type: 'image',
            src: '/assets/leaves/olive-leaf.svg',
            width: '220px',
            position: { top: '-30px', right: '-40px' },
            rotation: 40,
            opacity: 0.85,
            animation: {
              type: 'sway',
              intensity: -6,
              duration: 4.8,
              delay: 0.5,
            },
          },
        ],
      },
      // 3. Objects Layer
      {
        id: 'hero-objects-layer',
        type: 'objects',
        zIndex: 20,
        assets: [
          {
            id: 'hero-floating-rose-left',
            type: 'image',
            src: '/assets/flowers/vintage-rose.svg',
            width: '120px',
            position: { top: '35%', left: '5%' },
            opacity: 0.8,
            responsiveHide: 'mobile-only',
            animation: {
              type: 'floating',
              intensity: 14,
              duration: 5,
            },
          },
          {
            id: 'hero-floating-rose-right',
            type: 'image',
            src: '/assets/flowers/vintage-rose.svg',
            width: '130px',
            position: { top: '40%', right: '5%' },
            opacity: 0.8,
            responsiveHide: 'mobile-only',
            animation: {
              type: 'floating',
              intensity: 16,
              duration: 5.5,
              delay: 0.8,
            },
          },
        ],
      },
      // 4. Foreground Layer
      {
        id: 'hero-foreground-layer',
        type: 'foreground',
        zIndex: 30,
        assets: [
          {
            id: 'hero-botanical-bouquet-bottom-left',
            type: 'image',
            src: '/assets/flowers/blooming-bouquet.svg',
            width: '260px',
            position: { bottom: '-40px', left: '-50px' },
            opacity: 0.9,
            animation: {
              type: 'sway',
              intensity: 5,
              duration: 6,
              delay: 0.2,
            },
          },
          {
            id: 'hero-botanical-bouquet-bottom-right',
            type: 'image',
            src: '/assets/flowers/blooming-bouquet.svg',
            width: '260px',
            position: { bottom: '-40px', right: '-50px' },
            rotation: 15,
            opacity: 0.9,
            animation: {
              type: 'sway',
              intensity: -5,
              duration: 5.8,
              delay: 0.6,
            },
          },
        ],
      },
      // 5. Particles Layer
      {
        id: 'hero-particles-layer',
        type: 'particles',
        zIndex: 40,
        assets: [],
      },
    ],
  },
];

export const vintageGardenTemplate: InvitationData = {
  id: 'template-vintage-garden-04',
  slug: 'vintage-garden-04',
  templateName: 'Wekita Vintage 04 - Vintage Garden',
  themeColor: '#516c52',
  accentColor: '#c9a86a',
  groom: {
    name: 'Dion',
    fullName: 'Raden Dion Alfarisyi, S.T.',
    role: 'Groom',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    father: 'H. Bambang Alfarisyi',
    mother: 'Hj. Siti Rahmawati',
    orderInFamily: 'Putra Pertama dari',
    instagram: '@dionalfarisyi',
  },
  bride: {
    name: 'Sarah',
    fullName: 'Maulidiyah Sarah Azzahra, S.Farm.',
    role: 'Bride',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    father: 'H. M. Syaifullah, M.Pd.',
    mother: 'Hj. Nurul Hidayati',
    orderInFamily: 'Putri Kedua dari',
    instagram: '@sarah.azzahra',
  },
  opening: {
    badge: 'THE WEDDING CELEBRATION',
    greeting: 'Kepada Yth. Bapak/Ibu/Saudara/i',
    guestNameFallback: 'Tamu Undangan',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    quoteTitle: 'WALIMATUL ‘URS',
    quoteContent: 'Dan Kami menciptakan kamu berpasang-pasangan.',
    quoteSource: 'QS. An-Naba: 8',
    buttonText: 'Buka Undangan',
  },
  events: [
    {
      id: 'akad-nikah',
      badge: 'AKAD NIKAH',
      title: 'Akad Nikah',
      date: 'Minggu, 25 Oktober 2026',
      dateISO: '2026-10-25T08:00:00',
      time: '08:00 - 10:00 WIB',
      venue: 'Masjid Agung Al-Mabruk',
      address: 'Jl. Taman Kebon Sirih No. 12, Menteng, Jakarta Pusat',
      mapUrl: 'https://maps.google.com/?q=Jakarta',
    },
    {
      id: 'resepsi-pernikahan',
      badge: 'RESEPSI',
      title: 'Resepsi Pernikahan',
      date: 'Minggu, 25 Oktober 2026',
      dateISO: '2026-10-25T11:00:00',
      time: '11:00 - 14:00 WIB',
      venue: 'The Glass House Vintage Pavilion',
      address: 'Jl. Harmoni Botanical Garden No. 88, Jakarta Selatan',
      mapUrl: 'https://maps.google.com/?q=Jakarta',
    },
  ],
  loveStory: {
    title: 'Our Love Story',
    subtitle: 'Kisah Perjalanan Kami',
    milestones: [
      {
        year: '2020',
        date: '14 Februari 2020',
        title: 'Pertama Kali Bertemu',
        description:
          'Pertemuan tak terduga di sebuah seminar kampus yang menjadi awal dari obrolan panjang, bertukar ide, dan benih rasa yang tumbuh perlahan.',
        photo: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
      },
      {
        year: '2023',
        date: '20 Agustus 2023',
        title: 'Komitmen Bersama',
        description:
          'Setelah 3 tahun saling memahami dan mendukung mimpi masing-masing, kami memutuskan untuk melangkah ke jenjang yang lebih serius.',
        photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
      },
      {
        year: '2026',
        date: '10 Januari 2026',
        title: 'The Engagement (Lamaran)',
        description:
          'Di hadapan kedua keluarga besar, kami mengikat janji suci pertunangan dan merencanakan hari pernikahan yang penuh berkah.',
        photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
  gallery: {
    title: 'Captured Moments',
    subtitle: 'Galeri Foto Kebersamaan',
    items: [
      {
        id: 'gal-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
        caption: 'Prewedding in Botanic Garden',
      },
      {
        id: 'gal-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
        caption: 'The Sunset Glow',
      },
      {
        id: 'gal-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        caption: 'A Promise to Cherish',
      },
      {
        id: 'gal-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
        caption: 'Warm Laughter & Joy',
      },
      {
        id: 'gal-5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
        caption: 'Forever Hand in Hand',
      },
      {
        id: 'gal-6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
        caption: 'Vintage Romance',
      },
    ],
  },
  rsvp: {
    title: 'RSVP & Ucapan Doa',
    subtitle: 'Konfirmasi Kehadiran',
    allowPlusGuests: true,
  },
  gift: {
    title: 'Wedding Gift',
    subtitle: 'Tanda Kasih Digital',
    accounts: [
      {
        bankName: 'BCA',
        accountNumber: '8830912839',
        accountHolder: 'RADEN DION ALFARISYI',
        qrCodeUrl: '/assets/ornaments/wax-seal-gold.svg',
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1370019283741',
        accountHolder: 'MAULIDIYAH SARAH AZZAHRA',
      },
    ],
    physicalAddress: {
      recipientName: 'Dion & Sarah',
      phone: '+62 812-3456-7890',
      address: 'Jl. Harmony Garden Villa No. 18, Cilandak, Jakarta Selatan, 12430',
    },
  },
  healthProtocol: {
    title: 'Protokol Acara',
    items: [
      {
        title: 'Jaga Kenyamanan',
        description: 'Menjaga ketertiban dan kebersihan selama acara berlangsung',
        icon: 'heart',
      },
      {
        title: 'Tepat Waktu',
        description: 'Hadir sesuai dengan sesi waktu undangan yang tertera',
        icon: 'clock',
      },
    ],
  },
  closing: {
    message:
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami berdua.',
    coupleNames: 'Dion & Sarah',
    footnote: '© 2026 Dion & Sarah Wedding Invitation. Powered by Wedding Engine.',
  },
  music: {
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-story-112194.mp3',
    title: 'A Thousand Years (Acoustic)',
    artist: 'Wedding Strings Ensemble',
    autoPlayOnOpen: true,
    loop: true,
    initialVolume: 0.65,
  },
  scenes: vintageGardenScenes,
};
