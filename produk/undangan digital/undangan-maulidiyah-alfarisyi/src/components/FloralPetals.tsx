import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  colorType: 'rose' | 'pink' | 'white' | 'gold' | 'leaf';
}

export const FloralPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 35 colorful, cheerful floral petals and gold sparkles
    const colors: Petal['colorType'][] = ['rose', 'pink', 'white', 'gold', 'leaf'];
    const petals: Petal[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.4 + 0.35,
      colorType: colors[Math.floor(Math.random() * colors.length)]
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size * 0.8, -p.size, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size * 0.4, p.size / 2, -p.size * 0.8, 0, 0);

      if (p.colorType === 'rose') {
        const grad = ctx.createLinearGradient(0, 0, p.size, p.size);
        grad.addColorStop(0, '#FFA8BA');
        grad.addColorStop(1, '#E65C7B');
        ctx.fillStyle = grad;
      } else if (p.colorType === 'pink') {
        const grad = ctx.createLinearGradient(0, 0, p.size, p.size);
        grad.addColorStop(0, '#FFD6E0');
        grad.addColorStop(1, '#FFAAA6');
        ctx.fillStyle = grad;
      } else if (p.colorType === 'gold') {
        const grad = ctx.createLinearGradient(0, 0, p.size, p.size);
        grad.addColorStop(0, '#FFF2B2');
        grad.addColorStop(1, '#D4AF37');
        ctx.fillStyle = grad;
      } else if (p.colorType === 'leaf') {
        const grad = ctx.createLinearGradient(0, 0, p.size, p.size);
        grad.addColorStop(0, '#B7E4C7');
        grad.addColorStop(1, '#52B788');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = '#FFFFFF';
      }

      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.007) * 0.7 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
    />
  );
};
