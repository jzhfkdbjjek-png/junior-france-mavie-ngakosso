import React, { useState, useEffect, useRef } from 'react';
import { Film, BookOpen, Tv, Image as ImageIcon } from 'lucide-react';

export interface CinematicImageProps {
  src: string;
  alt: string;
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
  id?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt,
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
  }, [src]);

  // Safety fallback timer: guarantee image is marked as loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [src]);

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

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-stone-900 border border-white/10 ${
        aspectClassMap[aspectRatio] || 'aspect-[2/3]'
      } ${containerClassName}`}
    >
      {/* Subtle Shimmer / Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 animate-pulse pointer-events-none" />
      )}

      {/* Main Image */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
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
            isLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.01]'
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

      {/* Optional Custom Overlay */}
      {overlay}
    </div>
  );
};
