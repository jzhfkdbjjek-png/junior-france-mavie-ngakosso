import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { FileText, Download, CheckCircle2, ShieldCheck, Loader2, Sparkles, BookOpen, Film, Clapperboard, Award } from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { generatePressKitPdf } from '../utils/pressKitPdf';

export const PressKitSection: React.FC = () => {
  const { t, language } = useI18n();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setDownloadSuccess(false);
      setProgressStatus(language === 'en' ? 'Preparing editorial dossier…' : 'Préparation du dossier éditorial…');

      await generatePressKitPdf((step) => {
        setProgressStatus(step);
      });

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setProgressStatus('');
      }, 6000);
    } catch (err) {
      console.error('Error generating PDF Press Kit:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const pressHighlights = [
    {
      page: '01',
      title: language === 'en' ? 'Editorial Cover & Moodboard' : 'Couverture Haute Couture & Moodboard',
      desc: language === 'en' ? 'Official Portrait, Film Stills & Creative Manifesto' : 'Portrait officiel, photogrammes & signature d’auteur',
    },
    {
      page: '02–03',
      title: language === 'en' ? 'Biography & Narrative Pillars' : 'À Propos & Piliers de l’Univers',
      desc: language === 'en' ? 'Congolese narratives, African cinema, thriller & fantasy' : 'Récits congolais, cinéma africain, thriller, fantastique & drame',
    },
    {
      page: '04',
      title: language === 'en' ? 'Official Bibliography' : 'Œuvres Littéraires',
      desc: language === 'en' ? 'Le Cercueil aux Muscles, La Forêt Interdite, Le Livre – 1560' : 'Le Cercueil aux Muscles, La Forêt Interdite, Le Livre – 1560',
    },
    {
      page: '05',
      title: language === 'en' ? 'Spotlight: La Forêt Interdite' : 'Focus : La Forêt Interdite',
      desc: language === 'en' ? 'Dual Format: Published Novel & 8×52min TV Series' : 'Double édition : Livre Amazon & Série TV 8×52 min',
    },
    {
      page: '06–07',
      title: language === 'en' ? 'TV Series & Feature Films' : 'Créateur de Séries & Scénariste',
      desc: language === 'en' ? '6 Original Series & 7 Feature Film Screenplays' : '6 Séries TV & 7 Longs-métrages de cinéma avec affiches officielles',
    },
    {
      page: '08–09',
      title: language === 'en' ? 'Visual Gallery & Direct Rights' : 'Portfolio Visuel & Droits d’Auteur',
      desc: language === 'en' ? 'Workspace Moodboard, Production Contacts & Licensing' : 'Galerie d’affiches, table de travail & contacts coproduction',
    },
  ];

  return (
    <section
      id="presse"
      className="py-16 sm:py-20 lg:py-24 bg-[#0d0f0e] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div data-reveal="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold flex items-center gap-1.5">
                <span className="sparkle-slow-spin text-brand-gold text-[10px] select-none" aria-hidden="true">✦</span>
                <span>{language === 'en' ? 'Official Press & Media Hub' : 'Presse & Dossier de Référence'}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {language === 'en' ? 'PRESS KIT' : 'DOSSIER DE'}{' '}
              <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl">
                {language === 'en' ? 'ÉDITORIAL' : 'PRESSE OFFICIEL'}
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
            {language === 'en'
              ? 'Comprehensive luxury editorial Press Kit for film producers, streaming platforms, festival curators, literary editors, and cultural journalists.'
              : 'Dossier artistique éditorial haute couture pour producteurs de cinéma, diffuseurs, programmateurs de festivals, éditeurs littéraires et journalistes.'}
          </p>
        </div>

        {/* Main Press Kit Banner / Card */}
        <div
          data-reveal="fade-up"
          className="relative rounded-3xl bg-gradient-to-b from-[#181a19] via-[#121413] to-[#0c0e0d] border border-brand-gold/30 p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 bg-brand-amber/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Press Kit Editorial Cover Preview with Luxury Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[320px] sm:max-w-[360px] rounded-2xl overflow-hidden border-2 border-brand-gold/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-stone-900 transition-all duration-500 hover:border-brand-gold hover:shadow-[0_25px_60px_rgba(197,155,99,0.25)]">
                <CinematicImage
                  src={OFFICIAL_IMAGES.portrait}
                  alt="Junior France Mavie Ngakosso — Dossier Artistique Officiel"
                  aspectRatio="4/5"
                  objectFit="cover"
                  objectPosition="top"
                  type="portrait"
                  title="Dossier de Presse A4"
                  category="Junior France Mavie Ngakosso"
                  containerClassName="border-0"
                  className="filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  overlay={
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[9px] uppercase font-bold tracking-[0.25em] bg-black/70 backdrop-blur-md border border-brand-gold/40 text-brand-gold px-2.5 py-1 rounded-full">
                          A4 ÉDITORIAL • 9 PAGES
                        </span>
                        <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                      </div>
                      <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-amber block">
                          JUNIOR FRANCE MAVIE NGAKOSSO
                        </span>
                        <p className="text-[11px] italic text-stone-300">
                          « Des histoires à écrire. Des mondes à créer. »
                        </p>
                      </div>
                    </>
                  }
                />
              </div>
            </div>

            {/* Dossier Content & Specs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-amber text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3">
                  <FileText className="w-3.5 h-3.5 text-brand-amber" />
                  <span>Document Haute Couture • 9 Pages A4</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white mb-2 leading-tight">
                  PRESS KIT & PRÉSENTATION D’AUTEUR
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mb-5">
                  {language === 'en'
                    ? 'Official reference dossier designed in luxury magazine styling. Gathers author credentials, complete literary bibliography, 6 TV series bibles, 7 feature film screenplays, creative moodboards, and professional coproduction contacts.'
                    : 'Dossier de référence officiel conçu selon les standards de l’édition de luxe et des studios de cinéma. Réunit l’identité d’auteur, la bibliographie littéraire intégrale, 6 bibles de séries télévisées, 7 scénarios de longs-métrages, les moodboards artistiques et les contacts professionnels directs.'}
                </p>

                {/* Highlights Grid (Clean Editorial Blocks) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {pressHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30 transition-colors"
                    >
                      <span className="text-[11px] font-mono font-bold text-brand-gold bg-brand-gold/15 px-2 py-0.5 rounded shrink-0">
                        {item.page}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Download Feedback */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <CinematicButton
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  disabled={isGenerating}
                  icon={
                    isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    ) : downloadSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                    ) : (
                      <Download className="w-4 h-4 text-stone-950" />
                    )
                  }
                  iconPosition="left"
                  className="w-full sm:w-auto px-8 py-3.5 shadow-2xl font-bold tracking-wider uppercase text-xs sm:text-sm bg-gradient-to-r from-[#e4c085] via-[#d4af37] to-[#b88c4b] hover:from-[#f0d49f] hover:to-[#c69a58] text-stone-950 border-0"
                >
                  {isGenerating
                    ? progressStatus || (language === 'en' ? 'Generating PDF…' : 'Génération du PDF…')
                    : downloadSuccess
                    ? (language === 'en' ? 'Downloaded Successfully !' : 'Press Kit Téléchargé !')
                    : (language === 'en' ? 'DOWNLOAD THE PRESS KIT (PDF)' : 'TÉLÉCHARGER LE DOSSIER DE PRESSE (PDF)')}
                </CinematicButton>

                <div className="flex items-center gap-2 text-stone-400 text-xs">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Format A4 Luxury Print Ready • Instant Generation'
                      : 'Format A4 Éditorial Haute Résolution • Génération Instantanée'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
