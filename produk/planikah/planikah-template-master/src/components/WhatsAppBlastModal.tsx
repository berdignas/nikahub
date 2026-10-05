import React, { useState } from 'react';
import { X, Send, Copy, Check, MessageSquare, ExternalLink, Link2 } from 'lucide-react';
import { WeddingGuest, WeddingProfile } from '../types/wedding';

interface WhatsAppBlastModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: WeddingGuest | null;
  profile: WeddingProfile;
  onMarkSent: (guestId: string) => void;
}

export const WhatsAppBlastModal: React.FC<WhatsAppBlastModalProps> = ({
  isOpen,
  onClose,
  guest,
  profile,
  onMarkSent
}) => {
  if (!isOpen || !guest) return null;

  const [templateType, setTemplateType] = useState<'official' | 'savethedate' | 'reminder'>('official');
  const [copied, setCopied] = useState(false);

  // Normalize phone number (convert 08xx into 628xx)
  const formatPhone = (phone?: string) => {
    if (!phone) return '';
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  };

  const phoneFormatted = formatPhone(guest.phone_number);
  const baseUrl = profile.invitation_base_url || 'https://berdikariwedding.com/to';
  const personalizedLink = `${baseUrl}/${encodeURIComponent(guest.name.replace(/\s+/g, '-'))}?token=${guest.qr_token}&pax=${guest.pax_allotted}`;

  // Generate Template Text (Formal, elegant, NO EMOJIS)
  const generateMessage = () => {
    const groomBride = `${profile.groom_nickname} & ${profile.bride_nickname}`;
    const weddingDate = profile.wedding_date;
    const venue = profile.venue_name;

    if (templateType === 'savethedate') {
      return `Kepada Yth.
${guest.name}

Salam hangat,

Dengan penuh rasa syukur dan sukacita, kami bermaksud mengabarkan hari bahagia pernikahan kami:

${profile.groom_name}
dengan
${profile.bride_name}

Hari/Tanggal: ${weddingDate}
Tempat: ${venue}

Mohon simpan tanggal tersebut dalam agenda Bapak/Ibu/Saudara/i. Undangan resmi beserta rincian acara akan kami sampaikan dalam waktu dekat.

Salam hormat kami,
${groomBride} dan Keluarga Besar`;
    }

    if (templateType === 'reminder') {
      return `Kepada Yth.
${guest.name}

Semoga Bapak/Ibu/Saudara/i senantiasa dalam keadaan sehat walafiat.

Mengingat semakin dekatnya hari pernikahan kami (${groomBride}) pada tanggal ${weddingDate}, kami bermaksud mengonfirmasi kembali kehadiran Bapak/Ibu/Saudara/i untuk keperluan pendataan porsi dan tata letak tempat duduk.

Tautan konfirmasi kehadiran:
${personalizedLink}

Terima kasih atas perhatian dan doa restu yang diberikan.

Salam hormat,
${groomBride}`;
    }

    // Official invitation (default)
    return `Kepada Yth.
${guest.name}

Assalamu'alaikum Wr. Wb. / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami:

${profile.groom_name}
dengan
${profile.bride_name}

Hari/Tanggal: ${weddingDate}
Pukul: ${profile.wedding_time || '08:00'} WIB
Tempat: ${venue}
Alokasi Kuota: ${guest.pax_allotted} Tamu Undangan
${guest.table_number ? `Zona Tempat Duduk: ${guest.table_number}\n` : ''}
Untuk melihat rincian acara dan melakukan konfirmasi kehadiran (RSVP), silakan mengakses tautan undangan digital berikut:

${personalizedLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Hormat kami yang berbahagia,
${groomBride}
Beserta Keluarga Besar`;
  };

  const messageText = generateMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    onMarkSent(guest.id);
    const encoded = encodeURIComponent(messageText);
    const waUrl = phoneFormatted 
      ? `https://api.whatsapp.com/send?phone=${phoneFormatted}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              WhatsApp Engine & Digital Broadcast
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              Kirim Undangan ke: {guest.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Template Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Pilih Jenis Pesan Broadcast
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTemplateType('official')}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  templateType === 'official'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                Undangan Resmi + Link
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('savethedate')}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  templateType === 'savethedate'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                Save the Date
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('reminder')}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  templateType === 'reminder'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                Pengingat RSVP (H-7)
              </button>
            </div>
          </div>

          {/* Guest Meta Pill */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
            <span>Nomor WA: <strong>{guest.phone_number || 'Belum diisi'}</strong></span>
            <span>&bull;</span>
            <span>Klasifikasi: <strong>{guest.tier}</strong></span>
            <span>&bull;</span>
            <span>Kuota: <strong>{guest.pax_allotted} Pax</strong></span>
            {guest.table_number && (
              <>
                <span>&bull;</span>
                <span>Meja: <strong>{guest.table_number}</strong></span>
              </>
            )}
          </div>

          {/* Personalized Link Preview */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Tautan Undangan Personal (Dynamic Token URL)
            </span>
            <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 overflow-x-auto">
              <Link2 className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="truncate">{personalizedLink}</span>
            </div>
          </div>

          {/* Message Text Area Preview */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Pratinjau Teks Pesan WhatsApp
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-1 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={9}
              value={messageText}
              className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-sans leading-relaxed focus:outline-none"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Kirim via WhatsApp Sekarang</span>
          </button>
        </div>

      </div>
    </div>
  );
};
