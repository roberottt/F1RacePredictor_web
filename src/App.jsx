import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Standings from './pages/Standings';
import DriverDetail from './pages/DriverDetail';
import { getTranslation } from './translations';
import './App.css';

export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <div className="app">
          <div className="background-grid"></div>
          
          <motion.header 
            className="app-header"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="logo-container">
              <h1 className="app-title">
                <span className="title-f1">{getTranslation(language, 'appTitle1')}</span>
                <span className="title-race">{getTranslation(language, 'appTitle2')}</span>
              </h1>
              <div className="title-underline"></div>
            </div>
            <p className="app-subtitle">{getTranslation(language, 'appSubtitle')}</p>
            
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
          </motion.header>

          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/driver/:driverCode" element={<DriverDetail />} />
          </Routes>

          <motion.footer 
            className="app-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p>{getTranslation(language, 'footerText')}</p>
          </motion.footer>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
