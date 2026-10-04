export interface CommentItem {
  id: string;
  senderName: string;
  commentText: string;
  createdAt: string;
}

export interface PhotoMoment {
  id: string;
  senderName: string;
  caption: string;
  imageUrl: string;
  deviceId: string;
  likesCount: number;
  likedByDevices: string[];
  createdAt: string;
  isInitialSample?: boolean;
}

export interface GuestAlbum {
  id: string;
  deviceId: string;
  senderName: string;
  caption: string;
  photos: PhotoMoment[];
  likesCount: number;
  likedByDevices: string[];
  comments: CommentItem[];
  createdAt: string;
  isInitialSample?: boolean;
}

export interface EventInfo {
  coupleTitle: string;
  brideName: string;
  groomName: string;
  eventDateText: string;
  venueName: string;
  maxPerDeviceLimit: number;
  coverImage: string;
  qrCodeUrl: string;
}

export type FilterTab = 'all' | 'mine' | 'popular';
