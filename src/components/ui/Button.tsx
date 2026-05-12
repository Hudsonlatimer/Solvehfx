'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-civic hover:shadow-civic-md hover:-translate-y-px active:translate-y-0 active:shadow-civic',
  secondary:
    'bg-accent text-primary shadow-civic hover:bg-accent-hover hover:shadow-civic-md hover:-translate-y-px active:translate-y-0',
  outline:
    'border border-primary/20 text-primary bg-white hover:border-primary hover:bg-primary hover:text-white',
  ghost:
    'text-text-secondary hover:bg-black/[0.04] hover:text-text-primary',
  danger:
    'bg-danger text-white shadow-civic hover:shadow-civic-md hover:-translate-y-px',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-7 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg font-medium
          tracking-tight cursor-pointer select-none
          transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-out
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 -ml-0.5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
