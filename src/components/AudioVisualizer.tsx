'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export default function AudioVisualizer({ analyser, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!analyser || !canvasRef.current || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Get frequency data
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Circular visualizer settings
    const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
    const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
    const radius = Math.min(centerX, centerY) * 0.6;
    const barCount = 64; // Number of bars around the circle
    const barWidth = (Math.PI * 2) / barCount;

    // Animation loop
    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      // Get frequency data
      analyser.getByteFrequencyData(dataArray);

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(12, 13, 16, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circular visualizer
      for (let i = 0; i < barCount; i++) {
        // Sample frequency data
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const value = dataArray[dataIndex] || 0;
        const normalizedValue = value / 255;

        // Calculate bar height
        const barHeight = normalizedValue * radius * 0.8;

        // Calculate position
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        // Create gradient for bar
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        
        // Holographic gradient colors based on position
        const hue1 = (i / barCount) * 360;
        const hue2 = ((i + 1) / barCount) * 360;
        
        gradient.addColorStop(0, `hsla(${hue1}, 80%, 60%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue2}, 80%, 70%, ${0.6 + normalizedValue * 0.4})`);

        // Draw bar
        ctx.strokeStyle = gradient;
        ctx.lineWidth = barWidth * radius * 0.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Add glow effect for high frequencies
        if (normalizedValue > 0.7) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${hue1}, 80%, 70%, ${normalizedValue})`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Draw center circle with glass effect
      const avgFrequency = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;
      const centerRadius = radius * 0.3 + avgFrequency * 20;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, centerRadius * 0.5,
        centerX, centerY, centerRadius * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
      glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Center circle
      const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, centerRadius
      );
      centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Center circle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [analyser, isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full aspect-square max-w-md mx-auto"
    >
      {/* Glass container */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Holographic border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-magenta-500/20 blur-xl -z-10" />
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Overlay text when not playing */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">Play music to see visualizer</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
