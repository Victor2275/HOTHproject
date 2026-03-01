import React from 'react';
import '../styles/EmotionView.css';

const EmotionView = ({ emotions, setEmotions }) => {

  const emotionData = [
    { name: 'Happy', color: '#FFD700', angle: 0 },
    { name: 'Surprised', color: '#FF69B4', angle: 60 },
    { name: 'Angry', color: '#FF4500', angle: 120 },
    { name: 'Sad', color: '#4169E1', angle: 180 },
    { name: 'Confused', color: '#9370DB', angle: 240 },
    { name: 'Bored', color: '#A9A9A9', angle: 300 },
  ];

  const handleEmotionClick = (emotion) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    setEmotions([
      ...emotions,
      {
        id: Date.now(),
        emotion: emotion.name,
        color: emotion.color,
        time: timeString,
      },
    ]);
  };

  const clearLog = () => {
    setEmotions([]);
  };

  const removeEmotion = (id) => {
    setEmotions(emotions.filter((e) => e.id !== id));
  };

  return (
    <div className="emotion-view">
      {/* Color Wheel Section */}
      <div className="emotion-wheel-container">
        <svg viewBox="0 0 400 400" className="emotion-wheel">
          {emotionData.map((emotion) => {
            const radius = 150;
            const angle = (emotion.angle * Math.PI) / 180;
            const x = 200 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);

            return (
              <g key={emotion.name}>
                {/* Pie slice */}
                <circle
                  cx={x}
                  cy={y}
                  r={60}
                  fill={emotion.color}
                  className="emotion-segment"
                  onClick={() => handleEmotionClick(emotion)}
                  style={{ cursor: 'pointer' }}
                />
                {/* Label */}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="emotion-label"
                  onClick={() => handleEmotionClick(emotion)}
                  style={{ cursor: 'pointer', pointerEvents: 'none', fontWeight: 'bold' }}
                >
                  {emotion.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Sidebar Section */}
      <div className="emotion-sidebar">
        <div className="sidebar-header">
          <h2>Emotion Log</h2>
          {emotions.length > 0 && (
            <button className="clear-btn" onClick={clearLog}>
              Clear All
            </button>
          )}
        </div>

        <div className="emotion-entries">
          {emotions.length === 0 ? (
            <p className="empty-state">Click an emotion to start logging</p>
          ) : (
            emotions.map((entry) => (
              <div
                key={entry.id}
                className="emotion-entry"
                style={{ borderLeft: `5px solid ${entry.color}` }}
              >
                <div className="entry-content">
                  <span className="emotion-name">{entry.emotion}</span>
                  <span className="emotion-time">{entry.time}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeEmotion(entry.id)}
                  title="Remove this entry"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmotionView;
