import { useState } from 'react';

export default function TeacherView({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5);

  const handleBreakdown = () => {
    if (!taskInput) return;
    
    // In a full app, this is where you'd call an AI API to break down the task.
    // Here we create mock steps for demonstration.
    const newTask = {
      id: Date.now(),
      title: taskInput,
      steps: ["Read the problem carefully.", "Identify the numbers.", "Solve the problem.", "Check your work."],
      // store time limit in seconds
      timeLimitSeconds: Number(timeLimitMinutes) * 60
    };
    
    setTasks([...tasks, newTask]);
    setTaskInput('');
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
          <label style={{ marginTop: '8px', display: 'block' }}>Time limit (minutes):</label>
          <input
            type="number"
            min="1"
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(e.target.value)}
            style={{ width: '100px', marginTop: '6px' }}
          />
        <br />
        <button onClick={handleBreakdown} style={{ marginTop: '10px' }}>
          Break Down into Steps
        </button>
      </div>

      <h3>Current Tasks:</h3>
      <ul>
        {tasks.map(task => (
            <li key={task.id}>{task.title} (Has {task.steps.length} steps) - Time: {task.timeLimitSeconds ? Math.round(task.timeLimitSeconds/60) + ' min' : '—'}</li>
        ))}
      </ul>
    </div>
  );
}
