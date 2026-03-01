import React from 'react';
import { motion } from 'framer-motion';
interface TreeIconProps {
  size?: number;
  delay?: number;
}
export function TreeIcon({ size = 120, delay = 0 }: TreeIconProps) {
  const draw = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          ease: 'easeInOut',
          delay
        },
        opacity: {
          duration: 0.5,
          delay
        }
      }
    }
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible">

      {/* Soil Line */}
      <motion.path
        d="M 15 100 Q 60 97 105 100"
        stroke="#6b4423"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        animate="visible" />


      {/* Roots */}
      <motion.path
        d="M 52 100 Q 40 105 35 112 M 60 100 Q 60 108 62 115 M 68 100 Q 80 105 85 112"
        stroke="#6b4423"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        animate="visible" />


      {/* Whole Tree Group (Subtle Trunk Flex) */}
      <motion.g
        animate={{
          rotate: [-0.5, 0.5, -0.5]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
          delay: delay + 1.5
        }}
        style={{
          originX: '60px',
          originY: '100px'
        }}>

        {/* BACK CLUSTERS */}
        {/* Cluster 1 (Top Center) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'easeInOut',
            delay: delay + 1.5
          }}
          style={{
            originX: '60px',
            originY: '25px'
          }}>

          <motion.path
            d="M 50 30 C 45 20 55 10 65 15 C 75 10 85 20 75 30 C 80 40 70 45 65 40 C 55 45 45 40 50 30 Z"
            stroke="#7dad5a"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>

        {/* Cluster 2 (Left) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.0,
            ease: 'easeInOut',
            delay: delay + 1.7
          }}
          style={{
            originX: '40px',
            originY: '40px'
          }}>

          <motion.path
            d="M 30 45 C 25 35 35 25 45 30 C 55 25 60 35 55 45 C 60 55 50 60 45 55 C 35 60 25 55 30 45 Z"
            stroke="#7dad5a"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>

        {/* Cluster 3 (Right) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: 'easeInOut',
            delay: delay + 1.6
          }}
          style={{
            originX: '80px',
            originY: '40px'
          }}>

          <motion.path
            d="M 90 45 C 95 35 85 25 75 30 C 65 25 60 35 65 45 C 60 55 70 60 75 55 C 85 60 95 55 90 45 Z"
            stroke="#7dad5a"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>

        {/* TRUNK & BRANCHES */}
        <motion.path
          d="M 52 100 Q 54 75 56 60 Q 45 55 40 45 Q 50 48 56 55 Q 58 40 60 30 Q 62 40 64 55 Q 70 48 80 45 Q 75 55 64 60 Q 66 75 68 100 Z"
          stroke="#1a3a1a"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="#faf8f5"
          variants={draw}
          initial="hidden"
          animate="visible" />


        {/* BARK TEXTURE */}
        <motion.path
          d="M 56 95 Q 57 85 56 75 M 62 85 Q 61 75 62 65 M 58 70 Q 59 65 58 60 M 64 95 Q 63 90 64 85"
          stroke="#6b4423"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible" />


        {/* FRONT CLUSTERS */}
        {/* Cluster 5 (Bottom Left) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
            delay: delay + 1.9
          }}
          style={{
            originX: '30px',
            originY: '60px'
          }}>

          <motion.path
            d="M 20 65 C 15 55 25 45 35 50 C 45 45 50 55 45 65 C 50 75 40 80 35 75 C 25 80 15 75 20 65 Z"
            stroke="#a8d86e"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>

        {/* Cluster 6 (Bottom Right) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: 'easeInOut',
            delay: delay + 2.0
          }}
          style={{
            originX: '90px',
            originY: '60px'
          }}>

          <motion.path
            d="M 100 65 C 105 55 95 45 85 50 C 75 45 70 55 75 65 C 70 75 80 80 85 75 C 95 80 105 75 100 65 Z"
            stroke="#a8d86e"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>

        {/* Cluster 4 (Front Center) */}
        <motion.g
          animate={{
            rotate: [-2, 2, -2],
            x: [-1, 1, -1]
          }}
          transition={{
            repeat: Infinity,
            duration: 3.0,
            ease: 'easeInOut',
            delay: delay + 1.8
          }}
          style={{
            originX: '60px',
            originY: '50px'
          }}>

          <motion.path
            d="M 50 55 C 45 45 55 35 65 40 C 75 35 80 45 75 55 C 80 65 70 70 65 65 C 55 70 45 65 50 55 Z"
            stroke="#7dad5a"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#faf8f5"
            variants={draw}
            initial="hidden"
            animate="visible" />

        </motion.g>
      </motion.g>
    </svg>);

}