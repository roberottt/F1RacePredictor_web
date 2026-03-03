import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, MapPin } from 'lucide-react';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { f1Calendar2026 } from '../data/f1Calendar';
import './RaceCountdown.css';

// Function to convert country code to flag emoji
const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '🏁';
  
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
};

function RaceCountdown() {
  const { language } = useContext(LanguageContext);
  const [nextRace, setNextRace] = useState(null);
  const [previousRace, setPreviousRace] = useState(null);
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  useEffect(() => {
    const calculateRaceInfo = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find next and previous races
      let nextRaceData = null;
      let prevRaceData = null;

      for (let i = 0; i < f1Calendar2026.length; i++) {
        const raceDate = new Date(f1Calendar2026[i].date);
        raceDate.setHours(0, 0, 0, 0);

        if (raceDate >= today && !nextRaceData) {
          nextRaceData = f1Calendar2026[i];
          console.log('Next Race Data:', nextRaceData);
          if (i > 0) {
            prevRaceData = f1Calendar2026[i - 1];
          }
          break;
        }
      }

      // If no future race found, season is over
      if (!nextRaceData && f1Calendar2026.length > 0) {
        prevRaceData = f1Calendar2026[f1Calendar2026.length - 1];
      }

      setNextRace(nextRaceData);
      setPreviousRace(prevRaceData);

      // Calculate days until next race
      if (nextRaceData) {
        const raceDate = new Date(nextRaceData.date);
        const timeDiff = raceDate - today;
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setDaysUntilNext(days);
      }
    };

    calculateRaceInfo();
    // Update every hour
    const interval = setInterval(calculateRaceInfo, 3600000);

    return () => clearInterval(interval);
  }, []);

  if (!nextRace && !previousRace) {
    return null;
  }

  return (
    <motion.section 
      className="race-countdown-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="countdown-container">
        {/* Next Race */}
        {nextRace && (
          <div className="countdown-card next-race-card">
            <div className="countdown-header">
              <Calendar size={20} />
              <h3>{getTranslation(language, 'nextRace')}</h3>
            </div>
            
            <div className="race-info">
              <div className="race-flag">
                <img 
                  src={`https://flagcdn.com/w160/${nextRace.code.toLowerCase()}.png`} 
                  alt={`${nextRace.country} flag`}
                  className="flag-image"
                />
              </div>
              <h2 className="race-name">{nextRace.name}</h2>
              <div className="race-location">
                <MapPin size={16} />
                <span>{nextRace.location}, {nextRace.country}</span>
              </div>
            </div>

            <div className="countdown-timer">
              <div className="days-number">{daysUntilNext}</div>
              <div className="days-label">
                {daysUntilNext === 1 
                  ? getTranslation(language, 'dayRemaining')
                  : getTranslation(language, 'daysRemaining')}
              </div>
            </div>

            <div className="race-date">
              <Clock size={16} />
              {new Date(nextRace.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        )}

        {/* Previous Race Winner */}
        {previousRace && previousRace.winner && (
          <div className="countdown-card previous-race-card">
            <div className="countdown-header">
              <Trophy size={20} />
              <h3>{getTranslation(language, 'lastRaceWinner')}</h3>
            </div>
            
            <div className="race-info">
              <div className="race-flag">
                <img 
                  src={`https://flagcdn.com/w160/${previousRace.code.toLowerCase()}.png`} 
                  alt={`${previousRace.country} flag`}
                  className="flag-image"
                />
              </div>
              <h4 className="race-name-small">{previousRace.name}</h4>
            </div>

            <div className="winner-info">
              <div className="winner-trophy">🏆</div>
              <div className="winner-name">{previousRace.winner}</div>
            </div>

            <div className="race-date race-date-small">
              {new Date(previousRace.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        )}

        {/* Season Over Message */}
        {!nextRace && previousRace && (
          <div className="countdown-card season-over-card">
            <div className="countdown-header">
              <Trophy size={20} />
              <h3>{getTranslation(language, 'seasonComplete')}</h3>
            </div>
            <p>{getTranslation(language, 'seasonCompleteMessage')}</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default RaceCountdown;
