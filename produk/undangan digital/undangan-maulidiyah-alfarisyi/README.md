# 🦚 The Royal Wedding - Nur Thoifah & Ahmad Ferdi
### Undangan Digital Statis Mewah (Royal Palace & Majestic Peacock Theme)

Undangan pernikahan digital berbasis frontend statis dengan standar estetika tinggi, animasi ultra-smooth, dan tema kerajaan yang dipadukan dengan keagungan burung merak dan ornamen bunga berlimpah.

---

## ✨ Fitur & Keunggulan Desain
1. **Tema Kerajaan & Burung Merak (Royal Peacock)**:
   - Monogram lambang kerajaan **NF** (*Nur Thoifah & Ahmad Ferdi*).
   - Ornamen bulu merak dan burung merak agung berbalut filigri emas (*gold filigree*).
   - Gerbang kubah istana (*palace arch doorway*) dan efek kelopak bunga berjatuhan perlahan (*slow falling petals*).
2. **Animasi Ultra-Smooth & Slow**:
   - Ditenagai **Framer Motion** dengan transisi spring yang lamban, megah, dan berkelas.
   - Piringan piringan hitam audio berputar perlahan dengan toggle play/pause.
   - Efek pembuka amplop istana dengan semburan kelopak bunga lembut.
3. **100% Statis (Tanpa Backend)**:
   - **Nama Tamu Dinamis**: Tambahkan query `?to=Nama+Tamu` di akhir URL (contoh: `https://undangan-kamu.com/?to=Bapak+Joko+dan+Keluarga`).
   - **RSVP Langsung ke WhatsApp**: Form konfirmasi otomatis memformat chat WhatsApp ke nomor mempelai.
   - **Dinding Doa Realtime**: Ucapan tamu otomatis tersimpan di `localStorage` dan langsung muncul di layar.
   - **Amplop Digital**: Salin nomor rekening BCA, Mandiri, dan BSI dengan 1 klik disertai notifikasi sukses.
   - **Sinkronisasi Kalender**: Tombol langsung menyimpan jadwal ke Google Calendar.

---

## 🚀 Cara Menjalankan di Laptop (Lokal)
Proyek ini menggunakan Vite + React + Tailwind CSS:

```bash
# Jalankan server lokal
npm run dev
```
Buka browser di: **`http://localhost:5173`**

---

## 📝 Cara Mengubah Data Mempelai & Acara
Cukup buka 1 file konfigurasi:
👉 **[`src/data/invitationData.ts`](./src/data/invitationData.ts)**

Di dalam file tersebut Anda bisa dengan sangat mudah mengganti:
- Nama mempelai & orang tua
- Foto-foto prewedding
- Tanggal & jam acara (Akad & Resepsi)
- Lokasi & link Google Maps
- Nomor rekening & nama bank
- Nomor WhatsApp untuk RSVP
- Lagu latar (BGM audio URL)

---

## 🌐 Cara Hosting Gratis 100% (Siap Sebar)
Setelah Anda selesai mengedit data:

```bash
npm run build
```
Perintah ini akan menghasilkan folder **`dist/`**.

### Opsi 1: Netlify Drop (Paling Mudah, Tanpa Koding)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Tarik (*drag and drop*) folder **`dist`** langsung ke halaman web Netlify.
3. Dalam 5 detik undangan Anda langsung online dan mendapatkan link aktif gratis!

### Opsi 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Jalankan perintah `vercel` di folder ini, atau hubungkan ke repository GitHub Anda.
