import React from 'react';
import { CinematicButton } from './CinematicButton';
import { ArrowLeft, Compass, BookOpen, Mail } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface NotFoundPageProps {
  onReturnHome: () => void;
  onExploreWorks?: () => void;
  onContactClick?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onReturnHome,
  onExploreWorks,
  onContactClick,
}) => {
  const { language } = useI18n();

  return (
    <div className="relative min-h-screen w-full bg-[#0b0d0c] text-[#f2ede4] flex flex-col justify-between overflow-hidden selection:bg-[#c59b63] selection:text-black">
      {/* Background Subtle Cinematic Texture & Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(197,155,99,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Top Bar Minimalist */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-stone-400 text-xs tracking-[0.2em] uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span>Junior France Mavie Ngakosso</span>
        </div>

        <button
          onClick={onReturnHome}
          className="text-stone-400 hover:text-brand-amber transition-colors text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Home' : 'Accueil'}</span>
        </button>
      </header>

      {/* Center Artistic 404 Composition */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10 sm:py-16 flex flex-col items-center text-center my-auto">
        {/* Grand Titre : 404 */}
        <h1 className="font-cinzel text-7xl sm:text-9xl md:text-[10rem] font-bold tracking-tight text-white/90 leading-none select-none mb-4 sm:mb-6">
          404
        </h1>

        {/* Small Editorial Eyebrow */}
        <div className="flex items-center gap-2.5 mb-4 opacity-90 animate-fade-in">
          <span className="h-px w-6 sm:w-8 bg-brand-gold/60"></span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {language === 'en' ? 'Unwritten Chapter' : 'Chapitre Inédit'}
          </span>
          <span className="h-px w-6 sm:w-8 bg-brand-gold/60"></span>
        </div>

        {/* Sous-titre poétique ou cinématographique */}
        <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug mb-4 max-w-xl">
          {language === 'en'
            ? 'The manuscript you are looking for has not yet been written.'
            : 'Le manuscrit que vous cherchez n’a pas encore été écrit.'}
        </h2>

        {/* Texte court explicatif */}
        <p className="font-serif italic text-stone-300 text-sm sm:text-base md:text-lg max-w-md leading-relaxed mb-8 sm:mb-10 opacity-90">
          {language === 'en'
            ? 'This page was lost between two narratives or moved into the creative archives.'
            : 'Cette page s’est perdue entre deux récits ou a été déplacée dans les archives créatives.'}
        </p>

        {/* Actions : Bouton Principal + Bouton Secondaire */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <CinematicButton
            variant="primary"
            size="lg"
            onClick={onReturnHome}
            icon={<Compass className="w-4 h-4" />}
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-3.5 shadow-xl"
          >
            {language === 'en' ? 'RETURN TO HOME' : 'RETOURNER À L’ACCUEIL'}
          </CinematicButton>

          {onExploreWorks && (
            <CinematicButton
              variant="secondary"
              size="lg"
              onClick={onExploreWorks}
              icon={<BookOpen className="w-4 h-4 text-brand-gold" />}
              iconPosition="left"
              className="w-full sm:w-auto px-6 py-3.5"
            >
              {language === 'en' ? 'DISCOVER THE WORKS' : 'DÉCOUVRIR LES ŒUVRES'}
            </CinematicButton>
          )}
        </div>

        {/* Lien discret : CONTACTER L’AUTEUR */}
        {onContactClick && (
          <button
            onClick={onContactClick}
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-brand-amber transition-colors uppercase tracking-widest font-semibold cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-amber transition-colors" />
            <span>{language === 'en' ? 'Contact the author' : 'Contacter l’auteur'}</span>
          </button>
        )}
      </main>

      {/* Bottom Minimalist Colophon */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-[10px] sm:text-xs text-stone-500 uppercase tracking-[0.2em]">
        <span>Junior France Mavie Ngakosso — Univers Narratif & Cinéma</span>
      </footer>
    </div>
  );
};
