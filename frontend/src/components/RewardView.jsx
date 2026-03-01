import { useState } from 'react';



// 1. IMPORT YOUR NEW ANIMATED COMPONENTS HERE
import { SeedIcon } from './SeedIcon';
import { SaplingIcon } from './SaplingIcon';
import { TreeIcon } from './TreeIcon';

// 2. PLUG THEM INTO YOUR DICTIONARY
const TREE_TYPES = {
  pine: {
    name: "Animated Tree",
    cost: 5,
    levels: {
      // Pass 'size' to match your grid styling!
      1: { size: '60px', graphic: <SeedIcon size={60} /> },
      2: { size: '100px', graphic: <SaplingIcon size={100} /> },
      3: { size: '150px', graphic: <TreeIcon size={150} /> },
    }
  },
  // ... rest of your code


// ==========================================
// 🎨 UI INTEGRATION AREA: IMPORT ASSETS HERE
// ==========================================
// When you have your custom graphics, uncomment the lines below
// and change the file paths to match your exported images.

// import forestBackground from '../assets/forest-backdrop.jpg';
// import pineLvl1 from '../assets/pine-level1.svg';
// import pineLvl2 from '../assets/pine-level2.svg';
// import pineLvl3 from '../assets/pine-level3.svg';

// ==========================================
// 🌲 TREE CONFIGURATION DICTIONARY
// ==========================================
// This dictionary controls the graphics and names for each tree type and level.
// You can easily add more tree types (like 'oak' or 'fruit') here!
const TREE_TYPES = {
  pine: {
    name: "Pine Tree",
    cost: 5,
    levels: {
      1: { size: '60px', graphic: '🌲' },    // REPLACE '🌲' with: pineLvl1
      2: { size: '100px', graphic: '🌳' },   // REPLACE '🌳' with: pineLvl2
      3: { size: '150px', graphic: '🏕️✨' }, // REPLACE '🏕️✨' with: pineLvl3
    }
  },
  oak: {
    name: "Oak Tree",
    cost: 10,
    levels: {
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
      
      // Optional: You could play a sound effect here!
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
                  animation: 'pop-in 0.4s ease-out'
                }}
                title="Click to combine!"
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* ========================================== */}
                {/* 🎨 UI INTEGRATION AREA: TREE GRAPHICS      */}
                {/* ========================================== */}
                {/* If you are using real images instead of emojis, replace the <span> below with:
                    <img src={treeData.graphic} alt={tree.type} style={{ height: treeData.size }} />
                */}
                <span style={{ fontSize: treeData.size }}>
                  {treeData.graphic}
                </span>
                
                {/* Small indicator so kids know what level it is */}
                <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', marginTop: '5px' }}>
                  Lvl {tree.level}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
