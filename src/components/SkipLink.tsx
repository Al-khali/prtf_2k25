'use client';

/**
 * SkipLink - Accessibility component for keyboard navigation
 * 
 * Provides skip links that allow keyboard users to quickly navigate
 * to main content sections, bypassing repetitive navigation elements.
 * 
 * Features:
 * - Hidden until focused
 * - Smooth scroll to target
 * - High contrast styling
 * - Keyboard accessible
 */

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

function SkipLinkItem({ href, children }: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the target element for screen readers
      (target as HTMLElement).focus();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="skip-link"
    >
      {children}
    </a>
  );
}

export default function SkipLinks() {
  return (
    <nav className="skip-links" aria-label="Skip navigation links">
      <SkipLinkItem href="#main-content">
        Skip to main content
      </SkipLinkItem>
      <SkipLinkItem href="#about">
        Skip to about section
      </SkipLinkItem>
      <SkipLinkItem href="#projects">
        Skip to projects
      </SkipLinkItem>
      <SkipLinkItem href="#terminal">
        Skip to terminal
      </SkipLinkItem>
      <SkipLinkItem href="#contact">
        Skip to contact
      </SkipLinkItem>
    </nav>
  );
}
