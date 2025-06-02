import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'

const ThemeContext = createContext();

const themes = {
  light: {
    background: 'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)',
    text: '#ff69b4',
    inputBg: '#fff0f6',
    inputBorder: '#ffb6c1',
    buttonGradient: 'linear-gradient(90deg, #ffb6c1 0%, #f8ffae 100%)',
    progressBg: 'linear-gradient(90deg, #f8ffae 0%, #43c6ac 100%)',
    progressFill: 'linear-gradient(90deg, #ffb6c1 0%, #43c6ac 100%)',
  },
  dark: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)',
    text: '#e0fcff',
    inputBg: '#34495e',
    inputBorder: '#3498db',
    buttonGradient: 'linear-gradient(90deg, #3498db 0%, #2ecc71 100%)',
    progressBg: 'linear-gradient(90deg, #34495e 0%, #2c3e50 100%)',
    progressFill: 'linear-gradient(90deg, #3498db 0%, #2ecc71 100%)',
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const [name, setName] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  let [points, setPoints] = useState(0)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(100)

  const [duration, setDuration] = useState(0)

  const playAlarm = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'square';
    o.frequency.value = 800;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.08, ctx.currentTime);
    o.start();
    o.stop(ctx.currentTime + 0.4);
    o.onended = () => ctx.close();
  };

  useEffect(() => {
        if (name) {
          localStorage.setItem('userName', name)
        }

        if(!isRunning) return

        if(count <= 0){
          setIsRunning(false)
          setShowMessage(true)
          setIsButtonDisabled(false)
          setIsFinished(true)
          setProgress(0)
          setPoints((prev) => prev + 1)
          playAlarm()
          return
        }
      
        const interval = setInterval(() => {
          setCount((prevCount) => {
            const newCount = prevCount - 1;
            setProgress(newCount <= 0 ? 0 : (newCount / duration) * 100);
            return newCount;
          });
        }, 1000);

        return () => clearInterval(interval); 
      
        
    }, [isRunning, count, name, duration]);

  const handleStart = () =>{
    setCount(duration)
    setProgress(100)
    setIsRunning(true)
    setIsButtonDisabled(true)
    setShowMessage(false)
  }

  const handleReset =() =>{
    setCount(0)
    setProgress(0)
    setIsRunning(false)
    setShowMessage(false)
    setIsButtonDisabled(false)
    setDuration(0)
  }

  const handleRetake = () =>{
    setCount(duration)
    setProgress(100)
    setIsRunning(true)
    setIsButtonDisabled(true)
    setShowMessage(false)
    setPoints(0)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div
        className="app-container"
        style={{ background: themes[theme].background }}
      >
        <button
          onClick={toggleTheme}
          className="theme-button"
          style={{ background: themes[theme].buttonGradient }}
        >
          {theme === 'light' ? '😈' : '☀️'}
        </button>

        <h2 className="title" style={{ color: themes[theme].text }}>
          Enter your name:
        </h2>

        <input 
          placeholder="Type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          style={{
            border: `2px solid ${themes[theme].inputBorder}`,
            background: themes[theme].inputBg,
            color: themes[theme].text,
          }}
        />

        <input 
          placeholder="Type duration in seconds"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input-field"
          style={{
            border: `2px solid ${themes[theme].inputBorder}`,
            background: themes[theme].inputBg,
            color: themes[theme].text,
          }}
        />

        <p className="points-text" style={{ color: themes[theme].text }}>
          Number of candies you got: {points}
        </p>

        {isRunning && (
          <div className="progress-container" style={{ background: themes[theme].progressBg }}>
            <div 
              className="progress-bar"
              style={{ 
                width: `${progress}%`,
                background: themes[theme].progressFill 
              }} 
            />
            <div className="progress-text">{count} сек</div>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={isButtonDisabled}
          className="action-button"
          style={{ background: themes[theme].buttonGradient }}
        >
          Старт
        </button>
        <br />
        <button
          onClick={handleReset}
          className="action-button"
          style={{ background: themes[theme].buttonGradient }}
        >
          Сброс 
        </button>

        <br/>
        <button
          onClick={handleRetake}
          className="action-button"
          style={{ background: themes[theme].buttonGradient }}
        >
          Попробовать ещё раз
        </button>

        {showMessage && <>
          <h2 className="success-message" style={{ color: themes[theme].text }}>
            Ты справился, {localStorage.getItem('userName')} 💪
          </h2>
          <div className="candy-emoji">🍬</div>
        </>}

        {isRunning && (
          <h2 className="timer-text" style={{ color: themes[theme].text }}>
            {localStorage.getItem('userName')}, осталось {count} сек
          </h2>
        )}
      </div>
    </ThemeContext.Provider>
  )
}

export default App
