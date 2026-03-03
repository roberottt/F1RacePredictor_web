import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { constructorsData, driversWikiList } from '../data/wikiData';
import { getTeamTranslation } from '../data/wikiDataTranslations';
import './Wiki.css';

function Wiki() {
  const [activeTab, setActiveTab] = useState('constructors');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hideTeamName, setHideTeamName] = useState(false);
  const [hideDriverName, setHideDriverName] = useState(false);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const driverCarouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (activeTab === 'constructors' && carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        // Ocultar el nombre cuando hemos hecho scroll más de 70vh
        setHideTeamName(-rect.top > window.innerHeight * 0.7);
      } else if (activeTab === 'drivers' && driverCarouselRef.current) {
        const rect = driverCarouselRef.current.getBoundingClientRect();
        // Ocultar el nombre cuando hemos hecho scroll más de 70vh
        setHideDriverName(-rect.top > window.innerHeight * 0.7);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const constructors = Object.values(constructorsData);
  const drivers = driversWikiList;

  const handleNext = () => {
    setDirection(1);
    if (activeTab === 'constructors') {
      setCurrentIndex((prev) => (prev + 1) % constructors.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % drivers.length);
    }
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (activeTab === 'constructors') {
      setCurrentIndex((prev) => (prev - 1 + constructors.length) % constructors.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + drivers.length) % drivers.length);
    }
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setDirection(0);
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      opacity: 0
    }),
    center: {
      opacity: 1
    },
    exit: (direction) => ({
      opacity: 0
    })
  };

  return (
    <main className="wiki-page">
      <div className="wiki-container">
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
          <div className="carousel-container" ref={carouselRef}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.3 }
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
                    <div className="carousel-nav-container">
                      <button 
                        className="carousel-nav carousel-nav-left"
                        onClick={handlePrev}
                        aria-label="Previous team"
                      >
                        ‹
                      </button>
                      <button 
                        className="carousel-nav carousel-nav-right"
                        onClick={handleNext}
                        aria-label="Next team"
                      >
                        ›
                      </button>
                    </div>
                    <img 
                      src={currentConstructor.carImage} 
                      alt={`${currentConstructor.name} car`}
                      className="carousel-car-img"
                      onClick={() => handleConstructorClick(currentConstructor.id)}
                    />
                    <div className={`carousel-team-name ${hideTeamName ? 'hidden' : ''}`}>
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
                        <span className="stat-label">{getTranslation(language, 'totalWins')}</span>
                        <span className="stat-value">{currentConstructor.totalWins}</span>
                      </div>
                    </div>

                    <div className="carousel-details">
                      <div className="detail-row">
                        <span className="detail-label">{getTranslation(language, 'base')}:</span>
                        <span className="detail-value">{currentConstructor.base}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{getTranslation(language, 'teamChief')}:</span>
                        <span className="detail-value">{currentConstructor.teamChief}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{getTranslation(language, 'powerUnit')}:</span>
                        <span className="detail-value">{currentConstructor.powerUnit}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{getTranslation(language, 'chassis')}:</span>
                        <span className="detail-value">{currentConstructor.chassis}</span>
                      </div>
                    </div>

                    <div className="carousel-drivers">
                      <h4>{getTranslation(language, 'drivers2026')}</h4>
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
                      <h4>{getTranslation(language, 'history')}</h4>
                      <p>{getTeamTranslation(language, currentConstructor.id, 'history')}</p>
                    </div>

                    <div className="carousel-recent">
                      <h4>{getTranslation(language, 'recentForm')}</h4>
                      <p>{getTeamTranslation(language, currentConstructor.id, 'recentForm')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="carousel-indicators">
              {constructors.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                    if (carouselRef.current) {
                      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  aria-label={`Go to team ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="carousel-container" ref={driverCarouselRef}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.3 }
                }}
                className="carousel-content"
              >
                <div className="carousel-card">
                  <div 
                    className="carousel-car-section driver-photo-section"
                  >
                    <div className="carousel-nav-container">
                      <button 
                        className="carousel-nav carousel-nav-left"
                        onClick={handlePrev}
                        aria-label="Previous driver"
                      >
                        ‹
                      </button>
                      <button 
                        className="carousel-nav carousel-nav-right"
                        onClick={handleNext}
                        aria-label="Next driver"
                      >
                        ›
                      </button>
                    </div>
                    <img 
                      src={currentDriver.image} 
                      alt={`${currentDriver.name}`}
                      className="carousel-driver-img"
                      onClick={() => handleDriverClick(currentDriver.code)}
                    />
                    <div className={`carousel-team-name carousel-driver-name ${hideDriverName ? 'hidden' : ''}`}>
                      <div className="driver-number-overlay">
                        {currentDriver.number}
                      </div>
                      <h2>{currentDriver.name}</h2>
                    </div>
                  </div>

                  <div className="carousel-info">
                    <div className="team-full-name driver-full-info">
                      <h3>{currentDriver.name}</h3>
                      <div className="team-nationality">{currentDriver.nationality} | #{currentDriver.number}</div>
                    </div>

                    <div className="carousel-stats-grid">
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'team')}</span>
                        <span className="stat-value driver-team">{currentDriver.team}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'number')}</span>
                        <span className="stat-value">#{currentDriver.number}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'code')}</span>
                        <span className="stat-value">{currentDriver.code}</span>
                      </div>
                      <div className="carousel-stat">
                        <span className="stat-label">{getTranslation(language, 'nationality')}</span>
                        <span className="stat-value">{currentDriver.nationality}</span>
                      </div>
                    </div>

                    <button 
                      className="view-details-btn"
                      onClick={() => handleDriverClick(currentDriver.code)}
                    >
                      {getTranslation(language, 'viewDriverProfile')} →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

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
      </div>
    </main>
  );
}

export default Wiki;
