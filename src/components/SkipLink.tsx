'use client';

import { motion } from 'framer-motion';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <motion.a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:glass-intense focus:px-6 focus:py-3 focus:rounded-lg focus:text-holo-cyan focus:font-space focus:font-medium focus:outline-none focus:ring-4 focus:ring-holo-cyan/50"
      whileFocus={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  );
}

export function SkipLinks() {
  return (
    <div className="skip-links">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#about">Skip to about section</SkipLink>
      <SkipLink href="#projects">Skip to projects</SkipLink>
      <SkipLink href="#terminal">Skip to terminal</SkipLink>
      <SkipLink href="#contact">Skip to contact</SkipLink>
    </div>
  );
}
