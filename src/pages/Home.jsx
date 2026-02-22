import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { Brain, TrendingUp, BarChart3, ArrowRight, Zap } from 'lucide-react';
import './Home.css';

function Home() {
  const { language } = useContext(LanguageContext);

  return (
    <main className="home-page">
      <div className="home-container">
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={14} />
              <span>AI-Powered Predictions</span>
            </div>
            <h1 className="hero-title">{getTranslation(language, 'welcomeTitle')}</h1>
            <p className="hero-subtitle">{getTranslation(language, 'welcomeSubtitle')}</p>
            <Link to="/predictions">
              <motion.button
                className="btn btn-primary btn-lg hero-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getTranslation(language, 'startPredicting')}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
          <div className="hero-illustration">
            <iframe
              className="hero-video"
              src="https://tenor.com/embed/25339191"
              title="F1 GIF"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          className="features-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="section-header">
            <h2>{language === 'en' ? 'What We Offer' : 'Qué Ofrecemos'}</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <Brain size={24} />
              </div>
              <h3>{getTranslation(language, 'featureAITitle')}</h3>
              <p>{getTranslation(language, 'featureAIDescription')}</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3>{getTranslation(language, 'featurePredictionsTitle')}</h3>
              <p>{getTranslation(language, 'featurePredictionsDescription')}</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <BarChart3 size={24} />
              </div>
              <h3>{getTranslation(language, 'featureStandingsTitle')}</h3>
              <p>{getTranslation(language, 'featureStandingsDescription')}</p>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="how-it-works"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="section-header">
            <h2>{getTranslation(language, 'howItWorksTitle')}</h2>
          </div>
          
          <div className="steps-timeline">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>{language === 'en' ? 'Select Race' : 'Selecciona Carrera'}</h4>
                <p>{getTranslation(language, 'step1')}</p>
              </div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>{language === 'en' ? 'AI Analysis' : 'Análisis IA'}</h4>
                <p>{getTranslation(language, 'step2')}</p>
              </div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>{language === 'en' ? 'View Results' : 'Ver Resultados'}</h4>
                <p>{getTranslation(language, 'step3')}</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default Home;
