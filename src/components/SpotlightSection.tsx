import React, { useState } from 'react';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { useI18n } from '../i18n/I18nContext';
import { BookOpen, Tv, ArrowUpRight } from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';

interface SpotlightSectionProps {
  onContactClick?: () => void;
  onOpenDedicatedPage?: () => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  onContactClick,
  onOpenDedicatedPage,
}) => {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState<'synopsis' | 'personnages' | 'univers' | 'intention'>('synopsis');

  const characters = language === 'en' ? [
    {
      name: 'Kito Ngoma',
      role: 'Main Protagonist (17 yo)',
      desc: 'Introverted and passionate about drawing. Discovers he possesses the Meso Miviri from ancient Weavers, letting him see mystical tears in the veil.',
    },
    {
      name: 'Samba',
      role: 'Steadfast Ally',
      desc: 'Kito’s childhood friend who provides bravery and unwavering loyalty against the rising hostility of the villagers.',
    },
    {
      name: 'Mama Kito',
      role: 'Grandmother & Guardian of Lore',
      desc: 'Bearer of oral traditions and ancient rituals of spiritual protection.',
    },
    {
      name: 'Maléko',
      role: 'Sanctuary Guardian',
      desc: 'Sentinel of the sacred forest, initiated in the secret laws of the Bisengo.',
    },
    {
      name: 'Spirit Nala',
      role: 'Mystical Guide',
      desc: 'Spiritual entity born of the shattered forest guiding Kito toward mending the ancestral rift.',
    },
    {
      name: 'Ba-Mvumbi & Nganga',
      role: 'Antagonistic Forces',
      desc: 'Tormented spirits and corrupted sorcerers exploiting the breach to rule the physical realm.',
    },
  ] : [
    {
      name: 'Kito Ngoma',
      role: 'Protagoniste principal (17 ans)',
      desc: 'Introverti et passionné de dessin. Découvre qu’il possède le Meso Miviri lié aux anciens Tisseurs, lui permettant de voir les déchirures mystiques.',
    },
    {
      name: 'Samba',
      role: 'Allié indéfectible',
      desc: 'Ami d’enfance de Kito, il apporte son courage et sa loyauté face à l’hostilité grandissante des villageois.',
    },
    {
      name: 'Mama Kito',
      role: 'Grand-mère & Gardienne des savoirs',
      desc: 'Détentrice des traditions orales et des rituels de protection ancestraux.',
    },
    {
      name: 'Maléko',
      role: 'Le Gardien du Sanctuaire',
      desc: 'Sentinelle de la forêt sacrée, initié aux lois secrètes du Bisengo.',
    },
    {
      name: 'Esprit Nala',
      role: 'Guide Mystique',
      desc: 'Entité spirituelle issue de la forêt brisée guidant Kito vers la réparation du lien ancestral.',
    },
    {
      name: 'Ba-Mvumbi & Nganga',
      role: 'Forces Antagonistes',
      desc: 'Esprits tourmentés et sorciers corrompus exploitant la brèche pour dominer le monde des vivants.',
    },
  ];

  return (
    <section
      id="foret-interdite"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#090b0a] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Atmospheric ambient halos */}
      <div className="absolute -right-40 top-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] glow-sphere blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -left-40 bottom-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-950/20 blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* En-tête Badge */}
        <div data-reveal="fade-down" className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <span className="h-px w-8 sm:w-10 bg-red-500"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            {t('spotlight.badge')}
          </span>
        </div>

        {/* 1. HERO DE LA SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          {/* Affiche Officielle & Concept Art */}
          <div data-reveal="scale-in" className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-red-950/40 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative group max-w-[320px] sm:max-w-sm w-full card-premium-hover">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-700 to-amber-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border border-red-900/60 shadow-2xl bg-black">
                <CinematicImage
                  src={OFFICIAL_IMAGES.seriesForet}
                  alt={t('spotlight.title')}
                  aspectRatio="2/3"
                  objectFit="cover"
                  type="series"
                  title="La Forêt Interdite"
                  category="Série TV Prestige"
                  className="image-zoom-hover"
                  containerClassName="border-0"
                  overlay={
                    <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-red-400 block truncate">
                          {t('spotlight.overlayPrestige')}
                        </span>
                        <p className="text-xs font-semibold text-white truncate">
                          {t('spotlight.overlayEpisodes')}
                        </p>
                      </div>
                      <span className="shrink-0 px-2 sm:px-2.5 py-1 bg-red-950/90 border border-red-700/60 text-[9px] sm:text-[10px] text-red-200 font-bold rounded">
                        {t('spotlight.overlayBadge')}
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          {/* Fiche Titre & Logline */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div data-reveal="fade-up" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold">
              <span>{t('spotlight.prodBadge')}</span>
            </div>

            <h2 data-reveal="fade-up" className="delay-100 text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-tight leading-tight">
              {t('spotlight.title')}{' '}
              <span className="text-red-500 italic font-serif">{t('spotlight.titleAccent')}</span>
            </h2>

            <p data-reveal="fade-up" className="delay-150 text-base sm:text-lg text-brand-amber font-serif italic leading-relaxed">
              {t('spotlight.tagline')}
            </p>

            {/* LOGLINE OFFICIELLE */}
            <div data-reveal="fade-up" className="delay-200 p-4 sm:p-5 rounded-2xl bg-red-950/30 border border-red-900/40 text-stone-200 text-xs sm:text-sm leading-relaxed space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 block">
                {t('spotlight.loglineLabel')} :
              </span>
              <p className="text-stone-100 font-medium leading-relaxed">
                « {t('spotlight.loglineText')} »
              </p>
            </div>

            {/* SPÉCIFICATIONS TECHNIQUES DE LA SÉRIE */}
            <div data-reveal="fade-up" className="delay-250 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specType')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('spotlight.specTypeVal')}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specFormat')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('spotlight.specFormatVal')}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specStatus')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-amber">
                  {t('spotlight.specStatusVal')}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specCountry')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('spotlight.specCountryVal')}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specLanguages')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {t('spotlight.specLanguagesVal')}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 card-premium-hover">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                  {t('spotlight.specRole')}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  {t('spotlight.specRoleVal')}
                </span>
              </div>
            </div>

            {/* 2 BOUTONS D'ACTION : PAGE DÉDIÉE DE LA SÉRIE & CONTACT PRODUCTION */}
            <div data-reveal="fade-up" className="delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3 max-w-full">
              {/* Bouton Page Dédiée de la Série */}
              <CinematicButton
                variant="primary"
                size="md"
                onClick={() => {
                  if (onOpenDedicatedPage) {
                    onOpenDedicatedPage();
                  } else {
                    window.location.hash = '#foret-interdite-page';
                  }
                }}
                icon={<ArrowUpRight className="w-4 h-4 shrink-0" />}
                iconPosition="right"
                className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 text-white border-red-500/50 shadow-lg shadow-red-950/50"
              >
                {t('spotlight.viewDedicatedPage')}
              </CinematicButton>

              {/* Lien Audiovisuel (Découvrir la série / Coproduction) */}
              <CinematicButton
                variant="project"
                size="md"
                href="#contact"
                onClick={(e) => {
                  if (onContactClick) {
                    e.preventDefault();
                    onContactClick();
                  }
                }}
                icon={<Tv className="w-4 h-4 text-red-400 shrink-0" />}
                iconPosition="left"
                className="w-full sm:w-auto text-center"
              >
                {t('spotlight.discoverSeries')}
              </CinematicButton>
            </div>
          </div>
        </div>

        {/* 2. ONGLETS D'EXPLORATION APPROFONDIE : SYNOPSIS, PERSONNAGES, UNIVERS, INTENTION */}
        <div data-reveal="fade-up" className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-md space-y-6">
          {/* Menu d'onglets */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'synopsis'}
              onClick={() => setActiveTab('synopsis')}
            >
              {language === 'en' ? 'Synopsis' : 'Synopsis'}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'personnages'}
              onClick={() => setActiveTab('personnages')}
            >
              {language === 'en' ? 'Characters' : 'Personnages'}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'univers'}
              onClick={() => setActiveTab('univers')}
            >
              {language === 'en' ? 'Universe & Bisengo' : 'Univers & Bisengo'}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'intention'}
              onClick={() => setActiveTab('intention')}
            >
              {language === 'en' ? 'Artistic Statement' : 'Intention Artistique'}
            </CinematicButton>
          </div>

          {/* Contenu de l'onglet actif */}
          <div>
            {activeTab === 'synopsis' && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {t('spotlight.synopsisLabel')}
                </h4>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {t('spotlight.synopsisText')}
                </p>
              </div>
            )}

            {activeTab === 'personnages' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                {characters.map((char) => (
                  <div
                    key={char.name}
                    className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5 card-premium-hover"
                  >
                    <h5 className="font-cinzel font-bold text-white text-base">{char.name}</h5>
                    <span className="text-[11px] font-semibold text-brand-amber block uppercase tracking-wider">
                      {char.role}
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed pt-1">
                      {char.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'univers' && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {t('spotlight.universeLabel')}
                </h4>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {t('spotlight.universeText')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                    <strong className="text-red-400 block font-cinzel text-sm mb-1">
                      {language === 'en' ? 'The Bisengo' : 'Le Bisengo'}
                    </strong>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {language === 'en'
                        ? 'Sacred life force and ancestral spiritual balance separating the living realm from protector spirits.'
                        : 'Force sacrée et lien ancestral d’équilibre spirituel séparant le monde des vivants de celui des esprits protecteurs.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-red-900/30">
                    <strong className="text-brand-amber block font-cinzel text-sm mb-1">
                      {language === 'en' ? 'The Meso Miviri' : 'Le Meso Miviri'}
                    </strong>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {language === 'en'
                        ? 'Extremely rare mystical vision from ancient Weavers, perceiving invisible weaves and occult wounds of the land.'
                        : 'Don mystique rarissime des anciens Tisseurs, permettant de percevoir la trame invisible et les blessures occultes de la terre.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'intention' && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {t('spotlight.intentionLabel')}
                </h4>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {t('spotlight.intentionText')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
