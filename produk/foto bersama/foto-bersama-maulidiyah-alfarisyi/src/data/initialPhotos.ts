import { PhotoMoment, EventInfo, GuestAlbum } from '../types';

export const EVENT_INFO: EventInfo = {
  coupleTitle: "Alfarisyi & Maulidiyah",
  groomName: "Ahmad Ferdi Al-Farisyi",
  brideName: "Nur Thoifah Maulidiyah",
  eventDateText: "Selasa & Rabu, 13 - 14 Oktober 2026",
  venueName: "Wrati, Pasuruan, Jawa Timur",
  maxPerDeviceLimit: 5,
  coverImage: "/undangan-maulidiyah-alfarisyi/gallery/photo-1.jpeg",
  galleryImages: [
    "/undangan-maulidiyah-alfarisyi/gallery/photo-1.jpeg",
    "/undangan-maulidiyah-alfarisyi/gallery/photo-2.jpeg",
    "/undangan-maulidiyah-alfarisyi/gallery/photo-3.jpeg",
    "/undangan-maulidiyah-alfarisyi/gallery/photo-4.jpeg",
    "/undangan-maulidiyah-alfarisyi/gallery/photo-5.jpeg",
    "/undangan-maulidiyah-alfarisyi/gallery/photo-6.jpeg",
  ],
  qrCodeUrl: window.location.href,
};

// Empty array - all dummy sample albums removed for clean live guestbook
export const INITIAL_ALBUMS: GuestAlbum[] = [];

// Empty array - all dummy sample photos removed
export const INITIAL_PHOTOS: PhotoMoment[] = [];
