'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SmoothScrollProvider } from '@/lib/animation/SmoothScrollProvider';
import { Scene } from '@/components/scene/Scene';
import { OpeningScreen } from '@/components/opening/OpeningScreen';
import { HeroSection } from '@/components/invitation/HeroSection';
import { AyatQuoteSection } from '@/components/invitation/AyatQuoteSection';
import { CoupleProfileSection } from '@/components/invitation/CoupleProfileSection';
import { StoryTimelineSection } from '@/components/invitation/StoryTimelineSection';
import { EventScheduleSection } from '@/components/invitation/EventScheduleSection';
import { GallerySection } from '@/components/invitation/GallerySection';
import { RsvpWishesSection } from '@/components/invitation/RsvpWishesSection';
import { DigitalGiftSection } from '@/components/invitation/DigitalGiftSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';
import { MusicPlayer } from '@/components/invitation/MusicPlayer';
import { AccessibilityControls } from '@/components/invitation/AccessibilityControls';
import { FloatingPetals } from '@/components/animation/FloatingPetals';
import { SwayingBotanical } from '@/components/animation/SwayingBotanical';
import { LottiePlayer } from '@/lib/lottie/LottiePlayer';
import { vintageGardenTemplate } from '@/data/vintageGardenTemplate';

function WeddingInvitationApp() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get guest name from URL query parameter ?to=... or ?u=... or ?guest=...
    const toParam = searchParams.get('to') || searchParams.get('u') || searchParams.get('guest');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam.replace(/\+/g, ' ')));
    }
  }, [searchParams]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  const template = vintageGardenTemplate;
  const heroSceneConfig = template.scenes[0];

  return (
    <SmoothScrollProvider enabled={isOpen}>
      <main className="relative w-full min-h-screen bg-vintage-50 text-vintage-900 overflow-x-hidden font-sans">
        {/* Animated Opening Screen Modal */}
        <OpeningScreen
          groom={template.groom}
          bride={template.bride}
          guestName={guestName}
          badge={template.opening.badge}
          greeting={template.opening.greeting}
          isOpen={isOpen}
          onOpen={handleOpenInvitation}
          contentRef={mainContentRef}
        />

        {/* Floating Quick Action: Open Invitation Builder Studio */}
        <div className="fixed top-4 right-4 z-50">
          <a
            href="/builder"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1D15]/90 hover:bg-[#51583D] text-[#FAF9F5] text-xs font-semibold shadow-xl border border-[#C2A676]/60 backdrop-blur-md transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>🎨 Mesin Pembuat Undangan (Studio)</span>
          </a>
        </div>

        {/* Global Ambient Floating Petals across the invitation */}
        <FloatingPetals count={18} type="mixed" className="fixed inset-0 pointer-events-none z-15" />

        {/* Main Invitation Content Body */}
        <div
          ref={mainContentRef}
          className={`w-full max-w-[480px] md:max-w-2xl lg:max-w-4xl mx-auto min-h-screen bg-cream shadow-[0_0_80px_rgba(100,75,60,0.12)] border-x border-gold/20 relative transition-all duration-1000 ${
            isOpen ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
          }`}
        >
          {/* Top Floating Botanical Corners */}
          <div className="absolute top-0 left-0 w-32 md:w-48 pointer-events-none z-20">
            <SwayingBotanical angle={6} duration={4.5} origin="top left">
              <img
                src="/assets/flowers/eucalyptus-branch.svg"
                alt="Botanical"
                className="w-full h-auto opacity-75"
              />
            </SwayingBotanical>
          </div>

          <div className="absolute top-0 right-0 w-32 md:w-48 pointer-events-none z-20">
            <SwayingBotanical angle={-6} duration={5} origin="top right" delay={0.4}>
              <img
                src="/assets/leaves/olive-leaf.svg"
                alt="Olive branch"
                className="w-full h-auto opacity-75 scale-x-[-1]"
              />
            </SwayingBotanical>
          </div>

          {/* 1. Hero / Cover Scene with Layered Architecture */}
          <Scene scene={heroSceneConfig}>
            <HeroSection
              groom={template.groom}
              bride={template.bride}
              mainEvent={template.events[0]}
            />
          </Scene>

          {/* 2. Quranic Ayat & Spiritual Quote */}
          <AyatQuoteSection
            bismillahSrc="/assets/ornaments/bismillah-calligraphy.svg"
            source="QS. Ar-Rum: 21"
          />

          {/* 3. Groom & Bride Profiles */}
          <CoupleProfileSection groom={template.groom} bride={template.bride} />

          {/* 4. Love Story & Journey Timeline */}
          <StoryTimelineSection
            title={template.loveStory.title}
            subtitle={template.loveStory.subtitle}
            milestones={template.loveStory.milestones}
          />

          {/* 5. Event Details (Akad Nikah & Resepsi) */}
          <EventScheduleSection events={template.events} />

          {/* 6. Photo Gallery with Lightbox */}
          <GallerySection
            title={template.gallery.title}
            subtitle={template.gallery.subtitle}
            items={template.gallery.items}
          />

          {/* 7. Interactive RSVP & Wishes Feed with Confetti */}
          <RsvpWishesSection
            title={template.rsvp.title}
            subtitle={template.rsvp.subtitle}
          />

          {/* 8. Digital Wedding Gift & Bank Transfer */}
          <DigitalGiftSection
            title={template.gift.title}
            subtitle={template.gift.subtitle}
            accounts={template.gift.accounts}
            physicalAddress={template.gift.physicalAddress}
          />

          {/* 9. Closing Words & Signature */}
          <ClosingSection
            message={template.closing.message}
            coupleNames={template.closing.coupleNames}
            footnote={template.closing.footnote}
          />

          {/* Bottom Botanical Garland */}
          <div className="w-full max-w-xs mx-auto pb-8 opacity-70">
            <img
              src="/assets/flowers/blooming-bouquet.svg"
              alt="Floral Divider"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Floating Audio Controller */}
        <MusicPlayer config={template.music} autoPlayTrigger={isOpen} />

        {/* Accessibility & Motion Controls */}
        <AccessibilityControls />
      </main>
    </SmoothScrollProvider>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-vintage-50 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        </div>
      }
    >
      <WeddingInvitationApp />
    </Suspense>
  );
}
