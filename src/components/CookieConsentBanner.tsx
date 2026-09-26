import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';
import { getConsentStatus, setConsentStatus, ConsentStatus } from '../utils/analytics';
import { useI18n } from '../i18n/I18nContext';

export const CookieConsentBanner: React.FC = () => {
  const { language } = useI18n();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only display if consent has not been decided yet
    const status = getConsentStatus();
    if (status === 'pending') {
      // Gentle delay so the page loads smoothly before prompt appears
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    setConsentStatus('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus('denied');
    setIsVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label={language === 'en' ? 'Privacy and analytics preferences' : 'Confidentialité et préférences analytiques'}
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in-up"
    >
      <div className="bg-[#121514]/95 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-stone-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="text-xs font-cinzel font-bold text-white uppercase tracking-wider">
              {language === 'en' ? 'Privacy & Analytics' : 'Respect de la Vie Privée'}
            </h4>
            <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed">
              {language === 'en'
                ? 'We use Google Analytics to measure site readership and audience engagement anonymously.'
                : 'Ce site utilise Google Analytics afin d’analyser de manière anonyme la consultation des œuvres littéraires et cinématographiques.'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {language === 'en' ? 'Decline' : 'Refuser'}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-[#e4c085] to-[#c59b63] hover:from-[#ecd19e] hover:to-[#d2a970] shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Accept' : 'Accepter'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
