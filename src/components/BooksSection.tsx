import React, { useState } from 'react';
import { getBooksData } from '../data/portfolioData';
import { BookItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { ExternalLink, Film, Tv, Info, X } from 'lucide-react';
import { CinematicButton } from './CinematicButton';

interface BooksSectionProps {
  onNavigateForet?: () => void;
  onNavigateFilms?: () => void;
  onContactClick?: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  onNavigateForet,
  onNavigateFilms,
}) => {
  const { t, language } = useI18n();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const booksData = getBooksData(language);

  const handleAdaptationClick = (book: BookItem) => {
    if (book.adaptationType === 'series') {
      if (onNavigateForet) {
        onNavigateForet();
      } else {
        const el = document.querySelector('#foret-interdite');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (book.adaptationType === 'film') {
      if (onNavigateFilms) {
        onNavigateFilms();
      } else {
        const el = document.querySelector('#films');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="livres"
      className="py-16 sm:py-20 lg:py-24 bg-[#0e100f] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div data-reveal="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 lg:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
              <span className="h-px w-6 sm:w-8 bg-brand-gold"></span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                {t('books.badge')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
              {t('books.title')}{' '}
              <span className="font-serif italic font-normal text-brand-amber">
                {t('books.titleAccent')}
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            {t('books.subtitle')}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8">
          {booksData.slice(0, 2).map((book, idx) => {
            const isForet = book.id === 'foret-interdite';

            return (
              <div
                key={book.id}
                data-reveal="fade-up"
                className={`delay-${(idx + 1) * 150} bg-[#181b1a] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-lg card-premium-hover ${
                  isForet
                    ? 'border-red-900/40 hover:border-red-500/60'
                    : 'border-white/10 hover:border-brand-gold/60'
                }`}
              >
                {/* Couverture Livre */}
                <div className="relative overflow-hidden aspect-[9/12] sm:aspect-[9/13] bg-stone-900">
                  <img
                    src={book.image}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover image-zoom-hover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest backdrop-blur-md rounded border ${
                        isForet
                          ? 'bg-black/85 text-red-400 border-red-500/40'
                          : 'bg-black/85 text-brand-amber border-brand-amber/30'
                      }`}
                    >
                      {book.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded font-sans shadow ${
                        isForet
                          ? 'bg-red-600 text-white'
                          : 'bg-brand-amber text-black'
                      }`}
                    >
                      {book.subBadge}
                    </span>
                  </div>
                </div>

                {/* Métadonnées & Résumé */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${
                          isForet ? 'text-red-400' : 'text-brand-gold'
                        }`}
                      >
                        {book.category}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {book.type}
                      </span>
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-cinzel font-bold text-white mt-1.5 transition-colors ${
                        isForet
                          ? 'group-hover:text-red-400'
                          : 'group-hover:text-brand-amber'
                      }`}
                    >
                      {book.title}
                    </h3>

                    <p className="text-xs text-stone-400 font-medium mt-1">
                      {t('books.authorLabel')} : <strong className="text-stone-200">{book.author}</strong>
                    </p>

                    <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Boutons d'Action & Passerelles */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 flex flex-col">
                    {/* Bouton Amazon */}
                    <CinematicButton
                      variant="amazon"
                      size="md"
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                      iconPosition="right"
                      className="w-full"
                    >
                      {t('books.buyAmazon')}
                    </CinematicButton>

                    {/* Bouton Passerelle Audiovisuelle (Livre <-> Film / Série) */}
                    {book.adaptationNote && (
                      <CinematicButton
                        variant={isForet ? 'project' : 'secondary'}
                        size="sm"
                        onClick={() => handleAdaptationClick(book)}
                        icon={
                          isForet ? (
                            <Tv className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          ) : (
                            <Film className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                          )
                        }
                        iconPosition="left"
                        className="w-full"
                      >
                        {book.adaptationNote}
                      </CinematicButton>
                    )}

                    {/* Bouton Détails / Résumé Complet */}
                    <CinematicButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBook(book)}
                      icon={<Info className="w-3.5 h-3.5" />}
                      iconPosition="left"
                      className="w-full text-stone-400 hover:text-white"
                    >
                      {t('books.readSynopsis')}
                    </CinematicButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Détails / Résumé Complet */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-[#181b1a] rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-amber block">
                  {selectedBook.type}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mt-0.5">
                  {selectedBook.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBook(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                aria-label={t('books.closeModal')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div>
                <strong className="text-white block font-semibold mb-1">
                  {t('books.universeLabel')} :
                </strong>
                <p className="text-stone-400">{selectedBook.universe}</p>
              </div>

              <div>
                <strong className="text-white block font-semibold mb-1">
                  {language === 'en' ? 'Summary:' : 'Résumé :'}
                </strong>
                <p className="text-stone-300 whitespace-pre-line leading-relaxed">
                  {selectedBook.summary}
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-xs space-y-1">
                <p>
                  <strong className="text-white">{t('books.authorLabel')} :</strong> {selectedBook.author}
                </p>
                <p>
                  <strong className="text-white">{t('books.availableLabel')} :</strong> Amazon
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
              <CinematicButton
                variant="amazon"
                size="md"
                href={selectedBook.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="flex-1"
              >
                {t('books.buyAmazon')}
              </CinematicButton>
              <CinematicButton
                variant="ghost"
                size="md"
                onClick={() => setSelectedBook(null)}
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
