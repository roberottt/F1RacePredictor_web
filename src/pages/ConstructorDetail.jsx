import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { constructorsData } from '../data/wikiData';
import './ConstructorDetail.css';

function ConstructorDetail() {
  const { constructorId } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const constructor = constructorsData[constructorId];

  if (!constructor) {
    return (
      <div className="constructor-detail-page">
        <div className="error-container">
          <h2>{getTranslation(language, 'constructorNotFound')}</h2>
          <motion.button
            className="back-button"
            onClick={() => navigate('/wiki')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getTranslation(language, 'backToWiki')}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="constructor-detail-page">
      <motion.div
        className="constructor-detail-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={() => navigate('/wiki')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← {getTranslation(language, 'backToWiki')}
        </motion.button>

        {/* Header with Team Color */}
        <motion.div
          className="constructor-header"
          style={{ borderLeftColor: constructor.teamColor }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="constructor-title-section">
            <h1>{constructor.name}</h1>
            <p className="constructor-full-name">{constructor.fullName}</p>
            <div className="constructor-badges">
              <span className="badge">{constructor.nationality}</span>
              <span className="badge">{constructor.base}</span>
            </div>
          </div>
        </motion.div>

        {/* Car Image */}
        <motion.div
          className="car-showcase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img src={constructor.carImage} alt={`${constructor.name} car`} />
          <div className="car-info">
            <span><strong>{getTranslation(language, 'chassis')}:</strong> {constructor.chassis}</span>
            <span><strong>{getTranslation(language, 'powerUnit')}:</strong> {constructor.powerUnit}</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-card">
            <span className="stat-value">{constructor.wins2025}</span>
            <span className="stat-label">{getTranslation(language, 'wins2025')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{constructor.wins2026}</span>
            <span className="stat-label">{getTranslation(language, 'wins2026')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{constructor.worldChampionships}</span>
            <span className="stat-label">{getTranslation(language, 'championships')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{constructor.totalWins}</span>
            <span className="stat-label">{getTranslation(language, 'totalWins')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{constructor.totalPodiums}</span>
            <span className="stat-label">{getTranslation(language, 'totalPodiums')}</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{constructor.polePositions}</span>
            <span className="stat-label">{getTranslation(language, 'polePositions')}</span>
          </div>
        </motion.div>

        {/* Team Information */}
        <motion.div
          className="info-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3>{getTranslation(language, 'teamInfo')}</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{getTranslation(language, 'teamChief')}:</span>
              <span className="info-value">{constructor.teamChief}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{getTranslation(language, 'technicalDirector')}:</span>
              <span className="info-value">{constructor.technicalDirector}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{getTranslation(language, 'base')}:</span>
              <span className="info-value">{constructor.base}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{getTranslation(language, 'firstEntry')}:</span>
              <span className="info-value">{constructor.firstEntry}</span>
            </div>
          </div>
        </motion.div>

        {/* Current Drivers */}
        <motion.div
          className="drivers-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>{getTranslation(language, 'currentDrivers')}</h3>
          <div className="drivers-grid">
            {constructor.drivers.map((driver, index) => (
              <Link
                key={index}
                to={`/driver/${driver.code}`}
                className="driver-card-link"
              >
                <div className="driver-card-mini">
                  <div className="driver-number-badge" style={{ background: constructor.teamColor }}>
                    {driver.number}
                  </div>
                  <div className="driver-info-mini">
                    <h4>{driver.name}</h4>
                    <p>{getTranslation(language, 'viewProfile')} →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* History Section */}
        <motion.div
          className="history-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3>{getTranslation(language, 'history')}</h3>
          <p className="history-text">{constructor.history}</p>
        </motion.div>

        {/* Recent Form */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>{getTranslation(language, 'recentForm')}</h3>
          <p className="form-text">{constructor.recentForm}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ConstructorDetail;
