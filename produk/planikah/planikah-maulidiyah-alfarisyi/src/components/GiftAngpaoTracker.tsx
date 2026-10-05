import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  Plus, 
  Search, 
  CreditCard, 
  Gift, 
  TrendingUp, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Trash2, 
  Edit3, 
  Sparkles 
} from 'lucide-react';
import { WeddingGift, GiftType, BudgetSummary } from '../types/wedding';
import { fireConfetti } from '../utils/confetti';

interface GiftAngpaoTrackerProps {
  gifts: WeddingGift[];
  summary: BudgetSummary;
  onAddGift: () => void;
  onEditGift: (gift: WeddingGift) => void;
  onDeleteGift: (giftId: string) => void;
  onToggleThankYou: (giftId: string) => void;
}

export const GiftAngpaoTracker: React.FC<GiftAngpaoTrackerProps> = ({
  gifts,
  summary,
  onAddGift,
  onEditGift,
  onDeleteGift,
  onToggleThankYou
}) => {
  const [selectedType, setSelectedType] = useState<GiftType | 'Semua'>('Semua');
  const [selectedSide, setSelectedSide] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleThankYouClick = (giftId: string, currentSent: boolean) => {
    onToggleThankYou(giftId);
    if (!currentSent) {
      fireConfetti();
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Gift Metrics
  const metrics = useMemo(() => {
    let totalCash = 0;
    let totalDigital = 0;
    let totalPhysicalCount = 0;

    gifts.forEach(g => {
      if (g.gift_type === 'Amplop Tunai') {
        totalCash += g.amount;
      } else if (g.gift_type === 'Transfer Bank / QRIS') {
        totalDigital += g.amount;
      } else if (g.gift_type === 'Kado Fisik') {
        totalPhysicalCount += 1;
      }
    });

    const totalIncome = totalCash + totalDigital;
    const netBalance = totalIncome - summary.totalActual;

    return {
      totalCash,
      totalDigital,
      totalPhysicalCount,
      totalIncome,
      netBalance
    };
  }, [gifts, summary.totalActual]);

  const filteredGifts = gifts.filter(g => {
    const matchesType = selectedType === 'Semua' || g.gift_type === selectedType;
    const matchesSide = selectedSide === 'Semua' || g.recipient_side === selectedSide;
    const matchesSearch = 
      g.giver_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.envelope_number && g.envelope_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.item_description && g.item_description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesSide && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Gift Financial Overview */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Audit Pasca Acara & Financial Ledger
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500"></span>
              <span className="text-xs text-stone-700 font-medium">Buku Angpao & Hadiah</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Pencatatan Amplop & Hadiah Pernikahan
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Rekapitulasi amplop tunai, transfer digital QRIS, dan kado fisik secara terinci dan transparan
            </p>
          </div>

          <button
            onClick={onAddGift}
            className="flex items-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Amplop / Kado</span>
          </button>
        </div>

        {/* 4 Financial KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Total Pemasukan Hadiah</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(metrics.totalIncome)}
            </div>
            <div className="text-[11px] text-stone-400">
              Dari {gifts.length} catatan hadiah
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Amplop Tunai (Fisik)</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(metrics.totalCash)}
            </div>
            <div className="text-[11px] text-stone-500">
              Kotak amplop meja penerima
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Digital (Transfer / QRIS)</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {formatRupiah(metrics.totalDigital)}
            </div>
            <div className="text-[11px] text-stone-500">
              Cashless via Virtual Account
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Kado Fisik / Barang</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {metrics.totalPhysicalCount} Paket
            </div>
            <div className="text-[11px] text-stone-500">
              Barang / Perlengkapan rumah
            </div>
          </div>
        </div>

        {/* Net Balance Banner */}
        <div className="mt-5 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-stone-800">Rekapitulasi Arus Kas Bersih (Net Position):</span>
            <div className="text-stone-500 text-[11px] mt-0.5">
              Total Pemasukan Angpao ({formatRupiah(metrics.totalIncome)}) &minus; Total Realisasi Biaya Pernikahan ({formatRupiah(summary.totalActual)})
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-stone-400">Selisih Finansial</span>
            <div className={`font-serif font-bold text-base ${
              metrics.netBalance >= 0 ? 'text-emerald-700' : 'text-stone-900'
            }`}>
              {formatRupiah(metrics.netBalance)}
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
            placeholder="Cari nama pemberi, no. amplop, atau nama barang..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800"
          />
        </div>

        {/* Type Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
          >
            <option value="Semua">Semua Tipe Hadiah</option>
            <option value="Amplop Tunai">Amplop Tunai</option>
            <option value="Transfer Bank / QRIS">Transfer / QRIS</option>
            <option value="Kado Fisik">Kado Fisik</option>
          </select>
        </div>

        {/* Recipient Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedSide}
            onChange={e => setSelectedSide(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
          >
            <option value="Semua">Semua Penerima</option>
            <option value="Bersama">Bersama</option>
            <option value="Pria">Mempelai Pria</option>
            <option value="Wanita">Mempelai Wanita</option>
            <option value="Keluarga Pria">Orang Tua Pria</option>
            <option value="Keluarga Wanita">Orang Tua Wanita</option>
          </select>
        </div>
      </div>

      {/* Gifts Table */}
      <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm">
        {filteredGifts.length === 0 ? (
          <div className="p-12 text-center text-xs sm:text-sm text-stone-500">
            Tidak ada data amplop atau hadiah yang sesuai dengan pencarian atau filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-semibold">No. / Referensi</th>
                  <th className="py-3 px-4 font-semibold">Nama Pemberi</th>
                  <th className="py-3 px-3 font-semibold">Tipe Hadiah</th>
                  <th className="py-3 px-3 font-semibold">Penerima</th>
                  <th className="py-3 px-4 font-semibold text-right">Nominal / Deskripsi</th>
                  <th className="py-3 px-3 font-semibold text-center">Ucapan Terima Kasih</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredGifts.map(gift => {
                  return (
                    <tr key={gift.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                        {gift.envelope_number || '-'}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{gift.giver_name}</div>
                        {gift.giver_phone && (
                          <div className="text-[10px] text-stone-500">{gift.giver_phone}</div>
                        )}
                        {gift.notes && (
                          <div className="text-[10px] text-stone-500 italic mt-0.5">{gift.notes}</div>
                        )}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium text-[11px]">
                          {gift.gift_type}
                        </span>
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap text-stone-600">
                        {gift.recipient_side}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        {gift.gift_type === 'Kado Fisik' ? (
                          <span className="font-medium text-stone-800 text-[11px]">
                            {gift.item_description}
                          </span>
                        ) : (
                          <span className="font-serif font-bold text-stone-900 text-sm">
                            {formatRupiah(gift.amount)}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleThankYouClick(gift.id, gift.thank_you_sent)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                            gift.thank_you_sent
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                          }`}
                        >
                          {gift.thank_you_sent ? 'Terkirim' : 'Belum Kirim'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => onEditGift(gift)}
                            title="Sunting Catatan"
                            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteGift(gift.id)}
                            title="Hapus Catatan"
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
