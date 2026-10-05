# Petunjuk Penggunaan & Duplikasi Template Planikah (Wedding OS)

Folder ini berisi master acuan **Planikah (Wedding Planner & OS)** yang digunakan untuk perencanaan pernikahan calon pengantin atau klien Wedding Organizer (WO).

---

## 📂 Struktur Direktori

```
produk/
└── planikah/
    ├── planikah-template-master/       <- Master Acuan (Jangan diedit langsung untuk klien)
    │   ├── src/
    │   │   ├── components/            <- Komponen UI (Dashboard, Checklist, Budget, Termin, dll.)
    │   │   ├── data/defaultData.ts    <- Data default persiapan nikah & pos anggaran
    │   │   ├── types/wedding.ts       <- Definisi TypeScript Model
    │   │   ├── lib/supabase.ts        <- Koneksi database Supabase
    │   │   ├── App.tsx
    │   │   └── main.tsx
    │   ├── package.json
    │   ├── index.html
    │   └── vite.config.ts
    ├── duplikasi_klien.py             <- Script otomatis untuk membuat project klien baru
    └── PETUNJUK_PENGGUNAAN_DAN_DUPLIKASI.md
```

---

## 🚀 Cara Duplikasi untuk Klien / Customer Baru

Untuk membuat folder Wedding Planner bagi klien baru (misal: `planikah-dimas-anisa`):

### Opsi 1: Menggunakan Script Otomatis (Direkomendasikan)
Jalankan perintah berikut di terminal:

```bash
python produk/planikah/duplikasi_klien.py "dimas-anisa" "Dimas Prasetyo" "Anisa Rahmawati" "2026-11-20" "200000000"
```

Script akan otomatis:
1. Meng-copy seluruh master template ke `produk/planikah/planikah-dimas-anisa`.
2. Menyesuaikan nama pasangan, tanggal nikah, dan pagu anggaran awal di data default.
3. Menyiapkan project mandiri yang siap di-build dan di-deploy.

---

### Opsi 2: Duplikasi Manual

1. Copy folder `planikah-template-master` dan rename menjadi nama klien, misalnya `planikah-budi-citra`.
2. Buka file `src/data/defaultData.ts` di folder baru tersebut.
3. Ubah objek `defaultProfile` sesuai data pengantin (Nama Pria, Wanita, Tanggal, Venue, Target Budget).
4. Masuk ke folder klien dan jalankan:
   ```bash
   npm install
   npm run dev
   ```

---

## 💎 Fitur Lengkap Sesuai 3 Sprint Pembangunan

### Sprint 1: Fondasi & Persiapan
- **Ringkasan Profil & Countdown Timer**: Hitung mundur hari, jam, menit, detik pernikahan dengan circular progress meter.
- **Smart Timeline & Checklist Tugas**: Manajemen to-do bertahap (H-12 Bulan s/d Hari-H) dengan efek mikro selebrasi per tugas.
- **Budget Tracker & Termin Pembayaran**: Pencatatan anggaran pagu vs realisasi, split beban biaya (Pria / Wanita / Bersama), dan status DP / Pelunasan.

### Sprint 2: Relasi & Acara
- **Guest Management & Tiering**: Manajemen tamu berdasarkan ring prioritas (VVIP, VIP, Keluarga, Sahabat, Rekan Kerja, Tetangga) dengan tampilan Grid Card atau Tabel.
- **WhatsApp Broadcast Engine**: Generator link pesan undangan personal dengan token QR dan parameter porsi pax otomatis.
- **Master Rundown & Mode Monitor MC**: Susunan acara menit demi menit lengkap dengan cue audio, tata cahaya, dan logistik lapangan.

### Sprint 3: Hari-H & Pasca Acara
- **Live Gate Reception & Barcode Scanner**: Validasi instan kedatangan tamu via QR scanner atau tombol simulasi 1-klik, pencegahan duplikasi, dan pencatatan souvenir.
- **Kalkulator & Live Monitoring Catering**: Simulator formula porsi prasmanan (60%) vs gubukan (40%) dengan slider interaktif dan pemantau refill dapur realtime.
- **Digital Angpao & Gift Tracker**: Pencatatan amplop tunai meja penerima, transfer QRIS, kado fisik, serta audit selisih kas bersih pernikahan.
- **Post-Wedding Vendor Audit & Ucapan Terima Kasih**: Lembar penilaian vendor bintang 1-5 dan broadcast WhatsApp H+1 berisi link galeri foto dokumentasi.

---

## 🛠️ Menjalankan Aplikasi di Mode Pengembangan (Dev)

Masuk ke folder template atau folder klien:
```bash
cd "produk/planikah/planikah-template-master"
npm run dev
```

Buka browser di URL yang tertera (biasanya `http://localhost:5173`).

---

## 📦 Build untuk Production / Hosting

```bash
npm run build
```
Hasil build akan berada di folder `dist/` dan siap diunggah ke hosting (Vercel, Netlify, Cloudflare Pages, atau server Apache/Nginx).

