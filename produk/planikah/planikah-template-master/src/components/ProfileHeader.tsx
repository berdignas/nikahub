import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Edit3, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Building,
  Utensils,
  Camera,
  Users
} from 'lucide-react';
import { WeddingProfile, WeddingTask, BudgetSummary } from '../types/wedding';

interface ProfileHeaderProps {
  profile: WeddingProfile;
  tasks: WeddingTask[];
  summary: BudgetSummary;
  onEditProfile: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  tasks,
  summary,
  onEditProfile,
  onNavigateTab
}) => {
  const calculateDaysRemaining = () => {
    if (!profile.wedding_date) return 0;
    const target = new Date(profile.wedding_date).getTime();
    if (isNaN(target)) return 0;
    const now = new Date().getTime();
    const difference = target - now;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysRemaining = calculateDaysRemaining();
  const completedTasks = tasks.filter(t => t.is_completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const formatWeddingDate = (dateStr: string) => {
    if (!dateStr) return 'Tanggal Belum Diatur';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
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

  // Milestone readiness checks
  const venueTask = tasks.find(t => t.category === 'Venue & Dekorasi' && t.is_completed);
  const cateringTask = tasks.find(t => t.category === 'Catering' && t.is_completed);
  const photoTask = tasks.find(t => t.category === 'Dokumentasi' && t.is_completed);
  const guestTask = tasks.find(t => t.category === 'Undangan & Tamu' && t.is_completed);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border border-stone-800 text-stone-100 shadow-2xl mb-8">
      {/* Ambient background glow & radial highlights */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-amber-500/20 via-amber-700/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-stone-700/30 to-transparent blur-3xl pointer-events-none" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Main Couple & Theme Presentation */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-stone-800/90 border border-stone-700 text-amber-300 shadow-sm backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Wedding Master OS</span>
              </span>

              <span className="text-[11px] text-stone-400 bg-stone-950/60 px-2.5 py-1 rounded-full border border-stone-800 font-mono">
                {profile.wedding_date ? `${daysRemaining} Hari Menuju Hari-H` : 'Atur Tanggal Nikah'}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-wide text-white leading-tight">
                {profile.groom_name || 'Nama Mempelai Pria'}
              </h1>
              <div className="my-1.5 font-serif italic text-amber-200/90 text-xl sm:text-2xl font-light flex items-center space-x-2">
                <span>bersama</span>
                <span className="w-8 h-[1px] bg-amber-400/40"></span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-wide text-white leading-tight">
                {profile.bride_name || 'Nama Mempelai Wanita'}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-300 pt-1">
              <div className="flex items-center space-x-2 bg-stone-950/80 px-3.5 py-2 rounded-xl border border-stone-800 shadow-inner">
                <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-medium">{formatWeddingDate(profile.wedding_date)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-stone-950/80 px-3.5 py-2 rounded-xl border border-stone-800 shadow-inner">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate max-w-[240px] sm:max-w-xs">{profile.venue_name || 'Lokasi Venue Belum Ditentukan'}</span>
              </div>
            </div>

            {/* Interactive Milestone Badges */}
            <div className="pt-2">
              <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-2">
                Status Milestone Kunci (Klik untuk navigasi)
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigateTab && onNavigateTab('checklist')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    venueTask 
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80' 
                      : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Venue: {venueTask ? 'Terkunci' : 'Proses'}</span>
                </button>

                <button
                  onClick={() => onNavigateTab && onNavigateTab('catering')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    cateringTask 
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80' 
                      : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Catering: {cateringTask ? 'Siap' : 'Review'}</span>
                </button>

                <button
                  onClick={() => onNavigateTab && onNavigateTab('checklist')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    photoTask 
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80' 
                      : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto & Video: {photoTask ? 'Deal' : 'Proses'}</span>
                </button>

                <button
                  onClick={() => onNavigateTab && onNavigateTab('guests')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    guestTask 
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80' 
                      : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Tamu: {guestTask ? 'Terkonfirmasi' : 'Pendataan'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Statistics Box: Visual Circular Gauge & Countdown */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-5 bg-stone-950/80 p-6 rounded-2xl border border-stone-800/90 shrink-0 min-w-[300px] shadow-xl backdrop-blur-md">
            
            {/* Visual Gauge & Countdown Row */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
              
              {/* Circular Gauge Progress */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400 transition-all duration-1000 ease-out"
                    strokeDasharray={`${taskProgress}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-serif font-bold text-base text-white">{taskProgress}%</span>
                  <span className="text-[8px] uppercase text-stone-400 font-semibold">Siap</span>
                </div>
              </div>

              {/* Countdown Numbers */}
              <div className="text-right">
                <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Hitung Mundur Acara
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-0.5">
                  {daysRemaining}
                </div>
                <div className="text-xs text-amber-300 font-medium">Hari Lagi Menuju Sah</div>
              </div>

            </div>

            {/* Checklist Count Stats */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Kesiapan Checklist:</span>
                <span className="font-semibold text-stone-200 font-serif">
                  {completedTasks} dari {tasks.length} Selesai
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Realisasi Pembayaran:</span>
                <span className="font-semibold text-amber-300 font-serif">
                  {summary.paidPercentage}% Terbayar
                </span>
              </div>
            </div>

            {/* Sunting Profil Action */}
            <button
              onClick={onEditProfile}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium border border-stone-700 transition-all shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>Sunting Profil & Tanggal</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
