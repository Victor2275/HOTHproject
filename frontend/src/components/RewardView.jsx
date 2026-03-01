import React from 'react';
import { motion } from 'framer-motion';

// IMPORT YOUR ANIMATED COMPONENTS
import { SeedIcon } from './SeedIcon';
import { SaplingIcon } from './SaplingIcon';
import { TreeIcon } from './TreeIcon';

const TREE_TYPES = {
  pine: {
    name: "Animated Pine",
    cost: 5,
    levels: {
      1: { size: '40px', graphic: <SeedIcon size={40} />, offset: -20 },
      2: { size: '70px', graphic: <SaplingIcon size={70} />, offset: -35 },
      3: { size: '100px', graphic: <TreeIcon size={100} />, offset: -50 },
    }
  }
};

// 📍 12 SAFE SLOTS
// Adjusted so that even a 100px tree (offset -50) stays within the 454x454 bounds.
// Safe Range: X(50 to 404), Y(50 to 404)
const TREE_POSITIONS = [
  { left: 70, top: 340 },  { left: 150, top: 320 }, { left: 230, top: 340 }, { left: 310, top: 320 },
  { left: 380, top: 350 }, { left: 110, top: 260 }, { left: 200, top: 240 }, { left: 290, top: 260 },
  { left: 60, top: 390 },  { left: 160, top: 400 }, { left: 260, top: 390 }, { left: 360, top: 400 }
];

export default function RewardView({ points, setPoints, forest, setForest }) {

  const plantTree = (type) => {
    const cost = TREE_TYPES[type].cost;
    if (points < cost) return alert("You need more stars! 🌟");

    const occupiedSlots = forest.map(t => t.slotIndex);
    const nextSlotIndex = TREE_POSITIONS.findIndex((_, index) => !occupiedSlots.includes(index));

    if (nextSlotIndex === -1) return alert("Forest full!");

    setPoints(points - cost);
    setForest([...forest, { id: Date.now(), type, level: 1, slotIndex: nextSlotIndex }]);
  };

  const handleTreeClick = (clickedTree) => {
    const matchIndex = forest.findIndex(
      (t) => t.id !== clickedTree.id && t.type === clickedTree.type && t.level === clickedTree.level
    );

    if (clickedTree.level < 3 && matchIndex !== -1) {
      const matchedTree = forest[matchIndex];
      const newForest = forest.filter(t => t.id !== clickedTree.id && t.id !== matchedTree.id);
      setForest([...newForest, { id: Date.now(), type: clickedTree.type, level: clickedTree.level + 1, slotIndex: clickedTree.slotIndex }]);
    }
  };

  return (
    <div className="reward-view" style={{ textAlign: 'center' }}>
      <h2>🌳 Your Magical Forest 🌳</h2>
      <p>Stars: <strong>{points} ⭐</strong></p>
      
      <button onClick={() => plantTree('pine')} style={{ marginBottom: '10px' }}>Buy Pine (5 ⭐)</button>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* The 454x454 Fixed Box */}
        <div style={{ width: '454px', height: '454px', position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
          
          {/* --- START OF YOUR GRASS CODE --- */}
          <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: '#ECF9FC'}} />
            <div style={{width: 322.92, height: 3.46, left: 130.58, top: 207.32, position: 'absolute', background: 'white'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 454, height: 120.76, left: -0.13, top: 227.55, position: 'absolute', background: '#D2EDF3'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 312.23, height: 83.05, left: -0.13, top: 267.41, position: 'absolute', background: '#BEDFE5'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 454, height: 138.16, left: -0.13, top: 315.65, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 454, height: 138.18, left: -0.13, top: 315.63, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 454, height: 113.68, left: -0.13, top: 340.13, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 454, height: 68.11, left: -0.13, top: 385.69, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 49.94, height: 223.48, left: 51.71, top: 185.73, position: 'absolute', background: '#2E943E'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 38.23, height: 171.06, left: 99.35, top: 201.25, position: 'absolute', background: '#39B03E'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 25.18, height: 112.67, left: 5.34, top: 229.11, position: 'absolute', background: '#39B03E'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 16.59, height: 74.21, left: 421.71, top: 246.47, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 453.50, height: 453.50, left: 0, top: 0, position: 'absolute', background: 'black', opacity: 0.05}} />
            <div style={{width: 269.65, height: 7.23, left: 184.22, top: 359.13, position: 'absolute', background: '#96D76C'}} />
            <div style={{width: 12.54, height: 56.12, left: 383.89, top: 262.07, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 31.54, height: 141.13, left: 390.54, top: 246.47, position: 'absolute', background: '#39B03E'}} />
            <div style={{width: 59.92, height: 268.13, left: 334.96, top: 170.56, position: 'absolute', background: '#287D38'}} />
            <div style={{width: 308.26, height: 16.13, left: -0.13, top: 414.61, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.06, height: 22.66, left: 200.08, top: 294.14, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 6.21, height: 27.79, left: 203.70, top: 288.94, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 6.52, height: 29.18, left: 213.15, top: 287.55, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.06, height: 22.66, left: 218.16, top: 294.56, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.06, height: 22.66, left: 226.99, top: 294.25, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 6.21, height: 27.79, left: 241.26, top: 289.15, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 6.52, height: 29.18, left: 250.71, top: 287.75, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.06, height: 22.66, left: 264.55, top: 294.46, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.07, height: 22.66, left: 230.53, top: 294, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 5.06, height: 22.66, left: 239.36, top: 293.69, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 4.41, height: 19.73, left: 235.26, top: 296.64, position: 'absolute', background: '#7BCD57'}} />
            <div style={{width: 40.90, height: 182.99, left: 12.22, top: 187.29, position: 'absolute', background: '#2E943E'}} />
            <div style={{width: 32.16, height: 258.21, left: 421.71, top: 195.60, position: 'absolute', background: '#287D38'}} />
            <div style={{width: 10.42, height: 46.63, left: 166.06, top: 272.74, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 12.22, height: 54.66, left: 154.10, top: 267.83, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 12.22, height: 54.66, left: 143.72, top: 264, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 10.42, height: 46.63, left: 134.49, top: 273.16, position: 'absolute', background: '#4EBD38'}} />
            <div style={{width: 415.51, height: 10.01, left: -0.13, top: 144.17, position: 'absolute', background: 'white'}} />
            <div style={{width: 323.29, height: 7.79, left: 130.58, top: 88.55, position: 'absolute', background: 'white'}} />
            <div style={{width: 412.29, height: 9.94, left: 41.58, top: 51.97, position: 'absolute', background: 'white'}} />
            <div style={{width: 312.32, height: 7.53, left: -0.13, top: 172.40, position: 'absolute', background: 'white'}} />
            <div style={{width: 122.16, height: 23.22, left: 43.80, top: 136.66, position: 'absolute', background: 'white'}} />
            <div style={{width: 106.29, height: 20.21, left: 148.51, top: 45.52, position: 'absolute', background: 'white'}} />
            <div style={{width: 85.74, height: 17.94, left: 269.12, top: 83.26, position: 'absolute', background: 'white'}} />
            <div style={{width: 85.74, height: 17.94, left: 120.60, top: 167.17, position: 'absolute', background: 'white'}} />
            <div style={{width: 323.29, height: 3.46, left: -0.13, top: 27.86, position: 'absolute', background: 'white'}} />
          </div>
          {/* --- END OF YOUR GRASS CODE --- */}

          {forest.map((tree) => {
            const treeData = TREE_TYPES[tree.type].levels[tree.level];
            const position = TREE_POSITIONS[tree.slotIndex];
            
            return (
              <motion.div
                key={tree.id}
                onClick={() => handleTreeClick(tree)}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  position: 'absolute',
                  left: position.left + treeData.offset + 'px',
                  top: position.top + treeData.offset + 'px',
                  cursor: tree.level >= 3 ? 'default' : 'pointer',
                  zIndex: tree.level >= 3 ? 5 : 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: treeData.size, display: 'inline-block' }}>
                  {treeData.graphic}
                </span>
                <div style={{ fontSize: '0.6rem', background: 'white', borderRadius: '5px', padding: '0 4px', fontWeight: 'bold' }}>
                  Lvl {tree.level}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
