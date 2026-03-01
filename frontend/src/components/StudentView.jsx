
import { useState } from 'react';

export default function StudentView({ tasks, points, setPoints }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMoodWheel, setShowMoodWheel] = useState(false);

  // Grab the first task for this demo
  const task = tasks[0];

  const handleCompleteStep = () => {
    if (currentStep < task.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowMoodWheel(true);
      setPoints(points + 10); // Reward the child for finishing!
    }
  };

  const handleMoodSelect = (mood) => {
    alert(`You felt ${mood}! Great job finishing your task. Go check your Forest!`);
    setShowMoodWheel(false);
    setCurrentStep(0); // reset for next time
  };

  if (!task) return <p>No tasks available! Ask the teacher to add one.</p>;

  return (
    <div className="student-view" style={{ textAlign: 'center' }}>
      <h2>🎒 Student Task</h2>
      
      {!showMoodWheel ? (
        <div className="task-card">
          <h3>Task: {task.title}</h3>
          <div className="step-box" style={{ fontSize: '1.5rem', margin: '20px', padding: '20px', background: '#fff9c4', borderRadius: '10px' }}>
            <strong>Step {currentStep + 1}:</strong> {task.steps[currentStep]}
          </div>
          <button onClick={handleCompleteStep} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
            I did it! ✅
          </button>
        </div>
      ) : (
        <div className="mood-wheel">
          <h3>How did this task make you feel?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button onClick={() => handleMoodSelect('Happy')} style={{ fontSize: '3rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>😀</button>
            <button onClick={() => handleMoodSelect('Okay')} style={{ fontSize: '3rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>😐</button>
            <button onClick={() => handleMoodSelect('Frustrated')} style={{ fontSize: '3rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>😤</button>
          </div>
        </div>
      )}
    </div>
  );
}
