# 📸 Panduan Penggunaan & Duplikasi Aplikasi Foto Bersama (Live QR Guest Photo)

Folder ini (`foto-bersama-maulidiyah-alfarisyi`) adalah paket aplikasi mandiri (*standalone web application*) untuk fitur **Foto Bersama & Live Shared Album QR Code** pada pernikahan **Nur Thoifah Maulidiyah & Ahmad Ferdi Al-Farisyi**.

---

## 🌟 Fitur Unggulan Sistem Ini
1. **Akses Instan via Scan QR Code**:
   Tamu cukup scan QR Code di meja/undangan menggunakan kamera smartphone tanpa perlu download aplikasi di App Store/Play Store.
2. **Batasan Maksimal 5 Foto Per Perangkat / Per Tamu**:
   - Sistem secara otomatis mencatat ID perangkat (`deviceId`) di `localStorage`.
   - Tamu hanya dapat mengunggah maksimal 5 foto dari HP mereka.
   - Tersedia progress bar dan indikator sisa kuota yang transparan.
   - Jika kuota 5/5 penuh, tombol upload terkunci dengan pesan terima kasih yang ramah.
   - Tamu dapat melihat dan mengelola foto miliknya di tab **"Foto Saya"** (menghapus foto akan mengembalikan 1 slot kuota).
3. **Kompresi Gambar Otomatis di Browser HP**:
   Foto berukuran 8MB - 12MB otomatis dikompresi di memori HP tamu menjadi ~250KB sebelum disimpan/diunggah. Sangat hemat kuota dan sukses terkirim dalam < 1 detik meski sinyal gedung lemah.
4. **Mode Layar TV / Proyektor Gedung (Slideshow Wall)**:
   Tombol **"Layar TV"** menampilkan slideshow layar penuh otomatis untuk dihubungkan ke TV/Proyektor venue, lengkap dengan QR Code mengambang agar tamu yang duduk tetap bisa scan dan mengunggah foto langsung ke layar panggung!
5. **Cetak Kartu Meja QR Code**:
   Tombol cetak siap pakai untuk dicetak di kertas akrilik meja tamu.
6. **Unduh Semua Foto (Bulk Download)**:
   Host/pengantin dapat mengunduh seluruh foto tamu sekaligus.

---

## 📂 Struktur Folder

```text
foto-bersama-maulidiyah-alfarisyi/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           <-- Navigasi atas & tombol aksi
│   │   ├── Header.tsx           <-- Banner pengantin & indikator kuota 5 foto
│   │   ├── PhotoGrid.tsx        <-- Galeri foto, tab filter & pencarian
│   │   ├── PhotoCard.tsx        <-- Kartu foto, tombol Love, badge "Foto Anda"
│   │   ├── UploadModal.tsx      <-- Modal upload kamera/galeri & kompresi foto
│   │   ├── PhotoDetailModal.tsx <-- Tampilan lightbox penuh & unduh foto HD
│   │   ├── TvSlideshowMode.tsx  <-- Mode tayang otomatis layar TV/Proyektor
│   │   ├── QrCodeModal.tsx      <-- Modal generator QR & tombol cetak kartu meja
│   │   └── DownloadAllModal.tsx <-- Modal unduh semua foto album
│   ├── data/
│   │   └── initialPhotos.ts     <-- ✏️ EDIT DATA NAMA PENGANTIN & FOTO AWAL DI SINI
│   ├── utils/
│   │   └── deviceStorage.ts     <-- Pengendali kuota 5 foto per device & kompresi canvas
│   ├── types/
│   │   └── index.ts             <-- Definisi tipe data TypeScript
│   ├── App.tsx                  <-- Komponen utama
│   └── index.css                <-- Tema visual mewah (Tailwind CSS)
├── public/
│   └── sample-photos/           <-- Foto bawaan contoh mempelai
├── package.json
└── vite.config.ts
```

---

## 🚀 Cara Menjalankan & Preview

1. Buka terminal pada folder ini (`produk/foto bersama/foto-bersama-maulidiyah-alfarisyi`).
2. Jalankan:
   ```bash
   npm run dev
   ```
3. Buka URL lokal yang muncul (contoh: `http://localhost:5173`) di browser.

---

## 🔄 Cara Duplikasi untuk Pasangan Baru (Contoh: Budi & Siti)

Jika Anda ingin membuat aplikasi foto bersama untuk pasangan lain:
1. **Copy folder** `foto-bersama-maulidiyah-alfarisyi` dan beri nama baru, misalnya: `foto-bersama-budi-siti`.
2. Buka file `src/data/initialPhotos.ts`:
   - Ganti `coupleTitle`, `brideName`, `groomName`, `eventDateText`, dan `venueName`.
   - Ganti foto cover & initial photos sesuai keinginan.
3. Buka `src/utils/deviceStorage.ts`:
   - Ubah `DEVICE_ID_KEY` dan `PHOTOS_STORAGE_KEY` dengan nama pasangan baru (agar penyimpanan terpisah).
4. Jalankan `npm run build` untuk menghasilkan file siap rilis di folder `dist/`.
