import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { getCalendarByYear } from '../data/f1Calendar';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './RaceSelector.css';

const RaceSelector = ({ onSelectRace }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRace, setSelectedRace] = useState(null);
  const { language } = useContext(LanguageContext);

  const calendar = getCalendarByYear(selectedYear);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedRace(null);
  };

  const handleRaceSelect = (race) => {
    setSelectedRace(race);
    onSelectRace(selectedYear, race.round);
  };

  return (
    <div className="race-selector">
      <motion.div 
        className="year-selector"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{getTranslation(language, 'selectSeason')}</h2>
        <div className="year-buttons">
          <motion.button
            className={`year-btn ${selectedYear === 2025 ? 'active' : ''}`}
            onClick={() => handleYearChange(2025)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            2025
          </motion.button>
          <motion.button
            className={`year-btn ${selectedYear === 2026 ? 'active' : ''}`}
            onClick={() => handleYearChange(2026)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            2026
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="races-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>{getTranslation(language, 'selectRace')}</h2>
        <div className="races-container">
          {calendar.map((race, index) => (
            <motion.div
              key={`${selectedYear}-${race.round}`}
              className={`race-card ${selectedRace?.round === race.round ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(255, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRaceSelect(race)}
            >
              <div className="race-round">{getTranslation(language, 'round')} {race.round}</div>
              <div className="race-flag">
                <img 
                  src={`https://flagcdn.com/w80/${race.code.toLowerCase()}.png`}
                  alt={`${race.country} flag`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="flag-emoji" style={{display: 'none'}}>{race.flag}</span>
              </div>
              <h3 className="race-name">{race.name}</h3>
              <p className="race-location">{race.location}</p>
              <p className="race-country">{race.country}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RaceSelector;
