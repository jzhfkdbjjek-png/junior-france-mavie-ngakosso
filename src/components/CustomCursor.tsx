import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPointerFine, setIsPointerFine] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on true fine pointer (mouse / trackpad) devices with viewport >= 1024px
    const checkPointer = () => {
      const isFine = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
      setIsPointerFine(isFine);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);

    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });

      // Check target element for custom data-cursor or interactive tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isPointerFine]);

  if (!isPointerFine || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* Outer Glow Ring / Capsule */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          cursorText
            ? 'px-3.5 py-1.5 min-w-[70px] min-h-[32px] bg-brand-gold text-[#0b0d0c] font-cinzel font-bold text-[10px] tracking-[0.18em] shadow-[0_0_20px_rgba(229,169,88,0.5)] border border-white/40'
            : isHovered
            ? 'w-10 h-10 bg-brand-amber/20 border border-brand-gold/60 backdrop-blur-xs scale-125'
            : 'w-4 h-4 bg-brand-gold/80 border border-white/60 shadow-[0_0_10px_rgba(229,169,88,0.6)]'
        }`}
      >
        {cursorText && (
          <span className="select-none uppercase leading-none whitespace-nowrap drop-shadow-xs">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
