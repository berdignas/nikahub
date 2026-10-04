import { PhotoMoment } from '../types';
import { INITIAL_PHOTOS } from '../data/initialPhotos';
import { compressVisuallyLossless } from './imageCompressor';

const DEVICE_ID_KEY = 'fb_device_id_maulidiyah_alfarisyi';
const PHOTOS_STORAGE_KEY = 'fb_photos_v1_maulidiyah_alfarisyi';

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

// Retrieve photos from local storage, merging with initial photos
export function getStoredPhotos(): PhotoMoment[] {
  try {
    const raw = localStorage.getItem(PHOTOS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(INITIAL_PHOTOS));
      return INITIAL_PHOTOS;
    }
    const parsed: PhotoMoment[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(INITIAL_PHOTOS));
      return INITIAL_PHOTOS;
    }
    return parsed;
  } catch (e) {
    console.error('Error reading stored photos:', e);
    return INITIAL_PHOTOS;
  }
}

// Save photos to storage
export function savePhotos(photos: PhotoMoment[]): void {
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.error('Failed to save photos to localStorage:', e);
  }
}

// Count how many photos this device has uploaded
export function getDeviceUploadCount(deviceId?: string): number {
  const currentDeviceId = deviceId || getOrCreateDeviceId();
  const photos = getStoredPhotos();
  return photos.filter(p => p.deviceId === currentDeviceId && !p.isInitialSample).length;
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

// Client-side automatic Visually Lossless image compression
export async function compressImageFile(file: File): Promise<string> {
  const result = await compressVisuallyLossless(file, {
    maxDimension: 2048,
    quality: 0.85,
  });
  return result.dataUrl;
}
