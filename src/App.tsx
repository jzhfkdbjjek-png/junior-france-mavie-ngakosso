import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BooksSection } from './components/BooksSection';
import { SpotlightSection } from './components/SpotlightSection';
import { CatalogueSection } from './components/CatalogueSection';
import { UniversSection } from './components/UniversSection';
import { PressKitSection } from './components/PressKitSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CinematicBookLoader } from './components/CinematicBookLoader';
import { NotFoundPage } from './components/NotFoundPage';
import { ForetInterditePage } from './components/ForetInterditePage';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
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
      <NotFoundPage
        onReturnHome={handleReturnHome}
        onExploreWorks={handleExploreWorks}
        onContactClick={handleContactFrom404}
      />
    );
  }

  if (currentView === 'foret-interdite') {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-[#f2ede4] font-sans selection:bg-[#c59b63] selection:text-black">
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
        {/* Hero Section with Official Portrait & Floating Editorial Cards */}
        <HeroSection
          hasLoaded={!isLoading}
          onExploreWorks={() => handleNavigateSection('livres')}
          onContactClick={() => handleNavigateSection('contact')}
          onNavigateSection={handleNavigateSection}
        />

        {/* Section 2 — Publications Officielles (Mes Livres & Adaptations) */}
        <BooksSection
          onNavigateFilms={() => handleNavigateSection('films')}
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 3 — Événement Audiovisuel Phare : LA FORÊT INTERDITE */}
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

        {/* Section 5 — Mon Univers */}
        <UniversSection />

        {/* Section 7 — Presse & Médias : Press Kit Professionnel A4 */}
        <PressKitSection />

        {/* Section 8 — Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
