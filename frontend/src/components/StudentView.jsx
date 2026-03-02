import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { db } from '../firebase'; // Ensure correct path
import { doc, updateDoc, increment } from 'firebase/firestore'; // For updating points/stars

// 8 simple math tasks for testing
const SAMPLE_TASKS = [
  { id: 'sample1', title: 'Solve 5 + 3', steps: ['Hold up 5 fingers', 'Hold up 3 fingers', 'Count them all'], timeLimitSeconds: 60, correctAnswer: '8' },
  { id: 'sample2', title: 'What color is the sky?', steps: ['Look out the window', 'Think about daytime'], timeLimitSeconds: 60, correctAnswer: 'blue' },
  { id: 'sample3', title: 'How many legs does a dog have?', steps: ['Look at a picture of a dog', 'Count the legs 1, 2, 3, 4'], timeLimitSeconds: 60, correctAnswer: '4' },
  { id: 'sample4', title: 'Solve 2 + 2', steps: ['Hold up 2 fingers on one hand', 'Hold up 2 fingers on the other', 'Count them together'], timeLimitSeconds: 60, correctAnswer: '4' },
  { id: 'sample5', title: 'Solve 10 - 1', steps: ['Hold up all 10 fingers', 'Put 1 finger down', 'Count how many are left'], timeLimitSeconds: 60, correctAnswer: '9' },
  { id: 'sample6', title: 'Solve 3 + 1', steps: ['Start with 3', 'Count up 1 more number'], timeLimitSeconds: 60, correctAnswer: '4' },
  { id: 'sample7', title: 'Solve 4 + 4', steps: ['Think of a spider', 'Count 4 legs on one side', 'Count 4 legs on the other'], timeLimitSeconds: 60, correctAnswer: '8' },
  { id: 'sample8', title: 'Solve 5 - 2', steps: ['Hold up 5 fingers', 'Put 2 fingers down', 'Count the standing fingers'], timeLimitSeconds: 60, correctAnswer: '3' }
];

export default function StudentView({ tasks, points, setPoints }) {
  // Combine static samples with real-time Firebase tasks
  const displayTasks = [...SAMPLE_TASKS, ...(tasks || [])];

  const [remaining, setRemaining] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Initialize and update remaining times when displayTasks change
  useEffect(() => {
    setRemaining(prev => {
      const next = { ...prev };
      displayTasks.forEach(t => {
        if (t.timeLimitSeconds && !(t.id in next)) {
          next[t.id] = t.timeLimitSeconds;
        }
      });
      return next;
    });
  }, [displayTasks]);

  // Global interval to decrement timers
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(prev => {
        const next = { ...prev };
        let changed = false;
        Object.keys(next).forEach(k => {
          if (next[k] > 0) {
            next[k] = next[k] - 1;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const currentTask = displayTasks[currentIndex];

  // Auto-skip when timer hits zero
  useEffect(() => {
    if (currentTask && remaining[currentTask.id] === 0) {
      handleNext();
    }
  }, [remaining, currentTask]);

  function formatTime(sec) {
    if (sec == null) return '—';
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function handleNext() {
    setFeedback(null);
    setAnswer('');
    if (currentIndex < displayTasks.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  }

  function triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#4ade80', '#fde68a']
    });
  }

  function handleSubmit() {
    if (!currentTask.correctAnswer) {
      triggerConfetti();
      setFeedback({ text: "Good job!", color: '#4ade80' });
      setPoints(prev => prev + 10);
      setTimeout(() => handleNext(), 1500);
      return;
    }

    if (answer.trim().toLowerCase() === currentTask.correctAnswer.toLowerCase()) {
      triggerConfetti();
      setFeedback({ text: "That's Correct!", color: '#4ade80' });
      setPoints(prev => prev + 10); // Award stars locally
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback({ text: "Try again!", color: '#f87171' });
      setAnswer('');
      setTimeout(() => setFeedback(null), 2000);
    }
  }

  if (!currentTask) return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎒 Student Display</h2>
      <p>Waiting for tasks...</p>
    </div>
  );

  return (
    <div className="student-view" style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#38bdf8' }}>
        ⭐ Total Stars: {points}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="task-card" style={{ width: '100%', maxWidth: '600px', border: '2px solid #38bdf8', borderRadius: '15px', padding: '20px', background: '#0b1220' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#fff', margin: 0 }}>{currentTask.title}</h2>
            <div style={{ color: '#fde68a', fontWeight: '700', fontSize: '1.2rem' }}>
              ⏳ {formatTime(remaining[currentTask.id])}
            </div>
          </div>

          <div className="steps-list" style={{ textAlign: 'left', display: 'block', marginTop: '14px' }}>
            {currentTask.steps && currentTask.steps.map((step, index) => (
              <div
                key={index}
                className="step-box"
                style={{
                  fontSize: '1.1rem', margin: '8px 0', padding: '12px', background: '#1e293b',
                  borderRadius: '8px', borderLeft: '5px solid #38bdf8', color: '#fff'
                }}
              >
                <strong>Step {index + 1}:</strong> {step}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#1e293b', borderRadius: '10px', textAlign: 'left' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Your Answer:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={{ padding: '10px', borderRadius: '5px', border: 'none', flex: 1, fontSize: '1rem' }}
                placeholder="Type your answer here..."
              />
              <button
                onClick={handleSubmit}
                style={{ padding: '10px 20px', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Submit
              </button>
            </div>
            
            {feedback && (
              <div style={{ marginTop: '10px', color: feedback.color, fontWeight: 'bold', fontSize: '1.1rem' }}>
                {feedback.text}
              </div>
            )}
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <button
            onClick={handleNext}
            style={{
              background: '#4ade80', color: '#0f172a', fontWeight: 'bold',
              border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer'
            }}
          >
            Skip to Next ⏭️
          </button>
        </div>
      </div>

      <p style={{ marginTop: '25px', fontStyle: 'italic', color: '#94a3b8' }}>
        Question {currentIndex + 1} of {displayTasks.length}
      </p>
    </div>
  );
}