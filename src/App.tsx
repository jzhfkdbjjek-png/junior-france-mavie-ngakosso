import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BooksSection } from './components/BooksSection';
import { SpotlightSection } from './components/SpotlightSection';
import { CatalogueSection } from './components/CatalogueSection';
import { AudioSection } from './components/AudioSection';
import { UniversSection } from './components/UniversSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CinematicBookLoader } from './components/CinematicBookLoader';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('accueil');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize scroll observer whenever loading state changes
  useScrollReveal(!isLoading);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        onReplayIntro={handleReplayIntro}
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
          onNavigateForet={() => handleNavigateSection('foret-interdite')}
          onNavigateFilms={() => handleNavigateSection('films')}
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 3 — Événement Audiovisuel Phare : LA FORÊT INTERDITE */}
        <SpotlightSection
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 4 — Scénarios (Films) & Créations (Séries) */}
        <CatalogueSection
          onNavigateForet={() => handleNavigateSection('foret-interdite')}
          onNavigateLivres={() => handleNavigateSection('livres')}
          onContactClick={() => handleNavigateSection('contact')}
        />

        {/* Section 5 — Audio « La Voix des Œuvres » */}
        <AudioSection />

        {/* Section 6 — Mon Univers */}
        <UniversSection />

        {/* Section 7 — Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onReplayIntro={handleReplayIntro}
      />
    </div>
  );
}
