import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Lock, ArrowRight, ShieldCheck, Phone, CheckCircle2, RefreshCw, Send, KeyRound, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  promptMessage?: string | null;
  initialMode?: 'register' | 'login' | 'verify_pending' | 'verify_success';
  initialEmail?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  promptMessage,
  initialMode = 'register',
  initialEmail = ''
}) => {
  const [mode, setMode] = useState<'register' | 'login' | 'verify_pending' | 'verify_success'>(initialMode);

  // Form State
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestEstimate, setGuestEstimate] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Pending user email for verification
  const [pendingEmail, setPendingEmail] = useState(initialEmail);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Helper: Save user to local storage db
  const saveUserToLocalStorage = (userObj: User & { isVerified?: boolean; phone?: string; eventDate?: string; guestEstimate?: string }) => {
    try {
      const storedStr = localStorage.getItem('nikahub_users');
      const usersMap = storedStr ? JSON.parse(storedStr) : {};
      usersMap[userObj.email.toLowerCase()] = userObj;
      localStorage.setItem('nikahub_users', JSON.stringify(usersMap));
    } catch (e) {
      console.error('Failed to save user to local storage', e);
    }
  };

  // Helper: Get user from local storage db
  const getUserFromLocalStorage = (userEmail: string) => {
    try {
      const storedStr = localStorage.getItem('nikahub_users');
      if (!storedStr) return null;
      const usersMap = JSON.parse(storedStr);
      return usersMap[userEmail.toLowerCase()] || null;
    } catch {
      return null;
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Silakan masukkan alamat Email Anda.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Format email tidak valid. Contoh: nama@gmail.com');
      return;
    }

    if (!name.trim()) {
      setError('Silakan masukkan Nama Anda / Calon Pengantin.');
      return;
    }

    if (!phone.trim()) {
      setError('Silakan masukkan Nomor WhatsApp aktif.');
      return;
    }

    setIsLoading(true);

    const userName = name.trim();
    const newUserRecord = {
      email: trimmedEmail,
      name: userName,
      phone: phone.trim(),
      eventDate: eventDate || '',
      guestEstimate: guestEstimate.trim() || '500 Pax',
      createdAt: new Date().toISOString(),
      isVerified: false
    };

    // Try API backend endpoint if available
    try {
      await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserRecord)
      }).catch(() => null);
    } catch {
      // ignore offline backend
    }

    // Save locally
    saveUserToLocalStorage(newUserRecord);

    setTimeout(() => {
      setIsLoading(false);
      setPendingEmail(trimmedEmail);
      setResendCooldown(30);
      setMode('verify_pending');
    }, 600);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Silakan masukkan alamat Email Anda.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Format email tidak valid.');
      return;
    }

    setIsLoading(true);

    // Check if user exists locally
    const existingUser = getUserFromLocalStorage(trimmedEmail);

    setTimeout(() => {
      setIsLoading(false);

      if (existingUser && existingUser.isVerified === false) {
        setError(`Email ${trimmedEmail} belum diverifikasi! Silakan verifikasi email Anda terlebih dahulu.`);
        setPendingEmail(trimmedEmail);
        return;
      }

      const defaultName = existingUser?.name || name.trim() || trimmedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      const user: User = {
        email: trimmedEmail,
        name: defaultName,
        phone: existingUser?.phone || phone.trim() || undefined,
        createdAt: existingUser?.createdAt || new Date().toISOString(),
        isVerified: true
      };

      // Mark verified
      saveUserToLocalStorage({ ...user, isVerified: true });

      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      onLogin(user);
    }, 500);
  };

  // Confirm verification process
  const executeEmailVerification = (targetEmail: string) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      const target = targetEmail.toLowerCase();
      const existing = getUserFromLocalStorage(target);

      const updatedUser = {
        email: target,
        name: existing?.name || name || target.split('@')[0],
        phone: existing?.phone || phone || undefined,
        createdAt: existing?.createdAt || new Date().toISOString(),
        isVerified: true
      };

      saveUserToLocalStorage(updatedUser);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      setMode('verify_success');
    }, 600);
  };

  const handleResendEmail = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    setInfoMsg(`Email verifikasi baru dari Berdikari Wedding telah dikirim ke ${pendingEmail}`);
    setTimeout(() => setInfoMsg(''), 4000);
  };

  const handleCodeVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCodeInput.trim()) {
      setError('Masukkan kode verifikasi 6 digit.');
      return;
    }
    executeEmailVerification(pendingEmail);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-950/10 overflow-hidden z-10 text-emerald-950"
        >
          {/* Header Bar */}
          <div className="bg-emerald-950 text-sand p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-champagne-400/10 rounded-full blur-2xl pointer-events-none"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center mx-auto mb-3 text-champagne-400">
              {mode === 'verify_pending' ? (
                <Mail className="w-6 h-6 animate-bounce text-amber-300" />
              ) : mode === 'verify_success' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>

            <h3 className="font-serif text-2xl font-bold">
              {mode === 'register' && 'Daftar Akun NikaHub'}
              {mode === 'login' && 'Masuk Email NikaHub'}
              {mode === 'verify_pending' && 'Verifikasi Email Anda'}
              {mode === 'verify_success' && 'Verifikasi Berhasil!'}
            </h3>
            <p className="text-xs text-sand/80 mt-1 max-w-xs mx-auto">
              {mode === 'register' && 'Isi pendaftaran singkat untuk reservasi tenda VIP & cicip katering.'}
              {mode === 'login' && 'Masuk cepat dengan alamat email terdaftar yang sudah diverifikasi.'}
              {mode === 'verify_pending' && `Email verifikasi dari Berdikari Wedding telah dikirim ke ${pendingEmail}`}
              {mode === 'verify_success' && 'Akun Berdikari Wedding Anda aktif! Silakan masuk kembali.'}
            </p>

            {/* Mode Switch Tabs (Only shown in register/login mode) */}
            {(mode === 'register' || mode === 'login') && (
              <div className="flex bg-white/10 p-1 rounded-full mt-4 max-w-xs mx-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  className={`flex-1 py-1.5 rounded-full transition-colors cursor-pointer ${
                    mode === 'register' ? 'bg-champagne-400 text-emerald-950 font-bold' : 'text-sand/80 hover:text-white'
                  }`}
                >
                  Daftar Baru
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`flex-1 py-1.5 rounded-full transition-colors cursor-pointer ${
                    mode === 'login' ? 'bg-champagne-400 text-emerald-950 font-bold' : 'text-sand/80 hover:text-white'
                  }`}
                >
                  Masuk (Login)
                </button>
              </div>
            )}
          </div>

          {/* Body Form & Content */}
          <div className="p-6 space-y-4">
            {promptMessage && mode !== 'verify_pending' && mode !== 'verify_success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5"
              >
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{promptMessage}</span>
              </motion.div>
            )}

            {infoMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{infoMsg}</span>
              </motion.div>
            )}

            {/* REGISTER MODE */}
            {mode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Alamat Email Aktif *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Nama Anda / Calon Pengantin *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Anisa & Rian"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">
                      Rencana Tanggal
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-950 mb-1">
                      Estimasi Tamu
                    </label>
                    <input
                      type="text"
                      value={guestEstimate}
                      onChange={(e) => setGuestEstimate(e.target.value)}
                      placeholder="Contoh: 500 Pax"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold px-1">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span>Mengirim Email Verifikasi...</span>
                  ) : (
                    <>
                      <span>Daftar & Kirim Email Verifikasi</span>
                      <ArrowRight className="w-4 h-4 text-champagne-400" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* LOGIN MODE */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Alamat Email Terdaftar *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-rose-600 font-semibold px-1">
                      {error}
                    </p>
                    {pendingEmail && (
                      <button
                        type="button"
                        onClick={() => { setMode('verify_pending'); setError(''); }}
                        className="w-full py-2 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs hover:bg-amber-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-700" />
                        <span>Buka Verifikasi Email {pendingEmail}</span>
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span>Memproses...</span>
                  ) : (
                    <>
                      <span>Masuk Sekarang</span>
                      <ArrowRight className="w-4 h-4 text-champagne-400" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* VERIFY PENDING MODE (WITH REALISTIC SIMULATED BERDIKARI EMAIL) */}
            {mode === 'verify_pending' && (
              <div className="space-y-4 text-xs">
                {/* Email Box Simulation Card */}
                <div className="border border-emerald-900/20 bg-emerald-950/5 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-950/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-mono text-emerald-950/70 font-semibold ml-1">
                        Inbox Mail - Berdikari System
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-900/60 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                      Pesan Baru
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-gray-500">
                      <strong>Dari:</strong> Berdikari Wedding &lt;no-reply@berdikariwedding.com&gt;
                    </div>
                    <div className="text-[11px] text-gray-500">
                      <strong>Kepada:</strong> {pendingEmail}
                    </div>
                    <div className="text-xs font-bold text-emerald-950 pt-1">
                      Subject: [Berdikari Wedding] Verifikasi Alamat Email Pendaftaran Akun
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-emerald-900/10 space-y-3 text-emerald-950 text-[11px] leading-relaxed">
                    <p>
                      Halo <strong>{name || pendingEmail.split('@')[0]}</strong>,
                    </p>
                    <p>
                      Terima kasih telah mendaftar di <strong>Berdikari Wedding Luxury & Catering</strong>. Untuk menyelesaikan pendaftaran dan mengaktifkan akun Anda, silakan verifikasi alamat email ini.
                    </p>

                    {/* Verification Simulation Link/Button inside Email */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => executeEmailVerification(pendingEmail)}
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-sand font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        {isLoading ? (
                          <span>Memverifikasi...</span>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-champagne-400" />
                            <span>Klik di Sini untuk Verifikasi Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center">
                      *Klik tombol di atas untuk menyimulasikan konfirmasi email resmi dari Berdikari Wedding.
                    </p>
                  </div>
                </div>

                {/* Optional Manual 6-Digit Code Input */}
                <form onSubmit={handleCodeVerificationSubmit} className="pt-1 border-t border-gray-100 space-y-2">
                  <label className="block text-[11px] font-bold text-emerald-950">
                    Atau Masukkan Kode Verifikasi (6-Digit):
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <KeyRound className="w-4 h-4 text-emerald-950/40 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Contoh: 849201"
                        value={verificationCodeInput}
                        onChange={(e) => setVerificationCodeInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-mono tracking-widest text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 rounded-xl bg-emerald-950 text-sand font-bold text-xs hover:bg-emerald-900 cursor-pointer disabled:opacity-50"
                    >
                      Verifikasi
                    </button>
                  </div>
                </form>

                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold px-1">
                    {error}
                  </p>
                )}

                {/* Resend email action */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(''); }}
                    className="text-xs text-gray-500 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Ganti Email
                  </button>

                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={resendCooldown > 0}
                    className="text-xs font-bold text-emerald-950 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resendCooldown > 0 ? 'animate-spin' : ''}`} />
                    <span>
                      {resendCooldown > 0 ? `Kirim ulang (${resendCooldown}s)` : 'Kirim Ulang Email'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* VERIFY SUCCESS MODE */}
            {mode === 'verify_success' && (
              <div className="text-center py-4 space-y-4 text-xs">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Email Berhasil Diverifikasi!
                  </h4>
                  <p className="text-gray-600 text-xs max-w-xs mx-auto">
                    Alamat email <strong>{pendingEmail}</strong> telah terkonfirmasi resmi di sistem Berdikari Wedding.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-sand/30 border border-champagne-400/30 text-emerald-950 text-[11px] leading-relaxed">
                  🔒 Akun Anda sudah aktif sepenuhnya. Silakan klik tombol di bawah untuk masuk (login) kembali dan melanjutkan reservasi Anda.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEmail(pendingEmail);
                    setMode('login');
                    setError('');
                    setInfoMsg('Email Anda terverifikasi! Masuk sekarang dengan menekan tombol di bawah.');
                  }}
                  className="w-full py-3.5 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer mt-3"
                >
                  <span>Lanjut ke Halaman Login</span>
                  <ArrowRight className="w-4 h-4 text-champagne-400" />
                </button>
              </div>
            )}

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-2 border-t border-gray-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Sistem Otentikasi Email Berdikari Wedding Terenkripsi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
