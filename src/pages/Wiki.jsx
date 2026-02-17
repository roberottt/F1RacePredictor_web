import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { constructorsData, driversWikiList } from '../data/wikiData';
import './Wiki.css';

function Wiki() {
  const [activeTab, setActiveTab] = useState('constructors');
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const constructors = Object.values(constructorsData);
  
  const filteredConstructors = constructors.filter(constructor =>
    constructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    constructor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDrivers = driversWikiList.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConstructorClick = (constructorId) => {
    navigate(`/constructor/${constructorId}`);
  };

  const handleDriverClick = (driverCode) => {
    navigate(`/driver/${driverCode}`);
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
            onClick={() => { setActiveTab('constructors'); setSearchTerm(''); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'constructorsTab')}
          </motion.button>
          <motion.button
            className={`wiki-tab ${activeTab === 'drivers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('drivers'); setSearchTerm(''); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'driversTab')}
          </motion.button>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="wiki-search"
            placeholder={getTranslation(language, 'searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {activeTab === 'constructors' && (
          <motion.div
            className="wiki-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="list-title">{getTranslation(language, 'selectConstructor')}</h3>
            <div className="selector-grid">
              {filteredConstructors.map((constructor, index) => (
                <motion.div
                  key={constructor.id}
                  className="selector-card"
                  style={{ borderLeftColor: constructor.teamColor }}
                  onClick={() => handleConstructorClick(constructor.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="selector-content">
                    <div className="selector-info">
                      <h4>{constructor.name}</h4>
                      <p className="selector-subtitle">{constructor.fullName}</p>
                      <div className="selector-stats">
                        <span className="stat-item">
                          <strong>{constructor.wins2025}</strong> {getTranslation(language, 'wins2025Short')}
                        </span>
                        <span className="stat-item">
                          <strong>{constructor.wins2026}</strong> {getTranslation(language, 'wins2026Short')}
                        </span>
                        <span className="stat-item">
                          <strong>{constructor.worldChampionships}</strong> {getTranslation(language, 'titles')}
                        </span>
                      </div>
                      <div className="selector-drivers">
                        {constructor.drivers.map((driver, idx) => (
                          <span key={idx} className="driver-badge">
                            #{driver.number} {driver.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="selector-arrow">→</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'drivers' && (
          <motion.div
            className="wiki-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="list-title">{getTranslation(language, 'selectDriver')}</h3>
            <div className="selector-grid">
              {filteredDrivers.map((driver, index) => (
                <motion.div
                  key={driver.code}
                  className="selector-card driver-selector"
                  onClick={() => handleDriverClick(driver.code)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="selector-content">
                    <div className="driver-number-circle">
                      {driver.number}
                    </div>
                    <div className="selector-info">
                      <h4>{driver.name}</h4>
                      <p className="selector-subtitle">{driver.team}</p>
                      <p className="driver-nationality">{driver.nationality}</p>
                    </div>
                    <div className="selector-arrow">→</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

export default Wiki;
