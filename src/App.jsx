import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RaceSelector from './components/RaceSelector';
import PredictionDisplay from './components/PredictionDisplay';
import './App.css';

function App() {
  const [selectedRace, setSelectedRace] = useState(null);

  const handleSelectRace = (year, round) => {
    setSelectedRace({ year, round });
  };

  useEffect(() => {
    if (selectedRace) {
      // Esperar a que el componente se renderice completamente
      const timer = setTimeout(() => {
        const element = document.getElementById('prediction-results');
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 100;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 700);
      
      return () => clearTimeout(timer);
    }
  }, [selectedRace]);

  return (
    <div className="app">
      <div className="background-grid"></div>
      
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo-container"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <h1 className="app-title">
            <span className="title-f1">F1</span>
            <span className="title-race">RACE</span>
            <span className="title-predictor">PREDICTOR</span>
          </h1>
          <div className="title-underline"></div>
        </motion.div>
        <p className="app-subtitle">AI-Powered Race Outcome Predictions</p>
      </motion.header>

      <main className="app-main">
        <RaceSelector onSelectRace={handleSelectRace} />
        
        {selectedRace && (
          <PredictionDisplay 
            year={selectedRace.year} 
            round={selectedRace.round} 
          />
        )}
      </main>

      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p>Powered by Machine Learning • Data from F1 API</p>
      </motion.footer>
    </div>
  );
}

export default App;
