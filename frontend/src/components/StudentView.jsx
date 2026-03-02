import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const SAMPLE_TASKS = [
  { id: 'sample1', title: 'Solve 5 + 3', steps: ['Hold up 5 fingers', 'Hold up 3 fingers', 'Count them all'], timeLimitSeconds: 60 },
  { id: 'sample2', title: 'What color is the sky?', steps: ['Look out the window', 'Think about daytime'], timeLimitSeconds: 60 },
  { id: 'sample3', title: 'How many legs does a dog have?', steps: ['Look at a picture of a dog', 'Count the legs 1, 2, 3, 4'], timeLimitSeconds: 60 },
  { id: 'sample4', title: 'Solve 2 + 2', steps: ['Hold up 2 fingers on one hand', 'Hold up 2 fingers on the other', 'Count them together'], timeLimitSeconds: 60 },
  { id: 'sample5', title: 'Solve 10 - 1', steps: ['Hold up all 10 fingers', 'Put 1 finger down', 'Count how many are left'], timeLimitSeconds: 60 },
  { id: 'sample6', title: 'Solve 3 + 1', steps: ['Start with 3', 'Count up 1 more number'], timeLimitSeconds: 60 },
  { id: 'sample7', title: 'Solve 4 + 4', steps: ['Think of a spider', 'Count 4 legs on one side', 'Count 4 legs on the other'], timeLimitSeconds: 60 },
  { id: 'sample8', title: 'Solve 5 - 2', steps: ['Hold up 5 fingers', 'Put 2 fingers down', 'Count the standing fingers'], timeLimitSeconds: 60 }
];

export default function StudentView({ tasks, points, setPoints }) {
  // Merges the default sample tasks with the ones dynamically pulled from Firebase
  const displayTasks = [...SAMPLE_TASKS, ...(tasks || [])];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentTask = displayTasks[currentIndex];

  useEffect(() => {
    if (currentTask && currentTask.timeLimitSeconds) {
      setTimeLeft(currentTask.timeLimitSeconds);
    } else {
      setTimeLeft(null);
    }
  }, [currentIndex, currentTask]);

  useEffect(() => {
    if (isFinished) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev > 0) return prev - 1;
        return 0;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isFinished]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      handleNext(); // Skips to next WITHOUT giving a star
    }
  }, [timeLeft, isFinished]);

  function formatTime(sec) {
    if (sec == null) return '—';
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function handleNext() {
    if (currentIndex < displayTasks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handleCompleteTask() {
    triggerConfetti();
    setPoints(prev => prev + 1); // Awards exactly 1 star
    
    setTimeout(() => {
      handleNext();
    }, 1200);
  }

  function triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#4ade80', '#fde68a']
    });
  }

  if (isFinished) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
        <h2>🎉 Fantastic Job! 🎉</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>You have completed all your tasks for today.</p>
        <div style={{ fontSize: '2rem', marginTop: '20px', color: '#fde68a', fontWeight: 'bold' }}>
          ⭐ Total Stars Earned: {points}
        </div>
        <button
          onClick={() => {
            setIsFinished(false);
            setCurrentIndex(0);
          }}
          style={{ marginTop: '40px', padding: '10px 20px', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          Start Over 🔁
        </button>
      </div>
    );
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
            <div style={{ color: '#ef4444', fontWeight: '700', fontSize: '1.4rem' }}>
              ⏳ {formatTime(timeLeft)}
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

          <div style={{ marginTop: '30px' }}>
            <button
              onClick={handleCompleteTask}
              style={{ padding: '15px 30px', fontSize: '1.2rem', background: '#4ade80', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
            >
              I Did It! 🌟 (Next Task)
            </button>
          </div>
        </div>
      </div>

      <p style={{ marginTop: '25px', fontStyle: 'italic', color: '#94a3b8' }}>
        Question {currentIndex + 1} of {displayTasks.length}
      </p>
    </div>
  );
}