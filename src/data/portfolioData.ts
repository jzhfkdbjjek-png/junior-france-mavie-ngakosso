import { BookItem, FilmItem, SeriesItem } from '../types';
import { Language } from '../i18n/I18nContext';

// Key Arts Cinématographiques — Posters Officiels (Ratio 2:3)
import posterPacteDiable from '../assets/images/poster_pacte_diable_1790195423710.jpg';
import posterCurseMouth from '../assets/images/poster_curse_mouth_1790195431554.jpg';
import posterCercueilFilm from '../assets/images/poster_cercueil_film_1790195439186.jpg';
import posterMarcheOmbres from '../assets/images/poster_marche_ombres_1790195447496.jpg';
import poster100Jours from '../assets/images/poster_100_jours_1790195458027.jpg';
import posterFatouDembele from '../assets/images/poster_fatou_dembele_1790195466829.jpg';
import posterEnfantAlbinos from '../assets/images/poster_enfant_albinos_1790195476119.jpg';
import posterLivre1560 from '../assets/images/poster_livre_1560_1790195962138.jpg';

export const OFFICIAL_IMAGES = {
  monogram: 'https://lh3.googleusercontent.com/aida/AEtjO1Uh-GTpTg1sfKYtPgVw6pjcSoLSZCX4dy-lOLmXIyNFmB7gk8Bt5-49n1jqn5a7s5HkvWq1o30eL7n31QbRwD-vrDxLtuTxPaQTwNwLaXBzd9HcSdvvHplebclWDtyOP1CS71IuybNnx5QYzjNU_xhGbDrNISsEQqdfSgXwDIcKRFPTU7YGl-BMNHEGDweOpK2Q5lQoFTg7cK3Ums1L_iNmVab2kh3cjhu75Wv6F_D1',
  portrait: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMA7LeAzMfMDJRE5BssNK18gc9qFlys4HuOJJ7J7U5DvThpmWrvE32AEP1afslKrSm-aJ1LE0sIwi3pDbkNmleieIJKpSOnSntRNznhSCEL7QJ7Mb19PxNa9ezuLUUSPR3HQzNGUP5NqYwi5ojY_8_3rP5kJ5Mb5g2Yv0Jmj02NWqZka4Y5B8uuzt2prXcNys40Uj7rMTZcAfbzTN0DyxQUIqb5kPnQg_H5I1LHWk6aro3Nq1IzqWx',
  bookCercueil: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGB0Ks6qc9xQvHmhseN0JSZAdKYj71fJ2i_3MzylkjBKlzeK8GnFJP8MIvMBG_Hum8BXRY02MIUDbplUn9UU14t793sfzyZ5VLZOdF-MciBuREb-kXpSRxJNOT8c5PORuccLbXHbZfEznJE2tGABVg4KXA385qn-tM05PDfxxgj3sMH-eJblQru0dowTuf81OxFLHgesIRyvT741yzmGdw82PSc4fxggDCOx7TXue765W8VA3_jPl5',
  bookForet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy3Vasbm0fH8tk7lmO6bufbOxmEFbK6Su5EKuJZR3EuaiJe5Nd7FIPOsZ77S99988uWpSiCP9RJpEkoiVCeOwaHjHbN1SyoTFK8iL3RFj-WSnpzBXwpKubM1xg_9uLCAvbIsRd6zXi6Xt6fttdrlv-Up2o7MqwihPFiyepCFj1Cr_dFpHdkCFz9xWmJIorBfVf7IRASytAtALfccp_FmeoEeg3xTSlVViOBc73C_97PnWCLN6DN4KB',
  bookPacte: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX31iNNl4-7qXBihrxDhK5399dRm4_Qo2QxPanxkpD-6dYOyMw2q1BQFzJMxeY-g5dJOEzfZ0Xh7QXFe3pXSn08f8Jd9YcdoaRpeAhWoFssthMJ6J1m0dlEpe7vnjSQZQm4DGxmXHH-ScT2Refij0DjAzHf8JJuIYZ3fBCwAVIuzoth7WU5i6we0O1oMypWPxhbN0I_vdU-XIqwHvTFsb0jKm0_08-uHJsxu72Kxd7bAeT4dmRIVdK',
  bookLivre1560: posterLivre1560,
  seriesForet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzEJT6FJUzqDzM50bc5nsI2f5Wtpg76HKPw2LX5QsSRJZs2qby7VfencEVixmJkyvARa9zAjjwM3MUEbvQC7ef0h5Bcbx4X77-5taX_kV0U-4XlTzZ_2DLIiETRqEVEZzZm-_IcHxN-mq55KVpsVQWMO1LiZv-bZ9Do78n9G8Oc_j5ju-A86kTbK6mrG2VQJOJzK2ch1Nx9_uLqFI5pYMqp5cAlhm6q-ekJ6dh6bJk7H5-TaoJnu5Y',
  // Posters Films
  posterPacteDiable,
  posterCurseMouth,
  posterCercueilFilm,
  posterMarcheOmbres,
  poster100Jours,
  posterFatouDembele,
  posterEnfantAlbinos,
  posterLivre1560,
};

export const getBooksData = (lang: Language = 'fr'): BookItem[] => [
  {
    id: 'cercueil-aux-muscles',
    title: 'LE CERCUEIL AUX MUSCLES',
    type: lang === 'en' ? 'Book / Literary Work' : 'Livre / œuvre littéraire',
    author: 'Junior France Mavie NGAKOSSO',
    category: lang === 'en' ? 'Psychological Drama / Introspective' : 'Drame psychologique / introspectif',
    badge: lang === 'en' ? 'Official Novel' : 'Roman Officiel',
    subBadge: lang === 'en' ? 'Available on Amazon' : 'Disponible sur Amazon',
    image: OFFICIAL_IMAGES.bookCercueil,
    universe: lang === 'en' ? 'Psychological drama / introspective' : 'Drame psychologique / introspectif',
    description:
      lang === 'en'
        ? "The book follows the journey of a young man facing his father's death, who gradually turns his body into armor in an attempt to conceal his grief."
        : "Le livre raconte le parcours d'un jeune homme confronté au décès de son père et qui transforme progressivement son corps en une sorte d'armure pour tenter de cacher sa souffrance.",
    summary:
      lang === 'en'
        ? "The book chronicles the path of a young man coping with the loss of his father, transforming his physique into emotional armor. The work explores grief, masculinity, vulnerability, family ties, body relationship, and personal reconstruction."
        : "Le livre raconte le parcours d'un jeune homme confronté au décès de son père et qui transforme progressivement son corps en une sorte d'armure pour tenter de cacher sa souffrance. L'œuvre explore le deuil, la masculinité, la douleur, la famille, le rapport au corps et la reconstruction personnelle.",
    extract:
      lang === 'en'
        ? "“I built muscles where my heart was bleeding, convinced that an armor of flesh and iron would keep tears from spilling into the light.”"
        : "« J'ai forgé du muscle là où mon cœur saignait, persuadé qu'une armure de chair et de fonte empêcherait mes larmes de couler au grand jour. »",
    amazonUrl: 'https://a.co/d/01ZNkXtg',
    adaptationNote: lang === 'en' ? '● Screen Link: Discover Feature Film' : '● Passerelle : Découvrir l’adaptation Film',
    adaptationType: 'film',
    adaptationTargetId: 'film-cercueil',
  },
  {
    id: 'pacte-du-demon',
    title: 'PACTE DU DÉMON',
    type: lang === 'en' ? 'Book / Literary Work' : 'Livre / œuvre littéraire',
    author: 'Junior France Mavie NGAKOSSO',
    category: lang === 'en' ? 'Mystical Thriller / Supernatural Fiction' : 'Thriller mystique / Fiction surnaturelle',
    badge: lang === 'en' ? 'Official Novel' : 'Roman Officiel',
    subBadge: lang === 'en' ? 'Available on Amazon' : 'Disponible sur Amazon',
    image: OFFICIAL_IMAGES.bookPacte,
    universe: lang === 'en' ? 'Supernatural Thriller / Mystical Fiction' : 'Thriller surnaturel / Fiction mystique',
    description:
      lang === 'en'
        ? "A chilling literary plunge into the forbidden corners of ambition, where a desperate secret agreement unleashes supernatural forces with a devastating price."
        : "Une plongée littéraire captivante dans les méandres de l'ambition et de l'interdit, où un accord mystique scellé dans l'ombre réclame un prix impitoyable à ceux qui ont osé défier les lois de l'invisible.",
    summary:
      lang === 'en'
        ? "Through a tense, gripping literary narrative, “Pacte du Démon” explores human vulnerability confronted with extreme temptation. Seeking an escape from hardship and despair, the protagonists enter a dark pact promising unmeasured fortune. But as the supernatural contract tightens its grip, paranoia and moral collapse take hold, forcing an existential struggle to reclaim one's stolen soul."
        : "À travers une narration littéraire immersive et sous haute tension, « Pacte du Démon » explore la vulnérabilité humaine face aux tentations absolues. Voulant fuir la précarité et l'impuissance, les protagonistes concluent un pacte obscur leur promettant fortune et rayonnement. Mais à mesure que l'emprise surnaturelle se referme, la réussite se mue en calvaire psychologique et familial, les contraignant à une lutte désespérée pour racheter leur liberté et leur âme.",
    extract:
      lang === 'en'
        ? "“The shadows never grant favors without demanding the full measure of your soul. When you sign with your own will, what you thought was power becomes your inescapable cage.”"
        : "« L'ombre n'accorde jamais de grâce sans réclamer l'usure de votre âme. Lorsque vous scellez le contrat de votre plein gré, ce que vous croyiez être une conquête devient votre plus cruelle prison. »",
    amazonUrl: 'https://a.co/d/01ZNkXtg',
  },
  {
    id: 'livre-1560',
    title: 'LE LIVRE – 1560',
    type: lang === 'en' ? 'Book / Literary Work' : 'Livre / œuvre littéraire',
    author: 'Junior France Mavie NGAKOSSO',
    category:
      lang === 'en'
        ? 'Supernatural Thriller • Mystery • Fantasy • Mystical'
        : 'Thriller surnaturel • Mystère • Fantastique • Mystique',
    badge: lang === 'en' ? 'Official Novel' : 'Roman Officiel',
    subBadge: lang === 'en' ? 'New Release' : 'Nouveauté',
    image: OFFICIAL_IMAGES.bookLivre1560,
    universe:
      lang === 'en'
        ? 'Supernatural Thriller • Mystical Universe'
        : 'Thriller surnaturel • Univers mystique',
    logline:
      lang === 'en'
        ? "In Brazzaville, two twins born of a tragedy discover that a mystical grimoire dated 1560 immunizes them against the spirits secretly controlling the city. Targeted for execution, they must master the secrets of the book to survive, avenge their mother, and break the entities' grip on the capital."
        : "À Brazzaville, deux jumeaux nés d'une tragédie découvrent qu'un grimoire mystique daté de 1560 les immunise contre les esprits qui contrôlent secrètement la ville. Devenus des cibles à abattre, ils doivent maîtriser les secrets du livre pour survivre, venger leur mère et briser l'emprise des entités sur la capitale.",
    description:
      lang === 'en'
        ? "In Brazzaville, two twins born of a tragedy discover that a mystical grimoire dated 1560 immunizes them against the spirits secretly controlling the city. Targeted for execution, they must master the secrets of the book to survive, avenge their mother, and break the entities' grip on the capital."
        : "À Brazzaville, deux jumeaux nés d'une tragédie découvrent qu'un grimoire mystique daté de 1560 les immunise contre les esprits qui contrôlent secrètement la ville. Devenus des cibles à abattre, ils doivent maîtriser les secrets du livre pour survivre, venger leur mère et briser l'emprise des entités sur la capitale.",
    pitch:
      lang === 'en'
        ? "Brazzaville. A modern metropolis that buried its beliefs.\n\nA woman dies giving birth to twins. On the bedside table: a leather-bound book, dated 1560, that wasn't there 5 minutes before.\n\nThis book isn't a book. It is a hunting grimoire. It catalogues 'Anomalies'—spirits that have possessed the living for centuries to maintain covert control over the city.\n\nIts hallmark: those chosen by the book become invisible to spirits. Untouchable. The twins are the first in 400 years.\n\nWhen the entities discover their existence, the hunt begins. They want the book—not to read it, but to burn it, because as long as it exists, their true origin and final plan remain exposed.\n\nGrowing up, the twins develop two opposing and complementary gifts. They realize their mother's death was no accident: she was the Keeper of the Book. Now, the mantle is theirs."
        : "Brazzaville. Une ville moderne qui a enterré ses croyances.\n\nUne femme meurt en donnant naissance à des jumeaux. Sur la table à côté d'elle : un livre relié de cuir, daté de 1560, qui n'était pas là 5 minutes avant.\n\nCe livre n'est pas un livre. C'est un grimoire de chasse. Il recense les « Anomalies », ces esprits qui possèdent les vivants depuis des siècles pour garder le contrôle sur la ville.\n\nSa particularité : ceux qu'il choisit deviennent invisibles aux yeux des esprits. Intouchables. Les jumeaux sont les premiers depuis 400 ans.\n\nQuand les entités découvrent leur existence, la chasse commence. Elles veulent le livre. Pas pour le lire. Pour le brûler. Car tant qu'il existe, leur véritable origine et leur plan final restent exposés.\n\nEn grandissant, les jumeaux développent deux dons opposés et complémentaires. Ils comprennent une chose : la mort de leur mère n'était pas un accident. Elle était la Gardienne du Livre.\n\nMaintenant, c'est à eux de le devenir.",
    summary:
      lang === 'en'
        ? "Brazzaville. A modern metropolis that buried its beliefs.\n\nA woman dies giving birth to twins. On the bedside table: a leather-bound book, dated 1560, that wasn't there 5 minutes before.\n\nThis book isn't a book. It is a hunting grimoire. It catalogues 'Anomalies'—spirits that have possessed the living for centuries to maintain covert control over the city.\n\nIts hallmark: those chosen by the book become invisible to spirits. Untouchable. The twins are the first in 400 years.\n\nWhen the entities discover their existence, the hunt begins. They want the book—not to read it, but to burn it, because as long as it exists, their true origin and final plan remain exposed.\n\nGrowing up, the twins develop two opposing and complementary gifts. They realize their mother's death was no accident: she was the Keeper of the Book. Now, the mantle is theirs."
        : "Brazzaville. Une ville moderne qui a enterré ses croyances.\n\nUne femme meurt en donnant naissance à des jumeaux. Sur la table à côté d'elle : un livre relié de cuir, daté de 1560, qui n'était pas là 5 minutes avant.\n\nCe livre n'est pas un livre. C'est un grimoire de chasse. Il recense les « Anomalies », ces esprits qui possèdent les vivants depuis des siècles pour garder le contrôle sur la ville.\n\nSa particularité : ceux qu'il choisit deviennent invisibles aux yeux des esprits. Intouchables. Les jumeaux sont les premiers depuis 400 ans.\n\nQuand les entités découvrent leur existence, la chasse commence. Elles veulent le livre. Pas pour le lire. Pour le brûler. Car tant qu'il existe, leur véritable origine et leur plan final restent exposés.\n\nEn grandissant, les jumeaux développent deux dons opposés et complémentaires. Ils comprennent une chose : la mort de leur mère n'était pas un accident. Elle était la Gardienne du Livre.\n\nMaintenant, c'est à eux de le devenir.",
    extract:
      lang === 'en'
        ? "“This book is not a manuscript. It is a hunting grimoire. Those it chooses become invisible to the eyes of the spirits. Untouchable.”"
        : "« Ce livre n'est pas un livre. C'est un grimoire de chasse. Sa particularité : ceux qu'il choisit deviennent invisibles aux yeux des esprits. Intouchables. »",
    amazonUrl: 'https://a.co/d/01ZNkXtg',
  },
];

export const getFilmsData = (lang: Language = 'fr'): FilmItem[] => [
  {
    id: 'film-pacte-avec-le-diable',
    title: 'PACTE AVEC LE DIABLE',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    duration: '90 minutes',
    genre: lang === 'en' ? 'Mystical Thriller • Social Drama' : 'Thriller mystique • Drame social',
    location: 'Brazzaville',
    languages: 'Français • Lingala • Kituba',
    status: lang === 'en' ? 'Screenplay in development' : 'Scénario en développement',
    statusType: 'script',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterPacteDiable,
    logline:
      lang === 'en'
        ? "Three impoverished young men enter an occult pact to obtain wealth and respect, but when the price begins destroying their humanity and bonds, they realize only the truth can break the contract."
        : "Trois jeunes hommes pauvres concluent un pacte occulte pour obtenir l'argent et le respect dont ils rêvent, mais lorsque le prix du contrat commence à détruire leur humanité et leurs liens, ils découvrent que seule la vérité peut leur permettre de briser le pacte.",
    synopsis:
      lang === 'en'
        ? "In the bustling neighborhoods of Brazzaville, desperate ambition pushes three friends into a forbidden ritual promising instant riches. Material success quickly gives way to paranoia and grief, forcing them to confront their deepest demons to buy back their freedom."
        : "Dans les quartiers populaires de Brazzaville, l'ambition dévorante pousse trois amis à s'engager dans un rituel mystique promettant fortune immédiate et influence. Très vite, les gains matériels se paient au prix fort : paranoïa, perte d'êtres chers et désintégration morale. Pris dans un étau surnaturel et social, ils devront affronter leurs propres démons pour racheter leur liberté.",
  },
  {
    id: 'film-curse-mouth',
    title: 'THE CURSE MOUTH',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    duration: '95 minutes',
    genre: lang === 'en' ? 'Supernatural Thriller • Horror' : 'Thriller surnaturel • Horreur',
    location: 'City Blue',
    status: lang === 'en' ? 'Complete Screenplay' : 'Scénario',
    statusType: 'pitch',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterCurseMouth,
    logline:
      lang === 'en'
        ? "In a city where an unseen curse strikes anyone sincerely condemned by a harassed victim, an investigative journalist probes a string of unexplained deaths before the next sunset claims another target."
        : "Dans une ville où une malédiction invisible frappe ceux qu'une victime condamne sincèrement après avoir été harcelée, un journaliste indépendant enquête sur une série de morts mystérieuses avant que le prochain coucher du soleil ne fasse une nouvelle victime.",
    synopsis:
      lang === 'en'
        ? "In City Blue, former abusers mysteriously perish from cardiac arrest. A persistent reporter uncovers an ancient vocal retribution curse, where words uttered in anguish seal the perpetrator's fate before twilight."
        : "À City Blue, une vague d'arrêts cardiaques et de disparitions inexpliquées frappe d'anciens persécuteurs. Un journaliste d'investigation obstiné met au jour une malédiction ancienne qui amplifie la voix des opprimés. Chaque sentence prononcée sous le sceau de la vérité scelle irrévocablement le destin de l'accusé avant la nuit tombée.",
  },
  {
    id: 'film-cercueil',
    title: 'LE CERCUEIL AUX MUSCLES',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    duration: '90–105 minutes',
    genre: lang === 'en' ? 'Psychological Drama • Family Drama • Coming of Age' : 'Drame psychologique • Drame familial • Initiatique',
    location: 'République du Congo',
    languages: 'Français',
    status: lang === 'en' ? 'Audiovisual Project / Adaptation' : 'Projet audiovisuel / adaptation',
    statusType: 'dialogue',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterCercueilFilm,
    logline:
      lang === 'en'
        ? "Following his father's death, a young man turns his body into muscular armor, until he understands that true strength is not about concealing pain, but learning to live with it."
        : "Après la mort de son père, un jeune homme transforme son corps en armure et son entraînement physique en obsession, jusqu'à comprendre que la véritable force ne consiste pas à cacher sa douleur, mais à apprendre à vivre avec elle.",
    synopsis:
      lang === 'en'
        ? "Cinematic adaptation of the eponymous novel. Grieving the loss of his father, a young Congolese athlete buries himself in obsessive workouts, building armor against sorrow. Through family conflict, he realizes accepting vulnerability is the only true redemption."
        : "Adaptation cinématographique du roman éponyme. Bouleversé par la disparition brutale de son père, un jeune Congolais s'enferme dans une pratique athlétique extrême, sculptant ses muscles comme un rempart contre le deuil et le regard de sa communauté. À travers les épreuves familiales et les conflits intérieurs, il comprend que la vulnérabilité acceptée est le seul chemin vers la rédemption.",
    relatedBookId: 'cercueil-aux-muscles',
    relatedBookTitle: lang === 'en' ? 'LE CERCUEIL AUX MUSCLES (Book)' : 'LE CERCUEIL AUX MUSCLES (Livre)',
  },
  {
    id: 'film-marche-ombres',
    title: 'LE MARCHÉ DES OMBRES',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    duration: 'Environ 105 minutes',
    genre: lang === 'en' ? 'Drama • Thriller' : 'Drame • Thriller',
    location: 'Brazzaville',
    languages: 'Français',
    status: lang === 'en' ? 'Screenplay' : 'Scénario',
    statusType: 'continuity',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterMarcheOmbres,
    logline:
      lang === 'en'
        ? "Twenty years after the war, a veteran encounters by the Congo River the woman he thought dead and an eight-year-old son he never knew existed, forcing him to reckon with his past."
        : "Vingt ans après la guerre, un ancien combattant retrouve au bord du fleuve Congo la femme qu'il croyait morte ainsi qu'un fils de huit ans dont il ignorait l'existence, l'obligeant à affronter les conséquences de son passé.",
    synopsis:
      lang === 'en'
        ? "The banks of the Congo River hold deep post-war scars. When a reformed fighter crosses paths with his long-lost love raising their secret child, he must choose between vengeful instincts and fatherhood."
        : "Les berges du fleuve Congo cachent les cicatrices de décennies de conflits. Lorsqu'un vétéran reconverti croise inopinément son amour de jeunesse qu'il pensait disparue, il découvre qu'elle élève leur enfant dans la clandestinité. Entre règlements de comptes d'anciens miliciens et espoir de renouveau, il doit choisir entre la vengeance et la paternité.",
  },
  {
    id: 'film-100-jours',
    title: '100 JOURS',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    genre: lang === 'en' ? 'Psychological Horror • Supernatural Thriller' : 'Horreur psychologique • Thriller surnaturel',
    status: lang === 'en' ? 'Complete Screenplay' : 'Scénario complet',
    statusType: 'script',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: poster100Jours,
    logline:
      lang === 'en'
        ? "When a man discovers an ancient book dictating a set of rules for 100 days, he gradually realizes each commandment is part of a supernatural ordeal with stakes far beyond his own mortality."
        : "Lorsqu'un homme découvre un ancien livre qui lui impose une série de règles à respecter pendant 100 jours, il comprend progressivement que chaque règle fait partie d'un jeu surnaturel dont les conséquences pourraient dépasser sa propre existence.",
    synopsis:
      lang === 'en'
        ? "A cryptic manuscript with living parchment falls into the hands of a drifting soul. Each day brings an unyielding command. Disobeying triggers terrifying manifestations, unveiling an ancestral contract tied to cosmic balance."
        : "Un manuscrit cryptique aux pages vivantes tombe entre les mains d'un homme en quête de sens. Chaque jour apporte un commandement précis et implacable. Enfreindre une règle entraîne des manifestations terrifiantes dans sa réalité quotidienne, révélant un rituel ancestral reliant le destin individuel aux mystères de l'au-delà.",
  },
  {
    id: 'film-fatou-dembele',
    title: 'FATOU DEMBÉLÉ',
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    genre: lang === 'en' ? 'Family Drama • Social Drama' : 'Drame familial • Drame social',
    location: 'Congo / exil',
    status: lang === 'en' ? 'Screenplay in Development' : 'Scénario en développement',
    statusType: 'pitch',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterFatouDembele,
    logline:
      lang === 'en'
        ? "After abandoning her family and fleeing Congo, Fatou tries rebuilding her life abroad, but a heritage artifact and Congolese gastronomy force her to confront her history, roots, and true identity."
        : "Après avoir quitté le Congo et abandonné sa famille, Fatou Dembélé tente de reconstruire sa vie loin de chez elle, mais un objet transmis par son passé et la cuisine congolaise vont l'obliger à affronter son histoire, sa famille et son identité.",
    synopsis:
      lang === 'en'
        ? "Living in exile, Fatou maintained deliberate amnesia over her past. But the rediscovery of a traditional heirloom and the sensory memories of native dishes awaken her homeland's call, setting her on a path toward forgiveness."
        : "Établie en exil, Fatou a bâti un mur d'amnésie volontaire pour oublier ses traumatismes familiaux. Mais la redécouverte d'un ustensile traditionnel et la mémoire sensorielle des saveurs de son enfance réveillent l'appel de sa terre natale, l'incitant à entreprendre le voyage du pardon et de la réconciliation.",
  },
  {
    id: 'film-enfant-albinos',
    title: "L'ENFANT ALBINOS",
    type: lang === 'en' ? 'Feature Film' : 'Long métrage',
    duration: '95 minutes',
    genre: lang === 'en' ? 'Social Drama • Poetic Cinema' : 'Drame social • Drame poétique',
    location: 'Brazzaville, République du Congo',
    inspiration: lang === 'en' ? "Inspired by « La voix d'une femme qui espère » by Alima Madina" : "Inspiré de « La voix d'une femme qui espère » d'Alima Madina",
    status: lang === 'en' ? 'Screenplay' : 'Scénario',
    statusType: 'dialogue',
    role: lang === 'en' ? 'Author / Screenwriter: Junior France Mavie NGAKOSSO' : 'Auteur / Scénariste : Junior France Mavie NGAKOSSO',
    image: posterEnfantAlbinos,
    logline:
      lang === 'en'
        ? "In Brazzaville, Néné, a young albino artist facing prejudice, transforms the central public square with a monumental fresco dedicated to his mother, challenging the community to see beyond differences."
        : "À Brazzaville, Néné, un jeune artiste albinos confronté au rejet et aux superstitions, décide de transformer la place centrale de son quartier par une œuvre monumentale dédiée à sa mère, obligeant progressivement sa communauté à regarder autrement celui qu'elle avait toujours considéré comme différent.",
    synopsis:
      lang === 'en'
        ? "In a vibrant district of Brazzaville where occult prejudices linger, Néné responds through artistic mastery. Backed by his mother's love and vibrant pigments, his monumental mural sparks community introspection and compassion."
        : "Dans un quartier animé de Brazzaville où persistent croyances occultes et préjugés, Néné résiste par la puissance de la création plastique. Porté par l'amour inconditionnel de sa mère et armé de pigments colorés, il érige une fresque gigantesque qui interroge l'humanité de chacun et fait reculer la peur de la différence.",
  },
];

export const getSeriesData = (lang: Language = 'fr'): SeriesItem[] => [
  {
    id: 'serie-foret-interdite',
    title: 'LA FORÊT INTERDITE',
    type: lang === 'en' ? 'Television Series' : 'Série télévisée',
    format: '8 × 52 minutes',
    genre: lang === 'en' ? 'Supernatural Thriller • Mystical • Action • Drama' : 'Thriller surnaturel • Mystique • Action • Drame',
    country: 'République du Congo',
    languages: 'Français 70 % • Lingala 30 %',
    status: lang === 'en' ? 'Finalized Project' : 'Projet finalisé',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    logline:
      lang === 'en'
        ? "In Ngoma, following the destruction of a sacred forest, 17-year-old Kito discovers he is the last heir to an ancient power capable of seeing mystical tears threatening his village. Hunted as a witch, he must repair the bond before the full moon."
        : "À Ngoma, après l'abattage d'une forêt sacrée, Kito, 17 ans, découvre qu'il est le dernier héritier d'un ancien pouvoir capable de percevoir les déchirures mystiques qui menacent son village. Traqué comme un sorcier, il doit réparer le lien brisé entre les hommes et la forêt avant la pleine lune, au risque de sacrifier sa propre humanité.",
    synopsis:
      lang === 'en'
        ? "In 2026 Ngoma (Republic of the Congo), the sacred forest shielding the village is leveled for commercial greed, shattering the Bisengo veil between the physical and spirit worlds. Kito, gifted with the Meso Miviri vision, must rally ancestral allies before the full moon."
        : "À Ngoma, en République du Congo, en 2026, la forêt sacrée qui protège le village depuis des générations est détruite au nom du développement et des intérêts économiques. Cet acte brise le Bisengo, une force ancestrale maintenant séparés le monde des vivants et des esprits. Kito Ngoma, 17 ans, introverti et passionné de dessin, découvre qu'il possède le Meso Miviri lié aux anciens Tisseurs. Devenu la cible des habitants, il est épaulé par son ami Samba, sa grand-mère Mama Kito, le gardien Maléko et l'esprit Nala pour affronter les Ba-Mvumbi et les Nganga avant la pleine lune.",
    isPrestige: true,
  },
  {
    id: 'serie-heritage-ombres',
    title: "L'HÉRITAGE DES OMBRES",
    type: lang === 'en' ? 'Television Series' : 'Série télévisée',
    format: '8 × 45 minutes',
    genre: lang === 'en' ? 'Thriller • Family Drama • Crime • Psychological' : 'Thriller • Drame familial • Crime • Drame psychologique',
    location: 'Brazzaville, République du Congo',
    status: lang === 'en' ? 'Finalized Project' : 'Projet finalisé',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    logline:
      lang === 'en'
        ? "Following his father's assassination, Jason infiltrates the corporate empire responsible for his death. But in uncovering his own family's criminal ties, he must choose between destroying the system or ruling it."
        : "Après l'assassinat de son père, Jason infiltre le puissant système qui pourrait être responsable de sa mort afin d'obtenir justice. Mais en découvrant les secrets criminels de sa propre famille, il doit choisir entre détruire le système ou devenir celui qui le contrôle.",
    synopsis:
      lang === 'en'
        ? "A high-stakes dive into corporate finance and industrial dynasties in Brazzaville. Jason must navigate loyalty, state corruption, and devastating revelations about his late father's legacy."
        : "Une plongée haletante dans les coulisses de la haute finance et des dynasties industrielles de Brazzaville. Jason doit naviguer entre fidélités familiales, corruption politique et révélations tragiques sur l'empire bâti par son défunt père.",
  },
  {
    id: 'serie-royaume-242',
    title: 'ROYAUME 242',
    type: lang === 'en' ? 'Television Series' : 'Série télévisée',
    format: '8 × 52 minutes',
    genre: lang === 'en' ? 'Political Thriller' : 'Thriller politique',
    location: 'République du Congo — Brazzaville et Pool',
    status: lang === 'en' ? 'Finalized Project' : 'Projet finalisé',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    logline:
      lang === 'en'
        ? "When a Brazzaville professor discovers a map revealing a colossal gold deposit in the Pool region, the find ignites a clandestine war between citizens, political elites, and military forces."
        : "Lorsqu'un professeur de Brazzaville découvre une carte révélant l'existence d'un immense gisement d'or dans le Pool, cette découverte déclenche une lutte clandestine entre citoyens, pouvoir politique, militaires et intérêts économiques, menaçant de bouleverser l'équilibre du pays.",
    synopsis:
      lang === 'en'
        ? "A gripping contemporary political saga where vast mineral discoveries ignite international greed and grassroots movements defending national sovereignty."
        : "Une fresque politique contemporaine vibrante où une découverte géologique inestimable exacerbe les convoitises internationales, les complots d'État et la mobilisation d'une jeunesse prête à défendre la souveraineté de ses terres.",
  },
  {
    id: 'serie-les-six',
    title: 'LES SIX',
    type: lang === 'en' ? 'Television Series' : 'Série télévisée',
    format: '8 × 52 minutes',
    genre: lang === 'en' ? 'Psychological Thriller • Mystery • Crime' : 'Thriller psychologique • Drame • Mystère • Crime',
    location: 'Brazzaville',
    languages: 'Français / Lingala',
    status: lang === 'en' ? 'Finalized Project' : 'Projet finalisé',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    logline:
      lang === 'en'
        ? "Six young adults discover a secret server containing compromising footage of prominent citizens. Attempting blackmail to escape poverty, they realize someone is secretly watching their every move."
        : "Six jeunes découvrent une pièce secrète contenant des vidéos compromettantes sur plusieurs habitants de leur ville. Pensant avoir trouvé le moyen de s'enrichir grâce au chantage, ils commencent à manipuler leurs victimes avant de découvrir qu'une personne les observe à son tour.",
    synopsis:
      lang === 'en'
        ? "In Brazzaville, six youths acquire an explosive server of surveillance records. Their extortion scheme spirals into a paranoid nightmare when a masked watcher begins manipulating them in return."
        : "À Brazzaville, un groupe hétéroclite de six jeunes met la main sur un serveur d'enregistrements compromettants. Leur entreprise d'extorsion tourne rapidement au cauchemar paranoïaque lorsqu'un corbeau invisible commence à dicter leurs moindres faits et gestes sous peine d'exposition publique.",
  },
  {
    id: 'serie-le-sac',
    title: 'LE SAC',
    type: lang === 'en' ? 'Series' : 'Série',
    format: '10 × 26 minutes',
    genre: lang === 'en' ? 'Dark Comedy • Action • Urban Comedy' : 'Comédie noire • Action • Comédie de quartier',
    location: 'Brazzaville',
    languages: 'Français',
    status: lang === 'en' ? 'Project' : 'Projet',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    logline:
      lang === 'en'
        ? "After stumbling on a bag containing 200 million FCFA from a botched heist, three broke friends try hiding the fortune, only to become targets of dangerous syndicate owners."
        : "Après avoir découvert un sac contenant 200 millions de FCFA à la suite d'un braquage raté, trois jeunes hommes en difficulté tentent de cacher l'argent, mais deviennent rapidement la cible de son propriétaire.",
    synopsis:
      lang === 'en'
        ? "A fast-paced dark comedy set through the lively streets of Brazzaville. Improbable hiding spots, comical misunderstandings, and relentless chases escalate each episode into absurdity."
        : "Une comédie noire au rythme effréné dans les ruelles animées de Brazzaville. Entre cachettes improbables, quiproquos familiaux et poursuites rocambolesques avec des créanciers impitoyables, chaque épisode monte d'un cran dans l'absurde et la tension.",
  },
  {
    id: 'serie-chez-le-psy',
    title: "CHEZ LE PSY / LE CABINET / DOCTEUR, J'AI UN PROBLÈME",
    type: lang === 'en' ? 'Series' : 'Série',
    format: '15 × 26 minutes',
    genre: lang === 'en' ? 'Dramedy • Psychology • Social' : 'Comédie dramatique • Psychologie • Social',
    location: 'Brazzaville — Poto-Poto / Bacongo',
    status: lang === 'en' ? 'Project' : 'Projet',
    role: lang === 'en' ? 'Creator / Screenwriter: Junior France Mavie NGAKOSSO' : 'Créateur / Scénariste : Junior France Mavie NGAKOSSO',
    concept:
      lang === 'en'
        ? "Anthology series. In a Brazzaville therapy clinic, each episode explores a patient facing personal, familial, or cultural struggles with tenderness, insight, and sharp humor."
        : "Série à épisodes autonomes. Dans un cabinet de psychologie de Brazzaville, chaque épisode suit un nouveau patient confronté à un problème personnel, familial ou social. La série explore avec humour et émotion les difficultés de la vie quotidienne.",
    logline:
      lang === 'en'
        ? "In a Brazzaville psychology clinic, every session follows a new patient navigating personal, generational, or social dilemmas with wit, humor, and emotional depth."
        : "Dans un cabinet de psychologie de Brazzaville, chaque épisode suit un nouveau patient confronté à un problème personnel, familial ou social, explorant avec finesse, humour et émotion les tabous et difficultés de la vie quotidienne.",
    synopsis:
      lang === 'en'
        ? "From burned-out executives to couples in crisis, the consultation room reflects modern Congolese societal aspirations and vulnerabilities."
        : "Du jeune cadre surmené aux couples en crise, en passant par les tiraillements entre modernité et traditions, le cabinet devient le réceptacle bienveillant des doutes de la société congolaise d'aujourd'hui.",
  },
];

// Fallback constant exports for backwards compatibility
export const BOOKS_DATA = getBooksData('fr');
export const FILMS_DATA = getFilmsData('fr');
export const SERIES_DATA = getSeriesData('fr');
