import { createClient } from '@supabase/supabase-js';
import { PhotoMoment, GuestAlbum, CommentItem } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://niohagnvvxvlocllrkxi.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb2hhZ252dnh2bG9jbGxya3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MDU5NTQsImV4cCI6MjEwNjQ4MTk1NH0.MDINmfxUinMOWFM_HDJN5VXKFGJTqptehBxOFoUNVJg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const EVENT_SLUG = 'maulidiyah-alfarisyi';

/**
 * Sync entire guest album to Supabase Database (both wedding_albums and wedding_photos tables)
 */
export async function insertAlbumToDatabase(album: GuestAlbum): Promise<boolean> {
  try {
    // 1. Insert album record into wedding_albums table if present
    await supabase.from('wedding_albums').upsert([
      {
        id: album.id,
        event_slug: EVENT_SLUG,
        device_id: album.deviceId,
        sender_name: album.senderName,
        caption: album.caption,
        photos_data: {
          photos: album.photos,
          voiceNoteUrl: album.voiceNoteUrl || null,
          voiceDuration: album.voiceDuration || null,
        },
        likes_count: album.likesCount || 1,
        liked_by_devices: album.likedByDevices || [],
        comments_data: album.comments || [],
        created_at: album.createdAt,
      },
    ]);

    // 2. Also insert individual photos into wedding_photos table as fallback/flat store
    if (album.photos && album.photos.length > 0) {
      const rows = album.photos.map((p) => ({
        id: p.id,
        event_slug: EVENT_SLUG,
        album_id: album.id,
        sender_name: album.senderName,
        caption: album.caption,
        image_url: p.imageUrl,
        device_id: album.deviceId,
        likes_count: p.likesCount || 1,
        created_at: p.createdAt || album.createdAt,
      }));
      await supabase.from('wedding_photos').upsert(rows);
    }
    return true;
  } catch (err) {
    console.warn('Supabase DB Insert Warning (Falling back to local cache):', err);
    return false;
  }
}

/**
 * Update album (likes/comments) in Supabase Database
 */
export async function updateAlbumInDatabase(album: GuestAlbum): Promise<boolean> {
  try {
    await supabase.from('wedding_albums').upsert([
      {
        id: album.id,
        event_slug: EVENT_SLUG,
        device_id: album.deviceId,
        sender_name: album.senderName,
        caption: album.caption,
        photos_data: {
          photos: album.photos,
          voiceNoteUrl: album.voiceNoteUrl || null,
          voiceDuration: album.voiceDuration || null,
        },
        likes_count: album.likesCount || 0,
        liked_by_devices: album.likedByDevices || [],
        comments_data: album.comments || [],
        created_at: album.createdAt,
      },
    ]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch guest albums from Supabase Database
 */
export async function fetchAlbumsFromDatabase(): Promise<GuestAlbum[] | null> {
  try {
    // Attempt fetching from wedding_albums table first
    const { data: albumData, error: albumError } = await supabase
      .from('wedding_albums')
      .select('*')
      .eq('event_slug', EVENT_SLUG)
      .order('created_at', { ascending: false });

    if (!albumError && albumData && albumData.length > 0) {
      return albumData.map((row) => {
        const rawPhotosData = row.photos_data;
        const photosList = Array.isArray(rawPhotosData)
          ? rawPhotosData
          : rawPhotosData && Array.isArray(rawPhotosData.photos)
          ? rawPhotosData.photos
          : [];
        const voiceUrl = row.voice_note_url || (rawPhotosData && !Array.isArray(rawPhotosData) ? rawPhotosData.voiceNoteUrl : undefined);
        const voiceDur = row.voice_duration || (rawPhotosData && !Array.isArray(rawPhotosData) ? rawPhotosData.voiceDuration : undefined);

        return {
          id: row.id,
          deviceId: row.device_id,
          senderName: row.sender_name,
          caption: row.caption,
          voiceNoteUrl: voiceUrl || undefined,
          voiceDuration: voiceDur || undefined,
          photos: photosList,
          likesCount: row.likes_count || 0,
          likedByDevices: Array.isArray(row.liked_by_devices) ? row.liked_by_devices : [],
          comments: Array.isArray(row.comments_data) ? row.comments_data : [],
          createdAt: row.created_at,
          isInitialSample: false,
        };
      });
    }

    // Fallback: Group from wedding_photos table if wedding_albums table is not available
    const { data: photoData, error: photoError } = await supabase
      .from('wedding_photos')
      .select('*')
      .eq('event_slug', EVENT_SLUG)
      .order('created_at', { ascending: false });

    if (photoError || !photoData || photoData.length === 0) return null;

    // Group photos by album_id or (device_id + sender_name)
    const albumMap = new Map<string, GuestAlbum>();

    for (const row of photoData) {
      const key = row.album_id || `album_${row.device_id}_${row.sender_name}`;
      const photoItem: PhotoMoment = {
        id: row.id,
        senderName: row.sender_name,
        caption: row.caption,
        imageUrl: row.image_url,
        deviceId: row.device_id,
        likesCount: row.likes_count || 0,
        likedByDevices: [],
        createdAt: row.created_at,
      };

      if (!albumMap.has(key)) {
        albumMap.set(key, {
          id: key,
          deviceId: row.device_id,
          senderName: row.sender_name,
          caption: row.caption || '',
          photos: [photoItem],
          likesCount: row.likes_count || 1,
          likedByDevices: [],
          comments: [],
          createdAt: row.created_at,
          isInitialSample: false,
        });
      } else {
        const existing = albumMap.get(key)!;
        existing.photos.push(photoItem);
      }
    }

    return Array.from(albumMap.values());
  } catch {
    return null;
  }
}

/**
 * Backward-compatibility helpers for single photo functions
 */
export async function insertPhotoToDatabase(photo: PhotoMoment): Promise<boolean> {
  try {
    const { error } = await supabase.from('wedding_photos').insert([
      {
        id: photo.id,
        event_slug: EVENT_SLUG,
        sender_name: photo.senderName,
        caption: photo.caption,
        image_url: photo.imageUrl,
        storage_provider: 'cloudflare_r2',
        device_id: photo.deviceId,
        likes_count: photo.likesCount || 1,
        created_at: photo.createdAt,
      },
    ]);
    return !error;
  } catch {
    return false;
  }
}

export async function fetchPhotosFromDatabase(): Promise<PhotoMoment[] | null> {
  const albums = await fetchAlbumsFromDatabase();
  if (!albums) return null;
  return albums.flatMap((a) => a.photos);
}

/**
 * Permanently delete album from Supabase Database
 */
export async function deleteAlbumFromDatabase(albumId: string): Promise<boolean> {
  try {
    // 1. Delete from wedding_albums table
    const { error: err1 } = await supabase
      .from('wedding_albums')
      .delete()
      .eq('id', albumId);

    // 2. Delete from wedding_photos table by album_id
    const { error: err2 } = await supabase
      .from('wedding_photos')
      .delete()
      .eq('album_id', albumId);

    // 3. Delete from wedding_photos table by id (in case photo was stored with id = albumId)
    const { error: err3 } = await supabase
      .from('wedding_photos')
      .delete()
      .eq('id', albumId);

    if (err1 || err2 || err3) {
      console.warn('Supabase delete response:', { err1, err2, err3 });
    }
    return !err1;
  } catch (err) {
    console.warn('Failed to delete album from Supabase DB:', err);
    return false;
  }
}

/**
 * Permanently delete single photo from Supabase Database and update album
 */
export async function deletePhotoFromDatabase(
  photoId: string,
  albumId: string,
  updatedAlbum?: GuestAlbum
): Promise<boolean> {
  try {
    const { error: photoErr } = await supabase
      .from('wedding_photos')
      .delete()
      .eq('id', photoId);

    if (photoErr) {
      console.warn('Supabase delete photo error:', photoErr);
    }

    if (updatedAlbum) {
      await updateAlbumInDatabase(updatedAlbum);
    }
    return true;
  } catch (err) {
    console.warn('Failed to delete photo from Supabase DB:', err);
    return false;
  }
}
