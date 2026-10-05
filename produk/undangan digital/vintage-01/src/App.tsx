import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
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
import { GoldenButterflies } from './components/GoldenButterflies';
import { GoldenSparkles } from './components/GoldenSparkles';
import { AutoScrollController } from './components/AutoScrollController';

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [guestName, setGuestName] = useState('Nama Tamu');
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Parse URL query parameter for guest name (e.g. ?to=Budi+Sudarta or ?tamu=Budi or ?u=...)
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('tamu') || params.get('guest') || params.get('u');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  useEffect(() => {
    // Initialize buttery smooth scrolling when cover is opened
    if (!isCoverOpen) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, [isCoverOpen]);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setAutoPlayAudio(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3D312A] relative selection:bg-[#8C6A43] selection:text-white pb-16 overflow-x-hidden font-sans">
      
      {/* Background Animated Elements (Petals, Golden Butterflies, Sparkles & Doves) */}
      <FallingPetals />
      <GoldenSparkles />
      {!isCoverOpen && (
        <>
          <GoldenButterflies />
          <AnimatedDoves />
        </>
      )}

      {/* Cover Modal */}
      <CoverModal
        guestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Content (Revealed when cover is opened) */}
      <main className="max-w-xl mx-auto bg-white/50 backdrop-blur-xs shadow-2xl border-x border-[#E6DCCE]/70 min-h-screen relative z-10 transition-opacity duration-1000">
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

      {/* Floating Controls & Auto Scroll */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />
      <AutoScrollController isCoverOpen={isCoverOpen} />
      <BottomNav />
      
    </div>
  );
}
