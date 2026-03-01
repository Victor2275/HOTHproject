import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...")

  // Example: Fetching "Hello" from your Node backend
  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then(res => res.json())
      .then(data => setMessage(`Backend Status: ${data.status}`))
      .catch(() => setMessage("Backend is offline 😴"))
  }, [])

  return (
    <div className="container">
      <header>
        <span className="badge">v1.0.0</span>
        <h1>Hackathon <span>Starter</span></h1>
      </header>
      
      <main className="card">
        <h2>{message}</h2>
        <p>Edit <code>src/App.jsx</code> to start building your MVP.</p>
        <div className="button-group">
          <button onClick={() => alert('Action 1')}>Primary Action</button>
          <button className="secondary" onClick={() => console.log('Log')}>Docs</button>
        </div>
      </main>
    </div>
  )
}

export default App