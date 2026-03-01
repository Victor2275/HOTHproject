import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/EmotionView.css';

const EmotionView = ({ emotions, setEmotions, tasks = [] }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const emotionData = [
    { name: 'Happy', color: '#FFD700', angle: 0 },
    { name: 'Surprised', color: '#FF69B4', angle: 60 },
    { name: 'Angry', color: '#FF4500', angle: 120 },
    { name: 'Sad', color: '#4169E1', angle: 180 },
    { name: 'Confused', color: '#9370DB', angle: 240 },
    { name: 'Bored', color: '#A9A9A9', angle: 300 },
  ];

  const handleEmotionClick = (emotion) => {
    if (!selectedTaskId) {
      alert("Please select a task question first!");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

    const newEmotionObj = {
      taskId: selectedTaskId,
      emotion: emotion.name,
      color: emotion.color,
      time: timeString,
      taskTitle: tasks.find(t => t.id === selectedTaskId)?.title || 'Unknown Task'
    };

    // Replace existing emotion for this task if it exists, otherwise add it
    setEmotions((prevEmotions) => {
      const existingIndex = prevEmotions.findIndex(e => e.taskId === selectedTaskId);
      if (existingIndex !== -1) {
        const updated = [...prevEmotions];
        updated[existingIndex] = newEmotionObj;
        return updated;
      }
      return [...prevEmotions, newEmotionObj];
    });
  };

  const clearLog = () => setEmotions([]);
  
  const removeEmotion = (taskId) => {
    setEmotions(emotions.filter((e) => e.taskId !== taskId));
  };

  return (
    <div className="emotion-view" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1. TASK SELECTION (Must pick one first) */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
        <h2>1. Select a Task</h2>
        {tasks.length === 0 ? <p>No tasks assigned yet.</p> : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {tasks.map((task, idx) => {
              const isSelected = selectedTaskId === task.id;
              const savedEmotion = emotions.find(e => e.taskId === task.id);

              return (
                <motion.div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  whileTap={{ scale: 0.85 }} // Input Bounce!
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    padding: '15px 20px',
                    border: isSelected ? '3px solid white' : '2px solid #38bdf8',
                    backgroundColor: isSelected ? '#0284c7' : '#0f172a',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '120px'
                  }}
                >
                  <strong>Q{idx + 1}: {task.title}</strong>
                  {savedEmotion && (
                    <span style={{ marginTop: '5px', fontSize: '0.8rem', color: savedEmotion.color }}>
                      Current: {savedEmotion.emotion}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. EMOTION WHEEL */}
      <h2>2. How did this make you feel?</h2>
      <div className="emotion-wheel-container" style={{ opacity: selectedTaskId ? 1 : 0.4, transition: 'opacity 0.3s' }}>
        <svg viewBox="0 0 400 400" className="emotion-wheel">
          {emotionData.map((emotion) => {
            const radius = 150;
            const angle = (emotion.angle * Math.PI) / 180;
            const x = 200 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);

            return (
              <motion.g
                key={emotion.name}
                whileTap={{ scale: selectedTaskId ? 0.8 : 1 }} // Input Bounce on Wheel slices!
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle
                  cx={x} cy={y} r={60}
                  fill={emotion.color}
                  onClick={() => handleEmotionClick(emotion)}
                  style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed' }}
                />
                <text
                  x={x} y={y}
                  textAnchor="middle" dominantBaseline="middle"
                  onClick={() => handleEmotionClick(emotion)}
                  style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
                >
                  {emotion.name}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* 3. EMOTION LOGS */}
      <div className="emotion-sidebar" style={{ marginTop: '30px', width: '100%', maxWidth: '600px' }}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Emotion Log</h2>
          {emotions.length > 0 && <button onClick={clearLog}>Clear All</button>}
        </div>

        <div className="emotion-entries" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {emotions.length === 0 ? (
            <p>Select a task and click an emotion to log it!</p>
          ) : (
            emotions.map((entry) => (
              <div
                key={entry.taskId}
                style={{
                  borderLeft: `8px solid ${entry.color}`,
                  padding: '15px',
                  backgroundColor: '#1e293b',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>{entry.taskTitle}</div>
                  <div style={{ color: entry.color }}>{entry.emotion} ({entry.time})</div>
                </div>
                <button
                  onClick={() => removeEmotion(entry.taskId)}
                  style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 10px' }}
                >
                  Remove
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
