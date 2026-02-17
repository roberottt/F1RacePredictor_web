import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './Home.css';

function Home() {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <main className="home-page">
      <motion.div
        className="home-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="hero-section" variants={itemVariants}>
          <h2 className="hero-title">{getTranslation(language, 'welcomeTitle')}</h2>
          <p className="hero-subtitle">{getTranslation(language, 'welcomeSubtitle')}</p>
        </motion.section>

        <motion.section className="features-grid" variants={itemVariants}>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>{getTranslation(language, 'featureAITitle')}</h3>
            <p>{getTranslation(language, 'featureAIDescription')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏎️</div>
            <h3>{getTranslation(language, 'featurePredictionsTitle')}</h3>
            <p>{getTranslation(language, 'featurePredictionsDescription')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>{getTranslation(language, 'featureStandingsTitle')}</h3>
            <p>{getTranslation(language, 'featureStandingsDescription')}</p>
          </div>
        </motion.section>

        <motion.section className="how-it-works" variants={itemVariants}>
          <h3>{getTranslation(language, 'howItWorksTitle')}</h3>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>{getTranslation(language, 'step1')}</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>{getTranslation(language, 'step2')}</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>{getTranslation(language, 'step3')}</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="cta-section" variants={itemVariants}>
          <Link to="/predictions">
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getTranslation(language, 'startPredicting')}
            </motion.button>
          </Link>
        </motion.section>
      </motion.div>
    </main>
  );
}

export default Home;
