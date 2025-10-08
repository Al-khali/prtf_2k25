'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackIcon?: string;
  fallbackTitle?: string;
  category?: string;
}

/**
 * Category icons mapping
 */
const categoryIcons: Record<string, string> = {
  'data-ai': '📊',
  'games': '🎮',
  'music': '🎵',
  'design': '🎨',
  'security': '🔐',
  'default': '🖼️',
};

/**
 * Category colors for fallback backgrounds
 */
const categoryColors: Record<string, string> = {
  'data-ai': 'from-cyan-500/20 to-purple-500/20',
  'games': 'from-purple-500/20 to-pink-500/20',
  'music': 'from-pink-500/20 to-orange-500/20',
  'design': 'from-orange-500/20 to-yellow-500/20',
  'security': 'from-green-500/20 to-cyan-500/20',
  'default': 'from-cyan-500/20 to-magenta-500/20',
};

/**
 * ImageWithFallback - Next.js Image component with graceful fallback
 * 
 * Features:
 * - Automatic fallback to category icon if image fails to load
 * - Displays project title as placeholder
 * - Maintains aspect ratio and styling
 * - Smooth transition between states
 */
export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  fallbackIcon,
  fallbackTitle,
  category = 'default',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [useFallbackSrc, setUseFallbackSrc] = useState(false);

  // If primary image fails, try fallback src
  const handleError = () => {
    if (!useFallbackSrc && fallbackSrc) {
      setUseFallbackSrc(true);
    } else {
      setError(true);
    }
  };

  // If both images fail, show fallback UI
  if (error) {
    const icon = fallbackIcon || categoryIcons[category] || categoryIcons.default;
    const bgGradient = categoryColors[category] || categoryColors.default;

    return (
      <motion.div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${bgGradient} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        {/* Icon */}
        <motion.div
          className="text-6xl mb-4 z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        {fallbackTitle && (
          <motion.div
            className="text-white/60 text-sm font-medium text-center px-4 z-10"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {fallbackTitle}
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full" />
      </motion.div>
    );
  }

  // Show image (either primary or fallback src)
  return (
    <Image
      {...props}
      src={useFallbackSrc && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
