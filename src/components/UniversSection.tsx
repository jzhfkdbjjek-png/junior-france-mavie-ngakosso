import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Globe, Compass, BookOpen, Film, Tv } from 'lucide-react';

export const UniversSection: React.FC = () => {
  const { t, language } = useI18n();

  const isEn = language === 'en';

  const genresList = [
    { label: isEn ? 'Thriller' : 'Thriller' },
    { label: isEn ? 'Fantasy' : 'Fantastique' },
    { label: isEn ? 'Supernatural' : 'Surnaturel' },
    { label: isEn ? 'Mystery' : 'Mystère' },
    { label: isEn ? 'Drama' : 'Drame' },
    { label: isEn ? 'Action' : 'Action' },
    { label: isEn ? 'Horror' : 'Horreur' },
    { label: isEn ? 'Comedy' : 'Comédie' },
    { label: isEn ? 'Social Drama' : 'Drame social' },
    { label: isEn ? 'Crime' : 'Crime' },
    { label: isEn ? 'Psychological' : 'Psychologique' },
    { label: isEn ? 'Coming-of-Age' : 'Initiatique' },
    { label: isEn ? 'Political' : 'Politique' },
    { label: isEn ? 'International Fiction' : 'Fiction internationale' },
  ];

  return (
    <section
      id="univers"
      className="py-16 sm:py-20 lg:py-24 bg-[#121413] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
        {/* Section Header & Central Manifesto */}
        <div data-reveal="fade-up" className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5 text-brand-amber" />
            <span>{t('about.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight">
            <span>{t('about.title')}{' '}</span>
            <span className="author-brand-ngakosso text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t('about.titleAccent')}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-serif italic text-stone-200 leading-relaxed max-w-3xl mx-auto border-y border-brand-gold/20 py-4 px-2">
            {t('about.introQuote')}
          </p>
        </div>

        {/* 3 Dimension Pillars: Afrique / International / Genres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Dimension 1: Ancrage Africain & Congolais */}
          <div
            data-reveal="fade-up"
            className="p-6 sm:p-7 rounded-2xl bg-[#181b1a] border border-white/10 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-amber">
                {isEn ? '01 • CULTURAL ANCHOR' : '01 • ANCRAGE CULTUREL'}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {t('about.identityAfrica')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('about.identityAfricaDesc')}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-semibold text-stone-400">
                {isEn ? 'Brazzaville • Pool • Central Africa' : 'Brazzaville • Pool • Afrique Centrale'}
              </span>
            </div>
          </div>

          {/* Dimension 2: Rayonnement International */}
          <div
            data-reveal="fade-up"
            className="delay-100 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1b1f1d] to-[#141716] border border-brand-gold/30 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold">
                  {isEn ? '02 • GLOBAL SCOPE' : '02 • RAYONNEMENT MONDIAL'}
                </span>
                <Globe className="w-4 h-4 text-brand-gold" />
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {t('about.identityInternational')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {t('about.identityInternationalDesc')}
              </p>
            </div>
            <div className="pt-4 border-t border-brand-gold/20">
              <span className="text-[11px] font-semibold text-brand-amber">
                {isEn ? 'VOD Platforms • International Broadcasters' : 'Plateformes VOD • Diffuseurs Internationaux'}
              </span>
            </div>
          </div>

          {/* Dimension 3: Pluralité des Genres */}
          <div
            data-reveal="fade-up"
            className="delay-200 p-6 sm:p-7 rounded-2xl bg-[#181b1a] border border-white/10 space-y-3 shadow-lg card-premium-hover flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400">
                {isEn ? '03 • NARRATIVE DIVERSITY' : '03 • DIVERSITÉ NARRATIVE'}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {t('about.identityMultiverse')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('about.identityMultiverseDesc')}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-semibold text-stone-400">
                {isEn ? 'Novels • Feature Films • TV Series' : 'Romans • Longs-Métrages • Séries TV'}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Genres & Realms Grid */}
        <div data-reveal="fade-up" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold block">
                {isEn ? 'EXPLORATION OF GENRES' : 'EXPLORATION DES GENRES'}
              </span>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mt-1">
                {t('about.pillarsTitle')}
              </h3>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              {isEn
                ? 'Stories traveling freely between psychological depth and high-stakes drama.'
                : 'Des récits qui voyagent librement entre profondeur psychologique et haute tension dramatique.'}
            </p>
          </div>

          {/* Editorial Genre Chips */}
          <div className="flex flex-wrap gap-2">
            {genresList.map((g, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-brand-gold/15 border border-white/10 hover:border-brand-gold/40 text-xs font-medium text-stone-300 hover:text-white transition-all cursor-default"
              >
                {g.label}
              </span>
            ))}
          </div>

          {/* 4 Detail Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 rounded-2xl bg-[#151817] border border-white/10 space-y-2 card-premium-hover">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-brand-gold">
                {t('about.card1Title')}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('about.card1Desc')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151817] border border-white/10 space-y-2 card-premium-hover">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-brand-gold">
                {t('about.card2Title')}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('about.card2Desc')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151817] border border-white/10 space-y-2 card-premium-hover">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-brand-gold">
                {t('about.card3Title')}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('about.card3Desc')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#151817] border border-white/10 space-y-2 card-premium-hover">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-brand-gold">
                {t('about.card4Title')}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('about.card4Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Roles & Profession Badges Footer */}
        <div data-reveal="fade-up" className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
              {isEn ? 'AUTHOR • CREATOR • SCREENWRITER' : 'AUTEUR • CRÉATEUR • SCÉNARISTE'}
            </span>
            <p className="font-cinzel text-sm sm:text-base font-bold text-white">
              Junior France Mavie NGAKOSSO
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
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
              {isEn ? 'Series Creator & Showrunner' : 'Créateur de Séries & Showrunner'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

