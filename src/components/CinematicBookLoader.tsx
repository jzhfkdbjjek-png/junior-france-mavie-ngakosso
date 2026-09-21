import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { OFFICIAL_IMAGES } from '../data/portfolioData';
import { CinematicButton } from './CinematicButton';

interface CinematicBookLoaderProps {
  onComplete: () => void;
}

export const CinematicBookLoader: React.FC<CinematicBookLoaderProps> = ({ onComplete }) => {
  const { language } = useI18n();
  // Animation progress state in seconds (0 to 7.2)
  const [time, setTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // Preload Hero portrait image immediately in memory during loader
  useEffect(() => {
    const img = new Image();
    img.src = OFFICIAL_IMAGES.portrait;
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
    }
  }, [onComplete]);

  // Main cinematic animation timer loop (~60fps RAF)
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      setTime(elapsed);

      if (elapsed >= 7.2) {
        onComplete();
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [onComplete]);

  /*
   * PHASE TIMINGS (in seconds):
   * 0.0 - 0.9s : Book closed in center
   * 0.9 - 1.8s : Cover smoothly opens (0deg -> -180deg)
   * 1.8 - 4.4s : Pen appears and writes "JUNIOR FRANCE MAVIE NGAKOSSO" with high legibility
   * 4.4 - 5.0s : Pen lifts up and gently fades away
   * 5.0 - 5.8s : Cover closes smoothly (-180deg -> 0deg)
   * 5.8 - 6.4s : Short contemplation pause on closed gold embossed book
   * 6.4 - 7.2s : Cinematic dissolve fade-out transition towards the Hero section
   */

  // 1. Cover rotation angle
  let coverAngle = 0;
  if (time < 0.9) {
    coverAngle = 0;
  } else if (time >= 0.9 && time < 1.8) {
    const p = (time - 0.9) / 0.9;
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    coverAngle = -180 * ease;
  } else if (time >= 1.8 && time < 5.0) {
    coverAngle = -180;
  } else if (time >= 5.0 && time < 5.8) {
    const p = (time - 5.0) / 0.8;
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    coverAngle = -180 * (1 - ease);
  } else {
    coverAngle = 0;
  }

  // 2. Writing progress (0 to 1 between 1.8s and 4.4s)
  let writingProgress = 0;
  if (time < 1.8) {
    writingProgress = 0;
  } else if (time >= 1.8 && time < 4.4) {
    writingProgress = Math.min(1, (time - 1.8) / 2.6);
  } else {
    writingProgress = 1;
  }

  // 3. Pen visibility & position
  const isPenVisible = time >= 1.7 && time <= 4.9;
  const penOpacity =
    time < 1.7
      ? 0
      : time <= 2.0
      ? (time - 1.7) / 0.3
      : time < 4.4
      ? 1
      : time <= 4.9
      ? 1 - (time - 4.4) / 0.5
      : 0;

  // Pen coordinates across two lines on the page
  let penX = 14;
  let penY = 36;
  let penRotation = -28;

  if (writingProgress <= 0.5) {
    const localP = writingProgress / 0.5;
    penX = 14 + localP * 72;
    penY = 36 + Math.sin(localP * 24) * 1.5;
    penRotation = -28 + Math.sin(localP * 26) * 3;
  } else {
    const localP = (writingProgress - 0.5) / 0.5;
    penX = 12 + localP * 76;
    penY = 54 + Math.sin(localP * 24) * 1.5;
    penRotation = -28 + Math.sin(localP * 26) * 3;
  }

  if (time > 4.4) {
    const liftP = Math.min(1, (time - 4.4) / 0.5);
    penY -= liftP * 14;
    penX += liftP * 4;
    penRotation = -20;
  }

  // 4. Final transition to site (6.4s to 7.2s)
  const transitionOpacity =
    time < 6.4 ? 1 : Math.max(0, 1 - (time - 6.4) / 0.8);
  const transitionScale =
    time < 6.4 ? 1 : 1 + ((time - 6.4) / 0.8) * 0.12;

  // Number of characters to show based on writing progress
  const fullLine1 = 'JUNIOR FRANCE';
  const fullLine2 = 'MAVIE NGAKOSSO';
  const totalChars = fullLine1.length + fullLine2.length;
  const currentTotalChars = Math.floor(writingProgress * totalChars);
  const line1Chars = Math.min(fullLine1.length, currentTotalChars);
  const line2Chars = Math.max(0, currentTotalChars - fullLine1.length);

  return (
    <div
      role="dialog"
      aria-label={language === 'en' ? 'Loading Junior France Mavie Ngakosso universe' : "Chargement de l'univers de Junior France Mavie Ngakosso"}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070908] select-none overflow-hidden transition-opacity duration-700"
      style={{
        opacity: transitionOpacity,
        pointerEvents: time >= 6.8 ? 'none' : 'auto',
      }}
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#191d1b] via-[#0b0d0c] to-[#040505] opacity-90"></div>
      
      {/* Warm Ambient Spotlight behind the Book */}
      <div className="absolute w-[340px] sm:w-[620px] h-[340px] sm:h-[620px] rounded-full bg-gradient-to-tr from-[#e5a958]/15 via-[#c59b63]/10 to-transparent blur-3xl pointer-events-none transform -translate-y-4"></div>

      {/* Floating cinematic subtle particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-brand-gold rounded-full blur-[0.5px] animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-brand-amber rounded-full blur-[0.8px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-brand-gold rounded-full blur-[0.5px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-brand-amber rounded-full blur-[0.8px] animate-pulse"></div>
      </div>

      {/* Cinematic Main Stage */}
      <div
        className="relative flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${transitionScale})`,
        }}
      >
        {/* Realistic Floor Shadow */}
        <div
          className="absolute -bottom-10 sm:-bottom-14 w-[280px] sm:w-[480px] h-10 sm:h-14 bg-black/80 rounded-[100%] blur-xl pointer-events-none transition-all duration-700"
          style={{
            transform: coverAngle < -30 ? 'scaleX(1.4) scaleY(1.1)' : 'scaleX(1)',
            opacity: 0.85,
          }}
        ></div>

        {/* 3D BOOK CONTAINER */}
        <div
          className="relative preserve-3d perspective-1000 w-[250px] xs:w-[280px] sm:w-[330px] md:w-[370px] h-[350px] xs:h-[390px] sm:h-[460px] md:h-[510px]"
          style={{
            transform: `rotateX(14deg) rotateY(${coverAngle < -30 ? '6deg' : '-8deg'}) rotateZ(-1deg)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* ============================================================ */}
          {/* 1. BACK COVER & PAGES BLOCK (Right side when opened)        */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-md border-r-2 border-y border-stone-800 bg-[#0c0e0d] shadow-2xl overflow-hidden"
            style={{
              transform: 'translateZ(-12px)',
            }}
          >
            {/* Book Paper Stack Thickness (Right & Bottom edge texture) */}
            <div className="absolute right-0 top-0 bottom-0 w-3.5 bg-gradient-to-l from-[#d4c9b0] via-[#ebe2ce] to-[#c7b99c] border-l border-stone-400/40 shadow-inner flex flex-col justify-between py-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="h-px w-full bg-stone-500/20"></div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-3.5 h-3 bg-gradient-to-t from-[#c7b99c] to-[#ebe2ce] border-t border-stone-400/30"></div>
          </div>

          {/* ============================================================ */}
          {/* 2. INNER RIGHT MANUSCRIPT PAGE (Visible when opened)          */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 right-2 bottom-1.5 left-1 top-1 bg-gradient-to-br from-[#fefdfa] via-[#fbf7ee] to-[#f4ece0] rounded-r-xl rounded-l-sm shadow-md overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-l border-amber-900/20"
            style={{
              transform: 'translateZ(-2px)',
            }}
          >
            {/* Parchment texture subtle noise */}
            <div className="absolute inset-0 bg-radial from-transparent to-amber-950/10 pointer-events-none"></div>

            {/* Left margin line */}
            <div className="absolute left-7 sm:left-9 top-0 bottom-0 w-px bg-red-800/20 pointer-events-none"></div>

            {/* Ruled lines */}
            <div className="absolute inset-x-0 top-12 sm:top-16 bottom-10 flex flex-col justify-between px-6 sm:px-8 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-full h-px bg-amber-900/15"></div>
              ))}
            </div>

            {/* Header of Manuscript */}
            <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] uppercase font-cinzel font-bold tracking-[0.2em] text-stone-700 border-b border-amber-900/20 pb-2">
              <span>{language === 'en' ? 'ORIGINAL MANUSCRIPT' : 'MANUSCRIT ORIGINAL'}</span>
              <span>FOLIO I</span>
            </div>

            {/* WRITTEN CONTENT: JUNIOR FRANCE MAVIE NGAKOSSO (Ultra High Legibility, Bold Professional Calligraphy) */}
            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 pl-3 sm:pl-5 pt-2">
              {/* Line 1: JUNIOR FRANCE */}
              <div className="relative min-h-[46px] sm:min-h-[56px] flex items-center">
                <span className="font-manuscript-pen text-3xl xs:text-4xl sm:text-[2.6rem] text-[#050706] font-bold tracking-wide select-none drop-shadow-sm leading-none">
                  {fullLine1.slice(0, line1Chars)}
                </span>
                {/* Wet ink shimmer cursor */}
                {writingProgress > 0 && writingProgress <= 0.5 && (
                  <span className="inline-block w-2 h-8 sm:h-10 bg-[#050706] ml-1 animate-pulse rounded-full opacity-90"></span>
                )}
              </div>

              {/* Line 2: MAVIE NGAKOSSO */}
              <div className="relative min-h-[46px] sm:min-h-[56px] flex items-center">
                <span className="font-manuscript-pen text-3xl xs:text-4xl sm:text-[2.6rem] text-[#050706] font-bold tracking-wide select-none drop-shadow-sm leading-none">
                  {fullLine2.slice(0, line2Chars)}
                </span>
                {/* Wet ink shimmer cursor */}
                {writingProgress > 0.5 && writingProgress < 1.0 && (
                  <span className="inline-block w-2 h-8 sm:h-10 bg-[#050706] ml-1 animate-pulse rounded-full opacity-90"></span>
                )}
              </div>

              {/* Sub-annotation line */}
              {writingProgress >= 0.85 && (
                <div className="pt-2 sm:pt-3 flex items-center gap-2 opacity-95 animate-fadeIn">
                  <span className="h-0.5 w-8 sm:w-12 bg-[#8c6738]"></span>
                  <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#2b1d0d] font-bold">
                    {language === 'en' ? 'Novelist & Screenwriter' : 'Écrivain & Auteur'}
                  </span>
                </div>
              )}
            </div>

            {/* Page Footer */}
            <div className="relative z-10 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono font-bold text-stone-700 pt-2 border-t border-amber-900/15">
              <span>{language === 'en' ? 'BOOK I • ARCHIVES' : 'LIVRE I • ARCHIVES'}</span>
              <span>2026</span>
            </div>

            {/* ============================================================ */}
            {/* 3. LUXURY FOUNTAIN PEN (Animated SVG & Precise Nib Movement)  */}
            {/* ============================================================ */}
            {isPenVisible && (
              <div
                className="absolute z-30 pointer-events-none transition-transform duration-75 ease-out"
                style={{
                  left: `${penX}%`,
                  top: `${penY}%`,
                  transform: `translate(-12%, -90%) rotate(${penRotation}deg)`,
                  opacity: penOpacity,
                }}
              >
                {/* Fountain pen SVG rendering */}
                <div className="relative w-11 sm:w-13 h-40 sm:h-48 filter drop-shadow-[4px_10px_8px_rgba(0,0,0,0.5)]">
                  <svg
                    viewBox="0 0 40 160"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shadow on paper */}
                    <ellipse cx="20" cy="155" rx="6" ry="2" fill="black" opacity="0.35" />

                    {/* Pen Gold Nib Tip */}
                    <path
                      d="M20 156 L15 130 C15 125 25 125 25 130 Z"
                      fill="url(#goldNibGrad)"
                      stroke="#8c6738"
                      strokeWidth="0.8"
                    />
                    {/* Nib central slit & breather hole */}
                    <line x1="20" y1="156" x2="20" y2="136" stroke="#3d2a13" strokeWidth="0.7" />
                    <circle cx="20" cy="136" r="1.2" fill="#3d2a13" />

                    {/* Nib Collar (Black Lacquer) */}
                    <path d="M14 130 L26 130 L25 118 L15 118 Z" fill="#151716" stroke="#2a2c2b" />

                    {/* Gold Ring Trim 1 */}
                    <rect x="13" y="115" width="14" height="3" rx="0.5" fill="url(#goldRingGrad)" />

                    {/* Pen Grip Section */}
                    <path d="M14 115 L26 115 L27 80 L13 80 Z" fill="#1c1e1d" />

                    {/* Gold Band Divider */}
                    <rect x="12" y="76" width="16" height="4" rx="0.8" fill="url(#goldRingGrad)" stroke="#6b4c1f" strokeWidth="0.5" />

                    {/* Main Pen Barrel (Ebony Lacquer with Gold Trim) */}
                    <path
                      d="M12.5 76 L27.5 76 L28.5 12 C28.5 8 26 5 20 5 C14 5 11.5 8 11.5 12 Z"
                      fill="url(#penBodyGrad)"
                    />

                    {/* Gold Clip */}
                    <path
                      d="M20 10 L22 10 L23 55 L21 57 L19 55 Z"
                      fill="url(#goldRingGrad)"
                      stroke="#6b4c1f"
                      strokeWidth="0.5"
                    />
                    {/* Clip Ball */}
                    <circle cx="20.5" cy="57" r="2.2" fill="url(#goldRingGrad)" />

                    {/* Top Gold Crown Jewel */}
                    <ellipse cx="20" cy="6" rx="4" ry="1.5" fill="url(#goldRingGrad)" />

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="goldNibGrad" x1="15" y1="130" x2="25" y2="156" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f7dc9f" />
                        <stop offset="0.5" stopColor="#e5a958" />
                        <stop offset="1" stopColor="#b3823e" />
                      </linearGradient>
                      <linearGradient id="goldRingGrad" x1="12" y1="76" x2="28" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#ffe7b3" />
                        <stop offset="0.4" stopColor="#e5a958" />
                        <stop offset="0.8" stopColor="#a37332" />
                      </linearGradient>
                      <linearGradient id="penBodyGrad" x1="11" y1="40" x2="29" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0b0d0c" />
                        <stop offset="0.25" stopColor="#2c302e" />
                        <stop offset="0.5" stopColor="#434946" />
                        <stop offset="0.75" stopColor="#1f2221" />
                        <stop offset="1" stopColor="#080909" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 4. TURNING 3D HARDCOVER FLAP                                  */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 rounded-r-2xl rounded-l-sm preserve-3d origin-left z-20 cursor-default"
            style={{
              transform: `rotateY(${coverAngle}deg)`,
              transformOrigin: 'left center',
              transition:
                time >= 0.9 && time <= 1.8
                  ? 'none'
                  : time >= 5.0 && time <= 5.8
                  ? 'none'
                  : 'transform 0.1s linear',
            }}
          >
            {/* ------------------------------------------------------------ */}
            {/* 4A. FRONT COVER (Visible when book is closed: 0s-0.9s & 5.8s+) */}
            {/* ------------------------------------------------------------ */}
            <div
              className="absolute inset-0 rounded-r-2xl rounded-l-md leather-texture border border-amber-600/30 p-5 sm:p-7 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden"
              style={{
                transform: 'rotateY(0deg)',
              }}
            >
              {/* Gold Filigree Double Border */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-xl border border-brand-gold/40 pointer-events-none"></div>
              <div className="absolute inset-3.5 sm:inset-4 rounded-lg border border-brand-amber/25 pointer-events-none"></div>

              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 text-brand-gold/70 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute top-4 right-4 text-brand-gold/70 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute bottom-4 left-4 text-brand-gold/70 text-xs sm:text-sm select-none">✦</div>
              <div className="absolute bottom-4 right-4 text-brand-gold/70 text-xs sm:text-sm select-none">✦</div>

              {/* Spine edge shadow on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>

              {/* Top Embossed Emblem */}
              <div className="relative z-10 text-center pt-2 sm:pt-4">
                <div className="w-9 sm:w-11 h-9 sm:h-11 mx-auto rounded-full border border-brand-gold/50 flex items-center justify-center bg-black/40 shadow-inner">
                  <span className="font-cinzel text-xs sm:text-sm text-brand-gold font-bold">JN</span>
                </div>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-brand-gold/80 font-cinzel mt-2 font-semibold">
                  {language === 'en' ? 'OFFICIAL WORKS' : 'OEUVRES OFFICIELLES'}
                </span>
              </div>

              {/* CENTER: THE MAIN GOLD EMBOSSED NAME */}
              <div className="relative z-10 text-center py-2 space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-brand-gold/60"></span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-brand-amber font-cinzel font-bold">
                    PORTFOLIO
                  </span>
                  <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-brand-gold/60"></span>
                </div>

                <h1
                  className="font-cinzel text-lg xs:text-xl sm:text-2xl md:text-[26px] font-bold tracking-[0.12em] text-white leading-tight uppercase"
                  style={{
                    textShadow:
                      '0 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(229,169,88,0.5), 0 0 40px rgba(197,155,99,0.3)',
                  }}
                >
                  <span className="block text-white">JUNIOR FRANCE</span>
                  <span className="block text-brand-gold mt-1">MAVIE NGAKOSSO</span>
                </h1>

                {/* SUBTITLE */}
                <div className="pt-1 sm:pt-2">
                  <p className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] text-stone-300 font-medium leading-relaxed max-w-[220px] sm:max-w-xs mx-auto">
                    {language === 'en' ? 'AUTHOR • NOVELIST • SCREENWRITER • CREATOR' : 'ÉCRIVAIN • AUTEUR • SCÉNARISTE • CRÉATEUR'}
                  </p>
                </div>
              </div>

              {/* Bottom Spine Details */}
              <div className="relative z-10 text-center pb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-brand-gold/20">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-brand-gold font-mono">
                    VOL. 2026
                  </span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* 4B. INSIDE LEFT COVER (Visible when book is opened)         */}
            {/* ------------------------------------------------------------ */}
            <div
              className="absolute inset-0 rounded-l-2xl rounded-r-md bg-gradient-to-bl from-[#181a19] via-[#101211] to-[#0a0c0b] border border-stone-800 p-5 sm:p-7 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden"
              style={{
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="absolute inset-2 rounded-xl border border-stone-700/30"></div>
              
              <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] uppercase font-cinzel tracking-widest text-stone-500">
                <span>EX LIBRIS</span>
                <span>N° 01/242</span>
              </div>

              <div className="relative z-10 text-center space-y-2 py-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-brand-gold/30 bg-black/40 flex items-center justify-center">
                  <span className="font-cinzel text-sm text-brand-gold">✦</span>
                </div>
                <p className="font-cinzel text-xs sm:text-sm text-stone-300 uppercase tracking-widest font-bold">
                  {language === 'en' ? 'ARTISTIC UNIVERSE' : 'UNIVERS ARTISTIQUE'}
                </p>
                <p className="font-serif italic text-[10px] sm:text-xs text-brand-amber/80 max-w-[180px] mx-auto">
                  {language === 'en'
                    ? '« Where words weave myths and stories come to life. »'
                    : '« Là où les mots forgent des mythes et les récits prennent vie. »'}
                </p>
              </div>

              <div className="relative z-10 text-center text-[8px] uppercase tracking-widest text-stone-600">
                Brazzaville • Paris • International
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Step Status Text at Bottom */}
      <div className="relative z-10 mt-8 sm:mt-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></span>
          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-stone-400 font-semibold">
            {time < 0.9
              ? (language === 'en' ? 'OPENING MANUSCRIPT' : 'OUVERTURE DU MANUSCRIT')
              : time < 4.6
              ? (language === 'en' ? 'DEDICATION IN PROGRESS...' : 'DÉDICACE EN COURS...')
              : time < 6.0
              ? (language === 'en' ? 'CLOSING VOLUME' : 'FERMETURE DU RECUEIL')
              : (language === 'en' ? 'ENTERING UNIVERSE' : 'ENTRÉE DANS L\'UNIVERS')}
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-36 sm:w-48 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-amber to-brand-gold transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${Math.min(100, (time / 6.8) * 100)}%` }}
          ></div>
        </div>

        {/* Skip action button */}
        <div className="pt-2">
          <CinematicButton
            variant="ghost"
            size="sm"
            onClick={onComplete}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-white"
          >
            {language === 'en' ? 'Skip introduction →' : "Passer l'introduction →"}
          </CinematicButton>
        </div>
      </div>
    </div>
  );
};
