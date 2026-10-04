import { PhotoMoment, EventInfo, GuestAlbum } from '../types';

export const EVENT_INFO: EventInfo = {
  coupleTitle: "Maulidiyah & Alfarisyi",
  brideName: "Nur Thoifah Maulidiyah",
  groomName: "Ahmad Ferdi Al-Farisyi",
  eventDateText: "Minggu, 18 Oktober 2026",
  venueName: "Grand Ballroom & Royal Garden, Surabaya",
  maxPerDeviceLimit: 5,
  coverImage: "./sample-photos/photo1.jpg",
  qrCodeUrl: window.location.href,
};

// Empty array - all dummy sample albums removed per user request
export const INITIAL_ALBUMS: GuestAlbum[] = [];

// Empty array - all dummy sample photos removed
export const INITIAL_PHOTOS: PhotoMoment[] = [];
