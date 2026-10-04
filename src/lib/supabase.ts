import { createClient } from '@supabase/supabase-js';
import { WeddingProduct, ProductCategory, BookingOrder, User } from '../types';

// Supabase URL & Anon Key with auto-fallback to guarantee connection
const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 
  'https://niohagnvvxvlocllrkxi.supabase.co';

const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb2hhZ252dnh2bG9jbGxya3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MDU5NTQsImV4cCI6MjEwNjQ4MTk1NH0.MDINmfxUinMOWFM_HDJN5VXKFGJTqptehBxOFoUNVJg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// MAPPERS: TypeScript <---> Supabase Database
// ==========================================

export function mapProductFromDb(row: any): WeddingProduct {
  let galleryArr: string[] = [row.image || ''];
  if (Array.isArray(row.gallery)) {
    galleryArr = row.gallery;
  } else if (typeof row.gallery === 'string') {
    try {
      galleryArr = JSON.parse(row.gallery);
    } catch {
      galleryArr = [row.image || ''];
    }
  }

  let includesArr: string[] = [];
  if (Array.isArray(row.includes)) {
    includesArr = row.includes;
  } else if (typeof row.includes === 'string') {
    try {
      includesArr = JSON.parse(row.includes);
    } catch {
      includesArr = [];
    }
  }

  let styleTagsArr: string[] | undefined;
  if (Array.isArray(row.style_tags)) {
    styleTagsArr = row.style_tags;
  } else if (Array.isArray(row.styleTags)) {
    styleTagsArr = row.styleTags;
  }

  return {
    id: String(row.id),
    title: row.title || 'Layanan Pernikahan',
    category: (row.category || 'tenda') as ProductCategory,
    categoryLabel: row.category_label || row.categoryLabel || 'Katalog Layanan',
    subCategory: row.sub_category || row.subCategory || undefined,
    tagline: row.tagline || '',
    price: Number(row.price) || 0,
    originalPrice: row.original_price != null ? Number(row.original_price) : (row.originalPrice != null ? Number(row.originalPrice) : undefined),
    rating: Number(row.rating) || 4.9,
    reviewCount: Number(row.review_count || row.reviewCount) || 12,
    image: row.image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    gallery: galleryArr.length ? galleryArr : [row.image || ''],
    vendorName: row.vendor_name || row.vendorName || 'NikaHub Official Production',
    talentName: row.talent_name || row.talentName || undefined,
    talentRole: row.talent_role || row.talentRole || undefined,
    talentAvatar: row.talent_avatar || row.talentAvatar || undefined,
    experienceYears: row.experience_years || row.experienceYears || undefined,
    styleTags: styleTagsArr,
    bio: row.bio || undefined,
    portfolioGallery: row.portfolio_gallery || row.portfolioGallery || undefined,
    location: row.location || 'Jakarta & Jabodetabek',
    badge: row.badge || undefined,
    featured: row.featured !== false,
    capacity: row.capacity || undefined,
    includes: includesArr.length ? includesArr : ['Fasilitas Standar NikaHub Atelier'],
    description: row.description || '',
    availability: (row.availability || 'ready') as 'ready' | 'limited' | 'booked',
    liveDemoUrl: row.live_demo_url || row.liveDemoUrl || undefined
  };
}

export function mapProductToDb(prod: WeddingProduct): any {
  return {
    id: prod.id,
    title: prod.title,
    category: prod.category,
    category_label: prod.categoryLabel,
    sub_category: prod.subCategory || null,
    tagline: prod.tagline || '',
    price: prod.price,
    original_price: prod.originalPrice || null,
    rating: prod.rating || 4.9,
    review_count: prod.reviewCount || 0,
    image: prod.image,
    gallery: prod.gallery || [prod.image],
    vendor_name: prod.vendorName,
    talent_name: prod.talentName || null,
    talent_role: prod.talentRole || null,
    talent_avatar: prod.talentAvatar || null,
    experience_years: prod.experienceYears || null,
    style_tags: prod.styleTags || [],
    equipment_or_brands: prod.equipmentOrBrands || [],
    bio: prod.bio || null,
    portfolio_gallery: prod.portfolioGallery || [],
    location: prod.location || 'Jakarta & Jabodetabek',
    badge: prod.badge || null,
    featured: prod.featured !== false,
    capacity: prod.capacity || null,
    includes: prod.includes || [],
    description: prod.description || '',
    availability: prod.availability || 'ready',
    live_demo_url: prod.liveDemoUrl || null,
    updated_at: new Date().toISOString()
  };
}

// ==========================================
// 1. PRODUCTS API
// ==========================================

export async function fetchProductsFromSupabase(): Promise<WeddingProduct[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('⚠️ Supabase fetch products notice:', error.message);
      // Fallback to localStorage if table not yet created
      const local = localStorage.getItem('nikahub_products_data');
      return local ? JSON.parse(local) : [];
    }

    if (Array.isArray(data) && data.length > 0) {
      const mapped = data.map(mapProductFromDb);
      // Cache locally for offline fast rendering
      try {
        localStorage.setItem('nikahub_products_data', JSON.stringify(mapped));
      } catch (e) {
        // storage quota
      }
      return mapped;
    }

    // If table exists but empty, check if admin previously saved items locally
    const local = localStorage.getItem('nikahub_products_data');
    return local ? JSON.parse(local) : [];
  } catch (err) {
    console.error('Failed to fetch products from Supabase:', err);
    const local = localStorage.getItem('nikahub_products_data');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveProductToSupabase(product: WeddingProduct): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = mapProductToDb(product);
    const { error } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save product error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error saving product to Supabase:', err);
    return { success: false, error: err.message };
  }
}

export async function deleteProductFromSupabase(productId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Supabase delete product error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error deleting product from Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Bulk sync local storage products into Supabase (Migration helper)
export async function syncLocalProductsToSupabase(): Promise<number> {
  try {
    const local = localStorage.getItem('nikahub_products_data');
    if (!local) return 0;
    const prods: WeddingProduct[] = JSON.parse(local);
    if (!prods.length) return 0;

    const payloads = prods.map(mapProductToDb);
    const { error } = await supabase
      .from('products')
      .upsert(payloads, { onConflict: 'id' });

    if (error) {
      console.error('Sync to Supabase error:', error);
      return 0;
    }

    return payloads.length;
  } catch (e) {
    console.error('Sync failed:', e);
    return 0;
  }
}

// ==========================================
// 2. ORDERS API
// ==========================================

export async function fetchOrdersFromSupabase(userEmail?: string): Promise<any[]> {
  try {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (userEmail) {
      query = query.eq('user_email', userEmail.toLowerCase());
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase fetch orders notice:', error.message);
      const local = localStorage.getItem('nikahub_orders');
      return local ? JSON.parse(local) : [];
    }

    return data || [];
  } catch (e) {
    console.error('Error fetching orders:', e);
    const local = localStorage.getItem('nikahub_orders');
    return local ? JSON.parse(local) : [];
  }
}

export async function createOrderInSupabase(orderData: {
  id: string;
  userEmail: string;
  clientName: string;
  clientPhone: string;
  items: any[];
  totalPrice: number;
  eventDate: string;
  eventCity: string;
  eventNotes?: string;
  status?: string;
  whatsappUrl?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: orderData.id,
      user_email: orderData.userEmail.toLowerCase(),
      client_name: orderData.clientName,
      client_phone: orderData.clientPhone,
      items: orderData.items,
      total_price: orderData.totalPrice,
      event_date: orderData.eventDate,
      event_city: orderData.eventCity,
      event_notes: orderData.eventNotes || '-',
      status: orderData.status || 'Menunggu Konfirmasi WA',
      whatsapp_url: orderData.whatsappUrl || '',
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('orders')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Supabase create order error:', error);
    }

    // Save locally as backup
    try {
      const stored = localStorage.getItem('nikahub_orders');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(payload);
      localStorage.setItem('nikahub_orders', JSON.stringify(list));
    } catch {
      // ignore
    }

    return { success: !error, error: error?.message };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateOrderStatusInSupabase(orderId: string, newStatus: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    return !error;
  } catch {
    return false;
  }
}

// ==========================================
// 3. USERS / CLIENT MANAGEMENT API
// ==========================================

export async function fetchUsersFromSupabase(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch users notice:', error.message);
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}

export async function saveUserToSupabase(user: User & { password?: string }): Promise<boolean> {
  try {
    const payload = {
      email: user.email.toLowerCase(),
      name: user.name || user.email.split('@')[0],
      phone: user.phone || '',
      password: user.password || '',
      avatar: user.avatar || '',
      is_verified: user.isVerified !== false,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'email' });

    return !error;
  } catch {
    return false;
  }
}

export async function deleteUserFromSupabase(email: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('email', email.toLowerCase());

    return !error;
  } catch {
    return false;
  }
}

// ==========================================
// 4. CMS WEB SETTINGS API
// ==========================================

export async function fetchWebSettingsFromSupabase(): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('web_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (error || !data) return null;
    return {
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      promoText: data.promo_text,
      contactWhatsApp: data.contact_whatsapp,
      instagramHandle: data.instagram_handle,
      featuredRecommendations: data.featured_recommendations
    };
  } catch {
    return null;
  }
}

export async function saveWebSettingsToSupabase(settings: {
  heroTitle: string;
  heroSubtitle: string;
  promoText: string;
  contactWhatsApp: string;
  instagramHandle: string;
  featuredRecommendations: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('web_settings')
      .upsert({
        id: 'default',
        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        promo_text: settings.promoText,
        contact_whatsapp: settings.contactWhatsApp,
        instagram_handle: settings.instagramHandle,
        featured_recommendations: settings.featuredRecommendations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    return !error;
  } catch {
    return false;
  }
}

// ==========================================
// 5. STORAGE IMAGE UPLOAD HELPER
// ==========================================

export async function uploadImageToSupabaseStorage(
  fileOrBase64: File | string,
  fileNamePrefix = 'product'
): Promise<string | null> {
  try {
    let fileBlob: Blob;
    let contentType = 'image/jpeg';
    let cleanName = 'upload.jpg';

    if (typeof fileOrBase64 === 'string') {
      if (fileOrBase64.startsWith('data:')) {
        const parts = fileOrBase64.split(';base64,');
        contentType = parts[0].split(':')[1] || 'image/jpeg';
        const raw = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        fileBlob = new Blob([uInt8Array], { type: contentType });
      } else {
        // Already a normal URL (https://...)
        return fileOrBase64;
      }
    } else {
      fileBlob = fileOrBase64;
      contentType = fileOrBase64.type || 'image/jpeg';
      cleanName = (fileOrBase64.name || 'upload.jpg').toLowerCase().replace(/[^a-z0-9.]/g, '-');
    }

    const fileName = `${fileNamePrefix}-${Date.now()}-${cleanName}`;

    // Try primary bucket 'wedding-images', then fallback to 'documents'
    const buckets = ['wedding-images', 'documents'];
    for (const bucket of buckets) {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, fileBlob, {
            contentType,
            cacheControl: '3600',
            upsert: true
          });

        if (!error && data?.path) {
          const { data: publicData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

          if (publicData?.publicUrl) {
            return publicData.publicUrl;
          }
        }
      } catch (bucketErr) {
        console.warn(`Bucket ${bucket} upload error:`, bucketErr);
      }
    }

    // If storage upload fails (e.g. offline), return the base64 string safely
    return typeof fileOrBase64 === 'string' ? fileOrBase64 : null;
  } catch (err) {
    console.error('Storage upload error:', err);
    return typeof fileOrBase64 === 'string' ? fileOrBase64 : null;
  }
}
