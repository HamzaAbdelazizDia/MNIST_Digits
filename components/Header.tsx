import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange, onAdminClick }) => {
  return (
    <header className="flex flex-wrap justify-between items-center py-6 mb-8 gap-6">
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-5xl animate-float">🚀</span>
        <h1 className="text-4xl font-extrabold tracking-wider flex items-center">
          <span className="gradient-text">DIGITIHA</span>
          <span className="ml-2 fire-text animate-fire">🔥</span>
        </h1>
      </motion.div>

      <nav className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSectionChange('draw')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            currentSection === 'draw'
              ? 'bg-primary-gradient text-dark-bg glow-orange'
              : 'bg-dark-card text-white border-2 border-transparent hover:border-fire-orange hover:glow-orange'
          }`}
        >
          Draw
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSectionChange('leaderboard')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            currentSection === 'leaderboard'
              ? 'bg-primary-gradient text-dark-bg glow-orange'
              : 'bg-dark-card text-white border-2 border-transparent hover:border-fire-orange hover:glow-orange'
          }`}
        >
          Leaderboard
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdminClick}
          className="px-6 py-3 rounded-xl font-semibold bg-dark-card text-white border-2 border-rocket-purple transition-all duration-300 hover:glow-purple"
        >
          Admin
        </motion.button>
      </nav>
    </header>
  );
};

export default Header;
