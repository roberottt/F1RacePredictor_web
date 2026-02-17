import { useState } from 'react';
import { motion } from 'framer-motion';
import RaceSelector from '../components/RaceSelector';
import PredictionDisplay from '../components/PredictionDisplay';

function Predictions() {
  const [selectedRace, setSelectedRace] = useState(null);

  const handleSelectRace = (year, round) => {
    setSelectedRace({ year, round });
    
    // Scroll to prediction results
    setTimeout(() => {
      const element = document.getElementById('prediction-results');
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 150;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 700);
  };

  return (
    <main className="app-main">
      <RaceSelector onSelectRace={handleSelectRace} />
      
      {selectedRace && (
        <PredictionDisplay 
          year={selectedRace.year} 
          round={selectedRace.round} 
        />
      )}
    </main>
  );
}

export default Predictions;
