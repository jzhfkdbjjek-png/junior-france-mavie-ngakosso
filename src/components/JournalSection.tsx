import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Newspaper, ArrowUpRight, Calendar } from 'lucide-react';
import { analyticsEvents } from '../utils/analytics';

export const JournalSection: React.FC = () => {
  const { language } = useI18n();
  const isEn = language === 'en';

  const newsItems = [
    {
      id: 'news-foret',
      date: '2026',
      tag: isEn ? 'Prestige TV Series' : 'Série TV Événement',
      title: isEn ? 'The Forbidden Forest (8×52min) — Screenplay Finalized' : 'La Forêt Interdite (8×52min) — Finalisation de la Bible & Scénarios',
      excerpt: isEn
        ? 'Complete production bible and 8 episodic screenplays are available for international co-producers, VOD platforms, and broadcast networks.'
        : 'La bible complète et les 8 épisodes dialogués sont finalisés pour les diffuseurs panafricains, plateformes de streaming et partenaires de coproduction.',
      readMore: isEn ? 'Discover Project ↗' : 'Découvrir le Projet ↗',
      targetHref: '#foret-interdite',
    },
    {
      id: 'news-pacte',
      date: '2026',
      tag: isEn ? 'Official Novel' : 'Publication Littéraire',
      title: isEn ? '“The Demon’s Pact” — Global Release on Amazon' : '« Le Pacte du Démon » — Disponible mondialement sur Amazon',
      excerpt: isEn
        ? 'A tense mystical thriller exploring human vulnerability confronted with absolute occult temptation in Brazzaville.'
        : 'Un thriller mystique et psychologique puissant explorant l’ambition humaine face aux pactes occultes dans les rues de Brazzaville.',
      readMore: isEn ? 'Buy on Amazon ↗' : 'Acheter sur Amazon ↗',
      targetHref: 'https://a.co/d/08g7FiVA',
      isExternal: true,
    },
    {
      id: 'news-cercueil',
      date: '2026',
      tag: isEn ? 'Novel & Adaptation' : 'Roman & Adaptation Film',
      title: isEn ? '“The Muscle Coffin” — From Paper to Screen' : '« Le Cercueil aux Muscles » — Du Roman à l’Écran',
      excerpt: isEn
        ? 'Following the success of the novel on Amazon, the feature film screenplay explores mourning, armor of flesh, and vulnerability.'
        : 'Après la parution du roman sur Amazon, le scénario de long-métrage poursuit son développement pour une adaptation cinématographique poignante.',
      readMore: isEn ? 'Explore Book ↗' : 'Découvrir le Livre ↗',
      targetHref: 'https://a.co/d/01ZNkXtg',
      isExternal: true,
    },
  ];

  return (
    <section
      id="actualites"
      className="py-14 sm:py-20 lg:py-24 bg-[#0d0f0e] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
        {/* Header */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-amber text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <Newspaper className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isEn ? 'Creation Journal & News' : 'Actualités & Journal de Création'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
            <span>{isEn ? 'LATEST' : 'JOURNAL'}{' '}</span>
            <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl">
              {isEn ? 'UPDATES' : 'CRÉATIF'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
            {isEn
              ? 'Stay informed on official releases, script developments, and international audiovisual milestones.'
              : 'Suivez les sorties officielles de romans, l’avancement des scénarios et les jalons de coproduction internationale.'}
          </p>
        </div>

        {/* Editorial News Cards (Mobile-first responsive layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              data-reveal="fade-up"
              className="p-5 sm:p-6 rounded-2xl bg-[#141716] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group card-premium-hover"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-brand-gold" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-brand-amber font-semibold uppercase tracking-wider bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-brand-amber transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <a
                  href={item.targetHref}
                  target={item.isExternal ? '_blank' : '_self'}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    if (item.targetHref.includes('amazon') || item.targetHref.includes('a.co')) {
                      analyticsEvents.clickAmazon(item.title);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-gold group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>{item.readMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
