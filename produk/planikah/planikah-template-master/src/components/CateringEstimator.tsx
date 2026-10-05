import React, { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  PieChart, 
  Layers,
  Sparkles
} from 'lucide-react';
import { CateringMenuItem, CateringItemType } from '../types/wedding';

interface CateringEstimatorProps {
  menus: CateringMenuItem[];
  onAddRefill: (menuId: string, amount: number) => void;
  onUpdateConsumed: (menuId: string, consumed: number) => void;
  onAddMenuItem: (newItem: Partial<CateringMenuItem>) => void;
}

export const CateringEstimator: React.FC<CateringEstimatorProps> = ({
  menus,
  onAddRefill,
  onUpdateConsumed,
  onAddMenuItem
}) => {
  // Formula Calculator State
  const [guestInvitations, setGuestInvitations] = useState('500');
  const [safetyFactor, setSafetyFactor] = useState('1.1');
  const [buffetRatio, setBuffetRatio] = useState('60'); // 60%
  const [stallRatio, setStallRatio] = useState('40'); // 40%
  const [stallVarieties, setStallVarieties] = useState('5'); // 5 ragam stall

  // New Menu Form State
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<CateringItemType>('Food Stall / Gubukan');
  const [newPortion, setNewPortion] = useState('300');
  const [newNotes, setNewNotes] = useState('');

  // Calculations
  const invitationsNum = parseInt(guestInvitations) || 0;
  const factorNum = parseFloat(safetyFactor) || 1.1;
  const totalStandardPortions = Math.round(invitationsNum * 2 * factorNum);

  const buffetPercent = parseFloat(buffetRatio) || 60;
  const stallPercent = parseFloat(stallRatio) || 40;
  const varietiesNum = parseInt(stallVarieties) || 5;

  const calculatedBuffetPortions = Math.round(totalStandardPortions * (buffetPercent / 100));
  const calculatedTotalStallPortions = Math.round(totalStandardPortions * (stallPercent / 100) * varietiesNum);
  const calculatedPerStallPortions = Math.round(calculatedTotalStallPortions / (varietiesNum || 1));

  // Overall Live Stats
  const totalPrepared = menus.reduce((acc, m) => acc + m.portion_prepared, 0);
  const totalConsumed = menus.reduce((acc, m) => acc + m.portion_consumed, 0);
  const depletionPercentage = totalPrepared > 0 ? Math.round((totalConsumed / totalPrepared) * 100) : 0;

  const handleCreateMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const portion = parseInt(newPortion) || 300;

    onAddMenuItem({
      name: newName,
      type: newType,
      portion_prepared: portion,
      portion_consumed: 0,
      refill_count: 0,
      status: 'Aman',
      notes: newNotes || undefined
    });

    setNewName('');
    setNewNotes('');
    setShowAddMenu(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Manajemen Konsumsi & Rasio Porsi
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500"></span>
              <span className="text-xs text-stone-700 font-medium">Standardisasi Formula Nusantara</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Kalkulator Catering & Live Monitoring Porsi
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Kalkulasi rasio Buffet vs Gubukan dan pantauan sisa porsi makanan secara realtime saat acara
            </p>
          </div>

          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pos Menu</span>
          </button>
        </div>

        {/* 4 Live Monitoring Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Total Porsi Tersedia</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {totalPrepared} Porsi
            </div>
            <div className="text-[11px] text-stone-400">
              Prasmanan & Food Stall
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Porsi Telah Disajikan</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {totalConsumed} Porsi
            </div>
            <div className="text-[11px] text-stone-500">
              Tingkat konsumsi: <strong>{depletionPercentage}%</strong>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Sisa Cadangan Aman</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-800 mt-0.5">
              {Math.max(0, totalPrepared - totalConsumed)} Porsi
            </div>
            <div className="text-[11px] text-stone-400">
              Stok siap dikeluarkan
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Status Dapur & Refill</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {menus.filter(m => m.status === 'Menipis').length > 0 ? (
                <span className="text-amber-700 flex items-center space-x-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Perlu Refill</span>
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kondisi Aman</span>
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-400">
              {menus.length} item menu termonitor
            </div>
          </div>
        </div>
      </div>

      {/* Form Tambah Menu Baru */}
      {showAddMenu && (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/90 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Tambah Item Menu Catering
            </h3>
            <button
              onClick={() => setShowAddMenu(false)}
              className="text-xs text-stone-500 hover:text-stone-900"
            >
              Tutup
            </button>
          </div>

          <form onSubmit={handleCreateMenu} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Nama Menu</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kambing Guling Saus Kecap"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Tipe Menu</label>
              <select
                value={newType}
                onChange={e => setNewType(e.target.value as CateringItemType)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              >
                <option value="Prasmanan / Buffet">Prasmanan / Buffet</option>
                <option value="Food Stall / Gubukan">Food Stall / Gubukan</option>
                <option value="Dessert & Minuman">Dessert & Minuman</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Porsi Awal</label>
              <input
                type="number"
                required
                value={newPortion}
                onChange={e => setNewPortion(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div className="sm:col-span-4 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium transition-colors"
              >
                Simpan Item Menu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Two Column Layout: Formula Calculator vs Live Menus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Formula Calculator (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-stone-100">
              <Calculator className="w-5 h-5 text-stone-700" />
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Formula Rasio Ideal Catering
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-stone-700">
                    Jumlah Undangan: <span className="font-bold text-stone-900 font-serif text-sm">{guestInvitations} Pasang</span>
                  </label>
                  <span className="text-[11px] text-amber-800 font-medium">Estimasi {invitationsNum * 2} Tamu</span>
                </div>
                
                {/* Quick Presets */}
                <div className="flex gap-1.5 mb-2.5">
                  {['300', '500', '750', '1000'].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestInvitations(num)}
                      className={`flex-1 py-1 text-[11px] font-medium rounded-lg border transition-all ${
                        guestInvitations === num 
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs' 
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={guestInvitations}
                  onChange={e => setGuestInvitations(e.target.value)}
                  className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-stone-700">
                    Rasio Porsi: <span className="font-bold text-stone-900">Buffet {buffetRatio}% : Gubukan {stallRatio}%</span>
                  </label>
                </div>
                <div className="flex gap-1.5 mb-2">
                  {[
                    { label: 'Standar (60:40)', b: '60', s: '40' },
                    { label: 'Buffet Berat (70:30)', b: '70', s: '30' },
                    { label: 'Seimbang (50:50)', b: '50', s: '50' }
                  ].map(ratio => (
                    <button
                      key={ratio.label}
                      type="button"
                      onClick={() => { setBuffetRatio(ratio.b); setStallRatio(ratio.s); }}
                      className={`flex-1 py-1 text-[10px] font-medium rounded-lg border transition-all ${
                        buffetRatio === ratio.b 
                          ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold' 
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    Faktor Cadangan
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={safetyFactor}
                    onChange={e => setSafetyFactor(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  />
                  <span className="text-[10px] text-stone-400">Standar 1.1 (+10% buffer)</span>
                </div>

                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    Jumlah Ragam Stall
                  </label>
                  <input
                    type="number"
                    value={stallVarieties}
                    onChange={e => setStallVarieties(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                  />
                  <span className="text-[10px] text-stone-400">Contoh: 4-5 menu gubukan</span>
                </div>
              </div>
            </div>

            {/* Recommended Output Result Box */}
            <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 space-y-3">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-300">
                Rekomendasi Pesanan Porsi
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between pb-1 border-b border-stone-800">
                  <span className="text-stone-300">Total Kebutuhan Porsi:</span>
                  <strong className="font-serif text-sm text-white">{totalStandardPortions} Porsi</strong>
                </div>

                <div className="flex justify-between pb-1 border-b border-stone-800">
                  <span className="text-stone-300">Prasmanan / Buffet (60%):</span>
                  <strong className="font-serif text-sm text-amber-200">{calculatedBuffetPortions} Porsi</strong>
                </div>

                <div className="flex justify-between pb-1 border-b border-stone-800">
                  <span className="text-stone-300">Total Food Stall (40% x {varietiesNum} menu):</span>
                  <strong className="font-serif text-sm text-amber-200">{calculatedTotalStallPortions} Porsi</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-300">Rata-rata per Menu Gubukan:</span>
                  <strong className="font-serif text-sm text-white">{calculatedPerStallPortions} Porsi / Menu</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Col: Live Depletion & Refill Monitoring (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Live Status & Refill Porsi Makanan
              </h3>
              <p className="text-xs text-stone-500">
                Pantau tingkat konsumsi dan lakukan refill porsi cadangan jika status menipis
              </p>
            </div>

            <div className="space-y-4">
              {menus.map(item => {
                const percentage = item.portion_prepared > 0 
                  ? Math.round((item.portion_consumed / item.portion_prepared) * 100) 
                  : 0;

                const statusColor = 
                  item.status === 'Habis' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                  item.status === 'Menipis' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                  'bg-emerald-100 text-emerald-800 border-emerald-200';

                return (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 bg-stone-50/50 space-y-3 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-stone-200 text-stone-700">
                            {item.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusColor}`}>
                            {item.status}
                          </span>
                          {item.refill_count > 0 && (
                            <span className="text-[10px] text-stone-500">
                              Refill: {item.refill_count}x
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-stone-900 mt-1">
                          {item.name}
                        </h4>
                      </div>

                      <div className="text-right">
                        <div className="font-serif font-bold text-sm text-stone-900">
                          {item.portion_consumed} / {item.portion_prepared} Porsi
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Tersisa {Math.max(0, item.portion_prepared - item.portion_consumed)} porsi
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          percentage > 85 ? 'bg-rose-600' : percentage > 60 ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min(100, percentage)}%` }}
                      />
                    </div>

                    {/* Quick Refill & Logging Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60 text-xs">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateConsumed(item.id, Math.min(item.portion_prepared, item.portion_consumed + 25))}
                          className="px-2.5 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-medium transition-colors"
                        >
                          +25 Konsumsi
                        </button>
                        <button
                          onClick={() => onUpdateConsumed(item.id, Math.min(item.portion_prepared, item.portion_consumed + 50))}
                          className="px-2.5 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-medium transition-colors"
                        >
                          +50 Konsumsi
                        </button>
                      </div>

                      <button
                        onClick={() => onAddRefill(item.id, 50)}
                        className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-medium transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Refill +50 Porsi</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
