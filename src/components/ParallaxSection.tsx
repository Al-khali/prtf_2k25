'use client';

import { motion } from 'framer-motion';
import { useScrollParallax } from '@/hooks/useScrollParallax';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  id,
}: ParallaxSectionProps) {
  const { ref, y, x } = useScrollParallax({ speed, direction });

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`parallax-section ${className}`}
    >
      <motion.div style={{ y, x }} className="parallax-bg">
        {children}
      </motion.div>
    </section>
  );
}
