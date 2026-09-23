import React from 'react';
import { useI18n } from '../i18n/I18nContext';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { t } = useI18n();

  return (
    <footer className="bg-black text-stone-400 border-t border-white/10 py-12 sm:py-14">
      <div data-reveal="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center space-y-6">
        {/* Pure Typographic Identity (No graphic logo) */}
        <div className="space-y-1">
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-cinzel text-[10px] sm:text-[11.5px] uppercase tracking-[0.22em] text-stone-400 font-semibold">
              JUNIOR FRANCE MAVIE
            </span>
            <span className="author-brand-ngakosso text-2xl sm:text-3xl md:text-4xl text-[#faf7f2]">
              NGAKOSSO
            </span>
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-brand-gold font-semibold pt-0.5">
            {t('footer.role')}
          </p>
        </div>

        {/* Footer Navigation (Clean, touch-friendly) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs uppercase tracking-widest text-stone-400 font-medium pt-1">
          <button
            type="button"
            onClick={() => onNavigateSection('hero')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.home')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('livres')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.books')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('foret-interdite')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.foret')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('films')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.films')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('series')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.series')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('univers')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.universe')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('presse')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.press')}
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('contact')}
            className="min-h-[36px] py-1.5 px-2 hover:text-brand-amber active:scale-95 transition-all cursor-pointer"
          >
            {t('nav.contact')}
          </button>
        </div>

        <div className="w-full max-w-sm h-px bg-white/10 my-2"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-[11px] text-stone-500 gap-2">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.studio')}</span>
        </div>
      </div>
    </footer>
  );
};
