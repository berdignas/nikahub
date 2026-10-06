import React from 'react';

/**
 * Extracts embeddable URL from various video providers:
 * - YouTube (standard watch, short youtu.be, embed, shorts)
 * - Vimeo
 * - Google Drive preview
 */
export function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube
  // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`;
  }

  // Vimeo
  // Matches: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`;
  }

  // Google Drive
  // Matches: drive.google.com/file/d/ID/...
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  return null;
}

/**
 * Check if the URL points to a direct video file or blob/data URI
 */
export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.startsWith('data:video') ||
    trimmed.startsWith('blob:') ||
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg') ||
    trimmed.endsWith('.mov') ||
    trimmed.includes('/wedding-images/video-') ||
    trimmed.includes('/documents/video-') ||
    trimmed.includes('/media/video-') ||
    trimmed.includes('.mp4?')
  );
}

interface VideoPlayerProps {
  url: string;
  className?: string;
  title?: string;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  className = 'w-full h-full rounded-2xl',
  title = 'Video Dokumentasi Layanan',
  autoPlay = false
}) => {
  const embedUrl = getVideoEmbedUrl(url);

  if (embedUrl) {
    return (
      <iframe
        src={autoPlay ? `${embedUrl}&autoplay=1` : embedUrl}
        title={title}
        className={`${className} border-0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // Direct HTML5 Video Player
  return (
    <video
      src={url}
      controls
      playsInline
      autoPlay={autoPlay}
      className={`${className} object-cover bg-black`}
    >
      Browser Anda tidak mendukung tag video HTML5.
    </video>
  );
};
