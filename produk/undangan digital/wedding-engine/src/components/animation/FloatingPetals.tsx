'use client';

import React, { useEffect, useRef } from 'react';
import { checkReducedMotion } from '@/lib/animation/gsapUtils';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'leaf' | 'sparkle';
}

interface FloatingPetalsProps {
  count?: number;
  className?: string;
  type?: 'petals' | 'leaves' | 'sparkles' | 'mixed';
}

export function FloatingPetals({
  count = 22,
  className = '',
  type = 'mixed',
}: FloatingPetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = {
      petal: ['#eed8d4', '#e2c2be', '#f6e7e4', '#d8aba5'],
      leaf: ['#9eb89d', '#7d9e7c', '#b5c9b4', '#688768'],
      sparkle: ['#dfba73', '#f5e4b8', '#c9a86a', '#ffffff'],
    };

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const pType =
        type === 'mixed'
          ? (['petal', 'leaf', 'sparkle'][Math.floor(Math.random() * 3)] as 'petal' | 'leaf' | 'sparkle')
          : (type.slice(0, -1) as 'petal' | 'leaf' | 'sparkle');

      const palette = colors[pType] || colors.petal;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: pType === 'sparkle' ? Math.random() * 3 + 1.5 : Math.random() * 12 + 8,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.3,
        color: palette[Math.floor(Math.random() * palette.length)],
        type: pType,
      });
    }

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Curved organic petal path
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
      ctx.fill();
      ctx.restore();
    };

    const drawLeaf = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, -p.size);
      ctx.fill();

      // Leaf middle vein
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const drawSparkle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(0, p.size);
        ctx.lineTo(p.size * 0.25, p.size * 0.25);
        ctx.rotate(Math.PI / 2);
      }
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'petal') drawPetal(p);
        else if (p.type === 'leaf') drawLeaf(p);
        else drawSparkle(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, type]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-20 w-full h-full ${className}`}
    />
  );
}
