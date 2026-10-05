import React, { useState } from 'react';
import { X, Plus, CheckCircle2, Clock, Trash2, CreditCard, Calendar, FileText } from 'lucide-react';
import { WeddingExpense, PaymentTermin } from '../types/wedding';

interface TerminModalProps {
  expense: WeddingExpense | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveTermins: (expenseId: string, updatedTermins: PaymentTermin[]) => void;
}

export const TerminModal: React.FC<TerminModalProps> = ({
  expense,
  isOpen,
  onClose,
  onSaveTermins
}) => {
  if (!isOpen || !expense) return null;

  const [termins, setTermins] = useState<PaymentTermin[]>(expense.termins || []);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMethod, setNewMethod] = useState('Transfer Bank');
  const [newNotes, setNewNotes] = useState('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalCost = expense.actual_cost || expense.estimated_cost;
  const totalPaid = termins.filter(t => t.is_paid).reduce((acc, t) => acc + t.amount, 0);
  const totalAllocated = termins.reduce((acc, t) => acc + t.amount, 0);
  const remainingCost = Math.max(0, totalCost - totalPaid);

  const handleTogglePaid = (terminId: string) => {
    const updated = termins.map(t => {
      if (t.id === terminId) {
        const nextPaid = !t.is_paid;
        return {
          ...t,
          is_paid: nextPaid,
          paid_date: nextPaid ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return t;
    });
    setTermins(updated);
  };

  const handleAddTermin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount || !newDueDate) return;

    const amountNum = parseFloat(newAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newTermin: PaymentTermin = {
      id: `t-new-${Date.now()}`,
      expense_id: expense.id,
      title: newTitle,
      amount: amountNum,
      due_date: newDueDate,
      is_paid: false,
      payment_method: newMethod,
      notes: newNotes || undefined
    };

    setTermins([...termins, newTermin]);
    setNewTitle('');
    setNewAmount('');
    setNewDueDate('');
    setNewNotes('');
  };

  const handleDeleteTermin = (terminId: string) => {
    setTermins(termins.filter(t => t.id !== terminId));
  };

  const handleSaveAll = () => {
    onSaveTermins(expense.id, termins);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>Termin & Bukti Pembayaran</span>
              <span>&bull;</span>
              <span>{expense.vendor_name}</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-1">
              {expense.item_name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial Summary Strip */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-stone-900 text-stone-100 text-xs">
          <div>
            <span className="text-stone-400 text-[10px] uppercase tracking-wider">Total Tagihan</span>
            <div className="font-serif font-bold text-sm sm:text-base text-white mt-0.5">
              {formatRupiah(totalCost)}
            </div>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase tracking-wider">Sudah Terbayar</span>
            <div className="font-serif font-bold text-sm sm:text-base text-amber-300 mt-0.5">
              {formatRupiah(totalPaid)}
            </div>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase tracking-wider">Sisa Pelunasan</span>
            <div className="font-serif font-bold text-sm sm:text-base text-white mt-0.5">
              {formatRupiah(remainingCost)}
            </div>
          </div>
        </div>

        {/* Modal Body: Termins List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-3">
              Daftar Termin Pembayaran
            </h4>

            {termins.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-2xl">
                Belum ada rincian termin untuk pos pengeluaran ini. Tambahkan di bawah.
              </div>
            ) : (
              <div className="space-y-3">
                {termins.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      t.is_paid 
                        ? 'bg-emerald-50/50 border-emerald-200' 
                        : 'bg-stone-50/60 border-stone-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-stone-900">
                          {idx + 1}. {t.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          t.is_paid 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {t.is_paid ? 'Lunas' : 'Belum Bayar'}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 flex flex-wrap items-center gap-3">
                        <span>Jatuh Tempo: <strong>{t.due_date}</strong></span>
                        {t.payment_method && <span>Metode: {t.payment_method}</span>}
                        {t.paid_date && <span>Dibayar pada: {t.paid_date}</span>}
                      </div>

                      {t.notes && (
                        <p className="text-[11px] text-stone-500 italic">
                          Catatan: {t.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200/60">
                      <div className="text-right">
                        <div className="font-serif font-bold text-sm sm:text-base text-stone-900">
                          {formatRupiah(t.amount)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTogglePaid(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                          t.is_paid
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-stone-900 hover:bg-stone-800 text-stone-100'
                        }`}
                      >
                        {t.is_paid ? 'Tandai Belum' : 'Tandai Lunas'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTermin(t.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Hapus Termin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form: Tambah Termin Baru */}
          <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/90 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700">
              Tambah Termin Baru
            </h4>

            <form onSubmit={handleAddTermin} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Nama Termin
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: DP 1 / Termin 2 / Pelunasan"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Nominal Pembayaran (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 15000000"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Tanggal Jatuh Tempo
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    Metode Pembayaran
                  </label>
                  <select
                    value={newMethod}
                    onChange={e => setNewMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  >
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="Tunai / Cash">Tunai / Cash</option>
                    <option value="QRIS / Digital">QRIS / Digital</option>
                    <option value="Kartu Kredit">Kartu Kredit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Catatan Kuitansi / No. Referensi (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kuitansi No. TRF/BCA/092"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-stone-800 hover:bg-stone-900 text-stone-100 rounded-xl text-xs font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambahkan Termin</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50/70 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-xl transition-all shadow-sm"
          >
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
};
