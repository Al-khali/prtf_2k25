'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
}

const variantMap = {
  primary: [
    'bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]',
    'text-white font-semibold',
    'hover:shadow-[0_0_30px_rgba(0,255,255,0.4),0_0_60px_rgba(255,0,255,0.2)]',
    'active:scale-95',
  ].join(' '),
  secondary: [
    'bg-white/10 backdrop-blur-md',
    'border border-white/20',
    'text-white font-medium',
    'hover:bg-white/15 hover:border-white/30',
    'hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    'active:scale-95',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[#00f5ff] font-medium',
    'hover:bg-white/5',
    'hover:text-[#ff00ff]',
    'active:scale-95',
  ].join(' '),
};

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Button - Interactive button component with multiple variants
 * 
 * Features:
 * - Primary, secondary, and ghost variants
 * - Hover and active states with micro-animations
 * - Loading state with spinner
 * - Size variants
 * - Framer Motion animations
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      className,
      ...motionProps
    },
    ref
  ) => {
    const variantClass = variantMap[variant];
    const sizeClass = sizeMap[size];
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={twMerge(
          // Base styles
          'relative rounded-lg',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0c0d10]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
          // Variant styles
          variantClass,
          // Size styles
          sizeClass,
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        {...motionProps}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
