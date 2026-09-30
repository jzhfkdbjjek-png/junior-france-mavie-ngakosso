import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from 'lucide-react';
import { CinematicImage } from './CinematicImage';

export const MediathequeSection: React.FC = () => {
  const { language } = useI18n();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 'gallery-foret',
      title: 'LA FORÊT INTERDITE',
      category: language === 'en' ? 'TV Series 8×52min' : 'Série TV 8×52 min',
      image: OFFICIAL_IMAGES.seriesForet,
      aspectRatio: '2/3',
      description: language === 'en' ? 'Official key art • Supernatural Congolese Saga' : 'Affiche officielle • Saga mystique congolaise',
    },
    {
      id: 'gallery-cercueil',
      title: 'LE CERCUEIL AUX MUSCLES',
      category: language === 'en' ? 'Published Novel & Feature Film' : 'Roman Officiel & Film',
      image: OFFICIAL_IMAGES.bookCercueil,
      aspectRatio: '2/3',
      description: language === 'en' ? 'Book cover & cinematic universe' : 'Couverture officielle & univers cinématographique',
    },
    {
      id: 'gallery-pacte',
      title: 'LE PACTE DU DÉMON',
      category: language === 'en' ? 'Published Novel' : 'Roman Officiel',
      image: OFFICIAL_IMAGES.bookPacte,
      aspectRatio: '2/3',
      description: language === 'en' ? 'Official book cover • Mystical Thriller' : 'Couverture officielle • Thriller mystique',
    },
    {
      id: 'gallery-heritage',
      title: "L'HÉRITAGE DES OMBRES",
      category: language === 'en' ? 'TV Series 8×45min' : 'Série TV 8×45 min',
      image: OFFICIAL_IMAGES.posterHeritageOmbres,
      aspectRatio: '2/3',
      description: language === 'en' ? 'Corporate thriller in Brazzaville' : 'Thriller politico-financier à Brazzaville',
    },
    {
      id: 'gallery-royaume',
      title: 'ROYAUME 242',
      category: language === 'en' ? 'TV Series 8×52min' : 'Série TV 8×52 min',
      image: OFFICIAL_IMAGES.posterRoyaume242,
      aspectRatio: '2/3',
      description: language === 'en' ? 'Geopolitical saga in Pool & Brazzaville' : 'Saga géopolitique dans le Pool',
    },
    {
      id: 'gallery-portrait',
      title: 'JUNIOR FRANCE MAVIE NGAKOSSO',
      category: language === 'en' ? 'Official Author Portrait' : 'Portrait Officiel',
      image: OFFICIAL_IMAGES.portrait,
      aspectRatio: '4/5',
      description: language === 'en' ? 'Writer • Screenwriter • Series Creator' : 'Auteur • Créateur • Scénariste',
    },
  ];

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') setSelectedIdx((prev) => (prev! + 1) % galleryItems.length);
      if (e.key === 'ArrowLeft') setSelectedIdx((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
    };

    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdx, galleryItems.length]);

  return (
    <section
      id="mediatheque"
      className="py-14 sm:py-20 lg:py-24 bg-[#0a0c0b] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
        {/* Header (Mobile First) */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-amber text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span>{language === 'en' ? 'Visual Gallery' : 'Galerie & Photogrammes'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
            <span>{language === 'en' ? 'CINEMATIC' : 'UNIVERS'}{' '}</span>
            <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl">
              {language === 'en' ? 'GALLERY' : 'VISUEL'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
            {language === 'en'
              ? 'Explore the official key art, concept designs, and posters from the literary and audiovisual universe.'
              : 'Explorez les affiches officielles, couvertures et univers graphiques des œuvres littéraires et cinématographiques.'}
          </p>
        </div>

        {/* Gallery Grid (Ergonomic mobile columns, touchable cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              data-reveal="fade-up"
              data-cursor="OUVRIR"
              onClick={() => setSelectedIdx(idx)}
              className="group relative rounded-xl overflow-hidden bg-stone-900 border border-white/10 hover:border-brand-gold/50 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Touch indicator / expand icon */}
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3 text-brand-gold" />
                </div>

                {/* Caption overlay */}
                <div className="absolute inset-x-2 bottom-2 text-left pointer-events-none">
                  <span className="block text-[8px] uppercase tracking-wider text-brand-amber font-semibold truncate">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-[10px] sm:text-xs font-bold text-white leading-tight truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Mobile-First Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-fadeIn"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-4xl flex items-center justify-between z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-amber">
                {galleryItems[selectedIdx].category}
              </span>
              <h3 className="font-cinzel text-sm sm:text-lg md:text-xl font-bold text-white">
                {galleryItems[selectedIdx].title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer active:scale-90"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Viewer */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 max-h-[75vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[selectedIdx].image}
              alt={galleryItems[selectedIdx].title}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-white/15"
            />
          </div>

          {/* Bottom Controls & Description */}
          <div
            className="w-full max-w-md flex items-center justify-between gap-4 z-10 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setSelectedIdx(
                  (prev) => (prev! - 1 + galleryItems.length) % galleryItems.length
                )
              }
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer active:scale-90 flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden xs:inline">{language === 'en' ? 'Prev' : 'Précédent'}</span>
            </button>

            <span className="text-xs text-stone-400 font-mono">
              {selectedIdx + 1} / {galleryItems.length}
            </span>

            <button
              type="button"
              onClick={() =>
                setSelectedIdx((prev) => (prev! + 1) % galleryItems.length)
              }
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer active:scale-90 flex items-center gap-1 text-xs font-semibold"
            >
              <span className="hidden xs:inline">{language === 'en' ? 'Next' : 'Suivant'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
