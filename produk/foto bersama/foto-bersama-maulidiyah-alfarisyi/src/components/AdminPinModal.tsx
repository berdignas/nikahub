import React, { useState, useRef, useEffect } from 'react';
import { X, Lock, KeyRound, ShieldCheck, AlertCircle, Check, ArrowRight } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Default PIN for couple/moderator (can be 1924, 1234, or 2026)
const VALID_PINS = ['1924', '1234', '2026'];

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '']);
      setError(false);
      setIsSuccess(false);
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    // Only accept numbers
    const cleaned = value.replace(/\D/g, '').slice(-1);
    
    const newPin = [...pin];
    newPin[index] = cleaned;
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If 4 digits entered, verify
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
    if (VALID_PINS.includes(enteredPin)) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 700);
    } else {
      setError(true);
      // Shake and clear after short delay
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A261D]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-sm w-full bg-white border border-[#E6CA92]/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 text-center font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0A261D] to-[#1a4b3b] border border-[#E6CA92]/50 text-[#E6CA92] mx-auto flex items-center justify-center shadow-lg mb-4">
          <KeyRound className="w-7 h-7" />
        </div>

        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0A261D] mb-1.5">
          PIN Akses Pengantin
        </h3>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Masukkan 4 digit PIN khusus mempelai untuk mengaktifkan izin hapus foto / folder tamu manapun.
        </p>

        {/* 4-Digit Input Boxes */}
        <div className="flex justify-center gap-3 mb-5">
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
              className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border-2 transition-all outline-none ${
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

        {/* Status Messages */}
        {error && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-semibold mb-4 animate-fade-in">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>PIN salah. Silakan coba lagi.</span>
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-bold mb-4 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>PIN Benar! Mode Pengantin Aktif...</span>
          </div>
        )}

        {/* On-screen Keypad for Mobile / Ease of Use */}
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
            className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all active:scale-95 border border-gray-200 flex items-center justify-center cursor-pointer"
          >
            ⌫
          </button>
        </div>

        <p className="text-[10px] text-gray-400 font-medium">
          PIN Default Pengantin: <span className="font-bold text-gray-600">1924</span> atau <span className="font-bold text-gray-600">1234</span>
        </p>
      </div>
    </div>
  );
};
