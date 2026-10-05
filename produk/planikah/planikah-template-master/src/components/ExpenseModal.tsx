import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Building, Wallet, Phone, Tag } from 'lucide-react';
import { WeddingExpense, TaskCategory, PaymentStatus, PayerSource } from '../types/wedding';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expenseData: Partial<WeddingExpense>) => void;
  initialData?: WeddingExpense | null;
}

const CATEGORIES: TaskCategory[] = [
  'Legal & KUA',
  'Venue & Dekorasi',
  'Catering',
  'Busana & MUA',
  'Dokumentasi',
  'Adat & Prosesi',
  'Undangan & Tamu',
  'Hiburan & Sound',
  'Logistik & Panitia'
];

const PAYERS: PayerSource[] = ['Bersama', 'Pria', 'Wanita', 'Keluarga Pria', 'Keluarga Wanita'];

const STATUSES: PaymentStatus[] = ['Belum Bayar', 'DP / Cicilan', 'Lunas'];

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<TaskCategory>('Venue & Dekorasi');
  const [itemName, setItemName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorContact, setVendorContact] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [payer, setPayer] = useState<PayerSource>('Bersama');
  const [status, setStatus] = useState<PaymentStatus>('Belum Bayar');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setItemName(initialData.item_name);
      setVendorName(initialData.vendor_name);
      setVendorContact(initialData.vendor_contact || '');
      setEstimatedCost(initialData.estimated_cost.toString());
      setActualCost(initialData.actual_cost ? initialData.actual_cost.toString() : initialData.estimated_cost.toString());
      setPayer(initialData.payer);
      setStatus(initialData.status);
      setNotes(initialData.notes || '');
    } else {
      setCategory('Venue & Dekorasi');
      setItemName('');
      setVendorName('');
      setVendorContact('');
      setEstimatedCost('');
      setActualCost('');
      setPayer('Bersama');
      setStatus('Belum Bayar');
      setNotes('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !vendorName || !estimatedCost) return;

    const estNum = parseFloat(estimatedCost);
    const actNum = actualCost ? parseFloat(actualCost) : estNum;

    onSave({
      category,
      item_name: itemName,
      vendor_name: vendorName,
      vendor_contact: vendorContact || undefined,
      estimated_cost: isNaN(estNum) ? 0 : estNum,
      actual_cost: isNaN(actNum) ? estNum : actNum,
      payer,
      status,
      notes: notes || undefined,
      termins: initialData?.termins || []
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
              {initialData ? 'Sunting Pos Biaya' : 'Tambah Pos Pengeluaran Baru'}
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              {initialData ? initialData.item_name : 'Form Rincian Anggaran Vendor'}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kategori Pos
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Penanggung Biaya
              </label>
              <select
                value={payer}
                onChange={e => setPayer(e.target.value as PayerSource)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              >
                {PAYERS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Nama Item / Layanan
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Sewa Ballroom Utama & AC Sentral"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nama Vendor / Rekanan
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Puri Indah Convention"
                value={vendorName}
                onChange={e => setVendorName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Kontak PIC Vendor (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: 08123456789"
                value={vendorContact}
                onChange={e => setVendorContact(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Estimasi Biaya Awal (Rp)
              </label>
              <input
                type="number"
                required
                placeholder="45000000"
                value={estimatedCost}
                onChange={e => setEstimatedCost(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Realisasi Biaya Aktual (Rp)
              </label>
              <input
                type="number"
                placeholder="45000000"
                value={actualCost}
                onChange={e => setActualCost(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Status Pembayaran
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as PaymentStatus)}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
            >
              {STATUSES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Catatan / Lingkup Kerja Kontrak (Opsional)
            </label>
            <textarea
              rows={3}
              placeholder="Catatan fasilitas tambahan, batas jam loading, atau PIC pendamping..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
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
              <span>Simpan Pos Anggaran</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
