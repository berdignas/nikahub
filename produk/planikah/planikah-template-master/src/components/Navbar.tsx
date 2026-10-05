import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Wallet, 
  Users, 
  Clock, 
  QrCode, 
  Utensils, 
  Gift, 
  Star, 
  UserCircle, 
  Download 
} from 'lucide-react';
import { WeddingProfile } from '../types/wedding';

export type ActiveTabType = 
  | 'dashboard' 
  | 'checklist' 
  | 'budget' 
  | 'guests' 
  | 'rundown' 
  | 'reception' 
  | 'catering' 
  | 'gifts' 
  | 'evaluation' 
  | 'profile';

interface NavbarProps {
  profile: WeddingProfile;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  onExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, activeTab, setActiveTab, onExport }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Couple Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-stone-800 to-stone-950 border border-stone-700 flex items-center justify-center text-amber-300 font-serif font-bold text-lg shadow-inner">
              P
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                  Planikah OS
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-amber-400/80"></span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-amber-300/90 font-medium">
                  Full Suite
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-serif font-medium tracking-wide text-stone-100">
                {profile.groom_nickname || profile.bride_nickname ? `${profile.groom_nickname || ''} & ${profile.bride_nickname || ''}` : 'Master Wedding Planner'}
              </h1>
            </div>
          </div>

          {/* Navigation Tabs (Desktop Scrolling / Segmented Bar) */}
          <nav className="hidden xl:flex items-center space-x-1 bg-stone-950/70 p-1.5 rounded-xl border border-stone-800/80 overflow-x-auto max-w-3xl">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Ringkasan</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'checklist'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Checklist</span>
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'budget'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Anggaran</span>
            </button>

            <button
              onClick={() => setActiveTab('guests')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'guests'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Tamu</span>
            </button>

            <button
              onClick={() => setActiveTab('rundown')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'rundown'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Rundown</span>
            </button>

            <button
              onClick={() => setActiveTab('reception')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'reception'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Gate QR</span>
            </button>

            <button
              onClick={() => setActiveTab('catering')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'catering'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Catering</span>
            </button>

            <button
              onClick={() => setActiveTab('gifts')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'gifts'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Angpao</span>
            </button>

            <button
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'evaluation'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Evaluasi</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-stone-800 text-amber-200 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>

          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              onClick={onExport}
              title="Ekspor Laporan Master PDF"
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Ekspor Data</span>
            </button>
          </div>

        </div>
      </div>

      {/* Horizontal Scrollable Subnav Bar for Mobile & Smaller Screens */}
      <div className="xl:hidden flex items-center overflow-x-auto bg-stone-950 border-t border-stone-800 px-3 py-2 space-x-1.5 scrollbar-none">
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Ringkasan</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'checklist' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'budget' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>Anggaran</span>
        </button>

        <button
          onClick={() => setActiveTab('guests')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'guests' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Tamu</span>
        </button>

        <button
          onClick={() => setActiveTab('rundown')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'rundown' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Rundown</span>
        </button>

        <button
          onClick={() => setActiveTab('reception')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'reception' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Gate QR</span>
        </button>

        <button
          onClick={() => setActiveTab('catering')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'catering' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Catering</span>
        </button>

        <button
          onClick={() => setActiveTab('gifts')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'gifts' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Angpao</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'evaluation' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>Evaluasi</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'profile' ? 'bg-stone-800 text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          <UserCircle className="w-3.5 h-3.5" />
          <span>Profil</span>
        </button>

      </div>
    </header>
  );
};
