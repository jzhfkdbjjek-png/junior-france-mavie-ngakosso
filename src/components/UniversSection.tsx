import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Globe, Compass, BookOpen, Film, Tv } from 'lucide-react';

export const UniversSection: React.FC = () => {
  const { t, language } = useI18n();

  const isEn = language === 'en';

  const creativeCoreGenres = [
    { label: isEn ? 'Thriller' : 'Thriller', highlight: true },
    { label: isEn ? 'Fantasy' : 'Fantastique', highlight: true },
    { label: isEn ? 'Supernatural' : 'Surnaturel', highlight: true },
    { label: isEn ? 'Mystery' : 'Mystère', highlight: true },
    { label: isEn ? 'Drama' : 'Drame', highlight: true },
    { label: isEn ? 'Action' : 'Action', highlight: true },
    { label: isEn ? 'Social Drama' : 'Récits sociaux', highlight: true },
  ];

  const extendedGenres = [
    { label: isEn ? 'Psychological' : 'Psychologique' },
    { label: isEn ? 'Horror' : 'Horreur' },
    { label: isEn ? 'Coming-of-Age' : 'Initiatique' },
    { label: isEn ? 'Political Thriller' : 'Thriller politique' },
    { label: isEn ? 'International Fiction' : 'Fiction internationale' },
  ];

  return (
    <section
      id="univers"
      className="py-14 sm:py-20 lg:py-24 bg-[#121413] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-16">
        {/* Section Header & Central Manifesto */}
        <div data-reveal="fade-up" className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 text-brand-amber" />
            <span>{isEn ? 'CREATIVE UNIVERSE' : 'UNIVERS CRÉATIF'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight">
            <span>{t('about.title')}{' '}</span>
            <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t('about.titleAccent')}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg font-serif italic text-stone-200 leading-relaxed max-w-3xl mx-auto border-y border-brand-gold/20 py-3.5 px-2">
            {t('about.introQuote')}
          </p>
        </div>

        {/* PROMINENT CREATIVE PILLARS RIBBON: Thriller • Fantastique • Surnaturel • Mystère • Drame • Action • Récits sociaux */}
        <div
          data-reveal="fade-up"
          className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171a19] via-[#1c201e] to-[#171a19] border border-brand-gold/30 shadow-xl text-center space-y-3"
        >
          <div className="flex items-center justify-center text-[10px] sm:text-xs uppercase font-bold tracking-widest text-brand-amber">
            <span>{isEn ? 'CORE NARRATIVE SPECTRUM' : 'UNIVERS CRÉATIF — PILIERS NARRATIFS'}</span>
          </div>

          {/* Progressive reveal words (Mobile First, large readable cards) */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 pt-1">
            {creativeCoreGenres.map((g, idx) => (
              <div
                key={idx}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-stone-100 font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-200 hover:bg-brand-gold hover:text-stone-950 active:scale-95 cursor-default shadow-xs"
              >
                {g.label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2 text-[11px] text-stone-400">
            <span className="text-stone-500">{isEn ? 'Also exploring:' : 'Extensions narratives :'}</span>
            {extendedGenres.map((eg, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-stone-300">
                {eg.label}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Dimension Pillars: Afrique / International / Genres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Dimension 1: Ancrage Africain & Congolais */}
          <div
            data-reveal="fade-up"
            className="p-5 sm:p-7 rounded-2xl bg-[#181b1a] border border-white/10 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-amber">
                {isEn ? '01 • CULTURAL ANCHOR' : '01 • ANCRAGE CULTUREL'}
              </span>
              <h3 className="font-cinzel text-base sm:text-xl font-bold text-white">
                {t('about.identityAfrica')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('about.identityAfricaDesc')}
              </p>
            </div>
            <div className="pt-3.5 border-t border-white/10">
              <span className="text-[11px] font-semibold text-stone-400">
                {isEn ? 'Brazzaville • Pool • Central Africa' : 'Brazzaville • Pool • Afrique Centrale'}
              </span>
            </div>
          </div>

          {/* Dimension 2: Rayonnement International */}
          <div
            data-reveal="fade-up"
            className="delay-100 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1b1f1d] to-[#141716] border border-brand-gold/30 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold">
                  {isEn ? '02 • GLOBAL SCOPE' : '02 • RAYONNEMENT MONDIAL'}
                </span>
                <Globe className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-cinzel text-base sm:text-xl font-bold text-white">
                {t('about.identityInternational')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {t('about.identityInternationalDesc')}
              </p>
            </div>
            <div className="pt-3.5 border-t border-brand-gold/20">
              <span className="text-[11px] font-semibold text-brand-amber">
                {isEn ? 'VOD Platforms • International Broadcasters' : 'Plateformes VOD • Diffuseurs Internationaux'}
              </span>
            </div>
          </div>

          {/* Dimension 3: Pluralité des Formats */}
          <div
            data-reveal="fade-up"
            className="delay-200 p-5 sm:p-7 rounded-2xl bg-[#181b1a] border border-white/10 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">
                {isEn ? '03 • NARRATIVE DIVERSITY' : '03 • DIVERSITÉ DE FORMATS'}
              </span>
              <h3 className="font-cinzel text-base sm:text-xl font-bold text-white">
                {t('about.identityMultiverse')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('about.identityMultiverseDesc')}
              </p>
            </div>
            <div className="pt-3.5 border-t border-white/10">
              <span className="text-[11px] font-semibold text-stone-400">
                {isEn ? 'Novels • Feature Films • TV Series' : 'Romans • Longs-Métrages • Séries TV'}
              </span>
            </div>
          </div>
        </div>

        {/* Roles & Profession Badges Footer */}
        <div data-reveal="fade-up" className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-brand-amber font-bold block">
              {isEn ? 'AUTHOR • CREATOR • SCREENWRITER' : 'AUTEUR • CRÉATEUR • SCÉNARISTE'}
            </span>
            <p className="font-cinzel text-sm sm:text-base font-bold text-white">
              Junior France Mavie NGAKOSSO
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
              <BookOpen className="w-3.5 h-3.5 text-brand-amber" />
              {isEn ? 'Novelist & Author' : 'Écrivain & Auteur'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
              <Film className="w-3.5 h-3.5 text-brand-amber" />
              {isEn ? 'Screenwriter' : 'Scénariste Cinéma'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
              <Tv className="w-3.5 h-3.5 text-brand-amber" />
              {isEn ? 'Series Creator' : 'Créateur de Séries'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
