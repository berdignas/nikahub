import React, { useState } from 'react';
import { Sparkles, Heart, User, Search, Camera } from 'lucide-react';
import { PhotoMoment, FilterTab } from '../types';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  photos: PhotoMoment[];
  currentDeviceId: string;
  activeTab: FilterTab;
  onChangeTab: (tab: FilterTab) => void;
  onLikeToggle: (photoId: string) => void;
  onDeletePhoto: (photoId: string) => void;
  onOpenDetail: (photo: PhotoMoment) => void;
  onOpenUpload: () => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  currentDeviceId,
  activeTab,
  onChangeTab,
  onLikeToggle,
  onDeletePhoto,
  onOpenDetail,
  onOpenUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Counts
  const allCount = photos.length;
  const myCount = photos.filter(p => p.deviceId === currentDeviceId && !p.isInitialSample).length;
  const popularCount = photos.filter(p => p.likesCount > 10).length;

  // Filter logic
  let filtered = [...photos];

  if (activeTab === 'mine') {
    filtered = filtered.filter(p => p.deviceId === currentDeviceId && !p.isInitialSample);
  } else if (activeTab === 'popular') {
    filtered = filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
  } else {
    // Newest first
    filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      p => p.senderName.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q)
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-gray-200/90 font-sans text-xs shadow-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => onChangeTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0A261D] text-[#FAF9F5] font-bold shadow-sm'
                : 'text-gray-600 hover:text-[#0A261D] font-medium'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6CA92]" />
            <span>Semua Momen</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'all' ? 'bg-white/20 text-[#FAF9F5]' : 'bg-gray-100 text-gray-700'}`}>
              {allCount}
            </span>
          </button>

          <button
            onClick={() => onChangeTab('mine')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'mine'
                ? 'bg-[#0A261D] text-[#FAF9F5] font-bold shadow-sm'
                : 'text-gray-600 hover:text-[#0A261D] font-medium'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#E6CA92]" />
            <span>Foto Saya</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'mine' ? 'bg-white/20 text-[#FAF9F5]' : myCount >= 5 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}>
              {myCount}/5
            </span>
          </button>

          <button
            onClick={() => onChangeTab('popular')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'popular'
                ? 'bg-[#0A261D] text-[#FAF9F5] font-bold shadow-sm'
                : 'text-gray-600 hover:text-[#0A261D] font-medium'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Paling Disukai</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim atau ucapan..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200/90 text-xs font-sans text-[#0A261D] placeholder-gray-400 focus:outline-none focus:border-[#0A261D] focus:ring-1 focus:ring-[#0A261D] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Grid of Photos */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              currentDeviceId={currentDeviceId}
              onLikeToggle={onLikeToggle}
              onDeletePhoto={onDeletePhoto}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-3xl border border-gray-200/80 shadow-sm max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#E6CA92]/40 mx-auto flex items-center justify-center text-[#C5A880] mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#0A261D] mb-1">
            {activeTab === 'mine' ? 'Belum Ada Foto dari Perangkat Ini' : 'Belum Ada Foto Ditemukan'}
          </h3>
          <p className="text-xs font-sans text-gray-500 mb-6 leading-relaxed">
            {activeTab === 'mine'
              ? 'Anda memiliki kuota hingga 5 foto. Bagikan momen indah Anda sekarang untuk diabadikan bersama!'
              : 'Tidak ada foto yang cocok dengan pencarian kata kunci Anda.'}
          </p>

          {activeTab === 'mine' && (
            <button
              onClick={onOpenUpload}
              className="px-6 py-3 rounded-full bg-[#0A261D] hover:bg-[#164E3D] text-[#FAF9F5] text-xs font-sans font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Mulai Unggah Foto Sekarang
            </button>
          )}
        </div>
      )}
    </section>
  );
};
