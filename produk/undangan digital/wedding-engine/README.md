# 🌸 Wedding Invitation Web Engine (Wekita Vintage 04 Style)

Wedding Invitation Web Engine modern dengan arsitektur **Layered Scene System**, animasi independen berbasis **GSAP & ScrollTrigger**, **Lenis Smooth Scrolling**, **Lottie/dotLottie**, **Rive**, serta responsive mobile-first visual experience.

---

## 🚀 Fitur Utama Engine

1. **Layered Scene System**
   - `background`: Ken Burns slow-zoom ambient movement, botanical canvas / textured parchment.
   - `midground`: Parallax depth elements, archways, eucalyptus branches, olive leaves.
   - `objects`: Monogram, photo frames, floating flower bouquets, wax seal badge.
   - `foreground`: Swaying leaves & moving floral corners.
   - `particles`: Canvas high-performance falling petals, leaves & golden sparkles.
2. **11 Reusable Animation Utilities**
   - `fadeIn`, `fadeUp`, `fadeDown`, `scaleIn`, `slowZoom`, `parallax`, `sway`, `floating`, `leafFall`, `reveal`, `openingTransition`.
3. **Animated Opening Screen & "Buka Undangan"**
   - Dynamic guest name dari URL query (`?to=Nama+Tamu`).
   - Cinematic unmasking gate/envelope reveal transition.
   - Auto-play background music saat tombol diklik.
4. **Interactive Sections**
   - **Hero / Cover**: Countdown timer live, animated archway.
   - **Ayat & Kutipan**: Kaligrafi Bismillah, Surah Ar-Rum: 21 dengan efek reveal.
   - **Mempelai Pria & Wanita**: Frame foto botanical vintage, orang tua, Instagram link.
   - **Love Story**: Timeline perjalanan cinta dengan milestone card.
   - **Jadwal Acara**: Akad Nikah & Resepsi dengan tombol Google Maps & Google Calendar (.ics).
   - **Galeri Foto**: Lightbox modal interaktif dengan preview fullscreen & zoom.
   - **RSVP & Buku Tamu**: Live form dengan status kehadiran, counter tamu, confetti burst saat submit, dan feed komentar.
   - **Digital Gift**: Bank transfer dengan 1-click copy nomor rekening (toast feedback) & QRIS barcode modal.
   - **Floating Music Player**: Vinyl record disc berputar dengan animasi audio waves, tombol play/pause.
   - **Reduced Motion & Accessibility**: Mendukung preferensi pengurangan gerakan OS dan toggle manual.

---

## 📁 Struktur Folder

```text
produk/undangan digital/wedding-engine/
├── public/
│   └── assets/
│       ├── backgrounds/
│       ├── flowers/
│       ├── leaves/
│       ├── scenery/
│       ├── ornaments/
│       ├── animations/
│       └── music/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── animation/
│   │   │   ├── FloatingPetals.tsx
│   │   │   ├── ParallaxLayer.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── SlowZoomBackground.tsx
│   │   │   ├── SvgVintageFrame.tsx
│   │   │   └── SwayingBotanical.tsx
│   │   ├── invitation/
│   │   │   ├── AccessibilityControls.tsx
│   │   │   ├── AyatQuoteSection.tsx
│   │   │   ├── ClosingSection.tsx
│   │   │   ├── CoupleProfileSection.tsx
│   │   │   ├── DigitalGiftSection.tsx
│   │   │   ├── EventScheduleSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MusicPlayer.tsx
│   │   │   ├── RsvpWishesSection.tsx
│   │   │   └── StoryTimelineSection.tsx
│   │   ├── opening/
│   │   │   └── OpeningScreen.tsx
│   │   └── scene/
│   │       ├── AssetRenderer.tsx
│   │       ├── LayerRenderer.tsx
│   │       └── Scene.tsx
│   ├── data/
│   │   ├── index.ts
│   │   └── vintageGardenTemplate.ts
│   ├── lib/
│   │   ├── animation/
│   │   │   ├── animations.ts
│   │   │   ├── gsapUtils.ts
│   │   │   └── SmoothScrollProvider.tsx
│   │   ├── lottie/
│   │   │   └── LottiePlayer.tsx
│   │   └── rive/
│   │       └── RivePlayer.tsx
│   └── types/
│       └── index.ts
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Menjalankan Engine

```bash
cd "produk/undangan digital/wedding-engine"
npm run dev
```

Buka browser di `http://localhost:3005` atau coba URL dengan nama tamu:
`http://localhost:3005/?to=Bapak+Joko+%26+Keluarga`
