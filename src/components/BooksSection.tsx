import React, { useState } from 'react';
import { getBooksData } from '../data/portfolioData';
import { BookItem } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { ExternalLink, Film, Info, X, BookOpen, CheckCircle2 } from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';
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
    if (bookId === 'livre-1560') {
      return language === 'en'
        ? ['Mystic Grimoire 1560', 'Twins & Duality', 'Anomalies & Possession', 'Ancestral Heritage']
        : ['Grimoire mystique 1560', 'Jumeaux & Dualité', 'Anomalies & Esprits', 'Héritage Ancestral'];
    }
    if (bookId === 'pacte-du-demon') {
      return language === 'en'
        ? ['Occult Pact & Ambition', 'Supernatural Debt', 'Moral Collapse', 'Spiritual Redemption']
        : ['Pacte occulte & Ambition', 'Dette surnaturelle', 'Dilemme moral', 'Rachat & Salut'];
    }
    return language === 'en'
      ? ['Literary Fiction', 'Supernatural Drama', 'Ancestral Quest']
      : ['Fiction littéraire', 'Drame surnaturel', 'Quête ancestrale'];
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
                    <CinematicImage
                      src={book.image}
                      alt={book.title}
                      aspectRatio="9/13"
                      objectFit="cover"
                      type="book"
                      title={book.title}
                      category={book.category}
                      className="transition-transform duration-500 group-hover:scale-105"
                      containerClassName="border-0"
                      overlay={
                        <>
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
                        </>
                      }
                    />
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

      {/* Modal Détails / Fiche Complète du Livre */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-[#181b1a] rounded-2xl max-w-3xl w-full p-5 sm:p-7 border border-white/15 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-brand-amber/20 text-brand-amber rounded inline-block">
                  {selectedBook.type}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1.5">
                  {selectedBook.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBook(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer transition-colors"
                aria-label={t('books.closeModal')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps Modal : Grille 2 colonnes avec couverture grand format */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* Couverture Grand Format */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative aspect-[2/3] w-full max-w-[280px] rounded-xl overflow-hidden border border-brand-gold/40 shadow-2xl bg-black/60 group">
                  <CinematicImage
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    aspectRatio="2/3"
                    objectFit="cover"
                    type="book"
                    title={selectedBook.title}
                    category={selectedBook.category}
                    className="transition-transform duration-500 group-hover:scale-105"
                    containerClassName="border-0"
                    overlay={
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                          <span className="inline-block px-2.5 py-1 rounded bg-black/80 border border-brand-gold/40 text-[9.5px] uppercase tracking-widest text-brand-amber font-bold shadow">
                            {selectedBook.badge || 'Couverture Officielle'}
                          </span>
                        </div>
                      </>
                    }
                  />
                </div>
                <p className="text-[10px] text-stone-400 font-medium text-center mt-2 tracking-wider uppercase">
                  {selectedBook.author}
                  <span className="block text-brand-gold/80 text-[9px]">Auteur</span>
                </p>
              </div>

              {/* Détails & Contenu */}
              <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
                {/* Spécifications du Livre */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="uppercase text-[10px] font-bold tracking-wider">{t('books.authorLabel')} :</span>
                    <strong className="text-white font-semibold">{selectedBook.author}</strong>
                  </div>
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="uppercase text-[10px] font-bold tracking-wider">{t('books.universeLabel')} :</span>
                    <span className="text-brand-amber font-medium truncate max-w-[220px] text-right">{selectedBook.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400">
                    <span className="uppercase text-[10px] font-bold tracking-wider">{t('books.availableLabel')} :</span>
                    <span className="text-stone-200 font-semibold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-brand-gold" /> Amazon
                    </span>
                  </div>
                </div>

                {/* Logline */}
                {selectedBook.logline && (
                  <div>
                    <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1">
                      {language === 'en' ? 'Official Logline:' : 'Logline Officielle :'}
                    </strong>
                    <p className="italic bg-black/30 p-3 rounded-xl border border-white/10 text-stone-200">
                      « {selectedBook.logline} »
                    </p>
                  </div>
                )}

                {/* Pitch / Synopsis complet */}
                <div>
                  <strong className="text-white uppercase font-bold text-xs tracking-wider block mb-1.5">
                    {selectedBook.pitch
                      ? (language === 'en' ? 'Official Pitch:' : 'Pitch Officiel :')
                      : (language === 'en' ? 'Complete Synopsis:' : 'Synopsis Complet :')}
                  </strong>
                  <div className="text-stone-300 leading-relaxed space-y-2 text-xs sm:text-[13px]">
                    {(selectedBook.pitch || selectedBook.summary || selectedBook.description)
                      .split('\n\n')
                      .map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                  </div>
                </div>

                {/* Extrait Littéraire */}
                {selectedBook.extract && (
                  <div className="p-3.5 rounded-xl bg-black/40 border-l-2 border-brand-gold border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1">
                      {language === 'en' ? 'Literary Excerpt' : 'Extrait de l’œuvre'}
                    </span>
                    <p className="text-xs italic text-stone-300 font-serif leading-relaxed">
                      {selectedBook.extract}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Modal */}
            <div className="pt-3.5 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
              <CinematicButton
                variant="amazon"
                size="md"
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
