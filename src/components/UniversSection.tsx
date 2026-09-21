import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { BookOpen, Film, Tv } from 'lucide-react';

export const UniversSection: React.FC = () => {
  const { t, language } = useI18n();

  return (
    <section
      id="univers"
      className="py-16 sm:py-20 lg:py-24 bg-[#121413] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Colonne Biographie Officielle */}
          <div data-reveal="fade-up" className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t('about.badge')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
              {t('about.title')}{' '}
              <span className="font-serif italic font-normal text-brand-amber">
                {t('about.titleAccent')}
              </span>
            </h2>

            {/* Texte Officiel Exclusif */}
            <div className="space-y-3.5 text-stone-200 text-sm sm:text-base leading-relaxed bg-black/40 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-sm backdrop-blur-sm">
              <p className="font-semibold text-white text-base sm:text-lg">
                {t('about.p1')}
              </p>
              <p className="text-stone-300">
                {t('about.p2')}
              </p>
              <p className="text-stone-300">
                {t('about.p3')}
              </p>
            </div>

            {/* Badges d'expertise */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
                <BookOpen className="w-3.5 h-3.5 text-brand-amber" />
                {language === 'en' ? 'Novelist & Author' : 'Écrivain & Auteur'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
                <Film className="w-3.5 h-3.5 text-brand-amber" />
                {language === 'en' ? 'Screenwriter' : 'Scénariste Cinéma'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-stone-200">
                <Tv className="w-3.5 h-3.5 text-brand-amber" />
                {language === 'en' ? 'Series Creator & Showrunner' : 'Créateur de Séries & Showrunner'}
              </span>
            </div>
          </div>

          {/* Colonne Piliers Artistiques & Visuel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div
                data-reveal="fade-up"
                className="delay-100 p-5 rounded-2xl bg-[#181b1a] border border-white/10 space-y-2 hover:border-brand-gold/50 card-premium-hover transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-brand-amber text-base">✦</span>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    {t('about.card1Title')}
                  </h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {t('about.card1Desc')}
                </p>
              </div>

              <div
                data-reveal="fade-up"
                className="delay-200 p-5 rounded-2xl bg-[#181b1a] border border-white/10 space-y-2 hover:border-brand-gold/50 card-premium-hover transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-brand-amber text-base">☩</span>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    {t('about.card2Title')}
                  </h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {t('about.card2Desc')}
                </p>
              </div>

              <div
                data-reveal="fade-up"
                className="delay-300 p-5 rounded-2xl bg-[#181b1a] border border-white/10 space-y-2 hover:border-brand-gold/50 card-premium-hover transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-brand-amber text-base">◈</span>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    {t('about.card3Title')}
                  </h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {t('about.card3Desc')}
                </p>
              </div>

              <div
                data-reveal="fade-up"
                className="delay-400 p-5 rounded-2xl bg-[#181b1a] border border-white/10 space-y-2 hover:border-brand-gold/50 card-premium-hover transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-brand-amber text-base">❖</span>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    {t('about.card4Title')}
                  </h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {t('about.card4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
