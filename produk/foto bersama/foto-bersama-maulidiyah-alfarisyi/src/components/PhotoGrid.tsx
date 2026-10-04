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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1a2217] border border-[#685c46]/30 font-sans-ui text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => onChangeTab('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-semibold shadow-sm'
                : 'text-[#b8c4ae] hover:text-[#f8f6e1]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semua Momen</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">
              {allCount}
            </span>
          </button>

          <button
            onClick={() => onChangeTab('mine')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'mine'
                ? 'bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-semibold shadow-sm'
                : 'text-[#b8c4ae] hover:text-[#f8f6e1]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Foto Saya</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${myCount >= 5 ? 'bg-amber-900/60 text-amber-200' : 'bg-black/30'}`}>
              {myCount}/5
            </span>
          </button>

          <button
            onClick={() => onChangeTab('popular')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'popular'
                ? 'bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] font-semibold shadow-sm'
                : 'text-[#b8c4ae] hover:text-[#f8f6e1]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Paling Disukai</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#b8c4ae]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim / ucapan..."
            className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-[#1a2217] border border-[#685c46]/30 text-xs font-sans-ui text-[#f8f6e1] placeholder-[#b8c4ae]/50 focus:outline-none focus:border-[#d8cca8] transition-colors"
          />
        </div>
      </div>

      {/* Grid of Photos */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <div className="text-center py-16 px-4 bg-[#1a2217]/60 rounded-3xl border border-[#685c46]/20 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#20291e] border border-[#685c46]/40 mx-auto flex items-center justify-center text-[#d8cca8] mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <h4 className="font-aston text-2xl text-[#f8f6e1] mb-1">
            {activeTab === 'mine' ? 'Belum Ada Foto dari Perangkat Ini' : 'Belum Ada Foto Ditemukan'}
          </h4>
          <p className="text-xs font-sans-ui text-[#b8c4ae] mb-5 leading-relaxed">
            {activeTab === 'mine'
              ? 'Anda memiliki kuota hingga 5 foto. Bagikan momen Anda sekarang untuk ditampilkan di galeri bersama!'
              : 'Tidak ada foto yang cocok dengan pencarian Anda.'}
          </p>

          {activeTab === 'mine' && (
            <button
              onClick={onOpenUpload}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ece5da] to-[#d8cca8] text-[#473c27] text-xs font-semibold shadow-md hover:scale-105 transition-all"
            >
              Mulai Unggah Foto Sekarang
            </button>
          )}
        </div>
      )}
    </section>
  );
};
