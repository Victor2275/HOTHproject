import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Import QR library
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import EmotionView from './components/EmotionView';
import './App.css';

// Initial Session/QR Code screen
function SessionSetup({ setRole }) {
  const navigate = useNavigate();
  // In a real app, this URL would point to your hosted student page
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
        style={{ padding: '15px 30px', fontSize: '1.2rem', marginTop: '30px' }}
      >
        Enter Teacher Dashboard →
      </button>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [points, setPoints] = useState(1000);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"], timeLimitSeconds: 180 }
  ]);
  const [forest, setForest] = useState([]);
  const [emotions, setEmotions] = useState([]);

  return (
    <Router>
      <div className="app-container">
        
        {/* TEACHER NAVIGATION */}
        {role === 'teacher' && (
          <header>
            <h1>🌟 Learning Journey (Teacher)</h1>
            <nav>
              <Link to="/teacher"><button>Dashboard</button></Link>
              <Link to="/reward"><button>Forest View</button></Link>
              <Link to="/emotion"><button>Emotion Logs</button></Link>
            </nav>
            <div className="points-display">⭐ Class Stars: {points}</div>
          </header>
        )}

        {/* STUDENT NAVIGATION (Shows up if they bypass the teacher screen) */}
        {role !== 'teacher' && window.location.pathname !== '/' && (
          <header>
            <h1>🎒 My Learning</h1>
            <nav>
              <Link to="/student"><button>My Tasks</button></Link>
              <Link to="/reward"><button>My Forest</button></Link>
            </nav>
            <div className="points-display">⭐ My Stars: {points}</div>
          </header>
        )}

        <main>
          <Routes>
            {/* Start page is now Session Setup */}
            <Route path="/" element={<SessionSetup setRole={setRole} />} />
            
            <Route
              path="/teacher"
              element={
                role === 'teacher'
                  ? <TeacherView tasks={tasks} setTasks={setTasks} />
                  : <Navigate to="/" replace />
              }
            />
            
            {/* ADDED: setPoints and setEmotions so the student can actually use them! */}
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
              element={<EmotionView emotions={emotions} setEmotions={setEmotions} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
