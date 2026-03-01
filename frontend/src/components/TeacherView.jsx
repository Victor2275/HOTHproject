import { useState } from 'react';

export default function TeacherView({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(1); // Set default to 1 minute
  const [showSteps, setShowSteps] = useState(false);
  
  // New AI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestedSteps, setAiSuggestedSteps] = useState('');

  // 🤖 AI GENERATION FUNCTION
  const handleAIGenerate = async () => {
    if (!taskInput.trim()) return;
    setIsGenerating(true);
    setAiSuggestedSteps('');
    
    const prompt = `Generate some recommended steps for solving this question: "${taskInput}" as if a 5 year old with special needs would need.`;
    
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mocked AI Response
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
    setAiSuggestedSteps(''); // Clear the suggestion box
  };

  const handleAddTask = () => {
    if (!taskInput) return;

    let steps = [];
    if (stepsInput.trim()) {
      steps = stepsInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
    }

    const newTask = {
      id: Date.now(),
      title: taskInput,
      steps,
      correctAnswer: correctAnswer.trim(),
      timeLimitSeconds: Number(timeLimitMinutes) * 60
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setStepsInput('');
    setCorrectAnswer('');
    setShowSteps(false);
    setAiSuggestedSteps('');
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
            <label style={{ marginTop: '10px', display: 'block' }}>Expected Answer (Used to grade student):</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="e.g., 8"
              style={{ width: '100%', maxWidth: '400px', marginTop: '4px', padding: '5px' }}
            />
            <br />

            <label style={{ marginTop: '15px', display: 'block' }}>Optional breakdown steps (one per line):</label>
            
            {/* AI GENERATOR BUTTON */}
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating || !taskInput.trim()}
              style={{ background: '#9333ea', color: 'white', marginBottom: '10px' }}
            >
              {isGenerating ? "🤖 Thinking..." : "✨ Generate AI Steps"}
            </button>

            {/* AI SUGGESTION BLOCK (BLUE FONT) */}
            {aiSuggestedSteps && (
              <div style={{ border: '2px dashed #3b82f6', padding: '10px', borderRadius: '8px', marginBottom: '10px', maxWidth: '400px' }}>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#3b82f6' }}>AI Suggestion (Edit if needed):</p>
                <textarea
                  value={aiSuggestedSteps}
                  onChange={(e) => setAiSuggestedSteps(e.target.value)}
                  rows="4"
                  style={{ width: '100%', color: '#1d4ed8', fontWeight: 'bold', backgroundColor: '#eff6ff' }}
                />
                <button
                  onClick={handleAcceptAI}
                  style={{ background: '#3b82f6', color: 'white', marginTop: '5px', width: '100%' }}
                >
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
          onClick={() => {
            if (!showSteps) {
              setShowSteps(true);
            } else {
              handleAddTask();
            }
          }}
          disabled={!taskInput.trim()}
          style={{ marginTop: '10px' }}
        >
          {showSteps ? 'Confirm Task' : 'Add Steps'}
        </button>
      </div>

      <h3>Current Tasks:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            {task.title} - Time: {task.timeLimitSeconds ? Math.round(task.timeLimitSeconds/60) + ' min' : '—'}
            {task.correctAnswer && ` - Answer: ${task.correctAnswer}`}
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
