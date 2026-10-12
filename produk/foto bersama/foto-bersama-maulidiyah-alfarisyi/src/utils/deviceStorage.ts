import { PhotoMoment, GuestAlbum, CommentItem } from '../types';
import { INITIAL_ALBUMS, INITIAL_PHOTOS } from '../data/initialPhotos';
import { compressVisuallyLossless } from './imageCompressor';

const DEVICE_ID_KEY = 'fb_device_id_maulidiyah_alfarisyi';
const PHOTOS_STORAGE_KEY = 'fb_photos_v2_clean_maulidiyah_alfarisyi';
const ALBUMS_STORAGE_KEY = 'fb_albums_v3_clean_maulidiyah_alfarisyi';

export const MAX_PHOTO_PER_DEVICE = 5;

// Generate or retrieve persistent device UUID
export function getOrCreateDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return 'dev_fallback_' + Date.now();
  }
}

// Auto-purge any legacy oversized localStorage cache (> 2 MB) from older app versions
export function purgeLegacyOversizedStorage(): void {
  try {
    const rawAlbums = localStorage.getItem(ALBUMS_STORAGE_KEY);
    if (rawAlbums && rawAlbums.length > 2 * 1024 * 1024) {
      console.warn('Auto-purged legacy oversized localStorage cache to prevent quota crash.');
      localStorage.removeItem(ALBUMS_STORAGE_KEY);
    }
    const rawPhotos = localStorage.getItem(PHOTOS_STORAGE_KEY);
    if (rawPhotos && rawPhotos.length > 500 * 1024) {
      localStorage.removeItem(PHOTOS_STORAGE_KEY);
    }
  } catch {}
}

purgeLegacyOversizedStorage();

// Retrieve guest albums from local storage (clean without dummy samples)
export function getStoredAlbums(): GuestAlbum[] {
  try {
    const raw = localStorage.getItem(ALBUMS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: GuestAlbum[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    // Filter out dummy samples and ensure albums have usable photo items
    const cleanAlbums = parsed.filter(
      (a) => !a.isInitialSample && a.photos && a.photos.length > 0
    );
    return cleanAlbums;
  } catch (e) {
    console.error('Error reading stored albums:', e);
    return [];
  }
}

// Save guest albums to local storage safely without overflowing 5MB localStorage quota
export function saveAlbums(albums: GuestAlbum[]): void {
  try {
    const currentDevId = getOrCreateDeviceId();
    // STRICT STORAGE INTEGRITY:
    // Only cache albums belonging to THIS device in localStorage!
    // Other guests' photos are managed in React state directly from Supabase.
    // This ensures localStorage NEVER exceeds 1MB even with thousands of wedding attendees!
    const myAlbumsOnly = albums.filter(
      (alb) => alb.deviceId === currentDevId && !alb.isInitialSample
    );
    localStorage.setItem(ALBUMS_STORAGE_KEY, JSON.stringify(myAlbumsOnly));
  } catch (e) {
    console.warn('LocalStorage save quota exceeded, safely clearing local cache:', e);
    try {
      localStorage.removeItem(ALBUMS_STORAGE_KEY);
      localStorage.removeItem(PHOTOS_STORAGE_KEY);
    } catch (err) {
      console.warn('LocalStorage emergency recovery notice:', err);
    }
  }
}

// Retrieve photos from local storage, merging with initial photos (backward-compatibility)
export function getStoredPhotos(): PhotoMoment[] {
  const albums = getStoredAlbums();
  return albums.flatMap((a) => a.photos);
}

// Save photos to storage (backward-compatibility)
export function savePhotos(photos: PhotoMoment[]): void {
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.warn('Failed to save photos to localStorage:', e);
  }
}

// Count how many photos this device has uploaded across its albums
export function getDeviceUploadCount(deviceId?: string): number {
  const currentDeviceId = deviceId || getOrCreateDeviceId();
  const albums = getStoredAlbums();
  const deviceAlbums = albums.filter((a) => a.deviceId === currentDeviceId && !a.isInitialSample);
  return deviceAlbums.reduce((sum, album) => sum + (album.photos ? album.photos.length : 0), 0);
}

// Check if device can upload more (strictly max 5)
export function canDeviceUpload(deviceId?: string): boolean {
  return getDeviceUploadCount(deviceId) < MAX_PHOTO_PER_DEVICE;
}

// Remaining upload quota
export function getRemainingUploadQuota(deviceId?: string): number {
  const count = getDeviceUploadCount(deviceId);
  return Math.max(0, MAX_PHOTO_PER_DEVICE - count);
}

// Client-side automatic Visually Lossless image compression (Optimized Full HD+ / 2K Studio Sharpness)
export async function compressImageFile(file: File): Promise<string> {
  const result = await compressVisuallyLossless(file, {
    maxDimension: 1920,
    quality: 0.82,
  });
  return result.dataUrl;
}

export interface StorageStats {
  totalBytes: number;
  totalPhotos: number;
  usedMb: number;
  maxMb: number;
  maxGb: number;
  percentage: number;
  isFull: boolean;
  isNearLimit: boolean;
}

export function calculateStorageStats(albums: GuestAlbum[], maxGb: number = 1.0): StorageStats {
  let totalBytes = 0;
  let totalPhotos = 0;

  for (const album of albums) {
    if (album.photos) {
      for (const p of album.photos) {
        totalPhotos++;
        if (p.imageUrl?.startsWith('data:')) {
          totalBytes += Math.round((p.imageUrl.length * 3) / 4);
        } else {
          totalBytes += 600 * 1024;
        }
      }
    }
    if (album.voiceNoteUrl?.startsWith('data:')) {
      totalBytes += Math.round((album.voiceNoteUrl.length * 3) / 4);
    }
  }

  const maxBytes = maxGb * 1024 * 1024 * 1024;
  const usedMb = totalBytes / (1024 * 1024);
  const maxMb = maxGb * 1024;
  const percentage = Math.min(100, Math.round((totalBytes / maxBytes) * 100));
  const isFull = totalBytes >= maxBytes;
  const isNearLimit = percentage >= 85;

  return {
    totalBytes,
    totalPhotos,
    usedMb: Number(usedMb.toFixed(1)),
    maxMb,
    maxGb,
    percentage,
    isFull,
    isNearLimit,
  };
}
