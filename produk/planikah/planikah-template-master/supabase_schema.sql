-- ==========================================================
-- SKEMA DATABASE PLANIKAH (WEDDING OS & PLANNER FULL SUITE)
-- Platform: Supabase / PostgreSQL
-- Sprint 1: Dashboard Profil, Smart Checklist & Budget Termin
-- Sprint 2: Buku Tamu, Digital RSVP & Master Rundown Acara
-- Sprint 3: Gate Check-In QR, Catering Monitor, Angpao & Evaluasi
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABEL PROFIL PERNIKAHAN (WEDDINGS)
CREATE TABLE IF NOT EXISTS weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    groom_name TEXT NOT NULL,
    groom_nickname TEXT NOT NULL,
    groom_phone TEXT,
    bride_name TEXT NOT NULL,
    bride_nickname TEXT NOT NULL,
    bride_phone TEXT,
    wedding_date DATE NOT NULL,
    wedding_time TIME DEFAULT '08:00',
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    target_budget NUMERIC(15, 2) DEFAULT 0,
    theme_concept TEXT,
    notes TEXT,
    invitation_base_url TEXT,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL CHECKLIST TUGAS (WEDDING_TASKS)
CREATE TABLE IF NOT EXISTS wedding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Legal & KUA',
        'Venue & Dekorasi',
        'Catering',
        'Busana & MUA',
        'Dokumentasi',
        'Adat & Prosesi',
        'Undangan & Tamu',
        'Hiburan & Sound',
        'Logistik & Panitia'
    )),
    phase TEXT NOT NULL CHECK (phase IN (
        'H-12 sd H-6 Bulan',
        'H-6 sd H-3 Bulan',
        'H-3 sd H-1 Bulan',
        'H-1 Bulan sd H-1 Minggu',
        'Hari-H & Pasca Acara'
    )),
    priority TEXT NOT NULL DEFAULT 'Sedang' CHECK (priority IN ('Tinggi', 'Sedang', 'Rendah')),
    assigned_to TEXT NOT NULL DEFAULT 'Bersama' CHECK (assigned_to IN (
        'Pria',
        'Wanita',
        'Bersama',
        'Wedding Organizer',
        'Keluarga'
    )),
    due_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABEL POS ANGGARAN & PENGELUARAN (WEDDING_EXPENSES)
CREATE TABLE IF NOT EXISTS wedding_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN (
        'Legal & KUA',
        'Venue & Dekorasi',
        'Catering',
        'Busana & MUA',
        'Dokumentasi',
        'Adat & Prosesi',
        'Undangan & Tamu',
        'Hiburan & Sound',
        'Logistik & Panitia'
    )),
    item_name TEXT NOT NULL,
    vendor_name TEXT NOT NULL,
    vendor_contact TEXT,
    estimated_cost NUMERIC(15, 2) NOT NULL DEFAULT 0,
    actual_cost NUMERIC(15, 2) NOT NULL DEFAULT 0,
    payer TEXT NOT NULL DEFAULT 'Bersama' CHECK (payer IN (
        'Bersama',
        'Pria',
        'Wanita',
        'Keluarga Pria',
        'Keluarga Wanita'
    )),
    status TEXT NOT NULL DEFAULT 'Belum Bayar' CHECK (status IN (
        'Belum Bayar',
        'DP / Cicilan',
        'Lunas'
    )),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL TERMIN PEMBAYARAN CICILAN (WEDDING_TERMINS)
CREATE TABLE IF NOT EXISTS wedding_termins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_id UUID REFERENCES wedding_expenses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    due_date DATE NOT NULL,
    is_paid BOOLEAN DEFAULT FALSE,
    paid_date DATE,
    payment_method TEXT DEFAULT 'Transfer Bank',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL TAMU UNDANGAN & DIGITAL RSVP (WEDDING_GUESTS)
CREATE TABLE IF NOT EXISTS wedding_guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone_number TEXT,
    side TEXT NOT NULL DEFAULT 'Bersama' CHECK (side IN (
        'Pihak Pria',
        'Pihak Wanita',
        'Bersama',
        'Orang Tua Pria',
        'Orang Tua Wanita'
    )),
    tier TEXT NOT NULL DEFAULT 'VIP' CHECK (tier IN (
        'VVIP',
        'VIP',
        'Keluarga Inti Pria',
        'Keluarga Inti Wanita',
        'Sahabat Pria',
        'Sahabat Wanita',
        'Rekan Kerja',
        'Tetangga / Umum'
    )),
    pax_allotted INT DEFAULT 2,
    pax_confirmed INT DEFAULT 0,
    rsvp_status TEXT NOT NULL DEFAULT 'Menunggu Konfirmasi' CHECK (rsvp_status IN (
        'Menunggu Konfirmasi',
        'Hadir',
        'Tidak Hadir',
        'Ragu-ragu'
    )),
    table_number TEXT,
    qr_token TEXT UNIQUE NOT NULL,
    dietary_notes TEXT,
    custom_notes TEXT,
    invitation_sent BOOLEAN DEFAULT FALSE,
    sent_date DATE,
    checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    souvenir_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL MASTER RUNDOWN ACARA (WEDDING_RUNDOWNS)
CREATE TABLE IF NOT EXISTS wedding_rundowns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    session TEXT NOT NULL CHECK (session IN (
        'Akad Nikah / Pemberkatan',
        'Upacara Adat',
        'Resepsi Sesi 1',
        'Resepsi Sesi 2 / Gala',
        'Syukuran / Ramah Tamah'
    )),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    activity_title TEXT NOT NULL,
    pic_name TEXT NOT NULL,
    pic_phone TEXT,
    location_spot TEXT NOT NULL,
    music_audio_cue TEXT,
    lighting_cue TEXT,
    logistics_notes TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. TABEL BUKU ANGPAO & KADO (WEDDING_GIFTS) - SPRINT 3
CREATE TABLE IF NOT EXISTS wedding_gifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    envelope_number TEXT,
    giver_name TEXT NOT NULL,
    giver_phone TEXT,
    gift_type TEXT NOT NULL CHECK (gift_type IN ('Amplop Tunai', 'Transfer Bank / QRIS', 'Kado Fisik')),
    amount NUMERIC(15, 2) DEFAULT 0,
    item_description TEXT,
    recipient_side TEXT NOT NULL DEFAULT 'Bersama' CHECK (recipient_side IN ('Pria', 'Wanita', 'Bersama', 'Keluarga Pria', 'Keluarga Wanita')),
    thank_you_sent BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TABEL MONITOR KONSUMSI CATERING (WEDDING_CATERING_MENUS) - SPRINT 3
CREATE TABLE IF NOT EXISTS wedding_catering_menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Prasmanan / Buffet', 'Food Stall / Gubukan', 'Dessert & Minuman')),
    portion_prepared INT DEFAULT 300,
    portion_consumed INT DEFAULT 0,
    refill_count INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Aman' CHECK (status IN ('Aman', 'Menipis', 'Habis')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TABEL EVALUASI & REVIEW VENDOR (WEDDING_VENDOR_REVIEWS) - SPRINT 3
CREATE TABLE IF NOT EXISTS wedding_vendor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    vendor_name TEXT NOT NULL,
    category TEXT NOT NULL,
    rating_stars INT CHECK (rating_stars >= 1 AND rating_stars <= 5),
    feedback_notes TEXT NOT NULL,
    is_recommended BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXING PERFORMA
CREATE INDEX IF NOT EXISTS idx_weddings_slug ON weddings(slug);
CREATE INDEX IF NOT EXISTS idx_tasks_wedding ON wedding_tasks(wedding_id);
CREATE INDEX IF NOT EXISTS idx_tasks_phase ON wedding_tasks(phase);
CREATE INDEX IF NOT EXISTS idx_expenses_wedding ON wedding_expenses(wedding_id);
CREATE INDEX IF NOT EXISTS idx_termins_expense ON wedding_termins(expense_id);
CREATE INDEX IF NOT EXISTS idx_guests_wedding ON wedding_guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_token ON wedding_guests(qr_token);
CREATE INDEX IF NOT EXISTS idx_rundowns_wedding ON wedding_rundowns(wedding_id);
CREATE INDEX IF NOT EXISTS idx_gifts_wedding ON wedding_gifts(wedding_id);
CREATE INDEX IF NOT EXISTS idx_catering_wedding ON wedding_catering_menus(wedding_id);
CREATE INDEX IF NOT EXISTS idx_reviews_wedding ON wedding_vendor_reviews(wedding_id);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_termins ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_rundowns ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_catering_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_vendor_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Weddings" ON weddings FOR SELECT USING (true);
CREATE POLICY "Public Write Weddings" ON weddings FOR ALL USING (true);

CREATE POLICY "Public Tasks" ON wedding_tasks FOR ALL USING (true);
CREATE POLICY "Public Expenses" ON wedding_expenses FOR ALL USING (true);
CREATE POLICY "Public Termins" ON wedding_termins FOR ALL USING (true);
CREATE POLICY "Public Guests" ON wedding_guests FOR ALL USING (true);
CREATE POLICY "Public Rundowns" ON wedding_rundowns FOR ALL USING (true);
CREATE POLICY "Public Gifts" ON wedding_gifts FOR ALL USING (true);
CREATE POLICY "Public Catering" ON wedding_catering_menus FOR ALL USING (true);
CREATE POLICY "Public Reviews" ON wedding_vendor_reviews FOR ALL USING (true);
