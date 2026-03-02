import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function TeacherView({ tasks }) {
  const [taskInput, setTaskInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(1);
  const [showSteps, setShowSteps] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestedSteps, setAiSuggestedSteps] = useState('');

  const handleAIGenerate = async () => {
    if (!taskInput.trim()) return;
    setIsGenerating(true);
    setAiSuggestedSteps('');
    
    try {
      // Logic from original server-side simulation
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

    const steps = stepsInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newTask = {
      title: taskInput,
      steps,
      correctAnswer: correctAnswer.trim(),
      timeLimitSeconds: Number(timeLimitMinutes) * 60,
      createdAt: serverTimestamp() // Added for consistent ordering
    };

    try {
      await addDoc(collection(db, "tasks"), newTask);
      // Reset form
      setTaskInput('');
      setStepsInput('');
      setCorrectAnswer('');
      setShowSteps(false);
      setAiSuggestedSteps('');
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
    <div className="teacher-view">
      <h2>👩‍🏫 Teacher Dashboard</h2>
      <div className="input-group">
        <label>Enter a task or question for the student:</label>
        <br />
        <textarea
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="e.g., Solve 5 + 3"
          rows="3"
          style={{ width: '100%', maxWidth: '400px', marginTop: '10px' }}
        />
        <br />

        {showSteps && (
          <>
            <label style={{ marginTop: '10px', display: 'block' }}>Expected Answer:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="e.g., 8"
              style={{ width: '100%', maxWidth: '400px', marginTop: '4px', padding: '5px' }}
            />
            <br />

            <button
              onClick={handleAIGenerate}
              disabled={isGenerating || !taskInput.trim()}
              style={{ background: '#9333ea', color: 'white', marginBottom: '10px', marginTop: '10px' }}
            >
              {isGenerating ? "🤖 Thinking..." : "✨ Generate AI Steps"}
            </button>

            {aiSuggestedSteps && (
              <div style={{ border: '2px dashed #3b82f6', padding: '10px', borderRadius: '8px', marginBottom: '10px', maxWidth: '400px' }}>
                <textarea
                  value={aiSuggestedSteps}
                  onChange={(e) => setAiSuggestedSteps(e.target.value)}
                  rows="4"
                  style={{ width: '100%', color: '#1d4ed8', fontWeight: 'bold', backgroundColor: '#eff6ff' }}
                />
                <button onClick={handleAcceptAI} style={{ background: '#3b82f6', color: 'white', marginTop: '5px', width: '100%' }}>
                  ✅ Accept These Steps
                </button>
              </div>
            )}

            <textarea
              value={stepsInput}
              onChange={(e) => setStepsInput(e.target.value)}
              placeholder="Enter each step on a new line."
              rows="3"
              style={{ width: '100%', maxWidth: '400px', marginTop: '4px' }}
            />
            <br />
          </>
        )}

        <label style={{ marginTop: '8px', display: 'block' }}>Time limit (minutes):</label>
        <input
          type="number"
          min="1"
          value={timeLimitMinutes}
          onChange={(e) => setTimeLimitMinutes(e.target.value)}
          style={{ width: '100px', marginTop: '6px' }}
        />
        <br />

        <button
          onClick={() => (!showSteps ? setShowSteps(true) : handleAddTask())}
          disabled={!taskInput.trim()}
          style={{ marginTop: '10px' }}
        >
          {showSteps ? 'Confirm Task' : 'Add Steps'}
        </button>
      </div>

      <h3>Current Tasks:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #334155', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{task.title}</strong>
              <button 
                onClick={() => handleDeleteTask(task.id)}
                style={{ background: '#ef4444', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              Time: {Math.round(task.timeLimitSeconds/60)} min | Answer: {task.correctAnswer || 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}