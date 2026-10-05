'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react';
import { ScrollReveal } from '../animation/ScrollReveal';
import { VintageDivider, VintageCornerFlourish } from '../animation/SvgVintageFrame';
import { EventDetail } from '@/types';

interface EventScheduleSectionProps {
  events: EventDetail[];
}

export function EventScheduleSection({ events }: EventScheduleSectionProps) {
  const handleAddToCalendar = (event: EventDetail) => {
    // Generate Google Calendar Link
    const startTime = new Date(event.dateISO).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(new Date(event.dateISO).getTime() + 3 * 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      `Pernikahan di ${event.venue}`
    )}&location=${encodeURIComponent(event.address)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 select-none">
      <ScrollReveal animation="fadeDown">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-vintage-600 font-sans">
            Waktu & Tempat Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-vintage-900 mt-1 mb-2">
            Wedding Events
          </h2>
          <VintageDivider />
        </div>
      </ScrollReveal>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, idx) => (
          <ScrollReveal key={event.id} animation="fadeUp" delay={idx * 0.2}>
            <div className="relative p-6 sm:p-8 rounded-3xl bg-cream/90 backdrop-blur-md border border-gold/40 shadow-[0_10px_30px_rgba(100,75,60,0.15)] flex flex-col items-center text-center">
              <VintageCornerFlourish position="top-left" color="#c9a86a" />
              <VintageCornerFlourish position="top-right" color="#c9a86a" />
              <VintageCornerFlourish position="bottom-left" color="#c9a86a" />
              <VintageCornerFlourish position="bottom-right" color="#c9a86a" />

              {event.badge && (
                <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-[10px] font-sans font-semibold uppercase tracking-wider mb-3">
                  {event.badge}
                </span>
              )}

              <h3 className="font-serif text-2xl sm:text-3xl text-vintage-900 font-semibold mb-4">
                {event.title}
              </h3>

              {/* Date & Time details */}
              <div className="space-y-2.5 w-full my-3 py-3 border-y border-gold/20 font-serif">
                <div className="flex items-center justify-center gap-2 text-vintage-800 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-vintage-800 text-sm sm:text-base">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>{event.time}</span>
                </div>
              </div>

              {/* Venue details */}
              <div className="my-3 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-gold mb-1" />
                <h4 className="font-serif font-semibold text-base sm:text-lg text-vintage-900">
                  {event.venue}
                </h4>
                <p className="text-xs text-vintage-700 max-w-xs mt-1 leading-relaxed font-sans">
                  {event.address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full mt-4 pt-2">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-vintage-800 hover:bg-vintage-900 text-gold-light text-xs font-serif font-medium tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <button
                  onClick={() => handleAddToCalendar(event)}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-white/80 hover:bg-white text-vintage-800 border border-gold/40 text-xs font-serif font-medium tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-gold" />
                  <span>Simpan Tanggal</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
