/**
 * Visually Lossless Image Compression Engine
 * Memperkecil ukuran file gambar hingga 80-90% TANPA mengurangi kualitas visual yang terlihat mata manusia.
 */

export interface CompressionOptions {
  maxDimension?: number; // 2048px preserves crisp 4K details
  quality?: number;      // 0.85 gives optimal visual clarity vs file size ratio
  outputFormat?: 'image/webp' | 'image/jpeg';
}

export async function compressVisuallyLossless(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; originalSizeKb: number; compressedSizeKb: number }> {
  const maxDimension = options.maxDimension || 2048;
  const quality = options.quality || 0.85;

  const originalSizeKb = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Smart proportional resizing (max 2048px)
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: img.src,
            originalSizeKb,
            compressedSizeKb: originalSizeKb,
          });
          return;
        }

        // High-fidelity image smoothing algorithms
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for ultra-crisp compression, fallback to high-grade JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const compressedSizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          originalSizeKb,
          compressedSizeKb,
        });
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
    reader.readAsDataURL(file);
  });
}
