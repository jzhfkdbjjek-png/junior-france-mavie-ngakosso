import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface ExpandableTextProps {
  text: string;
  maxChars?: number;
  className?: string;
  collapsedLines?: number;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxChars = 220,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useI18n();

  // If text is short enough, render as standard paragraph without button
  if (!text || text.length <= maxChars) {
    return <p className={className}>{text}</p>;
  }

  const previewText = text.slice(0, maxChars).trim() + '…';

  const readMoreLabel = language === 'en' ? 'Lire plus' : 'Lire plus';
  const showLessLabel = language === 'en' ? 'Réduire' : 'Réduire';

  return (
    <div className="relative">
      <AnimatePresence initial={false} mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 'auto' }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <p className={className}>{text}</p>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className={className}>{previewText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="mt-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-brand-gold hover:text-brand-amber transition-colors cursor-pointer py-1 px-1 -ml-1 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold/40"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? showLessLabel : readMoreLabel}</span>
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5 transition-transform duration-200" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
        )}
      </button>
    </div>
  );
};
