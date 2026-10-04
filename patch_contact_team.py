import re

content = open('src/components/ContactView.tsx', 'r', encoding='utf-8').read()

# 1. Remove CONSULTANTS array
old_consultants = '''  const CONSULTANTS = [
    {
      name: "Dita Arisanti",
      role: "Senior Wedding Planner",
      desc: "Berpengalaman menangani 180+ konsep pernikahan adat & modern.",
      wa: "6281234567891"
    },
    {
      name: "Dimas Pratama",
      role: "Lead Technical & Production",
      desc: "Ahli tata ruang tenda VIP, struktur panggung, dan kelistrikan aman.",
      wa: "6281234567892"
    },
    {
      name: "Sarah Amelia",
      role: "Culinary & Guest Experience",
      desc: "Kurator jamuan katering nusantara, western, & live cooking stations.",
      wa: "6281234567893"
    }
  ];'''

content = content.replace(old_consultants, '')

# 2. Remove Team Section JSX Block
old_team_jsx = '''      {/* 4. Profil Konsultan Resmi NikaHub */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-champagne-700 block mb-1">
            Personalisasi Layanan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            Tim Wedding Specialist NikaHub
          </h2>
          <p className="text-xs sm:text-sm text-emerald-950/70 mt-2">
            Anda dapat langsung menyapa konsultan spesifik kami sesuai dengan fokus kebutuhan acara Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONSULTANTS.map((cons, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-emerald-950/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-sand font-serif font-bold text-base flex items-center justify-center shrink-0">
                  {cons.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-emerald-950">{cons.name}</h4>
                  <span className="text-[11px] font-bold text-champagne-700 block">{cons.role}</span>
                </div>
              </div>
              <p className="text-xs text-emerald-950/70 mb-5 leading-relaxed">
                {cons.desc}
              </p>
              <a
                href={https://wa.me/?text=Halo%20,%20saya%20ingin%20konsultasi%20pernikahan}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full border border-emerald-950/20 hover:bg-emerald-950 hover:text-white text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat dengan {cons.name.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>
      </div>'''

content = content.replace(old_team_jsx, '')

open('src/components/ContactView.tsx', 'w', encoding='utf-8').write(content)
