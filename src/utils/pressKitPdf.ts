import { jsPDF } from 'jspdf';
import { OFFICIAL_IMAGES } from '../data/portfolioData';

// Helper to load image as base64 data URL
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(dataUrl);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
}

export async function generatePressKitPdf(onProgress?: (step: string) => void): Promise<void> {
  if (onProgress) onProgress('Chargement des visuels officiels...');

  // Pre-load author portrait
  const portraitDataUrl = await loadImageAsDataUrl(OFFICIAL_IMAGES.portrait);

  if (onProgress) onProgress('Création du dossier éditorial A4...');

  // Create A4 PDF (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const bgDark = [11, 13, 12]; // #0b0d0c
  const bgCard = [18, 20, 19]; // #121413
  const gold = [197, 155, 99]; // #c59b63
  const textWhite = [250, 247, 242]; // #faf7f2 (blanc ivoire)
  const textMuted = [175, 170, 160];
  const borderCol = [38, 42, 40];

  // Helper for background & footer on content pages
  const applyPageHeaderFooter = (pageNum: number, totalPages: number, categoryTitle: string) => {
    // Dark background
    doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header rule & category
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 18, pageWidth - margin, 18);

    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(categoryTitle.toUpperCase(), margin, 14);

    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('DOSSIER ARTISTIQUE OFFICIEL', pageWidth - margin, 14, { align: 'right' });

    // Footer rule & numbering
    doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('JUNIOR FRANCE MAVIE NGAKOSSO', margin, pageHeight - 11);
    doc.text(`${pageNum} / ${totalPages}`, pageWidth - margin, pageHeight - 11, { align: 'right' });
  };

  /* =========================================================================
     PAGE 1 — COUVERTURE PREMIUM
     ========================================================================= */
  if (onProgress) onProgress('Page 1 : Couverture...');
  // Dark Background
  doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative border frame
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin - 6, margin - 6, pageWidth - (margin - 6) * 2, pageHeight - (margin - 6) * 2);

  // Eyebrow
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('DOSSIER ARTISTIQUE • PRESS KIT OFFICIEL', pageWidth / 2, 28, { align: 'center' });

  // Official Portrait
  const photoW = 75;
  const photoH = 92;
  const photoX = (pageWidth - photoW) / 2;
  const photoY = 40;

  if (portraitDataUrl) {
    try {
      doc.addImage(portraitDataUrl, 'JPEG', photoX, photoY, photoW, photoH);
      // Gold frame around photo
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.5);
      doc.rect(photoX, photoY, photoW, photoH);
    } catch {
      // Fallback placeholder box if needed
      doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
      doc.rect(photoX, photoY, photoW, photoH, 'F');
    }
  }

  // Author Typographic Identity
  doc.setFont('times', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('JUNIOR FRANCE MAVIE', pageWidth / 2, 148, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('NGAKOSSO', pageWidth / 2, 161, { align: 'center' });

  // Divider
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(pageWidth / 2 - 25, 169, pageWidth / 2 + 25, 169);

  // Roles & Credits
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Écrivain  •  Auteur  •  Scénariste  •  Créateur', pageWidth / 2, 178, { align: 'center' });

  // Subtitle / Intro Note
  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const introLines = [
    'Littérature contemporaine & Créations audiovisuelles ancrées dans des récits congolais',
    'et africains d’envergure internationale. Thriller, Fantastique, Drame & Récits Sociaux.',
  ];
  doc.text(introLines, pageWidth / 2, 196, { align: 'center', lineHeightFactor: 1.5 });

  // Summary box bottom
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin + 10, 222, contentWidth - 20, 42, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('SOMMAIRE DU DOSSIER DE RÉFÉRENCE', pageWidth / 2, 230, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('02. À Propos de l’Auteur     •     03. Vision Artistique     •     04. Bibliographie', pageWidth / 2, 238, { align: 'center' });
  doc.text('05. Projets Cinéma     •     06. Créations Séries     •     07. Univers Créatif', pageWidth / 2, 245, { align: 'center' });
  doc.text('08. Œuvres Phares & Passerelles Audiovisuelles     •     09. Contact & Droits', pageWidth / 2, 252, { align: 'center' });

  /* =========================================================================
     PAGE 2 — À PROPOS DE L’AUTEUR
     ========================================================================= */
  if (onProgress) onProgress('Page 2 : À Propos...');
  doc.addPage();
  applyPageHeaderFooter(2, 9, 'Présentation');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('À PROPOS', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  // Author Photo in sidebar / card
  const p2PhotoW = 48;
  const p2PhotoH = 58;
  if (portraitDataUrl) {
    try {
      doc.addImage(portraitDataUrl, 'JPEG', margin, 46, p2PhotoW, p2PhotoH);
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.3);
      doc.rect(margin, 46, p2PhotoW, p2PhotoH);
    } catch {
      // ignore
    }
  }

  // Key identity card next to photo
  const cardX = margin + p2PhotoW + 8;
  const cardW = contentWidth - p2PhotoW - 8;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(cardX, 46, cardW, p2PhotoH, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(cardX, 46, cardW, p2PhotoH);

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('JUNIOR FRANCE MAVIE NGAKOSSO', cardX + 6, 56);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Écrivain • Auteur • Scénariste • Créateur', cardX + 6, 63);

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Origine : République du Congo (Brazzaville)', cardX + 6, 73);
  doc.text('Champs : Littérature & Fiction Audiovisuelle', cardX + 6, 80);
  doc.text('Univers : Thriller, Fantastique, Surnaturel, Drame, Action', cardX + 6, 87);
  doc.text('Langues : Français, Lingala, Kituba', cardX + 6, 94);

  // Required text block exactly as requested:
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);

  const p1 =
    'Junior France Mavie NGAKOSSO est un écrivain, auteur, scénariste et créateur congolais.';
  const p2 =
    'Il développe des œuvres littéraires et audiovisuelles principalement ancrées dans des univers africains et congolais, avec une prédilection pour le thriller, le fantastique, le surnaturel, le drame, le mystère, l’action et les récits sociaux.';
  const p3 =
    'Son travail cherche à associer des histoires profondément humaines à des univers forts, avec une identité congolaise assumée.';

  let textY = 118;
  const p1Lines = doc.splitTextToSize(p1, contentWidth);
  doc.text(p1Lines, margin, textY, { lineHeightFactor: 1.6 });
  textY += p1Lines.length * 8 + 8;

  const p2Lines = doc.splitTextToSize(p2, contentWidth);
  doc.text(p2Lines, margin, textY, { lineHeightFactor: 1.6 });
  textY += p2Lines.length * 8 + 8;

  const p3Lines = doc.splitTextToSize(p3, contentWidth);
  doc.text(p3Lines, margin, textY, { lineHeightFactor: 1.6 });
  textY += p3Lines.length * 8 + 14;

  // Editorial Callout
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, textY, contentWidth, 38, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, textY, margin, textY + 38);

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('« Des histoires à écrire. Des mondes à créer. »', margin + 8, textY + 14);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    'Une passerelle continue entre l’exigence du roman et la force visuelle des écrans.',
    margin + 8,
    textY + 24
  );

  /* =========================================================================
     PAGE 3 — VISION ARTISTIQUE
     ========================================================================= */
  if (onProgress) onProgress('Page 3 : Vision Artistique...');
  doc.addPage();
  applyPageHeaderFooter(3, 9, 'Vision & Esthétique');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('VISION ARTISTIQUE', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  const pillars = [
    {
      title: 'CINÉMA AFRICAIN & IDENTITÉ CONGOLAISE',
      desc: 'Ancrer les récits dans des décors authentiques — les berges du fleuve Congo, les artères de Brazzaville, les forêts équatoriales sacrées — pour leur donner une portée universelle et cinématographique.',
    },
    {
      title: 'FANTASTIQUE & SURNATUREL ANCESTRAL',
      desc: 'Explorer les cosmogonies d’Afrique centrale, les déchirures invisibles entre les mondes, les pactes occultes et les tabous séculaires, réinvestis avec les codes des grands genres contemporains.',
    },
    {
      title: 'THRILLER, SUSPENSE & MYSTÈRE',
      desc: 'Concevoir des mécaniques narratives haletantes, des courses contre la montre psychologiques et des intrigues rigoureusement documentées, maintenant une tension constante d’un bout à l’autre.',
    },
    {
      title: 'DRAME HUMAIN, ACTION & RÉCITS SOCIAUX',
      desc: 'Placer la vulnérabilité, le deuil, la quête de liberté et la solidarité familiale au cœur de chaque conflit. L’intime nourrit le spectaculaire.',
    },
  ];

  let pillarY = 48;
  pillars.forEach((p) => {
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(margin, pillarY, contentWidth, 42, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, pillarY, contentWidth, 42);

    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(p.title, margin + 8, pillarY + 12);

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    const dLines = doc.splitTextToSize(p.desc, contentWidth - 16);
    doc.text(dLines, margin + 8, pillarY + 22, { lineHeightFactor: 1.45 });

    pillarY += 49;
  });

  /* =========================================================================
     PAGE 4 — BIBLIOGRAPHIE
     ========================================================================= */
  if (onProgress) onProgress('Page 4 : Bibliographie...');
  doc.addPage();
  applyPageHeaderFooter(4, 9, 'Publications Officielles & Bibliographie');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('BIBLIOGRAPHIE', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 20, 36);

  // Livre 1: LE CERCUEIL AUX MUSCLES
  let bY = 42;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, bY, contentWidth, 68, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, bY, contentWidth, 68);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('1. LE CERCUEIL AUX MUSCLES', margin + 6, bY + 8);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre / œuvre littéraire  •  Auteur : Junior France Mavie NGAKOSSO  •  Disponible : Amazon', margin + 6, bY + 14);
  doc.text('Univers : Drame psychologique / introspectif  •  Projet d’adaptation long-métrage cinéma', margin + 6, bY + 19);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const cDesc =
    "Le livre raconte le parcours d'un jeune homme confronté au décès de son père et qui transforme progressivement son corps en une sorte d'armure pour tenter de cacher sa souffrance. L'œuvre explore le deuil, la masculinité, la douleur, la famille, le rapport au corps et la reconstruction personnelle.";
  const cLines = doc.splitTextToSize(cDesc, contentWidth - 12);
  doc.text(cLines, margin + 6, bY + 26, { lineHeightFactor: 1.4 });

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('« J’ai forgé du muscle là où mon cœur saignait, persuadé qu’une armure de fonte empêcherait mes larmes de couler. »', margin + 6, bY + 62);

  // Livre 2: LA FORÊT INTERDITE
  bY = 114;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, bY, contentWidth, 72, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, bY, contentWidth, 72);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('2. LA FORÊT INTERDITE', margin + 6, bY + 8);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre  •  Auteur : Junior France Mavie NGAKOSSO  •  Disponible : Amazon', margin + 6, bY + 14);
  doc.text('Univers : Fantastique • Mystique • Surnaturel • Congo', margin + 6, bY + 19);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const fDesc =
    "Au cœur de la forêt équatoriale congolaise, la profanation d'un sanctuaire ancestral libère les forces de l'invisible, réveillant un pacte séculaire entre les hommes et les esprits. Une plongée où des forces ancestrales menacent l'équilibre entre les vivants et les esprits.";
  const fLines = doc.splitTextToSize(fDesc, contentWidth - 12);
  doc.text(fLines, margin + 6, bY + 26, { lineHeightFactor: 1.4 });

  // Special Mention Audiovisuelle as required
  doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
  doc.rect(margin + 6, bY + 44, contentWidth - 12, 22, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.rect(margin + 6, bY + 44, contentWidth - 12, 22);

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('✦ MENTION AUDIOVISUELLE OFFICIELLE', margin + 10, bY + 52);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text(
    'Existe également sous la forme d’un projet majeur de série audiovisuelle (8 épisodes × 52 minutes).',
    margin + 10,
    bY + 60
  );

  // Livre 3: LE LIVRE – 1560
  bY = 190;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, bY, contentWidth, 80, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, bY, contentWidth, 80);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('3. LE LIVRE – 1560', margin + 6, bY + 8);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre / œuvre littéraire  •  Auteur : Junior France Mavie NGAKOSSO', margin + 6, bY + 14);
  doc.text('Univers : Thriller surnaturel • Mystère • Fantastique • Mystique', margin + 6, bY + 19);

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('LOGLINE :', margin + 6, bY + 26);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const l1560Log =
    "« À Brazzaville, deux jumeaux nés d'une tragédie découvrent qu'un grimoire mystique daté de 1560 les immunise contre les esprits qui contrôlent secrètement la ville. Devenus des cibles à abattre, ils doivent maîtriser les secrets du livre pour survivre, venger leur mère et briser l'emprise des entités sur la capitale. »";
  const l1560Lines = doc.splitTextToSize(l1560Log, contentWidth - 12);
  doc.text(l1560Lines, margin + 6, bY + 31, { lineHeightFactor: 1.35 });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('PITCH ÉDITORIAL :', margin + 6, bY + 47);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.3);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const l1560Pitch =
    "Brazzaville, métropole moderne. Une femme meurt en donnant naissance à des jumeaux en laissant un livre relié de cuir daté de 1560. Ce grimoire de chasse recense les « Anomalies », esprits possédant les vivants depuis des siècles. Les jumeaux, premiers immunisés depuis 400 ans, deviennent les nouveaux Gardiens du Livre.";
  const p1560Lines = doc.splitTextToSize(l1560Pitch, contentWidth - 12);
  doc.text(p1560Lines, margin + 6, bY + 52, { lineHeightFactor: 1.35 });

  /* =========================================================================
     PAGE 5 — FILMOGRAPHIE / LONGS-MÉTRAGES
     ========================================================================= */
  if (onProgress) onProgress('Page 5 : Projets Cinéma...');
  doc.addPage();
  applyPageHeaderFooter(5, 9, 'Scénariste — Longs-Métrages');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('PROJETS CINÉMA', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  const filmsList = [
    {
      titre: 'PACTE AVEC LE DIABLE',
      type: 'Long métrage (90 min)',
      genre: 'Thriller mystique • Drame social',
      statut: 'Scénario en développement',
      role: 'Auteur / Scénariste',
      logline: 'Trois jeunes hommes pauvres concluent un pacte occulte pour obtenir fortune et respect, découvrant que le prix détruit leur humanité.',
    },
    {
      titre: 'THE CURSE MOUTH',
      type: 'Long métrage (95 min)',
      genre: 'Thriller surnaturel • Horreur',
      statut: 'Scénario complet',
      role: 'Auteur / Scénariste',
      logline: 'Dans une ville où une malédiction frappe ceux condamnés par une victime opprimée, un journaliste enquête avant le prochain coucher du soleil.',
    },
    {
      titre: 'LE CERCUEIL AUX MUSCLES',
      type: 'Long métrage (90–105 min)',
      genre: 'Drame psychologique • Drame familial',
      statut: 'Projet audiovisuel / adaptation',
      role: 'Auteur / Scénariste',
      logline: 'Après la mort de son père, un jeune homme transforme son corps en armure, apprenant que la vraie force réside dans la vulnérabilité assumée.',
    },
    {
      titre: 'LE MARCHÉ DES OMBRES',
      type: 'Long métrage (105 min)',
      genre: 'Drame • Thriller',
      statut: 'Scénario',
      role: 'Auteur / Scénariste',
      logline: 'Vingt ans après la guerre, un vétéran retrouve au bord du fleuve Congo la femme qu’il croyait morte et un fils qu’il ignorait avoir.',
    },
    {
      titre: '100 JOURS',
      type: 'Long métrage',
      genre: 'Horreur psychologique • Thriller surnaturel',
      statut: 'Scénario complet',
      role: 'Auteur / Scénariste',
      logline: 'Un homme découvre un livre ancien imposant des règles durant 100 jours, révélant un jeu surnaturel qui menace sa propre existence.',
    },
    {
      titre: 'FATOU DEMBÉLÉ',
      type: 'Long métrage',
      genre: 'Drame familial • Drame social',
      statut: 'Scénario en développement',
      role: 'Auteur / Scénariste',
      logline: 'En exil loin de chez elle, Fatou est ramenée vers son passé et sa famille par un objet hérité et la gastronomie congolaise.',
    },
    {
      titre: 'L’ENFANT ALBINOS',
      type: 'Long métrage (95 min)',
      genre: 'Drame social • Drame poétique',
      statut: 'Scénario',
      role: 'Auteur / Scénariste',
      logline: 'À Brazzaville, Néné, jeune artiste albinos, transforme la place de son quartier par une fresque géante, bousculant les superstitions.',
    },
  ];

  let fY = 46;
  filmsList.forEach((f) => {
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(margin, fY, contentWidth, 31, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, fY, contentWidth, 31);

    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(f.titre, margin + 6, fY + 7);

    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${f.type}  •  ${f.genre}  •  Statut : ${f.statut}`, margin + 6, fY + 13);

    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const lLines = doc.splitTextToSize(`Logline : « ${f.logline} »`, contentWidth - 12);
    doc.text(lLines, margin + 6, fY + 19, { lineHeightFactor: 1.35 });

    fY += 33.5;
  });

  /* =========================================================================
     PAGE 6 — SÉRIES
     ========================================================================= */
  if (onProgress) onProgress('Page 6 : Créations Séries...');
  doc.addPage();
  applyPageHeaderFooter(6, 9, 'Créateur & Showrunner — Séries');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('CRÉATIONS SÉRIE', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  const seriesList = [
    {
      titre: 'LA FORÊT INTERDITE',
      format: '8 × 52 minutes',
      genre: 'Thriller surnaturel • Mystique • Action • Drame',
      lieu: 'République du Congo',
      langues: 'Français 70 % • Lingala 30 %',
      statut: 'Projet finalisé (Bible & Scénarios)',
      role: 'Créateur / Scénariste',
      logline: 'À Ngoma, après l’abattage d’une forêt sacrée, Kito, 17 ans, découvre qu’il est le dernier héritier d’un ancien pouvoir et doit réparer le lien brisé.',
    },
    {
      titre: 'L’HÉRITAGE DES OMBRES',
      format: '8 × 45 minutes',
      genre: 'Thriller • Drame familial • Crime • Psychologique',
      lieu: 'Brazzaville, République du Congo',
      langues: 'Français',
      statut: 'Projet finalisé',
      role: 'Créateur / Scénariste',
      logline: 'Après l’assassinat de son père, Jason infiltre le puissant empire financier familial, devant choisir entre détruire le système ou le contrôler.',
    },
    {
      titre: 'ROYAUME 242',
      format: '8 × 52 minutes',
      genre: 'Thriller politique',
      lieu: 'Brazzaville & Région du Pool',
      langues: 'Français • Lingala',
      statut: 'Projet finalisé',
      role: 'Créateur / Scénariste',
      logline: 'La découverte clandestine d’une carte révélant un colossal gisement d’or dans le Pool déclenche une guerre d’influence entre élites et citoyens.',
    },
    {
      titre: 'LES SIX',
      format: '8 × 52 minutes',
      genre: 'Thriller psychologique • Drame • Mystère • Crime',
      lieu: 'Brazzaville',
      langues: 'Français / Lingala',
      statut: 'Projet finalisé',
      role: 'Créateur / Scénariste',
      logline: 'Six jeunes découvrent une pièce secrète contenant des vidéos compromettantes de notables, avant de réaliser qu’un corbeau les surveille.',
    },
    {
      titre: 'LE SAC',
      format: '10 × 26 minutes',
      genre: 'Comédie noire • Action • Comédie urbaine',
      lieu: 'Brazzaville',
      langues: 'Français',
      statut: 'Projet',
      role: 'Créateur / Scénariste',
      logline: 'Après avoir dérobé un sac contenant 200 millions de FCFA issu d’un braquage raté, trois jeunes précaires tentent de fuir leurs poursuivants.',
    },
    {
      titre: 'CHEZ LE PSY / LE CABINET / DOCTEUR, J’AI UN PROBLÈME',
      format: '15 × 26 minutes',
      genre: 'Comédie dramatique • Psychologie • Social',
      lieu: 'Brazzaville (Poto-Poto / Bacongo)',
      langues: 'Français',
      statut: 'Projet',
      role: 'Créateur / Scénariste',
      logline: 'Dans un cabinet de psychologie à Brazzaville, chaque épisode suit un patient confronté aux défis intimes, familiaux et sociaux de la vie moderne.',
    },
  ];

  let sY = 46;
  seriesList.forEach((s) => {
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(margin, sY, contentWidth, 36, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, sY, contentWidth, 36);

    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(s.titre, margin + 6, sY + 7);

    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${s.format}  •  ${s.genre}  •  ${s.lieu}`, margin + 6, sY + 13);

    doc.setFont('times', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Statut : ${s.statut}  |  Rôle : ${s.role}`, margin + 6, sY + 19);

    const sLog = doc.splitTextToSize(`Logline : « ${s.logline} »`, contentWidth - 12);
    doc.text(sLog, margin + 6, sY + 25, { lineHeightFactor: 1.3 });

    sY += 39;
  });

  /* =========================================================================
     PAGE 7 — UNIVERS ARTISTIQUE
     ========================================================================= */
  if (onProgress) onProgress('Page 7 : Univers Créatif...');
  doc.addPage();
  applyPageHeaderFooter(7, 9, 'Univers & Thématiques');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('UNIVERS', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  const keywords = [
    'CINÉMA AFRICAIN',
    'RÉCITS CONGOLAIS',
    'THRILLER',
    'FANTASTIQUE',
    'SURNATUREL',
    'MYSTÈRE',
    'DRAME',
    'ACTION',
    'SOCIAL',
  ];

  // Editorial Large Typography Grid
  let kY = 50;
  keywords.forEach((kw, i) => {
    const isEven = i % 2 === 0;
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(margin, kY, contentWidth, 20, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, kY, contentWidth, 20);

    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(isEven ? textWhite[0] : gold[0], isEven ? textWhite[1] : gold[1], isEven ? textWhite[2] : gold[2]);
    doc.text(`0${i + 1}.  ${kw}`, margin + 8, kY + 13.5);

    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('Pilier Narratif Junior France Mavie Ngakosso', pageWidth - margin - 8, kY + 13.5, { align: 'right' });

    kY += 23;
  });

  /* =========================================================================
     PAGE 8 — ŒUVRES / PROJETS PHARES
     ========================================================================= */
  if (onProgress) onProgress('Page 8 : Projets Phares...');
  doc.addPage();
  applyPageHeaderFooter(8, 9, 'Passerelles Livre & Écran');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('ŒUVRES PHARES', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  // Phare 1 : LA FORÊT INTERDITE
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, 46, contentWidth, 95, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.rect(margin, 46, contentWidth, 95);

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('1. LA FORÊT INTERDITE', margin + 8, 58);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('DOUBLE ÉDITION : LIVRE OFFICIEL & SÉRIE TÉLÉVISÉE (8 × 52 MIN)', margin + 8, 66);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const pForet =
    'Œuvre emblématique établissant le pont entre la publication littéraire distribuée internationalement sur Amazon et la série audiovisuelle prestigieuse. Elle incarne la signature de Junior France Mavie Ngakosso : un fantastique ancré dans les terres congolaises avec un traitement universel de l’adolescence, des croyances et du courage face aux forces de l’invisible.';
  const pFLines = doc.splitTextToSize(pForet, contentWidth - 16);
  doc.text(pFLines, margin + 8, 77, { lineHeightFactor: 1.5 });

  doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
  doc.rect(margin + 8, 108, contentWidth - 16, 25, 'F');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('• Livre disponible sur Amazon Worldwide', margin + 12, 116);
  doc.text('• Bible littéraire, arcs narratifs et pilotes de série disponibles pour coproduction', margin + 12, 124);

  // Phare 2 : LE CERCUEIL AUX MUSCLES
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, 150, contentWidth, 95, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, 150, contentWidth, 95);

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('2. LE CERCUEIL AUX MUSCLES', margin + 8, 162);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('LIVRE ROMAN & SCÉNARIO DE LONG-MÉTRAGE CINÉMA', margin + 8, 170);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const pCercueil =
    'Un drame psychologique intense explorant le corps masculin comme carapace émotionnelle après le deuil paternel. Le projet littéraire s’accompagne d’un scénario de long-métrage prêt pour l’accompagnement de production cinématographique et la sélection en festivals.';
  const pCLines = doc.splitTextToSize(pCercueil, contentWidth - 16);
  doc.text(pCLines, margin + 8, 181, { lineHeightFactor: 1.5 });

  doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
  doc.rect(margin + 8, 212, contentWidth - 16, 25, 'F');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('• Roman officiel édité sur Amazon', margin + 12, 220);
  doc.text('• Projet d’adaptation cinéma (90–105 min) — Traitement & dialogues complets', margin + 12, 228);

  /* =========================================================================
     PAGE 9 — CONTACT PROFESSIONNEL
     ========================================================================= */
  if (onProgress) onProgress('Page 9 : Coordonnées Professionnelles...');
  doc.addPage();
  applyPageHeaderFooter(9, 9, 'Contacts & Droits');

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('CONTACT', margin, 34);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 38, margin + 20, 38);

  // Big Identity Block
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, 46, contentWidth, 70, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, 46, contentWidth, 70);

  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('JUNIOR FRANCE MAVIE', margin + 8, 62);

  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('NGAKOSSO', margin + 8, 74);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Écrivain  •  Auteur  •  Scénariste  •  Créateur', margin + 8, 85);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('République du Congo  •  Brazzaville  •  Rayonnement International', margin + 8, 98);

  // Communication Details
  const contactY = 126;

  // Email Card
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, contactY, contentWidth, 34, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, contactY, contentWidth, 34);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('E-MAIL PROFESSIONNEL', margin + 8, contactY + 12);

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('ngakossoj35@gmail.com', margin + 8, contactY + 24);

  // WhatsApp Card
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, contactY + 42, contentWidth, 34, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, contactY + 42, contentWidth, 34);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('WHATSAPP PROFESSIONNEL', margin + 8, contactY + 54);

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  doc.text('+242 06 761 32 13  (067613213)', margin + 8, contactY + 66);

  // Note for Producers / Platforms
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, contactY + 84, contentWidth, 48, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, contactY + 84, contentWidth, 48);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('NOTE AUX PRODUCTEURS, ÉDITEURS ET DIFFUSEURS', margin + 8, contactY + 95);

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const noteP = [
    'Les œuvres présentées dans ce dossier sont disponibles pour examen des droits d’adaptation,',
    'de coproduction cinématographique et télévisuelle, ou d’édition littéraire internationale.',
    'Bibles de séries, traitements détaillés et scénarios complets transmis sur demande.',
  ];
  doc.text(noteP, margin + 8, contactY + 104, { lineHeightFactor: 1.4 });

  // Save the PDF
  if (onProgress) onProgress('Finalisation du téléchargement...');
  doc.save('Junior-France-Mavie-Ngakosso-Press-Kit.pdf');
}
