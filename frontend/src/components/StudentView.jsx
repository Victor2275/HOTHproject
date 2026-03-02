import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SAMPLE_TASKS = [
  { id: 'sample1', title: 'Solve 5 + 3', steps: ['Hold up 5 fingers', 'Hold up 3 fingers', 'Count them all'], timeLimitSeconds: 60 }
];

export default function StudentView({ tasks, studentsData, studentName, setStudentName, isSessionActive }) {
  const displayTasks = [...SAMPLE_TASKS, ...(tasks || [])];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  
  // Login States
  const [selectedExisting, setSelectedExisting] = useState('');
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [tempName, setTempName] = useState('');

  const currentTask = displayTasks[currentIndex];
  const points = studentsData.find(s => s.id === studentName)?.points || 0;

  useEffect(() => {
    if (currentTask && currentTask.timeLimitSeconds) {
      setTimeLeft(currentTask.timeLimitSeconds);
    } else {
      setTimeLeft(null);
    }
  }, [currentIndex, currentTask]);

  useEffect(() => {
    if (isFinished || !isSessionActive) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev > 0) return prev - 1;
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isFinished, isSessionActive]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      handleNext();
    }
  }, [timeLeft, isFinished]);

  const handleJoinClass = async () => {
    let nameToJoin = isNewStudent ? tempName.trim() : selectedExisting;

    if (nameToJoin && nameToJoin !== 'NEW') {
      const docRef = doc(db, "students", nameToJoin);
      const docSnap = await getDoc(docRef);
      // Initialize if new student
      if (!docSnap.exists()) {
        await setDoc(docRef, { name: nameToJoin, points: 0 });
      }
      setStudentName(nameToJoin);
    }
  };

  // 1. Show Login Screen if no student is selected
  if (!studentName) {
    const isJoinDisabled = (!isNewStudent && !selectedExisting) || (isNewStudent && !tempName.trim());

    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
        <h2>👋 Welcome to TaskAble!</h2>
        <p style={{ marginBottom: '20px' }}>Please select your name or add a new one to join the class.</p>
        
        <select 
          value={selectedExisting} 
          onChange={(e) => {
            if (e.target.value === 'NEW') {
              setIsNewStudent(true);
              setSelectedExisting('NEW');
            } else {
              setIsNewStudent(false);
              setSelectedExisting(e.target.value);
            }
          }}
          style={{ padding: '10px', fontSize: '1.2rem', borderRadius: '5px', marginBottom: '15px', cursor: 'pointer' }}
        >
          <option value="" disabled>Select your name...</option>
          {studentsData.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          <option value="NEW">+ Add New Student</option>
        </select>
        
        <br/>

        {isNewStudent && (
          <input 
            type="text" 
            value={tempName} 
            onChange={e => setTempName(e.target.value)} 
            placeholder="Enter First Name" 
            style={{ padding: '10px', fontSize: '1.2rem', borderRadius: '5px', marginTop: '10px' }}
          />
        )}
        <br/>
        
        <button 
          onClick={handleJoinClass}
          disabled={isJoinDisabled}
          style={{ 
            marginTop: '20px', padding: '10px 20px', 
            background: isJoinDisabled ? '#94a3b8' : '#38bdf8', 
            border: 'none', borderRadius: '5px', 
            cursor: isJoinDisabled ? 'not-allowed' : 'pointer', 
            fontSize: '1.1rem', fontWeight: 'bold' 
          }}
        >
          Join Class
        </button>
      </div>
    );
  }

  // 2. Show Wait Screen if teacher hasn't pressed start yet
  if (!isSessionActive) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
        <h2>⏳ Please Wait</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>Your teacher hasn't started the tasks yet.</p>
        <div className="spinner" style={{ marginTop: '30px', fontSize: '3rem' }}>🧘‍♂️</div>
        <p style={{ color: '#ffffff', marginTop: '20px' }}>Get ready! Tasks will appear here as soon as the session begins.</p>
      </div>
    );
  }

  function formatTime(sec) {
    if (sec == null) return '—';
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function handleNext() {
    if (currentIndex < displayTasks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  async function handleCompleteTask() {
    triggerConfetti();
    await setDoc(doc(db, "students", studentName), { points: points + 1 }, { merge: true });
    
    setTimeout(() => {
      handleNext();
    }, 1200);
  }

  function triggerConfetti() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#38bdf8', '#4ade80', '#fde68a'] });
  }

  // 3. Show Finish Screen
  if (isFinished) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
        <h2>🎉 Fantastic Job, {studentName}! 🎉</h2>
        <div style={{ fontSize: '2rem', marginTop: '20px', color: '#fde68a', fontWeight: 'bold' }}>
          ⭐ Total Stars Earned: {points}
        </div>
        <button
          onClick={() => { setIsFinished(false); setCurrentIndex(0); }}
          style={{ marginTop: '40px', padding: '10px 20px', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          Start Over 🔁
        </button>
      </div>
    );
  }

  // 4. Show Active Task
  if (!currentTask) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>🎒 Student Display</h2><p>Waiting for tasks...</p></div>;

  return (
    <div className="student-view" style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#38bdf8' }}>
        👤 {studentName} | ⭐ Stars: {points}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="task-card" style={{ width: '100%', maxWidth: '600px', border: '2px solid #38bdf8', borderRadius: '15px', padding: '20px', background: '#0b1220' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#fff', margin: 0 }}>{currentTask.title}</h2>
            <div style={{ color: '#ef4444', fontWeight: '700', fontSize: '1.4rem' }}>
              ⏳ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="steps-list" style={{ textAlign: 'left', display: 'block', marginTop: '14px' }}>
            {currentTask.steps && currentTask.steps.map((step, index) => (
              <div
                key={index}
                className="step-box"
                style={{
                  fontSize: '1.1rem', margin: '8px 0', padding: '12px', background: '#1e293b',
                  borderRadius: '8px', borderLeft: '5px solid #38bdf8', color: '#fff'
                }}
              >
                <strong>Step {index + 1}:</strong> {step}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px' }}>
            <button
              onClick={handleCompleteTask}
              style={{ padding: '15px 30px', fontSize: '1.2rem', background: '#4ade80', color: '#0f172a', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
            >
              I Did It! 🌟 (Next Task)
            </button>
          </div>
        </div>
      </div>
      <p style={{ marginTop: '25px', fontStyle: 'italic', color: '#ffffff' }}>Question {currentIndex + 1} of {displayTasks.length}</p>
    </div>
  );
}