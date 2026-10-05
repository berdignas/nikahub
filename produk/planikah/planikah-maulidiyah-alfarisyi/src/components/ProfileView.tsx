import React from 'react';
import { User, Heart, Calendar, MapPin, Wallet, Edit3, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { WeddingProfile, WeddingTask, BudgetSummary } from '../types/wedding';

interface ProfileViewProps {
  profile: WeddingProfile;
  tasks: WeddingTask[];
  summary: BudgetSummary;
  onEditProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  tasks,
  summary,
  onEditProfile
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatWeddingDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const completedTasks = tasks.filter(t => t.is_completed).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Pusat Informasi Dokumen
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
              Profil & Identitas Pernikahan
            </h2>
          </div>
          
          <button
            onClick={onEditProfile}
            className="flex items-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Sunting Informasi</span>
          </button>
        </div>

        {/* Couple Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Groom Card */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-200 flex items-center justify-center font-serif font-bold text-lg">
                P
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">Mempelai Pria</span>
                <h3 className="font-serif text-lg font-medium text-stone-900">{profile.groom_nickname}</h3>
              </div>
            </div>
            
            <div className="text-xs space-y-1.5 pt-2 border-t border-stone-200/60 text-stone-700">
              <div><strong>Nama Lengkap:</strong> {profile.groom_name}</div>
              {profile.groom_phone && <div><strong>Kontak Telepon:</strong> {profile.groom_phone}</div>}
            </div>
          </div>

          {/* Bride Card */}
          <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-200 flex items-center justify-center font-serif font-bold text-lg">
                W
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">Mempelai Wanita</span>
                <h3 className="font-serif text-lg font-medium text-stone-900">{profile.bride_nickname}</h3>
              </div>
            </div>
            
            <div className="text-xs space-y-1.5 pt-2 border-t border-stone-200/60 text-stone-700">
              <div><strong>Nama Lengkap:</strong> {profile.bride_name}</div>
              {profile.bride_phone && <div><strong>Kontak Telepon:</strong> {profile.bride_phone}</div>}
            </div>
          </div>

        </div>

        {/* Detailed Specs List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-100 text-xs">
          
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              <span>Hari & Tanggal Pelaksanaan</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 pt-1 font-serif">
              {formatWeddingDate(profile.wedding_date)}
            </div>
            <div className="text-[11px] text-stone-500">Pukul {profile.wedding_time || '08:00'} WIB</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-stone-600" />
              <span>Gedung & Lokasi (Venue)</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 pt-1 font-serif">
              {profile.venue_name}
            </div>
            <div className="text-[11px] text-stone-500">{profile.venue_address || 'Alamat terlampir'}</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
              <Wallet className="w-3.5 h-3.5 text-stone-600" />
              <span>Plafon Batas Anggaran</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 pt-1 font-serif">
              {formatRupiah(profile.target_budget)}
            </div>
            <div className="text-[11px] text-stone-500">Realisasi saat ini: {formatRupiah(summary.totalActual)}</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
            <div className="flex items-center space-x-1.5 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
              <span>Status Kesiapan Acara</span>
            </div>
            <div className="text-sm font-semibold text-stone-900 pt-1 font-serif">
              {completedTasks} dari {tasks.length} Checklist Selesai
            </div>
            <div className="text-[11px] text-stone-500">Progress: {summary.paidPercentage}% Pembayaran Terbayar</div>
          </div>

        </div>

        {/* Vision & Concept Box */}
        {profile.notes && (
          <div className="mt-6 p-4 rounded-2xl bg-stone-900 text-stone-200 text-xs space-y-1.5">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-amber-300">
              Visi & Konsep Pernikahan
            </div>
            <p className="font-serif italic text-sm text-stone-100 leading-relaxed">
              "{profile.notes}"
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
