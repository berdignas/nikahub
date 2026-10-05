import React, { useState, useEffect } from 'react';
import { CoverModal } from './components/CoverModal';
import { HeroSection } from './components/HeroSection';
import { AyatSection } from './components/AyatSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { DressCodeSection } from './components/DressCodeSection';
import { LiveStreamSection } from './components/LiveStreamSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { AudioPlayer } from './components/AudioPlayer';
import { BottomNav } from './components/BottomNav';
import { FallingPetals } from './components/FallingPetals';
import { AnimatedDoves } from './components/AnimatedDoves';

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [guestName, setGuestName] = useState('Nama Tamu');
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  useEffect(() => {
    // Parse URL query parameter for guest name (e.g. ?to=Budi+Sudarta or ?tamu=Budi)
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('tamu') || params.get('guest');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setAutoPlayAudio(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3D312A] relative selection:bg-[#8C6A43] selection:text-white pb-16 overflow-x-hidden">
      
      {/* Background Animated Elements (Petals & Doves of Love) */}
      <FallingPetals />
      {!isCoverOpen && <AnimatedDoves />}

      {/* Cover Modal */}
      <CoverModal
        guestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Content (Revealed when cover is opened) */}
      <main className="max-w-xl mx-auto bg-white/40 shadow-2xl border-x border-[#E6DCCE]/60 min-h-screen relative z-10">
        <HeroSection />
        <AyatSection />
        <CoupleSection />
        <CountdownSection />
        <DressCodeSection />
        <LiveStreamSection />
        <LoveStorySection />
        <GallerySection />
        <GiftSection />
        <RsvpSection initialGuestName={guestName === 'Nama Tamu' ? '' : guestName} />
        <FooterSection />
      </main>

      {/* Floating Controls */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />
      <BottomNav />
      
    </div>
  );
}
