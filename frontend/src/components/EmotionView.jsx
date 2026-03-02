import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import '../styles/EmotionView.css';

const EmotionView = ({ emotions, tasks = [], studentsData, studentName, role }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [teacherViewStudent, setTeacherViewStudent] = useState('All');

  const emotionData = [
    { name: 'Happy 😄', color: '#FFD700', angle: 0 },
    { name: 'Surprised 😲', color: '#FF69B4', angle: 60 },
    { name: 'Angry 😡', color: '#FF4500', angle: 120 },
    { name: 'Sad 😞', color: '#4169E1', angle: 180 },
    { name: 'Confused 🤔', color: '#9370DB', angle: 240 },
    { name: 'Bored 😐', color: '#A9A9A9', angle: 300 },
  ];

  const handleEmotionClick = async (emotion) => {
    if (role === 'teacher') return; // Teachers just view
    if (!selectedTaskId) {
      alert("Please select a task question first!");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newEmotionObj = {
      taskId: selectedTaskId,
      emotion: emotion.name,
      color: emotion.color,
      time: timeString,
      taskTitle: tasks.find(t => t.id === selectedTaskId)?.title || 'Unknown Task',
      studentName: studentName
    };

    try {
      // Document ID includes student name so students don't overwrite each other's feelings
      await setDoc(doc(db, "emotions", `${selectedTaskId}_${studentName}`), newEmotionObj);
    } catch (error) {
      console.error("Error logging emotion:", error);
    }
  };

  const removeEmotion = async (docId) => {
    try { await deleteDoc(doc(db, "emotions", docId)); } 
    catch (error) { console.error("Error removing emotion:", error); }
  };

  const displayedEmotions = role === 'teacher' 
    ? (teacherViewStudent === 'All' ? emotions : emotions.filter(e => e.studentName === teacherViewStudent))
    : emotions.filter(e => e.studentName === studentName);

  return (
    <div className="emotion-view" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {role === 'teacher' && (
        <div style={{ marginBottom: '30px', padding: '15px', background: '#1e293b', borderRadius: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>👩‍🏫 Teacher Controls</h3>
          <label style={{ color: 'white', marginRight: '10px' }}>Filter by Student:</label>
          <select value={teacherViewStudent} onChange={e => setTeacherViewStudent(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
            <option value="All">All Students</option>
            {studentsData.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      )}

      {/* 1. TASK SELECTION (Only for Students) */}
      {role !== 'teacher' && (
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h2>1. Select a Task</h2>
          {tasks.length === 0 ? <p>No tasks assigned yet.</p> : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {tasks.map((task, idx) => {
                const isSelected = selectedTaskId === task.id;
                const savedEmotion = displayedEmotions.find(e => e.taskId === task.id);
                return (
                  <motion.div
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    whileTap={{ scale: 0.85 }} 
                    style={{
                      padding: '15px 20px', border: isSelected ? '3px solid white' : '2px solid white',
                      backgroundColor: isSelected ? '#997541' : '#78935c', borderRadius: '12px', cursor: 'pointer',
                      color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px'
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
      )}

      {/* 2. EMOTION WHEEL (Only for Students) */}
      {role !== 'teacher' && (
        <>
          <h2>2. How did this make you feel?</h2>
          <div className="emotion-wheel-container" style={{ opacity: selectedTaskId ? 1 : 0.4, transition: 'opacity 0.3s' }}>
            <svg viewBox="0 0 400 400" className="emotion-wheel">
              {emotionData.map((emotion) => {
                const radius = 125;
                const angle = (emotion.angle * Math.PI) / 180;
                const x = 200 + radius * Math.cos(angle);
                const y = 200 + radius * Math.sin(angle);

                return (
                  <motion.g
                    key={emotion.name}
                    whileTap={{ scale: selectedTaskId ? 0.8 : 1 }} 
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <circle cx={x} cy={y} r={60} fill={emotion.color} onClick={() => handleEmotionClick(emotion)} style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed' }} />
                    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" onClick={() => handleEmotionClick(emotion)} style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>
                      {emotion.name}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </>
      )}

      {/* 3. EMOTION LOGS */}
      <div className="emotion-sidebar" style={{ marginTop: '30px', width: '100%', maxWidth: '600px' }}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid gray', paddingBottom: '10px' }}>
          <h2>{role === 'teacher' ? "Class Emotion Logs" : "Your Emotion Log"}</h2>
        </div>

        <div className="emotion-entries" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          {displayedEmotions.length === 0 ? (
            <p>No emotions logged yet.</p>
          ) : (
            displayedEmotions.map((entry) => (
              <div
                key={entry.id}
                style={{
                  borderLeft: `8px solid ${entry.color}`, padding: '15px', backgroundColor: '#1e293b',
                  borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: 'white', fontWeight: 'bold' }}>{entry.taskTitle}</div>
                  <div style={{ color: entry.color }}>
                    {role === 'teacher' && <strong style={{color: 'white', marginRight: '5px'}}>{entry.studentName}:</strong>}
                    {entry.emotion} ({entry.time})
                  </div>
                </div>
                {role !== 'teacher' && (
                  <button onClick={() => removeEmotion(entry.id)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 10px' }}>
                    Remove
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmotionView;