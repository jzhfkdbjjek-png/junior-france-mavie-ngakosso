import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Briefcase, BookOpen, Film, Tv, Award, Handshake, CheckCircle2 } from 'lucide-react';
import { CinematicButton } from './CinematicButton';

export const EspaceProSection: React.FC = () => {
  const { language } = useI18n();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'bio' | 'biblio' | 'filmo' | 'projets' | 'collab'>('bio');

  const tabs = [
    { id: 'bio' as const, label: isEn ? 'Bio' : 'Biographie', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'biblio' as const, label: isEn ? 'Bibliography' : 'Bibliographie', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'filmo' as const, label: isEn ? 'Filmography' : 'Filmographie', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'projets' as const, label: isEn ? 'Key Projects' : 'Projets Clés', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'collab' as const, label: isEn ? 'Collaborations' : 'Coproductions', icon: <Handshake className="w-3.5 h-3.5" /> },
  ];

  return (
    <section
      id="espace-pro"
      className="py-14 sm:py-20 lg:py-24 bg-[#111312] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
        {/* Header */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-amber text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
            <span>{isEn ? 'Industry & Production Hub' : 'Espace Professionnel & Coproduction'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tight">
            <span>{isEn ? 'PROFESSIONAL' : 'ESPACE'}{' '}</span>
            <span className="author-brand-ngakosso text-2xl sm:text-4xl md:text-5xl">
              {isEn ? 'PORTAL' : 'PROFESSIONNEL'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
            {isEn
              ? 'Comprehensive reference synthesis for film studios, literary publishing houses, TV networks, and festival programmers.'
              : 'Synthèse de référence pour producteurs audiovisuels, diffuseurs TV/VOD, éditeurs littéraires et programmateurs de festivals.'}
          </p>
        </div>

        {/* Ergonomic Mobile-First Segmented Tabs (Horizontal swipe/scrollable) */}
        <div data-reveal="fade-up" className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[44px] shrink-0 border ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-stone-950 border-brand-gold shadow-md font-extrabold'
                  : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div
          data-reveal="fade-up"
          className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#171a19] border border-brand-gold/30 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

          {activeTab === 'bio' && (
            <div className="space-y-4 max-w-3xl animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                {isEn ? 'AUTHOR MANIFESTO' : 'PARCOURS & SIGNATURE'}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Junior France Mavie NGAKOSSO
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {isEn
                  ? 'Congolese novelist, screenwriter, and series creator based in Brazzaville. His body of work bridges rich African mythologies, psychological depth, and high-tempo contemporary cinematic pacing.'
                  : 'Auteur, écrivain et scénariste congolais basé à Brazzaville. Sa démarche créative s’articule autour de récits profondément humains, du thriller mystique, du drame social et de fresques télévisuelles ambitieuses alliant cosmogonies africaines et résonance universelle.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-stone-400 block">{isEn ? 'Anchor:' : 'Ancrage :'}</span>
                  <strong className="text-white">Brazzaville • Congo</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">{isEn ? 'Languages:' : 'Langues :'}</span>
                  <strong className="text-white">Français • Lingala • Kituba</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">{isEn ? 'Specialties:' : 'Spécialités :'}</span>
                  <strong className="text-brand-gold">Prestige TV • Longs Métrages</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'biblio' && (
            <div className="space-y-5 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                {isEn ? 'PUBLISHED NOVELS ON AMAZON' : 'ROMANS OFFICIELS PUBLIÉS SUR AMAZON'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">LIVRE • AMAZON</span>
                  <h4 className="font-cinzel text-base font-bold text-white">LE CERCUEIL AUX MUSCLES</h4>
                  <p className="text-xs text-stone-300">
                    {isEn ? 'Psychological drama on grief, flesh armor, and vulnerability.' : 'Drame psychologique sur le deuil, l’armure corporelle et la reconstruction.'}
                  </p>
                  <a
                    href="https://a.co/d/01ZNkXtg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-brand-amber font-bold hover:underline"
                  >
                    {isEn ? 'View on Amazon ↗' : 'Consulter sur Amazon ↗'}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">LIVRE • AMAZON</span>
                  <h4 className="font-cinzel text-base font-bold text-white">LE PACTE DU DÉMON</h4>
                  <p className="text-xs text-stone-300">
                    {isEn ? 'Mystical thriller exploring ambition and occult debt in Brazzaville.' : 'Thriller mystique et surnaturel explorant un contrat occulte à Brazzaville.'}
                  </p>
                  <a
                    href="https://a.co/d/08g7FiVA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-brand-amber font-bold hover:underline"
                  >
                    {isEn ? 'View on Amazon ↗' : 'Consulter sur Amazon ↗'}
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'filmo' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                {isEn ? 'FEATURE FILM SCREENPLAYS (7)' : 'SCÉNARIOS DE LONGS-MÉTRAGES (7)'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: 'Pacte avec le Diable', genre: 'Thriller mystique (90 min)' },
                  { title: 'The Curse Mouth', genre: 'Thriller surnaturel / Horreur (95 min)' },
                  { title: 'Le Cercueil aux Muscles', genre: 'Drame psychologique (100 min)' },
                  { title: 'Le Marché des Ombres', genre: 'Drame social / Thriller (105 min)' },
                  { title: '100 Jours', genre: 'Horreur psychologique (90 min)' },
                  { title: 'Fatou Dembélé', genre: 'Drame familial / Identité (95 min)' },
                  { title: "L'Enfant Albinos", genre: 'Drame poétique & social (95 min)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-cinzel text-xs font-bold text-white leading-tight">{item.title}</h5>
                      <span className="text-[11px] text-stone-400">{item.genre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projets' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                {isEn ? 'ORIGINAL TV SERIES BIBLES (6)' : 'BIBLES DE SÉRIES TÉLÉVISÉES (6)'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-gold/10 to-transparent border border-brand-gold/40">
                  <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">SÉRIE ÉVÉNEMENT • 8×52 MIN</span>
                  <h4 className="font-cinzel text-base font-bold text-white mt-0.5">LA FORÊT INTERDITE</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    {isEn ? 'Supernatural Congolese Saga • Meso Miviri • Full Bible & Episodes ready' : 'Saga mystique & fantastique • Meso Miviri • Bible intégrale & 8 épisodes finalisés.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">SÉRIE TV • 8×45 MIN</span>
                  <h4 className="font-cinzel text-base font-bold text-white mt-0.5">L’HÉRITAGE DES OMBRES</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    {isEn ? 'Corporate & political thriller in Brazzaville.' : 'Thriller politico-financier et dynasties industrielles à Brazzaville.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">SÉRIE TV • 8×52 MIN</span>
                  <h4 className="font-cinzel text-base font-bold text-white mt-0.5">ROYAUME 242</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    {isEn ? 'Geopolitical saga on mineral discovery in Pool.' : 'Saga géopolitique autour d’un gisement d’or dans le Pool.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">SÉRIES COMPLÉMENTAIRES</span>
                  <h4 className="font-cinzel text-base font-bold text-white mt-0.5">LES SIX • LE SAC • CHEZ LE PSY</h4>
                  <p className="text-xs text-stone-300 mt-1">
                    {isEn ? 'Drama, social mystery, and human comedy formats.' : 'Formats thriller d’anticipation, enquête sociale et comédie dramatique.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collab' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-widest text-brand-amber font-mono font-bold">
                {isEn ? 'COPRODUCTION & RIGHTS LICENSING' : 'MODALITÉS DE COPRODUCTION & DROITS'}
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {isEn
                  ? 'All projects are protected and registered under international copyright laws. Production bibles, sample scenes, and full screenplays are available upon signed NDA or direct production request.'
                  : 'L’ensemble des scénarios et bibles de séries est déposé et protégé sous droits d’auteur internationaux. Les dossiers de production, continuités dialoguées et pilotes sont transmissibles sur demande directe de production.'}
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-amber text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-lg active:scale-95"
                >
                  <Handshake className="w-4 h-4" />
                  <span>{isEn ? 'Contact the Author' : 'Initier un Échange / Demander une Bible'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
