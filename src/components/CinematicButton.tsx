import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'amazon'
  | 'project'
  | 'contact'
  | 'ghost'
  | 'outline'
  | 'filter';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'full';

export interface CinematicButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  title?: string;
}

export const CinematicButton: React.FC<CinematicButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  active = false,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  id,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  title,
}) => {
  // Variant-specific class mapping
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'cinematic-btn-primary',
    secondary: 'cinematic-btn-secondary',
    amazon: 'cinematic-btn-amazon',
    project: 'cinematic-btn-project',
    contact: 'cinematic-btn-contact',
    ghost: 'cinematic-btn-ghost',
    outline: 'cinematic-btn-outline',
    filter: 'cinematic-btn-filter',
  };

  // Size-specific class mapping
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'cinematic-btn-sm',
    md: 'cinematic-btn-md',
    lg: 'cinematic-btn-lg',
    icon: 'cinematic-btn-icon',
    full: 'cinematic-btn-full',
  };

  const isFilterActive = variant === 'filter' && active;

  const isFullWidth = size === 'full' || className.includes('w-full');
  const isFlex1 = className.includes('flex-1');

  const wrapperClasses = [
    'cinematic-btn-wrapper max-w-full',
    isFullWidth ? 'w-full block' : 'inline-flex',
    isFlex1 ? 'flex-1' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const combinedClasses = [
    'cinematic-btn max-w-full box-border',
    variantClasses[variant],
    sizeClasses[size],
    isFullWidth ? 'w-full' : '',
    isFilterActive ? 'cinematic-btn-active-state' : '',
    disabled || loading ? 'cinematic-btn-disabled opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? (
        <span className="inline-flex items-center gap-2 max-w-full">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="break-words">{children}</span>
        </span>
      ) : (
        <span className="cinematic-btn-inner flex items-center justify-center gap-2 max-w-full text-center leading-snug py-0.5">
          {icon && iconPosition === 'left' && (
            <span className="cinematic-btn-icon-wrapper shrink-0 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
          )}
          {children && (
            <span className="cinematic-btn-text tracking-wider max-w-full break-words">
              {children}
            </span>
          )}
          {icon && iconPosition === 'right' && (
            <span className="cinematic-btn-icon-wrapper shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110">
              {icon}
            </span>
          )}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <span className={wrapperClasses}>
        <a
          id={id}
          href={disabled ? undefined : href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          title={title}
          className={combinedClasses}
        >
          {content}
        </a>
      </span>
    );
  }

  return (
    <span className={wrapperClasses}>
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        title={title}
        className={combinedClasses}
      >
        {content}
      </button>
    </span>
  );
};
