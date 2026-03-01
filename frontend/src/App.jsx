import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import EmotionView from './components/EmotionView'; // Keep this one!
import './App.css';

// 1. Create a simple Login Component right inside App.jsx
function Login({ setRole }) {
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="login-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Welcome to Learning Journey 🌟</h2>
      <p>Please select your role to continue:</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button
          onClick={() => handleRoleSelection('teacher')}
          style={{ padding: '20px', fontSize: '18px', cursor: 'pointer', borderRadius: '10px' }}
        >
          👩‍🏫 I am a Teacher
        </button>
        <button
          onClick={() => handleRoleSelection('student')}
          style={{ padding: '20px', fontSize: '18px', cursor: 'pointer', borderRadius: '10px' }}
        >
          🎒 I am a Student
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [points, setPoints] = useState(20);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"] }
  ]);
  
  const [forest, setForest] = useState([]);

  // 🌟 State for emotions lives here
  const [emotions, setEmotions] = useState([]);

  return (
    <Router>
      <div className="app-container">
        
        {role && (
          <header>
            <h1>🌟 Learning Journey</h1>
            <nav>
              {role === 'teacher' && (
                <Link to="/teacher"><button>1. Teacher Mode</button></Link>
              )}
              <Link to="/student"><button>2. Student Mode</button></Link>
              <Link to="/reward"><button>3. My Forest (Rewards)</button></Link>
              <Link to="/emotion"><button>4. Emotion Log</button></Link>
            </nav>
            <div className="points-display">⭐ Stars: {points}</div>
          </header>
        )}

        <main>
          <Routes>
            <Route
              path="/login"
              element={
                !role
                  ? <Login setRole={setRole} />
                  : <Navigate to={role === 'teacher' ? '/teacher' : '/student'} replace />
              }
            />

            <Route
              path="/teacher"
              element={
                role === 'teacher'
                  ? <TeacherView tasks={tasks} setTasks={setTasks} />
                  : <Navigate to={role ? "/student" : "/login"} replace />
              }
            />
            
            <Route
              path="/student"
              element={
                role
                  ? <StudentView tasks={tasks} points={points} setPoints={setPoints} />
                  : <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/reward"
              element={
                role
                  ? <RewardView points={points} setPoints={setPoints} forest={forest} setForest={setForest} />
                  : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/emotion"
              element={
                role
                  ? <EmotionView emotions={emotions} setEmotions={setEmotions} />
                  : <Navigate to="/login" replace />
              }
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
