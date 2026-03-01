import React, { useState } from 'react';

// 1. IMPORT YOUR NEW ANIMATED COMPONENTS HERE
import { SeedIcon } from './SeedIcon';
import { SaplingIcon } from './SaplingIcon';
import { TreeIcon } from './TreeIcon';

// ==========================================
// 🎨 UI INTEGRATION AREA: IMPORT ASSETS HERE
// ==========================================
// When you have a custom background, uncomment the line below
// and change the file path to match your exported image.
// import forestBackground from '../assets/forest-backdrop.jpg';

// ==========================================
// 🌲 TREE CONFIGURATION DICTIONARY
// ==========================================
// This dictionary controls the graphics and names for each tree type and level.
const TREE_TYPES = {
  pine: {
    name: "Animated Pine",
    cost: 5,
    levels: {
      // Using your Framer Motion icons here!
      1: { size: '60px', graphic: <SeedIcon size={60} /> },
      2: { size: '100px', graphic: <SaplingIcon size={100} /> },
      3: { size: '150px', graphic: <TreeIcon size={150} /> },
    }
  },
  oak: {
    name: "Oak Tree",
    cost: 10,
    levels: {
      // Keeping emojis here just so you have a 2nd option to play with
      1: { size: '60px', graphic: '🌱' },
      2: { size: '100px', graphic: '🌿' },
      3: { size: '150px', graphic: '🌳✨' },
    }
  }
};

export default function RewardView({ points, setPoints }) {
  const [forest, setForest] = useState([]);

  // 1. Function to buy and plant a Level 1 tree
  const plantTree = (type) => {
    const cost = TREE_TYPES[type].cost;
    if (points >= cost) {
      setPoints(points - cost);
      
      const newTree = {
        id: Date.now(), // Unique ID for React
        type: type,     // 'pine' or 'oak'
        level: 1        // All new trees start at level 1
      };
      
      setForest([...forest, newTree]);
    } else {
      alert("You need more stars! 🌟");
    }
  };

  // 2. Function to COMBINE/MERGE trees
  const handleTreeClick = (clickedTree) => {
    // If the tree is already max level (Level 3), do nothing
    if (clickedTree.level >= 3) {
      alert("This tree is fully grown! It can't get any bigger.");
      return;
    }

    // Look for ANOTHER tree in the forest of the exact same TYPE and LEVEL
    const matchIndex = forest.findIndex(
      (t) => t.id !== clickedTree.id && t.type === clickedTree.type && t.level === clickedTree.level
    );

    if (matchIndex !== -1) {
      // WE FOUND A MATCH! Let's combine them.
      const matchedTree = forest[matchIndex];

      // Remove both old trees from the array
      const newForest = forest.filter(t => t.id !== clickedTree.id && t.id !== matchedTree.id);
      
      // Create a new upgraded tree (Level + 1)
      const upgradedTree = {
        id: Date.now(),
        type: clickedTree.type,
        level: clickedTree.level + 1
      };

      // Add the new upgraded tree to the forest
      setForest([...newForest, upgradedTree]);
      
    } else {
      // No match found
      alert(`To upgrade this ${TREE_TYPES[clickedTree.type].name}, you need another Level ${clickedTree.level} tree of the same kind to combine it with!`);
    }
  };

  return (
    <div className="reward-view" style={{ textAlign: 'center' }}>
      <h2>🌳 Your Magical Forest 🌳</h2>
      <p>Stars available: <strong>{points} ⭐</strong></p>
      <p style={{ color: '#555', fontSize: '0.9rem' }}>
        <em>Hint: Buy 2 of the same trees and click one to combine them into a bigger tree!</em>
      </p>
      
      {/* --- STORE PANEL --- */}
      <div className="store-panel" style={{ margin: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => plantTree('pine')} disabled={points < TREE_TYPES.pine.cost}>
          Buy Pine (5 ⭐)
        </button>
        <button onClick={() => plantTree('oak')} disabled={points < TREE_TYPES.oak.cost}>
          Buy Oak (10 ⭐)
        </button>
      </div>

      {/* ========================================== */}
      {/* 🖼️ UI INTEGRATION AREA: BACKDROP           */}
      {/* ========================================== */}
      {/* To use your custom background, replace the 'backgroundColor'
          with: backgroundImage: `url(${forestBackground})`, backgroundSize: 'cover' */}
      
      <div className="forest-grid" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end', // Aligns trees to the "ground"
        gap: '20px',
        marginTop: '30px',
        minHeight: '400px',
        backgroundColor: '#a8e6cf', // <--- REPLACE THIS WITH YOUR BACKGROUND IMAGE
        padding: '30px',
        borderRadius: '20px',
        border: '4px solid #568a62'
      }}>
        
        {forest.length === 0 ? (
          <p style={{ width: '100%', color: '#333', fontSize: '1.2rem' }}>
            It's empty here! Complete tasks to earn stars and plant trees.
          </p>
        ) : (
          forest.map((tree) => {
            const treeData = TREE_TYPES[tree.type].levels[tree.level];
            
            return (
              <div
                key={tree.id}
                onClick={() => handleTreeClick(tree)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  animation: 'pop-in 0.4s ease-out',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                title="Click to combine!"
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
