import re

content = open('src/components/HomeView.tsx', 'r', encoding='utf-8').read()

old_pilar = '''      {/* 9. 3 PILAR KOMITMEN NIKAHUB (DISESUAIKAN UNTUK MARKET MENENGAH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">Konsultasi Bebas Pusing</h3>
              <p className="text-[11px] sm:text-xs text-emerald-950/70 leading-relaxed">
                Tanya-tanya dulu soal tenda dan katering gratis! Tim kami siap merancang anggaran yang pas dengan budget Anda.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">Harga Transparan</h3>
              <p className="text-[11px] sm:text-xs text-emerald-950/70 leading-relaxed">
                Tidak ada biaya dadakan di akhir acara. Spesifikasi paket fleksibel bisa dinegosiasikan sesuai kebutuhan.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/5 flex items-center justify-center text-emerald-950 shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm mb-1 text-emerald-950">Garansi Siap H-1</h3>
              <p className="text-[11px] sm:text-xs text-emerald-950/70 leading-relaxed">
                Seluruh panggung, dekorasi & tenda siap 100% pada H-1 siang. Anda tinggal tenang beristirahat menyambut tamu.
              </p>
            </div>
          </div>
        </div>
      </section>'''

content = content.replace(old_pilar, '')

open('src/components/HomeView.tsx', 'w', encoding='utf-8').write(content)
