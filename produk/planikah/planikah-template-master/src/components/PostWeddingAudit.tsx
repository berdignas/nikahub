import React, { useState } from 'react';
import { 
  Star, 
  Plus, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Image, 
  ExternalLink, 
  Building, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { VendorReview, WeddingProfile, WeddingGuest, TaskCategory } from '../types/wedding';

interface PostWeddingAuditProps {
  reviews: VendorReview[];
  profile: WeddingProfile;
  checkedInGuests: WeddingGuest[];
  onAddReview: (newReview: Partial<VendorReview>) => void;
  onDeleteReview: (reviewId: string) => void;
}

const CATEGORIES: TaskCategory[] = [
  'Venue & Dekorasi',
  'Catering',
  'Busana & MUA',
  'Dokumentasi',
  'Logistik & Panitia',
  'Hiburan & Sound',
  'Undangan & Tamu'
];

export const PostWeddingAudit: React.FC<PostWeddingAuditProps> = ({
  reviews,
  profile,
  checkedInGuests,
  onAddReview,
  onDeleteReview
}) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Venue & Dekorasi');
  const [ratingStars, setRatingStars] = useState(5);
  const [feedbackNotes, setFeedbackNotes] = useState('');

  // Sample Photo Links
  const [photoGalleryUrl, setPhotoGalleryUrl] = useState('https://gallery.berdikariwedding.com/alfarisyi-maulidiyah');

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !feedbackNotes) return;

    onAddReview({
      vendor_name: vendorName,
      category,
      rating_stars: ratingStars,
      feedback_notes: feedbackNotes,
      is_recommended: ratingStars >= 4
    });

    setVendorName('');
    setFeedbackNotes('');
    setShowAddReview(false);
  };

  // Generate Thank You Message Template
  const generateThankYouMessage = (guestName: string) => {
    return `Kepada Yth.
${guestName}

Assalamu'alaikum Wr. Wb. / Salam Sejahtera,

Kami sekeluarga menyampaikan rasa terima kasih yang setulus-tulusnya atas kehadiran, doa restu, serta perhatian yang Bapak/Ibu/Saudara/i berikan pada hari bahagia pernikahan kami:

${profile.groom_nickname} & ${profile.bride_nickname}

Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kehormatan serta kebahagiaan yang tak terhingga bagi kami sekeluarga.

Untuk mengunduh dokumentasi foto bersama selama acara, silakan mengakses galeri resmi kami di tautan berikut:
${photoGalleryUrl}

Semoga Allah SWT membalas segala kebaikan Bapak/Ibu/Saudara/i dengan keberkahan yang melimpah.

Salam hangat dan hormat kami,
${profile.groom_nickname} & ${profile.bride_nickname}
Beserta Seluruh Keluarga Besar`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Evaluasi Pasca Acara & Media Hub
              </span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-stone-700 font-medium">Laporan Akhir</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
              Evaluasi Kinerja Vendor & Ucapan Terima Kasih (H+1)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Penilaian scorecard kepuasan vendor mitra dan pengiriman otomatis pesan apresiasi kepada tamu yang telah hadir
            </p>
          </div>

          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Ulasan Vendor</span>
          </button>
        </div>
      </div>

      {/* Form Tambah Ulasan */}
      {showAddReview && (
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/90 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Form Penilaian Skor Vendor
            </h3>
            <button
              onClick={() => setShowAddReview(false)}
              className="text-xs text-stone-500 hover:text-stone-900"
            >
              Tutup
            </button>
          </div>

          <form onSubmit={handleCreateReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Nama Vendor</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Larasati Catering"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Kategori Jasa</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as TaskCategory)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Rating Kepuasan</label>
                <select
                  value={ratingStars}
                  onChange={e => setRatingStars(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                >
                  <option value={5}>5 Bintang (Sempurna)</option>
                  <option value={4}>4 Bintang (Sangat Baik)</option>
                  <option value={3}>3 Bintang (Cukup)</option>
                  <option value={2}>2 Bintang (Perlu Evaluasi)</option>
                  <option value={1}>1 Bintang (Kurang)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Catatan Evaluasi / Ulasan Kinerja</label>
              <textarea
                rows={3}
                required
                placeholder="Uraikan ketepatan waktu, kualitas rasa/dekorasi, keramahan staf, dan kepatuhan terhadap kontrak..."
                value={feedbackNotes}
                onChange={e => setFeedbackNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium transition-colors"
              >
                Simpan Ulasan Vendor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Two Column Layout: Vendor Scorecards vs Thank You Blast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Vendor Scorecards (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Scorecard & Evaluasi Vendor Mitra
              </h3>
              <p className="text-xs text-stone-500">
                Arsip rating kualitas performa vendor untuk referensi masa depan
              </p>
            </div>

            <div className="space-y-3">
              {reviews.map(rev => (
                <div 
                  key={rev.id} 
                  className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2 hover:border-stone-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-medium">
                        {rev.category}
                      </span>
                      <h4 className="font-serif text-base font-semibold text-stone-900 mt-1">
                        {rev.vendor_name}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-amber-500 text-xs font-semibold">
                        {Array.from({ length: rev.rating_stars }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <button
                        onClick={() => onDeleteReview(rev.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 rounded transition-colors"
                        title="Hapus Ulasan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{rev.feedback_notes}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Col: Automated Thank You Blast Engine (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Pesan Terima Kasih & Tautan Galeri Foto (H+1)
              </h3>
              <p className="text-xs text-stone-500">
                Kirim pesan apresiasi kepada {checkedInGuests.length} tamu yang telah terverifikasi hadir di lokasi
              </p>
            </div>

            {/* Gallery Link Setting */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Tautan Cloud / Galeri Foto Undangan
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={photoGalleryUrl}
                  onChange={e => setPhotoGalleryUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-stone-800"
                />
                <a
                  href={photoGalleryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sample Message Preview */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Pratinjau Pesan WhatsApp H+1
              </span>
              <textarea
                readOnly
                rows={9}
                value={generateThankYouMessage(checkedInGuests[0]?.name || 'Nama Tamu')}
                className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-sans leading-relaxed focus:outline-none"
              />
            </div>

            {/* Checked-In Guests List for Broadcast */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-semibold text-stone-700">
                Daftar Penerima Pesan Apresiasi ({checkedInGuests.length} Tamu Hadir):
              </span>

              {checkedInGuests.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400 bg-stone-50 rounded-xl">
                  Belum ada tamu yang terdaftar hadir (checked-in) pada sistem registrasi.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {checkedInGuests.map(g => (
                    <div 
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50/60"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{g.name}</div>
                        <div className="text-[10px] text-stone-500">{g.phone_number || 'Tidak ada nomor'}</div>
                      </div>

                      <a
                        href={`https://api.whatsapp.com/send?phone=${g.phone_number?.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(generateThankYouMessage(g.name))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-medium transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Kirim WA</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
