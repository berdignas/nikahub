import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Sparkles, AlertCircle, KeyRound, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onGoHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onGoHome,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username/Email dan Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Secret Admin Credentials check
      const validUser = username.trim().toLowerCase() === 'admin@nikahub.id' || username.trim().toLowerCase() === 'admin';
      const validPass = password === 'nikahub2026' || password === 'admin123';

      if (validUser && validPass) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        sessionStorage.setItem('nikahub_admin_session', 'authenticated');
        onLoginSuccess();
      } else {
        setError('Kredensial Admin tidak valid! Silakan periksa kembali email & password admin Anda.');
      }
    }, 500);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-4 text-emerald-950">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-950/15 overflow-hidden relative"
      >
        {/* Header Bar */}
        <div className="bg-emerald-950 text-sand p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-14 h-14 rounded-2xl bg-sand/10 border border-sand/20 flex items-center justify-center mx-auto mb-4 text-champagne-400 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/10 border border-sand/20 text-[10px] font-bold uppercase tracking-widest text-champagne-300 mb-2">
            <Sparkles className="w-3 h-3 text-champagne-400" />
            Rahasia / Internal Portal
          </span>

          <h2 className="font-serif text-2xl font-bold text-white">Login Administrator</h2>
          <p className="text-xs text-sand/80 mt-1 max-w-xs mx-auto leading-relaxed">
            Portal Khusus Manajemen Katalog, Pesanan Client & Sistem NikaHub Atelier
          </p>
        </div>

        {/* Body Form */}
        <div className="p-8 space-y-6">
          
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Halaman ini hanya dapat diakses langsung via URL rahasia <strong>/login-berdignas-nikahub</strong>.
            </span>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-emerald-950 mb-1.5">
                Email / Username Admin
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@nikahub.id"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1.5">
                Password Rahasia Admin
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-emerald-950/40 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-rose-600 font-semibold px-1 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-emerald-950 text-sand hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Verifikasi Kredensial...</span>
              ) : (
                <>
                  <span>Masuk Dashboard Admin</span>
                  <ArrowRight className="w-4 h-4 text-champagne-400" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-emerald-950/60">
            <span>Login Default: <strong>admin@nikahub.id</strong> / <strong>nikahub2026</strong></span>
            <button
              onClick={onGoHome}
              className="text-emerald-950 font-bold hover:underline"
            >
              Kembali Ke Beranda
            </button>
          </div>

        </div>

      </motion.div>

    </div>
  );
};
