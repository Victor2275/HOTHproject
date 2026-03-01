import { useState } from 'react';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('reward');
  const [points, setPoints] = useState(20);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"] }
  ]);
  
  // 🌟 ADDED: The forest state now lives here so it never gets deleted!
  const [forest, setForest] = useState([]);

  return (
    <div className="app-container">
      <header>
        <h1>🌟 Learning Journey</h1>
        <nav>
          <button onClick={() => setActiveTab('teacher')}>1. Teacher Mode</button>
          <button onClick={() => setActiveTab('student')}>2. Student Mode</button>
          <button onClick={() => setActiveTab('reward')}>3. My Forest (Rewards)</button>
        </nav>
        <div className="points-display">⭐ Stars: {points}</div>
      </header>

      <main>
        {activeTab === 'teacher' && <TeacherView tasks={tasks} setTasks={setTasks} />}
        {activeTab === 'student' && <StudentView tasks={tasks} points={points} setPoints={setPoints} />}
        
        {/* 🌟 ADDED: Passing forest and setForest into the RewardView */}
        {activeTab === 'reward' && (
          <RewardView
            points={points}
            setPoints={setPoints}
            forest={forest}
            setForest={setForest}
          />
        )}
      </main>
    </div>
  );
}
