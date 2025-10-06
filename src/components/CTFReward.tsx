'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CTFRewardProps {
  show: boolean;
  onClose: () => void;
}

export default function CTFReward({ show, onClose }: CTFRewardProps) {
  const [matrixRain, setMatrixRain] = useState<string[]>([]);

  useEffect(() => {
    if (show) {
      // Generate Matrix-style rain effect
      const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';
      const columns = 20;
      const rain: string[] = [];

      for (let i = 0; i < columns; i++) {
        let column = '';
        for (let j = 0; j < 10; j++) {
          column += chars[Math.floor(Math.random() * chars.length)];
        }
        rain.push(column);
      }

      setMatrixRain(rain);
    }
  }, [show]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {matrixRain.map((column, i) => (
          <motion.div
            key={i}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'linear',
            }}
            className="absolute text-[#00ff9f] font-mono text-xs"
            style={{ left: `${(i / matrixRain.length) * 100}%` }}
          >
            {column.split('').map((char, j) => (
              <div key={j}>{char}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Reward Content */}
      <motion.div
        initial={{ scale: 0.5, rotateY: 0 }}
        animate={{ scale: 1, rotateY: 360 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{
            textShadow: [
              '0 0 10px #00ff9f, 0 0 20px #00ff9f, 0 0 30px #00ff9f',
              '0 0 20px #00f5ff, 0 0 30px #00f5ff, 0 0 40px #00f5ff',
              '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
              '0 0 10px #00ff9f, 0 0 20px #00ff9f, 0 0 30px #00ff9f',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00ff9f] via-[#00f5ff] to-[#ff00ff] bg-clip-text text-transparent"
        >
          MASTER HACKER
        </motion.div>

        <div className="bg-black/50 backdrop-blur-sm border border-[#00ff9f]/30 rounded-lg p-8 mb-6">
          <p className="text-2xl text-[#00ff9f] font-mono mb-4">
            CONGRATULATIONS!
          </p>
          <p className="text-gray-300 mb-6">
            You've successfully completed all CTF challenges. You've proven your skills in
            decoding, cryptography, and hacker culture knowledge.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎭</span>
              <div>
                <div className="font-bold text-white">Ghost in the Shell</div>
                <div className="text-sm text-gray-400">
                  "If we all reacted the same way, we'd be predictable, and there's always more
                  than one way to view a situation."
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🦖</span>
              <div>
                <div className="font-bold text-white">Jurassic Park</div>
                <div className="text-sm text-gray-400">
                  "Ah ah ah, you didn't say the magic word!" - Dennis Nedry
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">💊</span>
              <div>
                <div className="font-bold text-white">The Matrix</div>
                <div className="text-sm text-gray-400">
                  "Unfortunately, no one can be told what the Matrix is. You have to see it for
                  yourself."
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="bg-gradient-to-r from-[#00ff9f] to-[#00f5ff] text-black font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
        >
          CLOSE
        </motion.button>

        <p className="text-xs text-gray-500 mt-4 font-mono">
          Press ESC or click outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}
