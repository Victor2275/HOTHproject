import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import '../styles/EmotionView.css';

const EmotionView = ({ emotions, tasks = [], studentsData, studentName, role }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  // Teacher Filters
  const [teacherViewStudent, setTeacherViewStudent] = useState('All');
  const [teacherViewTask, setTeacherViewTask] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

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
      timestamp: Date.now(), // Reliable time sorting
      taskTitle: tasks.find(t => t.id === selectedTaskId)?.title || 'Unknown Task',
      studentName: studentName
    };

    try {
      await setDoc(doc(db, "emotions", `${selectedTaskId}_${studentName}`), newEmotionObj);
    } catch (error) {
      console.error("Error logging emotion:", error);
    }
  };

  const removeEmotion = async (docId) => {
    try { await deleteDoc(doc(db, "emotions", docId)); } 
    catch (error) { console.error("Error removing emotion:", error); }
  };

  // HELPER: Get a reliable sorting number, even for old data missing the 'timestamp' field
  const getSortTime = (entry) => {
    if (entry.timestamp) return entry.timestamp;
    
    // Fallback parser for older database entries
    if (entry.time) {
      try {
        const [timeStr, modifier] = entry.time.split(' ');
        let [hours, minutes] = timeStr.split(':');
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
        
        if (hours === 12) {
          hours = modifier.toUpperCase() === 'AM' ? 0 : 12;
        } else if (modifier.toUpperCase() === 'PM') {
          hours += 12;
        }
        
        const fakeDate = new Date();
        fakeDate.setHours(hours, minutes, 0, 0);
        return fakeDate.getTime();
      } catch (e) {
        return 0;
      }
    }
    return 0;
  };

  // 1. Filter out "ghost" emotions from deleted students globally
  let displayedEmotions = emotions.filter(e => studentsData.some(s => s.id === e.studentName));

  // 2. Apply Role & Teacher Filters
  if (role === 'teacher') {
    if (teacherViewStudent !== 'All') displayedEmotions = displayedEmotions.filter(e => e.studentName === teacherViewStudent);
    if (teacherViewTask !== 'All') displayedEmotions = displayedEmotions.filter(e => e.taskId === teacherViewTask);
    
    // Sort by Time
    displayedEmotions.sort((a, b) => {
      const timeA = getSortTime(a);
      const timeB = getSortTime(b);
      return sortOrder === 'Newest' ? timeB - timeA : timeA - timeB;
    });
  } else {
    // Student just sees their own
    displayedEmotions = displayedEmotions.filter(e => e.studentName === studentName);
    displayedEmotions.sort((a, b) => getSortTime(b) - getSortTime(a)); // Defaults newest first
  }

  return (
    <div className="emotion-view" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {role === 'teacher' && (
        <div style={{ marginBottom: '30px', padding: '20px', background: '#1e293b', borderRadius: '10px', width: '100%', maxWidth: '600px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'white' }}>👩‍🏫 Advanced Filters</h3>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Student:</label>
              <select value={teacherViewStudent} onChange={e => setTeacherViewStudent(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
                <option value="All">All Students</option>
                {studentsData.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Task / Question:</label>
              <select value={teacherViewTask} onChange={e => setTeacherViewTask(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
                <option value="All">All Tasks</option>
                {tasks.map((t, idx) => <option key={t.id} value={t.id}>Q{idx + 1}: {t.title}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '5px' }}>Time:</label>
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: '8px', borderRadius: '5px' }}>
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 1. TASK SELECTION (Only for Students) */}
      {role !== 'teacher' && (
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h2>1. Select a Task</h2>
          </div>
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
              {/* Visual Wheel Elements */}
              <circle cx="200" cy="200" r="125" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
              <circle cx="200" cy="200" r="25" fill="rgba(255,255,255,0.2)" />
              <circle cx="200" cy="200" r="15" fill="#38bdf8" />

              {emotionData.map((emotion) => {
                const radius = 125;
                const angle = (emotion.angle * Math.PI) / 180;
                const x = 200 + radius * Math.cos(angle);
                const y = 200 + radius * Math.sin(angle);

                return (
                  <React.Fragment key={emotion.name}>
                    {/* Spokes connecting center to emotions */}
                    <line x1="200" y1="200" x2={x} y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                    <motion.g
                      whileTap={{ scale: selectedTaskId ? 0.8 : 1 }} 
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    >
                      <circle cx={x} cy={y} r={55} fill={emotion.color} onClick={() => handleEmotionClick(emotion)} style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }} />
                      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" onClick={() => handleEmotionClick(emotion)} style={{ cursor: selectedTaskId ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {emotion.name}
                      </text>
                    </motion.g>
                  </React.Fragment>
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