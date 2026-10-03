import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

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

// Helper: Send Real Email with Multiple Fallbacks (Forces IPv4 to prevent Linux IPv6 routing timeouts)
const sendEmailWithFallback = async ({ from, to, subject, html }) => {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (!user || !pass) {
    throw new Error('Kredensial GMAIL_USER atau GMAIL_PASS belum dikonfigurasi di server/.env');
  }

  // List of fallback configurations to attempt:
  // 1. Port 587 STARTTLS (IPv4 forced)
  // 1. Port 465 SSL/TLS (Direct SSL, IPv4 forced)
  // 2. Port 587 STARTTLS (IPv4 forced)
  // 3. Service: 'gmail' (IPv4 forced)
  const configs = [
    {
      name: 'smtp.gmail.com:465 (SSL, IPv4)',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
      family: 4,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'smtp.gmail.com:587 (TLS, IPv4)',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
      family: 4,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'service:gmail (IPv4)',
      service: 'gmail',
      auth: { user, pass },
      family: 4,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 8000
    }
  ];

  let lastError = null;
  for (const cfg of configs) {
    try {
      console.log(`📡 Mencoba mengirim email via ${cfg.name}...`);
      const transporter = nodemailer.createTransport(cfg);
      const result = await transporter.sendMail({ from, to, subject, html });
      console.log(`✅ Sukses mengirim email via ${cfg.name}! MessageId: ${result.messageId}`);
      return { success: true, via: cfg.name, result };
    } catch (err) {
      console.warn(`⚠️ Percobaan via ${cfg.name} gagal (${err.message}). Mencoba metode berikutnya...`);
      lastError = err;
    }
  }

  throw lastError;
};

// ==========================================
// REST API ROUTES
// ==========================================

// Health Check Endpoint (supports both /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    app: 'NikaHub Wedding Atelier API',
    environment: process.env.NODE_ENV || 'development',
    whatsappNumber: WHATSAPP_NUMBER,
    smtpConfigured: !!(process.env.SMTP_USER || process.env.GMAIL_USER),
    timestamp: new Date().toISOString()
  });
});

// REAL EMAIL VERIFICATION ENDPOINT (supports both /api/auth/send-verification-email and /auth/send-verification-email)
app.post(['/api/auth/send-verification-email', '/auth/send-verification-email'], async (req, res) => {
  const { email, name, code } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Alamat Email tidak valid!' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const verifyCode = code || Math.floor(100000 + Math.random() * 900000).toString();
  const userName = name || cleanEmail.split('@')[0];
  const host = req.get('host') || 'nikahhub.my.id';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : (host.includes('localhost') ? 'http' : 'https');
  const siteUrl = process.env.FRONTEND_URL || `${protocol}://${host}`;
  const verifyLink = `${siteUrl}/?verify_email=${encodeURIComponent(cleanEmail)}&code=${verifyCode}`;

  const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #FAF9F5; color: #064e3b;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #064e3b;">
        <h2 style="margin: 0; color: #064e3b; font-family: Georgia, serif; font-size: 26px;">✨ NIKAHUB ATELIER</h2>
        <p style="margin: 6px 0 0; font-size: 11px; color: #b45309; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Surat Verifikasi Email Resmi</p>
      </div>
      <div style="padding: 24px 0; line-height: 1.6;">
        <p style="font-size: 15px;">Halo <strong>${userName}</strong>,</p>
        <p style="font-size: 13px; color: #1f2937;">Terima kasih telah mendaftar di <strong>NikaHub Atelier & Wedding Service</strong>. Untuk menyelesaikan pendaftaran dan mengaktifkan akun Anda, silakan gunakan kode verifikasi di bawah ini:</p>
        <div style="text-align: center; margin: 28px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; background-color: #064e3b; color: #fef3c7; padding: 14px 32px; border-radius: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(6,78,59,0.2);">
            ${verifyCode}
          </span>
        </div>
        <p style="text-align: center; font-size: 13px; color: #4b5563; margin-top: 10px;">Atau klik tombol konfirmasi langsung di bawah ini:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verifyLink}" style="background-color: #064e3b; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-weight: bold; display: inline-block; font-size: 13px;">
            Verifikasi Email Saya Sekarang →
          </a>
        </div>
      </div>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; text-align: center; font-size: 11px; color: #9ca3af;">
        © 2026 NikaHub Atelier & Berdikari Wedding Luxury. All rights reserved.
      </div>
    </div>
  `;

  const senderUser = process.env.SMTP_USER || process.env.GMAIL_USER;

  // Return HTTP response immediately to prevent Nginx 504 Gateway Timeout
  res.json({
    success: true,
    sentRealEmail: !!senderUser,
    code: verifyCode,
    verifyLink,
    message: `Permintaan verifikasi untuk ${cleanEmail} telah diproses.`
  });

  if (senderUser) {
    sendEmailWithFallback({
      from: process.env.SMTP_FROM || `"Berdikari Wedding" <${senderUser}>`,
      to: cleanEmail,
      subject: `[Berdikari Wedding] Kode Verifikasi Email Anda: ${verifyCode}`,
      html: htmlTemplate
    })
      .then(emailResult => {
        console.log(`✅ Real Email sent successfully to ${cleanEmail} via ${emailResult.via}`);
      })
      .catch(err => {
        console.error(`⚠️ SMTP Mail error for ${cleanEmail}:`, err.message);
      });
  } else {
    console.log(`\n📧 [SIMULASI EMAIL]: Kode: ${verifyCode}\nLink: ${verifyLink}\n(Set GMAIL_USER & GMAIL_PASS di server/.env)\n`);
  }
});

// 1. Pendaftaran User Baru dengan Pertanyaan Sederhana
app.post(['/api/auth/register', '/auth/register'], (req, res) => {
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
    password: req.body.password || '',
    eventDate: eventDate || '',
    guestEstimate: guestEstimate || '500 Pax',
    preferredStyle: preferredStyle || 'Tenda VIP & Katering Atelier',
    isVerified: false,
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

// 1b. Konfirmasi Verifikasi Email
app.post(['/api/auth/verify', '/auth/verify'], (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Alamat Email tidak valid!' });
  }

  const cleanEmail = email.trim().toLowerCase();
  let user = usersDB.get(cleanEmail);
  if (user) {
    user.isVerified = true;
    usersDB.set(cleanEmail, user);
  }
  return res.json({ success: true, message: `Email ${cleanEmail} berhasil diverifikasi!` });
});

// 2. Login dengan Email & Password
app.post(['/api/auth/login', '/auth/login'], (req, res) => {
  const { email, password } = req.body;

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
      password: password || '',
      isVerified: true,
      eventDate: '',
      guestEstimate: '500 Pax',
      createdAt: new Date().toISOString()
    };
    usersDB.set(cleanEmail, user);
  } else {
    // If user has a password set, verify it matches
    if (user.password && password && user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Kata sandi salah. Silakan coba lagi.'
      });
    }
    user.isVerified = true;
  }

  return res.json({
    success: true,
    message: 'Login email berhasil!',
    user,
    token: `token_${Buffer.from(cleanEmail).toString('base64')}`
  });
});

// 3. Get User Info / Current Profile
app.get(['/api/auth/me', '/auth/me'], (req, res) => {
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

// 3b. Get All Registered Users (Admin User Management)
app.get(['/api/auth/users', '/auth/users'], (req, res) => {
  const usersList = Array.from(usersDB.values());
  return res.json({ success: true, count: usersList.length, users: usersList });
});

// 3c. Delete User by Email (Admin User Management)
app.delete(['/api/auth/users/:email', '/auth/users/:email'], (req, res) => {
  const cleanEmail = decodeURIComponent(req.params.email).toLowerCase();
  if (usersDB.has(cleanEmail)) {
    usersDB.delete(cleanEmail);
    return res.json({ success: true, message: `User ${cleanEmail} berhasil dihapus.` });
  }
  return res.status(404).json({ success: false, message: 'User tidak ditemukan.' });
});

// 4. Submit Booking Order (Menu CO)
app.post(['/api/orders', '/orders'], (req, res) => {
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
app.get(['/api/orders', '/orders'], (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.json({ success: true, orders: ordersDB });
  }

  const userOrders = ordersDB.filter(o => o.userEmail === email.toString().toLowerCase());
  return res.json({ success: true, orders: userOrders });
});

// 6. Concierge Chat Messages API
app.get(['/api/chat', '/chat'], (req, res) => {
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

app.post(['/api/chat', '/chat'], (req, res) => {
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
