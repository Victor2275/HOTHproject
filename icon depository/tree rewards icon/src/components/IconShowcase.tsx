import React from 'react';
import { motion } from 'framer-motion';
import { SeedIcon } from './icons/SeedIcon';
import { SaplingIcon } from './icons/SaplingIcon';
import { TreeIcon } from './icons/TreeIcon';
export function IconShowcase() {
  return (
    <section className="min-h-screen w-full bg-[#faf8f5] flex flex-col items-center justify-center py-20 px-4 font-sans">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="text-3xl md:text-4xl font-medium text-[#1a3a1a] mb-4 tracking-tight">

            Growth Stages
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="text-[#6b4423] text-lg max-w-xl mx-auto opacity-80">

            A botanical journey from seed to full canopy.
          </motion.p>
        </div>

        {/* Icons Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16">
          {/* Seed Stage */}
          <div className="flex flex-col items-center group">
            <div className="w-40 h-40 flex items-center justify-center bg-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#7dad5a]/10 mb-6">
              <SeedIcon size={100} delay={0.2} />
            </div>
            <motion.span
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 1.5
              }}
              className="text-[#1a3a1a] font-medium tracking-wide uppercase text-sm">

              Seed
            </motion.span>
          </div>

          {/* Connecting Line 1 */}
          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0
            }}
            animate={{
              scaleX: 1,
              opacity: 1
            }}
            transition={{
              duration: 1,
              delay: 1.2,
              ease: 'easeInOut'
            }}
            className="hidden md:block w-16 lg:w-24 h-px border-t-2 border-dashed border-[#7dad5a]/30 origin-left" />


          {/* Sapling Stage */}
          <div className="flex flex-col items-center group">
            <div className="w-40 h-40 flex items-center justify-center bg-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#7dad5a]/10 mb-6">
              <SaplingIcon size={100} delay={0.6} />
            </div>
            <motion.span
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 1.9
              }}
              className="text-[#1a3a1a] font-medium tracking-wide uppercase text-sm">

              Sapling
            </motion.span>
          </div>

          {/* Connecting Line 2 */}
          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0
            }}
            animate={{
              scaleX: 1,
              opacity: 1
            }}
            transition={{
              duration: 1,
              delay: 1.6,
              ease: 'easeInOut'
            }}
            className="hidden md:block w-16 lg:w-24 h-px border-t-2 border-dashed border-[#7dad5a]/30 origin-left" />


          {/* Tree Stage */}
          <div className="flex flex-col items-center group">
            <div className="w-40 h-40 flex items-center justify-center bg-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#7dad5a]/10 mb-6">
              <TreeIcon size={100} delay={1.0} />
            </div>
            <motion.span
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 2.3
              }}
              className="text-[#1a3a1a] font-medium tracking-wide uppercase text-sm">

              Tree
            </motion.span>
          </div>
        </div>
      </div>
    </section>);

}