import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function TeacherView({ tasks, studentsData }) {
  const [taskInput, setTaskInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(1);
  const [showSteps, setShowSteps] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestedSteps, setAiSuggestedSteps] = useState('');

  const handleAIGenerate = async () => {
    if (!taskInput.trim()) return;
    setIsGenerating(true);
    setAiSuggestedSteps('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResponse = `1. Look at the numbers together.\n2. Count on your fingers slowly.\n3. Say the answer out loud.\n4. Write the answer down carefully.`;
      setAiSuggestedSteps(mockResponse);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptAI = () => {
    setStepsInput(aiSuggestedSteps);
    setAiSuggestedSteps('');
  };

  const handleAddTask = async () => {
    if (!taskInput) return;
    const steps = stepsInput.split('\n').map(s => s.trim()).filter(Boolean);
    const newTask = {
      title: taskInput, steps, correctAnswer: '', timeLimitSeconds: Number(timeLimitMinutes) * 60, createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, "tasks"), newTask);
      setTaskInput(''); setStepsInput(''); setShowSteps(false); setAiSuggestedSteps('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="teacher-view" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
      
      {/* Left side: Task Creation */}
      <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
        <h2>👩‍🏫 Create Tasks</h2>
        <div className="input-group">
          <label>Enter a task or question for the student:</label>
          <textarea
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="e.g., Solve 5 + 3"
            rows="3"
            style={{ width: '100%', marginTop: '10px' }}
          />

          {showSteps && (
            <>
              <button
                onClick={handleAIGenerate}
                disabled={isGenerating || !taskInput.trim()}
                style={{ background: '#997541', color: 'white', marginBottom: '10px', marginTop: '10px', padding: '10px', borderRadius: '5px', cursor: 'pointer', border: 'none', width: '100%' }}
              >
                {isGenerating ? "🤖 Thinking..." : "✨ Use AI to help break down steps!"}
              </button>

              {aiSuggestedSteps && (
                <div style={{ border: '2px dashed #3b82f6', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                  <textarea
                    value={aiSuggestedSteps}
                    onChange={(e) => setAiSuggestedSteps(e.target.value)}
                    rows="4"
                    style={{ width: '100%', color: '#1d4ed8', fontWeight: 'bold', backgroundColor: '#eff6ff' }}
                  />
                  <button onClick={handleAcceptAI} style={{ background: '#3b82f6', color: 'white', marginTop: '5px', width: '100%', padding: '8px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                    ✅ Accept These Steps
                  </button>
                </div>
              )}

              <label style={{ marginTop: '10px', display: 'block' }}>Breakdown steps (one per line):</label>
              <textarea
                value={stepsInput}
                onChange={(e) => setStepsInput(e.target.value)}
                placeholder="Enter each step on a new line."
                rows="4"
                style={{ width: '100%', marginTop: '4px' }}
              />
            </>
          )}

          <label style={{ marginTop: '8px', display: 'block' }}>Time limit (minutes):</label>
          <input
            type="number"
            min="1"
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(e.target.value)}
            style={{ width: '100px', marginTop: '6px', padding: '5px' }}
          />
          <br />
          <button
            onClick={() => (!showSteps ? setShowSteps(true) : handleAddTask())}
            disabled={!taskInput.trim()}
            style={{ marginTop: '15px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
          >
            {showSteps ? 'Confirm and Post Task' : 'Add Steps'}
          </button>
        </div>

        <h3 style={{ marginTop: '30px' }}>Current Tasks:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'white' }}>{task.title}</strong>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{ background: '#ef4444', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '5px' }}>
                Time Allotted: {Math.round(task.timeLimitSeconds/60)} min
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Student Roster */}
      <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px', background: '#1e293b', padding: '20px', borderRadius: '15px' }}>
        <h2 style={{ color: 'white', marginTop: 0 }}>👥 Class Roster</h2>
        <p style={{ color: '#94a3b8' }}>Connected Students & Stars</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {studentsData.length === 0 && <p style={{ color: 'white' }}>No students have joined yet.</p>}
          {studentsData.map(student => (
            <li key={student.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #334155', color: 'white' }}>
              <span style={{ fontWeight: 'bold' }}>{student.name}</span>
              <span>{student.points || 0} ⭐</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}