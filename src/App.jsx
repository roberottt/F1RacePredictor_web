import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Predictions from './pages/Predictions';
import Standings from './pages/Standings';
import DriverDetail from './pages/DriverDetail';
import Wiki from './pages/Wiki';
import ConstructorDetail from './pages/ConstructorDetail';
import './App.css';

export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState('es');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router>
        <div className="app">
          <Navigation />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/driver/:driverCode" element={<DriverDetail />} />
              <Route path="/constructor/:constructorId" element={<ConstructorDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
