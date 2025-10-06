'use client';

import { ReactNode, useEffect, useState } from 'react';
import './GlitchEffect.css';

interface GlitchEffectProps {
  children: ReactNode;
  active?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number; // Duration in ms, 0 for infinite
  className?: string;
}

export default function GlitchEffect({
  children,
  active = false,
  intensity = 'medium',
  duration = 0,
  className = '',
}: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(active);

  useEffect(() => {
    setIsGlitching(active);

    if (active && duration > 0) {
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  const intensityClass = {
    low: 'glitch-low',
    medium: 'glitch-medium',
    high: 'glitch-high',
  }[intensity];

  return (
    <div
      className={`glitch-container ${isGlitching ? 'glitching' : ''} ${intensityClass} ${className}`}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </div>
  );
}

interface GlitchTextProps {
  text: string;
  active?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
  className?: string;
}

export function GlitchText({
  text,
  active = false,
  intensity = 'medium',
  duration = 0,
  className = '',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(active);

  useEffect(() => {
    setIsGlitching(active);

    if (active && duration > 0) {
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  const intensityClass = {
    low: 'glitch-text-low',
    medium: 'glitch-text-medium',
    high: 'glitch-text-high',
  }[intensity];

  return (
    <div className={`glitch-text-wrapper ${className}`}>
      <div
        className={`glitch-text ${isGlitching ? 'glitching' : ''} ${intensityClass}`}
        data-text={text}
      >
        {text}
      </div>
    </div>
  );
}

interface GlitchOverlayProps {
  active?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export function GlitchOverlay({
  active = false,
  duration = 1000,
  onComplete,
}: GlitchOverlayProps) {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);

    if (active && duration > 0) {
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div className="glitch-overlay">
      <div className="glitch-overlay-layer glitch-overlay-layer-1" />
      <div className="glitch-overlay-layer glitch-overlay-layer-2" />
      <div className="glitch-overlay-layer glitch-overlay-layer-3" />
    </div>
  );
}
