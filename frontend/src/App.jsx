import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import EmotionView from './components/EmotionView';
import './App.css';

export default function App() {
  // We no longer need the activeTab state
  const [points, setPoints] = useState(20); // Starting with 20 points for testing
  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"] }
  ]);

  return (
    // Wrap the application in a Router
    <Router>
      <div className="app-container">
        <header>
          <h1>🌟 Learning Journey</h1>
          <nav>
            {/* Replace buttons with Links to update the URL */}
            <Link to="/teacher"><button>1. Teacher Mode</button></Link>
            <Link to="/student"><button>2. Student Mode</button></Link>
            <Link to="/reward"><button>3. My Forest (Rewards)</button></Link>
            <Link to="/emotion"><button>4. Emotion Log</button></Link>
          </nav>
          <div className="points-display">⭐ Stars: {points}</div>
        </header>

        <main>
          {/* Use Routes to define which component loads for each URL path */}
          <Routes>
            <Route path="/teacher" element={<TeacherView tasks={tasks} setTasks={setTasks} />} />
            <Route path="/student" element={<StudentView tasks={tasks} points={points} setPoints={setPoints} />} />
            <Route path="/reward" element={<RewardView points={points} setPoints={setPoints} />} />
            <Route path="/emotion" element={<EmotionView />} />
            
            {/* Setup a default route to load when the app starts */}
            <Route path="/" element={<RewardView points={points} setPoints={setPoints} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}