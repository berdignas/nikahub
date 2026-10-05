import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, MapPin, Wallet, User, Heart } from 'lucide-react';
import { WeddingProfile } from '../types/wedding';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Partial<WeddingProfile>) => void;
  profile: WeddingProfile;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  profile
}) => {
  if (!isOpen) return null;

  const [groomName, setGroomName] = useState(profile.groom_name);
  const [groomNickname, setGroomNickname] = useState(profile.groom_nickname);
  const [groomPhone, setGroomPhone] = useState(profile.groom_phone || '');
  const [brideName, setBrideName] = useState(profile.bride_name);
  const [brideNickname, setBrideNickname] = useState(profile.bride_nickname);
  const [bridePhone, setBridePhone] = useState(profile.bride_phone || '');
  const [weddingDate, setWeddingDate] = useState(profile.wedding_date);
  const [venueName, setVenueName] = useState(profile.venue_name);
  const [venueAddress, setVenueAddress] = useState(profile.venue_address || '');
  const [targetBudget, setTargetBudget] = useState(profile.target_budget.toString());
  const [themeConcept, setThemeConcept] = useState(profile.theme_concept || '');
  const [notes, setNotes] = useState(profile.notes || '');

  useEffect(() => {
    if (isOpen) {
      setGroomName(profile.groom_name);
      setGroomNickname(profile.groom_nickname);
      setGroomPhone(profile.groom_phone || '');
      setBrideName(profile.bride_name);
      setBrideNickname(profile.bride_nickname);
      setBridePhone(profile.bride_phone || '');
      setWeddingDate(profile.wedding_date);
      setVenueName(profile.venue_name);
      setVenueAddress(profile.venue_address || '');
      setTargetBudget(profile.target_budget.toString());
      setThemeConcept(profile.theme_concept || '');
      setNotes(profile.notes || '');
    }
  }, [isOpen, profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetNum = parseFloat(targetBudget);

    onSave({
      groom_name: groomName,
      groom_nickname: groomNickname,
      groom_phone: groomPhone || undefined,
      bride_name: brideName,
      bride_nickname: brideNickname,
      bride_phone: bridePhone || undefined,
      wedding_date: weddingDate,
      venue_name: venueName,
      venue_address: venueAddress || undefined,
      target_budget: isNaN(budgetNum) ? 0 : budgetNum,
      theme_concept: themeConcept || undefined,
      notes: notes || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Konfigurasi Pasangan
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900 mt-0.5">
              Sunting Profil & Tanggal Pernikahan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Section: Pengantin Pria */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 pb-1 border-b border-stone-100 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span>Mempelai Pria</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={groomName}
                  onChange={e => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  required
                  value={groomNickname}
                  onChange={e => setGroomNickname(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Pengantin Wanita */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 pb-1 border-b border-stone-100 flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-stone-500" />
              <span>Mempelai Wanita</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={brideName}
                  onChange={e => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  required
                  value={brideNickname}
                  onChange={e => setBrideNickname(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Tanggal, Venue & Budget */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 pb-1 border-b border-stone-100 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Tanggal, Venue & Target Anggaran</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Tanggal Akad / Resepsi
                </label>
                <input
                  type="date"
                  required
                  value={weddingDate}
                  onChange={e => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  Plafon Target Anggaran (Rp)
                </label>
                <input
                  type="number"
                  required
                  value={targetBudget}
                  onChange={e => setTargetBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Nama Gedung / Tempat Acara (Venue)
              </label>
              <input
                type="text"
                required
                value={venueName}
                onChange={e => setVenueName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Alamat Lengkap Venue
              </label>
              <input
                type="text"
                placeholder="Alamat jalan, kota, dan patokan..."
                value={venueAddress}
                onChange={e => setVenueAddress(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Tema / Konsep Desain Acara
              </label>
              <input
                type="text"
                placeholder="Contoh: Classic Elegance & Modern Heritage"
                value={themeConcept}
                onChange={e => setThemeConcept(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Catatan Umum / Visi Pernikahan
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-800"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
