'use client';

import React from 'react';
import { LayerConfig } from '@/types';
import { AssetRenderer } from './AssetRenderer';

interface LayerRendererProps {
  layer: LayerConfig;
  sceneRef?: React.RefObject<HTMLElement>;
}

export function LayerRenderer({ layer, sceneRef }: LayerRendererProps) {
  // Default z-indexes based on layer type
  const defaultZIndexMap = {
    background: 1,
    midground: 10,
    objects: 20,
    foreground: 30,
    particles: 40,
  };

  const calculatedZIndex = layer.zIndex ?? defaultZIndexMap[layer.type] ?? 10;

  return (
    <div
      id={layer.id}
      data-layer-type={layer.type}
      className={`layer-container absolute inset-0 pointer-events-none ${layer.className || ''}`}
      style={{
        zIndex: calculatedZIndex,
        ...layer.style,
      }}
    >
      {layer.assets.map((asset) => (
        <AssetRenderer key={asset.id} asset={asset} sceneRef={sceneRef} />
      ))}
    </div>
  );
}
