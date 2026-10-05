import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { WeddingProfile, WeddingTask, WeddingExpense, BudgetSummary, WeddingGuest, WeddingRundownItem } from '../types/wedding';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: WeddingProfile;
  tasks: WeddingTask[];
  expenses: WeddingExpense[];
  guests: WeddingGuest[];
  rundowns: WeddingRundownItem[];
  summary: BudgetSummary;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  profile,
  tasks,
  expenses,
  guests,
  rundowns,
  summary
}) => {
  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const attendingGuests = guests.filter(g => g.rsvp_status === 'Hadir');
  const totalConfirmedPax = attendingGuests.reduce((acc, g) => acc + (g.pax_confirmed || g.pax_allotted), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden print:max-h-none print:border-none print:shadow-none print:rounded-none">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-stone-900" />
            <span className="font-serif font-medium text-stone-900 text-base">
              Laporan Eksekutif Master Perencanaan & Acara
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 flex-1 text-stone-900 print:p-0 print:overflow-visible">
          
          {/* Document Header */}
          <div className="border-b-2 border-stone-900 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500">
                  Dokumen Master Perencanaan & Acara Pernikahan
                </span>
                <h1 className="font-serif text-3xl font-medium text-stone-950 mt-1">
                  {profile.groom_name} & {profile.bride_name}
                </h1>
                <div className="text-xs text-stone-600 mt-2 space-y-0.5">
                  <div>Hari/Tanggal: <strong>{profile.wedding_date}</strong> (Pukul {profile.wedding_time || '08:00'} WIB)</div>
                  <div>Lokasi: <strong>{profile.venue_name}</strong> &bull; {profile.venue_address}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-serif uppercase tracking-widest text-stone-400">PLANIKAH OS SPRINT 2</span>
                <div className="text-xs text-stone-500 mt-1">Cetak: {new Date().toLocaleDateString('id-ID')}</div>
              </div>
            </div>
          </div>

          {/* Section 1: Financial Summary */}
          <div className="space-y-3">
            <h2 className="font-serif text-base font-semibold text-stone-900 uppercase tracking-wider">
              1. Ringkasan Keuangan & Realisasi Anggaran
            </h2>
            <div className="grid grid-cols-4 gap-4 p-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs">
              <div>
                <div className="text-stone-500 font-medium">Batas Plafon</div>
                <div className="font-serif font-bold text-sm text-stone-900 mt-0.5">{formatRupiah(summary.totalTarget)}</div>
              </div>
              <div>
                <div className="text-stone-500 font-medium">Realisasi Aktual</div>
                <div className="font-serif font-bold text-sm text-stone-900 mt-0.5">{formatRupiah(summary.totalActual)}</div>
              </div>
              <div>
                <div className="text-stone-500 font-medium">Sudah Dibayar</div>
                <div className="font-serif font-bold text-sm text-emerald-800 mt-0.5">{formatRupiah(summary.totalPaid)}</div>
              </div>
              <div>
                <div className="text-stone-500 font-medium">Sisa Kewajiban</div>
                <div className="font-serif font-bold text-sm text-stone-900 mt-0.5">{formatRupiah(summary.remainingObligation)}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Master Rundown Hari-H */}
          <div className="space-y-3">
            <h2 className="font-serif text-base font-semibold text-stone-900 uppercase tracking-wider">
              2. Master Rundown Acara Hari-H
            </h2>
            <table className="w-full text-xs text-left border-collapse border border-stone-200">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-stone-700">
                  <th className="p-2 font-semibold w-24">Waktu (WIB)</th>
                  <th className="p-2 font-semibold">Aktivitas & Rangkaian</th>
                  <th className="p-2 font-semibold">Titik Lokasi</th>
                  <th className="p-2 font-semibold">PIC & Kontak</th>
                  <th className="p-2 font-semibold">Audio & Lighting Cue</th>
                </tr>
              </thead>
              <tbody>
                {rundowns.map(r => (
                  <tr key={r.id} className="border-b border-stone-100">
                    <td className="p-2 font-mono font-bold text-stone-900 whitespace-nowrap">{r.start_time} - {r.end_time}</td>
                    <td className="p-2">
                      <div className="font-semibold text-stone-900">{r.activity_title}</div>
                      <div className="text-[10px] text-stone-500">{r.session}</div>
                    </td>
                    <td className="p-2 text-stone-600">{r.location_spot}</td>
                    <td className="p-2 text-stone-700">{r.pic_name} {r.pic_phone ? `(${r.pic_phone})` : ''}</td>
                    <td className="p-2 text-stone-500 text-[11px]">
                      {r.music_audio_cue && <div>Musik: {r.music_audio_cue}</div>}
                      {r.lighting_cue && <div>Lighting: {r.lighting_cue}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Rekap Tamu Undangan */}
          <div className="space-y-3">
            <h2 className="font-serif text-base font-semibold text-stone-900 uppercase tracking-wider">
              3. Rekapitulasi Daftar Tamu & Konfirmasi RSVP ({totalConfirmedPax} Pax Terkonfirmasi)
            </h2>
            <table className="w-full text-xs text-left border-collapse border border-stone-200">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-stone-700">
                  <th className="p-2 font-semibold">Nama Tamu</th>
                  <th className="p-2 font-semibold">Tier / Klasifikasi</th>
                  <th className="p-2 font-semibold">Pihak</th>
                  <th className="p-2 font-semibold text-center">Pax</th>
                  <th className="p-2 font-semibold">Meja</th>
                  <th className="p-2 font-semibold">Status RSVP</th>
                </tr>
              </thead>
              <tbody>
                {guests.map(g => (
                  <tr key={g.id} className="border-b border-stone-100">
                    <td className="p-2 font-semibold text-stone-900">{g.name}</td>
                    <td className="p-2 text-stone-600">{g.tier}</td>
                    <td className="p-2 text-stone-600">{g.side}</td>
                    <td className="p-2 text-center font-bold">{g.pax_confirmed > 0 ? g.pax_confirmed : g.pax_allotted} Pax</td>
                    <td className="p-2 text-stone-700">{g.table_number || '-'}</td>
                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100">
                        {g.rsvp_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
