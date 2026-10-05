import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CoverModal } from './components/CoverModal';
import { BotanicalLeaves } from './components/BotanicalLeaves';
import { AnimatedDoves } from './components/AnimatedDoves';
import { AnimatedButterflies } from './components/AnimatedButterflies';
import { GoldenSparkles } from './components/GoldenSparkles';
import { FallingPetals } from './components/FallingPetals';
import { HeroSection } from './components/HeroSection';
import { AyatSection } from './components/AyatSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventSection } from './components/EventSection';
import { LiveStreamSection } from './components/LiveStreamSection';
import { LoveStorySection } from './components/LoveStorySection';
import { GallerySection } from './components/GallerySection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { AudioPlayer } from './components/AudioPlayer';
import { BottomNav } from './components/BottomNav';
import { invitationData } from './data/invitationData';

export const App: React.FC = () => {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setIsPlayingMusic(true);
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#141610] flex justify-center items-center relative overflow-x-hidden">
      {/* Global Animated Flying Doves (Burung Terbang) */}
      <AnimatedDoves />

      {/* Global Animated Butterflies (Kupu-kupu) */}
      <AnimatedButterflies />

      {/* Global Golden Sparkles & Floating Particles */}
      <GoldenSparkles />

      {/* Global Falling Petals & Leaves */}
      <FallingPetals />
      <BotanicalLeaves />

      {/* Desktop Background Landscape Canvas */}
      <div
        className="fixed inset-0 hidden lg:block bg-cover bg-center pointer-events-none opacity-45"
        style={{ backgroundImage: 'url(./assets/VINTAGE-04-LAND.webp)' }}
      />

      {/* Desktop Left Side Decorative Panel */}
      <aside className="fixed left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center text-center max-w-[280px] pointer-events-none z-20">
        <div className="w-16 h-16 rounded-full bg-[#51583D]/30 border border-[#C2A676]/40 flex items-center justify-center text-[#E8D8BA] font-serif text-2xl font-bold mb-4 shadow-xl">
          {invitationData.monogram}
        </div>
        <p className="font-serif italic text-sm text-[#C2A676] tracking-widest uppercase mb-1">
          The Wedding of
        </p>
        <h2 className="font-serif text-3xl text-[#FAF9F5] font-normal leading-tight mb-2">
          {invitationData.groom.name} & {invitationData.bride.name}
        </h2>
        <p className="text-xs text-[#A0A694] tracking-wider mb-4">
          {invitationData.eventDateFormatted}
        </p>
        <div className="w-20 h-[1px] bg-[#C2A676]/40 mb-4" />
        <p className="text-[11px] text-[#A0A694]/80 italic">
          "Menyatukan dua insan dalam ikatan suci pernikahan yang penuh berkah dan cinta."
        </p>
      </aside>

      {/* Desktop Right Side Panel */}
      <aside className="fixed right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center text-center max-w-[280px] pointer-events-none z-20">
        <div className="p-4 rounded-3xl bg-[#1A1D16]/80 border border-[#C2A676]/30 backdrop-blur-md shadow-2xl text-[#FAF9F5]">
          <p className="font-serif text-xs uppercase tracking-widest text-[#C2A676] mb-1">
            Digital Invitation
          </p>
          <p className="text-xs text-[#A0A694]">
            Gunakan smartphone Anda untuk pengalaman undangan mobile terbaik.
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-[#767D63]">
            Powered by NikahHub
          </div>
        </div>
      </aside>

      {/* Main Mobile Screen Envelope Container (Max Width 440px) */}
      <main className="relative w-full max-w-[440px] min-h-screen bg-[#FAF9F5] sm:my-6 sm:rounded-[36px] overflow-hidden shadow-2xl border sm:border-[#C2A676]/40 z-10">
        {/* Sections */}
        <HeroSection />
        <AyatSection />
        <CoupleSection />
        <CountdownSection />
        <EventSection />
        <LiveStreamSection />
        <LoveStorySection />
        <GallerySection />
        <GiftSection />
        <RsvpSection />
        <FooterSection />

        {/* Floating Bottom Nav */}
        {!isCoverOpen && <BottomNav />}

        {/* Floating Audio Player */}
        {!isCoverOpen && (
          <AudioPlayer
            isPlaying={isPlayingMusic}
            onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
          />
        )}
      </main>

      {/* Opening Cover Screen Modal */}
      <CoverModal isOpen={isCoverOpen} onOpen={handleOpenInvitation} />
    </div>
  );
};
