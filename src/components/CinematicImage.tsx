import React, { useState, useEffect, useRef } from 'react';
import { Film, BookOpen, Tv, Image as ImageIcon, Eye } from 'lucide-react';

export interface CinematicImageProps {
  src: string;
  srcSm?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  aspectRatio?: '2/3' | '3/4' | '4/5' | '9/13' | '1/1' | '16/9' | 'auto';
  objectFit?: 'cover' | 'contain';
  objectPosition?: 'top' | 'center' | 'bottom';
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  title?: string;
  category?: string;
  type?: 'film' | 'series' | 'book' | 'portrait' | 'concept';
  onClick?: () => void;
  overlay?: React.ReactNode;
  showClickCue?: boolean;
  id?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  srcSm,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  aspectRatio = '2/3',
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  fetchPriority = 'auto',
  title,
  category,
  type = 'film',
  onClick,
  overlay,
  showClickCue = false,
  id,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached/complete on mount or src change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
        setHasError(false);
      }
    }
  }, [src, srcSm]);

  // Safety fallback timer: guarantee image is marked as loaded to prevent stuck states
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 450);
    return () => clearTimeout(timer);
  }, [src, srcSm]);

  const aspectClassMap: Record<string, string> = {
    '2/3': 'aspect-[2/3]',
    '3/4': 'aspect-[3/4]',
    '4/5': 'aspect-[4/5]',
    '9/13': 'aspect-[9/13]',
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    'auto': '',
  };

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const posClass =
    objectPosition === 'top'
      ? 'object-top'
      : objectPosition === 'bottom'
      ? 'object-bottom'
      : 'object-center';

  const renderFallbackIcon = () => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-8 h-8 text-brand-gold/70 mb-2" />;
      case 'series':
        return <Tv className="w-8 h-8 text-brand-amber/70 mb-2" />;
      case 'film':
        return <Film className="w-8 h-8 text-brand-gold/70 mb-2" />;
      default:
        return <ImageIcon className="w-8 h-8 text-stone-500 mb-2" />;
    }
  };

  // Build responsive srcSet if srcSm is provided
  const computedSrcSet =
    srcSet ||
    (srcSm && srcSm !== src ? `${srcSm} 450w, ${src} 900w` : undefined);

  const computedSizes =
    sizes ||
    (computedSrcSet
      ? '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px'
      : undefined);

  // Default width/height values based on ratio to eliminate CLS
  const defaultDimMap: Record<string, { w: number; h: number }> = {
    '2/3': { w: 600, h: 900 },
    '3/4': { w: 600, h: 800 },
    '4/5': { w: 640, h: 800 },
    '9/13': { w: 600, h: 866 },
    '1/1': { w: 600, h: 600 },
    '16/9': { w: 960, h: 540 },
  };
  const computedWidth = width || defaultDimMap[aspectRatio]?.w || 600;
  const computedHeight = height || defaultDimMap[aspectRatio]?.h || 900;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-[#121514] border border-white/10 select-none ${
        aspectClassMap[aspectRatio] || 'aspect-[2/3]'
      } ${onClick ? 'cursor-pointer group' : ''} ${containerClassName}`}
    >
      {/* Subtle Dark Graphite Shimmer while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#121514] via-[#1a1e1c] to-[#121514] animate-pulse pointer-events-none" />
      )}

      {/* Main Image with Responsive srcSet and smooth entrance */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={srcSm || src}
          srcSet={computedSrcSet}
          sizes={computedSizes}
          alt={alt}
          width={computedWidth}
          height={computedHeight}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority={fetchPriority}
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => setHasError(true)}
          className={`w-full h-full ${fitClass} ${posClass} transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 filter-none' : 'opacity-90 scale-[1.01]'
          } ${className}`}
        />
      ) : (
        /* Cinematic Fallback UI */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#181b1a] to-[#0e100f] border border-brand-gold/30">
          {renderFallbackIcon()}
          {title && (
            <p className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase tracking-wider line-clamp-2">
              {title}
            </p>
          )}
          {category && (
            <span className="mt-1 px-2 py-0.5 rounded bg-brand-gold/15 text-[9px] uppercase font-bold tracking-widest text-brand-amber">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Senior UX Click Cue on Hover when interactive */}
      {onClick && showClickCue && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
          <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-brand-gold" />
            <span>Découvrir</span>
          </div>
        </div>
      )}

      {/* Optional Custom Overlay */}
      {overlay}
    </div>
  );
};
