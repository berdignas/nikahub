import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  CreditCard, 
  Building, 
  Users, 
  Send, 
  Calendar, 
  Calculator, 
  QrCode, 
  Utensils, 
  Gift, 
  Sparkles,
  Sliders,
  Check
} from 'lucide-react';
import { 
  WeddingProfile, 
  WeddingTask, 
  WeddingExpense, 
  BudgetSummary, 
  PaymentTermin,
  WeddingGuest,
  WeddingRundownItem
} from '../types/wedding';
import { triggerCelebration } from '../utils/confetti';

interface DashboardOverviewProps {
  profile: WeddingProfile;
  tasks: WeddingTask[];
  expenses: WeddingExpense[];
  guests: WeddingGuest[];
  rundowns: WeddingRundownItem[];
  summary: BudgetSummary;
  onNavigateTab: (tab: any) => void;
  onToggleTask: (taskId: string) => void;
  onOpenTerminModal: (expense: WeddingExpense) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  tasks,
  expenses,
  guests,
  rundowns,
  summary,
  onNavigateTab,
  onToggleTask,
  onOpenTerminModal
}) => {
  // Interactive Live Guest Simulation Slider
  const [simulatedGuests, setSimulatedGuests] = useState(500);

  // Format currency IDR
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Payer Split Stats
  const payerStats = React.useMemo(() => {
    let groomTotal = 0;
    let brideTotal = 0;
    let jointTotal = 0;

    expenses.forEach(exp => {
      const cost = exp.actual_cost || exp.estimated_cost;
      if (exp.payer === 'Pria' || exp.payer === 'Keluarga Pria') {
        groomTotal += cost;
      } else if (exp.payer === 'Wanita' || exp.payer === 'Keluarga Wanita') {
        brideTotal += cost;
      } else {
        jointTotal += cost;
      }
    });

    return { groomTotal, brideTotal, jointTotal };
  }, [expenses]);

  // Simulation calculations
  const simTotalPortions = Math.round(simulatedGuests * 2 * 1.1);
  const simBuffetPortions = Math.round(simTotalPortions * 0.6);
  const simStallPortions = Math.round(simTotalPortions * 0.4 * 5);
  const estimatedCateringCost = Math.round(simBuffetPortions * 85000 + simStallPortions * 22000);

  // Pending high priority tasks
  const pendingUrgentTasks = React.useMemo(() => {
    return tasks
      .filter(t => !t.is_completed && t.priority === 'Tinggi')
      .slice(0, 3);
  }, [tasks]);

  // Upcoming unpaid termins
  const upcomingTermins = React.useMemo(() => {
    const list: { termin: PaymentTermin; expense: WeddingExpense }[] = [];
    expenses.forEach(exp => {
      exp.termins.forEach(t => {
        if (!t.is_paid) {
          list.push({ termin: t, expense: exp });
        }
      });
    });
    return list.sort((a, b) => new Date(a.termin.due_date).getTime() - new Date(b.termin.due_date).getTime()).slice(0, 3);
  }, [expenses]);

  const confirmedPax = guests.filter(g => g.rsvp_status === 'Hadir').reduce((acc, g) => acc + (g.pax_confirmed || g.pax_allotted), 0);
  const totalAllottedPax = guests.reduce((acc, g) => acc + g.pax_allotted, 0);

  const handleTaskComplete = (taskId: string) => {
    onToggleTask(taskId);
    triggerCelebration();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4 Interactive Financial & Event Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Plafon Anggaran */}
        <div 
          onClick={() => onNavigateTab('budget')}
          className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
              Plafon Anggaran
            </span>
            <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-all">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {formatRupiah(profile.target_budget)}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Realisasi: <strong>{formatRupiah(summary.totalActual)}</strong>
            </div>
          </div>
        </div>

        {/* Card 2: Terbayar vs Sisa */}
        <div 
          onClick={() => onNavigateTab('budget')}
          className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
              Terbayar vs Sisa
            </span>
            <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-all">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {formatRupiah(summary.totalPaid)}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Sisa Kewajiban: <strong className="text-amber-800">{formatRupiah(summary.remainingObligation)}</strong>
            </div>
          </div>
        </div>

        {/* Card 3: Tamu & RSVP */}
        <div 
          onClick={() => onNavigateTab('guests')}
          className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
              Konfirmasi RSVP Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-all">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {confirmedPax} / {totalAllottedPax} Pax
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {guests.length} Undangan Terdaftar
            </div>
          </div>
        </div>

        {/* Card 4: Rundown Hari-H */}
        <div 
          onClick={() => onNavigateTab('rundown')}
          className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3 hover:border-stone-400 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 group-hover:text-stone-900 transition-colors">
              Rundown Hari-H
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-all">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {rundowns.length} Rangkaian Sesi
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Mulai {rundowns[0]?.start_time || '05:30'} WIB
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Simulation & Quick Action Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Interactive Simulator & Priority Tasks (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Interactive Calculator Slider Playground */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-stone-100 rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
                  Interactive Simulator
                </span>
                <h3 className="font-serif text-xl font-medium text-white mt-0.5">
                  Simulasi Cepat Porsi & Anggaran Catering
                </h3>
              </div>
              <span className="text-xs text-stone-400 bg-stone-800 px-3 py-1 rounded-full self-start sm:self-auto font-mono">
                {simulatedGuests} Undangan ({simulatedGuests * 2} Tamu)
              </span>
            </div>

            {/* Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-400">
                <span>200 Undangan</span>
                <span className="font-semibold text-amber-300 font-mono text-sm">{simulatedGuests} Undangan</span>
                <span>1.500 Undangan</span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={simulatedGuests}
                onChange={e => setSimulatedGuests(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-800 rounded-lg appearance-none"
              />
            </div>

            {/* Instant Calculated Outputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Total Kebutuhan Porsi</span>
                <div className="font-serif text-base font-bold text-white">{simTotalPortions} Porsi</div>
                <div className="text-[10px] text-stone-400">Termasuk safety factor 1.1</div>
              </div>

              <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Prasmanan vs Stall</span>
                <div className="font-serif text-base font-bold text-amber-200">
                  {simBuffetPortions} / {simStallPortions}
                </div>
                <div className="text-[10px] text-stone-400">Rasio 60% Buffet : 40% Stall</div>
              </div>

              <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Estimasi Biaya Katering</span>
                <div className="font-serif text-base font-bold text-emerald-300">
                  {formatRupiah(estimatedCateringCost)}
                </div>
                <div className="text-[10px] text-stone-400">Estimasi vendor standar</div>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => onNavigateTab('catering')}
                className="text-xs text-amber-300 hover:text-amber-200 font-medium flex items-center space-x-1"
              >
                <span>Buka Detail Menu Katering</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section: Priority Tasks with 1-Tap Confetti */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Tugas Prioritas Mendesak
                </h3>
                <p className="text-xs text-stone-500">
                  Selesaikan langkah ini untuk menaikkan kesiapan acara
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('checklist')}
                className="text-xs font-medium text-stone-700 hover:text-stone-950 flex items-center space-x-1"
              >
                <span>Semua Tugas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingUrgentTasks.length === 0 ? (
              <div className="py-6 text-center text-xs text-stone-500">
                Semua tugas prioritas tinggi telah selesai dikerjakan.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingUrgentTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => handleTaskComplete(task.id)}
                        className="mt-0.5 w-5 h-5 rounded-lg border border-stone-400 hover:border-stone-900 bg-white flex items-center justify-center transition-colors shrink-0"
                        title="Tandai Selesai"
                      >
                        {task.is_completed && <Check className="w-3.5 h-3.5 text-stone-900" />}
                      </button>

                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
                          {task.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                          <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-medium">
                            {task.category}
                          </span>
                          <span>Tenggat: {task.due_date}</span>
                          <span>PIC: {task.assigned_to}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTaskComplete(task.id)}
                      className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors shrink-0"
                    >
                      Selesai
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Expense Split & Quick Action Launchers (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Visual Payer Expense Split */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Pembagian Beban Anggaran
              </h3>
              <p className="text-xs text-stone-500">
                Proporsi alokasi tanggungan pihak mempelai
              </p>
            </div>

            {/* Split Visual Bar */}
            <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden flex">
              <div 
                className="bg-stone-900 h-full transition-all"
                style={{ width: `${summary.totalActual > 0 ? Math.round((payerStats.groomTotal / summary.totalActual) * 100) : 33}%` }}
                title="Pihak Pria"
              />
              <div 
                className="bg-amber-600 h-full transition-all"
                style={{ width: `${summary.totalActual > 0 ? Math.round((payerStats.brideTotal / summary.totalActual) * 100) : 33}%` }}
                title="Pihak Wanita"
              />
              <div 
                className="bg-stone-400 h-full transition-all"
                style={{ width: `${summary.totalActual > 0 ? Math.round((payerStats.jointTotal / summary.totalActual) * 100) : 34}%` }}
                title="Bersama"
              />
            </div>

            {/* Legend & Numbers */}
            <div className="grid grid-cols-3 gap-2 text-xs text-stone-600 pt-1">
              <div>
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-900"></span>
                  <span>Pria</span>
                </div>
                <div className="font-serif font-bold text-stone-900 mt-1">{formatRupiah(payerStats.groomTotal)}</div>
              </div>

              <div>
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  <span>Wanita</span>
                </div>
                <div className="font-serif font-bold text-stone-900 mt-1">{formatRupiah(payerStats.brideTotal)}</div>
              </div>

              <div>
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span>
                  <span>Bersama</span>
                </div>
                <div className="font-serif font-bold text-stone-900 mt-1">{formatRupiah(payerStats.jointTotal)}</div>
              </div>
            </div>
          </div>

          {/* Quick Hub Grid Cards */}
          <div className="grid grid-cols-2 gap-3">
            
            <div 
              onClick={() => onNavigateTab('reception')}
              className="p-4 bg-white border border-stone-200/90 hover:border-stone-400 rounded-2xl cursor-pointer transition-all shadow-sm group space-y-2"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-colors">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">Gate Scanner</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">Scan barcode tamu & souvenir</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('gifts')}
              className="p-4 bg-white border border-stone-200/90 hover:border-stone-400 rounded-2xl cursor-pointer transition-all shadow-sm group space-y-2"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-colors">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">Buku Angpao</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">Rekapitulasi amplop & QRIS</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('catering')}
              className="p-4 bg-white border border-stone-200/90 hover:border-stone-400 rounded-2xl cursor-pointer transition-all shadow-sm group space-y-2"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-colors">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">Monitor Katering</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">Pantau sisa porsi & refill</p>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('evaluation')}
              className="p-4 bg-white border border-stone-200/90 hover:border-stone-400 rounded-2xl cursor-pointer transition-all shadow-sm group space-y-2"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center text-stone-700 transition-colors">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-stone-900 text-sm">Thank You Blast</h4>
                <p className="text-[10px] text-stone-500 mt-0.5">Pesan H+1 ke tamu hadir</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
