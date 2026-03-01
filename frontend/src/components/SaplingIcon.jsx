
import React from 'react';
import { motion } from 'framer-motion';

export function SaplingIcon({ size = 120, delay = 0 }) {
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
      <motion.path d="M 20 95 Q 60 93 100 95" stroke="#6b4423" strokeWidth="2" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
      {/* Roots */}
      <motion.path d="M 60 95 Q 50 105 45 110 M 60 95 Q 62 105 60 112 M 60 95 Q 70 102 75 108" stroke="#6b4423" strokeWidth="1.5" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
      {/* Sapling Plant Group (Swaying) */}
      <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: delay + 1.5 }} style={{ originX: '60px', originY: '95px' }}>
        {/* Trunk */}
        <motion.path d="M 60 95 Q 58 60 60 35" stroke="#1a3a1a" strokeWidth="2" strokeLinecap="round" variants={draw} initial="hidden" animate="visible" />
        {/* Left Leaf */}
        <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: delay + 1.5 }} style={{ originX: '59px', originY: '65px' }}>
          <motion.path d="M 59 65 C 45 60 35 70 40 75 C 45 75 55 70 59 65 Z" stroke="#7dad5a" strokeWidth="2" strokeLinejoin="round" fill="#faf8f5" variants={draw} initial="hidden" animate="visible" />
        </motion.g>
        {/* Right Leaf */}
        <motion.g animate={{ rotate: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: delay + 1.8 }} style={{ originX: '61px', originY: '50px' }}>
          <motion.path d="M 61 50 C 75 45 85 55 80 60 C 75 60 65 55 61 50 Z" stroke="#a8d86e" strokeWidth="2" strokeLinejoin="round" fill="#faf8f5" variants={draw} initial="hidden" animate="visible" />
        </motion.g>
        {/* Top Leaf */}
        <motion.g animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: delay + 1.6 }} style={{ originX: '60px', originY: '35px' }}>
          <motion.path d="M 60 35 C 50 25 55 15 65 15 C 70 20 65 30 60 35 Z" stroke="#7dad5a" strokeWidth="2" strokeLinejoin="round" fill="#faf8f5" variants={draw} initial="hidden" animate="visible" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
