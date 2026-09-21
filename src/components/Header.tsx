import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onReplayIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  // Scroll listener for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC key handler for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'accueil', label: t('nav.home'), href: '#hero' },
    { id: 'livres', label: t('nav.books'), href: '#livres' },
    { id: 'foret-interdite', label: t('nav.foret'), href: '#foret-interdite' },
    { id: 'films', label: t('nav.films'), href: '#films' },
    { id: 'series', label: t('nav.series'), href: '#series' },
    { id: 'audio', label: t('nav.audio'), href: '#audio' },
    { id: 'univers', label: t('nav.universe'), href: '#univers' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'accueil') {
      setCurrentView('accueil');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center px-3 sm:px-4 md:px-6 transition-all duration-300 ${
          scrolled ? 'pt-2 sm:pt-2.5' : 'pt-2.5 sm:pt-3 lg:pt-4'
        }`}
      >
        <div
          className={`glass-header-panel pointer-events-auto animate-header-enter transition-all duration-300 grid grid-cols-[minmax(0,1fr)_auto] xl:flex xl:items-center xl:justify-between items-center gap-3 sm:gap-4 xl:gap-5 ${
            scrolled
              ? 'min-h-[58px] sm:min-h-[62px] xl:min-h-[68px] py-2.5 px-3.5 sm:px-4.5 xl:py-2.5 xl:px-7'
              : 'min-h-[62px] sm:min-h-[66px] xl:min-h-[72px] py-3 px-3.5 sm:px-4.5 xl:py-3 xl:px-7'
          }`}
        >
          {/* GAUCHE: [ JUNIOR FRANCE MAVIE NGAKOSSO ] (Zone dédiée indépendante, min-w-0, retour à la ligne naturel sans collision) */}
          <a
            id="brand-name-link"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex flex-col group cursor-pointer text-left min-w-0 overflow-hidden pr-2 sm:pr-3"
            aria-label="Junior France Mavie Ngakosso — Accueil"
          >
            <span className="font-cinzel tracking-[0.04em] sm:tracking-[0.08em] xl:tracking-[0.14em] text-[clamp(13px,3.8vw,17px)] xl:text-[14.5px] font-black text-white group-hover:text-brand-amber transition-colors leading-[1.22] break-words xl:whitespace-nowrap">
              JUNIOR FRANCE MAVIE NGAKOSSO
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] xl:text-[9px] tracking-[0.12em] sm:tracking-[0.16em] xl:tracking-[0.20em] text-brand-amber uppercase font-semibold leading-tight mt-0.5 break-words xl:whitespace-nowrap">
              {t('hero.roleSubtitle')}
            </span>
          </a>

          {/* CENTRE DESKTOP: [ NAVIGATION ] (Visible uniquement sur Desktop xl: >=1280px) */}
          <nav
            id="desktop-nav"
            className="hidden xl:flex flex-1 items-center justify-center gap-0.5 xl:gap-1 2xl:gap-1.5 px-1"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-2 lg:px-2.5 xl:px-3 py-1.5 text-[11px] font-semibold tracking-wider text-stone-300 hover:text-white uppercase glass-nav-pill rounded-lg whitespace-nowrap cursor-pointer transition-all duration-250"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* DROITE DESKTOP: [ FR/EN SELECTOR ] [ CONTACT CTA ] (Visible uniquement sur Desktop xl: >=1280px) */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {/* Nouveau Sélecteur de Langue Haut de Gamme */}
            <LanguageSwitcher variant="header" />

            {/* Bouton CONTACT */}
            <a
              id="header-contact-cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center justify-center gap-1.5 min-h-[42px] h-[42px] px-5 text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-brand-amber to-brand-gold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t('nav.contact')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* DROITE MOBILE / TABLETTE: Bouton HAMBURGER (Colonne dédiée 44x44px, shrink-0, sans collision) */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden glass-tool-btn w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-stone-200 cursor-pointer active:scale-95 transition-all shrink-0 justify-self-end"
            aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-amber" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Panneau Flottant Menu Mobile & Tablette */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer"
            className="xl:hidden w-[calc(100%-24px)] max-w-[480px] mx-auto mt-2.5 p-5 sm:p-6 glass-header-panel pointer-events-auto flex flex-col gap-4 shadow-2xl animate-menu-enter max-h-[85vh] overflow-y-auto"
          >
            {/* Entête du menu */}
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></span>
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                  {t('nav.menu')}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer active:scale-95 transition-colors"
                aria-label={t('nav.closeMenu')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. SECTION NAVIGATION */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 px-3 block mb-1">
                {t('nav.navTitle')}
              </span>
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-4 py-3 min-h-[44px] flex items-center justify-between text-xs uppercase font-semibold tracking-wider rounded-xl transition-all cursor-pointer ${
                      item.id === 'contact'
                        ? 'bg-gradient-to-r from-brand-amber/20 to-brand-gold/20 text-brand-amber border border-brand-gold/30 hover:brightness-110'
                        : 'text-stone-200 hover:text-brand-amber hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.id === 'contact' && <ArrowUpRight className="w-4 h-4 text-brand-amber" />}
                  </a>
                ))}
              </div>
            </div>

            {/* SÉPARATION VISUELLE */}
            <div className="h-px bg-white/10 my-0.5"></div>

            {/* 2. SECTION LANGUE DÉDIÉE DANS LE MENU MOBILE */}
            <div className="pt-1">
              <LanguageSwitcher variant="mobile" />
            </div>
          </div>
        )}
      </header>

      {/* Backdrop sombre semi-transparent au clic pour fermer le menu sur mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="xl:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fadeIn"
          aria-hidden="true"
        />
      )}
    </>
  );
};
