import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Grand Royal Javanese Pavilion",
    client: "Official NikaHub Production",
    location: "Plataran Senayan",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    tags: ["Tenda Transparan", "Dekorasi Adat", "VIP Catering"]
  },
  {
    id: 2,
    title: "Intimate Botanical Canopy",
    client: "Official NikaHub Production",
    location: "Pine Hill Cibodas",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    tags: ["Outdoor Venue", "Rustic", "Acoustic Band"]
  },
  {
    id: 3,
    title: "Modern Elegance Grand Ballroom",
    client: "Official NikaHub Production",
    location: "Ritz-Carlton Pacific Place",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Lighting System", "Orchestra", "Fine Dining"]
  },
  {
    id: 4,
    title: "Coastal Sunset Beachfront",
    client: "Official NikaHub Production",
    location: "Ancol Beach City",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=1200&q=80",
    tags: ["Beach Wedding", "Drone 4K", "Seafood Catering"]
  },
  {
    id: 5,
    title: "Classic Colonial Heritage Setup",
    client: "Official NikaHub Production",
    location: "Gedung Arsip Nasional",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    tags: ["Classic Tenda", "Vintage Decor", "Gamelan"]
  },
  {
    id: 6,
    title: "Luxury Glasshouse Floral Sanctuary",
    client: "Official NikaHub Production",
    location: "Rumah Kaca Melati",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Glasshouse", "Floral Hanging", "Cocktail Bar"]
  }
];

interface PortfolioViewProps {
  onNavigateToContact?: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigateToContact }) => {
  return (
    <div className="pt-24 pb-20 bg-[#F9F9F8] min-h-screen">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 text-center"
      >
        <span className="text-champagne-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
          Bukti Nyata Karya NikaHub
        </span>
        <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 font-bold leading-tight mb-6 max-w-4xl mx-auto">
          Momen Magis yang <br/>Telah Kami Wujudkan
        </h1>
        <p className="text-emerald-950/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Kami tidak hanya menjanjikan konsep, tapi mengeksekusinya dengan presisi. Jelajahi dokumentasi asli dari pernikahan klien-klien kami.
        </p>
      </motion.div>

      {/* Masonry-style Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id}
              variants={fadeInUp}
              className={`group cursor-pointer relative rounded-3xl sm:rounded-[2rem] overflow-hidden bg-emerald-950 ${
                idx % 3 === 0 ? 'md:col-span-2 aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]' : 'aspect-square sm:aspect-[4/5]'
              }`}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-5 sm:p-8 md:p-12 flex flex-col justify-end">
                <div className="transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-white font-bold mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-3 sm:pt-4 mt-2 sm:mt-4">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">{item.client}</p>
                      <p className="text-[10px] sm:text-xs text-white/70">{item.location}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-950 flex items-center justify-center scale-90 sm:scale-0 group-hover:scale-100 transition-transform duration-500 shrink-0">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-4 sm:px-6 mt-32 text-center"
      >
        <h2 className="font-serif text-4xl font-bold text-emerald-950 mb-6">Cerita Selanjutnya Adalah Milik Anda</h2>
        <button 
          onClick={onNavigateToContact}
          className="bg-emerald-950 text-sand hover:bg-emerald-900 px-10 py-4 rounded-full font-bold text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer active:scale-95"
        >
          Konsultasi Konsep Gratis
        </button>
      </motion.div>

    </div>
  );
};
