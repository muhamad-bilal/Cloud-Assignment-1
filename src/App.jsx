import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [resourceCount, setResourceCount] = useState(0)
  const [cloudMode, setCloudMode] = useState('Cumulus')
  const [isRaining, setIsRaining] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  
  // Cloud deployment stats
  const [deploymentStats, setDeploymentStats] = useState({
    servers: 1,
    storage: 5,
    bandwidth: 10,
    uptime: 99.9
  })

  // Cloud facts with animations
  const cloudFacts = [
    { text: "Cloud computing market will exceed $1 trillion by 2028", icon: "📈" },
    { text: "Over 94% of enterprises use cloud services today", icon: "🏢" },
    { text: "Serverless computing reduces operational costs by up to 60%", icon: "💰" },
    { text: "Multi-cloud strategies are used by 85% of organizations", icon: "🔄" },
    { text: "AI-powered cloud services are growing at 25% annually", icon: "🤖" }
  ]
  const [factIndex, setFactIndex] = useState(0)

  // Cloud service models with animations
  const cloudModels = [
    { name: "SaaS", description: "Software as a Service", color: "#4285F4", icon: "💻" },
    { name: "PaaS", description: "Platform as a Service", color: "#34A853", icon: "🏗️" },
    { name: "IaaS", description: "Infrastructure as a Service", color: "#EA4335", icon: "🌐" },
    { name: "FaaS", description: "Function as a Service", color: "#FBBC05", icon: "λ" }
  ]
  const [activeModel, setActiveModel] = useState(0)
  
  // Weather simulation for background
  const weatherTypes = ["Clear", "Cloudy", "Stormy", "Sunny"]
  const [weather, setWeather] = useState("Cloudy")

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Rotate through cloud facts
  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % cloudFacts.length)
    }, 5000)
    
    return () => clearInterval(factInterval)
  }, [cloudFacts.length])

  // Rotate through cloud models
  useEffect(() => {
    const modelInterval = setInterval(() => {
      setActiveModel((prevModel) => (prevModel + 1) % cloudModels.length)
    }, 3000)
    
    return () => clearInterval(modelInterval)
  }, [cloudModels.length])

  // Change weather randomly
  useEffect(() => {
    const weatherInterval = setInterval(() => {
      setWeather(weatherTypes[Math.floor(Math.random() * weatherTypes.length)])
    }, 15000)
    
    return () => clearInterval(weatherInterval)
  }, [])

  // Update deployment stats when resources increase
  useEffect(() => {
    if (resourceCount > 0) {
      setDeploymentStats({
        servers: Math.floor(1 + resourceCount * 0.5),
        storage: Math.floor(5 + resourceCount * 2),
        bandwidth: Math.floor(10 + resourceCount * 5),
        uptime: (99.9 + (resourceCount * 0.01 > 0.09 ? 0.09 : resourceCount * 0.01)).toFixed(2)
      })
    }
  }, [resourceCount])

  // Cloud mode cycling
  const cloudModes = ["Cumulus", "Stratus", "Cirrus", "Nimbus"]
  const changeCloudMode = () => {
    const currentIndex = cloudModes.indexOf(cloudMode)
    const nextIndex = (currentIndex + 1) % cloudModes.length
    setCloudMode(cloudModes[nextIndex])
    
    // Trigger rain animation for Nimbus clouds
    if (cloudModes[nextIndex] === "Nimbus") {
      setIsRaining(true)
      setTimeout(() => setIsRaining(false), 5000)
    }
  }

  // Provision more cloud resources
  const provisionResources = () => {
    setResourceCount(prev => prev + 1)
    
    // Create floating number animation
    const container = document.querySelector('.dashboard-container')
    if (container) {
      const floater = document.createElement('div')
      floater.className = 'resource-floater'
      floater.innerText = '+1'
      floater.style.left = `${Math.random() * 80 + 10}%`
      container.appendChild(floater)
      
      setTimeout(() => {
        container.removeChild(floater)
      }, 2000)
    }
  }

  return (
    <div className={`cloud-app weather-${weather.toLowerCase()}`}>
      {isRaining && <div className="rain-effect"></div>}
      
      <div className="cloud-background">
        <div className={`cloud cloud1 ${cloudMode.toLowerCase()}`}></div>
        <div className={`cloud cloud2 ${cloudMode.toLowerCase()}`}></div>
        <div className={`cloud cloud3 ${cloudMode.toLowerCase()}`}></div>
      </div>
      
      <header className="cloud-header">
        <div className="title-container">
          <h1 className="main-title">CloudScape Explorer</h1>
          <div className="subtitle-container">
            <h2 className="subtitle">Advanced Cloud Computing Visualization</h2>
            <div className="live-indicator">
              <span className="pulse"></span>
              <span className="status-text">Live</span>
              <span className="time">{currentTime}</span>
            </div>
          </div>
        </div>
        
        <div className="author-badge">
          <div className="avatar"></div>
          <div className="author-info">
            <h3>Muhammad Bilal</h3>
            <p>ID: 2022360</p>
            <p>Presented to: Maam Sofia</p>
          </div>
        </div>
      </header>

      <main className="dashboard-container">
        <section className="cloud-control-panel">
          <h3>Cloud Control Center <span className="weather-indicator">{weather}</span></h3>
          
          <div className="control-grid">
            <div className="control-card">
              <h4>Cloud Formation</h4>
              <div className="cloud-mode-selector">
                <div className={`cloud-icon ${cloudMode.toLowerCase()}`}></div>
                <p>Current: {cloudMode}</p>
                <button className="mode-button" onClick={changeCloudMode}>
                  Change Formation
                </button>
              </div>
            </div>
            
            <div className="control-card resource-provisioning">
              <h4>Resource Provisioning</h4>
              <div className="resource-counter">
                <div className="counter-display">{resourceCount}</div>
                <button 
                  className="provision-button" 
                  onClick={provisionResources}
                >
                  Provision Resources
                </button>
              </div>
              <div className="scaling-indicator">
                <div className="scale-level" style={{width: `${Math.min(100, resourceCount * 5)}%`}}></div>
                <span className="scale-label">
                  {resourceCount < 5 ? "Low Capacity" : 
                   resourceCount < 15 ? "Medium Capacity" : 
                   "High Capacity"}
                </span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="deployment-stats">
          <h3>Cloud Deployment Metrics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon server-icon"></div>
              <div className="stat-info">
                <p className="stat-label">Virtual Servers</p>
                <p className="stat-value">{deploymentStats.servers}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon storage-icon"></div>
              <div className="stat-info">
                <p className="stat-label">Storage (TB)</p>
                <p className="stat-value">{deploymentStats.storage}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon bandwidth-icon"></div>
              <div className="stat-info">
                <p className="stat-label">Bandwidth (Gbps)</p>
                <p className="stat-value">{deploymentStats.bandwidth}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon uptime-icon"></div>
              <div className="stat-info">
                <p className="stat-label">Uptime (%)</p>
                <p className="stat-value">{deploymentStats.uptime}</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="info-section">
          <div className="cloud-facts-carousel">
            <h3>Cloud Industry Insights</h3>
            <div className="fact-card">
              <div className="fact-icon">{cloudFacts[factIndex].icon}</div>
              <p className="fact-text">{cloudFacts[factIndex].text}</p>
            </div>
            <div className="carousel-indicators">
              {cloudFacts.map((_, i) => (
                <span 
                  key={i} 
                  className={`indicator ${i === factIndex ? 'active' : ''}`}
                ></span>
              ))}
            </div>
          </div>
          
          <div className="cloud-models">
            <h3>Service Model Spotlight</h3>
            <div 
              className="model-card" 
              style={{backgroundColor: cloudModels[activeModel].color}}
            >
              <div className="model-icon">{cloudModels[activeModel].icon}</div>
              <h4>{cloudModels[activeModel].name}</h4>
              <p>{cloudModels[activeModel].description}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="cloud-footer">
        <div className="footer-content">
          <p>Cloud Computing Technologies - Assignment 1</p>
          <p>Spring Semester 2025</p>
        </div>
        <div className="footer-decoration">
          <div className="footer-cloud"></div>
          <div className="footer-cloud"></div>
          <div className="footer-cloud"></div>
        </div>
      </footer>
    </div>
  )
}

export default App