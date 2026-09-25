import React, { useState } from 'react';
import { OFFICIAL_IMAGES, getSeriesData } from '../data/portfolioData';
import { SeriesItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { Tv, ArrowUpRight, MapPin, X, ExternalLink, Sparkles, Film } from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';
import { ExpandableText } from './ExpandableText';

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
  const [selectedSeries, setSelectedSeries] = useState<SeriesItem | null>(null);

  const seriesData = getSeriesData(language);
  const foretSeries = seriesData.find((s) => s.id === 'serie-foret-interdite') || seriesData[0];
  const otherSeries = seriesData.filter((s) => s.id !== 'serie-foret-interdite');

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
      {/* Anchor point for `#series` link */}
      <div id="series" className="absolute -top-16 left-0 pointer-events-none" />

      {/* Atmospheric ambient halos */}
      <div className="absolute -right-40 top-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] glow-sphere blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -left-40 bottom-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-950/20 blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* En-tête Badge — Titre Exigé */}
        <div data-reveal="fade-down" className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
            <span className="h-px w-8 sm:w-10 bg-red-500"></span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 flex items-center gap-1.5">
              <span className="sparkle-slow-spin text-red-400 text-[10px] select-none" aria-hidden="true">✦</span>
              <span>{t('spotlight.badge')}</span>
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              PRÉSENTATION APPROFONDIE •{' '}
              <span className="text-brand-amber font-serif italic font-normal">
                SÉRIES TÉLÉVISÉES
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              {language === 'en'
                ? 'Original series concepts, bibles, and showrunner universes designed for international broadcast and streaming platforms.'
                : 'Bibles littéraires, arches narratives et conceptions originales de séries pour diffuseurs et plateformes de streaming.'}
            </p>
          </div>
        </div>

        {/* 1. ÉVÉNEMENT PHARE : MISE EN AVANT DE LA FORÊT INTERDITE */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-b from-red-950/30 via-[#121413] to-[#121413] border border-red-900/40 shadow-2xl mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Affiche Officielle 2:3 Grande à gauche */}
            <div data-reveal="scale-in" className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-red-950/50 blur-3xl rounded-full pointer-events-none"></div>
              <div className="relative group max-w-[320px] sm:max-w-sm w-full card-premium-hover cursor-pointer"
                onClick={() => setSelectedSeries(foretSeries)}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-700 to-amber-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-red-900/60 shadow-2xl bg-black">
                  <CinematicImage
                    src={OFFICIAL_IMAGES.seriesForet}
                    srcSm={foretSeries.imageSm}
                    alt={t('spotlight.title')}
                    aspectRatio="2/3"
                    objectFit="cover"
                    type="series"
                    title="La Forêt Interdite"
                    category="Série TV Prestige"
                    className="transition-transform duration-700 group-hover:scale-105"
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
                        <span className="shrink-0 px-2 sm:px-2.5 py-1 bg-red-950/90 border border-red-700/60 text-[9px] sm:text-[10px] text-red-200 font-bold rounded shadow">
                          {t('spotlight.overlayBadge')}
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Fiche Titre & Contenu à droite */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div data-reveal="fade-up" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>{t('spotlight.prodBadge')}</span>
              </div>

              <h3 data-reveal="fade-up" className="delay-100 text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight leading-tight">
                {t('spotlight.title')}{' '}
                <span className="text-red-500 italic font-serif">{t('spotlight.titleAccent')}</span>
              </h3>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-red-950/80 border border-red-800/50 text-red-200 font-bold tracking-wider">
                  8 × 52 MINUTES
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300">
                  {language === 'en' ? 'Supernatural Thriller • Mystical • Action • Drama' : 'Thriller surnaturel • Mystique • Action • Drame'}
                </span>
              </div>

              <div className="pt-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">
                  {language === 'en' ? 'Creator / Screenwriter:' : 'Créateur / Scénariste :'}
                </span>
                <p className="text-sm font-bold text-brand-amber font-cinzel">
                  JUNIOR FRANCE MAVIE NGAKOSSO
                </p>
              </div>

              {/* LOGLINE OFFICIELLE */}
              <div data-reveal="fade-up" className="delay-200 p-4 sm:p-5 rounded-2xl bg-red-950/40 border border-red-900/50 text-stone-200 text-xs sm:text-sm leading-relaxed space-y-2 shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 block">
                  {t('spotlight.loglineLabel')} :
                </span>
                <p className="text-stone-100 font-medium leading-relaxed italic">
                  « {t('spotlight.loglineText')} »
                </p>
              </div>

              {/* Boutons d'action */}
              <div data-reveal="fade-up" className="delay-300 flex flex-wrap items-center gap-3 pt-2">
                <CinematicButton
                  variant="primary"
                  size="md"
                  onClick={() => setSelectedSeries(foretSeries)}
                  icon={<ArrowUpRight className="w-4 h-4 shrink-0" />}
                  iconPosition="right"
                  className="bg-red-600 hover:bg-red-700 text-white border-red-500/50 shadow-lg shadow-red-950/50"
                >
                  {language === 'en' ? 'READ MORE / DOSSIER' : 'LIRE PLUS'}
                </CinematicButton>

                <CinematicButton
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    if (onOpenDedicatedPage) {
                      onOpenDedicatedPage();
                    } else {
                      window.location.hash = '#foret-interdite-page';
                    }
                  }}
                  icon={<ExternalLink className="w-4 h-4 text-stone-300" />}
                  iconPosition="right"
                >
                  {t('spotlight.viewDedicatedPage')}
                </CinematicButton>

                <CinematicButton
                  variant="ghost"
                  size="md"
                  href="#contact"
                  onClick={(e) => {
                    if (onContactClick) {
                      e.preventDefault();
                      onContactClick();
                    }
                  }}
                  icon={<Tv className="w-4 h-4 text-red-400" />}
                  iconPosition="left"
                >
                  {t('spotlight.discoverSeries')}
                </CinematicButton>
              </div>
            </div>
          </div>

          {/* Onglets d'exploration : Synopsis, Personnages, Univers, Intention */}
          <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
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

            <div>
              {activeTab === 'synopsis' && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="font-cinzel text-lg font-bold text-white">
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
                  <h4 className="font-cinzel text-lg font-bold text-white">
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
                  <h4 className="font-cinzel text-lg font-bold text-white">
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

        {/* 2. CATALOGUE DES AUTRES SÉRIES TÉLÉVISÉES AVEC AFFICHES UNIQUES */}
        <div className="space-y-6">
          <div data-reveal="fade-up" className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                CATALOGUE DE SÉRIES EN DÉVELOPPEMENT & FINALISÉES
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                UNIVERS NARRATIFS & PROJETS AUDIOVISUELS
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-stone-400 px-2.5 py-1 rounded bg-white/5 border border-white/10">
              {otherSeries.length} Séries
            </span>
          </div>

          {/* Grille des cartes de séries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherSeries.map((series) => (
              <div
                key={series.id}
                data-reveal="fade-up"
                className="p-5 sm:p-6 rounded-2xl bg-[#181b1a] border border-white/10 hover:border-brand-gold/60 transition-all flex flex-col justify-between group shadow-lg card-premium-hover"
              >
                <div>
                  {/* 1. AFFICHE CINÉMATOGRAPHIQUE 2:3 */}
                  <div
                    className="relative aspect-[2/3] w-full max-h-[380px] overflow-hidden rounded-xl bg-black/50 border border-white/10 mb-4 cursor-pointer group/poster shadow-md"
                    onClick={() => setSelectedSeries(series)}
                  >
                    {series.image && (
                      <CinematicImage
                        src={series.image}
                        srcSm={series.imageSm}
                        alt={series.title}
                        aspectRatio="2/3"
                        objectFit="cover"
                        type="series"
                        title={series.title}
                        category={series.genre}
                        className="transition-transform duration-700 ease-out group-hover/poster:scale-105"
                        containerClassName="border-0"
                        overlay={
                          <>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#181b1a] via-transparent to-black/30 pointer-events-none" />
                            
                            {/* Format & Type Top Badge */}
                            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-brand-amber border border-brand-gold/30 backdrop-blur-md shadow-md">
                                <Tv className="w-3 h-3 text-brand-gold" />
                                <span>{series.format}</span>
                              </span>
                            </div>

                            {/* Hover Action Indicator */}
                            <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 z-10">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-brand-gold text-black shadow-lg">
                                {language === 'en' ? 'View Dossier' : 'Lire Plus'}
                                <ArrowUpRight className="w-3 h-3" />
                              </span>
                            </div>
                          </>
                        }
                      />
                    )}
                  </div>

                  {/* 2. TITRE */}
                  <h4
                    className="text-lg sm:text-xl font-cinzel font-bold text-white group-hover:text-brand-amber transition-colors cursor-pointer"
                    onClick={() => setSelectedSeries(series)}
                  >
                    {series.title}
                  </h4>

                  {/* 3. FORMAT & 4. GENRE */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded bg-brand-gold/15 text-brand-amber border border-brand-gold/30 text-[10px] font-bold uppercase tracking-wider">
                      {series.format}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      {series.genre}
                    </span>
                  </div>

                  {/* 5. LIEU */}
                  {series.location && (
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mt-2.5">
                      <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                      <span className="truncate">{series.location}</span>
                    </div>
                  )}

                  {/* 6. LOGLINE OFFICIELLE */}
                  <div className="mt-3.5 p-3 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold block mb-1">
                      LOGLINE OFFICIELLE :
                    </span>
                    <div className="text-xs text-stone-300 italic leading-relaxed">
                      <ExpandableText text={series.logline} maxChars={120} />
                    </div>
                  </div>
                </div>

                {/* 7. STATUT & 8. LIRE PLUS */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-medium text-stone-400">
                    {series.status}
                  </span>

                  <CinematicButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedSeries(series)}
                    icon={<ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />}
                    iconPosition="right"
                  >
                    {language === 'en' ? 'Read More' : 'LIRE PLUS'}
                  </CinematicButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALE DÉTAILLÉE « LIRE PLUS » POUR CHAQUE SÉRIE */}
      {selectedSeries && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedSeries(null)}
        >
          <div
            className="bg-[#181b1a] rounded-2xl w-full max-w-4xl p-5 sm:p-7 border border-white/15 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-brand-amber/20 text-brand-amber rounded">
                    {selectedSeries.type}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {selectedSeries.genre}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedSeries.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSeries(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer transition-colors"
                aria-label={t('books.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Image à gauche + Informations & Synopsis à droite */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Image de couverture 2:3 */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative aspect-[2/3] w-full max-w-[320px] rounded-xl overflow-hidden border border-brand-gold/40 shadow-2xl bg-black/60 group">
                  {selectedSeries.image && (
                    <CinematicImage
                      src={selectedSeries.image}
                      alt={selectedSeries.title}
                      aspectRatio="2/3"
                      objectFit="cover"
                      type="series"
                      title={selectedSeries.title}
                      category={selectedSeries.genre}
                      className="transition-transform duration-500 group-hover:scale-105"
                      containerClassName="border-0"
                      overlay={
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                          <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                            <span className="inline-block px-2.5 py-1 rounded bg-black/80 border border-brand-gold/40 text-[9.5px] uppercase tracking-widest text-brand-amber font-bold shadow">
                              Affiche Officielle • 2:3
                            </span>
                          </div>
                        </>
                      }
                    />
                  )}
                </div>
                <p className="text-[10px] text-stone-400 font-medium text-center mt-2.5 tracking-wider uppercase">
                  Junior France Mavie NGAKOSSO
                  <span className="block text-brand-gold/80 text-[9px]">Créateur / Scénariste</span>
                </p>
              </div>

              {/* Colonne Informations & Contenu */}
              <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
                {/* Spécifications de la série */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-white/5 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Format
                    </span>
                    <span className="font-semibold text-white">{selectedSeries.format}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Statut
                    </span>
                    <span className="font-semibold text-brand-amber">{selectedSeries.status}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Rôle
                    </span>
                    <span className="font-semibold text-white truncate block">Créateur / Scénariste</span>
                  </div>
                  {selectedSeries.location && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Lieu
                      </span>
                      <span className="font-semibold text-white">{selectedSeries.location}</span>
                    </div>
                  )}
                  {selectedSeries.languages && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Langues
                      </span>
                      <span className="font-semibold text-white">{selectedSeries.languages}</span>
                    </div>
                  )}
                  {selectedSeries.country && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Pays
                      </span>
                      <span className="font-semibold text-white">{selectedSeries.country}</span>
                    </div>
                  )}
                </div>

                {/* Logline Officielle */}
                <div>
                  <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                    LOGLINE OFFICIELLE :
                  </strong>
                  <p className="italic bg-black/30 p-3 rounded-xl border border-white/10 text-stone-200">
                    « {selectedSeries.logline} »
                  </p>
                </div>

                {/* Synopsis */}
                {selectedSeries.synopsis && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      SYNOPSIS :
                    </strong>
                    <ExpandableText text={selectedSeries.synopsis} maxChars={320} className="text-stone-300 leading-relaxed" />
                  </div>
                )}

                {/* Concept Narratif (Chez le Psy) */}
                {selectedSeries.concept && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      CONCEPT NARRATIF :
                    </strong>
                    <p className="text-stone-300 leading-relaxed">
                      {selectedSeries.concept}
                    </p>
                  </div>
                )}

                {/* Mention Auteur */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Création originale :</span>
                  <span className="font-bold text-white uppercase tracking-wider">JUNIOR FRANCE MAVIE NGAKOSSO</span>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
              <CinematicButton
                variant="primary"
                size="md"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSeries(null);
                  if (onContactClick) onContactClick();
                }}
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="flex-1"
              >
                {language === 'en' ? 'Request Series Bible / Contact' : 'Demander la Bible de Série / Contact'}
              </CinematicButton>
              <CinematicButton
                variant="ghost"
                size="md"
                onClick={() => setSelectedSeries(null)}
              >
                {t('books.closeModal')}
              </CinematicButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
