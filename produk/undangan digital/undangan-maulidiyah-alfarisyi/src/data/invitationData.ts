export interface EventDetail {
  title: string;
  badge: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  calendarUrl: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logo: string;
}

export interface LoveStory {
  year: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  caption: string;
  category: 'prewedding' | 'ceremony' | 'reception';
}

export const INVITATION_DATA = {
  // Monogram & Title
  monogram: "AM",
  title: "The Royal Wedding",
  subtitle: "Walimatul 'Ursy",
  
  // Bride Details
  bride: {
    fullName: "Maulidiyah, S.T.",
    nickname: "Maulida",
    fatherName: "Bpk. Sugiantoro",
    motherName: "Ibu Ismakhil",
    childOrder: "Putri dari pasangan",
    instagram: "nika_hub",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Sosok wanita anggun nan penyayang, yang memancarkan keteduhan dan kehangatan layaknya keindahan merak di taman surga."
  },

  // Groom Details
  groom: {
    fullName: "Ahmad Ferdi, S.Kom.",
    nickname: "Alfarisyi",
    fatherName: "Bapak Rofi'i",
    motherName: "Ibu Salamah",
    childOrder: "Putra dari pasangan",
    instagram: "nika_hub",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Pribadi yang bersahaja, berjiwa ksatria, dan penuh komitmen untuk menjadi nahkoda keluarga yang amanah dan bijaksana."
  },

  // Wedding Date & Target Countdown
  weddingDate: "2026-10-13T19:00:00+07:00",
  dateFormatted: "13 - 14 Oktober 2026",
  islamicDate: "3 - 4 Jumadil Awwal 1448 H",

  // Ayat & Quote
  quranAyat: {
    surah: "QS. Ar-Rum: 21",
    arabic: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
  },

  // Event Details
  events: [
    {
      title: "Akad Nikah",
      badge: "Sakral & Khidmat",
      date: "Selasa, 13 Oktober 2026",
      time: "19.00 WIB - Selesai",
      venue: "Kediaman / Venue Mempelai",
      address: "Kec. Kejayan, Kab. Pasuruan, Jawa Timur",
      mapsUrl: "https://maps.google.com",
      calendarUrl: "https://calendar.google.com"
    },
    {
      title: "Resepsi Pernikahan",
      badge: "Perayaan Agung",
      date: "Rabu, 14 Oktober 2026",
      time: "Waktu Bebas (Menyesuaikan)",
      venue: "Kediaman / Venue Mempelai",
      address: "Kec. Kejayan, Kab. Pasuruan, Jawa Timur",
      mapsUrl: "https://maps.google.com",
      calendarUrl: "https://calendar.google.com"
    }
  ] as EventDetail[],

  // Love Story / Perjalanan Kisah Kasih
  loveStory: [
    {
      year: "2021",
      title: "Untaian Awal Pertemuan",
      description: "Bermula dari sebuah forum simposium akademik kerajaan, takdir menautkan pandangan dan percakapan santun yang membekas dalam sanubari.",
      iconName: "Compass"
    },
    {
      year: "2023",
      title: "Tunas Komitmen & Restu",
      description: "Dengan memohon ridho Ilahi serta restu dari kedua orang tua tercinta, kami memantapkan niat suci untuk melangkah bersama dalam ikatan yang lebih serius.",
      iconName: "Heart"
    },
    {
      year: "2025",
      title: "Pinangan Resmi (Khitbah)",
      description: "Pertemuan keluarga agung dalam suasana penuh kehangatan dan kekeluargaan, mengukuhkan ikrar awal menuju hari bahagia yang dinanti.",
      iconName: "Crown"
    },
    {
      year: "2026",
      title: "Gerbang Pelaminan Abadi",
      description: "Insya Allah, atas izin Allah SWT kami akan mengikat janji suci pernikahan, membangun mahligai rumah tangga yang sakinah, mawaddah, warahmah.",
      iconName: "Sparkles"
    }
  ] as LoveStory[],

  // Bank Accounts / Amplop Digital
  bankAccounts: [
    {
      bankName: "BRI",
      accountNumber: "6480 0102 3765 536",
      accountHolder: "NUR THOIFAH MAULIDIYAH",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg"
    }
  ] as BankAccount[],

  // Physical Gift Shipping Address
  giftAddress: {
    recipient: "Maulidiyah & Alfarisyi",
    phone: "0812-3456-7890",
    address: "Kediaman Mempelai Putri (7RG6+8MQ Wrati, Pasuruan, Jawa Timur)"
  },

  // Prewedding Gallery Photos
  gallery: [
    {
      id: 1,
      url: "/gallery/photo-1.jpeg",
      caption: "Keanggunan cinta berpadu dalam pesona taman istana.",
      category: "prewedding"
    },
    {
      id: 2,
      url: "/gallery/photo-2.jpeg",
      caption: "Langkah pasti merajut asa di bawah naungan doa keluarga.",
      category: "prewedding"
    },
    {
      id: 3,
      url: "/gallery/photo-3.jpeg",
      caption: "Cahaya kehangatan di antara harum semerbak bunga kasturi.",
      category: "ceremony"
    },
    {
      id: 4,
      url: "/gallery/photo-4.jpeg",
      caption: "Senyuman tulus menyongsong hari agung yang penuh berkah.",
      category: "reception"
    },
    {
      id: 5,
      url: "/gallery/photo-5.jpeg",
      caption: "Dua hati yang dipersatukan dalam keindahan cinta yang suci.",
      category: "prewedding"
    },
    {
      id: 6,
      url: "/gallery/photo-6.jpeg",
      caption: "Mahligai bahagia berhiaskan permata ketulusan jiwa.",
      category: "ceremony"
    }
  ] as GalleryItem[],

  // Audio BGM (Ghea Indrawari - 1000x)
  audioUrl: "/audio/ghea-indrawari-1000x.webm",
  
  // WhatsApp RSVP target number
  whatsappNumber: "6281234567890"
};
