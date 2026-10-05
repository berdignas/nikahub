export interface Wish {
  id: string;
  name: string;
  attendance: 'Hadir' | 'Tidak Hadir';
  message: string;
  timestamp: string;
}

export const INVITATION_DATA = {
  theme: "Vintage 01",
  groom: {
    name: "Habib Yulianto",
    shortName: "Habib",
    father: "Bapak M. Dawam",
    mother: "(Almh) Ibu Dewi Sudarwati",
    childRank: "Putra Kedua",
    instagram: "@Habib",
    instagramUrl: "https://instagram.com",
    photo: "./images/groom.jpg"
  },
  bride: {
    name: "Adiba Putri Syakila",
    shortName: "Adiba",
    father: "Bapak Anas Rifai",
    mother: "Ibu Kholifah",
    childRank: "Putri Pertama",
    instagram: "@Adiba",
    instagramUrl: "https://instagram.com",
    photo: "./images/bride.jpg"
  },
  eventDate: "2026-12-28T08:00:00",
  dateDisplay: "28. 12. 2026",
  quote: {
    ar: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    latin: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "(Qs. Ar-Rum : 21)"
  },
  events: [
    {
      title: "Akad Nikah",
      date: "Senin, 28 Desember 2026",
      time: "Pukul : 08.00 WIB",
      venue: "KEDIAMAN MEMPELAI WANITA",
      address: "Ds Pagu, Wates, Kediri, Jawa Timur",
      mapsUrl: "https://maps.google.com"
    },
    {
      title: "Resepsi",
      date: "Senin, 28 Desember 2026",
      time: "Pukul : 10.00 WIB – Selesai",
      venue: "KEDIAMAN MEMPELAI WANITA",
      address: "Ds Pagu, Wates, Kediri, Jawa Timur",
      mapsUrl: "https://maps.google.com"
    }
  ],
  liveStream: {
    date: "Senin, 28 Desember 2026",
    time: "Pukul : 08.00 WIB",
    platform: "Instagram Live",
    handle: "@Habib",
    url: "https://instagram.com"
  },
  loveStory: [
    {
      title: "Awal Cerita",
      story: "Berawal dari pertemuan sederhana, kami saling mengenal dan mulai berbagi banyak cerita. Tanpa disadari, kebersamaan itu tumbuh menjadi rasa nyaman yang semakin kuat dari hari ke hari."
    },
    {
      title: "Lamaran",
      story: "Dengan niat yang tulus dan restu keluarga, kami memutuskan untuk melangkah ke tahap yang lebih serius. Momen lamaran menjadi awal dari perjalanan baru yang penuh harapan dan doa baik."
    },
    {
      title: "Pernikahan",
      story: "Kini kami sampai pada hari yang kami nantikan, hari di mana dua hati dipersatukan dalam ikatan suci pernikahan. Semoga langkah ini menjadi awal kehidupan baru yang penuh cinta, kebahagiaan, dan keberkahan."
    }
  ],
  gallery: [
    "./images/cover.jpg",
    "./images/groom.jpg",
    "./images/bride.jpg",
    "./images/gallery1.jpg"
  ],
  digitalGift: {
    bank: {
      name: "Bank BCA",
      logo: "./images/bca.webp",
      accountNumber: "12345678",
      accountName: "Habib Yulianto"
    },
    physicalGift: {
      recipientName: "Habib Yulianto",
      phone: "081234567890",
      address: "Ds Pagu Kec. Wates Kab. Kediri"
    }
  },
  closing: {
    greeting: "Wassalamu'alaikum Wr. Wb.",
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
    signature: "Habib & Adiba",
    watermark: "Made with ❤ by Punakawan Digital"
  },
  audio: "./audio/bgm.webm",
  songTitle: "Christina Perri - A Thousand Years (Acoustic)"
};

