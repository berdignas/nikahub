export interface InvitationData {
  groom: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    instagram: string;
    photo: string;
    role: string;
  };
  bride: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    instagram: string;
    photo: string;
    role: string;
  };
  monogram: string;
  quote: {
    arabic: string;
    translation: string;
    surah: string;
  };
  eventDate: string; // ISO format for countdown
  eventDateFormatted: string;
  akad: {
    title: string;
    date: string;
    time: string;
    location: string;
    address: string;
    mapsUrl: string;
  };
  resepsi: {
    title: string;
    date: string;
    time: string;
    location: string;
    address: string;
    mapsUrl: string;
  };
  liveStream: {
    title: string;
    platform: string;
    date: string;
    time: string;
    url: string;
    description: string;
  };
  stories: {
    year: string;
    title: string;
    description: string;
  }[];
  gallery: {
    id: number;
    src: string;
    alt: string;
  }[];
  bankAccounts: {
    bank: string;
    logo: string;
    accountNumber: string;
    accountHolder: string;
    colorScheme: string;
  }[];
  physicalGift: {
    recipient: string;
    phone: string;
    address: string;
    city: string;
  };
  audioUrl: string;
}

export const invitationData: InvitationData = {
  groom: {
    name: 'Rian',
    fullName: 'Rian Aditya Pratama, S.T.',
    father: 'Bapak Ir. H. Joko Santoso',
    mother: 'Ibu Hj. Endang Sulastri',
    instagram: 'rian.aditya',
    photo: './assets/Picture3-2.webp',
    role: 'Putra Pertama dari',
  },
  bride: {
    name: 'Nadia',
    fullName: 'Nadia Safira Putri, S.Farm.',
    father: 'Bapak H. Bambang Gunawan',
    mother: 'Ibu Hj. Siti Rahmawati',
    instagram: 'nadiasafira',
    photo: './assets/Picture4-2.webp',
    role: 'Putri Kedua dari',
  },
  monogram: 'RN',
  quote: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    translation: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.',
    surah: 'QS. Ar-Rum: 21',
  },
  eventDate: '2026-11-28T08:00:00',
  eventDateFormatted: 'Sabtu, 28 November 2026',
  akad: {
    title: 'Akad Nikah',
    date: 'Sabtu, 28 November 2026',
    time: 'Pukul 08.00 - 10.00 WIB',
    location: 'Masjid Botanical Pavilion & Glasshouse',
    address: 'Jl. Taman Menteng Raya No. 18, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Jakarta',
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: 'Sabtu, 28 November 2026',
    time: 'Pukul 11.00 WIB - Selesai',
    location: 'Grand Ballroom Botanical Pavilion',
    address: 'Jl. Taman Menteng Raya No. 18, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Jakarta',
  },
  liveStream: {
    title: 'Live Streaming Pernikahan',
    platform: 'YouTube & Instagram Live',
    date: 'Sabtu, 28 November 2026',
    time: 'Pukul 08.00 WIB - Selesai',
    url: 'https://youtube.com',
    description: 'Bagi keluarga dan sahabat yang belum dapat hadir secara langsung, kami mengundang Anda untuk turut menyaksikan momen sakral pernikahan kami secara virtual.',
  },
  stories: [
    {
      year: '2022',
      title: 'Awal Cerita',
      description: 'Berawal dari pertemuan sederhana dalam sebuah forum kolaborasi, kami saling mengenal, berbagi cerita, dan menemukan visi masa depan yang seirama.',
    },
    {
      year: '2024',
      title: 'Lamaran & Restu',
      description: 'Dengan ketulusan niat dan doa restu dari kedua orang tua tercinta, kami memantapkan langkah untuk saling berkomitmen mengikat janji suci.',
    },
    {
      year: '2026',
      title: 'Menuju Pelaminan',
      description: 'Kini hari yang dinantikan telah tiba. Di hadapan keluarga, sahabat, dan sang Khalik, kami berikrar untuk mengarungi bahtera kehidupan bersama selamanya.',
    },
  ],
  gallery: [
    { id: 1, src: './assets/sm-K-1-1-1.jpg', alt: 'Romantic Prewedding Moment 1' },
    { id: 2, src: './assets/sm-K-2-1.jpg', alt: 'Romantic Prewedding Moment 2' },
    { id: 3, src: './assets/sm-K-4-1.jpg', alt: 'Romantic Prewedding Moment 3' },
    { id: 4, src: './assets/sm-K-5-1.jpg', alt: 'Romantic Prewedding Moment 4' },
    { id: 5, src: './assets/sm-K-6-1.jpg', alt: 'Romantic Prewedding Moment 5' },
    { id: 6, src: './assets/sm-K-7-1-1.jpg', alt: 'Romantic Prewedding Moment 6' },
    { id: 7, src: './assets/sm-K-10-1.jpg', alt: 'Romantic Prewedding Moment 7' },
    { id: 8, src: './assets/sm-K-11-1.jpg', alt: 'Romantic Prewedding Moment 8' },
  ],
  bankAccounts: [
    {
      bank: 'BCA',
      logo: './assets/BCA_5770.webp',
      accountNumber: '5770 1234 56',
      accountHolder: 'Rian Aditya Pratama',
      colorScheme: 'bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#172554]',
    },
    {
      bank: 'MANDIRI',
      logo: './assets/BCA_5770.webp',
      accountNumber: '1370 0987 6543 2',
      accountHolder: 'Nadia Safira Putri',
      colorScheme: 'bg-gradient-to-br from-[#3D4730] via-[#515E3F] to-[#2A3122]',
    },
  ],
  physicalGift: {
    recipient: 'Rian Aditya & Nadia Safira',
    phone: '0812-8899-7766',
    address: 'Komplek Botanical Garden Residence Blok C No. 12, Jl. Taman Palem, Cilandak Barat',
    city: 'Jakarta Selatan, DKI Jakarta 12430',
  },
  audioUrl: './assets/wedding-music.mp3',
};
