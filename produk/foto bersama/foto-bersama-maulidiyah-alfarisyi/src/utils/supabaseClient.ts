import { createClient } from '@supabase/supabase-js';
import { PhotoMoment } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://niohagnvvxvlocllrkxi.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb2hhZ252dnh2bG9jbGxya3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MDU5NTQsImV4cCI6MjEwNjQ4MTk1NH0.MDINmfxUinMOWFM_HDJN5VXKFGJTqptehBxOFoUNVJg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const EVENT_SLUG = 'maulidiyah-alfarisyi';

/**
 * Sync photo record to Supabase PostgreSQL Database
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

    if (error) {
      console.warn('Supabase DB Insert Warning (Falling back to local cache):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase connection offline or table pending creation:', err);
    return false;
  }
}

/**
 * Fetch photos from Supabase Database
 */
export async function fetchPhotosFromDatabase(): Promise<PhotoMoment[] | null> {
  try {
    const { data, error } = await supabase
      .from('wedding_photos')
      .select('*')
      .eq('event_slug', EVENT_SLUG)
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row) => ({
      id: row.id,
      senderName: row.sender_name,
      caption: row.caption,
      imageUrl: row.image_url,
      deviceId: row.device_id,
      likesCount: row.likes_count || 0,
      likedByDevices: [],
      createdAt: row.created_at,
    }));
  } catch {
    return null;
  }
}
