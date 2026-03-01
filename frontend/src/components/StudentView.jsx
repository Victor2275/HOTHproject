import React, { useState, useEffect } from 'react';

export default function StudentView({ tasks, points }) {
  const [remaining, setRemaining] = useState({}); // map of taskId -> seconds remaining

  // Initialize remaining times for newly added tasks
  useEffect(() => {
    setRemaining(prev => {
      const next = { ...prev };
      tasks.forEach(t => {
        if (t.timeLimitSeconds && !(t.id in next)) {
          next[t.id] = t.timeLimitSeconds;
        }
      });
      return next;
    });
  }, [tasks]);

  // Global interval to decrement timers every second
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

  function formatTime(sec) {
    if (sec == null) return '—';
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  if (!tasks || tasks.length === 0) return (
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

      <div style={{ display: 'grid', gap: '18px' }}>
        {tasks.map(task => (
          <div key={task.id} className="task-card" style={{ border: '2px solid #38bdf8', borderRadius: '15px', padding: '20px', background: '#0b1220' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: '#fff', margin: 0 }}>{task.title}</h2>
              <div style={{ color: '#fde68a', fontWeight: '700' }}>{formatTime(remaining[task.id])}</div>
            </div>

            <div className="steps-list" style={{ textAlign: 'left', display: 'block', marginTop: '14px' }}>
              {task.steps.map((step, index) => (
                <div
                  key={index}
                  className="step-box"
                  style={{
                    fontSize: '1.1rem',
                    margin: '8px 0',
                    padding: '12px',
                    background: '#1e293b',
                    borderRadius: '8px',
                    borderLeft: '5px solid #38bdf8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div><strong>Step {index + 1}:</strong> {step}</div>
                  <div style={{ color: '#93c5fd', fontWeight: '600' }}>{formatTime(remaining[task.id])}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '18px', fontStyle: 'italic', color: '#94a3b8' }}>
        This screen shows remaining time for each task and its steps.
      </p>
    </div>
  );
}