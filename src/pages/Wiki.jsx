import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { constructorsData, driversWikiList } from '../data/wikiData';
import './Wiki.css';

function Wiki() {
  const [activeTab, setActiveTab] = useState('constructors');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const constructors = Object.values(constructorsData);
  const drivers = driversWikiList;

  const handleNext = () => {
    setDirection(1);
    if (activeTab === 'constructors') {
      setCurrentIndex((prev) => (prev + 1) % constructors.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % drivers.length);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (activeTab === 'constructors') {
      setCurrentIndex((prev) => (prev - 1 + constructors.length) % constructors.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + drivers.length) % drivers.length);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setDirection(0);
  };

  const handleConstructorClick = (constructorId) => {
    navigate(`/constructor/${constructorId}`);
  };

  const handleDriverClick = (driverCode) => {
    navigate(`/driver/${driverCode}`);
  };

  const currentConstructor = constructors[currentIndex];
  const currentDriver = drivers[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <main className="wiki-page">
      <motion.div
        className="wiki-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="wiki-header">
          <h2>{getTranslation(language, 'wikiTitle')}</h2>
          <p className="wiki-subtitle">{getTranslation(language, 'wikiSubtitle')}</p>
        </div>

        <div className="wiki-tabs">
          <motion.button
            className={`wiki-tab ${activeTab === 'constructors' ? 'active' : ''}`}
            onClick={() => handleTabChange('constructors')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'constructorsTab')}
          </motion.button>
          <motion.button
            className={`wiki-tab ${activeTab === 'drivers' ? 'active' : ''}`}
            onClick={() => handleTabChange('drivers')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'driversTab')}
          </motion.button>
        </div>

        {activeTab === 'constructors' && (
          <div className="carousel-container">
            <button 
              className="carousel-nav carousel-nav-left"
              onClick={handlePrev}
              aria-label="Previous team"
            >
              ‹
            </button>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="carousel-content"
              >
                <div className="carousel-card">
                  <div 
                    className="carousel-car-section"
                    style={{ 
                      '--team-color': currentConstructor.teamColor
                    }}
                  >
                    <img 
                      src={currentConstructor.carImage} 
                      alt={`${currentConstructor.name} car`}
                      className="carousel-car-img"
                      onClick={() => handleConstructorClick(currentConstructor.id)}
                    />
                    <div className="carousel-team-name">
                      {currentConstructor.logo && (
                        <img 
                          src={currentConstructor.logo} 
                          alt={`${currentConstructor.name} logo`}
                          className="team-logo-overlay"
                        />
                      )}
                      <h2>{currentConstructor.name}</h2>
                    </div>
                  </div>

                  <div className="carousel-info">
                    <div className="team-full-name">
                      <h3>{currentConstructor.fullName}</h3>
                      <div className="team-nationality">{currentConstructor.nationality} | {currentConstructor.base}</div>
                    </div>

                    <div className="carousel-stats-grid">
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'wins2025Short')}</span>
                        <span className="stat-value">{currentConstructor.wins2025}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'wins2026Short')}</span>
                        <span className="stat-value">{currentConstructor.wins2026}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'titles')}</span>
                        <span className="stat-value">{currentConstructor.worldChampionships}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">Total Wins</span>
                        <span className="stat-value">{currentConstructor.totalWins}</span>
                      </div>
                    </div>

                    <div className="carousel-details">
                      <div className="detail-row">
                        <span className="detail-label">Base:</span>
                        <span className="detail-value">{currentConstructor.base}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Team Chief:</span>
                        <span className="detail-value">{currentConstructor.teamChief}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Power Unit:</span>
                        <span className="detail-value">{currentConstructor.powerUnit}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Chassis:</span>
                        <span className="detail-value">{currentConstructor.chassis}</span>
                      </div>
                    </div>

                    <div className="carousel-drivers">
                      <h4>Drivers 2026</h4>
                      <div className="drivers-list">
                        {currentConstructor.drivers.map((driver, idx) => (
                          <div key={idx} className="driver-card">
                            <span className="driver-number">#{driver.number}</span>
                            <span className="driver-name">{driver.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="carousel-history">
                      <h4>History</h4>
                      <p>{currentConstructor.history}</p>
                    </div>

                    <div className="carousel-recent">
                      <h4>Recent Form</h4>
                      <p>{currentConstructor.recentForm}</p>
                    </div>

                    <button 
                      className="view-details-btn"
                      onClick={() => handleConstructorClick(currentConstructor.id)}
                    >
                      View Full Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              className="carousel-nav carousel-nav-right"
              onClick={handleNext}
              aria-label="Next team"
            >
              ›
            </button>

            <div className="carousel-indicators">
              {constructors.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to team ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="carousel-container">
            <button 
              className="carousel-nav carousel-nav-left"
              onClick={handlePrev}
              aria-label="Previous driver"
            >
              ‹
            </button>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="carousel-content"
              >
                <div className="carousel-card driver-carousel">
                  <div className="driver-carousel-header">
                    <div className="driver-number-large">
                      {currentDriver.number}
                    </div>
                    <div className="driver-info-large">
                      <h3>{currentDriver.name}</h3>
                      <p className="driver-team-name">{currentDriver.team}</p>
                      <p className="driver-nationality-badge">{currentDriver.nationality}</p>
                    </div>
                  </div>

                  <button 
                    className="view-details-btn"
                    onClick={() => handleDriverClick(currentDriver.code)}
                  >
                    View Driver Profile →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              className="carousel-nav carousel-nav-right"
              onClick={handleNext}
              aria-label="Next driver"
            >
              ›
            </button>

            <div className="carousel-indicators">
              {drivers.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to driver ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}

export default Wiki;
