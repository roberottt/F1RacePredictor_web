import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
};

const PredictionDisplay = ({ year, round }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (year && round) {
      fetchPredictions();
    }
  }, [year, round]);

  const fetchPredictions = async () => {
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
            Analyzing race data...
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
          <p className="error-message">⚠️ {error}</p>
          <motion.button 
            className="retry-btn"
            onClick={fetchPredictions}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return null;
  }

  return (
    <motion.div 
      id="prediction-results"
      className="prediction-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🏁 Race Prediction - {year} Round {round}
      </motion.h2>

      <div className="predictions-container">
        <AnimatePresence>
          {predictions.map((prediction, index) => (
            <motion.div
              key={`${prediction.driver}-${index}`}
              className={`prediction-card ${index < 3 ? 'podium' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 40px rgba(225, 6, 0, 0.4)',
                transition: { duration: 0.2 }
              }}
              style={{
                borderLeft: `5px solid ${getTeamColor(prediction.team)}`
              }}
            >
              <div className="position-badge">
                <span className="position-number">{index + 1}</span>
                {index < 3 && <span className="podium-icon">{getPodiumIcon(index + 1)}</span>}
              </div>
              
              <div className="driver-info">
                <h3 className="driver-name">{prediction.driver || `Driver ${index + 1}`}</h3>
                <p className="team-name">{prediction.team || 'Team'}</p>
              </div>

              <div className="prediction-stats">
                {prediction.grid_position && (
                  <div className="stat">
                    <span className="stat-label">Grid</span>
                    <span className="stat-value">P{prediction.grid_position}</span>
                  </div>
                )}
                {prediction.probability && (
                  <div className="stat">
                    <span className="stat-label">Probability</span>
                    <span className="stat-value">{(prediction.probability * 100).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PredictionDisplay;
