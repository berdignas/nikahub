import React, { useState, useEffect } from 'react';
import { X, Save, Wallet, Gift, User, Phone } from 'lucide-react';
import { WeddingGift, GiftType } from '../types/wedding';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (giftData: Partial<WeddingGift>) => void;
  initialData?: WeddingGift | null;
}

export const GiftModal: React.FC<GiftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  if (!isOpen) return null;

  const [envelopeNumber, setEnvelopeNumber] = useState('');
  const [giverName, setGiverName] = useState('');
  const [giverPhone, setGiverPhone] = useState('');
  const [giftType, setGiftType] = useState<GiftType>('Amplop Tunai');
  const [amount, setAmount] = useState('1000000');
  const [itemDescription, setItemDescription] = useState('');
  const [recipientSide, setRecipientSide] = useState<'Pria' | 'Wanita' | 'Bersama' | 'Keluarga Pria' | 'Keluarga Wanita'>('Bersama');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setEnvelopeNumber(initialData.envelope_number || '');
      setGiverName(initialData.giver_name);
      setGiverPhone(initialData.giver_phone || '');
      setGiftType(initialData.gift_type);
      setAmount(initialData.amount ? initialData.amount.toString() : '0');
      setItemDescription(initialData.item_description || '');
      setRecipientSide(initialData.recipient_side);
      setNotes(initialData.notes || '');
    } else {
      setEnvelopeNumber(`ENV-${Date.now().toString().slice(-3)}`);
      setGiverName('');
      setGiverPhone('');
      setGiftType('Amplop Tunai');
      setAmount('1000000');
      setItemDescription('');
      setRecipientSide('Bersama');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giverName) return;

    const amountNum = giftType === 'Kado Fisik' ? 0 : (parseFloat(amount) || 0);

    onSave({
      envelope_number: envelopeNumber || undefined,
      giver_name: giverName,
      giver_phone: giverPhone || undefined,
      gift_type: giftType,
      amount: amountNum,
      item_description: giftType === 'Kado Fisik' ? itemDescription : undefined,
      recipient_side: recipientSide,
      thank_you_sent: initialData ? initialData.thank_you_sent : false,
      notes: notes || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {initialData ? 'Sunting Catatan Hadiah' : 'Pencatatan Amplop & Hadiah Baru'}
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              {initialData ? initialData.giver_name : 'Form Rekapitulasi Angpao / Kado'}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Jenis Hadiah
              </label>
              <select
                value={giftType}
                onChange={e => setGiftType(e.target.value as GiftType)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                <option value="Amplop Tunai">Amplop Tunai</option>
                <option value="Transfer Bank / QRIS">Transfer Bank / QRIS</option>
                <option value="Kado Fisik">Kado Fisik / Barang</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                No. Amplop / Kode Referensi
              </label>
              <input
                type="text"
                placeholder="ENV-001"
                value={envelopeNumber}
                onChange={e => setEnvelopeNumber(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Nama Pemberi / Keluarga
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Prof. Dr. Ir. H. Bambang Soemantri"
              value={giverName}
              onChange={e => setGiverName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kontak WhatsApp Pemberi (Opsional)
              </label>
              <input
                type="text"
                placeholder="08123456789"
                value={giverPhone}
                onChange={e => setGiverPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Pihak Penerima Hadiah
              </label>
              <select
                value={recipientSide}
                onChange={e => setRecipientSide(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                <option value="Bersama">Bersama (Pengantin)</option>
                <option value="Pria">Mempelai Pria</option>
                <option value="Wanita">Mempelai Wanita</option>
                <option value="Keluarga Pria">Orang Tua Pria</option>
                <option value="Keluarga Wanita">Orang Tua Wanita</option>
              </select>
            </div>
          </div>

          {giftType !== 'Kado Fisik' ? (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nominal Amplop / Transfer (Rp)
              </label>
              <input
                type="number"
                required
                placeholder="1000000"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-stone-800"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Deskripsi Barang Kado Fisik
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Air Fryer Philips Digital & Coffee Machine"
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan Khusus / Ucapan (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Catatan penyerahan atau titipan dari keluarga..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
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
              <span>Simpan Catatan Hadiah</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
