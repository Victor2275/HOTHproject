import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import RewardView from './components/RewardView';
import EmotionView from './components/EmotionView';
import './App.css';

// 1. Create a simple Login Component right inside App.jsx
function Login({ setRole }) {
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Lock in the role
    // Send the user to their respective dashboard
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
  // 2. Start with 'null' so the app knows the user hasn't chosen yet
  const [role, setRole] = useState(null); 
  const [points, setPoints] = useState(20);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Basic Math", steps: ["Read the numbers", "Add them together", "Write the answer"] }
  ]);

  return (
    <Router>
      <div className="app-container">
        
        {/* 3. Hide the entire header & navigation if the user hasn't logged in */}
        {role && (
          <header>
            <h1>🌟 Learning Journey</h1>
            <nav>
              {/* Only show Teacher Mode button to teachers */}
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
            {/* The Login Page Route */}
            <Route 
              path="/login" 
              element={
                !role 
                  ? <Login setRole={setRole} /> 
                  : <Navigate to={role === 'teacher' ? '/teacher' : '/student'} replace />
              } 
            />

            {/* PROTECTED ROUTE: Teacher View */}
            <Route 
              path="/teacher" 
              element={
                role === 'teacher' 
                  ? <TeacherView tasks={tasks} setTasks={setTasks} /> 
                  : <Navigate to={role ? "/student" : "/login"} replace /> // Bounce back to student or login
              } 
            />
            
            {/* PROTECTED ROUTES: Student Views (Require ANY role to view) */}
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
                  ? <RewardView points={points} setPoints={setPoints} /> 
                  : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/emotion" 
              element={
                role 
                  ? <EmotionView /> 
                  : <Navigate to="/login" replace />
              } 
            />
            
            {/* 4. Default Route: Redirect to Login automatically */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}