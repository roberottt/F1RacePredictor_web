import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import { Home, Trophy, BarChart3, BookOpen, Globe } from 'lucide-react';
import overcutLogo from '../assets/overcutlogo.png';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { language, setLanguage } = useContext(LanguageContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/', labelKey: 'navHome', icon: Home },
    { path: '/predictions', labelKey: 'navPredictions', icon: Trophy },
    { path: '/standings', labelKey: 'navStandings', icon: BarChart3 },
    { path: '/wiki', labelKey: 'navWiki', icon: BookOpen }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
        initial={{ x: -250 }}
        animate={{ x: 0, width: isCollapsed ? '60px' : '250px' }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <div className="sidebar-content">
          {/* Logo */}
          <motion.div 
            className="sidebar-logo"
            animate={{
              flexDirection: isCollapsed ? 'row' : 'column',
              gap: isCollapsed ? '0' : '0rem'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="logo-icon">
              <motion.img 
                src={overcutLogo} 
                alt="Overcut"
                initial={false}
                animate={{ 
                  width: isCollapsed ? '4.5rem' : '15rem',
                  height: isCollapsed ? '4.5rem' : '15rem'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="logo-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  Overcut
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Items */}
          <div className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path} className="sidebar-link-wrapper">
                  <motion.div
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} className="sidebar-icon" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          className="sidebar-label"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getTranslation(language, item.labelKey)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && <div className="sidebar-indicator" />}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Language Selector & Collapse Button */}
          <div className="sidebar-footer">
            <button 
              className="sidebar-lang-btn"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              title={language === 'en' ? 'Español' : 'English'}
            >
              <Globe size={20} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {language.toUpperCase()}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            

          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path} className="bottom-nav-link">
              <motion.div
                className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span className="bottom-nav-label">
                  {getTranslation(language, item.labelKey)}
                </span>
                {isActive && <div className="bottom-nav-indicator" />}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;
