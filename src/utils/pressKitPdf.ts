import { jsPDF } from 'jspdf';
import { OFFICIAL_IMAGES } from '../data/portfolioData';

// Helper to convert any image URL to high-res Base64 Data URL via HTML5 Canvas
async function loadImageAsDataUrl(url: string, quality = 0.92): Promise<string | null> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }
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
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
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
  if (onProgress) onProgress('Chargement des visuels éditoriaux...');

  // Pre-load all visual assets in parallel for maximum speed
  const [
    portraitDataUrl,
    foretCoverDataUrl,
    cercueilCoverDataUrl,
    livre1560CoverDataUrl,
    pacteDiablePosterDataUrl,
    curseMouthPosterDataUrl,
    cercueilFilmPosterDataUrl,
    marcheOmbresPosterDataUrl,
    poster100JoursDataUrl,
    fatouDembelePosterDataUrl,
    enfantAlbinosPosterDataUrl,
    heritageOmbresPosterDataUrl,
    royaume242PosterDataUrl,
    lesSixPosterDataUrl,
    leSacPosterDataUrl,
    chezLePsyPosterDataUrl,
  ] = await Promise.all([
    loadImageAsDataUrl(OFFICIAL_IMAGES.portrait),
    loadImageAsDataUrl(OFFICIAL_IMAGES.bookForet),
    loadImageAsDataUrl(OFFICIAL_IMAGES.bookCercueil),
    loadImageAsDataUrl(OFFICIAL_IMAGES.bookLivre1560),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterPacteDiable),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterCurseMouth),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterCercueilFilm),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterMarcheOmbres),
    loadImageAsDataUrl(OFFICIAL_IMAGES.poster100Jours),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterFatouDembele),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterEnfantAlbinos),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterHeritageOmbres),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterRoyaume242),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterLesSix),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterLeSac),
    loadImageAsDataUrl(OFFICIAL_IMAGES.posterChezLePsy),
  ]);

  if (onProgress) onProgress('Mise en page éditoriale A4...');

  // Create A4 PDF (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Luxury Editorial Warm Palette
  const bgIvory = [250, 248, 245];       // #FAF8F5 Ivoire / Crème
  const bgCard = [244, 239, 232];        // #F4EFE8 Sable clair / Beige chaud
  const bgCardLight = [255, 253, 250];   // #FFFDFA Blanc cassé pur
  const bgAccentWarm = [238, 231, 220];  // #EEE7DC Beige accent
  const gold = [184, 140, 75];           // #B88C4B Bronze doré subtil
  const goldMuted = [205, 172, 124];     // #CDAC7C Or doux
  const textDark = [26, 24, 22];         // #1A1816 Noir chaud profond
  const textBody = [48, 43, 38];         // #302B26 Brun très foncé
  const textMuted = [115, 108, 98];      // #736C62 Gris chaud éditorial
  const borderCol = [220, 212, 200];     // #DCD4C8 Bordure papier fine
  const borderColLight = [232, 226, 216];// #E8E2D8 Bordure ultra subtile

  // Helper for applying Page Background & Luxury Editorial Header/Footer
  const applyPageHeaderFooter = (pageNum: number, totalPages: number, sectionTitle: string, subtitle?: string) => {
    // Warm Ivory Background
    doc.setFillColor(bgIvory[0], bgIvory[1], bgIvory[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Subtle decorative double border around the page
    doc.setDrawColor(borderColLight[0], borderColLight[1], borderColLight[2]);
    doc.setLineWidth(0.3);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Header rule & Title
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, 18, pageWidth - margin, 18);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(sectionTitle.toUpperCase(), margin, 14.5);

    doc.setFont('times', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(subtitle || 'DOSSIER DE PRESSE & PRÉSENTATION D’AUTEUR', pageWidth - margin, 14.5, { align: 'right' });

    // Footer rule & numbering
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text('JUNIOR FRANCE MAVIE NGAKOSSO', margin, pageHeight - 9.5);

    doc.setFont('times', 'italic');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('Écrivain • Auteur • Scénariste • Créateur', pageWidth / 2, pageHeight - 9.5, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${pageNum} / ${totalPages}`, pageWidth - margin, pageHeight - 9.5, { align: 'right' });
  };

  /* =========================================================================
     PAGE 1 — COUVERTURE ÉDITORIALE DE LUXE (AVEC LA VRAIE PHOTO OFFICIELLE)
     ========================================================================= */
  if (onProgress) onProgress('Page 1 : Couverture...');
  
  // Warm Ivory Base
  doc.setFillColor(bgIvory[0], bgIvory[1], bgIvory[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Outer Double Gold Border Frame
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setLineWidth(0.25);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Top Header Banner
  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('P R E S S   K I T', pageWidth / 2, 20, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('DOSSIER DE PRESSE OFFICIEL • ÉDITION INTERNATIONALE', pageWidth / 2, 25, { align: 'center' });

  // Subtle Background Artwork Collage (Tilted real covers around the frame)
  const drawBgThumb = (dataUrl: string | null, x: number, y: number, w: number, h: number) => {
    if (!dataUrl) return;
    try {
      doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
      doc.rect(x - 1, y - 1, w + 2, h + 2, 'F');
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.rect(x - 1, y - 1, w + 2, h + 2);
      doc.addImage(dataUrl, 'JPEG', x, y, w, h);
      doc.setDrawColor(goldMuted[0], goldMuted[1], goldMuted[2]);
      doc.setLineWidth(0.2);
      doc.rect(x, y, w, h);
    } catch {
      // ignore
    }
  };

  // 4 Genuine Artwork Vignettes in background corners
  drawBgThumb(foretCoverDataUrl, 16, 36, 26, 39);
  drawBgThumb(cercueilCoverDataUrl, pageWidth - 42, 36, 26, 39);
  drawBgThumb(heritageOmbresPosterDataUrl, 16, 186, 26, 39);
  drawBgThumb(livre1560CoverDataUrl, pageWidth - 42, 186, 26, 39);

  // CENTRAL MASTERPIECE: Authentic Official Author Portrait
  const cPhotoW = 86;
  const cPhotoH = 108;
  const cPhotoX = (pageWidth - cPhotoW) / 2;
  const cPhotoY = 36;

  // Background frame for portrait
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(cPhotoX - 3, cPhotoY - 3, cPhotoW + 6, cPhotoH + 6, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.8);
  doc.rect(cPhotoX - 3, cPhotoY - 3, cPhotoW + 6, cPhotoH + 6);

  if (portraitDataUrl) {
    try {
      doc.addImage(portraitDataUrl, 'JPEG', cPhotoX, cPhotoY, cPhotoW, cPhotoH);
      // Fine inner gold line
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.3);
      doc.rect(cPhotoX, cPhotoY, cPhotoW, cPhotoH);
    } catch {
      // Fallback
      doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
      doc.rect(cPhotoX, cPhotoY, cPhotoW, cPhotoH, 'F');
    }
  }

  // Author Typographic Identity (Luxury Magazine Typography)
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('J U N I O R   F R A N C E   M A V I E', pageWidth / 2, 160, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('NGAKOSSO', pageWidth / 2, 172, { align: 'center' });

  // Gold Decorative Line with diamond symbol
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 35, 178, pageWidth / 2 + 35, 178);

  // Big PRESS KIT Title
  doc.setFont('times', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('PRESS KIT', pageWidth / 2, 194, { align: 'center' });

  // 4 Dimensions
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ÉCRIVAIN   •   AUTEUR   •   SCÉNARISTE   •   CRÉATEUR', pageWidth / 2, 204, { align: 'center' });

  // Quote
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('« Des histoires à écrire. Des mondes à créer. »', pageWidth / 2, 216, { align: 'center' });

  // Editorial Pillars Box at bottom
  const bBoxY = 230;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin + 6, bBoxY, contentWidth - 12, 34, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin + 6, bBoxY, contentWidth - 12, 34);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LITTÉRATURE   •   CINÉMA   •   SÉRIES   •   PROJETS AUDIOVISUELS', pageWidth / 2, bBoxY + 11, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Dossier de référence certifié • Bibles littéraires, scénarios complets et catalogues de projets', pageWidth / 2, bBoxY + 19, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('RÉPUBLIQUE DU CONGO — BRAZZAVILLE', pageWidth / 2, bBoxY + 27, { align: 'center' });

  /* =========================================================================
     PAGE 2 — PRÉSENTATION & IDENTITÉ PROFESSIONNELLE
     ========================================================================= */
  if (onProgress) onProgress('Page 2 : À Propos de l’Auteur...');
  doc.addPage();
  applyPageHeaderFooter(2, 9, 'Présentation Officielle', 'Biographie & Identité');

  // Page Title
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('À PROPOS DE L’AUTEUR', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  // Author Photo in Editorial Polaroid / Gold Frame
  const p2PhotoW = 54;
  const p2PhotoH = 68;
  const p2PhotoX = margin;
  const p2PhotoY = 44;

  // Card backing
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(p2PhotoX - 2, p2PhotoY - 2, p2PhotoW + 4, p2PhotoH + 16, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(p2PhotoX - 2, p2PhotoY - 2, p2PhotoW + 4, p2PhotoH + 16);

  if (portraitDataUrl) {
    try {
      doc.addImage(portraitDataUrl, 'JPEG', p2PhotoX, p2PhotoY, p2PhotoW, p2PhotoH);
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.3);
      doc.rect(p2PhotoX, p2PhotoY, p2PhotoW, p2PhotoH);
    } catch {
      // ignore
    }
  }

  // Polaroid Caption under photo
  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Junior France Mavie Ngakosso', p2PhotoX + p2PhotoW / 2, p2PhotoY + p2PhotoH + 7, { align: 'center' });
  doc.text('Brazzaville, République du Congo', p2PhotoX + p2PhotoW / 2, p2PhotoY + p2PhotoH + 12, { align: 'center' });

  // Right Side Bio Card
  const bioX = margin + p2PhotoW + 8;
  const bioW = contentWidth - p2PhotoW - 8;
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(bioX, p2PhotoY - 2, bioW, p2PhotoH + 16, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(bioX, p2PhotoY - 2, bioW, p2PhotoH + 16);

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('JUNIOR FRANCE MAVIE NGAKOSSO', bioX + 6, p2PhotoY + 7);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Écrivain  •  Auteur  •  Scénariste  •  Créateur', bioX + 6, p2PhotoY + 14);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.2);
  doc.line(bioX + 6, p2PhotoY + 17, bioX + 45, p2PhotoY + 17);

  // Exact Requested Bio Text
  doc.setFont('times', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);

  const p1 =
    'Junior France Mavie NGAKOSSO est un écrivain, auteur, scénariste et créateur congolais.';
  const p2 =
    'Il développe des œuvres littéraires et audiovisuelles principalement ancrées dans des univers africains et congolais, avec une prédilection pour le thriller, le fantastique, le surnaturel, le drame, le mystère, l’action et les récits sociaux.';
  const p3 =
    'Son travail cherche à associer des histoires profondément humaines à des univers forts, avec une identité congolaise assumée.';

  let bioTextY = p2PhotoY + 23;
  const p1Lines = doc.splitTextToSize(p1, bioW - 12);
  doc.text(p1Lines, bioX + 6, bioTextY, { lineHeightFactor: 1.35 });
  bioTextY += p1Lines.length * 4.2 + 3;

  const p2Lines = doc.splitTextToSize(p2, bioW - 12);
  doc.text(p2Lines, bioX + 6, bioTextY, { lineHeightFactor: 1.35 });
  bioTextY += p2Lines.length * 4.2 + 3;

  const p3Lines = doc.splitTextToSize(p3, bioW - 12);
  doc.text(p3Lines, bioX + 6, bioTextY, { lineHeightFactor: 1.35 });

  // 4 Dimensions Professionnelles (Structured Editorial Cards)
  const roleY = p2PhotoY + p2PhotoH + 24;
  const roles = [
    {
      title: 'ÉCRIVAIN',
      sub: 'Littérature & Romans',
      desc: 'Création d’œuvres littéraires publiées (Le Cercueil aux Muscles, La Forêt Interdite, Le Livre – 1560). Récits introspectifs, fantastiques et mystiques.',
    },
    {
      title: 'AUTEUR',
      sub: 'Univers & Propriétés Intellectuelles',
      desc: 'Développement de concepts originaux, mythologies contemporaines d’Afrique centrale et passerelles narratives transmédia livre / écran.',
    },
    {
      title: 'SCÉNARISTE',
      sub: 'Longs-Métrages & Cinéma',
      desc: 'Écriture de longs-métrages de fiction (7 projets complets ou en développement), caractérisés par une tension psychologique aiguë et des dialogues percutants.',
    },
    {
      title: 'CRÉATEUR',
      sub: 'Séries Télévisées & Showrunning',
      desc: 'Conception de bibles complètes de séries TV (6 séries originales : 8×52min, 8×45min, 10×26min, 15×26min) prêtes pour la coproduction internationale.',
    },
  ];

  const colW = (contentWidth - 6) / 2;
  roles.forEach((r, idx) => {
    const rx = margin + (idx % 2) * (colW + 6);
    const ry = roleY + Math.floor(idx / 2) * 44;

    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(rx, ry, colW, 40, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(rx, ry, colW, 40);

    // Left gold bar
    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(rx, ry, 2.5, 40, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(r.title, rx + 8, ry + 9);

    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(r.sub, rx + 8, ry + 15);

    doc.setFont('times', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(textBody[0], textBody[1], textBody[2]);
    const rLines = doc.splitTextToSize(r.desc, colW - 14);
    doc.text(rLines, rx + 8, ry + 21, { lineHeightFactor: 1.35 });
  });

  // Editorial Tagline Banner at bottom
  const tagY = roleY + 93;
  doc.setFillColor(bgAccentWarm[0], bgAccentWarm[1], bgAccentWarm[2]);
  doc.rect(margin, tagY, contentWidth, 24, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, tagY, contentWidth, 24);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('« Des histoires à écrire. Des mondes à créer. »', pageWidth / 2, tagY + 10, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Une démarche artistique associant l’exigence romanesque à la puissance visuelle des écrans contemporains.', pageWidth / 2, tagY + 17, { align: 'center' });

  /* =========================================================================
     PAGE 3 — MON UNIVERS (PILIERS NARRATIFS & TYPOGRAPHIE ARTISTIQUE)
     ========================================================================= */
  if (onProgress) onProgress('Page 3 : Mon Univers...');
  doc.addPage();
  applyPageHeaderFooter(3, 9, 'Vision & Esthétique', 'Piliers Narratifs & Thématiques');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('MON UNIVERS', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  // Intro Subtitle
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Les grands thèmes et vibrations esthétiques qui traversent l’ensemble des créations de l’auteur.', margin, 42);

  const pillarsList = [
    {
      num: '01',
      title: 'CINÉMA AFRICAIN & HISTOIRES CONGOLAISES',
      desc: 'Ancrer les récits dans des décors authentiques — les berges du fleuve Congo, les artères de Brazzaville, les forêts sacrées équatoriales — pour conférer aux histoires locales une résonance cinématographique universelle.',
    },
    {
      num: '02',
      title: 'THRILLER, SUSPENSE & MYSTÈRE',
      desc: 'Concevoir des mécaniques narratives haletantes, des courses contre la montre psychologiques et des intrigues rigoureusement construites, maintenant une tension dramatique constante du premier au dernier acte.',
    },
    {
      num: '03',
      title: 'FANTASTIQUE & SURNATUREL ANCESTRAL',
      desc: 'Explorer les cosmogonies d’Afrique centrale, les déchirures invisibles entre les mondes, les pactes occultes et les tabous séculaires, réinvestis avec les codes des grands genres contemporains.',
    },
    {
      num: '04',
      title: 'DRAME HUMAIN, ACTION & RÉCITS SOCIAUX',
      desc: 'Placer la vulnérabilité, le deuil, la quête d’émancipation et la solidarité familiale au cœur de chaque conflit. L’intimité des personnages nourrit le spectaculaire et la profondeur du propos.',
    },
  ];

  let pY = 48;
  pillarsList.forEach((p) => {
    doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
    doc.rect(margin, pY, contentWidth, 34, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, pY, contentWidth, 34);

    // Number badge
    doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
    doc.rect(margin, pY, 18, 34, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.line(margin + 18, pY, margin + 18, pY + 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(p.num, margin + 9, pY + 20, { align: 'center' });

    // Text block
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(p.title, margin + 24, pY + 11);

    doc.setFont('times', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(textBody[0], textBody[1], textBody[2]);
    const pLines = doc.splitTextToSize(p.desc, contentWidth - 30);
    doc.text(pLines, margin + 24, pY + 18, { lineHeightFactor: 1.35 });

    pY += 38;
  });

  // Large Editorial Keyword Strip at Bottom
  const keyY = pY + 6;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, keyY, contentWidth, 42, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, keyY, contentWidth, 42);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('MOTS-CLÉS & SIGNATURE ÉDITORIALE', margin + 8, keyY + 10);

  const universeKeywords = [
    'CINÉMA AFRICAIN',
    'HISTOIRES CONGOLAISES',
    'THRILLER',
    'FANTASTIQUE',
    'SURNATUREL',
    'MYSTÈRE',
    'DRAME',
    'ACTION',
    'RÉCITS SOCIAUX',
  ];

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(universeKeywords.slice(0, 5).join('   •   '), margin + 8, keyY + 22);
  doc.text(universeKeywords.slice(5).join('   •   '), margin + 8, keyY + 33);

  /* =========================================================================
     PAGE 4 — ŒUVRES LITTÉRAIRES (BIBLIOGRAPHIE)
     ========================================================================= */
  if (onProgress) onProgress('Page 4 : Œuvres Littéraires...');
  doc.addPage();
  applyPageHeaderFooter(4, 9, 'Publications Officielles', 'Œuvres Littéraires');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ŒUVRES LITTÉRAIRES', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  // Livre 1: LE CERCUEIL AUX MUSCLES
  let b4Y = 40;
  const bCoverW = 28;
  const bCoverH = 42;

  // Book 1 Card
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(margin, b4Y, contentWidth, 68, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, b4Y, contentWidth, 68);

  if (cercueilCoverDataUrl) {
    try {
      doc.addImage(cercueilCoverDataUrl, 'JPEG', margin + 4, b4Y + 4, bCoverW, bCoverH);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.rect(margin + 4, b4Y + 4, bCoverW, bCoverH);
    } catch {
      // ignore
    }
  }

  const b1TextX = margin + bCoverW + 9;
  const b1TextW = contentWidth - bCoverW - 13;

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LE CERCUEIL AUX MUSCLES', b1TextX, b4Y + 9);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre / œuvre littéraire  •  Auteur : Junior France Mavie NGAKOSSO  •  Disponible sur Amazon', b1TextX, b4Y + 15);
  doc.text('Univers : Drame psychologique / introspectif  •  Projet d’adaptation long-métrage cinéma', b1TextX, b4Y + 20);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const b1Desc =
    "Le livre raconte le parcours d'un jeune homme confronté au décès de son père et qui transforme progressivement son corps en une sorte d'armure pour tenter de cacher sa souffrance. L'œuvre explore le deuil, la masculinité, la douleur, la famille, le rapport au corps et la reconstruction personnelle.";
  const b1Lines = doc.splitTextToSize(b1Desc, b1TextW);
  doc.text(b1Lines, b1TextX, b4Y + 27, { lineHeightFactor: 1.35 });

  doc.setFont('times', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('« J’ai forgé du muscle là où mon cœur saignait, persuadé qu’une armure de fonte empêcherait mes larmes de couler. »', b1TextX, b4Y + 61);

  // Livre 2: LA FORÊT INTERDITE
  b4Y = 112;
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(margin, b4Y, contentWidth, 72, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, b4Y, contentWidth, 72);

  if (foretCoverDataUrl) {
    try {
      doc.addImage(foretCoverDataUrl, 'JPEG', margin + 4, b4Y + 4, bCoverW, bCoverH);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.rect(margin + 4, b4Y + 4, bCoverW, bCoverH);
    } catch {
      // ignore
    }
  }

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LA FORÊT INTERDITE', b1TextX, b4Y + 9);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre  •  Auteur : Junior France Mavie NGAKOSSO  •  Disponible sur Amazon', b1TextX, b4Y + 15);
  doc.text('Univers : Fantastique • Mystique • Surnaturel • Congo', b1TextX, b4Y + 20);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const b2Desc =
    "Au cœur de la forêt équatoriale congolaise, la profanation d'un sanctuaire ancestral libère les forces de l'invisible, réveillant un pacte séculaire entre les hommes et les esprits. Une plongée au cœur de la République du Congo où des forces ancestrales menacent l'équilibre fragile entre les vivants et les esprits.";
  const b2Lines = doc.splitTextToSize(b2Desc, b1TextW);
  doc.text(b2Lines, b1TextX, b4Y + 27, { lineHeightFactor: 1.35 });

  // Special Dual Mention
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(b1TextX, b4Y + 46, b1TextW, 20, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.rect(b1TextX, b4Y + 46, b1TextW, 20);

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('✦ DOUBLE FORMAT : LIVRE ROMAN & PROJET DE SÉRIE TÉLÉVISÉE', b1TextX + 4, b4Y + 53);

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  doc.text('L’œuvre existe sous forme de livre sur Amazon et de série TV majeure (8 épisodes de 52 minutes).', b1TextX + 4, b4Y + 60);

  // Livre 3: LE LIVRE – 1560
  b4Y = 188;
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(margin, b4Y, contentWidth, 80, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, b4Y, contentWidth, 80);

  if (livre1560CoverDataUrl) {
    try {
      doc.addImage(livre1560CoverDataUrl, 'JPEG', margin + 4, b4Y + 4, bCoverW, bCoverH);
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.rect(margin + 4, b4Y + 4, bCoverW, bCoverH);
    } catch {
      // ignore
    }
  }

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LE LIVRE – 1560', b1TextX, b4Y + 9);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Livre / œuvre littéraire  •  Auteur : Junior France Mavie NGAKOSSO', b1TextX, b4Y + 15);
  doc.text('Univers : Thriller surnaturel • Mystère • Fantastique • Mystique', b1TextX, b4Y + 20);

  doc.setFont('times', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('LOGLINE :', b1TextX, b4Y + 27);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const b3Log =
    "« À Brazzaville, deux jumeaux nés d'une tragédie découvrent qu'un grimoire mystique daté de 1560 les immunise contre les esprits qui contrôlent secrètement la ville. Devenus des cibles à abattre, ils doivent maîtriser les secrets du livre pour survivre, venger leur mère et briser l'emprise des entités sur la capitale. »";
  const b3LogLines = doc.splitTextToSize(b3Log, b1TextW);
  doc.text(b3LogLines, b1TextX, b4Y + 32, { lineHeightFactor: 1.3 });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('PITCH ÉDITORIAL :', b1TextX, b4Y + 50);

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const b3Pitch =
    "Brazzaville, métropole moderne. Une femme meurt en donnant naissance à des jumeaux en laissant un livre relié de cuir daté de 1560. Ce grimoire de chasse recense les « Anomalies », esprits possédant les vivants depuis des siècles. Les jumeaux deviennent les nouveaux Gardiens du Livre.";
  const b3PitchLines = doc.splitTextToSize(b3Pitch, b1TextW);
  doc.text(b3PitchLines, b1TextX, b4Y + 55, { lineHeightFactor: 1.3 });

  /* =========================================================================
     PAGE 5 — LA FORÊT INTERDITE (PAGE SPÉCIALE ŒUVRE PHARE)
     ========================================================================= */
  if (onProgress) onProgress('Page 5 : La Forêt Interdite...');
  doc.addPage();
  applyPageHeaderFooter(5, 9, 'Œuvre Phare', 'La Forêt Interdite — Livre & Série TV');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LA FORÊT INTERDITE', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  // Large Dominant Poster Left
  const p5PosterW = 68;
  const p5PosterH = 102;
  const p5PosterX = margin;
  const p5PosterY = 44;

  if (foretCoverDataUrl) {
    try {
      doc.addImage(foretCoverDataUrl, 'JPEG', p5PosterX, p5PosterY, p5PosterW, p5PosterH);
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.setLineWidth(0.5);
      doc.rect(p5PosterX, p5PosterY, p5PosterW, p5PosterH);
    } catch {
      // ignore
    }
  }

  // Right Side Editorial Focus
  const p5TextX = margin + p5PosterW + 8;
  const p5TextW = contentWidth - p5PosterW - 8;

  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(p5TextX, p5PosterY, p5TextW, p5PosterH, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(p5TextX, p5PosterY, p5TextW, p5PosterH);

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LA FORÊT INTERDITE', p5TextX + 6, p5PosterY + 9);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('SÉRIE TÉLÉVISÉE  •  8 × 52 MINUTES', p5TextX + 6, p5PosterY + 16);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Genre : Thriller surnaturel • Mystique • Action • Drame', p5TextX + 6, p5PosterY + 22);
  doc.text('Lieu : République du Congo  |  Langues : Français 70 % • Lingala 30 %', p5TextX + 6, p5PosterY + 27);
  doc.text('Créateur / Scénariste : Junior France Mavie NGAKOSSO', p5TextX + 6, p5PosterY + 32);

  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setLineWidth(0.2);
  doc.line(p5TextX + 6, p5PosterY + 35, p5TextX + p5TextW - 6, p5PosterY + 35);

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('LOGLINE OFFICIELLE :', p5TextX + 6, p5PosterY + 41);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const fLog =
    "« À Ngoma, après l’abattage d’une forêt sacrée pour des intérêts financiers, Kito, 17 ans, découvre qu’il est le dernier héritier d’un ancien pouvoir et doit réparer le lien brisé entre le monde des vivants et celui des esprits avant que l’invisible ne dévore son village. »";
  const fLogLines = doc.splitTextToSize(fLog, p5TextW - 12);
  doc.text(fLogLines, p5TextX + 6, p5PosterY + 47, { lineHeightFactor: 1.35 });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('STATUT DU PROJET :', p5TextX + 6, p5PosterY + 84);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  doc.text('Bible littéraire complète • Arcs des 8 épisodes • Scénario du pilote disponible.', p5TextX + 6, p5PosterY + 90);
  doc.text('Recherche de coproduction & préachats plateformes internationales.', p5TextX + 6, p5PosterY + 95);

  // Dual Format Graphical Split at Bottom
  const splitY = p5PosterY + p5PosterH + 8;
  const splitW = (contentWidth - 6) / 2;

  // Format 1 : Livre
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, splitY, splitW, 72, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, splitY, splitW, 72);

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('📚 FORMAT 1 : LIVRE OFFICIEL', margin + 6, splitY + 10);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Édition Roman Disponible sur Amazon', margin + 6, splitY + 16);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.3);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const lFDesc =
    "Une œuvre littéraire immersive qui explore la mythologie du Bisengo, l'écologie sacrée et l'affrontement entre la cupidité moderne et les gardiens de la forêt équatoriale congolaise.";
  const lFLines = doc.splitTextToSize(lFDesc, splitW - 12);
  doc.text(lFLines, margin + 6, splitY + 24, { lineHeightFactor: 1.35 });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('• Distribution internationale physique & numérique', margin + 6, splitY + 54);
  doc.text('• Base littéraire certifiée pour développement audiovisuel', margin + 6, splitY + 62);

  // Format 2 : Série TV
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin + splitW + 6, splitY, splitW, 72, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin + splitW + 6, splitY, splitW, 72);

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('🎬 FORMAT 2 : SÉRIE TÉLÉVISÉE', margin + splitW + 12, splitY + 10);

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('8 Épisodes de 52 Minutes — Prestige TV', margin + splitW + 12, splitY + 16);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.3);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const sFDesc =
    "Une série de prestige combinant l'esthétique du grand thriller d'investigation et l'horreur mystique surnaturelle, portée par une mise en scène cinématographique et des personnages à forte résonance humaine.";
  const sFLines = doc.splitTextToSize(sFDesc, splitW - 12);
  doc.text(sFLines, margin + splitW + 12, splitY + 24, { lineHeightFactor: 1.35 });

  doc.setFont('times', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('• Bible de 8 épisodes et bible graphique prêtes', margin + splitW + 12, splitY + 54);
  doc.text('• Projet ouvert aux producteurs et plateformes VOD', margin + splitW + 12, splitY + 62);

  /* =========================================================================
     PAGE 6 — CRÉATEUR DE SÉRIES (6 SÉRIES ORIGINALES)
     ========================================================================= */
  if (onProgress) onProgress('Page 6 : Créateur de Séries...');
  doc.addPage();
  applyPageHeaderFooter(6, 9, 'Créateur & Showrunner', 'Catalogue des Séries Télévisées');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('CRÉATEUR DE SÉRIES', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  const seriesCatalog = [
    {
      titre: 'LA FORÊT INTERDITE',
      format: '8 × 52 min',
      genre: 'Thriller surnaturel • Mystique • Drame',
      lieu: 'République du Congo',
      statut: 'Projet finalisé (Bible & Scénarios)',
      poster: foretCoverDataUrl,
      logline: 'Après l’abattage d’une forêt sacrée à Ngoma, Kito découvre qu’il est l’héritier d’un pouvoir ancestral et doit affronter des forces invisibles.',
    },
    {
      titre: 'L’HÉRITAGE DES OMBRES',
      format: '8 × 45 min',
      genre: 'Thriller • Drame familial • Crime',
      lieu: 'Brazzaville',
      statut: 'Projet finalisé',
      poster: heritageOmbresPosterDataUrl,
      logline: 'Après l’assassinat de son père, Jason infiltre le puissant empire financier familial, devant choisir entre détruire le système ou le contrôler.',
    },
    {
      titre: 'ROYAUME 242',
      format: '8 × 52 min',
      genre: 'Thriller politique',
      lieu: 'Brazzaville & Pool',
      statut: 'Projet finalisé',
      poster: royaume242PosterDataUrl,
      logline: 'La découverte clandestine d’une carte révélant un colossal gisement d’or dans le Pool déclenche une guerre d’influence impitoyable.',
    },
    {
      titre: 'LES SIX',
      format: '8 × 52 min',
      genre: 'Thriller psychologique • Crime',
      lieu: 'Brazzaville',
      statut: 'Projet finalisé',
      poster: lesSixPosterDataUrl,
      logline: 'Six jeunes découvrent une pièce secrète avec des vidéos compromettantes de notables, avant de réaliser qu’un corbeau les surveille.',
    },
    {
      titre: 'LE SAC',
      format: '10 × 26 min',
      genre: 'Comédie noire • Action • Urbain',
      lieu: 'Brazzaville',
      statut: 'Projet',
      poster: leSacPosterDataUrl,
      logline: 'Après avoir dérobé un sac contenant 200 millions de FCFA issu d’un braquage raté, trois jeunes précaires tentent de fuir leurs poursuivants.',
    },
    {
      titre: 'CHEZ LE PSY / LE CABINET',
      format: '15 × 26 min',
      genre: 'Comédie dramatique • Psychologie',
      lieu: 'Brazzaville (Poto-Poto / Bacongo)',
      statut: 'Projet',
      poster: chezLePsyPosterDataUrl,
      logline: 'Dans un cabinet à Brazzaville, chaque épisode suit un patient confronté aux défis intimes, familiaux et sociaux de la vie moderne.',
    },
  ];

  const sGridCols = 2;
  const sItemW = (contentWidth - 6) / sGridCols;
  const sItemH = 68;
  const sPosterW = 22;
  const sPosterH = 33;
  let sGridY = 42;

  seriesCatalog.forEach((s, idx) => {
    const col = idx % sGridCols;
    const row = Math.floor(idx / sGridCols);
    const sx = margin + col * (sItemW + 6);
    const sy = sGridY + row * (sItemH + 6);

    doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
    doc.rect(sx, sy, sItemW, sItemH, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(sx, sy, sItemW, sItemH);

    // Poster thumbnail
    if (s.poster) {
      try {
        doc.addImage(s.poster, 'JPEG', sx + 3, sy + 3, sPosterW, sPosterH);
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.2);
        doc.rect(sx + 3, sy + 3, sPosterW, sPosterH);
      } catch {
        // ignore
      }
    }

    const sInfoX = sx + sPosterW + 6;
    const sInfoW = sItemW - sPosterW - 8;

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(s.titre, sInfoX, sy + 7);

    doc.setFont('times', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${s.format}  •  ${s.genre}`, sInfoX, sy + 12);
    doc.text(`Lieu : ${s.lieu}  •  ${s.statut}`, sInfoX, sy + 16);

    doc.setFont('times', 'normal');
    doc.setFontSize(6.6);
    doc.setTextColor(textBody[0], textBody[1], textBody[2]);
    const sLogLines = doc.splitTextToSize(`« ${s.logline} »`, sItemW - 8);
    doc.text(sLogLines, sx + 4, sy + 41, { lineHeightFactor: 1.3 });
  });

  /* =========================================================================
     PAGE 7 — SCÉNARISTE (LONGS-MÉTRAGES)
     ========================================================================= */
  if (onProgress) onProgress('Page 7 : Scénariste...');
  doc.addPage();
  applyPageHeaderFooter(7, 9, 'Scénariste — Longs-Métrages', 'Projets Cinéma en Développement');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('SCÉNARISTE — FILMS', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  const filmsCatalog = [
    {
      titre: 'PACTE AVEC LE DIABLE',
      duree: '90 min',
      genre: 'Thriller mystique • Drame social',
      statut: 'Scénario en développement',
      poster: pacteDiablePosterDataUrl,
      logline: 'Trois jeunes hommes pauvres concluent un pacte occulte pour obtenir fortune et respect, découvrant que le prix détruit leur humanité.',
    },
    {
      titre: 'THE CURSE MOUTH',
      duree: '95 min',
      genre: 'Thriller surnaturel • Horreur',
      statut: 'Scénario complet',
      poster: curseMouthPosterDataUrl,
      logline: 'Dans une ville où une malédiction frappe ceux condamnés par une victime opprimée, un journaliste enquête avant le prochain coucher du soleil.',
    },
    {
      titre: 'LE CERCUEIL AUX MUSCLES',
      duree: '90–105 min',
      genre: 'Drame psychologique • Familial',
      statut: 'Projet audiovisuel / adaptation',
      poster: cercueilFilmPosterDataUrl,
      logline: 'Après la mort de son père, un jeune homme transforme son corps en armure, apprenant que la vraie force réside dans la vulnérabilité assumée.',
    },
    {
      titre: 'LE MARCHÉ DES OMBRES',
      duree: '105 min',
      genre: 'Drame • Thriller historique',
      statut: 'Scénario',
      poster: marcheOmbresPosterDataUrl,
      logline: 'Vingt ans après la guerre, un vétéran retrouve au bord du fleuve Congo la femme qu’il croyait morte et un fils qu’il ignorait avoir.',
    },
    {
      titre: '100 JOURS',
      duree: 'Long-métrage',
      genre: 'Horreur psychologique • Surnaturel',
      statut: 'Scénario complet',
      poster: poster100JoursDataUrl,
      logline: 'Un homme découvre un livre ancien imposant des règles durant 100 jours, révélant un jeu surnaturel qui menace sa propre existence.',
    },
    {
      titre: 'FATOU DEMBÉLÉ',
      duree: 'Long-métrage',
      genre: 'Drame familial • Drame social',
      statut: 'Scénario en développement',
      poster: fatouDembelePosterDataUrl,
      logline: 'En exil loin de chez elle, Fatou est ramenée vers son passé et sa famille par un objet hérité et la gastronomie congolaise.',
    },
    {
      titre: 'L’ENFANT ALBINOS',
      duree: '95 min',
      genre: 'Drame social • Drame poétique',
      statut: 'Scénario',
      poster: enfantAlbinosPosterDataUrl,
      logline: 'À Brazzaville, Néné, jeune artiste albinos, transforme la place de son quartier par une fresque géante, bousculant les superstitions.',
    },
  ];

  let fY = 40;
  const fPosterW = 18;
  const fPosterH = 26;

  filmsCatalog.forEach((f) => {
    doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
    doc.rect(margin, fY, contentWidth, 29, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, fY, contentWidth, 29);

    if (f.poster) {
      try {
        doc.addImage(f.poster, 'JPEG', margin + 2.5, fY + 1.5, fPosterW, fPosterH);
        doc.setDrawColor(gold[0], gold[1], gold[2]);
        doc.setLineWidth(0.2);
        doc.rect(margin + 2.5, fY + 1.5, fPosterW, fPosterH);
      } catch {
        // ignore
      }
    }

    const fInfoX = margin + fPosterW + 6;
    const fInfoW = contentWidth - fPosterW - 10;

    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(f.titre, fInfoX, fY + 6.5);

    doc.setFont('times', 'italic');
    doc.setFontSize(7.2);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${f.duree}  •  ${f.genre}  •  Statut : ${f.statut}`, fInfoX, fY + 12);

    doc.setFont('times', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textBody[0], textBody[1], textBody[2]);
    const fLogLines = doc.splitTextToSize(`Logline : « ${f.logline} »`, fInfoW);
    doc.text(fLogLines, fInfoX, fY + 17.5, { lineHeightFactor: 1.3 });

    fY += 32;
  });

  /* =========================================================================
     PAGE 8 — PORTFOLIO VISUEL & TABLE DE TRAVAIL ÉDITORIALE
     ========================================================================= */
  if (onProgress) onProgress('Page 8 : Portfolio Visuel...');
  doc.addPage();
  applyPageHeaderFooter(8, 9, 'Portfolio Visuel', 'Galerie Cinématographique & Table de Travail');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('PORTFOLIO VISUEL', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Affiches officielles, couvertures éditées et atmosphères des projets audiovisuels.', margin, 42);

  // Gallery of Posters in Luxury Grid with Polaroid styling
  const galleryItems = [
    { title: 'La Forêt Interdite', img: foretCoverDataUrl },
    { title: 'L’Héritage des Ombres', img: heritageOmbresPosterDataUrl },
    { title: 'Royaume 242', img: royaume242PosterDataUrl },
    { title: 'Les Six', img: lesSixPosterDataUrl },
    { title: 'Le Sac', img: leSacPosterDataUrl },
    { title: 'Chez le Psy', img: chezLePsyPosterDataUrl },
    { title: 'Le Livre – 1560', img: livre1560CoverDataUrl },
    { title: 'Le Cercueil aux Muscles', img: cercueilCoverDataUrl },
  ];

  const gCols = 4;
  const gW = (contentWidth - 9) / gCols;
  const gH = gW * 1.5;
  let gY = 48;

  galleryItems.forEach((item, idx) => {
    const col = idx % gCols;
    const row = Math.floor(idx / gCols);
    const gx = margin + col * (gW + 3);
    const gy = gY + row * (gH + 18);

    doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
    doc.rect(gx, gy, gW, gH + 12, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(gx, gy, gW, gH + 12);

    if (item.img) {
      try {
        doc.addImage(item.img, 'JPEG', gx + 2, gy + 2, gW - 4, gH);
        doc.setDrawColor(borderColLight[0], borderColLight[1], borderColLight[2]);
        doc.rect(gx + 2, gy + 2, gW - 4, gH);
      } catch {
        // ignore
      }
    }

    doc.setFont('times', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(item.title, gx + gW / 2, gy + gH + 7, { align: 'center' });
  });

  // Moodboard Note Box
  const noteY = gY + 2 * (gH + 18) + 6;
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, noteY, contentWidth, 32, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, noteY, contentWidth, 32);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('« Donner vie à l’invisible. Raconter la force et le mystère de l’Afrique contemporaine. »', pageWidth / 2, noteY + 12, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Toutes les affiches et bibles graphiques sont protégées par les droits d’auteur et disponibles pour coproduction.', pageWidth / 2, noteY + 22, { align: 'center' });

  /* =========================================================================
     PAGE 9 — CONTACT (CONTACTS & DROITS PROFESSIONNELS)
     ========================================================================= */
  if (onProgress) onProgress('Page 9 : Contacts...');
  doc.addPage();
  applyPageHeaderFooter(9, 9, 'Contacts & Droits', 'Relations Professionnelles');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('CONTACT', margin, 32);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, 36, margin + 25, 36);

  // Author Presentation Card
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(margin, 44, contentWidth, 75, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, 44, contentWidth, 75);

  if (portraitDataUrl) {
    try {
      doc.addImage(portraitDataUrl, 'JPEG', margin + 6, 50, 48, 62);
      doc.setDrawColor(gold[0], gold[1], gold[2]);
      doc.rect(margin + 6, 50, 48, 62);
    } catch {
      // ignore
    }
  }

  const cTextX = margin + 60;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('JUNIOR FRANCE MAVIE', cTextX, 58);

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('NGAKOSSO', cTextX, 68);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Écrivain  •  Auteur  •  Scénariste  •  Créateur', cTextX, 76);

  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.2);
  doc.line(cTextX, 80, cTextX + 60, 80);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  doc.text('Brazzaville, République du Congo', cTextX, 88);
  doc.text('Rayonnement & Distribution Internationale', cTextX, 94);
  doc.text('Langues de travail : Français, Lingala, Kituba', cTextX, 100);

  // Contact Channels Grid
  const cGridY = 126;

  // E-mail Card
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, cGridY, contentWidth, 34, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, cGridY, contentWidth, 34);

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('E-MAIL PROFESSIONNEL', margin + 8, cGridY + 11);

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ngakossoj35@gmail.com', margin + 8, cGridY + 23);

  // WhatsApp Card
  doc.setFillColor(bgCard[0], bgCard[1], bgCard[2]);
  doc.rect(margin, cGridY + 40, contentWidth, 34, 'F');
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.rect(margin, cGridY + 40, contentWidth, 34);

  doc.setFont('times', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('WHATSAPP & TÉLÉPHONE DIRECT', margin + 8, cGridY + 51);

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('+242 06 761 32 13  (067613213)', margin + 8, cGridY + 63);

  // Note for Industry Professionals
  doc.setFillColor(bgCardLight[0], bgCardLight[1], bgCardLight[2]);
  doc.rect(margin, cGridY + 80, contentWidth, 48, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.4);
  doc.rect(margin, cGridY + 80, contentWidth, 48);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('NOTE AUX PRODUCTEURS, DIFFUSEURS ET ÉDITEURS', margin + 8, cGridY + 91);

  doc.setFont('times', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textBody[0], textBody[1], textBody[2]);
  const endNote = [
    'Les œuvres et projets présentés dans ce dossier de presse sont disponibles pour acquisition de droits,',
    'coproduction cinématographique et télévisuelle internationale, ou contrats d’édition littéraire.',
    'Bibles complètes de séries, traitements détaillés, arches dramatiques et scénarios intégraux transmis sur demande.',
  ];
  doc.text(endNote, margin + 8, cGridY + 100, { lineHeightFactor: 1.45 });

  // Save PDF
  if (onProgress) onProgress('Finalisation du téléchargement...');
  doc.save('Junior-France-Mavie-Ngakosso-Press-Kit.pdf');
}
