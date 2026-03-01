import React, { Children } from 'react';
import { motion } from 'framer-motion';
const KawaiiFace = () =>
<g>
    <circle cx="-10" cy="-2" r="2.5" fill="#4a3b32" />
    <circle cx="10" cy="-2" r="2.5" fill="#4a3b32" />
    <path
    d="M -5 3 Q 0 8 5 3"
    stroke="#4a3b32"
    strokeWidth="2"
    strokeLinecap="round"
    fill="none" />

    <ellipse cx="-14" cy="2" rx="3" ry="2" fill="#ff9eb5" opacity="0.6" />
    <ellipse cx="14" cy="2" rx="3" ry="2" fill="#ff9eb5" opacity="0.6" />
  </g>;

const StorySeed = ({ size = 120 }) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 120 120"
  fill="none"
  className="overflow-visible">

    <motion.g
    animate={{
      rotate: [-5, 5, -5]
    }}
    transition={{
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut'
    }}
    style={{
      originX: '60px',
      originY: '80px'
    }}>

      <path
      d="M 60 40 C 80 40 85 65 85 80 C 85 95 75 100 60 100 C 45 100 35 95 35 80 C 35 65 40 40 60 40 Z"
      fill="#e8c39e"
      stroke="#c49a76"
      strokeWidth="4"
      strokeLinejoin="round" />

      <path
      d="M 60 100 Q 55 110 65 115"
      stroke="#c49a76"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none" />

      <g transform="translate(60, 75)">
        <KawaiiFace />
      </g>
    </motion.g>
  </svg>;

const StorySapling = ({ size = 120 }) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 120 120"
  fill="none"
  className="overflow-visible">

    <motion.g
    animate={{
      y: [0, -5, 0]
    }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut'
    }}
    style={{
      originX: '60px',
      originY: '100px'
    }}>

      <path
      d="M 60 100 Q 58 60 60 40"
      stroke="#c49a76"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none" />

      <path
      d="M 58 65 C 40 60 30 75 35 80 C 45 80 55 70 58 65 Z"
      fill="#a8e6cf"
      stroke="#7bc4ab"
      strokeWidth="4"
      strokeLinejoin="round" />

      <path
      d="M 62 55 C 80 50 90 65 85 70 C 75 70 65 60 62 55 Z"
      fill="#a8e6cf"
      stroke="#7bc4ab"
      strokeWidth="4"
      strokeLinejoin="round" />

      <path
      d="M 60 40 C 45 30 55 15 65 20 C 75 25 70 40 60 40 Z"
      fill="#a8e6cf"
      stroke="#7bc4ab"
      strokeWidth="4"
      strokeLinejoin="round" />

      <g transform="translate(60, 85) scale(0.8)">
        <KawaiiFace />
      </g>
    </motion.g>
  </svg>;

const StoryTree = ({ size = 120 }) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 120 120"
  fill="none"
  className="overflow-visible">

    <motion.g
    animate={{
      rotate: [-3, 3, -3]
    }}
    transition={{
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut'
    }}
    style={{
      originX: '60px',
      originY: '100px'
    }}>

      <path
      d="M 50 100 Q 55 60 45 40 Q 60 45 60 35 Q 60 45 75 40 Q 65 60 70 100 Z"
      fill="#e8c39e"
      stroke="#c49a76"
      strokeWidth="4"
      strokeLinejoin="round" />

      <path
      d="M 60 55 C 20 55 10 20 30 10 C 45 -5 75 -5 90 10 C 110 20 100 55 60 55 Z"
      fill="#a8e6cf"
      stroke="#7bc4ab"
      strokeWidth="4"
      strokeLinejoin="round" />

      <g transform="translate(60, 80)">
        <KawaiiFace />
      </g>
    </motion.g>
  </svg>;

export function StorybookShowcase() {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };
  return (
    <section className="min-h-screen w-full bg-[#fff8f0] flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20 lg:gap-28">

        <motion.div variants={itemVariants}>
          <StorySeed size={150} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StorySapling size={150} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StoryTree size={150} />
        </motion.div>
      </motion.div>
    </section>);

}