import React from 'react';

export default function StudentView({ tasks, points }) {
  // Grab the latest task added by the teacher
  const task = tasks[tasks.length - 1];

  if (!task) return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎒 Student Display</h2>
      <p>Waiting for the teacher to assign a task...</p>
    </div>
  );

  return (
    <div className="student-view" style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#38bdf8' }}>
        ⭐ Total Stars: {points}
      </div>
      
      <div className="task-card" style={{ border: '2px solid #38bdf8', borderRadius: '15px', padding: '20px' }}>
        <h2 style={{ color: '#fff' }}>Current Lesson: {task.title}</h2>
        <div className="steps-list" style={{ textAlign: 'left', display: 'inline-block', marginTop: '20px' }}>
          {task.steps.map((step, index) => (
            <div 
              key={index} 
              className="step-box" 
              style={{ 
                fontSize: '1.4rem', 
                margin: '10px 0', 
                padding: '15px', 
                background: '#1e293b', 
                borderRadius: '8px',
                borderLeft: '5px solid #38bdf8'
              }}
            >
              <strong>Step {index + 1}:</strong> {step}
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#94a3b8' }}>
        This is a View-Only screen. Please follow along with your teacher.
      </p>
    </div>
  );
}