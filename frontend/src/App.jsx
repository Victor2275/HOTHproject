import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { db } from './firebase'; 
import { collection, onSnapshot, doc } from 'firebase/firestore'; 
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

  const joinAsStudent = () => {
    setRole('student');
    navigate('/student');
  };

  return (
    <div className="setup-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🏫 Start New Learning Session</h2>
      <div style={{ background: 'white', padding: '20px', display: 'inline-block', borderRadius: '10px' }}>
        <QRCodeSVG value={studentJoinUrl} size={256} />
      </div>
      <p style={{ marginTop: '20px' }}>Students: Scan to join the session!</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button
          onClick={startSession}
          style={{ padding: '15px 30px', fontSize: '1.2rem', cursor: 'pointer', background: '#997541', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          Enter Teacher Dashboard →
        </button>
        <button
          onClick={joinAsStudent}
          style={{ padding: '15px 30px', fontSize: '1.2rem', cursor: 'pointer', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
        >
          Join as Student →
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(() => sessionStorage.getItem('taskableRole') || null);
  
  useEffect(() => {
    if (role) sessionStorage.setItem('taskableRole', role);
    else sessionStorage.removeItem('taskableRole');
  }, [role]);

  const [studentName, setStudentName] = useState('');
  
  const [tasks, setTasks] = useState([]); 
  const [forest, setForest] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // FIREBASE REAL-TIME LISTENERS
  useEffect(() => {
    const tasksUnsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      tasksData.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.seconds - b.createdAt.seconds;
      });
      setTasks(tasksData);
    });

    const forestUnsub = onSnapshot(collection(db, "forest"), (snapshot) => {
      setForest(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const emotionsUnsub = onSnapshot(collection(db, "emotions"), (snapshot) => {
      setEmotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const studentsUnsub = onSnapshot(collection(db, "students"), (snapshot) => {
      setStudentsData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const sessionUnsub = onSnapshot(doc(db, "session", "status"), (docSnap) => {
      if (docSnap.exists()) {
        setIsSessionActive(docSnap.data().isActive);
      }
    });

    return () => {
      tasksUnsub();
      forestUnsub();
      emotionsUnsub();
      studentsUnsub();
      sessionUnsub();
    };
  }, []);

  const classStars = studentsData.reduce((acc, curr) => acc + (curr.points || 0), 0);
  const myPoints = studentsData.find(s => s.id === studentName)?.points || 0;

  const handleLogout = () => {
    setRole(null);
    setStudentName('');
  };

  return (
    <Router>
      <div className="app-container">
        {role === 'teacher' && (
          <header>
            <h1>🌟 TaskAble (Teacher View)</h1>
            <nav>
              <Link to="/teacher"><button style={{ marginRight: '10px', marginLeft: '10px' }}>Dashboard</button></Link>
              <Link to="/reward"><button style={{ marginRight: '10px'}}>Student Rewards</button></Link>
              <Link to="/emotion"><button style={{ marginRight: '10px'}}>Student Emotion Log</button></Link>
              <Link to="/"><button onClick={handleLogout} style={{ background: '#ef4444' }}>Exit</button></Link>
            </nav>
            <div className="points-display">⭐ Total Class Stars: {classStars}</div>
          </header>
        )}

        {role === 'student' && window.location.pathname !== '/' && (
          <header>
            <h1 style={{ textAlign: 'center' }}>🎒TaskAble</h1>
            <nav>
              <Link to="/student"><button style={{ marginRight: '10px', marginLeft: '10px' }}>My Tasks</button></Link>
              <Link to="/reward"><button style={{ marginRight: '10px'}}>My Reward Chart</button></Link>
              <Link to="/emotion"><button style={{ marginRight: '10px'}}>My Mood</button></Link>
              <Link to="/"><button onClick={handleLogout} style={{ background: '#ef4444' }}>Leave Class</button></Link>
            </nav>
            <div className="points-display">⭐ My Stars: {studentName ? myPoints : 0}</div>
          </header>
        )}

        <main>
          <Routes>
            <Route path="/" element={<SessionSetup setRole={setRole} />} />
            
            <Route
              path="/teacher"
              element={
                role === 'teacher'
                  ? <TeacherView tasks={tasks} studentsData={studentsData} isSessionActive={isSessionActive} />
                  : <Navigate to="/" replace />
              }
            />
            
            <Route
              path="/student"
              element={
                role === 'teacher' ? (
                  <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
                    <h2>Teachers cannot complete tasks.</h2>
                    <p>Please use the Teacher Dashboard, or click Exit to join as a student.</p>
                  </div>
                ) : (
                  <StudentView
                    tasks={tasks}
                    studentsData={studentsData}
                    studentName={studentName}
                    setStudentName={setStudentName}
                    isSessionActive={isSessionActive}
                  />
                )
              }
            />
            
            <Route
              path="/reward"
              element={<RewardView studentsData={studentsData} forest={forest} studentName={studentName} role={role} />}
            />

            <Route
              path="/emotion"
              element={<EmotionView emotions={emotions} tasks={tasks} studentsData={studentsData} studentName={studentName} role={role} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}