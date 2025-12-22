import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '../App';
import { getTranslation } from '../translations';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  const navItems = [
    { path: '/', labelKey: 'navHome' },
    { path: '/standings', labelKey: 'navStandings' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="nav-link-wrapper">
            <motion.div
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getTranslation(language, item.labelKey)}
              {location.pathname === item.path && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
