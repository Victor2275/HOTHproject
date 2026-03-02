import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { db } from './firebase'; // Ensure you have created this file
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
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
  const [tasks, setTasks] = useState([]); // Now synced with Firestore
  const [forest, setForest] = useState([]);
  const [emotions, setEmotions] = useState([]);

  // Real-time listener for tasks
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id, // Firestore document ID
        ...doc.data()
      }));
      setTasks(taskData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container">
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

        {role !== 'teacher' && window.location.pathname !== '/' && (
          <header>
            <h1>🎒 My Learning</h1>
            <nav>
              <Link to="/student"><button>My Tasks</button></Link>
              <Link to="/reward"><button>My Forest</button></Link>
              <Link to="/emotion"><button>My Mood</button></Link>
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
                  ? <TeacherView tasks={tasks} />
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
              element={<EmotionView emotions={emotions} setEmotions={setEmotions} tasks={tasks} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}