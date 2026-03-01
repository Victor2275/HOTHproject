import { useState } from 'react';

export default function TeacherView({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(5);

  const handleAddTask = () => {
    if (!taskInput) return;

    // split manual steps by newline if provided, otherwise fall back to mock steps
    let steps;
    if (stepsInput.trim()) {
      steps = stepsInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
    } else {
      // In a full app, this is where you'd call an AI API to break down the task.
      // Here we create mock steps for demonstration.
      steps = [
        "Read the problem carefully.",
        "Identify the numbers.",
        "Solve the problem.",
        "Check your work."
      ];
    }

    const newTask = {
      id: Date.now(),
      title: taskInput,
      steps,
      // store time limit in seconds
      timeLimitSeconds: Number(timeLimitMinutes) * 60
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setStepsInput('');
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
          <label style={{ marginTop: '8px', display: 'block' }}>Optional breakdown steps (one per line):</label>
          <textarea
            value={stepsInput}
            onChange={(e) => setStepsInput(e.target.value)}
            placeholder="Enter each step on a new line."
            rows="3"
            style={{ width: '100%', maxWidth: '400px', marginTop: '4px' }}
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
        <button onClick={handleAddTask} style={{ marginTop: '10px' }}>
          Add Task
        </button>
      </div>

      <h3>Current Tasks:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            {task.title} - Time: {task.timeLimitSeconds ? Math.round(task.timeLimitSeconds/60) + ' min' : '—'}
            {task.steps && task.steps.length > 0 && (
              <ul style={{ marginTop: '4px', marginLeft: '16px' }}>
                {task.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
