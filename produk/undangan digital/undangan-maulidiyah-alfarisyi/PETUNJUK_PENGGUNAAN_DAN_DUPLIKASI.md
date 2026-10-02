# 📖 Panduan Penggunaan & Duplikasi Undangan Digital

Folder ini (`undangan-maulidiyah-alfarisyi`) adalah paket proyek mandiri lengkap untuk undangan digital pernikahan **Nur Thoifah Maulidiyah & Ahmad Ferdi Al-Farisyi**.

Anda dapat dengan mudah **meng-copy & paste** folder ini untuk membuat undangan digital pernikahan pasangan lain di masa mendatang.

---

## 📂 Struktur Folder Utama

```text
undangan-maulidiyah-alfarisyi/
├── src/
│   ├── data/
│   │   ├── invitationData.ts   <-- ✏️ EDIT DATA PENGANTIN DI SINI (Nama, Tanggal, Lokasi, Rekening, Ayat, dll)
│   │   └── themeAssets.ts      <-- 🎨 EDIT ASET TEMA DI SINI (Foto Cover, Lagu MP3, Ornamen, dll)
│   ├── components/             <-- Komponen Tampilan UI Undangan
│   ├── App.tsx                 <-- Komponen Utama Web
│   └── index.css               <-- Styling Utama (Tailwind CSS)
├── public/                     <-- File Publik / Asset Lokal
├── gambar/                     <-- Gambar & Aset Pendukung
├── index.html                  <-- Halaman Utama HTML
├── package.json                <-- Daftar Dependensi & Script
└── vite.config.ts              <-- Konfigurasi Vite
```

---

## 🚀 Cara Duplikasi untuk Undangan Baru (Pasangan Baru)

Jika Anda ingin membuat undangan baru untuk pasangan lain (contoh: *Budi & Siti*), ikuti langkah-langkah berikut:

### 1. Copy-Paste Folder
Copy folder `undangan-maulidiyah-alfarisyi` dan rename menjadi nama pasangan baru, misal: `undangan-budi-siti`.

### 2. Install Dependensi
Buka terminal pada folder `undangan-budi-siti`, lalu jalankan:
```bash
npm install
```

### 3. Ubah Data Pasangan & Undangan
Buka file `src/data/invitationData.ts` dan sesuaikan data berikut:
- **Nama Pengantin**: Nama lengkap, nama panggilan, nama orang tua, instagram, bio.
- **Tanggal & Tempat**: Tanggal Akad & Resepsi, alamat, link Google Maps, link Google Calendar.
- **Teks Ayat / Quote**: Ayat Al-Qur'an dan kutipan.
- **Kisah Cinta (Love Story)**: Perjalanan cinta pasangan.
- **Hadiah & Rekening**: Nomor rekening bank, e-wallet, dan penerima gift.

### 4. Sesuaikan Musik & Foto (Opsional)
Buka file `src/data/themeAssets.ts` untuk menyesuaikan:
- Foto sampul depan (`coverImage`).
- Audio / Musik latar (`audioUrl`).
- Foto galeri pernikahan.

### 5. Jalankan Preview (Dev Server)
Jalankan perintah berikut untuk melihat hasil secara live di browser:
```bash
npm run dev
```

### 6. Build untuk Deployment
Jika undangan sudah siap di-publish, jalankan perintah build:
```bash
npm run build
```
Hasil file siap deploy akan berada di folder `dist/`.
