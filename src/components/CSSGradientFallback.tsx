'use client';

/**
 * CSS Gradient Fallback for low-end devices
 * Provides a visually similar animated gradient when WebGL/3D is not performant
 */
export default function CSSGradientFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="gradient-fallback" />
      <style jsx>{`
        .gradient-fallback {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 246, 255, 0.15) 0%,
            rgba(138, 0, 255, 0.15) 25%,
            rgba(255, 0, 255, 0.15) 50%,
            rgba(255, 214, 0, 0.15) 75%,
            rgba(0, 246, 255, 0.15) 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          filter: blur(60px);
          opacity: 0.6;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .gradient-fallback {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>
    </div>
  );
}
