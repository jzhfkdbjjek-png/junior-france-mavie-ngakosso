import React, { useState } from 'react';
import { getFilmsData, getSeriesData } from '../data/portfolioData';
import { FilmItem, SeriesItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { Film, Tv, BookOpen, ExternalLink, X, MapPin, ArrowUpRight } from 'lucide-react';
import { CinematicButton } from './CinematicButton';

interface CatalogueSectionProps {
  onNavigateForet: () => void;
  onNavigateLivres: () => void;
  onContactClick: () => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  onNavigateForet,
  onNavigateLivres,
  onContactClick,
}) => {
  const [activeTab, setActiveTab] = useState<'tout' | 'livres' | 'films' | 'series'>('tout');
  const [selectedProject, setSelectedProject] = useState<FilmItem | SeriesItem | null>(null);
  const { t, language } = useI18n();

  const filmsData = getFilmsData(language);
  const seriesData = getSeriesData(language);

  const handleTabClick = (tab: 'tout' | 'livres' | 'films' | 'series') => {
    setActiveTab(tab);
    if (tab === 'livres') {
      onNavigateLivres();
    }
  };

  const openProjectModal = (item: FilmItem | SeriesItem) => {
    setSelectedProject(item);
  };

  const showFilms = activeTab === 'tout' || activeTab === 'films';
  const showSeries = activeTab === 'tout' || activeTab === 'series';

  return (
    <section
      id="catalogue"
      className="py-16 sm:py-20 lg:py-24 bg-[#121413] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Filters Header */}
        <div data-reveal="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t('catalogue.badge')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {t('catalogue.title')}{' '}
              <span className="font-serif italic font-normal text-brand-amber">
                {t('catalogue.titleAccent')}
              </span>
            </h2>
          </div>

          {/* Filter Pills with min-touch sizing */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'tout'}
              onClick={() => handleTabClick('tout')}
            >
              {t('catalogue.filters.all')}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'livres'}
              onClick={() => handleTabClick('livres')}
            >
              {t('catalogue.filters.books')}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'films'}
              onClick={() => handleTabClick('films')}
            >
              {t('catalogue.filters.films')}
            </CinematicButton>
            <CinematicButton
              variant="filter"
              size="sm"
              active={activeTab === 'series'}
              onClick={() => handleTabClick('series')}
            >
              {t('catalogue.filters.series')}
            </CinematicButton>
          </div>
        </div>

        {/* SECTION: FILMS (SECTION SCÉNARISTE — FILMS / LONGS-MÉTRAGES) */}
        {showFilms && (
          <div className="mb-16 sm:mb-20" id="films">
            <div data-reveal="fade-down" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="p-1.5 rounded-lg bg-white/10 text-brand-amber">
                  <Film className="w-4 h-4" />
                </span>
                <span className="px-3 py-1 bg-brand-gold/20 text-brand-amber text-xs font-bold uppercase rounded border border-brand-gold/30">
                  {t('catalogue.filmsSectionBadge')}
                </span>
              </div>
              <span className="text-xs text-stone-400">
                {t('catalogue.filmsSectionSubtitle')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filmsData.map((film, idx) => {
                const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600', 'delay-700'];
                const isCercueil = film.id === 'film-cercueil';

                return (
                  <div
                    key={film.id}
                    data-reveal="fade-up"
                    className={`${delays[idx % delays.length]} p-5 sm:p-6 rounded-2xl bg-[#181b1a] border ${
                      isCercueil
                        ? 'border-brand-gold/40'
                        : 'border-white/10'
                    } hover:border-brand-gold/60 card-premium-hover transition-all flex flex-col justify-between group shadow-md`}
                  >
                    <div>
                      {/* Genre & Durée */}
                      <div className="flex items-center justify-between text-xs text-stone-400 gap-2">
                        <span className="uppercase tracking-widest text-brand-amber font-bold text-[10px] sm:text-xs">
                          {film.genre}
                        </span>
                        {film.duration && (
                          <span className="font-semibold text-[11px] shrink-0">{film.duration}</span>
                        )}
                      </div>

                      {/* Titre */}
                      <h4 className="text-lg sm:text-xl font-cinzel font-bold text-white mt-2.5 group-hover:text-brand-amber transition-colors">
                        {film.title}
                      </h4>

                      {/* Type & Rôle */}
                      <div className="flex flex-wrap gap-1.5 mt-1.5 text-[10px] text-stone-400">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                          {film.type}
                        </span>
                        {film.location && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                            <MapPin className="w-2.5 h-2.5" />
                            {film.location}
                          </span>
                        )}
                      </div>

                      {/* Logline */}
                      <div className="mt-3">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                          {language === 'en' ? 'Logline:' : 'Logline :'}
                        </span>
                        <p className="text-xs text-stone-300 leading-relaxed italic">
                          « {film.logline} »
                        </p>
                      </div>

                      {/* Lien œuvre littéraire reliée */}
                      {film.relatedBookId && (
                        <div className="mt-3 p-2 bg-amber-950/20 rounded-lg border border-amber-900/40 text-[11px] flex items-center justify-between">
                          <span className="text-brand-amber font-semibold flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3" />
                            {film.relatedBookTitle}
                          </span>
                          <CinematicButton
                            variant="ghost"
                            size="sm"
                            onClick={onNavigateLivres}
                            className="text-[9.5px] tracking-wider text-white hover:text-brand-amber"
                          >
                            {language === 'en' ? 'View book' : 'Voir livre'}
                          </CinematicButton>
                        </div>
                      )}
                    </div>

                    {/* Footer Fiche */}
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate">
                        {film.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <CinematicButton
                          variant="secondary"
                          size="sm"
                          onClick={() => openProjectModal(film)}
                          icon={<ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />}
                          iconPosition="right"
                        >
                          {t('catalogue.viewDossier')}
                        </CinematicButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: SÉRIES (SECTION CRÉATEUR — MES SÉRIES) */}
        {showSeries && (
          <div id="series">
            <div data-reveal="fade-down" className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="p-1.5 rounded-lg bg-white/10 text-red-400">
                  <Tv className="w-4 h-4" />
                </span>
                <span className="px-3 py-1 bg-red-600/15 text-red-400 text-xs font-bold uppercase rounded border border-red-500/30">
                  {t('catalogue.seriesSectionBadge')}
                </span>
              </div>
              <span className="text-xs text-stone-400">
                {t('catalogue.seriesSectionSubtitle')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {seriesData.map((serie, idx) => {
                const isSpecial = serie.id === 'serie-foret-interdite';
                const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600'];

                return (
                  <div
                    key={serie.id}
                    data-reveal="fade-up"
                    className={`${delays[idx % delays.length]} p-5 sm:p-6 rounded-2xl card-premium-hover transition-colors flex flex-col justify-between group shadow-md ${
                      isSpecial
                        ? 'bg-red-950/25 border border-red-900/50 hover:border-red-500/60'
                        : 'bg-[#181b1a] border border-white/10 hover:border-brand-gold/40'
                    }`}
                  >
                    <div>
                      {/* Genre & Format */}
                      <div
                        className={`flex items-center justify-between text-xs gap-2 ${
                          isSpecial ? 'text-red-400' : 'text-stone-400'
                        }`}
                      >
                        <span className="uppercase tracking-widest font-bold text-[10px] sm:text-xs">
                          {serie.genre}
                        </span>
                        <span className="font-semibold text-[11px] shrink-0">{serie.format}</span>
                      </div>

                      {/* Titre */}
                      <h4
                        className={`text-lg sm:text-xl font-cinzel font-bold mt-2.5 transition-colors ${
                          isSpecial
                            ? 'text-white group-hover:text-red-400'
                            : 'text-white group-hover:text-brand-amber'
                        }`}
                      >
                        {serie.title}
                      </h4>

                      {/* Type & Statut */}
                      <div className="flex flex-wrap gap-1.5 mt-1.5 text-[10px] text-stone-400">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                          {serie.type}
                        </span>
                        {serie.location && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                            <MapPin className="w-2.5 h-2.5" />
                            {serie.location}
                          </span>
                        )}
                        {serie.country && (
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-medium">
                            {serie.country}
                          </span>
                        )}
                      </div>

                      {/* Logline */}
                      <div className="mt-3">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                          {language === 'en' ? 'Official Logline:' : 'Logline Officielle :'}
                        </span>
                        <p className="text-xs text-stone-300 leading-relaxed italic">
                          « {serie.logline} »
                        </p>
                      </div>

                      {/* Lien livre si relié */}
                      {serie.relatedBookId && (
                        <div className="mt-3 p-2 bg-amber-950/20 rounded-lg border border-amber-900/40 text-[11px] flex items-center justify-between">
                          <span className="text-brand-amber font-semibold flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3" />
                            {serie.relatedBookTitle}
                          </span>
                          <CinematicButton
                            variant="ghost"
                            size="sm"
                            onClick={onNavigateLivres}
                            className="text-[9.5px] tracking-wider text-white hover:text-brand-amber"
                          >
                            {language === 'en' ? 'View book' : 'Voir livre'}
                          </CinematicButton>
                        </div>
                      )}
                    </div>

                    {/* Footer Fiche */}
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] sm:text-[11px] font-medium truncate ${
                          isSpecial ? 'text-red-400 font-bold' : 'text-stone-400'
                        }`}
                      >
                        {serie.status}
                      </span>
                      <div className="flex items-center gap-2">
                        {isSpecial ? (
                          <CinematicButton
                            variant="project"
                            size="sm"
                            onClick={onNavigateForet}
                          >
                            {language === 'en' ? 'Spotlight ✦' : 'Dossier Phare ✦'}
                          </CinematicButton>
                        ) : (
                          <CinematicButton
                            variant="secondary"
                            size="sm"
                            onClick={() => openProjectModal(serie)}
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
          </div>
        )}
      </div>

      {/* MODALE FICHE COMPLÈTE & DOSSIER DU PROJET */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#181b1a] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
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
                    {selectedProject.genre}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                aria-label={t('books.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps de la Fiche */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              {/* Grille des spécifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-white/5 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    {language === 'en' ? 'Role / Author' : 'Rôle / Auteur'}
                  </span>
                  <span className="font-semibold text-white">{selectedProject.role}</span>
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
                {selectedProject.location && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {language === 'en' ? 'Location' : 'Lieu'}
                    </span>
                    <span className="font-semibold text-white">{selectedProject.location}</span>
                  </div>
                )}
                {selectedProject.languages && (
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
                  <span className="font-semibold text-brand-amber">{selectedProject.status}</span>
                </div>
              </div>

              {/* Logline */}
              <div>
                <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                  {language === 'en' ? 'Official Logline:' : 'Logline Officielle :'}
                </strong>
                <p className="italic bg-black/30 p-3 rounded-xl border border-white/10 text-stone-200">
                  « {selectedProject.logline} »
                </p>
              </div>

              {/* Synopsis si présent */}
              {selectedProject.synopsis && (
                <div>
                  <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                    {language === 'en' ? 'Synopsis / Treatment:' : 'Synopsis / Traitement :'}
                  </strong>
                  <p className="text-stone-300 leading-relaxed">
                    {selectedProject.synopsis}
                  </p>
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
