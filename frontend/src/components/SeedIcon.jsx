import React from 'react';
import { motion } from 'framer-motion';

export function SeedIcon({ size = 120, delay = 0 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1, opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut', delay },
        opacity: { duration: 0.5, delay }
      }
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
      {/* Soil Line */}
      <motion.path d="M 20 85 Q 60 83 100 85" stroke="#6b4423" strokeWidth="2" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
      {/* Root System */}
      <motion.g animate={{ scaleY: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: delay + 1.5 }} style={{ originX: '60px', originY: '85px' }}>
        <motion.path d="M 60 85 Q 55 95 65 105" stroke="#7dad5a" strokeWidth="2" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
      </motion.g>
      {/* Seed Body */}
      <motion.g animate={{ scale: [1, 1.04, 1], y: [0, -1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: delay + 1.5 }} style={{ originX: '60px', originY: '75px' }}>
        <motion.path d="M 60 45 C 72 45 75 65 75 75 C 75 82 68 85 60 85 C 52 85 45 82 45 75 C 45 65 48 45 60 45 Z" stroke="#1a3a1a" strokeWidth="2" strokeLinejoin="round" fill="#faf8f5" variants={draw} initial="hidden" animate="visible" />
        {/* Seed Texture Line */}
        <motion.path d="M 55 55 Q 52 70 58 80" stroke="#7dad5a" strokeWidth="1.5" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
      </motion.g>
    </svg>
  );
}
