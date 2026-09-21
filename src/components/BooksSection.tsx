import React, { useState } from 'react';
import { getBooksData } from '../data/portfolioData';
import { BookItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { ExternalLink, Film, Info, X, BookOpen, CheckCircle2 } from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { ExpandableText } from './ExpandableText';

interface BooksSectionProps {
  onNavigateFilms?: () => void;
  onContactClick?: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  onNavigateFilms,
}) => {
  const { t, language } = useI18n();
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const booksData = getBooksData(language);

  const handleAdaptationClick = (_book: BookItem) => {
    if (onNavigateFilms) {
      onNavigateFilms();
    } else {
      const el = document.querySelector('#films');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getBookThemes = (bookId: string) => {
    if (bookId === 'cercueil-aux-muscles') {
      return language === 'en'
        ? ['Grief & Loss', 'Masculinity & Armor', 'Family Secrets', 'Personal Reconstruction']
        : ['Deuil & Douleur', 'Masculinité & Armure', 'Secrets de Famille', 'Reconstruction Personnelle'];
    }
    return language === 'en'
      ? ['Occult Pact & Ambition', 'Supernatural Debt', 'Moral Collapse', 'Spiritual Redemption']
      : ['Pacte occulte & Ambition', 'Dette surnaturelle', 'Dilemme moral', 'Rachat & Salut'];
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

        {/* Books List — Exactly Two Books */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {booksData.map((book) => (
            <div
              key={book.id}
              id={`book-${book.id}`}
              data-reveal="fade-up"
              className="bg-[#181b1a] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-300 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Couverture Livre */}
                <div className="md:col-span-5 relative overflow-hidden bg-stone-900 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-stone-900 via-[#151716] to-[#0e100f]">
                  <div className="relative aspect-[9/13] w-full max-w-[260px] shadow-2xl rounded-lg overflow-hidden border border-white/15 group">
                    <img
                      src={book.image}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest backdrop-blur-md rounded border bg-black/85 text-brand-amber border-brand-amber/30">
                        {book.badge}
                      </span>
                    </div>
                    {book.subBadge && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded font-sans shadow bg-brand-amber text-black font-semibold">
                          {book.subBadge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Métadonnées & Présentation Détaillée */}
                <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-brand-gold">
                        {book.category}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {book.type}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-tight">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 font-medium mt-1">
                        {t('books.authorLabel')} : <strong className="text-stone-200">{book.author}</strong>
                      </p>
                    </div>

                    {/* Présentation */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/90 block mb-1">
                        {language === 'en' ? 'Presentation' : 'Présentation'}
                      </span>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        {book.description}
                      </p>
                    </div>

                    {/* Résumé / Synopsis */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/90 block mb-1">
                        {language === 'en' ? 'Synopsis' : 'Résumé / Synopsis'}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-400 leading-relaxed line-clamp-3">
                        {book.summary}
                      </p>
                    </div>

                    {/* Extrait */}
                    {book.extract && (
                      <div className="p-3 sm:p-3.5 rounded-lg bg-black/40 border-l-2 border-brand-gold border-white/5">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold block mb-1">
                          {language === 'en' ? 'Excerpt' : 'Extrait de l’œuvre'}
                        </span>
                        <p className="text-xs italic text-stone-300 font-serif leading-relaxed">
                          {book.extract}
                        </p>
                      </div>
                    )}

                    {/* Informations disponibles / Thématiques */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">
                        {language === 'en' ? 'Available Information & Themes' : 'Informations disponibles & Thématiques'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                          <BookOpen className="w-2.5 h-2.5 shrink-0" />
                          {language === 'en' ? 'Available on Amazon' : 'Disponible sur Amazon'}
                        </span>
                        {getBookThemes(book.id).map((theme) => (
                          <span
                            key={theme}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-stone-300 border border-white/10"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-brand-gold shrink-0" />
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'Action & Passerelles */}
                  <div className="space-y-3 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                    {/* Bouton Amazon */}
                    <CinematicButton
                      variant="amazon"
                      size="md"
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                      iconPosition="right"
                      className="flex-1 min-w-[180px]"
                    >
                      {t('books.buyAmazon')}
                    </CinematicButton>

                    {/* Bouton Passerelle Audiovisuelle (pour Cercueil aux muscles) */}
                    {book.adaptationNote && (
                      <CinematicButton
                        variant="secondary"
                        size="md"
                        onClick={() => handleAdaptationClick(book)}
                        icon={<Film className="w-3.5 h-3.5 text-brand-amber shrink-0" />}
                        iconPosition="left"
                        className="flex-1 min-w-[200px]"
                      >
                        {book.adaptationNote}
                      </CinematicButton>
                    )}

                    {/* Bouton Détails / Fiche Complète */}
                    <CinematicButton
                      variant="ghost"
                      size="md"
                      onClick={() => setSelectedBook(book)}
                      icon={<Info className="w-3.5 h-3.5" />}
                      iconPosition="left"
                      className="text-stone-400 hover:text-white"
                    >
                      {t('books.readSynopsis')}
                    </CinematicButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div className="p-3.5 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{t('books.authorLabel')} :</span>
                  <strong className="text-white">{selectedBook.author}</strong>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{t('books.universeLabel')} :</span>
                  <span className="text-brand-amber">{selectedBook.category}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>{t('books.availableLabel')} :</span>
                  <span className="text-stone-300 font-semibold">Amazon</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  {language === 'en' ? 'Presentation' : 'Présentation'}
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                  {language === 'en' ? 'Complete Synopsis' : 'Synopsis Complet'}
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  {selectedBook.summary || selectedBook.description}
                </p>
              </div>

              {selectedBook.extract && (
                <div className="p-3.5 rounded-lg bg-black/40 border-l-2 border-brand-gold border-white/5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                    {language === 'en' ? 'Literary Excerpt' : 'Extrait de l’œuvre'}
                  </h4>
                  <p className="text-xs italic text-stone-300 font-serif leading-relaxed">
                    {selectedBook.extract}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex gap-2">
                <CinematicButton
                  variant="amazon"
                  size="sm"
                  href={selectedBook.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="flex-1"
                >
                  {t('books.buyAmazon')}
                </CinematicButton>
                <CinematicButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBook(null)}
                >
                  {t('books.closeModal')}
                </CinematicButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
