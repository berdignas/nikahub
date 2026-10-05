'use client';

import React, { useRef } from 'react';
import { SceneConfig } from '@/types';
import { LayerRenderer } from './LayerRenderer';

interface SceneProps {
  scene: SceneConfig;
  children?: React.ReactNode;
  className?: string;
}

export function Scene({ scene, children, className = '' }: SceneProps) {
  const sceneRef = useRef<HTMLElement>(null);

  // Group layers into background, midground, objects, foreground, particles
  const sortedLayers = [...scene.layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  return (
    <section
      ref={sceneRef}
      id={scene.id}
      data-scene-name={scene.name}
      className={`scene-section relative w-full overflow-hidden ${className} ${scene.className || ''}`}
      style={{
        height: scene.height || 'auto',
        minHeight: scene.minHeight || '100vh',
        backgroundColor: scene.backgroundColor || 'transparent',
      }}
    >
      {/* Background Gradient / Overlay */}
      {scene.overlayGradient && (
        <div
          className="absolute inset-0 pointer-events-none z-2"
          style={{ background: scene.overlayGradient }}
        />
      )}

      {/* Render All Animated Layers */}
      {sortedLayers.map((layer) => (
        <LayerRenderer key={layer.id} layer={layer} sceneRef={sceneRef} />
      ))}

      {/* Interactive Main Content Layer (zIndex: 25) */}
      <div className="relative z-25 w-full h-full flex flex-col items-center justify-center pointer-events-auto">
        {scene.customContent}
        {children}
      </div>
    </section>
  );
}
