import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { OpeningCover } from './components/OpeningCover';
import { FloralPetals } from './components/FloralPetals';
import { AudioPlayer } from './components/AudioPlayer';
import { AutoScrollController } from './components/AutoScrollController';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { AyatSection } from './components/AyatSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventSection } from './components/EventSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { THEME_ASSETS } from './data/themeAssets';
import { INVITATION_DATA } from './data/invitationData';

export const App: React.FC = () => {
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [startAudio, setStartAudio] = useState<boolean>(false);

  useEffect(() => {
    // Ambil nama tamu dari parameter URL: ?to=Nama+Tamu
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest') || params.get('u');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    setStartAudio(true);

    // Efek kelopak bunga & emas lembut saat pembukaan
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#685c46', '#b8c4ae', '#f8f6e1', '#d8c08a']
    });

    // Reset scroll ke atas seketika tanpa animasi bertabrakan
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#222a20] relative flex justify-center">
      {/* 1. Ambient Desktop Background with Real Couple Photo */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-40 blur-sm pointer-events-none -z-10"
        style={{ backgroundImage: `url(${THEME_ASSETS.storyBg})` }}
      />

      {/* 2. Floating Petals Canvas */}
      <FloralPetals />

      {/* 3. Opening Cover Curtain & Wax Seal */}
      <OpeningCover
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        guestName={guestName}
      />

      {/* 4. Central Invitation Canvas (Phone Proportions max-w-[430px]) */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#b8c4ae] relative shadow-[0_0_90px_rgba(0,0,0,0.65)] border-x border-[#685c46]/25 overflow-x-hidden">
        
        {/* Floating Audio Controller */}
        <AudioPlayer
          audioUrl={INVITATION_DATA.audioUrl}
          autoPlayTrigger={startAudio}
        />

        {/* Floating Auto Scroll Controller */}
        <AutoScrollController isCoverOpen={isCoverOpen} />

        {/* Floating Bottom Nav */}
        {isCoverOpen && <FloatingNav />}

        {/* Main Content */}
        <main className={`transition-opacity duration-1000 ${isCoverOpen ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          {/* Hero Section */}
          <HeroSection />

          {/* Ayat Suci & Doa */}
          <AyatSection />

          {/* Profil Mempelai (Nur Thoifah & Ahmad Ferdi) */}
          <CoupleSection />

          {/* Countdown Timer */}
          <CountdownSection />

          {/* Rangkaian Acara (Akad & Resepsi) */}
          <EventSection />

          {/* Kisah Kasih (Love Story) */}
          <StorySection />

          {/* Galeri Prewedding */}
          <GallerySection />

          {/* Amplop Digital & Tanda Kasih */}
          <GiftSection />

          {/* RSVP & Buku Tamu */}
          <RsvpSection />

          {/* Penutup */}
          <FooterSection />
        </main>
      </div>
    </div>
  );
};

export default App;
