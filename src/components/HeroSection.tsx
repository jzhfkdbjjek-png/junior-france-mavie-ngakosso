import React from 'react';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { useI18n } from '../i18n/I18nContext';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';
import { ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreWorks: () => void;
  onContactClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  hasLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWorks,
  onContactClick,
  onNavigateSection,
  hasLoaded = true,
}) => {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden film-grain"
    >
      {/* Background Cinematic Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] glow-warm blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-[260px] sm:w-[400px] lg:w-[500px] h-[260px] sm:h-[400px] lg:h-[500px] glow-sphere blur-3xl opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0c]/80 dark:from-[#0b0d0c] light:from-[#f8f6f0] via-transparent to-black/40 dark:to-black/70 light:to-white/40"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
          {/* Left Column: Monumental Typography */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5 order-2 lg:order-1">
            {/* Badges */}
            <div className={`flex flex-wrap items-center gap-2 ${hasLoaded ? 'animate-hero-title' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-200/80 dark:bg-white/5 border border-stone-300 dark:border-brand-gold/30 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-stone-800 dark:text-[#f2ede4] font-bold">
                  {t('hero.studioBadge')}
                </span>
              </div>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-brand-gold/15 text-[#8c6738] dark:text-brand-amber text-[9px] sm:text-[10px] uppercase font-bold tracking-widest border border-brand-gold/25">
                {t('hero.coprodBadge')}
              </span>
            </div>

            {/* Main Headline & Typographic Identity */}
            <h1
              className={`flex flex-col items-start leading-[1.05] ${
                hasLoaded ? 'animate-hero-title' : 'opacity-0'
              }`}
            >
              <span className="block text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-[#8c6738] dark:text-brand-amber mb-2">
                {t('hero.roleSubtitle')}
              </span>
              <span className="font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-[0.06em] text-stone-800 dark:text-stone-300 uppercase leading-snug break-words">
                JUNIOR FRANCE MAVIE
              </span>
              <span className="author-brand-ngakosso text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[92px] mt-1 sm:mt-1.5 break-words select-none">
                NGAKOSSO
              </span>
            </h1>

            {/* Subtitle & Key Identity Formula */}
            <div
              className={`space-y-1.5 border-l-2 border-brand-gold/60 pl-3.5 sm:pl-4 py-1 ${
                hasLoaded ? 'animate-hero-subtitle' : 'opacity-0'
              }`}
            >
              <p className="text-sm sm:text-base md:text-lg font-cinzel font-bold text-stone-900 dark:text-white leading-snug">
                {t('hero.authorFormula')}
              </p>
              <p className="text-sm sm:text-base font-serif italic text-stone-700 dark:text-stone-300">
                {t('hero.authorSubFormula')}
              </p>
            </div>

            {/* Description / Bio */}
            <p
              className={`text-sm sm:text-base text-stone-700 dark:text-stone-300 font-normal max-w-xl leading-relaxed ${
                hasLoaded ? 'animate-hero-description' : 'opacity-0'
              }`}
            >
              {t('hero.bio')}
            </p>

            {/* Action Buttons */}
            <div
              className={`w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 ${
                hasLoaded ? 'animate-hero-buttons' : 'opacity-0'
              }`}
            >
              <CinematicButton
                id="hero-explore-cta"
                variant="primary"
                size="lg"
                href="#livres"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreWorks();
                }}
                icon={<ArrowUpRight className="w-4 h-4 shrink-0" />}
                iconPosition="right"
                className="w-full sm:w-auto text-center"
              >
                {t('hero.exploreBtn')}
              </CinematicButton>

              <CinematicButton
                id="hero-collaborate-cta"
                variant="secondary"
                size="lg"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onContactClick();
                }}
                icon={<ArrowUpRight className="w-3.5 h-3.5 text-brand-gold shrink-0" />}
                iconPosition="right"
                className="w-full sm:w-auto text-center"
              >
                {t('hero.collaborateBtn')}
              </CinematicButton>
            </div>

            {/* Scroll to Discover Indicator */}
            <div
              className={`pt-2 flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 ${
                hasLoaded ? 'animate-hero-buttons' : 'opacity-0'
              }`}
            >
              <span className="w-6 sm:w-8 h-px bg-brand-gold/60"></span>
              <span>{t('hero.scrollDiscover')}</span>
              <span className="text-brand-amber animate-bounce">↓</span>
            </div>
          </div>

          {/* Right Column: Exact, Unaltered Official Portrait (Progressive 1200-1600ms Cinematic Reveal) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 animate-hero-portrait">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Background Glow */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-brand-bronze/40 via-brand-amber/25 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none"></div>
              
              {/* Strict Image Frame (Aspect 4:5 with top-anchored framing) */}
              <div className="relative aspect-[4/5] w-full max-h-[420px] sm:max-h-[500px] lg:max-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-300 dark:border-white/15 bg-stone-900 shadow-2xl group">
                <img
                  id="hero-portrait-image"
                  src={OFFICIAL_IMAGES.portrait}
                  alt={t('hero.photoBadgeName') || 'Junior France Mavie NGAKOSSO'}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Seamless Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

                {/* Official Author Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between gap-2 shadow-lg z-10">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">
                      {t('hero.photoBadgeName')}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-brand-gold uppercase tracking-widest truncate">
                      {t('hero.photoBadgeLocation')}
                    </p>
                  </div>
                  <span className="shrink-0 px-2 sm:px-2.5 py-1 bg-brand-gold/20 border border-brand-gold/40 text-brand-amber text-[9px] sm:text-[10px] font-bold uppercase rounded-full">
                    {t('hero.photoBadgeAuthor')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3 Hero Modules (Staggered progressive reveal, 1 col mobile, 3 col tablet/desktop) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 mt-6 sm:mt-8">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 ${
          hasLoaded ? 'animate-hero-cards' : 'opacity-0'
        }`}>
          {/* Block 01: NOVELIST */}
          <a
            id="hero-block-books"
            href="#livres"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('livres');
            }}
            className="group bg-white dark:bg-white text-stone-900 p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xl card-premium-hover flex flex-col justify-between min-h-[170px] sm:min-h-[190px] cursor-pointer border border-stone-200"
          >
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-black/10">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#8c6738]">
                  {t('hero.block1Number')}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-stone-500">{t('hero.block1Category')}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-stone-900 mt-2.5 group-hover:text-[#8c6738] transition-colors">
                {t('hero.block1Title')}
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 font-normal leading-relaxed">
                {t('hero.block1Desc')}
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-900 underline underline-offset-4 group-hover:text-[#8c6738]">
                {t('hero.block1Cta')}
              </span>
              <span className="text-base group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </div>
          </a>

          {/* Block 02: SCREENWRITER */}
          <a
            id="hero-block-films"
            href="#films"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('films');
            }}
            className="group bg-stone-900 dark:bg-[#181b1a] text-white p-5 sm:p-6 lg:p-7 rounded-2xl border border-stone-800 dark:border-white/10 shadow-xl card-premium-hover flex flex-col justify-between min-h-[170px] sm:min-h-[190px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-brand-amber">
                  {t('hero.block2Number')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-brand-gold/20 text-brand-amber">
                  {t('hero.block2Category')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white mt-2.5 group-hover:text-brand-amber transition-colors">
                {t('hero.block2Title')}
              </h3>
              <p className="text-xs text-stone-300 mt-1.5 font-normal leading-relaxed">
                {t('hero.block2Desc')}
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold group-hover:underline underline-offset-4">
                {t('hero.block2Cta')}
              </span>
              <span className="text-brand-gold text-base group-hover:translate-x-1.5 transition-transform duration-300">
                ↗
              </span>
            </div>
          </a>

          {/* Block 03: CREATOR */}
          <a
            id="hero-block-series"
            href="#series"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('series');
            }}
            className="group bg-gradient-to-br from-[#d89b4f] via-[#c59b63] to-[#8c6738] text-black p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xl card-premium-hover flex flex-col justify-between min-h-[170px] sm:min-h-[190px] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-black/15">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black">
                  {t('hero.block3Number')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-black/80">{t('hero.block3Category')}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-black mt-2.5">
                {t('hero.block3Title')}
              </h3>
              <p className="text-xs text-black/85 mt-1.5 font-medium leading-relaxed">
                {t('hero.block3Desc')}
              </p>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black underline underline-offset-4">
                {t('hero.block3Cta')}
              </span>
              <span className="text-base group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
