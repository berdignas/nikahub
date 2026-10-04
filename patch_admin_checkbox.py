import re

content = open('src/components/AdminDashboardView.tsx', 'r', encoding='utf-8').read()

old_block = '''                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-emerald-950 mb-1">Harga Sewa / Paket (IDR) *</label>'''

new_block = '''                  </div>

                  <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <input 
                      type="checkbox" 
                      id="featured-checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 accent-emerald-950 cursor-pointer"
                    />
                    <label htmlFor="featured-checkbox" className="font-bold text-emerald-950 cursor-pointer">
                      Tampilkan di "Pilihan Utama" (Beranda)
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-emerald-950 mb-1">Harga Sewa / Paket (IDR) *</label>'''

content = content.replace(old_block, new_block)

open('src/components/AdminDashboardView.tsx', 'w', encoding='utf-8').write(content)
