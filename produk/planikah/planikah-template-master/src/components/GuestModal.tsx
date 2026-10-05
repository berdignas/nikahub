import React, { useState, useEffect } from 'react';
import { X, Save, User, Phone, Users, MapPin, Tag } from 'lucide-react';
import { WeddingGuest, GuestTier, GuestSide, RsvpStatus } from '../types/wedding';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guestData: Partial<WeddingGuest>) => void;
  initialData?: WeddingGuest | null;
}

const TIERS: GuestTier[] = [
  'VVIP',
  'VIP',
  'Keluarga Inti Pria',
  'Keluarga Inti Wanita',
  'Sahabat Pria',
  'Sahabat Wanita',
  'Rekan Kerja',
  'Tetangga / Umum'
];

const SIDES: GuestSide[] = [
  'Pihak Pria',
  'Pihak Wanita',
  'Bersama',
  'Orang Tua Pria',
  'Orang Tua Wanita'
];

const RSVP_STATUSES: RsvpStatus[] = [
  'Menunggu Konfirmasi',
  'Hadir',
  'Tidak Hadir',
  'Ragu-ragu'
];

export const GuestModal: React.FC<GuestModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [side, setSide] = useState<GuestSide>('Bersama');
  const [tier, setTier] = useState<GuestTier>('VIP');
  const [paxAllotted, setPaxAllotted] = useState('2');
  const [paxConfirmed, setPaxConfirmed] = useState('0');
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>('Menunggu Konfirmasi');
  const [tableNumber, setTableNumber] = useState('');
  const [qrToken, setQrToken] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhoneNumber(initialData.phone_number || '');
      setSide(initialData.side);
      setTier(initialData.tier);
      setPaxAllotted(initialData.pax_allotted.toString());
      setPaxConfirmed(initialData.pax_confirmed.toString());
      setRsvpStatus(initialData.rsvp_status);
      setTableNumber(initialData.table_number || '');
      setQrToken(initialData.qr_token || '');
      setDietaryNotes(initialData.dietary_notes || '');
      setCustomNotes(initialData.custom_notes || '');
    } else {
      setName('');
      setPhoneNumber('');
      setSide('Bersama');
      setTier('VIP');
      setPaxAllotted('2');
      setPaxConfirmed('0');
      setRsvpStatus('Menunggu Konfirmasi');
      setTableNumber('');
      setQrToken(`TKN-${Date.now().toString().slice(-6)}`);
      setDietaryNotes('');
      setCustomNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const allotted = parseInt(paxAllotted) || 1;
    const confirmed = parseInt(paxConfirmed) || 0;

    onSave({
      name,
      phone_number: phoneNumber || undefined,
      side,
      tier,
      pax_allotted: allotted,
      pax_confirmed: rsvpStatus === 'Hadir' ? (confirmed || allotted) : confirmed,
      rsvp_status: rsvpStatus,
      table_number: tableNumber || undefined,
      qr_token: qrToken || `TKN-${Date.now().toString().slice(-6)}`,
      dietary_notes: dietaryNotes || undefined,
      custom_notes: customNotes || undefined,
      invitation_sent: initialData ? initialData.invitation_sent : false,
      sent_date: initialData?.sent_date
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {initialData ? 'Sunting Data Undangan' : 'Tambah Tamu Undangan Baru'}
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              {initialData ? initialData.name : 'Form Buku Tamu & Digital RSVP'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Nama Lengkap Tamu / Keluarga
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Ir. H. Bambang Soemantri & Pasangan"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kategori / Klasifikasi Tier
              </label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value as GuestTier)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {TIERS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Pihak Pengundang
              </label>
              <select
                value={side}
                onChange={e => setSide(e.target.value as GuestSide)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {SIDES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nomor WhatsApp / Telepon
              </label>
              <input
                type="text"
                placeholder="Contoh: 08123456789"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Alokasi Nomor Meja / Zona
              </label>
              <input
                type="text"
                placeholder="Contoh: Meja VIP 01 / Meja 08"
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kuota Pax Diundang
              </label>
              <input
                type="number"
                min="1"
                max="10"
                required
                value={paxAllotted}
                onChange={e => setPaxAllotted(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Status Konfirmasi RSVP
              </label>
              <select
                value={rsvpStatus}
                onChange={e => setRsvpStatus(e.target.value as RsvpStatus)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                {RSVP_STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Pax Hadir (Konfirmasi)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={paxConfirmed}
                onChange={e => setPaxConfirmed(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan Menu / Alergi Makanan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Vegetarian, Bebas Seafood, Rendah Garam"
              value={dietaryNotes}
              onChange={e => setDietaryNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan Khusus Tamu (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Tamu kehormatan orang tua, saksi nikah, rekan kantor cabang..."
              value={customNotes}
              onChange={e => setCustomNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Data Tamu</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
