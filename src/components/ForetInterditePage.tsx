import React, { useState, useEffect } from 'react';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { useI18n } from '../i18n/I18nContext';
import { useSEO } from '../utils/seo';
import { trackPageView, analyticsEvents } from '../utils/analytics';
import {
  ArrowLeft,
  Tv,
  Film,
  Sparkles,
  MapPin,
  Clock,
  Globe,
  FileText,
  Mail,
  CheckCircle2,
  Eye,
  Shield,
  Compass,
  Scroll,
  Layers,
  Award,
} from 'lucide-react';
import { CinematicButton } from './CinematicButton';
import { CinematicImage } from './CinematicImage';

interface ForetInterditePageProps {
  onReturnHome: () => void;
  onContactClick: () => void;
}

export const ForetInterditePage: React.FC<ForetInterditePageProps> = ({
  onReturnHome,
  onContactClick,
}) => {
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState<'synopsis' | 'episodes' | 'univers' | 'personnages' | 'intention' | 'concept'>('synopsis');

  // Dynamic SEO Configuration for La Forêt Interdite
  useSEO({
    title:
      language === 'en'
        ? 'The Forbidden Forest — TV Series (8×52min) & Official Novel'
        : 'La Forêt Interdite — Série Télévisée (8×52min) & Livre Officiel',
    description:
      language === 'en'
        ? 'Official series bible and universe of The Forbidden Forest by Junior France Mavie Ngakosso. Supernatural and mystical thriller set in the Congo basin.'
        : "Découvrez la bible officielle, les 8 épisodes et l'univers de La Forêt Interdite par Junior France Mavie Ngakosso. Thriller surnaturel et mystique ancré en République du Congo.",
    keywords:
      'La Forêt Interdite, Série La Forêt Interdite, Junior France Mavie Ngakosso, Congo, Ngoma, Meso Miviri, Thriller surnaturel africain, Série 8x52min',
    canonicalPath: '/foret-interdite',
    ogType: 'article',
    ogImage: OFFICIAL_IMAGES.bookForet,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TVSeries',
      name: 'La Forêt Interdite',
      creator: {
        '@type': 'Person',
        name: 'Junior France Mavie Ngakosso',
      },
      numberOfEpisodes: 8,
      inLanguage: ['fr', 'ln'],
      genre: ['Thriller surnaturel', 'Mystique', 'Action', 'Drame'],
      countryOfOrigin: {
        '@type': 'Country',
        name: 'République du Congo',
      },
      description:
        'À Ngoma, après l’abattage d’une forêt sacrée, Kito, 17 ans, découvre qu’il est le dernier héritier d’un ancien pouvoir et doit réparer le lien brisé entre le monde des vivants et celui des esprits.',
    },
  });

  useEffect(() => {
    trackPageView('/foret-interdite', 'La Forêt Interdite — Série TV & Livre');
    analyticsEvents.openForetDedicatedPage();
  }, []);

  const characters = language === 'en' ? [
    {
      name: 'Kito Ngoma',
      age: '17 years old',
      role: 'Main Protagonist • Bearer of the Meso Miviri',
      desc: 'Introverted, observant, and gifted artist. The violent felling of the sacred forest triggers his latent ancestral sight, the Meso Miviri. Hunted by terrified villagers who label him a witch, he must shoulder the burden of healing the cosmic wound before the full moon.',
      traits: ['Intuitive', 'Visionary', 'Resilient', 'Artist'],
    },
    {
      name: 'Samba',
      age: '18 years old',
      role: 'Steadfast Ally • Childhood Friend',
      desc: 'Loyal to the bone, pragmatic and brave. While villagers succumb to paranoia and hostility, Samba stands firmly alongside Kito, serving as his bridge to physical reality and protective anchor against the mob.',
      traits: ['Loyal', 'Pragmatic', 'Fearless', 'Protector'],
    },
    {
      name: 'Mama Kito',
      age: '68 years old',
      role: 'Grandmother • Guardian of Oral Tradition',
      desc: 'Elder matriarch and clandestine bearer of ancestral herbal lore and spiritual lineages. She is the only one who understands the true origin of Kito’s power and prepares him for the inevitable confrontation.',
      traits: ['Wise', 'Protective', 'Spiritual Guide', 'Historian'],
    },
    {
      name: 'Maléko',
      age: '54 years old',
      role: 'Sanctuary Sentinel • Elder Initiate',
      desc: 'Former guardian of the sacred perimeter who witnessed the machines violating the boundary. Initiated in the secret laws of the Bisengo, he guides Kito through the forbidden pathways of the primeval canopy.',
      traits: ['Guardian', 'Stoic', 'Mystic Warrior', 'Tracker'],
    },
    {
      name: 'Spirit Nala',
      age: 'Timeless',
      role: 'Forest Entity • Ethereal Guide',
      desc: 'Ethereal spirit manifesting from the wounded sanctuary. Neither fully benevolent nor hostile, she embodies the voice of the trees and forces Kito to confront the truth of his ancestors’ forgotten pact.',
      traits: ['Ethereal', 'Unpredictable', 'Elemental', 'Voice of the Soil'],
    },
    {
      name: 'Ba-Mvumbi & Nganga',
      age: 'Ancient & Corrupted',
      role: 'Antagonistic Forces • Shadow Masters',
      desc: 'Restless shadows ripped from their spiritual resting places by deforestation, manipulated by greedy local occultists seeking to bend the breached veil to their political and financial dominion.',
      traits: ['Relentless', 'Shadow Weavers', 'Occult Power', 'Manipulative'],
    },
  ] : [
    {
      name: 'Kito Ngoma',
      age: '17 ans',
      role: 'Protagoniste Principal • Porteur du Meso Miviri',
      desc: 'Jeune homme introverti, observateur et passionné de dessin. L’abattage brutal de la forêt sacrée réveille en lui la « double vue » ancestrale des Tisseurs. Rejeté et traqué comme sorcier par sa communauté effrayée, il porte la responsabilité de réparer la déchirure cosmique avant la pleine lune.',
      traits: ['Intuitif', 'Visionnaire', 'Résilient', 'Dessinateur'],
    },
    {
      name: 'Samba',
      age: '18 ans',
      role: 'Allié Indéfectible • Frère de Cœur',
      desc: 'Ami d’enfance d’une loyauté inébranlable. Courageux et ancré dans le réel, Samba refuse de céder à la psychose collective et protège Kito face à la vindicte populaire, incarnant la force de la fraternité.',
      traits: ['Fidèle', 'Courageux', 'Protecteur', 'Fraternel'],
    },
    {
      name: 'Mama Kito',
      age: '68 ans',
      role: 'Grand-mère • Gardienne des Rituels et Savoirs',
      desc: 'Matriarche respectée et détentrice des généalogies sacrées et des rituels de protection. Elle est la première à reconnaître les signes du Meso Miviri chez son petit-fils et l’initie aux lois secrètes du pacte millénaire.',
      traits: ['Sage', 'Matriarche', 'Détentrice des savoirs', 'Bouclier'],
    },
    {
      name: 'Maléko',
      age: '54 ans',
      role: 'Sentinelle du Sanctuaire • Initié du Bisengo',
      desc: 'Dernier gardien assermenté du périmètre sacré, témoin impuissant de l’irruption des tronçonneuses. Initié aux rites de passage et fin connaisseur des pièges de la jungle, il guide Kito au cœur du sanctuaire.',
      traits: ['Gardien', 'Guerrier mystique', 'Pisteur', 'Intransigeant'],
    },
    {
      name: 'Esprit Nala',
      age: 'Intemporelle',
      role: 'Guide Mystique • Voix de la Forêt',
      desc: 'Entité spirituelle féminine issue des racines de la forêt brisée. Ni totalement bienveillante ni destructrice, elle exige la justice pour les arbres massacrés et met Kito à l’épreuve pour juger de sa pureté d’intention.',
      traits: ['Éthérée', 'Élémentaire', 'Exigeante', 'Voix des arbres'],
    },
    {
      name: 'Ba-Mvumbi & Nganga',
      age: 'Forces séculaires',
      role: 'Forces Antagonistes • Sorciers de l’Ombre',
      desc: 'Ombres vengeresses déracinées de leurs sépultures par l’exploitation forestière, instrumentalisées par des notables corrompus prêts à sacrifier l’équilibre du village pour consolider leur pouvoir occulte.',
      traits: ['Impardonnables', 'Occultes', 'Manipulateurs', 'Destructeurs'],
    },
  ];

  const episodes = language === 'en' ? [
    { num: '01', title: 'The Desecration', duration: '52 min', pitch: 'Commercial bulldozers breach the ancestral perimeter of Ngoma. That night, Kito wakes with blood-colored eyes and witnesses shadows walking the village.' },
    { num: '02', title: 'The Meso Miviri', duration: '52 min', pitch: 'Kito draws invisible symbols appearing on the walls of houses. The village elders accuse him of witchcraft as cattle fall dead.' },
    { num: '03', title: 'Shadows of the Ba-Mvumbi', duration: '52 min', pitch: 'Maléko rescues Kito from an angry mob and takes him deep into the forbidden canopy, where the Bisengo barrier has begun to collapse.' },
    { num: '04', title: 'The Weaver’s Trial', duration: '52 min', pitch: 'Mama Kito conducts the sacred smoke ritual to awaken Kito’s lineage memory, revealing the original contract made three centuries ago.' },
    { num: '05', title: 'The Shattered Masks', duration: '52 min', pitch: 'Spirit Nala confronts Kito in a supernatural dreamscape, demanding a human sacrifice to close the tear before the full moon.' },
    { num: '06', title: 'Blood & Bark', duration: '52 min', pitch: 'Samba infiltrates the timber company compound and discovers corporate greed linked to secret occult rituals led by the village chief.' },
    { num: '07', title: 'The Night Without Dawn', duration: '52 min', pitch: 'A cosmic eclipse plunges Ngoma into supernatural darkness. The spirits cross into the village streets in broad daylight.' },
    { num: '08', title: 'The Full Moon of Bisengo', duration: '52 min', pitch: 'At the heart of the felled sanctuary, Kito faces the ultimate choice: surrender his human life to become the forest’s eternal anchor or watch Ngoma disappear.' },
  ] : [
    { num: '01', title: 'La Profanation', duration: '52 min', pitch: 'Les engins forestiers violent le périmètre sacré de Ngoma au crépuscule. La nuit même, Kito se réveille les yeux brûlants et voit les esprits déambuler dans les ruelles.' },
    { num: '02', title: 'Le Meso Miviri', duration: '52 min', pitch: 'Kito reproduit inconsciemment sur ses carnets les fissures invisibles de la terre. Le conseil des notables l’accuse de sorcellerie alors que des phénomènes inexpliqués frappent le bétail.' },
    { num: '03', title: 'L’Ombre des Ba-Mvumbi', duration: '52 min', pitch: 'Maléko arrache Kito à la vindicte populaire et l’emmène vers les vestiges du sanctuaire, où la frontière entre vivants et défunts s’effondre à vue d’œil.' },
    { num: '04', title: 'L’Épreuve du Tisseur', duration: '52 min', pitch: 'Mama Kito accomplit le rituel des fumées sacrées pour réveiller la mémoire généalogique de Kito et lui révéler la dette impayée du pacte tricentenaire.' },
    { num: '05', title: 'Les Masques Brisés', duration: '52 min', pitch: 'L’Esprit Nala se matérialise et exige une réparation radicale. Les masques sacrés du village se fissurent sous la pression des entités déchaînées.' },
    { num: '06', title: 'Le Sang et l’Écorce', duration: '52 min', pitch: 'Samba infiltre la base de la compagnie d’exploitation et découvre que l’abattage servait à exhumer un autel d’or et de pouvoir dissimulé sous les racines millénaires.' },
    { num: '07', title: 'La Nuit Sans Aube', duration: '52 min', pitch: 'Une brume surnaturelle engloutit Ngoma. Les esprits franchissent la lisière du village en plein jour, plongeant la population dans une terreur ancestrale.' },
    { num: '08', title: 'La Pleine Lune du Bisengo', duration: '52 min', pitch: 'Au centre de la clairière profanée, Kito doit accomplir le grand tissage avant le zénith lunaire : lier son propre esprit aux racines pour refermer la faille.' },
  ];

  return (
    <div className="min-h-screen bg-[#070908] text-stone-100 font-sans selection:bg-red-900 selection:text-white">
      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#070908]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-red-400" />
            <span>{language === 'en' ? 'Back to Portfolio' : 'Retour au Portfolio'}</span>
          </button>
          <span className="h-4 w-px bg-white/15 hidden sm:block"></span>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="font-cinzel font-bold text-white tracking-wider">LA FORÊT INTERDITE</span>
            <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-300 text-[10px] font-bold uppercase border border-red-800/40">
              8 × 52 min
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <CinematicButton
            variant="project"
            size="sm"
            onClick={onContactClick}
            icon={<Mail className="w-3.5 h-3.5 text-red-400" />}
            iconPosition="left"
            className="text-xs"
          >
            {language === 'en' ? 'Request Show Bible' : 'Demander la Bible'}
          </CinematicButton>
        </div>
      </header>

      {/* 1. HERO IMMERSIVE */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-28 overflow-hidden">
        {/* Background atmospheric visuals */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-[#070908] to-[#070908] pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Colonne Gauche : Affiche / Visuel Principal */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-[340px] sm:max-w-md w-full">
                <div className="absolute -inset-3 bg-gradient-to-tr from-red-800/50 via-amber-600/30 to-emerald-800/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700"></div>
                <div className="relative rounded-2xl overflow-hidden border border-red-800/60 shadow-2xl bg-black">
                  <CinematicImage
                    src={OFFICIAL_IMAGES.seriesForet}
                    alt="La Forêt Interdite - Série Télévisée"
                    aspectRatio="2/3"
                    objectFit="cover"
                    loading="eager"
                    fetchPriority="high"
                    type="series"
                    title="La Forêt Interdite"
                    category="Série Télévisée Prestige"
                    className="transition-transform duration-700 group-hover:scale-105"
                    containerClassName="border-0"
                    overlay={
                      <>
                        {/* Badges sur l'affiche */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded bg-black/85 text-red-300 border border-red-700/50 backdrop-blur-md">
                            SÉRIE ÉVÉNEMENT
                          </span>
                          <span className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded bg-red-950/90 text-white border border-red-500/40">
                            PROJET FINALISÉ
                          </span>
                        </div>

                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block">
                              FORMAT PRESTIGE
                            </span>
                            <p className="text-sm font-cinzel font-bold text-white">
                              8 Épisodes × 52 Minutes
                            </p>
                          </div>
                          <span className="px-2.5 py-1 bg-red-900/80 text-white text-[10px] font-bold rounded border border-red-500/50">
                            Congo (Brazzaville)
                          </span>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Colonne Droite : Titre, Logline & Métadonnées */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>RÉPUBLIQUE DU CONGO • CRÉATION AUDIOVISUELLE ORIGINALE</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-none">
                  LA FORÊT <span className="text-red-500 italic font-serif">INTERDITE</span>
                </h1>
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-stone-400 mt-2 font-mono">
                  THE FORBIDDEN FOREST • ORIGINAL TELEVISION SERIES
                </p>
              </div>

              <p className="text-lg sm:text-xl text-brand-amber font-serif italic leading-relaxed">
                « À Ngoma, l’abattage d’une forêt sacrée brise le Bisengo. La frontière entre vivants et esprits s’effondre. »
              </p>

              {/* LOGLINE */}
              <div className="p-5 rounded-2xl bg-red-950/30 border border-red-900/50 text-stone-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400 flex items-center gap-2">
                  <Scroll className="w-3.5 h-3.5" />
                  LOGLINE OFFICIELLE
                </span>
                <p className="text-sm sm:text-base text-stone-100 font-medium leading-relaxed">
                  « À Ngoma, après l'abattage d'une forêt sacrée, Kito, 17 ans, découvre qu'il est le dernier héritier d'un ancien pouvoir capable de percevoir les déchirures mystiques qui menacent son village. Traqué comme un sorcier, il doit réparer le lien brisé entre les hommes et la forêt avant la pleine lune, au risque de sacrifier sa propre humanité. »
                </p>
              </div>

              {/* Grille de Spécifications Techniques */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <Tv className="w-3 h-3 text-red-400" /> Format
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">8 × 52 minutes</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <Film className="w-3 h-3 text-red-400" /> Genre
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">Thriller surnaturel • Drame</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-amber" /> Statut
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-brand-amber">Projet finalisé</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" /> Pays & Lieu
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">Rép. du Congo (Ngoma)</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <Globe className="w-3 h-3 text-red-400" /> Langues
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">Français 70 % • Lingala 30 %</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase flex items-center gap-1">
                    <Award className="w-3 h-3 text-red-400" /> Créateur / Scénariste
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">Junior France Mavie NGAKOSSO</span>
                </div>
              </div>

              {/* Boutons d'Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <CinematicButton
                  variant="primary"
                  size="md"
                  onClick={onContactClick}
                  icon={<Mail className="w-4 h-4" />}
                  iconPosition="left"
                  className="bg-red-600 hover:bg-red-700 text-white border-red-500/50 flex-1 shadow-lg shadow-red-950/50"
                >
                  {language === 'en' ? 'Request Show Bible & Pitch Deck' : 'Demander la Bible & Dossier de Série'}
                </CinematicButton>
                <CinematicButton
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    const el = document.getElementById('details-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  icon={<FileText className="w-4 h-4 text-brand-amber" />}
                  iconPosition="left"
                >
                  {language === 'en' ? 'Explore World & Characters' : 'Explorer l’Univers & Personnages'}
                </CinematicButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NAVIGATION PAR ONGLETS DU DOSSIER */}
      <section id="details-section" className="py-12 sm:py-16 bg-[#0c0f0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Menu Onglets */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#141816] border border-white/10 mb-10 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('synopsis')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'synopsis'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? 'Synopsis & Stakes' : 'Synopsis & Enjeux'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('episodes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'episodes'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? '8 Episodes Structure' : 'Arches des 8 Épisodes'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('personnages')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'personnages'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? 'Characters' : 'Personnages Clés'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('univers')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'univers'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? 'The World of Ngoma' : 'L’Univers & Bisengo'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('intention')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'intention'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? 'Artistic Statement' : 'Intention Artistique'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('concept')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'concept'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? 'Concept Arts & Mood' : 'Concept Arts & Ambiance'}
            </button>
          </div>

          {/* CONTENU ONGLETS */}
          <div className="max-w-5xl mx-auto">
            
            {/* ONGLET 1 : SYNOPSIS & ENJEUX */}
            {activeTab === 'synopsis' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#141816] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest">
                    <Scroll className="w-4 h-4" />
                    <span>Synopsis Complet Développé</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
                    La Rupture du Bisengo à Ngoma
                  </h3>
                  <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4">
                    <p>
                      À Ngoma, en République du Congo, en 2026, la forêt sacrée qui protège le village depuis des générations est détruite au nom du développement et des intérêts économiques d'une société d'exploitation forestière sans scrupules.
                    </p>
                    <p>
                      Cet acte de profanation brise le <strong>Bisengo</strong>, une force ancestrale d'harmonie qui maintient strictement séparés le monde des vivants et celui des esprits. Privés de leur sanctuaire, les esprits tutélaires et les <strong>Ba-Mvumbi</strong> (âmes errantes sans repos) déferlent sur la terre des hommes.
                    </p>
                    <p>
                      Kito Ngoma, un adolescent de 17 ans timide et passionné de dessin, découvre avec effroi qu'il est le porteur génétique du <strong>Meso Miviri</strong>, la vision sacrée des anciens Tisseurs. Il est le seul à percevoir la trame invisible qui se déchire et les créatures qui hantent désormais les chemins de Ngoma.
                    </p>
                    <p>
                      Mais au lieu de le soutenir, les villageois, terrifiés par les apparitions et manipulés par des notables corrompus, le désignent comme le sorcier responsable de la malédiction. Traqué, Kito ne peut compter que sur son ami Samba, sa grand-mère Mama Kito et Maléko, le dernier gardien du sanctuaire, pour accomplir un rituel désespéré avant la pleine lune : retisser le pacte entre les hommes et la forêt sacrée.
                    </p>
                  </div>
                </div>

                {/* Enjeux Dramatiques */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-[#141816] border border-red-900/40 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-red-400 block">
                      Enjeu Écologique & Sacré
                    </span>
                    <h4 className="font-cinzel font-bold text-white text-base">La Forêt Sanctuaire</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      La destruction des arbres anciens n’est pas qu’une perte matérielle : c’est l’anéantissement du bouclier spirituel protégeant la communauté depuis trois siècles.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#141816] border border-amber-900/40 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                      Enjeu Psychologique & Humain
                    </span>
                    <h4 className="font-cinzel font-bold text-white text-base">La Paranoïa Collective</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Face à l’inexplicable, la communauté cède à la peur et désigne un bouc émissaire adolescent, éprouvant la force des liens familiaux et fraternels.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#141816] border border-white/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gold block">
                      Enjeu Mystique & Temporel
                    </span>
                    <h4 className="font-cinzel font-bold text-white text-base">Le Compte à Rebours</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      La pleine lune marque la date limite irrévocable. Passé cette nuit, la faille sera béante et les ténèbres engloutiront définitivement le territoire.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ONGLET 2 : ARCHES DES 8 ÉPISODES */}
            {activeTab === 'episodes' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                    FORMAT 8 × 52 MINUTES • BIBLE COMPLÈTE DISPONIBLE
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    Structure Épisodique & Progression Dramatique
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episodes.map((ep) => (
                    <div
                      key={ep.num}
                      className="p-5 rounded-2xl bg-[#141816] border border-white/10 hover:border-red-900/60 transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-cinzel font-bold text-red-500 font-mono">
                          ÉPISODE {ep.num}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-stone-400 font-mono">
                          {ep.duration}
                        </span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed flex-1">
                        {ep.pitch}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ONGLET 3 : PERSONNAGES */}
            {activeTab === 'personnages' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                    GALERIE DES PERSONNAGES
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    Protagonistes, Alliés et Forces en Conflit
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {characters.map((char) => (
                    <div
                      key={char.name}
                      className="p-5 rounded-2xl bg-[#141816] border border-white/10 flex flex-col justify-between space-y-4 hover:border-red-900/50 transition-all card-premium-hover"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                          <span className="font-mono text-red-400 font-semibold">{char.age}</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] uppercase font-bold text-stone-300">
                            Fiche Rôle
                          </span>
                        </div>
                        <h4 className="font-cinzel text-xl font-bold text-white">{char.name}</h4>
                        <span className="text-[11px] font-bold text-brand-amber uppercase tracking-wider block mt-1">
                          {char.role}
                        </span>
                        <p className="text-xs text-stone-300 leading-relaxed mt-3">
                          {char.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                        {char.traits.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[9.5px] font-semibold bg-white/5 text-stone-300 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ONGLET 4 : UNIVERS & MYTHOLOGIE */}
            {activeTab === 'univers' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#141816] border border-white/10 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                      COSMOGONIE & ANCRAGE CONGOLAIS
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                      L’Univers de Ngoma et les Lois de l’Invisible
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-red-400">
                        <Shield className="w-4 h-4" />
                        <h4 className="font-cinzel font-bold text-white text-base">Le Bisengo</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Le Bisengo représente la force vitale et l'équilibre spirituel millénaire scellé entre les premiers habitants de Ngoma et les entités végétales du sanctuaire. Il empêche les ombres des défunts d'interférer avec le monde physique. Sa profanation libère une énergie chaotique.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-brand-amber">
                        <Eye className="w-4 h-4" />
                        <h4 className="font-cinzel font-bold text-white text-base">Le Meso Miviri</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        « Les deux paires d’yeux ». Don mystique rarissime transmis par la lignée des anciens Tisseurs. Il permet de percevoir la texture même des forces occultes, les plaies béantes dans la terre et les intentions invisibles des êtres.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Compass className="w-4 h-4" />
                        <h4 className="font-cinzel font-bold text-white text-base">Le Village de Ngoma</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Un village d'Afrique centrale à la croisée des époques : des téléphones portables et des motos côtoient les coutumes séculaires et les murmures de la forêt primaire. Le théâtre d'une mutation brutale provoquée par l'appât du gain.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-stone-300">
                        <Layers className="w-4 h-4" />
                        <h4 className="font-cinzel font-bold text-white text-base">Les Ba-Mvumbi</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Les esprits des morts déracinés dont les tombes et les arbres sacrés ont été rasés par les pelleteuses. N'ayant plus de demeure astrale, ils hantent les lisières et cherchent des corps d'accueil chez les vivants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ONGLET 5 : INTENTION ARTISTIQUE */}
            {activeTab === 'intention' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#141816] border border-white/10 space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                      NOTE D'INTENTION DU CRÉATEUR
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                      Par Junior France Mavie NGAKOSSO
                    </h3>
                    <p className="text-xs text-stone-400 font-mono mt-1">
                      Auteur • Créateur • Scénariste • Showrunner
                    </p>
                  </div>

                  <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 font-serif">
                    <p className="italic text-lg text-brand-amber font-normal border-l-2 border-red-500 pl-4">
                      « La Forêt Interdite est née d’une urgence : raconter l’Afrique contemporaine sans folklorisme ni naïveté, à travers la puissance viscérale du thriller de genre. »
                    </p>
                    <p>
                      En tant qu’écrivain et scénariste congolais, j'ai voulu créer une série télévisée qui réponde aux standards narratifs les plus exigeants des plateformes internationales tout en puisant sa matière vive dans nos cosmogonies les plus authentiques.
                    </p>
                    <p>
                      À Ngoma, la forêt n'est pas un décor de carte postale : c'est un personnage à part entière, un organisme pensant, blessé, qui réclame justice. Le conflit qui oppose Kito à sa communauté symbolise la déchirure intime vécue par toute une jeunesse africaine, tiraillée entre le rouleau compresseur d'une modernité marchande et l'héritage spirituel de ses aïeux.
                    </p>
                    <p>
                      La tension dramatique y est permanente. Chaque épisode monte d'un cran dans l'angoisse psychologique, l'action physique et la révélation des faux-semblants des adultes. Mon ambition est d'offrir aux diffuseurs une série prestige captivante de 8 épisodes qui fascinera autant le public africain que les spectateurs du monde entier.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Signature :</span>
                      <strong className="text-white font-cinzel text-base">Junior France Mavie NGAKOSSO</strong>
                    </div>
                    <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
                      Brazzaville — 2026
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ONGLET 6 : CONCEPT ARTS & AMBIANCE */}
            {activeTab === 'concept' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                    DIRECTION ARTISTIQUE & VISUELLE
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    Concepts Visuels, Palette Chromatique & Textures
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Visuel 1 : Clé de Voûte */}
                  <div className="rounded-2xl overflow-hidden bg-[#141816] border border-white/10 group">
                    <div className="aspect-[4/3] overflow-hidden bg-stone-900 relative">
                      <img
                        src={OFFICIAL_IMAGES.seriesForet}
                        alt="Affiche Officielle Série"
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={450}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 rounded text-[10px] font-bold uppercase tracking-wider text-red-300 border border-red-800/50">
                        Visuel Clé • Key Art Officiel
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-cinzel font-bold text-white text-base">Key Art Série Prestige</h4>
                      <p className="text-xs text-stone-400">
                        Composition dramatique opposant les teintes braises de l’obscurité aux teintes d’or des Tisseurs.
                      </p>
                    </div>
                  </div>

                  {/* Visuel 2 : Sanctuaire */}
                  <div className="rounded-2xl overflow-hidden bg-[#141816] border border-white/10 group">
                    <div className="aspect-[4/3] overflow-hidden bg-stone-900 relative">
                      <img
                        src={OFFICIAL_IMAGES.bookForet}
                        alt="Concept Art Sanctuaire"
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={450}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-800/50">
                        Concept Art • Sanctuaire Équatorial
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-cinzel font-bold text-white text-base">Atmosphère du Sanctuaire Primaire</h4>
                      <p className="text-xs text-stone-400">
                        Brume équatoriale dense, canopée millénaire et orbes luminescents marquant la présence du Bisengo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Palette Chromatique */}
                <div className="p-6 rounded-2xl bg-[#141816] border border-white/10 space-y-4">
                  <h4 className="font-cinzel font-bold text-white text-base">Palette Chromatique Cinématographique</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#070908] border border-white/20 shrink-0"></div>
                      <div>
                        <span className="text-xs font-bold text-white block">Noir Profond</span>
                        <span className="text-[10px] text-stone-400 font-mono">#070908</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#7f1d1d] border border-red-500/30 shrink-0"></div>
                      <div>
                        <span className="text-xs font-bold text-white block">Rouge Sang Sacré</span>
                        <span className="text-[10px] text-stone-400 font-mono">#7F1D1D</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#d97706] border border-amber-500/30 shrink-0"></div>
                      <div>
                        <span className="text-xs font-bold text-white block">Ambre des Tisseurs</span>
                        <span className="text-[10px] text-stone-400 font-mono">#D97706</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#064e3b] border border-emerald-500/30 shrink-0"></div>
                      <div>
                        <span className="text-xs font-bold text-white block">Vert Canopée</span>
                        <span className="text-[10px] text-stone-400 font-mono">#064E3B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. FOCUS CRÉATEUR & CONTACT PRODUCTION */}
      <section className="py-16 sm:py-20 bg-[#070908] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-red-500/60 shadow-xl p-1 bg-black">
            <img
              src={OFFICIAL_IMAGES.portrait}
              alt="Junior France Mavie NGAKOSSO"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400 block">
              CRÉATEUR • SCÉNARISTE • SHOWRUNNER
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
              Junior France Mavie NGAKOSSO
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
              Auteur et scénariste congolais concevant des œuvres de fiction à haute valeur ajoutée, prêtes pour le développement, la coproduction et la diffusion internationale.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141816] border border-red-900/40 text-left max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-white/10 pb-2">
              <span>Statut de l'œuvre :</span>
              <strong className="text-brand-amber font-mono font-bold">Projet finalisé</strong>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-white/10 pb-2">
              <span>Éléments disponibles :</span>
              <span className="text-white font-medium">Bible complète, synopsis 8 épisodes, arches</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Droits & Coproduction :</span>
              <span className="text-emerald-400 font-medium">Disponibles pour diffuseurs & plateformes</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <CinematicButton
              variant="primary"
              size="lg"
              onClick={onContactClick}
              icon={<Mail className="w-4 h-4" />}
              iconPosition="left"
              className="bg-red-600 hover:bg-red-700 text-white border-red-500/50 shadow-xl shadow-red-950/50"
            >
              {language === 'en' ? 'Contact Production / Request Full Deck' : 'Contacter la Production / Demander la Bible'}
            </CinematicButton>
            <CinematicButton
              variant="secondary"
              size="lg"
              onClick={onReturnHome}
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              {language === 'en' ? 'Return to Portfolio' : 'Retourner à l’Accueil'}
            </CinematicButton>
          </div>
        </div>
      </section>
    </div>
  );
};
