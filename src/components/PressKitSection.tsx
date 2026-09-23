import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { FileText, Download, CheckCircle2, Eye, ShieldCheck, Loader2 } from 'lucide-react';
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
      }, 5000);
    } catch (err) {
      console.error('Error generating PDF Press Kit:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const pressHighlights = [
    {
      page: '01',
      title: language === 'en' ? 'Official Portrait & Cover' : 'Couverture & Portrait Officiel',
      desc: language === 'en' ? 'A4 Editorial Identity & Creative Credentials' : 'Identité visuelle A4 & Fonctions d’auteur',
    },
    {
      page: '02–03',
      title: language === 'en' ? 'Biography & Artistic Vision' : 'Biographie & Vision Artistique',
      desc: language === 'en' ? 'African cinema, Congolese narratives, thriller & fantasy' : 'Cinéma africain, récits congolais, thriller & fantastique',
    },
    {
      page: '04',
      title: language === 'en' ? 'Bibliography' : 'Bibliographie',
      desc: language === 'en' ? 'Le Cercueil aux Muscles, La Forêt Interdite' : 'Le Cercueil aux Muscles, La Forêt Interdite',
    },
    {
      page: '05–06',
      title: language === 'en' ? 'Feature Films & Series' : 'Films & Créations Séries',
      desc: language === 'en' ? '7 Films, 6 TV Series, Loglines & Formats' : '7 Longs-métrages, 6 Séries, Loglines & Formats',
    },
    {
      page: '07–09',
      title: language === 'en' ? 'Universe & Contact' : 'Univers & Droits Professionnels',
      desc: language === 'en' ? 'Creative Pillars, Book-to-Screen Links, Direct Contacts' : 'Piliers narratifs, passerelles livres/écrans, contacts directs',
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
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {language === 'en' ? 'Press & Media Hub' : 'Presse & Médias'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {language === 'en' ? 'DOSSIER' : 'DOSSIER'}{' '}
              <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl">
                ARTISTIQUE
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            {language === 'en'
              ? 'Official comprehensive Press Kit for producers, festival programmers, editors, journalists and distribution platforms.'
              : 'Dossier de référence officiel pour producteurs, festivals, éditeurs, journalistes et plateformes de diffusion.'}
          </p>
        </div>

        {/* Main Press Kit Banner / Card */}
        <div
          data-reveal="fade-up"
          className="relative rounded-3xl bg-gradient-to-b from-[#161a18] to-[#101211] border border-white/10 p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Radial */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Author Portrait Preview in Editorial Frame */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-brand-gold/40 shadow-2xl bg-stone-900">
                <CinematicImage
                  src={OFFICIAL_IMAGES.portrait}
                  alt="Junior France Mavie Ngakosso — Dossier Artistique"
                  aspectRatio="4/5"
                  objectFit="cover"
                  objectPosition="top"
                  type="portrait"
                  title="Dossier de Référence A4"
                  category="Junior France Mavie Ngakosso"
                  containerClassName="border-0"
                  className="filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                  overlay={
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute bottom-4 inset-x-4 text-center pointer-events-none">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold block mb-1">
                          Dossier de Référence A4
                        </span>
                        <p className="text-xs font-semibold text-white">
                          Junior France Mavie Ngakosso
                        </p>
                      </div>
                    </>
                  }
                />
              </div>
            </div>

            {/* Dossier Content & Specs */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-amber text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3">
                  <FileText className="w-3.5 h-3.5 text-brand-amber" />
                  <span>Document Professionnel • 9 Pages A4</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white mb-2">
                  PRESS KIT & PRÉSENTATION D’AUTEUR
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl mb-6">
                  {language === 'en'
                    ? 'This reference dossier gathers the complete creative universe of Junior France Mavie Ngakosso: verified author biography, artistic vision, literary bibliography, filmography loglines, television series bibles, and direct contact details.'
                    : 'Ce dossier artistique rassemble l’univers complet de Junior France Mavie Ngakosso : biographie certifiée, vision artistique, bibliographie littéraire, projets cinéma, bibles de séries télévisées et contacts professionnels directs.'}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {pressHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-xs font-mono font-bold text-brand-amber bg-brand-gold/15 px-2 py-0.5 rounded">
                        {item.page}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Download Feedback */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <CinematicButton
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  disabled={isGenerating}
                  icon={
                    isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : downloadSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )
                  }
                  iconPosition="left"
                  className="w-full sm:w-auto px-8 py-3.5 shadow-xl font-bold tracking-wider uppercase text-xs sm:text-sm"
                >
                  {isGenerating
                    ? progressStatus || (language === 'en' ? 'Generating PDF…' : 'Génération du PDF…')
                    : downloadSuccess
                    ? (language === 'en' ? 'Downloaded Successfully' : 'Press Kit Téléchargé !')
                    : (language === 'en' ? 'DOWNLOAD THE PRESS KIT' : 'TÉLÉCHARGER LE PRESS KIT')}
                </CinematicButton>

                <div className="flex items-center gap-2 text-stone-400 text-xs">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    {language === 'en'
                      ? 'Official PDF format • Direct client-side generation'
                      : 'Format PDF officiel A4 • Génération instantanée'}
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
