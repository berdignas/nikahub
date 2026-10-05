import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  Send, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  HelpCircle, 
  Phone, 
  Edit3, 
  Trash2, 
  LayoutGrid, 
  Table, 
  MapPin, 
  QrCode,
  Sparkles
} from 'lucide-react';
import { WeddingGuest, GuestTier, GuestSide, RsvpStatus, GuestSummary } from '../types/wedding';

interface GuestManagerProps {
  guests: WeddingGuest[];
  onAddGuest: () => void;
  onEditGuest: (guest: WeddingGuest) => void;
  onDeleteGuest: (guestId: string) => void;
  onOpenWhatsAppModal: (guest: WeddingGuest) => void;
  onToggleCheckIn: (guestId: string) => void;
}

const TIERS: (GuestTier | 'Semua')[] = [
  'Semua',
  'VVIP',
  'VIP',
  'Keluarga Inti Pria',
  'Keluarga Inti Wanita',
  'Sahabat Pria',
  'Sahabat Wanita',
  'Rekan Kerja',
  'Tetangga / Umum'
];

const SIDES: (GuestSide | 'Semua')[] = [
  'Semua',
  'Pihak Pria',
  'Pihak Wanita',
  'Bersama',
  'Orang Tua Pria',
  'Orang Tua Wanita'
];

const RSVP_STATUSES: (RsvpStatus | 'Semua')[] = [
  'Semua',
  'Hadir',
  'Menunggu Konfirmasi',
  'Tidak Hadir',
  'Ragu-ragu'
];

export const GuestManager: React.FC<GuestManagerProps> = ({
  guests,
  onAddGuest,
  onEditGuest,
  onDeleteGuest,
  onOpenWhatsAppModal,
  onToggleCheckIn
}) => {
  const [selectedTier, setSelectedTier] = useState<GuestTier | 'Semua'>('Semua');
  const [selectedSide, setSelectedSide] = useState<GuestSide | 'Semua'>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<RsvpStatus | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Compute Metrics
  const summary: GuestSummary = useMemo(() => {
    let totalAllottedPax = 0;
    let totalConfirmedPax = 0;
    let attendingCount = 0;
    let declinedCount = 0;
    let pendingCount = 0;
    let maybeCount = 0;
    let sentCount = 0;

    guests.forEach(g => {
      totalAllottedPax += g.pax_allotted;
      if (g.invitation_sent) sentCount += 1;

      if (g.rsvp_status === 'Hadir') {
        attendingCount += 1;
        totalConfirmedPax += g.pax_confirmed || g.pax_allotted;
      } else if (g.rsvp_status === 'Tidak Hadir') {
        declinedCount += 1;
      } else if (g.rsvp_status === 'Ragu-ragu') {
        maybeCount += 1;
      } else {
        pendingCount += 1;
      }
    });

    return {
      totalInvitations: guests.length,
      totalAllottedPax,
      totalConfirmedPax,
      attendingCount,
      declinedCount,
      pendingCount,
      maybeCount,
      sentCount
    };
  }, [guests]);

  const filteredGuests = guests.filter(g => {
    const matchesTier = selectedTier === 'Semua' || g.tier === selectedTier;
    const matchesSide = selectedSide === 'Semua' || g.side === selectedSide;
    const matchesStatus = selectedStatus === 'Semua' || g.rsvp_status === selectedStatus;
    const matchesSearch = 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.phone_number && g.phone_number.includes(searchQuery)) ||
      (g.table_number && g.table_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.qr_token && g.qr_token.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTier && matchesSide && matchesStatus && matchesSearch;
  });

  const sentPercentage = guests.length > 0 ? Math.round((summary.sentCount / guests.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header & Guest Summary Cards */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Hub Undangan & RSVP
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500"></span>
              <span className="text-xs text-stone-700 font-medium">{summary.totalConfirmedPax} Pax Siap Hadir</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Buku Tamu & Generator WhatsApp Blast
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Kelola daftar undangan dari kedua belah pihak dan broadcast link RSVP personal
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'cards' ? 'bg-white shadow text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Tampilan Kartu"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-white shadow text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Tampilan Tabel"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onAddGuest}
              className="flex items-center space-x-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-medium transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Tamu</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Total Undangan</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {summary.totalInvitations} Undangan
            </div>
            <div className="text-[11px] text-stone-400">
              Kuota: <strong>{summary.totalAllottedPax} Pax</strong>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Konfirmasi Hadir</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-800 mt-0.5">
              {summary.totalConfirmedPax} Pax
            </div>
            <div className="text-[11px] text-stone-500">
              {summary.attendingCount} keluarga hadir
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Menunggu Konfirmasi</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-amber-800 mt-0.5">
              {summary.pendingCount} Undangan
            </div>
            <div className="text-[11px] text-stone-400">
              Tidak hadir: {summary.declinedCount}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Status Blast WA</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {sentPercentage}% Tersebar
            </div>
            <div className="text-[11px] text-stone-500">
              {summary.sentCount} telah dikirimi link
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <div className="relative w-full lg:flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama tamu, nomor telepon, meja, atau token..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
          >
            {TIERS.map(t => (
              <option key={t} value={t}>Tier: {t}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedSide}
            onChange={e => setSelectedSide(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
          >
            {SIDES.map(s => (
              <option key={s} value={s}>Pihak: {s}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
          >
            {RSVP_STATUSES.map(st => (
              <option key={st} value={st}>RSVP: {st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guest Card Grid View vs Table View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuests.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white border border-stone-200 rounded-2xl text-xs text-stone-500">
              Tidak ada data tamu yang sesuai kriteria pencarian.
            </div>
          ) : (
            filteredGuests.map(guest => {
              const rsvpPillColor = 
                guest.rsvp_status === 'Hadir' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                guest.rsvp_status === 'Tidak Hadir' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                guest.rsvp_status === 'Ragu-ragu' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-stone-100 text-stone-600 border-stone-200';

              const tierColor = 
                guest.tier.includes('VVIP') ? 'bg-stone-900 text-amber-300 font-semibold' :
                guest.tier.includes('VIP') ? 'bg-amber-100 text-stone-900 font-medium' :
                'bg-stone-100 text-stone-700';

              return (
                <div 
                  key={guest.id}
                  className="bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${tierColor}`}>
                        {guest.tier}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${rsvpPillColor}`}>
                        {guest.rsvp_status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-stone-900 leading-snug">
                      {guest.name}
                    </h3>

                    <div className="text-xs text-stone-500 space-y-1">
                      <div>Pengundang: <strong className="text-stone-700">{guest.side}</strong></div>
                      {guest.phone_number && (
                        <div className="flex items-center space-x-1 text-stone-600">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span>{guest.phone_number}</span>
                        </div>
                      )}
                    </div>

                    {/* Table & Pax Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                      <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold">Alokasi Pax</span>
                        <div className="font-serif font-bold text-stone-900">
                          {guest.pax_confirmed > 0 ? `${guest.pax_confirmed} / ` : ''}{guest.pax_allotted} Pax
                        </div>
                      </div>

                      <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold">Meja / Zona</span>
                        <div className="font-serif font-bold text-stone-900 truncate">
                          {guest.table_number || 'Bebas'}
                        </div>
                      </div>
                    </div>

                    {guest.dietary_notes && (
                      <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200/70">
                        Alergi: {guest.dietary_notes}
                      </div>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <button
                      onClick={() => onOpenWhatsAppModal(guest)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim WA</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditGuest(guest)}
                        title="Sunting Data Tamu"
                        className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteGuest(guest.id)}
                        title="Hapus Data Tamu"
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
      ) : (
        /* Table View */
        <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-semibold">Nama Tamu & Klasifikasi</th>
                  <th className="py-3 px-3 font-semibold">Pihak</th>
                  <th className="py-3 px-3 font-semibold text-center">Kuota Pax</th>
                  <th className="py-3 px-3 font-semibold">Meja / Zona</th>
                  <th className="py-3 px-3 font-semibold">Status RSVP</th>
                  <th className="py-3 px-3 font-semibold">Token Barcode</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredGuests.map(guest => {
                  return (
                    <tr key={guest.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{guest.name}</div>
                        <div className="text-[10px] text-stone-500">{guest.tier}</div>
                      </td>
                      <td className="py-3 px-3">{guest.side}</td>
                      <td className="py-3 px-3 text-center font-bold">{guest.pax_confirmed || guest.pax_allotted} Pax</td>
                      <td className="py-3 px-3">{guest.table_number || '-'}</td>
                      <td className="py-3 px-3">{guest.rsvp_status}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-stone-500">{guest.qr_token}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onOpenWhatsAppModal(guest)}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium"
                        >
                          WA
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
