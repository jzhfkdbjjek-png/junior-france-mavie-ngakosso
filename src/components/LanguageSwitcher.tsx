import React from 'react';
import { motion } from 'motion/react';
import { useI18n, Language } from '../i18n/I18nContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile';
  className?: string;
  onLanguageChanged?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
  onLanguageChanged,
}) => {
  const { language, setLanguage } = useI18n();

  const handleSelect = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
      if (onLanguageChanged) {
        onLanguageChanged();
      }
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 px-1">
          <Globe className="w-3.5 h-3.5 text-[#8c6738] dark:text-brand-amber" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400">
            {language === 'fr' ? 'Langue / Language' : 'Language / Langue'}
          </span>
        </div>

        {/* Mobile Pill Switcher with 44px minimum touch targets */}
        <div
          role="group"
          aria-label="Sélecteur de langue"
          className="relative grid grid-cols-2 p-1 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-inner"
        >
          {/* Option FR */}
          <button
            type="button"
            onClick={() => handleSelect('fr')}
            aria-pressed={language === 'fr'}
            className={`relative z-10 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer select-none ${
              language === 'fr'
                ? 'text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'fr' && (
              <motion.div
                layoutId="active-lang-pill-mobile"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8c6738] to-[#c59b63] shadow-md border border-amber-300/30 -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}
            <span>Français</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black ${
                language === 'fr'
                  ? 'bg-black/30 text-amber-100'
                  : 'bg-white/5 text-stone-500'
              }`}
            >
              FR
            </span>
          </button>

          {/* Option EN */}
          <button
            type="button"
            onClick={() => handleSelect('en')}
            aria-pressed={language === 'en'}
            className={`relative z-10 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer select-none ${
              language === 'en'
                ? 'text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {language === 'en' && (
              <motion.div
                layoutId="active-lang-pill-mobile"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8c6738] to-[#c59b63] shadow-md border border-amber-300/30 -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}
            <span>English</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black ${
                language === 'en'
                  ? 'bg-black/30 text-amber-100'
                  : 'bg-white/5 text-stone-500'
              }`}
            >
              EN
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Header Desktop Compact Variant
  return (
    <div
      role="group"
      aria-label="Sélecteur de langue"
      className={`relative inline-flex items-center p-1 rounded-xl bg-black/40 border border-white/12 backdrop-blur-xl shadow-sm ${className}`}
    >
      {/* Subtle globe indicator */}
      <div className="pl-2 pr-1 text-[#8c6738] dark:text-brand-amber opacity-80" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </div>

      {/* Button FR */}
      <button
        type="button"
        onClick={() => handleSelect('fr')}
        aria-pressed={language === 'fr'}
        title="Passer le site en Français"
        className={`relative z-10 min-w-[34px] h-[34px] px-2.5 flex items-center justify-center rounded-lg text-[11px] font-extrabold tracking-wider transition-colors duration-200 cursor-pointer select-none ${
          language === 'fr'
            ? 'text-white'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        {language === 'fr' && (
          <motion.div
            layoutId="active-lang-pill-header"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8c6738] to-[#c59b63] shadow-sm border border-amber-200/25 -z-10"
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 34,
            }}
          />
        )}
        <span>FR</span>
      </button>

      {/* Button EN */}
      <button
        type="button"
        onClick={() => handleSelect('en')}
        aria-pressed={language === 'en'}
        title="Switch site to English"
        className={`relative z-10 min-w-[34px] h-[34px] px-2.5 flex items-center justify-center rounded-lg text-[11px] font-extrabold tracking-wider transition-colors duration-200 cursor-pointer select-none ${
          language === 'en'
            ? 'text-white'
            : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="active-lang-pill-header"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8c6738] to-[#c59b63] shadow-sm border border-amber-200/25 -z-10"
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 34,
            }}
          />
        )}
        <span>EN</span>
      </button>
    </div>
  );
};
