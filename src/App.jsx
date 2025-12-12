import { useState, useEffect, createContext } from 'react';
import { motion } from 'framer-motion';
import RaceSelector from './components/RaceSelector';
import PredictionDisplay from './components/PredictionDisplay';
import { getTranslation } from './translations';
import './App.css';

export const LanguageContext = createContext();

function App() {
  const [selectedRace, setSelectedRace] = useState(null);
  const [language, setLanguage] = useState('en');

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
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="app">
        <div className="background-grid"></div>
        
        <motion.header 
          className="app-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="language-selector">
            <motion.button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🇬🇧 EN
            </motion.button>
            <motion.button
              className={`lang-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => setLanguage('es')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🇪🇸 ES
            </motion.button>
          </div>
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
              <span className="title-f1">{getTranslation(language, 'appTitle1')}</span>
              <span className="title-race">{getTranslation(language, 'appTitle2')}</span>
            </h1>
            <div className="title-underline"></div>
          </motion.div>
          <p className="app-subtitle">{getTranslation(language, 'appSubtitle')}</p>
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
          <p>{getTranslation(language, 'footerText')}</p>
        </motion.footer>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
