import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Layers, 
  Edit3, 
  Trash2, 
  Phone, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { WeddingExpense, TaskCategory, PaymentStatus, BudgetSummary, PayerSource } from '../types/wedding';

interface BudgetTrackerProps {
  expenses: WeddingExpense[];
  summary: BudgetSummary;
  onAddExpense: () => void;
  onEditExpense: (expense: WeddingExpense) => void;
  onDeleteExpense: (expenseId: string) => void;
  onOpenTerminModal: (expense: WeddingExpense) => void;
}

const CATEGORIES: (TaskCategory | 'Semua')[] = [
  'Semua',
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

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({
  expenses,
  summary,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  onOpenTerminModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'Semua'>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Format currency IDR
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesCategory = selectedCategory === 'Semua' || exp.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Semua' || exp.status === selectedStatus;
    const matchesSearch = exp.item_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.vendor_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Financial Header & KPI Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              Manajemen Anggaran & Termin Pembayaran
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Kelola estimasi, realisasi biaya aktual, dan cicilan bertahap ke setiap vendor
            </p>
          </div>

          <button
            onClick={onAddExpense}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pos Anggaran</span>
          </button>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Total Realisasi</div>
            <div className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(summary.totalActual)}
            </div>
            <div className="text-[11px] text-stone-400">
              Estimasi awal: {formatRupiah(summary.totalEstimated)}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Sudah Terbayar (DP)</div>
            <div className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(summary.totalPaid)}
            </div>
            <div className="text-[11px] text-stone-500">
              {summary.paidPercentage}% terbayar
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Sisa Kewajiban</div>
            <div className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(summary.remainingObligation)}
            </div>
            <div className="text-[11px] text-stone-400">
              Wajib lunas menjelang Hari-H
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Status Pagu Anggaran</div>
            <div className="text-sm sm:text-base font-semibold mt-1">
              {summary.overBudgetAmount > 0 ? (
                <span className="text-rose-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Lebih {formatRupiah(summary.overBudgetAmount)}</span>
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dalam Batas Aman</span>
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-400">
              Batas Target: {formatRupiah(summary.totalTarget)}
            </div>
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari item pengeluaran atau nama vendor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800"
          />
        </div>

        {/* Category */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value as any)}
            className="w-full sm:w-auto px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                Kategori: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="w-full sm:w-auto px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-stone-800"
          >
            <option value="Semua">Semua Status Bayar</option>
            <option value="Belum Bayar">Belum Bayar</option>
            <option value="DP / Cicilan">DP / Cicilan</option>
            <option value="Lunas">Lunas</option>
          </select>
        </div>
      </div>

      {/* Expenses Cards / Table */}
      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-xs sm:text-sm text-stone-500">
            Tidak ada data pos anggaran yang sesuai dengan pencarian atau filter.
          </div>
        ) : (
          filteredExpenses.map(exp => {
            const paidSum = exp.termins.filter(t => t.is_paid).reduce((acc, t) => acc + t.amount, 0);
            const totalCost = exp.actual_cost || exp.estimated_cost;
            const remainingSum = Math.max(0, totalCost - paidSum);
            const paidTerminsCount = exp.termins.filter(t => t.is_paid).length;
            const totalTerminsCount = exp.termins.length;

            const statusBadgeColor = 
              exp.status === 'Lunas' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
              exp.status === 'DP / Cicilan' ? 'bg-amber-50 text-amber-800 border-amber-200' :
              'bg-stone-100 text-stone-700 border-stone-200';

            return (
              <div 
                key={exp.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 hover:border-stone-300 transition-all shadow-sm space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-medium">
                        {exp.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md border text-xs font-medium ${statusBadgeColor}`}>
                        {exp.status}
                      </span>
                      <span className="text-xs text-stone-500">
                        Penanggung: <strong className="text-stone-700">{exp.payer}</strong>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug">
                      {exp.item_name}
                    </h3>

                    <div className="flex items-center space-x-3 text-xs text-stone-600">
                      <span>Vendor: <strong>{exp.vendor_name}</strong></span>
                      {exp.vendor_contact && (
                        <span className="flex items-center space-x-1 text-stone-500">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span>{exp.vendor_contact}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Financial Values Display */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] text-stone-400">Total Biaya</div>
                      <div className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                        {formatRupiah(totalCost)}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-stone-500">Terbayar: </span>
                      <span className="font-semibold text-stone-800">{formatRupiah(paidSum)}</span>
                    </div>
                  </div>
                </div>

                {exp.notes && (
                  <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    {exp.notes}
                  </p>
                )}

                {/* Termins Mini-Bar & Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  
                  {/* Termin progress */}
                  <div className="flex items-center space-x-2 text-xs text-stone-600">
                    <CreditCard className="w-4 h-4 text-stone-400" />
                    <span>
                      Termin Pembayaran: <strong>{paidTerminsCount} dari {totalTerminsCount} Lunas</strong>
                    </span>
                    {remainingSum > 0 && (
                      <span className="text-amber-800 font-medium">
                        (Sisa {formatRupiah(remainingSum)})
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenTerminModal(exp)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium transition-colors"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                      <span>Kelola Termin & Bukti</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onEditExpense(exp)}
                      title="Sunting Pos Anggaran"
                      className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteExpense(exp.id)}
                      title="Hapus Pos Anggaran"
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
