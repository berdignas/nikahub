import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Environment Variables from .env file
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '6281234567890';

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Databases (Ready to connect to MongoDB / PostgreSQL)
const usersDB = new Map();
const ordersDB = [];
const chatMessagesDB = new Map();


// ==========================================
// REST API ROUTES
// ==========================================

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'NikaHub Wedding Atelier API',
    environment: process.env.NODE_ENV || 'development',
    whatsappNumber: WHATSAPP_NUMBER,
    timestamp: new Date().toISOString()
  });
});

// 1. Pendaftaran User Baru dengan Pertanyaan Sederhana
app.post('/api/auth/register', (req, res) => {
  const { email, name, phone, eventDate, guestEstimate, preferredStyle } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Alamat Email tidak valid!' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check if user already exists
  if (usersDB.has(cleanEmail)) {
    return res.status(409).json({
      success: false,
      message: 'Email sudah terdaftar. Silakan pilih menu Masuk/Login Email.'
    });
  }

  const newUser = {
    email: cleanEmail,
    name: name || cleanEmail.split('@')[0],
    phone: phone || '',
    eventDate: eventDate || '',
    guestEstimate: guestEstimate || '500 Pax',
    preferredStyle: preferredStyle || 'Tenda VIP & Katering Atelier',
    createdAt: new Date().toISOString()
  };

  usersDB.set(cleanEmail, newUser);

  // Initialize chat history for new user
  chatMessagesDB.set(cleanEmail, [
    {
      id: '1',
      sender: 'concierge',
      text: `Selamat bergabung di NikaHub Atelier, Kak ${newUser.name}! Pendaftaran Anda dengan email ${cleanEmail} telah berhasil. Ada yang bisa kami bantu seputar rencana pernikahan Anda?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  return res.status(201).json({
    success: true,
    message: 'Pendaftaran email berhasil!',
    user: newUser,
    token: `token_${Buffer.from(cleanEmail).toString('base64')}`
  });
});

// 2. Login dengan Email Saja
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Silakan masukkan alamat Email yang valid!' });
  }

  const cleanEmail = email.trim().toLowerCase();
  let user = usersDB.get(cleanEmail);

  // Auto-register if new email (seamless UX)
  if (!user) {
    user = {
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: '',
      eventDate: '',
      guestEstimate: '500 Pax',
      createdAt: new Date().toISOString()
    };
    usersDB.set(cleanEmail, user);
  }

  return res.json({
    success: true,
    message: 'Login email berhasil!',
    user,
    token: `token_${Buffer.from(cleanEmail).toString('base64')}`
  });
});

// 3. Get User Info / Current Profile
app.get('/api/auth/me', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email query parameter dibutuhkan.' });
  }

  const user = usersDB.get(email.toString().toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
  }

  return res.json({ success: true, user });
});

// 4. Submit Booking Order (Menu CO)
app.post('/api/orders', (req, res) => {
  const { email, items, eventDate, eventCity, eventNotes, totalPrice } = req.body;

  if (!email || !items || !items.length) {
    return res.status(400).json({ success: false, message: 'Data pesanan dan Email wajib diisi!' });
  }

  const order = {
    id: `ORD-${Date.now().toString().slice(-6)}`,
    userEmail: email,
    items,
    totalPrice: totalPrice || 0,
    eventDate: eventDate || '-',
    eventCity: eventCity || 'Jakarta Selatan',
    eventNotes: eventNotes || '-',
    status: 'Menunggu Konfirmasi WA',
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo NikaHub, saya dengan email ${email} mengajukan verifikasi pesanan baru.`)}`,
    createdAt: new Date().toISOString()
  };

  ordersDB.push(order);

  return res.status(201).json({
    success: true,
    message: 'Pesanan reservasi berhasil didaftarkan!',
    order
  });
});

// 5. Get User Orders
app.get('/api/orders', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.json({ success: true, orders: ordersDB });
  }

  const userOrders = ordersDB.filter(o => o.userEmail === email.toString().toLowerCase());
  return res.json({ success: true, orders: userOrders });
});

// 6. Concierge Chat Messages API
app.get('/api/chat', (req, res) => {
  const email = (req.query.email || 'guest').toString().toLowerCase();
  const history = chatMessagesDB.get(email) || [
    {
      id: '1',
      sender: 'concierge',
      text: 'Halo! Selamat datang di Concierge Chat NikaHub Atelier. Ada yang bisa kami bantu?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  return res.json({ success: true, messages: history });
});

app.post('/api/chat', (req, res) => {
  const { email, text } = req.body;
  if (!text) {
    return res.status(400).json({ success: false, message: 'Teks pesan tidak boleh kosong.' });
  }

  const cleanEmail = (email || 'guest').toLowerCase();
  const history = chatMessagesDB.get(cleanEmail) || [];

  const userMsg = {
    id: Date.now().toString(),
    sender: 'user',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  history.push(userMsg);

  // Auto Bot Response Simulation
  let reply = "Terima kasih pesan Anda telah diterima oleh Tim Concierge NikaHub.";
  const l = text.toLowerCase();
  if (l.includes('tenda') || l.includes('sewa')) {
    reply = "Untuk paket tenda VIP Maroko & Dekorasi, tim teknis NikaHub siap survey lokasi lokasi H-14.";
  } else if (l.includes('katering') || l.includes('tasting')) {
    reply = "Sesi Food Tasting gratis 2 pax tersedia setiap Sabtu & Minggu di Executive Lounge Kemang Raya.";
  }

  const botMsg = {
    id: (Date.now() + 1).toString(),
    sender: 'concierge',
    text: reply,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  history.push(botMsg);
  chatMessagesDB.set(cleanEmail, history);

  return res.json({ success: true, userMessage: userMsg, conciergeReply: botMsg });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`
  ✨ ===================================================
  🚀 NIKAHUB ATELIER BACKEND EXPRESS SERVER IS RUNNING!
  ===================================================
  📡 Local Server URL : http://localhost:${PORT}
  🔗 Health Check API : http://localhost:${PORT}/api/health
  ⚙️ Environment Mode : ${process.env.NODE_ENV || 'development'}
  📱 WhatsApp Number  : ${WHATSAPP_NUMBER}
  📁 Config file path  : server/.env
  ===================================================
  `);
});
