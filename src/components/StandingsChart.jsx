import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './StandingsChart.css';

function StandingsChart({ driverStandings, constructorStandings, chartType = 'drivers' }) {
  const { language } = useContext(LanguageContext);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedConstructors, setSelectedConstructors] = useState([]);
  const [showTop, setShowTop] = useState(10);

  // Colores para los pilotos/constructores
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF8FA3', '#00B4D8', '#FFB703', '#06FFA5', '#C77DFF',
    '#E63946', '#457B9D', '#F4A261', '#2A9D8F', '#E76F51'
  ];

  const getConstructorColor = (constructorName) => {
    const colorMap = {
      'Red Bull Racing': '#3671C6',
      'Ferrari': '#E8002D',
      'Mercedes': '#27F4D2',
      'McLaren': '#FF8000',
      'Aston Martin': '#229971',
      'Alpine': '#FF87BC',
      'Williams': '#64C4FF',
      'Racing Bulls': '#5E8FAA',
      'Kick Sauber': '#C92D4B',
      'Haas F1 Team': '#B6BABD',
    };
    return colorMap[constructorName] || colors[Math.floor(Math.random() * colors.length)];
  };

  // Procesar datos para el gráfico de pilotos
  const processDriverData = () => {
    if (!driverStandings || driverStandings.length === 0) return [];

    // Determinar cuántas carreras hay
    const maxRaces = Math.max(...driverStandings.map(d => d.race_history?.length || 0));
    
    // Crear datos para cada carrera
    const raceData = [];
    for (let raceIndex = 0; raceIndex < maxRaces; raceIndex++) {
      const racePoint = { race: raceIndex + 1 };
      
      driverStandings.forEach((driver, driverIndex) => {
        if (driver.race_history && driver.race_history[raceIndex]) {
          const driverKey = `${driver.driver_code || driver.driver}`;
          
          // Usar total_points directamente de la API que ya viene acumulado
          const cumulativePoints = driver.race_history[raceIndex]?.total_points || 0;
          
          racePoint[driverKey] = cumulativePoints;
        }
      });
      
      raceData.push(racePoint);
    }
    
    return raceData;
  };

  // Procesar datos para el gráfico de constructores
  const processConstructorData = () => {
    if (!constructorStandings || constructorStandings.length === 0) return [];

    const maxRaces = Math.max(...constructorStandings.map(c => c.race_history?.length || 0));
    
    const raceData = [];
    for (let raceIndex = 0; raceIndex < maxRaces; raceIndex++) {
      const racePoint = { race: raceIndex + 1 };
      
      constructorStandings.forEach((constructor) => {
        if (constructor.race_history && constructor.race_history[raceIndex]) {
          const constructorKey = constructor.constructor;
          
          // Usar total_points directamente de la API que ya viene acumulado
          const cumulativePoints = constructor.race_history[raceIndex]?.total_points || 0;
          
          racePoint[constructorKey] = cumulativePoints;
        }
      });
      
      raceData.push(racePoint);
    }
    
    return raceData;
  };

  const driverData = chartType === 'drivers' ? processDriverData() : [];
  const constructorData = chartType === 'constructors' ? processConstructorData() : [];
  const chartData = chartType === 'drivers' ? driverData : constructorData;

  // Obtener lista de pilotos/constructores para selección
  const getAvailableItems = () => {
    if (chartType === 'drivers') {
      return driverStandings.slice(0, showTop).map(d => ({
        key: d.driver_code || d.driver,
        name: d.driver,
        color: getConstructorColor(d.team || d.constructor)
      }));
    } else {
      return constructorStandings.slice(0, showTop).map(c => ({
        key: c.constructor,
        name: c.constructor,
        color: getConstructorColor(c.constructor)
      }));
    }
  };

  const availableItems = getAvailableItems();

  // Seleccionar todos los top N por defecto
  const handleSelectAll = () => {
    if (chartType === 'drivers') {
      setSelectedDrivers(availableItems.map(i => i.key));
    } else {
      setSelectedConstructors(availableItems.map(i => i.key));
    }
  };

  const handleDeselectAll = () => {
    if (chartType === 'drivers') {
      setSelectedDrivers([]);
    } else {
      setSelectedConstructors([]);
    }
  };

  const handleToggleItem = (itemKey) => {
    if (chartType === 'drivers') {
      setSelectedDrivers(prev => 
        prev.includes(itemKey) 
          ? prev.filter(k => k !== itemKey)
          : [...prev, itemKey]
      );
    } else {
      setSelectedConstructors(prev => 
        prev.includes(itemKey)
          ? prev.filter(k => k !== itemKey)
          : [...prev, itemKey]
      );
    }
  };

  const activeSelection = chartType === 'drivers' ? selectedDrivers : selectedConstructors;

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${getTranslation(language, 'race')} ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${getTranslation(language, 'pts')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="chart-container">
        <p className="no-chart-data">{getTranslation(language, 'noChartData')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chart-header">
        <h2>
          {chartType === 'drivers' 
            ? getTranslation(language, 'driverEvolutionChart')
            : getTranslation(language, 'constructorEvolutionChart')}
        </h2>
        
        <div className="chart-controls">
          <div className="top-selector">
            <label>{getTranslation(language, 'showTop')}:</label>
            <select value={showTop} onChange={(e) => setShowTop(Number(e.target.value))}>
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={15}>Top 15</option>
              <option value={20}>Top 20</option>
            </select>
          </div>
          
          <div className="selection-buttons">
            <button onClick={handleSelectAll} className="select-btn">
              {getTranslation(language, 'selectAll')}
            </button>
            <button onClick={handleDeselectAll} className="select-btn">
              {getTranslation(language, 'deselectAll')}
            </button>
          </div>
        </div>
      </div>

      <div className="item-selector">
        {availableItems.map((item) => (
          <motion.button
            key={item.key}
            className={`item-chip ${activeSelection.includes(item.key) ? 'active' : ''}`}
            onClick={() => handleToggleItem(item.key)}
            style={{
              borderColor: item.color,
              backgroundColor: activeSelection.includes(item.key) ? `${item.color}20` : 'transparent'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="item-color" style={{ backgroundColor: item.color }}></span>
            {item.name}
          </motion.button>
        ))}
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="race" 
              stroke="#fff"
              label={{ 
                value: getTranslation(language, 'raceNumber'), 
                position: 'insideBottom', 
                offset: -5,
                fill: '#fff'
              }}
            />
            <YAxis 
              stroke="#fff"
              domain={[0, 'auto']}
              label={{ 
                value: getTranslation(language, 'points'), 
                angle: -90, 
                position: 'insideLeft',
                fill: '#fff'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeSelection.map((itemKey, index) => {
              const item = availableItems.find(i => i.key === itemKey);
              return item ? (
                <Line
                  key={itemKey}
                  type="monotone"
                  dataKey={itemKey}
                  stroke={item.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name={item.name}
                />
              ) : null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-description">
        <p>
          {chartType === 'drivers'
            ? getTranslation(language, 'chartDescriptionDrivers')
            : getTranslation(language, 'chartDescriptionConstructors')}
        </p>
      </div>
    </motion.div>
  );
}

export default StandingsChart;
