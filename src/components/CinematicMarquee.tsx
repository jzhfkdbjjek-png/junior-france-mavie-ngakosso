import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export const CinematicMarquee: React.FC = () => {
  const { language } = useI18n();
  const isEn = language === 'en';

  const items = isEn
    ? [
        'AUTHOR',
        'CREATOR',
        'SCREENWRITER',
        'NOVELIST',
        'BOOKS',
        'SERIES',
        'SCREENPLAYS',
        'CINEMA',
      ]
    : [
        'AUTEUR',
        'CRÉATEUR',
        'SCÉNARISTE',
        'ÉCRIVAIN',
        'LIVRES',
        'SÉRIES',
        'SCÉNARIOS',
        'CINÉMA',
      ];

  // Repeat sequence 4 times in each loop half to guarantee seamless overflow even on 4K displays
  const sequence = Array(4).fill(items).flat();

  return (
    <div
      role="region"
      aria-label={isEn ? 'Creative Disciplines & Identity' : 'Disciplines créatives et identité'}
      className="marquee-container relative w-full overflow-hidden bg-[#0c0e0d] border-y border-white/5 py-3 sm:py-3.5 select-none transition-colors duration-300"
    >
      {/* Subtle Top & Bottom Gold Filigree Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent pointer-events-none" />

      {/* Atmospheric Soft Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/[0.02] to-transparent pointer-events-none" />

      {/* Cinematic Vignette Fade Left & Right */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#0b0d0c] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#0b0d0c] to-transparent pointer-events-none z-10" />

      {/* Marquee Continuous Sliding Track */}
      <div className="animate-marquee-scroll flex items-center whitespace-nowrap">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {sequence.map((item, index) => (
            <span
              key={`set1-${index}`}
              className="inline-flex items-center text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] font-cinzel font-semibold tracking-[0.26em] text-stone-300 uppercase transition-colors hover:text-white"
            >
              <span>{item}</span>
              <span className="mx-3.5 sm:mx-5 md:mx-6 text-brand-gold/60 text-xs sm:text-sm font-light select-none">
                •
              </span>
            </span>
          ))}
        </div>

        {/* Set 2 (Identical Clone for Flawless Infinite Loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {sequence.map((item, index) => (
            <span
              key={`set2-${index}`}
              className="inline-flex items-center text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] font-cinzel font-semibold tracking-[0.26em] text-stone-300 uppercase transition-colors hover:text-white"
            >
              <span>{item}</span>
              <span className="mx-3.5 sm:mx-5 md:mx-6 text-brand-gold/60 text-xs sm:text-sm font-light select-none">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
