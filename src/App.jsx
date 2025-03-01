import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cloudFacts, setCloudFacts] = useState([
    "Cloud computing offers on-demand availability of computing resources",
    "AWS, Azure, and Google Cloud are leading cloud service providers",
    "SaaS, PaaS, and IaaS are the three main cloud service models",
    "Serverless computing is a cloud execution model that automates resource management",
    "Cloud computing reduces IT infrastructure costs significantly"
  ])
  const [currentFactIndex, setCurrentFactIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % cloudFacts.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [cloudFacts.length])

  return (
    <div className="cloud-assignment-container">
      <header className="assignment-header">
        <h1>Cloud Computing Technologies</h1>
        <h2>Assignment 1</h2>
        <div className="student-info">
          <p>By: Muhammad Bilal</p>
          <p>Student ID: 2022360</p>
          <p>Presented to: Maam Sofia</p>
        </div>
      </header>

      <div className="logos-container">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <div className="cloud-content">
        <section className="interactive-demo">
          <h3>Interactive Cloud Demo</h3>
          <div className="counter-card">
            <p>Cloud Scaling Simulation</p>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="scale-button"
            >
              Scale Resources: {count}
            </button>
            <p className="scale-description">
              {count < 5 ? "Low capacity" : count < 10 ? "Medium capacity" : "High capacity"} 
              cloud environment
            </p>
          </div>
        </section>

        <section className="cloud-facts">
          <h3>Cloud Computing Facts</h3>
          <div className="rotating-fact">
            <p>{cloudFacts[currentFactIndex]}</p>
            <div className="fact-indicators">
              {cloudFacts.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentFactIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          </div>
        </section>

        <section className="cloud-benefits">
          <h3>Benefits of Cloud Computing</h3>
          <ul>
            <li>Cost Efficiency</li>
            <li>Scalability</li>
            <li>Flexibility</li>
            <li>Disaster Recovery</li>
            <li>Automatic Updates</li>
          </ul>
        </section>
      </div>

      <footer className="assignment-footer">
        <p>Cloud Computing Technologies Assignment - Spring 2025</p>
        <p className="hint-text">
          Edit <code>src/App.jsx</code> to further customize this application
        </p>
      </footer>
    </div>
  )
}

export default App