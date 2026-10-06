-- ==============================================================================
-- NIKAHUB WEDDING ATELIER - SUPABASE DATABASE SCHEMA & CONFIGURATION
-- ==============================================================================
-- Jalankan query ini di menu: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABEL: PRODUCTS (Katalog Layanan & Vendor Pernikahan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT,
    sub_category TEXT,
    tagline TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    original_price NUMERIC,
    rating NUMERIC DEFAULT 4.9,
    review_count INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    vendor_name TEXT NOT NULL,
    talent_name TEXT,
    talent_role TEXT,
    talent_avatar TEXT,
    experience_years TEXT,
    style_tags JSONB DEFAULT '[]'::jsonb,
    equipment_or_brands JSONB DEFAULT '[]'::jsonb,
    bio TEXT,
    portfolio_gallery JSONB DEFAULT '[]'::jsonb,
    location TEXT DEFAULT 'Jakarta & Jabodetabek',
    badge TEXT,
    featured BOOLEAN DEFAULT true,
    capacity TEXT,
    includes JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    availability TEXT DEFAULT 'ready',
    live_demo_url TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration safety: Add video_url column if table already exists
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Index pencarian cepat untuk produk
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- ==============================================================================
-- 3. TABEL: ORDERS (Daftar Reservasi & Draft SPK)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    client_name TEXT,
    client_phone TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_price NUMERIC NOT NULL DEFAULT 0,
    event_date TEXT,
    event_city TEXT DEFAULT 'Jakarta Selatan',
    event_notes TEXT,
    status TEXT DEFAULT 'Menunggu Konfirmasi WA',
    whatsapp_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_email ON public.orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ==============================================================================
-- 4. TABEL: USERS (Klien Terdaftar & Data Akun)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4(),
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    password TEXT,
    avatar TEXT,
    event_date TEXT,
    guest_estimate TEXT DEFAULT '500 Pax',
    preferred_style TEXT DEFAULT 'Tenda VIP & Katering Atelier',
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ==============================================================================
-- 5. TABEL: CHAT_MESSAGES (Riwayat Pesan Concierge)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    sender TEXT NOT NULL, -- 'user' atau 'concierge'
    text TEXT NOT NULL,
    timestamp TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_user_email ON public.chat_messages(user_email);

-- ==============================================================================
-- 6. TABEL: WEB_SETTINGS (CMS Pengaturan Teks & Kontak Web)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.web_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    hero_title TEXT DEFAULT 'Wujudkan Pernikahan Impian Bersama NikaHub',
    hero_subtitle TEXT DEFAULT 'Layanan All-in-One Wedding Organizer & Concierge di Indonesia',
    promo_text TEXT DEFAULT 'Diskon Spesial 10% untuk Paket Tenda VIP & Catering Bulan Ini!',
    contact_whatsapp TEXT DEFAULT '6281234567890',
    instagram_handle TEXT DEFAULT '@nikahub_id',
    featured_recommendations TEXT DEFAULT 'Tenda VIP, Catering Premium, MUA Exclusive',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inisialisasi baris pengaturan default
INSERT INTO public.web_settings (id, hero_title, hero_subtitle, promo_text, contact_whatsapp, instagram_handle, featured_recommendations)
VALUES (
    'default',
    'Wujudkan Pernikahan Impian Bersama NikaHub',
    'Layanan All-in-One Wedding Organizer & Concierge di Indonesia',
    'Diskon Spesial 10% untuk Paket Tenda VIP & Catering Bulan Ini!',
    '6281234567890',
    '@nikahub_id',
    'Tenda VIP, Catering Premium, MUA Exclusive'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 7. KONFIGURASI STORAGE BUCKET (Upload Foto Katalog & Portofolio)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-images', 'wedding-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage agar Anonim & Authenticated bisa upload & download gambar
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Select Storage Objects" ON storage.objects;
    CREATE POLICY "Public Select Storage Objects" ON storage.objects
        FOR SELECT USING (bucket_id IN ('documents', 'wedding-images'));

    DROP POLICY IF EXISTS "Public Insert Storage Objects" ON storage.objects;
    CREATE POLICY "Public Insert Storage Objects" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id IN ('documents', 'wedding-images'));

    DROP POLICY IF EXISTS "Public Update Storage Objects" ON storage.objects;
    CREATE POLICY "Public Update Storage Objects" ON storage.objects
        FOR UPDATE USING (bucket_id IN ('documents', 'wedding-images'));

    DROP POLICY IF EXISTS "Public Delete Storage Objects" ON storage.objects;
    CREATE POLICY "Public Delete Storage Objects" ON storage.objects
        FOR DELETE USING (bucket_id IN ('documents', 'wedding-images'));
END $$;

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
--    (Memungkinkan Akses Client & Admin Tanpa Terblokir)
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_settings ENABLE ROW LEVEL SECURITY;

-- Policy untuk public.products
DROP POLICY IF EXISTS "Allow public read products" ON public.products;
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert products" ON public.products;
CREATE POLICY "Allow public insert products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update products" ON public.products;
CREATE POLICY "Allow public update products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete products" ON public.products;
CREATE POLICY "Allow public delete products" ON public.products FOR DELETE USING (true);

-- Policy untuk public.orders
DROP POLICY IF EXISTS "Allow public read orders" ON public.orders;
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert orders" ON public.orders;
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update orders" ON public.orders;
CREATE POLICY "Allow public update orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete orders" ON public.orders;
CREATE POLICY "Allow public delete orders" ON public.orders FOR DELETE USING (true);

-- Policy untuk public.users
DROP POLICY IF EXISTS "Allow public read users" ON public.users;
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert users" ON public.users;
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update users" ON public.users;
CREATE POLICY "Allow public update users" ON public.users FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete users" ON public.users;
CREATE POLICY "Allow public delete users" ON public.users FOR DELETE USING (true);

-- Policy untuk public.chat_messages
DROP POLICY IF EXISTS "Allow public read chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public read chat_messages" ON public.chat_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public insert chat_messages" ON public.chat_messages FOR INSERT WITH CHECK (true);

-- Policy untuk public.web_settings
DROP POLICY IF EXISTS "Allow public read web_settings" ON public.web_settings;
CREATE POLICY "Allow public read web_settings" ON public.web_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public write web_settings" ON public.web_settings;
CREATE POLICY "Allow public write web_settings" ON public.web_settings FOR ALL USING (true);

-- ==============================================================================
-- 9. SUPABASE REALTIME REPLICATION
-- ==============================================================================
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
EXCEPTION WHEN duplicate_object THEN
    -- Table already added
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
EXCEPTION WHEN duplicate_object THEN
    -- Table already added
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
EXCEPTION WHEN duplicate_object THEN
    -- Table already added
END $$;

-- ==============================================================================
-- 10. SEED DATA AWAL: KATALOG PRODUK MEWAH NIKAHUB
-- ==============================================================================
INSERT INTO public.products (
    id, title, category, category_label, tagline, price, original_price, rating, review_count, 
    image, gallery, vendor_name, location, featured, availability, includes, description
) VALUES 
(
    'prod-tenda-maroko-vip',
    'Paket Tenda Maroko Plafon VIP & Dekorasi Pelaminan',
    'tenda',
    'Tenda & Pelaminan VIP',
    'Konstruksi tenda semi-rigging kokoh dengan kain velvet champagne dan chandelier mewah.',
    28500000,
    34000000,
    4.9,
    28,
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    'NikaHub Official Production',
    'Jakarta & Jabodetabek',
    true,
    'ready',
    '["Tenda Semi Rigging 15x20m", "Dekorasi Pelaminan Bunga Segar 12m", "Lampu Kristal Chandelier 6 Unit", "AC Standing 5PK x 4 Unit", "Karpet Buana Permadani", "Pemasangan H-1 Siang"]'::jsonb,
    'Paket tenda dan dekorasi lengkap kelas VIP untuk pesta pernikahan di halaman rumah maupun lapangan. Pemasangan terstandar H-1 dengan proteksi genset dan pendingin ruangan prima.'
),
(
    'prod-catering-sultan-500',
    'Paket Katering Royal Buffet 500 Pax + 5 Gubukan Eksklusif',
    'catering',
    'Katering VIP',
    'Menu prasmanan nusantara & western premium racikan chef hotel berbintang.',
    42500000,
    48000000,
    5.0,
    34,
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    'Atelier Gourmet Catering',
    'Jakarta, Bogor, Depok, Tangerang, Bekasi',
    true,
    'ready',
    '["Prasmanan Utama 500 Porsi", "5 Macam Gubukan @ 200 Porsi", "Free Food Tasting 2 Pax", "Dessert Bar & Fresh Juice", "Peralatan Chafing Dish Mewah", "Waiter & Waitress Berseragam"]'::jsonb,
    'Hidangan lezat berstandar higienis tinggi dengan rasa konsisten. Dipuji seluruh keluarga besar dan tamu undangan.'
),
(
    'prod-mua-signature-glam',
    'Exclusive Bridal Makeup & Kebaya Modern Resepsi',
    'mua',
    'MUA & Gaun',
    'Riasan pengantin tahan 16 jam tanpa crack dengan busana rancangan desainer.',
    12500000,
    15000000,
    4.9,
    19,
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    'Aura Glamour Bridal Atelier',
    'Jabodetabek & Bandung',
    true,
    'ready',
    '["Makeup Akad & Resepsi Pengantin Wanita", "Retouch & Standby 6 Jam", "Makeup & Hairdo 2 Ibu Pengantin", "Gaun/Kebaya Resepsi Premium", "Aksesoris & Ronce Melati Segar"]'::jsonb,
    'Sentuhan makeup artist berpengalaman menangani pernikahan adat maupun modern internasional.'
),
(
    'prod-foto-sinema-cinematic',
    'Dokumentasi Sinematik 4K + Album Kolase Eksklusif',
    'fotografer',
    'Fotografer & Sinema',
    'Abadikan momen haru dan bahagia dengan kualitas sinematik layaknya film bioskop.',
    9500000,
    11500000,
    4.9,
    22,
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    'Lensa Abadi Studio',
    'Seluruh Indonesia',
    true,
    'ready',
    '["2 Fotografer + 2 Videografer", "Same Day Edit (SDE) Teaser 1 Menit", "Video Dokumentasi 4K 15-20 Menit", "1 Album Kolase Cetak Mewah Box Kayu", "Flashdisk Seluruh File Master RAW"]'::jsonb,
    'Tim dokumentasi profesional dengan gear kamera Sony Cinema Line & drone stabilizer canggih.'
),
(
    'prod-undangan-web-luxury',
    'Undangan Digital Website Interaktif & RSVP Realtime',
    'undangan_digital',
    'Undangan Web',
    'Undangan digital modern elegan, audio autoplay, galeri foto, peta maps, dan live amplop.',
    450000,
    750000,
    5.0,
    45,
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    'NikaHub Digital Team',
    'Nasional / Online',
    true,
    'ready',
    '["Domain Khusus Pasangan", "Fitur Reservasi Kehadiran RSVP", "Amplop Digital & QRIS Bank", "Navigasi Google Maps Presisi", "Background Musik Pilihan", "Masa Aktif 1 Tahun"]'::jsonb,
    'Solusi undangan ramah lingkungan yang praktis disebarkan ke ratusan kerabat via WhatsApp.'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- SELESAI! Seluruh tabel, RLS, Storage, dan Realtime siap digunakan 100%.
-- ==============================================================================
