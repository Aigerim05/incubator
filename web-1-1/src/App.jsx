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
      
        
    }, [isRunning, count, isButtonDisabled, name, duration]); 

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
  }

  const handleRetake = () =>{
    setCount(10)
    setProgress(100)
    setIsRunning(true)
    setIsButtonDisabled(false)
    setShowMessage(false)
    setPoints(0)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',       
          justifyContent: 'center',   
          background: themes[theme].background,
          transition: 'all 0.3s ease',
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            background: themes[theme].buttonGradient,
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {theme === 'light' ? '😈' : '☀️'}
        </button>

        <h2 style={{
          fontFamily: 'Comic Sans MS, Comic Sans, cursive',
          color: themes[theme].text,
          textShadow: '1px 1px 0 #fff, 2px 2px 4px #ffb6c1',
        }}>Enter your name:</h2>

        <input 
          placeholder="Type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '250px',
            textAlign: 'center',
            marginBottom: '10px',
            borderRadius: '20px',
            border: `2px solid ${themes[theme].inputBorder}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            outline: 'none',
            background: themes[theme].inputBg,
            color: themes[theme].text,
          }}
        />

        <input 
          placeholder="Type duration in seconds"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '250px',
            textAlign: 'center',
            marginBottom: '10px',
            borderRadius: '20px',
            border: `2px solid ${themes[theme].inputBorder}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            outline: 'none',
            background: themes[theme].inputBg,
            color: themes[theme].text,
          }}
        />

        <p style={{
          color: themes[theme].text,
          fontWeight: 'bold',
          fontSize: '18px',
          textShadow: '1px 1px 0 #fff',
        }}>Number of candies you got: {points}</p>

        {isRunning && (
          <div style={{
            width: '400px',
            height: '28px',
            background: themes[theme].progressBg,
            borderRadius: '20px',
            marginBottom: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            border: '2px solid #fff',
            position: 'relative',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: themes[theme].progressFill,
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'width 1s linear',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              fontFamily: 'Comic Sans MS, Comic Sans, cursive',
            }}>{count} сек</div>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={isButtonDisabled}
          style={{
            padding: '12px 28px',
            fontSize: '18px',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            borderRadius: '20px',
            border: 'none',
            background: themes[theme].buttonGradient,
            color: '#fff',
            fontWeight: 'bold',
            margin: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            opacity: isButtonDisabled ? 0.7 : 1,
          }}
        >
          Старт
        </button>
        <br />
        <button
          onClick={handleReset}
          style={{
            padding: '12px 28px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '20px',
            border: 'none',
            background: themes[theme].buttonGradient,
            color: '#fff',
            fontWeight: 'bold',
            margin: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Сброс 
        </button>

        <br/>
        <button
          onClick={handleRetake}
          style={{
            padding: '12px 28px',
            fontSize: '18px',
            cursor: 'pointer',
            borderRadius: '20px',
            border: 'none',
            background: themes[theme].buttonGradient,
            color: '#fff',
            fontWeight: 'bold',
            margin: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Попробовать ещё раз
        </button>

        {showMessage && <>
          <h2 style={{ 
            color: themes[theme].text, 
            textShadow: '1px 1px 0 #fff, 2px 2px 4px rgba(0,0,0,0.2)', 
            fontFamily: 'Comic Sans MS, Comic Sans, cursive' 
          }}>Ты справился, {localStorage.getItem('userName')} 💪</h2>
          <div style={{ fontSize: '6rem', textAlign: 'center', marginTop: '10px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>🍬</div>
        </>}

        {isRunning && <h2 style={{ 
          color: themes[theme].text, 
          textShadow: '1px 1px 0 #fff, 2px 2px 4px rgba(0,0,0,0.2)', 
          fontFamily: 'Comic Sans MS, Comic Sans, cursive' 
        }}>{localStorage.getItem('userName')}, осталось {count} сек</h2>}
      </div>
    </ThemeContext.Provider>
  )
}

export default App
