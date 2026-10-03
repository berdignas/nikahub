import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, PhoneCall, Bot, User as UserIcon, CheckCheck, HelpCircle, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { User, ChatMessage } from '../types';

interface ChatViewProps {
  user: User | null;
  onNavigateToCatalog: () => void;
  onOpenCart: () => void;
  onRequestLogin: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  user,
  onNavigateToCatalog,
  onOpenCart,
  onRequestLogin,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'concierge',
      text: `Halo ${user?.name || 'Calon Pengantin'}! Selamat datang di Layanan Concierge Chat NikaHub. Ada yang bisa kami bantu seputar konsep pernikahan, denah tenda VIP, atau cicip katering hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const QUICK_QUESTIONS = [
    "Bagaimana cara memesan paket tenda VIP & katering?",
    "Apakah ada sesi Food Tasting gratis?",
    "Berapa lama instalasi tenda dilakukan sebelum H-1?",
    "Bagaimana kelanjutan pesanan saya?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    if (!user) {
      onRequestLogin();
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Simulate Concierge auto response
    setTimeout(() => {
      let replyText = "Terima kasih telah berkonsultasi! Tim Project Director NikaHub siap membantu menghitung estimasi denah & anggaran Anda.";
      
      const lower = text.toLowerCase();
      if (lower.includes('tenda') || lower.includes('pesan') || lower.includes('paket')) {
        replyText = "Untuk pemesanan paket tenda VIP atau katering, Anda bisa memilih paket dari katalog NikaHub, lalu lakukan verifikasi jadwal melalui menu Reservasi / Checkout (CO).";
      } else if (lower.includes('tasting') || lower.includes('makanan') || lower.includes('katering')) {
        replyText = "Kami menyediakan Sesi Food Tasting privat gratis untuk 2 pax di Executive Lounge Kemang Raya. Anda bisa menentukan tanggal kunjungan langsung via form konsultasi atau reservasi.";
      } else if (lower.includes('h-1') || lower.includes('instalasi') || lower.includes('jadwal')) {
        replyText = "Seluruh perlengkapan tenda, pendingin AC, dan panggung dipastikan 100% siap pada H-1 pukul 14.00 WIB untuk gladi resik keluarga.";
      } else if (lower.includes('pesanan') || lower.includes('status') || lower.includes('co')) {
        replyText = "Anda dapat melihat daftar paket yang siap diverifikasi di menu Reservasi / Cart CO di pojok kanan atas.";
      }

      const conciergeMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, conciergeMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 text-emerald-950">
      
      {/* Top Banner Header */}
      <div className="bg-emerald-950 text-sand p-6 sm:p-8 rounded-t-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-champagne-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-bold">Concierge Live Chat</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-800 text-champagne-300 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online
              </span>
            </div>
            <p className="text-xs text-sand/80 mt-0.5">
              {user ? `Terhubung sebagai ${user.name} (${user.email})` : 'Silakan login email untuk memulai obrolan langsung'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto relative z-10">
          <button
            onClick={onNavigateToCatalog}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-sand transition-colors cursor-pointer"
          >
            Lihat Katalog
          </button>
          <button
            onClick={onOpenCart}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-champagne-400 text-emerald-950 hover:bg-champagne-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Menu CO</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border-x border-b border-emerald-950/10 rounded-b-3xl shadow-xl p-4 sm:p-6 space-y-4 min-h-[420px] flex flex-col justify-between">
        
        {/* Messages List */}
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-emerald-950 text-sand' 
                  : 'bg-champagne-100 text-emerald-950 border border-champagne-300'
              }`}>
                {msg.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4 text-champagne-700" />}
              </div>

              <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-950 text-sand rounded-tr-none shadow-sm'
                  : 'bg-sand/60 text-emerald-950 border border-sand-300 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1.5 text-right ${
                  msg.sender === 'user' ? 'text-sand/60' : 'text-emerald-950/40'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-champagne-100 border border-champagne-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-champagne-700 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-sand/60 border border-sand-300 rounded-tl-none text-xs text-emerald-950/60 italic flex items-center gap-1.5">
                <span>Tim Concierge sedang mengetik</span>
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <span className="text-[11px] text-gray-500 font-semibold block">
            Pertanyaan Cepat Konsultasi:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-full bg-sand/70 hover:bg-champagne-200 text-emerald-950 text-[11px] font-medium border border-sand-300 transition-colors cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="pt-2">
          {!user ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs">
              <span className="text-amber-900 font-medium">
                Silakan login dengan Email Anda untuk mulai mengirim pesan langsung ke tim Concierge.
              </span>
              <button
                onClick={onRequestLogin}
                className="px-4 py-2 rounded-full bg-emerald-950 text-sand font-bold text-xs shrink-0 cursor-pointer hover:bg-emerald-900 transition-colors"
              >
                Login Email
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Tanyakan konsep pernikahan, tenda VIP, katering..."
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-950 bg-gray-50 focus:bg-white"
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-emerald-950 text-sand hover:bg-emerald-900 transition-colors cursor-pointer shrink-0 shadow-md"
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4 text-champagne-400" />
              </button>
            </form>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              Layanan Resmi NikaHub Atelier
            </span>
            <a
              href="https://wa.me/qr/XCPMCWREYZVOM1"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-900 font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-champagne-600" />
              Hubungi via WhatsApp Direct
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

