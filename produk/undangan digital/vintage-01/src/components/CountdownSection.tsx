import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, PlusCircle } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(INVITATION_DATA.eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Habib+%26+Adiba&dates=20261228T010000Z/20261228T070000Z&details=Pernikahan+Habib+Yulianto+%26+Adiba+Putri+Syakila&location=Ds+Pagu,+Wates,+Kediri,+Jawa+Timur`;

  return (
    <section id="acara" className="py-20 px-4 bg-[#F5EFE6] border-y border-[#E6DCCE] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-semibold mb-2 block">
            Save The Date
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D312A] mb-3">
            Waktu Menuju Acara
          </h2>
          <p className="text-sm text-[#66554B] font-light italic">
            Dan kami bersyukur, dipertemukan Allah di waktu terbaik, kini kami menanti hari istimewa kami.
          </p>
        </motion.div>

        {/* Live Countdown Timer Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto mb-8"
        >
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#E6DCCE] shadow-vintage flex flex-col items-center justify-center hover:border-[#C5A059] transition-colors"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8C6A43]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#66554B] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Google Calendar Add Button */}
        <div className="mb-16">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A059] bg-white/80 hover:bg-[#8C6A43] hover:text-white text-[#8C6A43] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Simpan Pengingat di Google Calendar</span>
          </a>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INVITATION_DATA.events.map((evt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-[#E6DCCE] shadow-vintage flex flex-col items-center text-center relative overflow-hidden group hover:border-[#C5A059] transition-all"
            >
              {/* Card Ornament Header */}
              <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center mb-4 text-[#8C6A43] group-hover:bg-[#8C6A43] group-hover:text-white transition-colors">
                <CalendarIcon className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#8C6A43] mb-4">
                {evt.title}
              </h3>

              <div className="space-y-3 mb-6 w-full text-sm text-[#3D312A]">
                <div className="flex items-center justify-center gap-2 text-[#66554B]">
                  <CalendarIcon className="w-4 h-4 text-[#8C6A43]" />
                  <span className="font-medium">{evt.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#66554B]">
                  <Clock className="w-4 h-4 text-[#8C6A43]" />
                  <span>{evt.time}</span>
                </div>
                <div className="pt-3 border-t border-[#E6DCCE] flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-[#8C6A43] font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>{evt.venue}</span>
                  </div>
                  <p className="text-xs text-[#66554B] max-w-xs">{evt.address}</p>
                </div>
              </div>

              <a
                href={evt.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C6A43] text-white hover:bg-[#5C4033] text-xs font-semibold tracking-wider uppercase shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4" />
                <span>Petunjuk Lokasi Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
