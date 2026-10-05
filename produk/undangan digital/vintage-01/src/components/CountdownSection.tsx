import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, PlusCircle, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';
import { SectionCard } from './SectionCard';

export const CountdownSection: React.FC = () => {
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Pernikahan ${INVITATION_DATA.groom.shortName} & ${INVITATION_DATA.bride.shortName}`
  )}&dates=20261228T010000Z/20261228T070000Z&details=${encodeURIComponent(
    `Pernikahan ${INVITATION_DATA.groom.name} & ${INVITATION_DATA.bride.name}`
  )}&location=${encodeURIComponent(INVITATION_DATA.events[0].address)}`;

  return (
    <SectionCard id="acara" className="bg-gradient-to-b from-[#FAF6F0] via-white to-[#F5EFE6]">
      <div className="text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-lg mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6A43] font-bold mb-2 inline-flex items-center gap-1.5 bg-[#FAF6F0] px-5 py-1.5 rounded-full border border-[#E6DCCE] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Rangkaian Acara</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D312A] mb-3 mt-2">
            Akad Nikah &amp; Resepsi
          </h2>
          <p className="text-xs sm:text-sm text-[#66554B] font-light italic">
            Dan kami bersyukur, dipertemukan Allah di waktu terbaik, kini kami menanti hari istimewa kami.
          </p>
        </motion.div>

        {/* Google Calendar Add Button */}
        <div className="mb-12">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#C5A059] bg-white hover:bg-[#8C6A43] hover:text-white text-[#8C6A43] text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 pulse-glow"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
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
              className="bg-[#FAF6F0]/90 backdrop-blur-sm p-8 rounded-3xl border-2 border-[#E6DCCE] shadow-lg flex flex-col items-center text-center relative overflow-hidden group hover:border-[#C5A059] transition-all hover:shadow-2xl"
            >
              {/* Card Ornament Header */}
              <div className="w-14 h-14 rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center mb-4 text-[#8C6A43] group-hover:bg-[#8C6A43] group-hover:text-white transition-colors shadow-md">
                <CalendarIcon className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#8C6A43] mb-4">
                {evt.title}
              </h3>

              <div className="space-y-3 mb-6 w-full text-sm text-[#3D312A]">
                <div className="flex items-center justify-center gap-2 text-[#66554B]">
                  <CalendarIcon className="w-4 h-4 text-[#8C6A43]" />
                  <span className="font-bold">{evt.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#66554B]">
                  <Clock className="w-4 h-4 text-[#8C6A43]" />
                  <span>{evt.time}</span>
                </div>
                <div className="pt-4 border-t border-[#E6DCCE] flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-[#8C6A43] font-bold text-xs uppercase tracking-wider">
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C6A43] text-white hover:bg-[#5C4033] text-xs font-semibold tracking-wider uppercase shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>Petunjuk Lokasi Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionCard>
  );
};
