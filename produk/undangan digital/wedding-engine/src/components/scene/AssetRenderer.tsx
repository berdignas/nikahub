'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { AssetConfig } from '@/types';
import { applyAnimation } from '@/lib/animation/animations';
import { gsap } from '@/lib/animation/gsapUtils';
import { LottiePlayer } from '@/lib/lottie/LottiePlayer';
import { RivePlayer } from '@/lib/rive/RivePlayer';

interface AssetRendererProps {
  asset: AssetConfig;
  sceneRef?: React.RefObject<HTMLElement>;
}

export function AssetRenderer({ asset, sceneRef }: AssetRendererProps) {
  const assetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!assetRef.current || !asset.animation) return;

    const el = assetRef.current;
    const trigger = sceneRef?.current || el.parentElement;

    const ctx = gsap.context(() => {
      applyAnimation(el, asset.animation, trigger);
    }, assetRef);

    return () => ctx.revert();
  }, [asset.animation, sceneRef]);

  // Position calculation
  const pos = asset.position || {};
  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    top: pos.top,
    bottom: pos.bottom,
    left: pos.left,
    right: pos.right,
    zIndex: asset.zIndex ?? 1,
    opacity: asset.opacity ?? 1,
    transformOrigin: asset.transformOrigin ?? 'center center',
    transform: [
      asset.rotation ? `rotate(${asset.rotation}deg)` : '',
      typeof asset.scale === 'number' ? `scale(${asset.scale})` : '',
      pos.xPercent !== undefined || pos.yPercent !== undefined
        ? `translate(${pos.xPercent || 0}%, ${pos.yPercent || 0}%)`
        : '',
    ]
      .filter(Boolean)
      .join(' '),
    ...asset.style,
  };

  const responsiveClass =
    asset.responsiveHide === 'mobile-only'
      ? 'md:hidden'
      : asset.responsiveHide === 'desktop-only'
      ? 'hidden md:block'
      : '';

  const renderContent = () => {
    switch (asset.type) {
      case 'image':
        return (
          <div
            className="relative"
            style={{
              width: asset.width || 'auto',
              height: asset.height || 'auto',
            }}
          >
            <img
              src={asset.src || ''}
              alt={asset.alt || 'Wedding botanical asset'}
              className="w-full h-full object-contain pointer-events-none select-none"
              loading="lazy"
            />
          </div>
        );

      case 'svg':
        return (
          <div
            className="relative"
            style={{
              width: asset.width || '100%',
              height: asset.height || '100%',
            }}
          >
            {asset.content || (
              <img
                src={asset.src}
                alt={asset.alt || 'Decorative SVG'}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        );

      case 'lottie':
        return (
          <LottiePlayer
            src={asset.src}
            data={typeof asset.content === 'object' ? (asset.content as any) : undefined}
            width={asset.width}
            height={asset.height}
          />
        );

      case 'rive':
        return (
          <RivePlayer
            src={asset.src}
            width={asset.width}
            height={asset.height}
            fallbackContent={asset.content}
          />
        );

      case 'text':
      case 'component':
        return asset.content;

      default:
        return asset.content || null;
    }
  };

  return (
    <div
      ref={assetRef}
      id={asset.id}
      className={`asset-element will-change-transform ${responsiveClass} ${asset.className || ''}`}
      style={positionStyles}
    >
      {renderContent()}
    </div>
  );
}
