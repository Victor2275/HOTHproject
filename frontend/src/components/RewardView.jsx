import { useState } from 'react';

export default function RewardView({ points, setPoints }) {
  // State to hold the items the student has planted in their forest
  const [forest, setForest] = useState([]);

  // Function to handle buying a tree
  const plantTree = (treeType, cost) => {
    if (points >= cost) {
      setPoints(points - cost); // Deduct the points
      // Add the new tree to the forest array
      setForest([...forest, { id: Date.now(), emoji: treeType }]);
    } else {
      alert("You need more stars to plant this! Keep completing tasks. 🌟");
    }
  };

  return (
    <div className="reward-view">
      <h2>🌳 Build Your Forest 🌳</h2>
      <p>Spend your stars to grow your beautiful forest!</p>
      
      <div className="store-panel">
        {/* Different items cost different amounts */}
        <button onClick={() => plantTree('🌱', 5)} disabled={points < 5}>
          Plant Seed (5 ⭐)
        </button>
        <button onClick={() => plantTree('🌲', 10)} disabled={points < 10}>
          Plant Pine Tree (10 ⭐)
        </button>
        <button onClick={() => plantTree('🍎', 15)} disabled={points < 15}>
          Plant Apple Tree (15 ⭐)
        </button>
      </div>

      <div className="forest-grid" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '30px',
        minHeight: '200px',
        background: '#e8f5e9',
        padding: '20px',
        borderRadius: '15px'
      }}>
        {forest.length === 0 ? (
          <p style={{ color: '#666' }}>Your forest is empty. Plant something!</p>
        ) : (
          forest.map((item) => (
            <span key={item.id} style={{ fontSize: '3rem', animation: 'pop-in 0.5s ease' }}>
              {item.emoji}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
