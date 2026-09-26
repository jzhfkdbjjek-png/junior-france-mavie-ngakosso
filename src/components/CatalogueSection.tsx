import React, { useState, useMemo } from 'react';
import { getFilmsData, getSeriesData, getBooksData } from '../data/portfolioData';
import { FilmItem, SeriesItem, BookItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import {
  Film,
  Tv,
  BookOpen,
  ExternalLink,
  X,
  MapPin,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';
import { ExpandableText } from './ExpandableText';
import { analyticsEvents } from '../utils/analytics';

interface CatalogueSectionProps {
  onNavigateForet: () => void;
  onNavigateLivres: () => void;
  onContactClick: () => void;
}

interface WorkItem {
  id: string;
  title: string;
  type: string;
  genre: string;
  format?: string;
  duration?: string;
  status: string;
  role: string;
  location?: string;
  languages?: string;
  logline: string;
  synopsis?: string;
  summary?: string;
  concept?: string;
  inspiration?: string;
  image?: string;
  imageSm?: string;
  relatedBookId?: string;
  relatedBookTitle?: string;
  amazonUrl?: string;
  workType: 'film' | 'series' | 'book';
  rawItem: FilmItem | SeriesItem | BookItem;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  onNavigateForet,
  onNavigateLivres,
  onContactClick,
}) => {
  const { t, language } = useI18n();

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Tous');
  const [genreFilter, setGenreFilter] = useState<string>('Tous');
  const [formatFilter, setFormatFilter] = useState<string>('Tous');
  const [statutFilter, setStatutFilter] = useState<string>('Tous');
  const [roleFilter, setRoleFilter] = useState<string>('Tous');

  // Mobile Filters Drawer Modal
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Selected project modal
  const [selectedProject, setSelectedProject] = useState<FilmItem | SeriesItem | BookItem | null>(null);

  const filmsData = getFilmsData(language);
  const seriesData = getSeriesData(language);
  const booksData = getBooksData(language);

  // Unified items list
  const allWorks: WorkItem[] = useMemo(() => {
    const f: WorkItem[] = filmsData.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      genre: item.genre,
      duration: item.duration,
      status: item.status,
      role: item.role,
      location: item.location,
      languages: item.languages,
      logline: item.logline,
      synopsis: item.synopsis,
      inspiration: item.inspiration,
      image: item.image,
      imageSm: item.imageSm,
      relatedBookId: item.relatedBookId,
      relatedBookTitle: item.relatedBookTitle,
      workType: 'film',
      rawItem: item,
    }));
    const s: WorkItem[] = seriesData.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      genre: item.genre,
      format: item.format,
      status: item.status,
      role: item.role,
      location: item.location,
      languages: item.languages,
      logline: item.logline,
      synopsis: item.synopsis,
      concept: item.concept,
      image: item.image,
      imageSm: item.imageSm,
      relatedBookId: item.relatedBookId,
      relatedBookTitle: item.relatedBookTitle,
      workType: 'series',
      rawItem: item,
    }));
    const b: WorkItem[] = booksData.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      genre: item.category,
      status: 'Publié / Disponible',
      role: 'Auteur',
      logline: item.description,
      summary: item.summary,
      image: item.image,
      imageSm: item.imageSm,
      amazonUrl: item.amazonUrl,
      workType: 'book',
      rawItem: item,
    }));
    return [...f, ...s, ...b];
  }, [filmsData, seriesData, booksData]);

  // Filter options lists
  const typeOptions = ['Tous', 'Film', 'Série', 'Livre'];
  const genreOptions = [
    'Tous',
    'Thriller',
    'Fantastique',
    'Mystère',
    'Surnaturel',
    'Drame',
    'Action',
    'Horreur',
    'Comédie',
    'Crime',
    'Social',
    'Politique',
  ];
  const formatOptions = [
    'Tous',
    'Long métrage',
    'Série 8 × 52',
    'Série 8 × 45',
    'Série 10 × 26',
    'Série 15 × 26',
  ];
  const statutOptions = [
    'Tous',
    'Projet',
    'Projet finalisé',
    'En développement',
    'Scénario',
    'Scénario complet',
    'Adaptation',
  ];
  const roleOptions = [
    'Tous',
    'Créateur',
    'Scénariste',
    'Auteur',
    'Auteur / Scénariste',
  ];

  // Helper matching function
  const normalize = (str?: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredWorks = useMemo(() => {
    const q = normalize(searchQuery.trim());

    return allWorks.filter((item) => {
      // Search query check across: title, genre, format, status, type, location, languages, role, keywords, logline, synopsis
      if (q) {
        const titleMatch = normalize(item.title).includes(q);
        const genreMatch = normalize(item.genre).includes(q);
        const formatMatch = normalize(item.format || item.duration || '').includes(q);
        const statusMatch = normalize(item.status).includes(q);
        const typeMatch = normalize(item.type).includes(q);
        const locMatch = normalize(item.location || '').includes(q);
        const langMatch = normalize(item.languages || '').includes(q);
        const roleMatch = normalize(item.role).includes(q);
        const loglineMatch = normalize(item.logline).includes(q);
        const synopsisMatch = normalize(item.synopsis || item.summary || '').includes(q);

        const anyMatch =
          titleMatch ||
          genreMatch ||
          formatMatch ||
          statusMatch ||
          typeMatch ||
          locMatch ||
          langMatch ||
          roleMatch ||
          loglineMatch ||
          synopsisMatch;

        if (!anyMatch) return false;
      }

      // 1. TYPE filter
      if (typeFilter !== 'Tous') {
        if (typeFilter === 'Film' && item.workType !== 'film') return false;
        if (typeFilter === 'Série' && item.workType !== 'series') return false;
        if (typeFilter === 'Livre' && item.workType !== 'book') return false;
      }

      // 2. GENRE filter
      if (genreFilter !== 'Tous') {
        const itemGenre = normalize(item.genre);
        if (!itemGenre.includes(normalize(genreFilter))) return false;
      }

      // 3. FORMAT filter
      if (formatFilter !== 'Tous') {
        const itemFormat = normalize(item.format || item.duration || item.type);
        if (!itemFormat.includes(normalize(formatFilter))) return false;
      }

      // 4. STATUT filter
      if (statutFilter !== 'Tous') {
        const itemStatus = normalize(item.status);
        if (!itemStatus.includes(normalize(statutFilter))) return false;
      }

      // 5. RÔLE filter
      if (roleFilter !== 'Tous') {
        const itemRole = normalize(item.role);
        if (!itemRole.includes(normalize(roleFilter))) return false;
      }

      return true;
    });
  }, [allWorks, searchQuery, typeFilter, genreFilter, formatFilter, statutFilter, roleFilter]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setTypeFilter('Tous');
    setGenreFilter('Tous');
    setFormatFilter('Tous');
    setStatutFilter('Tous');
    setRoleFilter('Tous');
  };

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    (typeFilter !== 'Tous' ? 1 : 0) +
    (genreFilter !== 'Tous' ? 1 : 0) +
    (formatFilter !== 'Tous' ? 1 : 0) +
    (statutFilter !== 'Tous' ? 1 : 0) +
    (roleFilter !== 'Tous' ? 1 : 0);

  const openProjectModal = (item: FilmItem | SeriesItem | BookItem) => {
    setSelectedProject(item);
    const category = 'format' in item ? 'serie' : 'duration' in item ? 'film' : 'livre';
    analyticsEvents.viewWorkItem(item.title, category);
  };

  return (
    <section
      id="catalogue"
      className="py-16 sm:py-20 lg:py-24 bg-[#121413] relative border-t border-white/5"
    >
      {/* Anchor point for `#films` link */}
      <div id="films" className="absolute -top-16 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div data-reveal="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold flex items-center gap-1.5">
                <span className="sparkle-slow-spin text-brand-gold text-[10px] select-none" aria-hidden="true">✦</span>
                <span>{t('catalogue.badge')}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {t('catalogue.title')}{' '}
              <span className="font-serif italic font-normal text-brand-amber">
                {t('catalogue.titleAccent')}
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            {language === 'en'
              ? 'Complete filmography, television series bibles, and original literary works.'
              : 'Filmographie complète, bibles de séries télévisées et œuvres littéraires originales.'}
          </p>
        </div>

        {/* SEARCH & FILTERS INTERFACE */}
        <div data-reveal="fade-up" className="mb-10 space-y-4">
          {/* Primary Architecture Tabs: Écrivain / Créateur / Scénariste */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-[#181b1a] border border-white/10">
            <button
              type="button"
              onClick={() => setTypeFilter('Tous')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                typeFilter === 'Tous'
                  ? 'bg-brand-gold text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{language === 'en' ? 'All Works' : 'Toutes les œuvres'}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                typeFilter === 'Tous' ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
              }`}>
                {allWorks.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTypeFilter('Livre')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                typeFilter === 'Livre'
                  ? 'bg-brand-gold text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Writer • Books' : 'Écrivain • Livres'}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                typeFilter === 'Livre' ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
              }`}>
                {booksData.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTypeFilter('Série')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                typeFilter === 'Série'
                  ? 'bg-brand-gold text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Creator • Series' : 'Créateur • Séries'}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                typeFilter === 'Série' ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
              }`}>
                {seriesData.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTypeFilter('Film')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                typeFilter === 'Film'
                  ? 'bg-brand-gold text-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Screenwriter • Films' : 'Scénariste • Films'}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                typeFilter === 'Film' ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
              }`}>
                {filmsData.length}
              </span>
            </button>
          </div>

          {/* Main Search Bar + Mobile Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4 text-brand-gold" />
              </div>
              <input
                id="search-works-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="RECHERCHER UNE ŒUVRE..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#181b1a] border border-white/10 text-white placeholder-stone-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filters Drawer Button */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#181b1a] border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:border-brand-gold/40 min-h-[44px]"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>FILTRES</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-gold text-black font-mono text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Filter Bar */}
          <div className="hidden lg:grid grid-cols-5 gap-3 p-4 rounded-2xl bg-[#181b1a] border border-white/10">
            {/* TYPE */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1.5">
                TYPE
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#181b1a] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* GENRE */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1.5">
                GENRE
              </label>
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                {genreOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#181b1a] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* FORMAT */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1.5">
                FORMAT
              </label>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                {formatOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#181b1a] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* STATUT */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1.5">
                STATUT
              </label>
              <select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                {statutOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#181b1a] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* RÔLE */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1.5">
                RÔLE
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                {roleOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#181b1a] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Tags + Count + Reset Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-300 font-mono">
                {filteredWorks.length}{' '}
                {filteredWorks.length > 1 ? 'œuvres trouvées' : 'œuvre trouvée'}
              </span>

              {/* Dismissible Tags */}
              {typeFilter !== 'Tous' && (
                <button
                  onClick={() => setTypeFilter('Tous')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[11px] font-semibold hover:bg-brand-gold/25"
                >
                  <span>Type: {typeFilter}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {genreFilter !== 'Tous' && (
                <button
                  onClick={() => setGenreFilter('Tous')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[11px] font-semibold hover:bg-brand-gold/25"
                >
                  <span>{genreFilter}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {formatFilter !== 'Tous' && (
                <button
                  onClick={() => setFormatFilter('Tous')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[11px] font-semibold hover:bg-brand-gold/25"
                >
                  <span>{formatFilter}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {statutFilter !== 'Tous' && (
                <button
                  onClick={() => setStatutFilter('Tous')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[11px] font-semibold hover:bg-brand-gold/25"
                >
                  <span>{statutFilter}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {roleFilter !== 'Tous' && (
                <button
                  onClick={() => setRoleFilter('Tous')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[11px] font-semibold hover:bg-brand-gold/25"
                >
                  <span>{roleFilter}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold hover:bg-white/20"
                >
                  <span>« {searchQuery} »</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-brand-amber transition-colors ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RÉINITIALISER LES FILTRES</span>
              </button>
            )}
          </div>
        </div>

        {/* RESULTS GRID OR EMPTY STATE */}
        {filteredWorks.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-16 sm:py-24 text-center max-w-md mx-auto px-4 bg-[#181b1a]/60 rounded-3xl border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <Search className="w-7 h-7 text-brand-gold" />
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
              AUCUNE ŒUVRE TROUVÉE
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">
              Essayez une autre recherche ou modifiez vos filtres.
            </p>
            <CinematicButton
              variant="primary"
              size="md"
              onClick={resetAllFilters}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              RÉINITIALISER
            </CinematicButton>
          </div>
        ) : (
          /* GRID DES ŒUVRES */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredWorks.map((work) => {
              const isForet = work.id.includes('foret');
              const isBook = work.workType === 'book';
              const isSeries = work.workType === 'series';
              const isFilm = work.workType === 'film';

              return (
                <div
                  key={work.id}
                  className={`p-5 sm:p-6 rounded-2xl transition-all flex flex-col justify-between group shadow-md card-premium-hover ${
                    isForet
                      ? 'bg-red-950/25 border border-red-900/50 hover:border-red-500/60'
                      : 'bg-[#181b1a] border border-white/10 hover:border-brand-gold/60'
                  }`}
                >
                  <div>
                    {/* Visual Key Art / Poster if available */}
                    {work.image && (
                      <div
                        className="relative aspect-[2/3] w-full max-h-[380px] sm:max-h-[400px] overflow-hidden rounded-xl bg-black/40 border border-white/10 mb-4 group/poster cursor-pointer shadow-lg transition-all duration-300 group-hover:border-brand-gold/50"
                        onClick={() => {
                          if (isBook && work.amazonUrl) {
                            window.open(work.amazonUrl, '_blank', 'noopener,noreferrer');
                          } else {
                            openProjectModal(work.rawItem);
                          }
                        }}
                      >
                        <CinematicImage
                          src={work.image}
                          srcSm={work.imageSm}
                          alt={work.title}
                          aspectRatio="2/3"
                          objectFit="cover"
                          type={isBook ? 'book' : isSeries ? 'series' : 'film'}
                          title={work.title}
                          category={work.genre}
                          className="transition-transform duration-700 ease-out group-hover/poster:scale-105"
                          containerClassName="border-0"
                          overlay={
                            <>
                              <div className="absolute inset-0 bg-gradient-to-t from-[#181b1a] via-transparent to-black/30 pointer-events-none" />
                              
                              {/* Floating Top Badge */}
                              <div className="absolute top-2.5 left-2.5 z-10">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 text-brand-amber border border-brand-gold/30 backdrop-blur-md shadow-md">
                                  {isFilm && <Film className="w-3 h-3 text-brand-gold" />}
                                  {isSeries && <Tv className="w-3 h-3 text-brand-gold" />}
                                  {isBook && <BookOpen className="w-3 h-3 text-brand-gold" />}
                                  <span>{work.type}</span>
                                </span>
                              </div>

                              {/* Hover Overlay indicator */}
                              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 z-10">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-gold text-black shadow-lg">
                                  {isBook ? 'Amazon' : (language === 'en' ? 'View Dossier' : 'Voir Fiche')}
                                  <ArrowUpRight className="w-3 h-3" />
                                </span>
                              </div>
                            </>
                          }
                        />
                      </div>
                    )}

                    {/* Header Item : Type badge & Genre (shown if no image or as supplementary) */}
                    <div className="flex items-center justify-between text-xs gap-2">
                      {!work.image && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-amber border border-brand-gold/25">
                          {isFilm && <Film className="w-3 h-3" />}
                          {isSeries && <Tv className="w-3 h-3" />}
                          {isBook && <BookOpen className="w-3 h-3" />}
                          <span>{work.type}</span>
                        </span>
                      )}
                      <span className="uppercase tracking-widest text-[10px] sm:text-[11px] font-bold text-stone-400 truncate">
                        {work.genre}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg sm:text-xl font-cinzel font-bold mt-2.5 transition-colors ${
                        isForet
                          ? 'text-white group-hover:text-red-400'
                          : 'text-white group-hover:text-brand-amber'
                      }`}
                    >
                      {work.title}
                    </h3>

                    {/* Format / Duration / Location */}
                    <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] text-stone-400">
                      {'format' in work && work.format && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                          {work.format}
                        </span>
                      )}
                      {'duration' in work && work.duration && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                          {work.duration}
                        </span>
                      )}
                      {'location' in work && work.location && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                          <MapPin className="w-2.5 h-2.5" />
                          {work.location}
                        </span>
                      )}
                    </div>

                    {/* Logline avec ExpandableText */}
                    <div className="mt-3.5">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                        {isBook ? 'Présentation :' : 'Logline Officielle :'}
                      </span>
                      <div className="text-xs text-stone-300 italic">
                        <ExpandableText
                          text={work.logline}
                          maxChars={130}
                        />
                      </div>
                    </div>

                    {/* Related Book link if any */}
                    {work.relatedBookId && (
                      <div className="mt-3 p-2 bg-amber-950/20 rounded-lg border border-amber-900/40 text-[11px] flex items-center justify-between">
                        <span className="text-brand-amber font-semibold flex items-center gap-1.5 truncate">
                          <BookOpen className="w-3 h-3 shrink-0" />
                          <span className="truncate">{work.relatedBookTitle}</span>
                        </span>
                        <CinematicButton
                          variant="ghost"
                          size="sm"
                          onClick={onNavigateLivres}
                          className="text-[9.5px] tracking-wider text-white hover:text-brand-amber shrink-0"
                        >
                          {language === 'en' ? 'Book' : 'Livre'}
                        </CinematicButton>
                      </div>
                    )}
                  </div>

                  {/* Footer Card */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] sm:text-[11px] font-medium truncate ${
                        isForet ? 'text-red-400 font-bold' : 'text-stone-400'
                      }`}
                    >
                      {work.status}
                    </span>

                    <div className="flex items-center gap-2">
                      {isBook ? (
                        <CinematicButton
                          variant="secondary"
                          size="sm"
                          href={work.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          icon={<ExternalLink className="w-3.5 h-3.5" />}
                          iconPosition="right"
                        >
                          Amazon
                        </CinematicButton>
                      ) : (
                        <CinematicButton
                          variant="secondary"
                          size="sm"
                          onClick={() => openProjectModal(work.rawItem)}
                          icon={<ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />}
                          iconPosition="right"
                        >
                          {t('catalogue.viewDossier')}
                        </CinematicButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MOBILE FILTERS BOTTOM SHEET / DRAWER */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#181b1a] rounded-t-3xl sm:rounded-3xl p-6 border border-white/15 max-h-[85vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                <h3 className="font-cinzel text-lg font-bold text-white uppercase">
                  Filtres Avancés
                </h3>
              </div>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white"
                aria-label="Fermer les filtres"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter: TYPE */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-2">
                TYPE
              </span>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setTypeFilter(opt)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
                      typeFilter === opt
                        ? 'bg-brand-gold text-black'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter: GENRE */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-2">
                GENRE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {genreOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setGenreFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[38px] ${
                      genreFilter === opt
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter: FORMAT */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-2">
                FORMAT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {formatOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFormatFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[38px] ${
                      formatFilter === opt
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter: STATUT */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-2">
                STATUT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {statutOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStatutFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[38px] ${
                      statutFilter === opt
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter: RÔLE */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold block mb-2">
                RÔLE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {roleOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRoleFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[38px] ${
                      roleFilter === opt
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 border-t border-white/10 flex gap-3">
              <CinematicButton
                variant="primary"
                size="md"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1"
              >
                Appliquer les filtres
              </CinematicButton>
              <CinematicButton
                variant="ghost"
                size="md"
                onClick={resetAllFilters}
              >
                Effacer
              </CinematicButton>
            </div>
          </div>
        </div>
      )}

      {/* MODALE FICHE COMPLÈTE & DOSSIER DU PROJET (AVEC POSTER CINÉMATOGRAPHIQUE) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`bg-[#181b1a] rounded-2xl w-full p-5 sm:p-7 border border-white/15 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto ${
              'image' in selectedProject && selectedProject.image ? 'max-w-4xl' : 'max-w-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-brand-amber/20 text-brand-amber rounded">
                    {selectedProject.type}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {'genre' in selectedProject ? selectedProject.genre : selectedProject.category}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer transition-colors"
                aria-label={t('books.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps de la Fiche */}
            <div
              className={`gap-6 ${
                'image' in selectedProject && selectedProject.image
                  ? 'grid grid-cols-1 md:grid-cols-12 items-start'
                  : 'space-y-4'
              }`}
            >
              {/* Colonne Image / Poster Officiel 2:3 */}
              {'image' in selectedProject && selectedProject.image && (
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative aspect-[2/3] w-full max-w-[320px] rounded-xl overflow-hidden border border-brand-gold/40 shadow-2xl bg-black/60 group">
                    <CinematicImage
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      aspectRatio="2/3"
                      objectFit="cover"
                      type={'genre' in selectedProject ? 'film' : 'book'}
                      title={selectedProject.title}
                      category={'genre' in selectedProject ? selectedProject.genre : selectedProject.category}
                      className="transition-transform duration-500 group-hover:scale-105"
                      containerClassName="border-0"
                      overlay={
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                          <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                            <span className="inline-block px-2.5 py-1 rounded bg-black/80 border border-brand-gold/40 text-[9.5px] uppercase tracking-widest text-brand-amber font-bold shadow">
                              Key Art Officiel • 2:3
                            </span>
                          </div>
                        </>
                      }
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 font-medium text-center mt-2.5 tracking-wider uppercase">
                    Junior France Mavie NGAKOSSO
                    <span className="block text-brand-gold/80 text-[9px]">Auteur / Scénariste</span>
                  </p>
                </div>
              )}

              {/* Colonne Informations & Contenu */}
              <div
                className={`space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed ${
                  'image' in selectedProject && selectedProject.image ? 'md:col-span-7' : ''
                }`}
              >
                {/* Grille des spécifications */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-white/5 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {language === 'en' ? 'Role / Author' : 'Rôle / Auteur'}
                    </span>
                    <span className="font-semibold text-white">
                      {'role' in selectedProject ? selectedProject.role : selectedProject.author}
                    </span>
                  </div>
                  {'duration' in selectedProject && selectedProject.duration && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        {language === 'en' ? 'Duration' : 'Durée'}
                      </span>
                      <span className="font-semibold text-white">{selectedProject.duration}</span>
                    </div>
                  )}
                  {'format' in selectedProject && selectedProject.format && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Format
                      </span>
                      <span className="font-semibold text-white">{selectedProject.format}</span>
                    </div>
                  )}
                  {'location' in selectedProject && selectedProject.location && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        {language === 'en' ? 'Location' : 'Lieu'}
                      </span>
                      <span className="font-semibold text-white">{selectedProject.location}</span>
                    </div>
                  )}
                  {'languages' in selectedProject && selectedProject.languages && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        {language === 'en' ? 'Languages' : 'Langues'}
                      </span>
                      <span className="font-semibold text-white">{selectedProject.languages}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {language === 'en' ? 'Status' : 'Statut'}
                    </span>
                    <span className="font-semibold text-brand-amber">
                      {'status' in selectedProject ? selectedProject.status : 'Disponible'}
                    </span>
                  </div>
                </div>

                {/* Logline */}
                <div>
                  <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                    {language === 'en' ? 'Official Logline:' : 'Logline Officielle :'}
                  </strong>
                  <p className="italic bg-black/30 p-3 rounded-xl border border-white/10 text-stone-200">
                    « {'logline' in selectedProject ? selectedProject.logline : selectedProject.description} »
                  </p>
                </div>

                {/* Synopsis si présent */}
                {'synopsis' in selectedProject && selectedProject.synopsis && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      {language === 'en' ? 'Synopsis / Treatment:' : 'Synopsis / Traitement :'}
                    </strong>
                    <ExpandableText text={selectedProject.synopsis} maxChars={280} className="text-stone-300 leading-relaxed" />
                  </div>
                )}

                {/* Summary if book */}
                {'summary' in selectedProject && selectedProject.summary && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      {language === 'en' ? 'Book Synopsis:' : 'Synopsis du Livre :'}
                    </strong>
                    <ExpandableText text={selectedProject.summary} maxChars={280} className="text-stone-300 leading-relaxed" />
                  </div>
                )}

                {/* Concept si présent (Chez le Psy) */}
                {'concept' in selectedProject && selectedProject.concept && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      {language === 'en' ? 'Narrative Concept:' : 'Concept Narratif :'}
                    </strong>
                    <p className="text-stone-300 leading-relaxed">
                      {selectedProject.concept}
                    </p>
                  </div>
                )}

                {/* Inspiration si présente (L'enfant albinos) */}
                {'inspiration' in selectedProject && selectedProject.inspiration && (
                  <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-900/40 text-xs">
                    <strong className="text-white block font-semibold mb-0.5">
                      {language === 'en' ? 'Inspiration Source:' : "Source d'inspiration :"}
                    </strong>
                    <p className="text-stone-300 italic">{selectedProject.inspiration}</p>
                  </div>
                )}
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
                  setSelectedProject(null);
                  onContactClick();
                }}
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="flex-1"
              >
                {t('catalogue.modal.contactCta')}
              </CinematicButton>
              <CinematicButton
                variant="ghost"
                size="md"
                onClick={() => setSelectedProject(null)}
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
