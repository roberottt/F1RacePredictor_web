import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import StandingsChart from '../components/StandingsChart';
import './Standings.css';

function Standings() {
  const [season, setSeason] = useState('2025');
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('drivers');
  const [chartSubTab, setChartSubTab] = useState('drivers');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStandings();
  }, [season]);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [driversResponse, constructorsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/standings/drivers/${season}`),
        axios.get(`http://localhost:8000/standings/constructors/${season}`)
      ]);

      // La API devuelve un objeto con un campo 'standings'
      const driversData = driversResponse.data?.standings || [];
      const constructorsData = constructorsResponse.data?.standings || [];
      
      setDriverStandings(driversData);
      setConstructorStandings(constructorsData);
    } catch (err) {
      console.error('Error fetching standings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mapeo de nacionalidades por código de piloto
  const getDriverNationality = (driverCode, driverName) => {
    const nationalityMap = {
      'VER': 'Dutch',
      'NOR': 'British',
      'PIA': 'Australian',
      'RUS': 'British',
      'LEC': 'Monegasque',
      'ANT': 'Italian',
      'HAM': 'British',
      'ALB': 'Thai',
      'SAI': 'Spanish',
      'HUL': 'German',
      'ALO': 'Spanish',
      'HAD': 'French',
      'BEA': 'British',
      'LAW': 'New Zealander',
      'OCO': 'French',
      'STR': 'Canadian',
      'TSU': 'Japanese',
      'BOR': 'Brazilian',
      'GAS': 'French',
      'DOO': 'Australian',
      'COL': 'Argentine',
      'PER': 'Mexican',
      'BOT': 'Finnish',
      'ZHO': 'Chinese',
      'MAG': 'Danish',
    };
    return nationalityMap[driverCode] || '';
  };

  // Convertir nacionalidad a código ISO de país
  const getCountryCode = (nationality) => {
    const countryMap = {
      'Dutch': 'nl',
      'British': 'gb',
      'Monegasque': 'mc',
      'Spanish': 'es',
      'Mexican': 'mx',
      'Australian': 'au',
      'French': 'fr',
      'Canadian': 'ca',
      'German': 'de',
      'Japanese': 'jp',
      'Danish': 'dk',
      'Finnish': 'fi',
      'Chinese': 'cn',
      'Thai': 'th',
      'American': 'us',
      'New Zealander': 'nz',
      'Argentine': 'ar',
      'Argentinian': 'ar',
      'Italian': 'it',
      'Brazilian': 'br',
      'Belgian': 'be',
      'Austrian': 'at',
      'Swiss': 'ch',
      'Swedish': 'se',
      'Polish': 'pl',
      'Russian': 'ru',
      'Indian': 'in',
      'Venezuelan': 've',
      'Colombian': 'co',
      'Portuguese': 'pt',
      'South African': 'za',
      'Hungarian': 'hu',
      'Czech': 'cz',
      'Estonian': 'ee',
    };
    return countryMap[nationality] || '';
  };

  const getConstructorInitials = (constructorName) => {
    const initials = {
      'Red Bull Racing': 'RBR',
      'Ferrari': 'FER',
      'Mercedes': 'MER',
      'McLaren': 'MCL',
      'Aston Martin': 'AMR',
      'Alpine': 'ALP',
      'Williams': 'WIL',
      'Racing Bulls': 'RB',
      'Kick Sauber': 'KS',
      'Haas F1 Team': 'HAS',
    };
    return initials[constructorName] || constructorName.substring(0, 3).toUpperCase();
  };

  const getConstructorColor = (constructorId) => {
    const colors = {
      'red_bull': '#3671C6',
      'red_bull_racing': '#3671C6',
      'ferrari': '#E8002D',
      'mercedes': '#27F4D2',
      'mclaren': '#FF8000',
      'aston_martin': '#229971',
      'alpine': '#FF87BC',
      'williams': '#64C4FF',
      'alphatauri': '#5E8FAA',
      'racing_bulls': '#5E8FAA',
      'alfa': '#C92D4B',
      'kick_sauber': '#C92D4B',
      'haas': '#B6BABD',
      'haas_f1_team': '#B6BABD',
      'racing_point': '#F596C8',
      'renault': '#FFF500',
      'sauber': '#9B0000',
    };
    return colors[constructorId] || '#fff';
  };

  if (loading) {
    return (
      <div className="standings-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>{getTranslation(language, 'loadingStandings')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="standings-container">
        <div className="error">
          <p>{getTranslation(language, 'errorLoadingStandings')}</p>
          <button onClick={fetchStandings} className="retry-button">
            {getTranslation(language, 'retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="standings-container">
      <motion.div
        className="standings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{getTranslation(language, 'standingsTitle')}</h1>
        <div className="season-selector">
          <label>{getTranslation(language, 'selectSeason')}:</label>
          <div className="season-buttons">
            <motion.button
              className={`season-btn ${season === '2025' ? 'active' : ''}`}
              onClick={() => setSeason('2025')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              2025
            </motion.button>
            <div className="season-btn disabled">
              {getTranslation(language, 'season2026Coming')}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="standings-tabs">
        <motion.button
          className={`tab ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {getTranslation(language, 'driversStandings')}
        </motion.button>
        <motion.button
          className={`tab ${activeTab === 'constructors' ? 'active' : ''}`}
          onClick={() => setActiveTab('constructors')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {getTranslation(language, 'constructorsStandings')}
        </motion.button>
        <motion.button
          className={`tab ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {getTranslation(language, 'evolutionChart')}
        </motion.button>
      </div>

      {activeTab === 'chart' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chart-tabs">
            <motion.button
              className={`chart-type-btn ${chartSubTab === 'drivers' ? 'active' : ''}`}
              onClick={() => setChartSubTab('drivers')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {getTranslation(language, 'driversChart')}
            </motion.button>
            <motion.button
              className={`chart-type-btn ${chartSubTab === 'constructors' ? 'active' : ''}`}
              onClick={() => setChartSubTab('constructors')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {getTranslation(language, 'constructorsChart')}
            </motion.button>
          </div>
          
          <StandingsChart 
            driverStandings={driverStandings}
            constructorStandings={constructorStandings}
            chartType={chartSubTab}
          />
        </motion.div>
      ) : activeTab === 'drivers' ? (
        <motion.div
          className="standings-table-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {driverStandings.length === 0 ? (
            <div className="no-data">
              <p>No hay datos de standings disponibles para {season}</p>
            </div>
          ) : (
            <table className="standings-table">
              <thead>
                <tr>
                  <th>{getTranslation(language, 'position')}</th>
                  <th>{getTranslation(language, 'driver')}</th>
                  <th>{getTranslation(language, 'nationality')}</th>
                  <th>{getTranslation(language, 'constructor')}</th>
                  <th>{getTranslation(language, 'points')}</th>
                  <th>{getTranslation(language, 'wins')}</th>
                </tr>
              </thead>
              <tbody>
                {driverStandings.map((standing, index) => {
                  const driverName = standing.driver || '';
                  // La API devuelve 'team' en vez de 'constructor'
                  const constructorName = standing.team || standing.constructor || '';
                  const driverCode = standing.driver_code || '';
                  // Si la API no devuelve nacionalidad, usamos nuestro mapeo
                  const nationality = standing.nationality || getDriverNationality(driverCode, driverName);
                  const driverNumber = standing.driver_number || '';
                  const constructorId = constructorName ? constructorName.toLowerCase().replace(/ /g, '_') : '';
                  
                  return (
                    <motion.tr
                      key={`${driverName}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={index < 3 ? `podium-${index + 1}` : ''}
                    >
                      <td className="position-cell">
                        <div className="position-badge">{standing.position}</div>
                      </td>
                      <td className="driver-cell">
                        <div className="driver-name">
                          {driverNumber && <span className="driver-number">{driverNumber}</span>}
                          <span 
                            className="driver-name-link" 
                            onClick={() => navigate(`/driver/${driverCode}`)}
                          >
                            {driverName}
                          </span>
                        </div>
                      </td>
                      <td className="nationality-cell">
                        {nationality && getCountryCode(nationality) ? (
                          <div className="flag-container">
                            <img 
                              src={`https://flagcdn.com/w80/${getCountryCode(nationality)}.png`}
                              alt={`${nationality} flag`}
                              className="flag-img"
                              title={nationality}
                            />
                          </div>
                        ) : (
                          <span style={{ color: '#666' }}>-</span>
                        )}
                      </td>
                      <td 
                        className="constructor-cell"
                        style={{ borderLeft: `4px solid ${getConstructorColor(constructorId)}` }}
                      >
                        <div className="constructor-info">
                          <div 
                            className="constructor-badge"
                            style={{ 
                              backgroundColor: getConstructorColor(constructorId),
                              color: constructorId === 'haas' || constructorId === 'haas_f1_team' ? '#000' : '#fff'
                            }}
                          >
                            {getConstructorInitials(constructorName)}
                          </div>
                          <span className="constructor-name">{constructorName}</span>
                        </div>
                      </td>
                      <td className="points-cell"><strong>{standing.total_points || standing.points}</strong></td>
                      <td className="wins-cell">{standing.wins}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="standings-table-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {constructorStandings.length === 0 ? (
            <div className="no-data">
              <p>No hay datos de standings disponibles para {season}</p>
            </div>
          ) : (
            <table className="standings-table">
              <thead>
                <tr>
                  <th>{getTranslation(language, 'position')}</th>
                  <th>{getTranslation(language, 'constructor')}</th>
                  <th>{getTranslation(language, 'nationality')}</th>
                  <th>{getTranslation(language, 'points')}</th>
                  <th>{getTranslation(language, 'wins')}</th>
                </tr>
              </thead>
              <tbody>
                {constructorStandings.map((standing, index) => {
                  const constructorName = typeof standing.constructor === 'string' ? standing.constructor : '';
                  const constructorId = constructorName ? constructorName.toLowerCase().replace(/ /g, '_') : '';
                  
                  return (
                    <motion.tr
                      key={`${constructorName}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={index < 3 ? `podium-${index + 1}` : ''}
                    >
                      <td className="position-cell">
                        <div className="position-badge">{standing.position}</div>
                      </td>
                      <td 
                        className="constructor-name-cell"
                        style={{ borderLeft: `4px solid ${getConstructorColor(constructorId)}` }}
                      >
                        <strong>{constructorName}</strong>
                      </td>
                      <td className="nationality-cell">{standing.nationality || '-'}</td>
                      <td className="points-cell"><strong>{standing.total_points || standing.points}</strong></td>
                      <td className="wins-cell">{standing.wins}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Standings;
