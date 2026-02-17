import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { getCalendarByYear } from '../data/f1Calendar';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { Calendar, MapPin, Play } from 'lucide-react';
import './RaceSelector.css';

const RaceSelector = ({ onSelectRace }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedRound, setSelectedRound] = useState('');
  const { language } = useContext(LanguageContext);

  const calendar = getCalendarByYear(selectedYear);

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setSelectedRound(''); // Reset race selection when year changes
  };

  const handleRaceChange = (e) => {
    setSelectedRound(e.target.value);
  };

  const handlePredict = () => {
    if (selectedRound) {
      onSelectRace(selectedYear, parseInt(selectedRound));
    }
  };

  const selectedRaceData = calendar.find(race => race.round === parseInt(selectedRound));

  return (
    <motion.div 
      className="race-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="selector-header">
        <h2>{getTranslation(language, 'selectRace')}</h2>
        <p className="selector-subtitle">
          {language === 'en' 
            ? 'Choose a season and race to predict the results' 
            : 'Elige una temporada y carrera para predecir los resultados'}
        </p>
      </div>

      <div className="selector-form card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year-select">
              <Calendar size={16} />
              {getTranslation(language, 'selectSeason')}
            </label>
            <select 
              id="year-select"
              value={selectedYear} 
              onChange={handleYearChange}
              className="select-input"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="race-select">
              <MapPin size={16} />
              {language === 'en' ? 'Grand Prix' : 'Gran Premio'}
            </label>
            <select 
              id="race-select"
              value={selectedRound} 
              onChange={handleRaceChange}
              className="select-input"
              disabled={!selectedYear}
            >
              <option value="">
                {language === 'en' ? 'Select a race...' : 'Selecciona una carrera...'}
              </option>
              {calendar.map((race) => (
                <option key={race.round} value={race.round}>
                  {race.flag} {race.name} - {race.location}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="btn btn-primary predict-btn"
            onClick={handlePredict}
            disabled={!selectedRound}
          >
            <Play size={18} />
            {language === 'en' ? 'Predict' : 'Predecir'}
          </button>
        </div>

        {selectedRaceData && (
          <motion.div 
            className="race-preview"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="preview-flag">
              <img 
                src={`https://flagcdn.com/w80/${selectedRaceData.code.toLowerCase()}.png`}
                alt={`${selectedRaceData.country} flag`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline';
                }}
              />
              <span className="flag-emoji" style={{display: 'none'}}>{selectedRaceData.flag}</span>
            </div>
            <div className="preview-details">
              <h3>{selectedRaceData.name}</h3>
              <p>
                {getTranslation(language, 'round')} {selectedRaceData.round} • {selectedRaceData.location}, {selectedRaceData.country}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RaceSelector;
