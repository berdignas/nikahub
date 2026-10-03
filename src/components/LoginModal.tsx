import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Lock, ArrowRight, ShieldCheck, Phone, CheckCircle2, RefreshCw, Send, KeyRound, Check, Eye, EyeOff } from 'lucide-react';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Synchronize mode and email whenever props or modal visibility change
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      setPendingEmail(initialEmail);
    }
  }, [initialEmail, isOpen]);

  if (!isOpen) return null;

  // Helper: Save user to local storage db
  const saveUserToLocalStorage = (userObj: User & { isVerified?: boolean; phone?: string; password?: string; eventDate?: string; guestEstimate?: string }) => {
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

  // Helper format cooldown
  const formatCooldown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
      return `${m}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${s}s`;
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

    if (!password) {
      setError('Silakan buat kata sandi untuk akun Anda.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Kata sandi dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    setIsLoading(true);

    const userName = name.trim();
    const newUserRecord = {
      email: trimmedEmail,
      name: userName,
      phone: phone.trim(),
      password: password,
      eventDate: eventDate || '',
      guestEstimate: guestEstimate.trim() || '500 Pax',
      createdAt: new Date().toISOString(),
      isVerified: false
    };

    // Call backend endpoints asynchronously in background (never blocks the UI!)
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserRecord)
    }).catch(() => null);

    fetch('/api/auth/send-verification-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, name: userName })
    }).catch(() => null);

    // Save locally
    saveUserToLocalStorage(newUserRecord);

    setIsLoading(false);
    setPendingEmail(trimmedEmail);
    setResendCooldown(120); // 2 Menit cooldown
    setMode('verify_pending');
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

    if (!password) {
      setError('Silakan masukkan kata sandi akun Anda.');
      return;
    }

    setIsLoading(true);

    // Check if user exists locally
    const existingUser = getUserFromLocalStorage(trimmedEmail);

    setTimeout(() => {
      setIsLoading(false);

      if (existingUser && existingUser.password && existingUser.password !== password) {
        setError('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
        return;
      }

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

      // Mark verified & preserve password
      saveUserToLocalStorage({
        ...user,
        password: existingUser?.password || password,
        isVerified: true
      });

      // Synchronize with server in background
      try {
        fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password })
        }).catch(() => null);
      } catch {
        // ignore
      }

      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      onLogin(user);
    }, 400);
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
        password: existing?.password || password,
        createdAt: existing?.createdAt || new Date().toISOString(),
        isVerified: true
      };

      saveUserToLocalStorage(updatedUser);

      // Notify backend of verification
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target })
      }).catch(() => null);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      setEmail(target);
      setMode('login');
      setInfoMsg(`✨ Email ${target} berhasil diverifikasi! Masukkan kata sandi Anda untuk langsung masuk ke Dashboard.`);
    }, 400);
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(120);
    setInfoMsg(`Email verifikasi baru telah dikirim ke ${pendingEmail}`);
    try {
      await fetch('/api/auth/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, name: name || pendingEmail.split('@')[0] })
      }).catch(() => null);
    } catch {
      // ignore
    }
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

                {/* Password Input */}
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Buat Kata Sandi / Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-emerald-950/40 hover:text-emerald-950 transition-colors cursor-pointer"
                      title={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Konfirmasi Kata Sandi *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi Anda"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3 text-emerald-950/40 hover:text-emerald-950 transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
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

                {/* Single Form Mode Switch Link */}
                <div className="text-center pt-3 border-t border-gray-100 mt-3">
                  <p className="text-xs text-gray-600">
                    Sudah punya akun?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setError(''); setInfoMsg(''); }}
                      className="font-bold text-emerald-950 hover:underline cursor-pointer ml-1"
                    >
                      Masuk (Login) di Sini →
                    </button>
                  </p>
                </div>
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

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Kata Sandi / Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi Anda"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-emerald-950/40 hover:text-emerald-950 transition-colors cursor-pointer"
                      title={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
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

                {/* Single Form Mode Switch Link */}
                <div className="text-center pt-3 border-t border-gray-100 mt-3">
                  <p className="text-xs text-gray-600">
                    Belum punya akun?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('register'); setError(''); setInfoMsg(''); }}
                      className="font-bold text-emerald-950 hover:underline cursor-pointer ml-1"
                    >
                      Silakan Daftar Akun Baru →
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* VERIFY PENDING MODE (VERIFICATION VIA EMAIL BUTTON) */}
            {mode === 'verify_pending' && (
              <div className="space-y-4 text-xs">
                {/* Email Sent Notice Card */}
                <div className="border border-emerald-900/15 bg-emerald-50/50 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-champagne-400 flex items-center justify-center mx-auto shadow-md">
                    <Mail className="w-7 h-7 animate-bounce" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif text-base font-bold text-emerald-950">
                      Cek Kotak Masuk Email Anda
                    </h4>
                    <p className="text-xs text-emerald-950/80 leading-relaxed">
                      Surat verifikasi resmi telah dikirim ke <strong className="text-emerald-950 font-bold">{pendingEmail}</strong>.
                    </p>
                    <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed pt-1">
                      Buka email Anda dan klik tombol <strong>"Verifikasi Email Saya Sekarang"</strong> di dalam surat untuk mengaktifkan akun secara otomatis.
                    </p>
                  </div>
                </div>

                {/* Optional 6-Digit Code Input */}
                <form onSubmit={handleCodeVerificationSubmit} className="pt-2 border-t border-gray-100 space-y-2">
                  <label className="block text-[11px] font-bold text-emerald-950 text-center">
                    Atau Masukkan Kode 6-Digit dari Email:
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
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs font-mono tracking-widest text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2.5 rounded-xl bg-emerald-950 text-sand font-bold text-xs hover:bg-emerald-900 cursor-pointer disabled:opacity-50"
                    >
                      Verifikasi
                    </button>
                  </div>
                </form>

                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold px-1 text-center">
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
                      {resendCooldown > 0 ? `Kirim ulang (${formatCooldown(resendCooldown)})` : 'Kirim Ulang Email'}
                    </span>
                  </button>
                </div>

                {/* Direct switch to Login if already confirmed in another tab/device */}
                <div className="pt-2 text-center border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(pendingEmail || email);
                      setMode('login');
                      setError('');
                      setInfoMsg(`Silakan masukkan kata sandi akun Anda untuk masuk.`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-champagne-400 hover:bg-champagne-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Sudah Klik Tautan di Email? Masuk Sekarang →</span>
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
                    const target = pendingEmail || initialEmail || email;
                    setEmail(target);
                    setMode('login');
                    setError('');
                    setInfoMsg('Email Anda terverifikasi! Masukkan kata sandi untuk masuk.');
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
