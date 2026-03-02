import { useState, useEffect } from 'react'; // <-- Added useEffect here
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import EmotionView from './components/EmotionView';
import './App.css';

function SessionSetup({ setRole }) {
  const navigate = useNavigate();
  const studentJoinUrl = `${window.location.origin}/student`;

  const startSession = () => {
    setRole('teacher');
    navigate('/teacher');
  };

  return (
    <div className="setup-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🏫 Start New Learning Session</h2>
      <div style={{ background: 'white', padding: '20px', display: 'inline-block', borderRadius: '10px' }}>
        <QRCodeSVG value={studentJoinUrl} size={256} />
      </div>
      <p style={{ marginTop: '20px' }}>Students: Scan to join the session!</p>
      <button
        onClick={startSession}
        style={{ padding: '15px 30px', fontSize: '1.2rem', marginTop: '30px', cursor: 'pointer' }}
      >
        Enter Teacher Dashboard →
      </button>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  
  // Load points from local storage, or start at 0 if no saved points exist
  const [points, setPoints] = useState(() => {
    const savedStars = localStorage.getItem('taskableStars');
    return savedStars !== null ? parseInt(savedStars, 10) : 0; // Starts at 0 instead of 1000
  });

  // Automatically save points to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('taskableStars', points.toString());
  }, [points]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"], timeLimitSeconds: 180 }
  ]);
  const [forest, setForest] = useState([]);
  const [emotions, setEmotions] = useState([]);

  return (
    <Router>
      <div className="app-container">
        {role === 'teacher' && (
          <header>
            <h1>🌟 TaskAble (Teacher View)</h1>
            <nav>
              <a href="/teacher">
                <button style={{ marginRight: '10px', marginLeft: '10px' }}>
                  Student Tasks
                </button>
              </a>
              <a href="/reward">
                <button style={{ marginRight: '10px'}}>
                  Student Reward
                </button>
              </a>
              <a href="/emotion">
                <button>Student Emotion Log</button>
              </a>
            </nav>
            <div className="points-display">⭐ Class Stars: {points}</div>
          </header>
        )}

        {role !== 'teacher' && window.location.pathname !== '/' && (
          <header>
            <h1>🎒 My Learning</h1>
            <nav>
              <a href="/student"><button>My Tasks</button></a>
              <a href="/reward"><button>My Reward Chart</button></a>
              <a href="/emotion"><button>My Mood</button></a>
            </nav>
            <div className="points-display">⭐ My Stars: {points}</div>
          </header>
        )}

        <main>
          <Routes>
            <Route path="/" element={<SessionSetup setRole={setRole} />} />
            
            <Route
              path="/teacher"
              element={
                role === 'teacher'
                  ? <TeacherView tasks={tasks} setTasks={setTasks} />
                  : <Navigate to="/" replace />
              }
            />
            
            <Route
              path="/student"
              element={
                <StudentView
                  tasks={tasks}
                  points={points}
                  setPoints={setPoints}
                  setEmotions={setEmotions}
                />
              }
            />
            
            <Route
              path="/reward"
              element={<RewardView points={points} setPoints={setPoints} forest={forest} setForest={setForest} />}
            />

            <Route
              path="/emotion"
              // Pass tasks here so the student can select them!
              element={<EmotionView emotions={emotions} setEmotions={setEmotions} tasks={tasks} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
