import { PhotoMoment, GuestAlbum, CommentItem } from '../types';
import { INITIAL_ALBUMS, INITIAL_PHOTOS } from '../data/initialPhotos';
import { compressVisuallyLossless } from './imageCompressor';

const DEVICE_ID_KEY = 'fb_device_id_maulidiyah_alfarisyi';
const PHOTOS_STORAGE_KEY = 'fb_photos_v1_maulidiyah_alfarisyi';
const ALBUMS_STORAGE_KEY = 'fb_albums_v2_maulidiyah_alfarisyi';

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

// Retrieve guest albums from local storage
export function getStoredAlbums(): GuestAlbum[] {
  try {
    const raw = localStorage.getItem(ALBUMS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ALBUMS_STORAGE_KEY, JSON.stringify(INITIAL_ALBUMS));
      return INITIAL_ALBUMS;
    }
    const parsed: GuestAlbum[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(ALBUMS_STORAGE_KEY, JSON.stringify(INITIAL_ALBUMS));
      return INITIAL_ALBUMS;
    }
    return parsed;
  } catch (e) {
    console.error('Error reading stored albums:', e);
    return INITIAL_ALBUMS;
  }
}

// Save guest albums to local storage
export function saveAlbums(albums: GuestAlbum[]): void {
  try {
    localStorage.setItem(ALBUMS_STORAGE_KEY, JSON.stringify(albums));
  } catch (e) {
    console.error('Failed to save albums to localStorage:', e);
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
    console.error('Failed to save photos to localStorage:', e);
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

// Client-side automatic Visually Lossless image compression
export async function compressImageFile(file: File): Promise<string> {
  const result = await compressVisuallyLossless(file, {
    maxDimension: 2048,
    quality: 0.85,
  });
  return result.dataUrl;
}
