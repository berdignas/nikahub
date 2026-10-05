import React, { useState } from 'react';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  Clock, 
  Gift, 
  UserCheck, 
  AlertTriangle, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { WeddingGuest, WeddingProfile } from '../types/wedding';
import { fireConfetti } from '../utils/confetti';

interface GateReceptionProps {
  guests: WeddingGuest[];
  profile: WeddingProfile;
  onToggleCheckIn: (guestId: string) => void;
  onToggleSouvenir: (guestId: string) => void;
}

export const GateReception: React.FC<GateReceptionProps> = ({
  guests,
  profile,
  onToggleCheckIn,
  onToggleSouvenir
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedToken, setScannedToken] = useState('');
  const [activeScannedGuest, setActiveScannedGuest] = useState<WeddingGuest | null>(null);

  const totalGuests = guests.length;
  const checkedInGuests = guests.filter(g => g.checked_in).length;
  const checkedInPax = guests
    .filter(g => g.checked_in)
    .reduce((sum, g) => sum + (g.pax_confirmed || g.pax_allotted), 0);
  const claimedSouvenirs = guests.filter(g => g.souvenir_claimed).length;
  const checkInPercentage = totalGuests > 0 ? Math.round((checkedInGuests / totalGuests) * 100) : 0;

  // Handle Token Scan Simulation
  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedToken.trim()) return;

    const found = guests.find(g => 
      g.qr_token.toLowerCase() === scannedToken.trim().toLowerCase() ||
      (g.phone_number && g.phone_number.includes(scannedToken.trim()))
    );

    if (found) {
      setActiveScannedGuest(found);
      if (!found.checked_in) {
        onToggleCheckIn(found.id);
        fireConfetti();
      }
    } else {
      alert(`Token atau Nomor "${scannedToken}" tidak terdaftar dalam basis data undangan.`);
    }
    setScannedToken('');
  };

  const handleQuickDemoScan = (guest: WeddingGuest) => {
    setActiveScannedGuest(guest);
    if (!guest.checked_in) {
      onToggleCheckIn(guest.id);
      fireConfetti();
    }
  };

  // Filter list for manual check-in
  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.phone_number && g.phone_number.includes(searchQuery)) ||
    (g.table_number && g.table_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    g.qr_token.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header & Gate KPI Cards */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Meja Penerima Tamu & Gate Check-In
              </span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-emerald-800 font-medium">Sistem Pemindai Siap</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Live Scanner & Registrasi Kehadiran
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Validasi barcode undangan tamu dalam 1 detik dan pencatatan pengambilan souvenir
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
              <div className="text-stone-500">Waktu Acara</div>
              <div className="font-semibold text-stone-900 font-serif">{profile.wedding_time || '08:00'} WIB</div>
            </div>
            <div className="border-l border-stone-200 pl-3">
              <div className="text-stone-500">Lokasi Gerbang</div>
              <div className="font-semibold text-stone-900 font-serif">{profile.venue_name}</div>
            </div>
          </div>
        </div>

        {/* 4 Reception KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Tamu Tiba (Check-in)</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-800 mt-0.5">
              {checkedInGuests} Tamu ({checkInPercentage}%)
            </div>
            <div className="text-[11px] text-stone-400">
              Total hadir: <strong>{checkedInPax} Pax Porsi</strong>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Belum Tiba</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {totalGuests - checkedInGuests} Undangan
            </div>
            <div className="text-[11px] text-stone-400">
              Dari total {totalGuests} undangan terdaftar
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Souvenir Terdistribusi</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {claimedSouvenirs} Paket
            </div>
            <div className="text-[11px] text-stone-500">
              {totalGuests - claimedSouvenirs} paket souvenir tersisa
            </div>
          </div>

          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Kapasitas Kursi</div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-0.5">
              Terisi {checkInPercentage}%
            </div>
            <div className="text-[11px] text-stone-400">
              Alur flow pintu masuk terkendali
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-stone-100 rounded-full h-2 mt-5 overflow-hidden">
          <div 
            className="bg-emerald-700 h-full rounded-full transition-all duration-500"
            style={{ width: `${checkInPercentage}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Fast Scanner & Guest Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Fast Scanner Box & Scanned Guest Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Barcode / Token Scanner Box */}
          <div className="bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-800 text-amber-300 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-white">
                  Fast Barcode Scanner
                </h3>
                <p className="text-[11px] text-stone-400">
                  Arahkan scanner atau masukkan token/kode undangan
                </p>
              </div>
            </div>

            <form onSubmit={handleScanSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Scan barcode atau ketik token (misal: VVIP-BS-001)..."
                  value={scannedToken}
                  onChange={e => setScannedToken(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-200 hover:from-amber-300 hover:to-amber-100 text-stone-950 font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Validasi & Check-In Tamu</span>
              </button>
            </form>
            <div className="pt-3 border-t border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-amber-200 flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Uji Coba Cepat (Klik untuk Simulasi Scan):</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {guests.slice(0, 4).map(sampleGuest => (
                  <button
                    key={sampleGuest.id}
                    type="button"
                    onClick={() => handleQuickDemoScan(sampleGuest)}
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[11px] border border-stone-700 hover:border-amber-400/50 transition-all flex items-center space-x-1"
                  >
                    <span>{sampleGuest.name.split(' ')[0]} ({sampleGuest.tier})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
              Petunjuk: Scanner USB/Bluetooth fisik akan otomatis mengisi token dan memvalidasi seketika.
            </div>
          </div>

          {/* Active Scanned Guest Result Highlight Card */}
          {activeScannedGuest ? (
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 shadow-lg space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-xs text-emerald-800 uppercase tracking-wider">
                    Registrasi Berhasil
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  {activeScannedGuest.qr_token}
                </span>
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-stone-900 text-amber-200">
                  {activeScannedGuest.tier}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                  {activeScannedGuest.name}
                </h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  {activeScannedGuest.side} &bull; {activeScannedGuest.phone_number || 'Tidak ada nomor'}
                </div>
              </div>

              {/* Seating & Pax Box */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Alokasi Tempat Duduk</span>
                  <div className="font-serif font-bold text-sm text-stone-900 mt-0.5">
                    {activeScannedGuest.table_number || 'Bebas / Standing'}
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-semibold">Hak Porsi Tamu</span>
                  <div className="font-serif font-bold text-sm text-stone-900 mt-0.5">
                    {activeScannedGuest.pax_confirmed || activeScannedGuest.pax_allotted} Pax
                  </div>
                </div>
              </div>

              {activeScannedGuest.dietary_notes && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>Catatan Khusus:</strong> {activeScannedGuest.dietary_notes}
                </div>
              )}

              {/* Souvenir Redemption Action */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <span className="text-xs font-medium text-stone-700">Status Souvenir:</span>
                <button
                  onClick={() => onToggleSouvenir(activeScannedGuest.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                    activeScannedGuest.souvenir_claimed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{activeScannedGuest.souvenir_claimed ? 'Sudah Diambil' : 'Klaim Souvenir'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white border border-stone-200 rounded-2xl text-xs text-stone-400">
              Belum ada tamu yang dipindai dalam sesi aktif ini.
            </div>
          )}

        </div>

        {/* Right Col: Manual Check-In Search Table (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Daftar Tamu & Check-In Manual
                </h3>
                <p className="text-xs text-stone-500">
                  Cari nama manual jika tamu tidak membawa barcode undangan
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama tamu..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="sticky top-0 bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Tamu & Tier</th>
                    <th className="py-2.5 px-2">Meja</th>
                    <th className="py-2.5 px-2 text-center">Pax</th>
                    <th className="py-2.5 px-2 text-center">Check-In</th>
                    <th className="py-2.5 px-3 text-right">Souvenir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredGuests.map(guest => (
                    <tr 
                      key={guest.id} 
                      className={`hover:bg-stone-50 transition-colors ${
                        guest.checked_in ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-stone-900">{guest.name}</div>
                        <div className="text-[10px] text-stone-500">{guest.tier} &bull; {guest.side}</div>
                      </td>

                      <td className="py-2.5 px-2 whitespace-nowrap text-stone-600">
                        {guest.table_number || '-'}
                      </td>

                      <td className="py-2.5 px-2 text-center whitespace-nowrap font-bold">
                        {guest.pax_confirmed || guest.pax_allotted}
                      </td>

                      <td className="py-2.5 px-2 text-center whitespace-nowrap">
                        <button
                          onClick={() => onToggleCheckIn(guest.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                            guest.checked_in
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {guest.checked_in ? 'Tiba' : 'Check-In'}
                        </button>
                      </td>

                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => onToggleSouvenir(guest.id)}
                          disabled={!guest.checked_in}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            guest.souvenir_claimed
                              ? 'text-emerald-700 bg-emerald-100'
                              : guest.checked_in
                                ? 'text-stone-700 bg-stone-100 hover:bg-stone-200'
                                : 'text-stone-300 bg-stone-50 cursor-not-allowed'
                          }`}
                          title={guest.souvenir_claimed ? 'Souvenir sudah diambil' : 'Klik untuk klaim souvenir'}
                        >
                          <Gift className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
