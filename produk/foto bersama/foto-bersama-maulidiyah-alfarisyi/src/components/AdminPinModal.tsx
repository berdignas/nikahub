import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Check,
  RefreshCw,
  Sparkles,
  Key,
  CheckCircle2,
} from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'verify' | 'change';
}

const DEFAULT_MASTER_PINS = ['1924', '1234', '2026'];
const STORAGE_KEY = 'wedding_custom_admin_pin';

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'verify',
}) => {
  const [activeTab, setActiveTab] = useState<'verify' | 'change'>(initialMode);

  // Verify State
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Change PIN State
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccessMsg, setChangeSuccessMsg] = useState('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Helper to get all currently accepted PINs
  const getAcceptedPins = (): string[] => {
    try {
      const custom = localStorage.getItem(STORAGE_KEY);
      if (custom && custom.trim().length === 4) {
        return [custom.trim(), ...DEFAULT_MASTER_PINS];
      }
    } catch {}
    return DEFAULT_MASTER_PINS;
  };

  const getActiveCustomPin = (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setPin(['', '', '', '']);
      setError(false);
      setErrorMsg('');
      setIsSuccess(false);
      setOldPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      setChangeError('');
      setChangeSuccessMsg('');

      if (initialMode === 'verify') {
        setTimeout(() => {
          inputRefs[0].current?.focus();
        }, 150);
      }
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // --- VERIFY TAB HANDLERS ---
  const handleInputChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const newPin = [...pin];
    newPin[index] = cleaned;
    setPin(newPin);
    setError(false);
    setErrorMsg('');

    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const fullPin = newPin.join('');
    if (fullPin.length === 4 && index === 3) {
      verifyPin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = (enteredPin: string) => {
    const accepted = getAcceptedPins();
    if (accepted.includes(enteredPin)) {
      setIsSuccess(true);
      setError(false);
      setErrorMsg('');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 700);
    } else {
      setError(true);
      setErrorMsg('PIN salah. Silakan coba lagi.');
      setTimeout(() => {
        setPin(['', '', '', '']);
        inputRefs[0].current?.focus();
      }, 600);
    }
  };

  const handleKeypadPress = (digit: string) => {
    const firstEmptyIndex = pin.findIndex((p) => p === '');
    if (firstEmptyIndex !== -1) {
      handleInputChange(firstEmptyIndex, digit);
    }
  };

  const handleKeypadBackspace = () => {
    const lastFilledIndex = [...pin].reverse().findIndex((p) => p !== '');
    if (lastFilledIndex !== -1) {
      const targetIndex = 3 - lastFilledIndex;
      const newPin = [...pin];
      newPin[targetIndex] = '';
      setPin(newPin);
      setError(false);
      inputRefs[targetIndex].current?.focus();
    }
  };

  // --- CHANGE PIN HANDLERS ---
  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccessMsg('');

    const accepted = getAcceptedPins();

    // 1. Validate old pin
    if (!accepted.includes(oldPinInput.trim())) {
      setChangeError('PIN lama / PIN saat ini tidak sesuai.');
      return;
    }

    // 2. Validate new pin
    const cleanedNew = newPinInput.replace(/\D/g, '');
    if (cleanedNew.length !== 4) {
      setChangeError('PIN baru harus tepat 4 digit angka.');
      return;
    }

    // 3. Confirm match
    if (cleanedNew !== confirmPinInput.replace(/\D/g, '')) {
      setChangeError('Konfirmasi PIN baru tidak cocok.');
      return;
    }

    // 4. Save to storage
    try {
      localStorage.setItem(STORAGE_KEY, cleanedNew);
      setChangeSuccessMsg(`PIN Pengantin berhasil diubah menjadi: ${cleanedNew} ✨`);
      
      // Auto-unlock admin & close after short delay
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch {
      setChangeError('Gagal menyimpan PIN baru ke browser.');
    }
  };

  const handleResetPinToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setChangeSuccessMsg('PIN Pengantin berhasil direset ke default: 1924');
      setTimeout(() => {
        setChangeSuccessMsg('');
        setActiveTab('verify');
      }, 1200);
    } catch {}
  };

  const currentCustom = getActiveCustomPin();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A261D]/80 backdrop-blur-md animate-fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-white border border-[#E6CA92]/50 rounded-[32px] overflow-hidden shadow-2xl p-5 sm:p-7 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0A261D] to-[#1a4b3b] border border-[#E6CA92]/60 text-[#E6CA92] mx-auto flex items-center justify-center shadow-lg mb-3">
          <KeyRound className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0A261D] leading-tight">
          {activeTab === 'verify' ? 'PIN Akses Pengantin' : 'Ubah PIN Pengantin'}
        </h3>
        <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">
          {activeTab === 'verify'
            ? 'Masukkan 4 digit PIN untuk membuka izin mengelola foto & folder tamu.'
            : 'Atur 4 digit PIN baru pilihan Anda untuk keamanan akses album.'}
        </p>

        {/* TAB SWITCHER */}
        <div className="flex items-center justify-center p-1 bg-gray-100 rounded-2xl mb-5 text-xs font-bold border border-gray-200/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab('verify');
              setError(false);
              setTimeout(() => inputRefs[0].current?.focus(), 100);
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'verify'
                ? 'bg-white text-[#0A261D] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Masuk PIN</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('change');
              setChangeError('');
              setChangeSuccessMsg('');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'change'
                ? 'bg-[#0A261D] text-[#FAF9F5] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Ubah PIN</span>
          </button>
        </div>

        {/* --- VIEW 1: VERIFY PIN --- */}
        {activeTab === 'verify' && (
          <div>
            {/* 4-Digit Input Boxes */}
            <div className="flex justify-center gap-3 mb-4">
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-2xl border-2 transition-all outline-none ${
                    error
                      ? 'border-red-500 bg-red-50 text-red-700 animate-shake'
                      : isSuccess
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : digit
                      ? 'border-[#0A261D] bg-[#FAF9F5] text-[#0A261D]'
                      : 'border-gray-200 bg-white text-[#0A261D] focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/30'
                  }`}
                />
              ))}
            </div>

            {/* Error / Success Status */}
            {error && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-semibold mb-3 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg || 'PIN salah. Silakan coba lagi.'}</span>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold mb-3 animate-fade-in">
                <Check className="w-4 h-4 shrink-0" />
                <span>PIN Benar! Mengaktifkan Mode Pengantin...</span>
              </div>
            )}

            {/* Keypad Buttons for Easy Mobile Tap */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num.toString())}
                  className="py-2.5 rounded-xl bg-gray-50 hover:bg-[#0A261D] hover:text-[#FAF9F5] text-[#0A261D] text-base font-bold transition-all active:scale-95 border border-gray-100 cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="py-2.5 rounded-xl bg-gray-50 hover:bg-[#0A261D] hover:text-[#FAF9F5] text-[#0A261D] text-base font-bold transition-all active:scale-95 border border-gray-100 cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleKeypadBackspace}
                className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-all active:scale-95 border border-gray-200 flex items-center justify-center cursor-pointer"
              >
                ⌫
              </button>
            </div>

            {/* Bottom Change PIN Trigger */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 text-[11px]">
                {currentCustom ? (
                  <>PIN Aktif: <strong className="text-emerald-700">Kustom</strong></>
                ) : (
                  <>Default: <strong className="text-gray-600">1924</strong></>
                )}
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('change')}
                className="text-[#0A261D] hover:text-[#164E3D] font-bold text-[11px] underline cursor-pointer flex items-center gap-1"
              >
                <Key className="w-3 h-3 text-[#C5A880]" />
                <span>Ganti PIN Ini</span>
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW 2: CHANGE PIN FORM --- */}
        {activeTab === 'change' && (
          <form onSubmit={handleSaveNewPin} className="space-y-3.5 text-left">
            {/* Field 1: Old PIN */}
            <div>
              <label className="block text-xs font-bold text-[#0A261D] mb-1">
                1. PIN Lama / Saat Ini (4 Digit):
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={oldPinInput}
                onChange={(e) => setOldPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Masukkan PIN saat ini (cth: 1924)"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-sm font-bold tracking-widest text-[#0A261D] focus:bg-white focus:outline-none focus:border-[#0A261D] transition-colors"
              />
            </div>

            {/* Field 2: New PIN */}
            <div>
              <label className="block text-xs font-bold text-[#0A261D] mb-1">
                2. PIN Baru Anda (4 Digit Angka):
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Masukkan 4 angka baru pilihan Anda"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-sm font-bold tracking-widest text-[#0A261D] focus:bg-white focus:outline-none focus:border-[#0A261D] transition-colors"
              />
            </div>

            {/* Field 3: Confirm New PIN */}
            <div>
              <label className="block text-xs font-bold text-[#0A261D] mb-1">
                3. Ulangi PIN Baru (Konfirmasi):
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={confirmPinInput}
                onChange={(e) => setConfirmPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Ketik ulang 4 angka baru"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-sm font-bold tracking-widest text-[#0A261D] focus:bg-white focus:outline-none focus:border-[#0A261D] transition-colors"
              />
            </div>

            {/* Change Error / Success Message */}
            {changeError && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{changeError}</span>
              </div>
            )}

            {changeSuccessMsg && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{changeSuccessMsg}</span>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#E6CA92]" />
                <span>Simpan PIN Baru</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('verify')}
                  className="text-xs text-gray-500 hover:text-gray-800 font-medium underline cursor-pointer"
                >
                  Batal / Kembali
                </button>

                {currentCustom && (
                  <button
                    type="button"
                    onClick={handleResetPinToDefault}
                    className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                  >
                    Reset ke Default (1924)
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
