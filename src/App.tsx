import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CinematicMarquee } from './components/CinematicMarquee';
import { BooksSection } from './components/BooksSection';
import { SpotlightSection } from './components/SpotlightSection';
import { CatalogueSection } from './components/CatalogueSection';
import { UniversSection } from './components/UniversSection';
import { MediathequeSection } from './components/MediathequeSection';
import { JournalSection } from './components/JournalSection';
import { EspaceProSection } from './components/EspaceProSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CinematicBookLoader } from './components/CinematicBookLoader';
import { CustomCursor } from './components/CustomCursor';
import { NotFoundPage } from './components/NotFoundPage';
import { ForetInterditePage } from './components/ForetInterditePage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSEO } from './utils/seo';
import { initAnalytics, trackPageView } from './utils/analytics';
import { useI18n } from './i18n/I18nContext';

export default function App() {
  const { language } = useI18n();

  const [currentView, setCurrentView] = useState<string>(() => {
    // Check if the current pathname or hash indicates foret-interdite or 404
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/foret-interdite' || hash === '#foret-interdite-page') {
      return 'foret-interdite';
    }
    if (path !== '/' && path !== '' && path !== '/index.html') {
      return '404';
    }
    return 'accueil';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Global SEO Configuration for Homepage & General Portfolio
  useSEO({
    title:
      language === 'en'
        ? 'Junior France Mavie Ngakosso — Writer • Author • Screenwriter • Creator'
        : 'Junior France Mavie Ngakosso — Écrivain • Auteur • Scénariste • Créateur',
    description:
      language === 'en'
        ? 'Official portfolio of Junior France Mavie Ngakosso. Discover published novels (The Muscle Coffin, The Demon\'s Pact), the TV series The Forbidden Forest, feature films and series bibles.'
        : 'Portfolio officiel de Junior France Mavie Ngakosso — Écrivain, auteur, scénariste et créateur congolais. Romans (Le Cercueil aux Muscles, Le Pacte du Démon), série TV La Forêt Interdite, longs-métrages et séries.',
    keywords:
      'Junior France Mavie Ngakosso, Écrivain congolais, Scénariste Afrique, Le Cercueil aux Muscles, Le Pacte du Démon, La Forêt Interdite, Cinéma congolais, Séries télévisées congolaises, Auteur Brazzaville',
    canonicalPath: '/',
    ogType: 'website',
  });

  // Initialize Analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views on view/route change
  useEffect(() => {
    if (currentView === 'accueil') {
      trackPageView('/', 'Accueil — Junior France Mavie Ngakosso');
    }
  }, [currentView]);

  // Handle browser back/forward, hash changes, and 404 routing
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/foret-interdite' || hash === '#foret-interdite-page') {
        setCurrentView('foret-interdite');
      } else if (path !== '/' && path !== '' && path !== '/index.html') {
        setCurrentView('404');
      } else {
        setCurrentView('accueil');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Initialize scroll observer whenever loading state changes
  useScrollReveal(!isLoading && currentView === 'accueil');

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'accueil') {
      setCurrentView('accueil');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReturnHome = () => {
    setCurrentView('accueil');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenForetPage = () => {
    setCurrentView('foret-interdite');
    window.history.pushState({}, '', '#foret-interdite-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreWorks = () => {
    setCurrentView('accueil');
    window.history.pushState({}, '', '/');
    setTimeout(() => {
      const el = document.getElementById('catalogue') || document.getElementById('livres');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactFrom404 = () => {
    setCurrentView('accueil');
    window.history.pushState({}, '', '/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (currentView === '404') {
    return (
      <>
        <NotFoundPage
          onReturnHome={handleReturnHome}
          onExploreWorks={handleExploreWorks}
          onContactClick={handleContactFrom404}
        />
        <CookieConsentBanner />
      </>
    );
  }

  if (currentView === 'foret-interdite') {
    return (
      <>
        <ForetInterditePage
          onReturnHome={handleReturnHome}
          onContactClick={() => {
            handleReturnHome();
            setTimeout(() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }}
        />
        <CookieConsentBanner />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-[#f2ede4] font-sans selection:bg-[#c59b63] selection:text-black">
      {/* Desktop-Only High-End Interactive Cursor (Disabled automatically on touch/mobile) */}
      <CustomCursor />

      {/* Cinematic 3D Book Loader Sequence */}
      {isLoading && (
        <CinematicBookLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Minimalist Floating Navigation */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Container */}
      <main className="w-full overflow-hidden">
        {/* Section 1 — Hero Section with Official Portrait (Mobile First) */}
        <HeroSection
          hasLoaded={!isLoading}
          onExploreWorks={() => handleNavigateSection('livres')}
          onContactClick={() => handleNavigateSection('contact')}
          onNavigateSection={handleNavigateSection}
        />

        {/* Transition Défilante Cinématographique & Littéraire */}
        <CinematicMarquee />

        {/* Section 2 — Publications Officielles (Mes Livres & Adaptations sur Amazon) */}
        <BooksSection
          onNavigateFilms={() => handleNavigateSection('films')}
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 3 — Événement Audiovisuel Phare : LA FORÊT INTERDITE (Série TV 8×52min) */}
        <SpotlightSection
          onContactClick={() => handleNavigateSection('contact')}
          onOpenDedicatedPage={handleOpenForetPage}
        />

        {/* Section 4 — Scénarios (Films) & Créations (Séries) avec Recherche & Filtres Avancés */}
        <CatalogueSection
          onNavigateForet={handleOpenForetPage}
          onNavigateLivres={() => handleNavigateSection('livres')}
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 5 — Mon Univers Créatif (7 Piliers Narratifs) */}
        <UniversSection />

        {/* Section 6 — Médiathèque & Photogrammes */}
        <MediathequeSection />

        {/* Section 7 — Actualités & Journal de Création */}
        <JournalSection />

        {/* Section 8 — Espace Professionnel (Bio, Biblio, Filmo, Projets, Collab) */}
        <EspaceProSection />

        {/* Section 9 — Contact & Collaboration (Mobile Ergonomic Form) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
      />

      {/* GDPR / Privacy Compliant Cookie Consent Banner */}
      <CookieConsentBanner />
    </div>
  );
}
