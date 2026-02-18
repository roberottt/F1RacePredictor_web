import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './PredictionDisplay.css';

const teamColors = {
  'Red Bull Racing': '#0600EF',
  'McLaren': '#FF8700',
  'Ferrari': '#DC0000',
  'Mercedes': '#00D2BE',
  'Aston Martin': '#006F62',
  'Alpine': '#0090FF',
  'Williams': '#005AFF',
  'Racing Bulls': '#2B4562',
  'Kick Sauber': '#00E701',
  'Haas F1 Team': '#FFFFFF',
  'Cadillac F1 Team': '#D4AF37',
};

const PredictionDisplay = ({ year, round }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (year && round) {
      fetchPredictions();
    }
  }, [year, round]);

  const fetchPredictions = async () => {
    // Si es 2026, no hacer llamada a la API
    if (year === 2026 || year === '2026') {
      setLoading(false);
      setError(null);
      setPredictions([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://f1racepredictor.onrender.com/predict?year=${year}&round=${round}`
      );
      
      console.log('API Response:', response.data);
      
      // La API devuelve un objeto con full_classification
      if (response.data && response.data.full_classification) {
        setPredictions(response.data.full_classification);
      } else {
        setError('Invalid data format from API');
      }
    } catch (err) {
      setError('Error loading predictions. Please try again.');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTeamColor = (teamName) => {
    return teamColors[teamName] || '#e10600';
  };

  const getCountryFlag = (nationality) => {
    const flags = {
      'Dutch': '🇳🇱',
      'British': '🇬🇧',
      'Spanish': '🇪🇸',
      'Monegasque': '🇲🇨',
      'Mexican': '🇲🇽',
      'Australian': '🇦🇺',
      'French': '🇫🇷',
      'Canadian': '🇨🇦',
      'German': '🇩🇪',
      'Japanese': '🇯🇵',
      'Danish': '🇩🇰',
      'Finnish': '🇫🇮',
      'Thai': '🇹🇭',
      'Chinese': '🇨🇳',
      'American': '🇺🇸',
      'Italian': '🇮🇹',
      'Brazilian': '🇧🇷',
      'New Zealander': '🇳🇿',
      'Argentine': '🇦🇷'
    };
    return flags[nationality] || '🏁';
  };

  const getDriverNationality = (driverName) => {
    const nationalities = {
      'Max Verstappen': 'Dutch',
      'Lando Norris': 'British',
      'Oscar Piastri': 'Australian',
      'Charles Leclerc': 'Monegasque',
      'Carlos Sainz': 'Spanish',
      'Lewis Hamilton': 'British',
      'George Russell': 'British',
      'Fernando Alonso': 'Spanish',
      'Sergio Perez': 'Mexican',
      'Pierre Gasly': 'French',
      'Esteban Ocon': 'French',
      'Alexander Albon': 'Thai',
      'Yuki Tsunoda': 'Japanese',
      'Lance Stroll': 'Canadian',
      'Nico Hulkenberg': 'German',
      'Kevin Magnussen': 'Danish',
      'Valtteri Bottas': 'Finnish',
      'Zhou Guanyu': 'Chinese',
      'Logan Sargeant': 'American',
      'Daniel Ricciardo': 'Australian',
      'Andrea Kimi Antonelli': 'Italian',
      'Isack Hadjar': 'French',
      'Oliver Bearman': 'British',
      'Liam Lawson': 'New Zealander',
      'Gabriel Bortoleto': 'Brazilian',
      'Jack Doohan': 'Australian',
      'Franco Colapinto': 'Argentine',
      'Colton Herta': 'American',
      'Ryo Hirakawa': 'Japanese',
      'Arvid Lindblad': 'British'
    };
    return nationalities[driverName] || 'Unknown';
  };

  const getDriverCode = (driverName) => {
    const codes = {
      'Max Verstappen': 'VER',
      'Lando Norris': 'NOR',
      'Oscar Piastri': 'PIA',
      'Charles Leclerc': 'LEC',
      'Carlos Sainz': 'SAI',
      'Lewis Hamilton': 'HAM',
      'George Russell': 'RUS',
      'Fernando Alonso': 'ALO',
      'Sergio Perez': 'MEX',
      'Pierre Gasly': 'GAS',
      'Esteban Ocon': 'OCO',
      'Alexander Albon': 'ALB',
      'Yuki Tsunoda': 'TSU',
      'Lance Stroll': 'STR',
      'Nico Hulkenberg': 'HUL',
      'Kevin Magnussen': 'MAG',
      'Valtteri Bottas': 'BOT',
      'Zhou Guanyu': 'ZHO',
      'Logan Sargeant': 'SAR',
      'Daniel Ricciardo': 'RIC',
      'Andrea Kimi Antonelli': 'ANT',
      'Isack Hadjar': 'HAD',
      'Oliver Bearman': 'BEA',
      'Liam Lawson': 'LAW',
      'Gabriel Bortoleto': 'BOR',
      'Jack Doohan': 'DOO',
      'Franco Colapinto': 'COL',
      'Colton Herta': 'HER',
      'Ryo Hirakawa': 'HIR',
      'Arvid Lindblad': 'LIN'
    };
    return codes[driverName] || '';
  };

  const getPodiumIcon = (position) => {
    switch(position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="prediction-display" id="prediction-results">
        <div className="loading-container">
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            🏎️
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {getTranslation(language, 'analyzingRaceData')}
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="prediction-display"
        id="prediction-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="error-container">
          <p className="error-message">⚠️ {getTranslation(language, 'errorLoadingPredictions')}</p>
          <motion.button 
            className="retry-btn"
            onClick={fetchPredictions}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'retry')}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Mensaje especial para 2026
  if (year === 2026 || year === '2026') {
    return (
      <motion.div 
        className="prediction-display"
        id="prediction-results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="coming-soon-container">
          <motion.div
            className="coming-soon-icon"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏁
          </motion.div>
          <h2 className="coming-soon-title">
            {language === 'es' ? 'Predicciones 2026 Próximamente' : 'Season 2026 Predictions Coming Soon'}
          </h2>
          <p className="coming-soon-text">
            {language === 'es' 
              ? 'Las predicciones para la temporada 2026 estarán disponibles cuando comience el campeonato. ¡Vuelve pronto!' 
              : 'Predictions for the 2026 season will be available when the championship begins. Come back soon!'}
          </p>
          <motion.div 
            className="coming-soon-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            🏎️ {language === 'es' ? 'Temporada 2026' : 'Season 2026'} 🏎️
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return null;
  }

  // Separar podio del resto
  const podium = predictions.slice(0, 3);
  const rest = predictions.slice(3);

  return (
    <motion.div 
      id="prediction-results"
      className="prediction-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prediction-header">
        <h2 className="prediction-title">
          {getTranslation(language, 'racePrediction')}
        </h2>
        <p className="prediction-subtitle">
          {year} • {getTranslation(language, 'round')} {round}
        </p>
      </div>

      {/* Podio Visual */}
      <motion.div 
        className="podium-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="podium-grid">
          {/* Segundo Lugar */}
          {podium[1] && (
            <div className="podium-card podium-2">
              <div className="podium-position">2</div>
              <div className="podium-flag">{getCountryFlag(getDriverNationality(podium[1].driver))}</div>
              <h3 className="podium-driver-name">{podium[1].driver}</h3>
              <p className="podium-team">{podium[1].team}</p>
              <div className="podium-medal">🥈</div>
            </div>
          )}
          
          {/* Primer Lugar (Más Alto) */}
          {podium[0] && (
            <div className="podium-card podium-1">
              <div className="podium-position">1</div>
              <div className="podium-flag">{getCountryFlag(getDriverNationality(podium[0].driver))}</div>
              <h3 className="podium-driver-name">{podium[0].driver}</h3>
              <p className="podium-team">{podium[0].team}</p>
              <div className="podium-medal">🥇</div>
              <div className="winner-badge">Winner</div>
            </div>
          )}
          
          {/* Tercer Lugar */}
          {podium[2] && (
            <div className="podium-card podium-3">
              <div className="podium-position">3</div>
              <div className="podium-flag">{getCountryFlag(getDriverNationality(podium[2].driver))}</div>
              <h3 className="podium-driver-name">{podium[2].driver}</h3>
              <p className="podium-team">{podium[2].team}</p>
              <div className="podium-medal">🥉</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Resto de Posiciones - Tabla Elegante */}
      <motion.div 
        className="results-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="results-table">
          {rest.map((prediction, idx) => {
            const position = idx + 4;
            const teamColor = getTeamColor(prediction.team);
            const nationality = getDriverNationality(prediction.driver);
            const driverCode = getDriverCode(prediction.driver);
            
            return (
              <motion.div
                key={`${prediction.driver}-${idx}`}
                className="result-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
              >
                <div className="result-position">{position}</div>
                
                <div className="result-driver">
                  <div 
                    className="team-indicator" 
                    style={{ backgroundColor: teamColor }}
                  />
                  <span className="result-flag">{getCountryFlag(nationality)}</span>
                  <div className="driver-details">
                    <span className="driver-name-text">{prediction.driver}</span>
                    <span className="driver-code-text">{driverCode}</span>
                  </div>
                </div>

                <div className="result-team">{prediction.team}</div>

                {prediction.grid_position && (
                  <div className="result-stat">
                    <span className="stat-label-mini">Grid</span>
                    <span className="stat-value-mini">P{prediction.grid_position}</span>
                  </div>
                )}

                {prediction.probability && (
                  <div className="result-stat">
                    <span className="stat-label-mini">Prob.</span>
                    <span className="stat-value-mini">{(prediction.probability * 100).toFixed(0)}%</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PredictionDisplay;
